import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter  } from 'react-router-dom';
import { PersistGate } from 'redux-persist/lib/integration/react';
import App from "./app.jsx";
import "./favicon.ico";
import { createBrowserHistory } from "history";
import store, { persistor } from '../redux/store';
import "./css/page-component.css";
import "./css/bootstrap.css";
import "./css/material-form.css";
import "./css/bootstrap-grid.css";
import "./css/bootstrap-reboot.css";
import './css/Typeahead.css';
import './CustomCssFiles/slick/slick.css';
import './CustomCssFiles/slick/slick-theme.css';
import RefreshCatalog from './commonComponents/RefreshCatalog.js';



const history = createBrowserHistory();
const Router = BrowserRouter;

function init () {
    ReactDOM.hydrate(
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Router history={history}>
                <RefreshCatalog>
                    <App />
                </RefreshCatalog>
                </Router>
            </PersistGate>
        </Provider>,
        document.getElementById('app')
    );
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./service-worker.js').then(registration => {
            console.log("Yes, sw got registered.");
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    }
}

init();
