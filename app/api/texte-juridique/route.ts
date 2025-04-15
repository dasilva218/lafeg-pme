import prisma from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: false,
  },
}

/**
 * @swagger
 * /api/texte-juridique:
 *   get:
 *     summary: Récupérer la liste des textes juridiques
 *     description: Retourne une liste paginée des textes juridiques avec possibilité de filtrage par catégorie et type
 *     tags: [Textes Juridiques]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Numéro de la page
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Nombre d'éléments par page
 *       - in: query
 *         name: categorie
 *         schema:
 *           type: string
 *         description: Filtre par catégorie de texte
 *       - in: query
 *         name: type_texte
 *         schema:
 *           type: string
 *         description: Filtre par type de texte
 *     responses:
 *       200:
 *         description: Liste des textes juridiques récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/TexteJuridique'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     total:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *       500:
 *         description: Erreur serveur
 */

// GET - Récupérer tous les textes juridiques
export async function GET(request: NextRequest) {
  try {
    // Gestion des paramètres de filtrage et pagination
    const searchParams = request.nextUrl.searchParams;
    const categorie = searchParams.get('categorie');
    const type = searchParams.get('type_texte');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    // Construction du filtre
    const where: any = {};
    if (categorie) where.categorie = categorie;
    if (type) where.type_texte = type;

    // Récupération des textes juridiques avec pagination
    const [textes, total] = await Promise.all([
      prisma.texteJuridique.findMany({
        where,
        skip,
        take: limit,
        orderBy: { date_parution: 'desc' }
      }),
      prisma.texteJuridique.count({ where })
    ]);

    return NextResponse.json({
      data: textes,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) }
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des textes juridiques:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des textes juridiques' },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/texte-juridique:
 *   post:
 *     summary: Créer un nouveau texte juridique
 *     description: Crée un nouveau texte juridique avec upload de fichier PDF
 *     tags: [Textes Juridiques]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - titre
 *               - type_texte
 *               - categorie
 *               - date_parution
 *               - fichier
 *             properties:
 *               titre:
 *                 type: string
 *                 description: Titre du texte juridique
 *               type_texte:
 *                 type: string
 *                 description: Type de texte (loi, décret, arrêté, etc.)
 *               categorie:
 *                 type: string
 *                 description: Catégorie du texte
 *               description:
 *                 type: string
 *                 description: Description du texte (optionnel)
 *               date_parution:
 *                 type: string
 *                 format: date
 *                 description: Date de parution du texte
 *               version:
 *                 type: string
 *                 description: Version du texte (optionnel)
 *               fichier:
 *                 type: string
 *                 format: binary
 *                 description: Fichier PDF du texte juridique
 *     responses:
 *       201:
 *         description: Texte juridique créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TexteJuridique'
 *       400:
 *         description: Données invalides ou fichier manquant/incorrect
 *       500:
 *         description: Erreur serveur
 */

// POST - Créer un nouveau texte juridique avec upload de fichier
export async function POST(request: NextRequest) {

  try {

    // Vérifier que la requête est bien de type multipart/form-data
    const contentType = request.headers.get('content-type');

    if (!contentType || !contentType.includes('multipart/form-data')) {
      return NextResponse.json(
        { erreur: 'Le contenu doit être de type multipart/form-data' },
        { status: 400 }
      );
    }

    // Traitement du formulaire
    const formData = await request.formData();
    const file = formData.get('fichier') as File;

    if (!file) {
      return NextResponse.json(
        { erreur: 'Fichier PDF requis' },
        { status: 400 }
      );
    }

    // Vérification du type de fichier
    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { erreur: 'Seuls les fichiers PDF sont acceptés' },
        { status: 400 }
      );
    }

    // Création d'un nom de fichier unique
    const timestamp = Date.now();
    // const fileExtension = file.name.split('.').pop();
    const fileName = `${timestamp}-${file.name.replace(/\s+/g, '-')}`;
    const filePath = `texte-juridique/${fileName}`;
    // Upload du fichier vers Supabase Storage
    const { data, error } = await supabase.storage
      .from('feg')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      })

    // Vérification de l'upload
    if (error) {
      console.error(`Erreur de l'upload:`, error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const { data: urlData } = supabase
      .storage
      .from('feg')
      .getPublicUrl(filePath)


    // Récupération des données du formulaire
    const titre = formData.get('titre') as string;
    const type_texte = formData.get('type_texte') as string;
    const categorie = formData.get('categorie') as string;
    const description = formData.get('description') as string || null;
    const date_parution = new Date(formData.get('date_parution') as string);
    const version = formData.get('version') as string || null;

    // Création dans la base de données
    const texteJuridique = await prisma.texteJuridique.create({
      data: {
        titre,
        type_texte,
        fichier_url: urlData.publicUrl,
        fichier_nom: fileName,
        taille_fichier: file.size,
        mime_type: file.type,
        categorie,
        description,
        date_parution,
        version
      },
    });

    return NextResponse.json(texteJuridique, { status: 201 });
    
  } catch (error) {
    console.error('Erreur lors de la création du texte juridique:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création du texte juridique' },
      { status: 500 }
    );
  }
}