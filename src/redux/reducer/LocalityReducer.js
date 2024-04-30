export const SET_SELECTED_LOCALITY = 'SET_SELECTED_LOCALITY';
export const SET_LAB_SELECTED_LOCALITY = 'SET_LAB_SELECTED_LOCALITY';
export const SET_RECENTLY_SEARCH_LOCALITIES = 'SET_RECENTLY_SEARCH_LOCALITIES';
export const RESET_SELECTED_LOCALITY = 'RESET_SELECTED_LOCALITY';
export const SET_COMMUNITIES_FOR_HUBID_PINCODE = "SET_COMMUNITIES_FOR_HUBID_PINCODE";
export const SET_DOCTORS_CATEGORY_DATA_FOR_FOOTER = "SET_DOCTORS_CATEGORY_DATA_FOR_FOOTER";
const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_SELECTED_LOCALITY:
            return {
                ...state,
                selectedLocality: action.data
            };
        case SET_LAB_SELECTED_LOCALITY:
            return {
                ...state,
                labSelectedLocality: action.data
            };
        case SET_RECENTLY_SEARCH_LOCALITIES:
            return {
                ...state,
                recentlySearchLocalities: action.data
            };
        case SET_COMMUNITIES_FOR_HUBID_PINCODE:
            return {
                ...state,
                communitiesForHubId: action.data
            };
        case RESET_SELECTED_LOCALITY:
            return INITIAL_STATE;
        default:
            return state;
    }
}
