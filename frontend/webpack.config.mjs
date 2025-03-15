import path from 'path';
import dotenv from 'dotenv';
import HtmlWebpackPlugin from 'html-webpack-plugin';

dotenv.config();

export default () => {
  const mode = process.env.MODE || 'production';

  const __dirname = new URL('.', import.meta.url).pathname;

  return {
    mode,
    entry: path.resolve(__dirname, './src/index.tsx'),
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'bundle.js',
      publicPath: '/',
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.svg$/,
          oneOf: [
            {
              issuer: /\.[jt]sx?$/, // Для .ts и .tsx файлов
              type: 'asset/resource', // Заменяем file-loader на asset/resource
              generator: {
                filename: 'images/[name].[hash][ext]',
              },
            },
            {
              issuer: /\.css$/, // Для файлов .css
              type: 'asset/resource', // Заменяем file-loader на asset/resource
              generator: {
                filename: 'images/[name].[hash][ext]',
              },
            },
          ],
        },
        {
          test: /\.(ts|tsx)$/, // Для обработки TypeScript файлов
          exclude: /node_modules/,
          use: {
            loader: 'ts-loader', // Используем ts-loader для TypeScript файлов
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          type: 'asset/resource', // Обработка изображений
          generator: {
            filename: 'images/[hash][ext][query]',
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './public/index.html'),
        filename: 'index.html',
        favicon: path.resolve(__dirname, './public/favicon.ico'),
        minify: true,
      }),
    ],
    devServer: {
      static: {
        directory: path.resolve(__dirname, './public'),
      },
      historyApiFallback: true,
      port: 3000,
      open: true,
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
  };
};
