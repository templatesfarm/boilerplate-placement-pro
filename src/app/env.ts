const env = {
    github: {
        token: String(process.env.GITHUB_TOKEN),
        username: String(process.env.GITHUB_USERNAME),
        repo: String(process.env.GITHUB_REPO),
    },
    baseUrl: String(process.env.NEXT_PUBLIC_BASE_URL),
  };
  
  export default env;