/** @type {import('next').NextConfig} */
import path from 'path';

const __dirname = path.resolve();

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'asset', 'scss')],
  },
  experimental: {
    swcTraceProfiling: true,
  },
  webpack(config) {
    /* config options here */
    return config;
  },
};

export default nextConfig;
