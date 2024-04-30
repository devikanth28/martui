import React, { useState, useEffect } from 'react';
import CheckoutAction from '../../../../redux/action/CheckoutAction';
import MyAccountService from '../../../services/MyAccountService';
import FlexiThankyouOrderSummary from '../FlexiRewards/FlexiThankyouOrderSummary';
import ThankYouGhostImage from '../../Checkout/Thankyou/ThankYouGhostImage';
import CONFIG from '../../../constants/ServerConfig';
import Alert from '../../Common/Alert';
import { SEP } from '../../../Analytics/AnalyticsConstant';
import { measureTransaction } from '../../../Analytics/Analytics';
import { useSelector } from 'react-redux';
import Validate from '../../../helpers/Validate';
import { PaybackContinueShoppingEvent , PaybackPointsHistoryEvent } from '../../../Analytics/Analytics';

const FlexiThankYou = (props) => {
    const checkoutAction = CheckoutAction();
    const [isThankYouLoading, setThankYouLoading] = useState(false);
    const [orderSummary, setOrderSummary] = useState({});
    const [toggleAnimation, setToggleAnimation] = useState("d-none");
    const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
    const myAccountService = MyAccountService();
    const [ paymentGatewayStatus, setPaymentGatewayStatus] = useState();
    const cartId = props.location.cartId || null;
    useEffect(() => {
        if(Validate().isEmpty(cartId)){
            window.location.href = CONFIG.REDIRECT_HOME_URL;
        } else {
            getThankyouDetails();
        }
    }, []);

   const getThankyouDetails = ()=> {
        setThankYouLoading(true);
        myAccountService.createGiftOrder(props.isPayback,cartId).then(response => {
            if(Validate().isNotEmpty(response) && Validate().isNotEmpty(response.dataObject) && response.statusCode === "SUCCESS") {
                if(response.dataObject.gatewayStatus === "S" || !props.isPayback){
                    setToggleAnimation("");
                    setTimeout(function(){ setToggleAnimation("d-none"); }, 2500);
                }
                setPaymentGatewayStatus(response.dataObject.gatewayStatus);
                setOrderSummary(response.dataObject);
                let orderDetails = response.dataObject.orderList;
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
                    })
                    measureTransaction(productList, orderString, orderTotal)
                }catch(err){
                    console.log(err);
                }
            }else if(response != null && response.statusCode == 'FAILURE'){
                setAlertInfo({ message: response.message, type: "" });
                window.location.href = CONFIG.REDIRECT_HOME_URL;
            }
            setThankYouLoading(false);
        }).catch(function(error) {
            setThankYouLoading(false);
            console.log(error);
            setAlertInfo({ message: "System experiencing some problem, Please try after some time", type: "" });
        });
        checkoutAction.resetCheckoutDetails();
   }

    const goToHome = () => {
        if(props.isPayback) {
            PaybackContinueShoppingEvent()
        }
        window.location.href = CONFIG.REDIRECT_HOME_URL;
    }

    const goToPointsHistory = () => {
        if(props.isPayback) {
            PaybackPointsHistoryEvent()
        }
        props.history.push('/payback/pointHistory')
    }

    const closeAlertMessage = () => {
        setAlertInfo({message:"", type:""});
    }

   return (
    <React.Fragment>
        
       <main role="main" className="container">
       <Alert alertInfo={alertInfo} duration={5000} onDurationEnd={setAlertInfo}/>
        { isThankYouLoading && <ThankYouGhostImage  isThankYouLoading={isThankYouLoading} isRefillHeader={true}/>}
        { !isThankYouLoading && orderSummary.selectedLocality && orderSummary.orderList &&
            <div className="row">
                <div className={`success-animation ${toggleAnimation}`}>
                    <div className="success-tick-container fadeIn animated delay01s">
                        <div>
                            <svg className="check-ani" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2" height="130">
                                <circle className="path circle1" fill="none" stroke="#08ce73" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1"></circle>
                                <polyline className="path check" fill="none" stroke="#08ce73" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 "></polyline>
                            </svg>
                            <h2>Done</h2>
                            <h3>Order successfully placed</h3>
                        </div>
                    </div>
                </div>
                <div className="col-8 pl-0 pr-2 mx-auto" >
                    <FlexiThankyouOrderSummary paymentGatewayStatus={paymentGatewayStatus} isPayback ={props.isPayback} orderSummary={orderSummary}></FlexiThankyouOrderSummary>
                </div>
            </div>
            }
            
        </main>
        { !isThankYouLoading && orderSummary.selectedLocality && orderSummary.orderList && 
            <footer className="footer fixed-bottom mt-auto py-2" style={{paddingRight: "15px"}}>
                <div className="container px-0">
                    <div className="row align-items-center no-gutters">
                        <div className="col-9 text-right">
                            <button type="button" className="brand-secondary btn px-5 rounded-pill custom-btn-lg" onClick={goToHome}>Continue Shopping</button>
                        </div>
                        <div className="col-3 text-right">
                            <button type="button" className="brand-secondary btn px-5 rounded-pill custom-btn-lg" onClick={()=>{goToPointsHistory()}}>Payback Points History</button>
                        </div>
                    </div>
                </div>
            </footer>
        }
        { alertInfo && alertInfo.message && <Alert alertInfo={alertInfo} onDurationEnd={closeAlertMessage} duration='5000'/>}
    </React.Fragment>
   )
}

export default FlexiThankYou;