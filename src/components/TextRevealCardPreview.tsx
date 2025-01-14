"use client";
import React from "react";
import { TextRevealCard } from "./ui/text-reveal-card";

export function TextRevealCardPreview({
  email,
  phoneNumber,
}: {
  email: string;
  phoneNumber: string;
}) {
  return (
    <div className="flex items-center justify-center h-96 rounded-2xl max-w-7xl mx-auto w-full px-2 md:px-10">
      <TextRevealCard
        text="Reveal my contact info"
        revealText={email}
        revealText2={phoneNumber}
      />
    </div>
  );
}
