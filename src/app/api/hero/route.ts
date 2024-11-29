import { databaseRoutes } from "@/lib/contants";
import {
  createOrUpdateDataFromDatabase,
  fetchFileContentFromDatabase,
} from "@/lib/server/githubApi";

import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { message, introduction, description } = await req.json();

  if (!message || !introduction || !description) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    // Prepare the updated content
    const updatedContent = {
      message, introduction, description
    };

    await createOrUpdateDataFromDatabase(
      databaseRoutes.HERO,
      updatedContent
    );

    // Update the file in the repository
    const parsedContent = await fetchFileContentFromDatabase(
      databaseRoutes.HERO
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
      databaseRoutes.HERO
    );
    return NextResponse.json(parsedContent, { status: 200 });

  } catch (err: unknown) {
    const error = err as Error;
    console.error("Error fetching hero info:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
