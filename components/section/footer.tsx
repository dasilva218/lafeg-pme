"use client";
import Image from "next/image";
import { useEffect } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Globe,
  ChevronLeft,
  Facebook,
  Linkedin,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, []);

  return (
    <footer className="bg-[#063a1e] text-gray-300 py-10">
      <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row gap-10 md:ml-20 ml-4">
          <div className="w-full md:w-1/6 flex justify-center md:justify-start">
            <div className="p-4 ">
              <Image
                src="/images/logo_FEG_blanc.png"
                alt="Logo FEG"
                width={100}
                height={100}
                className="h-24 w-auto object-contain"
              />
            </div>
          </div>

    
          <div className="w-full md:w-1/3">
            <h3 className="text-[#dcdaa4] font-bold text-lg mb-2">FEG</h3>
            <p className="text-sm">
              Le Guide Numérique des PME est une initiative de la Fédération des Entreprises du Gabon visant à faciliter l'accès à l'information par rapport aux normes juridiques.
            </p>
            <ul className="space-y-2 mt-3 text-sm">
              <li>
                <Link
                  target="_blank"
                  href="https://www.lafeg.ga/home"
                  className="text-[#b0b08b] underline underline-offset-8 hover:text-white flex items-center"
                >
                  <ChevronLeft /> A propos de nous
                </Link>
              </li>
              <li>
                <Link
                  target="_blank"
                  href="https://www.lafeg.ga/about-us/president"
                  className="text-[#b0b08b] underline underline-offset-8 hover:text-white flex items-center"
                >
                  <ChevronLeft /> Mot du président
                </Link>
              </li>
              <li>
                <Link
                  target="_blank"
                  href="https://www.lafeg.ga/activities/news"
                  className="text-[#b0b08b] underline underline-offset-8 hover:text-white flex items-center"
                >
                  <ChevronLeft /> Activité
                </Link>
              </li>
            </ul>
          </div>

        
          <div className="w-full md:w-1/3">
            <h3 className="text-[#dcdaa4] font-bold text-lg mb-3">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5" />
                <a
                  target="_blank"
                  className="hover:underline"
                  href="https://maps.app.goo.gl/bq9pVUeLkzM8pCb59"
                >
                  Immeuble ODYSSÉE, Boulevard de l'Indépendance, BP: 410, Libreville GABON
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <a className="hover:underline" href="tel:065815738">
                  (+241) 065 81 57 38
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5" />
                <div className="flex">
                  <a className="hover:underline" href="mailto:info@lafeg.ga">
                    info@lafeg.ga /
                  </a>
                  <a className="hover:underline" href="mailto:a.obiang@lafeg.ga">
                    a.obiang@lafeg.ga
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <Link
                  target="_blank"
                  className="hover:underline"
                  href="https://www.lafeg.ga/"
                >
                  www.lafeg.ga
                </Link>
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


          <div className="w-full md:w-1/3">
            <h3 id="lien" className="text-[#dcdaa4] font-bold text-lg mb-3">Liens Utiles</h3>
            <div className="flex flex-col gap-2 text-sm">
              <Link target="_blank" href="https://www.gni-anpigabon.com/" className="flex items-center text-[#b0b08b] underline underline-offset-8 hover:text-white">
                <ChevronLeft /> ANPI
              </Link>
              <Link target="_blank" href="https://www.facebook.com/ccaimagabon/?locale=fr_FR" className="flex items-center text-[#b0b08b] underline underline-offset-8 hover:text-white">
                <ChevronLeft /> Chambre de Commerce
              </Link>
              <Link target="_blank" href="https://journal-officiel.ga/" className="flex items-center text-[#b0b08b] underline underline-offset-8 hover:text-white">
                <ChevronLeft /> Le journal officiel
              </Link>
              <Link target="_blank" href="https://www.industries.gouv.ga" className="flex items-center text-[#b0b08b] underline underline-offset-8 hover:text-white">
                <ChevronLeft /> Ministère de l'Industrie
              </Link>
              <Link target="_blank" href="https://www.pme.gouv.ga/" className="flex items-center text-[#b0b08b] underline underline-offset-8 hover:text-white">
                <ChevronLeft /> Ministère des PME
              </Link>
            </div>
          </div>
        </div>

        
        <div className="border-t border-white mt-10 pt-5 text-center text-sm">
          <p>© 2025 Guide Numérique des PME. Tous droits réservés la FEG.</p>
        </div>
      </div>
    </footer>
  );
}
