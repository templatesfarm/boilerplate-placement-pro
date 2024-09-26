"use client";
import {
  SiAppwrite,
  SiGithub,
  SiJavascript,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { HoverEffect } from "./ui/card-hover-effect";
import Title from "./Title";

export default function Skills() {
  const skills = [
    {
      text: "ReactJS",
      Icon: SiReact,
    },
    {
      text: "NextJS",
      Icon: SiNextdotjs,
    },
    {
      text: "Tailwind",
      Icon: SiTailwindcss,
    },
    {
      text: "TypeScript",
      Icon: SiTypescript,
    },
    {
      text: "JavaScript",
      Icon: SiJavascript,
    },
    {
      text: "NodeJS",
      Icon: SiNodedotjs,
    },
    {
      text: "NodeJS",
      Icon: SiNodedotjs,
    },
    {
      text: "GitHub",
      Icon: SiGithub,
    },
    {
      text: "Appwrite",
      Icon: SiAppwrite,
    },
    {
      text: "PostgreSQL",
      Icon: SiPostgresql,
    },
  ];

  return (
    <div className="mt-24 flex flex-col" id="skills">
      <Title
        title="Skills 🛠️"
        className="-rotate-6 inline-block float-center mx-auto"
      />
      <HoverEffect items={skills} />
    </div>
  );
}
