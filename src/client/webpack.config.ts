import webpack from 'webpack';
import path from 'path';
import { Configuration as WebpackConfig } from 'webpack-dev-server';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export let _: WebpackConfig;

let target = 'web'; // в режиме разработки browserslist не используется
if (process.env.NODE_ENV === 'production') {
  target = 'browserslist'; // в продакшен режиме используем browserslist
}

const webpackConfig = (): webpack.Configuration => {
  return {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist'),
      assetModuleFilename: 'assets/[hash][ext][query]',
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader', 'postcss-loader'],
        },
        {
          test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
          type:
            process.env.NODE_ENV === 'production' ? 'asset' : 'asset/resource',
        },
        {
          test: /\.(woff2?|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: { '@': path.resolve(__dirname, 'src') },
    },
    devServer: {
      hot: true,
      open: true,
      port: 3000,
      historyApiFallback: true,
    },
    target,
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public', 'index.html'),
      }),
    ],
  };
};

export default webpackConfig;
