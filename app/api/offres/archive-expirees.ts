// Fichier : pages/api/offres/archive-expirees.ts
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma"; // Assure-toi que ce chemin est correct selon ton projet

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Optionnel : sécuriser la route avec une clé API en GET
  const apiKey = req.headers["x-api-key"];
  if (apiKey !== process.env.MY_SECRET_API_KEY) {
    return res.status(401).json({ error: "Accès non autorisé" });
  }

  try {
    const now = new Date();

    const result = await prisma.offre.updateMany({
      where: {
        date_fin: { lt: now },
        statut: { not: "ARCHIVE" },
      },
      data: {
        statut: "ARCHIVE",
      },
    });

    res.status(200).json({ message: `Succès: ${result.count} offres archivées.` });
  } catch (error: any) {
    console.error("Erreur lors de l'archivage automatique:", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
}
