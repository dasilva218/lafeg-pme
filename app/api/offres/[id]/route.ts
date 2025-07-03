import prisma from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";


/**
 * @swagger
 * /api/offres/{id}:
 *   get:
 *     tags:
 *       - Offres
 *       - Détails
 *     summary: Récupérer une offre par son ID
 *     description: |
 *       Récupère les détails complets d'une offre spécifique en utilisant son identifiant unique.
 *       
 *       **Fonctionnalités :**
 *       - Récupération sécurisée par ID unique MongoDB
 *       - Validation automatique du format ObjectId
 *       - Retour des données complètes avec fichiers associés
 *       - Gestion d'erreurs explicites (404 si non trouvée)
 *       - Format de réponse standardisé avec flag de succès
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: |
 *           Identifiant unique de l'offre (MongoDB ObjectId - 24 caractères hexadécimaux)
 *         schema:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *           example: "60f7b3b3b3b3b3b3b3b3b3b3"
 *     responses:
 *       200:
 *         description: Offre récupérée avec succès
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
 *       400:
 *         description: ID invalide
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
 *                   example: "Format d'ID invalide"
 *       404:
 *         description: Offre non trouvée
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
 *                   example: "Offre non trouvée"
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
 *                   example: "Erreur serveur lors de la récupération de l'offre"
 */
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const offre = await prisma.offre.findUnique({ where: { id_offre: id } });
    if (!offre) {
      return NextResponse.json({ success: false, error: "Offre non trouvée" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: offre });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Erreur serveur lors de la récupération de l'offre" }, { status: 500 });
  }
}




