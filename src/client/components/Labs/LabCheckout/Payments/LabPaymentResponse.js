import queryString from 'query-string';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Validate from '../../../../helpers/Validate';
import CheckoutService from '../../../../services/CheckoutService';
import { DIAGNOSTICS_URL_PREFIX } from '../../../MedplusLabs/constants/LabConstants';
import { isUserLoggedIn } from '../../../../helpers/PaymentHelper';

const LabPaymentResponse = (props)=> {
    const validate = Validate();
    
    const orderId = useSelector(state=>{
        if(state && state.labCheckout && state.labCheckout.labOrderId){
            return state.labCheckout.labOrderId;
        }
    })

    const isUserAvailable = isUserLoggedIn();

    useEffect(()=>{
            let params=queryString.parse(props.location.search);
            let responseMessage=params.RESPONSE_MESSAGE;
            let responseStatus= params.RESPONSE_TYPE;
            let referenceId = params.REFERENCE_ID;
            if(props.isMart){
                getOrderTypeAndHandleRedirection(referenceId,responseStatus,responseMessage);
            }
            else {
                handleRedirection(null,responseStatus,referenceId,responseMessage);
            }  
    },[]);


    const getOrderTypeAndHandleRedirection = (referenceId,responseStatus,responseMessage)=> {
        CheckoutService().getOrderType({'cartId' : referenceId}).then(response=>{
            let isPaybackOrder = false;
            if(response && response.statusCode =='SUCCESS'){
                if("PAYBACK_ORDER" == response.dataObject){
                    isPaybackOrder=true;
                }
            }
            handleRedirection(isPaybackOrder,responseStatus,referenceId,responseMessage);
        }).catch(err=>{
            console.log(err);
            props.history.push('/');
        });
    }
    const handleRedirection = (isPaybackOrder,responseStatus,referenceId,responseMessage)=> {
        if("SUCCESS" === responseStatus || "PENDING" === responseStatus){
            if(props.isMart){
                if(!isUserAvailable){
                    window.location.replace(isPaybackOrder ?`/payback/thankyou` : `/ua-thankyou`);
                    return;
                }
                props.history.replace( {pathname : isPaybackOrder ?`/payback/thankyou` : `/thankyou`,cartId : referenceId});
            }
            else{
                if(!isUserAvailable){
                    window.location.replace(`${DIAGNOSTICS_URL_PREFIX}/lab-ua-thank-you`);
                    return;
                }
                props.history.replace(`${DIAGNOSTICS_URL_PREFIX}/lab-thank-you`);
            }
        }else{
            if(props.isMart){
                if(!isUserAvailable){
                    window.location.replace(`/ua-payment-failed?orderType=M`);
                    return;
                }
                if(validate.isEmpty(referenceId)){
                    props.history.replace({pathname:`/payment`,errorMsg: responseMessage});
                }
                else{
                    props.history.replace({pathname:`/payment/${referenceId}`,errorMsg: responseMessage});
                }
            }
            else {
                if(!isUserAvailable){
                    window.location.replace(`/ua-payment-failed?orderType=L`);
                    return;
                }
                props.history.replace({pathname:`${DIAGNOSTICS_URL_PREFIX}/lab-payment/${orderId}`,errorMsg: responseMessage});
            }
        }
    }

    return (
        <table align='center'>
            <tr><td><strong>Transaction is being processed,</strong></td></tr>
            <tr><td><font color='blue'>Please wait ...</font></td></tr>
            <tr><td>(Please do not press 'Refresh' or 'Back' button)</td></tr>
        </table>
    );

}

export default LabPaymentResponse;
