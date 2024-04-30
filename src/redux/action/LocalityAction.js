import { useSelector } from 'react-redux';
import { SET_SELECTED_LOCALITY,SET_LAB_SELECTED_LOCALITY, SET_COMMUNITY_CITIES, RESET_SELECTED_LOCALITY, SET_COMMUNITIES_FOR_HUBID_PINCODE} from '../reducer/LocalityReducer';
import {SET_COOKIE_VERSION_IN_REDUX} from '../reducer/CookieVersionReducer';
import LocalityService from '../../client/services/LocalityService';
import Validate from '../../client/helpers/Validate';
import { RESET_MART_CATALOG_DATA, SET_MART_CATALOG_DATA, SET_MART_CATALOG_VERSION_NO } from '../reducer/MedplusCatalogReducer';
import MartCatalogService from '../../client/MedplusMart/services/MartCatalogService';

const localityService = LocalityService();
const validate = Validate();
const martCatalogService = MartCatalogService();

export const reloadSelectedLocalityInfo = async (isFromLabShoppingCart,isLabPage,dispatch,martCatalogVersionNo, selectedLocality) => {
    await new Promise((resolve, reject)=>{
        localityService.getSelectedLocalityInfo().then(response => {
            if(response != null && "SUCCESS" == response.statusCode) {
                dispatch({
                    type: SET_SELECTED_LOCALITY,
                    data: response.dataObject.locInfo
                });
                dispatch({
                    type: SET_LAB_SELECTED_LOCALITY,
                    data: response.dataObject.labLocalityInfo
                });
            } else if("FAILURE" == response.statusCode) {
                console.log("Error: "+ response.message);
            }
            resolve();
        }).catch(function(error) {
            console.log("Error :", error);
            reject(error);
        });
    })
}

export const setSelectedLocality = (selectedLocality) => {
    return dispatch => {
        dispatch({
            type: SET_SELECTED_LOCALITY,
            data: selectedLocality
        });
    }
}

export const getSelectedLocality = () => {
    const locality = useSelector(state => state.locality);
    let selectedLocality = {};
    if(validate.isNotEmpty(locality)) {
        selectedLocality = locality.selectedLocality;
    }
    return selectedLocality;
}

export const getMembershipConfig = () =>{
    const locality = useSelector(state => state.locality);
       let membershipConfig = {}
    if(validate.isNotEmpty(locality)) {
       membershipConfig = locality.selectedLocality.membershipConfig;
    }
    return membershipConfig;
}


export const getLabSelectedLocality = () => {
    const locality = useSelector(state => state.locality);
    let selectedLocality = {};
    if(validate.isNotEmpty(locality)) {
        selectedLocality = locality.labSelectedLocality;
    }
    return selectedLocality;
}

export const getMartCatalogVersionNo = () => {
    return useSelector((state) => (validate.isNotEmpty(state) && validate.isNotEmpty(state.medplusCatalog) && validate.isNotEmpty(state.medplusCatalog.martCatalogVersionNo)) ? state.medplusCatalog.martCatalogVersionNo : {});
}

export const setRecentlySearchLocalities = (recentlySearchLocalities) => {
    return dispatch => {
        dispatch({
            type: SET_RECENTLY_SEARCH_LOCALITY,
            data: recentlySearchLocalities
        });
    }
}

export const getRecentlySearchLocalities = () => {
    const locality = useSelector(state => state.locality);
    let recentlySearchLocalities = [];
    if(validate.isNotEmpty(locality)) {
        recentlySearchLocalities = locality.recentlySearchLocalities;
    }
    return recentlySearchLocalities;
}

export const getCommunitiesForHubId = () => {
    const locality = useSelector(state => state.locality);
    let communitiesForHubId = {};
    if(validate.isNotEmpty(locality)) {
        communitiesForHubId = locality.communitiesForHubId;
    }
    return communitiesForHubId;
}

export const resetLocality = () => {
    return dispatch => {
        dispatch({
            type: RESET_SELECTED_LOCALITY
        });
    }
}


export const setCookieVersionInRedux = (cookieVersion) => {
    return dispatch => {
        dispatch({
            type: SET_COOKIE_VERSION_IN_REDUX,
            data: cookieVersion
        })
    }
} 
