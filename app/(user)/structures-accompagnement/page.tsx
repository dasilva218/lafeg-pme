"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight,
  Search,
  ExternalLink,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
} from "lucide-react";
import AdBanner from "@/components/ads/AdBanner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { fetchAllSEAs, SEA } from "@/app/services/sea/api";

export default function Structure() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("incubateurs");
  const [sea, setSea] = useState<SEA[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchAllSEAs();
        console.log("SEA data:", data);
        console.log(
          "✅ Données SEA reçues :",
          data.map((d) => d.categorie)
        );
        setSea(data);
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const filtrerSeas = (categorie: string) => {
    if (!Array.isArray(sea)) return [];

    return sea.filter(
      (item) => item.categorie === categorie && item.nom?.includes(search)
    );
  };

  const incubateursFiltres = filtrerSeas("incubateurs");
  const centresFormationFiltres = filtrerSeas("centresFormation");
  const cabinetsConseilFiltres = filtrerSeas("cabinetsConseil");

  const structuresPubliquesFiltrees = filtrerSeas("structuresPubliques");

  const obtenirResultatsAutresSections = () => {
    const resultats = [];

    if (activeTab !== "incubateurs" && incubateursFiltres.length > 0) {
      resultats.push({
        tab: "incubateurs",
        count: incubateursFiltres.length,
        label: "Incubateurs",
      });
    }

    if (
      activeTab !== "centresFormation" &&
      centresFormationFiltres.length > 0
    ) {
      resultats.push({
        tab: "centresFormation",
        count: centresFormationFiltres.length,
        label: "Centres de formation",
      });
    }

    if (activeTab !== "cabinetsConseil" && cabinetsConseilFiltres.length > 0) {
      resultats.push({
        tab: "cabinetsConseil",
        count: cabinetsConseilFiltres.length,
        label: "Cabinets conseil",
      });
    }
    if (
      activeTab !== "structuresPubliques" &&
      structuresPubliquesFiltrees.length > 0
    ) {
      resultats.push({
        tab: "structuresPubliques",
        count: structuresPubliquesFiltrees.length,
        label: "Structures publiques",
      });
    }

    return resultats;
  };

  const resultatsAutresSections = search
    ? obtenirResultatsAutresSections()
    : [];

  const renderCarteInstitution = (item: any) => (
    <Card key={item.id_sea} className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#063a1e]/10 rounded-md flex items-center justify-center">
              {item.logo_url && (
                <Image
                  src={item.logo_url}
                  alt={`Logo ${item.nom}`}
                  width={48}
                  height={48}
                  className="rounded bg-cover bg-center w-full h-full"
                />
              )}
            </div>
            <div>
              <CardTitle>{item.nom}</CardTitle>
              <CardDescription>{item.type_sea}</CardDescription>
            </div>
          </div>
          {item.partenaire_feg && (
            <Badge variant="secondary">Partenaire FEG</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {item.description || "Aucune description disponible"}
          </p>
          <div className="space-y-2">
            {item.adresse && (
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-[#063a1e] mt-0.5" />
                <span className="text-sm">{item.adresse}</span>
              </div>
            )}
            {item.contact && (
              <div className="flex items-start gap-2">
                <Phone className="h-4 w-4 text-[#063a1e] mt-0.5" />
                <a
                  href={`tel:${item.contact}`}
                  className="text-sm hover:underline underline-offset-4"
                >
                  {item.contact}
                </a>
              </div>
            )}
            {item.mail && (
              <div className="flex items-start gap-2">
                <Mail className="h-4 w-4 text-[#063a1e] mt-0.5" />
                <a
                  href={`mailto:${item.mail}`}
                  className="text-sm hover:underline underline-offset-4"
                >
                  {item.mail}
                </a>
              </div>
            )}
            {item.rs_1 && (
              <Link
                target="_blank"
                href={item.rs_1}
                className="flex text-[rgb(6,58,30)] hover:underline underline-offset-4 items-start gap-2"
              >
                {item.rs_1.includes("facebook")
                  ? "Facebook"
                  : item.rs_1.includes("linkedin")
                  ? "LinkedIn"
                  : item.rs_1.includes("twitter")
                  ? "Twitter"
                  : "Réseau social"}
              </Link>
            )}
            {item.rs_2 && (
              <Link
                target="_blank"
                href={item.rs_2}
                className="flex text-[rgb(6,58,30)] hover:underline underline-offset-4 items-start gap-2"
              >
                {item.rs_2.includes("facebook")
                  ? "Facebook"
                  : item.rs_2.includes("linkedin")
                  ? "LinkedIn"
                  : item.rs_2.includes("twitter")
                  ? "Twitter"
                  : "Réseau social"}
              </Link>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Badge variant="outline" className="text-[#063a1e]">
          {item.categorie}
        </Badge>
        {item.site_web && (
          <Link target="_blank" href={item.site_web}>
            <Button
              variant="outline"
              size="sm"
              className="gap-1 border-[#063a1e] text-[#063a1e] hover:bg-[#063a1e]/10"
            >
              Visiter le site <ExternalLink className="h-3 w-3" />
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fil d'Ariane */}
      <div className="bg-white border-b">
        <div className="container py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-[#063a1e]">
              Accueil
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span>Structures d'Accompagnement</span>
          </div>
        </div>
      </div>

      {/* Section Hero */}
      <section className="bg-[#063a1e] text-white py-12">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold mb-4">
              Structures d'Accompagnement pour les PME Gabonaises
            </h1>
            <p className="text-white/90 text-lg mb-6">
              Découvrez les incubateurs, centres de formation, cabinets conseil
              et structures publiques qui peuvent accompagner votre entreprise
              au Gabon.
            </p>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Rechercher une structure d'accompagnement..."
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 h-12"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contenu Principal */}
      <section className="container py-12">
        <div className="flex justify-between gap-5 flex-col lg:flex-row">
          <div className="w-full max-w-5xl">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
                <TabsTrigger value="incubateurs">Incubateurs</TabsTrigger>
                <TabsTrigger value="centresFormation">
                  Centres de formation
                </TabsTrigger>
                <TabsTrigger value="cabinetsConseil">
                  Cabinets conseil
                </TabsTrigger>
                <TabsTrigger value="structuresPubliques">
                  Structures publiques
                </TabsTrigger>
              </TabsList>

              {/* Incubateurs */}
              <TabsContent value="incubateurs" className="space-y-6">
                {loading ? (
                  <div className="text-center py-10 text-muted-foreground">
                    Chargement...
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {incubateursFiltres.map(renderCarteInstitution)}
                    </div>
                    {incubateursFiltres.length === 0 && (
                      <p className="text-red-700 text-center font-bold italic">
                        Aucun résultat trouvé dans la section Incubateurs.
                      </p>
                    )}
                  </>
                )}
              </TabsContent>

              {/* Centres de formation */}
              <TabsContent value="centresFormation" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {centresFormationFiltres.map(renderCarteInstitution)}
                </div>
                {centresFormationFiltres.length === 0 && (
                  <p className="text-red-700 text-center font-bold italic">
                    Aucun résultat trouvé dans la section Centres de formation.
                  </p>
                )}
              </TabsContent>

              {/* Cabinets conseil */}
              <TabsContent value="cabinetsConseil" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {cabinetsConseilFiltres.map(renderCarteInstitution)}
                </div>
                {cabinetsConseilFiltres.length === 0 && (
                  <p className="text-red-700 text-center font-bold italic">
                    Aucun résultat trouvé dans la section Cabinets conseil.
                  </p>
                )}
              </TabsContent>

              {/* Structures publiques */}
              <TabsContent value="structuresPubliques" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {structuresPubliquesFiltrees.map(renderCarteInstitution)}
                </div>
                {structuresPubliquesFiltrees.length === 0 && (
                  <p className="text-red-700 text-center font-bold italic">
                    Aucun résultat trouvé dans la section Structures publiques.
                  </p>
                )}
              </TabsContent>

              {/* Notification pour les résultats dans d'autres sections */}
              {search && resultatsAutresSections.length > 0 && (
                <div className="my-6 p-4 bg-[#063a1e]/5 rounded-lg border border-[#063a1e]/10">
                  <p className="text-[#063a1e] font-medium mb-2">
                    Résultats trouvés dans d'autres sections :
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {resultatsAutresSections.map((result) => (
                      <Button
                        key={result.tab}
                        variant="outline"
                        size="sm"
                        className="gap-1 border-[#063a1e] text-[#063a1e] hover:bg-[#063a1e]/10"
                        onClick={() => setActiveTab(result.tab)}
                      >
                        {result.label} ({result.count}){" "}
                        <ArrowRight className="h-3 w-3" />
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </Tabs>
          </div>

          {/* Sidebar avec publicités */}
          <div className="w-80 hidden lg:block space-y-6">
            <AdBanner
              emplacement="SEA"
              interval={3000}
              className="w-80 h-auto"
            />
          </div>

          {/* Mobile */}
          <div className="flex lg:hidden w-full">
            <AdBanner
              emplacement="SEA"
              interval={3000}
              className="w-full h-48"
            />
          </div>
        </div>

        {/* Section CTA */}
        <div className="mt-12 bg-gradient-to-r from-[#dcdaa4] to-[#bdbd95] p-6 rounded-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-[#063a1e] mb-2">
                Trouvez rapidement le bon contact pour vos besoins en
                accompagnement.
              </h3>
              <p className="text-[#063a1e] mb-4">
                Abonnez-vous pour connaître les structures utiles aux PME, avec
                leurs coordonnées et une description de leurs services. Accédez
                facilement à toutes ces informations depuis notre site.
              </p>
            </div>
            <Link href="/#subscription">
              <Button className="bg-[#063a1e] hover:bg-[#063a1e]/90 whitespace-nowrap">
                S'abonner
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
