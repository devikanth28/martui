import React, {useEffect, useState} from "react";
import NotificationModal from "../components/Common/NotificationModal";
import CommonHeaderService from "../services/CommonHeaderService";
import Validate from "../helpers/Validate";
import UserInfoAction from "../../redux/action/UserInfoAction";
import { useDispatch, useSelector } from "react-redux";
import { toggleUnReadNotifications } from "../../redux/action/NotificationAction";

const NotificationBell = () => {
    const toggleNotificationModal = () => setNotificationModal(!isNotificationModal);
    const [isNotificationModal, setNotificationModal] = useState(false);
    const [notification, setNotification] = useState({});
    const [loader, setLoader] = useState(true);
    const dispatch = useDispatch();

    const hasunReadNotifications = useSelector(state=>state && state.unReadNotifications && state.unReadNotifications.showNotificationAlert);


    const commonHeaderService = CommonHeaderService();  
    const validate = Validate();
    const userInfoAction = UserInfoAction();
    var userInfo = userInfoAction.getUserInfo();

    const getNotification = () => {
        toggleNotificationModal();
        setLoader(true);
        getNotificationData();
    }

    useEffect(()=>{
        if(validate.isNotEmpty(userInfo) && !hasunReadNotifications){
            getUnreadNotificationCount();
        }
    },[])

    const getUnreadNotificationCount  = ()=> {
    commonHeaderService.getUnreadNotificationCount().then(res=> {
        if(res && res.statusCode=='SUCCESS'){
            const  unReadNotify =  res.dataObject && parseInt(res.dataObject)>0 ? true : false;
             dispatch(toggleUnReadNotifications(unReadNotify));
        }
    }).catch(err=> {
        console.log(err);
    })
    }

    const getNotificationData = () => {
        commonHeaderService.getCustomerNotifications().then(response => {
            if(validate.isNotEmpty(response) && response.statusCode === "SUCCESS") {
                if(validate.isNotEmpty(response.dataObject) && validate.isNotEmpty(response.dataObject.notifications)) {
                    setNotification(response.dataObject.notifications);
                    updateNotificationAction("READ", response.dataObject.notifications);
                } else if(validate.isEmpty(response.dataObject.notifications)) {
                     setNotification({});
                     dispatch(toggleUnReadNotifications(false));
                }
            }
            setLoader(false);
        }).catch(function(error) {
            console.log(error);
            setLoader(false);
        });
    }

    const updateNotificationAction = (action, notifications) => {
        let notificationData = {};
        notificationData["customerId"] = userInfo.medplusId;
        let messages = [];
        if(validate.isNotEmpty(notifications) && validate.isNotEmpty(notifications.messages)) {
            notifications.messages.map(eachNotification => {
                let notificationInfo = {};
                if(("READ" == action && eachNotification.action == 'UNREAD') || "DELETED" == action) {
                    notificationInfo["messageId"] = eachNotification.messageId;
                    notificationInfo["action"] = action;
                    messages.push(notificationInfo);
                }
            })
        }
        notificationData["messages"] = messages;
        if(validate.isNotEmpty(messages) && validate.isNotEmpty(userInfo) && validate.isNotEmpty(userInfo.medplusId)) {
            commonHeaderService.updateCustomerNotification({notificationData: JSON.stringify(notificationData)}).then(response => {
                if(validate.isNotEmpty(response) && "SUCCESS" == response) {
                    dispatch(toggleUnReadNotifications(false));
                    getNotificationData();
                }
            }).catch(function(error) {
                console.log(error);
            });
        }
        setLoader(false);
    }

    const deleteAllNotifications = (notifications) => {
        if(validate.isNotEmpty(notifications) && validate.isNotEmpty(notifications.messages) && notifications.messages.length > 0) {
            setLoader(true);
            updateNotificationAction("DELETED", notifications);
        }
    }

    const launchNotification = (redirctUrl) => {
        if(validate.isNotEmpty(redirctUrl)){
            window.location.href = redirctUrl;
        }
    }

    return (
        <React.Fragment>
            <button className="mx-2 btn px-2 border-0" title='notifications' onClick={() => getNotification()} >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="26" viewBox="0 0 20.576 26.004">
                    <path fill="#343a40" d="M73.586,20.694a4.04,4.04,0,0,1-1.228-1.672,19.345,19.345,0,0,1-1.28-7.644c0-.01,0-.02,0-.029a7.378,7.378,0,0,0-4.343-6.692V2.9A2.9,2.9,0,0,0,63.842,0H63.6A2.9,2.9,0,0,0,60.71,2.9v1.76a7.378,7.378,0,0,0-4.344,6.721,19.345,19.345,0,0,1-1.28,7.644,4.04,4.04,0,0,1-1.228,1.672.741.741,0,0,0-.407.842.775.775,0,0,0,.764.6H59.8a3.922,3.922,0,0,0,7.844,0h5.584a.775.775,0,0,0,.764-.6A.741.741,0,0,0,73.586,20.694ZM62.234,2.9A1.371,1.371,0,0,1,63.6,1.526h.24A1.371,1.371,0,0,1,65.21,2.9V4.162a7.379,7.379,0,0,0-2.976,0V2.9Zm1.488,21.581a2.4,2.4,0,0,1-2.4-2.346h4.8A2.4,2.4,0,0,1,63.722,24.478Zm3.068-3.872H55.952a7.984,7.984,0,0,0,.4-.7,19.288,19.288,0,0,0,1.539-8.527,5.832,5.832,0,1,1,11.663,0c0,.009,0,.019,0,.028a19.249,19.249,0,0,0,1.539,8.5,7.992,7.992,0,0,0,.4.7Z" transform="translate(-53.434)"></path>
                </svg>
                {hasunReadNotifications && <span className="notification-dot"></span>}
            </button>
            { isNotificationModal && <NotificationModal loader={loader} launchNotification={launchNotification} notifications={notification} isModelOpen={isNotificationModal} toggleNotificationModal={toggleNotificationModal} deleteAllNotifications={deleteAllNotifications}></NotificationModal> }
        </React.Fragment>
    )
}
export default NotificationBell;