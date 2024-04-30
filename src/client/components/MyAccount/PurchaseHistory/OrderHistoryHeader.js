
import React, { useState, useEffect } from 'react';
import OrderIcon from '../../../images/common/order-refill-cssbg.svg';
import Validate from '../../../helpers/Validate';
import SplitOrderIcn1 from '../../../images/common/split-order-1.svg';
import SplitOrderIcn2 from '../../../images/common/split-order-2.svg';
import PrescriptionImg from '../../../images/common/prescription-image.png';
import NoRefilImage from '../../../images/common/no-refill.svg';
import moment from "moment";
import Image from '../../Common/Image';
import CONFIG from '../../../constants/ServerConfig';
import EditPrescription from "./EditPrescription";
import ImageLightBox from '../../Common/ImageLightBox/ImageLightBox';
import { getSelectedLocality } from '../../../../redux/action/LocalityAction';
import LocalDB from '../../../DataBase/LocalDB';
import BroswerHelper from '../../../helpers/BroswerHelper';
import { useSelector } from 'react-redux';
import MyAccountService from '../../../services/MyAccountService';
import CancelOrder from './CancelOrder';
import Alert from '../../Common/Alert'
import PurchaseHistoryAction from '../../../../redux/action/PurchaseHistoryAction';
import {getProductUrl} from '../../../helpers/CommonUtil';
import MetaTitle from '../../../commonComponents/MetaTitle';
import { useChatModal } from '../../Chat/Common/useChatModal';
import ChatModal from '../../Chat/Common/ChatModal';
import { getChatHeaderData } from '../../Chat/Common/ChatHelper';

const isFutureDate = (deliveryDate) => {
    let now = new Date();
    if (now.setHours(0, 0, 0, 0) <= deliveryDate.setHours(0, 0, 0, 0)) {
      return true;
    }
    return false;
};

