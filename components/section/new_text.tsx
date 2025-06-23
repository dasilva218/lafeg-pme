"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
  fetchTextesJuridiques,
  TexteJuridique,
} from "../../app/services/texte/api";

export default function NewText() {
  const [textes, setTextes] = useState<TexteJuridique[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("tous");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });

  const truncateText = (text: string, maxLength: number) =>
    text.length > maxLength ? text.slice(0, maxLength) + "…" : text;
  

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const { data, pagination: newPagination } = await fetchTextesJuridiques(
          pagination.page,
          pagination.limit,
          activeTab === "tous" ? undefined : activeTab
        );
        setTextes(data);
        setPagination(newPagination);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur de chargement");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [activeTab, pagination.page, pagination.limit]);

  // const formatDate = (dateString: string) => {
  //   const date = new Date(dateString);
  //   return date.toLocaleDateString("fr-FR", {
  //     year: "numeric",
  //     month: "long",
  //     day: "numeric",
  //   });
  // };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Chargement...
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Erreur: {error}
      </div>
    );
  return (
    <section className="py-12 bg-[#EAEEEB]">
      <div className="container">
        <h2 className="text-2xl font-bold mb-8">Mises à jour récentes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {textes.slice(0, 4).map(
            (
              text // Afficher les 4 derniers objets
            ) => (
              <Card key={text.id_texteJuridique} className="hover:shadow-md transition-shadow">
                {" "}
                {/* Assurez-vous que 'id' est une propriété unique */}
                <CardHeader className="pb-3 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-gradient-to-r from-[#dcdaa4] to-[#bdbd95] text-[#063a1e] font-medium">
                      Nouveau
                    </Badge>
                    <span className="text-sm font-bold ">
                      {new Date(text.date_parution).toLocaleDateString(
                        "fr-FR",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </span>{" "}
                    {/* Utilisez la date de l'objet */}
                  </div>
                  <CardTitle className="mt-1"><p className="text-base">{truncateText(text.titre, 80)}</p></CardTitle>{" "}
                  {/* Utilisez le titre de l'objet */}
                </CardHeader>
                <CardContent>
                  <p className="font-medium text-sm">
                    {/* {text.description || "Aucune description disponible"} */}
                    {truncateText(text.description || "Aucune description disponible", 120)}
                  </p>{" "}
                  {/* Utilisez la description de l'objet */}
                </CardContent>
                <CardFooter>
                  <Link target="_blank" href={text.fichier_url}>
                    <Button variant="default" className="w-full gap-1">
                      Lire le texte complet <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            )
          )}
        </div>
        <div className="mt-8 text-center">
          <Link href="/textes-juridiques">
            <Button
              size="lg"
              className="hover:text-[#063a1e] duration-300 ease-in-out hover:bg-white border hover:border-[#063a1e] font-medium"
            >
              Voir plus de mise à jour
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
