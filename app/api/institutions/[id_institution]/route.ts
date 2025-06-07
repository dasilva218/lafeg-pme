import prisma from '@/lib/prisma';
import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * /api/institutions/{id_institution}:
 *   get:
 *     summary: Récupère une institution par son ID
 *     description: Renvoie les détails d'une institution financière spécifique en utilisant son identifiant MongoDB
 *     tags: [Institutions]
 *     parameters:
 *       - in: path
 *         name: id_institution
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[a-fA-F0-9]{24}$'
 *         description: Identifiant MongoDB de l'institution (24 caractères hexadécimaux)
 *     responses:
 *       200:
 *         description: Détails de l'institution récupérés avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Institution'
 *       400:
 *         description: Format d'ID invalide
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "ID invalide (format MongoDB attendu)."
 *       404:
 *         description: Institution non trouvée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Institution non trouvée."
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erreur interne du serveur."
 */


export async function GET(request: NextRequest, { params }: { params: { id_institution: string } }) {
  const { id_institution } = params;

  // Vérifie que l'ID est bien un ObjectId MongoDB
  if (!/^[a-fA-F0-9]{24}$/.test(id_institution)) {
    return NextResponse.json({ error: 'ID invalide (format MongoDB attendu).' }, { status: 400 });
  }

  try {
    // Affiche l'institution financière par son ID
    const institution = await prisma.institutions.findUnique({
      where: { id_institution },
    });

    // Vérifie si l'institution existe
    if (!institution) {
      return NextResponse.json({ error: 'Institution non trouvée.' }, { status: 404 });
    }

    return NextResponse.json(institution, { status: 200 });
  } catch (error) {
    console.error('Erreur GET /api/institutions/[id_institution]:', error);
    return NextResponse.json({ error: 'Erreur interne du serveur.' }, { status: 500 });
  }
}



/**
 * @swagger
 * /api/institutions/{id_institution}:
 *   put:
 *     summary: Met à jour une institution existante
 *     description: Modifie les informations d'une institution financière et gère l'upload d'une nouvelle image si fournie
 *     tags: [Institutions]
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: id_institution
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[a-fA-F0-9]{24}$'
 *         description: Identifiant MongoDB de l'institution (24 caractères hexadécimaux)
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *                 description: Nom de l'institution financière
 *               categorie:
 *                 type: string
 *                 description: Catégorie de l'institution
 *               type_institution:
 *                 type: string
 *                 description: Type d'institution
 *               partenaire_feg:
 *                 type: string
 *                 enum: ['true', 'false']
 *                 description: Indique si l'institution est partenaire FEG (envoyé comme "true" ou "false")
 *               description:
 *                 type: string
 *                 description: Description détaillée de l'institution
 *               adresse:
 *                 type: string
 *                 description: Adresse physique de l'institution
 *               contact:
 *                 type: string
 *                 description: Numéro de contact de l'institution
 *               mail:
 *                 type: string
 *                 description: Adresse email de l'institution
 *               site_web:
 *                 type: string
 *                 description: Site web de l'institution
 *               rs_1:
 *                 type: string
 *                 description: Lien vers le premier réseau social
 *               rs_2:
 *                 type: string
 *                 description: Lien vers le deuxième réseau social
 *               service:
 *                 type: string
 *                 description: Services offerts par l'institution
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Nouveau fichier image du logo de l'institution (JPEG ou PNG uniquement)
 *     responses:
 *       200:
 *         description: Institution mise à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Institution'
 *       400:
 *         description: Données invalides
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   examples:
 *                     formatInvalide:
 *                       value: "Le logo doit être au format JPEG ou PNG"
 *                     contentType:
 *                       value: "Le contenu doit être de type multipart/form-data"
 *       404:
 *         description: Institution non trouvée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Institution non trouvée"
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   examples:
 *                     uploadError:
 *                       value: "Erreur lors de l'upload du logo"
 *                     serverError:
 *                       value: "Erreur Interne du Serveur"
 */
