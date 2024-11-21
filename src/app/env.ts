const env = {
    github: {
        token: String(process.env.GITHUB_TOKEN),
        username: String(process.env.GITHUB_USERNAME),
        repo: String(process.env.GITHUB_REPO),
        branch: "master"
    },
    baseUrl: String(process.env.NEXT_PUBLIC_BASE_URL),
    password: String(process.env.NEXT_PUBLIC_PASSWORD)
  };
  
  export default env;