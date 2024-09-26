import Link from "next/link";
import React from "react";
import Title from "./Title";

export default function HeroSection() {
  return (
    <div className="min-h-[60vh] flex items-center mt-24 flex-col-reverse gap-14 lg:flex-row lg:justify-between ">
      <div className="space-y-10 text-center lg:text-left">
        <h1 className="text-4xl lg:text-7xl font-bold">
          Nice to meet you👋
          <br />{" "}
          <span className="underline underline-offset-8 decoration-green-500">
            {"I'm Deepak."}
          </span>
        </h1>
        <p className="md:w-96 text-lg text-gray-300">
          {
            "Based in India, I'm a Fullstack Developer passionate about building a modern web application that users love."
          }
        </p>
        <Link
          href={"mailto:deepakpahwa19@gmail.com"}
          className="inline-block group"
        >
          <Title title="Contact Me 📧" />
        </Link>
      </div>
      <div className="w-72 h-72 space-y-3 -rotate-[30deg] ">
        <div className="flex gap-3 translate-x-8">
          <div className="w-32 h-32 rounded-2xl bg-green-500"></div>
          <div className="w-32 h-32 rounded-full bg-indigo-500"></div>
        </div>
        <div className="flex flex-row-reverse gap-3 -translate-x-8">
          <div className="w-32 h-32 rounded-full bg-green-500"></div>
          <div className="w-32 h-32 rounded-2xl bg-indigo-500"></div>
        </div>
        <div className="glow absolute top-[40%] right-1/2"></div>
      </div>
    </div>
  );
}
