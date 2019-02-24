"use strict";
const HTMLWebpackPlugin = require("html-webpack-plugin");

const path = require("path");

module.exports = {
  entry: "./src/index.ts",
  context: path.resolve(__dirname),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
    library: "CybexAddon",
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
  devServer: {
    contentBase: "./dist",
    compress: true,
    port: 5560,
    hot: true
  },
  resolve: {
    extensions: [".js", "jsx", ".ts", ".tsx", ".json"]
  },
  // devtool: "source-map",
  plugins: [
    new HTMLWebpackPlugin({
      title: "CAddOn",
      template: "./examples/index.html"
    })
  ]
};
