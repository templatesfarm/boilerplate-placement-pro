import { databaseRoutes } from "@/lib/contants";
import {
  createOrUpdateDataFromDatabase,
  fetchFileContentFromDatabase,
} from "@/lib/server/githubApi";

import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { name, contactNumber, email, socialMedia } = await req.json();

  if (!name) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    // Prepare the updated content
    const updatedContent = {
      name,
      contactNumber,
      email,
      socialMedia,
    };

    await createOrUpdateDataFromDatabase(
      databaseRoutes.PERSONAL_INFO,
      updatedContent
    );

    // Update the file in the repository
    const parsedContent = await fetchFileContentFromDatabase(
      databaseRoutes.PERSONAL_INFO
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
      databaseRoutes.PERSONAL_INFO
    );
    return NextResponse.json(parsedContent, { status: 200 });

  } catch (err: unknown) {
    const error = err as Error;
    console.error("Error fetching personal info:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
