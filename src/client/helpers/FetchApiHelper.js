import db from '../Database';
import Validate from './Validate';

const SESSIONID_CONST = 'SESSIONID';
const PLATFORM_CONST = 'PLATFORM';
const validate = new Validate();

function FetchApiHelper() {

    function toJson(response) {
        if (!response || !response.ok) {
            return new Promise((resolve, reject) => {
                resolve({ statusCode: 'CLIENT_ERROR', message: 'Something went wrong. Please try again!' })
            })
        }
        return response.json();
    }

    function getParams(obj) {
        const sessionId = db.getValue(SESSIONID_CONST);
        let params = validate.isNotEmpty(sessionId) ? '?' + SESSIONID_CONST + '=' + sessionId : '';
        params += window.cordova && device && device.platform ?  '&' + PLATFORM_CONST + '=' + device.platform  : '';

        
        /* if(params === '?'){
            params += obj['sessionId'];
        } */
      

        if (validate.isNotEmpty(obj)) {
            Object.keys(obj).forEach(each => {
                if (each === 'DELIVERY_ADDRESS' && obj[each].indexOf('&') !== -1) {
                    params += '&' + each + '=' + encodeURIComponent(obj[each]);
                } else {
                    params += '&' + each + '=' + obj[each];
                }
            });
        }
        return params;
    }

    return {
        toJson,
        getParams
    }
}

export default FetchApiHelper();