import Footer from "@/components/Footer";
import HeroSection from "@/components/Hero";
import NavbarWithDialog from "@/components/Navbar";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";

export default function Home() {
  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto p-5">
        <NavbarWithDialog />
        <HeroSection />
        <Skills />
        <Projects />
      </div>
      <Footer />
    </div>
  );
}
