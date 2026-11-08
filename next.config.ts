import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: "export",
  devIndicators: false,
  allowedDevOrigins: ["*.ngrok-free.app"],
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;
