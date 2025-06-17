"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  MapPin,
  Phone,
  Mail,
  Star,
  Users,
    BookOpen,
    Handshake,
    Network,
    Gavel,
    // UserGroup,
  Award,
  Building2,
  Briefcase,
  GraduationCap,
  Hammer,
  Truck,
  Heart,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const secteurs = [
  { id: "tous", name: "Tous les secteurs", icon: Building2 },
  { id: "conseil", name: "Conseil & Expertise", icon: Briefcase },
  { id: "technologie", name: "Technologies & Digital", icon: Building2 },
  { id: "formation", name: "Formation & Développement", icon: GraduationCap },
  { id: "construction", name: "Construction & BTP", icon: Hammer },
  { id: "transport", name: "Transport & Logistique", icon: Truck },
  { id: "sante", name: "Santé & Bien-être", icon: Heart },
];

const entreprises = [
  {
    id: 1,
    nom: "Cabinet Juridique Excellence",
    secteur: "conseil",
    description: "Spécialisé dans le conseil juridique pour PME et startups.",
    localisation: "Libreville",
    telephone: "+241 01 23 45 67",
    email: "contact@excellence-juridique.ga",
    website: "www.excellence-juridique.ga",
    logo: "/logo.jpg?height=80&width=80",
    image: "/AFRIJET.jpg?height=200&width=300",
    note: 4.8,
    avis: 24,
    membreFEG: true,
    premium: true,
    services: [
      "Conseil juridique",
      "Rédaction de contrats",
      "Accompagnement création d'entreprise",
    ],
    tarifs: {
      "Consultation juridique (1h)": { membre: "25,000", nonMembre: "50,000" },
      "Rédaction contrat": { membre: "75,000", nonMembre: "150,000" },
      "Accompagnement création": { membre: "125,000", nonMembre: "250,000" },
    },
  },
  {
    id: 2,
    nom: "TechSolutions Gabon",
    secteur: "technologie",
    description: "Solutions digitales et développement web pour entreprises.",
    localisation: "Libreville",
    telephone: "+241 01 23 45 68",
    email: "info@techsolutions.ga",
    website: "www.techsolutions.ga",
    logo: "/logo.jpg?height=80&width=80",
    image: "/gwen.jpg?height=200&width=300",
    note: 4.6,
    avis: 18,
    membreFEG: true,
    premium: false,
    services: [
      "Développement web",
      "Applications mobiles",
      "Transformation digitale",
    ],
    tarifs: {
      "Site web vitrine": { membre: "250,000", nonMembre: "500,000" },
      "Application mobile": { membre: "500,000", nonMembre: "1,000,000" },
      "Consultation digitale": { membre: "30,000", nonMembre: "60,000" },
    },
  },
  {
    id: 3,
    nom: "Formation Pro Gabon",
    secteur: "formation",
    description: "Formation professionnelle et développement des compétences.",
    localisation: "Port-Gentil",
    telephone: "+241 01 23 45 69",
    email: "contact@formationpro.ga",
    website: "www.formationpro.ga",
    logo: "/logo.jpg?height=80&width=80",
    image: "/matia.jpg?height=200&width=300",
    note: 4.7,
    avis: 31,
    membreFEG: false,
    premium: true,
    services: [
      "Formation en management",
      "Certification professionnelle",
      "Coaching d'équipe",
    ],
    tarifs: {
      "Formation management (2j)": { membre: "100,000", nonMembre: "200,000" },
      "Coaching individuel (1h)": { membre: "20,000", nonMembre: "40,000" },
      Certification: { membre: "150,000", nonMembre: "300,000" },
    },
  },
  {
    id: 4,
    nom: "Audit & Expertise Comptable",
    secteur: "conseil",
    description: "Services comptables et d'audit pour PME.",
    localisation: "Libreville",
    telephone: "+241 01 23 45 70",
    email: "audit@expertise-comptable.ga",
    website: "www.expertise-comptable.ga",
    logo: "/placeholder.svg?height=80&width=80",
    image: "/placeholder.svg?height=200&width=300",
    note: 4.9,
    avis: 42,
    membreFEG: true,
    premium: true,
    services: ["Comptabilité générale", "Audit financier", "Conseil fiscal"],
    tarifs: {
      "Tenue comptabilité (mois)": { membre: "75,000", nonMembre: "150,000" },
      "Audit annuel": { membre: "300,000", nonMembre: "600,000" },
      "Conseil fiscal (1h)": { membre: "25,000", nonMembre: "50,000" },
    },
  },
  {
    id: 5,
    nom: "BTP Construction Plus",
    secteur: "construction",
    description: "Construction et rénovation pour entreprises.",
    localisation: "Franceville",
    telephone: "+241 01 23 45 71",
    email: "contact@btp-plus.ga",
    website: "www.btp-plus.ga",
    logo: "/placeholder.svg?height=80&width=80",
    image: "/placeholder.svg?height=200&width=300",
    note: 4.4,
    avis: 16,
    membreFEG: true,
    premium: false,
    services: ["Construction bureaux", "Rénovation locaux", "Aménagement"],
    tarifs: {
      "Étude de projet": { membre: "50,000", nonMembre: "100,000" },
      "Construction (m²)": { membre: "75,000", nonMembre: "150,000" },
      "Rénovation (m²)": { membre: "40,000", nonMembre: "80,000" },
    },
  },
  {
    id: 6,
    nom: "Transport Express Gabon",
    secteur: "transport",
    description: "Solutions de transport et logistique.",
    localisation: "Libreville",
    telephone: "+241 01 23 45 72",
    email: "info@transport-express.ga",
    website: "www.transport-express.ga",
    logo: "/placeholder.svg?height=80&width=80",
    image: "/placeholder.svg?height=200&width=300",
    note: 4.3,
    avis: 28,
    membreFEG: false,
    premium: false,
    services: ["Transport marchandises", "Logistique", "Livraison express"],
    tarifs: {
      "Transport local (tonne)": { membre: "15,000", nonMembre: "30,000" },
      "Livraison express": { membre: "5,000", nonMembre: "10,000" },
      "Logistique (mois)": { membre: "100,000", nonMembre: "200,000" },
    },
  },
];