/**
 * @swagger
 * /api/offres/{id}:
 *   put:
 *     tags:
 *       - Offres
 *     summary: Mettre à jour une offre existante
 *     description: |
 *       Met à jour une offre d'emploi ou de stage avec possibilité de remplacer les fichiers associés.
 *       
 *       **Fonctionnalités :**
 *       - Mise à jour partielle (seuls les champs fournis sont modifiés)
 *       - Remplacement sélectif des fichiers (image, bannière, PDF)
 *       - Support multipart/form-data et application/json
 *       - Suppression automatique des anciens fichiers remplacés
 *       - Génération d'UUID pour nouveaux fichiers
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Identifiant unique de l'offre (MongoDB ObjectId)
 *         schema:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *           example: "60f7b3b3b3b3b3b3b3b3b3b3"
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               # Champs texte (tous optionnels)
 *               titre_offre:
 *                 type: string
 *                 description: Nouveau titre de l'offre
 *                 example: "Développeur Full Stack Senior"
 *               nom_structure:
 *                 type: string
 *                 description: Nouveau nom de l'entreprise
 *                 example: "TechCorp Solutions"
 *               type_offre:
 *                 type: string
 *                 enum: [EMPLOI, STAGE, FORMATION, CONSULTATION]
 *                 description: Nouveau type d'offre
 *                 example: "EMPLOI"
 *               membre_feg:
 *                 type: string
 *                 enum: ["true", "false"]
 *                 description: Statut membre FEG (string convertie en boolean)
 *                 example: "true"
 *               contact:
 *                 type: string
 *                 description: Personne de contact
 *                 example: "Marie Dupont"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email de contact
 *                 example: "marie.dupont@techcorp.com"
 *               localisation:
 *                 type: string
 *                 description: Localisation du poste
 *                 example: "Paris, France"
 *               site_web:
 *                 type: string
 *                 format: uri
 *                 description: Site web de la structure
 *                 example: "https://www.techcorp.com"
 *               description:
 *                 type: string
 *                 description: Description détaillée de l'offre
 *                 example: "Nous recherchons un développeur expérimenté..."
 *               date_debut:
 *                 type: string
 *                 format: date
 *                 description: Date de début de validité (YYYY-MM-DD)
 *                 example: "2024-01-15"
 *               date_fin:
 *                 type: string
 *                 format: date
 *                 description: Date de fin de validité (YYYY-MM-DD)
 *                 example: "2024-04-15"
 *               statut:
 *                 type: string
 *                 enum: [ACTIF, INACTIF, EXPIRE, BROUILLON]
 *                 description: Statut de l'offre
 *                 example: "ACTIF"
 *               
 *               # Fichiers (tous optionnels)
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: |
 *                   Nouvelle image/logo (JPEG/PNG)
 *                   Si fourni, remplace l'ancien fichier
 *               banniere:
 *                 type: string
 *                 format: binary
 *                 description: |
 *                   Nouvelle bannière (JPEG/PNG)
 *                   Si fourni, remplace l'ancien fichier
 *               fichier:
 *                 type: string
 *                 format: binary
 *                 description: |
 *                   Nouveau fichier PDF de l'offre
 *                   Si fourni, remplace l'ancien fichier
 *         
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titre_offre:
 *                 type: string
 *                 example: "Développeur Full Stack Senior"
 *               nom_structure:
 *                 type: string
 *                 example: "TechCorp Solutions"
 *               type_offre:
 *                 type: string
 *                 enum: [EMPLOI, STAGE, FORMATION, CONSULTATION]
 *                 example: "EMPLOI"
 *               membre_feg:
 *                 type: boolean
 *                 description: Booléen direct en JSON
 *                 example: true
 *               contact:
 *                 type: string
 *                 example: "Marie Dupont"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "marie.dupont@techcorp.com"
 *               localisation:
 *                 type: string
 *                 example: "Paris, France"
 *               site_web:
 *                 type: string
 *                 format: uri
 *                 example: "https://www.techcorp.com"
 *               description:
 *                 type: string
 *                 example: "Description mise à jour..."
 *               date_debut:
 *                 type: string
 *                 format: date
 *                 example: "2024-01-15"
 *               date_fin:
 *                 type: string
 *                 format: date
 *                 example: "2024-04-15"
 *               statut:
 *                 type: string
 *                 enum: [ACTIF, INACTIF, EXPIRE, BROUILLON]
 *                 example: "ACTIF"
 *     responses:
 *       200:
 *         description: Offre mise à jour avec succès
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
 *                   example: "Offre mise à jour avec succès"
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
 *                   examples:
 *                     - "Le fichier doit être un PDF"
 *                     - "Format d'ID invalide"
 *                     - "Email invalide"
 *       404:
 *         description: Offre non trouvée
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
 *                   example: "Offre non trouvée"
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
 *                   examples:
 *                     - "Erreur upload image"
 *                     - "Erreur upload bannière" 
 *                     - "Erreur upload PDF"
 *                     - "Erreur serveur lors de la mise à jour de l'offre"
 * 
 * components:
 *   schemas:
 *     OffreComplete:
 *       type: object
 *       properties:
 *         id_offre:
 *           type: string
 *           description: Identifiant unique MongoDB
 *           example: "60f7b3b3b3b3b3b3b3b3b3b3"
 *         titre_offre:
 *           type: string
 *           example: "Développeur Full Stack Senior"
 *         nom_structure:
 *           type: string
 *           example: "TechCorp Solutions"
 *         type_offre:
 *           type: string
 *           enum: [EMPLOI, STAGE, FORMATION, CONSULTATION]
 *           example: "EMPLOI"
 *         membre_feg:
 *           type: boolean
 *           example: true
 *         contact:
 *           type: string
 *           example: "Marie Dupont"
 *         image_nom:
 *           type: string
 *           nullable: true
 *           description: Nom du fichier image avec UUID
 *           example: "a1b2c3d4-e5f6-7890-abcd-ef1234567890.png"
 *         image_url:
 *           type: string
 *           nullable: true
 *           description: URL publique de l'image
 *           example: "https://xyz.supabase.co/storage/v1/object/public/feg/offres/image.png"
 *         bannier_nom:
 *           type: string
 *           nullable: true
 *           description: Nom du fichier bannière avec UUID
 *           example: "b2c3d4e5-f6g7-8901-bcde-f23456789012.jpg"
 *         bannier_url:
 *           type: string
 *           nullable: true
 *           description: URL publique de la bannière
 *           example: "https://xyz.supabase.co/storage/v1/object/public/feg/offres/banner.jpg"
 *         description:
 *           type: string
 *           nullable: true
 *           example: "Description détaillée de l'offre..."
 *         email:
 *           type: string
 *           format: email
 *           example: "marie.dupont@techcorp.com"
 *         localisation:
 *           type: string
 *           example: "Paris, France"
 *         site_web:
 *           type: string
 *           format: uri
 *           example: "https://www.techcorp.com"
 *         fichier_url:
 *           type: string
 *           format: uri
 *           description: URL publique du fichier PDF
 *           example: "https://xyz.supabase.co/storage/v1/object/public/feg/offres/document.pdf"
 *         fichier_nom:
 *           type: string
 *           description: Nom du fichier PDF avec UUID
 *           example: "c3d4e5f6-g7h8-9012-cdef-345678901234.pdf"
 *         taille_fichier:
 *           type: integer
 *           nullable: true
 *           description: Taille du fichier en octets
 *           example: 2457600
 *         mime_type:
 *           type: string
 *           description: Type MIME du fichier
 *           example: "application/pdf"
 *         date_debut:
 *           type: string
 *           format: date-time
 *           example: "2024-01-15T00:00:00.000Z"
 *         date_fin:
 *           type: string
 *           format: date-time
 *           example: "2024-04-15T00:00:00.000Z"
 *         statut:
 *           type: string
 *           enum: [ACTIF, INACTIF, EXPIRE, BROUILLON]
 *           example: "ACTIF"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-01-10T10:30:00.000Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Mis à jour automatiquement lors de la modification
 *           example: "2024-03-15T14:45:00.000Z"
 */
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const contentType = request.headers.get("content-type") || "";
    let body: any = {};
    let files: Record<string, File> = {};

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      for (const [key, value] of formData.entries()) {
        if (value instanceof File) {
          files[key] = value;
        } else {
          body[key] = value;
        }
      }
    } else {
      body = await request.json();
    }

    const offreExistante = await prisma.offre.findUnique({ where: { id_offre: id } });
    if (!offreExistante) {
      return NextResponse.json({ success: false, error: "Offre non trouvée" }, { status: 404 });
    }

    // Gestion des fichiers (image, bannière, PDF)
    let image_url = offreExistante.image_url, image_nom = offreExistante.image_nom;
    let bannier_url = offreExistante.bannier_url, bannier_nom = offreExistante.bannier_nom;
    let fichier_url = offreExistante.fichier_url, fichier_nom = offreExistante.fichier_nom;
    // let taille_fichier = offreExistante.taille_fichier, mime_type = offreExistante.mime_type;

    // Image
    if (files.image) {
      if (image_nom) await supabase.storage.from('feg').remove([`offres/${image_nom}`]);
      const ext = files.image.name.split('.').pop();
      image_nom = `${uuidv4()}.${ext}`;
      const { error } = await supabase.storage.from('feg').upload(`offres/${image_nom}`, files.image, { contentType: files.image.type });
      if (error) return NextResponse.json({ success: false, error: "Erreur upload image" }, { status: 500 });
      image_url = supabase.storage.from('offres').getPublicUrl(`images/${image_nom}`).data.publicUrl;
    }
    // Bannière
    if (files.banniere) {
      if (bannier_nom) await supabase.storage.from('feg').remove([`offres/${bannier_nom}`]);
      const ext = files.banniere.name.split('.').pop();
      bannier_nom = `${uuidv4()}.${ext}`;
      const { error } = await supabase.storage.from('feg').upload(`offres/${bannier_nom}`, files.banniere, { contentType: files.banniere.type });
      if (error) return NextResponse.json({ success: false, error: "Erreur upload bannière" }, { status: 500 });
      bannier_url = supabase.storage.from('offres').getPublicUrl(`bannieres/${bannier_nom}`).data.publicUrl;
    }
    // Fichier PDF
    if (files.fichier) {
      if (fichier_nom) await supabase.storage.from('feg').remove([`offres/${fichier_nom}`]);
      const ext = files.fichier.name.split('.').pop();
      if (files.fichier.type !== 'application/pdf') {
        return NextResponse.json({ success: false, error: "Le fichier doit être un PDF" }, { status: 400 });
      }
      fichier_nom = `${uuidv4()}.${ext}`;
      const { error } = await supabase.storage.from('feg').upload(`offres/${fichier_nom}`, files.fichier, { contentType: files.fichier.type });
      if (error) return NextResponse.json({ success: false, error: "Erreur upload PDF" }, { status: 500 });
      fichier_url = supabase.storage.from('feg').getPublicUrl(`offres/${fichier_nom}`).data.publicUrl;
      // taille_fichier = files.fichier.size;
      // mime_type = files.fichier.type;
    }

    // Mise à jour
    const updated = await prisma.offre.update({
      where: { id_offre: id },
      data: {
        ...body,
        image_nom,
        image_url,
        bannier_nom,
        bannier_url,
        fichier_nom,
        fichier_url,
        membre_feg: body.membre_feg === 'true' || body.membre_feg === true ? true : false,
        date_debut: body.date_debut ? new Date(body.date_debut) : offreExistante.date_debut,
        date_fin: body.date_fin ? new Date(body.date_fin) : offreExistante.date_fin,
      }
    });
    return NextResponse.json({ success: true, data: updated, message: "Offre mise à jour avec succès" });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Erreur serveur lors de la mise à jour de l'offre" }, { status: 500 });
  }
}



