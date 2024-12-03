import EditComponent from "../EditComponent";
import Title from "../Title";
// import Link from "next/link";
import { DirectionAwareHover } from "../ui/direction-aware-hover";
import { cn } from "@/lib/utils";
import Link from "next/link";
import ProjectsDialog from "./ProjectDialog";
import { useProjectStore } from "@/store/projectStore";
import { useEffect } from "react";

const background = ["bg-blue-500", "bg-indigo-500", "bg-green-500", "bg-blue-500", "bg-orange-500"]

export const ProjectsView = ( ) => {
  const { projects = [], fetchProjectsSection} = useProjectStore();
  console.log("🚀 ~ ProjectsView ~ projects:", projects)

  useEffect(() => {
    fetchProjectsSection();
  }, [fetchProjectsSection]);

  return (
    <div className="py-10 px-5 flex flex-col items-center">
      <Title title="Projects 🚀" className="-rotate-6 my-10" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {projects.map((project, index) => {
          return (
            <div
              className={cn("p-5 rounded-md", background[index % background.length])}
              key={index}
            >
              <Link href={project.link} target="_blank">
              <DirectionAwareHover imageUrl={project.imageUrl}>
                <h1>{project.projectName}</h1>
                <h4 className="mb-4">{project.designation}</h4>
                <div className="text-sm text-wrap">
                  {project.skills}
                </div>
              </DirectionAwareHover>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}


const Projects = () => {
  return <EditComponent comp={<ProjectsView />} dialog={<ProjectsDialog />}/>;
}

export default Projects;