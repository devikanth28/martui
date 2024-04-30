import React, { useState, useEffect } from 'react';
import { Collapse } from 'reactstrap';
import ProductThumbNail from '../../Common/ProductThumbNail';
import { getSelectedLocality } from '../../../../redux/action/LocalityAction';
import ShowPickUpStore from '../../Common/ShowPickUpStore';
import Validate from '../../../helpers/Validate';
import moment from "moment";

let productImageURLs = [];

const FlexiThankyouOrderSummary = (props) => {
    
    let orderSummaryDetails = null;
    const validate =Validate();
    if(props.orderSummary != null && props.orderSummary.orderList != null){
        orderSummaryDetails = props.orderSummary;
        productImageURLs = orderSummaryDetails.productImageURLs;
    }


   return (
    <React.Fragment>
 
        <section className="thank-you-section body-height-single-nav-no-footer">
            <div className={( validate.isNotEmpty(props.paymentGatewayStatus) && props.paymentGatewayStatus === 'S' ) || !props.isPayback ? "status-container success" : "status-container awaited"}>
                <span></span>
                {(validate.isNotEmpty(props.paymentGatewayStatus) && props.paymentGatewayStatus === 'S' ) || !props.isPayback ? 
                    <React.Fragment>
                        <h2>Thank You..!</h2>
                        <p>Your order is being processed</p> 
                    </React.Fragment> : 
                    <React.Fragment>
                        <h2>Payment is Awaited</h2>
                        <p>Order will be confirmed once payment is successfull</p>
                    </React.Fragment> }
            </div>
            <div className="row no-gutters">         
                {orderSummaryDetails && orderSummaryDetails.orderList &&
                    <React.Fragment>
                        <DeliveryAddress orderDetails={orderSummaryDetails.orderList[0]}
                            pickStoreInfo={orderSummaryDetails.pickStoreInfo} 
                            selectedLocality={orderSummaryDetails.selectedLocality}></DeliveryAddress>
                        <OrderSummary isPayback= {props.isPayback} orderSummary={props.orderSummary} > </OrderSummary>
                    </React.Fragment>
                }            
            </div>
            {orderSummaryDetails && orderSummaryDetails.orderList.map((eachOrder, key )=>{
                let totalOrders = orderSummaryDetails.orderList.length;
                return(eachOrder &&  <OrderDetails isPayback ={props.isPayback} omsOrder={eachOrder} sno={key} totalOrders={totalOrders}>  </OrderDetails>)
            })}    
        </section>
    </React.Fragment>
   )
}

const OrderSummary = (props) => {
    let orderSummary = props.orderSummary;

    return (
        <React.Fragment>      
            <div className="col-6 mt-4 pl-2">
                <div className="card order-summary">
                    <h5 className="legend-title">
                        Order Summary
                    </h5>
                    {!props.isPayback && <div className="pt-3">
                        <p>
                            <span>Redeem Points</span>
                            <span>{parseInt(orderSummary.totalRedeemedPoints)} Pts</span>
                        </p>
                        <p>
                            <span>Balance Points</span>
                            <span>{parseInt(orderSummary.customerBalancePoints)} Pts</span>
                        </p>
                        {/* <hr className="solid"/>
                        <p className="d-block text-right">
                            <span>{Number(orderSummary.totalRedeemedPoints).toFixed(2)} Pts</span>
                        </p> */}
                    </div> }
                    {props.isPayback && <div className="pt-3">
                        <p>
                            <span>MedPlus Payback Points debited</span>
                            <span title='Payback Points'>{parseInt(orderSummary.paybackDebitedPoints)}</span>
                        </p> 
                        {Validate().isNotEmpty(orderSummary.discountTotal) && 
                        <p>
                            <span>Cash discount on MRP</span>
                            <span><strong className='rupee mr-1'>&#x20B9;</strong>{parseFloat(orderSummary.discountTotal).toFixed(2)}</span>
                        </p>
                        }
                        <hr className="solid"/>
                        <p>
                            <span>Total Amount Paid</span>
                            <span><strong className='rupee mr-1'>&#x20B9;</strong>{parseFloat(orderSummary.totalAmountPaid).toFixed(2)}</span>
                        </p>
                    </div> }
                </div>
            </div>
        </React.Fragment>
    )
}

const DeliveryAddress = (props) => {

    const omsOrder = props.orderDetails;
    const pickStoreInfo = props.pickStoreInfo;
    return (
        <React.Fragment>
            {omsOrder.deliveryType == "S" && pickStoreInfo && pickStoreInfo.address_s &&
            <div className="col-6 mt-4 pr-2">
                <div className="card">
                    <h6 className="legend-title">
                        Pick Up Details
                    </h6>
                    <ShowPickUpStore
                    pickStoreName={pickStoreInfo.name_s}
                    pickUpAddress={pickStoreInfo.address_s}
                    locationLatLong={pickStoreInfo.locationLatLong}
                    phoneNumber={pickStoreInfo.phoneNumber_s}
                    isSmallAddressRequired={true}
                    />
                </div>
            </div>
           }
        </React.Fragment>
    )
}