const tarifsPublication = {
  "Profil Basique": {
    "1 mois": { membre: "15,000", nonMembre: "30,000" },
    "3 mois": { membre: "40,000", nonMembre: "80,000" },
    "6 mois": { membre: "70,000", nonMembre: "140,000" },
    "12 mois": { membre: "120,000", nonMembre: "240,000" },
  },
  "Profil Premium": {
    "1 mois": { membre: "25,000", nonMembre: "50,000" },
    "3 mois": { membre: "65,000", nonMembre: "130,000" },
    "6 mois": { membre: "115,000", nonMembre: "230,000" },
    "12 mois": { membre: "200,000", nonMembre: "400,000" },
  },
  "Profil Elite": {
    "1 mois": { membre: "40,000", nonMembre: "80,000" },
    "3 mois": { membre: "105,000", nonMembre: "210,000" },
    "6 mois": { membre: "185,000", nonMembre: "370,000" },
    "12 mois": { membre: "320,000", nonMembre: "640,000" },
  },
};

export default function EntreprisesServices() {
  const [secteurFiltre, setSecteurFiltre] = useState("tous");
  const [localisationFiltre, setLocalisationFiltre] = useState("toutes");
  const [rechercheTexte, setRechercheTexte] = useState("");

  const entreprisesFiltrees = entreprises.filter((entreprise) => {
    const matchSecteur =
      secteurFiltre === "tous" || entreprise.secteur === secteurFiltre;
    const matchLocalisation =
      localisationFiltre === "toutes" ||
      entreprise.localisation === localisationFiltre;
    const matchRecherche =
      rechercheTexte === "" ||
      entreprise.nom.toLowerCase().includes(rechercheTexte.toLowerCase()) ||
      entreprise.description
        .toLowerCase()
        .includes(rechercheTexte.toLowerCase()) ||
      entreprise.services.some((service) =>
        service.toLowerCase().includes(rechercheTexte.toLowerCase())
      );

    return matchSecteur && matchLocalisation && matchRecherche;
  });

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#063a1e] to-[#063a1e]/80 text-white py-16">
        <div className="absolute inset-0 bg-[url('/ban_feg.png?height=600&width=1200')] bg-cover bg-center opacity-10" />
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold">
              Entreprises & Services
            </h1>
            <p className="text-xl text-white/90">
              Découvrez les services proposés par les entreprises gabonaises et
              publiez vos propres offres
            </p>

            {/* Statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/10 rounded-lg p-6 backdrop-blur">
                <div className="text-3xl font-bold text-[#dcdaa4]">150+</div>
                <div className="text-white/90">Entreprises inscrites</div>
              </div>
              <div className="bg-white/10 rounded-lg p-6 backdrop-blur">
                <div className="text-3xl font-bold text-[#dcdaa4]">500+</div>
                <div className="text-white/90">Services proposés</div>
              </div>
              <div className="bg-white/10 rounded-lg p-6 backdrop-blur">
                <div className="text-3xl font-bold text-[#dcdaa4]">85%</div>
                <div className="text-white/90">Membres FEG</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Navigation */}
      <section className="py-8 bg-white border-b">
        <div className="container">
          <Tabs defaultValue="entreprises" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
              <TabsTrigger value="entreprises">
                Parcourir les entreprises
              </TabsTrigger>
              <TabsTrigger value="publier">Publier mes services</TabsTrigger>
            </TabsList>

            <TabsContent value="entreprises" className="mt-8">
              {/* Filtres et Recherche */}
              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Rechercher une entreprise..."
                      className="pl-10"
                      value={rechercheTexte}
                      onChange={(e) => setRechercheTexte(e.target.value)}
                    />
                  </div>

                  <Select
                    value={secteurFiltre}
                    onValueChange={setSecteurFiltre}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Secteur d'activité" />
                    </SelectTrigger>
                    <SelectContent>
                      {secteurs.map((secteur) => (
                        <SelectItem key={secteur.id} value={secteur.id}>
                          {secteur.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={localisationFiltre}
                    onValueChange={setLocalisationFiltre}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Localisation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="toutes">Toutes les villes</SelectItem>
                      <SelectItem value="Libreville">Libreville</SelectItem>
                      <SelectItem value="Port-Gentil">Port-Gentil</SelectItem>
                      <SelectItem value="Franceville">Franceville</SelectItem>
                      <SelectItem value="Oyem">Oyem</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button
                    variant="outline"
                    onClick={() => {
                      setSecteurFiltre("tous");
                      setLocalisationFiltre("toutes");
                      setRechercheTexte("");
                    }}
                  >
                    Réinitialiser
                  </Button>
                </div>
              </div>

              {/* Liste des entreprises */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {entreprisesFiltrees.map((entreprise) => (
                  <Card
                    key={entreprise.id}
                    className={`transition-transform transform hover:scale-[1.02] border-2 rounded-xl 
                     `}
                  >
                    <CardHeader className="p-4 pb-2 bg-gradient-to-r from-[#063a1e] to-[#145c35] text-white rounded-t-xl">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <Image
                            src={entreprise.logo || "/placeholder.svg"}
                            alt={`Logo ${entreprise.nom}`}
                            width={60}
                            height={60}
                            className="rounded-md bg-white p-1"
                          />
                          <div>
                            <CardTitle className="text-lg font-bold bg-gradient-to-r from-[#dcdaa4] to-[#bdbd95] bg-clip-text text-transparent">
                              {entreprise.nom}
                            </CardTitle>
                            <p className="text-xs text-white/80 italic">
                              {entreprise.secteur}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          {entreprise.membreFEG && (
                            <Badge className="bg-white text-[#063a1e] text-xs">
                              Membre FEG
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-3 p-4">
                      <Image
                        src={entreprise.image || "/placeholder.svg"}
                        alt={entreprise.nom}
                        width={600}
                        height={200}
                        className="w-full h-40 object-cover rounded-lg"
                      />

                      <p className="text-sm text-gray-700 leading-relaxed font-light">
                        {entreprise.description}
                      </p>

                      <div>
                        <h4 className="text-sm font-semibold mb-1">
                          Services phares :
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {entreprise.services
                            .slice(0, 3)
                            .map((service, index) => (
                              <Badge
                                key={index}
                                className="bg-gray-100 text-gray-800 text-xs border"
                              >
                                {service}
                              </Badge>
                            ))}
                          {entreprise.services.length > 3 && (
                            <Badge className="bg-gray-200 text-gray-800 text-xs border">
                              +{entreprise.services.length - 3} autres
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{entreprise.localisation}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        <span>{entreprise.telephone}</span>
                      </div>
                      <ul className="text-sm text-gray-700 list-decimal list-inside space-y-1">
  <li><span className="font-semibold">Prise de contact :</span> le client remplit un formulaire en ligne.</li>
  <li><span className="font-semibold"> Vérification :</span> l&apos;équipe commerciale analyse la demande sous 24h.</li>
  <li><span className="font-semibold"> Mise en œuvre :</span> les services sont activés sous 48h après validation.</li>
  <li><span className="font-semibold"> Suivi :</span> un conseiller est affecté pour assurer l'accompagnement.</li>
</ul>

                    </CardContent>

                    <CardFooter className="p-4 pt-0 flex flex-col gap-2">
                      <div className="grid grid-cols-2 gap-2 w-full">
                        {/* <Button variant="outline" size="sm">
                          Voir le profil
                        </Button> */}
                        <Button
                          size="sm"
                          className="bg-[#063a1e] hover:bg-[#063a1e]/90 text-white"
                        >
                          Contacter
                        </Button>
                      </div>

                      <div className="text-xs text-gray-500 w-full text-center">
                        Site web :{" "}
                        <a
                          href={`https://${entreprise.website}`}
                          target="_blank"
                          className="text-blue-600 underline"
                        >
                          {entreprise.website}
                        </a>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {entreprisesFiltrees.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    Aucune entreprise ne correspond à vos critères de recherche.
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="publier" className="mt-8">
              {/* Section Modalités Tarifaires */}
              <div className="space-y-8">
                {/* Avantages Membres FEG */}
                <div className="bg-gradient-to-r from-[#063a1e] to-[#063a1e]/80 text-white p-8 rounded-lg">
                  <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-8">
                      <h2 className="text-3xl font-bold mb-4">
                        Avantages Membres{" "}
                        <span className="text-[#dcdaa4]">FEG</span>
                      </h2>
                      {/* <p className="text-xl text-white/90">
                        Bénéficiez de{" "}
                        <span className="font-bold text-[#dcdaa4]">
                          50 % de réduction
                        </span>{" "}
                        sur nos services*
                      </p>
                      <p className="text-sm text-white/70 mt-2 italic">
                        *Services personnalisés, formations, publications,
                        réseautage…
                      </p> */}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-white/10 rounded-lg p-6 backdrop-blur">
                        <div className="text-center">
                          <Award className="h-12 w-12 text-[#dcdaa4] mx-auto mb-4" />
                          <h3 className="font-bold text-lg mb-2">
                            Tarifs Préférentiels
                          </h3>
                          <p className="text-white/90">
                            -50 % sur la publication et services personnalisés
                          </p>
                        </div>
                      </div>

                      <div className="bg-white/10 rounded-lg p-6 backdrop-blur">
                        <div className="text-center">
                          <BookOpen className="h-12 w-12 text-[#dcdaa4] mx-auto mb-4" />
                          <h3 className="font-bold text-lg mb-2">
                            Veille & Publications
                          </h3>
                          <p className="text-white/90">
                            Accès à circulaires, newsletter, veille
                            institutionnelle
                          </p>
                        </div>
                      </div>

                      <div className="bg-white/10 rounded-lg p-6 backdrop-blur">
                        <div className="text-center">
                          <Users className="h-12 w-12 text-[#dcdaa4] mx-auto mb-4" />
                          <h3 className="font-bold text-lg mb-2">
                            Formations & Coaching
                          </h3>
                          <p className="text-white/90">
                            Cycles de formation et accompagnement professionnel
                          </p>
                        </div>
                      </div>

                      <div className="bg-white/10 rounded-lg p-6 backdrop-blur">
                        <div className="text-center">
                          <Handshake className="h-12 w-12 text-[#dcdaa4] mx-auto mb-4" />
                          <h3 className="font-bold text-lg mb-2">
                            Dialogue Public‑Privé
                          </h3>
                          <p className="text-white/90">
                            Participation aux négociations & représentations
                            institutionnelles
                          </p>
                        </div>
                      </div>

                      <div className="bg-white/10 rounded-lg p-6 backdrop-blur">
                        <div className="text-center">
                          <Network className="h-12 w-12 text-[#dcdaa4] mx-auto mb-4" />
                          <h3 className="font-bold text-lg mb-2">
                            Réseau d’Affaires
                          </h3>
                          <p className="text-white/90">
                            Forums, assemblées générales, salons & opportunités
                            business
                          </p>
                        </div>
                      </div>

                      <div className="bg-white/10 rounded-lg p-6 backdrop-blur">
                        <div className="text-center">
                          <Gavel className="h-12 w-12 text-[#dcdaa4] mx-auto mb-4" />
                          <h3 className="font-bold text-lg mb-2">
                            Médiation & Arbitrage
                          </h3>
                          <p className="text-white/90">
                            Règlement confidentiel et amiable des litiges
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="text-center mt-8">
                      <Button
                        size="lg"
                        className="bg-gradient-to-r from-[#dcdaa4] to-[#bdbd95] text-[#063a1e] hover:from-[#e6e4b4] hover:to-[#c7c7a0] font-medium"
                      >
                        Devenir Membre FEG
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Grille Tarifaire */}
                <div className="bg-white">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-[#063a1e] mb-4">
                      Modalités Tarifaires
                    </h2>
                    <p className="text-lg text-muted-foreground">
                      Choisissez le forfait qui correspond à vos besoins
                    </p>
                  </div>

                  <div className="flex flex-col justify-center items-center gap-8">
                    <Card className="relative w-full max-w-2xl border-[#063a1e] border-2">
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-[#063a1e] text-white">
                          Recommandé
                        </Badge>
                      </div>

                      <CardHeader className="text-center">
                        <CardTitle className="text-xl">
                          Profil Standard
                        </CardTitle>
                        {/* <CardDescription>Le plus populaire</CardDescription> */}
                      </CardHeader>

                      <CardContent className="space-y-4">
                        {Object.entries(
                          tarifsPublication["Profil Premium"]
                        ).map(([duree, prix]) => (
                          <div
                            key={duree}
                            className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                          >
                            <span className="font-medium">{duree}</span>
                            <div className="text-right">
                              <div className="text-sm text-muted-foreground line-through">
                                {prix.nonMembre} FCFA
                              </div>
                              <div className="font-bold text-[#063a1e]">
                                {prix.membre} FCFA
                              </div>
                              <div className="text-xs text-green-600">
                                Membre FEG
                              </div>
                            </div>
                          </div>
                        ))}

                        <div className="pt-4 border-t">
                          <h4 className="font-medium mb-2">Inclus :</h4>
                          <ul className="text-sm space-y-1">
                            <li className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-[#063a1e] rounded-full"></div>
                              Profil entreprise complet
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-[#063a1e] rounded-full"></div>
                              Publication de services
                            </li>
                            <li className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-[#063a1e] rounded-full"></div>
                              Mise en avant premium
                            </li>
                          </ul>
                        </div>
                      </CardContent>

                      <CardFooter>
                        <Button className="w-full bg-[#063a1e] hover:bg-[#063a1e]/90">
                          Choisir ce forfait
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </div>

                {/* Processus de Publication 
                <div className="bg-gray-50 p-8 rounded-lg">
                  <h3 className="text-2xl font-bold text-[#063a1e] mb-6 text-center">
                    Comment publier vos services ?
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-[#063a1e] text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                        1
                      </div>
                      <h4 className="font-medium mb-2">Inscription</h4>
                      <p className="text-sm text-muted-foreground">
                        Créez votre compte entreprise
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-12 h-12 bg-[#063a1e] text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                        2
                      </div>
                      <h4 className="font-medium mb-2">Profil</h4>
                      <p className="text-sm text-muted-foreground">
                        Complétez votre profil entreprise
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-12 h-12 bg-[#063a1e] text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                        3
                      </div>
                      <h4 className="font-medium mb-2">Forfait</h4>
                      <p className="text-sm text-muted-foreground">
                        Choisissez votre forfait
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-12 h-12 bg-[#063a1e] text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                        4
                      </div>
                      <h4 className="font-medium mb-2">Publication</h4>
                      <p className="text-sm text-muted-foreground">
                        Publiez vos services
                      </p>
                    </div>
                  </div>

                  <div className="text-center mt-8">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-[#dcdaa4] to-[#bdbd95] text-[#063a1e] hover:from-[#e6e4b4] hover:to-[#c7c7a0] font-medium"
                    >
                      Commencer maintenant
                    </Button>
                  </div>
                </div>*/}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
