"use strict";
const HTMLWebpackPlugin = require("html-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

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
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]"
            }
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: "./dist",
    compress: true,
    disableHostCheck: true,
    host: "0.0.0.0",
    port: 5560,
    hot: true
  },
  resolve: {
    extensions: [".js", "jsx", ".ts", ".tsx", ".json"]
  },
  // devtool: "source-map",
  plugins: [
    new CompressionPlugin({
      compressionOptions: { level: 7 }
    }),
    new HTMLWebpackPlugin({
      title: "CAddOn",
      template: "./examples/index.html"
    })
  ]
};
