import { NextResponse } from "next/server";
import  prisma  from "@/lib/prisma";

export async function POST(req: Request) {
  const apiKey = req.headers.get("x-api-key");
  if (apiKey !== process.env.MY_SECRET_API_KEY) {
    return NextResponse.json({ error: "Clé API invalide" }, { status: 401 });
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

    return NextResponse.json({
      message: "Archivage terminé",
      nb_offres_archivées: result.count,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
