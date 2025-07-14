import prisma from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";



/**
 * @swagger
 * /api/offres:
 *   get:
 *     tags:
 *       - Offres
 *     summary: Récupérer la liste des offres
 *     description: |
 *       Récupère une liste paginée des offres avec possibilité de filtrage et de recherche.
 *       
 *       **Fonctionnalités disponibles :**
 *       - Pagination avec `page` et `limit`
 *       - Filtrage par type d'offre, statut, localisation
 *       - Filtrage par membre FEG
 *       - Recherche textuelle dans le titre, nom de structure et description
 *       - Tri par date de création (plus récent en premier)
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Numéro de la page
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *         description: Nombre d'éléments par page
 *       - in: query
 *         name: type_offre
 *         schema:
 *           type: string
 *           enum: [EMPLOI, STAGE, FORMATION, CONSULTATION]
 *         description: Filtrer par type d'offre
 *       - in: query
 *         name: membre_feg
 *         schema:
 *           type: string
 *           enum: ["true", "false"]
 *         description: Filtrer par statut membre FEG
 *       - in: query
 *         name: statut
 *         schema:
 *           type: string
 *           enum: [ACTIF, INACTIF, ARCHIVE, BROUILLON]
 *         description: Filtrer par statut de l'offre
 *       - in: query
 *         name: localisation
 *         schema:
 *           type: string
 *         description: Recherche par localisation
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Recherche textuelle
 *     responses:
 *       200:
 *         description: Liste des offres récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Offre'
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 *       400:
 *         description: Paramètres invalides
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 * 
 * components:
 *   schemas:
 *     Offre:
 *       type: object
 *       required:
 *         - id_offre
 *         - titre_offre
 *         - nom_structure
 *         - type_offre
 *         - membre_feg
 *         - contact
 *         - email
 *         - localisation
 *         - site_web
 *         - fichier_url
 *         - fichier_nom
 *         - mime_type
 *         - date_debut
 *         - date_fin
 *         - statut
 *         - createdAt
 *         - updatedAt
 *       properties:
 *         id_offre:
 *           type: string
 *           description: Identifiant unique de l'offre
 *         titre_offre:
 *           type: string
 *           description: Titre de l'offre
 *         nom_structure:
 *           type: string
 *           description: Nom de l'entreprise
 *         type_offre:
 *           type: string
 *           enum: [EMPLOI, STAGE, FORMATION, CONSULTATION]
 *         membre_feg:
 *           type: boolean
 *         contact:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         localisation:
 *           type: string
 *         site_web:
 *           type: string
 *           format: uri
 *         fichier_url:
 *           type: string
 *           format: uri
 *         fichier_nom:
 *           type: string
 *         mime_type:
 *           type: string
 *         date_debut:
 *           type: string
 *           format: date-time
 *         date_fin:
 *           type: string
 *           format: date-time
 *         statut:
 *           type: string
 *           enum: [ACTIF, INACTIF, ARCHIVE, BROUILLON]
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
 *     
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         error:
 *           type: string
 */

