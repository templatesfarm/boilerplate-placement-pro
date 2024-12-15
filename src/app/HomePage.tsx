"use client";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero/Hero";
import Navbar from "@/components/Navbar/Navbar";
import PasswordInput from "@/components/PasswordInput";
import { Projects } from "@/components/Projects/Projects";
import Skills from "@/components/Skills/Skills";
import ThemeToggle from "@/components/ThemeToggle";
import { useAppStore } from "@/store/appStore";
import { PortfolioType, usePortfolioStore } from "@/store/usePortfolioStore";
import { useEffect } from "react";

interface HomePageProps {
  portfolio: PortfolioType;
  url: string;
}

export default function HomePage({ portfolio, url }: HomePageProps) {
  const { updateState } = usePortfolioStore();

  const { isEditing } = useAppStore();

  useEffect(() => {
    console.log("url: ", url);
    updateState(portfolio);
  }, [updateState, portfolio, url]);

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto p-5">
        {!isEditing && <PasswordInput />}
        {isEditing && (
          <div className="text-center mx-auto text-blue-500 animate-pulse">
            {`Just Refresh the page once you're done with the changes`}
          </div>
        )}
        <div className="flex justify-end">
          <div className="w-[90vw] mr-3 md:mr-20">
            <Navbar />
          </div>
          <ThemeToggle />
        </div>
        <Hero />
        <Skills />
        <Projects />
      </div>
      <Footer />
    </div>
  );
}
