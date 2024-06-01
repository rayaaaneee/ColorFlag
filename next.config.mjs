/** @type {import('next').NextConfig} */
import path from 'path';
import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
});

const __dirname = path.resolve();

const nextConfig = withPWA({
  sassOptions: {
    includePaths: [path.join(__dirname, 'asset', 'scss')],
  },
  experimental: {
    serverComponentsExternalPackages: ['@sentry/nextjs', '@sentry/node', '@sentry/react', '@sentry/core'],
  },
  webpack(config) {
    return config;
  },
});

export default nextConfig;