export async function GET(request: NextRequest) {
  // Vérification de la méthode HTTP
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const type_offre = searchParams.get('type_offre');
    const membre_feg = searchParams.get('membre_feg');
    const statut = searchParams.get('statut');
    const localisation = searchParams.get('localisation');
    const search = searchParams.get('search');

    const skip = (page - 1) * limit;

    // Construction du filtre
    const where: any = {};

    if (type_offre) where.type_offre = type_offre;
    if (membre_feg !== null) where.membre_feg = membre_feg === 'true';
    if (statut) where.statut = statut;
    if (localisation) where.localisation = { contains: localisation, mode: 'insensitive' };

    if (search) {
      where.OR = [
        { titre_offre: { contains: search, mode: 'insensitive' } },
        { nom_structure: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }

    const [offres, total] = await Promise.all([
      prisma.offre.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.offre.count({ where })
    ]);

    return NextResponse.json({
      success: true,
      data: offres,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Erreur lors de la récupération des offres:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Erreur serveur lors de la récupération des offres'
      },
      { status: 500 }
    );
  }
}


/**
 * @swagger
 * /api/offres:
 *   post:
 *     tags:
 *       - Offres
 *     summary: Créer une nouvelle offre avec fichiers
 *     description: |
 *       Crée une nouvelle offre d'emploi/stage avec possibilité d'uploader des fichiers.
 *       
 *       **Fonctionnalités :**
 *       - Support multipart/form-data pour les fichiers
 *       - Upload d'image/logo (optionnel) - JPEG/PNG uniquement
 *       - Upload de bannière (optionnel) - JPEG/PNG uniquement  
 *       - Upload de fichier PDF (obligatoire)
 *       - Validation email et cohérence des dates
 *       - Stockage automatique dans Supabase Storage
 *       - Génération d'URLs publiques pour les fichiers
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - titre_offre
 *               - nom_structure
 *               - type_offre
 *               - membre_feg
 *               - contact
 *               - email
 *               - localisation
 *               - site_web
 *               - date_debut
 *               - date_fin
 *               - fichier
 *             properties:
 *               titre_offre:
 *                 type: string
 *                 description: Titre de l'offre
 *                 example: "Développeur Full Stack React/Node.js"
 *               nom_structure:
 *                 type: string
 *                 description: Nom de l'entreprise ou organisation
 *                 example: "TechCorp Solutions"
 *               type_offre:
 *                 type: string
 *                 enum: [EMPLOI, STAGE, FORMATION, CONSULTATION]
 *                 example: "EMPLOI"
 *               membre_feg:
 *                 type: string
 *                 enum: ["true", "false"]
 *                 description: Statut membre FEG (string convertie en boolean)
 *                 example: "true"
 *               contact:
 *                 type: string
 *                 description: Nom de la personne de contact
 *                 example: "Jean Dupont"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email de contact (validé côté serveur)
 *                 example: "contact@techcorp.com"
 *               localisation:
 *                 type: string
 *                 description: Localisation du poste
 *                 example: "Paris, France"
 *               site_web:
 *                 type: string
 *                 format: uri
 *                 example: "https://www.techcorp.com"
 *               date_debut:
 *                 type: string
 *                 format: date
 *                 description: Date de début (format YYYY-MM-DD)
 *                 example: "2024-01-15"
 *               date_fin:
 *                 type: string
 *                 format: date
 *                 description: Date de fin (doit être > date_debut)
 *                 example: "2024-03-15"
 *               description:
 *                 type: string
 *                 description: Description détaillée (optionnel)
 *                 example: "Nous recherchons un développeur expérimenté..."
 *               statut:
 *                 type: string
 *                 enum: [ACTIF, INACTIF, ARCHIVE, BROUILLON]
 *                 default: "INACTIF"
 *                 example: "ACTIF"
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image/logo (JPEG/PNG, optionnel)
 *               banniere:
 *                 type: string
 *                 format: binary
 *                 description: Bannière (JPEG/PNG, optionnel)
 *               fichier:
 *                 type: string
 *                 format: binary
 *                 description: Fichier PDF (obligatoire)
 *     responses:
 *       201:
 *         description: Offre créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/OffreComplete'
 *                 message:
 *                   type: string
 *                   example: "Offre créée avec succès"
 *       400:
 *         description: Erreur de validation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Email non valide"
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Erreur serveur lors de la création de l'offre"
 */

export async function POST(req: NextRequest) {
  try {
    // Vérification de la méthode HTTP
    const contentType = req.headers.get("content-type") || "";
    // Initialisation des variables pour le corps de la requête et les fichiers
    let body: any = {};
    // Initialisation des fichiers
    let files: Record<string, File> = {};
    // Vérification du type de contenu
    if (contentType.includes("multipart/form-data")) {
      // Récupération des données du formulaire
      const formData = await req.formData();
      // Parcours des entrées du formulaire
      // et séparation des fichiers et des autres données
      for (const [key, value] of formData.entries()) {
        if (value instanceof File) {
          files[key] = value;
        } else {
          body[key] = value;
        }
      }

    } else {
      // Si le contenu n'est pas multipart/form-data, on parse le JSON
      // pour les requêtes JSON
      body = await req.json();
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { success: false, error: "Email non valide" },
        { status: 400 }
      );
    }

    // Validation de la cohérence des dates
    const dateDebut = new Date(body.date_debut);
    const dateFin = new Date(body.date_fin);
    if (dateDebut >= dateFin) {
      return NextResponse.json(
        { success: false, error: "La date de fin doit être postérieure à la date de début" },
        { status: 400 }
      );
    }



    // Gestion des fichiers (image, bannière, PDF)
    let image_url: string | null = null, image_nom: string | null = null, bannier_url: string | null = null, bannier_nom: string | null = null, fichier_url: string = "", fichier_nom: string = "", taille_fichier: number | null = null, mime_type: string = "application/pdf";

    // Image
    if (files.image) {
      // Traitement du logo s'il est fourni
      if (!files.image.type.match(/^image\/(jpeg|png)$/)) {
        return NextResponse.json(
          { error: 'Le logo doit être au format JPEG ou PNG' },
          { status: 400 }
        );
      }

      const timestamp = Date.now();
      const FileName = `${timestamp}_${files.image.name.replace(/\s+/g, '-')}`;
      const FilePath = `offres/${FileName}`;
      // Upload du fichier vers Supabase Storage
      const { data, error } = await supabase.storage
        .from('feg')
        .upload(FilePath, files.image, {
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
        .getPublicUrl(FilePath)

      // Récupération de l'URL publique  
      image_url = urlData.publicUrl
      image_nom = FileName
    }

    // Banniere
    if (files.banniere) {
      // Traitement du logo s'il est fourni
      if (!files.banniere.type.match(/^image\/(jpeg|png)$/)) {
        return NextResponse.json(
          { error: 'La banniere doit être au format JPEG ou PNG' },
          { status: 400 }
        );
      }

      const timestamp = Date.now();
      const FileName = `${timestamp}_${files.banniere.name.replace(/\s+/g, '-')}`;
      const FilePath = `offres/${FileName}`;
      // Upload du fichier vers Supabase Storage
      const { data, error } = await supabase.storage
        .from('feg')
        .upload(FilePath, files.banniere, {
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
        .getPublicUrl(FilePath)

      // Récupération de l'URL publique  
      bannier_url = urlData.publicUrl
      bannier_nom = FileName
    }

    // Fichier
    if (files.fichier) {
      // Vérification du type de fichier
      if (files.fichier.type !== 'application/pdf') {
        return NextResponse.json(
          { erreur: 'Seuls les fichiers PDF sont acceptés' },
          { status: 400 }
        );
      }
      const timestamp = Date.now();
      const FileName = `${timestamp}_${files.fichier.name.replace(/\s+/g, '-')}`;
      const FilePath = `offres/${FileName}`;
      // Upload du fichier vers Supabase Storage
      const { data, error } = await supabase.storage
        .from('feg')
        .upload(FilePath, files.fichier, {
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
        .getPublicUrl(FilePath)

      // Récupération de l'URL publique  
      fichier_url = urlData.publicUrl
      fichier_nom = FileName

    }

    const nouvelleOffre = {
      ...body,
      membre_feg: body.membre_feg === 'true',
      date_debut: dateDebut,
      date_fin: dateFin,
      image_url,
      image_nom,
      bannier_url,
      bannier_nom,
      fichier_url,
      fichier_nom,
    }

    const PostOffre = await prisma.offre.create({ data: nouvelleOffre })

    return NextResponse.json(
      { success: true, data: PostOffre, message: "Offre créée avec succès" },
      { status: 201 }
    );

  } catch (error) {
    console.error("Erreur lors de la création de l'offre:", error);
    return NextResponse.json(
      { success: false, error: "Erreur serveur lors de la création de l'offre" },
      { status: 500 }
    );
  }

}


export type nouvelleOffre = {
  nom_structure: string;
  type_offre: string;
  membre_feg: boolean;
  contact: string;
  description: string | null;
  email: string;
  localisation: string;
  site_web: string;
  date_debut: string;
  date_fin: string;
  statut: string;
}

