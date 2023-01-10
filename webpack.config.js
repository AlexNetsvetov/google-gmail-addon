const { join } = require('path');
const GasPlugin = require('gas-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const DotenvWebpack = require('dotenv-webpack');
// const TerserPlugin = require('terser-webpack-plugin')
const { env } = require('process');

const mode = env.NODE_ENV || 'development';

module.exports = {
  mode,
  context: join(__dirname, 'src'),
  entry: join(__dirname, 'src/index.ts'),
  output: {
    filename: 'Code.js',
    path: join(__dirname, 'build'),
  },
  plugins: [
    new DotenvWebpack({}),
    new GasPlugin({
      autoGlobalExportsFiles: [join(__dirname, 'src/**/*.ts')],
    }),
    new HtmlWebpackPlugin({
      filename: 'appsscript.json',
      template: join(__dirname, 'config', 'appsscript.json.ejs'),
      chunks: [],
      addon: {
        name: 'My Gmail add-on',
        scopes: [
          'https://www.googleapis.com/auth/gmail.addons.execute',
          'https://www.googleapis.com/auth/gmail.readonly',
          'https://www.googleapis.com/auth/script.external_request',
        ],
      },
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: join(__dirname, `config/${mode}/.clasp.json`),
          to: '.',
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.gs'],
    modules: [__dirname, 'node_modules'],
  },
  // optimization: {
  //   minimize: mode === 'production',
  //   minimizer: [
  //     new TerserPlugin({
  //       terserOptions: {
  //         format: {
  //           comments: TerserPlugin.uglifyJsMinify,
  //         }
  //       },
  //       extractComments: false,
  //     })
  //   ]
  // }
};
