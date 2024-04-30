import axios from 'axios';
import qs from 'qs';
import Validate from '../helpers/Validate';
import CONFIG from '../constants/ServerConfig';
import store from '../../redux/store';
import { RESET_CHECKOUT_DETAILS } from '../../redux/reducer/CheckoutReducer';
import LocalDB from '../../client/DataBase/LocalDB';
import { SET_TOKEN_VALIDATE } from '../../redux/reducer/TokenValidateReducer';
import { removeCustomerDetailsFromRedux } from '../helpers/CommonUtil';


const axiosBaseApi = axios.create({
    baseURL: process.env.API_URL,
    withCredentials: true
});

axiosBaseApi.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';
axiosBaseApi.defaults.headers.common['x-requested-with'] = 'XMLHttpRequest';

axiosBaseApi.interceptors.request.use((config) => {
        let token_from_LocalStorage = LocalDB.getValue("SESSIONID");
        let customerId_from_LocalStorage = LocalDB.getValue('customerId');
        let requestMethod = config.method;
        let paramsObj = undefined;
        var data = {};
        if(requestMethod==='POST' || requestMethod==='post' || requestMethod==='PATCH' || requestMethod==='patch'){
            paramsObj = {...config.data};
            Object.keys(paramsObj).forEach((each, index) => {
                if(Array.isArray(paramsObj[each])){
                    var arr = paramsObj[each];
                    var strData = '';
                    arr.forEach((each, index) => {strData += (each+ ((index !== arr.length-1) ? "," : "")) });
                    data[each] = strData;
                }else{
                    if(each === "PASSWORD" || each === "password" || each === "confirmpwd" || each === "oldPassword" || each === "confirmPwd"){
                        data[each] = encodeURIComponent(paramsObj[each]);
                    }else if(paramsObj[each] && typeof paramsObj[each] === "string" && (paramsObj[each].indexOf("+") !== -1 || paramsObj[each].indexOf("&") !== -1)){
                        data[each] = encodeURIComponent(paramsObj[each]);
                    }else{
                        data[each] = paramsObj[each];
                    }
                }
            });

            data["tokenId"]=token_from_LocalStorage?token_from_LocalStorage : paramsObj["tokenId"] ? paramsObj["tokenId"] : "";
            data["customerId"]=customerId_from_LocalStorage?customerId_from_LocalStorage : "";
            data["timeStapm"] = new Date();
            config["data"] = decodeURIComponent(qs.stringify(data));
        }
        if(requestMethod==='GET' || requestMethod==='get'){
            paramsObj = {...config.params};
            paramsObj["tokenId"]=token_from_LocalStorage?token_from_LocalStorage : paramsObj["tokenId"] ? paramsObj["tokenId"] : "";
            paramsObj["customerId"]=customerId_from_LocalStorage;
            paramsObj["timeStapm"]= new Date();
            config["params"] = paramsObj;
        }
        return config;
    },(err) => {
        Promise.reject(err)
    }
);

axiosBaseApi.interceptors.response.use((response) => {
    if(response.status !== 200){
        return new Promise((resolve) => {
            return resolve({statusCode: 'CLIENT_ERROR', message: 'Something went wrong. Please try again!'});
        })
    }
    if (response.status == 200 && response.data && response.data.statusCode == "FAILURE" && response.data.message == "EMPTY_CART") {
        store.dispatch({ type: RESET_CHECKOUT_DETAILS });
        if (window.location.pathname.includes("shoppingCart") || !LocalDB.getValue("isMartCheckoutInitiated")) {
            window.location.href = CONFIG.REDIRECT_HOME_URL;
        }else {
            window.location.href = CONFIG.REDIRECT_HOME_URL + "shoppingCart";
        }
    }
    if(!(response.config && response.config.url && response.config.url == CONFIG.API.TOKEN.VALIDATE_TOKEN.PATH)   && (response.data.message === 'INVALID_SESSION' || response.data.message === 'INVALID_TOKEN')){
        store.dispatch({type : SET_TOKEN_VALIDATE, data : false});
        LocalDB.removeValue("SESSIONID");
        LocalDB.removeValue("b_token");
        LocalDB.removeValue("s_token");
        removeCustomerDetailsFromRedux();
        window.location.href = CONFIG.REDIRECT_HOME_URL
    } else if((response.data.isLoginError=="Y" || response.data.message == "INVALID_USER" ||  response.data.message == "INVALID_CUSTOMER") && window!=undefined ){
        removeCustomerDetailsFromRedux();
        if (window.location.href != CONFIG.REDIRECT_HOME_URL+ "signInPopUp") {
            LocalDB.setValue("toPage",-2);
            LocalDB.setValue("fromPage",window.location.href);
        }
        window.location.href = CONFIG.REDIRECT_HOME_URL+ "signInPopUp";
    }
    if(Validate().isNotEmpty(response.data.isRedirectToShoppingCart) && window!=undefined){
        window.location.href = CONFIG.REDIRECT_HOME_URL + "shoppingCart";
    }
    return response.data;
},(err)=>{
    console.log("Actual server Error:",err.response);
    let message = err.response.data.message;
    if(err.message === "Network Error"){
        return new Promise((resolve) => {
            return resolve({statusCode : "404", message: Validate().isNotEmpty(message)?message:"Network Error"});
        })
    }else if(err.response.status === 400){
        return new Promise((resolve) => {
            return resolve({statusCode : "404", message: Validate().isNotEmpty(message)?message:"Network Error"});
        })
    }
    return Promise.reject(err);
});

const serverRequest = (requestType , paramsObj, url) => {
    switch(requestType){
        case 'POST':
        case 'post':
            return axiosBaseApi.post(url,paramsObj);
        case 'GET':
        case 'get':
            return axiosBaseApi.get(url,{params:paramsObj});
        case 'PATCH':
        case 'patch':
        return axiosBaseApi.patch(url,paramsObj);
        default : return new Promise((resolve) => {
            return resolve({statusCode: 'FAILURE', message: 'Invalid request type. Please try again!'});
        })
    }
}
export default serverRequest;

export const uploadFilesToServer = (url, filesFormData, requestConfig) => {
    return axios.post(url, filesFormData, requestConfig).then((response)=>{
        if(response.status !== 200){
            return new Promise((resolve) => {
                return resolve({statusCode: 'CLIENT_ERROR', message: 'Something went wrong. Please try again!'});
            })
        }
        return response.data;
    })
}

export const getStaticHtml = (url) => {
    return axios.get(url).then((response)=>{
        if(response.status ==200) {
            return new Promise((resolve) => {
                return resolve({statusCode: 'SUCCESS', data: response.data});
            })
        } else {
            return new Promise((resolve) => {
                return resolve({statusCode: 'CLIENT_ERROR', message: 'Something went wrong. Please try again!'});
            })
        }
    })
}