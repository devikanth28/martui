import serverRequest, { uploadFilesToServer } from '../axios'
import CONFIG from '../constants/ServerConfig';
import {getFileName, getFileNameByType} from '../helpers/CommonUtil';
import Validate from '../helpers/Validate';

export const IMAGE_TYPE_PRESCRIPTION = "P";
export const IMAGE_TYPE_WALLET_REFUND_REQUEST = "W";

export default function ImageProcessService() {

    function getImageServerDetail() {
        return serverRequest(CONFIG.API.IMAGE_PROCESS.GET_IMAGE_SERVER_DETAIL.HEADER.method, {}, CONFIG.API.IMAGE_PROCESS.GET_IMAGE_SERVER_DETAIL.PATH);
    }

    async function uploadFilesToImageServerForChat(filesToUpload, imageType, requestConfig) {
        let filesFormData = new FormData();
        for(const eachFile of filesToUpload) {
            if(eachFile.name){
                filesFormData.append('files', eachFile , getFileName(eachFile.name));
            } else {
                filesFormData.append('files', eachFile , getFileNameByType(eachFile.type));
            }
        }
        let returnObject = {"imageServerUrl" : "","uploadedData" : {}};
        const response = await getImageServerDetail();
        if(Validate().isNotEmpty(response) && response.statusCode == "SUCCESS" && Validate().isNotEmpty(response.dataObject)) {
            const imageServerDetail = response.dataObject.imageServerDetail;
            returnObject["imageServerUrl"] = imageServerDetail.imageServerUrl ;
            const url = imageServerDetail.imageServerUrl +"/upload?token="+ imageServerDetail.accessToken +"&clientId="+ imageServerDetail.clientId +"&imageType="+ imageType +"&vertical=W";
            returnObject["uploadedData"] = await uploadFilesToServer(url, filesFormData, requestConfig);
            return returnObject;
        } else {
            return new Promise((resolve) => {
                return resolve({statusCode: 'FAILURE', message: 'Something went wrong. Please try again!'});
            });
        }
    }

    async function uploadFilesToImageServer(filesToUpload, imageType, requestConfig) {
        let filesFormData = new FormData();
        for(const eachFile of filesToUpload) {
            if(eachFile.name){
                filesFormData.append('files', eachFile , getFileName(eachFile.name));
            } else {
                filesFormData.append('files', eachFile , getFileNameByType(eachFile.type));
            }
        }
        const response = await getImageServerDetail();
        if(Validate().isNotEmpty(response) && response.statusCode == "SUCCESS" && Validate().isNotEmpty(response.dataObject)) {
            const imageServerDetail = response.dataObject.imageServerDetail;
            const url = imageServerDetail.imageServerUrl +"/upload?token="+ imageServerDetail.accessToken +"&clientId="+ imageServerDetail.clientId +"&imageType="+ imageType +"&vertical=W";
            const uploadedImageData = await uploadFilesToServer(url, filesFormData, requestConfig);
            return new Promise((resolve) => {
                uploadedImageData['imageServerDetails'] = imageServerDetail;
                return resolve(uploadedImageData);
            });
        } else {
            return new Promise((resolve) => {
                return resolve({statusCode: 'FAILURE', message: 'Something went wrong. Please try again!'});
            });
        }
    }

    return Object.freeze({
        getImageServerDetail,
        uploadFilesToImageServer,
        uploadFilesToImageServerForChat
    });
}