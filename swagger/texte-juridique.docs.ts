/**
 * @swagger
 * components:
 *   schemas:
 *     TexteJuridique:
 *       type: object
 *       required:
 *         - id_texte
 *         - titre
 *         - type_texte
 *         - fichier_url
 *         - fichier_nom
 *         - categorie
 *         - date_parution
 *       properties:
 *         id_texte:
 *           type: string
 *           description: Identifiant unique du texte juridique
 *         titre:
 *           type: string
 *           description: Titre du texte juridique
 *         type_texte:
 *           type: string
 *           description: Type de texte (loi, décret, arrêté, etc.)
 *         fichier_url:
 *           type: string
 *           description: URL d'accès au fichier PDF
 *         fichier_nom:
 *           type: string
 *           description: Nom du fichier sur le serveur
 *         taille_fichier:
 *           type: integer
 *           description: Taille du fichier en octets
 *         mime_type:
 *           type: string
 *           description: Type MIME du fichier
 *         categorie:
 *           type: string
 *           description: Catégorie du texte
 *         description:
 *           type: string
 *           nullable: true
 *           description: Description du texte
 *         date_parution:
 *           type: string
 *           format: date-time
 *           description: Date de parution du texte
 *         version:
 *           type: string
 *           nullable: true
 *           description: Version du texte
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date de création dans le système
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date de dernière modification
 */