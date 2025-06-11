"use client"

import React, { useEffect, useState } from "react";
import Image from "next/image";

const Loader = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Vérifie si l'utilisateur a déjà visité
    if (!localStorage.getItem("hasVisited")) {
      // Si c'est le premier chargement, on affiche le loader
      setTimeout(() => {
        setLoading(false);
        localStorage.setItem("hasVisited", "true");
      }, 20000); // Délai de 2 secondes
    } else {
      // Si l'utilisateur a déjà visité, on cache immédiatement
      setLoading(false);
    }
  }, []);

  return (
    <div> 
      {loading && (

       <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
      <div className="flex flex-col items-center">
        <div className="relative w-16 h-16 mb-4">
          <div className="absolute inset-0 rounded-full border-4 border-[#063a1e]/20"></div>
          <div className="absolute inset-0 rounded-full border-4 border-t-[#063a1e] animate-spin"></div>
        </div>

        <div className="flex flex-col items-center">
          <Image src="/images/logo-feg.png" alt="Logo FEG" width={60} height={60} className="h-12 w-auto mb-2" />
          <h2 className="text-lg font-bold text-[#063a1e]">Répertoire des textes Juridiques</h2>
        </div>
        <div className="mt-4 h-1 w-48 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#dcdaa4] to-[#bdbd95] animate-pulse"></div>
        </div>
      </div>
    </div>
      )}</div>
  );
};

export default Loader;

