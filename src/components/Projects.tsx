import {
  SiAmazonwebservices,
  SiBackbonedotjs,
  SiGithub,
  SiJavascript,
  SiJquery,
  SiReact,
  SiStyledcomponents,
} from "react-icons/si";
import Title from "./Title";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { DirectionAwareHover } from "./ui/direction-aware-hover";
import { Icon } from "lucide-react";

export default function Projects() {
  const projects = [
    {
      title: "Intuit Quickbooks Online",
      tech: [
        SiReact,
        SiBackbonedotjs,
        SiJavascript,
        SiJquery,
        SiStyledcomponents,
        SiGithub,
      ],
      link: "https://quickbooks.intuit.com/online/#",
      cover: "/quickbooks-1.png",
      background: "bg-indigo-500",
    },
    {
      title: "Intuit Quickbooks Online",
      tech: [
        SiReact,
        SiBackbonedotjs,
        SiJavascript,
        SiGithub,
        SiJquery,
        SiStyledcomponents,
      ],
      link: "https://quickbooks.intuit.com/online/#",
      cover: "/quickbooks-1.png",
      background: "bg-blue-500",
    },
    {
      title: "Intuit Quickbooks Online",
      tech: [
        SiReact,
        SiJavascript,
        SiGithub,
        SiAmazonwebservices,
        SiBackbonedotjs,
        SiJquery,
        SiStyledcomponents,
      ],
      link: "https://quickbooks.intuit.com/online/#",
      cover: "/quickbooks-1.png",
      background: "bg-green-500",
    },
  ];

  return (
    <div className="py-10 px-5 flex flex-col items-center">
      <Title title="Projects" className="-rotate-6 my-10" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {projects.map((project, index) => {
          return (
            // <Link key={index} href={project.link} target="_blank">
            <div
              className={cn("p-5 rounded-md", project.background)}
              key={index}
            >
              <DirectionAwareHover imageUrl={project.cover}>
                <h1>{project.title}</h1>
                <div className="flex flex-row gap-2">
                  {project.tech.map((Icon, index) => (
                    <Icon key={index} className="w-6 h-6" />
                  ))}
                </div>
              </DirectionAwareHover>
            </div>
            // </Link>
          );
        })}
      </div>
    </div>
  );
}
