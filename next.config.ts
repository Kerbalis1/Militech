import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  output: process.env.MILITECH_STATIC_EXPORT === "1" ? "export" : undefined,
  images: { unoptimized: true },
  poweredByHeader: false,
};
export default nextConfig;
