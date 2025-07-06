"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Plus,
  Edit,
  Trash2,
  Search,
  ExternalLink,
  Building2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  FileText,
} from "lucide-react"
import { toast } from "sonner"
import { fetchOffres, Offre } from "@/app/services/offre/api";
import { createOffre, updateOffre } from "@/app/services/offre/api"


export default function ServicesEntreprisesPage() {
  const [services, setServices] = useState<Offre[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [membreFilter, setMembreFilter] = useState("all")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingService, setEditingService] = useState<Offre | null>(null)
  const [formData, setFormData] = useState({
    titre_offre: "",
    nom_structure: "",
    type_offre: "CONSULTATION",
    membre_feg: false,
    contact: "",
    email: "",
    localisation: "",
    site_web: "",
    date_debut: "",
    date_fin: "",
    statut: "ACTIF",
    description: "",
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [selectedBanner, setSelectedBanner] = useState<File | null>(null)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const response = await fetch("/api/offres",)
      if (response.ok) {
        const data = await response.json()
        setServices(data.data || [])
      }
    } catch (error) {
      console.error("Erreur lors du chargement des services:", error)
      toast.error("Erreur lors du chargement des services")
    } finally {
      setLoading(false)
    }
  }





const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
  e.preventDefault()
  setLoading(true)

  try {

    const formDataToSend = new FormData()

    Object.keys(formData).forEach((key) => {
      const value = (formData as Record<string, any>)[key]
      if (value !== null && value !== undefined) {
        formDataToSend.append(key, value)
      }
    })

    if (selectedFile) formDataToSend.append("fichier", selectedFile)
    if (selectedImage) formDataToSend.append("image", selectedImage)
    if (selectedBanner) formDataToSend.append("bannier", selectedBanner)

    let response
   if (editingService && editingService.id_offre) {
  response = await updateOffre(editingService.id_offre, formDataToSend)
}
 else {
  response = await createOffre(formDataToSend)
}


    if (!response || (response as any).error) {
      throw new Error((response as any).error || "Erreur lors de la sauvegarde")
    }

    toast.success(
      editingService ? "Service modifié avec succès" : "Service créé avec succès"
    )
    setIsDialogOpen(false)
    resetForm()
    fetchServices()
  } catch (error: any) {
    console.error("Erreur:", error)
    toast.error(error.message || "Erreur lors de la sauvegarde")
  } finally {
    setLoading(false)
  }
}


interface DeleteResponse {
    ok: boolean
}

const handleDelete = async (id: string): Promise<void> => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce service ?")) return

    try {
        const response: DeleteResponse & Response = await fetch(`/api/offres/${id}`, {
            method: "DELETE",
        })

        if (response.ok) {
            toast.success("Service supprimé avec succès")
            fetchServices()
        } else {
            throw new Error("Erreur lors de la suppression")
        }
    } catch (error) {
        console.error("Erreur:", error)
        toast.error("Erreur lors de la suppression")
    }
}

// interface HandleEditService {
//     id: string
//     titre_offre: string
//     nom_structure: string
//     type_offre: string
//     membre_feg: boolean
//     contact: string
//     email: string
//     localisation: string
//     site_web?: string
//     date_debut?: string
//     date_fin?: string
//     statut: string
//     description?: string
// }

const handleEdit = (service: Offre): void => {
    setEditingService(service)
    setFormData({
        titre_offre: service.titre_offre,
        nom_structure: service.nom_structure,
        type_offre: service.type_offre,
        membre_feg: service.membre_feg,
        contact: service.contact,
        email: service.email,
        localisation: service.localisation,
        site_web: service.site_web || "",
        date_debut: service.date_debut ? service.date_debut.split("T")[0] : "",
        date_fin: service.date_fin ? service.date_fin.split("T")[0] : "",
        statut: service.statut,
        description: service.description || "",
    })
    setIsDialogOpen(true)
}

  const resetForm = () => {
    setEditingService(null)
    setFormData({
      titre_offre: "",
      nom_structure: "",
      type_offre: "CONSULTATION",
      membre_feg: false,
      contact: "",
      email: "",
      localisation: "",
      site_web: "",
      date_debut: "",
      date_fin: "",
      statut: "ACTIF",
      description: "",
    })
    setSelectedFile(null)
    setSelectedImage(null)
    setSelectedBanner(null)
  }

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.titre_offre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.nom_structure.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || service.statut === statusFilter
    const matchesType = typeFilter === "all" || service.type_offre === typeFilter
    const matchesMembre =
      membreFilter === "all" ||
      (membreFilter === "membre" && service.membre_feg) ||
      (membreFilter === "non-membre" && !service.membre_feg)
    return matchesSearch && matchesStatus && matchesType && matchesMembre
  })

