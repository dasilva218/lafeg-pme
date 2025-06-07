import prisma from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";




/**
 * @swagger
 * /api/publicites:
 *   get:
 *     summary: Récupère une liste paginée des publicités
 *     description: Retourne une liste paginée des publicités avec options de filtrage et de tri
 *     tags:
 *       - Publicités
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
 *         name: status
 *         schema:
 *           type: string
 *         description: Filtre par statut de la publicité (actif, inactif, etc.)
 *       - in: query
 *         name: dateDebut
 *         schema:
 *           type: string
 *           format: date
 *         description: Filtre les publicités débutant après cette date
 *       - in: query
 *         name: dateFin
 *         schema:
 *           type: string
 *           format: date
 *         description: Filtre les publicités se terminant avant cette date
 *     responses:
 *       200:
 *         description: Liste des publicités récupérée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Publicitee'
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
 *         description: Erreur lors de la récupération des publicités
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Erreur lors de la récupération des publicités
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
    
    // Filtrage par statut
    const status = searchParams.get('status');
    if (status) where.status = status;
    
    // Filtrage par date de début
    const dateDebut = searchParams.get('dateDebut');
    if (dateDebut) {
      where.dateDebut = {
        gte: new Date(dateDebut)
      };
    }
    
    // Filtrage par date de fin
    const dateFin = searchParams.get('dateFin');
    if (dateFin) {
      where.dateFin = {
        lte: new Date(dateFin)
      };
    }
    
    // Recherche par mot-clé (exemple sur le titre et la description)
    const keyword = searchParams.get('keyword');
    if (keyword) {
      where.OR = [
        { titre: { contains: keyword, mode: 'insensitive' } },
        { description: { contains: keyword, mode: 'insensitive' } }
      ];
    }
    
    // Exécution des requêtes en parallèle
    const [data, total] = await Promise.all([
      prisma.publicite.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortField]: sortOrder }
      }),
      prisma.publicite.count({ where })
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
    console.error('Erreur lors de la récupération des publicités:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des publicités' }, 
      { status: 500 }
    );
  }
}



/**
 * @swagger
 * /api/publicites:
 *   post:
 *     summary: Crée une nouvelle publicité
 *     description: Crée une nouvelle publicité avec les données fournies dans le formulaire
 *     tags: [Publicités]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               libelle:
 *                 type: string
 *                 description: Libellé de la publicité
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image de la publicité (JPEG ou PNG)
 *               nom_structure:
 *                 type: string
 *                 description: Nom de la structure associée à la publicité
 *     responses:
 *       201:
 *         description: Publicité créée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Publicite'
 *       400:
 *         description: Erreur de validation des données d'entrée
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

export async function POST(request: NextRequest) {
  
  try {
    // Vérifier que la requête est bien de type multipart/form-data
    const ContentType = request.headers.get('content-type')

    if (!ContentType || !ContentType.includes('multipart/form-data')) {
      return NextResponse.json(
        { erreur: 'Le contenu doit être de type multipart/form-data' },
        { status: 400 }
      )
    }

    // Traitement du formulaire
    const formData = await request.formData();
    const file = formData.get('image') as File


    if (!file) {
      return NextResponse.json(
        { erreur: 'Fichier requis' },
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

    // Création d'un nom de fichier unique
    const timestamp = Date.now();
    const fileExtension = file.name.split('.').pop();
    const FileName = `${timestamp}-${file.name.replace(/\s+/g, '-')}`;
    const FilePath = `publicites/${FileName}`;

    // Upload du fichier vers Supabase Storage
    const { data, error } = await supabase.storage
      .from('feg')
      .upload(FilePath, file, {
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

    // Récupération des données du formulaire
    const libelle = formData.get('libelle') as string;
    const nom_structure = formData.get('nom_structure') as string;

    // Créer la publicité dans la base de données
    const publicite = await prisma.publicite.create(
      {
        data: {
          libelle,
          image_url: urlData.publicUrl,
          image_nom: file.name,
          taille_image: file.size,
          mime_type: file.type,
          nom_structure,
        }
      }
    )

    return NextResponse.json(publicite, { status: 201 });

  } catch (error) {

    console.error('Erreur lors de la création de la publicité:', error);

    return NextResponse.json(
      { error: 'Erreur lors de la création de la publicité' },
      { status: 500 }
    );

  }
}

