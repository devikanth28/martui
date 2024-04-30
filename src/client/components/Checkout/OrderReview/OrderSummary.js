import React, { useState, useEffect } from 'react';
import CheckoutService from '../../../services/CheckoutService';
import Validate from '../../../helpers/Validate';
import OrderItems from './OrderItems';
import Promotion from './Promotion';
import OrderReviewGhostImage from './OrderReviewGhostImage';
import ReviewCartSummary from './ReviewCartSummary';
import DeliveryAddressDetail from './DeliveryAddressDetail';
import Alert from '../../Common/Alert';
import { checkoutStepsToAnalytics } from '../../../Analytics/Analytics';
import { Modal, ModalBody} from 'reactstrap';

const OrderDetails = (props) => {

    const validate = Validate();
    const [orderReviewDetails, setOrderReviewDetails] = useState({});
    const [pickStoreDetails, setPickStoreDetails] = useState({});
    const [productImageUrls, setProductImageUrls] = useState({});
    const [promotionBanners, setPromotionBanners] = useState({});
    const [promoType, setPromoType] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [failureMsg, setFailureMsg] = useState("");
    const [isOrderDetailsLoading, setOrderDetailsLoading] = useState(false);
    const [couponCode, setCouponCode] = useState("");
    const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
    const [isComplimentaryOrder,setComplimentryOrder] = useState(false);
    const [isRemoveComplimentaryModalOpen, setRemoveComplimentaryModalOpen] = useState(false);
    const [toastInfo,setToastInfo] = useState({ message: "", type: "", timeout: "3500" });
    const [newPromotionType,setNewPromotionType] = useState("");
   
    useEffect(() => {
        getOrderReviewDetails();
    }, []);

   const getOrderReviewDetails = ()=> {
        setOrderDetailsLoading(true);
        CheckoutService().getOrderSummary().then(response => {
            if(response != null && response.dataObject != null && response.statusCode === "SUCCESS") {
                setOrderReviewDetails(response.dataObject);
                if (response.dataObject.pickStoreDetails) {
                    setPickStoreDetails(response.dataObject.pickStoreDetails)
                }
                if (response.dataObject.productImageUrls) {
                    setProductImageUrls(response.dataObject.productImageUrls)
                }
                
                setPromoType(response.dataObject.promoType);
                getCouponCode(response.dataObject.orderList);
                setComplimentryOrder(response.dataObject.isComplimentaryOrder)
                setPromotionBanners(response.dataObject.promotionBannerDetails);
                if(response.dataObject.COMPLEMENTARY_QTY_ERROR != null){
                    setAlertInfo({message: response.dataObject.COMPLEMENTARY_QTY_ERROR, type: ""});
                }
                try{
                    let orderObj = response.dataObject.orderList;
                    let productList = [];
                    Promise.resolve(orderObj.map((eachOrder) => {
                        eachOrder.omsOrderItem.map((eachItem) => {
                            productList.push({productId:eachItem.productId, productName: eachItem.productName, packSizeQty : eachItem.quantity/ eachItem.packSize})
                        })
                    })).then(() => checkoutStepsToAnalytics(productList, 3));
                }catch(err){
                    console.log(err);
                }
            }else if(response != null && response.statusCode == 'FAILURE'){
                if("EMPTY_CART" == response.message){
                    props.history.push("/shoppingCart");
                }else{
                    setAlertInfo({message: response.message, type: ""});
                }
            }
            if (response?.dataObject?.errorQtyProductNames && !props?.location?.state?.isFromPaymentPage) {
                setToastInfo({message: response.dataObject.errorQtyProductNames, type: "", timeout: "10000"})
            }
            setOrderDetailsLoading(false);
        }).catch(function(error) {
            setOrderDetailsLoading(false);
            console.log(error);
        });
    }
    const getCouponCode = (orderList) => {
        if(orderList != null){
            if(orderList[0].couponCode != null && orderList[0].couponCode != ""){
                setCouponCode(orderList[0].couponCode);
                setSuccessMsg("Coupon Applied Successfully");
            }else if(orderList.length == 2 && orderList[1].couponCode != null && orderList[1].couponCode != ""){
                setCouponCode(orderList[1].couponCode );
                setSuccessMsg("Coupon Applied Successfully");
            }
        }
    }

    const applyPromotionType = (promotionType) => {
        setOrderDetailsLoading(true);
        setSuccessMsg("");
        setFailureMsg("");
        CheckoutService().applyPromotion(promotionType).then(response => {
            if (response != null && response.responseData != null && response.statusCode == 'SUCCESS') {
                setOrderReviewDetails(response.responseData);
                setPromoType(response.responseData.promoType);
                setComplimentryOrder(response.responseData.isComplimentaryOrder);
                setCouponCode("");
            }else if(response != null && response.statusCode == 'FAILURE'){
                setAlertInfo({message:response.message, type: ""});
            }
            setOrderDetailsLoading(false);
        }).catch(function(error) {
            setOrderDetailsLoading(false);
            console.log(error);
        });
    }

    const applyPromotion = (promotionType) => {
        if(promotionType == null || promotionType == ''){
            setAlertInfo({message:"Please select valid promotion type.", type: ""});
            return "Please select valid promotion type.";
        }
        setNewPromotionType(promotionType);
        if(isComplimentaryOrder){
            setRemoveComplimentaryModalOpen(!isRemoveComplimentaryModalOpen);
        }else{
            applyPromotionType(promotionType);
        }
    }

    

    const applyCouponCode = (coupon) => {
        if (coupon == null || coupon == '' || validate.isEmpty(coupon.trim())){
            setAlertInfo({message:"Please enter valid coupon Code", type: ""});
            return "Please enter valid coupon Code.";
        }
        setOrderDetailsLoading(true);
        CheckoutService().applyCoupon(coupon).then(response => {
            if (response != null && response.dataObject != null && response.statusCode == 'SUCCESS') {
                setOrderReviewDetails(response.dataObject);
                setSuccessMsg("Coupon Applied Successfully");
                getCouponCode(response.dataObject.orderList);
            }else if(response != null && response.statusCode == 'FAILURE' && validate.isEmpty(response.dataObject)){
                setFailureMsg(response.message);
                setCouponCode("");
            }else if(response != null && response.statusCode == 'FAILURE' && validate.isNotEmpty(response.dataObject) && response.dataObject == "true"){
                setToastInfo({message:"You have reached the maximum number of attempts, please try after some time.", type: "", timeout: "3500"});
            }
            setOrderDetailsLoading(false);
        }).catch(function(error) {
            setOrderDetailsLoading(false);
            console.log(error);
        });
    }

    const removeCouponCode = () => {
        setOrderDetailsLoading(true);
        CheckoutService().removeCoupon().then(response => {
            if (response != null && response.dataObject != null && response.statusCode == 'SUCCESS') {
                setOrderReviewDetails(response.dataObject);
                setSuccessMsg("");
                setFailureMsg("");
                setCouponCode("");
            }else if(response != null && response.statusCode == 'FAILURE'){
                setFailureMsg(response.message);
            }
            setOrderDetailsLoading(false);
        }).catch(function(error) {
            setOrderDetailsLoading(false);
            console.log(error);
        });
    }

    const goBackAction = () => {
        if (orderReviewDetails != null && orderReviewDetails.orderList != null){
            props.history.push('/delivery');
        } else {
            props.history.push("/shoppingCart");
        }
       
    }
    const goPayment = () => {
        props.history.push('/payment');
    }
   
    const closeAlertMessage = () => {
        setAlertInfo({message:"", type:""});
    }

    const toggleRemoveComplimentaryModal = () => setRemoveComplimentaryModalOpen(!isRemoveComplimentaryModalOpen);
    const proceedWithRemoveComplimentary = (promotionType) => {
        setRemoveComplimentaryModalOpen(!isRemoveComplimentaryModalOpen);
        applyPromotionType(promotionType);
    }

    const proceedWithDefaultPromotion = () => {
        setRemoveComplimentaryModalOpen(!isRemoveComplimentaryModalOpen);
    }

    return (
        <React.Fragment>
            <main role="main" className="container-fluid container-lg">
                <div className="row no-gutters">
                    {(isOrderDetailsLoading) && <OrderReviewGhostImage isOrderDetailsLoading={isOrderDetailsLoading}/> }
                    {!isOrderDetailsLoading && validate.isNotEmpty(orderReviewDetails) && <OrderItems productImageUrls={productImageUrls} orderReviewDetails={orderReviewDetails}/>}
                    {(!isOrderDetailsLoading) &&
                        <div className="col-4 pl-2 pr-0">
                            {!isOrderDetailsLoading && validate.isNotEmpty(promotionBanners) && 
                                <Promotion promotionBanners={promotionBanners}
                                    applyPromotion={applyPromotion}  promotionType={promoType} 
                                    applyCouponCode={applyCouponCode} removeCouponCode={removeCouponCode} 
                                    applyCouponSuccessMsg={successMsg} applyCouponFailureMsg={failureMsg}
                                    couponCode = {couponCode}
                                />
                            }
                            {!isOrderDetailsLoading && validate.isNotEmpty(orderReviewDetails) &&
                                <React.Fragment>
                                    <ReviewCartSummary orderReviewDetails={orderReviewDetails} couponCode = {couponCode}/>
                                    {validate.isNotEmpty(orderReviewDetails.orderList) && 
                                        <DeliveryAddressDetail orderDetails={orderReviewDetails.orderList[0]} pickStoreDetails={pickStoreDetails} freeShippingAmount={orderReviewDetails.freeShippingAmount}/>
                                    }
                                </React.Fragment>
                            }
                        </div>
                    }
                </div>
            </main>
            {!isOrderDetailsLoading  && orderReviewDetails && 
                <footer className="footer fixed-bottom mt-auto py-2">
                    <div className="container-lg container-fluid px-3">
                        <div className="row align-items-center no-gutters">
                            <div className="col-12 text-right">
                                <button type="button" className="brand-secondary btn px-5 rounded-pill custom-btn-lg" onClick={() =>  goBackAction()}>Back</button>
                                {orderReviewDetails.orderList && 
                                <button type="submit" className="btn btn-brand-gradient ml-3 px-5 rounded-pill custom-btn-lg"  onClick={() =>  goPayment()}> Proceed </button>
                                }
                            </div>
                        </div>
                    </div>
                </footer>
            }
            <Alert className="toast-container b-m" alertInfo={toastInfo} onDurationEnd={setToastInfo} duration={toastInfo.timeout}/>
            <Alert alertInfo={alertInfo} onDurationEnd={closeAlertMessage} duration='5000'/>
            <RemoveComplimentaryModal isModelOpen={isRemoveComplimentaryModalOpen} toggleRemoveComplimentaryModal={toggleRemoveComplimentaryModal} onConfirmCall={proceedWithRemoveComplimentary} promotionType={newPromotionType}
                onCancelCall={proceedWithDefaultPromotion}/>
        </React.Fragment>
    )
}

export const  RemoveComplimentaryModal = (props) => {
    return (
        <React.Fragment>
            <Modal className="modal-dialog-centered refill-interval-popup" backdrop="static" isOpen={props.isModelOpen} toggle={props.toggleRemoveComplimentaryModal} style={{paddingRight: "15px"}}>
                <ModalBody className="modal-body">
                    {props.promotionType && props.promotionType==='POINT'?
                    <p>selecting flexi reward promotion might remove the complimentary product</p>:
                    <p>Changing promotion might remove the complimentary product</p>}
                    <button type="button" className="btn btn-brand px-3 ml-2" onClick={() => props.onCancelCall()}>CANCEL</button>
                    <button type="button" className="btn btn-brand px-3 ml-2" onClick={() => props.onConfirmCall(props.promotionType)}>OK</button>
                </ModalBody>
            </Modal>    
        </React.Fragment>
    );
}
export default OrderDetails;