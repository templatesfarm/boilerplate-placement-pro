import React from "react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { HeroType } from "portfolioui";
import { TextGenerateEffectDemo } from "./TextGenerateEffectDemo";
import { Skeleton } from "../ui/skeleton";

export function HeroBeamView({
  heroInfo,
  isLoading = true,
}: {
  heroInfo: HeroType;
  isLoading: boolean;
}) {
  return (
    <BackgroundBeamsWithCollision>
      {isLoading ? (
        <div className="flex flex-col justify-center items-center space-y-5 w-[80%]">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-6 w-full" />
        </div>
      ) : (
        <h2 className="text-2xl relative z-20 md:text-4xl lg:text-7xl font-bold text-center text-black dark:text-white font-sans tracking-tight">
          {heroInfo.message}
          <br />
          <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
            <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
              <span className="">{heroInfo.introduction}</span>
            </div>
            <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
              <span className="">{heroInfo.introduction}</span>
            </div>
          </div>

          <TextGenerateEffectDemo words={heroInfo.description} />
        </h2>
      )}
    </BackgroundBeamsWithCollision>
  );
}
