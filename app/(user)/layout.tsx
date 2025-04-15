import Nav from "@/components/section/nav";
import Footer from "@/components/section/footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <body className="">
      <Nav />
      {children}
      <Footer />
    </body>
  );
}
