"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Image from "next/image";
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simuler un temps de chargement minimum pour voir le loader
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
          <div className="flex flex-col items-center">
            <div className="relative w-16 h-16 mb-4">
              <div className="absolute inset-0 rounded-full border-4 border-[#063a1e]/20"></div>
              <div className="absolute inset-0 rounded-full border-4 border-t-[#063a1e] animate-spin"></div>
            </div>
            <div className="flex flex-col items-center">
              <Image src="/images/logo-feg.png" alt="Logo FEG" width={60} height={60} className="h-12 w-auto mb-2" />
              <h2 className="text-lg font-bold text-[#063a1e]">Guide Numérique des PME</h2>
              <p className="text-xs text-muted-foreground">POUR LES PME GABONAISES</p>
            </div>
            <div className="mt-4 h-1 w-48 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#dcdaa4] to-[#bdbd95] animate-pulse"></div>
            </div>
          </div>
        </div>
      ) : (
        children
      )}
    </ThemeProvider>
  )
}

