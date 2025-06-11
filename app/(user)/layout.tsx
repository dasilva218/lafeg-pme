import Nav from "@/components/section/nav";
import Footer from "@/components/section/footer";
import AdBanner from "@/components/ads/AdBanner";
import LegalChatBot from "@/components/LegalChatBot";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <body className="">
      <div>
        {" "}
        <section className="py-4 bg-gray-50 border-b">
          <div className="container flex justify-center">
            <AdBanner />
          </div>
        </section>
      </div>
      <Nav />
      {children}
      <LegalChatBot />
      <Footer />
    </body>
  );
}
