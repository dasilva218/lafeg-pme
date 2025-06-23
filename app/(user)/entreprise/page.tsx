"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  MapPin,
  Phone,
  Mail,
  Users,
  BookOpen,
  Network,
  ChevronRight,
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
    descriptionLongue:
      "Le Cabinet Juridique Excellence offre des services de conseil juridique adaptés aux besoins des PME et startups. Notre équipe d'experts vous accompagne dans la rédaction de contrats, la création d'entreprise et le conseil juridique général.",
    cahierCharges: "/cahier-entreprise.pdf",

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
    descriptionLongue:
      "TechSolutions Gabon propose des services de développement web, d'applications mobiles et de transformation digitale pour les entreprises. Notre équipe d'experts vous aide à optimiser votre présence en ligne et à améliorer vos processus d'affaires.",
    cahierCharges: "/cahier-techsolutions.pdf",
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
    descriptionLongue:
      "Formation Pro Gabon offre des programmes de formation en management, leadership et développement personnel. Nos formations sont conçues pour aider les professionnels à améliorer leurs compétences et à atteindre leurs objectifs de carrière.",
    cahierCharges: "/cahier-formation.pdf",
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

    services: ["Transport marchandises", "Logistique", "Livraison express"],
    tarifs: {
      "Transport local (tonne)": { membre: "15,000", nonMembre: "30,000" },
      "Livraison express": { membre: "5,000", nonMembre: "10,000" },
      "Logistique (mois)": { membre: "100,000", nonMembre: "200,000" },
    },
  },
];

const tarifsPublication1 = {
  "Tarif Membre": {
    "1 mois": { membre: "50,000" },
    "3 mois": { membre: "133,300" },
    "6 mois": { membre: "234, 600" },
    "12 mois": { membre: "408,200" },
  },
};
const tarifsPublication2 = {
  "Tarif Non-membre": {
    "1 mois": { membre: "80,000" },
    "3 mois": { membre: "210,000" },
    "6 mois": { membre: "370,000" },
    "12 mois": { membre: "670,000" },
  },
};

