export const PUSH_BREADCRUMB='PUSH_BREADCRUMB';
export const CLEAR_BREADCRUMB='CLEAR_BREADCRUMB';


export default (state =[], action) => {
    switch(action.type) {
        case PUSH_BREADCRUMB : 
            { 
                return Array.isArray(action.payload) ? action.payload : [action.payload] ;
            }
        case CLEAR_BREADCRUMB : 
            {
                return [];
            }       
        default : 
            return state;
    }
}