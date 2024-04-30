import compression from 'compression';
import dotenv from "dotenv";
import express from 'express';
// import logger from 'morgan';
import path from "path";
import Loadable from 'react-loadable';
import serverRenderer from './helpers/renderer';
import utils from "./helpers/utils.js";


global.path = path;
global.dotenv = dotenv;
const router = express.Router();

utils.loadENV();
const app = express();
// app.use(logger('combined'));
app.use(compression());

app.use(express.Router().get('^/$', serverRenderer));
// // app.use(express.Router().get('/temp', serverRenderer));
// app.use(express.Router().get('/storeLocator', serverRenderer));
// app.use(express.Router().get('/register', serverRenderer));
// console.log(path.resolve(process.cwd(), 'public'));
// app.use(router.get('/', serverRenderer));
// app.get('/', function (req, res, next) {
//     next({}) // try change to next(new Error('Something wrong')) and see the log
// });
// app.get('/', serverRenderer);
// app.get('/home', serverRenderer);
// app.get('/storeLocator', serverRenderer);
// app.get('/login', serverRenderer);
// app.get('/myAccount', serverRenderer);
// app.get('/mergeAccounts', serverRenderer);
app.use(express.static(path.resolve(process.cwd(), 'public')));
// app.get('*', serverRenderer);
app.use(serverRenderer);

/*app.get('/mCart/checkAvailability', (req, res) => {
    res.send('Express to the rescue!');
});*/
Loadable.preloadAll().then(() => {
    app.listen(process.env.port, () => {
        utils.log(`Server has started and is listening on port ${process.env.port}!`)
    });
});
