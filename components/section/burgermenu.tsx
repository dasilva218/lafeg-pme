"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";

import Link from "next/link";



const HamburgerMenu = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  
    const pathname = usePathname();
  
    const isActive = (path: string): boolean => pathname === path;
     const mobileMenuItems = [
      { 
        label: "Accueil", 
        href: "/" 
      },
      {
        label: "Textes Juridiques",
        href: "/textes-juridiques" 
      },
      {
        label: "Institutions Financières",
        href: "/institutions-financieres" 
      },
      {
        label: "Structure d'Ecadremente et d'Accompagnement",
        href: "/structures-accompagnement" 
      },
      {
        label: "Offres",
        href: "/offre" 
      },
      {
        label: "Offres",
        href: "/offre" 
      },
      {
        label: "Entreprises & Services",
        href: "/entreprise",
     
      },
      {
        label: "À propos",
        href: "/a-propos" 
      },
      {
        label: "Contact",
        href: "https://www.lafeg.ga/contact",
        target: "_blank"
      }
    ];

  return (
    <div className="flex lg:hidden">
      <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1 focus:outline-none"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span
            className={`block h-1 w-8 bg-[#063a1e] rounded transform transition duration-300 ease-in-out ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block h-1 w-8 bg-[#063a1e] rounded transition duration-300 ease-in-out ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-1 w-8 bg-[#063a1e] rounded transform transition duration-300 ease-in-out ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>

        {/* Mobile menu */}
        <div
          className={`lg:hidden fixed top-20 left-0 bg-[#063a1e]/90 w-full max-h-[calc(100vh-64px)] overflow-auto transform transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          } z-30 shadow-xl`}
          aria-hidden={!menuOpen}
        >
          <ul className="flex flex-col divide-y divide-gray-200">
            {mobileMenuItems.map((item) =>
                <li key={item.href}>
                  <Link
                    href={item.href || "/"}
                    className={`block px-6 py-3 text-[16px]  ${
                    isActive(item.href)
                      ? "text-[#063a1e] font-bold bg-white border-y border-[#063a1e]"
                      : "text-[#bdbd95] font-medium"
                  }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              
            )}
          </ul>
        </div>
    </div>
  );
};

export default HamburgerMenu;
