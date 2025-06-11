// components/LegalChatBot.jsx
"use client";

import { useEffect } from "react";
export default function LegalChatBot() {
 useEffect(() => {
    if (typeof window !== "undefined" && !window.chatbaseScriptLoaded) {
      window.chatbaseScriptLoaded = true;

      const script = document.createElement("script");
      script.src = "https://www.chatbase.co/embed.min.js";
      script.id = "v1YHpGIF8tbh5c9snZOAW"; // Remplace par ton propre ID si nécessaire
      script.setAttribute("chatbase-config", "v1YHpGIF8tbh5c9snZOAW");
      document.body.appendChild(script);
    }
  }, []);

  return null;
}
