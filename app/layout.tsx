import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/app/providers";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
// import Nav from "@/components/section/nav";
// import Footer from "@/components/section/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Répertoire des textes Juridiques",
  description:
    "Accédez facilement aux textes juridiques, lois et règlements concernant les PME gabonaises.",
  icons: {
    icon: "/images/logo-feg.png",
  },
  generator: "La Fédération des Entreprises du Gabon",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="light" style={{ colorScheme: "light" }}>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>{children}</Providers>
        </ThemeProvider>
        <Toaster
          position="top-right"
          richColors
          closeButton
          toastOptions={{
            className: "text-base",
            style: {
              borderRadius: "8px",
              padding: "12px",
            },
          }}
        />
      </body>
    </html>
  );
}
