import axios from "axios";
import CONFIG from "../constants/ServerConfig";
import QueryString from "qs";

export default function FcmService() {

    async function saveToken(obj) {
        let response = await axios.post(CONFIG.API.FCM.SAVE_TOKEN_INFO.PATH, QueryString.stringify(obj)).then((response) => {
            if(response.status !== 200){
                return new Promise((resolve) => {
                    return resolve({statusCode: 'CLIENT_ERROR', message: 'Something went wrong. Please try again!'});
                })
            }
            return response.data;
        });
        return  response;
    }

    return Object.freeze({
        saveToken
    });
}