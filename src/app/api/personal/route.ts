import env from "@/app/env";
import { databaseRoutes } from "@/lib/contants";
import { Octokit } from "@octokit/rest";
import { NextRequest, NextResponse } from "next/server";

 // Initialize Octokit with a personal access token
 const octokit = new Octokit({
    auth: env.github.token,
  });

export const  POST = async (req: NextRequest) => {
  const { name, contactNumber, email } = await req.json();

  if (!name) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    // GitHub repository details
    const owner = env.github.username; // Replace with your GitHub username
    const repo = env.github.repo; // Replace with your repository name
    const path = databaseRoutes.PERSONAL_INFO; // Path to the file in the repository
    const branch = env.github.branch; // Branch to update

    // Get the file's current SHA and content
    const { data: fileData } = await octokit.repos.getContent({
      owner,
      repo,
      path,
      ref: branch,
    });

    if (!("sha" in fileData)) {
      throw new Error("Unexpected file data format");
    }

    const fileSha = fileData.sha;

    // Prepare the updated content
    const updatedContent = {
      name,
      contactNumber,
      email,
    //   socialMedia
    };

    const encodedContent = Buffer.from(
      JSON.stringify(updatedContent, null, 2)
    ).toString("base64");

    // Update the file in the repository
    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message: "Update personal info",
      content: encodedContent,
      sha: fileSha,
      branch,
    });

    return NextResponse.json({ message: "Personal info updated successfully" });
  } catch (error) {
    console.error("Error updating personal info:", (error as Error).message);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}


export const GET = async () => {
    try {
  
      // GitHub repository details
      const owner = env.github.username; // Replace with your GitHub username
      const repo = env.github.repo; // Replace with your repository name
      const path = databaseRoutes.PERSONAL_INFO; // Path to the file in the repository
      const branch = env.github.branch; // Branch to fetch the file from
  
      // Get the file content
      const { data: fileData } = await octokit.repos.getContent({
        owner,
        repo,
        path,
        ref: branch,
      });
  
      if (!("content" in fileData)) {
        throw new Error("Unexpected file data format");
      }
  
      // Decode the base64 file content
      const fileContent = Buffer.from(fileData.content, "base64").toString("utf-8");
      const parsedContent = JSON.parse(fileContent);
      console.log("🚀 ~ GET ~ parsedContent:", parsedContent)
  
      return NextResponse.json(parsedContent,  { status: 200 });
    } catch (err: unknown) {
        const error = err as Error;
      console.error("Error fetching personal info:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  };