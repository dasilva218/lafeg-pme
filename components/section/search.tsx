"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  fetchTextesJuridiques,
  TexteJuridique,
} from "../../app/services/texte/api";

type Category = "pmes" | "internationaux" | "administrations" | "";

export default function TextSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<TexteJuridique[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [pagination, setPagination] = useState({
    page: 100,
    limit: 100,
    total: 100,
    totalPages: 100,
  });
  const [hasSearched, setHasSearched] = useState(false);

  const searchTexts = async (newPage = 1) => {
    try {
      setLoading(true);
      setError("");
      setResults([]);

      const { data, pagination: paginationData } = await fetchTextesJuridiques(
        newPage,
        pagination.limit,
        undefined,
        undefined,
        searchQuery.trim()
        // titreRecherche,
      );

      const filteredResults = searchQuery.trim()
        ? data.filter((text) =>
            text.titre.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : [];

      setResults(filteredResults);
      setPagination({
        ...paginationData,
        total: filteredResults.length, // Met à jour le total avec les résultats filtrés
      });
      setHasSearched(true);
    } catch (err) {
      setError("Erreur lors de la recherche");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      searchTexts(1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="bg-[#063a1e] p-6 rounded-lg shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <Input
            type="search"
            placeholder="Rechercher par titre"
            value={searchQuery}
            onChange={handleInputChange}
            className="flex-1"
          />
          <Button
            type="submit"
            disabled={loading || !searchQuery.trim()}
            variant="secondary"
            size="lg"
            className="bg-[#063a1e] relative hover:bg-white"
          >
            <span className="absolute inset-0 w-full h-full bg-[#dcdaa4] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0"></span>
            <span className="relative mr-3 z-10 transition-colors duration-500 ease-in-out group-hover:text-[#063a1e]">
              <p>{loading ? "Recherche..." : "Rechercher"}</p>
            </span>
          </Button>
        </div>
      </form>

      {error && <div className="mt-4 text-red-500 text-sm">{error}</div>}

      {hasSearched && results.length > 0 && (
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">
              {pagination.total} résultat{pagination.total > 1 ? "s" : ""}{" "}
              trouvé{pagination.total > 1 ? "s" : ""}
            </h3>
          </div>

          <div className="space-y-4">
            {results.map((text) => (
              <Card key={text.id_texteJuridique} className="hover:shadow-md transition-shadow">
                <div className="p-4">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <Badge className="bg-[#063a1e] text-white">
                          {text.type_texte}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {new Date(text.date_parution).toLocaleDateString(
                            "fr-FR"
                          )}
                        </span>
                      </div>
                      <h3 className="font-medium">{text.titre}</h3>
                      {text.description && (
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {text.description}
                        </p>
                      )}
                      <div className="mt-2 flex justify-between items-center">
                        {text.categorie && (
                          <Badge variant="secondary" className="text-xs">
                            {text.categorie.toUpperCase()} {" "}
                         
                          </Badge>
                        )}
                         <Badge variant="secondary" className="text-xs">
                          <FileText className="h-4 w-4 inline-block mr-1" />
                            {(text.taille_fichier / 1024).toFixed(1)} Ko
                          </Badge>
                      </div>
                    </div>

                    <div className="flex gap-2 shrink-0">
                      

                      <a
                        href={text.fichier_url}
                        download={text.fichier_nom}
                        className="hover:no-underline"
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-1 border-[#063a1e] text-[#063a1e] hover:bg-[#063a1e]/10"
                        >
                          <Download className="h-4 w-4" />
                          Télécharger
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {pagination.totalPages > 1 && (
            <div className="mt-6 flex justify-center">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  disabled={pagination.page === 1}
                  onClick={() => searchTexts(pagination.page - 1)}
                >
                  Précédent
                </Button>
                <Button
                  variant="outline"
                  disabled={pagination.page >= pagination.totalPages}
                  onClick={() => searchTexts(pagination.page + 1)}
                >
                  Suivant
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {hasSearched && !loading && results.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">Aucun résultat trouvé</p>
          <p className="text-sm mt-2">Modifiez vos critères de recherche</p>
        </div>
      )}
    </div>
  );
}
