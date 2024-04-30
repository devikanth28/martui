import React, { useState, useEffect } from 'react';
import OrderIcon from '../../../images/common/order-refill-cssbg.svg';
import Validate from '../../../helpers/Validate';
import PurchaseHistoryOrder from './PurchaseHistoryOrder';
import PurchaseHistoryOrderDetail from './PurchaseHistoryOrderDetail';
import PurchaseHistoryReOrder from './PurchaseHistoryReOrder';
import MyAccountService from '../../../services/MyAccountService';
import Alert ,{ALERT_TYPE_ERROR,ALERT_TYPE_SUCCESS} from '../../Common/Alert';
import { OrderDetailsGhostImage} from './PurchaseHistoryGhostImage';
import moment from "moment";
import PurchaseHistoryAction from '../../../../redux/action/PurchaseHistoryAction';
import InvoiceOrderDetail from './InvoiceOrderDetail';
import CancelOrder from './CancelOrder';
import ReOrder from './ReOrder';
import LocalDB from '../../../DataBase/LocalDB';
import CONFIG from '../../../constants/ServerConfig';
import UserInfoAction from '../../../../redux/action/UserInfoAction';

const PurchaseHistory = (props) => {
    const validate = Validate();
    const myAccountService = MyAccountService();
    
    const [alertInfo, setAlertInfo] = useState({});


    // Order Header Related states
    const [cartIds, setCartIds] = useState([]);
    const [orderHeader, setOrderHeader] = useState({});
    const [oldestDateAllowed, setOldestDateAllowed] = useState(undefined);


    const [isOrderHistoryDetailOpen, setOrderHistoryDetailOpen] = useState(false);
    const [isInvoiceOrderHistoryDetailOpen, setInvoiceOrderHistoryDetailOpen] = useState(false);
    const [isReOrderOpen, setReOrderOpen] = useState(false);
    const [purchaseDetails,setPurchaseDetails] = useState({});
    //const [returnInfo,setReturnInfo] = useState([]);
    const [productImageURLs, setProductImageURLs] = useState({});

    const [invoiceDetails,setInvoiceDetails] = useState({});
    const [imageServerDetail, setImageServerDetail] = useState({});
	const [omsOrderId,setOmsOrderId] =  useState(0);
    const purchaseHistoryAction = PurchaseHistoryAction();
    let loadOrders = LocalDB.getObject("loadOrders");
    let loadNormalOrders = loadOrders ? loadOrders.loadNormalOrder : false;
    let loadCanceledOrder = loadOrders ? loadOrders.loadCanceledOrder : false;
    const purchaseHistoryData = purchaseHistoryAction.getPurchaseHistory();
    const [excludeCanceled, setExcludeCanceled] = useState(validate.isNotEmpty(purchaseHistoryData) && validate.isNotEmpty(purchaseHistoryData.excludeCanceled) && !(loadNormalOrders && loadCanceledOrder) ? purchaseHistoryData.excludeCanceled : true);
    const [isOrderHeaderLoading, setOrderHeaderLoading] = useState(true);
	const [orderHeaderSyncLoader, setOrderHeaderSyncLoader] = useState(false);
    const [orderHeaderDetails, setOrderHeaderDetails] = useState({});
    const [fromDateStr, setFromDateStr] = useState(null);
    const [endDateStr, setEndDateStr] = useState(null);
    const [displayInvoiceId, setDisplayInvoiceId] = useState(null);

    const [noOrderHeaderFound, setNoOrderHeaderFound] = useState(false);
    const [nextPurchaseHistoryLoader, setNextPurchaseHistoryLoader] =useState(false);

    const [showLoadMore, setShowLoadMore] = useState(validate.isNotEmpty(purchaseHistoryData) && !(loadNormalOrders && loadCanceledOrder) ? excludeCanceled ? purchaseHistoryData.normalLoadMore : purchaseHistoryData.includeCancelLoadMore : true);
	const [isCancelOrderModalOpen,setCancelOrderModalOpen] =  useState(false);
    const [orderToBeCancel,setOrderToBeCancel] = useState({});
    const [paymentStatus,setPaymentStatus] = useState("");
    const [companyForDetails, setCompanyForDetails] = useState("");
    const [cancelOrderType,setCancelOrderType] = useState("");
    const [reOrderDetails,setReOrderDetails] =  useState({});
    const [displayOrderStatus,setDisplayOrderStatus] = useState("");
    const [orderCanceled,setOrderCanceled] = useState(false);
    const [showReturns, setShowReturns] = useState(false);
    const [showReturnRequests, setShowReturnRequests] = useState(false);
    const [orderHeaderForView, setOrderHeaderForView] = useState([]);
    const [scrollToOrder, setScrollToOrder] = useState(undefined);
    const medplusId = UserInfoAction().getUserInfo().medplusId;
    const [deliveryDate, setDeliveryDate] = useState("");

    
    let refs = [];
    const checkUrlIncludes = (props,urlToCheck) => {
        return props.location.pathname.toLowerCase().includes(urlToCheck.toLowerCase());
    }
	useEffect(() => {
        if(checkUrlIncludes(props,'/ordersHistory')){
            let fromOrderDetails = LocalDB.getValue("fromOrderDetails");
            LocalDB.removeValue("fromOrderDetails");
            setScrollToOrder(fromOrderDetails);
            getOrderHistory(excludeCanceled);
        }else if(checkUrlIncludes(props,"/orderDetails")){
            let orderId = props.match.params.orderId;
            let state = props.location.state;
            let orderViewList = excludeCanceled ? purchaseHistoryAction.getOrderHeaderForView().excludeCanceledOrders : purchaseHistoryAction.getOrderHeaderForView().includeCanceledOrders;
            setOrderHeaderForView(orderViewList);
            if(validate.isEmpty(state)){
                state = {"company":null,"returned":false,"returnRequestIds":null,"invoiceId":0,"displayStatus":null,"displayInvoiceId":null};
            }
            if(state.returned){
                setShowReturns(true);
            }
            if(validate.isNotEmpty(state.returnRequestIds)){
                setShowReturnRequests(true);
            }
            getOrderDetails(orderId,"OMS",state.company,state.returned,state.invoiceId,state.displayStatus,state.displayInvoiceId,orderViewList);
        }else if(checkUrlIncludes(props,"/invoiceDetails")){
            let invoiceId = props.match.params.invoiceId;
            let state = props.location.state;
            let orderViewList = excludeCanceled ? purchaseHistoryAction.getOrderHeaderForView().excludeCanceledOrders : purchaseHistoryAction.getOrderHeaderForView().includeCanceledOrders;
            if(validate.isEmpty(state)){
                state = {"company":null,"returned":false,"returnRequestIds":null,"invoiceId":0,"displayStatus":null,"displayInvoiceId":null};
            }
            setOrderHeaderForView(orderViewList);
            getOrderDetails(invoiceId,"INVOICE",state.company,state.returned,state.displayStatus,null,orderViewList);
        }else if(checkUrlIncludes(props,"/reOrder")){
            let reOrderId = props.match.params.reOrderId;
            let state = props.location.state;
            if(state.type=="INVOICE_ORDER"){
                getReorderDetails(reOrderId, state.type, state.company);
            }else{
                getPurchaseDetails(reOrderId,false,0,state.company,"REORDER",false,false);
            }
        }
    }, [props.match.params.orderId, props.match.params.invoiceId]);

    
    let purchaseHistoryFromRedux = purchaseHistoryAction.getPurchaseHistory();
    
    
    const getOrderHistory = (excludeCanceled, fromCanceledButton) => {
        setExcludeCanceled(excludeCanceled);
        setShowLoadMore(true);
        let loadOrders = LocalDB.getObject("loadOrders");
        let loadNormalOrders = loadOrders ? loadOrders.loadNormalOrder : false;
        let loadCanceledOrder = loadOrders ? loadOrders.loadCanceledOrder : false;
        if(excludeCanceled){
            loadOrders = {"loadNormalOrder" : false, loadCanceledOrder};
        }else{
            loadOrders = {loadNormalOrders, "loadCanceledOrder": false};
        }
        LocalDB.setObject("loadOrders", loadOrders);
        if(validate.isNotEmpty(purchaseHistoryFromRedux) && ((validate.isNotEmpty(purchaseHistoryFromRedux.includeCanceledOrders) && validate.isNotEmpty(purchaseHistoryFromRedux.includeCanceledOrders.orderheader) && !excludeCanceled) 
            || (validate.isNotEmpty(purchaseHistoryFromRedux.normalOrders) && validate.isNotEmpty(purchaseHistoryFromRedux.normalOrders.orderheader) && excludeCanceled))){
                let ordersInfo = excludeCanceled ? purchaseHistoryFromRedux.normalOrders : purchaseHistoryFromRedux.includeCanceledOrders;
                if(validate.isNotEmpty(ordersInfo.orderheader[0]) && parseInt(ordersInfo.orderheader[0].customerId) !== parseInt(medplusId)){
                    purchaseHistoryAction.clearPurchaseHistory();
                    setOrderHeaderLoading(true);
                }else{
                    setOrderHeaderSyncLoader(true);
                    setOrderHeaderLoading(false);
                    setOrderHeaderDetails(ordersInfo);
                }
        }else{
                setOrderHeaderLoading(true);
        }
        if(validate.isNotEmpty(purchaseHistoryFromRedux) && ((validate.isNotEmpty(purchaseHistoryFromRedux.nonPersistIncludedCanceledOrders) && validate.isNotEmpty(purchaseHistoryFromRedux.nonPersistIncludedCanceledOrders.orderheader) && !excludeCanceled && !loadCanceledOrder) 
            || (validate.isNotEmpty(purchaseHistoryFromRedux.nonPersistNormalOrders) && validate.isNotEmpty(purchaseHistoryFromRedux.nonPersistNormalOrders.orderheader) && excludeCanceled && !loadNormalOrders))){
                setOrderHeaderLoading(false);
                setOrderHeaderSyncLoader(false);
                let normalFromDate = validate.isNotEmpty(purchaseHistoryFromRedux.normalFromDate) ? purchaseHistoryFromRedux.normalFromDate : null;
                let canceledFromDate = validate.isNotEmpty(purchaseHistoryFromRedux.canceledFromDate) ? purchaseHistoryFromRedux.canceledFromDate : null;
                let normalEndDate = validate.isNotEmpty(purchaseHistoryFromRedux.normalEndDate) ? purchaseHistoryFromRedux.normalEndDate : null;
                let canceledEndDate = validate.isNotEmpty(purchaseHistoryFromRedux.canceledEndDate) ? purchaseHistoryFromRedux.canceledEndDate : null;
                setOrderHeaderDetails(excludeCanceled ? purchaseHistoryFromRedux.nonPersistNormalOrders : purchaseHistoryFromRedux.nonPersistIncludedCanceledOrders);
                let orderViewList = excludeCanceled ? purchaseHistoryAction.getOrderHeaderForView().excludeCanceledOrders : purchaseHistoryAction.getOrderHeaderForView().includeCanceledOrders;
                setOrderHeaderForView(orderViewList);
                setFromDateStr(excludeCanceled ? normalFromDate : canceledFromDate);
                setEndDateStr(excludeCanceled ? normalEndDate : canceledEndDate);
                setShowLoadMore(excludeCanceled ? purchaseHistoryFromRedux.normalLoadMore : purchaseHistoryFromRedux.includeCancelLoadMore);
                purchaseHistoryAction.saveNormalOrdersParameters({excludeCanceled});
        }else{
            myAccountService.getOrderHistory(excludeCanceled).then(response => {
                if (validate.isNotEmpty(response) && validate.isNotEmpty(response.statusCode) && "SUCCESS" == response.statusCode) {
                    let dataObject = response.dataObject;
                    let pageNo = validate.isNotEmpty(dataObject) ? parseInt(dataObject.pageNo) : undefined;
                    let includeCancelLoadMore = validate.isNotEmpty(purchaseHistoryFromRedux) ? purchaseHistoryFromRedux.includeCancelLoadMore : true;
                    let normalLoadMore = validate.isNotEmpty(purchaseHistoryFromRedux) ? purchaseHistoryFromRedux.normalLoadMore : true;
                    if(dataObject.reachedLastDate){
                        setShowLoadMore(false);
                        if(excludeCanceled){
                            normalLoadMore = false;
                        }else{
                            includeCancelLoadMore = false;
                        }
                    }else{
                        if(excludeCanceled){
                            normalLoadMore = true;
                        }else{
                            includeCancelLoadMore = true;
                        }
                    }
                    setOrderHeaderDetails(response.responseData);
                    if(validate.isNotEmpty(dataObject)){
                        if(validate.isEmpty(dataObject.orderHeaderData)){
                            loadMoreOrder(excludeCanceled, pageNo);
                        } else {
                            prepareOrderHeaderToShow(dataObject.orderHeaderData);
                            setOrderHeaderSyncLoader(false);
                            setOrderHeaderLoading(false);
                            setOldestDateAllowed(dataObject.lastAvailableDate);
                        }
                    }
                }else{
                    setAlertInfo({message:response.message, type: ""});
                    setOrderHeaderSyncLoader(false);
                    setOrderHeaderLoading(false);
                }
            }).catch(function(error) {
                setOrderHeaderLoading(false);
                setOrderHeaderSyncLoader(false);
                setOrderHistoryDetailOpen(false);
                console.log(error);
            });
        }
    }

    const prepareOrderHeaderToShow = (orderData) => {
        let orderHeaderToShow = {};
        let cartIdsList = [];
        orderData.map(each => {
            if(validate.isEmpty(orderHeaderToShow[each.cartId])){
                orderHeaderToShow[each.cartId] = [each];
            }else{
                orderHeaderToShow[each.cartId] = [...orderHeaderToShow[each.cartId], each];
            }
            if(!cartIdsList.includes(each.cartId)){
                cartIdsList.push(each.cartId);
            }
        });
        setCartIds(cartIdsList);
        setOrderHeader(orderHeaderToShow);
    }

    const setPurchaseHistoryInRedux = (purchaseHistoryFromRedux, currentData, fromDate, endDate, includeCancelLoadMore, normalLoadMore, isLoadMore, excludeCanceled) => {
        let includeCanceledOrders = {};
        let normalOrders = {};
        if(excludeCanceled){
            includeCanceledOrders = validate.isNotEmpty(purchaseHistoryFromRedux.nonPersistIncludedCanceledOrders) ? {...purchaseHistoryFromRedux.nonPersistIncludedCanceledOrders} : {};
            normalOrders = {...currentData};
            purchaseHistoryAction.saveNormalOrdersParameters({"normalFromDate" : fromDate, "normalEndDate": endDate, includeCancelLoadMore, normalLoadMore, excludeCanceled});
        }else{
            normalOrders = validate.isNotEmpty(purchaseHistoryFromRedux.nonPersistNormalOrders) ? {...purchaseHistoryFromRedux.nonPersistNormalOrders} : {};
            includeCanceledOrders = {...currentData};
            purchaseHistoryAction.saveCanceledOrdersParameters({"canceledFromDate" : fromDate, "canceledEndDate": endDate, includeCancelLoadMore, normalLoadMore, excludeCanceled});
        }
        if(!isLoadMore){
            let persistObject = {includeCanceledOrders, normalOrders};
            purchaseHistoryAction.savePurchaseHistory(persistObject);
        }
        let nonPersistObject = {"nonPersistIncludedCanceledOrders":includeCanceledOrders, "nonPersistNormalOrders":normalOrders};
        purchaseHistoryAction.saveNonPersistentPurchaseHistory(nonPersistObject);
    }

    const prepareOrderHeaderForView = (responseData) => {
        let orderHeaderViewList = []
        responseData.orderheader.map(eachOrder => {
            if(validate.isNotEmpty(eachOrder.orderId) || validate.isNotEmpty(eachOrder.invoiceId)) {
                orderHeaderViewList.push(eachOrder);
            }
        })
        return orderHeaderViewList;
    }

    const getOrderDetails = (orderId,orderType,company,returned,invoiceId,displayStatus,displayInvoiceId,orderHeader, isOldestDateReached) =>{
        openSpecificComponent("PURCHASE_HISTORY_DETAIL");
        setCompanyForDetails(company=='O' ? 'optival' : company);
        setDisplayOrderStatus(displayStatus);
        setDisplayInvoiceId(null);
        let list = validate.isNotEmpty(orderHeader) ? orderHeader : orderHeaderForView;
        let index = findCurrentOrderIndex(orderType, orderId, list)
        let isFirstOrder = index == 0 ? true : false;
        let oldestOrderReached = !showLoadMore || isOldestDateReached;
        let isLastOrder = index == list.length-1 && oldestOrderReached ? true : false;
        if(orderType === "OMS"){
            company = company == 'optival' ? 'O' : company;
            setDisplayInvoiceId(displayInvoiceId);
            getPurchaseDetails(orderId,false,invoiceId,company,"VIEW", isFirstOrder, isLastOrder);
        } else if(orderType === "INVOICE") {
            getInvoiceDetails(orderId,company, isFirstOrder, isLastOrder);
            openSpecificComponent("INVOICE_DETAIL");
        }
    }

    const showCancelOrderConfirmation = (orderInfo,paymentStatus,cancelOrderType) =>{
        setCancelOrderModalOpen(!isCancelOrderModalOpen);
        setOrderToBeCancel(orderInfo);
        setCancelOrderType(cancelOrderType);
        setPaymentStatus(paymentStatus);
    }

    const getPreviousOrNextDetailPage = (orderType, offset, currentOrderId, orderHeader, isOldestDateReached) => {
        setPurchaseDetails({});
        setInvoiceDetails({});
        if(validate.isEmpty(orderHeader)) {
            orderHeader = orderHeaderForView;
        }
        let index = findCurrentOrderIndex(orderType, currentOrderId, orderHeader);
        index = index + offset;
        let isLoadMore = false;
        if(index >= orderHeader.length && !isOldestDateReached) {
            isLoadMore = true;
            loadMoreOrder(excludeCanceled, fromDateStr, endDateStr,{orderType:orderType, offset:offset, currentOrderId:currentOrderId});
            return;
        }
        if(!isLoadMore) {
            const orderInfo = orderHeader[index];
            if(validate.isNotEmpty(orderInfo)) {
                if(validate.isNotEmpty(orderInfo.invoiceId) && orderInfo.invoiceId > 0 && validate.isEmpty(orderInfo.orderId)) {
                    orderType = "INVOICE";
                    props.history.push({pathname:`/invoiceDetails/${orderInfo.invoiceId}`, state:{company:orderInfo.company,returned:orderInfo.returned,returnRequestIds:orderInfo.returnRequestIds,displayStatus:orderInfo.displayStatus}});
                }else if(validate.isNotEmpty(orderInfo.orderId) && orderInfo.orderId > 0) {
                    orderType = "OMS";
                    props.history.push({pathname:`/orderDetails/${orderInfo.orderId}`, state:{company:orderInfo.company,returned:orderInfo.returned,returnRequestIds:orderInfo.returnRequestIds,invoiceId:orderInfo.invoiceId,displayStatus:orderInfo.displayStatus,displayInvoiceId:orderInfo.displayInvoiceId}});
                } 
            }
        }
    }
    
    const findCurrentOrderIndex = (orderType, currentOrderId, orderHeader) => {
        let index = 0;
        if(orderType == "OMS") {
            index  = parseInt(orderHeader.findIndex((orderInfo => orderInfo.orderId == currentOrderId)));
        } else if(orderType == "INVOICE") {
            index  = parseInt(orderHeader.findIndex((orderInfo => orderInfo.invoiceId == currentOrderId)));
        }
        return index;
    }

    const cancelOrder = (reason) => {
        let orderId = cancelOrderType == "P" ? orderToBeCancel.prescriptionOrderId:orderToBeCancel.orderId; 
        setOrderHeaderLoading(true);
        myAccountService.cancelOrder(orderId,reason,cancelOrderType).then(response => {
            if (validate.isNotEmpty(response) && validate.isNotEmpty(response.statusCode) && "SUCCESS" == response.statusCode) {
                setModifiedPurchaseHistoryInRedux(true, {});
                setAlertInfo({ message: "Order Cancelled successfully", type: ALERT_TYPE_SUCCESS});
                setOrderCanceled(true);
            } else if("FAILURE" == response.statusCode){
                setAlertInfo({message:response.message, type: ALERT_TYPE_ERROR});
            }
            setCancelOrderModalOpen(!isCancelOrderModalOpen);
            setOrderHeaderLoading(false);
        }).catch(function(error) {
            console.log(error);
            setOrderHeaderLoading(false);
        }); 
    }

    const setModifiedPurchaseHistoryInRedux = (afterCancellation, prescriptionOrder) => {
        let initialNormalOrderObj = validate.isNotEmpty(purchaseHistoryFromRedux) && validate.isNotEmpty(purchaseHistoryFromRedux.normalOrders) ? purchaseHistoryFromRedux.normalOrders : {};
        let initialCanceledOrderObj = validate.isNotEmpty(purchaseHistoryFromRedux) && validate.isNotEmpty(purchaseHistoryFromRedux.includeCanceledOrders) ? purchaseHistoryFromRedux.includeCanceledOrders : {};
        let initialNormalOrderList = initialNormalOrderObj.orderheader ? initialNormalOrderObj.orderheader : [];
        let initialCanceledOrderList = initialCanceledOrderObj.orderheader ? initialCanceledOrderObj.orderheader : [];
        if(afterCancellation){
            let indexInNormalOrder = initialNormalOrderList.findIndex(orderInfo => {return cancelOrderType == "P" ? orderInfo.prescriptionOrderId == orderToBeCancel.prescriptionOrderId :orderInfo.orderId == orderToBeCancel.orderId});
            let indexInCancelOrder = initialCanceledOrderList.findIndex(orderInfo => {return cancelOrderType == "P" ? orderInfo.prescriptionOrderId == orderToBeCancel.prescriptionOrderId:orderInfo.orderId == orderToBeCancel.orderId});
            initialNormalOrderList.splice(indexInNormalOrder, 1);
            initialNormalOrderObj.orderheader = initialNormalOrderList;
            if(initialCanceledOrderList.length){
                let order = initialCanceledOrderList[indexInCancelOrder];
                order.displayStatus = "Cancelled";
                order.orderAmount = 0;
                order.status = "C";
                initialCanceledOrderList.splice(indexInCancelOrder, 1, order);
                initialCanceledOrderObj.orderheader = initialCanceledOrderList;
            }
        }else if(validate.isNotEmpty(prescriptionOrder)){
            let indexInNormalOrder = initialNormalOrderList.findIndex(orderInfo => {return orderInfo.prescriptionOrderId == prescriptionOrder.prescriptionOrderId});
            let indexInCancelOrder = initialCanceledOrderList.findIndex(orderInfo => {return orderInfo.prescriptionOrderId == prescriptionOrder.prescriptionOrderId});
            let orderInCanceledList = initialCanceledOrderObj[indexInCancelOrder];
            let orderInNormalList = initialNormalOrderList[indexInNormalOrder];
            if(orderInCanceledList && initialCanceledOrderList.length){
                orderInCanceledList.healthRecordImages = prescriptionOrder.imageList;
                initialCanceledOrderList[indexInCancelOrder] = orderInCanceledList;
                initialCanceledOrderObj.orderheader = initialCanceledOrderList;
            }
            if(orderInNormalList && initialNormalOrderList.length){
                orderInNormalList.healthRecordImages = prescriptionOrder.imageList;
                initialNormalOrderList[indexInNormalOrder] = orderInNormalList; 
                initialNormalOrderObj.orderheader = initialNormalOrderList;
            }
        }
        let persistObject = {"includeCanceledOrders": initialCanceledOrderObj, "normalOrders": initialNormalOrderObj};
        purchaseHistoryAction.savePurchaseHistory(persistObject);
        let nonPersistNormalOrderObj = validate.isNotEmpty(purchaseHistoryFromRedux) && validate.isNotEmpty(purchaseHistoryFromRedux.nonPersistNormalOrders) ? purchaseHistoryFromRedux.nonPersistNormalOrders : {};
        let nonPersistIncludeCanceledOrderObj = validate.isNotEmpty(purchaseHistoryFromRedux) && validate.isNotEmpty(purchaseHistoryFromRedux.nonPersistIncludedCanceledOrders) ? purchaseHistoryFromRedux.nonPersistIncludedCanceledOrders : {};
        let nonPersistNormalOrderList = nonPersistNormalOrderObj.orderheader ? nonPersistNormalOrderObj.orderheader : [];
        let nonPersistIncludeCanceledOrderList = nonPersistIncludeCanceledOrderObj.orderheader ? nonPersistIncludeCanceledOrderObj.orderheader : [];
        Array.prototype.splice.apply(nonPersistNormalOrderList, [0, initialNormalOrderList.length].concat(initialNormalOrderList));
        Array.prototype.splice.apply(nonPersistIncludeCanceledOrderList, [0, initialCanceledOrderList.length].concat(initialCanceledOrderList));
        nonPersistNormalOrderObj.orderheader = nonPersistNormalOrderList;
        nonPersistIncludeCanceledOrderObj.orderheader = nonPersistIncludeCanceledOrderList;
        let nonPersistObject = {"nonPersistIncludedCanceledOrders":nonPersistIncludeCanceledOrderObj, "nonPersistNormalOrders":nonPersistNormalOrderObj};
        if(excludeCanceled){
            setOrderHeaderDetails(nonPersistNormalOrderObj);
        }else{
            setOrderHeaderDetails(nonPersistIncludeCanceledOrderObj);
        }
        purchaseHistoryAction.saveNonPersistentPurchaseHistory(nonPersistObject);
    }

    const updateNewImages = (prescriptionOrder) =>{
        setModifiedPurchaseHistoryInRedux(false, prescriptionOrder);
    }
    const getInvoiceDetails = (invoiceId,company, isFirstOrder, isLastOrder) =>{
        setOmsOrderId(omsOrderId);
        myAccountService.getInvoiceDetails(invoiceId,company,false).then(response => {
            if (validate.isNotEmpty(response) && validate.isNotEmpty(response.statusCode) && "SUCCESS" == response.statusCode) {
                const res = response.dataObject;
                if(validate.isNotEmpty(res)) {
                    res["isFirstOrder"] = isFirstOrder;
                    res["isLastOrder"] = isLastOrder;
                    setInvoiceDetails(res);
                   
                } else {
                    setInvoiceOrderHistoryDetailOpen(false);
                    setAlertInfo({message:res.message, type: ""});
                }
			} else if("FAILURE" == response.statusCode){
                setInvoiceOrderHistoryDetailOpen(false);
                setAlertInfo({message:res.message, type: ""});
            }
        }).catch(function(error) {
            setInvoiceOrderHistoryDetailOpen(false);
            console.log(error);
        });
    }

    const getPurchaseDetails = (omsOrderId,isReturned,invoiceId,company,viewType, isFirstOrder, isLastOrder) =>{
        setOmsOrderId(omsOrderId);
        myAccountService.getOmsOrderDetials(omsOrderId,isReturned,invoiceId,company).then(response => {
            if (validate.isNotEmpty(response) && validate.isNotEmpty(response.statusCode) && "SUCCESS" == response.statusCode) {
                const res = response.dataObject;
                res["isFirstOrder"]=isFirstOrder;
                res["isLastOrder"]=isLastOrder;
                setDisplayOrderStatus(res.status);
                setPurchaseDetails(res);
                setOrderHeaderLoading(false);
                setDeliveryDate(res.deliveryDate);
                if(viewType == "REORDER" ) {
                    setReOrderOpen(true);
                }
                
			} else if("FAILURE" == response.statusCode){
                setOrderHistoryDetailOpen(false);
                setAlertInfo({message:response.message, type: ""});
            }
        }).catch(function(error) {
            setOrderHistoryDetailOpen(false);
            console.log(error);
        });
    }
    
    const reOrderFromHeader = (orderId) =>{
        setOrderHeaderLoading(true);
        getPurchaseDetails(orderId,false,"","","REORDER");
    }
    const openSpecificComponent = (componentName) =>{
        allComponentHide();
        if(componentName == "REORDER"){
            setReOrderOpen(true);
        } else if(componentName == "PURCHASE_HISTORY_DETAIL"){
            setOrderHistoryDetailOpen(true);
        } else if(componentName == "INVOICE_DETAIL"){
            setInvoiceOrderHistoryDetailOpen(true);
        } else if(componentName == "PURCHASE_HISTORY_LIST"){
            setPurchaseDetails({});
            setInvoiceDetails({});
            setReOrderDetails({});
            setOrderCanceled(false);
            let fromOrderDetails = LocalDB.getValue("fromOrderDetails");
            LocalDB.removeValue("fromOrderDetails");
            setScrollToOrder(fromOrderDetails);
        }
    }
    const allComponentHide = ()=>{
        setOrderHistoryDetailOpen(false);
        setReOrderOpen(false);
        setInvoiceOrderHistoryDetailOpen(false);
    }

    const getReorderDetails = (orderId,orderType,companyName)=>{
        setOrderHeaderLoading(true);
        myAccountService.getReorderDetails(orderId,orderType,companyName).then(response => {
            setOrderHeaderLoading(false);
            if (validate.isNotEmpty(response) && validate.isNotEmpty(response.statusCode) && "SUCCESS" == response.statusCode) {
                const res = response.responseData;
                if(validate.isNotEmpty(res.reOrderDetails)){
                    setReOrderDetails(res.reOrderDetails);
                   setProductImageURLs(res.productImageURLs);
                   setReOrderOpen(true);
                } 
			} else if("FAILURE" == response.statusCode){
                setOrderHeaderLoading(false);
                setAlertInfo({message:response.message, type: ""});
            }
        }).catch(function(error) {
            setOrderHeaderLoading(false);
            console.log(error);
        });
    }

    const loadMoreOrder = (excludeCanceled, pageNo, redirectionOrderDetailObj) => {
        setNextPurchaseHistoryLoader(true);
        myAccountService.getOrderHistory(excludeCanceled, pageNo).then(response => {
            setNextPurchaseHistoryLoader(false);
            if (validate.isNotEmpty(response) && validate.isNotEmpty(response.statusCode) && "SUCCESS" == response.statusCode) {
                if(validate.isNotEmpty(response.responseData)){
                    let includeCancelLoadMore = validate.isNotEmpty(purchaseHistoryFromRedux) ? purchaseHistoryFromRedux.includeCancelLoadMore : true;
                    let normalLoadMore = validate.isNotEmpty(purchaseHistoryFromRedux) ? purchaseHistoryFromRedux.normalLoadMore : true;
                    if(response.responseData.oldestDateReached){
                        setShowLoadMore(false);
                        if(orderHeaderDetails && validate.isEmpty(orderHeaderDetails.orderheader)){
                            setNoOrderHeaderFound(true);
                        }
                        if(validate.isNotEmpty(redirectionOrderDetailObj)) {
                            getPreviousOrNextDetailPage(redirectionOrderDetailObj.orderType, redirectionOrderDetailObj.offset-1, redirectionOrderDetailObj.currentOrderId, orderHeaderForView, response.responseData.oldestDateReached);
                        }
                        if(excludeCanceled){
                            normalLoadMore = false;
                        }else{
                            includeCancelLoadMore = false;
                        }
                        purchaseHistoryAction.saveCanceledOrdersParameters({includeCancelLoadMore, normalLoadMore});
                    }else{
                        if(excludeCanceled){
                            normalLoadMore = true;
                        }else{
                            includeCancelLoadMore = true;
                        }
                        purchaseHistoryAction.saveCanceledOrdersParameters({includeCancelLoadMore, normalLoadMore});
                    }
                    let fromDate = validate.isNotEmpty(response.responseData) ? response.responseData.fromDateStr:null;
                    let endDate = validate.isNotEmpty(response.responseData) ? response.responseData.endDateStr:null;
                    setFromDateStr(fromDate);
                    setEndDateStr(endDate);
                    if(validate.isEmpty(response.responseData.orderheader)){
                        if(response.responseData.oldestDateReached){
                            setOrderHeaderSyncLoader(false);
                            setOrderHeaderLoading(false);
                            return;
                        }
                        loadMoreOrder(excludeCanceled, response.responseData.fromDateStr, response.responseData.endDateStr, redirectionOrderDetailObj);
                    }else{
                        let mergedOrderHeader = validate.isNotEmpty(orderHeaderDetails.orderheader) ? [...orderHeaderDetails.orderheader,...response.responseData.orderheader] : [...response.responseData.orderheader];
                        let mergedOmsOrderDetails = validate.isNotEmpty(orderHeaderDetails.omsOrderProducts) ? {...orderHeaderDetails.omsOrderProducts, ...response.responseData.omsOrderProducts} : {...response.responseData.omsOrderProducts};
                        let newOrderHeader = {orderheader: mergedOrderHeader};
                        let newOmsOrderDetails = {omsOrderProducts:mergedOmsOrderDetails};
                        let tempData = {...response.responseData,...newOrderHeader,...newOmsOrderDetails};
                        setOrderHeaderDetails(tempData);
                        let preparedOrderHeaderInfo = prepareOrderHeaderForView(response.responseData);
                        let totalViewInfo = [...orderHeaderForView,...preparedOrderHeaderInfo];
                        setOrderHeaderForView(totalViewInfo);
                        let reduxViewInfo = purchaseHistoryAction.getOrderHeaderForView();
                        let viewInfoForRedux = {...reduxViewInfo, [excludeCanceled ? "excludeCanceledOrders" : "includeCanceledOrders"]: totalViewInfo}
                        purchaseHistoryAction.saveOrderHeaderForView(viewInfoForRedux);
                        setOrderHeaderSyncLoader(false);
                        setOrderHeaderLoading(false);
                        if(validate.isNotEmpty(redirectionOrderDetailObj)) {
                            getPreviousOrNextDetailPage(redirectionOrderDetailObj.orderType, redirectionOrderDetailObj.offset, redirectionOrderDetailObj.currentOrderId, totalViewInfo, response.responseData.oldestDateReached);
                        }
                        setPurchaseHistoryInRedux(purchaseHistoryFromRedux, tempData, fromDate, endDate, includeCancelLoadMore, normalLoadMore, true, excludeCanceled);
                    }
                }
            }else{
                setShowLoadMore(false);
            }
        },(err)=>{
            setShowLoadMore(false);
        })
    }

    const redirectToHome = ()=>{
        window.location.href = CONFIG.REDIRECT_HOME_URL;
    }

    if(isOrderHistoryDetailOpen) {
        return  <section>
                    <div className="purchase-history">
                        <PurchaseHistoryOrderDetail 
                            omsOrderId={omsOrderId} history={props.history} company={companyForDetails} displayOrderStatus={displayOrderStatus}
                            purchaseDetails={purchaseDetails} showCancelOrderConfirmation={showCancelOrderConfirmation}
                            productImageURLs={productImageURLs} displayInvoiceId = {displayInvoiceId} 
                            openSpecificComponent={openSpecificComponent}
                            isCanceled={orderCanceled} showReturns = {showReturns} showReturnRequests={showReturnRequests}
                            showLoadMore={showLoadMore}
                            imageServerDetail={imageServerDetail} getPreviousOrNextDetailPage={getPreviousOrNextDetailPage}
                            deliveryDate={deliveryDate}/> 
                    {isCancelOrderModalOpen && <CancelOrder isOrderHeaderLoading={isOrderHeaderLoading} paymentStatus={paymentStatus} modal={isCancelOrderModalOpen} toggle={setCancelOrderModalOpen} cancelOrder={cancelOrder}/>}
              
                    </div>
                </section>
    }

    if(isInvoiceOrderHistoryDetailOpen) {
        return  <section>
                    <div className="purchase-history">
                        <InvoiceOrderDetail displayOrderStatus={displayOrderStatus}
                            history={props.history}
                            purchaseDetails={invoiceDetails} 
                            company={companyForDetails}
                            showLoadMore={showLoadMore}
                            openSpecificComponent={openSpecificComponent} 
                            getPreviousOrNextDetailPage={getPreviousOrNextDetailPage}/>
                    </div>
                </section>
    }

    if(isReOrderOpen) {
        if(validate.isNotEmpty(purchaseDetails)){
            return  <section>
                        <div className="purchase-history">
                            <PurchaseHistoryReOrder 
                                history={props.history}
                                purchaseDetails={purchaseDetails} 
                                productImageURLs={productImageURLs} 
                                openSpecificComponent={openSpecificComponent} />
                        </div>
                    </section>
        } else if(validate.isNotEmpty(reOrderDetails)) {
            return  <section>
                        <div className="purchase-history">
                            <ReOrder history={props.history} 
                                reOrderDetails={reOrderDetails} 
                                productImageURLs={productImageURLs} 
                                openSpecificComponent={openSpecificComponent} />
                        </div>
                    </section>
        }
    }

    return (
        <React.Fragment>
            <Alert alertInfo={alertInfo} duration={5000} onDurationEnd={setAlertInfo}/>
            <section>
                <div className="purchase-history">
                    <React.Fragment>
                        <div className="header">
                            <p>
                                Purchase History<br/>
                                {oldestDateAllowed && <small className="text-muted">Records available from {moment(new Date(oldestDateAllowed)).format("MMM DD, YYYY")}</small>}
                            </p>
                            <div className="custom-control custom-checkbox font-weight-normal">
                                <input type="checkbox" className="custom-control-input" id="include-cancel-order" onClick={(e) => getOrderHistory(!e.target.checked, true)} checked={!excludeCanceled} />
                                <label className="custom-control-label pointer" htmlFor="include-cancel-order">Include Cancelled Orders</label>
                            </div>
                        </div>
                        {orderHeaderSyncLoader &&
                            <div className="text-center w-100 mb-2">
                                <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                            </div>
                        }
                        <div className="purchase-order-list">
                            {validate.isNotEmpty(orderHeaderDetails) && validate.isNotEmpty(orderHeaderDetails.orderheader) && orderHeaderDetails.orderheader.length > 0 && !isOrderHeaderLoading && 
                                <PurchaseHistoryOrder
                                history={props.history}
                                scrollToOrder={scrollToOrder} 
                                getOrderDetails={getOrderDetails} 
                                openSpecificComponent={openSpecificComponent} 
                                orderHeaderDetails={orderHeaderDetails}
                                reOrderFromHeader = {reOrderFromHeader} 
                                showCancelOrderConfirmation={showCancelOrderConfirmation}
                                noOrderHeaderFound={noOrderHeaderFound}
                                nextPurchaseHistoryLoader={nextPurchaseHistoryLoader}
                                getReorderDetails={getReorderDetails}
                                updateNewImages={updateNewImages}/>
                            }
                            { isOrderHeaderLoading && 
                            <React.Fragment>
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
                                        <div class="ph-item mb-0 pt-3 px-0 ml-n3 ">
                                            <div class="ph-col-1 p-0">
                                                <div class="ph-picture mx-auto" style={{'height':'36px', 'width': '36px'}}></div>
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
                                        <div class="ph-item mb-0 pt-3 px-0 ml-n3 ">
                                            <div class="ph-col-1 p-0">
                                                <div class="ph-picture mx-auto" style={{'height':'36px', 'width': '36px'}}></div>
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
                        </div>
                        {(validate.isEmpty(orderHeaderDetails) || validate.isEmpty(orderHeaderDetails.orderheader) || orderHeaderDetails.orderheader.length <= 0) && !isOrderHeaderLoading && <div className="no-purchase-history body-height">
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
                                <button className="btn btn-brand ml-2 custom-btn-lg" onClick={redirectToHome}>Start Ordering</button>
                            </div>
                        }
                        {!isOrderHeaderLoading && showLoadMore && !nextPurchaseHistoryLoader &&
                        <div class="text-center">
                            <button class="brand-secondary btn px-5 custom-btn-lg" onClick={()=>loadMoreOrder(excludeCanceled, fromDateStr, endDateStr)}>Load more orders</button>
                        </div>}
                        {!isOrderHeaderLoading && showLoadMore && nextPurchaseHistoryLoader &&
                        <div class="text-center">
                            <button type="submit" className="brand-secondary btn px-5">
                                <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                                <span className="sr-only"></span>
                            </button>
                        </div>}
                    </React.Fragment>
                    {isCancelOrderModalOpen && <CancelOrder isOrderHeaderLoading={isOrderHeaderLoading} paymentStatus={paymentStatus} modal={isCancelOrderModalOpen} toggle={setCancelOrderModalOpen} cancelOrder={cancelOrder}/>}
                </div>
            </section>
        </React.Fragment>
    );
}

export default PurchaseHistory;