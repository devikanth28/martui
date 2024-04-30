import { createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
import {rootReducer} from "./reducer/index";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const initialState = {};

const persistConfig = {
    key: 'medplus',
    storage: storage,
    stateReconciler: autoMergeLevel2,
    blacklist : ['purchaseHistory','doctorConsultation','breadCrumb','trackOrder','tokenValidateReducer','unReadNotifications']
};

const pReducer = persistReducer(persistConfig, rootReducer);
export const history = typeof history !== 'undefined' ? syncHistoryWithStore(browserHistory, store) : [];
const middleWare = applyMiddleware(routerMiddleware(history), thunk);
const store = createStore(pReducer, initialState, middleWare);

export default store;
export const persistor = persistStore(store);