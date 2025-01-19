"use client";
import Footer from "@/components/recruitersdelight/Footer";
import { Dock } from "@/components/recruitersdelight/FloatingDockDemo";
import { Hero } from "@/components/recruitersdelight/Hero";
import PasswordInput from "@/components/PasswordInput";
import { Projects } from "@/components/recruitersdelight/Projects";
import { Skills } from "@/components/recruitersdelight/Skills";
import { PortfolioType, usePortfolioStore } from "@/store/usePortfolioStore";
import { useEffect } from "react";
import { ApplyChangesButton } from "@/components/ApplyChangesButton";

interface HomePageProps {
  portfolio: PortfolioType;
  url: string;
}

export default function HomePage({ portfolio, url }: HomePageProps) {
  const { updateState } = usePortfolioStore();

  useEffect(() => {
    console.log("url: ", url);
    updateState(portfolio);
  }, [updateState, portfolio, url]);

  return (
    <div className="min-h-screen bg-background overflow-hidden space-y-10 w-full">
      <div className="py-5">
        <PasswordInput />
        <ApplyChangesButton />
        <Dock />
        <Hero />
        <Skills />
        <Projects />
        <Footer />
      </div>
    </div>
  );
}
