const API_BASE_URL = "/api/offres";

// --- Typage des Offres ---
export interface Offre {
  id_offre: string
  titre_offre: string;
  nom_structure: string;
  type_offre: "EMPLOI" | "STAGE" | "FORMATION" | "CONSULTATION";
  membre_feg: boolean;
  contact: string;
  email: string;
  localisation: string;
  site_web: string;
  date_debut: string;
  date_fin: string;
  statut: "ACTIF" | "INACTIF" | "ARCHIVE";
  description?: string;
  image_url?: string;
  image_nom?: string;
  bannier_url?: string;
  bannier_nom?: string;
  fichier_url: string;
  fichier_nom: string;
  taille_fichier?: number;
  mime_type?: string;
  createdAt: string;
  updatedAt: string;
}

// --- Créer une nouvelle offre ---
export async function createOffre(form: FormData): Promise<Offre> {
  try {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      body: form,
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(`Erreur création offre : ${json.error}`);
    }

    return json.data;
  } catch (error) {
    console.error("Erreur createOffre:", error);
    throw error;
  }
}

// --- Lire toutes les offres avec pagination et filtres ---
export async function fetchOffres(params: {
  page?: number;
  limit?: number;
  type_offre?: string;
  membre_feg?: boolean;
  statut?: string;
  localisation?: string;
  search?: string;
} = {}): Promise<{
  data: Offre[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}> {
  try {
    const query = new URLSearchParams();

    if (params.page) query.append("page", String(params.page));
    if (params.limit) query.append("limit", String(params.limit));
    if (params.type_offre) query.append("type_offre", params.type_offre);
    if (params.membre_feg !== undefined) query.append("membre_feg", String(params.membre_feg));
    if (params.statut) query.append("statut", params.statut);
    if (params.localisation) query.append("localisation", params.localisation);
    if (params.search) query.append("search", params.search);

    const response = await fetch(`${API_BASE_URL}?${query.toString()}`);

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des offres');
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur fetchOffres:", error);
    throw error;
  }
}

// --- Lire une offre par ID ---
export async function fetchOffreById(id: string): Promise<Offre> {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`);

    if (!response.ok) {
      throw new Error("Offre introuvable");
    }

    return await response.json();
  } catch (error) {
    console.error("Erreur fetchOffreById:", error);
    throw error;
  }
}

// --- Mettre à jour une offre ---
export async function updateOffre(id: string, form: FormData): Promise<Offre> {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    body: form,
  });

  if (!response.ok) {
    const errText = await response.text();
    console.error("Erreur serveur:", errText);
    throw new Error("Erreur serveur lors de la mise à jour de l'offre");
  }

  return response.json();
}


// --- Supprimer une offre ---
export async function deleteOffre(id: string): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error("Erreur lors de la suppression de l'offre");
    }
  } catch (error) {
    console.error("Erreur deleteOffre:", error);
    throw error;
  }
}
