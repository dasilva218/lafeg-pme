"use client";

import { useEffect, useState, ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  BarChart3,
  FileText,
  Megaphone,
  Handshake,
  LogOut,
  Menu,
  Home,
  Briefcase,
  Newspaper,
  LucideIcon,
  FileEdit,
} from "lucide-react";

import {Providers} from "@/app/providers";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface AdminLayoutProps {
  children: ReactNode;
}

interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();

  // Redirige si non authentifié
  useEffect(() => {
    if (status === "unauthenticated" && pathname !== "/auth/login") {
      router.push("/auth/login");
    }
  }, [status, pathname, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Chargement...</p>
      </div>
    );
  }

  // On affiche le layout si l'utilisateur est authentifié
  if (session) {
    // Exemple d'un handleLogout pour NextAuth:
    const handleLogout = async () => {
      await signOut({ callbackUrl: "/auth/login" });
    };


  const navigation: NavItem[] = [
    { name: "Tableau de bord", href: "/admin/dashboard", icon: BarChart3 },
    { name: "Textes juridiques", href: "/admin/textes", icon: FileText },
    { name: "Institution", href: "/admin/institutions", icon: Newspaper },
    { name: "SEA", href: "/admin/structures", icon: Briefcase },
    { name: "Offre & Services", href: "/admin/entreprise", icon: Handshake},
    { name: "Publicité", href: "/admin/publicites", icon: Megaphone },
    { name: "Actualité", href: "/admin/actualite", icon: FileEdit },
  ];

  return (
    <Providers>
      <div className="flex overflow-hidden">
        {/* Sidebar desktop */}

        <div className="hidden md:block fixed top-0 left-0 h-screen w-64 z-40">
          <div className="flex h-full w-full flex-col flex-grow bg-[#063a1e]">
            <div className="flex items-center gap-3 justify-center border-b py-6 mx-6">
              <Image
                src="/images/logo_FEG_blanc.png"
                alt="Logo FEG"
                width={50}
                height={50}
                className="h-12 w-auto"
              />
              <div className="ml-3">
                <h1 className="text-md font-bold text-white">Espace Administrateur</h1>
                <p className="text-sm text-white">Guide Numérique des PME</p>
              </div>
            </div>
            <div className="mt-5 flex-1 flex flex-col">
              <nav className="flex-1 px-4 space-y-1">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                        isActive
                          ? "bg-white text-[#063a1e]"
                          : "text-white hover:bg-[#063a1e]/50"
                      }`}
                    >
                      <Icon className="mr-3 h-5 w-5" />
                      {item.name}
                    </Link>
                    
                  );
                })}
              </nav>
            </div>
            <div className="p-4">
              <Button
                variant="outline"
                className="w-full justify-start text-[#063a1e] border-white/20 hover:bg-[#063a1e]/80 hover:text-white"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>

        {/* Sidebar mobile */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden absolute top-4 left-4 z-50"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="p-0 bg-[#063a1e] text-white w-64"
          >
            <div className="flex flex-col h-full">
              <div className="flex bg-white items-center justify-between p-4">
                <div className="flex gap-4 items-center">
                  <Image
                    src="/images/logo-feg.png"
                    alt="Logo FEG"
                    width={40}
                    height={40}
                    className="h-10 w-auto"
                    priority
                  />
                  <div className="ml-3">
                    <h1 className="text-lg font-bold text-[#063a1e]">ADMIN</h1>
                    <p className="text-xs text-[#063a1e]">
                      Guide Numérique des PME
                    </p>
                  </div>
                </div>
              </div>
              <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                        isActive
                          ? "bg-[#063a1e]/80 text-white"
                          : "text-white/70 hover:bg-[#063a1e]/50 hover:text-white"
                      }`}
                    >
                      <Icon className="mr-3 h-5 w-5" />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
              <div className="p-4 border-t border-white/10">
                <Button
                
                  className="w-full justify-start text-white border-white/20 hover:bg-red-500 hover:text-white"
                  onClick={handleLogout}
                  aria-label="Déconnexion"
                >
                  <LogOut className="mr-2 h-4 w-4" aria-hidden />
                  Déconnexion
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Main content */}
        <div className="md:w-3/4 w-full flex flex-col flex-1">
          <header className="bg-white fixed left-0 md:left-64 right-0 top-0 h-16 px-4 z-50 shadow-sm">
            <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
              <div className="flex items-center md:hidden">
                <div className="w-10" />
              </div>
              <div className="flex-1 flex justify-between md:justify-end">
                <div className="flex items-center space-x-4">
                  <Link
                    href="/"
                    className="text-gray-500 hover:text-gray-700 flex items-center"
                  >
                    <Home className="h-5 w-5 mr-1" />
                    <span className="text-sm">Voir le site</span>
                  </Link>
                  {/* <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                </Button> */}
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-[#063a1e] flex items-center justify-center text-white">
                      A
                    </div>
                    <span className="ml-2 text-sm font-medium hidden md:block">
                      Admin
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 min-h-screen overflow-y-auto bg-gray-50 p-4 sm:p-6 lg:p-8 mt-16 md:ml-64">
            {children}
          </main>
        </div>
      </div>
    </Providers>
  );
}
}
