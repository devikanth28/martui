import React, { useEffect, useState } from 'react';
import { PopoverBody, PopoverHeader, UncontrolledPopover } from "reactstrap";
import { getDisplayableAgeUnits } from '../../../helpers/CommonUtil';
import Validate from '../../../helpers/Validate';

const showDiscount = (totalDiscount, isFinalSummary = false, id="" , className='',openPopOverModel) => {
    let elementId = Validate().isNotEmpty(id)?`deliveryCharges${id+1}`:`deliveryCharges`;
    return totalDiscount > 0 &&
        <p className='text-success'>
            <span id={elementId} className={className} onClick={()=>{openPopOverModel(elementId,id)}}>{isFinalSummary && 'Total '}Amount Saved</span>
            <span>
                - <strong className="rupee">&#x20B9;</strong>{parseFloat(totalDiscount).toFixed(2)}
            </span>
        </p>
}



const ReviewCartSummary = (props) => {
    const [selectedTrigger , setSelectedTrigger] = useState();
    const [orderNumber,setOrderNumber] = useState();
    const orderDetails = props.orderReviewDetails;
    let deliveryDiscount = (orderDetails?.cartSummary?.deliveryChargesBeforeDiscount - orderDetails?.cartSummary?.deliveryCharges) || 0;
    const [totalOrders,setTotalOrders] = useState(0);
    const [totalDiscount,setTotalDiscount] = useState(0);
    const [shippingCharges,setShippingCharges] = useState(0);
    const [totalPayable,setTotalPayable] = useState(0);
    const [totalItems,setTotalItems] = useState(0);
    const [cartTotalPoint,setCartTotalPoint] = useState(0);
    const [totalPaybackPoints,setTotalPaybackPoints] = useState(0);
    const [totalOrderPoints,setTotalOrderPoints] = useState(0);
    const [totalAmount,setTotalAmount] = useState(0);
    const [couponCode,setCouponCode] = useState(undefined);

    const prepareInitialValues=()=>{
        let discountTotal = 0;
        let shippingCharge = 0;
        let noOfOrders = 0;
        let totalPaybleValue = 0;
        let noOfItems = 0;
        let cartTotalPoints = 0;
        let totalPaybackPoint = 0;
        let totalOrderPoint = 0;
        let amountTotal = 0;
        let coupon = undefined;
        
        orderDetails.orderList && orderDetails.orderList.map((eachOrder,index )=>{
            amountTotal+=eachOrder.orderTotal;
            discountTotal+=eachOrder.discountTotal;
            totalPaybackPoint+=eachOrder.totalPBPoints;
            totalPaybleValue+=eachOrder.orderAmount;
            noOfItems+=eachOrder.omsOrderItem.length;
            if(eachOrder.totalServiceCharges > 0) {
                shippingCharge+=eachOrder.totalServiceCharges;
            }
            noOfOrders=orderDetails.orderList.length;
            {eachOrder && eachOrder.omsOrderItem.map((product) => {
                totalOrderPoint = totalOrderPoint + product.exactPoints*(product.packSize*(product.quantity/product.packSize));
                cartTotalPoints = cartTotalPoints + product.exactPoints*(product.packSize*(product.quantity/product.packSize));;
            }
            )}
            if(Validate().isNotEmpty(eachOrder.couponCode) && index==0){
                coupon = eachOrder.couponCode;
            }
        })
        setCouponCode(coupon);
        setTotalDiscount(discountTotal);
        setShippingCharges(shippingCharge);
        setTotalOrders(noOfOrders);
        setTotalPayable(totalPaybleValue);
        setTotalItems(noOfItems);
        setCartTotalPoint(cartTotalPoints);
        setTotalPaybackPoints(totalPaybackPoint);
        setTotalOrderPoints(totalOrderPoint);
        setTotalAmount(amountTotal);
    }

    const OpenpopoverModel = (id,orderNo) => {
        if((Validate().isNotEmpty(props.couponCode) || (Validate().isEmpty(props.couponCode) && Validate().isNotEmpty(couponCode))) && Validate().isNotEmpty(id)){
            setSelectedTrigger(id);
            setOrderNumber(orderNo);
        }
    }

    useEffect(() => {
        prepareInitialValues();
        setSelectedTrigger();
    },[props?.couponCode])


    return (
        <React.Fragment>
            <Openpopover rest={props} couponCode ={Validate().isEmpty(props.couponCode)?couponCode:props.couponCode} target={selectedTrigger} deliveryDiscount={deliveryDiscount} totalDiscount={totalDiscount} shippingCharges={shippingCharges} orderNumber={orderNumber} orderDetails={orderDetails}/>
            <section className="cart-summary discounted-model">
                <div className="header">
                    <p>Cart Summary</p>
                </div>
                {orderDetails.orderList && orderDetails.orderList.map((eachOrder, key )=>{
                    return(eachOrder && props.isPayback ? <PaybackOrderSummary omsOrder={eachOrder}/> : <OrderSummary isPayback={props.isPayback} sno={key} omsOrder={eachOrder} totalOrders={totalOrders} totalOrderPoins={totalOrderPoints} orderDetails={orderDetails} totalItemsDiscount={totalDiscount} totalDeliveryDiscount={deliveryDiscount} OpenpopoverModel={OpenpopoverModel} selectedTrigger={selectedTrigger} couponCode ={Validate().isEmpty(props.couponCode)?couponCode:props.couponCode}></OrderSummary>)
                })}
            </section>
            {totalOrders > 1 &&
            <section className="cart-summary discounted-model">
                <div className="body mt-2">
                    <div className="header px-0">
                        <p>Cart Total</p>
                    </div>
                    <p>
                        <span>No.of Items</span>
                        <span>{totalItems}</span>
                    </p>
                    <p>
                        <span>Total Order MRP</span>
                        <span>
                            <strong className="rupee">&#x20B9;</strong>{parseFloat(totalAmount).toFixed(2)}
                        </span>
                    </p>
                    <p className="font-weight-normal">
                        <span >Delivery Charges</span>
                        {shippingCharges ? (
                            <span><strong className="rupee">&#x20B9;</strong>{parseFloat(shippingCharges).toFixed(2)}</span>
                                ) : (
                            <span> FREE</span>
                         )}
                    </p>
                    {showDiscount(totalDiscount, true,"",deliveryDiscount>0?"dashed-dark":"",OpenpopoverModel)}
                    {(orderDetails.orderList && orderDetails.orderList[0].promotionType == 2 && (totalDiscount > 0 || cartTotalPoint > 0)) && 
                            <p className="text-success">
                                <span>Total Points</span>
                                <span>
                                    {parseFloat(cartTotalPoint).toFixed(2)}
                                </span>
                            </p>
                    } 
                </div>
                <div className="footer border-top font-lg">
                    <span>Total Amount to be Paid</span>
                    <span>
                        <strong className="rupee">&#x20B9;</strong>{parseFloat(totalPayable).toFixed(2)}
                    </span>
                </div>
                {Validate().isNotEmpty(totalPaybackPoints) && parseFloat(totalPaybackPoints) > 0 &&
                    <div className="footer border-top font-lg">
                        <span>MedPlus Payback Points to be Credited</span>
                        <span title='Payback Points'>
                            {parseInt(Math.abs(totalPaybackPoints))}
                        </span>
                    </div>
                }
                {(totalDiscount > 0 || deliveryDiscount > 0) && <div class="footer success mb-0"><p class="text-success d-flex justify-content-between font-weight-bold w-100 font-16"><span>Total Savings</span><span><strong class="rupee">₹</strong>{parseFloat(totalDiscount>0 ? totalDiscount+deliveryDiscount : deliveryDiscount).toFixed(2)}</span></p></div>}
            </section>
            }
            {!props.isPayback && orderDetails.orderList && 
                <PatientAndDoctorDetails omsOrder={orderDetails.orderList[0]}></PatientAndDoctorDetails>
            }
        </React.Fragment>
    )
}

