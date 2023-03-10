const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const EslintWebpackPlugin = require('eslint-webpack-plugin');
const StylelintWebpackPlugin = require('stylelint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlInlineScriptWebpackPlugin = require('html-inline-script-webpack-plugin');
const CSSMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const SentryWebpackPlugin = require('@sentry/webpack-plugin');

const mode = process.env.NODE_ENV || 'production';

const config = {
  mode: mode,
  stats: {
    children: true,
  },
  entry: {
    main: './src/index.tsx',
    initColorScheme: './src/features/colorScheme/initColorScheme.ts',
    sw: './src/features/serviceWorker/service.worker.ts',
  },
  output: {
    clean: true,
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /service\.worker\.ts$/,
        loader: 'ts-loader',
        type: 'asset/resource',
        generator: {
          filename: 'sw.js',
        },
      },
      {
        test: /\.(svg|jpg|png|jpeg)$/,
        type: 'asset/resource',
      },
      {
        test: /\.webmanifest$/i,
        use: 'nm_webpack_json',
        type: 'asset/resource',
      },
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/ && /worker\.ts/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      '@components': path.resolve('./src/components'),
      '@features': path.resolve('./src/features'),
      '@app': path.resolve('./src/app'),
      '@images': path.resolve('./src/images'),
    },
  },
  optimization: {
    runtimeChunk: mode === 'production' ? false : 'single',
    splitChunks: {
      chunks: 'all',
    },
    minimizer: [`...`, new CSSMinimizerWebpackPlugin()],
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: './src/images/icon.ico',
      template: './src/app/index.html',
      excludeChunks: ['sw'],
    }),
    new HtmlInlineScriptWebpackPlugin({
      scriptMatchPattern: [/initColorScheme\..+\.js$/],
    }),
    new MiniCssExtractPlugin({
      filename: 'bundle.[contenthash].css',
    }),
    new EslintWebpackPlugin({
      files: '{**/*,*}.{tsx,ts,js}',
    }),
    new StylelintWebpackPlugin({
      files: '{**/*,*}.css',
    }),
  ],
  devServer: {
    open: true,
    historyApiFallback: {
      disableDotRule: true,
    },
  },
  devtool: mode === 'production' ? 'hidden-source-map' : 'eval-cheap-source-map',
};

module.exports = config;

if (process.env.SENTRY_RELEASE) {
  config.plugins.push(
    new SentryWebpackPlugin({
      include: './dist',
      release: process.env.SENTRY_RELEASE,
      authToken: process.env.SENTRY_AUTH_TOKEN,
      org: 'newsfeed-yl',
      project: 'newsfeed',
    })
  );
}
