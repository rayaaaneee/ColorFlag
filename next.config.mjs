/** @type {import('next').NextConfig} */
import path from 'path';

const __dirname = import.meta.dirname;


const nextConfig = {
    sassOptions : {
        includePaths: [path.join(__dirname, "asset", "scss")],
    },
    experimental: {
        swcTraceProfiling: true,
    },
    webpack: (config) => {
        config.module.rules.push({
          test: /\.svg$/i,
          issuer: /\.[jt]sx?$/,
          use: {
            loader: '@svgr/webpack',
            options: {
              svgoConfig: {
                plugins: [
                    {
                      name: 'prefixIds',
                      active: false
                    },
                    {
                        name: 'prefixClassNames',
                        active: false
                    },
                    {
                        name: 'removeViewBox',
                        active: false
                    }
                ]
              }
            }
          }
        })
        return config
    }
};

export default nextConfig;