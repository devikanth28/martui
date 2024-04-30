import React, { useEffect} from 'react';
import CheckoutService from '../../services/CheckoutService';
import { sendRetryPaymentEvent } from '../../Analytics/Analytics';
import { useDispatch } from 'react-redux';
import { SET_CART_ID } from '../../../redux/reducer/CheckoutReducer';
import Validate from '../../helpers/Validate';

const WalletRechargeResponse = (props)=>{

    const dispatch = useDispatch();
    let walletRechargeParams = props.match.params;
    useEffect(()=>{
        if(walletRechargeParams.status=== "failure"){
            if(walletRechargeParams.fromPage === "ORDER_REVIEW" || walletRechargeParams.fromPage ==="PAYBACK_ORDER_REVIEW"){
                props.history.push({
                    pathname:'/walletPayment',
                    errorData: { errorMsg: walletRechargeParams.message},
                    state:{
                        isPayback: walletRechargeParams.fromPage ==="PAYBACK_ORDER_REVIEW"
                    }
                });
                // props.history.push(`/mCart/walletRecharge/reloadFailed/${walletRechargeParams.message}`);
            } else{
                props.history.push({
                    pathname:'/myWallet',
                    errorData: { errorMsg: walletRechargeParams.message},
                    state:{
                        isPayback: walletRechargeParams.fromPage ==="PAYBACK_ORDER_REVIEW"
                    }
                });
                // props.history.push(`/mCart/profileWalletRecharge/${walletRechargeParams.sessionId}/${walletRechargeParams.status}/${walletRechargeParams.message}`);
            }
        }
        if(walletRechargeParams.status=== "success"){
            if(walletRechargeParams.fromPage === "ORDER_REVIEW" || walletRechargeParams.fromPage ==="PAYBACK_ORDER_REVIEW"){
                let retryOrderId = null;
                let paymentObj = {
                    paymentType:"O",
                    instrument:"MW",
                    PAYMENT_MODE:"MW",
                }
                if(walletRechargeParams && walletRechargeParams.retryOrderId){
                    retryOrderId = walletRechargeParams.retryOrderId;
                    try{
                        if(retryOrderId && retryOrderId.length>0){
                            sendRetryPaymentEvent(true);
                        }
                    }catch(err){
                        console.log(err);
                    }
                }
                CheckoutService().omsOrderCreationProcess(paymentObj,retryOrderId,walletRechargeParams.fromPage ==="PAYBACK_ORDER_REVIEW").then((response)=>{
                    if(response != null && response.statusCode != null && response.statusCode === "SUCCESS"){
                        dispatch({type: SET_CART_ID, data: (Validate().isNotEmpty(retryOrderId) || walletRechargeParams.fromPage !=="PAYBACK_ORDER_REVIEW") ? response.responseData.orderList[0].cartId : response.dataObject.orderList[0].cartId});
                        props.history.push(retryOrderId?'/walletPayment/'+retryOrderId:'/walletPayment',{isPayback:walletRechargeParams.fromPage ==="PAYBACK_ORDER_REVIEW"});
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

export default WalletRechargeResponse;