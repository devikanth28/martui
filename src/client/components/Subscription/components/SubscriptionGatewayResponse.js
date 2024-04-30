import qs from 'qs';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { isUserLoggedIn } from '../../../helpers/PaymentHelper';
import { MEDPLUS_ADVANTAGE_URL_PREFIX } from '../constants/SubscriptionConstants';


const SubscriptionGatewayResponse=(props)=>{
    const orderIds = useSelector(state=>{
        if(state && state.subscription && state.subscription.orderId){
            return state.subscription.orderId;
        }
    })
    const isUserAvailable = isUserLoggedIn();
    useEffect(()=>{
        let params =qs.parse(props.location.search, {ignoreQueryPrefix: true});
        let responseMessage=params.RESPONSE_MESSAGE;
        let responseStatus= params.RESPONSE_TYPE;
        if("SUCCESS" === responseStatus || "PENDING" === responseStatus){
            if(!isUserAvailable){
                window.location.replace(`${MEDPLUS_ADVANTAGE_URL_PREFIX}/subscription/uathankyou`);
                return;
            }
            props.history.replace(`${MEDPLUS_ADVANTAGE_URL_PREFIX}/subscription/thankyou`);
        }else{
            if(!isUserAvailable){
                window.location.replace(`/ua-payment-failed?orderType=MA`);
                return;
            }
            props.history.replace({pathname:`${MEDPLUS_ADVANTAGE_URL_PREFIX}/subscription/payment/${orderIds[0]}`,errorData:{gatewayResponse:responseMessage}});
        }

        
    },[])
    return(
        <table align='center'>
                <tr><td><strong>Transaction is being processed,</strong></td></tr>
                <tr><td><font color='blue'>Please wait ...</font></td></tr>
                <tr><td>(Please do not press 'Refresh' or 'Back' button)</td></tr>
           </table> 
    );
}
export default SubscriptionGatewayResponse;