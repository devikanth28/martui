import React, { useEffect, useState } from 'react';
import Validate from '../../../helpers/Validate';
import { Openpopover } from '../../Checkout/OrderReview/ReviewCartSummary';

const validate = Validate();
const MartCartSummary = (props) => {
    const [selectedTrigger, setSelectedTrigger] = useState();
    const [orderNumber, setOrderNumber] = useState();
    const orderDetails = props.orderDetails;
    let deliveryDiscount = (orderDetails?.cartSummary?.deliveryChargesBeforeDiscount - orderDetails?.cartSummary?.deliveryCharges) || 0;
    const [totalDiscount, setTotalDiscount] = useState(0);
    const [shippingCharges, setShippingCharges] = useState(0);
    const [totalPayable, setTotalPayable] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [cartTotalPoint, setCartTotalPoint] = useState(0);
    const [totalPaybackPoints, setTotalPaybackPoints] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [couponCode, setCouponCode] = useState(undefined);

    const prepareInitialValues = () => {
        let discountTotal = 0;
        let shippingCharge = 0;
        let totalPaybleValue = 0;
        let noOfItems = 0;
        let cartTotalPoints = 0;
        let totalPaybackPoint = 0;
        let amountTotal = 0;
        let coupon = undefined;

        orderDetails.orderList && orderDetails.orderList.map((eachOrder, index) => {
            amountTotal += eachOrder.orderTotal;
            discountTotal += eachOrder.discountTotal;
            totalPaybackPoint += eachOrder.totalPBPoints;
            totalPaybleValue += eachOrder.orderAmount;
            noOfItems += eachOrder.omsOrderItem.length;
            if (eachOrder.totalServiceCharges > 0) {
                shippingCharge += eachOrder.totalServiceCharges;
            }
            {
                eachOrder && eachOrder.omsOrderItem.map((product) => {
                    cartTotalPoints = cartTotalPoints + product.exactPoints * (product.packSize * (product.quantity / product.packSize));
                }
                )
            }
            if (validate.isNotEmpty(eachOrder.couponCode) && index == 0) {
                coupon = eachOrder.couponCode;
            }
        })
        setCouponCode(coupon);
        setTotalDiscount(discountTotal);
        setShippingCharges(shippingCharge);
        setTotalPayable(totalPaybleValue);
        setTotalItems(noOfItems);
        setCartTotalPoint(cartTotalPoints);
        setTotalPaybackPoints(totalPaybackPoint);
        setTotalAmount(amountTotal);
    }

    const OpenpopoverModel = (id, orderNo) => {
        if (validate.isNotEmpty(couponCode) && validate.isNotEmpty(id)) {
            setSelectedTrigger(id);
            setOrderNumber(orderNo);
        }
    }

    useEffect(() => {
        prepareInitialValues();
    }, [props?.couponCode])
    return (
        <React.Fragment>
            <Openpopover rest={props} couponCode ={couponCode} target={selectedTrigger} deliveryDiscount={deliveryDiscount} totalDiscount={totalDiscount} shippingCharges={shippingCharges} orderNumber={orderNumber} orderDetails={orderDetails}/>
            {orderDetails.orderList && orderDetails.orderList.length != 1 && <section className="cart-summary discounted-model">
            
                { orderDetails.orderList.map((eachOrder, key) => {
                    const isDeliveryDiscountCouponApplied = eachOrder?.orderSerivceCharge?.[0].discountPercentage > 0;
                    let eachOrderDeliveryDiscount = 0;
                    if (isDeliveryDiscountCouponApplied) {
                        eachOrderDeliveryDiscount = (eachOrder?.orderSerivceCharge?.[0]?.serviceCharge - eachOrder?.totalServiceCharges);
                    }
                    return (eachOrder && <SummaryCard sno={key} cardHeader={"Cart Summary"} noOfItems={eachOrder.omsOrderItem?.length} totalAmount={eachOrder.orderTotal} deliveryDiscount={eachOrderDeliveryDiscount}  shippingChargesAfterDiscount={eachOrder?.orderSerivceCharge?.[0]?.serviceCharge} shippingCharges={eachOrder?.totalServiceCharges} promotionType={eachOrder.promotionType} totalDiscount={eachOrder.discountTotal} paybackPoints={eachOrder.totalPBPoints} OpenpopoverModel={OpenpopoverModel} selectedTrigger={selectedTrigger} couponCode={couponCode} />)
                })}
            </section>
}
            <section className="cart-summary discounted-model">
                <SummaryCard noOfItems={totalItems} cardHeader={(validate.isNotEmpty(orderDetails.orderList) && orderDetails.orderList.length==1)?"Cart Summary":"Cart Total"} totalAmount={totalAmount} shippingCharges={shippingCharges} promotionType={validate.isNotEmpty(orderDetails.orderList) && orderDetails?.orderList[0]?.promotionType} deliveryDiscount={deliveryDiscount} cartTotalPoint={cartTotalPoint} totalDiscount={totalDiscount} totalPayable={totalPayable} paybackPoints={totalPaybackPoints} OpenpopoverModel={OpenpopoverModel} selectedTrigger={selectedTrigger} couponCode={couponCode}/>
            </section>
        </React.Fragment>
    )
}

