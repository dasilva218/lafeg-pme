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
    limit: 100,
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

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-900"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Chargement...</span>
        </div>
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
              <Card
                key={text.id_texteJuridique}
                className="hover:shadow-md transition-shadow"
              >
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
                  <CardTitle className="mt-1">
                    <h1 className="text-lg">{truncateText(text.titre, 80)}</h1>
                  </CardTitle>{" "}
                  {/* Utilisez le titre de l'objet */}
                </CardHeader>
                <CardContent>
                  <p className="font-medium text-sm">
                    {/* {text.description || "Aucune description disponible"} */}
                    {truncateText(
                      text.description || "Aucune description disponible",
                      120
                    )}
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
