/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  webpack(config) {
    if (config.optimization.splitChunks && typeof config.optimization.splitChunks === "object") {
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        threejs: {
          test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
          name: "vendor-threejs",
          chunks: "all",
          priority: 30,
          enforce: true,
        },
      };
    }
    return config;
  },
};

export default nextConfig;
