import fs from 'fs';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Helmet } from 'react-helmet';
import Loadable from 'react-loadable';
import { StaticRouter } from 'react-router';
import App from '../../client/app.jsx';
import {ServerStyleSheet} from 'styled-components';
import store, { history } from '../../redux/store';
import { Provider } from 'react-redux';
import { getSeoString } from './SeoHelper.js';

// const request = require('request');

// const path = require("path");
// const fs = require("fs");

const globalStyleTag = `
  <style>*,::after,::before{box-sizing:border-box}body{margin:0;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",lato,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";font-size:1rem;font-weight:400;line-height:1.5;color:#313131;text-align:left;background-color:rgba(0,0,0,.03);font-display:swap;background:rgba(0,0,0,.03);background-size:85%;background-attachment:fixed;height:100%}article,aside,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}p{margin-top:0;margin-bottom:1rem}h1,h2,h3,h4,h5,h6{margin-top:0;margin-bottom:.5rem}.h1,.h2,.h3,.h4,.h5,.h6,h1,h2,h3,h4,h5,h6{margin-bottom:.5rem;font-family:inherit;font-weight:500;line-height:1.2;color:inherit}.h1,h1{font-size:2.5rem}.h2,h2{font-size:2rem}.h3,h3{font-size:1.75rem}.h4,h4{font-size:1.5rem}.h5,h5{font-size:1.25rem}.h6,h6{font-size:1rem}a{color:#2699fb;text-decoration:none;background-color:transparent;-webkit-text-decoration-skip:objects}a:hover{color:#0056b3;text-decoration:none}a:not([href]):not([tabindex]){color:inherit;text-decoration:none}a:not([href]):not([tabindex]):focus,a:not([href]):not([tabindex]):hover{color:inherit;text-decoration:none}a:not([href]):not([tabindex]):focus{outline:0}@media screen and (prefers-reduced-motion:reduce){.btn{transition:none}}.btn:focus,.btn:hover{text-decoration:none}.btn.focus,.btn:focus{outline:0;box-shadow:0 0 0 0 rgba(0,123,255,.25)}.btn.disabled,.btn:disabled{opacity:.65}.btn:not(:disabled):not(.disabled){cursor:pointer}.btn:not(:disabled):not(.disabled).active,.btn:not(:disabled):not(.disabled):active{background-image:none}@media (min-width:576px){.modal-dialog{max-width:500px;margin:1.75rem auto}.modal-dialog-centered{min-height:calc(100% - (1.75rem * 2))}.modal-sm{max-width:300px}}img{vertical-align:middle;border-style:none}svg:not(:root){overflow:hidden}button{border-radius:0}button:focus{outline:1px dotted;outline:5px auto -webkit-focus-ring-color}button,input,optgroup,select,textarea{margin:0;font-family:inherit;font-size:inherit;line-height:inherit}button,input{overflow:visible}button,select{text-transform:none}a,button{position:relative;overflow:hidden}[type=reset],[type=submit],button,html [type=button]{-webkit-appearance:button}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{padding:0;border-style:none}hr{box-sizing:content-box;height:0;overflow:visible;margin-top:1rem;margin-bottom:1rem;border:0;border-top:1px solid rgba(0,0,0,.1)}h2.title{position:relative;font-size:1.2rem;color:rgba(0,0,0,.97);margin-bottom:20px}dl,ol,ul{margin-top:0;margin-bottom:1rem}.small,small{font-size:80%;font-weight:400}</style>
`
const sheet = new ServerStyleSheet();
const extractCssAsset = (assets, chunk) => Object.keys(assets)
  .filter(asset => chunk.indexOf(asset) > -1)
  .map(k => assets[k]);

const extractAllCssAsset = (assets) => Object.keys(assets)
.filter(asset => asset.indexOf(".css") > -1)
.map(k => assets[k]);

const extractJsChunk = (assets, chunk) => Object.keys(assets)
  .filter(asset => chunk.indexOf(asset.replace('.js', '')) > -1)
  .map(k => assets[k]);

