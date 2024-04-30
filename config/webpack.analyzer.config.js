const clientConfig = require("./webpack.client.config");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

clientConfig.plugins.push(new BundleAnalyzerPlugin());

module.exports = clientConfig;