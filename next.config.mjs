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
                  { name: 'prefixIds', params: { prefixIds: false, prefixClassNames: false } },
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
};

export default nextConfig;