const PaybackOrderSummary = (props) => {
    return (
        <React.Fragment>
            <div className="body">
                <p>
                    <span>No. Of Items</span>
                    <span>{props.omsOrder.omsOrderItem.length}</span>
                </p>
                <p>
                    <span>MedPlus Payback Points to be debited</span>
                    <span>
                        {parseInt(Math.abs(props.omsOrder.totalPBPoints))}
                    </span>
                </p>
                {Validate().isNotEmpty(props.omsOrder.discountTotal) && <p>
                    <span>Cash discount on MRP</span>
                    <span>
                        <strong className="rupee">&#x20B9;</strong>{parseFloat(props.omsOrder.discountTotal).toFixed(2)}
                    </span>
                </p>}
            </div>
            <div className="footer border-top font-lg">
                        <span>Total Amount to be Paid</span>
                        <span>
                            <strong className="rupee">&#x20B9;</strong>{parseFloat(props.omsOrder.orderAmount - props.omsOrder.totalPBPointsValue).toFixed(2)}
                        </span>
                    </div>
        </React.Fragment>
    )
}

const OrderSummary = (props) =>{
    let discountTotal = props.omsOrder.discountTotal;
    const isDeliveryDiscountCouponApplied = props.omsOrder?.orderSerivceCharge?.[0].discountPercentage > 0;
    const isCouponCodeAppplied = Validate().isNotEmpty(props?.omsOrder?.couponCode);
    let deliveryDiscount = 0;
    if (isDeliveryDiscountCouponApplied) {
        deliveryDiscount = (props.omsOrder?.orderSerivceCharge?.[0]?.serviceCharge - props.omsOrder.totalServiceCharges);
    }
    return (
        <React.Fragment>
                {props.sno > 0 &&  <hr className="my-1 solid border-bottom-0"/>}
                <div className="body">
                    {props.totalOrders > 1  && <p className="title">Order {props.sno +1}</p>}
                    <p>
                        <span>No. Of Items</span>
                        <span>{props.omsOrder.omsOrderItem.length}</span>
                    </p>
                    <p>
                        <span>MRP Total</span>
                        <span>
                            <strong className="rupee">&#x20B9;</strong>{parseFloat(props.omsOrder.orderTotal).toFixed(2)}
                        </span>
                    </p>
                    <p>
                        <span>Delivery Charges {isDeliveryDiscountCouponApplied && <>(<span className='text-success'>Coupon Applied</span>)</>}</span>
                            {props.omsOrder.orderSerivceCharge?.[0].serviceCharge > 0 ? (
                                <span>
                                    {isDeliveryDiscountCouponApplied
                                    ?
                                    <><><strong className="rupee">&#x20B9;</strong><del>{parseFloat(props.omsOrder.orderSerivceCharge[0].serviceCharge).toFixed(2)}</del></>{ props.omsOrder.totalServiceCharges > 0 ? <><strong className="rupee">&#x20B9;</strong>{parseFloat(props.omsOrder.totalServiceCharges).toFixed(2)}</> : 'FREE'}</>
                                    :
                                    <><strong className="rupee">&#x20B9;</strong>{parseFloat(props.omsOrder.orderSerivceCharge[0].serviceCharge).toFixed(2)}</>
                                    }
                                </span>
                            ) : (
                                <span> FREE</span>
                            )}
                    </p>
                    {showDiscount(props.totalOrders!=1?discountTotal+deliveryDiscount:discountTotal, props.totalOrders === 1,props.sno,isCouponCodeAppplied?"dashed-dark":"",props?.OpenpopoverModel)}
                    {(props.omsOrder.promotionType && props.omsOrder.promotionType == 2 && (props.omsOrder.discountTotal > 0 || props.totalOrderPoins > 0)) &&
                        <p className="text-success">
                            <span>Points</span>
                            <span>
                                {parseFloat(props.totalOrderPoins).toFixed(2)}
                            </span>
                        </p>
                    }
                </div>
                {props.totalOrders == 1  && 
                    <div className="footer border-top font-lg">
                        <span>Total Amount to be Paid</span>
                        <span>
                            <strong className="rupee">&#x20B9;</strong>{parseFloat(props.omsOrder.orderAmount).toFixed(2)}
                        </span>
                    </div>
                }
                {Validate().isNotEmpty(props.omsOrder.totalPBPoints) && parseFloat(props.omsOrder.totalPBPoints) > 0 &&<div className="footer border-top font-lg">
                    <span className='col p-0'>MedPlus Payback Points to be Credited</span>
                    <span className='col-5 p-0 text-right'>
                        {parseInt(Math.abs(props.omsOrder.totalPBPoints))}
                    </span>
                </div>}
                {props.totalOrders == 1 &&
                    <div class="footer success mb-0">{(discountTotal > 0 || deliveryDiscount > 0) && <p class="text-success d-flex justify-content-between font-weight-bold w-100 font-16"><span>Total Savings</span><span><strong class="rupee">₹</strong>{parseFloat(discountTotal+deliveryDiscount).toFixed(2)}</span></p>}</div>
                }
        </React.Fragment>
    )
}

