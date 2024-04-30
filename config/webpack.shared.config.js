const TerserWebpackPlugin = require("terser-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");



module.exports = {
    module: {
        rules : [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.html$/i,
                exclude: /node_modules/,
                use: [
                  {
                    loader: "html-loader",
                    options: { minimize: true}
                  }
                ]
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
              test: /\.(png|svg|jpg|jpeg|gif)$/i,
              exclude:/node_modules/,
              type: 'asset/resource'

            },
            {
                test: /\.ico$/,
                exclude:/node_modules/,
                type: 'asset/resource',

            },
            {
              test: /\.(woff|woff2|eot|ttf|otf)$/i,
              exclude:/node_modules/,
              type: 'asset/resource',
            },

        ]
    },
    optimization: {
        minimizer: [
          new TerserWebpackPlugin({
            cache: true,
            parallel: true,
            sourceMap: true,
          }),
          new CssMinimizerPlugin()
        ],
        splitChunks: {
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/](react|react-dom|reactstrap|react-redux|react-router|react-router-dom|redux|redux-persist|react-popper|popper|react-slick|react-helmet|axios|react-visibility-sensor|util|react-loadable|babel-polyfill|qs|history|core-js|styled-components|@emotion|buffer|babel-runtime|react-router-redux|resize-observer-polyfill|scheduler|react-gtm-module|dateformat|path-to-regexp|path-browserify|enquire.js|lodash.debounce|cookie|react-is|loadjs|loadcss|setimmediate|universal-cookie|react-side-effect|process|object-assign|react-fast-compare|prop-types|react-hot-loader|classnames|timers-browserify|esm|json2mq|browser.js)[\\/]/,
              name: 'vendor',
              chunks: 'all'
            },
            phonepeSdk: {
              test: /[\\/]node_modules[\\/](phonepesdk-web)[\\/]/,
              name: 'phonePeSDK',
              chunks: 'all'
            }
          }
        }
    }
}