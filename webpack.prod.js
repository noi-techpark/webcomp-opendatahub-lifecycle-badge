// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: CC0-1.0

const path = require('path');

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    filename: "webcomp-opendatahub-lifecycle-badge.min.js",
    path: path.resolve(__dirname, "dist"),
  },
};