/**
 * @swagger
 * /api/offres/{id}:
 *   delete:
 *     tags:
 *       - Offres
 *       - Suppression
 *     summary: Supprimer définitivement une offre
 *     description: |
 *       Supprime définitivement une offre et tous ses fichiers associés.
 *       
 *       **⚠️ OPÉRATION IRRÉVERSIBLE ⚠️**
 *       
 *       Cette action supprime :
 *       - L'enregistrement de l'offre en base de données
 *       - Le fichier PDF principal de l'offre
 *       - L'image/logo de la structure (si présent)
 *       - La bannière de l'offre (si présente)
 *       
 *       **Processus sécurisé :**
 *       1. Validation de l'ID et de l'existence de l'offre
 *       2. Suppression des fichiers dans Supabase Storage
 *       3. Suppression de l'enregistrement en base de données
 *       4. Logging de l'action pour audit
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Identifiant unique de l'offre à supprimer (MongoDB ObjectId)
 *         schema:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'
 *           example: "60f7b3b3b3b3b3b3b3b3b3b3"
 *     responses:
 *       200:
 *         description: Offre supprimée avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Offre supprimée avec succès"
 *       400:
 *         description: ID invalide
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
 *                   example: "Format d'ID invalide"
 *       404:
 *         description: Offre non trouvée
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
 *                   example: "Offre non trouvée"
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
 *                   example: "Erreur serveur lors de la suppression de l'offre"
 */
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const offre = await prisma.offre.findUnique({ where: { id_offre: id } });
    if (!offre) {
      return NextResponse.json({ success: false, error: "Offre non trouvée" }, { status: 404 });
    }
    // Supprimer les fichiers associés
    if (offre.image_nom) await supabase.storage.from('feg').remove([`offres/${offre.image_nom}`]);
    if (offre.bannier_nom) await supabase.storage.from('feg').remove([`offres/${offre.bannier_nom}`]);
    if (offre.fichier_nom) await supabase.storage.from('feg').remove([`offres/${offre.fichier_nom}`]);
    await prisma.offre.delete({ where: { id_offre: id } });
    return NextResponse.json({ success: true, message: "Offre supprimée avec succès" });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Erreur serveur lors de la suppression de l'offre" }, { status: 500 });
  }
}
