import { Badge } from "@/components/ui/badge";
import {
    Facebook,
    Linkedin,
  } from "lucide-react";

const formation = [
  {
    id: 1,
    partenaire: <Badge>Partenaire FEG</Badge>,
    logo: "/images/sea/formation/ogooue_logo.png",
    title: "Ogooué Lab & Ecole 241",
    // type: "Banque publique de développement",
    description: "Ogooué Labs est une ONG dédiée au développement de l’économie numérique et de l’entrepreneuriat, à travers son école, son accélérateur et son laboratoire d’innovation.",
    adresse: " Ancienne sobraga",
    tel:"+241  07 32 32 11",
    mail: "fabriqueecole241@gmail.com",
    rs1: "https://www.facebook.com/Ecole241?locale=fr_FR",
    rs2: "",
    textrs1:  <span className="text-sm flex gap-2">  <Facebook className="h-4 w-4 text-[rgb(6,58,30)] mt-0.5" />Visiter la page</span>,
    // textrs2:  <span className="text-sm flex gap-2"> <Linkedin className="h-4 w-4 text-[rgb(6,58,30)] mt-0.5" /> Visiter la page</span>,
    site: "",
  },
  {
    id: 2,
    logo: "/images/sea/formation/cyber_logo.png",
    partenaire: "",
    title: "CyberSchool",
    type: "",
    description: "Cyberschool entrepreneuriat est un incubateur NTIC qui met les nouvelles technologies au service de l'entrepreneuriat et accompagne les entrepreneurs dans la réalisation de leurs projets.",
    adresse: "Echangeur de Nzeng-Ayong",
    tel: "+241 60385058 ",
    mail: " cyberschoolgabon@gmail.com",
    rs1: "https://www.facebook.com/cyberschoolgabon/?locale=fr_FR",
    rs2: "https://www.linkedin.com/in/cyberschool-formations-2a6a9222b/",
    textrs1:  <span className="text-sm flex gap-2">  <Facebook className="h-4 w-4 text-[rgb(6,58,30)] mt-0.5" />Visiter la page</span>,
    textrs2:  <span className="text-sm flex gap-2"> <Linkedin className="h-4 w-4 text-[rgb(6,58,30)] mt-0.5" /> Visiter la page</span>,
    site: "https://www.cyberschool.ga/",
  },
  
];
export default formation;
