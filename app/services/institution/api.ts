// src/services/api.ts
const API_BASE_URL = "/api/institutions";

export interface Institutions {
  id_institution: string;
  nom: string;
  categorie: string;
  type_institution?: string;
  partenaire_feg?: boolean;
  description: string;
  image_url: string;
  image_nom: string;
  taille_image: number;
  image_mime_type: "image/jpeg";
  adresse: string;
  contact: string;
  mail: string;
  site_web: string;
  rs_1?: string;
  rs_2?: string;
  service?: string;
  createdAt: string;
  updatedAt: string;
  imageFile: File | null;
}

// CREATE - Créer une nouvelle institution
export async function createFinancialInstitution(
  data: Omit<Institutions, 'id_institution' | 'createdAt' | 'updatedAt'>
): Promise<Institutions> {
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

// READ - Récupérer toutes les institutions
export async function fetchFinancialInstitutions(): Promise<Institutions[]> {
  const response = await fetch(API_BASE_URL);
  
  if (!response.ok) {
    throw new Error(`Erreur HTTP! statut: ${response.status}`);
  }
  
  const json = await response.json();
 // console.log("✅ Données reçues :", json);  Tu peux garder ça pour test
  // return json.data;
  return json.content;
}

// READ - Récupérer une institution par ID
export async function fetchFinancialInstitutionById(
  id_institution: number
): Promise<Institutions> {
  const response = await fetch(`${API_BASE_URL}/${id_institution}`);
  
  if (!response.ok) {
    throw new Error(`Institution non trouvée (ID: ${id_institution})`);
  }
  
  return response.json();
}

// UPDATE - Mettre à jour une institution
export async function updateFinancialInstitution(
  id_institution: string,
  data: Partial<Institutions>
): Promise<Institutions> {
  const response = await fetch(`${API_BASE_URL}/${id_institution}`, {
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

// DELETE - Supprimer une institution
export async function deleteFinancialInstitution(
  id: string
): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`Erreur lors de la suppression: ${response.statusText}`);
  }
}

// Recherche avancée avec filtres optionnels
export async function searchFinancialInstitutions(
  filters: {
    categorie?: Institutions['categorie'];
    searchTerm?: string;
    partenaireFeg?: boolean;
  }
): Promise<Institutions[]> {
  const params = new URLSearchParams();
  
  if (filters.categorie) params.append('categorie', filters.categorie);
  if (filters.searchTerm) params.append('search', filters.searchTerm);
  if (filters.partenaireFeg !== undefined) params.append('partenaire_feg', String(filters.partenaireFeg));

  const response = await fetch(`${API_BASE_URL}/search?${params.toString()}`);
  
  if (!response.ok) {
    throw new Error(`Erreur de recherche: ${response.statusText}`);
  }
  
  return response.json();
}