const OrderHistoryHeader = (props) => {

    const validate = Validate();
    const myAccountService = MyAccountService();
    const purchaseHistoryAction = PurchaseHistoryAction();

    // Order Header Related states
    const [cartIdsForOrderHeader, setCartIdsForOrderHeader] = useState([]);
    const [orderHeaderData, setOrderHeaderData] = useState({});
    const [oldestDateAllowed, setOldestDateAllowed] = useState(undefined);
    const [includeCancel, setIncludeCancel] = useState();
    const [orderHeaderLoading, setOrderHeaderLoading] = useState(false);
	const [orderHeaderSyncLoader, setOrderHeaderSyncLoader] = useState(false);
    const [orderLoadMoreLoader, setOrderLoadMoreLoader] = useState(false);
    const [noOrdersFound, setNoOrdersFound] = useState(false);
    const [alertInfo, setAlertInfo] = useState({});
    const [cancelOrderId, setCancelOrderId] = useState("");
    const [cancelOrderType, setCancelOrderType] = useState("");
    const [cancelOrderModalOpen, setCancelOrderModalOpen] = useState(false);
    const [editPrescModalOpen, setEditPrescModalOpen] = useState(false);
    const [editImageServerDetail, setEditImageServerDetail] = useState();
    const [editPrescriptionOrderId, setEditPrescriptionOrderId] = useState();
    const [editHealthRecordImages, setEditHealthRecordImages] = useState();

    const [isLightBoxOpen, setLightBoxOpen] = useState(false);
    const [lightBoxImageIndex, setLightBoxImageIndex] = useState(0);
    const [imagesForZoom, setImagesForZoom] = useState([]);
    const [cartWiseImagesForZoom, setCartWiseImagesForZoom] = useState({});
    const [startChat,chatHeaderDetails,toggleChat] = useChatModal();

    const openImageLightBox = (orderTypeCartId, imageIndex) => {
        if(validate.isNotEmpty(cartWiseImagesForZoom) && validate.isNotEmpty(cartWiseImagesForZoom[orderTypeCartId])){
            setImagesForZoom(cartWiseImagesForZoom[orderTypeCartId]);
            setLightBoxImageIndex(imageIndex);
            setLightBoxOpen(true);
        }
    }

    const normalOrdersFromRedux = useSelector(state => {
        if(validate.isNotEmpty(state) && validate.isNotEmpty(state.purchaseHistory) 
        && validate.isNotEmpty(state.purchaseHistory.normalOrders)){
            return state.purchaseHistory.normalOrders;
        }
    });

    const includeCancledOrdersFromRedux = useSelector(state => {
        if(validate.isNotEmpty(state) && validate.isNotEmpty(state.purchaseHistory) 
        && validate.isNotEmpty(state.purchaseHistory.includeCanceledOrders)){
            return state.purchaseHistory.includeCanceledOrders;
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

    useEffect(() => {
        getOrderHistory((LocalDB.getValue("fromOrderDetails") || LocalDB.getValue("fromReOrderPage")) ? isIncludeCancelFromRedux : undefined);
    }, []);


    const setModifiedPurchaseHistoryInRedux = (afterCancellation, prescriptionOrder) => {
        let initialNormalOrderList = validate.isNotEmpty(normalOrdersFromRedux) ? [...normalOrdersFromRedux] : [];
        let initialCanceledOrderList = validate.isNotEmpty(includeCancledOrdersFromRedux) ? [...includeCancledOrdersFromRedux] : [];
        let initialNormalOrderListSize = initialNormalOrderList.length;
        let initialCanceledOrderListSize = initialCanceledOrderList.length;
        if(afterCancellation){
            let indexInNormalOrder = initialNormalOrderList.findIndex(orderInfo => {return cancelOrderType == "PRESCRIPTION" ? orderInfo.prescriptionOrderId == cancelOrderId : orderInfo.orderId == cancelOrderId});
            let indexInCancelOrder = initialCanceledOrderList.findIndex(orderInfo => {return cancelOrderType == "PRESCRIPTION" ? orderInfo.prescriptionOrderId == cancelOrderId: orderInfo.orderId == cancelOrderId});
            initialNormalOrderList.splice(indexInNormalOrder, 1);
            if(initialCanceledOrderList.length && validate.isNotEmpty(initialCanceledOrderList[indexInCancelOrder])){
                let order = initialCanceledOrderList[indexInCancelOrder];
                order.displayStatus = "Cancelled";
                order.orderAmount = 0;
                order.status = "C";
                initialCanceledOrderList.splice(indexInCancelOrder, 1, order);
            }
        }else if(validate.isNotEmpty(prescriptionOrder)){
            let indexInNormalOrder = initialNormalOrderList.findIndex(orderInfo => {return orderInfo.prescriptionOrderId == prescriptionOrder.prescriptionOrderId});
            let indexInCancelOrder = initialCanceledOrderList.findIndex(orderInfo => {return orderInfo.prescriptionOrderId == prescriptionOrder.prescriptionOrderId});
            let orderInCanceledList = initialCanceledOrderList[indexInCancelOrder];
            let orderInNormalList = initialNormalOrderList[indexInNormalOrder];
            if(orderInCanceledList && initialCanceledOrderList.length){
                orderInCanceledList.healthRecordImages = prescriptionOrder.imageList;
                initialCanceledOrderList[indexInCancelOrder] = orderInCanceledList;
            }
            if(orderInNormalList && initialNormalOrderList.length){
                orderInNormalList.healthRecordImages = prescriptionOrder.imageList;
                initialNormalOrderList[indexInNormalOrder] = orderInNormalList; 
            }
        }
        let persistObject = {"normalOrders" : initialNormalOrderList, "includeCanceledOrders" : initialCanceledOrderList};
        purchaseHistoryAction.savePurchaseHistory(persistObject);
        let nonPersistNormalOrderList = validate.isNotEmpty(nonPersistNormalOrders) ? [...nonPersistNormalOrders] : [];
        let nonPersistIncludeCanceledOrderList = validate.isNotEmpty(nonPersistIncludedCanceledOrders) ? [...nonPersistIncludedCanceledOrders] : [];
        if(validate.isNotEmpty(nonPersistNormalOrderList)){
            Array.prototype.splice.apply(nonPersistNormalOrderList, [0, initialNormalOrderListSize].concat(initialNormalOrderList));
        }else if(validate.isNotEmpty(nonPersistIncludeCanceledOrderList)){
            Array.prototype.splice.apply(nonPersistIncludeCanceledOrderList, [0, initialCanceledOrderListSize].concat(initialCanceledOrderList));
        }
        let nonPersistObject = {"nonPersistNormalOrders" : nonPersistNormalOrderList, "nonPersistIncludedCanceledOrders" : nonPersistIncludeCanceledOrderList};
        prepareOrderHeaderToShow( includeCancel ? nonPersistIncludeCanceledOrderList : nonPersistNormalOrderList);
        purchaseHistoryAction.saveNonPersistentPurchaseHistory(nonPersistObject);
        setCancelOrderModalOpen(false);
        setEditPrescModalOpen(false);
    }

    const getOrderHistory = (isInlcudeCancel) => {
        let loadOrders = LocalDB.getObject("loadOrders");
        let loadNormalOrder = loadOrders ? loadOrders.loadNormalOrder : false;
        let loadCanceledOrder = loadOrders ? loadOrders.loadCanceledOrder : false;
        if(isInlcudeCancel){
            loadOrders = {loadNormalOrder, "loadCanceledOrder" : false};
        }else{
            loadOrders = {"loadNormalOrder" : false, loadCanceledOrder};
        }
        LocalDB.setObject("loadOrders", loadOrders);
        if((isInlcudeCancel && validate.isNotEmpty(includeCancledOrdersFromRedux)) 
                || (!isInlcudeCancel && validate.isNotEmpty(normalOrdersFromRedux))) {
                let ordersList = isInlcudeCancel ? includeCancledOrdersFromRedux : normalOrdersFromRedux;
                if(validate.isNotEmpty(ordersList[0]) && parseInt(ordersList[0].customerId) !== parseInt(medplusId)){
                    purchaseHistoryAction.clearPurchaseHistory();
                    setOrderHeaderLoading(true);
                }else{
                    setOrderHeaderSyncLoader(true);
                    setOrderHeaderLoading(false);
                    prepareOrderHeaderToShow(ordersList);
                }
        } else {
            setOrderHeaderLoading(true);
        }
        if((validate.isNotEmpty(nonPersistIncludedCanceledOrders) && isInlcudeCancel && !loadCanceledOrder) 
            || (validate.isNotEmpty(nonPersistNormalOrders) && !isInlcudeCancel && !loadNormalOrder)){
                prepareOrderHeaderToShow(isInlcudeCancel ? nonPersistIncludedCanceledOrders : nonPersistNormalOrders);
                setIncludeCancel(isInlcudeCancel);
                setNoOrdersFound(false);
                try{
                    if((LocalDB.getValue("fromOrderDetails") || LocalDB.getValue("fromReOrderPage")) && LocalDB.getValue("orderHistoryScrollTop")){
                        document.getElementsByTagName("html")[0].scrollTop = LocalDB.getValue("orderHistoryScrollTop");
                    }
                }catch(err){
                    console.log(err);
                }
                LocalDB.removeValue("orderHistoryScrollTop");
                LocalDB.removeValue("fromOrderDetails");
                LocalDB.removeValue("fromReOrderPage");
                setOrderHeaderLoading(false);
                setOrderHeaderSyncLoader(false);
        }else{
            getOrderHistoryFromApi(isInlcudeCancel);
            LocalDB.removeValue("orderHistoryScrollTop");
            LocalDB.removeValue("fromOrderDetails");
            LocalDB.removeValue("fromReOrderPage");
        }
    }

    const getOrderHistoryFromApi = (isIncludeCancel, pageNo, loadMore) => {
        setIncludeCancel(isIncludeCancel);
        if(loadMore){
            setOrderLoadMoreLoader(true);
        }
        myAccountService.getOrderHistory(isIncludeCancel, pageNo).then(response => {
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
                }
                if(validate.isNotEmpty(dataObject)){
                    if(validate.isEmpty(dataObject.orderHeaderData) && !dataObject.reachedLastDate){
                        getOrderHistoryFromApi(isIncludeCancel, pageNoFromApi+1, loadMore);
                    } else {
                        let orderDataFromAPI = validate.isNotEmpty(dataObject.orderHeaderData) ? [...dataObject.orderHeaderData] : [];
                        if(pageNoFromApi == 1){
                            if(isIncludeCancel){
                                reduxObject['includeCanceledOrders'] = orderDataFromAPI;
                            } else {
                                reduxObject['normalOrders'] = orderDataFromAPI;
                            }
                        }
                        if(isIncludeCancel){
                            reduxObject['includeCanceledPageNo'] = pageNoFromApi + 1;
                            reduxObject['nonPersistIncludedCanceledOrders'] = loadMore ? [...nonPersistIncludedCanceledOrders, ...orderDataFromAPI] : [...orderDataFromAPI];
                            if(!dataObject.reachedLastDate)
                                reduxObject['includeCanceledRecordsCompleted'] = false;
                        } else {
                            reduxObject['normalOrdersPageNo'] = pageNoFromApi + 1;
                            reduxObject['nonPersistNormalOrders'] = loadMore ? [...nonPersistNormalOrders, ...orderDataFromAPI] : [...orderDataFromAPI];
                            if(!dataObject.reachedLastDate)
                                reduxObject['normalRecordsCompleted'] = false;
                        }
                        let orderDataList = isIncludeCancel ? reduxObject['nonPersistIncludedCanceledOrders'] : reduxObject['nonPersistNormalOrders'];
                        prepareOrderHeaderToShow(orderDataList);
                        if(validate.isEmpty(orderDataList)){
                            setNoOrdersFound(true);
                        }else{
                            setNoOrdersFound(false);
                        }
                        setOldestDateAllowed(dataObject.lastAvailableDate);
                        setOrderHeaderSyncLoader(false);
                        setOrderHeaderLoading(false);
                        setOrderLoadMoreLoader(false);
                    }
                }
                purchaseHistoryAction.savePurchaseHistory({...reduxObject, isIncludeCancel});
            }else{
                setAlertInfo({message : response.message});
                setOrderHeaderSyncLoader(false);
                setOrderHeaderLoading(false);
                setOrderLoadMoreLoader(false);
            }
        }).catch(function(error) {
            setOrderHeaderLoading(false);
            setOrderHeaderSyncLoader(false);
            setOrderLoadMoreLoader(false);
            console.log(error);
        });
    }

    const loadMoreOrder = () => {
        let pageNo = includeCancel ? includeCanceledPageNoFromRedux : normalOrdersPageNoFromRedux;
        getOrderHistoryFromApi(includeCancel, pageNo, true);
    }

    const prepareOrderHeaderToShow = (orderData) => {
        let orderHeaderToShow = {};
        let cartIdsList = [];
        let orderDetailsList = [];
        if(validate.isNotEmpty(orderData)){
        	orderData.map(each => {
                if(each.isPrescriptionOrder){
                    let key = `PRESCRIPTION:${each.prescriptionOrderId}`;
                    orderHeaderToShow[key] = [each];
                    cartIdsList.push(key);
                } else if (validate.isEmpty(each.orderId) && validate.isNotEmpty(each.invoiceId) && parseInt(each.invoiceId) > 0) {
                    let key = `INVOICE:${each.invoiceId}`;
                    orderHeaderToShow[key] = [each];
                    cartIdsList.push(key);
                    let orderDetails = {};
                    orderDetails["isInvoice"] = true;
                    orderDetails["company"] = each.company;
                    orderDetails["isReturned"] = each.isReturned;
                    orderDetails["orderId"] = each.invoiceId;
                    orderDetailsList.push(orderDetails);
                } else if (validate.isNotEmpty(each.orderId)) {
                    let key = `OMS:${each.cartId}`;
                    if(!cartIdsList.includes(key)){
                        cartIdsList.push(key);
                        orderHeaderToShow[key] = [each];
                    }else{
                        orderHeaderToShow[key] = [...orderHeaderToShow[key], each]; 
                    }
                    if(!each.isPrescriptionOrder){
                        let orderDetails = {};
                        orderDetails["isInvoice"] = false;
                        orderDetails["company"] = each.company;
                        orderDetails["isReturned"] = each.isReturned;
                        orderDetails["orderId"] = each.orderId;
                        orderDetailsList.push(orderDetails);
                    }
                }
            });
            setCartIdsForOrderHeader(cartIdsList);
            setOrderHeaderData(orderHeaderToShow);
            purchaseHistoryAction.savePurchaseHistory({orderDetailsList})
        }

        let cartWiseImages = {};
        if(validate.isNotEmpty(cartIdsList) && validate.isNotEmpty(orderHeaderToShow)) {
            cartIdsList.map(orderTypeCartId => {
                let orders = orderHeaderToShow[orderTypeCartId];
                let imagesForZoom = [];
                if(orders[0] && validate.isNotEmpty(orders[0].healthRecordImages)){
                    imagesForZoom = orders[0].healthRecordImages.map(eachImage => {
                        return eachImage.imagePath;
                    });
                    cartWiseImages[orderTypeCartId] = imagesForZoom;
                }
            });
        }
        setCartWiseImagesForZoom(cartWiseImages);

        return {cartIdsList, orderHeaderToShow};
    }

    const redirectToHome = ()=>{
        window.location.href = CONFIG.REDIRECT_HOME_URL;
    }

    const setRef = (e1, order) => {
        if(validate.isNotEmpty(refs[order.orderId])){
            refs[order.orderId].current = e1;
        }
    }

    const cancelOrder = (orderId, cancelOrderType) => {
        setCancelOrderModalOpen(!cancelOrderModalOpen);
        setCancelOrderType(cancelOrderType);
        setCancelOrderId(orderId);
    }

    const editPrescOrder = (cancelPrescId, cancelImageServerDetail, cancelHealthRecordImages) => {
        setEditPrescModalOpen(!editPrescModalOpen);
        setEditImageServerDetail(cancelImageServerDetail);
        setEditPrescriptionOrderId(cancelPrescId);
        setEditHealthRecordImages(cancelHealthRecordImages);
    }

    const getOrderHistoryLoader = () => {
        return  <React.Fragment>
                    <div class="card">
                        <div class="card-header">
                            <div class="ph-item m-0 p-0 w-100">
                                <div class="ph-col-12 p-0">
                                    <div class="ph-row p-0 my-3">
                                        <div class="ph-col-6 mb-0"></div>
                                        <div class="ph-col-4 empty mb-0"></div>
                                        <div class="ph-col-2 mb-0"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="ph-item mb-0 pt-3 px-0">
                                <div class="ph-col-1 p-0">
                                    <div class="ph-picture ml-32" style={{'height':'36px', 'width': '36px'}}></div>
                                </div>
                                <div>
                                    <div class="ph-row">
                                        <div class="ph-col-4"></div>
                                        <div class="ph-col-6 empty"></div>
                                        <div class="ph-col-2"></div>
                                        <div class="ph-col-4"></div>
                                        <div class="ph-col-6 empty"></div>
                                        <div class="ph-col-2"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="card-header">
                            <div class="ph-item m-0 p-0 w-100">
                                <div class="ph-col-12 p-0">
                                    <div class="ph-row p-0 my-3">
                                        <div class="ph-col-6 mb-0"></div>
                                        <div class="ph-col-4 empty mb-0"></div>
                                        <div class="ph-col-2 mb-0"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="ph-item mb-0 pt-3 px-0">
                                <div class="ph-col-1 p-0">
                                    <div class="ph-picture ml-32" style={{'height':'36px', 'width': '36px'}}></div>
                                </div>
                                <div>
                                    <div class="ph-row">
                                        <div class="ph-col-4"></div>
                                        <div class="ph-col-6 empty"></div>
                                        <div class="ph-col-2"></div>
                                        <div class="ph-col-4"></div>
                                        <div class="ph-col-6 empty"></div>
                                        <div class="ph-col-2"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
    }

    if(orderHeaderLoading){
        return  <React.Fragment>
                    <section>
                        <div className="purchase-history">
                            <div className="header">
                                <p>
                                    Purchase History <br/>
                                    {oldestDateAllowed && <small className="text-muted">Records available from {moment(new Date(oldestDateAllowed)).format("MMM DD, YYYY")}</small>}
                                </p>
                            </div>
                            <div className="purchase-order-list">
                                {getOrderHistoryLoader()}
                            </div>
                        </div>
                    </section>
                </React.Fragment>
    }

    if(noOrdersFound){
        return  <section>
                    <MetaTitle metaKey={`ORDER_HISTORY`}/>
                    <div className="purchase-history">
                        <div className="header">
                            <p>
                                Purchase History<br/>
                                {oldestDateAllowed && <small className="text-muted">Records available from {moment(new Date(oldestDateAllowed)).format("MMM DD, YYYY")}</small>}
                            </p>
                            <div className="custom-control custom-checkbox font-weight-normal">
                                <input type="checkbox" className="custom-control-input" id="include-cancel-order" onClick={(e) => getOrderHistory(e.target.checked)} checked={includeCancel} />
                                <label className="custom-control-label pointer" htmlFor="include-cancel-order">Include Cancelled Orders</label>
                            </div>
                        </div>
                        <div className="no-purchase-history body-height">
                            <svg className="mb-3" xmlns="http://www.w3.org/2000/svg" width="85.86" height="92.336" viewBox="0 0 85.86 92.336">
                                <g transform="translate(-24 -6.5)">
                                    <path fill="#b1b1b1" d="M324.078,214.427a10.083,10.083,0,0,0,10.072-10.072v-5.188a1.11,1.11,0,1,0-2.221,0v5.188a7.852,7.852,0,1,1-15.7,0v-5.188a1.11,1.11,0,1,0-2.221,0v5.188A10.084,10.084,0,0,0,324.078,214.427Z" transform="translate(-236.342 -156.111)"/>
                                    <path fill="#b1b1b1" d="M30.927,89.328c.2,0,.4-.011.592-.027H46.793v2.082a7.45,7.45,0,0,0,7.442,7.442H75.982q.163.012.329.012a1.116,1.116,0,1,0,0-2.232h-.235a2.346,2.346,0,0,1-2.107-2.332V81.733h29.358A6.541,6.541,0,0,0,109.86,75.2a1.117,1.117,0,0,0-.011-.153l-5.063-36.327a.1.1,0,0,0,0-.019,3.8,3.8,0,0,0-3.775-3.229H84.956l-1.35-9.682,0-.019a4.322,4.322,0,0,0-4.291-3.67H75.284V18.3a11.8,11.8,0,0,0-23.591,0v3.8H47.664a4.322,4.322,0,0,0-4.29,3.67l0,.019L41.166,41.61a4.3,4.3,0,0,0-1.02-.116,4.05,4.05,0,0,0-2.5.823,2.006,2.006,0,0,1-2.518,0,4.21,4.21,0,0,0-5,0,2,2,0,0,1-2.517,0,4.048,4.048,0,0,0-2.5-.822A1.11,1.11,0,0,0,24,42.6V82.4a6.935,6.935,0,0,0,6.927,6.927Zm5.1-2.248A6.9,6.9,0,0,0,37.854,82.4v-2.85a4.469,4.469,0,1,1,8.939,0V87.08Zm18.2,9.524a5.227,5.227,0,0,1-5.221-5.221V79.552A6.664,6.664,0,0,0,47.3,75.083H66.527A5.227,5.227,0,0,1,71.748,80.3V94.274a4.535,4.535,0,0,0,.641,2.332Zm48.354-57.568,5.052,36.236a4.318,4.318,0,0,1-4.312,4.24h-29.4a7.457,7.457,0,0,0-5.783-6.471l4.74-34a1.594,1.594,0,0,1,1.581-1.345h26.544a1.593,1.593,0,0,1,1.58,1.345ZM53.914,18.3a9.575,9.575,0,1,1,19.15,0v3.8H53.914Zm-8.345,7.81a2.112,2.112,0,0,1,2.1-1.785h4.029v5.942a1.11,1.11,0,1,0,2.221,0V24.321h19.15v5.942a1.11,1.11,0,1,0,2.221,0V24.321h4.029a2.112,2.112,0,0,1,2.1,1.785l1.305,9.365h-8.25A3.8,3.8,0,0,0,70.689,38.7l0,.019-4.76,34.143H56.294V42.6a1.11,1.11,0,0,0-1.11-1.11,4.05,4.05,0,0,0-2.5.823,2.009,2.009,0,0,1-2.519,0,4.211,4.211,0,0,0-5,0,1.885,1.885,0,0,1-1.258.444,1.843,1.843,0,0,1-.644-.1ZM26.221,44.059l.148.1a4.21,4.21,0,0,0,5,0,2.006,2.006,0,0,1,2.518,0,4.21,4.21,0,0,0,5,0,2.007,2.007,0,0,1,2.518,0,4.21,4.21,0,0,0,5,0,2.008,2.008,0,0,1,2.519,0,4.212,4.212,0,0,0,5,0l.149-.1v28.8H42.323a6.7,6.7,0,0,0-6.69,6.69V82.4a4.706,4.706,0,0,1-9.413,0Z" transform="translate(0 0)"/>
                                    <path fill="#b1b1b1" d="M81.291,266.374a1.11,1.11,0,0,0,1.11,1.11H96.614a1.11,1.11,0,0,0,0-2.221H82.4A1.11,1.11,0,0,0,81.291,266.374Z" transform="translate(-46.69 -210.882)"/>
                                    <path fill="#b1b1b1" d="M53.529,267.485h2.3a1.11,1.11,0,0,0,0-2.221h-2.3a1.11,1.11,0,0,0,0,2.221Z" transform="translate(-23.16 -210.882)"/>
                                    <path fill="#b1b1b1" d="M96.614,298H82.4a1.11,1.11,0,0,0,0,2.221H96.614a1.11,1.11,0,1,0,0-2.221Z" transform="translate(-46.69 -237.56)"/>
                                    <path fill="#b1b1b1" d="M53.529,300.221h2.3a1.11,1.11,0,0,0,0-2.221h-2.3a1.11,1.11,0,0,0,0,2.221Z" transform="translate(-23.16 -237.56)"/>
                                    <path fill="#b1b1b1" d="M96.614,330.733H82.4a1.11,1.11,0,0,0,0,2.221H96.614a1.11,1.11,0,1,0,0-2.22Z" transform="translate(-46.69 -264.236)"/>
                                    <path fill="#b1b1b1" d="M53.529,332.954h2.3a1.11,1.11,0,1,0,0-2.22h-2.3a1.11,1.11,0,0,0,0,2.221Z" transform="translate(-23.16 -264.236)"/>
                                    <path fill="#b1b1b1" d="M53.529,234.751H63.7a1.11,1.11,0,1,0,0-2.221H53.529a1.11,1.11,0,1,0,0,2.221Z" transform="translate(-23.16 -184.205)"/>
                                    <path fill="#b1b1b1" d="M179.133,396.835a1.338,1.338,0,0,1,1.336,1.336,1.11,1.11,0,1,0,2.221,0,3.562,3.562,0,0,0-2.446-3.377v-.414a1.11,1.11,0,1,0-2.221,0v.414a3.555,3.555,0,0,0,1.11,6.934,1.336,1.336,0,1,1,.019,2.672h-.037a1.337,1.337,0,0,1-1.318-1.335,1.11,1.11,0,1,0-2.221,0,3.561,3.561,0,0,0,2.447,3.377v.525a1.11,1.11,0,1,0,2.221,0v-.525a3.555,3.555,0,0,0-1.11-6.933,1.336,1.336,0,1,1,0-2.672Z" transform="translate(-123.528 -315.201)"/>
                                    <path fill="#b1b1b1" d="M234.011,453.726H229.96a1.11,1.11,0,0,0,0,2.221h4.051a1.11,1.11,0,1,0,0-2.221Z" transform="translate(-166.944 -364.47)"/>
                                    <path fill="#b1b1b1" d="M234.011,427.276H229.96a1.11,1.11,0,0,0,0,2.221h4.051a1.11,1.11,0,1,0,0-2.221Z" transform="translate(-166.944 -342.914)"/>
                                    <path fill="#b1b1b1" d="M234.011,400.827H229.96a1.11,1.11,0,0,0,0,2.221h4.051a1.11,1.11,0,0,0,0-2.221Z" transform="translate(-166.944 -321.36)"/>
                                </g>
                            </svg>
                            <h6 className="mb-3">No Purchase History</h6>
                            <button role="button" className="btn btn-brand-gradient rounded-pill ml-2 px-5 custom-btn-lg" onClick={redirectToHome}>Start Ordering</button>
                        </div>
                    </div>
                </section>
    }

    let orderDataToShow = {};
    let cartIdsToShow = [];
    try{
        if(validate.isEmpty(orderHeaderData)){
            if((isIncludeCancelFromRedux && validate.isNotEmpty(nonPersistIncludedCanceledOrders)) || (!isIncludeCancelFromRedux && validate.isNotEmpty(nonPersistNormalOrders))){
                let orderDataToShowObject = prepareOrderHeaderToShow(isIncludeCancelFromRedux ? nonPersistIncludedCanceledOrders : nonPersistNormalOrders);
                if(validate.isNotEmpty(orderDataToShowObject)){
                	orderDataToShow = orderDataToShowObject.orderHeaderToShow;
                	cartIdsToShow = orderDataToShowObject.cartIdsList;
                }
            }
        }else{
            orderDataToShow = orderHeaderData;
            cartIdsToShow = cartIdsForOrderHeader;
        }
    }catch(err){
        orderDataToShow = orderHeaderData;
        cartIdsToShow = cartIdsForOrderHeader;
    }
    

    return (
        <React.Fragment>
            <MetaTitle metaKey={`ORDER_HISTORY`}/>
            <Alert alertInfo={alertInfo} duration={5000} onDurationEnd={setAlertInfo}/>
            
            {validate.isNotEmpty(orderHeaderData) && 
                <section>
                    <ChatModal chatHeaderDetails={chatHeaderDetails} isModelOpen={startChat} toggleChat={toggleChat} eventType={"ORDER_CHAT"} />
                    <div className="purchase-history">
                        <div className="header">
                            <p>
                                Purchase History <br/>
                                {oldestDateAllowed && <small className="text-muted">Records available from {moment(new Date(oldestDateAllowed)).format("MMM DD, YYYY")}</small>}
                            </p>
                            <div className="custom-control custom-checkbox font-weight-normal">
                                <input type="checkbox" className="custom-control-input" id="include-cancel-order" onClick={(e) => getOrderHistory(e.target.checked)} checked={includeCancel} />
                                <label className="custom-control-label pointer" htmlFor="include-cancel-order">Include Cancelled Orders</label>
                            </div>
                        </div>
                        {orderHeaderSyncLoader &&
                            <div className="text-center w-100 mb-2">
                                <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                            </div>
                        }
                        <div className="purchase-order-list">
                            <GetOrderHeaderCard history={props.history}
                                                toggleChat = {toggleChat}
                                                cartIdsForOrderHeader={cartIdsToShow} 
                                                orderHeaderData={orderDataToShow}
                                                openImageLightBox = {(orderTypeCartId, imageIndex) => openImageLightBox(orderTypeCartId, imageIndex)}
                                                cancelOrder = {(orderId, cancelOrderType) => cancelOrder(orderId, cancelOrderType)}
                                                editPrescOrder = {(prescOrderId, cancelImageServerDetail, cancelHealthRecordImages) => editPrescOrder(prescOrderId, cancelImageServerDetail, cancelHealthRecordImages)}/>
                        </div>
                        {((includeCancel && !includeCanceledRecordsCompleted) || (!includeCancel && !normalRecordsCompleted)) &&
                            <div class="text-center">
                                {orderLoadMoreLoader ? 
                                    <button role="button" type="submit" className="brand-secondary rounded-pill btn px-5 spinner-loader">
                                        <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                                        <span className="sr-only"></span>
                                    </button>
                                    :
                                    <button role="button" class="brand-secondary rounded-pill btn px-5 custom-btn-lg" onClick={()=>{loadMoreOrder()}}>Load more orders</button>
                                }
                            </div>
                        }
                    </div>
                </section>
            }
            <CancelOrder toggle={() => setCancelOrderModalOpen(!cancelOrderModalOpen)} modal={cancelOrderModalOpen} orderId={cancelOrderId} cancelOrderType={cancelOrderType} updateOrderList = {() => setModifiedPurchaseHistoryInRedux(true , undefined)}/>
            <EditPrescription prescriptionOrderId= {editPrescriptionOrderId} modal={editPrescModalOpen} imageServerDetail={editImageServerDetail} closeModal={() => setEditPrescModalOpen(!editPrescModalOpen)} updateNewImages={(prescriptionOrderId) => setModifiedPurchaseHistoryInRedux(undefined, prescriptionOrderId)} uploadedImages={editHealthRecordImages}/>
            {isLightBoxOpen &&
                <ImageLightBox style={{"z-index":1060}} 
                    prescImages={imagesForZoom} imageIndex={lightBoxImageIndex}
                    mainSrc={imagesForZoom[lightBoxImageIndex]}
                    nextSrc={imagesForZoom[(lightBoxImageIndex + 1) % imagesForZoom.length]}
                    prevSrc={imagesForZoom[(lightBoxImageIndex + imagesForZoom.length - 1) % imagesForZoom.length]}
                    onCloseRequest={() => {setLightBoxImageIndex(0); setLightBoxOpen(false);}}
                    onMovePrevRequest={() => setLightBoxImageIndex((lightBoxImageIndex + imagesForZoom.length - 1) % imagesForZoom.length)}
                    onMoveNextRequest={() => setLightBoxImageIndex((lightBoxImageIndex + 1) % imagesForZoom.length)}
                />
            }
        </React.Fragment>); 
}

export const OrderStatus = (props) => {
        let orderRightIconColor = "#08CE73";
        let status = props.orderStatus;
        let statusClass = "ml-2 text-orange font-weight-bold";
        let showStatus = props.displayStatus;
        
        switch(status) {
            case "I":
                    orderRightIconColor = "#FC8019";
                    statusClass = "ml-2 text-orange font-weight-bold";
                    break;
            case "A":
            case "M":
            case "P":
            case "SI":
                    /* orderRightIconColor = "#2699fb";
                    statusClass = "ml-2 text-primary font-weight-bold";
                    break; */
            case "D":
            case "T":
            case "E":
            case "R":
            case "SD":
            case "SR":
            case "SW":
            case "SA":
            case "SC":
            case "SE":
            case "SF":
            case "SU":
            case "SO":
            case "NM":
            case "--":
                    orderRightIconColor = "#08CE73";
                    statusClass = "ml-2 text-success font-weight-bold";
                    break;
            case "C":
            case "F":
            case "X":
                    orderRightIconColor = "#e71c37";
                    statusClass = "ml-2 text-brand font-weight-bold";
                    break;
            default:
                orderRightIconColor = "#08CE73";
                statusClass = "ml-2 text-success font-weight-bold";
                break;
        }
        if(props.displayStatus == "Payment Failed"){
            orderRightIconColor = "#e71c37";
            statusClass = "ml-2 text-brand font-weight-bold";
        }
        switch(props.displayStatus) {
            case "Created":
            case "Approved":
            case "Invoiced":
            case "Delivered":
            case "Edited":
            case "Cancelled":
            case "Returned":
            case "Processing":
                    showStatus = props.displayStatus;
                    break;
            default:
                    showStatus = props.displayStatus;
                    break;
        }
        if(props.isPrescriptionOrder){
            switch(status) {
                case "I":
                    showStatus = "Prescription Order Created";
                    break;
                case "T":
                    showStatus = "Prescription Decoded";
                    break;
                case "P":
                    showStatus = "pending";
                    break;
            }
        } else {
            switch(status) {
                case "F":
                    showStatus = "Failed";
                    break;
                }
        }
        return (
            <React.Fragment>
                {showStatus && 
                    <React.Fragment>
                            {<React.Fragment>
                                {(status == 'C' || status == 'X' || status == 'F' ||  props.paymentStatus == 'F' || props.displayStatus === "Payment Failed")  ?
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <g transform="translate(0 -0.384)">
                                            <circle fill="#e71c37" cx="12" cy="12" r="12" transform="translate(0 0.384)"/>
                                            <path fill="#fff" d="M6.156,13.156V7.844H.843a.844.844,0,0,1,0-1.687H6.156V.843a.844.844,0,0,1,1.688,0V6.156h5.313a.844.844,0,0,1,0,1.688H7.844v5.313a.844.844,0,0,1-1.687,0Z" transform="translate(11.899 2.383) rotate(45)"/>
                                        </g>
                                    </svg>
                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 23.999 24">
                                        <g data-name="Group 14808" transform="translate(-1154 -448)">
                                            <path id="Path_195" data-name="Path 195" d="M1786.571,36.242a12,12,0,1,1-12,12A12,12,0,0,1,1786.571,36.242Z" transform="translate(-620.571 411.758)" fill={orderRightIconColor}/>
                                            <path id="Path_3698" data-name="Path 3698" d="M1787.169,58.46l-.158.028c-.171-.053-.421-.093-.528-.241l-3.974-3.971a.7.7,0,0,1,.073-1.013.659.659,0,0,1,.987.076l3.458,3.311,9.46-9.42a.745.745,0,0,1,1.053-.018.794.794,0,0,1,.019,1.08l-10.024,9.935A.611.611,0,0,1,1787.169,58.46Z" transform="translate(-623.748 406.747)" fill="#fff" stroke="rgba(0,0,0,0)" strokeMiterlimit="10" strokeWidth="1"/>
                                        </g>
                                    </svg>}
                                </React.Fragment>
                            }
                            <span className={statusClass}>{showStatus}</span>
                    </React.Fragment>
                }
            </React.Fragment>
        );
}

const GetOrderHeaderCard = (props) => {
    const validate = Validate();

    if(validate.isEmpty(props) || validate.isEmpty(props.cartIdsForOrderHeader) ||  validate.isEmpty(props.orderHeaderData)){
        return <React.Fragment></React.Fragment>
    }
    let cartIdsForOrderHeader = props.cartIdsForOrderHeader;
    let orderHeaderData = props.orderHeaderData;

    return cartIdsForOrderHeader.map(orderTypeCartId => {
        let isPrescriptionOrder = false;
        let isInvoiceOrder = false;
        if(orderTypeCartId.startsWith("PRESCRIPTION")){
            isPrescriptionOrder = true;
        } else if(orderTypeCartId.startsWith("INVOICE")) {
            isInvoiceOrder = true;
        }
        let orders = orderHeaderData[orderTypeCartId];
        if(validate.isEmpty(orders)){
            return <React.Fragment></React.Fragment>
        }

        let multipleOrders = orders.length > 1;
        let ordersToShow = orders.map(eachOrder => {
            
            return  <React.Fragment key={isPrescriptionOrder ? eachOrder.prescriptionOrderId : isInvoiceOrder ? eachOrder.displayInvoiceId : eachOrder.displayOrderId}>
                        <div className={multipleOrders ? "each-split-order" : "card"}>
                            <div className="card-header">
                                <div>
                                    <OrderStatus orderStatus={eachOrder.status} displayStatus={eachOrder.displayStatus} isPrescriptionOrder={eachOrder.isPrescriptionOrder}></OrderStatus>
                                    <span className="dot-separator text-dark"></span>
                                    <small className="text-muted mr-2">{isPrescriptionOrder ? `Prescription ID: ` : isInvoiceOrder ? `Invoice ID: ` : `Order ID: `}</small>
                                    <strong>{isPrescriptionOrder ? eachOrder.prescriptionOrderId : isInvoiceOrder ? eachOrder.displayInvoiceId : eachOrder.displayOrderId}</strong>
                                </div>
                                <div className="text-right">
                                    {!multipleOrders && <small><span className="text-secondary">Ordered On</span> <strong> {moment(new Date(eachOrder.dateCreated)).format("MMM DD, YYYY HH:mm")}</strong></small>}
                                    {validate.isNotEmpty(eachOrder.invoiceDateCreated) && eachOrder.displayStatus == "Delivered" &&
                                        <React.Fragment>
                                            {!multipleOrders && <span className="dot-separator text-dark"></span>}
                                            <small><span className="text-secondary">Delivered On</span> 
                                                {validate.isNotEmpty(eachOrder.invoiceDateCreated) && <strong> {moment(new Date(eachOrder.invoiceDateCreated)).format("MMM DD, YYYY HH:mm")}</strong>}
                                            </small>
                                        </React.Fragment>
                                    }
                                    {validate.isEmpty(eachOrder.invoiceDateCreated) && validate.isNotEmpty(eachOrder.dateModified) && eachOrder.displayStatus == "Delivered" && eachOrder.isRedemptionOrder && 
                                        <React.Fragment>
                                            {!multipleOrders && <span className="dot-separator text-dark"></span>}
                                            <small><span className="text-secondary">Delivered On</span> 
                                                {validate.isNotEmpty(eachOrder.dateModified) && <strong> {moment(new Date(eachOrder.dateModified)).format("MMM DD, YYYY HH:mm")}</strong>}
                                            </small>
                                        </React.Fragment>
                                    }
                                    {eachOrder.deliveryDate && (eachOrder.status != 'C' && eachOrder.status != 'X') && (eachOrder.deliveryType == 'D' ? (eachOrder.displayStatus != 'Shipment Rejected' && eachOrder.displayStatus != "Delivered") :  eachOrder.status != 'D') && isFutureDate(new Date(eachOrder.deliveryDate)) && <React.Fragment>
                                    {!multipleOrders && <span className="dot-separator text-dark"></span>}
                                        <small><span className="text-secondary">Delivery by</span> <strong> {moment(new Date(eachOrder.deliveryDate)).format("MMM DD, YYYY")}</strong></small>
                                    </React.Fragment>}
                                </div>
                            </div>
                            {isPrescriptionOrder ? 
                                <React.Fragment>
                                    <div className="card-body">
                                        <div className="order-info pl-3">
                                            <p className="d-flex">
                                                {eachOrder.healthRecordImages && eachOrder.healthRecordImages.map((eachImage, index)=>{
                                                    if(index < 2){
                                                        return  <React.Fragment>
                                                                    <Image key={eachImage.imageId} src={eachImage.thumbnailPath} className="uploaded-prescription" handleError='' alt="prescription Image" onClick={() => props.openImageLightBox(orderTypeCartId, index)}/>
                                                                </React.Fragment>
                                                    }
                                                })}
                                                {eachOrder.healthRecordImages && eachOrder.healthRecordImages.length > 2 && <span className="more-images">{eachOrder.healthRecordImages.length-2} more</span>}
                                            </p>
                                            <p className="small">
                                                {eachOrder.healthRecordImages && <span>No. of Images <strong> {eachOrder.healthRecordImages.length}</strong></span>}
                                            </p>
                                        </div>
                                        <div className="order-options">
                                            <div className="text-info">
                                                
                                            </div>
                                            <div>
                                                {eachOrder.healthRecordImages.length < 8 && (validate.isEmpty(eachOrder.status) || eachOrder.status == 'I' ) &&
                                                    <button role="button" className="btn btn-link" title="Edit Prescription" onClick={() => {props.editPrescOrder(eachOrder.prescriptionOrderId, eachOrder.imageServer, eachOrder.healthRecordImages)}}>Edit Prescription</button>
                                                }
                                                {eachOrder.showCancelOrderOption &&
                                                    <button role="button" className="btn btn-link" title="Cancel Order"  onClick={() => {props.cancelOrder(eachOrder.prescriptionOrderId, "PRESCRIPTION")}}>Cancel Order</button>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </React.Fragment>
                                :
                                <React.Fragment>
                                    <div className="card-body">
                                        <div className="order-info">
                                            <img alt="order" src={OrderIcon}/>
                                            <p className="products-name w-50">
                                                {eachOrder.orderItems && eachOrder.orderItems.map((product, index)=> {
                                                        if(index < 2){
                                                            return(
                                                                <React.Fragment>
                                                                    <span>
                                                                    	<a role="link" className="text-secondary font-weight-bold no-underline" title={product.productName} href={eachOrder.isPaybackOrder ? "javascript:void(0)" : CONFIG.REDIRECT_HOME_URL + getProductUrl(product.productName, product.productId)}>
                                                                            {product.productName}
                                                                        </a>
                                                                    </span>
                                                                </React.Fragment>
                                                            )
                                                        }
                                                    }
                                                )}
                                                {eachOrder.orderItems && eachOrder.orderItems.length > 2 && <span className="d-inline-block ml-2 text-muted align-top">({eachOrder.orderItems.length - 2 } MORE)</span>}
                                            </p>
                                            <p className="small w-50">
                                                {(eachOrder.orderAmount > 0 && !eachOrder.isPaybackOrder) && <React.Fragment><span>{eachOrder.isRedemptionOrder ? `Total Points` : `Total Amount`} <strong>{!eachOrder.isRedemptionOrder && <strong className="rupee">&#x20B9;</strong>}{eachOrder.isRedemptionOrder ? parseInt(eachOrder.orderAmount) : parseFloat(eachOrder.orderAmount).toFixed(2)}</strong></span> <br/></React.Fragment>}
                                                {eachOrder.isPaybackOrder && <React.Fragment><span>Total: <strong className="rupee">&#x20B9;</strong><strong>{parseFloat(eachOrder.orderAmount - eachOrder.totalPaybackPointsValue).toFixed(2)} + {eachOrder.totalPaybackPoints} Pts</strong></span><br/></React.Fragment>}
                                                {eachOrder.orderItems && <span>No. of Items <strong> {eachOrder.orderItems.length}</strong></span>}
                                            </p>
                                        </div>
                                        <div className="order-options">
                                            <div>
                                                {(validate.isNotEmpty(eachOrder.returnMsg)) && <span class="text-secondary">{eachOrder.returnMsg}</span>}
                                            </div>
                                            <div>
                                                <button role="button" className="btn btn-link" title="view order" onClick={()=>{LocalDB.setValue("orderHistoryScrollTop", document.getElementsByTagName("html")[0].scrollTop); window.scrollTo(0, 0); props.history.push({pathname:isInvoiceOrder ? `/invoiceDetails/${eachOrder.invoiceId}/${eachOrder.pickStoreId}`: `/orderDetails/${eachOrder.orderId}`, state:{isFromOrderHistoryHeader:true}});}}>View Order</button>
                                                {eachOrder.showCancelOrderOption &&
                                                    <button role="button" className="btn btn-link" title="Cancel Order" onClick={()=>{props.cancelOrder(eachOrder.orderId, "OMS")}}>Cancel Order</button>
                                                }
                                                {eachOrder.hubId && (( ((isInvoiceOrder && validate.isNotEmpty(eachOrder.invoiceId)) || (!isInvoiceOrder && validate.isNotEmpty(eachOrder.invoiceId))) && ((isInvoiceOrder && eachOrder.invoiceId > 0) || (!isInvoiceOrder && eachOrder.invoiceId > 0)) ) || eachOrder.status=='C') && !eachOrder.isRedemptionOrder && !eachOrder.isPaybackOrder &&
                                                    <button role="button" className="btn btn-link" title="Re-Order" onClick={()=>{LocalDB.setValue("orderHistoryScrollTop", document.getElementsByTagName("html")[0].scrollTop); window.scrollTo(0, 0); props.history.push({pathname: `/reOrder/${isInvoiceOrder ? eachOrder.invoiceId : eachOrder.orderId}`, state:{storeId: eachOrder.pickStoreId, type: isInvoiceOrder ? "INVOICE" : "OMS", prevPage : "ORDER_HISTORY"}})}}>Re-Order</button>
                                                }
                                                {eachOrder.isEligibleForHelp &&
                                                    <button role="button" className="btn btn-link" title="Need Help?" onClick={()=>{props.toggleChat(getChatHeaderData("MART_ORDER_HEADER", eachOrder))}}>Need Help?</button>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </React.Fragment>
                            }
                        </div>
                    </React.Fragment>
        })
            

        if(multipleOrders){
            return(<React.Fragment>
            <div className="card split-order">
                        <div className="order-container pt-0">
                            <h6 className="order-type border-0">
                                <p>
                                    <strong>Order placed as {orders.length} parts</strong>
                                </p>
                                <span className="text-secondary">Ordered On <strong> {moment(new Date(orders[0].dateCreated)).format("MMM DD, YYYY HH:mm")}</strong></span>
                            </h6>
                            {ordersToShow}
                        </div>
                    </div>
                    </React.Fragment>);
        } else {
            return(
            <React.Fragment>
                {ordersToShow}
            </React.Fragment>); 
            
        }
    })
}

export default OrderHistoryHeader;