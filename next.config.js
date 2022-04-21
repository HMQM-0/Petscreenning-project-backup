/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

const withPWA = require("next-pwa");

module.exports = withPWA({
  pwa: {
    dest: "public",
    disable: process.env.NODE_ENV === "development",
  },
  ...nextConfig,
  compiler: {
    styledComponents: true,
  },
  webpack: (config, options) => {
    if (process.env.ANALYZE === "true") {
      try {
        const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
        config.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: "static",
            reportFilename: options.isServer
              ? "../analyze/server.html"
              : "./analyze/client.html",
          })
        );
      } catch (e) {
        console.log("bundling error", e);
      }
    }
    return config;
  },
});
