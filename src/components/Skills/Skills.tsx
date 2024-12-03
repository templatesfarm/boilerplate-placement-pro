"use client";
import { useSkillsStore } from "@/store/skillStore";
import EditComponent from "../EditComponent";
import Title from "../Title";
import { HoverEffect } from "../ui/card-hover-effect";
import SkillDialog from "./SkillDialog";
import { useEffect } from "react";
import { SkillsSkeleton } from "../Loaders";

function SkillsView() {
  // const skills = [
  //   {
  //     text: "ReactJS",
  //     imageName: "/reactjs.png",
  //   },
  //   {
  //     text: "NextJS",
  //     imageName: "/nextjs.jpg",
  //   },
  //   {
  //     text: "Tailwind",
  //     imageName: "/tailwind.png",
  //   },
  //   {
  //     text: "TypeScript",
  //     imageName: "/typescript.webp",
  //   },
  //   {
  //     text: "JavaScript",
  //     imageName: "/javascript.png",
  //   },
  //   {
  //     text: "NodeJS",
  //     imageName: "/nodejs.webp",
  //   },
  //   {
  //     text: "GitHub",
  //     imageName: "/github.webp",
  //   },
  //   {
  //     text: "Appwrite",
  //     imageName: "/appwrite.png",
  //   },
  //   {
  //     text: "PostgreSQL",
  //     imageName: "/postgresql.png",
  //   },
  // ];

  const { skills, fetchSkills, isLoading } = useSkillsStore();

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  return (
    <div className="mt-24 flex flex-col" id="skills">
      <Title
        title="Skills 🛠️"
        className="-rotate-6 inline-block float-center mx-auto"
      />
      {isLoading ? <SkillsSkeleton /> : <HoverEffect items={skills} />}
    </div>
  );
}

const Skills = () => {
  return <EditComponent comp={<SkillsView />} dialog={<SkillDialog />} />;
};

export default Skills;
