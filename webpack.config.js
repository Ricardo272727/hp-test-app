const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const env = require("./env");


module.exports = {
  mode: env.mode,
  entry: path.join(__dirname, "src", "index.js"),
  output: {
    path: path.resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react"],
          },
        },
      },
      {
        test: /\.(c|sc|sa)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      env: env,
      template: "./src/templates/index.html",
    }),
    new CopyPlugin({
      patterns: [{ from: "./src/assets", to: "assets" }],
    }),
  ],
  resolve: {
    extensions: ["", ".js"],
    alias: {
      components: path.resolve(__dirname, "src/components"),
      providers: path.resolve(__dirname, "src/providers"),
      hooks: path.resolve(__dirname, "src/hooks"),
      views: path.resolve(__dirname, "src/views"),
      requests: path.resolve(__dirname, "src/requests"),
      schemas: path.resolve(__dirname, "src/schemas"),
      data: path.resolve(__dirname, "src/data"),
      assets: path.resolve(__dirname, "src/assets"),
      providers: path.resolve(__dirname, "src/providers"),
    },
  },
  devServer: {
    host: "localhost",
    port: env.port,
    static: {
      directory: path.join(__dirname, "build"),
    },
    hot: true,
    compress: false,
    open: true,
    watchFiles: [
      "./src/**/*.js",
      "./src/**/*.jsx",
      "./src/**/*.css",
      "./src/**/*.scss",
    ],
  },
};
