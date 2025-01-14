import { NextResponse } from "next/server";
import { Octokit } from "@octokit/rest";
import env from "@/app/env";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export async function GET() {
  try {
    const owner = env.github.username; // Replace with the GitHub repository owner
    const repo = env.github.repo; // Replace with the GitHub repository name
    const path = "images/1734561322664-Webex.png"; // Replace with the path to your file in the repository

    const response = await octokit.repos.getContent({
      owner,
      repo,
      path,
    });

    if ("content" in response.data) {
      const contentType = path.endsWith(".pdf")
        ? "application/pdf"
        : "image/png";
      return new NextResponse(Buffer.from(response.data.content, "base64"), {
        status: 200,
        headers: {
          "Content-Type": contentType,
          "Content-Disposition": `attachment; filename="${path.split("/").pop()}"`,
        },
      });
    } else {
      throw new Error("File content not found");
    }
  } catch (error) {
    console.error("Error downloading file:", error);
    return new NextResponse("Error downloading file", { status: 500 });
  }
}
