import prisma from '@/lib/prisma';
import { supabase } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// }


/**
 * @swagger
 * /api/institutions:
 *   get:
 *     summary: Récupère une liste paginée des institutions
 *     description: Retourne une liste paginée des institutions avec options de filtrage et de tri
 *     tags:
 *       - Institutions
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *           minimum: 1
 *         description: Numéro de page pour la pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *           minimum: 1
 *           maximum: 100
 *         description: Nombre d'éléments par page
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           default: createdAt
 *         description: Champ sur lequel effectuer le tri
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Ordre de tri (ascendant ou descendant)
 *       - in: query
 *         name: nom
 *         schema:
 *           type: string
 *         description: Filtre par nom d'institution (recherche partielle)
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *         description: Filtre par type d'institution
 *     responses:
 *       200:
 *         description: Liste des institutions récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Liste des institutions récupérée avec succès
 *                 content:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Institutionfinanciere'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 10
 *                     total:
 *                       type: integer
 *                       example: 42
 *                     totalPages:
 *                       type: integer
 *                       example: 5
 *       500:
 *         description: Erreur lors de la récupération des institutions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Erreur lors de la récupération des institutions
 */

export async function GET(request: Request) {
  try {
    // Récupération des paramètres de l'URL
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    
    // Paramètres de pagination avec valeurs par défaut
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = Math.max(1, Math.min(100, parseInt(searchParams.get('limit') || '10')));
    const skip = (page - 1) * limit;
    
    // Paramètres de tri avec valeurs par défaut
    const sortField = searchParams.get('sort') || 'createdAt';
    const sortOrder = searchParams.get('order') === 'asc' ? 'asc' : 'desc';
    
    // Construction du filtre
    const where: any = {};
    
    // Filtrage par nom (recherche partielle)
    const nom = searchParams.get('nom');
    if (nom) {
      where.nom = {
        contains: nom,
        mode: 'insensitive'
      };
    }
    
    // Filtrage par type d'institution
    const type = searchParams.get('type');
    if (type) where.type = type;
    
    // Exécution des requêtes en parallèle
    const [institutions, total] = await Promise.all([
      prisma.institutions.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortField]: sortOrder }
      }),
      prisma.institutions.count({ where })
    ]);
    
    // Réponse structurée avec message, contenu et pagination
    return NextResponse.json({
      message: "Liste des institutions récupérée avec succès",
      content: institutions,
      pagination: { 
        page, 
        limit, 
        total, 
        totalPages: Math.ceil(total / limit) 
      }
    }, { status: 200 });
    
  } catch (error) {
    console.error('Erreur lors de la récupération des institutions:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des institutions' },
      { status: 500 }
    );
  }
}



/**
 * @swagger
 * /api/institutions:
 *   post:
 *     summary: Crée une nouvelle institution avec image
 *     description: Ajoute une nouvelle institution financière avec téléchargement obligatoire d'image
 *     tags: [Institutions]
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - nom
 *               - categorie
 *               - type_institution
 *               - image
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
 *                 description: Fichier image du logo de l'institution (JPEG ou PNG uniquement)
 *     responses:
 *       201:
 *         description: Institution créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Institution créée avec succès"
 *                 institution:
 *                   $ref: '#/components/schemas/Institution'
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
 *                     champsManquants:
 *                       value: "Les champs nom, categorie et type_institution sont requis."
 *                     logoManquant:
 *                       value: "Logo requis"
 *                     formatInvalide:
 *                       value: "Le logo doit être au format JPEG ou PNG"
 *                     contentType:
 *                       value: "Le contenu doit être de type multipart/form-data"
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

export async function POST(request: NextRequest) {

  try {
    // Vérifier que la requête est bien de type multipart/form-data
    const contentType = request.headers.get('content-type');

    if (!contentType || !contentType.includes('multipart/form-data')) {
      return NextResponse.json(
        { error: 'Le contenu doit être de type multipart/form-data' },
        { status: 400 }
      );
    }

    // Traitement du formulaire
    const formData = await request.formData();
    const file = formData.get('image') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'Logo requis' },
        { status: 400 }
      );
    }

    // Traitement du logo s'il est fourni
    if (!file.type.match(/^image\/(jpeg|png)$/)) {
      return NextResponse.json(
        { error: 'Le logo doit être au format JPEG ou PNG' },
        { status: 400 }
      );
    }

    // Récupération des données du formulaire
    const nom = formData.get('nom') as string;
    const categorie = formData.get('categorie') as string;
    const type_institution = formData.get('type_institution') as string;
    const partenaire_feg = formData.get('partenaire_feg') === 'true';
    const description = formData.get('description') as string || null;
    const adresse = formData.get('adresse') as string || null;
    const contact = formData.get('contact') as string || null;
    const mail = formData.get('mail') as string || null;
    const site_web = formData.get('site_web') as string || null;
    const rs_1 = formData.get('rs_1') as string || null;
    const rs_2 = formData.get('rs_2') as string || null;
    const service = formData.get('service') as string || null;

    // Validation minimale
    if (!nom || !categorie || !type_institution) {
      return NextResponse.json(
        { error: 'Les champs nom, categorie et type_institution sont requis.' },
        { status: 400 }
      );
    }

    let image_url = null;
    let image_nom = null;

    // Traitement du logo s'il est fourni 
    if (file) {
      // Création d'un nom unique pour le fichier
      const timestamp = Date.now();
      const fileName = `${timestamp}-${file.name.replace(/\s+/g, '-')}`;
      const filePath = `institution-financiere/${fileName}`;

      // Upload du fichier vers Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('feg')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Erreur lors de l\'upload du logo:', uploadError);
        return NextResponse.json(
          { error: "Erreur lors de l'upload du logo" },
          { status: 500 }
        );
      }

      // Récupération de l'URL publique
      const { data: urlData } = supabase.storage
        .from('feg')
        .getPublicUrl(filePath);

      image_url = urlData.publicUrl;
      image_nom = file.name;
    }

    // Création dans la base de données
    const newInstitution = await prisma.institutions.create({
      data: {
        nom,
        categorie,
        type_institution,
        partenaire_feg,
        description,
        image_url,
        image_nom,
        taille_image: file.size,
        image_mime_type: file.type,
        adresse,
        contact,
        mail,
        site_web,
        rs_1,
        rs_2,
        service,
      },
    });

    return NextResponse.json(
      { message: "Institution créée avec succès", institution: newInstitution },
      { status: 201 }
    );

  } catch (error) {

    console.error('Erreur lors de la création de l\'institution:', error);

    return NextResponse.json(
      { error: 'Erreur Interne du Serveur' },
      { status: 500 }
    );

  }
}

