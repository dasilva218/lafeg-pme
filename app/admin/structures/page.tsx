"use client";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Pencil,
  Trash2,
  Eye,
  XCircle,
  Upload,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  deleteSEA,
  patchSEA,
  updateSEA,
  fetchAllSEAs,
  fetchSEAById,
  createSEA,
  SEA,
} from "@/app/services/sea/api";

import { cn } from "@/lib/utils";
// import { toast } from "@/components/ui/use-toast";

export default function StructuresPage() {
  const { theme, systemTheme } = useTheme();

  const [currentPage, setCurrentPage] = useState(1);
  const [mounted, setMounted] = useState(false);
  const [structures, setStructures] = useState<SEA[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState<boolean>(false);
  const [selectedStructure, setSelectedStructure] = useState<SEA | null>(null);
  const [logoUploading, setLogoUploading] = useState<File | null>(null);
    const [filteredTextes, setFilteredTextes] = useState<SEA[]>([]);

  // Structure par défaut pour la création
  const defaultStructure: Omit<SEA, "id_sea" | "createdAt" | "updatedAt"> & {
    id_sea: string;
    createdAt: string;
    updatedAt: string;
  } = {
    id_sea: "",
    nom: "",
    type_sea: "",
    categorie: "",
    adresse: "",
    contact: null,
    mail: null,
    site_web: null,
    description: "",
    services: [],
    rs_1: null,
    rs_2: null,
    logo_url: null,
    logo_nom: null,
    partenaire_feg: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const itemsPerPage = 5;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTexte = filteredTextes.slice(
    startIndex,
    endIndex
  );

  const totalPages = Math.ceil(filteredTextes.length / itemsPerPage);
  const [newStructure, setNewStructure] = useState<SEA>(defaultStructure);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Charger les données depuis l'API
  useEffect(() => {
    if (!mounted) return;

    const fetchStructures = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/sea");
        if (!response.ok) throw new Error("Erreur lors de la récupération");
        const data = await response.json();
        
        setStructures(data);
      } catch (error) {
        console.error("Error:", error);
        toast.error("Erreur lors du chargement des structures", {
          description: "Veuillez réessayer plus tard.",
        });
        // toast({
        //   title: "Erreur",
        //   description: "Impossible de charger les structures",
        //   variant: "destructive",
        // });
      } finally {
        setLoading(false);
      }
    };

    fetchStructures();
  }, [mounted]);

  // Filtrer les structures
  const filteredStructures = structures.filter((structure) => {
    const matchesSearch =
      structure.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      structure.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      structure.categorie.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "" || structure.type_sea === typeFilter;
    return matchesSearch && matchesType;
  });

  // Créer une nouvelle structure
  const handleAddStructure = async () => {
    try {
      const response = await fetch("/api/sea", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newStructure),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de la création");
      }

      const createdStructure = await response.json();
      setStructures([...structures, createdStructure]);
      setIsAddDialogOpen(false);
      setNewStructure(defaultStructure);

      toast.success("Structure créée avec succès", {
        description: "La structure a été ajoutée à la liste.",});
      // toast({
      //   title: "Succès",
      //   description: "Structure créée avec succès",
      // });
    } catch (error: any) {
      console.error("Error:", error);
      toast.error("Erreur lors de la création de la structure", {
        description: error.message || "Veuillez réessayer plus tard.",
      });
      // toast({
      //   title: "Erreur",
      //   description: error.message || "Erreur lors de la création",
      //   variant: "destructive",
      // });
    }
  };

  // Mettre à jour une structure
  const handleUpdateStructure = async () => {
    if (!selectedStructure) return;

    try {
      const response = await fetch(`/api/sea/${selectedStructure.id_sea}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedStructure),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de la mise à jour");
      }

      const updatedStructure = await response.json();
      setStructures(
        structures.map((s) =>
          s.id_sea === selectedStructure.id_sea ? updatedStructure : s
        )
      );
      setIsEditDialogOpen(false);

      toast.success("Structure mise à jour avec succès", {
        description: "Les informations de la structure ont été mises à jour.",
      });
      // toast({
      //   title: "Succès",
      //   description: "Structure mise à jour avec succès",
      // });
    } catch (error: any) {
      console.error("Error:", error);
      toast.error("Erreur lors de la mise à jour de la structure", {
        description: error.message || "Veuillez réessayer plus tard.",
      });
      // toast({
      //   title: "Erreur",
      //   description: error.message || "Erreur lors de la mise à jour",
      //   variant: "destructive",
      // });
    }
  };

  // Supprimer une structure
  const handleDeleteStructure = async () => {
    if (!selectedStructure) return;

    try {
      const response = await fetch(`/api/sea/${selectedStructure.id_sea}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur lors de la suppression");
      }

      setStructures(structures.filter((s) => s.id_sea !== selectedStructure.id_sea));
      setIsDeleteDialogOpen(false);

      toast.success("Structure supprimée avec succès", {
        description: "La structure a été retirée de la liste.",
      });
      // toast({
      //   title: "Succès",
      //   description: "Structure supprimée avec succès",
      // });
    } catch (error: any) {
      console.error("Error:", error);
      toast.error("Erreur lors de la suppression de la structure", {
        description: error.message || "Veuillez réessayer plus tard.",
      });
      // toast({
      //   title: "Erreur",
      //   description: error.message || "Erreur lors de la suppression",
      //   variant: "destructive",
      // });
    }
  };

  // Gérer les changements dans les formulaires
  const handleNewStructureChange = (field: keyof SEA, value: any) => {
    setNewStructure((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEditStructureChange = (field: keyof SEA, value: any) => {
    if (!selectedStructure) return;
    setSelectedStructure((prev) => ({
      ...prev!,
      [field]: value,
    }));
  };

  // Gérer les services
  const handleServiceChange = (
    index: number,
    value: string,
    isNew: boolean = true
  ) => {
    if (isNew) {
      const newServices = [...newStructure.services];
      newServices[index] = value;
      handleNewStructureChange("services", newServices);
    } else {
      if (!selectedStructure) return;
      const newServices = [...selectedStructure.services];
      newServices[index] = value;
      handleEditStructureChange("services", newServices);
    }
  };

  const addService = (isNew: boolean = true) => {
    if (isNew) {
      handleNewStructureChange("services", [...newStructure.services, ""]);
    } else {
      if (!selectedStructure) return;
      handleEditStructureChange("services", [...selectedStructure.services, ""]);
    }
  };

  const removeService = (index: number, isNew: boolean = true) => {
    if (isNew) {
      const newServices = [...newStructure.services];
      newServices.splice(index, 1);
      handleNewStructureChange("services", newServices);
    } else {
      if (!selectedStructure) return;
      const newServices = [...selectedStructure.services];
      newServices.splice(index, 1);
      handleEditStructureChange("services", newServices);
    }
  };

  if (!mounted) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#063a1e]"></div>
      </div>
    );
  }

  // Déterminer le thème actif (system ou manuel)
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <div
      lang="fr"
      className={`light ${currentTheme}`}
      style={{ colorScheme: "light" }}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Structures d'accompagnement
            </h1>
            <p className="text-muted-foreground">
              Gérez les structures d'accompagnement présentes sur la plateforme
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#063a1e] hover:bg-[#063a1e]/90">
                <Plus className="mr-2 h-4 w-4" /> Ajouter une structure
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:w-[600px] sm:max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  Ajouter une structure d'accompagnement
                </DialogTitle>
                <DialogDescription>
                  Remplissez le formulaire ci-dessous pour ajouter une nouvelle
                  structure.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="nom" className="text-sm font-medium">
                      Nom de la structure<span className="text-red-600">*</span>
                    </label>
                    <Input
                      id="nom"
                      value={newStructure.nom}
                      onChange={(e) =>
                        handleNewStructureChange("nom", e.target.value)
                      }
                      placeholder="Ex: Gabon Incubateur"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="type_sea" className="text-sm font-medium">
                      Type de structure<span className="text-red-600">*</span>
                    </label>
                    <Input
                      id="type_sea"
                      value={newStructure.type_sea}
                      onChange={(e) =>
                        handleNewStructureChange("type_sea", e.target.value)
                      }
                      placeholder="Ex: Incubateur, Accélérateur"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="categorie" className="text-sm font-medium">
                    Catégorie <span className="text-red-600">*</span>
                  </label>
                  <Select
                    value={newStructure.categorie}
                    onValueChange={(value) =>
                      setNewStructure({
                        ...newStructure,
                        categorie: value, // ✅ ceci manquait
                      })
                    }
                  >
                    <SelectTrigger id="categorie">
                      <SelectValue placeholder="Sélectionner une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="incubateurs">Incubateurs</SelectItem>
                      <SelectItem value="centresFormation">
                        Centre Formation
                      </SelectItem>
                      <SelectItem value="cabinetsConseil">
                        Cabinets Conseil
                      </SelectItem>
                      <SelectItem value="structuresPubliques">
                        Structures Publiques
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Logo</label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="logo"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setNewStructure({
                              ...newStructure,
                              logo_url: reader.result as string, // Stocke l'URL base64 dans le state
                            });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="contact" className="text-sm font-medium">
                      Contact
                    </label>
                    <Input
                      id="contact"
                      value={newStructure.contact || ""}
                      onChange={(e) =>
                        handleNewStructureChange("contact", e.target.value || null)
                      }
                      placeholder="Ex: +241 77 12 34 56"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="mail" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="mail"
                      type="email"
                      value={newStructure.mail || ""}
                      onChange={(e) =>
                        handleNewStructureChange("mail", e.target.value || null)
                      }
                      placeholder="Ex: contact@structure.ga"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="adresse" className="text-sm font-medium">
                    Adresse
                  </label>
                  <Input
                    id="adresse"
                    value={newStructure.adresse}
                    onChange={(e) =>
                      handleNewStructureChange("adresse", e.target.value)
                    }
                    placeholder="Ex: Quartier Glass, Libreville"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="site_web" className="text-sm font-medium">
                    Site web
                  </label>
                  <Input
                    id="site_web"
                    value={newStructure.site_web || ""}
                    onChange={(e) =>
                      handleNewStructureChange("site_web", e.target.value || null)
                    }
                    placeholder="Ex: https://www.structure.ga"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="description" className="text-sm font-medium">
                    Description
                  </label>
                  <textarea
                    id="description"
                    className="w-full min-h-[100px] p-2 border rounded-md"
                    value={newStructure.description}
                    onChange={(e) =>
                      handleNewStructureChange("description", e.target.value)
                    }
                    placeholder="Description de la structure..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Services offerts
                  </label>
                  <div className="space-y-2">
                    {newStructure.services.map((service, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={service}
                          onChange={(e) =>
                            handleServiceChange(index, e.target.value)
                          }
                          placeholder="Service offert"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => removeService(index)}
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      className="mt-2"
                      onClick={() => addService()}
                    >
                      <Plus className="mr-2 h-4 w-4" /> Ajouter un service
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="rs_1" className="text-sm font-medium">
                    Réseau social 1
                  </label>
                  <Input
                    id="rs_1"
                    value={newStructure.rs_1 || ""}
                    onChange={(e) =>
                      handleNewStructureChange("rs_1", e.target.value || null)
                    }
                    placeholder="Lien vers le réseau social"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="rs_2" className="text-sm font-medium">
                    Réseau social 2
                  </label>
                  <Input
                    id="rs_2"
                    value={newStructure.rs_2 || ""}
                    onChange={(e) =>
                      handleNewStructureChange("rs_2", e.target.value || null)
                    }
                    placeholder="Lien vers le réseau social"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="partenaire_feg"
                    checked={newStructure.partenaire_feg}
                    onCheckedChange={(checked) =>
                      handleNewStructureChange("partenaire_feg", checked)
                    }
                  />
                  <label
                    htmlFor="partenaire_feg"
                    className="text-sm font-medium"
                  >
                    Partenaire FEG
                  </label>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Annuler
                </Button>
                <Button
                  className="bg-[#063a1e] hover:bg-[#063a1e]/90"
                  onClick={handleAddStructure}
                  disabled={
                    !newStructure.nom ||
                    !newStructure.type_sea ||
                    !newStructure.categorie
                  }
                >
                  Ajouter la structure
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filtres et recherche */}
        <Card>
          <CardContent className="p-6">
            <div className="grid gap-4 md:grid-cols-4">
              <div className="space-y-2">
                <label htmlFor="search" className="text-sm font-medium">
                  Rechercher
                </label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Rechercher une structure..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
             
              <div className="flex items-end">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setSearchTerm("");
                    setTypeFilter("");
                  }}
                >
                  <Filter className="mr-2 h-4 w-4" /> Réinitialiser les filtres
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Liste des structures */}
        <Card>
          <CardHeader>
            <CardTitle>Liste des structures d'accompagnement</CardTitle>
            <CardDescription>
              {filteredStructures.length} structure(s) trouvée(s)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Nom</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Partenaire FEG</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">
                      Chargement...
                    </TableCell>
                  </TableRow>
                ) : filteredStructures.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">
                      Aucune structure trouvée
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredStructures.map((structure) => (
                    <TableRow key={structure.id_sea}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          {structure.logo_url && (
                            <Image
                              src={structure.logo_url}
                              alt={structure.nom}
                              width={50}
                              height={50}
                              className="rounded-md"
                              
                            />
                          )}
                          <span>{structure.nom}</span>
                        </div>
                      </TableCell>
                      <TableCell>{structure.type_sea}</TableCell>
                      <TableCell>{structure.categorie}</TableCell>
                      <TableCell>{structure.contact || "-"}</TableCell>
                      <TableCell>
                        {structure.partenaire_feg ? (
                          <Badge variant="outline">Oui</Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="text-muted-foreground"
                          >
                            Non
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Ouvrir le menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedStructure(structure);
                                setIsViewDialogOpen(true);
                              }}
                            >
                              <Eye className="mr-2 h-4 w-4" /> Voir
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedStructure(structure);
                                setIsEditDialogOpen(true);
                              }}
                            >
                              <Pencil className="mr-2 h-4 w-4" /> Modifier
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedStructure(structure);
                                setIsDeleteDialogOpen(true);
                              }}
                              className="text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" /> Supprimer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Affichage de {filteredStructures.length} sur {structures.length}{" "}
              structures
            </div>
           <Pagination>
                                   <PaginationContent>
                                     <PaginationItem>
                                       <PaginationPrevious
                                         href="#"
                                         onClick={(e) => {
                                           e.preventDefault();
                                           setCurrentPage((prev) => Math.max(prev - 1, 1));
                                         }}
                                         className={
                                           currentPage === 1 ? "pointer-events-none opacity-50" : ""
                                         }
                                       />
                                     </PaginationItem>
                       
                                     {[...Array(totalPages)].map((_, index) => {
                                       const page = index + 1;
                                       return (
                                         <PaginationItem key={page}>
                                           <PaginationLink
                                             href="#"
                                             isActive={currentPage === page}
                                             onClick={(e) => {
                                               e.preventDefault();
                                               setCurrentPage(page);
                                             }}
                                           >
                                             {page}
                                           </PaginationLink>
                                         </PaginationItem>
                                       );
                                     })}
                       
                                     <PaginationItem>
                                       <PaginationNext
                                         href="#"
                                         onClick={(e) => {
                                           e.preventDefault();
                                           setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                                         }}
                                         className={
                                           currentPage === totalPages
                                             ? "pointer-events-none opacity-50"
                                             : ""
                                         }
                                       />
                                     </PaginationItem>
                                   </PaginationContent>
                                 </Pagination>
          </CardFooter>
        </Card>

        {/* Dialogue de modification */}
        {selectedStructure && (
          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="sm:w-[600px] sm:max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  Modifier une structure d'accompagnement
                </DialogTitle>
                <DialogDescription>
                  Modifiez les informations de la structure d'accompagnement.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="edit-nom" className="text-sm font-medium">
                      Nom de la structure<span className="text-red-600">*</span>
                    </label>
                    <Input
                      id="edit-nom"
                      value={selectedStructure.nom}
                      onChange={(e) =>
                        handleEditStructureChange("nom", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="edit-type_sea"
                      className="text-sm font-medium"
                    >
                      Type de structure<span className="text-red-600">*</span>
                    </label>
                    <Input
                      id="edit-type_sea"
                      value={selectedStructure.type_sea}
                      onChange={(e) =>
                        handleEditStructureChange("type_sea", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="edit-categorie"
                    className="text-sm font-medium"
                  >
                    Catégorie <span className="text-red-600">*</span>
                  </label>
                  <Select
                    value={selectedStructure.categorie}
                    onValueChange={(value) =>
                      setSelectedStructure({
                        ...selectedStructure,
                        categorie: value,
                      })
                    }
                  >
                    <SelectTrigger id="categorie">
                      <SelectValue placeholder="Sélectionner une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="incubateurs">Incubateurs</SelectItem>
                      <SelectItem value="centresFormation">
                        Centre Formation
                      </SelectItem>
                      <SelectItem value="cabinetsConseil">
                        Cabinets Conseil
                      </SelectItem>
                      <SelectItem value="structuresPubliques">
                        Structures Publiques
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Logo</label>
                  <Input
                    id="logo"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          const base64String = reader.result as string;

                          handleEditStructureChange("logo_url", base64String); // utilise ton setter
                        };
                        reader.readAsDataURL(file); // convertit en base64
                      }
                    }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="edit-contact"
                      className="text-sm font-medium"
                    >
                      Contact
                    </label>
                    <Input
                      id="edit-contact"
                      value={selectedStructure.contact || ""}
                      onChange={(e) =>
                        handleEditStructureChange("contact", e.target.value || null)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="edit-mail" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="edit-mail"
                      type="email"
                      value={selectedStructure.mail || ""}
                      onChange={(e) =>
                        handleEditStructureChange("mail", e.target.value || null)
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="edit-adresse" className="text-sm font-medium">
                    Adresse
                  </label>
                  <Input
                    id="edit-adresse"
                    value={selectedStructure.adresse}
                    onChange={(e) =>
                      handleEditStructureChange("adresse", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="edit-site_web"
                    className="text-sm font-medium"
                  >
                    Site web
                  </label>
                  <Input
                    id="edit-site_web"
                    value={selectedStructure.site_web || ""}
                    onChange={(e) =>
                      handleEditStructureChange("site_web", e.target.value || null)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="edit-description"
                    className="text-sm font-medium"
                  >
                    Description
                  </label>
                  <textarea
                    id="edit-description"
                    className="w-full min-h-[100px] p-2 border rounded-md"
                    value={selectedStructure.description}
                    onChange={(e) =>
                      handleEditStructureChange("description", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Services offerts
                  </label>
                  <div className="space-y-2">
                    {selectedStructure.services.map((service, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={service}
                          onChange={(e) =>
                            handleServiceChange(index, e.target.value, false)
                          }
                          placeholder="Service offert"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => removeService(index, false)}
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      className="mt-2"
                      onClick={() => addService(false)}
                    >
                      <Plus className="mr-2 h-4 w-4" /> Ajouter un service
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="edit-rs_1" className="text-sm font-medium">
                    Réseau social 1
                  </label>
                  <Input
                    id="edit-rs_1"
                    value={selectedStructure.rs_1 || ""}
                    onChange={(e) =>
                      handleEditStructureChange("rs_1", e.target.value || null)
                    }
                    placeholder="Lien vers le réseau social"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="edit-rs_2" className="text-sm font-medium">
                    Réseau social 2
                  </label>
                  <Input
                    id="edit-rs_2"
                    value={selectedStructure.rs_2 || ""}
                    onChange={(e) =>
                      handleEditStructureChange("rs_2", e.target.value || null)
                    }
                    placeholder="Lien vers le réseau social"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="edit-partenaire_feg"
                    checked={selectedStructure.partenaire_feg}
                    onCheckedChange={(checked) =>
                      handleEditStructureChange("partenaire_feg", checked)
                    }
                  />
                  <label
                    htmlFor="edit-partenaire_feg"
                    className="text-sm font-medium"
                  >
                    Partenaire FEG
                  </label>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsEditDialogOpen(false)}
                >
                  Annuler
                </Button>
                <Button
                  className="bg-[#063a1e] hover:bg-[#063a1e]/90"
                  onClick={handleUpdateStructure}
                  disabled={
                    !selectedStructure.nom ||
                    !selectedStructure.type_sea ||
                    !selectedStructure.categorie
                  }
                >
                  Enregistrer les modifications
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {/* Dialogue de suppression */}
        {selectedStructure && (
          <Dialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Confirmer la suppression</DialogTitle>
                <DialogDescription>
                  Êtes-vous sûr de vouloir supprimer la structure "
                  {selectedStructure.nom}" ? Cette action est irréversible.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="mt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsDeleteDialogOpen(false)}
                >
                  Annuler
                </Button>
                <Button variant="destructive" onClick={handleDeleteStructure}>
                  Supprimer
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {/* Vue détaillée */}
        {selectedStructure && (
          <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
            <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{selectedStructure.nom}</DialogTitle>
                <DialogDescription>
                  Détails de la structure d'accompagnement
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-start gap-6">
                  {selectedStructure.logo_url ? (
                    <Image
                      src={selectedStructure.logo_url}
                      alt={`Logo de ${selectedStructure.nom}`}
                      width={50}
                      height={50}
                      className="rounded-md"
                    />
                  ) : (
                    <div className="h-24 w-24 rounded-lg bg-gray-200 flex items-center justify-center">
                      <span className="text-sm text-gray-500">Pas de logo</span>
                    </div>
                  )}
                  
                  <div className="grid gap-1.5">
                    <div>
                      <h3 className="text-lg font-semibold">Informations générales</h3>
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        <div>
                          <p className="text-sm text-muted-foreground">Type</p>
                          <p>{selectedStructure.type_sea}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Catégorie</p>
                          <p>{selectedStructure.categorie}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Partenaire FEG</p>
                          <p>{selectedStructure.partenaire_feg ? "Oui" : "Non"}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Date de création</p>
                          <p>{new Date(selectedStructure.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Dernière mise à jour</p>
                          <p>{new Date(selectedStructure.updatedAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Coordonnées</h3>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Adresse</p>
                      <p>{selectedStructure.adresse || "Non renseignée"}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Contact</p>
                      <p>{selectedStructure.contact || "Non renseigné"}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p>{selectedStructure.mail || "Non renseigné"}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Site web</p>
                      <p>
                        {selectedStructure.site_web ? (
                          <a 
                            href={selectedStructure.site_web} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {selectedStructure.site_web}
                          </a>
                        ) : (
                          "Non renseigné"
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Description</h3>
                    <p className="whitespace-pre-line">
                      {selectedStructure.description || "Aucune description disponible"}
                    </p>
                  </div>
                </div>

                {selectedStructure.services?.length > 0 && (
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Services offerts</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedStructure.services.map((service, index) => (
                        <Badge key={index} variant="outline">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {(selectedStructure.rs_1 || selectedStructure.rs_2) && (
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Réseaux sociaux</h3>
                    <div className="flex gap-4">
                      {selectedStructure.rs_1 && (
                        <a 
                          href={selectedStructure.rs_1} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Réseau social 1
                        </a>
                      )}
                      {selectedStructure.rs_2 && (
                        <a 
                          href={selectedStructure.rs_2} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Réseau social 2
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}