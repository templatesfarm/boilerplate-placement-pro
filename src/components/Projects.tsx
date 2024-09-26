import {
  SiAmazonwebservices,
  SiBackbonedotjs,
  SiBitbucket,
  SiGithub,
  SiJavascript,
  SiJquery,
  SiMui,
  SiNodedotjs,
  SiReact,
  SiStyledcomponents,
  SiTypescript,
} from "react-icons/si";
import Title from "./Title";
import Link from "next/link";
import { DirectionAwareHover } from "./ui/direction-aware-hover";

export default function Projects() {
  const projects = [
    {
      title: "Lowe's eCommerce Cart",
      designation: "Lead Software Engineer",
      tech: [
        SiReact,
        SiTypescript,
        SiJavascript,
        SiMui,
        SiStyledcomponents,
        SiBitbucket,
        SiNodedotjs,
      ],
      link: "https://www.lowes.com/",
      cover: "/lowes.png",
      background: "bg-indigo-500",
    },
    {
      title: "Cisco Webex Assist",
      designation: "Lead Software Engineer",
      tech: [
        SiReact,
        SiTypescript,
        SiJavascript,
        SiBitbucket,
        SiAmazonwebservices,
        SiMui,
        SiStyledcomponents,
        SiNodedotjs,
      ],
      link: "https://www.webex.com/",
      cover: "/webex.png",
      background: "bg-indigo-500",
    },
    {
      title: "Intuit Quickbooks Online",
      designation: "Senior Software Engineer",
      tech: [
        SiReact,
        SiJavascript,
        SiGithub,
        SiAmazonwebservices,
        SiMui,
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
      <Title title="Projects 🚀" className="-rotate-6 my-10" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {projects.map((project, index) => {
          return (
            <Link key={index} href={project.link} target="_blank">
              <DirectionAwareHover imageUrl={project.cover}>
                <h1>{project.title}</h1>
                <h4>{project.designation}</h4>
                <div className="flex flex-row gap-5">
                  {project.tech.map((Icon, index) => (
                    <Icon key={index} className="w-6 h-6 mt-2" />
                  ))}
                </div>
              </DirectionAwareHover>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
