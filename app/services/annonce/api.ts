// src/services/publiciteApi.ts

const API_BASE_URL = "/api/annonce";

export interface Annonce {
  id_publicite: string;
  libelle: string;
  nom_structure: string;
  image_url?: string | null;
  image_nom?: string | null;
  createdAt: string;
  updatedAt: string;
  imageFile: File | null;
}

// CREATE - Créer une nouvelle publicité
export async function createPublicite(data: FormData) {
  const res = await fetch("/api/annonce", {
    method: "POST",
    body: data, // Pas de JSON.stringify ici
  });

  if (!res.ok) {
    throw new Error("Erreur lors de la création: " + res.statusText);
  }

  return await res.json();
}


// READ - Récupérer toutes les publicités
export async function fetchAllPublicites(): Promise<Annonce[]> {
  const response = await fetch(API_BASE_URL);

  if (!response.ok) {
    throw new Error(`Erreur HTTP! statut: ${response.status}`);
  }

  const raw = await response.json();
  const data = Array.isArray(raw) ? raw : raw.data;

  if (!Array.isArray(data)) {
    throw new Error("❌ Les données récupérées ne sont pas un tableau !");
  }

  return data;
}

// READ - Récupérer une publicité par ID
export async function fetchPubliciteById(id: string): Promise<Annonce> {
  const response = await fetch(`${API_BASE_URL}/${id}`);

  if (!response.ok) {
    throw new Error(`Publicité non trouvée (ID: ${id})`);
  }

  return response.json();
}

// UPDATE (PUT) - Mettre à jour complètement une publicité
export async function updatePubliciteWithImage(
  id: string,
  formData: FormData
): Promise<Annonce> {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    body: formData, // pas de headers ici
  });

  if (!response.ok) {
    throw new Error(`Erreur lors de la mise à jour: ${response.statusText}`);
  }

  return response.json();
}

// PATCH - Mise à jour partielle
export async function patchPublicite(id: string, data: Partial<Annonce>) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Erreur PATCH: ${response.statusText}`);
  }

  return response.json();
}

// DELETE - Supprimer une publicité
export async function deletePublicite(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Erreur lors de la suppression: ${response.statusText}`);
  }
}
