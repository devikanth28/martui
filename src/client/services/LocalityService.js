import ServerRequest from '../../client/axios';
import CONFIG from '../constants/ServerConfig';
var base64 = require('base-64');


export default function LocalityService() {

    function getSelectedLocalityInfo() {
		return ServerRequest(CONFIG.API.LOCALITY.GET_SELECTED_LOCALITY_INFO.HEADER.method, {}, CONFIG.API.LOCALITY.GET_SELECTED_LOCALITY_INFO.PATH);
    }

    function getLocalityAutoSuggestions(searchText) {
        return ServerRequest(CONFIG.API.LOCALITY.GET_LOCALITY_AUTO_SUGGESTIONS.HEADER.method, { localitySearchStr: base64.encode(searchText) }, CONFIG.API.LOCALITY.GET_LOCALITY_AUTO_SUGGESTIONS.PATH);
    }

    function getRecentlySearchLocality(){
        return ServerRequest(CONFIG.API.LOCALITY.GET_RECENTLY_SEARCH_LOCALITY.HEADER.method, {}, CONFIG.API.LOCALITY.GET_RECENTLY_SEARCH_LOCALITY.PATH);
    }

    function setSelectedLocality(location) {
        return ServerRequest(CONFIG.API.LOCALITY.SET_SELECTED_LOCALITY.HEADER.method,{ locationInfo: location }, CONFIG.API.LOCALITY.SET_SELECTED_LOCALITY.PATH)
    }

    function getCityCommunities(city) {
        return ServerRequest(CONFIG.API.LOCALITY.GET_CITY_COMMUNITIES.HEADER.method, {city: city}, CONFIG.API.LOCALITY.GET_CITY_COMMUNITIES.PATH);
    }

    function setCommunityLocality(configId) {
        return ServerRequest(CONFIG.API.LOCALITY.SET_COMMUNITY_LOCALITY.HEADER.method, {configId: configId}, CONFIG.API.LOCALITY.SET_COMMUNITY_LOCALITY.PATH);
    }

    function getCurrentLocation(lat,lng){
        return ServerRequest(CONFIG.API.LOCALITY.SET_CURRENT_LOCATION.HEADER.method, {lat: lat, lng: lng}, CONFIG.API.LOCALITY.SET_CURRENT_LOCATION.PATH);
    }

    function getLocalityDetailsForChangeAddressModel(placeId){
        return ServerRequest(CONFIG.API.LOCALITY.GET_LOCALITY_DETAILS_FOR_CHANGE_ADDRESS.HEADER.method, {placeId: placeId}, CONFIG.API.LOCALITY.GET_LOCALITY_DETAILS_FOR_CHANGE_ADDRESS.PATH);
    }

    return Object.freeze({
        getSelectedLocalityInfo,
        getLocalityAutoSuggestions,
        getRecentlySearchLocality,
        setSelectedLocality,
        getCityCommunities,
        setCommunityLocality,
        getCurrentLocation,
        getLocalityDetailsForChangeAddressModel
    });
}