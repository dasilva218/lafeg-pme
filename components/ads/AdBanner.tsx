"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { fetchAllPublicites, Annonce } from "@/app/services/annonce/api";

type DynamicAdBannerProps = {
  /** 
   * Valeur de `libelle` (emplacement) à filtrer, 
   * ex: "HEADER", "SIDEBAR", "FOOTER", "HOMEPAGE_BANNER" 
   */
  emplacement: string;
  /** Intervalle en ms entre chaque slide */
  interval?: number;
  /** Dimensions du bandeau */
  className?: string;
};

export default function AdBanner({
  emplacement,
  interval = 5000,
  className = "w-full h-32",
}: DynamicAdBannerProps) {
  const [ads, setAds] = useState<Annonce[]>([]);
  const [current, setCurrent] = useState(0);

  // Récupère et filtre les pubs à l’emplacement donné
  useEffect(() => {
    fetchAllPublicites()
      .then((all) => {
        const filtered = all.filter((p) => p.libelle === emplacement);
        setAds(filtered);
      })
      .catch((err) => console.error("Erreur fetch pubs :", err));
  }, [emplacement]);

  // Auto-slide
  useEffect(() => {
    if (!ads.length) return;
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % ads.length);
    }, interval);
    return () => clearInterval(timer);
  }, [ads, interval]);

  if (!ads.length) {
    return null; // ou un placeholder
  }

  const pub = ads[current];

  return (
    <div className={`relative ${className} bg-gray-100 overflow-hidden rounded-xl shadow-lg`}>
      {/* <div className="absolute top-2 left-2 z-10 bg-gray-500/80 text-white text-xs px-1 rounded">
        Publicité
      </div> */}

      {/* Image de la pub */}
        <Image
          src={pub.image_url!}
          alt={pub.nom_structure}
          width={800}
          height={200}
          className="object-cover w-full h-full transition-opacity duration-700"
        />
 

      {/* Indicateurs (points) */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {ads.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full transition ${
              idx === current ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
