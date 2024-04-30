const WorkboxPlugin = require('workbox-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

const dotenv = require('dotenv');
// NodeJS
const path = require('path');
const webpack = require('webpack');
const glob = require('glob');

// const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// Webpack plugins
const HtmlWebPackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const PurgecssPlugin = require('purgecss-webpack-plugin');

const env = dotenv.config({ path: path.resolve(__dirname, './.env.production') }).parsed;

// reduce it to a nice object, the same as before
const envKeys = Object.keys(env).reduce((prev, next) => {
prev[`process.env.${next}`] = JSON.stringify(env[next]);
return prev;
}, {});
const assestsUrl = process.env.ASSETS_URL;
const _version = process.env.ASSETS_VERSION;

//const AsyncChunkNames = require('webpack-async-chunk-names-plugin');
// // const config = require('config');

// Helper Variables
const paths = {
  entryClient: path.resolve(__dirname, "src", "client", 'index.js'),
  src: path.resolve(__dirname, "src", "client", "index.html"),
  cssSrc: path.resolve(__dirname, "src", "client", "css"),
  imgSrc: path.resolve(__dirname, "src", "client", "images"),
  dest: path.resolve(__dirname, 'public'),
  destHtml: path.resolve(__dirname, 'public', 'index.html'),
  contentBase: path.join(__dirname, 'public'),
  purgeSrc: path.join(__dirname, 'src')
};

module.exports = {
  devtool: "source-map",
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    paths.entryClient
  ],
  output: {
    /* path: paths.dest,
    filename: 'main.[hash:8].js',
    chunkFilename: '[name].[hash:8].chunk.js',
    publicPath: '/' */
    // filename: "bundle.js",
    path: paths.dest,
    filename: 'js/[name].[contenthash].js',
    chunkFilename: 'js/[name].[contenthash].chunk.js',
    publicPath: assestsUrl,   // production path
  //  publicPath: "https://static1.medplusindia.com:555/staging/martpwa/",
    //publicPath: "/",
    libraryTarget: "umd"
  },
  optimization: {
    runtimeChunk: 'single',
  },
  module: {
    rules: [
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
            options: { minimize: true, removeComments: true, collapseWhitespace: true }
          }
        ]
      },
      /* {
        test: /\.json$/,
        loader: 'json-loader'
      }, */
      /* {
        test: /\.(scss|css)$/,
        include: paths.cssSrc,
        exclude: /node_modules/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader", options: {
            sourceMap: true
          }
        }, {
          loader: "sass-loader", options: {
            sourceMap: true
          }
        }]
      } */
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          //          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              minimize: {
                safe: true
              },
              uglify: true,
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
      }, /* {
        test: /\.svg$/,
        exclude: /(node_modules|-cssbg.svg)$/,
        loaders: [
          'babel-loader',
          {
            loader: 'react-svg-loader',
            query: {
              jsx: true
            }
          },
        ]
      }, */ {
        test: /\.ico$/,
        exclude: /node_modules/,
        // include: paths.src,
        use: [{
          loader: 'file-loader?name=images/[name].[ext]'
        }],
      },{
        test: /.svg$/,
        exclude: /node_modules/,
        use: [{
          loader: 'file-loader?name=images/[name].[ext]'
        }],
      }, 
      
      /* {
        test: /\.(png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        include: paths.src,
        use: [{
          loader: 'url-loader?limit=10000'
        }],
      },  */{
        test: /\.(gif|png|jpe?g|woff|woff2|eot|ttf)$/,
        exclude: /node_modules/,
        // include: paths.src,
        use: [{
          loader: require.resolve("file-loader")
            + "?name=images/[name].[contenthash].[ext]"
        },
        {
          loader: 'image-webpack-loader',
          //options: {
           // mozjpeg: {
            //  progressive: true,
            //  quality: 65
           // },
            // optipng.enabled: false will disable optipng
           // optipng: {
           //   enabled: true,
           // },
           // pngquant: {
            //  quality: '65-90',
            //  speed: 4
           // },
           // gifsicle: {
           //   interlaced: true,
           // },
            // the webp option will enable WEBP
           // webp: {
           //   quality: 75
           // }
       	  //},
        }]
      }
      /* , {
        test: /\.(gif|png|jpe?g|svg)$/i,
        include: paths.imgSrc,
        use: [
          'file-loader' + "?name=../[path][name].[ext]",
          {
            loader: 'image-webpack-loader',
            options: {
              disable: true, // webpack@2.x and newer
            },
          },
        ],
      } */
      ,
      {
        test: /\.(gif|woff|svg|eot|ttf)$/,
        include: /node_modules/,
        use : 'url-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin(
      envKeys
    ),
    //new webpack.HotModuleReplacementPlugin(),
    new HtmlWebPackPlugin({
      template: paths.src,
      filename: paths.destHtml
    }),
    //    new AsyncChunkNames(),
    new CopyWebpackPlugin([
      { from: 'src/client/images/favicon/*', to: 'images/favicon/', flatten: true },
      { from: 'src/**/manifest.json', to: '', flatten: true }      
    ]),

    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: "[id].[contenthash].css"
    }),

    // new PurgecssPlugin({
      // paths: glob.sync(`${paths.purgeSrc}/**/*`,  { nodir: true }),
      // whitelist: ['reactstrap']
    // }),
    new ManifestPlugin({
      fileName: 'asset-manifest.json',
    }),
    new webpack.IgnorePlugin(/^\.\/reactstrap$/, /reactstrap$/),
    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'server',
    //   generateStatsFile: true,
    //   statsOptions: { source: false }
    // }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled',
      generateStatsFile: true,
      statsOptions: { source: false }
    }
    ),
    new WorkboxPlugin.InjectManifest({
      swSrc: './src/client/firebase-messaging-sw.js',
      swDest: './firebase-messaging-sw.js',
      include: [/\.html$/, /\.js$/],
    })
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: "vendor",
    //   filename: "vendor.js",
    //   // (Give the chunk a different name)

    //   minChunks: Infinity,
    // }),

    /* new WorkboxPlugin.InjectManifest({
      swSrc: './src/client/mart-app-sw.js',
      swDest: './service-worker.js',
      exclude: [/\.jpg$/, /\.png$/, /\.js$/, /\.css$/, /\.gz$/, /\.svg$/, /\.jpeg$/, /\.html$/
        , /\.json$/, /\.map$/, /\.gif$/],
      clientsClaim: true,
      skipWaiting: true
    }) */
   /*  new WorkboxPlugin.GenerateSW({
            // these options encourage the ServiceWorkers to get in there fast
             // and not allow any straggling "old" SWs to hang around
             clientsClaim: true,
             skipWaiting: true
           }) */
  ],
  performance: {
    hints: "warning",
    maxAssetSize: 2000000, // Bytes..
    maxEntrypointSize: 4000000, // Bytes..
    assetFilter: function (filename) {
      console.log(filename);
      // If you would like to, you can exclude file types, names, etc here by providing an expression.
      return true;
    }
  },
  // optimization: {
  //   runtimeChunk: 'single',
  //   splitChunks: {
  //     chunks: 'all',
  //     maxInitialRequests: Infinity,
  //     minSize: 0,
  //     cacheGroups: {
  //       vendor: {
  //         test: /[\\/]node_modules[\\/]/,
  //         name(module) {
  //           // get the name. E.g. node_modules/packageName/not/this/part.js
  //           // or node_modules/packageName
  //           const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

  //           // npm package names are URL-safe, but some servers don't like @ symbols
  //           return `npm.${packageName.replace('@', '')}`;
  //         },
  //       },
  //     },
  //   },
  // },
  // optimization: {
  //   splitChunks: {
  //     name: false,
  //     cacheGroups: {
  //       vendor: {
  //         test: /[\\/]node_modules[\\/]/,
  //         name: 'vendor',
  //         chunks: 'all',
  //       }
  //     }
  //   }
  // },
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       commons: {
  //         test: /[\\/]node_modules[\\/]/,
  //         name: "vendor",
  //         chunks: "initial",
  //       },
  //     },
  //   },
  // },
  optimization: {
    minimizer: [
      new TerserWebpackPlugin({
        cache: true,
        parallel: true,
        sourceMap: true, // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      cacheGroups: {
        commons: {
          // vendor: {
            test: /[\\/]node_modules[\\/](react|react-dom|reactstrap|react-redux|react-router|react-router-dom|redux|redux-persist|react-popper|popper|react-slick|react-helmet|axios|react-visibility-sensor|util|react-loadable|babel-polyfill|qs|history|core-js|styled-components|@emotion|buffer|babel-runtime|react-router-redux|resize-observer-polyfill|scheduler|react-gtm-module|dateformat|path-to-regexp|path-browserify|enquire.js|lodash.debounce|cookie|react-is|loadjs|loadcss|setimmediate|universal-cookie|react-side-effect|process|object-assign|react-fast-compare|prop-types|react-hot-loader|classnames|timers-browserify|esm|json2mq|browser.js)[\\/]/,
          name: 'vendor',
          chunks: 'all',
          // }
        }
      }
    }
  },
  devServer: {
    proxy: {
      // proxy URLs to backend development server
      '/api': 'http://localhost:3000'
    },
    contentBase: paths.contentBase,
    compress: true, // enable gzip compression
    disableHostCheck: true, // this can be dangerous, do not use unless on a private LAN in a safe network
    historyApiFallback: true, // true for index.html upon 404, object for multiple paths
    hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin 
    host: '192.168.43.137', // listen on all interfaces
    https: false, // true for self-signed, object for cert authority
    noInfo: false, // only errors & warns on hot reload  
    port: 8080,
  },
  // advance misc config 
  cache: false,
  bail: true,
  profile: true,
  watch: false,
  watchOptions: {
    aggregateTimeout: 1000,
    poll: true,
    poll: 500
  }
};
