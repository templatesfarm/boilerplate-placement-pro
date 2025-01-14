"use server";

import env from "@/app/env";

export const getImageUrl = (imageId: string) => {
  console.log(
    "🚀 ~ getImageUrl ~ env.github.username:",
    env.github.username,
    env.github.repo,
    env.github.branch,
    imageId
  );
  const imageUrl = `https://raw.githubusercontent.com/${env.github.username}/${env.github.repo}/${env.github.branch}/images/${imageId}`;
  console.log("Image URL: ", imageUrl);
  return imageUrl;
};
