"use client";

import type React from "react";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Search,
  FileText,
  Download,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  // PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { fetchTextesJuridiques } from "../../services/texte/api";
import { TexteJuridique } from "../../services/texte/api";

// Mapping des noms d'onglets pour l'affichage
const tabNames = {
  pmes: "Textes pour les PME",
  internationaux: "Textes régionaux et internationaux",
  administrations: "Textes des administrations",
};

export default function TextesJuridiques() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("pmes");
  const [page, setPage] = useState(1);
  const [textes, setTextes] = useState<TexteJuridique[]>([]); // <-- Utilisez l'interface du 3ème bloc

  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [sortOption, setSortOption] = useState("recent");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [suggestedTab, setSuggestedTab] = useState<string | null>(null);
  const [suggestedResults, setSuggestedResults] = useState<TexteJuridique[]>(
    []
  );

  // Fonction pour gérer la recherche
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Fonction pour gérer le changement d'onglet
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // Réinitialiser les suggestions lors du changement d'onglet
    setSuggestedTab(null);
    setPage(1);
  };

  // Fonction pour gérer le tri
  const handleSort = (value: string) => {
    setSortOption(value);
  };

  // Fonction pour gérer les filtres de type
  const handleTypeFilter = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  // Filtrer les textes en fonction de la recherche et des filtres
  // Filtrer les textes en fonction de la recherche et des filtres
  const filteredTextes = textes.filter((texte: TexteJuridique) => {
    // 1. Filtre par onglet actif
    if (texte.categorie !== activeTab) return false;

    // 2. Filtre par terme de recherche (avec gestion des null/undefined)
    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      const hasMatchInTitle =
        texte.titre?.toLowerCase().includes(searchTermLower) ?? false;
      const hasMatchInDescription =
        texte.description?.toLowerCase().includes(searchTermLower) ?? false;
      // const hasMatchInTags = texte.tags?.some(tag =>
      //   tag?.toLowerCase().includes(searchTermLower)
      // ) ?? false;

      if (!hasMatchInTitle && !hasMatchInDescription /* && !hasMatchInTags */) {
        return false;
      }
    }

    // 3. Filtre par type de texte (avec vérification de sécurité)
    if (selectedTypes.length > 0 && !selectedTypes.includes(texte.type_texte)) {
      return false;
    }

    return true;
  });

  // Trier les textes
  const filteredAndSortedTextes = useMemo(() => {
    let filtered = textes;

    if (searchTerm) {
      filtered = filtered.filter((texte) =>
        texte.titre.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    switch (sortOption) {
      case "az":
        filtered.sort((a, b) => a.titre.localeCompare(b.titre));
        break;
      case "za":
        filtered.sort((a, b) => b.titre.localeCompare(a.titre));
        break;
      case "old":
        filtered.sort(
          (a, b) =>
            new Date(a.date_parution).getTime() -
            new Date(b.date_parution).getTime()
        );
        break;
      default:
        filtered.sort(
          (a, b) =>
            new Date(b.date_parution).getTime() -
            new Date(a.date_parution).getTime()
        );
    }

    return filtered;
  }, [textes, searchTerm, sortOption]);

  // Trouver des résultats dans d'autres onglets lorsqu'aucun résultat n'est trouvé
  useEffect(() => {
    if (searchTerm && filteredTextes.length === 0) {
      // Chercher dans les autres onglets
      const otherTabsResults: Record<string, TexteJuridique[]> = {};

      Object.keys(tabNames).forEach((tab) => {
        if (tab !== activeTab) {
          const filteredResults = textes.filter((texte) => {
            // Filtre par catégorie (onglet)
            if (texte.categorie !== tab) return false;

            // Filtre par recherche texte (si searchTerm existe)
            if (searchTerm) {
              const searchLower = searchTerm.toLowerCase();
              const matchesSearch =
                texte.titre.toLowerCase().includes(searchLower) ||
                (texte.description &&
                  texte.description.toLowerCase().includes(searchLower));
              // (texte.tags && texte.tags.some(tag => tag.toLowerCase().includes(searchLower)));

              if (!matchesSearch) return false;
            }

            // Filtre par type (si types sélectionnés)
            if (
              selectedTypes.length > 0 &&
              !selectedTypes.includes(texte.type_texte)
            ) {
              return false;
            }

            return true;
          });

          otherTabsResults[tab] = filteredResults;
        }
      });

      // Trouver l'onglet avec le plus de résultats
      let bestTab = null;
      let maxResults = 0;

      Object.entries(otherTabsResults).forEach(([tab, results]) => {
        if (results.length > maxResults) {
          maxResults = results.length;
          bestTab = tab;
        }
      });

      if (bestTab && maxResults > 0) {
        setSuggestedTab(bestTab);
        setSuggestedResults(otherTabsResults[bestTab]);
      } else {
        setSuggestedTab(null);
        setSuggestedResults([]);
      }
    } else {
      setSuggestedTab(null);
      setSuggestedResults([]);
    }

    const loadTextes = async () => {
      setLoading(true);
      try {
        const { data, pagination } = await fetchTextesJuridiques(
          page,
          10,
          activeTab,
          selectedTypes.length > 0 ? selectedTypes.join(",") : undefined
        );
        console.log("data reçu :", data);
        setTextes(data);
        setTotalPages(pagination.totalPages);
      } catch (error) {
        console.error("Erreur :", error);
      } finally {
        setLoading(false);
      }
    };

    loadTextes();
  }, [searchTerm, page, activeTab, selectedTypes, filteredTextes.length]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-[#063a1e]">
              Accueil
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span>Textes Juridiques</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container w-full py-8 ">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="hidden lg:flex gap-10  md:hidden">
            <div className="bg-white block w-64 rounded-lg shadow-md overflow-hidden">
              <div className="px-4 py-5  sm:px-6 bg-[#063a1e]">
                <h3 className="text-lg font-semibold text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 inline-block mr-2 align-middle"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 18h3.75"
                    />
                  </svg>
                  Filtres avancés
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-200">
                  Affinez votre recherche par type de document.
                </p>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">
                      Type de texte
                    </h3>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center">
                        <input
                          id="type1"
                          name="type"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-[#063a1e] focus:ring-[#063a1e]"
                          checked={selectedTypes.includes("Loi")}
                          onChange={() => handleTypeFilter("Loi")}
                        />
                        <label
                          htmlFor="type1"
                          className="ml-2 block text-sm text-gray-900"
                        >
                          Loi
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="type2"
                          name="type"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-[#063a1e] focus:ring-[#063a1e]"
                          checked={selectedTypes.includes("Décret")}
                          onChange={() => handleTypeFilter("Décret")}
                        />
                        <label
                          htmlFor="type2"
                          className="ml-2 block text-sm text-gray-900"
                        >
                          Décret
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="type3"
                          name="type"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-[#063a1e] focus:ring-[#063a1e]"
                          checked={selectedTypes.includes("Arrêté")}
                          onChange={() => handleTypeFilter("Arrêté")}
                        />
                        <label
                          htmlFor="type3"
                          className="ml-2 block text-sm text-gray-900"
                        >
                          Arrêté
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="type4"
                          name="type"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-[#063a1e] focus:ring-[#063a1e]"
                          checked={selectedTypes.includes("Code")}
                          onChange={() => handleTypeFilter("Code")}
                        />
                        <label
                          htmlFor="type4"
                          className="ml-2 block text-sm text-gray-900"
                        >
                          Code
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="type5"
                          name="type"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-[#063a1e] focus:ring-[#063a1e]"
                          checked={selectedTypes.includes(
                            "Acte uniforme OHADA"
                          )}
                          onChange={() =>
                            handleTypeFilter("Acte uniforme OHADA")
                          }
                        />
                        <label
                          htmlFor="type5"
                          className="ml-2 block text-sm text-gray-900"
                        >
                          Acte uniforme OHADA
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="type6"
                          name="type"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-[#063a1e] focus:ring-[#063a1e]"
                          checked={selectedTypes.includes("Convention")}
                          onChange={() => handleTypeFilter("Convention")}
                        />
                        <label
                          htmlFor="type6"
                          className="ml-2 block text-sm text-gray-900"
                        >
                          Convention
                        </label>

                        
                        
                        
                      </div>
                      <div className="flex items-center">
                          <input
                            id="type5"
                            name="type"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-[#063a1e] focus:ring-[#063a1e]"
                            checked={selectedTypes.includes("Directive")}
                            onChange={() => handleTypeFilter("Directive")}
                          />
                          <label
                            htmlFor="type5"
                            className="ml-2 block text-sm text-gray-900"
                          >
                            Directive
                          </label>
                        </div>
                      <div className="flex items-center">
                          <input
                            id="type5"
                            name="type"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-[#063a1e] focus:ring-[#063a1e]"
                            checked={selectedTypes.includes("Circulaire")}
                            onChange={() => handleTypeFilter("Circulaire")}
                          />
                          <label
                            htmlFor="type5"
                            className="ml-2 block text-sm text-gray-900"
                          >
                            Circulaire
                          </label>
                        </div>
                      <div className="flex items-center">
                          <input
                            id="type5"
                            name="type"
                            type="checkbox"
                            className="h-4 w-4 rounded border-gray-300 text-[#063a1e] focus:ring-[#063a1e]"
                            checked={selectedTypes.includes("Accord")}
                            onChange={() => handleTypeFilter("Accord")}
                          />
                          <label
                            htmlFor="type5"
                            className="ml-2 block text-sm text-gray-900"
                          >
                            Accord
                          </label>
                        </div>
                      <div className="flex items-center">
                        <input
                          id="type5"
                          name="type"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-[#063a1e] focus:ring-[#063a1e]"
                          checked={selectedTypes.includes("Ordonnance")}
                          onChange={() => handleTypeFilter("Ordonnance")}
                        />
                        <label
                          htmlFor="type5"
                          className="ml-2 block text-sm text-gray-900"
                        >
                          Ordonnance
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="type5"
                          name="type"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-[#063a1e] focus:ring-[#063a1e]"
                          checked={selectedTypes.includes("Traité")}
                          onChange={() => handleTypeFilter("Traité")}
                        />
                        <label
                          htmlFor="type5"
                          className="ml-2 block text-sm text-gray-900"
                        >
                          Traité
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="type5"
                          name="type"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-[#063a1e] focus:ring-[#063a1e]"
                          checked={selectedTypes.includes(
                            "Acte uniforme OHADA"
                          )}
                          onChange={() =>
                            handleTypeFilter("Acte uniforme OHADA")
                          }
                        />
                        <label
                          htmlFor="type5"
                          className="ml-2 block text-sm text-gray-900"
                        >
                          Règlement
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 w-full">
              <div className="bg-white p-6 rounded-lg border ">
                <h1 className="text-2xl font-bold mb-6 text-[#063a1e]">
                  Textes Juridiques pour les PME Gabonaises
                </h1>

                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Rechercher un texte juridique..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                  </div>
                  <Select value={sortOption} onValueChange={handleSort}>
                    <SelectTrigger className="w-full md:w-[180px] gap-2 border-[#063a1e] text-[#063a1e] hover:bg-[#063a1e]/10">
                      <SelectValue placeholder="Trier par" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Plus récents</SelectItem>
                      <SelectItem value="old">Plus anciens</SelectItem>
                      <SelectItem value="az">A-Z</SelectItem>
                      <SelectItem value="za">Z-A</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Tabs
                  defaultValue="pmes"
                  value={activeTab}
                  onValueChange={handleTabChange}
                >
                  <TabsList className="grid grid-cols-2 md:grid-cols-3 mb-8">
                    <TabsTrigger
                      value="pmes"
                      className="w-full md:w-auto text-center  py-2"
                    >
                      Textes pour les PME{" "}
                    </TabsTrigger>
                    <TabsTrigger
                      value="internationaux"
                      className="w-full md:w-auto text-center px-4 py-2"
                    >
                      Textes régionaux et internationaux
                    </TabsTrigger>
                    <TabsTrigger
                      value="administrations"
                      className="w-full md:w-auto text-center px-4 py-2"
                    >
                      {" "}
                      Textes des administrations
                    </TabsTrigger>
                  </TabsList>

                  {["pmes", "internationaux", "administrations"].map((tab) => (
                    <TabsContent key={tab} value={tab}>
                      {/* En-tête statistiques */}
                      <div className="text-sm text-muted-foreground mb-6">
                        {loading ? (
                          <Skeleton className="h-4 w-[200px]" />
                        ) : (
                          <>
                            Affichage de{" "}
                            {filteredAndSortedTextes.length > 0
                              ? `1-${filteredAndSortedTextes.length}`
                              : "0"}{" "}
                            sur{" "}
                            {textes.filter((t) => t.categorie === tab).length}{" "}
                            résultats
                            {searchTerm && ` pour "${searchTerm}"`}
                          </>
                        )}
                      </div>

                      {/* Liste des textes */}
                      {loading ? (
                        <div className="space-y-4">
                          {[...Array(3)].map((_, i) => (
                            <Card key={`skeleton-${i}`}>
                              <CardContent className="p-4 space-y-3">
                                <Skeleton className="h-4 w-[200px]" />
                                <Skeleton className="h-4 w-[80%]" />
                                <Skeleton className="h-4 w-[60%]" />
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      ) : filteredAndSortedTextes.length > 0 ? (
                        <div className="space-y-4">
                          {filteredAndSortedTextes.map((texte) => (
                            <Card
                              key={texte.id_texteJuridique}
                              className="hover:shadow-sm transition-shadow"
                            >
                              <CardContent className="p-4">
                                <div className="flex flex-col md:flex-row md:items-center gap-4">
                                  {/* Métadonnées */}
                                  <div className="flex-1">
                                    <div className="flex flex-wrap items-center gap-2 mb-1">
                                      <Badge className="bg-[#063a1e] text-white">
                                        {texte.type_texte}
                                      </Badge>
                                      <span className="text-sm text-muted-foreground">
                                        Publié le{" "}
                                        {new Date(
                                          texte.date_parution
                                        ).toLocaleDateString("fr-FR", {
                                          year: "numeric",
                                          month: "long",
                                          day: "numeric",
                                        })}
                                      </span>
                                    </div>
                                    <h3 className="font-medium line-clamp-1">
                                      {texte.titre}
                                    </h3>
                                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                      {texte.description}
                                    </p>
                                    <div className="mt-2">
                                      <Badge
                                        variant="outline"
                                        className="text-xs font-extralight"
                                      >
                                        <FileText className="h-4 w-4 inline-block mr-1" />
                                        {(texte.taille_fichier / 1024).toFixed(
                                          2
                                        )}{" "}
                                        Ko
                                      </Badge>
                                    </div>
                                  </div>

                                  {/* Actions */}
                                  <div className="flex gap-2 shrink-0">
                                    <a
                                      href={texte.fichier_url}
                                      download={texte.fichier_nom}
                                      target="_blank"
                                      aria-label={`Télécharger ${texte.fichier_nom}`}
                                    >
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        className="gap-1 border-[#063a1e] text-white bg-[#063a1e] hover:bg-[#063a1e] hover:bg-[#063a1e]/10"
                                      >
                                        <Download className="h-4 w-4" />
                                        <span>Télécharger</span>
                                      </Button>
                                    </a>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      ) : (
                        /* Aucun résultat */
                        <div className="space-y-4">
                          <div className="text-center py-4">
                            <p className="text-muted-foreground">
                              Aucun résultat trouvé pour votre recherche dans
                              cette section.
                            </p>
                          </div>

                          {/* Suggestions inter-onglets */}
                          {suggestedTab && suggestedResults.length > 0 && (
                            <Alert className="bg-[#f0f9f1] border-[#063a1e]/20">
                              <div className="flex items-start gap-2">
                                <ArrowRight className="h-4 w-4 mt-0.5 text-[#063a1e]" />
                                <div>
                                  <AlertTitle className="text-[#063a1e]">
                                    Résultats trouvés dans une autre section
                                  </AlertTitle>
                                  <AlertDescription className="mt-2">
                                    <p className="mb-3">
                                      Nous avons trouvé{" "}
                                      {suggestedResults.length} résultat(s) pour
                                      "{searchTerm}" dans la section "
                                      {
                                        tabNames[
                                          suggestedTab as keyof typeof tabNames
                                        ]
                                      }
                                      ".
                                    </p>
                                    <Button
                                      onClick={() => {
                                        setActiveTab(suggestedTab);
                                        setPage(1);
                                      }}
                                      className="bg-[#063a1e] hover:bg-[#063a1e]/90"
                                    >
                                      Voir les résultats
                                    </Button>
                                  </AlertDescription>
                                </div>
                              </div>
                            </Alert>
                          )}

                          {/* Aucun résultat nulle part */}
                          {!loading && !suggestedTab && (
                            <div className="text-center py-4">
                              <p className="text-muted-foreground">
                                Essayez de modifier vos termes de recherche ou
                                vos filtres.
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </TabsContent>
                  ))}
                </Tabs>

                {/* Pagination */}
                {filteredAndSortedTextes.length > 0 && (
                  <div className="mt-6 ">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious
                            href="#"
                            onClick={() =>
                              setPage((prev) => Math.max(prev - 1, 1))
                            }
                          />
                        </PaginationItem>
                        {Array.from({ length: totalPages }, (_, i) => (
                          <PaginationItem key={i}>
                            <PaginationLink
                              href="#"
                              isActive={page === i + 1}
                              onClick={() => setPage(i + 1)}
                            >
                              {i + 1}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                        <PaginationItem>
                          <PaginationNext
                            href="#"
                            onClick={() =>
                              setPage((prev) => Math.min(prev + 1, totalPages))
                            }
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
