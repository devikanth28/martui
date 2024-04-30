import CONFIG from "../constants/ServerConfig";
import ServerRequest from '../axios'

export default function MetaDataService() {

const getMetaInformation=(data)=>{
    return ServerRequest(CONFIG.API.SEO.GET_META_INFORMATION.HEADER.method,data,CONFIG.API.SEO.GET_META_INFORMATION.PATH);
}

return Object.freeze({
    getMetaInformation
    });

}