export default async (req, res, next) => {
  console.log('request url : ',req.url);
  res.cookie('isFCMinit', '');
  let manifest = ``;
  if (req.url !== '/service-worker.js' || ((req.url).indexOf('/js/') === -1 || req.url.indexOf('.chunk.js') === -1)) {
    let seoData = "";
     const helmet = Helmet.renderStatic();
    if (req.url.indexOf('manifest') == -1){
      console.log('url - ',req.url);
      try {
        const cookie = req.headers.cookie;

        await Promise.all([getSeoString(req.url, cookie)]).then(async (data) => {
          seoData = await data[0].toString();
        });
      } catch (err) {
        console.log(err);
      }
    }
    let cookieMap = {};
    if (req.headers.cookie && req.headers.cookie.length > 0) {
      req.headers.cookie.split('; ').forEach(eachCookie => {
        let arr = eachCookie.split('=');
        cookieMap[arr[0]] = arr[1];
      });
    }

    let appVersion = req.query.app_bundle_version;
    let manifestFilePath = path.resolve(process.cwd(), 'public/'+appVersion, 'asset-manifest.json');
    if(!fs.existsSync(manifestFilePath)){
      manifestFilePath = path.resolve(process.cwd(), 'public', 'asset-manifest.json');
    }
    manifest = JSON.parse(fs.readFileSync(manifestFilePath));
    let filePath = ``;

    filePath = path.resolve(process.cwd(), 'public', 'index.html');


    if(!fs.existsSync(filePath)){
      filePath = path.resolve(process.cwd(), 'public', 'index.html');
    }

    fs.readFile(filePath, 'utf8', (err, htmlData) => {
      if (err) {
        console.error('err', err);
        next(err);
      }
      const modules = [];
      const context = {};
      let html = ``;
      html = ReactDOMServer.renderToString(sheet.collectStyles(
        <Loadable.Capture report={moduleName => modules.push(moduleName)}>
            {/* <PersistGate loading={null} persistor={persistor}> */}
            <Provider store={store}>
              <StaticRouter location={req.url} context={context} history={history}>
                <React.Fragment>
                  <App />
                </React.Fragment>
              </StaticRouter>
            </Provider>
            {/* </PersistGate> */}
        </Loadable.Capture>
      ));
      const styleTags = sheet.getStyleTags();

     let cssChunkLink = ``;
     let cssChunkLinkPreload = ``;
     if(req.url === "/"){
       let cssChunk = extractCssAsset(manifest, "main.css");
       htmlData = htmlData.replace(`<link href="${cssChunk}" rel="stylesheet">` , ``);
       let cssChunkList = extractAllCssAsset(manifest);
       cssChunkList.map(each => {
          cssChunkLink += `<link href="${each}" rel="preload" as="style"> ` 
       });

      }else {
        const cssName = 'main.css';
        const cssChunk = extractCssAsset(manifest, cssName);
        cssChunkLink = `<link href="${cssChunk}" rel="stylesheet">`;
      }

     

      let platform;
      htmlData = htmlData.replace('<!DOCTYPE html>', `<!DOCTYPE html ${helmet.htmlAttributes.toString()}>`);
      if(req.url.indexOf('manifest') === -1){
        htmlData = htmlData.replace(/<title>.*?<\/title>/g, '');
        htmlData=htmlData.replace('<link rel=canonical href=https://www.medplusmart.com/ >',``);
        htmlData = htmlData.replace(/<meta.*?>/g,``);
       }     
      //htmlData = htmlData.replace(cssChunk, '');
      htmlData = htmlData.replace('</head>', `${helmet.meta.toString()} ${`<script>window.__INITIAL__DATA__ = ${JSON.stringify(manifest)}`}</script> ${globalStyleTag} ${styleTags}</head>`);
      htmlData = htmlData.replace(`<div id=app></div>`, `<div id="app">${html}</div>${cssChunkLink}`);
      htmlData = htmlData.replace('<head>',`<head>${seoData !== undefined && seoData !== "" ? seoData :  ""}`);
      return res.send(htmlData)
    })
  } else {
    next();
  }
}
