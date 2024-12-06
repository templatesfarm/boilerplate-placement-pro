import { ProjectType } from "@/app/types/portfolio.types";
import { databaseRoutes } from "@/lib/contants";
import {
  fetchFileContentFromDatabase,
  createOrUpdateData,
} from "portfolio-api-package";

import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const projects: ProjectType[] = await req.json();

  if (projects?.length === 0) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const filteredProjects = projects.filter(
    (project) => project.projectName !== "" || project.imageUrl !== ""
  );
  try {
    await createOrUpdateData(databaseRoutes.PROJECTS, filteredProjects);

    // Update the file in the repository
    const parsedContent = await fetchFileContentFromDatabase(
      databaseRoutes.PROJECTS
    );

    return NextResponse.json(parsedContent, { status: 200 });
  } catch (error) {
    console.error("Error updating personal info:", (error as Error).message);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  try {
    const parsedContent = await fetchFileContentFromDatabase(
      databaseRoutes.PROJECTS
    );
    return NextResponse.json(parsedContent, { status: 200 });
  } catch (err: unknown) {
    const error = err as Error;
    console.error("Error fetching personal info:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
