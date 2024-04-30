import ServerRequest from '../../client/axios'
import CONFIG from '../constants/ServerConfig';
import { func } from 'prop-types';

export default function ProductSearchService() {

    function getProductAutoSuggestions(searchText,searchType) {
        return ServerRequest(CONFIG.API.COMMON_HEADER.GET_PRODUCT_SUGGESTIONS.HEADER.method, {searchText: searchText,searchType:searchType,rows:15}, CONFIG.API.COMMON_HEADER.GET_PRODUCT_SUGGESTIONS.PATH);
    }

    function getCompositionSuggestions(searchText) {
        return ServerRequest(CONFIG.API.COMMON_HEADER.GET_COMPOSITION_SUGGESTIONS.HEADER.method, {searchText: searchText,rows:2}, CONFIG.API.COMMON_HEADER.GET_COMPOSITION_SUGGESTIONS.PATH);
    }

    return Object.freeze({
        getProductAutoSuggestions,
        getCompositionSuggestions
    });
}

