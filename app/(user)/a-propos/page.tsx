import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight,
  Mail,
  BookOpen,
  FileText,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function APropos() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Breadcrumb */}
      <div className="bg-white border-b shadow-sm">
        <div className="container px-4 py-3 md:py-4">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground">
            <Link href="/" className="hover:text-[#063a1e] transition-colors">
              Accueil
            </Link>
            <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="font-medium text-[#063a1e]">À propos</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative py-10 sm:py-12 md:py-16 bg-[#063a1e]">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="w-full md:w-3/5 text-center md:text-left">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-[#dcdaa4] leading-tight">
                  À propos de notre{" "}
                  <span className="text-[#dcdaa4]">plateforme</span>
                </h1>
                <p className="text-white sm:text-lg text-muted-foreground mb-6 sm:mb-8">
                  Accédez facilement aux textes juridiques, lois et règlements
                  concernant les PME gabonaises.
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-3 sm:gap-4">
                  <Link href="https://www.lafeg.ga/contact">
                    <Button
                      // size="lg"
                      className="bg-white text-[#063a1e] hover:text-[#fff] border-white duration-500 ease-in-out hover:bg-[#063a1e] hover:border-2 font-medium"
                    >
                      Nous contactez
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="relative max-w-xs mx-auto w-full">
                <div className="relative overflow-hidden rounded-lg shadow-lg border-8 border-[#dcdaa4]">
                  <Image
                    src="/images/judicia.jpg"
                    alt="logo"
                    width={600}
                    height={600}
                    className="w-full h-full rounded-sm hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-[#dcdaa4] text-[#063a1e] font-bold px-3 py-1 sm:px-4 sm:py-2 rounded-lg shadow-md transform rotate-6 text-xs sm:text-sm">
                  Créer en 2025
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container px-4 py-10 sm:py-12 md:py-16">
        <div className="max-w-5xl mx-auto">
          {/* Mission Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12 sm:mb-16 md:mb-20 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-[#063a1e]">
                Faciliter l'accès à l'information juridique
              </h2>
              <div className="space-y-3 sm:space-y-4">
                <p className="text-base sm:text-lg text-gray-700">
                  Le Répertoire des Textes Juridiques pour les PME Gabonaises
                  est une initiative de la
                  <span className="font-semibold text-[#063a1e]">
                    {" "}
                    Fédération des Entreprises du Gabon (FEG)
                  </span>{" "}
                  visant à faciliter l'accès à l'information juridique pour les
                  petites et moyennes entreprises.
                </p>

                <p className="text-sm sm:text-base text-gray-700">
                  Notre plateforme a été conçue pour répondre aux besoins
                  spécifiques des entrepreneurs gabonais qui font face à des
                  défis constants pour rester informés des évolutions
                  législatives et réglementaires qui impactent leurs activités.
                </p>

                <p className="text-sm sm:text-base text-gray-700">
                  Nous nous engageons à fournir un accès simplifié, centralisé
                  et à jour aux textes juridiques, ainsi qu'à des ressources
                  pratiques pour aider les PME à se conformer aux exigences
                  légales et à prospérer dans l'économie gabonaise.
                </p>
              </div>
            </div>
            <div className="order-1 md:order-2 flex justify-center">
              <div className="rounded-2xl overflow-hidden shadow-xl border-4 ">
                <Image
                  src="/images/logo-feg.png"
                  alt="PME Gabonaises"
                  width={500}
                  height={500}
                  className="w-full scale-90 h-auto object-cover hover:scale-95 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          {/* Guide Numérique Section */}
          <div className="bg-[#063a1e] w-full p-6 sm:p-8 md:p-10 rounded-xl sm:rounded-2xl shadow-md mb-12 sm:mb-16 md:mb-20">
            <div className="text-center mb-6 sm:mb-8 md:mb-10">
              <div className="inline-flex items-center gap-2 bg-[#dcdaa4] px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[#063a1e] font-medium text-xs sm:text-sm mb-3 sm:mb-4">
                Ressource Essentielle
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-[#dcdaa4]">
                Guide Numérique des PME
              </h2>
              <p className="text-white sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                Un outil complet pour accompagner les entreprises gabonaises
                dans leur développement
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <div className="bg-white p-5 sm:p-6 md:p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-r from-[#dcdaa4] to-[#bdbd95]  rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                  <BookOpen className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-[#063a1e]" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-[#063a1e]">
                  Qu'est-ce que le Guide Numérique des PME ?
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  <p className="text-sm sm:text-base text-gray-700">
                    Le "Guide Numérique des PME" est une ressource complète
                    développée par la Fédération des Entreprises du Gabon pour
                    aider les petites et moyennes entreprises à naviguer dans
                    l'écosystème économique et juridique gabonais.
                  </p>
                  <div className="p-3 sm:p-4 bg-[#063a1e]/5 rounded-lg border border-[#063a1e]/10">
                    <p className="text-xs sm:text-sm text-[#063a1e]/80 italic">
                      "Ce guide réunit en un seul endroit toutes les
                      informations essentielles dont les entrepreneurs ont
                      besoin : textes juridiques, contacts institutionnels et
                      des procédures administratives."
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 sm:p-6 md:p-8 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-r from-[#dcdaa4] to-[#bdbd95]  rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                  <FileText className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-[#063a1e]" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-[#063a1e]">
                  Ce que vous y trouverez
                </h3>
                <p className="mb-4 sm:mb-6 text-sm sm:text-base text-gray-700">
                  Notre Guide Numérique des PME offre de nombreuses ressources
                  pour soutenir votre entreprise :
                </p>
                <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-700">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-[#063a1e] mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
                    <span>Nouveaux textes juridiques</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-[#063a1e] mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
                    <span>Structures d'Encadrement et d'Accompagnement</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-[#063a1e] mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
                    <span>Institutions Financières</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="bg-gradient-to-r from-[#dcdaa4] to-[#bdbd95] p-6 sm:p-8 rounded-xl shadow-md overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
              <div>
                <div className="inline-flex items-center gap-2 bg-[#063a1e] px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[#fff] font-medium text-xs sm:text-sm mb-3 sm:mb-4">
                  <Mail className="h-3 w-3 sm:h-4 sm:w-4" />
                  Restez informé
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#063a1e] mb-3 sm:mb-4">
                  S'abonner à la newsletter
                </h2>
                <p className="text-sm sm:text-base text-[#063a1e]/90 max-w-xl">
                  Trouvez rapidement le bon contact pour vos besoins en
                  financement. Abonnez-vous à notre newsletter pour connaître
                  quels sont les institutions utiles aux PME, avec leurs
                  coordonnées et une description de leurs services. Accédez
                  facilement à toutes ces informations depuis notre site.
                </p>
              </div>
              <div className="w-full md:w-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <a href="/#subscription">
                    <Button className="bg-[#063a1e] hover:bg-[#063a1e]/90 whitespace-nowrap h-9 sm:h-10 text-sm sm:text-base">
                      Inscrivez vous maintenant
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
