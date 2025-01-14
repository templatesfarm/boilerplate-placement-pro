import Image from "next/image";
import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { ProjectsInfoType, ProjectType } from "../project.types";
import { getImageUrl } from "@/lib/server/serverUtils";

const timelineData = [
  {
    title: "2024",
    headline1:
      "Built and launched Aceternity UI and Aceternity UI Pro from scratch",
    headline2:
      "Lorem ipsum is for people who are too lazy to write copy. But we are not. Here are some more example of beautiful designs I built.",
    skills: ["NextJS", "ReactJS", "TypeScript", "Github"],
    company: "Cisco",
    client: "",
    images: [
      "https://assets.aceternity.com/pro/hero-sections.png",
      "https://assets.aceternity.com/features-section.png",
      "https://assets.aceternity.com/pro/bento-grids.png",
      "https://assets.aceternity.com/cards.png",
    ],
  },
  {
    title: "2022-24",
    headline1:
      "I usually run out of copy, but when I see content this big, I try to integrate lorem ipsum.",
    headline2:
      "Lorem ipsum is for people who are too lazy to write copy. But we are not. Here are some more example of beautiful designs I built.",
    skills: ["NextJS", "ReactJS", "TypeScript", "Github"],
    company: "Lowe's",
    images: [
      "https://assets.aceternity.com/pro/hero-sections.png",
      "https://assets.aceternity.com/features-section.png",
      "https://assets.aceternity.com/pro/bento-grids.png",
      "https://assets.aceternity.com/cards.png",
    ],
  },
  {
    title: "2022-24",
    headline1:
      "I usually run out of copy, but when I see content this big, I try to integrate lorem ipsum.",
    headline2:
      "Lorem ipsum is for people who are too lazy to write copy. But we are not. Here are some more example of beautiful designs I built.",
    skills: ["NextJS", "ReactJS", "TypeScript", "Github"],
    company: "Altimetrik",
    client: "Intuit",
    images: [
      "https://assets.aceternity.com/pro/hero-sections.png",
      "https://assets.aceternity.com/features-section.png",
      "https://assets.aceternity.com/pro/bento-grids.png",
      "https://assets.aceternity.com/cards.png",
    ],
  },
  {
    title: "2020-22",
    headline1:
      "I usually run out of copy, but when I see content this big, I try to integrate lorem ipsum.",
    headline2:
      "Lorem ipsum is for people who are too lazy to write copy. But we are not. Here are some more example of beautiful designs I built.",
    skills: ["NextJS", "ReactJS", "TypeScript", "Github"],
    company: "Altimetrik",
    images: [
      "https://assets.aceternity.com/pro/hero-sections.png",
      "https://assets.aceternity.com/features-section.png",
      "https://assets.aceternity.com/pro/bento-grids.png",
      "https://assets.aceternity.com/cards.png",
    ],
  },
  {
    title: "Early 2017",
    headline1:
      "I usually run out of copy, but when I see content this big, I try to integrate lorem ipsum.",
    headline2:
      "Lorem ipsum is for people who are too lazy to write copy. But we are not. Here are some more example of beautiful designs I built.",
    skills: ["NextJS", "ReactJS", "TypeScript", "Github"],
    company: "Tech Mahindra",
    images: [
      "https://assets.aceternity.com/pro/hero-sections.png",
      "https://assets.aceternity.com/features-section.png",
      "https://assets.aceternity.com/pro/bento-grids.png",
      "https://assets.aceternity.com/cards.png",
    ],
  },
];

export function ProjectsTimelinePreview({
  projectsInfo,
}: {
  projectsInfo: ProjectsInfoType;
}) {
  const data = projectsInfo.projects.map((project) => ({
    title: project.timeline,
    content: (
      <div className="space-y-5">
        <ProjectHeadline headline={project.headline1} />
        <ProjectHeadline headline={project.headline2} />
        <div className="flex flex-row justify-between items-center">
          {project.companyName && <div>Company: {project.companyName}</div>}
          {project.clientName && <div>Client: {project.clientName}</div>}
        </div>
        <ProjectSkills skills={project.skills} />
        <ProjectImages images={project.images} />
      </div>
    ),
  }));
  return (
    <div className="w-full">
      <Timeline data={data} />
    </div>
  );
}

const ProjectSkills = ({ skills = "" }: { skills: string }) => {
  console.log("🚀 ~ ProjectSkills ~ skills:", skills);
  const skillsArray = skills.split(",").map((skill) => skill.trim());
  return (
    <div className="flex flex-row flex-wrap justify-start gap-4 items-center">
      {skillsArray?.map((skill, index) => (
        <div
          className="bg-gray-900 dark:bg-white border border-spacing-1 w-fit px-2 py-0.5 rounded-lg text-white dark:text-black text-sm"
          key={skill + index}
        >
          {skill}
        </div>
      ))}
    </div>
  );
};

const ProjectHeadline = ({ headline }: { headline: string }) => {
  return (
    <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal">
      {headline}
    </p>
  );
};

const ProjectImages = ({ images = [] }: { images: string[] }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {images.map((imageUrl, index) => (
        <Image
          src={imageUrl}
          alt="startup template"
          width={500}
          height={500}
          className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
          key={imageUrl + index}
        />
      ))}
    </div>
  );
};