const SummaryCard = (props) => {
    const { sno, cardHeader, noOfItems, totalAmount,shippingChargesAfterDiscount, shippingCharges, deliveryDiscount, promotionType, cartTotalPoint, totalDiscount, totalPayable, paybackPoints , couponCode} = props;
    return (
        <div>
            {validate.isNotEmpty(cardHeader) && (validate.isEmpty(sno) || sno == 0) && <div className="header">
                <p>{cardHeader}</p>
            </div>}
            {sno > 0 &&  <hr className="my-1 solid border-bottom-0"/>}

            <div className="body">
                {validate.isNotEmpty(sno) && <p className="title">Order {sno + 1}</p>}
                {validate.isNotEmpty(noOfItems) && <p>
                    <span>No.of Items</span>
                    <span>{noOfItems}</span>
                </p>}
                {validate.isNotEmpty(totalAmount) && <p>
                    <span>{validate.isEmpty(sno)?'Total Order MRP': 'MRP Total'}</span>
                    <span>
                        <strong className="rupee">&#x20B9;</strong>{parseFloat(totalAmount).toFixed(2)}
                    </span>
                </p>}
                {validate.isNotEmpty(shippingCharges) && <p className="font-weight-normal">
                    <span >Delivery Charges {deliveryDiscount > 0 && <>(<span className='text-success'>Coupon Applied</span>)</>}</span>
                    {shippingCharges ? (
                        <span>
                        {(deliveryDiscount && deliveryDiscount > 0)
                        ?
                        <><><strong className="rupee">&#x20B9;</strong><del>{parseFloat(shippingCharges).toFixed(2)}</del></>{ shippingChargesAfterDiscount > 0 ? <><strong className="rupee">&#x20B9;</strong>{parseFloat(shippingChargesAfterDiscount).toFixed(2)}</> : 'FREE'}</>
                        :
                        <><strong className="rupee">&#x20B9;</strong>{parseFloat(shippingCharges).toFixed(2)}</>
                        }
                    </span>
                    ) : (
                        <span> FREE</span>
                    )}
                </p>}
                {validate.isNotEmpty(totalDiscount) && <p className='text-success'>
                    <span id={validate.isEmpty(sno)?'deliveryCharges':`deliveryCharges${sno+1}`} className={validate.isNotEmpty(couponCode)?"dashed-dark":""} onClick={()=>{props?.OpenpopoverModel(validate.isEmpty(sno)?'deliveryCharges':`deliveryCharges${sno+1}`,sno)}}>{`${validate.isEmpty(sno)?'Total ':""}Amount Saved`}</span>
                    <span>
                        - <strong className="rupee">&#x20B9;</strong>{parseFloat(totalDiscount).toFixed(2)}
                    </span>
                </p>}
                {validate.isNotEmpty(cartTotalPoint) && validate.isNotEmpty(promotionType) && (promotionType == 2 && (cartTotalPoint > 0)) &&
                    <p className="text-success">
                        <span>Total Points</span>
                        <span>
                            {parseFloat(cartTotalPoint).toFixed(2)}
                        </span>
                    </p>
                }
            </div>
            {validate.isNotEmpty(totalPayable) && <div className="footer border-top font-lg">
                <span>Total Amount to be Paid</span>
                <span>
                    <strong className="rupee">&#x20B9;</strong>{parseFloat(totalPayable).toFixed(2)}
                </span>
            </div>}
            {validate.isNotEmpty(paybackPoints) && parseFloat(paybackPoints) > 0 &&
                <div className="footer border-top font-lg">
                    <span>MedPlus Payback Points to be Credited</span>
                    <span title='Payback Points'>
                        {parseInt(Math.abs(paybackPoints))}
                    </span>
                </div>
            }
            {((totalDiscount > 0 || deliveryDiscount > 0) && validate.isEmpty(sno)) && <div class="footer success mb-0"><p class="text-success d-flex justify-content-between font-weight-bold w-100 font-16"><span>Total Savings</span><span><strong class="rupee">₹</strong>{parseFloat(totalDiscount > 0 ? totalDiscount + deliveryDiscount : deliveryDiscount).toFixed(2)}</span></p></div>}
        </div>
    )
}

export default MartCartSummary;