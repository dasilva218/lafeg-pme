"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Form from "@/components/section/form";
import AdBanner from "@/components/ads/AdBanner";
import {
  ArrowRight,
 
  Linkedin,
  Facebook,
  Rocket,
  Building,
  GraduationCap,
  Mail,
  Phone,
  
} from "lucide-react";
import { Button } from "@/components/ui/button";
import  offresFinancement  from "./offre/page";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import TickerTextes from "@/components/section/TickerTextes";

// import AddressAutocomplete from "@/components/AddressAutocomplete"

import TextSearch from "@/components/section/search";
import NewText from "@/components/section/new_text";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("hasVisited");

    if (hasVisited) {
      setLoading(false);
    } else {
      const timer = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem("hasVisited", "true");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <div className="flex flex-col items-center">
          <div className="relative w-16 h-16 mb-4">
            <div className="absolute inset-0 rounded-full border-4 border-[#063a1e]/20"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-[#063a1e] animate-spin"></div>
          </div>

          <div className="flex flex-col items-center">
            <Image
              src="/images/logo-feg.png"
              alt="Logo FEG"
              width={60}
              height={60}
              className="h-12 w-auto mb-2"
            />
            <h2 className="text-lg font-bold text-[#063a1e]">
              Guide Numérique des PME
            </h2>
          </div>
          <div className="mt-4 h-1 w-48 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#dcdaa4] to-[#bdbd95] animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#eaeeeb]">
      <TickerTextes />
      {/* Scrolling News Ticker */}

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
      <section className="bg-gradient-to-r from-[#063a1e] to-[#063a1e]/50 text-white relative overflow-hidden p-10 lg:p-16">
      <div className="absolute inset-0 opacity-35">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#fff] to-transparent rounded-full -translate-x-48 -translate-y-48"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-[#063a1e] to-transparent rounded-full translate-x-48 translate-y-48"></div>
        </div>
        <div className="lg:container">
          <div className="grid grid-cols-1 md:flex md:justify-between gap-8 lg:gap-12 items-center">
            <div className="space-y-6 w-full md:max-w-[50%] flex flex-col items-center text-center md:items-start md:text-left">
              <h2 className="text-3xl text-center md:text-left lg:text-4xl font-bold">
                Les textes juridiques pour votre PME au Gabon
              </h2>
              <p className="text-white/90 text-center md:text-left text-lg">
                Accédez facilement aux textes juridiques, lois et règlements
                concernant les PME gabonaises.
              </p>
              <div className="flex flex-col sm:flex-row sm:justify-center md:justify-normal gap-4">
                <Link href="/textes-juridiques">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="bg-[#063a1e] relative hover:bg-white min-w-[200px] group"
                  >
                    <span className="absolute inset-0 w-full h-full bg-[#dcdaa4] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0"></span>
                    <span className="relative mr-3 z-10 transition-colors duration-500 ease-in-out group-hover:text-[#063a1e]">
                      <p>Consulter les textes</p>
                    </span>
                  </Button>
                </Link>
                <Link href="/a-propos">
                  <Button
                    size="lg"
                    className="hover:text-[#063a1e] relative z-10 duration-300 ease-in-out hover:bg-white border-none font-medium min-w-[200px]"
                  >
                    En savoir plus
                  </Button>
                </Link>
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
      <section className="py-12 bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">
                Recherchez un texte juridique
              </h2>
              <p className="text-muted-foreground font-bold">
                Trouvez rapidement les textes juridiques dont vous avez besoin
                pour votre entreprise
              </p>
            </div>
            <TextSearch />
          </div>
        </div>
      </section>

      {/* Recent Updates */}
      <NewText />
      {/* Sidebar Video Ad */}
      <div className="flex justify-center items-center pb-12 container bg-[#eaeeeb]">
        <AdBanner
          emplacement="MIDDLE"
          className="w-full h-full object-cover object-center max-h-52"
        />
      </div>
      {/* Enhanced Business Services Section */}
      <section className="py-12 bg-gradient-to-br from-[#063a1e] via-[#063a1e]/95 to-[#063a1e]/90 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-25">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#fff] to-transparent rounded-full -translate-x-48 -translate-y-48"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-[#bdbd95] to-transparent rounded-full translate-x-48 translate-y-48"></div>
        </div>

        <div className="container relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-[#dcdaa4] to-[#bdbd95] bg-clip-text text-transparent mb-4">
              Offres & Services des PME
            </h2>
            <p className="text-white/90 text-lg max-w-3xl mx-auto">
              Découvrez et publiez vos services sur notre plateforme dédiée aux
              PME gabonaises. Bénéficiez de tarifs préférentiels en tant que
              membre FEG.
            </p>
          </div>

          {/* Statistics */}
          {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-[#dcdaa4] to-[#bdbd95] bg-clip-text text-transparent">
                150+
              </div>
              <p className="text-white/80 text-sm">Entreprises inscrites</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-[#dcdaa4] to-[#bdbd95] bg-clip-text text-transparent">
                500+
              </div>
              <p className="text-white/80 text-sm">Services proposés</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-[#dcdaa4] to-[#bdbd95] bg-clip-text text-transparent">
                85%
              </div>
              <p className="text-white/80 text-sm">Membres FEG</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-[#dcdaa4] to-[#bdbd95] bg-clip-text text-transparent">
                50%
              </div>
              <p className="text-white/80 text-sm">Réduction membres</p>
            </div>
          </div> */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service Categories */}
            <div className="bg-white/10 flex flex-col justify-center items-center backdrop-blur-xl rounded-lg p-6 border border-white/20">
              {/* <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#dcdaa4] to-[#bdbd95] flex items-center justify-center mb-4">
                <span className="text-[#063a1e] font-bold text-lg">C</span>
              </div> */}
              <h3 className="text-xl font-bold mb-3">Conseils & Expertise</h3>
              <ul className="space-y-2 text-white/90 text-sm mb-4">
                <li>• Conseil en gestion d'entreprise</li>
                <li>• Audit & Expertise comptable</li>
                <li>• Conseil juridique spécialisé</li>
                <li>• Accompagnement stratégique</li>
              </ul>
            
            </div>

            <div className="bg-white/10 backdrop-blur-xl flex flex-col justify-center items-center rounded-lg p-6 border border-white/20">
              {/* <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#dcdaa4] to-[#bdbd95] flex items-center justify-center mb-4">
                <span className="text-[#063a1e] font-bold text-lg">T</span>
              </div> */}
              <h3 className="text-xl font-bold mb-3">Technologies & Digital</h3>
              <ul className="space-y-2 text-white/90 text-sm mb-4">
                <li>• Développement web & mobile</li>
                <li>• Solutions ERP et CRM</li>
                <li>• Transformation digitale</li>
                <li>• Marketing digital</li>
              </ul>
              {/* <Badge className="bg-[#dcdaa4]/20 text-[#dcdaa4] border-[#dcdaa4]/30">
                32 services disponibles
              </Badge> */}
            </div>

            <div className="bg-white/10 backdrop-blur-xl flex flex-col justify-center items-center rounded-lg p-6 border border-white/20">
              {/* <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#dcdaa4] to-[#bdbd95] flex items-center justify-center mb-4">
                <span className="text-[#063a1e] font-bold text-lg">F</span>
              </div> */}
              <h3 className="text-xl font-bold mb-3">
                Formation & Développement
              </h3>
              <ul className="space-y-2 text-white/90 text-sm mb-4">
                <li>• Formation professionnelle</li>
                <li>• Coaching d'entreprise</li>
                <li>• Développement des compétences</li>
                <li>• Certifications métiers</li>
              </ul>
              {/* <Badge className="bg-[#dcdaa4]/20 text-[#dcdaa4] border-[#dcdaa4]/30">
                28 services disponibles
              </Badge> */}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-12 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-4">
                Rejoignez la plateforme dès aujourd'hui
              </h3>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                Publiez vos services et bénéficiez de la visibilité auprès de
                milliers d'entreprises gabonaises. Les membres FEG profitent de
                d'une réduction sur nos les forfaits.
              </p>

              <div className="flex flex-col mt-8 sm:flex-row sm:justify-center items-center w-full gap-4">
                <Link href="/entreprise">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="bg-[#063a1e] relative hover:bg-white min-w-[200px] group"
                  >
                    <span className="absolute inset-0 w-full h-full bg-[#dcdaa4] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0"></span>
                    <span className="relative mr-3 z-10 transition-colors duration-500 ease-in-out group-hover:text-[#063a1e]">
                      <p className="justify-center items-center flex">
                        {" "}
                        Explorer les offres{" "}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </p>
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
        </div>
      </section>
      {/* Support Structures Section */}
      <section className="py-12 bg-gray-50">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-[#063a1e]">
                Structures d'Accompagnement
              </h2>
              <p className="text-muted-foreground mt-2">
                Bénéficiez d'un accompagnement personnalisé pour votre
                entreprise
              </p>
            </div>
            <Link
              className="flex justify-center"
              href="/structures-accompagnement"
            >
              <Button
                variant="secondary"
                size="lg"
                className="bg-[#063a1e] relative hover:bg-white"
              >
                <span className="absolute inset-0 w-full h-full bg-[#dcdaa4] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0"></span>
                <span className="relative mr-3 z-10 transition-colors duration-500 ease-in-out group-hover:text-[#063a1e]">
                  <p className="flex items-center justify-center">
                      Découvrir toutes les structures{" "}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </p>
                </span>
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Incubateurs */}
            <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-[#063a1e]">
              <CardHeader>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#dcdaa4] to-[#bdbd95] flex items-center justify-center">
                    <span className="text-[#063a1e] font-bold text-lg"><Rocket className="h-6 w-6" /></span>
                  </div>
                  <div>
                    <CardTitle className="text-lg">Incubateurs</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Accompagnement startup
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm mb-4">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#063a1e] rounded-full"></div>
                    <span>Programme d'incubation 6-12 mois</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#063a1e] rounded-full"></div>
                    <span>Mentorat personnalisé</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#063a1e] rounded-full"></div>
                    <span>Accès au financement</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/structures-accompagnement?tab=incubateurs">
                  <Button
                    variant="ghost"
                    className="w-full text-[#063a1e] hover:bg-[#063a1e]/10"
                  >
                    Explorer les incubateurs
                  </Button>
                </Link>
                <Badge className="bg-[#063a1e]/10 text-[#063a1e] hover:bg-[#063a1e]/20">
                  3 structures disponibles
                </Badge>
              </CardFooter>
            </Card>

            {/* Centres de formation */}
            <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-[#063a1e]">
              <CardHeader>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#dcdaa4] to-[#bdbd95] flex items-center justify-center">
                    <span className="text-[#063a1e] font-bold text-lg"><GraduationCap className=" h-6 w-6" /></span>
                  </div>
                  <div>
                    <CardTitle className="text-lg">
                      Centres de Formation
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Développement des compétences
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm mb-4">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#063a1e] rounded-full"></div>
                    <span>Formation professionnelle</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#063a1e] rounded-full"></div>
                    <span>Certifications reconnues</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#063a1e] rounded-full"></div>
                    <span>Formation continue</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/structures-accompagnement?tab=centresFormation">
                  <Button
                    variant="ghost"
                    className="w-full text-[#063a1e] hover:bg-[#063a1e]/10"
                  >
                    Voir les formations
                  </Button>
                </Link>
                <Badge className="bg-[#063a1e]/10 text-[#063a1e] hover:bg-[#063a1e]/20">
                  2 centres partenaires
                </Badge>
              </CardFooter>
            </Card>

            {/* Structure publique */}
            <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-[#063a1e]">
              <CardHeader>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#dcdaa4] to-[#bdbd95] flex items-center justify-center">
                    <span className="text-[#063a1e] font-bold text-lg"><Building className=" h-6 w-6" /></span>
                  </div>
                  <div>
                    <CardTitle className="text-lg">
                      Structure Publique
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Accompagnement spécialisé
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm mb-4">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#063a1e] rounded-full"></div>
                    <span>Ministère des PME</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#063a1e] rounded-full"></div>
                    <span>CNSS, CNAMGS</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-[#063a1e] rounded-full"></div>
                    <span>Chambre de commerce</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/structures-accompagnement?tab=structuresPubliques">
                  <Button
                    variant="ghost"
                    className="w-full text-[#063a1e] hover:bg-[#063a1e]/10"
                  >
                    Voir les structures Publiques
                  </Button>
                </Link>
                <Badge className="bg-[#063a1e]/10 text-[#063a1e] hover:bg-[#063a1e]/20">
                  9 institutions publiques
                </Badge>
              </CardFooter>
            </Card>
          </div>

          {/* Call to Action */}
          {/* <div className="mt-12 text-center">
            <div className="bg-white rounded-lg p-8 shadow-sm border-2 border-[#dcdaa4]/30">
              <h3 className="text-xl font-bold text-[#063a1e] mb-4">
                Besoin d'un accompagnement personnalisé ?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Nos structures partenaires vous accompagnent à chaque étape de
                votre développement, de la création à la croissance de votre
                entreprise.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-[#063a1e] hover:bg-[#063a1e]/90">
                  Demander un accompagnement
                </Button>
                <Button
                  variant="outline"
                  className="border-[#063a1e] text-[#063a1e] hover:bg-[#063a1e]/10"
                >
                  Télécharger le guide
                </Button>
              </div>
            </div>
          </div> */}
        </div>
      </section>
      {/* Financial Institutions Section */}
      <section className="py-12 bg-[#063a1e]">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-5 justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-[#dcdaa4] to-[#bdbd95] bg-clip-text text-transparent">
                Institutions Financières
              </h2>
              <p className="text-white mt-2">
                Découvrez les institutions qui peuvent financer votre entreprise
              </p>
            </div>

            <Link
              className="flex justify-center"
              href="/institutions-financieres"
            >
              <Button
                variant="secondary"
                size="lg"
                className="bg-[#063a1e] relative hover:bg-white"
              >
                <span className="absolute inset-0 w-full h-full bg-[#dcdaa4] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0"></span>
                <span className="relative mr-3 z-10 transition-colors duration-500 ease-in-out group-hover:text-[#063a1e]">
                  <p className="flex items-center justify-center">
                    Voir toutes les institutions{" "}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </p>
                </span>
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Banques */}
            <div className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-xl">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/images/bank.jpeg?height=300&width=400"
                  alt="Banques commerciales"
                  width={400}
                  height={300}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#063a1e] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-70"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="rounded-full bg-white/90 p-3 shadow-lg">
                    <Link href="/institutions-financieres?tab=banques">
                      {" "}
                      <ArrowRight className="h-6 w-6 text-[#063a1e]" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <h3 className="mb-1 text-xl font-bold text-[#063a1e]">
                  Banques
                </h3>
                <p className="mb-3 text-sm text-gray-500">
                  Banques commerciales et de développement
                </p>
                <ul className="mb-4 space-y-1 text-sm">
                  <li className="text-gray-600">• Prêts d'investissement</li>
                  <li className="text-gray-600">• Lignes de crédit</li>
                  <li className="text-gray-600">
                    • Services bancaires aux entreprises
                  </li>
                </ul>
                <div className="flex items-center justify-between">
                  <Link
                    href="/institutions-financieres?tab=banques"
                    className="inline-flex items-center text-sm font-medium text-[#063a1e] hover:underline"
                  >
                    Explorer <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                  <Badge className="bg-[#063a1e]/20 text-[#063a1e] border-[#063a1e]/30">
                    7 disponibles
                  </Badge>
                </div>
              </div>
            </div>

            {/* Microfinance */}
            <div className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-xl">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/images/micro.jpeg?height=300&width=400"
                  alt="Institutions de microfinance"
                  width={400}
                  height={300}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#063a1e] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-70"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="rounded-full bg-white/90 p-3 shadow-lg">
                    <Link href="/institutions-financieres?tab=microfinance">
                      {" "}
                      <ArrowRight className="h-6 w-6 text-[#063a1e]" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <h3 className="mb-1 text-xl font-bold text-[#063a1e]">
                  Microfinance
                </h3>
                <p className="mb-3 text-sm text-gray-500">
                  Institutions de microfinance
                </p>
                <ul className="mb-4 space-y-1 text-sm">
                  <li className="text-gray-600">• Microcrédits</li>
                  <li className="text-gray-600">• Épargne et crédit</li>
                  <li className="text-gray-600">
                    • Accompagnement de proximité
                  </li>
                </ul>
                <div className="flex items-center justify-between">
                  <Link
                    href="/institutions-financieres?tab=microfinance"
                    className="inline-flex items-center text-sm font-medium text-[#063a1e] hover:underline"
                  >
                    Explorer <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                  <Badge className="bg-[#063a1e]/20 text-[#063a1e] border-[#063a1e]/30">
                    5 disponibles
                  </Badge>
                </div>
              </div>
            </div>

            {/* Fonds d'investissement */}
            <div className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 hover:shadow-xl">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src="/images/fond.jpeg?height=300&width=400"
                  alt="Fonds d'investissement"
                  width={400}
                  height={300}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#063a1e] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-70"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="rounded-full bg-white/90 p-3 shadow-lg">
                    <Link href="/institutions-financieres?tab=fonds">
                      {" "}
                      <ArrowRight className="h-6 w-6 text-[#063a1e]" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <h3 className="mb-1 text-xl font-bold text-[#063a1e]">
                  Fonds d'investissement
                </h3>
                <p className="mb-3 text-sm text-gray-500">
                  Capital-risque et investissements
                </p>
                <ul className="mb-4 space-y-1 text-sm">
                  <li className="text-gray-600">• Capital-risque</li>
                  <li className="text-gray-600">
                    • Investissements stratégiques
                  </li>
                  <li className="text-gray-600">• Financement de croissance</li>
                </ul>
                <div className="flex items-center justify-between">
                  <Link
                    href="/institutions-financieres?tab=fonds"
                    className="inline-flex items-center text-sm font-medium text-[#063a1e] hover:underline"
                  >
                    Explorer <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                  <Badge className="bg-[#063a1e]/20 text-[#063a1e] border-[#063a1e]/30">
                    3 disponibles
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Financial Offers Comparison Section */}
      <section className="py-12 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#063a1e] mb-4">
              Instrument de Financement
            </h2>
            <p className="text-black/80 text-lg max-w-3xl mx-auto">
              Découvrez et comparez les meilleures opportunités de financement
              disponibles pour les PME gabonaises
            </p>
          </div>

          {/* Featured Offers */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Offer 1 */}
            <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-green-500">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-[#063a1e]">
                      <h1 className="text-base ">Crédit Équipement Pro</h1>
                      
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      BICIG - Banque
                    </p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    Taux préférentiel
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Montant</p>
                    <p className="font-semibold">5M - 100M FCFA</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Taux</p>
                    <p className="font-semibold text-green-600">8.5% - 12%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Durée</p>
                    <p className="font-semibold">2 - 7 ans</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Apport</p>
                    <p className="font-semibold">20% minimum</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Financement d'équipements professionnels avec conditions
                  préférentielles pour les membres FEG.
                </p>
                
              </CardContent>
            </Card>

            {/* Offer 2 */}
            <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg text-[#063a1e]">
                                          <h1 className="text-base ">                 Crédit de Fonctionnement</h1>
                    </CardTitle>

                    <p className="text-sm text-muted-foreground">
                      BWMAC - Banque
                    </p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800">Flexible</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Montant</p>
                    <p className="font-semibold">10M - 500M FCFA</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Taux</p>
                    <p className="font-semibold text-blue-600">9% - 14%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Durée</p>
                    <p className="font-semibold">6 mois - 3 ans</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Garantie</p>
                    <p className="font-semibold">Selon contexte</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Ligne de crédit flexible pour financer le besoin en fonds de
                  roulement de votre entreprise.
                </p>
              
              </CardContent>
            </Card>

            {/* Offer 3 */}
            <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-orange-500">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className=" text-[#063a1e]">
                                           <h1 className="text-base ">                                Microcrédit Entrepreneur </h1>
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      FINAFI - Microfinance
                    </p>
                  </div>
                  <Badge className="bg-orange-100 text-orange-800">
                    Accessible
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Montant</p>
                    <p className="font-semibold">500K - 10M FCFA</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Taux</p>
                    <p className="font-semibold text-orange-600">12% - 18%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Durée</p>
                    <p className="font-semibold">6 mois - 2 ans</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Garantie</p>
                    <p className="font-semibold">Solidaire</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Solution de financement adaptée aux petites entreprises et
                  entrepreneurs individuels.
                </p>
                
              </CardContent>
            </Card>

            {/* Offer 4 */}
            <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-purple-500">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className=" text-[#063a1e]">
                      <h1 className="text-base ">Crédit Immobilier Pro</h1>
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      UGB - Banque
                    </p>
                  </div>
                  <Badge className="bg-purple-100 text-purple-800">
                    Long terme
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Montant</p>
                    <p className="font-semibold">50M - 2Mds FCFA</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Taux</p>
                    <p className="font-semibold text-purple-600">7.5% - 10%</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Durée</p>
                    <p className="font-semibold">5 - 20 ans</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Apport</p>
                    <p className="font-semibold">30% minimum</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Financement pour l'acquisition de locaux commerciaux ou
                  industriels pour votre entreprise.
                </p>
                
              </CardContent>
            </Card>
          </div>

          {/* Comparison Tool */}
          <div className="bg-gradient-to-r from-[#063a1e] to-[#063a1e]/90 rounded-lg p-8 text-white">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">Outil de Comparaison</h3>
              <p className="text-white/90">
                Comparez jusqu'à 3 offres de financement pour trouver celle qui
                correspond le mieux à vos besoins
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <h4 className="font-semibold mb-2">Critères de comparaison</h4>
                <ul className="text-sm text-white/90 space-y-1">
                  <li>• Taux d'intérêt</li>
                  <li>• Montant maximum</li>
                  <li>• Durée de remboursement</li>
                  <li>• Conditions d'éligibilité</li>
                </ul>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <h4 className="font-semibold mb-2">Avantages membres FEG</h4>
                <ul className="text-sm text-white/90 space-y-1">
                  <li>• Taux préférentiels</li>
                  <li>• Traitement prioritaire</li>
                  <li>• Accompagnement dédié</li>
                  <li>• Conditions négociées</li>
                </ul>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <h4 className="font-semibold mb-2">Support inclus</h4>
                <ul className="text-sm text-white/90 space-y-1">
                  <li>• Simulation personnalisée</li>
                  <li>• Aide au montage de dossier</li>
                  <li>• Suivi de demande</li>
                  <li>• Conseil expert</li>
                </ul>
              </div>
            </div>

            <div className="text-center">
              <Link href="/offre">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="bg-[#063a1e] relative hover:bg-white min-w-[200px] group"
                  >
                    <span className="absolute inset-0 w-full h-full bg-[#dcdaa4] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0"></span>
                    <span className="relative mr-3 z-10 transition-colors duration-500 ease-in-out group-hover:text-[#063a1e]">
                      <p className="flex items-center justify-center">          Voir toutes les offres <ArrowRight className="ml-2 h-4 w-4" /></p>
                    </span>
                  </Button>
                </Link>
            </div>
          </div>
        </div>
      </section>
  

      {/* News & Events Section */}
      <section className="py-12 ">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-5 justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-[#063a1e] flex items-center gap-3">
                Actualités & Événements
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              </h2>
              <p className="text-muted-foreground mt-2">
                Restez informé des dernières actualités du monde des PME
              </p>
            </div>
           
            <Link href="/actualites">
            <Button
              size="lg"
              className="hover:text-[#063a1e] duration-300 ease-in-out hover:bg-white border hover:border-[#063a1e] font-medium"
            >
                        Toutes les actualités <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Featured Article */}
            <div className="lg:col-span-2">
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src="/article.png?height=400&width=600"
                    alt="Article principal"
                    width={600}
                    height={400}
                    className="w-full h-full object-center object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-red-500 text-white">À LA UNE</Badge>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                    <h3 className="text-white text-xl font-bold mb-2">
                      Nouveau dispositif de financement pour les PME gabonaises
                    </h3>
                    <p className="text-white/90 text-sm">
                      Le gouvernement annonce un fonds de 50 milliards FCFA pour
                      soutenir les PME...
                    </p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span>22 Juin 2025</span>
                    <span>•</span>
                    <span>Économie</span>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Cette initiative gouvernementale vise à faciliter l'accès au
                    financement pour les petites et moyennes entreprises
                    gabonaises dans les secteurs prioritaires de l'économie
                    nationale...
                  </p>
                  <Button
                    variant="ghost"
                    className="text-[#063a1e] hover:bg-[#063a1e]/10 p-0"
                  >
                    Lire l'article complet{" "}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Side Articles */}
            <div className="space-y-6">
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">
                      ÉVÉNEMENT
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      20 Juin 2025
                    </span>
                  </div>
                  <h4 className="font-semibold mb-2 text-sm">
                    Forum de l'Entrepreneuriat Féminin 2025
                  </h4>
                  <p className="text-xs text-muted-foreground mb-3">
                    Rendez-vous le 15 juillet à Libreville pour célébrer
                    l'entrepreneuriat féminin au Gabon.
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-[#063a1e] hover:bg-[#063a1e]/10 p-0 h-auto"
                  >
                    En savoir plus
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">
                      FORMATION
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      18 Juin 2025
                    </span>
                  </div>
                  <h4 className="font-semibold mb-2 text-sm">
                    Webinaire : Digitalisation des PME
                  </h4>
                  <p className="text-xs text-muted-foreground mb-3">
                    Formation gratuite sur les outils digitaux essentiels pour
                    moderniser votre entreprise.
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-[#063a1e] hover:bg-[#063a1e]/10 p-0 h-auto"
                  >
                    S'inscrire gratuitement
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">
                      RÉGLEMENTATION
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      16 Juin 2025
                    </span>
                  </div>
                  <h4 className="font-semibold mb-2 text-sm">
                    Nouvelles mesures fiscales 2025
                  </h4>
                  <p className="text-xs text-muted-foreground mb-3">
                    Découvrez les changements fiscaux qui impactent les PME à
                    partir de juillet 2025.
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-[#063a1e] hover:bg-[#063a1e]/10 p-0 h-auto"
                  >
                    Consulter le guide
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Subscription Section */}
      <section id="subscription" className="py-16 bg-[#EAEEEB]">
        <div className="md:container">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-[#dcdaa4]">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="bg-[#063a1e] p-8 text-white">
                  <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#dcdaa4] to-[#bdbd95] bg-clip-text text-transparent">
                    Restez informé
                  </h2>
                  <p className="mb-6">
                    Abonnez-vous pour recevoir des alertes :
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
                    <li className="flex items-start gap-2">
                      <span className="bg-gradient-to-r from-[#dcdaa4] to-[#bdbd95] text-[#063a1e] rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold mt-0.5">
                        ✓
                      </span>
                      <span>Offres Financières </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-gradient-to-r from-[#dcdaa4] to-[#bdbd95] text-[#063a1e] rounded-full h-5 w-5 flex items-center justify-center text-xs font-bold mt-0.5">
                        ✓
                      </span>
                      <span>Offres de services des PME </span>
                    </li>
                  </ul>
                  <div className="w-full mt-6">
                    <h3 className="text-[#dcdaa4] font-bold text-lg mb-3">
                      Informations de contact
                    </h3>
                    <h3>
                      Pour tous vos besoins d'informations contactez-nous ou
                      suivez-nous sur nos réseaux sociaux.
                    </h3>
                    <ul className="space-y-2 mt-4 text-sm">
                      <li className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <a className="hover:underline" href="tel:065815738">
                          (+241) 065 81 57 38
                        </a>
                      </li>
                      <li className="flex items-start gap-2">
                        <Mail className="h-4 w-4 mt-0.5" />
                        <div className="flex">
                          <a
                            className="hover:underline"
                            href="mailto:info@lafeg.ga"
                          >
                            info@lafeg.ga /
                          </a>
                          <a
                            className="hover:underline"
                            href="mailto:a.obiang@lafeg.ga"
                          >
                            a.obiang@lafeg.ga
                          </a>
                        </div>
                      </li>
                    </ul>

                    <div className="mt-4">
                      <p className="mb-2 text-sm font-semibold">Suivez-nous</p>
                      <div className="flex space-x-4">
                        <Link
                          target="_blank"
                          href="https://www.facebook.com/feggabon?locale=fr_FR"
                        >
                          <Facebook className="hover:scale-125 duration-200 hover:text-[#dcdaa4]" />
                        </Link>
                        <Link
                          target="_blank"
                          href="https://www.linkedin.com/company/lafeg/"
                        >
                          <Linkedin className="hover:scale-125 duration-200 hover:text-[#dcdaa4]" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" p-8">
                  <div className=" ">
                    <h3 className="text-xl font-semibold text-[#063a1e] mb-6">
                      Formulaire d'abonnement
                    </h3>
                  </div>
                  <Form />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
