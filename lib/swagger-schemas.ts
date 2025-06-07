/**
 * @swagger
 * components:
 *   schemas:
 *     Institution:
 *       type: object
 *       required:
 *         - nom
 *         - categorie
 *         - type_institution
 *       properties:
 *         id_institution:
 *           type: string
 *           description: Identifiant unique de l'institution (généré automatiquement)
 *         nom:
 *           type: string
 *           description: Nom de l'institution financière
 *         categorie:
 *           type: string
 *           description: Catégorie de l'institution
 *         type_institution:
 *           type: string
 *           description: Type d'institution
 *         partenaire_feg:
 *           type: boolean
 *           nullable: true
 *           description: Indique si l'institution est partenaire FEG
 *         description:
 *           type: string
 *           nullable: true
 *           description: Description détaillée de l'institution
 *         image_url:
 *           type: string
 *           nullable: true
 *           description: URL ou chemin vers l'image du logo stockée
 *         image_nom:
 *           type: string
 *           nullable: true
 *           description: Nom original du fichier image
 *         taille_image:
 *           type: integer
 *           nullable: true
 *           description: Taille de l'image en octets
 *         image_mime_type:
 *           type: string
 *           nullable: true
 *           description: Type MIME de l'image
 *           default: image/jpeg
 *         adresse:
 *           type: string
 *           nullable: true
 *           description: Adresse physique de l'institution
 *         contact:
 *           type: string
 *           nullable: true
 *           description: Numéro de contact de l'institution
 *         mail:
 *           type: string
 *           nullable: true
 *           description: Adresse email de l'institution
 *         site_web:
 *           type: string
 *           nullable: true
 *           description: Site web de l'institution
 *         rs_1:
 *           type: string
 *           nullable: true
 *           description: Lien vers le premier réseau social
 *         rs_2:
 *           type: string
 *           nullable: true
 *           description: Lien vers le deuxième réseau social
 *         service:
 *           type: string
 *           nullable: true
 *           description: Services offerts par l'institution
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date de création de l'enregistrement
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date de dernière mise à jour
 *     
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Publicite:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Identifiant unique de la publicité
 *         # Ajoutez ici tous les champs de votre modèle Publicite
 *         # Par exemple:
 *         titre:
 *           type: string
 *           description: Titre de la publicité
 *         description:
 *           type: string
 *           description: Description de la publicité
 *         image_url:
 *           type: string
 *           description: URL de l'image de la publicité
 *         lien:
 *           type: string
 *           description: Lien de redirection de la publicité
 *         actif:
 *           type: boolean
 *           description: Indique si la publicité est active
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date de création de la publicité
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date de dernière mise à jour de la publicité
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     SEA:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Identifiant unique du SEA
 *         # Ajoutez ici tous les champs de votre modèle SEA selon votre schéma Prisma
 *         # Par exemple (à adapter selon votre modèle réel):
 *         nom:
 *           type: string
 *           description: Nom du SEA
 *         description:
 *           type: string
 *           description: Description du SEA
 *         # Ajoutez d'autres champs selon votre modèle
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date de création
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date de dernière mise à jour
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SEAS:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Identifiant unique du SEA
 *         nom:
 *           type: string
 *           description: Nom du SEA
 *         type_sea:
 *           type: string
 *           description: Type de SEA
 *         categorie:
 *           type: string
 *           description: Catégorie du SEA
 *         description:
 *           type: string
 *           description: Description détaillée du SEA
 *         services:
 *           type: array
 *           items:
 *             type: string
 *           description: Liste des services offerts par le SEA
 *         adresse:
 *           type: string
 *           description: Adresse physique du SEA
 *         contact:
 *           type: string
 *           description: Numéro de contact du SEA
 *         mail:
 *           type: string
 *           description: Adresse email du SEA
 *         site_web:
 *           type: string
 *           description: Site web du SEA
 *         rs_1:
 *           type: string
 *           description: Lien vers le premier réseau social
 *         rs_2:
 *           type: string
 *           description: Lien vers le deuxième réseau social
 *         logo_url:
 *           type: string
 *           description: URL de l'image du logo
 *         logo_nom:
 *           type: string
 *           description: Nom original du fichier logo
 *         partenaire_feg:
 *           type: boolean
 *           description: Indique si le SEA est partenaire FEG
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date de création
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date de dernière mise à jour
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     SEAt:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: L'identifiant unique de l'enregistrement SEA
 *         type:
 *           type: string
 *           description: Le type de l'enregistrement SEA
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date de création de l'enregistrement
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date de dernière mise à jour
 *         # Ajoutez d'autres propriétés en fonction de votre modèle de données
 *       required:
 *         - id
 *         - type
 */



/**
 * @swagger
 * components:
 *   schemas:
 *     Publicitee:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Identifiant unique de la publicité
 *         titre:
 *           type: string
 *           description: Titre de la publicité
 *         description:
 *           type: string
 *           description: Description détaillée de la publicité
 *         status:
 *           type: string
 *           enum: [actif, inactif, programmé, terminé]
 *           description: Statut actuel de la publicité
 *         dateDebut:
 *           type: string
 *           format: date-time
 *           description: Date de début de la campagne publicitaire
 *         dateFin:
 *           type: string
 *           format: date-time
 *           description: Date de fin de la campagne publicitaire
 *         url:
 *           type: string
 *           format: uri
 *           description: URL de redirection
 *         imageUrl:
 *           type: string
 *           format: uri
 *           description: URL de l'image publicitaire
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date de création de l'enregistrement
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date de dernière mise à jour
 *       required:
 *         - id
 *         - titre
 *         - status
 */



/**
 * @swagger
 * components:
 *   schemas:
 *     Institutionfinanciere:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Identifiant unique de l'institution
 *         nom:
 *           type: string
 *           description: Nom de l'institution
 *         type:
 *           type: string
 *           description: Type d'institution (ministère, agence, établissement public, etc.)
 *         description:
 *           type: string
 *           description: Description de l'institution
 *         adresse:
 *           type: string
 *           description: Adresse physique de l'institution
 *         telephone:
 *           type: string
 *           description: Numéro de téléphone de contact
 *         email:
 *           type: string
 *           format: email
 *           description: Adresse email de contact
 *         siteWeb:
 *           type: string
 *           format: uri
 *           description: Site web officiel de l'institution
 *         logo:
 *           type: string
 *           format: uri
 *           description: URL du logo de l'institution
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date de création de l'enregistrement
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date de dernière mise à jour
 *       required:
 *         - id
 *         - nom
 *         - type
 */