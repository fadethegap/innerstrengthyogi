// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
//   images: {
//     domains: [process.env.NEXT_PUBLIC_SUPABASE_STORAGE_DOMAIN],
//   },
// };

// module.exports = nextConfig;

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack(config, {}) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      child_process: false,
      net: false,
      crypto: false,
    };
    return config;
  },
  images: {
    domains: [
      process.env.NEXT_PUBLIC_SUPABASE_STORAGE_DOMAIN,
      "images.pexels.com",
    ],
  },
};
