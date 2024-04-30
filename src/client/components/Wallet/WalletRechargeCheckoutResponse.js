import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutService from "../../services/CheckoutService";
import qs from 'qs';

import React from 'react';
import { UPDATE_MWALLET_ORDER_DETAILS } from "../../../redux/reducer/CheckoutReducer";
const WalletRechargeCheckoutResponse = (props) => {

    const dispatch = useDispatch();
    const mWalletDetails = useSelector(state=>state.checkout.mWalletDetails);
    let params =qs.parse(props.location.search, {ignoreQueryPrefix: true});
    let walletRechargeParams = params;
    useEffect(()=>{
        if(walletRechargeParams.status=== "failure"){
            if(walletRechargeParams.requestFrom === "MART_CHECKOUT"){
                props.history.push({
                    pathname:'/walletPayment',
                    errorData: { errorMsg: walletRechargeParams.message},
                });
                // props.history.push(`/mCart/walletRecharge/reloadFailed/${walletRechargeParams.message}`);
            }
        }
        else if(walletRechargeParams.status=== "success"){
            if(walletRechargeParams.requestFrom === "MART_CHECKOUT"){
                let retryOrderId = null;
                let paymentObj = {
                    paymentType:"O",
                    instrument:"MW",
                    PAYMENT_MODE:"MW",
                }
                let martCheckObj = {MODE:"MW"}
                if(mWalletDetails?.retryOrderId){
                    retryOrderId = mWalletDetails.retryOrderId;
                    try{
                        if(retryOrderId && retryOrderId.length>0){
                            sendRetryPaymentEvent(true);
                        }
                    }catch(err){
                        console.log(err);
                    }
                }
                CheckoutService().omsOrderCreationProcess(mWalletDetails?.isPayback ? paymentObj : martCheckObj,retryOrderId,mWalletDetails?.isPayback).then((response)=>{
                    if(response != null && response.statusCode != null && response.statusCode === "SUCCESS"){
                    dispatch({type: UPDATE_MWALLET_ORDER_DETAILS, data:  response.dataObject});
                        props.history.push(retryOrderId ? '/walletPayment/'+retryOrderId : '/walletPayment');
                    }else{
                        props.history.push("/myWallet/");
                    }
                })
            }else{
                props.history.push("/myWallet/");
            }
        }
    },[])
    return (
        <React.Fragment>
            <table align='center'>
                <tr><td><strong>Transaction is being processed,</strong></td></tr>
                <tr><td><font color='blue'>Please wait ...</font></td></tr>
                <tr><td>(Please do not press 'Refresh' or 'Back' button)</td></tr>
            </table>
        </React.Fragment>
    );

}
export default WalletRechargeCheckoutResponse;