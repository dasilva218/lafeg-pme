import { Badge } from "@/components/ui/badge";
import {
    Facebook,
    Linkedin,
  } from "lucide-react";

const incubateur = [
  {
    id: 1,
    partenaire: <Badge>Partenaire FEG</Badge>,
    logo: "/images/sea/incubateur/sing_logo.jpg",
    title: "Société d’Incubation Numérique du Gabon (SING)",
    // type: "Banque publique de développement",
    description: "Société privée de services en innovation numérique, qui accompagne dans la transformation digitale du continent africain grâce à une expertise pragmatique, adaptée aux usages locaux et conforme aux standards internationaux.",
    adresse: " Rue Pecqueur Centre Ville (Derrière L'ébène de Masaya), Libreville Gabon",
    tel:"+241 74137103",
    mail: "contact@sing.ga",
    rs1: "https://www.facebook.com/singsagabon#",
    rs2: "",
    textrs1:  <span className="text-sm flex gap-2">  <Facebook className="h-4 w-4 text-[rgb(6,58,30)] mt-0.5" />Visiter la page</span>,
    // textrs2:  <span className="text-sm flex gap-2"> <Linkedin className="h-4 w-4 text-[rgb(6,58,30)] mt-0.5" /> Visiter la page</span>,
    site: "https://www.sing.ga/",
  },
  {
    id: 2,
    logo: "/images/sea/incubateur/akewa_logo.png",
    partenaire: "",
    title: "Akewa Accélérateur",
    type: "",
    description: "L’accélérateur Akewa, est un Incubateur des PME et un acteur en faveur de l’entreprenariat innovant au Gabon.",
    adresse: "Angodje, Sherko",
    tel: "+241 77434249 ",
    mail: " akewaccelerateur@gmail.com ",
    rs1: "https://www.facebook.com/akewa.org",
    rs2: "",
    textrs1:  <span className="text-sm flex gap-2">  <Facebook className="h-4 w-4 text-[rgb(6,58,30)] mt-0.5" />Visiter la page</span>,
    // textrs2:  <span className="text-sm flex gap-2"> <Linkedin className="h-4 w-4 text-[rgb(6,58,30)] mt-0.5" /> Visiter la page</span>,
    site: "https://akewa.org/",
  },
  {
    id: 3,
    logo: "/images/sea/incubateur/iml_logo.jpg",
    partenaire: "",
    title: "Incubateur Multi-sectoriel de Libreville (IML)",
    type: "",
    description: "L’Incubateur Multisectoriel de Libreville accompagne les entrepreneurs dans le développement de projets durables en leur offrant compétences clés, accompagnement stratégique et mentorat, pour transformer leurs idées en actions concrètes.",
    adresse: "Immeuble du Ministère des PME (Carrefour B2) Awendjé, Libreville",
    tel: "+241 01 74 53 63 ",
    mail: "contact@iml-gabon.com",
    rs1: "https://www.facebook.com/IncubateurML?locale=fr_FR",
    rs2: "",
    textrs1:  <span className="text-sm flex gap-2">  <Facebook className="h-4 w-4 text-[rgb(6,58,30)] mt-0.5" />Visiter la page</span>,
    site: "https://www.iml-gabon.com/",
  },
  
];
export default incubateur;
