import { Badge } from "@/components/ui/badge";
import {
    Facebook,
    Linkedin,
  } from "lucide-react";

const cabinet = [
  {
    id: 1,
    partenaire: "",
    logo: "/images/sea/formation/juridaf_logo.png",
    title: "JURIDAF",
    // type: "Banque publique de développement",
    description: "JURIDAF GABON Met son expertise scientifique et son expérience pratique à la disposition des Entreprises, des Organisations et des Administrations.",
    adresse: "10ème étage Immeuble ODYSSÉE, Boulevard de l’indépendance",
    tel:"+241  74 10 99 24",
    mail: "info@juridafgabon.com",
    rs1: "",
    rs2: "",
    textrs1:  <span className="text-sm flex gap-2">  <Facebook className="h-4 w-4 text-[rgb(6,58,30)] mt-0.5" />Visiter la page</span>,
    // textrs2:  <span className="text-sm flex gap-2"> <Linkedin className="h-4 w-4 text-[rgb(6,58,30)] mt-0.5" /> Visiter la page</span>,
    site: "https://juridafgabon.com/french/",
  }
  
];
export default cabinet;
