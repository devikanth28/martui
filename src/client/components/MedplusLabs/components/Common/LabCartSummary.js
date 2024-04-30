import React , {useEffect, useState} from 'react';
import Validate from '../../../../helpers/Validate';
import { PopoverHeader, PopoverBody, UncontrolledPopover } from "reactstrap";

const LabCartSummary = (props) =>{
    const validate = Validate();
    const shoppingCart = props.shoppingCart;
    const [selectedTrigger , setSelectedTrigger] = useState();

    useEffect(() => {
        setSelectedTrigger();
    },[props.couponCode])
    

    const OpenpopoverModel = (targets) => {
        if(props.couponCode && props.reportDeliveryChargesDiscountCouponCode && targets == 'reportDeliveryCharges'){
            setSelectedTrigger(targets)
        }
        if(props.couponCode && props.sampleCollectionChargesDiscountCouponCode && targets == 'collectionCenters') {
            setSelectedTrigger(targets)
        }
        if(props.couponCode && targets == 'couponApplied'){
            setSelectedTrigger(targets)
        }
    }

    return(
        <React.Fragment>
            <Openpopover rest={props} couponCode ={props.couponCode} target={selectedTrigger} setSelectedTrigger={setSelectedTrigger}/>
            <section className="cart-summary discounted-model">
                <div className="header"><p>Cart Summary</p></div>
                <div className="body"> 
                    {validate.isNotEmpty(props.itemsCount) && 
                        <p className="font-weight-normal">
                            <span className='text-secondary'>No. Of Items</span>
                            <span className='text-secondary'>{props.itemsCount}</span>
                        </p>
                    }
                    {validate.isNotEmpty(props.totalPrice) && parseFloat(props.totalPrice) > 0 && 
                        <p className="font-weight-normal">
                            <span>Total MRP</span>
                            <span>
                                <strong className="rupee">&#x20B9;</strong>{parseFloat(props.totalPrice).toFixed(2)}
                            </span>
                        </p>
                    }
                    {validate.isNotEmpty(props.totalDiscount) && validate.isEmpty(props.couponCode) && parseFloat(props.totalDiscount) > 0 && 
                        <p className="font-weight-normal">
                            <span>Discount Applied</span>
                            <span>- 
                                <strong className="rupee">&#x20B9;</strong>{parseFloat(props.totalDiscount).toFixed(2)}
                            </span>
                        </p>
                    }
                    {validate.isNotEmpty(props.couponCode) &&  validate.isNotEmpty(props.totalDiscount) && parseFloat(props.totalDiscount) > 0 &&
                        <p className="font-weight-normal">
                            <span id="couponApplied" className={validate.isNotEmpty(props.couponCode) ? 'dashed-dark' : ' '} onClick={()=> {OpenpopoverModel("couponApplied")}}>Coupon Discount (<span className="text-success font-weight-bold">{props.couponCode}</span>)</span>
                            <span>- <strong className="rupee">&#x20B9;</strong>{parseFloat(props.totalDiscount).toFixed(2)}</span>
                        </p>
                    }
                    {validate.isNotEmpty(props.collectionChargesMrp) && parseFloat(props.collectionChargesMrp) > 0 && 
                        <p className="font-weight-normal">
                            <span className={validate.isNotEmpty(props.couponCode) && validate.isNotEmpty(props.sampleCollectionChargesDiscountCouponCode) ? 'dashed-dark': ''} id="collectionCenters" onClick={() =>{OpenpopoverModel("collectionCenters")}}>Collection Charges</span>
                            <span><strong className="rupee">&#x20B9;</strong>{validate.isNotEmpty(props.sampleCollectionChargesDiscountCouponCode) ? (validate.isNotEmpty(props.collectionCharges) && props.collectionCharges > 0) ? <><del>{parseFloat(props.collectionChargesMrp).toFixed(2)}</del> <span><strong className="rupee">&#x20B9;</strong>{parseFloat(props.collectionCharges).toFixed(2)}</span></>  :  <><del>{parseFloat(props.collectionChargesMrp).toFixed(2)}</del> Free</> : parseFloat(props.collectionChargesMrp).toFixed(2)}</span>
                        </p>
                    }

                    {(validate.isNotEmpty(props.reportDeliveryChargesMrp) && (parseFloat(props.reportDeliveryChargesMrp) < 0 || parseFloat(props.reportDeliveryChargesMrp) > 0)) && 
                        <p className="font-weight-normal">
                            <span id="reportDeliveryCharges" className={validate.isNotEmpty(props.couponCode) && validate.isNotEmpty(props.reportDeliveryChargesDiscountCouponCode) ? 'dashed-dark':''} onClick={() =>{OpenpopoverModel("reportDeliveryCharges")}}>Report Delivery Charges</span>
                            <span><strong className="rupee">&#x20B9;</strong>{validate.isNotEmpty(props.reportDeliveryChargesDiscountCouponCode) ? (validate.isNotEmpty(props.reportDeliveryCharges) && props.reportDeliveryCharges > 0) ? <><del>{parseFloat(props.reportDeliveryChargesMrp).toFixed(2)}</del> <span><strong className="rupee">&#x20B9;</strong>{parseFloat(props.reportDeliveryCharges).toFixed(2)}</span></>  :  <><del>{parseFloat(props.reportDeliveryChargesMrp).toFixed(2)}</del> Free</> : parseFloat(props.reportDeliveryChargesMrp).toFixed(2)}</span>
                        </p> 
                    }
                    {!props.isShoppingCart && validate.isNotEmpty(props.applicableMdxPointsWorth) && parseFloat(props.applicableMdxPointsWorth) > 0 && props.applyMdxPointsPayment &&
                        <p className="font-weight-normal">
                            <span>MDx Wallet Discount</span>
                            <span className='text-success'> - <strong className="rupee">&#x20B9;</strong>{parseFloat(props.applicableMdxPointsWorth).toFixed(2)}</span>
                        </p>
                    }
                </div>
                {validate.isNotEmpty(props.totalAmount) && parseFloat(props.totalAmount) >= 0 &&
                    <div className="footer border-top font-lg mb-0">
                        <span>Total Amount to be Paid</span>
                        <span><strong className="rupee">&#x20B9;</strong>{parseFloat(props.totalAmount).toFixed(2)}</span>
                    </div>
                }
                {props.isShoppingCart && validate.isNotEmpty(shoppingCart.customerMdxPoints) && shoppingCart.customerMdxPoints > 0 &&
                    validate.isNotEmpty(shoppingCart.applicableMdxPointsWorth) && parseFloat(shoppingCart.applicableMdxPointsWorth) > 0 &&
                    <div className="footer font-lg mb-0 my-n2">
                        <span>MDx Points Available</span>
                        <span>{parseFloat(shoppingCart.customerMdxPoints).toFixed(2)}</span>
                    </div>
                }
                {validate.isNotEmpty(props.totalSavings) && parseFloat(props.totalSavings) > 0 && 
                    <div className="footer success mb-0">
                        <p className="text-success d-flex justify-content-between font-weight-bold w-100">
                            <span>Total Savings</span>
                            <span><strong className="rupee">&#x20B9;</strong>{parseFloat(props.totalSavings).toFixed(2)}</span>
                        </p>
                    </div>}
                {props.isShoppingCart && props.totalPrice && parseFloat(props.totalPrice) < parseFloat(props.minOrderForFreeSampleCollection) && validate.isNotEmpty(props.collectionCharges) && parseFloat(props.collectionCharges) > 0 && 
                    <div className="footer warning">
                        <div>
                            <p className="font-weight-normal">
                                <strong>Note:</strong> For free home collection, minimum order value is Rs {parseFloat(props.minOrderForFreeSampleCollection).toFixed(2)}/-
                            </p>
                        </div>
                    </div>
                }
             </section>
        </React.Fragment>
    )
}
export default LabCartSummary;

