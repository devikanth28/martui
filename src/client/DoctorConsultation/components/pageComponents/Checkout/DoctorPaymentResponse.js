import queryString from 'query-string';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { isUserLoggedIn } from '../../../../helpers/PaymentHelper';

const DoctorPaymentResponse = (props)=> {
    
    const orderId = useSelector(state=>{
        if(state && state.doctorConsultation && state.doctorConsultation.lastDoctorOrderId){
            return state.doctorConsultation.lastDoctorOrderId;
        }
    })
    const isUserAvailable = isUserLoggedIn()

    useEffect(()=>{
            let params=queryString.parse(props.location.search);
            let responseMessage=params.RESPONSE_MESSAGE;
            let responseStatus= params.RESPONSE_TYPE;
            if("SUCCESS" === responseStatus || "PENDING" === responseStatus){
                if(!isUserAvailable){
                    window.location.replace(`/doctorconsultation/ua-thankyou`);
                    return;
                }
                props.history.replace(`/doctorconsultation/thankyou`);
            }else{
                if(!isUserAvailable){
                    window.location.replace(`/ua-payment-failed?orderType=D`);
                    return;
                }
                props.history.replace({pathname:`/doctorconsultation/payments/${orderId}`,errorMsg: responseMessage});
            }
    },[]);

    return (
        <table align='center'>
            <tr><td><strong>Transaction is being processed</strong></td></tr>
            <tr><td><font color='blue'>Please wait ...</font></td></tr>
            <tr><td>(Please do not press 'Refresh' or 'Back' button)</td></tr>
        </table>
    );

}

export default DoctorPaymentResponse;
