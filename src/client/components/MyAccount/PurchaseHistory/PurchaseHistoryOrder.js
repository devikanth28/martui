
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


const isFutureDate = (deliveryDate) => {
    let now= new Date();
    if (now.setHours(0, 0, 0, 0) <= deliveryDate.setHours(0, 0, 0, 0)) {
      return true;
    }
    return false;
  };

const validate = Validate();

const PurchaseHistoryOrder = (props) => {
    let orderHeaderDetails = props.orderHeaderDetails;
    let omsOrderProducts = props.orderHeaderDetails.omsOrderProducts;
    let splitOrderOne = null;
    let splitOrder = null;
    const getOrderDetails =(orderId,orderType,company,returned,invoiceId,displayOrderStatus,displayInvoiceId)=>{
        if(validate.isEmpty(company)){
            company = 'O';
        }
       props.getOrderDetails(orderId,orderType,company,returned,invoiceId,displayOrderStatus,displayInvoiceId);
    }

    const refs = orderHeaderDetails && orderHeaderDetails.orderheader ? orderHeaderDetails.orderheader.reduce((acc, value) => {
        if(value.orderId){
            acc[value.orderId] = React.createRef();
        }else if(value.invoiceId){
            acc[value.invoiceId] = React.createRef();
        } else{
            acc[value.prescriptionOrderId] = React.createRef();
        }
        return acc;
    }, {}) : [];

    useEffect(() => {
        try{
            const browserInfo = BroswerHelper().getBorwserInfo();
            if(validate.isNotEmpty(browserInfo) && browserInfo.split(" ").length > 1 && validate.isNotEmpty(browserInfo.split(" ")[0]) && validate.isNumeric(browserInfo.split(" ")[1])){
                let browserInfoArr = browserInfo.split(" ");
                let browserName = browserInfoArr[0];
                let browserVersion = browserInfoArr[1];
                let block = browserName === "Firefox" && parseInt(browserVersion) < 58 ? "start" : "center";
                if(props.scrollToOrder && refs[props.scrollToOrder] && refs[props.scrollToOrder].current){
                    refs[props.scrollToOrder].current.scrollIntoView({
                        behavior: 'smooth',
                        block: block,
                    });
                }
            }
        }catch(err){
            console.log(err);
        }
    }, []);

    const redirectToHome = ()=>{
        window.location.href = CONFIG.REDIRECT_HOME_URL;
    }
    if((validate.isEmpty(orderHeaderDetails) || validate.isEmpty(orderHeaderDetails.orderheader)) && props.noOrderHeaderFound ){
        return(
            <div className="no-products">
                <div className="div-center p-4">
                    <img alt="no purchase history" title="no purchase history" src={NoRefilImage}/>
                    <p className="title mt-3 font-weight-bold">No Purchase History.</p>
                    <button className="btn px-5 btn-brand custom-btn-lg" onClick={redirectToHome}>Start Ordering</button>
                </div>
            </div>
        )
    }

    const setRef = (e1, order) => {
        if(validate.isNotEmpty(refs[order.orderId])){
            refs[order.orderId].current = e1;
        }
    }
    return (
        <React.Fragment>
            {orderHeaderDetails.orderheader && orderHeaderDetails.orderheader.map((eachOrder, key )=>{
                if(eachOrder && validate.isNotEmpty(eachOrder.orderId) && eachOrder.orderId > 0){
                     if(validate.isNotEmpty(splitOrderOne) && splitOrderOne.cartId != eachOrder.cartId){
                        splitOrder = splitOrderOne;
                        splitOrderOne = eachOrder;
                        let splitOrderID = validate.isNotEmpty(splitOrder) ? splitOrder.orderId : "";
                        return( 
                            <React.Fragment key={splitOrder.orderId}>
                                <div className="card" key={splitOrder.orderId} ref={e1 => {refs[splitOrderID].current = e1}}>
                                    <OmsOrder key={splitOrder.orderId} history={props.history} order={splitOrder} displayInvoiceId={splitOrder.displayInvoiceId}
                                    getOrderDetails={getOrderDetails} isSplitOrder={false} 
                                    openSpecificComponent={props.openSpecificComponent} 
                                    productsInfo={omsOrderProducts[splitOrder.orderId]}
                                    reOrderFromHeader={props.reOrderFromHeader} 
                                    showCancelOrderConfirmation={props.showCancelOrderConfirmation}/>
                                </div>
                            </React.Fragment>
                        )
                        
                     }else if(validate.isNotEmpty(splitOrderOne) && splitOrderOne.cartId == eachOrder.cartId){
                        splitOrder = splitOrderOne;
                        splitOrderOne = null;
                        let splitOrderID = validate.isNotEmpty(splitOrder) ? splitOrder.orderId : "";
                     return(
                        <React.Fragment key={splitOrder.orderId}>
                            <div className="card split-order" key={splitOrder.orderId} >
                                <div className="order-container pt-0">
                                    <h6 className="order-type border-0">
                                        <p>
                                            <strong>Order placed as 2 parts</strong>
                                        </p>
                                        <span className="text-secondary">Ordered On <strong> {moment(new Date(splitOrder.dateCreated)).format("MMM DD, YYYY HH:mm")}</strong></span>
                                    </h6>
                                    <div className="each-split-order" ref={e1 => {refs[splitOrderID].current = e1}}>
                                        <OmsOrder key={splitOrder.orderId} history={props.history} order={splitOrder} displayInvoiceId={splitOrder.displayInvoiceId}
                                        getOrderDetails={getOrderDetails} isSplitOrder={true} 
                                        openSpecificComponent={props.openSpecificComponent} 
                                        productsInfo={omsOrderProducts[splitOrder.orderId]}
                                        reOrderFromHeader={props.reOrderFromHeader} 
                                        showCancelOrderConfirmation={props.showCancelOrderConfirmation}/>
                                    </div>
                                    <div className="each-split-order" ref={e1 => {refs[eachOrder.orderId].current = e1}}>
                                        <OmsOrder key={eachOrder.orderId} history={props.history} order={eachOrder} displayInvoiceId={eachOrder.displayInvoiceId}
                                        getOrderDetails={getOrderDetails} isSplitOrder={true} 
                                        openSpecificComponent={props.openSpecificComponent} 
                                        productsInfo={omsOrderProducts[eachOrder.orderId]}
                                        reOrderFromHeader={props.reOrderFromHeader} 
                                        showCancelOrderConfirmation={props.showCancelOrderConfirmation}/>
                                    </div>
                                </div>
                            </div>
                        </React.Fragment>
                    )
                    }else{
                        splitOrderOne = eachOrder;
                    }
                } else if (validate.isNotEmpty(eachOrder.prescriptionDateCreated) && validate.isNotEmpty(eachOrder.prescriptionOrderId)  && validate.isEmpty(eachOrder.orderId)){
                    splitOrder = splitOrderOne;
                    splitOrderOne = null;
                    let splitOrderID = validate.isNotEmpty(splitOrder) ? splitOrder.orderId : "";
                    return(
                        <React.Fragment>
                            {splitOrder && 
                                <div className="card" ref={e1 => {refs[splitOrderID].current = e1}}>
                                    <OmsOrder key={splitOrder.orderId} history={props.history} order={splitOrder} displayInvoiceId={splitOrder.displayInvoiceId}
                                    getOrderDetails={getOrderDetails} isSplitOrder={false} 
                                    openSpecificComponent={props.openSpecificComponent} 
                                    productsInfo={omsOrderProducts[splitOrder.orderId]}
                                    reOrderFromHeader={props.reOrderFromHeader} 
                                    showCancelOrderConfirmation={props.showCancelOrderConfirmation}/>
                                </div>
                            }
                            <PrescriptionOrder 
                                key={eachOrder.prescriptionOrderId} 
                                parentRef={(e1) => {if(refs[eachOrder.prescriptionOrderId]) refs[eachOrder.prescriptionOrderId].current = e1}}
                                order={eachOrder}
                                showCancelOrderConfirmation={props.showCancelOrderConfirmation}
                                imageServerDetail={orderHeaderDetails.imageServerDetail}
                                updateNewImages={props.updateNewImages}/>
                        </React.Fragment>
					)
                } else {
                    splitOrder = splitOrderOne;
                    splitOrderOne = null;
                    let splitOrderID = validate.isNotEmpty(splitOrder) ? splitOrder.orderId : "";
                   return (
                        <React.Fragment>
                            {splitOrder && 
                                <div className="card" ref={e1 => {refs[splitOrderID].current = e1}}>
                                    <OmsOrder key={splitOrder.orderId} history={props.history} order={splitOrder} displayInvoiceId={splitOrder.displayInvoiceId}
                                    getOrderDetails={getOrderDetails} isSplitOrder={false} 
                                    openSpecificComponent={props.openSpecificComponent} 
                                    productsInfo={omsOrderProducts[splitOrder.orderId]}
                                    reOrderFromHeader={props.reOrderFromHeader} 
                                    showCancelOrderConfirmation={props.showCancelOrderConfirmation}/>
                                </div>
                            }
                            <InvoiceOrder key ={eachOrder.invoiceId} history={props.history}
                            parentRef={e1 => {if(refs[eachOrder.invoiceId]) refs[eachOrder.invoiceId].current = e1}}
                            order={eachOrder} 
                            getOrderDetails={getOrderDetails}
                            getReorderDetails={props.getReorderDetails}
                            productsInfo={validate.isNotEmpty(omsOrderProducts) ? omsOrderProducts[eachOrder.invoiceId] : null}/>
                        </React.Fragment>
                    )
                }
            })}
            {splitOrderOne && 
                <div className="card" ref={e1 => setRef(e1, splitOrderOne)}>
                    <OmsOrder key={splitOrderOne.orderId} history={props.history} order={splitOrderOne} displayInvoiceId={splitOrderOne.displayInvoiceId}
                    getOrderDetails={getOrderDetails} isSplitOrder={false} 
                    openSpecificComponent={props.openSpecificComponent} 
                    productsInfo={omsOrderProducts[splitOrderOne.orderId]}
                    reOrderFromHeader={props.reOrderFromHeader} 
                    showCancelOrderConfirmation={props.showCancelOrderConfirmation}/>
                </div>
            }
        </React.Fragment>
    ); 
}

