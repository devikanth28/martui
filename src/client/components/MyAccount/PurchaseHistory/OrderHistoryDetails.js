import React, { useEffect, useState } from 'react';
import Validate from '../../../helpers/Validate';
import MyAccountService from '../../../services/MyAccountService';
import Alert from '../../Common/Alert';
import { OrderDetailsGhostImage, TrackOrderGhostImage } from './PurchaseHistoryGhostImage';
import { OrderStatus } from './OrderHistoryHeader';
import moment from "moment";
import DefaultBanner from "../../../images/image-load.gif";
import ShowPickUpStore from '../../Common/ShowPickUpStore';
import CONFIG from '../../../constants/ServerConfig';
import ProductThumbNail from '../../Common/ProductThumbNail';
import TrackOrder from './TrackOrder';
import { useSelector } from 'react-redux';
import PurchaseHistoryAction from '../../../../redux/action/PurchaseHistoryAction';
import ImageLightBox from '../../Common/ImageLightBox/ImageLightBox';
import CancelOrder from './CancelOrder';
import EditPrescription from './EditPrescription';
import LocalDB from '../../../DataBase/LocalDB';
import ReturnsHistory from './ReturnsHistory';
import {getProductUrl} from '../../../helpers/CommonUtil';
import { useChatModal } from '../../Chat/Common/useChatModal';
import ChatModal from '../../Chat/Common/ChatModal';
import { getChatHeaderData } from '../../Chat/Common/ChatHelper';
import { Link } from 'react-router-dom';

