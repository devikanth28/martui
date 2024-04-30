const md5File = require('md5-file');
const path = require('path');
const ASSET_MANIFEST = require('../../public/asset-manifest.json');

// CSS styles will be imported on load and that complicates matters... ignore those bad boys!
const ignoreStyles = require('ignore-styles');
const register = ignoreStyles.default;

// We also want to ignore all image requests
// When running locally these will load from a standard import
// When running on the server, we want to load via their hashed version in the build folder
const extensions = ['.gif', '.jpeg', '.jpg', '.png', '.svg'];

// Override the default style ignorer, also modifying all image requests
register(ignoreStyles.DEFAULT_EXTENSIONS, (mod, filename) => {
    if (!extensions.find(f => filename.endsWith(f))) {
        // If we find a style
        return ignoreStyles.noOp();
    } else {
        let bn = path.basename(filename);
        /* if(!filename.endsWith('.svg')){
            const hash = md5File.sync(filename).slice(0, 8);
            bn = path.basename(filename).replace(/(\.\w{3})$/, `.${hash}$1`);
        } */
        // mod.exports = `/images/${bn}`;
        // mod.exports = `${assestsUrl}images/${bn}`;
        mod.exports = ASSET_MANIFEST[`images/${bn}`]
    }
});

// require('@babel/polyfill');
// require('@babel/register')({
//     ignore: [/\/(public|node_modules)\//],
//     presets: ['env', 'react'],
//     plugins: [
//         '@babel/plugin-syntax-dynamic-import',
//         'dynamic-import-node',
//         'react-loadable/babel'
//     ]
// });
// require('./index');

require('ignore-styles');

require('babel-register')({
    ignore: [/\/(public|node_modules)\//],
    plugins: [
        ["babel-plugin-styled-components", { "ssr": true, "displayName": false, "preprocess": false, "minify": true, "transpileTemplateLiterals": true, "pure" : true }],
        'syntax-dynamic-import',
        'dynamic-import-node',
        'react-loadable/babel',
        'transform-decorators-legacy',
        'transform-class-properties',
        'transform-object-rest-spread',
        "transform-regenerator",
    ],
    presets: ['env', 'react'],
});

require('./index');

/* require('ignore-styles');
// require('url-loader');
// require('file-loader');
require('@babel/register')({
    ignore: [/(node_modules)/],
    presets: ['env', 'react', 'stage-0'],
    plugins: [
        // "transform-decorators-legacy",
        // "transform-class-properties",
        // "transform-object-rest-spread",
        "syntax-dynamic-import",
        "dynamic-import-node",
        "react-loadable/babel"
    ]
});

require('./index'); */