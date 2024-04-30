import { TOGGLE_UNREAD_NOTIFICATIONS } from "../reducer/NotificationReducer";
 

    export  const toggleUnReadNotifications= (data)=>{
        return {
                type : TOGGLE_UNREAD_NOTIFICATIONS,
                payload : data
            };
    }


