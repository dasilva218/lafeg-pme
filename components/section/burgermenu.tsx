"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

const HamburgerMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSubMenus, setOpenSubMenus] = useState<string[]>([]);
  const [isNavigating, setIsNavigating] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path: string): boolean => pathname === path;

  const toggleSubMenu = (label: string) => {
    setOpenSubMenus((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  const mobileMenuItems = [
    { label: "Accueil", href: "/" },
    { label: "Textes Juridiques", href: "/textes-juridiques" },
    { label: "Institutions Financières", href: "/institutions-financieres" },
    {
      label: "Structure d'Ecadremente et d'Accompagnement",
      href: "/structures-accompagnement",
    },
    {
      label: "Offres",
      href: "/offre",
      children: [
        { label: "Instrument de Financement", href: "/offre" },
        { label: "Offres de Services", href: "/entreprise" },
      ],
    },
    { label: "Actualités", href: "/actualite" },
    { label: "À propos", href: "/a-propos" },
    {
      label: "Contact",
      href: "https://www.lafeg.ga/contact",
      target: "_blank",
    },
  ];

  const handleNavigation = async (href: string) => {
    setIsNavigating(true);
    setMenuOpen(false);
    router.push(href);
  };

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

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed top-20 left-0 bg-[#063a1e]/90 w-full max-h-[calc(100vh-64px)] overflow-auto transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } z-30 shadow-xl`}
        aria-hidden={!menuOpen}
      >
        <ul className="flex flex-col divide-y divide-gray-200">
          {mobileMenuItems.map((item) => (
            <li key={item.label}>
              <div className="flex flex-col">
                {item.children ? (
                  <button
                    onClick={() => toggleSubMenu(item.label)}
                    className={`flex justify-between items-center px-6 py-3 text-[16px] w-full text-left ${
                      isActive(item.href)
                        ? "text-[#063a1e] font-bold bg-white border-y border-[#063a1e]"
                        : "text-[#bdbd95] font-medium"
                    }`}
                  >
                    {item.label}
                    <span
                      className={`ml-2 transition-transform duration-200 ${
                        openSubMenus.includes(item.label) ? "rotate-180" : ""
                      }`}
                    >
                      <ChevronDown />
                    </span>
                  </button>
                ) : item.target === "_blank" ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 block text-[16px] text-[#bdbd95] font-medium"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ) : (
                  <button
                    onClick={() => handleNavigation(item.href)}
                    className={`px-6 py-3 text-left w-full text-[16px] ${
                      isActive(item.href)
                        ? "text-[#063a1e] font-bold bg-white border-y border-[#063a1e]"
                        : "text-[#bdbd95] font-medium"
                    }`}
                  >
                    {item.label}
                  </button>
                )}

                {item.children && openSubMenus.includes(item.label) && (
                  <ul className="ml-4">
                    {item.children.map((subItem) => (
                      <li key={subItem.label}>
                        <button
                          onClick={() => handleNavigation(subItem.href)}
                          className={`block px-6 py-2 text-sm w-full text-left ${
                            isActive(subItem.href)
                              ? "text-[#063a1e] font-bold bg-white border-y border-[#063a1e]"
                              : "text-[#bdbd95] font-medium"
                          }`}
                        >
                          {subItem.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ul>
        {isNavigating && (
          <div className="text-white text-center py-4 animate-pulse">
            Chargement...
          </div>
        )}
      </div>
    </div>
  );
};

export default HamburgerMenu;
