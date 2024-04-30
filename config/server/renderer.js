import fs from 'fs';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from "react-router";
import { ServerStyleSheet } from "styled-components";
import App from "../../src/client/app.jsx";
import store from '../../src/redux/store.js';
import SubscriptionPlans from '../../src/client/components/Subscription/constants/SubscriptionPlans.js';
import { getSeoString } from '@medplus/mart-common-components/SeoHelper';



const globalStyleTag = `
  <style>*,::after,::before{box-sizing:border-box}body{margin:0;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",lato,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";font-size:1rem;font-weight:400;line-height:1.5;color:#313131;text-align:left;background-color:rgba(0,0,0,.03);font-display:swap;background:rgba(0,0,0,.03);background-size:85%;background-attachment:fixed;height:100%}article,aside,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}p{margin-top:0;margin-bottom:1rem}h1,h2,h3,h4,h5,h6{margin-top:0;margin-bottom:.5rem}.h1,.h2,.h3,.h4,.h5,.h6,h1,h2,h3,h4,h5,h6{margin-bottom:.5rem;font-family:inherit;font-weight:500;line-height:1.2;color:inherit}.h1,h1{font-size:2.5rem}.h2,h2{font-size:2rem}.h3,h3{font-size:1.75rem}.h4,h4{font-size:1.5rem}.h5,h5{font-size:1.25rem}.h6,h6{font-size:1rem}a{color:#2699fb;text-decoration:none;background-color:transparent;-webkit-text-decoration-skip:objects}a:hover{color:#0056b3;text-decoration:none}a:not([href]):not([tabindex]){color:inherit;text-decoration:none}a:not([href]):not([tabindex]):focus,a:not([href]):not([tabindex]):hover{color:inherit;text-decoration:none}a:not([href]):not([tabindex]):focus{outline:0}@media screen and (prefers-reduced-motion:reduce){.btn{transition:none}}.btn:focus,.btn:hover{text-decoration:none}.btn.focus,.btn:focus{outline:0;box-shadow:0 0 0 0 rgba(0,123,255,.25)}.btn.disabled,.btn:disabled{opacity:.65}.btn:not(:disabled):not(.disabled){cursor:pointer}.btn:not(:disabled):not(.disabled).active,.btn:not(:disabled):not(.disabled):active{background-image:none}@media (min-width:576px){.modal-dialog{max-width:500px;margin:1.75rem auto}.modal-dialog-centered{min-height:calc(100% - (1.75rem * 2))}.modal-sm{max-width:300px}}img{vertical-align:middle;border-style:none}svg:not(:root){overflow:hidden}button{border-radius:0}button:focus{outline:1px dotted;outline:5px auto -webkit-focus-ring-color}button,input,optgroup,select,textarea{margin:0;font-family:inherit;font-size:inherit;line-height:inherit}button,input{overflow:visible}button,select{text-transform:none}a,button{position:relative;overflow:hidden}[type=reset],[type=submit],button,html [type=button]{-webkit-appearance:button}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{padding:0;border-style:none}hr{box-sizing:content-box;height:0;overflow:visible;margin-top:1rem;margin-bottom:1rem;border:0;border-top:1px solid rgba(0,0,0,.1)}h2.title{position:relative;font-size:1.2rem;color:rgba(0,0,0,.97);margin-bottom:20px}dl,ol,ul{margin-top:0;margin-bottom:1rem}.small,small{font-size:80%;font-weight:400}</style>
`



const renderer = async (req, res, next) => {
    try {
        console.log('request url : ',req.url);
        const sheet = new ServerStyleSheet();

        let html = ReactDOMServer.renderToString(sheet.collectStyles(<Provider store={store}><StaticRouter location={req.url} context={{}}><App /></StaticRouter></Provider>));

        let clientManifestPath = path.resolve("public", "client", "app-config.json");


        let clientManifest = JSON.parse(fs.readFileSync(clientManifestPath));


        let main_js_script = `<script src="${clientManifest["main.js"]}"></script>`;
        let vendor_js_script = `<script src="${clientManifest["vendor.js"]}"></script>`;
        let main_css_link = `<link rel="stylesheet" href="${clientManifest["main.css"]}">`;

        let properties_inject_script = `<script>
                                        window.getChunkURL = function() {
                                            return "${clientManifest.ASSETS_URL}"
                                        };
                                        window["process"] = {
                                            env : ${JSON.stringify(clientManifest)}
                                        }
                                    </script>`;

        let seoData = ``;

        try {
            const cookie = req.headers.cookie;
            await Promise.all([getSeoString(req.url, cookie, SubscriptionPlans, false)]).then(async (data) => {
                seoData = await data[0].toString();
            });
        } catch (err) {
            console.log(err);
        }

        const styleTags = sheet.getStyleTags();

        res.send(`<!DOCTYPE html>
            <html lang="en">
                <head>
                    ${headString}
                    ${seoData !== undefined && seoData !== "" ? seoData : ""}
                    ${globalStyleTag} 
                    ${styleTags}
                    ${properties_inject_script}
                    ${main_css_link}
                </head>
                <body>
                	<noscript>
						You need to enable JavaScript to run this app.
					</noscript>
                    <div id='app'>${html}</div>
                    ${main_js_script}
                    ${vendor_js_script}
                   
                </body>
            </html>
	    `);
    } catch (err) {
        console.log(err);
        next();
    }
}

