const path = require("path");

const debug = process.env.NODE_ENV !== "production";

module.exports = {
  assetPrefix: !debug ? "/blog/" : "",
  reactStrictMode: true,
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };

    return config;
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};