export default function EntreprisesServices() {
  const [secteurFiltre, setSecteurFiltre] = useState("tous");
  const [localisationFiltre, setLocalisationFiltre] = useState("toutes");
  const [rechercheTexte, setRechercheTexte] = useState("");
  const [selectedEntreprise, setSelectedEntreprise] =
    useState<Entreprise | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  interface Tarif {
    membre: string;
    nonMembre?: string;
  }

  interface Entreprise {
    id: number;
    nom: string;
    secteur: string;
    description: string;
    localisation: string;
    telephone: string;
    email: string;
    website: string;
    logo: string;
    image: string;
    note: number;
    avis: number;
    membreFEG: boolean;
    services: string[];
    tarifs: Record<string, Tarif | undefined>;
    descriptionLongue?: string;
    cahierCharges?: string;
  }

  interface ModalEntreprise extends Entreprise {}

  const openModal = (entreprise: Entreprise) => {
    setSelectedEntreprise(entreprise);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEntreprise(null);
  };

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
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-[#063a1e]">
              Accueil
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span>Offres</span>
            <ChevronRight className="h-4 w-4" />
            <span>Offres de Services</span>
          </div>
        </div>
      </div>
      {/* Hero Section */}
      {isModalOpen && selectedEntreprise && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 shadow-xl relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl font-bold"
            >
              &times;
            </button>

            <h2 className="text-xl font-bold mb-4">{selectedEntreprise.nom}</h2>

            <Image
              src={selectedEntreprise.image || "/placeholder.svg"}
              alt={selectedEntreprise.nom}
              width={600}
              height={300}
              className="w-full h-48 object-cover rounded"
            />

            <p className="mt-4 text-sm text-gray-700 leading-relaxed">
              {selectedEntreprise.descriptionLongue ||
                selectedEntreprise.description}
            </p>

            <div className="mt-4 text-sm text-gray-800 space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                {selectedEntreprise.telephone}
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                {selectedEntreprise.email}
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {selectedEntreprise.localisation}
              </div>
              <div>
                Site web :{" "}
                <a
                  href={`https://${selectedEntreprise.website}`}
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  {selectedEntreprise.website}
                </a>
              </div>
              {selectedEntreprise.cahierCharges && (
                <div>
                  Cahier des charges :{" "}
                  <a
                    href={selectedEntreprise.cahierCharges}
                    target="_blank"
                    className="text-green-600 underline"
                    download
                  >
                    Télécharger le PDF
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <section className="relative bg-gradient-to-r from-[#063a1e] to-[#063a1e]/80 text-white py-16">
        <div className="absolute inset-0 bg-[url('/ban_feg.png?height=600&width=1200')] bg-cover bg-center opacity-10" />
        <div className="container">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold">
              Offre de services des PME
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
                Parcourir les offres
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

                      {/* <div>
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
                      </div> */}

                      <div className="flex items-center gap-2 text-sm text-black/80">
                        <Phone className="h-4 w-4" />
                        <span>{entreprise.telephone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-black/80">
                        <Mail className="h-4 w-4" />
                        <span>{entreprise.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-black/80">
                        <MapPin className="h-4 w-4" />
                        <span>{entreprise.localisation}</span>
                      </div>
                    </CardContent>

                    <CardFooter className="p-4 pt-0 flex flex-col gap-5">
                      <div className="grid grid-cols-2 gap-2 w-full">
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => openModal(entreprise)}
                        >
                          Voir le profil
                        </Button>

                        {/* <Button
                          size="sm"
                          className="bg-[#063a1e] hover:bg-[#063a1e]/90 text-white"
                        >
                          Contacter
                        </Button> */}
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
                {/* Avantages pour les Entreprises Partenaires */}
                <div className="bg-gradient-to-r from-[#063a1e] to-[#063a1e]/80 text-white p-8 rounded-lg">
                  <div className="max-w-4xl flex flex-col justify-center items-center mx-auto">
                    <div className="text-center mb-8">
                      <h2 className="text-3xl font-bold mb-4">
                        Pourquoi publier sur le{" "}
                        <span className="text-[#dcdaa4]">
                          Guide Numérique des PME
                        </span>
                         ?
                      </h2>
                      <p className="text-xl text-white/90">
                        Accélérez votre visibilité, vos ventes et vos
                        opportunités B2B
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                      <div className="bg-white/10 rounded-lg p-6 backdrop-blur">
                        <div className="text-center">
                          <Network className="h-12 w-12 text-[#dcdaa4] mx-auto mb-4" />
                          <h3 className="font-bold text-lg mb-2">
                            Visibilité Ciblée
                          </h3>
                          <p className="text-white/90">
                            Touchez directement un public professionnel, engagé
                            et local
                          </p>
                        </div>
                      </div>

                      {/* <div className="bg-white/10 rounded-lg p-6 backdrop-blur">
                        <div className="text-center">
                          <Handshake className="h-12 w-12 text-[#dcdaa4] mx-auto mb-4" />
                          <h3 className="font-bold text-lg mb-2">
                            Crédibilité Renforcée
                          </h3>
                          <p className="text-white/90">
                            Associez votre image à une institution reconnue du
                            monde économique
                          </p>
                        </div>
                      </div> */}

                      <div className="bg-white/10 rounded-lg p-6 backdrop-blur">
                        <div className="text-center">
                          <Award className="h-12 w-12 text-[#dcdaa4] mx-auto mb-4" />
                          <h3 className="font-bold text-lg mb-2">
                            Offres Valoriséées
                          </h3>
                          <p className="text-white/90">
                            Vos offres sont mises en avant dans une section
                            dédiée du guide
                          </p>
                        </div>
                      </div>

                      <div className="bg-white/10 rounded-lg p-6 backdrop-blur">
                        <div className="text-center">
                          <BookOpen className="h-12 w-12 text-[#dcdaa4] mx-auto mb-4" />
                          <h3 className="font-bold text-lg mb-2">
                            Communication Optimisée
                          </h3>
                          <p className="text-white/90">
                            Profitez de notre audience web, réseaux sociaux et
                            de notre communauté fédérale
                          </p>
                        </div>
                      </div>

                      <div className="bg-white/10 rounded-lg p-6 backdrop-blur">
                        <div className="text-center">
                          <Users className="h-12 w-12 text-[#dcdaa4] mx-auto mb-4" />
                          <h3 className="font-bold text-lg mb-2">
                            Nouvelles Opportunités
                          </h3>
                          <p className="text-white/90">
                            Entrez en contact avec de nouveaux clients,
                            partenaires et fournisseurs
                          </p>
                        </div>
                      </div>

                      {/* <div className="bg-white/10 rounded-lg p-6 backdrop-blur">
                        <div className="text-center">
                          <Gavel className="h-12 w-12 text-[#dcdaa4] mx-auto mb-4" />
                          <h3 className="font-bold text-lg mb-2">
                            Avantage Concurrentiel
                          </h3>
                          <p className="text-white/90">
                            Démarquez-vous avec une présence professionnelle et
                            valorisante
                          </p>
                        </div>
                      </div> */}
                    </div>

                    <div className="flex flex-col mt-8 sm:flex-row sm:justify-center items-center w-full gap-4">
                      <Link href="https://docs.google.com/forms/d/e/1FAIpQLSdvlgJLCxOAtzxaqaXMtT9jTjwbsDx3iXdTVHimcAKCkkMstg/viewform?usp=header">
                        <Button
                          variant="secondary"
                          size="lg"
                          className="bg-[#063a1e] relative hover:bg-white min-w-[200px] group"
                        >
                          <span className="absolute inset-0 w-full h-full bg-[#dcdaa4] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0"></span>
                          <span className="relative mr-3 z-10 transition-colors duration-500 ease-in-out group-hover:text-[#063a1e]">
                            <p>Publier mon offre sur le Guide</p>
                          </span>
                        </Button>
                      </Link>
                      <Link href="https://www.lafeg.ga/home#register">
                        <Button
                          size="lg"
                          className="text-[#063a1e] hover:bg-white/70 duration-300 ease-in-out bg-white border-none font-medium min-w-[200px]"
                        >
                          Devenir membre FEG
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Grille Tarifaire */}
                <div className="bg-white">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-[#063a1e] mb-4">
                      Modalités Tarifaires
                    </h2>
                    <p className="text-lg ">
                      Choisissez le forfait qui correspond à vos besoins
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-3xl mx-auto">
                    {Object.entries(tarifsPublication1).map(
                      ([forfait, tarifs]) => (
                        <Card
                          key={forfait}
                          className={`relative rounded-xl overflow-hidden transition-transform transform hover:scale-[1.01] shadow-md ${
                            forfait === "Tarif membre"
                              ? "border-[#063a1e] border-2 ring-2 ring-[#063a1e]"
                              : "border border-gray-200"
                          }`}
                        >
                          <CardHeader className="text-center bg-gradient-to-r from-[#063a1e] to-[#145c35] text-white py-5">
                            <CardTitle className="text-xl text-[#dcdaa4] font-bold">
                              {forfait}
                            </CardTitle>
                            <CardDescription className="text-sm text-white/80 italic">
                              {forfait === "Profil Basique" &&
                                "Exclusivement pour les membres FEG"}
                              {forfait === "Profil Elite" &&
                                "Pour tout autres types d'entreprises"}
                            </CardDescription>
                          </CardHeader>

                          <CardContent className="space-y-4 p-4  bg-gradient-to-r from-[#063a1e] to-[#145c35]">
                            {Object.entries(tarifs).map(([duree, prix]) => (
                              <div
                                key={duree}
                                className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border"
                              >
                                <span className="font-medium">{duree}</span>
                                <div className="text-right">
                                  {/* <div className="text-sm text-muted-foreground line-through">
                                    {prix.nonMembre} FCFA
                                  </div> */}
                                  <div className="font-bold text-[#063a1e]">
                                    {prix.membre} FCFA
                                  </div>
                                  <div className="text-xs text-green-600">
                                    {forfait === "Profil Basique" &&
                                      "Membre FEG"}
                                  </div>
                                </div>
                              </div>
                            ))}

                            {/* <div className="pt-4 border-t">
                              <h4 className="font-medium mb-2 text-[#063a1e]">
                                Inclus :
                              </h4>
                              <ul className="text-sm space-y-1">
                                <li className="flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 bg-[#063a1e] rounded-full"></div>
                                  Profil entreprise complet
                                </li>
                                <li className="flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 bg-[#063a1e] rounded-full"></div>
                                  Publication de services
                                </li>
                              </ul>
                            </div> */}
                          </CardContent>

                          <CardFooter className="p-4  bg-gradient-to-r from-[#063a1e] to-[#145c35]">
                            {/* <Button
                              className={`w-full rounded-md text-white font-medium ${
                                forfait === "Profil Premium"
                                  ? "bg-[#063a1e] hover:bg-[#063a1e]/90"
                                  : "bg-[#145c35] hover:bg-[#145c35]/90"
                              }`}
                            >
                              Choisir ce forfait
                            </Button> */}
                          </CardFooter>
                        </Card>
                      )
                    )}
                    {Object.entries(tarifsPublication2).map(
                      ([forfait, tarifs]) => (
                        <Card
                          key={forfait}
                          className={`relative rounded-xl overflow-hidden transition-transform transform hover:scale-[1.01] shadow-md ${
                            forfait === "Profil Premium"
                              ? "border-[#063a1e] border-2 ring-2 ring-[#063a1e]"
                              : "border border-gray-200"
                          }`}
                        >
                          <CardHeader className="text-center bg-[#dcdaa4]  py-5">
                            <CardTitle className="text-xl text-[#063a1e] font-bold">
                              {forfait}
                            </CardTitle>
                            <CardDescription className="text-sm text-white/80 italic">
                              {forfait === "Profil Basique" &&
                                "Exclusivement pour les membres FEG"}
                              {forfait === "Profil Elite" &&
                                "Pour tout autres types d'entreprises"}
                            </CardDescription>
                          </CardHeader>

                          <CardContent className="space-y-4 p-4 bg-[#dcdaa4] ">
                            {Object.entries(tarifs).map(([duree, prix]) => (
                              <div
                                key={duree}
                                className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border"
                              >
                                <span className="font-medium">{duree}</span>
                                <div className="text-right">
                                  {/* <div className="text-sm text-muted-foreground line-through">
                                    {prix.nonMembre} FCFA
                                  </div> */}
                                  <div className="font-bold text-[#063a1e]">
                                    {prix.membre} FCFA
                                  </div>
                                  <div className="text-xs text-green-600">
                                    {forfait === "Profil Basique" &&
                                      "Membre FEG"}
                                  </div>
                                </div>
                              </div>
                            ))}

                            {/* <div className="pt-4 border-t">
                              <h4 className="font-medium mb-2 text-[#063a1e]">
                                Inclus :
                              </h4>
                              <ul className="text-sm space-y-1">
                                <li className="flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 bg-[#063a1e] rounded-full"></div>
                                  Profil entreprise complet
                                </li>
                                <li className="flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 bg-[#063a1e] rounded-full"></div>
                                  Publication de services
                                </li>
                              </ul>
                            </div> */}
                          </CardContent>

                          <CardFooter className="p-4  bg-[#dcdaa4]">
                            {/* <Button
                              className={`w-full rounded-md text-white font-medium ${
                                forfait === "Profil Premium"
                                  ? "bg-[#063a1e] hover:bg-[#063a1e]/90"
                                  : "bg-[#145c35] hover:bg-[#145c35]/90"
                              }`}
                            >
                              Choisir ce forfait
                            </Button> */}
                          </CardFooter>
                        </Card>
                      )
                    )}
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
