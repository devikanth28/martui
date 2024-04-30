import React, { useEffect, useState } from 'react';
import ProductImage from '../../../images/common/product-img.png';
import moment from "moment";
import MyAccountService  from  '../../../services/MyAccountService';
import Validate from '../../../helpers/Validate';
import DefaultBanner from "../../../images/image-load.gif";
import TrackOrder from './TrackOrder';
import ReturnsHistory from './ReturnsHistory';
import ProductThumbNail from '../../Common/ProductThumbNail';
import {OrderDetailsGhostImage,TrackOrderGhostImage} from './PurchaseHistoryGhostImage';
import Alert ,{ALERT_TYPE_ERROR,ALERT_TYPE_SUCCESS} from '../../Common/Alert';

import ImageLightBox from '../../Common/ImageLightBox/ImageLightBox';
import './../../Common/ImageLightBox/LightBoxStyle.css';
import HealthRecordZoom from '../../Checkout/Prescription/HealthRecordZoom';
import PrescriptionImg from '../../../images/common/prescription-image.png';
import EditPrescription from "./EditPrescription";
import NeedHelp from '../../Chat/Container/NeedHelp';
import {OrderStatus} from './PurchaseHistoryOrder';
import { getSelectedLocality } from '../../../../redux/action/LocalityAction';
import LocalDB from '../../../DataBase/LocalDB';
import CONFIG from '../../../constants/ServerConfig';
import ShowPickUpStore from '../../Common/ShowPickUpStore';
import {getProductUrl} from '../../../helpers/CommonUtil';

