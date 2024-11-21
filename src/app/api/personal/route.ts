import env from "@/app/env";
import { Octokit } from "@octokit/rest";
import { NextRequest, NextResponse } from "next/server";



export const  POST = async (req: NextRequest) => {
  const { name, contactNumber, email } = await req.json();

  if (!name || !contactNumber || !email) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    // Initialize Octokit with a personal access token
    const octokit = new Octokit({
      auth: env.github.token,
    });

    // GitHub repository details
    const owner = env.github.username; // Replace with your GitHub username
    const repo = env.github.repo; // Replace with your repository name
    const path = "database/personalInfo.json"; // Path to the file in the repository
    // const branch = "master"; // Branch to update

    // Get the file's current SHA and content
    const { data: fileData } = await octokit.repos.getContent({
      owner,
      repo,
      path,
    //   ref: branch,
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
    console.log("🚀 ~ POST ~ encodedContent:", encodedContent)

    // Update the file in the repository
    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message: "Update personal info",
      content: encodedContent,
      sha: fileSha,
    //   branch,
    });

    return NextResponse.json({ message: "Personal info updated successfully" });
  } catch (error) {
    console.error("Error updating personal info:", (error as Error).message);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
