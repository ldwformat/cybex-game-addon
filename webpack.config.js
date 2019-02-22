"use strict";

const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  context: path.resolve(__dirname),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
    library: 'CybexAddon',
    libraryTarget: "umd"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader"
      }
    ]
  },
  resolve: {
    extensions: [".js", "jsx", ".ts", ".tsx", ".json"]
  },
  devtool: "source-map",
  plugins: []
};
