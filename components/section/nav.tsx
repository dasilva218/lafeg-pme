"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import Link from "next/link";
import HamburgerMenu from "./burgermenu";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();

  const isActive = (path: string): boolean => pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="px-4 md:container flex h-20 items-center justify-between">
        <div className="flex items-center gap-5">
          <Image
            src="/images/logo-feg.png"
            alt="Logo FEG"
            width={80}
            height={80}
            className="h-12 md:h-16 w-auto"
          />
          <div>
            <h1 className="md:text-2xl md:hidden lg:block font-hyundai font-bold text-[#063a1e]">
              GUIDE NUMÉRIQUE <br className="md:block xl:hidden" /> DES PME
            </h1>
            <h1 className="md:text-2xl hidden md:block lg:hidden font-hyundai font-bold text-[#063a1e]">
              GUIDE NUMÉRIQUE DES PME
            </h1>
          </div>
        </div>
        <HamburgerMenu />
        <nav className="hidden md:flex gap-6">
          <ul className="hidden text-sm font-medium lg:flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-5 rtl:space-x-reverse md:mt-0 md:border-0">
            {[
              { name: "Accueil", path: "/" },
              { name: "Textes Juridiques", path: "/textes-juridiques" },
              {
                name: "Institutions Financières",
                path: "/institutions-financieres",
              },
              {
                name: "SEA",
                path: "/structures-accompagnement",
                hover: <TooltipContent> <p>Structure d'Encadrement et d'Accompagnement</p></TooltipContent>,
              },
              { name: "À propos", path: "/a-propos" },
              {
                name: "Contact",
                target: "_blank",
                path: "https://www.lafeg.ga/contact",
              },
            ].map((link) => (
              <li key={link.path}>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        target={link.target}
                        href={link.path}
                        className={`pb-1 relative font-bold cursor-pointer transition-all ease-in-out 
                  before:transition-[width] before:ease-in-out before:duration-700 before:absolute 
                  before:bg-[#063a1e] before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] 
                  before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 
                  after:absolute after:bg-[#063a1e] after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] 
                  after:bottom-0 after:right-[50%] ${
                    isActive(link.path)
                      ? "text-[#063a1e] border-b border-[#063a1e]"
                      : "text-black hover:text-[#063a1e]"
                  }`}
                      >
                        {link.name}
                      </Link>
                    </TooltipTrigger>
                    {link.hover}
                  </Tooltip>
                </TooltipProvider>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