const headString = `
    <meta charset="utf-8">
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <link rel="shortcut icon"
        href="https://static1.medplusmart.com/medplusmart/assets/new_theme/web/images/favicon-mart.ico?v=a311f798f2fd7e99418f27fe3f12ae1c"
        type="image/x-icon">
    <link rel="icon" href="https://static1.medplusmart.com/medplusmart/assets/new_theme/web/images/favicon-mart.ico?v=a311f798f2fd7e99418f27fe3f12ae1c" type="image/x-icon">

    <link rel="dns-prefetch" href="//static1.medplusmart.com">
    <link rel="dns-prefetch" href="//static2.medplusmart.com">
    <link rel="dns-prefetch" href="//netdna.bootstrapcdn.com">
    <link rel="dns-prefetch" href="//www.google-analytics.com">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

    <link rel="apple-touch-icon" sizes="57x57" href="https://static1.medplusmart.com/medplusmart/assets/new_theme/mobile/images/favicon/apple-icon-57x57.png?v=eb7ada9e59eb9b9e842565bfd7e22c88">
    <link rel="apple-touch-icon" sizes="60x60" href="https://static1.medplusmart.com/medplusmart/assets/new_theme/mobile/images/favicon/apple-icon-60x60.png?v=f1a7ee659453669529b9784f37667078">
    <link rel="apple-touch-icon" sizes="72x72" href="https://static1.medplusmart.com/medplusmart/assets/new_theme/mobile/images/favicon/apple-icon-72x72.png?v=1d3ad201b5c88b9f0702e9a2980e3022">
    <link rel="apple-touch-icon" sizes="76x76" href="https://static1.medplusmart.com/medplusmart/assets/new_theme/mobile/images/favicon/apple-icon-76x76.png?v=f79953959583b6b9a35740d01d870110">
    <link rel="apple-touch-icon" sizes="114x114" href="https://static1.medplusmart.com/medplusmart/assets/new_theme/mobile/images/favicon/apple-icon-114x114.png?v=8128792fed978c66664086433982e466">
    <link rel="apple-touch-icon" sizes="120x120" href="https://static1.medplusmart.com/medplusmart/assets/new_theme/mobile/images/favicon/apple-icon-120x120.png?v=75eb0390914e1c06a5e50cd69eef7882">
    <link rel="apple-touch-icon" sizes="144x144" href="https://static1.medplusmart.com/medplusmart/assets/new_theme/mobile/images/favicon/apple-icon-144x144.png?v=c6506c2347fe7cee92e39f5d1ad3db87">
    <link rel="apple-touch-icon" sizes="152x152" href="https://static1.medplusmart.com/medplusmart/assets/new_theme/mobile/images/favicon/apple-icon-152x152.png?v=08838370a05423b07249c9c74e928c82">
    <link rel="apple-touch-icon" sizes="180x180" href="https://static1.medplusmart.com/medplusmart/assets/new_theme/mobile/images/favicon/apple-icon-180x180.png?v=8b38164a57c4d1f17a948b8d54c8aeb1">
    <link rel="icon" type="image/png" sizes="192x192" href="https://static1.medplusmart.com/medplusmart/assets/new_theme/mobile/images/favicon/android-icon-192x192.png?v=98b06619cb352ddfd0768e3b1d1fe798">
    <link rel="icon" type="image/png" sizes="192x192" href="https://static1.medplusmart.com/medplusmart/assets/new_theme/mobile/images/favicon/android-icon-512x512.png?v=317959ba760ffe79ef6c90bea835b084">
    <link rel="icon" type="image/png" sizes="32x32" href="https://static1.medplusmart.com/medplusmart/assets/new_theme/mobile/images/favicon/favicon-32x32.png?v=5b0b63523a99c0ab7e82fd1cca97073a">
    <link rel="icon" type="image/png" sizes="96x96" href="https://static1.medplusmart.com/medplusmart/assets/new_theme/mobile/images/favicon/favicon-96x96.png?v=f578e78c79343da079362b86a2e3e5b2">
    <link rel="icon" type="image/png" sizes="16x16" href="https://static1.medplusmart.com/medplusmart/assets/new_theme/mobile/images/favicon/favicon-16x16.png?v=715e1cb83e26d9565d723c7479ef706d">
    <link rel="manifest" href="https://www.medplusmart.com/manifest.json">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap" rel="stylesheet">
`

export default renderer;