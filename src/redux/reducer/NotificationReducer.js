export const TOGGLE_UNREAD_NOTIFICATIONS='TOGGLE_UNREAD_NOTIFICATIONS';


export default (state ={showNotificationAlert:false}, action) => {
    switch(action.type) {
        case TOGGLE_UNREAD_NOTIFICATIONS : 
            { 
                return {...state,...{showNotificationAlert:action.payload}};
            }     
        default : 
            return state;
    }
}