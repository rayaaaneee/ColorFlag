/** @type {import('next').NextConfig} */
import path from 'path';
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
});

const __dirname = path.resolve();

const nextConfig = withPWA({
  sassOptions: {
    includePaths: [path.join(__dirname, 'asset', 'scss')],
  },
  experimental: {
    swcTraceProfiling: true,
  },
  webpack(config) {
    return config;
  },
});

export default nextConfig;