const OrderDetails = (props) => {

    const omsOrder = props.omsOrder;
    const sno = props.sno;
    const [isOpenOrderOne, setIsOpenOrderOne] = useState(false);
    const toggleOrderOne = () => setIsOpenOrderOne(!isOpenOrderOne);
    const [isOpenOrderTwo, setIsOpenOrderTwo] = useState(false);
    const toggleOrderTwo = () => setIsOpenOrderTwo(!isOpenOrderTwo);

    return (
        <React.Fragment>
            <div className="panel-group">
                {sno == "0" ? (
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <a className="toggle-arrow " data-toggle="collapse" href="javaScript:;" onClick={toggleOrderOne}>
                                {props.totalOrders > 1 ? 
                                    <span>Order {sno + 1} - Your Order ID</span>
                                    :
                                    <span>Your Order ID</span>
                                }
                                <svg className={`rotate-arrow ${isOpenOrderOne ? "close-collapse" : "open-collapse"}`} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                                <g transform="translate(-762 -906.838)">
                                    <rect fill="none" width="18" height="18" transform="translate(762 906.838)"/>
                                    <path fill="#080808" d="M61.559,501.985l4.049-4.049a.917.917,0,0,0-1.3-1.3l-3.4,3.39-3.4-3.4a.921.921,0,0,0-1.569.649.912.912,0,0,0,.272.649l4.049,4.059A.922.922,0,0,0,61.559,501.985Z" transform="translate(710.032 416.557)"/>
                                </g>
                                </svg>
                                <p>Order - {omsOrder.displayOrderId}</p>
                                {props.isPayback ? <span>Available for pickup by {moment(new Date(omsOrder.deliveryTime)).format("MMM DD, YYYY")}</span> : <span>{omsOrder.deliveryTime}</span>}
                                
                            </a>
                        </div>
                        <Collapse isOpen={isOpenOrderOne}>
                            <div id="collapse-order-1" className="panel-collapse">
                                {omsOrder && omsOrder.omsOrderItem.map((orderItem, key )=>{
                                    return(orderItem &&  
                                        <OrderItem isPayback = {props.isPayback} orderItem={orderItem} promotionType={omsOrder.promotionType}></OrderItem>
                                    )
                                })} 
                            </div>
                        </Collapse>
                    </div>
                ) 
                :
                (
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <a className="toggle-arrow " data-toggle="collapse" href="javaScript:;" onClick={toggleOrderTwo}>
                                <span>Order {sno + 1} - Your Order ID</span>
                                <svg className={`rotate-arrow ${isOpenOrderTwo ? "close-collapse" : "open-collapse"}`} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                                <g transform="translate(-762 -906.838)">
                                    <rect fill="none" width="18" height="18" transform="translate(762 906.838)"/>
                                    <path fill="#080808" d="M61.559,501.985l4.049-4.049a.917.917,0,0,0-1.3-1.3l-3.4,3.39-3.4-3.4a.921.921,0,0,0-1.569.649.912.912,0,0,0,.272.649l4.049,4.059A.922.922,0,0,0,61.559,501.985Z" transform="translate(710.032 416.557)"/>
                                </g>
                                </svg>
                                <p>Order - {omsOrder.displayOrderId}</p>
                                <span>{omsOrder.deliveryTime}</span>
                            </a>
                        </div>
                        <Collapse isOpen={isOpenOrderTwo}>
                            <div id="collapse-order-2" className="panel-collapse">
                                {omsOrder && omsOrder.omsOrderItem.map((orderItem, key )=>{
                                    return(orderItem &&  
                                        <OrderItem orderItem={orderItem} isPayback={props.isPayback} promotionType={omsOrder.promotionType}></OrderItem>
                                    )
                                })} 
                            </div>
                        </Collapse>
                    </div>
                )
            }                
            </div>
        </React.Fragment>
    )
}

const OrderItem = (props) => {
    const orderItem = props.orderItem;
    let noOfpacks = orderItem.quantity/orderItem.packSize;
    return (
        <div className={props.isPayback ? "panel-body px-0 border-top-0 border-bottom pt-2 pb-2" : "panel-body p-0 border-top" }>
        <a className="product-link">
            <ProductThumbNail imageUrl={productImageURLs[orderItem.productId]}
            productId={orderItem.productId} productName={orderItem.productName} 
            auditForm={orderItem.auditFormSubName} width="48"
            isGeneral="true"/>
        </a>
        {!props.isPayback && <div className="order-details"> 
            <h6> {orderItem.productName}</h6>
            <p className="text-secondary">Qty {noOfpacks} (Packs)</p>
        </div> }
        {props.isPayback && <div className='order-details'>
            <h6> {orderItem.productName } </h6>
            <p className="text-secondary">{orderItem.packSize} Unit(s)/Pack <span className="font-weight-bold mx-1">|</span><span> Qty {orderItem.quantity} (Packs)</span></p>
        </div>	 }
        {!props.isPayback && <div className="text-right">
            <h6 className="mt-3">{parseInt(noOfpacks*orderItem.redemptionPoints)} Pts</h6>
        </div> }
        {props.isPayback && <div className='text-right' > 
            <small className='font-weight-bold'>Special Price <strong className='rupee mr-1'>&#x20B9;</strong>{parseFloat(((orderItem.price - orderItem.pbPointsValue)*(orderItem.quantity))).toFixed(2)}</small>
            <span className='mx-1'>&#43;</span> <small className="font-weight-bold ml-n1" title='Payback Points'>{parseInt(orderItem.pbPoints * (orderItem.quantity))} Pts</small>
        </div>}
    </div>
    )
}

export default FlexiThankyouOrderSummary;