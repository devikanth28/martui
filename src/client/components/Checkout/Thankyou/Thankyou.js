import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import CheckoutAction from '../../../../redux/action/CheckoutAction';
import { UPDATE_MWALLET_ORDER_DETAILS } from '../../../../redux/reducer/CheckoutReducer';
import { addOrderItem } from '../../../Analytics/AdmitAd';
import { measureTransaction } from '../../../Analytics/Analytics';
import { SEP } from '../../../Analytics/AnalyticsConstant';
import CONFIG from '../../../constants/ServerConfig';
import CheckoutService from '../../../services/CheckoutService';
import Refill, { RefillSuccessModel } from '../../Checkout/Thankyou/Refill';
import ThankYouGhostImage from '../../Checkout/Thankyou/ThankYouGhostImage';
import ThankyouOrderView from '../../Checkout/Thankyou/ThankyouOrderView';
import Alert from '../../Common/Alert';
import LocalDB from '../../../DataBase/LocalDB';
import { getSelectedLocality } from '../../../../redux/action/LocalityAction';
import Validate from '../../../helpers/Validate';
import { isUserLoggedIn } from '../../../helpers/PaymentHelper';

const Thankyou = () => {

    const checkoutAction = CheckoutAction();
    const [isThankYouLoading, setThankYouLoading] = useState(false);
    const [orderSummary, setOrderSummary] = useState({});
    const [cartId, setCartId] = useState("");
    const [toggleModel, setToggleModel] = useState(false);
    const [refillLoading, setRefillLoading] = useState(false);
    const [refillShow, setRefillShow] = useState(false);
    const [toggleAnimation, setToggleAnimation] = useState("d-none");
    const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
    const dispatch = useDispatch();
    const selectedLocality = getSelectedLocality();
    const [refillId,setRefillId] = useState("");
    const isUserAvailable = isUserLoggedIn();
    useEffect(() => {
        setRefillId(LocalDB.getValue("refillCheckoutId"));
        getThankyouDetails();
    }, []);

   const getThankyouDetails = ()=> {
        setThankYouLoading(true);
        dispatch({type : UPDATE_MWALLET_ORDER_DETAILS, data : {}});
        CheckoutService().getOrderSummaryForThankyou().then(response => {
            if(response != null && response.dataObject != null && response.statusCode === "SUCCESS") {
                if(response.dataObject.PAYMENT_AWAITED_FLAG == null || !response.dataObject.PAYMENT_AWAITED_FLAG){
                    setToggleAnimation("");
                    setTimeout(function(){ setToggleAnimation("d-none"); }, 2500);
                }
                setOrderSummary(response.dataObject);
                let orderDetails = response.dataObject.orderList;
				let firstOrderId = '';
				let firstOrderTotal = '';
				let secondOrderId = ''
				let secondOrderTotal = ''
                try{
                    let orderString = ''
                    let orderTotal = 0
                    let productList = [];
                    orderDetails.map((each) => {
                        orderString += orderString?SEP:''
                        orderString += each.displayOrderId
                        orderTotal += each.orderTotal
                        each.omsOrderItem.map((eachItem) => {
                            productList.push({productId:eachItem.productId, productName: eachItem.productName, packSizeQty : eachItem.quantity/ eachItem.packSize,mrp:eachItem.mrp})
                        })
						if(firstOrderId == '') {
							firstOrderId = each.displayOrderId;
							firstOrderTotal = each.orderAmount;
						} else {
							secondOrderId = each.displayOrderId;
							secondOrderTotal = each.orderAmount;
						}
                    })
                    LocalDB.removeValue("refillCheckoutId");
                    LocalDB.removeValue("isMartCheckoutInitiated");
                    measureTransaction(productList, orderString, orderTotal)
                }catch(err){
                    console.log(err);
                }
                try{
                    addOrderItem(firstOrderId,firstOrderTotal,secondOrderId,secondOrderTotal);
                }catch(err){
                    console.log(err);
                }
                if(response.dataObject.orderList != null && response.dataObject.orderList[0] != null){
                    setCartId(response.dataObject.orderList[0].cartId);
                }
                if(Validate().isEmpty(refillId) && (selectedLocality?.codAllowed || response.dataObject.orderList[0].deliveryType == "S") && ! response.dataObject.orderList[0].communityDropOff && isUserAvailable){
                    setRefillShow(true);
                }
            }else if(response != null && response.statusCode == 'FAILURE'){
                 window.location.href = CONFIG.REDIRECT_HOME_URL;
            }
            setThankYouLoading(false);
        }).catch(function(error) {
            setThankYouLoading(false);
            console.log(error);
        });
        checkoutAction.resetCheckoutDetails();
   }

   const createRefillOrder = () => {
        if(!isUserAvailable){
            return;
        }
       if(refillInterval == null || refillInterval == "" || refillInterval == "0" ){
            setAlertInfo({message: "Please Select Refill Interval", type: ""});
            return;
        }
        setRefillLoading(true);
        CheckoutService().createRefillOrder(refillInterval,cartId).then(response => {
            if(response != null && response.dataObject != null && response.statusCode === "SUCCESS") {
                setToggleModel(true);
            }else if(response != null && response.statusCode == 'FAILURE'){
                setAlertInfo({message: response.message, type: ""});
            }
            setRefillLoading(false);
        }).catch(function(error) {
            setRefillLoading(false);
            console.log(error);
        });
   }

   const toggleRefillModel = () => {
    setToggleModel(!toggleModel);
    } 
  
    const [refillInterval , setRefillInterval] = useState("0");
    const selectRefillInterval = (interval) => {
        setRefillInterval(interval);
    }  
    const goToHome = () => {
         window.location.href = CONFIG.REDIRECT_HOME_URL;
    }

    const closeAlertMessage = () => {
        setAlertInfo({message:"", type:""});
    }

   return (
    <React.Fragment>
        
       <main role="main" className={`container-lg container-fluid${isUserAvailable ? "" : ' checkout'}`}>
        { isThankYouLoading && <ThankYouGhostImage  isThankYouLoading={isThankYouLoading} isRefillHeader={true}/>}
        { !isThankYouLoading && orderSummary &&
            <div className="row no-gutters">
                <div className={`success-animation ${toggleAnimation}`}>
                    <div className="success-tick-container fadeIn animated delay01s">
                        <div>
                            <svg className="check-ani" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2" height="130">
                                <circle className="path circle1" fill="none" stroke="#08ce73" strokeWidth="6" strokeMiterlimit="10" cx="65.1" cy="65.1" r="62.1"></circle>
                                <polyline className="path check" fill="none" stroke="#08ce73" strokeWidth="6" strokeLinecap="round" strokeMiterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 "></polyline>
                            </svg>
                            <h2>Done</h2>
                            <h3>Order successfully placed</h3>
                        </div>
                    </div>
                </div>
                <div className={`col-8 pl-0 pr-2 ${refillShow ? "" : "mx-auto" }`}>
                    <ThankyouOrderView orderSummary={orderSummary}></ThankyouOrderView>
                </div>
                {isUserAvailable && refillShow &&
                <React.Fragment>
                    <div className="col-4 pl-2 pr-0">
                        <Refill selectRefillInterval={selectRefillInterval} refillInterval={refillInterval}></Refill>
                    </div>
                    <RefillSuccessModel toggleModel={toggleModel} toggleRefillModel={toggleRefillModel} refillInterval={refillInterval}></RefillSuccessModel> 
                </React.Fragment>
                }
            </div>
             } 
            
        </main>
        { !isThankYouLoading  && orderSummary.orderList && 
        
            <footer className="footer fixed-bottom mt-auto py-2" style={{paddingRight: "15px"}}>
                <div className="container-lg container-fluid px-3">
                    <div className="row align-items-center no-gutters">
                        <div className="col-12 text-right">
                            <button type="button" className="brand-secondary btn px-5 rounded-pill custom-btn-lg" onClick={goToHome}>Continue Shopping</button>
                            {refillShow &&
                            <button type="submit" className="btn btn-brand-gradient ml-3 px-5 rounded-pill custom-btn-lg" onClick={createRefillOrder} disabled={refillInterval == "0" || refillLoading}>
                                 {refillLoading ? "" : "Proceed"}
                                    {refillLoading &&
                                        <React.Fragment>
                                            <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                                            <span className="sr-only"></span>
                                        </React.Fragment>
                                    }
                            </button>
                            }
                        </div>
                    </div>
                </div>
            </footer>
        }
        { alertInfo && alertInfo.message && <Alert alertInfo={alertInfo} onDurationEnd={closeAlertMessage} duration='5000'/>}
    </React.Fragment>
   )
}

export default Thankyou;