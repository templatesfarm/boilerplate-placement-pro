"use client";
import Footer from "@/components/placementpro/Footer";
import { Dock } from "@/components/placementpro/FloatingDockDemo";
import { Hero } from "@/components/placementpro/Hero";
import PasswordInput from "@/components/PasswordInput";
import { Projects } from "@/components/placementpro/Projects";
import { Skills } from "@/components/placementpro/Skills";
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
