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
    serverActions: {
      allowedOrigins: ['localhost:3000', 'worldmaster.vercel.app'],
    }
  },
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg'),
    )

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              svgo: true,
              svgoConfig: {
                plugins: [
                  { name: 'removeViewBox', active: false },
                  { name: 'prefixIds', params: { prefixIds: false, prefixClassNames: false, prefix: false } },
                  { name: 'cleanupIds', params: { remove: false, minify: false, prefix: '' } },
                ]
              },
            },
          }
        ],
      },
    )

    fileLoaderRule.exclude = /\.svg$/i

    return config
  },
});

export default nextConfig;
