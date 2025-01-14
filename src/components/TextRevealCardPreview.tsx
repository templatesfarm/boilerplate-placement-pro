"use client";
import React from "react";
import {
  TextRevealCard,
  TextRevealCardDescription,
  TextRevealCardTitle,
} from "./ui/text-reveal-card";

export function TextRevealCardPreview({
  email,
  phoneNumber,
}: {
  email: string;
  phoneNumber: string;
}) {
  return (
    <div className="flex items-center justify-center  h-[40rem] rounded-2xl max-w-7xl mx-auto  w-[80%]">
      <TextRevealCard
        text="Reveal my contact info"
        revealText={email}
        revealText2={phoneNumber}
      >
        {/* <TextRevealCardTitle>My Contact Information</TextRevealCardTitle> */}
        {/* <TextRevealCardDescription>
          Hover on below text to reveal my contact information
        </TextRevealCardDescription> */}
      </TextRevealCard>
    </div>
  );
}