const getDeliveryType = (type, isCommunityOrder)=>{
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


export default (props) => {

    const validate = Validate();
    let {match : {params : {orderId}}} = props;
    let {match : {params : {invoiceId}}} = props;
    let {match : {params : {storeId}}} = props;

    const [alertInfo, setAlertInfo] = useState({});
    const [orderDetails, setOrderDetails] = useState({});
    const [orderDetailsLoader, setOrderDetailsLoader] = useState(true);
    const [isInvoiceOrder, setIsInvoiceOrder] = useState(false);
    const [prescOrderImages, setPrescOrderImages] = useState([]);
    const [lightBoxOpen, setLightBoxOpen] = useState(false);
    const [imageIndex, setImageIndex] = useState(0);
    const [editPrescModal, setEditPrescModal] = useState(false);
    const [editPrescriptionOrderId, setEditPrescriptionOrderId] = useState("");
    const [cancelOrderId ,setCancelOrderId] = useState("");
    const [cancelOrderModalOpen, setCancelOrderModalOpen] = useState(false);
    const purchaseHistoryAction = PurchaseHistoryAction();
    let isFromOrderHistoryHeader = false;
    try{
        isFromOrderHistoryHeader = props.location.state.isFromOrderHistoryHeader;
    } catch(err){
        
    }
    const [isEligibleForHelp, setIsEligibleForHelp] = useState(false);
    const [startChat,chatHeaderDetails,toggleChat] = useChatModal();

    useEffect(() => {
        setOrderDetailsLoader(true);
        if(validate.isNotEmpty(orderId)) {
            MyAccountService().getOmsOrderDetails(orderId).then(data => {
                if(data.statusCode === "SUCCESS"){
                    setOrderDetails(data.dataObject);
                    setIsEligibleForHelp(data.dataObject.showHelp);
                    setOrderDetailsLoader(false);
                }
            });
        } else if(validate.isNotEmpty(invoiceId)) {
            setIsInvoiceOrder(true);
            MyAccountService().getInvoiceDetails(invoiceId, storeId).then(data => {
                if(data.statusCode === "SUCCESS"){
                    setOrderDetails(data.dataObject);
                    setIsEligibleForHelp(data.dataObject.showHelp);
                    setOrderDetailsLoader(false);
                }
            })
        }
    }, [orderId, invoiceId]);

    let orderDetailsList = useSelector(state => {
        if(validate.isNotEmpty(state) && validate.isNotEmpty(state.purchaseHistory) 
        && validate.isNotEmpty(state.purchaseHistory.orderDetailsList)){
            return state.purchaseHistory.orderDetailsList;
        }
    });

    const nonPersistIncludedCanceledOrders = useSelector(state => {
        if(validate.isNotEmpty(state) && validate.isNotEmpty(state.purchaseHistory) 
        && validate.isNotEmpty(state.purchaseHistory.nonPersistIncludedCanceledOrders)){
            return state.purchaseHistory.nonPersistIncludedCanceledOrders;
        }
    });

    const nonPersistNormalOrders = useSelector(state => {
        if(validate.isNotEmpty(state) && validate.isNotEmpty(state.purchaseHistory) 
        && validate.isNotEmpty(state.purchaseHistory.nonPersistNormalOrders)){
            return state.purchaseHistory.nonPersistNormalOrders;
        }
    });

    const normalOrdersPageNoFromRedux = useSelector(state => {
        if(validate.isNotEmpty(state) && validate.isNotEmpty(state.purchaseHistory) 
        && validate.isNotEmpty(state.purchaseHistory.normalOrdersPageNo)){
            return state.purchaseHistory.normalOrdersPageNo;
        }
    })

    const includeCanceledPageNoFromRedux = useSelector(state => {
        if(validate.isNotEmpty(state) && validate.isNotEmpty(state.purchaseHistory) 
        && validate.isNotEmpty(state.purchaseHistory.includeCanceledPageNo)){
            return state.purchaseHistory.includeCanceledPageNo;
        }
    })

    const includeCanceledRecordsCompleted = useSelector(state => {
        if(validate.isNotEmpty(state) && validate.isNotEmpty(state.purchaseHistory) 
        && validate.isNotEmpty(state.purchaseHistory.includeCanceledRecordsCompleted)){
            return state.purchaseHistory.includeCanceledRecordsCompleted;
        }
    })

    const normalRecordsCompleted = useSelector(state => {
        if(validate.isNotEmpty(state) && validate.isNotEmpty(state.purchaseHistory) 
        && validate.isNotEmpty(state.purchaseHistory.normalRecordsCompleted)){
            return state.purchaseHistory.normalRecordsCompleted;
        }
    })

    const medplusId = useSelector(state => {
        if(validate.isNotEmpty(state) && validate.isNotEmpty(state.userInfo) 
        && validate.isNotEmpty(state.userInfo.userInfo) && validate.isNotEmpty(state.userInfo.userInfo.medplusId)){
            return state.userInfo.userInfo.medplusId;
        }else{
            return 0;
        }
    })

    const isIncludeCancelFromRedux = useSelector(state => {
        if(validate.isNotEmpty(state) && validate.isNotEmpty(state.purchaseHistory) 
        && validate.isNotEmpty(state.purchaseHistory.isIncludeCancel)){
            return state.purchaseHistory.isIncludeCancel;
        }
    })

    const getOrderHistoryFromApi = (isIncludeCancel, pageNo, loadMore) => {
        setOrderDetailsLoader(true);
        MyAccountService().getOrderHistory(isIncludeCancel, pageNo).then(response => {
            if (validate.isNotEmpty(response) && validate.isNotEmpty(response.statusCode) && "SUCCESS" == response.statusCode) {
                let dataObject = response.dataObject;
                let pageNoFromApi = validate.isNotEmpty(dataObject) ? parseInt(dataObject.pageNo) : undefined;
                let reduxObject = {};
                if(dataObject.reachedLastDate){
                    if(isIncludeCancel){
                        reduxObject['includeCanceledRecordsCompleted'] = true;
                    } else {
                        reduxObject['normalRecordsCompleted'] = true;
                    }
                } else {
                    if(validate.isNotEmpty(dataObject)){
                        if(validate.isEmpty(dataObject.orderHeaderData)){
                            getOrderHistoryFromApi(isIncludeCancel, pageNoFromApi+1);
                        } else {
                            if(pageNoFromApi == 1){
                                if(isIncludeCancel){
                                    reduxObject['includeCanceledOrders'] = [...dataObject.orderHeaderData];
                                } else {
                                    reduxObject['normalOrders'] = [...dataObject.orderHeaderData];
                                }
                            }
                            if(isIncludeCancel){
                                reduxObject['includeCanceledPageNo'] = pageNoFromApi + 1;
                                reduxObject['nonPersistIncludedCanceledOrders'] = loadMore ? [...nonPersistIncludedCanceledOrders, ...dataObject.orderHeaderData] : [...dataObject.orderHeaderData];
                                reduxObject['includeCanceledRecordsCompleted'] = false;
                            } else {
                                reduxObject['normalOrdersPageNo'] = pageNoFromApi + 1;
                                reduxObject['nonPersistNormalOrders'] = loadMore ? [...nonPersistNormalOrders, ...dataObject.orderHeaderData] : [...dataObject.orderHeaderData];
                                reduxObject['normalRecordsCompleted'] = false;
                            }
                        }
                    }
                }
                purchaseHistoryAction.savePurchaseHistory({...reduxObject, isIncludeCancel});
                prepareOrderDetailsListToSave(isIncludeCancel ? reduxObject['nonPersistIncludedCanceledOrders'] : reduxObject['nonPersistNormalOrders']);
                setOrderDetailsLoader(false);
            }else{
                setAlertInfo({message : response.message});
                setOrderDetailsLoader(false);
            }
        }).catch(function(error) {
            console.log(error);
            setOrderDetailsLoader(false);
        });
    }

    const prepareOrderDetailsListToSave = (orderData) => {
        if(validate.isEmpty(orderData)){
            return ;
        }
        let orderDetailsListToSave = [];
        orderData.map(each => {
            if (validate.isEmpty(each.orderId) && validate.isNotEmpty(each.invoiceId) && parseInt(each.invoiceId) > 0) {
                let orderDetails = {};
                orderDetails["isInvoice"] = true;
                orderDetails["orderId"] = each.invoiceId;
                orderDetails["company"] = each.company;
                orderDetails["isReturned"] = each.isReturned;
                orderDetailsListToSave.push(orderDetails);
            } else if (validate.isNotEmpty(each.orderId)) {
                let orderDetails = {};
                orderDetails["isInvoice"] = false;
                orderDetails["orderId"] = each.orderId;
                orderDetails["company"] = each.company;
                orderDetails["isReturned"] = each.isReturned;
                orderDetailsListToSave.push(orderDetails);
            }
        });
        if(validate.isNotEmpty(orderDetailsListToSave)){
            purchaseHistoryAction.savePurchaseHistory({orderDetailsList : [...orderDetailsList, orderDetailsListToSave]})
            order = orderDetailsListToSave[0];
            if(order.isInvoice){
                props.history.push({pathname:`/invoiceDetails/${order.orderId}/${order.pickStoreId}`})
            }else{
                props.history.push(`/orderDetails/${order.orderId}`)
            }
        }

    }


    const moveNextOrPrevious = (offset) => {
        let searchOrderId;
        if(isInvoiceOrder){
            searchOrderId = invoiceId;
        }else{
            searchOrderId = orderId;
        }
        let orderIdList = orderDetailsList.map(each => parseInt(each.orderId));
        let index = orderIdList.lastIndexOf(parseInt(searchOrderId));
        if(index == -1){
            return false;
        }
        let order = {};
        try{
            if(index + offset >= orderDetailsList.length) {
                if(!((isIncludeCancelFromRedux && includeCanceledRecordsCompleted) || (!isIncludeCancelFromRedux && normalRecordsCompleted))) {
                    let pageNo = isIncludeCancelFromRedux ? includeCanceledPageNoFromRedux : normalOrdersPageNoFromRedux;
                    getOrderHistoryFromApi(isIncludeCancelFromRedux, pageNo, true);
                }
            }else{
                setOrderDetailsLoader(true);
                order = orderDetailsList[index + offset];
                if(order.isInvoice){
                    props.history.push({pathname:`/invoiceDetails/${order.orderId}/${order.pickStoreId}`, state:{isFromOrderHistoryHeader:true}})
                }else{
                    props.history.push({pathname:`/orderDetails/${order.orderId}`,state:{isFromOrderHistoryHeader:true}})
                }
            }
        }catch(err){
            console.log(err)
        }

    }

    const isFutureDate = (deliveryDate) => {
        return new Date().setHours(0, 0, 0, 0) <= deliveryDate.setHours(0, 0, 0, 0);
    };


    const setModifiedOrderDetails = (afterCancellation, prescriptionOrder) => {
        let modifiedOrderDetails = {...orderDetails};
        if(afterCancellation){
            modifiedOrderDetails.status = "Cancelled";
            modifiedOrderDetails.orderStatus = "C";
            modifiedOrderDetails.showCancelOrderOption = false;
        }else if(validate.isNotEmpty(prescriptionOrder)){
            let healthRecordImages = prescriptionOrder.imageList;
            if(validate.isNotEmpty(healthRecordImages)){
                modifiedOrderDetails.healthRecordImages = healthRecordImages;
            }
        }
        setOrderDetails(modifiedOrderDetails);
        setCancelOrderModalOpen(false);
        setEditPrescModal(false);
    }

    const handleImageLoadError = (index) => {
        console.log("error while getting image");
    }

    if(orderDetailsLoader) {
        return <OrderDetailsGhostImage />
    }

    let orderIdList = validate.isNotEmpty(orderDetailsList) ? orderDetailsList.map(each => each.orderId): [];
    let disablePrevious = validate.isNotEmpty(orderIdList) && (orderIdList[0] == orderId || orderIdList[0] == invoiceId);
    let disableNext = validate.isNotEmpty(orderIdList) && (orderIdList[orderIdList.length - 1] == orderId || orderIdList[orderIdList.length - 1] == invoiceId) && ((isIncludeCancelFromRedux && includeCanceledRecordsCompleted) || (!isIncludeCancelFromRedux && normalRecordsCompleted))

    let imagesForZoom = (validate.isNotEmpty(orderDetails) && validate.isNotEmpty(orderDetails.healthRecordImages)) ? orderDetails.healthRecordImages.map(each => each.imagePath) : [];

    return  <React.Fragment>
                <Alert alertInfo={alertInfo} duration={5000} onDurationEnd={setAlertInfo}/>
                {isEligibleForHelp && <ChatModal chatHeaderDetails={chatHeaderDetails} isModelOpen={startChat} toggleChat={toggleChat} eventType={"ORDER_CHAT"} />}
                <section>
                    <div className="purchase-history">
                        <div className="header">
                            <p>
                                <a title="Back to purchase history" onClick={() => {props.history.push("/ordersHistory"); LocalDB.setValue("fromOrderDetails" , true);}} href="javascript:void(0)">
                                    <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                                        <g transform="translate(-48.941 -316.765)">
                                            <rect fill="none" width="24" height="24" transform="translate(48.941 316.765)"></rect>
                                            <path fill="#000000" d="M59.108,319.236a.915.915,0,0,0-.6.238l-9.3,8.706a.938.938,0,0,0,0,1.312l9.3,8.586a.945.945,0,0,0,1.312-.119.936.936,0,0,0,0-1.312l-7.394-6.917H71.987a.954.954,0,0,0,0-1.908H52.429l7.513-6.917a.847.847,0,0,0,.358-.715,1.7,1.7,0,0,0-.238-.716A5.386,5.386,0,0,0,59.108,319.236Z" transform="translate(0 -0.471)"></path>
                                        </g>
                                    </svg>
                                    Back to Purchase History
                                </a>
                            </p>
                            {validate.isNotEmpty(orderDetailsList) && isFromOrderHistoryHeader && <div className="order-controls">
                                <a href="javascript:void(0)" title="previous Order" className={`btn mr-2 my-0 btn-sm ${disablePrevious ? "disabled" : ""}`} onClick={disablePrevious ? () => false : () => moveNextOrPrevious(-1)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <g transform="translate(-868.477 786) rotate(-90)">
                                            <rect fill="none" width="24" height="24" transform="translate(762 868.477)"/>
                                            <path fill="#080808" d="M61.848,465.874l-5.541,5.541a1.256,1.256,0,1,0,1.776,1.776l4.653-4.64,4.655,4.655a1.261,1.261,0,0,0,2.149-.888,1.248,1.248,0,0,0-.373-.888l-5.543-5.556A1.26,1.26,0,0,0,61.848,465.874Z" transform="translate(711.498 410.651)"/>
                                        </g>
                                    </svg>
                                    <span className="ml-2">Previous Order</span>
                                </a>
                                <a href="javascript:void(0)" title="next Order" className={`btn ml-2 my-0 btn-sm ${disableNext ? "disabled" : "" }`} onClick={disableNext ? () => false : () => moveNextOrPrevious(1)}>
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
                        {
                            <div className="order-detail">
                                <React.Fragment>
                                    <div className="order-heading">
                                        <div>
                                            <h6>
                                                <OrderStatus orderStatus={isInvoiceOrder ? orderDetails.status === "Delivered" ? "D" : "R" : orderDetails.orderStatus} displayStatus={orderDetails.status} />
                                            </h6>
                                        </div>
                                        <div>
                                            <small className="text-muted">Ordered On {moment(new Date(orderDetails.dateCreated)).format("MMM DD, YYYY HH:mm")}</small>
                                            {orderDetails.deliveryDate && isFutureDate(new Date(orderDetails.deliveryDate)) && <React.Fragment><span className="dot-separator text-dark"></span><small className="text-muted">Delivery by {moment(new Date(orderDetails.deliveryDate)).format("MMM DD, YYYY")}</small></React.Fragment>}
                                            <span className="dot-separator text-dark"></span>
                                            {!orderDetails.isPaybackOrder && <small className="text-muted">Total {orderDetails.isRedemptionOrder ? `Redeemed Points`: `Amount`} <strong className="amount-text">{!orderDetails.isRedemptionOrder && <strong className="rupee">&#x20B9;</strong>}{parseFloat(orderDetails.orderAmount)} {orderDetails.isRedemptionOrder &&  `pts`}</strong></small>}
                                            {orderDetails.isPaybackOrder && <small className="text-muted">Total <React.Fragment><strong className="amount-text"><strong className="rupee">&#x20B9;</strong><strong>{parseFloat(orderDetails.orderAmount - orderDetails.totalPaybackPointsValue).toFixed(2)} + {orderDetails.totalPaybackPoints} Pts </strong></strong></React.Fragment></small>}
                                        </div>
                                    </div>
                                    <div className="order-id">
                                        {(validate.isNotEmpty(orderDetails.displayOrderId) || validate.isNotEmpty(orderDetails.displayInvoiceId)) && 
                                            <p>
                                                {orderDetails.convertedToOmsOrder && `Prescription / `}{isInvoiceOrder ? `Invoice ID` : `Order ID`}: 
                                                <strong>{orderDetails.convertedToOmsOrder && `${orderDetails.prescriptionOrderId}  / `}{orderDetails.displayOrderId}</strong>
                                            </p>
                                        }
                                        <div>
                                            {((isInvoiceOrder && validate.isNotEmpty(orderDetails.orderId)) || (!isInvoiceOrder && validate.isNotEmpty(orderDetails.invoiceId))) && ((isInvoiceOrder && orderDetails.orderId > 0) || (!isInvoiceOrder && orderDetails.invoiceId > 0)) && validate.isNotEmpty(orderDetails.pickStoreId) && !orderDetails.isRedemptionOrder &&  
                                                <a className="btn btn-link btn-sm" href="javascript:void(0)" onClick={() => window.open(`${CONFIG.REDIRECT_HOME_URL}my-profile/printInvoiceDetails?invoiceId=${isInvoiceOrder ? orderDetails.orderId : orderDetails.invoiceId}&storeId=${orderDetails.pickStoreId}&company=${orderDetails.company}&tokenId=${LocalDB.getValue("SESSIONID")}`)}>Print Receipt</a>
                                            }
                                            {orderDetails.initiatePayment &&
                                                <a className="btn btn-link btn-sm" href={"/payOnline/"+orderDetails.orderId}>Pay Online</a>
                                            }
                                            {orderDetails.enableRetryPayment && !orderDetails.initiatePayment &&
                                                <a className="btn btn-link btn-sm" href={"/retryPayment/"+orderDetails.orderId}>Retry Payment</a>
                                            }
                                            {/* <a href="">Return Order</a> */}
                                            {orderDetails.hubId && (( ((isInvoiceOrder && validate.isNotEmpty(orderDetails.orderId)) || (!isInvoiceOrder && validate.isNotEmpty(orderDetails.invoiceId))) && ((isInvoiceOrder && orderDetails.orderId > 0) || (!isInvoiceOrder && orderDetails.invoiceId > 0)) ) || orderDetails.orderStatus=='C') && !orderDetails.isRedemptionOrder   &&  !orderDetails.isPaybackOrder &&
                                                <a className="btn btn-link btn-sm" href="javascript:void(0)" onClick={()=>{props.history.push({pathname: `/reOrder/${isInvoiceOrder ? orderDetails.orderId : orderDetails.orderId}`, state:{storeId: orderDetails.pickStoreId, type: `${isInvoiceOrder ? `INVOICE` : `OMS`}`, prevPage : "ORDER_DETAILS" }})}} role="link">Re-Order</a>
                                            }
                                            {orderDetails.showCancelOrderOption &&
                                                <button className="btn btn-link btn-sm" onClick={()=>{setCancelOrderModalOpen(true); setCancelOrderId(orderDetails.orderId)}} role="button">Cancel Order</button>
                                            }
                                            {isEligibleForHelp && <button title="Need Help" className="btn btn-link" onClick={()=>toggleChat(getChatHeaderData("MART_ORDER", orderDetails))} role="button">Need Help?</button>}
                                        </div>
                                    </div>
                                    {validate.isNotEmpty(orderDetails.healthRecordImages) &&
                                        <div className="uploaded-image-container">
                                            <div>
                                                {orderDetails.healthRecordImages.map((each, index) => {
                                                    return <React.Fragment key={each.imageId}>
                                                            <img src={validate.isNotEmpty(each.thumbnailPath) ? each.thumbnailPath : DefaultBanner} title="Click to zoom"  onClick={() => {setLightBoxOpen(true); setImageIndex(index);}} onError={() => handleImageLoadError(index)}/>
                                                            {lightBoxOpen &&
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
                                                })}
                                            </div>
                                            {orderDetails.healthRecordImages.length < 8 && (validate.isEmpty(orderDetails.orderStatus) || orderDetails.orderStatus == 'I') && (orderDetails.orderStatus == 'I' || orderDetails.prescriptionStatus == 'D') &&
                                                <button className="brand-secondary rounded-pill btn px-3" onClick={()=> {setEditPrescModal(true); setEditPrescriptionOrderId(orderDetails.prescriptionOrderId)}}>Edit Prescription</button>
                                            }
                                            {orderDetails.healthRecordImages.length >= 8 && <span>
                                                No Of Images: <strong>{prescriptionOrder.imageList.length}</strong>
                                            </span>}
                                        </div>
                                    }
                                    <GetOrderItems orderDetails={orderDetails} history={props.history}/>
                                    {!isInvoiceOrder && <GetOrderInformation orderDetails={orderDetails} />}
                                    {!isInvoiceOrder && <GetOnlineOrderInformation orderDetails={orderDetails}/>}
                                    {((isInvoiceOrder && validate.isNotEmpty(orderDetails.orderId)) || (!isInvoiceOrder && validate.isNotEmpty(orderDetails.invoiceId))) && ((isInvoiceOrder && orderDetails.orderId > 0) || (!isInvoiceOrder && orderDetails.invoiceId > 0)) && <ReturnDetails orderDetails={orderDetails} isInvoiceOrder={isInvoiceOrder}/>}
                                </React.Fragment>
                            </div>
                        }
                    </div>
                </section>
                <CancelOrder toggle={() => setCancelOrderModalOpen(!cancelOrderModalOpen)} modal={cancelOrderModalOpen} cancelOrderType="OMS" orderId={cancelOrderId} updateOrderList = {() => setModifiedOrderDetails(true , undefined)}/>
                {(orderDetails && orderDetails.healthRecordImages && orderDetails.healthRecordImages.length > 0) && <EditPrescription prescriptionOrderId= {editPrescriptionOrderId} modal={editPrescModal} imageServerDetail={orderDetails.imageServer} closeModal={() => setEditPrescModal(!editPrescModal)} updateNewImages={(prescriptionOrderId) => setModifiedOrderDetails(undefined, prescriptionOrderId)} uploadedImages={orderDetails.healthRecordImages}/> }
            </React.Fragment>
}

const GetOrderItems = ({orderDetails, history}) => {
    const validate = Validate();
    
    if(validate.isEmpty(orderDetails)){
        return <React.Fragment></React.Fragment>
    }

    if(orderDetails.isRedemptionOrder){
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
                    {orderDetails.orderHistoryItemDTOs.map((orderHistoryItem)=>{
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
                                        isGeneral={(orderHistoryItem.isGeneral=="Y" || orderHistoryItem.auditFormSubName === "GEN")} />
                                    </div>
                                }
                                <span>
                                    <a className="text-secondary font-weight-bold no-underline" href={productUrl} title={orderHistoryItem.productName} role="link">{orderHistoryItem.productName}</a>
                                </span>
                            </div>
                        </td>
                        <td nowrap="true">{orderHistoryItem.quantity}</td>
                        <td nowrap="true">{orderHistoryItem.redemptionPoints*orderHistoryItem.quantity}</td>
                    </tr>)})}
                    <tr className="border-top">
                        <td className="text-right" colSpan="5" nowrap="true"><strong>Total Redeemed Points:</strong></td>
                        <td nowrap="true"><strong>{orderDetails.orderAmount}</strong></td>
                    </tr>
                </tbody>
            </table>
        )
    } else {
        let col = 6;
        if(parseFloat(orderDetails.discountTotal) > 0) {
            col = col + 1;
        }
        if(parseFloat(orderDetails.pointsEarned) > 0) {
            col = col + 1;
        }
        return (
            <table className="table border-bottom-0">
                <thead className="thead-light">
                    <tr>
                        <th scope="col" colSpan="4" nowrap="true">Product Name</th>
                        {parseFloat(orderDetails.discountTotal).toFixed(2) > 0 && <th scope="col" nowrap="true">Discount (%)</th>}
                        {parseInt(orderDetails.pointsEarned) > 0 && <th scope="col" nowrap="true">Points</th>}
                        <th scope="col" nowrap="true">{orderDetails.isPaybackOrder ? `Special Price` :  `MRP (Per Unit)`}</th>
                        <th scope="col" nowrap="true">{orderDetails.isPaybackOrder ? `Quantity` : `Quantity (Packs / Units)`}</th>
                        <th scope="col" nowrap="true">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {orderDetails.orderHistoryItemDTOs.map((orderHistoryItem)=>{
                    let imageUrlInfo =  orderHistoryItem.productImage;
                    let productName  = orderHistoryItem.productName;
                    let id = orderHistoryItem.productId;
                    let productUrl = orderDetails.isPaybackOrder ? "javascript:void(0)" : CONFIG.REDIRECT_HOME_URL + getProductUrl(productName, id);
                    let paybackPoints = orderHistoryItem.paybackPoints;
                    return (
                    <tr key={orderHistoryItem.productId}>
                        <td colSpan="4">
                            <div>
                                {imageUrlInfo && 
                                    <div className="product-img-container">
                                    <ProductThumbNail imageUrl={imageUrlInfo} productId={orderHistoryItem.productId} imagesCount={orderHistoryItem.imageUploadCount} 
                                        productName={orderHistoryItem.productName} height="45" auditForm={orderHistoryItem.auditForm}
                                        isGeneral={orderHistoryItem.isGeneral=="Y"} />
                                    </div>
                                }
                                <span>
                                    <a className="text-secondary font-weight-bold no-underline" title={orderHistoryItem.productName} href={productUrl} role="link">{orderHistoryItem.productName}</a>
                                </span>
                            </div>
                        </td>
                        {parseFloat(orderDetails.discountTotal).toFixed(2) > 0  && <td nowrap="true">{(parseFloat(orderHistoryItem.discountPercentage).toFixed(2) > 0 && parseFloat(orderHistoryItem.exactPoints) <= 0) ? parseFloat((orderHistoryItem.discountPercentage).toFixed(2)) : "-"}</td>}
                        {parseInt(orderDetails.pointsEarned) > 0  && <td nowrap="true">{(parseInt(orderHistoryItem.exactPoints) > 0) ? parseFloat(orderHistoryItem.exactPoints * orderHistoryItem.quantity) % 1 > 0 ? parseInt(orderHistoryItem.exactPoints * orderHistoryItem.quantity) + 1 : parseInt(orderHistoryItem.exactPoints * orderHistoryItem.quantity) : "-"}</td>}
                        <td nowrap="true">{orderDetails.isPaybackOrder ? <React.Fragment><strong className="rupee">&#x20B9;</strong>{parseFloat(orderHistoryItem.mrpPerUnit - orderHistoryItem.paybackPointsValue).toFixed(2)} + {paybackPoints} Pts</React.Fragment> : <React.Fragment><strong className="rupee">&#x20B9;</strong><strong>{parseFloat(orderHistoryItem.mrpPerUnit).toFixed(2)}</strong></React.Fragment>}</td>
                        {orderDetails.isPaybackOrder ? <React.Fragment><td nowrap="true">{orderHistoryItem.quantity}</td></React.Fragment> : <React.Fragment><td nowrap="true">{orderHistoryItem.quantity%orderHistoryItem.packSize === 0 ? `${orderHistoryItem.quantity/orderHistoryItem.packSize} Pack / ` : ``}{orderHistoryItem.quantity} Units</td></React.Fragment>}
                        {orderDetails.isPaybackOrder ? <td nowrap="true"><strong className="rupee">&#x20B9;</strong>{parseFloat(((orderHistoryItem.mrpPerUnit - orderHistoryItem.paybackPointsValue)*orderHistoryItem.quantity)).toFixed(2)} + {parseInt(paybackPoints * orderHistoryItem.quantity)} Pts</td> : <td nowrap="true"><strong className="rupee">&#x20B9;</strong>{parseFloat(((orderHistoryItem.mrpPerUnit - orderHistoryItem.paybackPointsValue)*orderHistoryItem.quantity).toFixed(2))}</td>}
                    </tr>)})}
                    
                    {orderDetails.couponCode && orderDetails.couponCode != null && 
                        <tr className="border-top">
                            <td className="text-success" colSpan={col+1} nowrap="true"><strong> Coupon Applied: {orderDetails.couponCode}</strong></td>
                        </tr>
                    }
                    <tr className="border-top"><td colSpan={col+1} className="p-0"></td></tr>
                    {orderDetails.totalAmount > 0 && !orderDetails.isPaybackOrder &&
                    <tr>
                        <td className="text-right" colSpan={col} nowrap="true"><strong> Sub Amount:</strong></td>
                        <td nowrap="true"><strong className="rupee">&#x20B9;</strong><strong>{parseFloat((orderDetails.totalAmount).toFixed(2))}</strong></td>
                    </tr>}
                    {(orderDetails.discountTotal !== undefined && orderDetails.discountTotal !== null && parseFloat(orderDetails.discountTotal) > 0)  &&
                    <tr>
                        <td className="text-right" colSpan={col} nowrap="true"><strong>Discount Amount:</strong></td>
                        <td nowrap="true">-<strong className="rupee"> &#x20B9;</strong><strong>{orderDetails.discountTotal && parseFloat(orderDetails.discountTotal) > 0 ? parseFloat((orderDetails.discountTotal).toFixed(2)) : orderDetails.amountSaved && parseFloat(orderDetails.amountSaved) > 0 ? parseFloat(orderDetails.amountSaved).toFixed(2) : 0.00 }</strong></td>
                    </tr>}
                    {validate.isNotEmpty(orderDetails.shippingChargesBeforeDiscount) && orderDetails.shippingChargesBeforeDiscount > 0 &&
                        <tr>
                            <td className="text-right" colSpan={col} nowrap="true"><strong> Delivery Charges:</strong></td>
                            <td nowrap="true"><strong className="rupee">&#x20B9;</strong>{orderDetails.shippingCharges < orderDetails.shippingChargesBeforeDiscount ? <strong><del>{parseFloat((orderDetails.shippingChargesBeforeDiscount).toFixed(2))}</del> <span>{orderDetails.shippingCharges > 0 ? <span><strong className="rupee">&#x20B9;</strong>{parseFloat((orderDetails.shippingCharges).toFixed(2))}</span> : "FREE"}</span></strong> : <strong>{parseFloat((orderDetails.shippingCharges).toFixed(2))}</strong>}</td>
                        </tr>
                    }
                    {validate.isNotEmpty(orderDetails.pointsEarned) && orderDetails.pointsEarned > 0 && (orderDetails.discountTotal > 0 || orderDetails.pointsEarned > 0) &&
                        <tr>
                            <td className="text-right" colSpan={col} nowrap="true"><strong> Points:</strong></td>
                            <td nowrap="true"><strong className="rupee">Pts</strong> <strong>{parseInt(orderDetails.pointsEarned)}</strong></td>
                        </tr>
                    }
                    {(!orderDetails.isPaybackOrder && orderDetails.totalPaybackPoints > 0 && orderDetails.totalPaybackPoints !== undefined) && orderDetails.orderStatus !== "C" && 
                        <tr>
                            <td className="text-right" colSpan={col} nowrap="true"><strong>{(orderDetails.status != "Delivered" && orderDetails.status != "Returned")? "MedPlus Payback Points to be Credited:":"MedPlus Payback Points Credited:"}</strong></td>
                            <td nowrap="true"><strong>{parseInt(orderDetails.totalPaybackPoints)}</strong></td>
                        </tr>
                    }
                    <tr className="border-top">
                        <td className="text-right" colSpan={col} nowrap="true"><strong>{orderDetails.isPaybackOrder ? `Total:` : `Total Amount:`}</strong></td>
                        <td nowrap="true">{orderDetails.isPaybackOrder ? <React.Fragment><strong className="rupee">&#x20B9;</strong><strong>{parseFloat(orderDetails.orderAmount - orderDetails.totalPaybackPointsValue).toFixed(2)} + {parseInt(orderDetails.totalPaybackPoints)} Pts</strong></React.Fragment> : <React.Fragment><strong className="rupee">&#x20B9;</strong><strong>{parseFloat(orderDetails.orderAmount).toFixed(2)}</strong></React.Fragment>}</td>
                    </tr>
                </tbody>
            </table>
        )
    }
}

const GetOrderInformation = ({orderDetails}) => {
    const validate = Validate();
    return  <React.Fragment>
                <div className="row mx-0 mb-3">
                    {validate.isNotEmpty(orderDetails.communityDropPoint) &&
                    <div className="col-lg-5 col-md-6">
                        <strong>Community Delivery Address:</strong>
                        <p>Name: <span className="font-weight-bold">{orderDetails.firstName}</span></p>
                        <p>Address: {orderDetails.address}</p>
                        <p>Email: <span className="text-primary">{orderDetails.email}</span></p>
                        <p>Mobile: {orderDetails.shippingMobileNumber}</p>
                        <p className="text-capitalize">Drop off point: {orderDetails.communityDropPoint}</p>
                    </div>}
                    {orderDetails.deliveryType == "S" &&
                    <div className="col-lg-5 col-md-6">
                        <strong>Pick Up Store Information:</strong>
                        <ShowPickUpStore
                            pickStoreName={orderDetails.pickStoreName}
                            pickUpAddress={orderDetails.address}
                            locationLatLong={orderDetails.locationLatLong}
                            phoneNumber={orderDetails.shippingMobileNumber}
                            isSmallAddressRequired={false}
                            />
                        
                    </div>}
                    {orderDetails.deliveryType == "D" && validate.isEmpty(orderDetails.communityDropPoint) && 
                    <div className="col-lg-5 col-md-6">
                        <strong>Delivery Information:</strong>
                        <p>Name: <strong>{orderDetails.firstName}</strong></p>
                    <p>Address: {orderDetails.address}</p>
                        {validate.isNotEmpty(orderDetails.email) && <p>
                            <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="18.001" height="18" viewBox="0 0 18.001 18">
                                <g transform="translate(-180.257 -177.901)">
                                    <rect fill="none" width="18" height="18" transform="translate(180.257 177.901)"/>
                                    <g transform="translate(180.258 180.052)">
                                        <path fill="#343a40" d="M2.2,13.7A2.2,2.2,0,0,1,0,11.5V2.2A2.2,2.2,0,0,1,2.2,0H15.8A2.2,2.2,0,0,1,18,2.205V11.5a2.2,2.2,0,0,1-2.2,2.2ZM1.006,2.205V11.5a1.2,1.2,0,0,0,1.2,1.2H15.8A1.2,1.2,0,0,0,17,11.5h0V2.205a1.2,1.2,0,0,0-1.2-1.2H2.2A1.2,1.2,0,0,0,1.006,2.205Zm14.075,9.456L10.6,7.408,9.348,8.533a.5.5,0,0,1-.669,0L7.457,7.445l-4.5,4.212a.5.5,0,0,1-.342.134.515.515,0,0,1-.369-.16.506.506,0,0,1,.022-.712L6.7,6.768,2.246,2.786a.5.5,0,1,1,.67-.752L7.735,6.347a.817.817,0,0,1,.083.07.017.017,0,0,0,.006.011L9.01,7.487l6.07-5.449a.5.5,0,1,1,.675.748l-4.4,3.948,4.421,4.2a.5.5,0,0,1,.018.711.5.5,0,0,1-.711.018Z" transform="translate(0 0)"/>
                                    </g>
                                </g>
                            </svg>
                            <a className="text-primary" title="Click to Mail" href={"mailTo:"+orderDetails.email}>{orderDetails.email}</a>
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
                            <a className="text-primary" title="Click to Mail" href={"tel:"+orderDetails.shippingMobileNumber}>{orderDetails.shippingMobileNumber}</a>
                        </p>
                    </div>}
                    <div className="col-lg-4 col-md-6">
                        <strong>Order Information:</strong>
                        <p>Status: <span className="font-weight-bold">{orderDetails.orderDisplayStatus}</span></p>
                        <p>Delivery Type: <span className="font-weight-bold">{getDeliveryType(orderDetails.deliveryType,validate.isNotEmpty(orderDetails.communityDropPoint))}</span></p>
                        <p>Order Date/Time: {moment(new Date(orderDetails.dateCreated)).format("MMM DD, YYYY HH:mm")}</p>
                    </div>
                </div>
            </React.Fragment>
}

const GetOnlineOrderInformation = ({orderDetails}) => {
    const validate = Validate();

    if(validate.isEmpty(orderDetails)){
        return <React.Fragment></React.Fragment>
    }
    
    const [informationLoader, setInformationLoader] = useState(true);
    const [activeTabName, setActiveTabName] = useState("TrackOrder");
    const [trackInfo, setTrackInfo] = useState({});
    const [paymentInfoLoader, setPaymentInfoLoader] = useState(false);
    const [paymentDetail, setPaymentDetail] = useState({});
    const [refundDetail, setRefundDetail] = useState({});
    const [refundDeliveryCharges, setRefundDeliveryCharges] = useState(0.0);
    const [totalRefundAmount,setTotalRefundAmount]=useState(0.00);
    const [totalPbPoints, setTotalPbPoints] = useState(0);
    const bottomContainerRef = React.useRef();

    useEffect(() => {
        setActiveTabName("TrackOrder");
        MyAccountService().getOrderTrackInfo(orderDetails.orderId).then().then(data => {
            setTrackInfo(data.dataObject);
            setInformationLoader(false);
        });
    }, []);

    const getOrderPaymentDetails = () => {
        setActiveTabName("PaymentDetails");
        setPaymentInfoLoader(true);
        MyAccountService().getOrderPaymentDetails(orderDetails.orderId).then(response => {
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
                    setRefundDeliveryCharges(res.refundDeliveryCharges);
                    setTotalPbPoints(res.totalPBPoints);
                    if(validate.isNotEmpty(res.refundDeliveryCharges) && parseFloat(res.refundDeliveryCharges)>0){
                        setTotalRefundAmount(parseFloat(res.refundDeliveryCharges)+parseFloat(res.totalRefundAmount));
                    }else{
                        setTotalRefundAmount(res.totalRefundAmount);
                    }
                } else {
                    setRefundDetail([]);
                    setTotalRefundAmount(0.00);
                }
			}
            setPaymentInfoLoader(false);
        }).catch(function(error) {
            console.log(error);
            setPaymentInfoLoader(false);
        });
    }

    if(informationLoader){
        return  <TrackOrderGhostImage />
    }
    return  <React.Fragment>
        <div ref={bottomContainerRef}></div>
                    <div className="tab-section">
                        <ul className="nav nav-pills nav-justified" id="pills-tab" role="tablist">
                            <li className="nav-item">
                                <a className={"nav-link py-3 " + (activeTabName == "TrackOrder" ? "active":"")} href="javascript:void(0)" id="pills-track-order-tab" data-toggle="pill"  role="tab" aria-controls="pills-track-order" aria-selected={activeTabName == "TrackOrder"} onClick={() => setActiveTabName("TrackOrder")}>Track Order</a>
                            </li>
                            {orderDetails.showPayments && <li className="nav-item">
                                <a className={"nav-link py-3 "+(activeTabName == "PaymentDetails" ? "active":"")} href="javascript:void(0)" id="pills-payment-details-tab" data-toggle="pill"  role="tab" aria-controls="pills-payment-details" aria-selected={activeTabName == "PaymentDetails"} onClick={() => getOrderPaymentDetails(orderDetails.orderId)}>Payment Details</a>
                            </li>}
                        </ul>
                        <div className="tab-content">
                            {activeTabName == "TrackOrder" && 
                                <div className="tab-pane pills-track-order show active" id="pills-track-order" role="tabpanel" aria-labelledby="pills-track-order-tab">
                                {validate.isNotEmpty(orderDetails) && validate.isNotEmpty(trackInfo) &&
                                    <TrackOrder trackInfo={trackInfo} displayOrderId={orderDetails.displayOrderId}/>
                                }
                                </div>
                            }
                            {activeTabName == "PaymentDetails" && 
                                <div className="tab-pane pills-payment-details fade show active" id="pills-payment-details" role="tabpanel" aria-labelledby="pills-payment-details-tab">
                                    {validate.isNotEmpty(paymentDetail) && <PaymentDetails paymentDetail={paymentDetail} isPaybackOrder={orderDetails.isPaybackOrder} orderPaybackPointsRedeemed={orderDetails.totalPaybackPoints} />}
                                    {validate.isNotEmpty(refundDetail) && <RefundDetails refundDetail={refundDetail} purchaseDetails={orderDetails} isPaybackOrder={orderDetails.isPaybackOrder} totalRefundAmount={totalRefundAmount} totalPBPoints={totalPbPoints} refundDeliveryCharges={refundDeliveryCharges}/>}
                                    {!paymentInfoLoader && validate.isEmpty(paymentDetail) && validate.isEmpty(refundDetail) && <p>No payments Info</p>}
                                </div>
                            }
                        </div>
                    </div>
                    
            </React.Fragment>
}

const PaymentDetails = ({paymentDetail, orderPaybackPointsRedeemed}) => {
    const validate = Validate();
    return  <div className="border rounded mb-3">
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
                            <td nowrap="true">{payment.mode == "Medplus Payback Points" ? <React.Fragment>{orderPaybackPointsRedeemed} Pts </React.Fragment> : <React.Fragment><strong className="rupee">&#x20B9;</strong>{parseFloat(payment.amount).toFixed(2)}</React.Fragment>} </td>
                            <td nowrap="true">{payment.mode}</td>
                            <td nowrap="true">{payment.status}</td>
                        </tr>
                    )
                }})}
                </tbody>
                </table>
            </div>
}

const RefundDetails = ({refundDetail,purchaseDetails,totalRefundAmount,refundDeliveryCharges,totalPBPoints, isPaybackOrder }) => {
    const validate = Validate();
    return  <div className="border rounded mb-3">
                <table className="table mb-0 border-0">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col" nowrap="true">Refund ID</th>
                            <th scope="col" nowrap="true">Product Name</th>
                            {isPaybackOrder && <th scope="col" nowrap="true">Special Price</th>}
                            <th scope="col" nowrap="true">Refund Qty</th>
                            <th scope="col" nowrap="true">Refund Reason</th>
                            {!isPaybackOrder && <th scope="col" nowrap="true">MRP (Rs)</th>}
                            {!isPaybackOrder && <th scope="col" nowrap="true">Rate (Rs)</th>}
                            <th scope="col" nowrap="true">{isPaybackOrder ? `Total` : `Amount`}</th>
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
                                    <td>{isPaybackOrder
                                        ?
                                            <a href="javascript:void(0);" title={productName} className="text-dark">{productName}</a>
                                        :
                                            <Link to={productUrl} title={productName} className="text-dark">{productName}</Link>}
                                    </td>
                                    {isPaybackOrder && <td nowrap="true"><strong className="rupee">&#x20B9;</strong>{parseFloat(refund.specialPrice).toFixed(2)}{ " + " +parseInt(refund.paybackPoints)+ " Pts"}</td>}
                                    <td nowrap="true">{refund.quantity}</td>
                                    <td nowrap="true">{refund.refundReason}</td>
                                    {!isPaybackOrder && <td nowrap="true"><strong className="rupee">&#x20B9;</strong>{parseFloat(refund.mrp).toFixed(2)}</td>}
                                    {!isPaybackOrder && <td nowrap="true"><strong className="rupee">&#x20B9;</strong>{parseFloat(refund.rate).toFixed(2)} </td>}
                                    {!isPaybackOrder ? <React.Fragment><td nowrap="true"><strong className="rupee">&#x20B9;</strong>{parseFloat(refund.eachRefundItemAmount).toFixed(2)}</td></React.Fragment> : <React.Fragment><td nowrap="true"><strong className="rupee">&#x20B9;</strong>{parseFloat(refund.eachRefundItemAmount-(refund.paybackPointsValue*refund.quantity)).toFixed(2)}{" + "+parseInt(refund.paybackPoints*refund.quantity)+" Pts"}</td></React.Fragment>}
                                </tr>
                            }
                        </React.Fragment>
                    )
                    })}
                    {validate.isNotEmpty(refundDeliveryCharges) && parseFloat(refundDeliveryCharges)>0 &&
                        <tr class="border-top">
                            <td nowrap="true" className="text-right" colSpan={isPaybackOrder ? "5" :"6"}>Delivery Charges</td>
                            <td nowrap="true"><strong class="rupee">&#x20B9;</strong> <strong>{Number(refundDeliveryCharges).toFixed(2)}</strong></td>
                        </tr>
                    }
                    <tr class="border-top">
                        <td nowrap="true" className="text-right" colSpan={isPaybackOrder ? "5" : "6"}>Total Refund</td>
                        <td nowrap="true"><strong class="rupee">&#x20B9;</strong> <strong>{Number(totalRefundAmount).toFixed(2)} <React.Fragment>{ (isPaybackOrder) && "+ " +parseInt(totalPBPoints)+ " Pts"}</React.Fragment></strong>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
}

const ReturnDetails = ({ orderDetails, isInvoiceOrder }) => {
    const [showReturnLoader, setShowReturnLoader] = useState(true);
    const [orderReturnInfo, setOrderReturnInfo] = useState();

    useEffect(() => {
        if(isInvoiceOrder){
            MyAccountService().getReturnOrderDetails(orderDetails.orderId, orderDetails.company).then(data => {
               if("SUCCESS" == data.statusCode)
                    setOrderReturnInfo(data.dataObject.returnInfoList);
                setShowReturnLoader(false);
            })
        }else{
            MyAccountService().getOrderReturnInfo(orderDetails.invoiceId, orderDetails.company, orderDetails.isReturned, Validate().isNotEmpty(orderDetails.returnRequestIds)).then(data => {
                setOrderReturnInfo(data.dataObject);
                setShowReturnLoader(false);
            });
        }
    }, []);

    if(showReturnLoader){
        return <OrderDetailsGhostImage />
    }
    if(Validate().isEmpty(orderDetails)){
        return <React.Fragment></React.Fragment>
    }
    if(Validate().isNotEmpty(orderReturnInfo)){
        if(isInvoiceOrder){
            return orderReturnInfo.map((returnItem)=> {
                return (
                <div className="return-details" key={returnItem.refundId}>
                    <hr className="border-dark border-dashed my-4" />
                    <div className="order-heading">
                        <div className="d-flex align-items-center">
                            <h6>
                                Return Details
                            </h6>
                            <span className="dot-separator text-dark"></span>
                            <p className="order-id p-0">Return ID <strong>{returnItem.refundId}</strong></p>
                        </div>
                        <div>
                            <small className="text-muted">Date of Return {moment(new Date(returnItem.dateCreated)).format("MMM DD, YYYY HH:mm")}</small>
                            <span className="dot-separator text-dark"></span>
                            <small className="text-muted">Total Amount <strong className="amount-text"><strong className="rupee">&#x20B9;</strong>{parseFloat(returnItem.totalRefund).toFixed(2)}</strong></small>
                        </div>
                    </div>
                    <table className="table border-bottom-0 mb-0">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col" colSpan="4" nowrap="true">Product Name</th>
                                <th className="text-left" scope="col" nowrap="true">Mfg / Mkt</th> 
                                <th scope="col" nowrap="true">Quantity</th>
                                <th scope="col" nowrap="true">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {returnItem.productDetails && returnItem.productDetails.map((returnedProduct)=>{
                                let productItems = orderDetails.orderHistoryItemDTOs;
                                let product=undefined;
                                productItems.map(item=>{
                                    if(item.productId == returnedProduct.productId){
                                        product= item;
                                    }
                                })
                                let imageUrlInfo = product.productImage;
                                let productName  = returnedProduct.productName;
                                    return (
                                    <tr key={returnedProduct.ProductID}>
                                        <td colSpan="4">
                                            <div>
                                            {imageUrlInfo && <ProductThumbNail imageUrl={imageUrlInfo} productId={product.ProductId} imagesCount={product.imageUploadCount} 
                                                productName={productName} height="45"
                                                auditForm={product.auditForm}
                                                isGeneral={(product.isGeneral=="Y" || product.auditForm === "GEN") ? true : false} /> 
                                            }
                                            <span>
                                                <a className="text-dark" title={productName} href="javascript:void(0)">{productName}</a>
                                            </span>
                                            </div>
                                        </td>
                                        <td className="text-left">{returnedProduct.manufacturer}</td> 
                                        <td nowrap="true">{returnedProduct.quantity}</td>
                                        <td nowrap="true"><strong className="rupee">&#x20B9;</strong>{parseFloat(returnedProduct.productRefund).toFixed(2)}</td>
                                    </tr>)}
                            )}
                            <tr className="border-top">
                                <td className="text-right" colSpan="6" nowrap="true"><strong>Total Amount:</strong></td>
                                <td nowrap="true"><strong className="rupee">&#x20B9;</strong> <strong>{parseFloat(returnItem.totalRefund).toFixed(2)}</strong></td>
                            </tr>
                        </tbody>
                    </table>
                </div>)})
        }else{
            let productDetails = new Map();
            orderDetails.orderHistoryItemDTOs.map((orderHistoryItem)=>{
                productDetails.set(orderHistoryItem.productId,{
                    productName : orderHistoryItem.productName,
                    imageUrlInfo : {imageUrl: orderHistoryItem.productImage, imageUploadCount: orderHistoryItem.imageUploadCount, auditFormSubName: orderHistoryItem.auditForm, isGeneral: orderHistoryItem.isGeneral},
                })
            });
            return  <React.Fragment>
                        <ReturnsHistory orderReturnInfo = {orderReturnInfo} paymentType = {orderDetails.paymentType} orderId = {orderDetails.orderId} productDetails = {productDetails} />
                    </React.Fragment>
        }
    }else{
        return <React.Fragment></React.Fragment>
    }
}