interface StatusBadgeProps {
    statut: "ACTIF" | "INACTIF" | "EXPIRE" | "BROUILLON" | string
}

const getStatusBadge = (statut: StatusBadgeProps["statut"]): JSX.Element => {
    const variants: Record<string, string> = {
        ACTIF: "default",
        INACTIF: "secondary",
        EXPIRE: "destructive",
        BROUILLON: "outline",
    }
    const colors: Record<string, string> = {
        ACTIF: "bg-green-100 text-green-800",
        INACTIF: "bg-gray-100 text-gray-800",
        EXPIRE: "bg-red-100 text-red-800",
        BROUILLON: "bg-yellow-100 text-yellow-800",
    }
    return <Badge className={colors[statut] || "bg-gray-100 text-gray-800"}>{statut}</Badge>
}

interface TypeBadgeProps {
    type: "EMPLOI" | "STAGE" | "FORMATION" | "CONSULTATION" | string
}

const getTypeBadge = (type: TypeBadgeProps["type"]): JSX.Element => {
    const colors: Record<string, string> = {
        EMPLOI: "bg-blue-100 text-blue-800",
        STAGE: "bg-purple-100 text-purple-800",
        FORMATION: "bg-green-100 text-green-800",
        CONSULTATION: "bg-orange-100 text-orange-800",
    }
    return <Badge className={colors[type] || "bg-gray-100 text-gray-800"}>{type}</Badge>
}

  if (loading && services.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#063a1e] mx-auto"></div>
          <p className="mt-2 text-gray-600">Chargement des services...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des Services d'Entreprises</h1>
          <p className="text-gray-600">Gérez les offres de services publiées par les entreprises</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm} className="bg-[#063a1e] hover:bg-[#063a1e]/90">
              <Plus className="h-4 w-4 mr-2" />
              Nouveau service
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingService ? "Modifier le service" : "Créer un nouveau service"}</DialogTitle>
              <DialogDescription>Remplissez les informations du service d'entreprise</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Informations de base */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="titre_offre">Titre de l'offre *</Label>
                  <Input
                    id="titre_offre"
                    value={formData.titre_offre}
                    onChange={(e) => setFormData({ ...formData, titre_offre: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="nom_structure">Nom de l'entreprise *</Label>
                  <Input
                    id="nom_structure"
                    value={formData.nom_structure}
                    onChange={(e) => setFormData({ ...formData, nom_structure: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="type_offre">Type d'offre *</Label>
                  <Select
                    value={formData.type_offre}
                    onValueChange={(value) => setFormData({ ...formData, type_offre: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EMPLOI">Emploi</SelectItem>
                      <SelectItem value="STAGE">Stage</SelectItem>
                      <SelectItem value="FORMATION">Formation</SelectItem>
                      <SelectItem value="CONSULTATION">Consultation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="statut">Statut *</Label>
                  <Select
                    value={formData.statut}
                    onValueChange={(value) => setFormData({ ...formData, statut: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ACTIF">Actif</SelectItem>
                      <SelectItem value="INACTIF">Inactif</SelectItem>
                      <SelectItem value="EXPIRE">Expiré</SelectItem>
                      <SelectItem value="BROUILLON">Brouillon</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2 pt-6">
                  <input
                    type="checkbox"
                    id="membre_feg"
                    checked={formData.membre_feg}
                    onChange={(e) => setFormData({ ...formData, membre_feg: e.target.checked })}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="membre_feg">Membre FEG</Label>
                </div>
              </div>

              {/* Contact et localisation */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contact">Contact *</Label>
                  <Input
                    id="contact"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="localisation">Localisation *</Label>
                  <Input
                    id="localisation"
                    value={formData.localisation}
                    onChange={(e) => setFormData({ ...formData, localisation: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="site_web">Site web</Label>
                  <Input
                    id="site_web"
                    type="url"
                    value={formData.site_web}
                    onChange={(e) => setFormData({ ...formData, site_web: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date_debut">Date de début</Label>
                  <Input
                    id="date_debut"
                    type="date"
                    value={formData.date_debut}
                    onChange={(e) => setFormData({ ...formData, date_debut: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="date_fin">Date de fin</Label>
                  <Input
                    id="date_fin"
                    type="date"
                    value={formData.date_fin}
                    onChange={(e) => setFormData({ ...formData, date_fin: e.target.value })}
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  placeholder="Description détaillée du service..."
                />
              </div>

              {/* Fichiers */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="fichier">Document (PDF) *</Label>
                  <Input
                    id="fichier"
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setSelectedFile(e.target.files && e.target.files[0] ? e.target.files[0] : null)}
                    required={!editingService}
                  />
                </div>
                <div>
                  <Label htmlFor="image">Image</Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setSelectedImage(e.target.files && e.target.files[0] ? e.target.files[0] : null)}
                  />
                </div>
                <div>
                  <Label htmlFor="bannier">Bannière</Label>
                  <Input
                    id="bannier"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setSelectedBanner(e.target.files && e.target.files[0] ? e.target.files[0] : null)}
                  />
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Annuler
                </Button>
                <Button type="submit" disabled={loading} className="bg-[#063a1e] hover:bg-[#063a1e]/90">
                  {loading ? "Sauvegarde..." : editingService ? "Modifier" : "Créer"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Building2 className="h-8 w-8 text-[#063a1e]" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Services</p>
                <p className="text-2xl font-bold">{services.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Badge className="bg-green-100 text-green-800 mr-2">ACTIF</Badge>
              <div>
                <p className="text-sm font-medium text-gray-600">Services Actifs</p>
                <p className="text-2xl font-bold">{services.filter((s) => s.statut === "ACTIF").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Badge className="bg-blue-100 text-blue-800 mr-2">FEG</Badge>
              <div>
                <p className="text-sm font-medium text-gray-600">Membres FEG</p>
                <p className="text-2xl font-bold">{services.filter((s) => s.membre_feg).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-[#063a1e]" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Ce mois</p>
                <p className="text-2xl font-bold">
                  {
                    services.filter((s) => {
                      const created = new Date(s.createdAt)
                      const now = new Date()
                      return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear()
                    }).length
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtres */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filtres</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <Label htmlFor="search">Rechercher</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Titre ou entreprise..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="status-filter">Statut</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="ACTIF">Actif</SelectItem>
                  <SelectItem value="INACTIF">Inactif</SelectItem>
                  <SelectItem value="EXPIRE">Expiré</SelectItem>
                  <SelectItem value="BROUILLON">Brouillon</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="type-filter">Type</Label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="EMPLOI">Emploi</SelectItem>
                  <SelectItem value="STAGE">Stage</SelectItem>
                  <SelectItem value="FORMATION">Formation</SelectItem>
                  <SelectItem value="CONSULTATION">Consultation</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="membre-filter">Membre FEG</Label>
              <Select value={membreFilter} onValueChange={setMembreFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="membre">Membres</SelectItem>
                  <SelectItem value="non-membre">Non-membres</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setStatusFilter("all")
                  setTypeFilter("all")
                  setMembreFilter("all")
                }}
                className="w-full"
              >
                Réinitialiser
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tableau des services */}
      <Card>
        <CardHeader>
          <CardTitle>Services d'Entreprises ({filteredServices.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Titre</TableHead>
                  <TableHead>Entreprise</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Membre FEG</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Localisation</TableHead>
                  <TableHead>Date création</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredServices.map((service) => (
                  <TableRow key={service.id_offre}>
                    <TableCell className="font-medium max-w-[200px]">
                      <div className="truncate" title={service.titre_offre}>
                        {service.titre_offre}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {/* <Building2 className="h-4 w-4 mr-2 text-gray-400" /> */}
                        {service.nom_structure}
                      </div>
                    </TableCell>
                    <TableCell>{getTypeBadge(service.type_offre)}</TableCell>
                    <TableCell>{getStatusBadge(service.statut)}</TableCell>
                    <TableCell>
                      {service.membre_feg ? (
                        <Badge className="bg-blue-100 text-blue-800">Membre</Badge>
                      ) : (
                        <Badge variant="outline">Non-membre</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center text-sm">
                          {/* <Phone className="h-3 w-3 mr-1" /> */}
                          {service.contact}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          {/* <Mail className="h-3 w-3 mr-1" /> */}
                          {service.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {/* <MapPin className="h-4 w-4 mr-1 text-gray-400" /> */}
                        {service.localisation}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(service.createdAt).toLocaleDateString("fr-FR")}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(service)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        {service.site_web && (
                          <Button variant="outline" size="sm" onClick={() => window.open(service.site_web, "_blank")}>
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        )}
                        {service.fichier_url && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(service.fichier_url, "_blank")}
                          >
                            <FileText className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(service.id_offre)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {filteredServices.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Building2 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Aucun service trouvé</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
