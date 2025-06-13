"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormCreerPublicite } from "@/components/ads/FormCreerPublicite";
import { FormModifierPublicite } from "@/components/ads/FormModifierPublicite";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { fetchAllPublicites, Publicite } from "@/app/services/publicite/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Edit, Trash2, Search, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { DeleteConfirmationDialog } from "@/components/ads/DeleteConfirmationDialog";

type Props = {
  trigger: React.ReactNode;
  onConfirm: () => Promise<void>;
};

export default function PublicitesPage({ trigger, onConfirm }: Props) {
  const [publicites, setPublicites] = useState<Publicite[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [publiciteId, setPubliciteId] = useState<string | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedPublicite, setSelectedPublicite] = useState<any | null>(null);

  //   const [statusFilter, setStatusFilter] = useState("all");
  //   const [typeFilter, setTypeFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPublicite, setEditingPublicite] = useState<Publicite | null>(
    null
  );
  const [formValues, setFormValues] = useState({
    libelle: "",
    nom_structure: "",
    imageFile: null as File | null,
  });

  useEffect(() => {
    fetchPublicites();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllPublicites();
        setPublicites(data);
      } catch (error) {
        console.error("Erreur lors du chargement :", error);
      }
    };

    fetchData();
  }, []);

  const fetchPublicites = async () => {
    try {
      const response = await fetch("/api/publicites");
      if (response.ok) {
        const data = await response.json();
        setPublicites(Array.isArray(data) ? data : data.publicites || []);
      }
    } catch (error) {
      console.error("Erreur lors du chargement des publicités:", error);
      toast.error("Erreur lors du chargement des publicités");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (publicite: any) => {
    setPubliciteId(publicite.id_publicite);
    setFormValues({
      libelle: publicite.libelle,
      nom_structure: publicite.nom_structure || "",
      imageFile: null, // pas de fichier sélectionné par défaut
    });
    setExistingImageUrl(publicite.image_url || null);
    setIsEditing(true);
    setSelectedPublicite(publicite);
    setIsEditDialogOpen(true);
  };



  const filteredPublicites = publicites.filter((pub) => {
    const matchesSearch =
      typeof pub.libelle === "string" &&
      pub.libelle.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  if (loading && publicites.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#063a1e] mx-auto"></div>
          <p className="mt-2 text-gray-600">Chargement des publicités...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* <pre className="text-xs text-gray-500 bg-gray-100 p-2 rounded max-h-64 overflow-auto">
        {JSON.stringify(publicites, null, 2)}
      </pre> */}

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Gestion des Publicités
          </h1>
          <p className="text-gray-600">
            Gérez les publicités affichées sur le site
          </p>
        </div>
        {/* ajouter une nouvelle publicité */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                setEditingPublicite(null);
                setIsDialogOpen(true);
              }}
            >
              <Plus className="mr-2" /> Nouvelle publicité
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingPublicite
                  ? "Modifier la publicité"
                  : "Créer une nouvelle publicité"}
              </DialogTitle>
              <DialogDescription>
                {editingPublicite
                  ? "Modifiez les informations de la publicité"
                  : "Remplissez les informations pour créer une nouvelle publicité"}
              </DialogDescription>
            </DialogHeader>

            {editingPublicite ? (
              <FormModifierPublicite
                publicite={editingPublicite}
                onSuccess={() => {
                  setIsDialogOpen(false);
                  fetchPublicites(); // ou autre rechargement
                }}
              />
            ) : (
              <FormCreerPublicite
                onSuccess={() => {
                  setIsDialogOpen(false);
                  fetchPublicites();
                }}
              />
            )}
          </DialogContent>
        </Dialog>
        {/* modifier pub */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Modifier la publicité</DialogTitle>
              <DialogDescription>
                Modifiez les informations de la publicité sélectionnée
              </DialogDescription>
            </DialogHeader>

            {selectedPublicite && (
              <FormModifierPublicite
                publicite={selectedPublicite}
                onSuccess={() => {
                  setIsEditDialogOpen(false);
                  fetchPublicites(); // ou rechargement de la liste
                }}
              />
            )}
          </DialogContent>
        </Dialog>
    
      </div>

      {/* Filtres */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filtres</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <Label htmlFor="search">Rechercher</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Rechercher par titre..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 max-w-[400px]"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tableau des publicités */}
      <Card>
        <CardHeader>
          <CardTitle>Publicités ({filteredPublicites.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Titre</TableHead>
                  <TableHead>Image</TableHead>
                  <TableHead>Nom de la structure</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPublicites.map((publicite) => (
                  <TableRow key={publicite.id_publicite}>
                    <TableCell className="font-medium">
                      {publicite.libelle}
                    </TableCell>

                    <TableCell>
                      <Image
                        className="object-cover object-center"
                        src={publicite.image_url || "/placeholder.png"}
                        width={50}
                        height={50}
                        alt={publicite.libelle || "Publicité"}
                      />
                    </TableCell>

                    <TableCell>{publicite.nom_structure}</TableCell>

                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(publicite)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                     
                        <DeleteConfirmationDialog
                          trigger={
                            <Button variant="destructive" size="sm">
                              Supprimer
                            </Button>
                          }
                          onConfirm={async () => {
                            const response = await fetch(
                              `/api/publicites/${publicite.id_publicite}`,
                              {
                                method: "DELETE",
                              }
                            );

                            if (!response.ok) {
                              throw new Error("Erreur lors de la suppression");
                            }

                            fetchPublicites(); // Recharge les données après suppression
                          }}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {filteredPublicites.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                Aucune publicité trouvée
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
