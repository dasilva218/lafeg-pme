"use client"

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import {
  ChevronRight,
  Search,
  ExternalLink,
  MapPin,
  Phone,
  Mail,
  ArrowRight
} from "lucide-react";
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
import incubateur from "@/components/data/sea/incubateur";
import formation from "@/components/data/sea/formation";
import cabinet from "@/components/data/sea/cabinet";
import publique from "@/components/data/sea/publique";

export default function StructuresAccompagnement() {

  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("incubateurs")
  

  const filteredIncubateurs = incubateur.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))

  const filteredFormation = formation.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))

  const filteredCabinet = cabinet.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))

  const filteredPublic = publique.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))


  const getOtherSectionResults = () => {
    const results = []

    if (activeTab !== "incubateurs" && filteredIncubateurs.length > 0) {
      results.push({ tab: "incubateurs", count: filteredIncubateurs.length, label: "Incubateurs" })
    }

    if (activeTab !== "formation" && filteredFormation.length > 0) {
      results.push({ tab: "formation", count: filteredFormation.length, label: "Centre de formation" })
    }

    if (activeTab !== "conseil" && filteredCabinet.length > 0) {
      results.push({ tab: "conseil", count: filteredCabinet.length, label: "Cabinet conseil" })
    }

    if (activeTab !== "publiques" && filteredPublic.length > 0) {
      results.push({ tab: "publiques", count: filteredPublic.length, label: "Structure publique" })
    }


    return results
  }

  const otherSectionResults = search ? getOtherSectionResults() : []


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
            <span>Structures d'Accompagnement</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-[#063a1e] text-white py-12">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold mb-4">
              Structures d'Accompagnement des PME Gabonaises
            </h1>
            <p className="text-white/90 text-lg mb-6">
              Découvrez les organismes qui peuvent vous aider à créer,
              développer et pérenniser votre entreprise au Gabon.
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

      {/* Main Content */}
      <div className="container py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-12 ">
            <TabsTrigger value="incubateurs">Incubateurs</TabsTrigger>
            <TabsTrigger value="formation">Centres de formation</TabsTrigger>
            <TabsTrigger value="conseil">Cabinets conseil</TabsTrigger>
            <TabsTrigger value="publiques">Structures publiques</TabsTrigger>
          </TabsList>

          {/* Incubateurs */}
          <TabsContent value="incubateurs" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredIncubateurs.map((item) => (
                <Card
                  key={item.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-[#063a1e]/10 rounded-md flex items-center justify-center">
                          <Image
                            src={item.logo}
                            alt="Logo banque"
                            width={1000}
                            height={1000}
                            className="rounded bg-cover bg-center w-full h-full"
                          />
                        </div>
                        <div>
                          <CardTitle>{item.title}</CardTitle>
                          <CardDescription>{item.type}</CardDescription>
                        </div>
                      </div>
                      <div>{item.partenaire}</div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        {item.description}{" "}
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-[#063a1e] mt-0.5" />
                          <span className="text-sm"> {item.adresse} </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Phone className="h-4 w-4 text-[#063a1e] mt-0.5" />
                          <a
                            href={`tel:${item.tel}`}
                            className="text-sm hover:underline underline-offset-4"
                          >
                            {item.tel}
                          </a>
                        </div>
                        <div className="flex items-start gap-2">
                          <Mail className="h-4 w-4 text-[#063a1e] mt-0.5" />
                          <a
                            href={`mailto:${item.mail}`}
                            className="text-sm hover:underline underline-offset-4"
                          >
                            {" "}
                            {item.mail}{" "}
                          </a>
                        </div>
                        <Link
                          target="_blank"
                          href={item.rs1}
                          className="flex text-[rgb(6,58,30)] hover:underline underline-offset-4 items-start gap-2"
                        >
                          {item.textrs1}
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    {/* <Badge variant="outline" className="text-[#063a1e]">
                      Prêts PME
                    </Badge> */}
                    <Link target="_blank" href={item.site}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1 border-[#063a1e] text-[#063a1e] hover:bg-[#063a1e]/10"
                      >
                        Visiter le site <ExternalLink className="h-3 w-3" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
            {filteredIncubateurs.length === 0 && (
          <p className="text-red-700 text-center font-bold italic">Aucun résultat trouvé dans la section Incubateurs.</p>
        )}
          </TabsContent>

          {/* Centres de formation */}
          <TabsContent value="formation" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredFormation.map((item) => (
                <Card
                  key={item.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-[#063a1e]/10 rounded-md flex items-center justify-center">
                          <Image
                            src={item.logo}
                            alt="Logo banque"
                            width={1000}
                            height={1000}
                            className="rounded bg-cover bg-center w-full h-full"
                          />
                        </div>
                        <div>
                          <CardTitle>{item.title}</CardTitle>
                          <CardDescription>{item.type}</CardDescription>
                        </div>
                      </div>
                      <div>{item.partenaire}</div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        {item.description}{" "}
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-[#063a1e] mt-0.5" />
                          <span className="text-sm"> {item.adresse} </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Phone className="h-4 w-4 text-[#063a1e] mt-0.5" />
                          <a
                            href={`tel:${item.tel}`}
                            className="text-sm hover:underline underline-offset-4"
                          >
                            {item.tel}
                          </a>
                        </div>
                        <div className="flex items-start gap-2">
                          <Mail className="h-4 w-4 text-[#063a1e] mt-0.5" />
                          <a
                            href={`mailto:${item.mail}`}
                            className="text-sm hover:underline underline-offset-4"
                          >
                            {" "}
                            {item.mail}{" "}
                          </a>
                        </div>
                        <Link
                          target="_blank"
                          href={item.rs1}
                          className="flex text-[rgb(6,58,30)] hover:underline underline-offset-4 items-start gap-2"
                        >
                          {item.textrs1}
                        </Link>
                        <Link
                          target="_blank"
                          href={item.rs2}
                          className="flex text-[rgb(6,58,30)] hover:underline underline-offset-4 items-start gap-2"
                        >
                          {item.textrs2}
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    {/* <Badge variant="outline" className="text-[#063a1e]">
                      Prêts PME
                    </Badge> */}
                    <Link target="_blank" href={item.site}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1 border-[#063a1e] text-[#063a1e] hover:bg-[#063a1e]/10"
                      >
                        Visiter le site <ExternalLink className="h-3 w-3" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
            {filteredFormation.length === 0 && (
          <p className="text-red-700 text-center font-bold italic">Aucun résultat trouvé dans la section Centre de formation.</p>
        )}
          </TabsContent>

          {/* Cabinets conseil */}
          <TabsContent value="conseil" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredCabinet.map((item) => (
                <Card
                  key={item.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-[#063a1e]/10 rounded-md flex items-center justify-center">
                          <Image
                            src={item.logo}
                            alt="Logo banque"
                            width={1000}
                            height={1000}
                            className="rounded bg-cover bg-center w-full h-full"
                          />
                        </div>
                        <div>
                          <CardTitle>{item.title}</CardTitle>
                        </div>
                      </div>
                      <div>{item.partenaire}</div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        {item.description}{" "}
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-[#063a1e] mt-0.5" />
                          <span className="text-sm"> {item.adresse} </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Phone className="h-4 w-4 text-[#063a1e] mt-0.5" />
                          <a
                            href={`tel:${item.tel}`}
                            className="text-sm hover:underline underline-offset-4"
                          >
                            {item.tel}
                          </a>
                        </div>
                        <div className="flex items-start gap-2">
                          <Mail className="h-4 w-4 text-[#063a1e] mt-0.5" />
                          <a
                            href={`mailto:${item.mail}`}
                            className="text-sm hover:underline underline-offset-4"
                          >
                            {" "}
                            {item.mail}{" "}
                          </a>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    {/* <Badge variant="outline" className="text-[#063a1e]">
                      Prêts PME
                    </Badge> */}
                    <Link target="_blank" href={item.site}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1 border-[#063a1e] text-[#063a1e] hover:bg-[#063a1e]/10"
                      >
                        Visiter le site <ExternalLink className="h-3 w-3" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}

            </div>
            {filteredCabinet.length === 0 && (
          <p className="text-red-700 text-center font-bold italic">Aucun résultat trouvé dans la section Cabinet conseil.</p>
        )}
          </TabsContent>

          {/* Structures publiques */}
          <TabsContent value="publiques" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {filteredPublic.map((item) => (
                <Card
                  key={item.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-[#063a1e]/10 rounded-md flex items-center justify-center">
                          <Image
                            src={item.logo}
                            alt="Logo banque"
                            width={1000}
                            height={1000}
                            className="rounded bg-cover bg-center w-full h-full"
                          />
                        </div>
                        <div>
                          <CardTitle>{item.title}</CardTitle>
                        </div>
                      </div>
                      <div>{item.partenaire}</div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        {item.description}{" "}
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 text-[#063a1e] mt-0.5" />
                          <span className="text-sm"> {item.adresse} </span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Phone className="h-4 w-4 text-[#063a1e] mt-0.5" />
                          <a
                            href={`tel:${item.tel}`}
                            className="text-sm hover:underline underline-offset-4"
                          >
                            {item.tel}
                          </a>
                        </div>
                        <div className="flex items-start gap-2">
                          <Mail className="h-4 w-4 text-[#063a1e] mt-0.5" />
                          <a
                            href={`mailto:${item.mail}`}
                            className="text-sm hover:underline underline-offset-4"
                          >
                            {" "}
                            {item.mail}{" "}
                          </a>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    {/* <Badge variant="outline" className="text-[#063a1e]">
                      Prêts PME
                    </Badge> */}
                    <Link target="_blank" href={item.site}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1 border-[#063a1e] text-[#063a1e] hover:bg-[#063a1e]/10"
                      >
                        Visiter le site <ExternalLink className="h-3 w-3" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
            {filteredPublic.length === 0 && (
          <p className="text-red-700 text-center font-bold italic">Aucun résultat trouvé dans la section Structures Publiques.</p>
        )}
          </TabsContent>
          {/* Notification pour les résultats dans d'autres sections */}
    {search && otherSectionResults.length > 0 && (
            <div className="my-6 p-4 bg-[#063a1e]/5 rounded-lg border border-[#063a1e]/10">
              <p className="text-[#063a1e] font-medium mb-2">Résultats trouvés dans d'autres sections :</p>
              <div className="flex flex-wrap gap-2">
                {otherSectionResults.map((result) => (
                  <Button
                    key={result.tab}
                    variant="outline"
                    size="sm"
                    className="gap-1 border-[#063a1e] text-[#063a1e] hover:bg-[#063a1e]/10"
                    onClick={() => setActiveTab(result.tab)}
                  >
                    {result.label} ({result.count}) <ArrowRight className="h-3 w-3" />
                  </Button>
                ))}
              </div>
            </div>
          )}
        </Tabs>

        {/* CTA Section */}
        <div className="mt-12 bg-[#063a1e]/10 p-6 rounded-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-[#063a1e] mb-2">
                Besoin d'accompagnement pour votre entreprise ?
              </h3>
              <p className="text-muted-foreground">
                Abonnez-vous à notre newsletter pour découvrir les structures
                d&apos;accompagnement utiles aux PME, avec leurs coordonnées
                complètes et une description de leurs services. Accédez
                facilement à toutes ces informations depuis notre site.{" "}
              </p>
            </div>
            <Link href="/#subscription">
              <Button className="bg-[#063a1e] hover:bg-[#063a1e]/90 whitespace-nowrap">
                S'abonner à la newsletter
              </Button>
            </Link>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
