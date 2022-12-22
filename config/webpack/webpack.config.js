const { join, resolve } = require('path')
const GasPlugin = require('gas-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const DotenvWebpack = require('dotenv-webpack')
// const TerserPlugin = require('terser-webpack-plugin')
const { env } = require('process')

const deployEnv = env.DEPLOY_ENV || 'dev'
const mode = env.DEPLOY_ENV === 'prod' ? 'production' : 'development'

const root = resolve(__dirname, '../../')

module.exports = {
    mode,
    context: join(root, 'src'),
    entry: join(root, 'src/index.ts'),
    output: {
        filename: 'Code.js',
        path: join(root, 'build'),
    },
    plugins: [
        new DotenvWebpack({}),
        new GasPlugin({
            autoGlobalExportsFiles: [join(root, 'src/**/*.ts')],
        }),
        new HtmlWebpackPlugin({
            filename: 'appsscript.json',
            template: join(root, 'config', 'appsscript.json.ejs'),
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
                    from: join(root, `config/${deployEnv}/.clasp.json`),
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
        modules: [root, 'node_modules'],
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
}
