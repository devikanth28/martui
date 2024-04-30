import React from "react";
import Validate from "../../../helpers/Validate";

const DoctorsCartSummary = (props) =>{

    const validate = Validate();
    const cartSummaryObj = props.cartSummaryObj;

    return(
        <React.Fragment>
            {validate.isNotEmpty(props.cartSummaryObj) && !props.isfromThankYou && 
                <section className="cart-summary">
                    <div className="header">
                        <p>Appointment Charges</p>
                    </div>
                    <div className="body">
                        {validate.isNotEmpty(cartSummaryObj.totalPrice) && parseFloat(cartSummaryObj.totalPrice) > 0 &&
                            <p><span>Consultation Fees</span><span><strong className="rupee">₹</strong>{parseFloat(cartSummaryObj.totalPrice).toFixed(2)}</span></p>
                        }
                        {validate.isNotEmpty(cartSummaryObj.totalDiscount) && parseFloat(cartSummaryObj.totalDiscount) > 0 && validate.isEmpty(cartSummaryObj.couponCode) &&
                            <p><span>Discount Applied</span><span>-&nbsp;<strong className="rupee">₹</strong>{parseFloat(cartSummaryObj.totalDiscount).toFixed(2)}</span></p>
                        }
                        {validate.isNotEmpty(cartSummaryObj.totalDiscount) && parseFloat(cartSummaryObj.totalDiscount) > 0 && validate.isNotEmpty(cartSummaryObj.couponCode) &&
                            <p><span>Coupon Applied (<span className="text-success">{cartSummaryObj.couponCode.toUpperCase()}</span>)</span><span><strong className="rupee">₹</strong>{parseFloat(cartSummaryObj.totalDiscount).toFixed(2)}</span></p>
                        }
                    </div>
                    <div className="footer border-top font-lg success-bg">
                        {validate.isNotEmpty(cartSummaryObj.grandTotal) && parseFloat(cartSummaryObj.grandTotal) >= 0 &&
                            <p className="pb-2"><span>Total Amount to be Paid</span><span><strong className="rupee">₹</strong>{parseFloat(cartSummaryObj.grandTotal).toFixed(2)}</span></p>
                        }
                        {validate.isNotEmpty(cartSummaryObj.totalDiscount) && parseFloat(cartSummaryObj.totalDiscount) > 0 &&
                            <p className="alert alert-success alert-item mt-0"><span>Total Amount Saved</span><span><strong className="rupee">₹</strong>{parseFloat(cartSummaryObj.totalDiscount).toFixed(2)}</span></p>
                        }
                    </div>
                </section>
            }
            {validate.isNotEmpty(props.cartSummaryObj) && props.isfromThankYou && 
                <div class="card order-summary col">
                    <h5 class="legend-title">Order Summary</h5>
                    <div class="pt-3">
                        {validate.isNotEmpty(cartSummaryObj.totalPrice) && parseFloat(cartSummaryObj.totalPrice) > 0 &&
                            <p><span>Consultation Fees</span><span><strong className="rupee">₹</strong>{parseFloat(cartSummaryObj.totalPrice).toFixed(2)}</span></p>
                        }
                        {validate.isNotEmpty(cartSummaryObj.totalDiscount) && parseFloat(cartSummaryObj.totalDiscount) > 0 && validate.isEmpty(cartSummaryObj.couponCode) &&
                            <p><span>Discount Applied</span><span>-&nbsp;<strong className="rupee">₹</strong>{parseFloat(cartSummaryObj.totalDiscount).toFixed(2)}</span></p>
                        }            
                        {validate.isNotEmpty(cartSummaryObj.totalDiscount) && parseFloat(cartSummaryObj.totalDiscount) > 0 && validate.isNotEmpty(cartSummaryObj.couponCode) &&
                            <p><span>Coupon Applied (<span className="text-success">{cartSummaryObj.couponCode.toUpperCase()}</span>)</span><span><strong className="rupee">₹</strong>{parseFloat(cartSummaryObj.totalDiscount).toFixed(2)}</span></p>
                        }
                        <hr className="solid" />
                        {validate.isNotEmpty(cartSummaryObj.grandTotal) && parseFloat(cartSummaryObj.grandTotal) > 0 &&
                            <p><span>{cartSummaryObj.paymentTypeCode === 'O'? `Total Amount Paid`:`Total Amount to be Paid`}</span><span><strong className="rupee">₹</strong>{parseFloat(cartSummaryObj.grandTotal).toFixed(2)}</span></p>
                        }
                    </div>
                    {validate.isNotEmpty(cartSummaryObj.totalDiscount) && parseFloat(cartSummaryObj.totalDiscount) > 0 &&
                        <p className="alert alert-item alert-success mt-2 mx-n3 mb-n3 px-3 py-2" style={{"borderRadius" : "0 0 0.25rem 0.25rem"}}><span>Total Amount Saved</span><span><strong className="rupee">₹</strong>{parseFloat(cartSummaryObj.totalDiscount).toFixed(2)}</span></p>
                    }
                </div>
            }
        </React.Fragment>
    )
}
export default DoctorsCartSummary;