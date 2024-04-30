import React, { useState } from 'react';
import { Collapse } from 'reactstrap';
import ProductThumbNail from '../../Common/ProductThumbNail';
import ShowPickUpStore from '../../Common/ShowPickUpStore';
import BrandImage from '../../../images/common/myntra-logo.png';
import Validate from "../../../helpers/Validate";
import { getDisplayableAgeUnits } from '../../../helpers/CommonUtil';
import { Openpopover } from '../OrderReview/ReviewCartSummary';

let productImageURLs = [];

const ThankyouOrderView = (props) => {

    let totalAmount = 0;
    let totalDiscount = 0;
    let totalPayble = 0;
    let shippingCharges = 0;
    let cartTotalPoint = 0;
    let totalPbPointsCredited = 0;

    let orderSummaryDetails = null;
    if(props.orderSummary != null && props.orderSummary.orderList != null){
        orderSummaryDetails = props.orderSummary;
        productImageURLs = orderSummaryDetails.productImageURLs;
    }

    let paymentClass = "success";
    let paymentHeaderMessage = "Thank You..!";
    let paymentMessage = "Your order is being processed";
    if(props.orderSummary != null && props.orderSummary.PAYMENT_AWAITED_FLAG && orderSummaryDetails.orderList[0].paymentType != "C"){
        paymentClass = "awaited";
        paymentHeaderMessage = "Payment is Awaited";
        paymentMessage = "Order will be confirmed once payment is successfull";
    }

   return (
    <React.Fragment>
        {orderSummaryDetails && orderSummaryDetails.orderList.map((eachOrder, key )=>{
            totalAmount+=eachOrder.orderTotal;
            totalDiscount+=eachOrder.discountTotal;
            totalPayble+=eachOrder.orderAmount;
            shippingCharges+=eachOrder.totalServiceCharges;
            totalPbPointsCredited += eachOrder.totalPBPoints;
            {eachOrder && eachOrder.omsOrderItem.map((product) => {
                cartTotalPoint = cartTotalPoint + product.exactPoints*(product.packSize*(product.quantity/product.packSize));
               }
            )}
            return("")
        })} 
        <section className="thank-you-section body-height-single-nav-no-footer">
            <div className={`status-container ${paymentClass}`}>
                <span></span>
                <h2>{paymentHeaderMessage}</h2>
                <p>{paymentMessage}</p>
            </div>
            {totalPayble && totalPayble>=200000 &&
            <div className="thankyou-page-coupon">
                <div class="coupon-img-container">
                    <img className="img-fluid rounded" src={BrandImage} alt="Brand Name"/>
                </div>
                <p><span className="font-weight-bold">Congratulations</span>,<br/>You've earned a Myntra coupon <strong>MYNMNDP10</strong>.<br/>
                <small>Use this counpon to get Flat 10% off upto Rs 500 on Myntra <a className="text-primary" title="Terms and Conditions" target="_blank" href="/offertermsandconditions#Myntra10"> T&amp;C's</a> apply.</small></p>
            </div>}
            <div className="row no-gutters">         
                {orderSummaryDetails && orderSummaryDetails.orderList &&
                    <React.Fragment>
                        <DeliveryAddress orderDetails={orderSummaryDetails.orderList[0]}
                            pickStoreInfo={orderSummaryDetails.pickStoreInfo} 
                            selectedLocality={orderSummaryDetails.selectedLocality}></DeliveryAddress>
                        <OrderSummary totalPbPointsCredited={totalPbPointsCredited} omsOrder={orderSummaryDetails.orderList[0]} paymentStatus={paymentClass}
                        totalAmount={totalAmount} totalDiscount={totalDiscount} totalPayble={totalPayble}
                        shippingCharges={shippingCharges} cartTotalPoint={cartTotalPoint}> </OrderSummary>
                        <PatientAndDoctorDetails omsOrder={orderSummaryDetails.orderList[0]}>  </PatientAndDoctorDetails>
                    </React.Fragment>
                }            
            </div>
            {orderSummaryDetails && orderSummaryDetails.orderList.map((eachOrder, key )=>{
                let totalOrders = orderSummaryDetails.orderList.length;
                return(eachOrder &&  <OrderDetails omsOrder={eachOrder} sno={key} totalOrders={totalOrders}>  </OrderDetails>)
            })}    
        </section>
    </React.Fragment>
   )
}