export const PatientAndDoctorDetails = (props) => {
    const omsOrder = props.omsOrder;
    return (
        <React.Fragment>
            {(omsOrder.doctorName || omsOrder.patientName) &&
                <section className="cart-summary doc-pat-detail">
                <div className="header">
                    <p>Patient & Doctor Details</p>
                </div>
                <div className="body">
                    {omsOrder.patientName && 
                        <p>
                            <span>Patient Name</span>
                            <span className="text-truncate">{omsOrder.patientName}</span>
                        </p>
                        }
                        {!((omsOrder.patientAge == 0 && Validate().isEmpty(omsOrder.ageType))) && 
                        <p>
                            <span>Patient Age</span>
                            <span>{omsOrder.patientAge} {getDisplayableAgeUnits(omsOrder.ageType)}</span>
                        </p>
                    }
                    {omsOrder.doctorName && 
                        <p>
                            <span>Doctor Name</span>
                            <span className="text-truncate">{omsOrder.doctorName}</span>
                        </p>
                    }
                </div>
                </section>
            }
        </React.Fragment>
    )
}

export default ReviewCartSummary;

export const Openpopover = (props) => {
    const validate = Validate()
    const {totalDiscount,deliveryDiscount,orderDetails,orderNumber,shippingCharges} = props;
    let orderDiscount = 0;
    let orderDeliveryDiscount=0;
    let isDeliveryFree = validate.isNotEmpty(shippingCharges) && shippingCharges == 0;
    if(validate.isNotEmpty(orderNumber) && validate.isNotEmpty(orderDetails)){
        orderDetails?.orderList.map((eachOrder,key)=>{
            if(orderNumber==key){
                orderDiscount = eachOrder.discountTotal;
                if(validate.isNotEmpty(eachOrder?.orderSerivceCharge) && eachOrder.orderSerivceCharge[0]?.discountPercentage > 0){
                    orderDeliveryDiscount = eachOrder.orderSerivceCharge[0].serviceCharge - (eachOrder?.totalServiceCharges || 0);
                    isDeliveryFree  = validate.isNotEmpty(eachOrder?.totalServiceCharges) && eachOrder?.totalServiceCharges == 0;
                }
            }
        })
    }
    const [isOpen , setIsOpen] = useState(true);
    let displayTotalDiscount = validate.isNotEmpty(orderNumber)?orderDiscount:totalDiscount;
    let displayDeliveryDiscount = validate.isNotEmpty(orderNumber)?orderDeliveryDiscount:deliveryDiscount;

    useEffect(()=>{
        setIsOpen(true);
    },[props])

    return (
        <React.Fragment>
            {validate.isNotEmpty(props.target) && <div key={props.target}>
                <UncontrolledPopover
                    placement="top"
                    isOpen={isOpen}
                    target={props.target}
                    trigger="click"
                    toggle={(e) => {setIsOpen(!isOpen)} }
                    popperClassName="coupon-popover  shadow">
                    <PopoverHeader>
                        Coupon Applied For - {props.couponCode}
                    </PopoverHeader>
                    <PopoverBody>
                        {validate.isNotEmpty(props.couponCode) && (validate.isNotEmpty(displayTotalDiscount) && parseFloat(displayTotalDiscount) > 0) && <div className="popover-discount-element">
                            <p className="mb-0">Product Discount</p>
                            <p className="mb-0 text-success"> - <small><strong className="rupee">&#x20B9;</strong></small>{parseFloat(displayTotalDiscount).toFixed(2)} </p>
                        </div>}
                        {validate.isNotEmpty(props.couponCode) && validate.isNotEmpty(displayDeliveryDiscount) && displayDeliveryDiscount > 0 && <div className="popover-discount-element">
                            <p className="mb-0">Delivery Charges</p>
                            <p className="mb-0 text-success">{!isDeliveryFree ? <span>-<small><strong className="rupee">&#x20B9;</strong></small>{parseFloat(displayDeliveryDiscount).toFixed(2)}</span>:<span> FREE</span>}</p>
                        </div>}
                    </PopoverBody>
                </UncontrolledPopover>
            </div>}
        </React.Fragment>
        )
}