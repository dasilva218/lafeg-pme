"use client";

import { useState, useMemo } from "react";

import {
  Search,
  Filter,
  ChevronRight,
  Eye,
  ExternalLink,
  Building2,
  Clock,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Données des offres de financement
const offresFinancement = [
  {
    id: 1,
    nom: "CRÉDIT D'INVESTISSEMENT",
    fournisseur: "BCEG",
    type: "Banque",
    but: "Technique de financement destiné à l'acquisition d'un bien nécessaire au bon fonctionnement ou au développement de l'activité : matériels de travail, véhicule, agrandissement de locaux, rachat de fonds de commerce etc",
    montantMin: "3000000",
    montantMax: "Non spécifié",
    devise: "F CFA",
    admissibilite: "Entreprises établies avec projet d'investissement viable",
    documentation: "Dossier de crédit complet, garanties, états financiers",
    remboursement: "6 à 36 mois",
    tauxInteret: "Variable selon profil",
    secteur: "Tous secteurs",
  },
  {
    id: 2,
    nom: "CRÉDIT ÉQUIPEMENT PRO",
    fournisseur: "BCEG",
    type: "Banque",
    but: "Technique de financement permettant l'acquisition à court terme de petits matériels et outillages neufs (pneumatiques, pièces détachées, moteurs hors-bord, matériels bureautiques).",
    montantMin: "1000000",
    montantMax: "Non spécifié",
    devise: "F CFA",
    admissibilite: "PME ayant besoin d'équipements professionnels",
    documentation: "Facture pro forma, garanties",
    remboursement: "3 à 12 mois",
    tauxInteret: "Variable selon profil",
    secteur: "Commerce, Services",
  },
  {
    id: 3,
    nom: "INTRODUCTION EN BOURSE PME",
    fournisseur: "BVMAC",
    type: "Marché financier",
    but: "Levée de capitaux pour croissance sans endettement",
    montantMin: "200000000",
    montantMax: "10000000000",
    devise: "F CFA",
    admissibilite:
      "Personne morale, CA > 1 Md F CFA, 2 ans bénéficiaires, Comptes certifiés",
    documentation:
      "Business plan, États financiers audités, Contrat de liquidité (optionnel)",
    remboursement: "Aucun remboursement",
    tauxInteret: "N/A",
    secteur: "Tous secteurs",
  },
  {
    id: 4,
    nom: "Crédit Investissement",
    fournisseur: "FINAM",
    type: "Institution financière",
    but: "Financement des besoins d'investissement",
    montantMin: "Variable",
    montantMax: "Selon opportunité",
    devise: "F CFA",
    admissibilite: "Client FINAM (3 mois min), Accord du Comité de Crédits",
    documentation:
      "Demande client détaillée, États financiers (2-3 ans), PV du comité",
    remboursement: "Selon contrat",
    tauxInteret: "Variable",
    secteur: "Tous secteurs",
  },
  {
    id: 5,
    nom: "Crédit Tontine",
    fournisseur: "FINAM",
    type: "Institution financière",
    but: "Financement pour clients cotisants à l'épargne tontine",
    montantMin: "Selon cotisation",
    montantMax: "Selon cotisation",
    devise: "F CFA",
    admissibilite:
      "Compte courant, Cotisation tontine (3 mois min), Activité génératrice de revenus",
    documentation: "Pièce d'identité, Caution solidaire",
    remboursement: "Selon accord",
    tauxInteret: "Préférentiel",
    secteur: "Tous secteurs",
  },
  {
    id: 6,
    nom: "Crédit Trésorerie",
    fournisseur: "FINAM",
    type: "Institution financière",
    but: "Financement du fonctionnement courant",
    montantMin: "Variable",
    montantMax: "Selon garanties",
    devise: "F CFA",
    admissibilite:
      "Activité génératrice de revenus, Fiche circuit, Domiciliation des recettes",
    documentation: "Pièce d'identité, Garanties (selon montant)",
    remboursement: "Court terme",
    tauxInteret: "Variable",
    secteur: "Tous secteurs",
  },
  {
    id: 7,
    nom: "Crédit PME",
    fournisseur: "Bamboo EMF",
    type: "Microfinance",
    but: "Financement diversifié (investissement ou trésorerie)",
    montantMin: "Variable",
    montantMax: "Selon solvabilité",
    devise: "F CFA",
    admissibilite: "Compte actif (3 mois min), Revenus réguliers",
    documentation:
      "Pièce d'identité, 3 derniers bilans/relevés bancaires, Plan d'affaires, Quittance SEEG, Lettre de demande",
    remboursement: "Flexible",
    tauxInteret: "Compétitif",
    secteur: "PME",
  },
  {
    id: 8,
    nom: "Microcrédits",
    fournisseur: "SODEC",
    type: "Institution publique",
    but: "Financement de projets de développement économique",
    montantMin: "200000",
    montantMax: "1500000",
    devise: "F CFA",
    admissibilite: "Projet viable, Engagement personnel",
    documentation: "Fiche circuit, Plan simplifié",
    remboursement: "3-12 mois",
    tauxInteret: "6% taux annuel",
    secteur: "Tous secteurs",
  },
];

export default function OffresFinancementPage() {
  const [selectedOffres, setSelectedOffres] = useState<OffreFinancement[]>([]);

  interface OffreFinancement {
    id: number;
    nom: string;
    fournisseur: string;
    type: string;
    but: string;
    montantMin: string;
    montantMax: string;
    devise: string;
    admissibilite: string;
    documentation: string;
    remboursement: string;
    tauxInteret: string;
    secteur: string;
  }

  const toggleOffreSelection = (offre: OffreFinancement) => {
    setSelectedOffres((prev: OffreFinancement[]) => {
      const isSelected = prev.find((o) => o.id === offre.id);
      if (isSelected) {
        return prev.filter((o) => o.id !== offre.id);
      } else if (prev.length < 3) {
        return [...prev, offre];
      }
      return prev;
    });
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterSecteur, setFilterSecteur] = useState("all");
  const [selectedOffre, setSelectedOffre] = useState<OffreFinancement | null>(
    null
  );

  // Filtrage des offres
  const filteredOffres = useMemo(() => {
    return offresFinancement.filter((offre) => {
      const matchesSearch =
        offre.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offre.fournisseur.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offre.but.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType = filterType === "all" || offre.type === filterType;
      const matchesSecteur =
        filterSecteur === "all" || offre.secteur.includes(filterSecteur);

      return matchesSearch && matchesType && matchesSecteur;
    });
  }, [searchTerm, filterType, filterSecteur]);

  // Types et secteurs uniques pour les filtres
  const types = [...new Set(offresFinancement.map((offre) => offre.type))];
  const secteurs = [
    ...new Set(offresFinancement.flatMap((offre) => offre.secteur.split(", "))),
  ];

  interface FormatMontantParams {
    min: string;
    max: string;
    devise: string;
  }

  const formatMontant = (min: string, max: string, devise: string): string => {
    if (
      min === "Variable" ||
      min === "Selon cotisation" ||
      min === "Selon opportunité"
    ) {
      return min;
    }
    const minFormatted: string = Number.parseInt(min).toLocaleString();
    if (
      max === "Non spécifié" ||
      max === "Selon opportunité" ||
      max === "Selon garanties" ||
      max === "Selon solvabilité"
    ) {
      return `À partir de ${minFormatted} ${devise}`;
    }
    const maxFormatted: string = Number.parseInt(max).toLocaleString();
    return `${minFormatted} - ${maxFormatted} ${devise}`;
  };

  interface TypeColorMap {
    [key: string]: string;
  }

  const getTypeColor = (type: string): string => {
    const typeColorMap: TypeColorMap = {
      Banque: "bg-blue-100 text-blue-800",
      Microfinance: "bg-green-100 text-green-800",
      "Institution financière": "bg-purple-100 text-purple-800",
      "Institution publique": "bg-orange-100 text-orange-800",
      "Marché financier": "bg-red-100 text-red-800",
    };
    return typeColorMap[type] ?? "bg-gray-100 text-gray-800";
  };

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
            <span>Offres</span>
            <ChevronRight className="h-4 w-4" />
            <span>Instruments Financiers</span>
          </div>
        </div>
      </div>
      {/* Header */}
      <div className="bg-[#063a1e] relative text-white py-16">
        <div className="absolute inset-0 bg-[url('/images/offre.jpg?height=600&width=1200')] bg-cover bg-center opacity-20" />
        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">
              Instruments Financiers
            </h1>
            <p className="text-xl text-green-100 mb-8">
              Découvrez et comparez les opportunités de financement disponibles
              pour les PME gabonaises
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filtres et recherche */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filtres et recherche
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Rechercher une offre..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue placeholder="Type d'institution" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  {types.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filterSecteur} onValueChange={setFilterSecteur}>
                <SelectTrigger>
                  <SelectValue placeholder="Secteur d'activité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les secteurs</SelectItem>
                  {secteurs.map((secteur) => (
                    <SelectItem key={secteur} value={secteur}>
                      {secteur}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Système de comparaison */}
        {selectedOffres.length > 0 && (
          <Card className="mb-8 border-[#063a1e] border-2">
            <CardHeader className="bg-[#063a1e] text-white">
              <CardTitle className="flex items-center justify-between">
                <span>Comparaison des offres ({selectedOffres.length})</span>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setSelectedOffres([])}
                >
                  Vider la sélection
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Critère</th>
                      {selectedOffres.map((offre) => (
                        <th
                          key={offre.id}
                          className="text-left p-2 min-w-[200px]"
                        >
                          {offre.nom}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2 font-medium">Fournisseur</td>
                      {selectedOffres.map((offre) => (
                        <td key={offre.id} className="p-2">
                          {offre.fournisseur}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-medium">Montant</td>
                      {selectedOffres.map((offre) => (
                        <td key={offre.id} className="p-2">
                          {formatMontant(
                            offre.montantMin,
                            offre.montantMax,
                            offre.devise
                          )}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-medium">Taux</td>
                      {selectedOffres.map((offre) => (
                        <td key={offre.id} className="p-2">
                          {offre.tauxInteret}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-medium">Durée</td>
                      {selectedOffres.map((offre) => (
                        <td key={offre.id} className="p-2">
                          {offre.remboursement}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tableau des offres */}
        <Card>
          <CardHeader>
            <CardTitle>Instruments Financiers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 text-base text-black">
              Vous pouvez sélectionner jusqu'à{" "}
              <span className="font-semibold text-[#063a1e]">3 offres</span>{" "}
              pour les comparer.
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom de l'offre</TableHead>
                    <TableHead>Fournisseur</TableHead>
                    <TableHead className="text-center">Type</TableHead>
                    <TableHead>Montant</TableHead>
                    <TableHead>Remboursement</TableHead>
                    <TableHead>Taux</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOffres.map((offre) => (
                    <TableRow key={offre.id} className="hover:bg-gray-50">
                      <TableCell className="font-medium">
                        <div>
                          <p className="font-semibold text-[#063a1e]">
                            {offre.nom}
                          </p>
                          <p className="text-sm text-gray-600 truncate max-w-xs">
                            {offre.but.substring(0, 80)}...
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">
                            {offre.fournisseur}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge
                          variant="default"
                          className={`w-fit text-xs text-center ${getTypeColor(
                            offre.type
                          )}`}
                        >
                          {offre.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium text-green-600">
                          {formatMontant(
                            offre.montantMin,
                            offre.montantMax,
                            offre.devise
                          )}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-green-900" />
                          <span className="text-sm">{offre.remboursement}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm font-medium">
                          {offre.tauxInteret}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedOffre(offre)}
                              >
                                <Eye className="w-4 h-4 mr-1" />
                                Détails
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle className="flex items-center gap-2">
                                  <Building2 className="w-5 h-5" />
                                  {selectedOffre?.nom}
                                </DialogTitle>
                              </DialogHeader>
                              {selectedOffre && (
                                <div className="space-y-6">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                      <h4 className="font-semibold mb-2">
                                        Informations générales
                                      </h4>
                                      <div className="space-y-2 text-sm">
                                        <p>
                                          <strong>Fournisseur:</strong>{" "}
                                          {selectedOffre.fournisseur}
                                        </p>
                                        <p>
                                          <strong>Type:</strong>{" "}
                                          <Badge
                                            className={getTypeColor(
                                              selectedOffre.type
                                            )}
                                          >
                                            {selectedOffre.type}
                                          </Badge>
                                        </p>
                                        <p>
                                          <strong>Secteur:</strong>{" "}
                                          {selectedOffre.secteur}
                                        </p>
                                        <p>
                                          <strong>Taux d'intérêt:</strong>{" "}
                                          {selectedOffre.tauxInteret}
                                        </p>
                                      </div>
                                    </div>
                                    <div>
                                      <h4 className="font-semibold mb-2">
                                        Conditions financières
                                      </h4>
                                      <div className="space-y-2 text-sm">
                                        <p>
                                          <strong>Montant:</strong>{" "}
                                          {formatMontant(
                                            selectedOffre.montantMin,
                                            selectedOffre.montantMax,
                                            selectedOffre.devise
                                          )}
                                        </p>
                                        <p>
                                          <strong>
                                            Durée de remboursement:
                                          </strong>{" "}
                                          {selectedOffre.remboursement}
                                        </p>
                                      </div>
                                    </div>
                                  </div>

                                  <div>
                                    <h4 className="font-semibold mb-2">
                                      Objectif du financement
                                    </h4>
                                    <p className="text-sm text-gray-700">
                                      {selectedOffre.but}
                                    </p>
                                  </div>

                                  <div>
                                    <h4 className="font-semibold mb-2">
                                      Conditions d'admissibilité
                                    </h4>
                                    <p className="text-sm text-gray-700">
                                      {selectedOffre.admissibilite}
                                    </p>
                                  </div>

                                  <div>
                                    <h4 className="font-semibold mb-2">
                                      Documentation requise
                                    </h4>
                                    <p className="text-sm text-gray-700">
                                      {selectedOffre.documentation}
                                    </p>
                                  </div>

                                  <div className="flex gap-2 pt-4 border-t">
                                    <Button className="bg-[#063a1e] hover:bg-[#063a1e]/90">
                                      <ExternalLink className="w-4 h-4 mr-2" />
                                      Contacter le fournisseur
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>

                          <Button
                            variant={
                              selectedOffres.find((o) => o.id === offre.id)
                                ? "secondary"
                                : "default"
                            }
                            size="sm"
                            onClick={() => toggleOffreSelection(offre)}
                            disabled={
                              !selectedOffres.find((o) => o.id === offre.id) &&
                              selectedOffres.length >= 3
                            }
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            {selectedOffres.find((o) => o.id === offre.id)
                              ? "Sélectionné"
                              : "Comparer"}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredOffres.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  Aucune offre ne correspond à vos critères de recherche.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
