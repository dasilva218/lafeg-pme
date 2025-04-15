"use client";

import Link from "next/link";
import Image from "next/image";
import Captcha from "@/components/Captcha";
import { ArrowRight, FileText, BookOpen, ExternalLink } from "lucide-react";
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
import AddressAutocomplete from "@/components/AddressAutocomplete";

export default function Home() {
  return (
    <div className="">
      {/* Scrolling News Ticker */}
      <div className="bg-[#063a1e] py-2 text-white overflow-hidden">
        <div className="ticker-container">
          <div className="ticker-wrapper">
            <div className="ticker-text">
              Mise à jour des textes relatifs à la fiscalité des PME - Mai 2025
              &nbsp;&nbsp;•&nbsp;&nbsp; Nouveau décret sur les avantages fiscaux
              pour les startups gabonaises &nbsp;&nbsp;•&nbsp;&nbsp; Séminaire
              sur le droit OHADA le 15 juin 2025 à Libreville &nbsp;&nbsp;•
              Séminaire sur le droit OHADA le 15 juin 2025 à Libreville
              &nbsp;&nbsp;•&nbsp;&nbsp; Publication du guide pratique sur la
              création d'entreprise au Gabon &nbsp;&nbsp;•&nbsp;&nbsp;
              Consultations juridiques gratuites pour les PME du 1er au 5
              juillet 2025
            </div>
          </div>
        </div>
      </div>

      {/* Flash News */}
      <div className="bg-[#063a1e]/10 py-2 border-b">
        <div className="container">
          <div className="flex items-center gap-3">
            <Badge
              variant="outline"
              className="bg-gradient-to-r from-[#dcdaa4] to-[#bdbd95] text-[#063a1e] font-bold border-none"
            >
              NOUVEAU
            </Badge>
            <p className="text-sm">
              Mise à jour des textes relatifs à la fiscalité des PME - Mai 2025
            </p>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#063a1e] to-[#063a1e]/50 text-white p-10 lg:p-16">
        <div className="lg:container">
          <div className="grid grid-cols-1 md:flex md:justify-between gap-8 lg:gap-12 items-center">
            <div className="space-y-6 w-full md:max-w-[50%]">
              <h2 className="text-3xl text-center md:text-left lg:text-4xl font-bold">
                Les textes juridiques pour votre PME au Gabon
              </h2>
              <p className="text-white/90 text-center md:text-left text-lg">
                Accédez facilement aux textes juridiques, lois et règlements
                concernant les PME gabonaises.
              </p>
              <div className="flex flex-col sm:flex-row sm:justify-center md:justify-normal gap-4">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-[#063a1e] relative hover:bg-white"
                >
                  <span className="absolute inset-0 w-full h-full bg-[#dcdaa4] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0"></span>
                  <span className="relative mr-3 z-10 transition-colors duration-500 ease-in-out group-hover:text-[#063a1e]">
                    <p>Consulter les textes</p>
                  </span>
                </Button>
                <Button
                  size="lg"
                  className=" hover:text-[#063a1e] duration-300 ease-in-out hover:bg-white  border-none font-medium"
                >
                  En savoir plus
                </Button>
              </div>
            </div>
            <div className="hidden md:block group [transform:perspective(1500px)_rotateY(15deg)] rounded-xl shadow-[rgba(0,0,0,0.25)_0px_25px_50px_-12px] transition-transform duration-1000 ease-in-out hover:[transform:perspective(3000px)_rotateY(5deg)] ">
              <Image
                src="/images/hero-img.jpg"
                alt="Texte et loi pour les PME"
                width={1000}
                height={1000}
                className="rounded-lg shadow-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 bg-[#EAEEEB]">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">
                Recherchez un texte juridique
              </h2>
              <p className="text-muted-foreground">
                Trouvez rapidement les textes juridiques dont vous avez besoin
                pour votre entreprise
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <form className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <Input
                    type="search"
                    placeholder="Mots-clés (ex: fiscalité, OHADA, création...)"
                    className="flex-1"
                  />
                  <Button
                    type="submit"
                    variant="secondary"
                    size="lg"
                    className="bg-[#063a1e] relative hover:bg-white"
                  >
                    <span className="absolute inset-0 w-full h-full bg-[#dcdaa4] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0"></span>
                    <span className="relative mr-3 z-10 transition-colors duration-500 ease-in-out group-hover:text-[#063a1e]">
                      <p>Rechercher</p>
                    </span>
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Badge
                    variant="secondary"
                    className="cursor-pointer hover:bg-secondary/80"
                  >
                    Création d'entreprise
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="cursor-pointer hover:bg-secondary/80"
                  >
                    Fiscalité
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="cursor-pointer hover:bg-secondary/80"
                  >
                    Droit du travail
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="cursor-pointer hover:bg-secondary/80"
                  >
                    OHADA
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="cursor-pointer hover:bg-secondary/80"
                  >
                    Import/Export
                  </Badge>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-12">
        <div className="container">
          <h2 className="text-2xl font-bold mb-8">Catégories principales</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Category 1 */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#dcdaa4] to-[#bdbd95] text-[#063a1e]  flex items-center justify-center mb-3">
                  <FileText className="h-6 w-6 text-[#063a1e]" />
                </div>
                <CardTitle>
                  Textes législatifs et règlementaires des administrations
                  publiques
                </CardTitle>
                <CardDescription>
                  Réglementations et lois encadrant les activités des
                  administrations publiques.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm">
                  <li className="text-muted-foreground">
                    • Loi sur les sociétés commerciales
                  </li>
                  <li className="text-muted-foreground">
                    • Acte uniforme OHADA
                  </li>
                  <li className="text-muted-foreground">
                    • Formalités d'immatriculation
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
              <Link href="/textes-juridiques#administrations">
                  <Button className="w-full gap-1 text-white hover:text-[#063a1e]/90 hover:bg-[#063a1e]/20">
                    Consulter <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Category 2 */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#dcdaa4] to-[#bdbd95] text-[#063a1e]  flex items-center justify-center mb-3">
                  <FileText className="h-6 w-6 text-[#063a1e]" />
                </div>
                <CardTitle>
                  Textes législatifs et règlementaires pour les PME
                </CardTitle>
                <CardDescription>
                  Normes et obligations légales spécifiques aux petites et
                  moyennes entreprises.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm">
                  <li className="text-muted-foreground">
                    • Code général des impôts
                  </li>
                  <li className="text-muted-foreground">
                    • TVA et droits d'accises
                  </li>
                  <li className="text-muted-foreground">
                    • Avantages fiscaux pour les PME
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
              <Link href="/textes-juridiques#pme">
                  <Button className="w-full gap-1 text-white hover:text-[#063a1e]/90 hover:bg-[#063a1e]/20">
                    Consulter <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Category 3 */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-5">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#dcdaa4] to-[#bdbd95] text-[#063a1e]  flex items-center justify-center mb-3">
                  <FileText className="h-6 w-6 text-[#063a1e]" />
                </div>
                <CardTitle>
                  Textes juridiques régionaux et internationaux
                </CardTitle>
                <CardDescription>
                  Accords, conventions et traités influençant le droit des
                  affaires au niveau mondial.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm">
                  <li className="text-muted-foreground">• Code du travail</li>
                  <li className="text-muted-foreground">
                    • Conventions collectives
                  </li>
                  <li className="text-muted-foreground">
                    • Protection sociale
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/textes-juridiques#internationaux">
                  <Button className="w-full gap-1 text-white hover:text-[#063a1e]/90 hover:bg-[#063a1e]/20">
                    Consulter <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Recent Updates */}
      <section className="py-12 bg-[#EAEEEB]">
        <div className="container">
          <h2 className="text-2xl font-bold mb-8">Mises à jour récentes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <Card key={item} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-gradient-to-r from-[#dcdaa4] to-[#bdbd95] text-[#063a1e] font-medium">
                      Nouveau
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      15 Mai 2025
                    </span>
                  </div>
                  <CardTitle className="mt-2">
                    Modification du régime fiscal des PME
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Nouvelles dispositions concernant les avantages fiscaux
                    accordés aux PME gabonaises dans les secteurs prioritaires.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full gap-1">
                    Lire le texte complet <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/textes-juridiques">
              <Button
                size="lg"
                className=" hover:text-[#063a1e] duration-300 ease-in-out hover:bg-white border hover:border-[#063a1e] font-medium"
              >
                Voir plus de mise à jour
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="hidden py-12">
        <div className="container">
          <h2 className="text-2xl font-bold mb-8">Ressources utiles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Resource 1 */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-[#063a1e]/10 flex items-center justify-center mb-3">
                  <BookOpen className="h-6 w-6 text-[#063a1e]" />
                </div>
                <CardTitle>Guides pratiques</CardTitle>
                <CardDescription>
                  Guides d'application des textes juridiques
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Des guides explicatifs pour comprendre et appliquer
                  correctement les textes juridiques dans votre entreprise.
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  variant="ghost"
                  className="w-full text-[#063a1e] hover:text-[#063a1e]/90 hover:bg-[#063a1e]/10"
                >
                  Consulter les guides
                </Button>
              </CardFooter>
            </Card>

            {/* Resource 2 */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-[#063a1e]/10 flex items-center justify-center mb-3">
                  <FileText className="h-6 w-6 text-[#063a1e]" />
                </div>
                <CardTitle>Modèles de documents</CardTitle>
                <CardDescription>
                  Documents types pour votre entreprise
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Téléchargez des modèles de documents juridiques prêts à
                  l'emploi pour votre PME (statuts, contrats, etc.).
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  variant="ghost"
                  className="w-full text-[#063a1e] hover:text-[#063a1e]/90 hover:bg-[#063a1e]/10"
                >
                  Télécharger les modèles
                </Button>
              </CardFooter>
            </Card>

            {/* Resource 3 */}
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-[#063a1e]/10 flex items-center justify-center mb-3">
                  <ExternalLink className="h-6 w-6 text-[#063a1e]" />
                </div>
                <CardTitle>Liens utiles</CardTitle>
                <CardDescription>
                  Sites officiels et ressources externes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Accédez aux sites des institutions et organismes officiels
                  liés au droit des affaires au Gabon.
                </p>
              </CardContent>
              <CardFooter>
                <Link href="#lien" scroll={true}>
                  <Button
                    variant="ghost"
                    className="w-full text-[#063a1e] hover:text-[#063a1e]/90 hover:bg-[#063a1e]/10"
                  >
                    <Link href="#lien">Voir les liens</Link>
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-[#063a1e] text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold">Liens utiles ?</h2>
            <p className="text-white/90 text-lg">
              Accédez aux sites des institutions et organismes officiels liés au
              droit des affaires au Gabon.
            </p>
            <Link className="flex justify-center" href="/#lien">
              <Button
                variant="secondary"
                size="lg"
                className=" bg-[#063a1e] relative hover:bg-white"
              >
                <span className="absolute inset-0 w-full h-full bg-[#dcdaa4] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0"></span>
                <span className="relative mr-3 z-10 transition-colors duration-500 ease-in-out group-hover:text-[#063a1e]">
                  <p>Voir les liens</p>
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Subscription Section */}
      <section id="subscription" className="py-16 bg-[#EAEEEB]">
        <div className="md:container">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="bg-[#063a1e] p-8 text-white">
                  <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#dcdaa4] to-[#bdbd95] bg-clip-text text-transparent">
                    Restez informé
                  </h2>
                  <p className="mb-6">
                    Abonnez-vous à notre newsletter pour recevoir des alertes :
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <span className="bg-gradient-to-r from-[#dcdaa4] to-[#bdbd95] text-[#063a1e] rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold mt-0.5">
                        ✓
                      </span>
                      <span>Nouveaux textes juridiques</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-gradient-to-r from-[#dcdaa4] to-[#bdbd95] text-[#063a1e] rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold mt-0.5">
                        ✓
                      </span>
                      <span>Structures d'Encadrement et d'Accompagnement</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-gradient-to-r from-[#dcdaa4] to-[#bdbd95] text-[#063a1e] rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold mt-0.5">
                        ✓
                      </span>
                      <span>Institutions Financières </span>
                    </li>
                  </ul>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-semibold mb-6 text-[#063a1e]">
                    Formulaire d'abonnement
                  </h3>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label
                          htmlFor="lastname"
                          className="text-sm font-medium"
                        >
                          Nom
                        </label>
                        <Input id="lastname" placeholder="Votre nom" />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="firstname"
                          className="text-sm font-medium"
                        >
                          Prénom
                        </label>
                        <Input id="firstname" placeholder="Votre prénom" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="votre.email@entreprise.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="company" className="text-sm font-medium">
                        Entreprise
                      </label>
                      <Input
                        id="company"
                        placeholder="Nom de votre entreprise"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="contact" className="text-sm font-medium">
                        Contact
                      </label>
                      <Input
                        id="contact"
                        type="phone"
                        placeholder="(+241) 74 00 00 00"
                      />
                    </div>
                    <div className="space-y-2 ">
                      <label htmlFor="company" className="text-sm font-medium">
                        Adresse Entreprise
                      </label>
                      <AddressAutocomplete />
                    </div>
                    <Captcha />

                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Centres d'intérêt
                      </label>
                      <div className="grid md:grid-cols-2 gap-2">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="interest1"
                            className="rounded text-[#dcdaa4]"
                          />
                          <label htmlFor="interest1" className="text-sm">
                            Textes législatifs et règlementaires des
                            administrations publiques
                          </label>
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="interest2"
                            className="rounded text-[#dcdaa4]"
                          />
                          <label htmlFor="interest2" className="text-sm">
                            Textes législatifs et règlementaires pour les PME
                          </label>
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="interest3"
                            className="rounded text-[#dcdaa4]"
                          />
                          <label htmlFor="interest3" className="text-sm">
                            textes juridiques régionaux et internationaux
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 mt-4">
                      <input
                        type="checkbox"
                        id="consent"
                        className="rounded text-[#dcdaa4] mt-1"
                      />
                      <label
                        htmlFor="consent"
                        className="text-xs text-muted-foreground"
                      >
                        J'accepte de recevoir des informations par email et je
                        comprends que je peux me désabonner à tout moment.
                        Consultez notre{" "}
                        <Link
                          href="#"
                          className="underline hover:text-[#bdbd95]"
                        >
                          politique de confidentialité
                        </Link>
                        .
                      </label>
                    </div>
                    <div className="flex justify-center">
                      <Button
                        type="submit"
                        variant="secondary"
                        size="lg"
                        className=" bg-[#063a1e] relative hover:bg-white"
                      >
                        <span className="absolute inset-0 w-full h-full bg-[#dcdaa4] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0"></span>
                        <span className="relative mr-3 z-10 transition-colors duration-500 ease-in-out group-hover:text-[#063a1e]">
                          <p>S'abonner à la newsletter</p>
                        </span>
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
