"use server"

import env from "@/app/env";
import { Octokit } from "@octokit/rest";

// Initialize Octokit with a personal access token
const octokit = new Octokit({
  auth: env.github.token,
});

const getGithubClient = () => {
  // GitHub repository details
  const owner = env.github.username; // Replace with your GitHub username
  const repo = env.github.repo; // Replace with your repository name
  const branch = env.github.branch; // Branch to update
  return { owner, repo, branch };
};

const fetchFileData = async (path: string) => {
  const { owner, repo, branch } = getGithubClient();
  const { data: fileData } = await octokit.repos.getContent({
    owner,
    repo,
    path,
    ref: branch,
  });
  return fileData;
};

export const createOrUpdateDataFromDatabase = async (
  path: string,
  content: unknown
) => {
  // Get the file's current SHA and content
  const fileData = await fetchFileData(path);

  if (!("sha" in fileData)) {
    throw new Error("Unexpected file data format");
  }
  const fileSha = fileData.sha;

  const encodedContent = Buffer.from(JSON.stringify(content, null, 2)).toString(
    "base64"
  );

  const { owner, repo, branch } = getGithubClient();
  await octokit.repos.createOrUpdateFileContents({
    owner,
    repo,
    path,
    message: "Update personal info",
    content: encodedContent,
    sha: fileSha,
    branch,
  });
};

export const fetchFileContentFromDatabase = async (path: string) => {
  const fileData = await fetchFileData(path);

  if (!("content" in fileData)) {
    throw new Error("Unexpected file data format");
  }

  // Decode the base64 file content
  const fileContent = Buffer.from(fileData.content as string, "base64").toString("utf-8");
  const parsedContent = JSON.parse(fileContent);
  return parsedContent;
};
