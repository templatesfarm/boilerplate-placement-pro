"use client";
import Footer from "@/components/Banner";
import {
  Dock,
  FloatingDockDemo,
} from "@/components/placementpro/FloatingDockDemo";
import { Hero } from "@/components/placementpro/Hero";
import HeroPro from "@/components/Hero/HeroPro";
import PasswordInput from "@/components/PasswordInput";
import { Projects } from "@/components/placementpro/Projects";
import { Skills } from "@/components/placementpro/Skills";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/appStore";
import { PortfolioType, usePortfolioStore } from "@/store/usePortfolioStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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
        {!isEditing && <PasswordInput />}
        {isEditing && (
          // <div className="text-center mx-auto text-blue-500 animate-pulse">
          //   {`Just Refresh the page once you're done with the changes`}
          // </div>
          <div className="flex justify-end my-5">
            <Button
              onClick={() => {
                router.refresh();
                setIsEditing(false);
              }}
            >
              Apply Changes
            </Button>
          </div>
        )}
        <Dock />
        <Hero />
        <Skills />
        <Projects />
        <Footer />
      </div>
    </div>
  );
}
