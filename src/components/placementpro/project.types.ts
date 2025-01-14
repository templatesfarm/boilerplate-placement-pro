export type ProjectType = {
  timeline: string;
  projectName: string;
  headline1: string;
  headline2: string;
  designation: string;
  link: string;
  skills: string;
  companyName: string;
  clientName: string;
  images: string[];
};

export type ProjectsInfoType = {
  displayName: string;
  projects: ProjectType[];
};
