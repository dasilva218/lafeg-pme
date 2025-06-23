import Nav from "@/components/section/nav";
import Footer from "@/components/section/footer";
import AdBanner from "@/components/ads/AdBanner";
import LegalChatBot from "@/components/LegalChatBot";
import { Analytics } from "@vercel/analytics/next";
import Image from "next/image";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <body className="">
      <div>
        {" "}
        <section className="py-4 bg-gray-100 border-b">
          <div className="container flex justify-center lg:justify-between items-center">
            <div className="lg:flex hidden items-center gap-5">
              <Image
                src="/images/logo-feg.png"
                alt="Logo FEG"
                width={80}
                height={80}
                className="h-12 md:h-20 w-auto"
              />
              <div>
                <h1 className="md:text-2xl md:hidden lg:block font-hyundai font-bold text-[#063a1e]">
                  Guide Numérique des PME
                </h1>
                {/* <h1 className="md:text-2xl hidden md:block lg:hidden font-hyundai font-bold text-[#063a1e]">
                  Guide Numérique des PME
                </h1> */}
              </div>
            </div>
            <AdBanner
              emplacement="HEADER"
              className="w-full lg:max-w-[50%] h-36"
              interval={8000}
            />
          </div>
        </section>
      </div>
      <Analytics />
      <Nav />
      {children}
      <LegalChatBot />
      <Footer />
    </body>
  );
}