export const Openpopover = (props) => {
    const validate = Validate()
    const rest = props.rest
    const [isOpen , setIsOpen] = useState(true);

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
                        {validate.isNotEmpty(props.couponCode) && validate.isNotEmpty(rest.totalDiscount) && parseFloat(rest.totalDiscount) > 0 && <div className="popover-discount-element">
                            <p className="mb-0">Product Discount</p>
                            <p className="mb-0 text-success"> - <small><strong className="rupee">&#x20B9;</strong></small>{parseFloat(rest.totalDiscount).toFixed(2)} </p>
                        </div>}
                        {/* validate.isNotEmpty(rest.sampleCollectionChargesDiscountCouponCode) */}
                        {validate.isNotEmpty(rest.collectionChargesMrp) && validate.isNotEmpty(rest.sampleCollectionChargesDiscountCouponCode)  && parseFloat(rest.collectionChargesMrp) > 0 && <div className="popover-discount-element">
                            <p className="mb-0">Collection Charges</p>
                            {validate.isNotEmpty(rest.collectionCharges) ? rest.collectionCharges > 0 ? <p className="mb-0 text-success">- <small><strong className="rupee">&#x20B9;</strong></small>{parseFloat(rest.collectionChargesMrp - rest.collectionCharges).toFixed(2)} </p> : <p className="mb-0 text-success">Free</p> : <p className="mb-0"><small><strong className="rupee">&#x20B9;</strong></small>{parseFloat(rest.collectionChargesMrp).toFixed(2)}</p>}
                        </div>}
                        {/* validate.isNotEmpty(rest.reportDeliveryChargesDiscountCouponCode) */}
                        {validate.isNotEmpty(rest.reportDeliveryChargesMrp) && validate.isNotEmpty(rest.reportDeliveryChargesDiscountCouponCode) && parseFloat(rest.reportDeliveryChargesMrp) > 0 && <div className="popover-discount-element">
                            <p className="mb-0">Report Delivery Charges</p>
                            {validate.isNotEmpty(rest.reportDeliveryCharges) ? rest.reportDeliveryCharges > 0 ? <p className="mb-0 text-success"> - <small><strong className="rupee">&#x20B9;</strong></small>{parseFloat(rest.reportDeliveryChargesMrp - rest.reportDeliveryCharges).toFixed(2)}</p> : <p className="mb-0 text-success">Free</p> : <p className="mb-0"><small><strong className="rupee">&#x20B9;</strong></small>{parseFloat(rest.reportDeliveryChargesMrp).toFixed(2)}</p>}
                        </div>}
                    </PopoverBody>
                </UncontrolledPopover>

            </div>}
        </React.Fragment>
        )
}

