// src/services/seaApi.ts

const API_BASE_URL = "/api/sea";

export interface SEA {
  id_sea: string;
  nom: string;
  description: string;
  type_sea: string;
  categorie: string;
  services: string[];
  adresse: string;
  contact?: string | null;
  mail?: string | null;
  site_web?: string | null;
  rs_1?: string | null;
  rs_2?: string | null;
  logo_url?: string | null;
  logo_nom?: string | null;
  fichier?: File | null;
  partenaire_feg?: boolean;
  createdAt: string;
  updatedAt: string;
}

// CREATE - Créer une nouvelle SEA
export async function createSEA(
  data: Omit<SEA, 'id_sea' | 'createdAt' | 'updatedAt'>
): Promise<SEA> {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Erreur lors de la création: ${response.statusText}`);
  }

  return response.json();
}

// READ - Récupérer toutes les SEA
export async function fetchAllSEAs(): Promise<SEA[]> {
  const response = await fetch(API_BASE_URL);

  if (!response.ok) {
    throw new Error(`Erreur HTTP! statut: ${response.status}`);
  }

  // const data = await response.json();
  // console.log("✅ Données reçues :", data); // Pour le débogage, tu peux garder ça
  

  const raw = await response.json();
  console.log("✅ Données brutes reçues :", raw);

  // Cas où la réponse est enveloppée
  const data = Array.isArray(raw) ? raw : raw.data;

  if (!Array.isArray(data)) {
    throw new Error("❌ Les données récupérées ne sont pas un tableau !");
  }

  return data; // Assurez-vous que la structure de la réponse est correcte
}

// READ - Récupérer une SEA par ID
export async function fetchSEAById(id: string): Promise<SEA> {
  const response = await fetch(`${API_BASE_URL}/${id}`);

  if (!response.ok) {
    throw new Error(`SEA non trouvée (ID: ${id})`);
  }

  return response.json();
}

// UPDATE (PUT) - Remplacer complètement une SEA
export async function updateSEA(
  id: string,
  data: Partial<SEA>
): Promise<SEA> {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Erreur lors de la mise à jour: ${response.statusText}`);
  }

  return response.json();
}

// PATCH - Mise à jour partielle
export async function patchSEA(
  id: string,
  data: Partial<SEA>
): Promise<SEA> {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Erreur lors de la modification partielle: ${response.statusText}`);
  }

  return response.json();
}

// DELETE - Supprimer une SEA
export async function deleteSEA(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`Erreur lors de la suppression: ${response.statusText}`);
  }
}
