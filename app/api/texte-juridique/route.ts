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
 * /api/textes-juridiques:
 *   get:
 *     tags:
 *       - Textes Juridiques
 *     summary: Récupérer la liste des textes juridiques
 *     description: |
 *       Récupère une liste paginée des textes juridiques avec possibilité de filtrage.
 *       
 *       **Fonctionnalités disponibles :**
 *       - Pagination avec métadonnées complètes
 *       - Filtrage par catégorie juridique (droit civil, commercial, etc.)
 *       - Filtrage par type de texte (loi, décret, arrêté, etc.)
 *       - Tri chronologique automatique (plus récent en premier)
 *       - Gestion d'erreurs avec messages explicites
 *     parameters:
 *       - in: query
 *         name: categorie
 *         schema:
 *           type: string
 *           enum: [DROIT_CIVIL, DROIT_COMMERCIAL, DROIT_PENAL, DROIT_ADMINISTRATIF, DROIT_TRAVAIL, DROIT_FISCAL, DROIT_INTERNATIONAL, AUTRES]
 *         description: Filtrer par catégorie de droit
 *         example: "DROIT_COMMERCIAL"
 *       - in: query
 *         name: type_texte
 *         schema:
 *           type: string
 *           enum: [CONSTITUTION, LOI, DECRET, ARRETE, ORDONNANCE, CIRCULAIRE, CODE, REGLEMENT, JURISPRUDENCE]
 *         description: Filtrer par type de texte juridique
 *         example: "LOI"
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Numéro de la page (commence à 1)
 *         example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Nombre d'éléments par page (max 100)
 *         example: 20
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
 *                   $ref: '#/components/schemas/Pagination'
 *       400:
 *         description: Paramètres de requête invalides
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Le paramètre 'page' doit être un entier positif"
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erreur lors de la récupération des textes juridiques"
 * 
 * components:
 *   schemas:
 *     TexteJuridique:
 *       type: object
 *       required:
 *         - id_texte
 *         - titre
 *         - numero_texte
 *         - categorie
 *         - type_texte
 *         - date_parution
 *         - statut
 *         - source_officielle
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         id_texte:
 *           type: string
 *           description: Identifiant unique
 *         titre:
 *           type: string
 *           description: Titre officiel du texte
 *         numero_texte:
 *           type: string
 *           description: Numéro officiel
 *         categorie:
 *           type: string
 *           enum: [DROIT_CIVIL, DROIT_COMMERCIAL, DROIT_PENAL, DROIT_ADMINISTRATIF, DROIT_TRAVAIL, DROIT_FISCAL, DROIT_INTERNATIONAL, AUTRES]
 *         type_texte:
 *           type: string
 *           enum: [CONSTITUTION, LOI, DECRET, ARRETE, ORDONNANCE, CIRCULAIRE, CODE, REGLEMENT, JURISPRUDENCE]
 *         date_parution:
 *           type: string
 *           format: date-time
 *         date_entree_vigueur:
 *           type: string
 *           format: date-time
 *           nullable: true
 *         statut:
 *           type: string
 *           enum: [EN_VIGUEUR, ABROGE, SUSPENDU, PROJET, BROUILLON]
 *         resume:
 *           type: string
 *           nullable: true
 *         source_officielle:
 *           type: string
 *         url_source:
 *           type: string
 *           format: uri
 *           nullable: true
 *         mots_cles:
 *           type: array
 *           items:
 *             type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     
 *     Pagination:
 *       type: object
 *       properties:
 *         page:
 *           type: integer
 *         limit:
 *           type: integer
 *         total:
 *           type: integer
 *         totalPages:
 *           type: integer
 */
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
 * /textes-juridiques:
 *   post:
 *     tags:
 *       - Textes Juridiques
 *       - Upload
 *     summary: Créer un nouveau texte juridique avec fichier PDF
 *     description: |
 *       Crée un nouveau texte juridique en uploadant le fichier PDF correspondant.
 *       
 *       **Processus de création :**
 *       - Validation du type de contenu multipart/form-data
 *       - Upload sécurisé du fichier PDF dans Supabase Storage
 *       - Création de l'entrée en base de données avec métadonnées
 *       - Génération d'une URL publique permanente
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
 *                 description: Titre officiel du texte juridique
 *                 example: "Loi relative au commerce électronique"
 *               type_texte:
 *                 type: string
 *                 enum: [CONSTITUTION, LOI, DECRET, ARRETE, ORDONNANCE, CIRCULAIRE, CODE, REGLEMENT, JURISPRUDENCE]
 *                 example: "LOI"
 *               categorie:
 *                 type: string
 *                 enum: [DROIT_CIVIL, DROIT_COMMERCIAL, DROIT_PENAL, DROIT_ADMINISTRATIF, DROIT_TRAVAIL, DROIT_FISCAL, DROIT_INTERNATIONAL, AUTRES]
 *                 example: "DROIT_COMMERCIAL"
 *               date_parution:
 *                 type: string
 *                 format: date
 *                 description: Date de publication (YYYY-MM-DD)
 *                 example: "2024-03-15"
 *               description:
 *                 type: string
 *                 description: Description ou résumé (optionnel)
 *                 example: "Cette loi encadre les activités de commerce électronique..."
 *               version:
 *                 type: string
 *                 description: Version du texte (optionnel)
 *                 example: "Version initiale"
 *               fichier:
 *                 type: string
 *                 format: binary
 *                 description: Fichier PDF (obligatoire)
 *     responses:
 *       201:
 *         description: Texte juridique créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TexteJuridiqueCreated'
 *       400:
 *         description: Erreur de validation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 erreur:
 *                   type: string
 *                   example: "Fichier PDF requis"
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erreur lors de la création du texte juridique"
 */
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