const OmsOrder = (props) => {
    let orderInfo = props.order;
    let showStarRateUs = true;
    let showStarRate = false;
    let productsCount = 0;
    const selectedLocality = getSelectedLocality();
   
     return (
        <React.Fragment>
            
                <div className="card-header">
                    <div>
                        <OrderStatus orderStatus={orderInfo.status} orderType="omsOrder" paymentStatus={orderInfo.paymentStatus} displayStatus={orderInfo.displayStatus}></OrderStatus>
                        <span className="dot-separator text-dark"></span>
                        <small className="text-muted mr-2">Order ID</small>
                        {orderInfo.displayOrderId && <strong>{orderInfo.displayOrderId}</strong>}
                    </div>
                    <div className="text-right">
                        {!props.isSplitOrder && <small><span className="text-secondary">Ordered On</span> <strong> {moment(new Date(orderInfo.dateCreated)).format("MMM DD, YYYY HH:mm")}</strong></small>}
                        {validate.isNotEmpty(orderInfo.invoiceDateCreated) && orderInfo.displayStatus == "Delivered" &&
                        <React.Fragment>
                             {!props.isSplitOrder && <span className="dot-separator text-dark"></span>}
                            <small><span className="text-secondary">Delivered On</span> 
                                {validate.isNotEmpty(orderInfo.invoiceDateCreated) && <strong> {moment(new Date(orderInfo.invoiceDateCreated)).format("MMM DD, YYYY HH:mm")}</strong>}
                            </small>
                        </React.Fragment>
                        }
                        {validate.isEmpty(orderInfo.invoiceDateCreated) && validate.isNotEmpty(orderInfo.dateModified) && orderInfo.displayStatus == "Delivered" && orderInfo.orderType == "REDEMPTION" && 
                        <React.Fragment>
                            {!props.isSplitOrder && <span className="dot-separator text-dark"></span>}
                            <small><span className="text-secondary">Delivered On</span> 
                                {validate.isNotEmpty(orderInfo.dateModified) && <strong> {moment(new Date(orderInfo.dateModified)).format("MMM DD, YYYY HH:mm")}</strong>}
                            </small>
                        </React.Fragment>
                        }
                        {orderInfo.deliveryDate && (orderInfo.status != 'C' && orderInfo.status != 'X') && (orderInfo.deliveryType == 'D' ? (orderInfo.displayStatus != 'Shipment Rejected' && orderInfo.displayStatus != "Delivered") :  orderInfo.status != 'D') && isFutureDate(new Date(orderInfo.deliveryDate)) && <React.Fragment>
                         {!props.isSplitOrder && <span className="dot-separator text-dark"></span>}
                            <small><span className="text-secondary">Delivery by</span> <strong> {moment(new Date(orderInfo.deliveryDate)).format("MMM DD, YYYY")}</strong></small>
                        </React.Fragment>}
                    </div>
                </div>
                <div className="card-body">
                    <div className="order-info">
                        <img alt="order" src={OrderIcon}/>
                        <p className="products-name w-50">
                            {props.productsInfo && props.productsInfo.map((product)=>{
                                productsCount = productsCount + 1;
                                return(product && productsCount < 3 &&
                                    <React.Fragment>
                                        <span key={product.productId}>
                                            <a className="text-secondary font-weight-bold no-underline" role="link" title={product.productName} href={ "/product/"+product.productName.replace("/","&frasl;").replace("%","percent").replace(/ /g, '-')+"/"+product.productId}>
                                                {product.productName}
                                            </a>
                                        </span>
                                    </React.Fragment>
                                )
                            }
                            )}
                            {props.productsInfo.length-2 > 0 && <span className="d-inline-block ml-2 text-muted align-top">({props.productsInfo.length - 2 } MORE)</span>}
                        </p>
                        <p className="small w-50">
                            {orderInfo.orderAmount > 0 && <React.Fragment><span>Total Amount <strong><strong className="rupee">&#x20B9; </strong> {Number.parseFloat(orderInfo.orderAmount).toFixed(2)}</strong></span> <br/></React.Fragment>}
                            <span>No. of Items <strong> {props.productsInfo.length}</strong></span>
                        </p>
                    </div>
                    <div className="order-options">
                       {/* showStarRateUs  &&
                          <div className="text-info">
                            <div className="rating-section">
                                <span>Rated:</span>
                                <div className="starrating">
                                    <input type="radio" id="star5" name="rating" value="5" /><label htmlFor="star5" title="5 star"></label>
                                    <input type="radio" id="star4" name="rating" value="4" /><label htmlFor="star4" title="4 star"></label>
                                    <input type="radio" id="star3" name="rating" value="3" /><label htmlFor="star3" title="3 star"></label>
                                    <input type="radio" id="star2" name="rating" value="2" /><label htmlFor="star2" title="2 star"></label>
                                    <input type="radio" id="star1" name="rating" value="1" /><label htmlFor="star1" title="1 star"></label>
                                </div>
                            </div>
                        </div> */}
                        { /* showStarRate &&
                        <div className="text-info">
                            <svg xmlns="http://www.w3.org/2000/svg" width="17.106" height="18" viewBox="0 0 17.106 18">
                                <rect fill="none" width="17" height="18" transform="translate(0 0)"/>
                                <g transform="translate(0 0.564)">
                                    <path fill="#2699fb" d="M16.7,17.77l-5.541-.514-2.2-5.111a.444.444,0,0,0-.816,0l-2.2,5.111L.4,17.77a.444.444,0,0,0-.252.776l4.18,3.673L3.108,27.646a.444.444,0,0,0,.66.479l4.785-2.841,4.785,2.841a.444.444,0,0,0,.66-.479l-1.223-5.428,4.18-3.673A.444.444,0,0,0,16.7,17.77Z" transform="translate(0 -11.877)"/>
                                </g>
                            </svg>
                            Rate & Review
                        </div> */}
                        <div>
                            {(validate.isNotEmpty(orderInfo.returnMsg)) && <span class="text-secondary">{orderInfo.returnMsg}</span>}
                        </div>
                        <div>
                            <button className="btn btn-link" title="view order" onClick={()=>{window.scrollTo(0, 0); props.history.push({pathname:`/orderDetails/${orderInfo.orderId}`, state:{company:orderInfo.company,returned:orderInfo.returned,returnRequestIds:orderInfo.returnRequestIds,invoiceId:orderInfo.invoiceId,displayStatus:orderInfo.displayStatus,displayInvoiceId:props.displayInvoiceId}}); /* props.getOrderDetails(orderInfo.orderId,"OMS",orderInfo.company,orderInfo.returned,orderInfo.invoiceId,orderInfo.displayStatus,props.displayInvoiceId) */}}>View Order</button>
                            {(orderInfo.status == 'I' || orderInfo.status == 'A' || orderInfo.status == 'E') &&
                                <button className="btn btn-link" title="Cancel Order" onClick={()=>props.showCancelOrderConfirmation(orderInfo,orderInfo.paymentStatus,"O")}>Cancel Order</button>
                            }
                            {(selectedLocality && selectedLocality.hubId) && validate.isNotEmpty(orderInfo.orderId) && ((orderInfo.invoiceId && Number(orderInfo.invoiceId)>0) || orderInfo.status=='C') && orderInfo.orderType != 'REDEMPTION' && 
                                <button className="btn btn-link" title="Re-Order" onClick={()=>{window.scrollTo(0, 0); LocalDB.setValue("reOrderId", orderInfo.orderId); props.history.push({pathname: `/reOrder/${orderInfo.orderId}`, state:{company: props.company, type: "OMS_ORDER"}})}}>Re-Order</button>
                            }
                        </div>
                    </div>
                   {/* <div class="form-group">
                        <p class="rating-support-text">1 Star for Not Satisfied and 5 Stars for Very Satisfied</p>
                        <label for="cancel-order-description" class="sr-only">Cancel Order Description</label>
                        <textarea class="form-control" id="cancel-order-description" rows="4" placeholder="Enter Description"></textarea>
                        <div class="d-flex mt-3">
                            <div class="col-7 p-0"><p className="rating-exp-text">Sorry to know that your overall experience was not so good, Please provide your valuable feedback on what went wrong.</p></div>
                            <div class="col text-right p-0"><button type="button" class="btn brand-secondary  px-4">Cancel</button><button class="btn btn-brand px-4 ml-2" type="button" value="Submit">Submit</button></div>
                        </div>
                    </div> */}
                </div>
            
        </React.Fragment>
        );
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
         if(props.paymentStatus == "F"){
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
         if(props.orderType == "Prescription"){
            switch(status) {
                case "I":
                    showStatus = "Prescription Order Created";
                    break;
                case "T":
                    showStatus = "Prescription Decoded";
                    break;
                case "P":
                    showStatus = "Pending";
                    break;
             }
         }else{
            switch(status) {
                case "F":
                    showStatus = "Failed";
                    break;
             }
         }
         
        return (
            <React.Fragment>
                {status && 
                    <React.Fragment>
                            {(status == 'C' || status == 'X' || status == 'F' ||  props.paymentStatus == 'F')  ?
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
                                </svg>
                            }
                            <span className={statusClass}>{showStatus}</span>
                    </React.Fragment>
                }
            </React.Fragment>
        );
    }

const InvoiceOrder = (props) => {

        let orderInfo = props.order;
        let productsCount = 0;
        const selectedLocality = getSelectedLocality();
        return (
        <React.Fragment>
            <div className="card" ref={e1 => props.parentRef(e1)}>
                <div className="card-header">
                    <div>
                        <OrderStatus orderStatus={orderInfo.status} orderType="invoice" paymentStatus={orderInfo.paymentStatus} displayStatus={orderInfo.displayStatus}></OrderStatus>
                        <span className="dot-separator text-dark"></span>
                        <small className="text-muted mr-2">Invoice ID</small>
                        {orderInfo.displayInvoiceId && <strong>{orderInfo.displayInvoiceId}</strong>}
                    </div>
                    <div className="text-right">
                        <small><span className="text-secondary">Ordered On</span> <strong> {moment(new Date(orderInfo.dateCreated)).format("MMM DD, YYYY HH:mm")}</strong></small>
                        {validate.isNotEmpty(orderInfo.invoiceDateCreated) && 
                        <React.Fragment>
                            <span className="dot-separator text-dark"></span>
                            <small><span className="text-secondary">Delivered On</span> <strong> {moment(new Date(orderInfo.invoiceDateCreated)).format("MMM DD, YYYY HH:mm")}</strong></small>
                        </React.Fragment>
                        }
                         {orderInfo.deliveryDate && (orderInfo.status != 'D' && orderInfo.status != 'C' && orderInfo.status != 'X') && isFutureDate(new Date(orderInfo.deliveryDate)) && <React.Fragment>
                            <span className="dot-separator text-dark"></span>
                            <small><span className="text-secondary">Delivery by</span> <strong> {moment(new Date(orderInfo.deliveryDate)).format("MMM DD, YYYY")}</strong></small>
                        </React.Fragment>}
                    </div>
                </div>
                <div className="card-body">
                    <div className="order-info">
                        <img alt="order" src={OrderIcon}/>
                        <p className="products-name w-50">
                            {props.productsInfo && props.productsInfo.map((product)=>{
                                productsCount = productsCount + 1;
                                return(product && productsCount < 3 &&
                                    <React.Fragment>
                                        <span key={product.productId}>
                                            <a className="text-secondary font-weight-bold no-underline" role="link" title={product.productName} href={ "/product/"+product.productName.replace("/","&frasl;").replace("%","percent").replace(/ /g, '-')+"/"+product.productId}>
                                            {product.productName}
                                            </a>
                                        </span>
                                    </React.Fragment>
                                )
                            }
                            )}
                            {props.productsInfo && props.productsInfo.length-2 > 0 && <span className="d-inline-block ml-2 text-muted align-top">({props.productsInfo.length - 2 } MORE)</span>}
                        </p>
                        <p className="small w-50">
                            {orderInfo.totalSale > 0 &&<React.Fragment><span>Total Amount <strong><strong className="rupee">&#x20B9;</strong> {Number.parseFloat(orderInfo.totalSale).toFixed(2)}</strong></span><br/></React.Fragment>}
                            {props.productsInfo && <span>No. of Items <strong> {props.productsInfo.length}</strong></span>}
                        </p>
                    </div>
                    <div className="order-options">
                            {/* <div className="rating-section">
                                <span>Rated:</span>
                                <div className="starrating">
                                    <input type="radio" id="star5" name="rating" value="5" /><label htmlFor="star5" title="5 star"></label>
                                    <input type="radio" id="star4" name="rating" value="4" /><label htmlFor="star4" title="4 star"></label>
                                    <input type="radio" id="star3" name="rating" value="3" /><label htmlFor="star3" title="3 star"></label>
                                    <input type="radio" id="star2" name="rating" value="2" /><label htmlFor="star2" title="2 star"></label>
                                    <input type="radio" id="star1" name="rating" value="1" /><label htmlFor="star1" title="1 star"></label>
                                </div>
                            </div> */}
                        <div>
                            {(validate.isNotEmpty(orderInfo.returnMsg)) && <span class="text-secondary">{orderInfo.returnMsg}</span>}
                        </div>
                        <div>
                            <button className="btn btn-link" title="view order" onClick={()=>{props.history.push({pathname:`/invoiceDetails/${orderInfo.invoiceId}`, state:{company:orderInfo.company,returned:orderInfo.returned,returnRequestIds:orderInfo.returnRequestIds,displayStatus:orderInfo.displayStatus}}); window.scrollTo(0, 0); /* props.getOrderDetails(orderInfo.invoiceId,"INVOICE",orderInfo.company,orderInfo.returned,orderInfo.displayStatus,null) */}}>View Order</button>
                            {(selectedLocality && selectedLocality.hubId) && validate.isNotEmpty(orderInfo.invoiceId) && orderInfo.orderType != 'REDEMPTION' && 
                                <button className="btn btn-link" title="Re-Order" onClick={()=>{window.scrollTo(0, 0); LocalDB.setValue("reOrderId", orderInfo.invoiceId); props.history.push({pathname: `/reOrder/${orderInfo.invoiceId}`, state:{company: orderInfo.company, type: "INVOICE_ORDER"}});}}>Re-Order</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
        );
    }

    const PrescriptionOrder = (props) => {
        const [isLightBoxOpen, setLightBoxOpen] = useState(false);
        const [imageIndex, setImageIndex] = useState(0);

        const [editPrescModal,setEditPrescModal] = useState(false);
        const closeModal = () =>{
            setEditPrescModal(false);
        }
        const updateNewImages =  (prescriptionOrder) =>{
            props.updateNewImages(prescriptionOrder);
        }
        let orderInfo = props.order;
        let imagesForZoom = [];
        validate.isNotEmpty(orderInfo) && orderInfo.healthRecordImages.map((eachImage) => {
		    imagesForZoom.push(eachImage.imagePath);
	    });
        let prescriptionCount = 0;
        let status = orderInfo.prescriptionOrderStatus;
        if(validate.isNotEmpty(orderInfo.status)){
            status = orderInfo.status;
        }
        return (
            <React.Fragment>
                <div className="card" ref={e1 => props.parentRef(e1)}>
                    <div className="card-header">
                        <div>
                            <OrderStatus orderStatus={status} orderType="Prescription" paymentStatus={orderInfo.paymentStatus} displayStatus={orderInfo.displayStatus}></OrderStatus>
                            <span className="dot-separator text-dark"></span>
                            <small className="text-muted mr-2">Prescription Order ID</small>
                            <strong>{orderInfo.prescriptionOrderId}</strong>
                        </div>
                        <div className="text-right">
                            <small><span className="text-secondary">Ordered On</span> <strong> {moment(new Date(orderInfo.dateCreated)).format("MMM DD, YYYY HH:mm")} </strong></small>
                        </div>
                        {validate.isNotEmpty(orderInfo.invoiceDateCreated) &&
                        <React.Fragment>
                            <span className="dot-separator text-dark"></span>
                            <small><span className="text-secondary">Delivered On</span> <strong> {moment(new Date(orderInfo.invoiceDateCreated)).format("MMM DD, YYYY HH:mm")}</strong></small>
                        </React.Fragment>
                        }
                     {/*   {orderInfo.deliveryTime && orderInfo.status == 'A' && <React.Fragment>
                        <span className="dot-separator text-dark"></span>
                        <small><span className="text-secondary">Delivery by</span> <strong> {orderInfo.deliveryTime}</strong></small>
                    </React.Fragment>} */}
                    </div>
                    <div className="card-body">
                        <div className="order-info pl-3">
                            <p className="d-flex">
                                {orderInfo.healthRecordImages && orderInfo.healthRecordImages.map((eachImage)=>{
                                        prescriptionCount = prescriptionCount+1;
                                        return( prescriptionCount < 3 && 
                                        <React.Fragment>
                                            <Image key={eachImage.imageId} src={eachImage.thumbnailPath} className="uploaded-prescription" handleError='' alt="prescription Image" onClick={() => setLightBoxOpen(true)}/>
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
                                {prescriptionCount-2 > 0 &&  <span className="more-images">{prescriptionCount-2} more</span>}
                            </p>
                            <p className="small">
                                {orderInfo.healthRecordImages && <span>No. of Images <strong> {prescriptionCount}</strong></span>}
                            </p>
                        </div>
                        <div className="order-options">
                            <div className="text-info">
                                {/* <div className="rating-section">
                                    <span>Rated:</span>
                                    <div className="starrating">
                                        <input type="radio" id="star5" name="rating" value="5" /><label htmlFor="star5" title="5 star"></label>
                                        <input type="radio" id="star4" name="rating" value="4" /><label htmlFor="star4" title="4 star"></label>
                                        <input type="radio" id="star3" name="rating" value="3" /><label htmlFor="star3" title="3 star"></label>
                                        <input type="radio" id="star2" name="rating" value="2" /><label htmlFor="star2" title="2 star"></label>
                                        <input type="radio" id="star1" name="rating" value="1" /><label htmlFor="star1" title="1 star"></label>
                                    </div>
                                </div> */}
                            </div>
                            <div>
                                {orderInfo.healthRecordImages.length <8 && (validate.isEmpty(orderInfo.status) || orderInfo.status == 'I' ) && (orderInfo.prescriptionOrderStatus == 'I' || orderInfo.prescriptionOrderStatus == 'D') &&
                                    <button className="btn btn-link" title="Edit Prescription" onClick={()=> setEditPrescModal(true)}>Edit Prescription</button>
                                }
                                {(orderInfo.status == 'A' || orderInfo.status == 'E' || orderInfo.status == 'I' || orderInfo.prescriptionOrderStatus == 'I' || orderInfo.prescriptionOrderStatus == 'T' || orderInfo.prescriptionOrderStatus == 'D') &&
                                <button className="btn btn-link" title="Cancel Order"  onClick={()=>props.showCancelOrderConfirmation(orderInfo,orderInfo.paymentStatus,"P")}>Cancel Order</button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {editPrescModal && 
                    <EditPrescription prscriptionOrderId= {orderInfo.prescriptionOrderId} 
                    abc={editPrescModal} imageServerDetail={props.imageServerDetail} 
                    closeModal={closeModal}
                    updateNewImages={updateNewImages} uploadedImages={orderInfo.healthRecordImages}/> 
                }
            </React.Fragment>
        );
    }

export default PurchaseHistoryOrder;