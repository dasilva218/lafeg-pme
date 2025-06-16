"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Calendar,
  User,
  Clock,
  ArrowRight,
  Grid,
  List,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

// Données d'actualités
const actualites = [
  {
    id: 1,
    titre: "Nouvelle réglementation pour les PME gabonaises en 2025",
    slug: "nouvelle-reglementation-pme-gabon-2025",
    extrait:
      "Le gouvernement gabonais annonce de nouvelles mesures pour faciliter la création et le développement des PME, incluant des allègements fiscaux et des procédures simplifiées.",
    contenu: `Le Ministère de l'Économie et de la Relance a dévoilé un ensemble de mesures destinées à dynamiser l'écosystème des PME gabonaises. Ces nouvelles dispositions, qui entreront en vigueur dès janvier 2025, visent à simplifier les démarches administratives et à réduire la charge fiscale des petites et moyennes entreprises.

    Parmi les principales mesures annoncées :
    - Réduction de 30% des taxes de création d'entreprise
    - Simplification des procédures d'obtention de licences
    - Création d'un guichet unique numérique
    - Exonération fiscale de 2 ans pour les startups innovantes

    Cette initiative s'inscrit dans le cadre du Plan Stratégique Gabon Émergent et devrait bénéficier à plus de 15 000 PME à travers le pays.`,
    image: "/placeholder.svg?height=400&width=600",
    auteur: "Marie Nguema",
    datePublication: "2024-12-10",
    categorie: "Réglementation",
    tags: ["PME", "Réglementation", "Fiscalité", "Gabon"],
    tempsLecture: "5 min",
    vues: 1250,
    featured: true,
  },
  {
    id: 2,
    titre: "Forum des Entrepreneurs Gabonais : Bilan de l'édition 2024",
    slug: "forum-entrepreneurs-gabonais-bilan-2024",
    extrait:
      "Plus de 500 entrepreneurs se sont réunis à Libreville pour échanger sur les défis et opportunités du secteur privé gabonais.",
    contenu: `Le Forum des Entrepreneurs Gabonais 2024 s'est tenu du 5 au 7 décembre à Libreville, rassemblant plus de 500 participants venus de tout le pays. Cet événement annuel, organisé par la FEG, a été l'occasion de faire le point sur l'évolution du secteur privé gabonais et d'identifier les axes de développement pour 2025.

    Les temps forts de cette édition :
    - 15 conférences thématiques
    - 3 tables rondes sur le financement des PME
    - Un salon d'exposition avec 80 stands
    - Des sessions de networking
    - La remise des Trophées de l'Entrepreneur 2024

    Les participants ont particulièrement apprécié les sessions dédiées à la transformation digitale et aux opportunités d'export vers les marchés régionaux.`,
    image: "/placeholder.svg?height=400&width=600",
    auteur: "Jean-Claude Obame",
    datePublication: "2024-12-08",
    categorie: "Événements",
    tags: ["Forum", "Entrepreneurs", "Networking", "FEG"],
    tempsLecture: "7 min",
    vues: 890,
    featured: true,
  },
  {
    id: 3,
    titre: "Financement des PME : Nouveaux partenariats bancaires",
    slug: "financement-pme-nouveaux-partenariats-bancaires",
    extrait:
      "Trois nouvelles banques rejoignent le programme de financement des PME, offrant des conditions préférentielles aux entrepreneurs gabonais.",
    contenu: `Le secteur bancaire gabonais renforce son engagement envers les PME avec l'arrivée de trois nouveaux partenaires dans le programme national de financement. Cette initiative, soutenue par la Banque Centrale, vise à faciliter l'accès au crédit pour les petites et moyennes entreprises.

    Les nouveaux partenaires proposent :
    - Des taux d'intérêt préférentiels (à partir de 8%)
    - Des garanties simplifiées
    - Un accompagnement personnalisé
    - Des délais de traitement réduits (15 jours maximum)

    Cette expansion du réseau de financement devrait permettre de débloquer plus de 50 milliards de FCFA pour les PME gabonaises en 2025.`,
    image: "/placeholder.svg?height=400&width=600",
    auteur: "Sylvie Mba",
    datePublication: "2024-12-05",
    categorie: "Financement",
    tags: ["Financement", "Banques", "Crédit", "PME"],
    tempsLecture: "4 min",
    vues: 1100,
    featured: false,
  },
  {
    id: 4,
    titre:
      "Transformation digitale : Les PME gabonaises à l'heure du numérique",
    slug: "transformation-digitale-pme-gabonaises-numerique",
    extrait:
      "Une étude révèle que 65% des PME gabonaises ont entamé leur transformation digitale, avec des impacts positifs sur leur croissance.",
    contenu: `Une récente étude menée par l'Institut National de la Statistique révèle l'accélération de la transformation digitale des PME gabonaises. Cette mutation, accélérée par la pandémie, transforme en profondeur le paysage entrepreneurial du pays.

    Principaux enseignements de l'étude :
    - 65% des PME utilisent des outils numériques
    - 40% ont développé une présence en ligne
    - 25% pratiquent le e-commerce
    - Croissance moyenne de 30% pour les entreprises digitalisées

    Les secteurs les plus avancés sont le commerce de détail, les services et l'artisanat. Le gouvernement accompagne cette transition avec des programmes de formation et des subventions pour l'équipement numérique.`,
    image: "/placeholder.svg?height=400&width=600",
    auteur: "Paul Ndong",
    datePublication: "2024-12-03",
    categorie: "Innovation",
    tags: ["Digital", "Innovation", "Technologie", "Croissance"],
    tempsLecture: "6 min",
    vues: 750,
    featured: false,
  },
  {
    id: 5,
    titre: "Export : Les PME gabonaises conquièrent les marchés régionaux",
    slug: "export-pme-gabonaises-marches-regionaux",
    extrait:
      "Les exportations des PME gabonaises vers la sous-région ont augmenté de 45% cette année, portées par l'agroalimentaire et l'artisanat.",
    contenu: `Les PME gabonaises confirment leur dynamisme à l'export avec une croissance remarquable de 45% de leurs exportations vers les pays de la sous-région. Cette performance s'explique par une meilleure structuration de l'offre et un accompagnement renforcé des pouvoirs publics.

    Secteurs porteurs à l'export :
    - Agroalimentaire : +60% (cacao, café, fruits transformés)
    - Artisanat : +40% (sculptures, textiles traditionnels)
    - Cosmétiques naturels : +80%
    - Services numériques : +120%

    Les principaux marchés de destination sont le Cameroun, la Guinée Équatoriale et le Congo. L'Agence de Promotion des Exportations accompagne cette dynamique avec des missions commerciales et des formations spécialisées.`,
    image: "/placeholder.svg?height=400&width=600",
    auteur: "Fatima Allogho",
    datePublication: "2024-12-01",
    categorie: "Commerce",
    tags: ["Export", "Commerce", "Sous-région", "Croissance"],
    tempsLecture: "5 min",
    vues: 920,
    featured: false,
  },
  {
    id: 6,
    titre:
      "Formation professionnelle : Nouveau centre d'excellence à Port-Gentil",
    slug: "formation-professionnelle-centre-excellence-port-gentil",
    extrait:
      "Inauguration d'un centre de formation aux métiers de l'entrepreneuriat et du management, destiné aux dirigeants de PME.",
    contenu: `Port-Gentil accueille un nouveau centre d'excellence dédié à la formation des entrepreneurs et dirigeants de PME. Cette infrastructure moderne, fruit d'un partenariat public-privé, propose des programmes adaptés aux besoins du marché gabonais.

    Programmes proposés :
    - Management et leadership
    - Gestion financière et comptable
    - Marketing digital
    - Développement durable
    - Commerce international

    Le centre dispose d'équipements de pointe, d'une bibliothèque spécialisée et d'espaces de coworking. Les formations sont dispensées par des experts locaux et internationaux, avec un accent sur la pratique et l'accompagnement personnalisé.`,
    image: "/placeholder.svg?height=400&width=600",
    auteur: "Robert Moussounda",
    datePublication: "2024-11-28",
    categorie: "Formation",
    tags: ["Formation", "Entrepreneuriat", "Port-Gentil", "Excellence"],
    tempsLecture: "4 min",
    vues: 680,
    featured: false,
  },
];

