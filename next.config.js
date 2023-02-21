// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   swcMinify: true,
//   images: {
//     domains: [process.env.NEXT_PUBLIC_SUPABASE_STORAGE_DOMAIN],
//   },
// };

// module.exports = nextConfig;

/** @type {import(
 * 'next').NextConfig} */
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
  // module: {
  //   loaders: [
  //     {
  //       test: /.jsx?$/,
  //       loader: "babel-loader",
  //       exclude: /node_modules/,
  //     },
  //     {
  //       test: /\.css$/,
  //       loader: "style-loader!css-loader",
  //     },
  //     {
  //       test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
  //       loader: "url-loader?limit=100000",
  //     },
  //   ],
  // },
  images: {
    domains: [
      process.env.NEXT_PUBLIC_SUPABASE_STORAGE_DOMAIN,
      "files.stripe.com",
    ],
  },
};
