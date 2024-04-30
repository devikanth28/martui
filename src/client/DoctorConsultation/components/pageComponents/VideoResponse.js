import React, { useEffect } from 'react';
import db from '../../../DataBase/LocalDB';
import qs from 'qs';
import Alert from '../../../components/Common/Alert';
import CONFIG from '../../../constants/ServerConfig';

export default (props) => {
    let params = qs.parse(props.location.search, {ignoreQueryPrefix: true});
    let responseMessage = params.RESPONSE_MESSAGE;
    let responseStatus = params.RESPONSE_STATUS;
    useEffect(() => {
        if(responseStatus === "FAILURE"|| responseStatus === "F" || responseStatus === "C" || responseStatus === "P"){
            setTimeout(() => {
                handleBack();
            }, 3000);
        }else{
           handleBack();
        }
    },[]);

    const handleBack = ()=>{
        let historyLength = db.getValue("historyLength");
        if(!historyLength){
            historyLength=0;
        }
        if(Number(historyLength) === 2){
            window.location.href=`${CONFIG.REDIRECT_HOME_URL}doctorconsultation`
        }else{
            const currentHistoryLength = window.history.length;
            let backRedirection = historyLength-currentHistoryLength-1;
            if(Math.abs(backRedirection) >= currentHistoryLength){
                backRedirection = -currentHistoryLength+1
            }
            window.history.go(backRedirection);
        }
    }

    const getAlertMessage= (status)=>{
        switch(status){
            case "FAILURE":
                return responseMessage;
            case "F":
                return "Your consultation is failed";
            case "P":
                return "Your consultation is pending, please try again after some time";
            case "C":
                return "Your consultation is cancelled";
            default:
                return "";

        }
    }

    if(responseStatus === "FAILURE" || responseStatus === "F" || responseStatus === "C" || responseStatus === "P"){
        return <React.Fragment>
              <Alert alertInfo={{message: getAlertMessage(responseStatus)}} duration={5000} onDurationEnd={()=>{}}/>
        </React.Fragment>
    }

    return <React.Fragment>

    </React.Fragment>
}