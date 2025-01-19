import React from "react";
import { HeroType } from "portfolioui";
import { Skeleton } from "../ui/skeleton";
import { BackgroundBeams } from "../ui/background-beams";

export function HeroBeamPathView({
  heroInfo,
  isLoading = true,
}: {
  heroInfo: HeroType;
  isLoading: boolean;
}) {
  return (
    <>
      {isLoading ? (
        <div className="flex flex-col justify-center items-center space-y-5 w-[80%] mx-auto">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-6 w-full" />
        </div>
      ) : (
        <div className="h-screen w-full rounded-md bg-background text-foreground relative flex flex-col items-center justify-center antialiased">
          <div className="max-w-2xl mx-auto p-4">
            <h1 className="relative z-10 text-lg md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-400 dark:bg-gradient-to-b dark:from-neutral-200 dark:to-neutral-600  text-center font-sans font-bold">
              {heroInfo.message}
            </h1>
            <p className="text-neutral-500 max-w-lg mx-auto my-2 text-base md:text-3xl text-center relative z-10">
              {heroInfo.introduction}
            </p>
            <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
              {heroInfo.description}
            </p>
          </div>
          <BackgroundBeams />
        </div>
      )}
    </>
  );
}
