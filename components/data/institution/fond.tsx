import { Badge } from "@/components/ui/badge";
import {
    Facebook,
    Linkedin,
  } from "lucide-react";

const fond = [
  {
    id: 1,
    partenaire: <Badge>Partenaire FEG</Badge>,
    logo: "/images/institution/fond/fgis_logo.png",
    title: "Fonds Gabonais d'Investissements Stratégiques (FGIS)",
    type: "Gestion des investissements",
    description: " le Fonds Gabonais d’Investissements Stratégiques gère le patrimoine de l’État et investit dans des projets à fort impact social, au service de la transformation économique du Gabon.",
    adresse: "Zone Nord- Baie des Rois",
    tel:"+241 01 74 22 46  ",
    mail: "contact@fgis-gabon.com",
    rs1: "",
    rs2: "https://www.linkedin.com/company/fgis/",
    textrs2:  <span className="text-sm flex gap-2"> <Linkedin className="h-4 w-4 text-[rgb(6,58,30)] mt-0.5" /> Visiter la page</span>,
    site: "https://www.fgis-gabon.com/",
  },
  {
    id: 2,
    logo: "/images/institution/fond/okoume_logo.jpg",
    partenaire: "",
    title: "Fonds Okoumé Capital  ",
    type: "Service d’investissement",
    description: "Fonds Okoumé Capital   est une société de capital-investissement dédiée au financement de l’entrepreneuriat au Gabon et au développement des PME et start-ups disposant d’un fort potentiel de croissance à l’échelle nationale et internationale.",
    adresse: "𝗭𝗼𝗻𝗲 𝗡𝗼𝗿𝗱 - 𝗕𝗮𝗶𝗲 𝗱𝗲𝘀 𝗥𝗼𝗶𝘀 - 𝗦𝗶𝗲̀𝗴𝗲 𝗙𝗚𝗜𝗦 𝗲𝘁 𝗳𝗶𝗹𝗶𝗮𝗹𝗲𝘀 ",
    tel: "+241 11742246",
    mail: "contact@okoumecapital.ga",
    rs1: "https://www.facebook.com/OkoumeCapital",
    rs2: "https://www.linkedin.com/company/okoume-capital-sa/",
    textrs1:  <span className="text-sm flex gap-2">  <Facebook className="h-4 w-4 text-[rgb(6,58,30)] mt-0.5" />Visiter la page</span>,
    textrs2:  <span className="text-sm flex gap-2"> <Linkedin className="h-4 w-4 text-[rgb(6,58,30)] mt-0.5" /> Visiter la page</span>,
    site: "https://edgemf.net/",
  },
  {
    id: 3,
    logo: "/images/institution/fond/sgg_logo.png",
    partenaire: "",
    title: "Société de Garantie du Gabon - SGG",
    type: "",
    description: "La SGG participe au développement des petites et moyennes entreprises et à la diversification de l’économie par le biais de la garantie auprès des établissements de crédits en facilitant l’accès aux financements.",
    adresse: "Zone Nord - Baie des Rois - 3e étage, Siège du FGIS et Filiales",
    tel: "+241 01 74 22 46",
    mail: "contact@sgg.ga",
    rs1: "https://www.facebook.com/SGGabon",
    rs2: "https://www.linkedin.com/company/soci%C3%A9t%C3%A9-de-garanties-du-gabon/",
    textrs1:  <span className="text-sm flex gap-2">  <Facebook className="h-4 w-4 text-[rgb(6,58,30)] mt-0.5" />Visiter la page</span>,
    textrs2:  <span className="text-sm flex gap-2"> <Linkedin className="h-4 w-4 text-[rgb(6,58,30)] mt-0.5" /> Visiter la page</span>,
    site: "https://www.sgg.ga/",
  },
  


  
];
export default fond;
