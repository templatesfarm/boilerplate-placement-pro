"use client";
import Footer from "@/components/Footer";
import { Dock } from "@/components/placementpro/FloatingDockDemo";
import { Hero } from "@/components/placementpro/Hero";
import PasswordInput from "@/components/PasswordInput";
import { Projects } from "@/components/placementpro/Projects";
import { Skills } from "@/components/placementpro/Skills";
import { useAppStore } from "@/store/appStore";
import { PortfolioType, usePortfolioStore } from "@/store/usePortfolioStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ApplyChangesButton } from "@/components/ApplyChangesButton";

interface HomePageProps {
  portfolio: PortfolioType;
  url: string;
}

export default function HomePage({ portfolio, url }: HomePageProps) {
  const { updateState } = usePortfolioStore();
  const router = useRouter();

  const { isEditing, setIsEditing } = useAppStore();

  useEffect(() => {
    console.log("url: ", url);
    updateState(portfolio);
  }, [updateState, portfolio, url]);

  return (
    <div className="min-h-screen bg-background overflow-hidden space-y-10 w-full">
      <div className="py-5">
        <PasswordInput />
        <ApplyChangesButton
          isEditing={isEditing}
          handleClick={() => {
            setIsEditing(false);
            router.refresh();
          }}
        />
        <Dock />
        <Hero />
        <Skills />
        <Projects />
        <Footer />
      </div>
    </div>
  );
}
