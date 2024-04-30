import { combineReducers } from 'redux';
import cart from '../reducer/CartReducer';
import checkout from '../reducer/CheckoutReducer';
import locality from '../reducer/LocalityReducer';
import userInfo from '../reducer/UserInfoReducer';
import cookieVersion from '../reducer/CookieVersionReducer';
import purchaseHistory from '../reducer/PurchaseHistoryReducer';
import labOrdersInfo from '../reducer/LabOrderReducer';
import subscription from '../../client/components/Subscription/redux/SubscriptionReducer';
import labCheckout from '../../client/components/MedplusLabs/redux/reducer/LabNewCheckoutReducer';
import labCatalog from '../../client/components/MedplusLabs/redux/reducer/LabCatalogReducer';
import medplusCatalog from '../reducer/MedplusCatalogReducer';
import NotificationReducer from './NotificationReducer';
import doctorConsultation,{DOCTORS_CATALOG_LIST, DOCTOR_LIST, IS_RECORDS_COMPLETED, ONLINE_OR_NEARBY_DOCTOR_LIST, ONLINE_OR_NEARBY_DOCTOR_LIST_TOTAL_RECORDS, ONLINE_OR_NEARBY_DOCTOR_VISIT_TYPE, OTHER_DOCTOR_LIST, OTHER_DOCTOR_LIST_FILTER, OTHER_DOCTOR_LIST_VISIT_TYPE, SORT_AND_FILTER_STR} from "../../client/DoctorConsultation/redux/DoctorConsultationReducer";
import trackOrder from './TrackOrderReducer';
import breadCrumb from './BreadCrumbReducer';
import tokenValidateReducer from './TokenValidateReducer';
import versionConfigurationReducer from './VersionConfigurationReducer';

export const CLEAR_ALL = 'CLEAR_ALL';

import storage from 'redux-persist/lib/storage';
import {persistReducer} from 'redux-persist';

const purchaseHistoryConfig = {
    key: 'purchaseHistory',
    storage: storage,
    blacklist: ["nonPersistIncludedCanceledOrders", "nonPersistNormalOrders"]
}

const labOrdersConfig = {
    key: 'labOrdersInfo',
    storage: storage,
    blacklist: ["nonPersistLabOrders"]
}

const doctorsConfig = {
    key: 'doctorConsultation',
    storage: storage,
    blacklist: [DOCTORS_CATALOG_LIST, DOCTOR_LIST, OTHER_DOCTOR_LIST, OTHER_DOCTOR_LIST_VISIT_TYPE, IS_RECORDS_COMPLETED, ONLINE_OR_NEARBY_DOCTOR_LIST, ONLINE_OR_NEARBY_DOCTOR_LIST_TOTAL_RECORDS, ONLINE_OR_NEARBY_DOCTOR_VISIT_TYPE,SORT_AND_FILTER_STR,OTHER_DOCTOR_LIST_FILTER]
}

const appReducer = combineReducers({
    cart,
    checkout,
    locality,
    userInfo,
    breadCrumb,
    cookieVersion,
    subscription,
    labCheckout,
    labCatalog,
    medplusCatalog,
    purchaseHistory : persistReducer(purchaseHistoryConfig, purchaseHistory),
    labOrdersInfo : persistReducer(labOrdersConfig, labOrdersInfo),
    doctorConsultation: persistReducer(doctorsConfig,doctorConsultation),
    trackOrder,
    tokenValidateReducer,
    versionConfigurationReducer,
    unReadNotifications :  NotificationReducer
});

export const rootReducer = (state, action) => {
    if (action.type === CLEAR_ALL) {
        Object.keys(state).forEach(key => {
            window.localStorage.removeItem(`persist:${key}`);
        });
        state = {}
    }

    return appReducer(state, action)
}
