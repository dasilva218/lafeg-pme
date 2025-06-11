import prisma from '@/lib/prisma';
import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from 'next/server';
import { join } from 'path';

/**
 * @swagger
 * /api/texte-juridique/{id}:
 *   get:
 *     summary: Récupérer un texte juridique par ID
 *     description: Retourne les détails d'un texte juridique spécifique
 *     tags: [Textes Juridiques]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du texte juridique
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Texte juridique trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TexteJuridique'
 *       404:
 *         description: Texte juridique non trouvé
 *       500:
 *         description: Erreur serveur
 */

const UPLOAD_DIR = join(process.cwd(), 'public', 'uploads', 'textes-juridiques');

// GET - Récupérer un texte juridique par ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  // Vérification de l'ID
  if (!params.id) {
    return NextResponse.json(
      { error: 'ID du texte juridique manquant' },
      { status: 400 }
    );
  }
  // Vérification du format de l'ID
  if (!/^[a-zA-Z0-9-]+$/.test(params.id)) {
    return NextResponse.json(
      { error: 'ID du texte juridique invalide' },
      { status: 400 }
    );
  }
  // Vérification de la longueur de l'ID
  if (params.id.length > 36) {
    return NextResponse.json(
      { error: 'ID du texte juridique trop long' },
      { status: 400 }
    );
  }
  try {
    const texteJuridique = await prisma.texteJuridique.findUnique({
      where: { id_texteJuridique: params.id }
    });

    if (!texteJuridique) {
      return NextResponse.json(
        { error: 'Texte juridique non trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json(texteJuridique);
  } catch (error) {
    console.error('Erreur lors de la récupération du texte juridique:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération du texte juridique' },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/texte-juridique/{id}:
 *   put:
 *     summary: Mettre à jour un texte juridique
 *     description: Met à jour un texte juridique existant avec possibilité de changer le fichier PDF
 *     tags: [Textes Juridiques]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du texte juridique à mettre à jour
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               titre:
 *                 type: string
 *                 description: Nouveau titre du texte juridique
 *               type_texte:
 *                 type: string
 *                 description: Nouveau type de texte
 *               categorie:
 *                 type: string
 *                 description: Nouvelle catégorie
 *               description:
 *                 type: string
 *                 description: Nouvelle description
 *               date_parution:
 *                 type: string
 *                 format: date
 *                 description: Nouvelle date de parution
 *               version:
 *                 type: string
 *                 description: Nouvelle version
 *               fichier:
 *                 type: string
 *                 format: binary
 *                 description: Nouveau fichier PDF (optionnel)
 *     responses:
 *       200:
 *         description: Texte juridique mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TexteJuridique'
 *       400:
 *         description: Données invalides
 *       404:
 *         description: Texte juridique non trouvé
 *       500:
 *         description: Erreur serveur
 */

// PUT - Mettre à jour un texte juridique par ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const {id} = params;

    // Vérifier si le texte juridique existe
    const existingTexte = await prisma.texteJuridique.findUnique({
      where: { id_texteJuridique: id }
    });

    if (!existingTexte) {
      return NextResponse.json(
        { error: 'Texte juridique non trouvé' },
        { status: 404 }
      );
    }

    // Traitement du formulaire
    const formData = await request.formData();
    const updates: any = {};

    // Mise à jour des champs texte
    for (const field of ['titre', 'type_texte', 'categorie', 'description', 'version']) {
      const value = formData.get(field);
      if (value) updates[field] = value;
    }

    // Traitement de la date
    const dateStr = formData.get('date_parution');
    if (dateStr) {
      updates.date_parution = new Date(dateStr as string);
    }

    // Traitement du fichier s'il est fourni
    const file = formData.get('fichier') as File;
    if (file) {
      // Vérification du type de fichier
      if (file.type !== 'application/pdf') {
        return NextResponse.json(
          { error: 'Seuls les fichiers PDF sont acceptés' },
          { status: 400 }
        );
      }

      // Suppression de l'ancien fichier dans Supabase Storage
      if (existingTexte.fichier_nom) {
        const { error: deleteError } = await supabase.storage
          .from('feg')
          .remove([`texte-juridique/${existingTexte.fichier_nom}`]);

        if (deleteError) {
          console.error('Erreur lors de la suppression de l\'ancien fichier:', deleteError);
        }
      }

      // Upload du nouveau fichier
      const timestamp = Date.now();
      const fileName = `${timestamp}-${file.name.replace(/\s+/g, '-')}`;
      const filePath = `texte-juridique/${fileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('feg')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Erreur lors de l\'upload:', uploadError);
        return NextResponse.json(
          { error: 'Erreur lors de l\'upload du fichier' },
          { status: 500 }
        );
      }

      // Récupération de l'URL publique
      const { data: urlData } = supabase.storage
        .from('feg')
        .getPublicUrl(filePath);

      // Mise à jour des informations du fichier
      updates.fichier_url = urlData.publicUrl;
      updates.fichier_nom = fileName;
      updates.taille_fichier = file.size;
      updates.mime_type = file.type;
    }

    // Mise à jour en base de données
    const updatedTexte = await prisma.texteJuridique.update({
      where: { id_texteJuridique: id },
      data: updates
    });

    return NextResponse.json(updatedTexte);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du texte juridique:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour du texte juridique' },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/texte-juridique/{id}:
 *   delete:
 *     summary: Supprimer un texte juridique
 *     description: Supprime un texte juridique et son fichier PDF associé
 *     tags: [Textes Juridiques]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID du texte juridique à supprimer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Texte juridique supprimé avec succès
 *       404:
 *         description: Texte juridique non trouvé
 *       500:
 *         description: Erreur serveur
 */

// DELETE - Supprimer un texte juridique par ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    // Récupérer le texte pour avoir le nom du fichier
    const texte = await prisma.texteJuridique.findUnique({
      where: { id_texteJuridique: id }
    });

    if (!texte) {
      return NextResponse.json(
        { error: 'Texte juridique non trouvé' },
        { status: 404 }
      );
    }

    // Supprimer le fichier de Supabase Storage
    if (texte.fichier_nom) {
      const { error } = await supabase.storage
        .from('feg')
        .remove([`texte-juridique/${texte.fichier_nom}`]);

      if (error) {
        console.error('Erreur lors de la suppression du fichier:', error);
      }
    }

    // Supprimer l'entrée de la base de données
    await prisma.texteJuridique.delete({
      where: { id_texteJuridique: id }
    });

    return NextResponse.json({ message: 'Texte juridique supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du texte juridique:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la suppression du texte juridique' },
      { status: 500 }
    );
  }
}