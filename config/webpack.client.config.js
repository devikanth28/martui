const path = require("path");
const {merge} = require("webpack-merge");
const sharedConfig = require("./webpack.shared.config");
const WebpackRequireFrom = require("webpack-require-from");
const { WebpackManifestPlugin }  = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const clientConfig = {
    mode : "production",
    target : "web",
    entry : "./src/client/index.js",
    output : {
        path : path.resolve(__dirname, `../public/client`),
        filename: `js/[name].[contenthash].js`,
        chunkFilename: `js/[name].[contenthash].chunk.js`,
        publicPath : '/',
        assetModuleFilename: `assets/[name].[contenthash][ext][query]`
    },
    plugins : [
        
        new MiniCssExtractPlugin({
            filename: `css/[name].[contenthash].css`,
            chunkFilename: `css/[name].[contenthash].css`,
        }),
        new WebpackRequireFrom({
            methodName: "getChunkURL",
            suppressErrors: true
        }),
        new WebpackManifestPlugin({
            fileName: 'client-assets-manifest.json',
            output : `client-assets-manifest.json`
        })
    ]
}

module.exports = merge(clientConfig, sharedConfig);