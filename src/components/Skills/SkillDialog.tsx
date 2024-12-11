import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogTitle,
} from "../ui/dialog";
import { SkillType, TechnologiesType } from "@/app/types/portfolio.types";

interface SkillDialogProps {
  isOpen: boolean;
  onOpenChange: (x: boolean) => void;
  skills: TechnologiesType;
  saveSelectedSkills: (x: TechnologiesType) => void;
}

const technologies: TechnologiesType = {
  frontend: [
    { label: "ReactJS", imageName: "/reactjs.png" },
    { label: "NextJS", imageName: "/nextjs.jpg" },
    { label: "Tailwind", imageName: "/tailwind.png" },
    { label: "TypeScript", imageName: "/typescript.webp" },
    { label: "JavaScript", imageName: "/javascript.png" },
  ],
  backend: [
    { label: "NodeJS", imageName: "/nodejs.webp" },
    { label: "ExpressJS", imageName: "/expressjs.png" },
    { label: "Django", imageName: "/django.png" },
    { label: "Flask", imageName: "/flask.png" },
    { label: "Spring Boot", imageName: "/springboot.png" },
  ],
  database: [
    { label: "PostgreSQL", imageName: "/postgresql.png" },
    { label: "MongoDB", imageName: "/mongodb.png" },
    { label: "MySQL", imageName: "/mysql.png" },
    { label: "SQLite", imageName: "/sqlite.png" },
    { label: "Redis", imageName: "/redis.png" },
  ],
  mobile: [
    { label: "React Native", imageName: "/reactnative.png" },
    { label: "Flutter", imageName: "/flutter.png" },
    { label: "Swift", imageName: "/swift.png" },
    { label: "Kotlin", imageName: "/kotlin.png" },
    { label: "Ionic", imageName: "/ionic.png" },
  ],
  devops: [
    { label: "Docker", imageName: "/docker.png" },
    { label: "Kubernetes", imageName: "/kubernetes.png" },
    { label: "Jenkins", imageName: "/jenkins.png" },
    { label: "GitHub Actions", imageName: "/githubactions.png" },
    { label: "Terraform", imageName: "/terraform.png" },
  ],
};

const SkillDialog: React.FC<SkillDialogProps> = ({
  isOpen,
  onOpenChange,
  skills,
  saveSelectedSkills,
}) => {
  const [selectedSkills, setSelectedSkills] = useState<TechnologiesType>({});
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setSelectedSkills(skills);
  }, [skills]);

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    category: string,
    techName: string
  ) => {
    const isChecked = event.target.checked;
    const categorySkills = technologies[category];
    const selectedTech = categorySkills.find((tech) => tech.label === techName);
    setSelectedSkills((state) => {
      const tempCategory = state[category] || [];
      const newState = {
        ...state,
        [category]:
          isChecked && selectedTech
            ? [...tempCategory, selectedTech]
            : tempCategory.filter((t) => t.label !== techName),
      };
      return newState;
    });
  };

  const filteredTechnologies: TechnologiesType = Object.entries(
    technologies
  ).reduce(
    (acc, [category, techs]) => ({
      ...acc,
      [category]: techs.filter((tech) =>
        tech.label.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }),
    {}
  );

  const handleSubmit = () => {
    saveSelectedSkills(selectedSkills);
    onOpenChange?.(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onOpenChange?.(false)}>
      <DialogOverlay />
      <DialogContent className="overflow-auto max-h-[90%] space-y-4">
        <DialogTitle>Select Technologies</DialogTitle>
        <DialogDescription>
          Select the technologies you are familiar with.
        </DialogDescription>
        <input
          type="text"
          placeholder="Search technologies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 w-full mb-4"
        />
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(filteredTechnologies).map(([category, techs]) => (
            <div key={category}>
              <h3 className="font-bold mb-2">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </h3>
              {techs.map((tech: SkillType) => (
                <div key={tech.label} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={
                      !!selectedSkills?.[category]?.find(
                        (skill) => skill.label === tech.label
                      ) || false
                    }
                    onChange={(event) =>
                      handleCheckboxChange(event, category, tech.label)
                    }
                    className="mr-2"
                  />
                  <label htmlFor={tech.label}>{tech.label}</label>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SkillDialog;