const categories = [
  "Toutes",
  "Réglementation",
  "Événements",
  "Financement",
  "Innovation",
  "Commerce",
  "Formation",
];

export default function ActualitesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Toutes");
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("recent");

  // Filtrage et tri des actualités
  const filteredActualites = useMemo(() => {
    const filtered = actualites.filter((article) => {
      const matchesSearch =
        article.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.extrait.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesCategory =
        selectedCategory === "Toutes" || article.categorie === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    // Tri
    switch (sortBy) {
      case "recent":
        filtered.sort(
          (a, b) =>
            new Date(b.datePublication).getTime() -
            new Date(a.datePublication).getTime()
        );
        break;
      case "popular":
        filtered.sort((a, b) => b.vues - a.vues);
        break;
      case "alphabetical":
        filtered.sort((a, b) => a.titre.localeCompare(b.titre));
        break;
    }

    return filtered;
  }, [searchTerm, selectedCategory, sortBy]);

  const featuredArticles = actualites.filter((article) => article.featured);

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-[#063a1e] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#063a1e]/90 to-[#0a4d28]/20" />
        <div className="absolute inset-0 bg-[url('/feg_actu.png?height=600&width=1200')] bg-cover bg-center opacity-20" />
        <div className="relative container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">Actualités</h1>
            <p className="text-xl text-green-100 mb-8">
              Restez informé des dernières nouvelles du monde des PME gabonaises
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Articles à la une */}
        {featuredArticles.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-[#063a1e] mb-8">À la une</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredArticles.map((article) => (
                <Card
                  key={article.id}
                  className="overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="relative h-64">
                    <Image
                      src={article.image || "/placeholder.svg"}
                      alt={article.titre}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-[#063a1e] text-white">
                        {article.categorie}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-[#063a1e] mb-3 line-clamp-2">
                      {article.titre}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {article.extrait}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-4">
                       
                        <div className="flex text-black items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(article.datePublication)}</span>
                        </div>
                        
                      </div>
                    </div>
                    <Link href={`/actualites/${article.slug}`}>
                      <Button className="bg-[#063a1e] hover:bg-[#063a1e]/90 w-full">
                        Lire l'article
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Filtres et recherche */}
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-3/4">
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                  <div className="flex-1 w-full md:w-auto">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input
                        placeholder="Rechercher un article..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 w-full md:w-auto">
                    <Select
                      value={selectedCategory}
                      onValueChange={setSelectedCategory}
                    >
                      <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="Catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="Trier par" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="recent">Plus récent</SelectItem>
                        <SelectItem value="popular">Plus populaire</SelectItem>
                        <SelectItem value="alphabetical">
                          Alphabétique
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="flex border rounded-md">
                      <Button
                        variant={viewMode === "grid" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("grid")}
                        className="rounded-r-none"
                      >
                        <Grid className="w-4 h-4" />
                      </Button>
                      <Button
                        variant={viewMode === "list" ? "default" : "ghost"}
                        size="sm"
                        onClick={() => setViewMode("list")}
                        className="rounded-l-none"
                      >
                        <List className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Liste des articles */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredActualites.map((article) => (
                  <Card
                    key={article.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="relative h-48">
                      <Image
                        src={article.image || "/placeholder.svg"}
                        alt={article.titre}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge variant="secondary">{article.categorie}</Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="text-lg font-semibold text-[#063a1e] mb-2 line-clamp-2">
                        {article.titre}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {article.extrait}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                        <span>{formatDate(article.datePublication)}</span>
                       
                      </div>
                      <Link href={`/actualites/${article.slug}`}>
                        <Button variant="outline" size="sm" className="w-full">
                          Lire la suite
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredActualites.map((article) => (
                  <Card
                    key={article.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    <CardContent className="p-6">
                      <div className="flex gap-4">
                        <div className="relative w-32 h-24 flex-shrink-0">
                          <Image
                            src={article.image || "/placeholder.svg"}
                            alt={article.titre}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-lg font-semibold text-[#063a1e] line-clamp-1">
                              {article.titre}
                            </h3>
                            <Badge variant="secondary" className="ml-2">
                              {article.categorie}
                            </Badge>
                          </div>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                            {article.extrait}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span>{formatDate(article.datePublication)}</span>
                              <span>{article.tempsLecture}</span>
                              <span>{article.vues} vues</span>
                            </div>
                            <Link href={`/actualites/${article.slug}`}>
                              <Button variant="outline" size="sm">
                                Lire
                                <ArrowRight className="w-3 h-3 ml-1" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {filteredActualites.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <p className="text-gray-500 text-lg">
                    Aucun article ne correspond à vos critères de recherche.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("Toutes");
                    }}
                    className="mt-4"
                  >
                    Réinitialiser les filtres
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="space-y-6">
              {/* Catégories */}
              <Card>
                <CardHeader>
                  <h3 className="text-lg font-semibold text-[#063a1e]">
                    Catégories
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {categories.slice(1).map((category) => {
                      const count = actualites.filter(
                        (article) => article.categorie === category
                      ).length;
                      return (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                            selectedCategory === category
                              ? "bg-[#063a1e] text-white"
                              : "hover:bg-gray-100 text-gray-700"
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span>{category}</span>
                            <Badge variant="outline" className="text-xs">
                              {count}
                            </Badge>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
