import withBundleAnalyzer from '@next/bundle-analyzer';
import type { NextConfig } from 'next';
import withPlugins from 'next-compose-plugins';

import './src/env.js';

const isDev = process.env.NODE_ENV !== 'production';

const shouldCache = (nextConfig: NextConfig): NextConfig => {
  if (isDev) {
    return nextConfig;
  }
  return {
    ...nextConfig,
    cacheHandler: require.resolve('./cache-handler.mjs'),
  };
};

const shouldPwa = (nextConfig: NextConfig): NextConfig => {
  if (!isDev) {
    const withPWA = require('@ducanh2912/next-pwa').default({
      dest: 'public',
    });
    return withPWA(nextConfig);
  }

  return nextConfig;
};

const withImageSizes = (nextConfig: NextConfig): NextConfig => {
  if (isDev) {
    return {
      ...nextConfig,
      images: {
        ...nextConfig.images,
        remotePatterns: [
          ...(nextConfig?.images?.remotePatterns ?? []),
          {
            hostname: '*',
          },
        ],
      },
    };
  }
  return {
    ...nextConfig,
    images: {
      ...nextConfig.images,
      remotePatterns: [
        ...(nextConfig?.images?.remotePatterns ?? []),
        {
          protocol: 'https',
          hostname: '*.adorsys.team',
        },
        {
          protocol: 'https',
          hostname: '*.ssegning.me',
        },
      ],
    },
  };
};

const withWebpack = (nextConfig: NextConfig): NextConfig => {
  if (isDev) {
    return nextConfig;
  }
  return {
    ...nextConfig,
    webpack: (config, context) => {
      config.optimization.splitChunks = {
        chunks: 'all',
      };
      return nextConfig.webpack ? nextConfig.webpack(config, context) : config;
    },
  };
};

const nextConfig: NextConfig = {
  output: 'standalone',
  reactStrictMode: true,
};

export default withPlugins(
  [
    [withImageSizes],
    [withWebpack],
    [
      withBundleAnalyzer({
        enabled: !isDev,
        openAnalyzer: isDev,
      }),
    ],
    [shouldPwa],
    [shouldCache],
  ],
  nextConfig,
);
