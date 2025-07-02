"use client";

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
import { ChevronDownIcon } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export default function Nav() {
  const pathname = usePathname();

  const isActive = (path: string): boolean =>
    pathname.replace(/\/$/, "") === path.replace(/\/$/, "");

  type NavSubmenuItem = {
    name: string;
    path: string;
    tooltip?: string;
  };

  type NavItem =
    | { name: string; path: string; showDot?: boolean; tooltip?: string; target?: string }
    | { name: string; submenu: NavSubmenuItem[] };

  const navItems: NavItem[] = [
    { name: "Accueil", path: "/" },
    { name: "Textes Juridiques", path: "/textes-juridiques" },
    {
      name: "SEA",
      path: "/structures-accompagnement",
      tooltip: "Structure d'Encadrement et d'Accompagnement",
    },
    { name: "Institutions Financières", path: "/institutions-financieres" },
    // {
    //   name: "Ressources",
    //   submenu: [
    //     { name: "Textes Juridiques", path: "/textes-juridiques" },
    //     {
    //       name: "SEA",
    //       path: "/structures-accompagnement",
    //       tooltip: "Structure d'Encadrement et d'Accompagnement",
    //     },
    //     { name: "Institutions Financières", path: "/institutions-financieres" },
    //   ],
    // },
    {
      name: "Offres",
      submenu: [
        { name: "Instrument de Financement", path: "/offre" },
        { name: "Offres de Services", path: "/entreprise" },
      ],
    },
    { name: "Actualités", path: "/actualite",  showDot: true },
    { name: "À propos", path: "/a-propos" },
    {
      name: "Contact",
      target: "_blank",
      path: "https://www.lafeg.ga/contact",
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="px-4 md:container flex h-20 items-center justify-between md:justify-center">
        <div className="flex lg:hidden items-center gap-5">
          <Image
            src="/images/logo-feg.png"
            alt="Logo FEG"
            width={80}
            height={80}
            className="h-12 md:h-16 w-auto"
          /> 
          <div>
            <h1 className="text-xl md:hidden lg:block font-hyundai font-bold text-[#063a1e]">
              Guide Numérique <br className="md:block xl:hidden" /> des PME
            </h1>
            <h1 className="md:text-2xl hidden md:block lg:hidden font-hyundai font-bold text-[#063a1e]">
              Guide Numérique des PME
            </h1>
          </div>
        </div>
        <HamburgerMenu />
        {/* Burger button */}

        <nav className="hidden lg:flex gap-6">
          <ul className="text-sm font-medium lg:flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-5 rtl:space-x-reverse md:mt-0 md:border-0">
            <NavigationMenu>
              <NavigationMenuList className="text-sm font-medium lg:flex flex-col p-2 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-5 rtl:space-x-reverse md:mt-0 md:border-0">
                {navItems.map((item) =>
                  "submenu" in item ? (
                    <NavigationMenuItem key={item.name} className="relative">
                      <NavigationMenuTrigger className="pb-1 relative font-bold transition-all ease-in-out text-black hover:text-[#063a1e] flex items-center gap-1">
                        {item.name}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="absolute left-0 top-full bg-white rounded-md shadow-lg p-2 z-50 min-w-[220px]">
                        <div className="grid gap-2">
                          {item.submenu.map((sub) => (
                            <TooltipProvider key={sub.path}>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <NavigationMenuLink asChild>
                                    <Link
                                      href={sub.path}
                                      className={`block px-3 py-2 text-sm rounded-md transition-all ${
                                        isActive(sub.path)
                                          ? "font-bold text-[#063a1e]"
                                          : "text-black hover:text-[#063a1e] hover:bg-[#dcdaa4]/20"
                                      }`}
                                    >
                                      {sub.name}
                                      
                                    </Link>
                                    
                                  </NavigationMenuLink>
                                </TooltipTrigger>
                                {sub.tooltip && (
                                  <TooltipContent>
                                    <p>{sub.tooltip} </p>
                                  </TooltipContent>
                                )}
                              </Tooltip>
                            </TooltipProvider>
                          ))}
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  ) : (
                    <NavigationMenuItem key={item.path}>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <NavigationMenuLink asChild>
                              <Link
                                target={item.target}
                                href={item.path}
                                className={`pb-1 relative font-bold cursor-pointer transition-all ease-in-out 
                      before:transition-[width] before:ease-in-out before:duration-700 before:absolute 
                      before:bg-[#063a1e] before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] 
                      before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 
                      after:absolute after:bg-[#063a1e] after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] 
                      after:bottom-0 after:right-[50%] ${
                        isActive(item.path)
                          ? "text-[#063a1e] border-b border-[#063a1e]"
                          : "text-black hover:text-[#063a1e]"
                      }`}
                              > {item.name} {item.showDot && (
    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse inline-block mr-1" />
  )}
                              </Link>
                              
                            </NavigationMenuLink>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{item.tooltip}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </NavigationMenuItem>
                  )
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </ul>
        </nav>
      </div>
    </header>
  );
}
