"use client";
import Footer from "@/components/Banner";
import { FloatingDockDemo } from "@/components/FloatingDockDemo";
import HeroPro from "@/components/Hero/HeroPro";
import Navbar from "@/components/Navbar/Navbar";
import PasswordInput from "@/components/PasswordInput";
import { Projects } from "@/components/Projects/Projects";
import Skills from "@/components/Skills/Skills";
import ThemeToggle from "@/components/ThemeToggle";
import { ProjectsPlacementPro } from "@/components/placementpro/ProjectsPlacementPro";
import { ProjectsTimelinePreview } from "@/components/placementpro/ProjectsTimelinePreview";
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
        <div className="flex justify-evenly flex-row px-5 max-w-7xl mx-auto">
          {/* <div className="w-[90vw] mr-3 md:mr-20">
            <Navbar />
          </div> */}
          {/* <div className="w-[25%]"></div> */}
          <FloatingDockDemo />
          {/* <div className="flex justify-end items-center h-20 w-full">
            <ThemeToggle />
          </div> */}
        </div>
        <HeroPro />
        <Skills />
        <ProjectsPlacementPro />
        <Footer />
        {/* <Projects /> */}
      </div>
    </div>
  );
}
