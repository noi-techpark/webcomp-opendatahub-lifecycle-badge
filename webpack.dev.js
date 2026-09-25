// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: CC0-1.0

const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "webcomp-boilerplate.js",
    clean: true,
  },
  devServer: {
    static: "./public",
    port: 8998,
    hot: true,
    watchFiles: {
      paths: ["src/**/*", "public/**/*"],
      options: {
        usePolling: true,
        interval: 1000,
      },
    },
  },
  devtool: "inline-source-map",
};
