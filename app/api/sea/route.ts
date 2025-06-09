import prisma from '@/lib/prisma';
import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export const config = {
  api: {
    bodyParser: false,
  },
}

/**
 * @swagger
 * /api/sea:
 *   get:
 *     summary: Récupère une liste paginée des données SEA
 *     description: Retourne une liste paginée des enregistrements SEA avec options de filtrage et de tri
 *     tags:
 *       - SEA
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
 *         name: type
 *         schema:
 *           type: string
 *         description: Filtre par type de SEA
 *     responses:
 *       200:
 *         description: Liste des données SEA récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/SEAt'
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
 *         description: Erreur lors de la récupération des données
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Erreur lors de la récupération des données SEA
 */
export async function GET(request: Request) {
  try {
    // Récupération des paramètres de l'URL
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    
    // Paramètres de pagination avec valeurs par défaut
    const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
    const limit = Math.max(1, Math.min(100, parseInt(searchParams.get('limit') || '100')));
    const skip = (page - 1) * limit;
    
    // Paramètres de tri avec valeurs par défaut
    const sortField = searchParams.get('sort') || 'createdAt'; // Ajustez selon votre schéma
    const sortOrder = searchParams.get('order') === 'asc' ? 'asc' : 'desc';
    
    // Construction du filtre (exemple avec un champ 'type')
    const where: any = {};
    const type = searchParams.get('type');
    if (type) where.type = type;
    
    // Exécution des requêtes en parallèle
    const [data, total] = await Promise.all([
      prisma.sEA.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortField]: sortOrder }
      }),
      prisma.sEA.count({ where })
    ]);
    
    // Réponse structurée avec données et pagination
    return NextResponse.json({
      data,
      pagination: { 
        page, 
        limit, 
        total, 
        totalPages: Math.ceil(total / limit) 
      }
    }, { status: 200 });
    
  } catch (error) {
    console.error('Erreur lors de la récupération des données SEA:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des données SEA' }, 
      { status: 500 }
    );
  }
}


/**
 * @swagger
 * /api/sea:
 *   post:
 *     summary: Crée un nouveau SEA
 *     description: Ajoute un nouveau Système Economique Alternatif (SEA) avec possibilité d'uploader un logo
 *     tags: [SEA]
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
 *               - type_sea
 *               - categorie
 *             properties:
 *               nom:
 *                 type: string
 *                 description: Nom du SEA
 *               type_sea:
 *                 type: string
 *                 description: Type de SEA
 *               categorie:
 *                 type: string
 *                 description: Catégorie du SEA
 *               description:
 *                 type: string
 *                 description: Description détaillée du SEA
 *               services:
 *                 type: string
 *                 description: Liste des services au format JSON string (sera parsé en array)
 *                 example: '["Service 1", "Service 2"]'
 *               adresse:
 *                 type: string
 *                 description: Adresse physique du SEA
 *               contact:
 *                 type: string
 *                 description: Numéro de contact du SEA
 *               mail:
 *                 type: string
 *                 description: Adresse email du SEA
 *               site_web:
 *                 type: string
 *                 description: Site web du SEA
 *               rs_1:
 *                 type: string
 *                 description: Lien vers le premier réseau social
 *               rs_2:
 *                 type: string
 *                 description: Lien vers le deuxième réseau social
 *               partenaire_feg:
 *                 type: string
 *                 enum: ['true', 'false']
 *                 description: Indique si le SEA est partenaire FEG (envoyé comme "true" ou "false")
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Fichier image du logo du SEA (JPEG ou PNG uniquement)
 *     responses:
 *       201:
 *         description: SEA créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SEAS'
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
 *                       value: "Les champs nom, type_sea et categorie sont requis."
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
 *                       value: "Erreur lors de la création"
 */

export async function POST(request: Request) {
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
    
    // Récupération des données du formulaire
    const nom = formData.get('nom') as string;
    const type_sea = formData.get('type_sea') as string;
    const categorie = formData.get('categorie') as string;
    const description = formData.get('description') as string || '';
    const services = JSON.parse(formData.get('services') as string || '[]');
    const adresse = formData.get('adresse') as string || '';
    const contact = formData.get('contact') as string || null;
    const mail = formData.get('mail') as string || null;
    const site_web = formData.get('site_web') as string || null;
    const rs_1 = formData.get('rs_1') as string || null;
    const rs_2 = formData.get('rs_2') as string || null;
    const partenaire_feg = formData.get('partenaire_feg') === 'true';

    // Validation des champs requis
    if (!nom || !type_sea || !categorie) {
      return NextResponse.json(
        { error: 'Les champs nom, type_sea et categorie sont requis.' },
        { status: 400 }
      );
    }

    let logo_url = null;
    let logo_nom = null;

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

      // Création d'un nom unique pour le fichier
      const timestamp = Date.now();
      const fileName = `${timestamp}-${logo.name.replace(/\s+/g, '-')}`;
      const filePath = `sea/${fileName}`;

      // Upload du fichier vers Supabase Storage
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

      logo_url = urlData.publicUrl;
      logo_nom = logo.name;
    }

    // Création dans la base de données
    const newSea = await prisma.sEA.create({
      data: {
        nom,
        description,
        type_sea,
        categorie,
        services,
        adresse,
        contact,
        mail,
        site_web,
        rs_1,
        rs_2,
        logo_url,
        logo_nom,
        partenaire_feg,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return NextResponse.json(newSea, { status: 201 });
  } catch (error) {
    console.error('Erreur lors de la création:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création' },
      { status: 500 }
    );
  }
}