const OrderSummary = (props) => {
    const omsOrder = props.omsOrder;
    const totalAmount = props.totalAmount;
    const totalDiscount = props.totalDiscount;
    const deliveryDiscount = ((omsOrder.orderSerivceCharge?.[0]?.serviceCharge - omsOrder?.totalServiceCharges) || 0);
    const totalPayble = props.totalPayble;
    const cartTotalPoint = props.cartTotalPoint;
    const totalPbPointsCredited = props.totalPbPointsCredited;
    const [selectedTrigger , setSelectedTrigger] = useState();

    const OpenpopoverModel = () => {
        if(omsOrder.couponCode){
            setSelectedTrigger("totalAmountSaved");
        }
    }
    
    return (
        <React.Fragment>
            <Openpopover rest={props} couponCode ={omsOrder.couponCode} target={selectedTrigger} deliveryDiscount={deliveryDiscount} totalDiscount={props?.totalDiscount} shippingCharges={props?.shippingCharges} />
            <div className="col-6 mt-4 pl-2">
                <div className="card order-summary discounted-model">
                    <h5 className="legend-title">
                        Order Summary
                    </h5>
                    <div className="pt-3">
                        <p>
                            <span>Cart MRP Total</span>
                            <span><strong className="rupee">&#x20B9;</strong>{parseFloat(totalAmount).toFixed(2)}</span>
                        </p>
                        {totalDiscount > 0 &&
                            <p>
                                <span id='totalAmountSaved' className={omsOrder.couponCode?'dashed-dark':''} onClick={()=>{OpenpopoverModel()}}>Total Amount Saved</span>
                                <span className='text-success'><strong className="rupee">&#x20B9;</strong>{parseFloat(totalDiscount).toFixed(2)}</span>
                            </p>
                        }
                        {(omsOrder.promotionType && omsOrder.promotionType == 2 && (totalDiscount > 0 || cartTotalPoint > 0)) &&
                            <p>
                                <span>Total points</span>
                                <span className="text-success"> {parseFloat(cartTotalPoint).toFixed(2)} pts</span>
                            </p>
                        }
                        <p>
                            <span>Delivery Charges</span>
                            {omsOrder.orderSerivceCharge?.[0].serviceCharge > 0 ? (
                                <React.Fragment>
                                    <span>
                                        {omsOrder.orderSerivceCharge?.[0]?.discountPercentage > 0 ?
                                        <React.Fragment><del><strong className="rupee">&#x20B9;</strong>{parseFloat(omsOrder.orderSerivceCharge[0].serviceCharge).toFixed(2)}</del>{omsOrder.totalServiceCharges > 0 ? <span><strong className="rupee">&#x20B9;</strong>{parseFloat(omsOrder.totalServiceCharges).toFixed(2)}</span>:<span>FREE</span>}</React.Fragment>
                                        :
                                        <React.Fragment><strong className="rupee">&#x20B9;</strong>{parseFloat(omsOrder.totalServiceCharges).toFixed(2)}</React.Fragment>}
                                    </span>
                                </React.Fragment>)
                                :
                                <span> FREE</span>
                            }
                        </p>
                        {omsOrder && 
                            <p>
                                <span>Payment Type</span>
                                {omsOrder.paymentType == "C" && <span>Cash On Delivery</span>}
                                {omsOrder.paymentType == "O" && <span>Prepaid</span>}
                                {omsOrder.paymentType == "M" && <span>Prepaid</span>}
                                {omsOrder.paymentType == "W" && <span>Prepaid</span>}
                            </p>
                        }
                        <hr className="solid"/>
                        <p>
                            <span>
                                {omsOrder.paymentType == "C" ? "Amount to be paid" : (props.paymentStatus == "success" ? "Amount paid" : "Payment is Awaited")}
                            </span>
                            <span><strong className="rupee">&#x20B9;</strong>{parseFloat(totalPayble).toFixed(2)}</span>
                        </p>
                        {(omsOrder.promotionType && omsOrder.promotionType == 2 && (totalDiscount > 0 || cartTotalPoint > 0)) &&
                            <p>
                                <span>Total points</span>
                                <span className="text-success"> {parseFloat(cartTotalPoint).toFixed(2)} pts</span>
                            </p>
                        }
                        { (Validate().isNotEmpty(totalPbPointsCredited) && totalPbPointsCredited > 0 ) &&
                            <React.Fragment>
                                <hr className="solid"/>
                                <p>
                                    <span>MedPlus Payback Points to be Credited</span>
                                    <span> {parseInt(Math.abs(totalPbPointsCredited))}</span>
                                </p>
                            </React.Fragment>
                        }
                        <hr className="solid"/>
                        {(totalDiscount > 0) &&
                            <p className="text-success d-flex justify-content-between font-weight-bold w-100 font-16">
                                <span>Total Savings</span>
                                <span><strong className="rupee">&#x20B9;</strong>{(totalDiscount && deliveryDiscount && deliveryDiscount > 0)?parseFloat(totalDiscount+deliveryDiscount).toFixed(2):parseFloat(totalDiscount).toFixed(2)}</span>
                            </p>
                        }
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

const DeliveryAddress = (props) => {

    const omsOrder = props.orderDetails;
    const shipmentOmsAddress = props.orderDetails.shipmentOmsAddress;
    const pickStoreInfo = (props?.pickStoreInfo && Object.values(props.pickStoreInfo)[0]) ? Object.values(props?.pickStoreInfo)?.[0] : {};
    const selectedLocality = props.selectedLocality;
    return (
        <React.Fragment>
            {omsOrder.communityDropOff && 
                <div className="col-6 mt-4 pr-2">
                    <div className="card">
                        <h6 className="legend-title">
                            Community Delivery Address
                        </h6>
                        <address className="no-select pt-3 p-0">
                            {shipmentOmsAddress.firstName || shipmentOmsAddress.lastName &&
                            <p>
                                <span>{shipmentOmsAddress.firstName} {shipmentOmsAddress.lastName}</span>
                            </p>}
                            <p>
                                <span>Address:</span>
                                <span className="font-weight-normal">
                                    {shipmentOmsAddress.addressLine1}, {shipmentOmsAddress.addressLine2}, {shipmentOmsAddress.city}, {shipmentOmsAddress.state} {shipmentOmsAddress.pinCode && shipmentOmsAddress.pinCode}    
                                </span>
                            </p>
                            <p>
                                <span>Drop Off Point:</span>
                                <span className="font-weight-normal">{omsOrder.communityDropPoint}</span>
                            </p>
                            {omsOrder.email &&
                                <p>
                                    <span>Email:</span>
                                    <span className="font-weight-normal text-info">{omsOrder.email}</span>
                                </p>
                            }
                            {shipmentOmsAddress.shippingMobileNo && 
                                <p>
                                    <span>Mobile:</span>
                                    <span className="font-weight-normal">+91 {shipmentOmsAddress.shippingMobileNo}</span>
                                </p>
                            }
                        </address>
                    </div>
                </div>
            }
            {omsOrder.deliveryType == "S" && pickStoreInfo && pickStoreInfo?.address_s &&
            <div className="col-6 mt-4 pr-2">
                <div className="card pt-4">
                    <h6 className="legend-title">
                        Pick Up Details
                    </h6>
                    <ShowPickUpStore
                    pickStoreName={pickStoreInfo?.name_s}
                    pickUpAddress={pickStoreInfo?.address_s}
                    locationLatLong={pickStoreInfo?.locationLatLong}
                    phoneNumber={pickStoreInfo?.phoneNumber_s}
                    isSmallAddressRequired={true}
                    />
                </div>
            </div>
           }
           {!omsOrder.communityDropOff && omsOrder.deliveryType == "D" &&
                <div className="col-6 mt-4 pr-2">
                    <div className="card pt-4">
                        <h6 className="legend-title">
                            Shipping Address
                        </h6>
                        <address className="no-select pt-3 p-0">
                            <p>
                                <span>{shipmentOmsAddress.firstName} {shipmentOmsAddress.lastName}</span>
                            </p>
                            <p>
                                <span>Address:</span>
                                <span className="font-weight-normal">
                                    {shipmentOmsAddress.addressLine1} {shipmentOmsAddress.addressLine2} {shipmentOmsAddress.city} {shipmentOmsAddress.state} {shipmentOmsAddress.pinCode}
                                </span>
                            </p>
                            { omsOrder.email && <p>
                                <span>Email:</span>
                                <span className="font-weight-normal text-info">{omsOrder.email}</span>
                            </p> }
                            { shipmentOmsAddress.shippingMobileNo && <p>
                                <span>Mobile:</span>
                                <span className="font-weight-normal">+91 {shipmentOmsAddress.shippingMobileNo}</span>
                            </p>}
                        </address>
                    </div>
                </div>
           }
        </React.Fragment>
    )
}

const PatientAndDoctorDetails = (props) => {
    const omsOrder = props.omsOrder;
    return (
        <React.Fragment>
            {(omsOrder.patientName || omsOrder.doctorName) &&
                <div className="col-12 mt-4">
                    <div className="card mt-2">
                        <h6 className="legend-title">
                            Patient & Doctor Details
                        </h6>
                        <div className="patient-details pt-3 p-0">
                            {omsOrder.patientName && 
                                <p>
                                    <span className="font-weight-normal">Patient Name:</span>
                                    <span>{omsOrder.patientName}</span>
                                </p>
                            }
                            {!((omsOrder.patientAge == 0 && Validate().isEmpty(omsOrder.ageType))) && 
                                <p>
                                    <span className="font-weight-normal">Patient Age:</span>
                                    <span>{omsOrder.patientAge} {getDisplayableAgeUnits(omsOrder.ageType)}</span>
                                </p>
                            }
                            {omsOrder.doctorName && 
                                <p>
                                    <span className="font-weight-normal">Doctor Name:</span>
                                    <span>{omsOrder.doctorName}</span>
                                </p>
                             }
                        </div>
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
                                <span>{omsOrder.deliveryTime}</span>
                            </a>
                        </div>
                        <Collapse isOpen={isOpenOrderOne}>
                            <div id="collapse-order-1" className="panel-collapse">
                                {omsOrder && omsOrder.omsOrderItem.map((orderItem, key )=>{
                                    return(orderItem &&  
                                        <OrderItem orderItem={orderItem} promotionType={omsOrder.promotionType}></OrderItem>
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
                                        <OrderItem orderItem={orderItem} promotionType={omsOrder.promotionType}></OrderItem>
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
    let imageUrlInfo = productImageURLs[orderItem.productId];
    let pointsEarned = 0;
    let amountSaved = 0;
    if(orderItem.spdiscountFlag && parseInt(orderItem.spdiscountFlag)===2){
        pointsEarned = Number.parseFloat(orderItem.exactPoints*(orderItem.packSize*noOfpacks)).toFixed(2);
    }else{
        amountSaved = Number.parseFloat(((orderItem.quantity * orderItem.mrp)/100)*orderItem.discountPercentage).toFixed(2);
    }
    return (
        <div className="panel-body">
        <a className="product-link">
            {imageUrlInfo && <ProductThumbNail imageUrl={imageUrlInfo.imageUrl} imagesCount={imageUrlInfo.imageUploadCount} 
                productId={orderItem.productId} productName={orderItem.productName} 
                auditForm={orderItem.auditFormSubName} width="48"
                isGeneral={(imageUrlInfo.isGeneral== "Y" || orderItem.auditFormSubName === "GEN")?true:false}/>
            }
        </a>
        <div className="order-details"> 
            <h6>
                <small className='text-muted'>Mfg: {orderItem.manufacturer}</small><br/>{orderItem.productName}
            </h6>
            <p className="text-secondary">{orderItem.packSize} Unit(s) / pack</p>
            <p className="text-secondary">Qty {noOfpacks} (Packs)</p>
        </div>	
        <div className="text-right">
            <h6 className="mt-3"><strong className="rupee">&#x20B9;</strong> {Number.parseFloat(orderItem.quantity * orderItem.price).toFixed(2)}</h6>
            <h6 className="text-secondary mb-0"><small>MRP/Pack <strong className="rupee ml-1"> &#x20B9;</strong> &nbsp;{Number.parseFloat(orderItem.mrp * orderItem.packSize).toFixed(2)}</small></h6>
            {parseFloat(orderItem.discountPercentage) > 0 && parseFloat(amountSaved) > 0 && <h6 className="text-secondary"><small>Amount Saved: - &#x20B9; {amountSaved} ({Number.parseFloat(orderItem.discountPercentage).toFixed(2)}%)</small></h6>}
            {parseFloat(orderItem.discountPercentage) > 0 && props.promotionType == 2 && parseFloat(pointsEarned)>0 && <h6 className="text-secondary"><small>Points Earned: {pointsEarned}pts ({Number.parseFloat(orderItem.discountPercentage).toFixed(2)}%)</small></h6>}
        </div>
    </div>
    )
}

export default ThankyouOrderView;
