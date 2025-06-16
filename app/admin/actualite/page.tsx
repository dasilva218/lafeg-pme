"use client"

import { useState } from "react"
import { Search, Plus, Edit, Trash2, Eye, MoreHorizontal, Calendar, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

// Données fictives pour les actualités
const actualites = [
  {
    id: 1,
    titre: "Séminaire sur le droit OHADA le 15 juin 2025",
    categorie: "Événement",
    datePublication: "10/05/2025",
    dateEvenement: "15/06/2025",
    statut: "Publié",
    auteur: "Admin",
  },
  {
    id: 2,
    titre: "Nouveau décret sur les avantages fiscaux pour les startups gabonaises",
    categorie: "Législation",
    datePublication: "05/05/2025",
    dateEvenement: null,
    statut: "Publié",
    auteur: "Admin",
  },
  {
    id: 3,
    titre: "Publication du guide pratique sur la création d'entreprise au Gabon",
    categorie: "Publication",
    datePublication: "01/05/2025",
    dateEvenement: null,
    statut: "Publié",
    auteur: "Modérateur",
  },
  {
    id: 4,
    titre: "Consultations juridiques gratuites pour les PME du 1er au 5 juillet 2025",
    categorie: "Événement",
    datePublication: "28/04/2025",
    dateEvenement: "01/07/2025",
    statut: "Publié",
    auteur: "Admin",
  },
  {
    id: 5,
    titre: "Mise à jour des textes relatifs à la fiscalité des PME",
    categorie: "Législation",
    datePublication: "25/04/2025",
    dateEvenement: null,
    statut: "Publié",
    auteur: "Admin",
  },
  {
    id: 6,
    titre: "Atelier sur le financement des PME",
    categorie: "Événement",
    datePublication: "20/04/2025",
    dateEvenement: "15/06/2025",
    statut: "Brouillon",
    auteur: "Modérateur",
  },
  {
    id: 7,
    titre: "Nouvelles mesures pour faciliter l'accès aux marchés publics pour les PME",
    categorie: "Législation",
    datePublication: "15/04/2025",
    dateEvenement: null,
    statut: "Publié",
    auteur: "Admin",
  },
  {
    id: 8,
    titre: "Formation sur les obligations fiscales des PME",
    categorie: "Événement",
    datePublication: "10/04/2025",
    dateEvenement: "20/05/2025",
    statut: "Brouillon",
    auteur: "Modérateur",
  },
]

export default function ActualitesAdmin() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategorie, setSelectedCategorie] = useState("")
  const [selectedStatut, setSelectedStatut] = useState("")

  // Filtrer les actualités
  const filteredActualites = actualites.filter((actualite) => {
    const matchSearch = actualite.titre.toLowerCase().includes(searchTerm.toLowerCase())
    const matchCategorie =
      selectedCategorie === "all" || selectedCategorie === "" || actualite.categorie === selectedCategorie
    const matchStatut = selectedStatut === "all" || selectedStatut === "" || actualite.statut === selectedStatut
    return matchSearch && matchCategorie && matchStatut
  })

  // Extraire les catégories et statuts uniques pour les filtres
  const categories = [...new Set(actualites.map((actualite) => actualite.categorie))]
  const statuts = [...new Set(actualites.map((actualite) => actualite.statut))]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Actualités</h1>
        <Button className="bg-[#063a1e] hover:bg-[#063a1e]/90">
          <Plus className="mr-2 h-4 w-4" /> Ajouter une actualité
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher une actualité..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Select value={selectedCategorie} onValueChange={setSelectedCategorie}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les catégories</SelectItem>
                  {categories.map((categorie) => (
                    <SelectItem key={categorie} value={categorie}>
                      {categorie}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedStatut} onValueChange={setSelectedStatut}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  {statuts.map((statut) => (
                    <SelectItem key={statut} value={statut}>
                      {statut}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {selectedCategorie && selectedCategorie !== "all" && (
              <Badge variant="outline" className="bg-[#063a1e]/10 border-[#063a1e]/30 gap-1">
                <span>Catégorie: {selectedCategorie}</span>
                <button className="text-xs" onClick={() => setSelectedCategorie("")}>
                  ✕
                </button>
              </Badge>
            )}
            {selectedStatut && selectedStatut !== "all" && (
              <Badge variant="outline" className="bg-[#063a1e]/10 border-[#063a1e]/30 gap-1">
                <span>Statut: {selectedStatut}</span>
                <button className="text-xs" onClick={() => setSelectedStatut("")}>
                  ✕
                </button>
              </Badge>
            )}
            {((selectedCategorie && selectedCategorie !== "all") || (selectedStatut && selectedStatut !== "all")) && (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-xs"
                onClick={() => {
                  setSelectedCategorie("")
                  setSelectedStatut("")
                }}
              >
                Effacer tous les filtres
              </Button>
            )}
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[400px]">Titre</TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead>Date de publication</TableHead>
                  <TableHead>Date de l'événement</TableHead>
                  <TableHead>Statut</TableHead>
                  {/* <TableHead>Auteur</TableHead> */}
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredActualites.map((actualite) => (
                  <TableRow key={actualite.id}>
                    <TableCell className="font-medium">{actualite.titre}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-[#063a1e]/10 border-[#063a1e]/30">
                        {actualite.categorie}
                      </Badge>
                    </TableCell>
                    <TableCell>{actualite.datePublication}</TableCell>
                    <TableCell>
                      {actualite.dateEvenement ? (
                        <div className="flex items-center">
                          <Calendar className="h-3.5 w-3.5 mr-1 text-[#063a1e]" />
                          {actualite.dateEvenement}
                        </div>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={actualite.statut === "Publié" ? "default" : "outline"}
                        className={actualite.statut === "Publié" ? "bg-green-500" : ""}
                      >
                        {actualite.statut}
                      </Badge>
                    </TableCell>
                    {/* <TableCell>{actualite.auteur}</TableCell> */}
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" /> Voir
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" /> Modifier
                          </DropdownMenuItem>
                          {actualite.statut === "Brouillon" ? (
                            <DropdownMenuItem>
                              <Clock className="mr-2 h-4 w-4" /> Publier
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem>
                              <Clock className="mr-2 h-4 w-4" /> Dépublier
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" /> Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Affichage de {filteredActualites.length} sur {actualites.length} actualités
            </p>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
