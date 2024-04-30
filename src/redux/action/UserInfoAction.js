import { useSelector, useDispatch } from 'react-redux';
import { SET_USER_INFO, RESET_USER_INFO , RESET_USER_CONTACT_DETAILS , SET_USER_CONTACT_DETAILS } from '../reducer/UserInfoReducer';
import MyAccountService from '../../client/services/MyAccountService';
import Validate from '../../client/helpers/Validate';
import LocalDB from '../../client/DataBase/LocalDB';

export default function UserInfoAction() {

    const myAccountService = MyAccountService();
    const validate = Validate();
    const dispatch = useDispatch();
    const userDetails = useSelector(state => state.userInfo);

    function resetUserInfo(){
       return dispatch({ type: RESET_USER_INFO });
    }
     function setUserInfo(userInfo){
        return  dispatch({ type: SET_USER_INFO, data: userInfo });
         
    }
    function getUserInfo(){
        let userInfo = {};
        if(validate.isNotEmpty(userDetails) && validate.isNotEmpty(userDetails.userInfo)) {
            userInfo = userDetails.userInfo;
        }
        return userInfo;
    }
    async function reloadUserInfo(){
        await new Promise((resolve, reject)=>{
            myAccountService.getLoggedInUserInfo().then(response => {
                if(response != null && response.statusCode != null && "SUCCESS" == response.statusCode) {
                    if(validate.isNotEmpty(response.dataObject.userInfo)) {
                        dispatch({
                            type: SET_USER_INFO,
                            data: response.dataObject.userInfo
                        });
                        if(validate.isNotEmpty(response.dataObject.userContactDetails)){
                            dispatch({
                                type: SET_USER_CONTACT_DETAILS,
                                data: response.dataObject.userContactDetails
                            });
                        }
                        if(validate.isNotEmpty(response.dataObject.userInfo.medplusId)){
                            LocalDB.setValue("customerId", response.dataObject.userInfo.medplusId);
                        } else {
                            LocalDB.removeValue("customerId");
                        }
                        
                    } else {
                        dispatch({ type: RESET_USER_INFO });
                        
                    }
                    if(validate.isNotEmpty(response.dataObject.userContactDetails)) {
                        dispatch({
                            type: SET_USER_CONTACT_DETAILS,
                            data: response.dataObject.userContactDetails
                        });
                       
                    } else {
                        dispatch({ type: RESET_USER_CONTACT_DETAILS });
                        
                    }
                    resolve();
                }else{
                    dispatch({ type: RESET_USER_INFO });
                    dispatch({ type: RESET_USER_CONTACT_DETAILS });
                    resolve();
                }
            }).catch(function(error) {
                console.log(error);
                reject(error);
            })
        })
    }
    function resetUserContactDetails(){
        return dispatch({ type: RESET_USER_CONTACT_DETAILS });
     }
     function setUserContactDetails(userContactDetails){
         return dispatch({ type: SET_USER_CONTACT_DETAILS, data: userContactDetails });
     }
     function getUserContactDetails(){
        let userContactDetails = {};
        if(validate.isNotEmpty(userDetails) && validate.isNotEmpty(userDetails.userContactDetails)) {
            userContactDetails = userDetails.userContactDetails;
        }
        return userContactDetails;
     }
    return Object.freeze({
        resetUserInfo,
        setUserInfo,
        getUserInfo,
        reloadUserInfo,
        resetUserContactDetails,
        setUserContactDetails,
        getUserContactDetails
    });
}


