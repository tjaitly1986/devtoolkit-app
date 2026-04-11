import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://devtoolskitapp.vercel.app", lastModified: new Date() },
    { url: "https://devtoolskitapp.vercel.app/blog", lastModified: new Date() },
    { url: "https://devtoolskitapp.vercel.app/blog/base64-encoding-explained", lastModified: new Date() },
    { url: "https://devtoolskitapp.vercel.app/blog/cron-expression-guide", lastModified: new Date() },
    { url: "https://devtoolskitapp.vercel.app/blog/jwt-decoder-guide", lastModified: new Date() },
    { url: "https://devtoolskitapp.vercel.app/blog/regex-testing-guide", lastModified: new Date() },
  ];
}
