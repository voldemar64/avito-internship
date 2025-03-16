import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';


export default () => {
  const mode = 'production';

  const __dirname = path.resolve(new URL('.', import.meta.url).pathname);

  return {
    mode,
    entry: './src/index.tsx',
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
              issuer: /\.[jt]sx?$/,
              type: 'asset/resource',
              generator: {
                filename: 'images/[name].[hash][ext]',
              },
            },
            {
              issuer: /\.css$/,
              type: 'asset/resource',
              generator: {
                filename: 'images/[name].[hash][ext]',
              },
            },
          ],
        },
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'ts-loader',
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'images/[hash][ext][query]',
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
        filename: 'index.html',
        favicon: './public/favicon.ico',
        minify: true,
      }),
    ],
    devServer: {
      static: {
        directory: './public',
      },
      historyApiFallback: true,
      port: 3000,
      open: true,
    },
    resolve: {
      extensions: ['.ts', '.tsx'],
    },
  };
};
