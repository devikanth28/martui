
const path = require('path');

const express = require('express');

const {merge} = require("webpack-merge");

const sharedConfig = require("./webpack.shared.config");

const HtmlWebpackPlugin = require('html-webpack-plugin');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");


const devconfig = {

    target: 'web',
    mode: 'development',
    entry : "./src/client/index.js",
    devtool:'source-map',
    output: {
        filename: 'dev/js/[name].js',
        chunkFilename: 'dev/js/[name].chunk.js',
        publicPath : '/',
        assetModuleFilename: `dev/[name].[ext][query]`

	},
  module: {
    rules: [
      {
        test: /\.(gif|png|jpe?g|woff|woff2|eot|ttf)$/,
        exclude: /node_modules/,
        type: 'asset/resource',

      }
    ]
  },

	devServer: { 
		port: 8080, 
		liveReload: true, 
    setupMiddlewares: (middlewares, devServer) => {
      devServer.app.use('^/images/*', express.static(path.resolve(__dirname, '../src/client/images/')));
      return middlewares;
    },
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
      progress: true
    },
    compress: true,
    historyApiFallback: true,
  },
    plugins: [
      new MiniCssExtractPlugin({
          filename: `dev/css/[name].css`,
          chunkFilename: `dev/css/[name].css`,
      }),
      new HtmlWebpackPlugin({
          inject: true,
          template: "./dev/index.html",
      }),
    ],

}


module.exports = merge(devconfig,sharedConfig);