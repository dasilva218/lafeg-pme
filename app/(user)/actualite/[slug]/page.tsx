"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  Calendar,
  User,
  Clock,
  BookmarkPlus,
  ArrowLeft,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  Eye,
  Tag,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Données d'actualités (même que dans la page principale)
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

    Cette initiative s'inscrit dans le cadre du Plan Stratégique Gabon Émergent et devrait bénéficier à plus de 15 000 PME à travers le pays.

    ## Impact sur les entrepreneurs

    Ces mesures représentent une véritable bouffée d'oxygène pour les entrepreneurs gabonais qui font face à de nombreux défis administratifs et financiers. La simplification des procédures devrait permettre de réduire de moitié le temps nécessaire à la création d'une entreprise.

    ## Réactions du secteur privé

    La Fédération des Entreprises du Gabon (FEG) salue ces annonces et espère une mise en œuvre rapide et efficace. "C'est exactement ce dont nos PME avaient besoin pour être plus compétitives", déclare le président de la FEG.

    ## Prochaines étapes

    Un comité de suivi sera mis en place pour accompagner la mise en œuvre de ces mesures. Des sessions d'information seront organisées dans toutes les provinces pour sensibiliser les entrepreneurs aux nouvelles opportunités.`,
    image: "/placeholder.svg?height=400&width=800",
    auteur: "Marie Nguema",
    datePublication: "2024-12-10",
    categorie: "Réglementation",
    tags: ["PME", "Réglementation", "Fiscalité", "Gabon"],
    tempsLecture: "5 min",
    vues: 1250,
    featured: true,
  },
  // ... autres articles (même structure)
]

interface ArticlePageProps {
  params: { slug: string }
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const article = actualites.find((a) => a.slug === params.slug)

  if (!article) {
    notFound()
  }

  const relatedArticles = actualites.filter((a) => a.id !== article.id && a.categorie === article.categorie).slice(0, 3)

  const formatDate = (dateString : any) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const shareUrl = typeof window !== "undefined" ? window.location.href : ""
  const shareTitle = article.titre

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    email: `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareUrl)}`,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <div className="mb-8">
          <Link href="/actualites">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour aux actualités
            </Button>
          </Link>
          <nav className="text-sm text-gray-600">
            <Link href="/" className="hover:text-[#063a1e]">
              Accueil
            </Link>
            <span className="mx-2">/</span>
            <Link href="/actualites" className="hover:text-[#063a1e]">
              Actualités
            </Link>
            <span className="mx-2">/</span>
            <span className="text-[#063a1e]">{article.titre}</span>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Contenu principal */}
          <div className="lg:col-span-3">
            <article className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* En-tête de l'article */}
              <div className="relative h-96">
                <Image src={article.image || "/placeholder.svg"} alt={article.titre} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <Badge className="bg-[#063a1e] text-white mb-4">{article.categorie}</Badge>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{article.titre}</h1>
                </div>
              </div>

              {/* Métadonnées */}
              <div className="p-6 border-b">
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>Par {article.auteur}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(article.datePublication)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{article.tempsLecture} de lecture</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    <span>{article.vues} vues</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 mr-2">Partager :</span>
                    <Button variant="outline" size="sm" asChild>
                      <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer">
                        <Facebook className="w-4 h-4" />
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer">
                        <Twitter className="w-4 h-4" />
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="w-4 h-4" />
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href={shareLinks.email}>
                        <Mail className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={isBookmarked ? "bg-[#063a1e] text-white" : ""}
                  >
                    <BookmarkPlus className="w-4 h-4 mr-2" />
                    {isBookmarked ? "Sauvegardé" : "Sauvegarder"}
                  </Button>
                </div>
              </div>

              {/* Contenu de l'article */}
              <div className="p-6">
                <div className="prose prose-lg max-w-none">
                  <p className="text-xl text-gray-700 font-medium mb-6">{article.extrait}</p>
                  <div className="whitespace-pre-line text-gray-800 leading-relaxed">
                    {article.contenu.split("\n").map((paragraph, index) => {
                      if (paragraph.trim().startsWith("##")) {
                        return (
                          <h2 key={index} className="text-2xl font-bold text-[#063a1e] mt-8 mb-4">
                            {paragraph.replace("##", "").trim()}
                          </h2>
                        )
                      }
                      if (paragraph.trim().startsWith("-")) {
                        return (
                          <li key={index} className="ml-6 mb-2">
                            {paragraph.replace("-", "").trim()}
                          </li>
                        )
                      }
                      if (paragraph.trim()) {
                        return (
                          <p key={index} className="mb-4">
                            {paragraph}
                          </p>
                        )
                      }
                      return null
                    })}
                  </div>
                </div>

                {/* Tags */}
                <div className="mt-8 pt-6 border-t">
                  <div className="flex items-center gap-2 mb-4">
                    <Tag className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-600">Tags :</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="hover:bg-[#063a1e] hover:text-white cursor-pointer">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </article>

            {/* Articles connexes */}
            {relatedArticles.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-[#063a1e] mb-6">Articles connexes</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedArticles.map((relatedArticle) => (
                    <Card key={relatedArticle.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative h-48">
                        <Image
                          src={relatedArticle.image || "/placeholder.svg"}
                          alt={relatedArticle.titre}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-[#063a1e] mb-2 line-clamp-2">{relatedArticle.titre}</h3>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{relatedArticle.extrait}</p>
                        <Link href={`/actualites/${relatedArticle.slug}`}>
                          <Button variant="outline" size="sm" className="w-full">
                            Lire l'article
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Sommaire */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Sommaire</CardTitle>
                </CardHeader>
                <CardContent>
                  <nav className="space-y-2">
                    {article.contenu
                      .split("\n")
                      .filter((line) => line.trim().startsWith("##"))
                      .map((heading, index) => {
                        const title = heading.replace("##", "").trim()
                        const id = title.toLowerCase().replace(/\s+/g, "-")
                        return (
                          <a
                            key={index}
                            href={`#${id}`}
                            className="block text-sm text-gray-600 hover:text-[#063a1e] py-1"
                          >
                            {title}
                          </a>
                        )
                      })}
                  </nav>
                </CardContent>
              </Card>

              {/* Newsletter */}
              <Card className="bg-gradient-to-br from-[#063a1e] to-[#0a4d28] text-white">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-3">Restez informé</h3>
                  <p className="text-sm text-green-100 mb-4">
                    Recevez les dernières actualités des PME gabonaises directement dans votre boîte mail.
                  </p>
                  <Button variant="secondary" className="w-full">
                    S'abonner à la newsletter
                  </Button>
                </CardContent>
              </Card>

              {/* Contact */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Une question ?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Contactez notre équipe pour plus d'informations sur cet article.
                  </p>
                  <Button variant="outline" className="w-full">
                    Nous contacter
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
