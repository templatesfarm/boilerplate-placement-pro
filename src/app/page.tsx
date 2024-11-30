"use client"
import Footer from "@/components/Footer";
import HeroSectionWithDialog from "@/components/Hero/Hero";
import NavbarWithDialog from "@/components/Navbar/Navbar";
import PasswordInput from "@/components/PasswordInput";
import Projects from "@/components/Projects";
import SkillsWithDialog from "@/components/Skills/Skills";
import { useAppStore } from "@/store/appStore";

export default function Home() {

  const {isEditing} = useAppStore();
  return (
    <div className="min-h-screen bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto p-5">
        {!isEditing && <PasswordInput />}
        <NavbarWithDialog />
        <HeroSectionWithDialog/>
        <SkillsWithDialog />
        <Projects />
      </div>
      <Footer />
    </div>
  );
}
