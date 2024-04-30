const dotenv = require("dotenv");
const path = require("path");
const fs = require('fs');



module.exports.config = function () {


    const defaultConfig = dotenv.config({
        path: path.resolve(__dirname, './.env.production')
    }).parsed;

    const clientManifestPath = path.resolve("public", "client", "client-assets-manifest.json");

    let clientManifest = JSON.parse(fs.readFileSync(clientManifestPath));

    const env = {
        'main.js': `${defaultConfig.ASSETS_URL}${clientManifest['main.js'].startsWith("/") ? clientManifest['main.js'].trim().substring(1, clientManifest['main.js'].length) : clientManifest['main.js']}`,
        'main.css': `${defaultConfig.ASSETS_URL}${clientManifest['main.css'].startsWith("/") ? clientManifest['main.css'].trim().substring(1, clientManifest['main.css'].length) : clientManifest['main.css']}`,
        'vendor.js': `${defaultConfig.ASSETS_URL}${clientManifest['vendor.js'].startsWith("/") ? clientManifest['vendor.js'].trim().substring(1, clientManifest['vendor.js'].length) : clientManifest['vendor.js']}`,
        port: `${defaultConfig.port}`,
        appName: `${defaultConfig.appName}`,
        API_URL: `${defaultConfig.API_URL}`,
        SEO_URL: `${defaultConfig.SEO_URL}`,
        BOT_WEBSOCKET_URL: `${defaultConfig.BOT_WEBSOCKET_URL}`,
        ASSETS_URL: `${defaultConfig.ASSETS_URL}`,
        GTM_ID :`${defaultConfig.GTM_ID}`

    }

    fs.writeFileSync(`./public/client/app-config.json`, JSON.stringify(env), 'utf-8');



};