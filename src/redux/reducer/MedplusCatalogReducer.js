export const SET_LAB_CATALOG_DATA = 'SET_LAB_CATALOG_DATA';
export const SET_DOCTORS_CATALOG_DATA = 'SET_DOCTORS_CATALOG_DATA';
export const SET_MART_CATALOG_DATA = 'SET_MART_CATALOG_DATA';
export const RESET_MART_CATALOG_DATA = "RESET_MART_CATALOG_DATA";
export const SET_MART_CATALOG_VERSION_NO = "SET_MART_CATALOG_VERSION_NO";


export default (state = {}, action) => {
    const INITIAL_STATE = {}
    switch (action.type) {
        case SET_LAB_CATALOG_DATA:
            return {
                ...state,
                labCatalog: action.data
            };
        case SET_DOCTORS_CATALOG_DATA:
            return {
                ...state,
                doctorCatalog: action.data
            };
        case SET_MART_CATALOG_DATA:
            return {
                ...state,
                martCatalog : { 
                    ...state.martCatalog,
                    [action.catalogId] : action.data
                }
                
            };
        case SET_MART_CATALOG_VERSION_NO: 
            return{
                ...state,
                martCatalogVersionNo: action.data
            }
        case RESET_MART_CATALOG_DATA:
            let obj = {...state}
            delete obj.martCatalog
            return {...obj}
        default:
            return state;
    }
}