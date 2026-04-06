import type { NextConfig } from "next";

const baseConfig: NextConfig = {
  output: "standalone",
  reactCompiler: true,
  typedRoutes: true,
  reactStrictMode: true,
  cacheComponents: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  compress: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
    reactRemoveProperties: {
      properties: ["data-reactid", "data-reactroot"],
    },
  },
  typescript: {
    ignoreBuildErrors: process.env.NODE_ENV === "production",
  },
  experimental: {
    optimizePackageImports: [
      "lucide-react",
    ],
    cssChunking: true,
    optimizeCss: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.facebook.com",
        pathname: "/**",
      }
    ],
  },
  transpilePackages: ["geist"],
};
export default baseConfig;
