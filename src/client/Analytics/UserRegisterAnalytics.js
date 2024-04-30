import LocalDB from "../DataBase/LocalDB";

const version = 1;
const googleAnalyticsId = "UA-48460519-1";
const analyticsUrl = "https://www.google-analytics.com/collect?";
const sessionId = LocalDB.getValue("SESSIONID");
const hostName = "https://www.medplusmart.com/";
const constUrl = analyticsUrl + "v=" + version + "&tid=" + googleAnalyticsId + "&cid=" + sessionId + "&dh=" + hostName + "&ds=app" + "&t=";
let basicUrlStr = constUrl;

export const sendRegistrationSuccessEvent = (customerID) => {
    let eventCategory = 'W_REGISTRATION';

    try{
        basicUrlStr = constUrl;
        basicUrlStr += "event";
        basicUrlStr += `&ec=${eventCategory}&ea=SUCCESSFULL_REGISTRATION_${customerID}&el=SUCCESSFULL_REGISTRATION_${customerID}&promo1nm=SUCCESSFULL_REGISTRATION_${customerID}&promoa=click`;
        sendHttpRequest(basicUrlStr);
    }catch(err){

    }
}

const sendHttpRequest = (url) => {
    const Http = new XMLHttpRequest();
    Http.open("GET", url);
    Http.send();

    Http.onreadystatechange = (e) => {
        
    }
}