export async function PUT(request: NextRequest, { params }: { params: { id_institution: string } }) {
  try {
    const {id_institution} = params;

    // Vérifier que la requête est bien de type multipart/form-data
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('multipart/form-data')) {
      return NextResponse.json(
        { error: 'Le contenu doit être de type multipart/form-data' },
        { status: 400 }
      );
    }

    // Récupérer l'institution existante
    const existingInstitution = await prisma.institutions.findUnique({
      where: { id_institution },
    });

    if (!existingInstitution) {
      return NextResponse.json(
        { error: 'Institution non trouvée' },
        { status: 404 }
      );
    }

    // Traitement du formulaire
    const formData = await request.formData();
    const updates: any = {};

    // Mise à jour des champs texte
    for (const field of ['nom', 'categorie', 'type_institution', 'description', 'adresse', 'contact', 'mail', 'site_web', 'rs_1', 'rs_2', 'service']) {
      const value = formData.get(field);
      if (value !== null) {
        updates[field] = value as string;
      }
    }

    // Traitement du champ booléen
    const partenaire_feg = formData.get('partenaire_feg');
    if (partenaire_feg !== null) {
      updates.partenaire_feg = partenaire_feg === 'true';
    }

    // Traitement du logo s'il est fourni
    const logo = formData.get('image') as File;
    if (logo) {
      // Vérification du type de fichier
      if (!logo.type.match(/^image\/(jpeg|png)$/)) {
        return NextResponse.json(
          { error: 'Le logo doit être au format JPEG ou PNG' },
          { status: 400 }
        );
      }

      // Supprimer l'ancien logo s'il existe
      if (existingInstitution.image_nom) {
        const { error: deleteError } = await supabase.storage
          .from('feg')
          .remove([`institution-financiere/${existingInstitution.image_nom}`]);

        if (deleteError) {
          console.error('Erreur lors de la suppression de l\'ancien logo:', deleteError);
        }
      }

      // Upload du nouveau logo
      const timestamp = Date.now();
      const fileName = `${timestamp}-${logo.name.replace(/\s+/g, '-')}`;
      const filePath = `institution-financiere/${fileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('feg')
        .upload(filePath, logo, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Erreur lors de l\'upload du logo:', uploadError);
        return NextResponse.json(
          { error: 'Erreur lors de l\'upload du logo' },
          { status: 500 }
        );
      }

      // Récupération de l'URL publique
      const { data: urlData } = supabase.storage
        .from('feg')
        .getPublicUrl(filePath);

      updates.logo = urlData.publicUrl;
      updates.logo_nom = fileName;
    }

    // Mise à jour en base de données
    const updatedInstitution = await prisma.institutions.update({
      where: { id_institution },
      data: updates
    });

    return NextResponse.json(updatedInstitution);
  } catch (error) {
    console.error('Erreur PUT /api/institutions/[id]:', error);
    return NextResponse.json(
      { error: 'Erreur Interne du Serveur' },
      { status: 500 }
    );
  }
}


/**
 * @swagger
 * /api/institutions/{id_institution}:
 *   delete:
 *     summary: Supprime une institution
 *     description: Supprime définitivement une institution financière par son identifiant MongoDB
 *     tags: [Institutions]
 *     parameters:
 *       - in: path
 *         name: id_institution
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[a-fA-F0-9]{24}$'
 *         description: Identifiant MongoDB de l'institution (24 caractères hexadécimaux)
 *     responses:
 *       200:
 *         description: Institution supprimée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Institution supprimée"
 *       400:
 *         description: Format d'ID invalide
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "ID Mongo invalide (format)."
 *       500:
 *         description: Erreur serveur ou institution non trouvée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erreur serveur ou ID non trouvé"
 */


export async function DELETE(request: NextRequest, { params }: { params: { id_institution: string } }) {
  const {id_institution} = params;

  if (!/^[a-fA-F0-9]{24}$/.test(id_institution)) {
    return NextResponse.json({ error: 'ID Mongo invalide (format).' }, { status: 400 });
  }

  try {
    const deleted = await prisma.institutions.delete({
      where: { id_institution },
    });

    return NextResponse.json({ message: 'Institution supprimée' }, { status: 200 });
  } catch (error) {
    console.error('Erreur DELETE:', error);
    return NextResponse.json({ error: 'Erreur serveur ou ID non trouvé' }, { status: 500 });
  }
}
