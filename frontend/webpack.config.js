const path = require("path");
const dotenv = require("dotenv");
const HtmlWebpackPlugin = require("html-webpack-plugin");

dotenv.config();

module.exports = () => {
  const mode = process.env.MODE || "production";

  return {
    mode,
    entry: path.resolve(__dirname, "./src/index.js"),
    output: {
      path: path.resolve(__dirname, "./dist"),
      filename: "bundle.js",
      publicPath: "/",
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.svg$/,
          oneOf: [
            {
              issuer: /\.[jt]sx?$/, // Для файлов .js и .jsx
              use: [
                {
                  loader: "file-loader", // Импорт SVG как файл
                  options: {
                    name: "images/[name].[hash].[ext]",
                  },
                },
              ],
            },
            {
              issuer: /\.css$/, // Для файлов .css
              type: "asset/resource", // Обработка SVG как ресурс
              generator: {
                filename: "images/[name].[hash][ext]",
              },
            },
          ],
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          type: "asset/resource",
          generator: {
            filename: "images/[hash][ext][query]",
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "./public/index.html"),
        filename: "index.html",
        favicon: path.resolve(__dirname, "./public/favicon.ico"),
        minify: true,
      }),
    ],
    devServer: {
      static: {
        directory: path.resolve(__dirname, "./public"),
      },
      historyApiFallback: true,
      port: 3000,
      open: true,
    },
    resolve: {
      extensions: [".js", ".jsx"],
    },
  };
};