const PurchaseHistoryOrderDetail = (props) => {
    const validate = Validate();
    const myAccountService =   MyAccountService();
    const [imageIndex, setImageIndex] = useState(0);
    const [loader,setLoader]=useState(false);
    const [isLightBoxOpen, setLightBoxOpen] = useState(false);
	const purchaseDetails = props.purchaseDetails;
    //const returnInfo  = props.returnInfo;
    const bottomContainerRef = React.useRef();
    const [prescriptionOrder, setPrescriptionOrder] = useState({});
    const [imagesForZoom, setImagesForZoom] = useState([]);
    //const  prescriptionOrder = purchaseDetails.prescriptionOrder; 
    const [activeTabName,setActiveTabName] = useState("TrackOrder");
    const [paymentDetail,setPaymentDetail] = useState([]);
    const [refundDetail,setRefundDetail] = useState([]);
    const [totalRefundAmount,setTotalRefundAmount]=useState(0.00);
    const [trackInfo,setTrackOrderInfo] = useState({});
    const [orderReturnInfo,setOrderReturnInfo] = useState({});
    const [editPrescModal,setEditPrescModal] = useState(false);
    const selectedLocality = getSelectedLocality();
    const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
    const [imageThumbnailPaths, setImageThumbnailPaths] = useState({});
    const [tempImageThumbnailPaths, setTempImageThumbnailPaths] = useState({});
    const [startChat, setStartChat] = useState(false);
    const [showOrderReturnInfoGhostImages, setShowOrderReturnInfoGhostImages] = useState(false);
    const [productDetails, setProductDetails] = useState();
    const [paymentInfoLoader,setPaymentInfoLoader]=useState(false);
   
      

    useEffect(()=>{
        if(validate.isEmpty(prescriptionOrder) && validate.isNotEmpty(props.purchaseDetails.prescriptionOrderId)){
            setLoader(true);
            getPrescriptionOrderDetails(purchaseDetails.prescriptionOrderId);
        }
        if((props.showReturns || props.showReturnRequests) && validate.isNotEmpty(props.company) && validate.isNotEmpty(purchaseDetails) && validate.isNotEmpty(purchaseDetails.invoiceId)){
            let productDetails = new Map();
            purchaseDetails.orderHistoryItemDTOs.map((orderHistoryItem)=>{
                productDetails.set(orderHistoryItem.productId,{
                    productName : orderHistoryItem.productName,
                    imageUrlInfo : orderHistoryItem.productImage,
                })
            });
            setProductDetails(productDetails);
            setShowOrderReturnInfoGhostImages(true);
            getOrderReturnInfo(purchaseDetails.invoiceId,props.company,props.showReturns,props.showReturnRequests);
        } else {
            setShowOrderReturnInfoGhostImages(false);
            setOrderReturnInfo({});
        }
        
    },[purchaseDetails,props.company,props.showReturns,props.showReturnRequests]);

    useEffect(()=>{
        setActiveTabName("TrackOrder");
        getOrderTrackInfo(props.omsOrderId);
    },[props.omsOrderId]);

    useEffect(() => {
        if(validate.isNotEmpty(prescriptionOrder)) {
            let imageThumbnailURLs = {};
            prescriptionOrder.imageList.forEach((eachFileInfo, index) => {
                imageThumbnailURLs[index] = eachFileInfo.thumbnailPath;
            });
            setImageThumbnailPaths(imageThumbnailURLs);
            setTempImageThumbnailPaths(imageThumbnailURLs);
        }
    }, [prescriptionOrder]);

    const handleImageLoadError = (index) => {
        setImageThumbnailPaths({...imageThumbnailPaths, [index]: DefaultBanner});
        setTimeout(() => {
            setImageThumbnailPaths(tempImageThumbnailPaths);
        }, 5000);
    }

    const closeModal = () =>{
        setEditPrescModal(false);
    }

    const setActiveTab = (tabName) =>{
        setActiveTabName(tabName);
    }

    const getOrderTrackInfo = (omsOrderId)=>{
        setActiveTabName("TrackOrder");
        myAccountService.getOrderTrackInfo(omsOrderId).then(response => {
            if (validate.isNotEmpty(response) && validate.isNotEmpty(response.statusCode) && "SUCCESS" == response.statusCode) {
               if(validate.isNotEmpty(response.dataObject)) {
                   setTrackOrderInfo(response.dataObject);
                } else {
                    setTrackOrderInfo({});
                }
			} else if("FAILURE" == response.statusCode){
                //setAlertInfo({message:response.message, type: ""});
            }
        }).catch(function(error) {
            console.log(error);
        });
    }

    const getOrderReturnInfo = (invoiceId,company,getReturns,getReturnRequests)=>{
        myAccountService.getOrderReturnInfo(invoiceId,company,getReturns,getReturnRequests).then(response => {
            setShowOrderReturnInfoGhostImages(false);
            if (validate.isNotEmpty(response) && validate.isNotEmpty(response.statusCode) && "SUCCESS" == response.statusCode && validate.isNotEmpty(response.responseData)) {
                if(validate.isNotEmpty(response.responseData)) {
                   setOrderReturnInfo(response.responseData);
                } else {
                    setOrderReturnInfo({});
                }
			}
        }).catch(function(error) {
            console.log(error);
            setShowOrderReturnInfoGhostImages(false);
        });
    }
    const getPrescriptionOrderDetails=(orderId)=>{
        myAccountService.getPrescriptionOrderDetails(orderId).then(data=>{
            if(validate.isNotEmpty(data) && validate.isNotEmpty(data.statusCode) && "SUCCESS" == data.statusCode){
                setPrescriptionOrder(data.dataObject);
                let prescriptionOrder = data.dataObject;
                let imagesForZoomTemp = [];
            validate.isNotEmpty(prescriptionOrder.imageList) && prescriptionOrder.imageList.map((eachImage) => {
                imagesForZoomTemp.push(eachImage.imagePath);
            });
            setImagesForZoom(imagesForZoomTemp);
            }
            setLoader(false);
        });
    }
    const getOrderPaymentDetails = (omsOrderId)=>{
        setActiveTabName("PaymentDetails");
        setPaymentDetail([]);
        setRefundDetail([]);
        setTotalRefundAmount(0.00);
        setPaymentInfoLoader(true);
        myAccountService.getOrderPaymentDetails(omsOrderId).then(response => {
            if (validate.isNotEmpty(response) && validate.isNotEmpty(response.statusCode) && "SUCCESS" == response.statusCode) {
               if(validate.isNotEmpty(response.dataObject.paymentDetails)) {
                   let res = response.dataObject;
                   setPaymentDetail(response.dataObject.paymentDetails)
                } else {
                    setPaymentDetail([]);
                }
                if(validate.isNotEmpty(response.dataObject.refundDetails)){
                    let res = response.dataObject;
                    setRefundDetail(res.refundDetails);
                   setTotalRefundAmount(res.totalRefundAmount);
                } else {
                    setRefundDetail([]);
                    setTotalRefundAmount(0.00);
                }
			} else if("FAILURE" == response.statusCode){
                //setAlertInfo({message:response.message, type: ""});
            }
            setPaymentInfoLoader(false);
        }).catch(function(error) {
            console.log(error);
            setPaymentInfoLoader(false);
        });
    }

    const scrollBottom=()=>{
        if(bottomContainerRef && bottomContainerRef.current) {
            bottomContainerRef.current.scrollIntoView({
              behavior: 'smooth',
              block: 'end',
              inline: 'center',
            });
        }
    }

    const getDeliveryType = (type,isCommunityOrder)=>{
        let deliveryType = "";
        if(isCommunityOrder)
            type = "C";
        switch(type){
            case "D":
                deliveryType="Door Delivery"
                break;
            case "S":
                deliveryType="Store Pick Up"
                break;
            case "C":
                deliveryType="Community Dropoff"
                break;
            default:
                deliveryType="N/A"
                break;
        }
        return deliveryType;
    }
    const getPaymentStatus = (status)=>{
        let paymentStatus = "";
        switch(status){
            case "REFUND_DONE":
                paymentStatus="REFUNDED"
                break;
            case "PAYMENT_COMPLETE":
            case "PAYMENT_PARTIAL":
            case "PAYMENT_DONE":
                paymentStatus="PAID"
                break;
            default:
                paymentStatus="N/A"
                break;
        }
        return paymentStatus;
    }

    const updateNewImages =  (prescriptionOrder) =>{
        let imagesForZoomTemp = [];
        validate.isNotEmpty(prescriptionOrder.imageList) && prescriptionOrder.imageList.map((eachImage) => {
            imagesForZoomTemp.push(eachImage.imagePath);
        });
        setImagesForZoom(imagesForZoomTemp);
        setPrescriptionOrder(prescriptionOrder);
    }

    const showAlertMessage = (message) => {
        setAlertInfo({message:message, type: ALERT_TYPE_SUCCESS});
    }

    const openLightBox = (index)=>{
        setLightBoxOpen(true);
        setImageIndex(index);
    }
    const isFutureDate = (deliveryDate) => {
        return new Date().setHours(0, 0, 0, 0) <= deliveryDate.setHours(0, 0, 0, 0);
      };

    return (
        <React.Fragment>
            <Alert alertInfo={alertInfo} duration={5000} onDurationEnd={setAlertInfo}/>
            <div className="header">
                <p>
                    <a title="Back to purchase history" onClick={()=>{LocalDB.setValue('fromOrderDetails', purchaseDetails.orderId); props.history.push("/ordersHistory");}} href="javascript:void(0)">
                        <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                            <g transform="translate(-48.941 -316.765)">
                                <rect fill="none" width="24" height="24" transform="translate(48.941 316.765)"></rect>
                                <path fill="#000000" d="M59.108,319.236a.915.915,0,0,0-.6.238l-9.3,8.706a.938.938,0,0,0,0,1.312l9.3,8.586a.945.945,0,0,0,1.312-.119.936.936,0,0,0,0-1.312l-7.394-6.917H71.987a.954.954,0,0,0,0-1.908H52.429l7.513-6.917a.847.847,0,0,0,.358-.715,1.7,1.7,0,0,0-.238-.716A5.386,5.386,0,0,0,59.108,319.236Z" transform="translate(0 -0.471)"></path>
                            </g>
                        </svg>
                        Back to purchase history
                    </a>
                </p>
                {validate.isNotEmpty(purchaseDetails) && <div className="order-controls">
                    <a href="javascript:void(0)" title="previous Order" className={`btn mr-2 my-0 btn-sm ${purchaseDetails.isFirstOrder ? "disabled" : ""}`} onClick={purchaseDetails.isFirstOrder ? () => false : () => {setPrescriptionOrder({}); props.getPreviousOrNextDetailPage("OMS", -1, purchaseDetails.orderId);}} disabled={purchaseDetails.isFirstOrder}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <g transform="translate(-868.477 786) rotate(-90)">
                                <rect fill="none" width="24" height="24" transform="translate(762 868.477)"/>
                                <path fill="#080808" d="M61.848,465.874l-5.541,5.541a1.256,1.256,0,1,0,1.776,1.776l4.653-4.64,4.655,4.655a1.261,1.261,0,0,0,2.149-.888,1.248,1.248,0,0,0-.373-.888l-5.543-5.556A1.26,1.26,0,0,0,61.848,465.874Z" transform="translate(711.498 410.651)"/>
                            </g>
                        </svg>
                        <span className="ml-2">Previous Order</span>
                    </a>
                    <a href="javascript:void(0)" title="next Order" className={`btn ml-2 my-0 btn-sm ${purchaseDetails.isLastOrder ? "disabled" : "" }`} onClick={purchaseDetails.isLastOrder ? () => false : () => {setPrescriptionOrder({}); props.getPreviousOrNextDetailPage("OMS", 1, purchaseDetails.orderId);}}>
                        <span className="mr-2">Next Order</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <g transform="translate(-906.838 786) rotate(-90)">
                                <rect fill="none" width="24" height="24" transform="translate(762 906.838)"/>
                                <path fill="#080808" d="M63.432,503.859l5.4-5.4a1.223,1.223,0,0,0-1.73-1.73l-4.533,4.52-4.533-4.533a1.228,1.228,0,0,0-2.092.865,1.216,1.216,0,0,0,.363.865l5.4,5.411A1.229,1.229,0,0,0,63.432,503.859Z" transform="translate(711.356 418.584)"/>
                            </g>
                        </svg>
                    </a>
                </div>}
            </div>
            <div className="order-detail">
                {(validate.isEmpty(purchaseDetails) || loader) && <OrderDetailsGhostImage/>}
                {validate.isNotEmpty(purchaseDetails) && 
                <React.Fragment>
                    <div className="order-heading">
                        <div>
                            <h6>
                                {!props.isCanceled && <OrderStatus orderStatus={purchaseDetails.orderStatus} orderType="oms" paymentStatus={(purchaseDetails.paymentType == 'C' ) ? null : purchaseDetails.gatewayStatus} displayStatus={props.displayOrderStatus}></OrderStatus>}
                                {props.isCanceled && <OrderStatus orderStatus="C" orderType="oms" paymentStatus={(purchaseDetails.paymentType == 'O' && purchaseDetails.gatewayStatus == null) ? 'I' : purchaseDetails.gatewayStatus } displayStatus="Cancelled"></OrderStatus>}
                            </h6>
                        </div>
                        <div>
                            <small className="text-muted">Ordered On {moment(new Date(purchaseDetails.dateCreated)).format("MMM DD, YYYY HH:mm")}</small>
                            <span className="dot-separator text-dark"></span>
                            {props.deliveryDate && isFutureDate(new Date(props.deliveryDate)) && <React.Fragment><small className="text-muted">Delivery by {moment(new Date(props.deliveryDate)).format("MMM DD, YYYY")}</small>
                            <span className="dot-separator text-dark"></span></React.Fragment>}
                            {/* <small className="text-muted">Delivered By Jul 17, 2020</small> */}
                            {!purchaseDetails.isRedemptionOrder && <small className="text-muted">Total Amount <strong className="amount-text"><strong className="rupee">&#x20B9;</strong> {parseFloat(purchaseDetails.orderAmount)}</strong></small>}
                            {purchaseDetails.isRedemptionOrder && <small className="text-muted">Total Redeemed Points <strong className="amount-text">{parseFloat(purchaseDetails.orderAmount)} Pts</strong></small>}
                        </div>
                    </div>
                    <div className="order-id">
                        {!props.displayInvoiceId && 
                            <p>{validate.isNotEmpty(prescriptionOrder) && validate.isNotEmpty(purchaseDetails.prescriptionOrderId) && "Prescription / "}Order ID: 
                                <strong>{validate.isNotEmpty(prescriptionOrder) && validate.isNotEmpty(purchaseDetails.prescriptionOrderId) && purchaseDetails.prescriptionOrderId +" / "}{purchaseDetails.displayOrderId}</strong>
                            </p>
                        }
                        {props.displayInvoiceId && 
                            <p>
                                Invoice ID <strong>{props.displayInvoiceId}</strong>
                            </p>
                        }
                        <div>
                             {validate.isNotEmpty(purchaseDetails.invoiceId) && purchaseDetails.invoiceId > 0 && validate.isNotEmpty(purchaseDetails.pickStoreId) && !purchaseDetails.isRedemptionOrder &&  
                                <a className="btn btn-link btn-sm" href="javascript:void(0)" onClick={() => window.open(`${CONFIG.REDIRECT_HOME_URL}/my-profile/printInvoiceDetails?invoiceId=${purchaseDetails.invoiceId}&storeId=${purchaseDetails.pickStoreId}&company=${props.company}`)}>Print Receipt</a>
                            }
                            {purchaseDetails.initiatePayment &&
                                <a className="btn btn-link btn-sm" href={"/payOnline/"+purchaseDetails.orderId}>Pay Online</a>
                            }
                            {purchaseDetails.enableRetryPayment && !purchaseDetails.initiatePayment &&
                                <a className="btn btn-link btn-sm" href={`/retryPayment/${purchaseDetails.orderId}`}>Retry Payment</a>
                            }
                            {/* <a href="">Return Order</a> */}
                            {(selectedLocality && selectedLocality.hubId) && validate.isNotEmpty(purchaseDetails.orderId) && ((purchaseDetails.invoiceId && Number(purchaseDetails.invoiceId)>0) || purchaseDetails.orderStatus=='C') && !purchaseDetails.isRedemptionOrder   && 
                                <a className="btn btn-link btn-sm" href="javascript:void(0)" onClick={()=>{LocalDB.setValue("previousPage", "OrderDetails"); props.history.push({pathname: `/reOrder/${purchaseDetails.orderId}`, state:{company: props.company, type: "OMS_ORDER"}})}}>Re-Order</a>
                            }
                             {(purchaseDetails.orderStatus == 'I' || purchaseDetails.orderStatus == 'A' || purchaseDetails.orderStatus.status == 'E') &&
                                <a className="btn btn-link btn-sm" href="javascript:void(0)" onClick={()=>props.showCancelOrderConfirmation(purchaseDetails,purchaseDetails.gatewayStatus,"O")}>Cancel Order</a>
                             }
                        </div>
                    </div>
                    {/* uploaded image section start */}
                    {validate.isNotEmpty(prescriptionOrder) && validate.isNotEmpty(prescriptionOrder.imageList) &&
                    <div className="uploaded-image-container">
                        <div>
                        {prescriptionOrder.imageList.map((prescriptionImg,index)=>{
                        return (
                            <React.Fragment key={prescriptionImg.imageId}>
                                <img src={validate.isNotEmpty(imageThumbnailPaths) ? imageThumbnailPaths[index] : DefaultBanner} title="Click to zoom"  onClick={() => openLightBox(index)} onError={() => handleImageLoadError(index)}/>
                                {isLightBoxOpen &&
                                <ImageLightBox style={{"z-index":1060}}
                                    prescImages={imagesForZoom}
                                    imageIndex={imageIndex}
                                    mainSrc={imagesForZoom[imageIndex]}
                                    nextSrc={imagesForZoom[(imageIndex + 1) % imagesForZoom.length]}
                                    prevSrc={imagesForZoom[(imageIndex + imagesForZoom.length - 1) % imagesForZoom.length]}
                                    onCloseRequest={() => setLightBoxOpen(false)}
                                    onMovePrevRequest={() => setImageIndex((imageIndex + imagesForZoom.length - 1) % imagesForZoom.length)}
                                    onMoveNextRequest={() => setImageIndex((imageIndex + 1) % imagesForZoom.length)}
                                />}                        
                                </React.Fragment>
                        )})}
                        </div>
                        {prescriptionOrder.imageList.length < 8 && (validate.isEmpty(purchaseDetails.orderStatus) || purchaseDetails.orderStatus == 'I') && (prescriptionOrder.status == 'I' || prescriptionOrder.status == 'D') &&
                            <button className="brand-secondary btn px-3" onClick={()=> setEditPrescModal(true)}>Edit Prescription</button>
                        }
                        {prescriptionOrder.imageList.length >= 8 && <span>
                            No Of Images: <strong>{prescriptionOrder.imageList.length}</strong>
                        </span>}
                    </div>}
                    {!purchaseDetails.isRedemptionOrder && <OmsProductDetails purchaseDetails={purchaseDetails} />}
                    {purchaseDetails.isRedemptionOrder  &&<RedemptionsProductDetails purchaseDetails={purchaseDetails} />}
                    <div className="row mx-0 mb-3">
                        {validate.isNotEmpty(purchaseDetails.communityDropPoint) &&
                        <div className="col-lg-5 col-md-6">
                            <strong>Community Delivery Address:</strong>
                            <p>Name: <span className="font-weight-bold">{purchaseDetails.firstName}</span></p>
                            <p>Address: {purchaseDetails.address}</p>
                            <p>Email: <span className="text-primary">{purchaseDetails.email}</span></p>
                            <p>Mobile: {purchaseDetails.shippingMobileNumber}</p>
                            <p className="text-capitalize">Drop off point: {purchaseDetails.communityDropPoint}</p>
                        </div>}
                        {purchaseDetails.deliveryType == "S" &&
                        <div className="col-lg-5 col-md-6">
                            <strong>Pick Up Store Information:</strong>
                            <ShowPickUpStore
                                pickStoreName={purchaseDetails.pickStoreName}
                                pickUpAddress={purchaseDetails.address}
                                locationLatLong={purchaseDetails.locationLatLong}
                                phoneNumber={purchaseDetails.shippingMobileNumber}
                                isSmallAddressRequired={false}
                                />
                            
                        </div>}
                        {purchaseDetails.deliveryType == "D" && validate.isEmpty(purchaseDetails.communityDropPoint) && 
                        <div className="col-lg-5 col-md-6">
                            <strong>Delivery Information:</strong>
                            <p>Name: <strong>{purchaseDetails.firstName}</strong></p>
                        <p>Address: {purchaseDetails.address}</p>
                            {validate.isNotEmpty(purchaseDetails.email) && <p>
                                <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="18.001" height="18" viewBox="0 0 18.001 18">
                                    <g transform="translate(-180.257 -177.901)">
                                        <rect fill="none" width="18" height="18" transform="translate(180.257 177.901)"/>
                                        <g transform="translate(180.258 180.052)">
                                            <path fill="#343a40" d="M2.2,13.7A2.2,2.2,0,0,1,0,11.5V2.2A2.2,2.2,0,0,1,2.2,0H15.8A2.2,2.2,0,0,1,18,2.205V11.5a2.2,2.2,0,0,1-2.2,2.2ZM1.006,2.205V11.5a1.2,1.2,0,0,0,1.2,1.2H15.8A1.2,1.2,0,0,0,17,11.5h0V2.205a1.2,1.2,0,0,0-1.2-1.2H2.2A1.2,1.2,0,0,0,1.006,2.205Zm14.075,9.456L10.6,7.408,9.348,8.533a.5.5,0,0,1-.669,0L7.457,7.445l-4.5,4.212a.5.5,0,0,1-.342.134.515.515,0,0,1-.369-.16.506.506,0,0,1,.022-.712L6.7,6.768,2.246,2.786a.5.5,0,1,1,.67-.752L7.735,6.347a.817.817,0,0,1,.083.07.017.017,0,0,0,.006.011L9.01,7.487l6.07-5.449a.5.5,0,1,1,.675.748l-4.4,3.948,4.421,4.2a.5.5,0,0,1,.018.711.5.5,0,0,1-.711.018Z" transform="translate(0 0)"/>
                                        </g>
                                    </g>
                                </svg>
                                <a className="text-primary" title="Click to Mail" href={"mailTo:"+purchaseDetails.email}>{purchaseDetails.email}</a>
                            </p>}
                            <p>
                            <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                    <g transform="translate(-180.438 -213.832)">
                                        <rect width="24" height="24" transform="translate(180.438 213.832)" fill="none"></rect>
                                        <g transform="translate(182.199 215.78)">
                                            <g transform="translate(0 1.429)">
                                                <path d="M185.394,217.171a2.043,2.043,0,0,0-.705.124,3.87,3.87,0,0,0-.728.361l-.369.26a3.029,3.029,0,0,0-.264.236,3.822,3.822,0,0,0-.979,1.742c-.771,2.889,1.118,7.237,4.7,10.82,3,3,6.621,4.87,9.442,4.87a5.349,5.349,0,0,0,1.377-.171,3.8,3.8,0,0,0,1.738-.975,2.837,2.837,0,0,0,.265-.3l.262-.374a3.9,3.9,0,0,0,.334-.689,2.167,2.167,0,0,0-.821-2.518l-2.625-1.833a2.261,2.261,0,0,0-3.063.546l-.509.731-.126-.089a24.713,24.713,0,0,1-5.47-5.468l-.089-.127.732-.51a2.2,2.2,0,0,0,.545-3.063l-1.832-2.624A2.229,2.229,0,0,0,185.394,217.171Zm11.1,17.253c-2.524,0-5.828-1.735-8.623-4.53-3.246-3.247-5.057-7.237-4.4-9.7a2.668,2.668,0,0,1,.678-1.22,1.807,1.807,0,0,1,.135-.126l.318-.225a2.535,2.535,0,0,1,.493-.24,1.03,1.03,0,0,1,1.162.4l1.831,2.622a1.042,1.042,0,0,1-.257,1.449l-1.193.833a.576.576,0,0,0-.16.783,24.809,24.809,0,0,0,6.813,6.815.585.585,0,0,0,.785-.16l.833-1.195a1.071,1.071,0,0,1,1.447-.257l2.624,1.833a1.006,1.006,0,0,1,.4,1.163l-.007.017a2.439,2.439,0,0,1-.206.435l-.223.321a1.537,1.537,0,0,1-.156.173,2.649,2.649,0,0,1-1.219.677A4.167,4.167,0,0,1,196.492,234.424Z" transform="translate(-182.178 -217.171)" fill="#343a40"></path>
                                            </g>
                                            <g transform="translate(9.963)">
                                                <path d="M192.615,215.757a.58.58,0,0,0-.034,1.158,9.141,9.141,0,0,1,8.548,8.546.589.589,0,0,0,.621.543.579.579,0,0,0,.537-.615,10.284,10.284,0,0,0-3-6.636h0a10.28,10.28,0,0,0-6.634-3Z" transform="translate(-192.036 -215.757)" fill="#343a40"></path>
                                            </g>
                                            <g transform="translate(8.736 3.129)">
                                                <path d="M191.427,218.853a.611.611,0,0,0-.6.544.58.58,0,0,0,.145.419.572.572,0,0,0,.4.2h0a6.708,6.708,0,0,1,6.274,6.275.589.589,0,0,0,.621.541h0a.578.578,0,0,0,.536-.613,7.869,7.869,0,0,0-7.362-7.36Z" transform="translate(-190.822 -218.853)" fill="#343a40"></path>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                                <a className="text-primary" title="Click to Mail" href={"tel:"+purchaseDetails.shippingMobileNumber}>{purchaseDetails.shippingMobileNumber}</a>
                            </p>
                        </div>}
                        <div className="col-lg-4 col-md-6">
                            <strong>Order Information:</strong>
                            <p>Status: <span className="font-weight-bold">{purchaseDetails.orderDisplayStatus}</span></p>
                            <p>Delivery Type: <span className="font-weight-bold">{getDeliveryType(purchaseDetails.deliveryType,validate.isNotEmpty(purchaseDetails.communityDropPoint))}</span></p>
                            <p>Order Date/Time: {moment(new Date(purchaseDetails.dateCreated)).format("MMM DD, YYYY HH:mm")}</p>
                        </div>
                    </div>
                </React.Fragment>}
                { validate.isEmpty(trackInfo) &&
                <TrackOrderGhostImage/>
                }
                 {validate.isNotEmpty(purchaseDetails) && validate.isNotEmpty(trackInfo) &&
                    
                <div className="tab-section">
                    <ul className="nav nav-pills nav-justified" id="pills-tab" role="tablist">
                        <li className="nav-item">
                            <a className={"nav-link py-3 "+(activeTabName == "TrackOrder" ? "active":"")} href="javascript:void(0)" id="pills-track-order-tab" data-toggle="pill"  role="tab" aria-controls="pills-track-order" aria-selected={activeTabName == "TrackOrder"} onClick={()=>getOrderTrackInfo(purchaseDetails.orderId)}>Track Order</a>
                        </li>
                       {(
                          purchaseDetails.showPayments
                        ) && <li className="nav-item">
                            <a className={"nav-link py-3 "+(activeTabName == "PaymentDetails" ? "active":"")} href="javascript:void(0)" id="pills-payment-details-tab" data-toggle="pill"  role="tab" aria-controls="pills-payment-details" aria-selected={activeTabName == "PaymentDetails"} onClick={()=>getOrderPaymentDetails(purchaseDetails.orderId)}>Payment Details</a>
                        </li>}
                       {validate.isNotEmpty(purchaseDetails.showHelp) && purchaseDetails.showHelp && 
                        <li className="nav-item">
                            <a className={"nav-link py-3 "+(activeTabName == "NeedHelp" ? "active":"")} href="javascript:void(0)" id="pills-need-help" data-toggle="pill" role="tab" aria-controls="pills-need-help" aria-selected={activeTabName == "NeedHelp"} onClick={()=>{setStartChat(true);setActiveTab("NeedHelp");}}>Need Help?</a>
                        </li>}
                        {/* <li className="nav-item">
                            <a className={"nav-link py-3 "+(activeTabName == "ViewPrescription" ? "active":"")}  id="pills-view-prescription-tab" data-toggle="pill"  role="tab" aria-controls="pills-view-prescription" aria-selected={activeTabName == "ViewPrescription"} onClick={()=>setActiveTab("ViewPrescription")}>View Prescription</a>
                        </li> */}
                    </ul>
                    <div className="tab-content">
                        {activeTabName == "TrackOrder" && 
                        <div className="tab-pane pills-track-order show active" id="pills-track-order" role="tabpanel" aria-labelledby="pills-track-order-tab">
                        {validate.isNotEmpty(purchaseDetails) && validate.isNotEmpty(trackInfo) &&
                            <TrackOrder trackInfo={trackInfo} displayOrderId={purchaseDetails.displayOrderId}/>
                        }
                        </div>}
                        {activeTabName == "PaymentDetails" && 
                        <div className="tab-pane pills-payment-details fade show active" id="pills-payment-details" role="tabpanel" aria-labelledby="pills-payment-details-tab">
                            {validate.isNotEmpty(paymentDetail) &&
                            <div className="border rounded mb-3">
                                <table className="table mb-0 border-0">
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col" nowrap="true">Transc No</th>
                                        <th scope="col" nowrap="true">Date & Time</th>
                                        <th scope="col" nowrap="true">Amount</th>
                                        <th scope="col" nowrap="true">Mode</th>
                                        <th scope="col" nowrap="true">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {paymentDetail.map((payment,index)=> {
                                 if(payment.mode && payment.mode.toLowerCase() !== "Lower rounding".toLowerCase() && payment.mode.toLowerCase() !== "Upper Rounding".toLowerCase()) {
                                    return (
                                        <tr key={index}>
                                            <td nowrap="true">{validate.isNotEmpty(payment.transactionNo) ? payment.transactionNo:"N/A"}</td>
                                                <td nowrap="true">{moment(new Date(payment.date)).format("MMM DD, YYYY HH:mm:ss")}</td>
                                            <td nowrap="true"><strong className="rupee">&#x20B9;</strong> {parseFloat(payment.amount).toFixed(2)}</td>
                                            <td nowrap="true">{payment.mode}</td>
                                            <td nowrap="true">{payment.status}</td>
                                        </tr>
                                    )
                                }})}
                                </tbody>
                                </table>
                            </div>}
                            {/* refund table start */}
                            {validate.isNotEmpty(refundDetail) && 
                            <div className="border rounded mb-3">
                                <table className="table mb-0 border-0">
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col" nowrap="true">Refund ID</th>
                                            <th scope="col" nowrap="true">Product Name</th>
                                            <th scope="col" nowrap="true">Refund Qty</th>
                                            <th scope="col" nowrap="true">Refund Reason</th>
                                            <th scope="col" nowrap="true">MRP (Rs)</th>
                                            <th scope="col" nowrap="true">Rate (Rs)</th>
                                            <th scope="col" nowrap="true">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {refundDetail.map((refund,index)=> {
                                        let orderHistoryItems = purchaseDetails.orderHistoryItemDTOs;
                                        let productName;
                                        orderHistoryItems.map(item=>{
                                            if(refund.productId == item.productId){
                                                productName=item.productName;
                                            }
                                        })
                                        let id = refund.productId
                                        let productUrl = CONFIG.REDIRECT_HOME_URL + getProductUrl(productName, id);
                                    return(
                                        <React.Fragment>
                                            {
                                                    <tr key={index}>
                                                        <td nowrap="true">{refund.refundId}</td>
                                                        <td><a href={productUrl} title={productName} className="text-dark">{productName}</a></td>
                                                        <td nowrap="true">{refund.quantity}</td>
                                                        <td nowrap="true">{refund.refundReason}</td>
                                                        <td nowrap="true"><strong className="rupee">&#x20B9;</strong> {parseFloat(refund.mrp).toFixed(2)}</td>
                                                        <td nowrap="true"><strong className="rupee">&#x20B9;</strong> {parseFloat(refund.rate).toFixed(2)} </td>
                                                        <td nowrap="true"><strong className="rupee">&#x20B9;</strong> {parseFloat(refund.eachRefundItemAmount).toFixed(2)}</td>
                                                    </tr>
                                            }
                                        </React.Fragment>
                                    )
                                    })}
                                     <tr class="border-top">
                                                <td nowrap="true" className="text-right" colSpan="6">Total Refund</td>
                                                <td nowrap="true"><strong class="rupee">&#x20B9;</strong> <strong>{Number(totalRefundAmount).toFixed(2)}</strong>
                                                </td>
                                            </tr>
                                    </tbody>
                                </table>
                            </div>}
                            {/* refund table ends */}
                            {!paymentInfoLoader && validate.isEmpty(paymentDetail) && validate.isEmpty(refundDetail) && <p>No payments Info</p>}
                        </div>}
			            {validate.isNotEmpty(purchaseDetails.showHelp) && purchaseDetails.showHelp && purchaseDetails.orderId && purchaseDetails.displayOrderId &&
                            <div className={activeTabName == "NeedHelp" ? "" : "d-none"}>
                            <NeedHelp startChat={startChat} displayOrderId={purchaseDetails.displayOrderId} orderId={purchaseDetails.orderId} parentScrollBottom={scrollBottom}/>
                            </div>
                        }
                        {/* {activeTabName == "NeedHelp" && 
                            <CustomerFeedBack displayOrderId={omsOrder.displayOrderId}
                            setActiveTab={setActiveTab}/>
                        } */}
                        {activeTabName == "ViewPrescription" && 
                        <div className="tab-pane fade show active" id="pills-view-prescription" role="tabpanel" aria-labelledby="pills-view-prescription-tab">
                            <h6>5664156</h6>
                        </div>}
                    </div>
                    <div ref={bottomContainerRef}></div>
                </div>}
                {showOrderReturnInfoGhostImages && 
                    <OrderDetailsGhostImage/>
                }
                {!showOrderReturnInfoGhostImages && validate.isNotEmpty(purchaseDetails) && validate.isNotEmpty(orderReturnInfo) &&
                    <React.Fragment>
                        <ReturnsHistory orderReturnInfo = {orderReturnInfo} paymentType = {purchaseDetails.paymentType} orderId = {purchaseDetails.orderId} productDetails = {productDetails} />
                    </React.Fragment>
                }
            </div>
            {editPrescModal && 
            <EditPrescription prscriptionOrderId= {purchaseDetails.prescriptionOrderId} 
                abc={editPrescModal} imageServerDetail={props.imageServerDetail} 
                closeModal={closeModal}
                updateNewImages={updateNewImages} uploadedImages={prescriptionOrder.imageList} showAlertMessage={showAlertMessage}/> 
            }
        </React.Fragment>
    );
}

export default PurchaseHistoryOrderDetail;


const OmsProductDetails = (props) =>{
    const validate = Validate();
    const purchaseDetails = props.purchaseDetails;
    let col = 6;
    if(parseFloat(purchaseDetails.discountTotal) > 0) {
        col = col + 1;
    }
    if(parseFloat(purchaseDetails.pointsEarned) > 0) {
        col = col + 1;
    }
    return (
        <table className="table border-bottom-0">
            <thead className="thead-light">
                <tr>
                    <th scope="col" colSpan="4" nowrap="true">Product Name</th>
                    {parseFloat(purchaseDetails.discountTotal).toFixed(2) > 0 && <th scope="col" nowrap="true">Discount (%)</th>}
                    {parseInt(purchaseDetails.pointsEarned) > 0 && <th scope="col" nowrap="true">Points</th>}
                    <th scope="col" nowrap="true">MRP (Per Unit)</th>
                    <th scope="col" nowrap="true">Quantity (Packs / Units)</th>
                    <th scope="col" nowrap="true">Total</th>
                </tr>
            </thead>
            <tbody>
                {purchaseDetails.orderHistoryItemDTOs.map((orderHistoryItem)=>{
                let imageUrlInfo =  orderHistoryItem.productImage;

                let productName  = orderHistoryItem.productName;
                let id = orderHistoryItem.productId;
                let productUrl = CONFIG.REDIRECT_HOME_URL + getProductUrl(productName, id);
                return (
                <tr key={orderHistoryItem.productId}>
                    <td colSpan="4">
                        <div>
                            {imageUrlInfo && 
                                <div className="product-img-container">
                                <ProductThumbNail imageUrl={imageUrlInfo} productId={orderHistoryItem.productId} imagesCount={orderHistoryItem.imageUploadCount} 
                                    productName={orderHistoryItem.productName} height="45" auditForm={orderHistoryItem.auditForm}
                                    isGeneral={(orderHistoryItem.isGeneral=="Y") ? true : false} />
                                </div>
                            }
                            <span>
                                <a className="text-secondary font-weight-bold" title={orderHistoryItem.productName} href={productUrl}>{orderHistoryItem.productName}</a>
                            </span>
                        </div>
                    </td>
                    {parseFloat(purchaseDetails.discountTotal).toFixed(2) > 0  && <td nowrap="true">{(parseFloat(orderHistoryItem.discountPercentage).toFixed(2) > 0 && parseFloat(orderHistoryItem.exactPoints) <= 0) ? parseFloat((orderHistoryItem.discountPercentage).toFixed(2)) : "-"}</td>}
                    {parseInt(purchaseDetails.pointsEarned) > 0  && <td nowrap="true">{(parseInt(orderHistoryItem.exactPoints) > 0) ? parseInt(orderHistoryItem.exactPoints * orderHistoryItem.quantity) : "-"}</td>}
                    <td nowrap="true"><strong className="rupee">&#x20B9;</strong> {parseFloat(orderHistoryItem.mrpPerUnit).toFixed(2)}</td>
                    <td nowrap="true">{orderHistoryItem.quantity/orderHistoryItem.packSize} Pack / {orderHistoryItem.quantity} Units</td>
                    <td nowrap="true"><strong className="rupee">&#x20B9;</strong> {parseFloat((orderHistoryItem.mrpPerUnit*orderHistoryItem.quantity).toFixed(2))}</td>
                </tr>)})}
                
                {purchaseDetails.couponCode && purchaseDetails.couponCode != null && 
                    <tr className="border-top">
                        <td className="text-success" colSpan={col+1} nowrap="true"><strong> Coupon Applied: {purchaseDetails.couponCode}</strong></td>
                    </tr>
                }
                <tr className="border-top"><td colSpan={col+1} className="p-0"></td></tr>
                {purchaseDetails.totalAmount > 0 && 
                <tr>
                    <td className="text-right" colSpan={col} nowrap="true"><strong> Sub Amount:</strong></td>
                    <td nowrap="true"><strong className="rupee">&#x20B9;</strong> <strong>{parseFloat((purchaseDetails.totalAmount).toFixed(2))}</strong></td>
                </tr>}
                {purchaseDetails.discountTotal > 0  &&
                <tr>
                    <td className="text-right" colSpan={col} nowrap="true"><strong>Discount Amount:</strong></td>
                    <td nowrap="true">-<strong className="rupee"> &#x20B9;</strong><strong> {parseFloat((purchaseDetails.discountTotal).toFixed(2))}</strong></td>
                </tr>}
                {validate.isNotEmpty(purchaseDetails.shippingCharges) && purchaseDetails.shippingCharges > 0 && 
                <tr>
                    <td className="text-right" colSpan={col} nowrap="true"><strong> Delivery Charges:</strong></td>
                    <td nowrap="true"><strong className="rupee">&#x20B9;</strong> <strong>{parseFloat((purchaseDetails.shippingCharges).toFixed(2))}</strong></td>
                </tr>}
                {validate.isNotEmpty(purchaseDetails.pointsEarned) && (purchaseDetails.discountTotal > 0 || purchaseDetails.pointsEarned > 0) &&
                    <tr>
                        <td className="text-right" colSpan={col} nowrap="true"><strong> Points:</strong></td>
                        <td nowrap="true"><strong className="rupee">Pts</strong> <strong>{parseInt(purchaseDetails.pointsEarned)}</strong></td>
                    </tr>
                }
                <tr className="border-top">
                    <td className="text-right" colSpan={col} nowrap="true"><strong>Total Amount:</strong></td>
                    <td nowrap="true"><strong className="rupee">&#x20B9;</strong> <strong>{parseFloat(purchaseDetails.orderAmount).toFixed(2)}</strong></td>
                </tr>
            </tbody>
        </table>
    )

}


const RedemptionsProductDetails = (props) =>{
    const validate = Validate();
    const purchaseDetails = props.purchaseDetails;

    return (
        <table className="table border-bottom-0">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col" colSpan="4" nowrap="true">Product Name</th>
                                <th scope="col" nowrap="true">Qty</th>
                                <th scope="col" nowrap="true">Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {purchaseDetails.orderHistoryItemDTOs.map((orderHistoryItem)=>{
                            let imageUrlInfo =  orderHistoryItem.productImage;

                            let productName  = orderHistoryItem.productName;
                            let id = orderHistoryItem.productId;
                            let productUrl = CONFIG.REDIRECT_HOME_URL + getProductUrl(productName, id);
                            return (
                            <tr key={orderHistoryItem.productId}>
                                <td colSpan="4">
                                    <div>
                                        {imageUrlInfo &&
                                            <div className="product-img-container">
                                            <ProductThumbNail imageUrl={imageUrlInfo} productId={orderHistoryItem.productId} imagesCount={orderHistoryItem.imageUploadCount} 
                                                productName={orderHistoryItem.productName} height="45" auditForm={orderHistoryItem.auditFormSubName}
                                                isGeneral={(orderHistoryItem.isGeneral=="Y" || orderHistoryItem.auditFormSubName === "GEN") ? true : false} />
                                            </div>
                                        }
                                        <span>
                                            <a className="text-secondary font-weight-bold" href={productUrl} title={orderHistoryItem.productName}>{orderHistoryItem.productName}</a>
                                        </span>
                                    </div>
                                </td>
                                <td nowrap="true">{orderHistoryItem.quantity}</td>
                                <td nowrap="true">{orderHistoryItem.redemptionPoints*orderHistoryItem.quantity}</td>
                            </tr>)})}
                            <tr className="border-top">
                                <td className="text-right" colSpan="5" nowrap="true"><strong>Total Redeemed Points:</strong></td>
                                <td nowrap="true"><strong>{purchaseDetails.orderAmount}</strong></td>
                            </tr>
                        </tbody>
                    </table>
    )

}