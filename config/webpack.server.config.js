const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');
const { merge } = require("webpack-merge");
const sharedConfig = require("./webpack.shared.config");
const { WebpackManifestPlugin }  = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


const serverConfig = ({env}) => {
    let package_version = env.package_version;
    return {
        target : "node",
        mode: "production",
        entry: './config/server/index.js',
        output: {
            path: path.join(__dirname, `../public/server`),
            filename: `js/[name].${package_version}.js`,
            assetModuleFilename: `assets/[hash][ext][query]`
        },
        externals: [webpackNodeExternals()],
        plugins : [
            new MiniCssExtractPlugin({
                filename: `css/[name].[contenthash].css`,
                chunkFilename: `css/[name].[contenthash].css`,
            }),
           
            new WebpackManifestPlugin({
                fileName: 'server-assets-manifest.json',
                output : 'server-assets-manifest.json'
            })
        ]
    }
}

module.exports = (_, env) => merge(sharedConfig, serverConfig(env));