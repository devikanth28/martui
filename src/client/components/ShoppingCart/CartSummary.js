import React from 'react';
import Validate from '../../helpers/Validate';

const CartSummary = (props) => {

    const validate = Validate();
    const selectedLocality = props.selectedLocality;

    return (
        <React.Fragment>
            <section className="cart-summary">
                <div className="header">
                    <p>Cart Summary</p>
                </div>
                <div className="body">
                    <p><span>No. Of Items</span><span>{props.noOfItems}</span></p>
                    {!props.isNewCheckoutPromotionEnabled &&
                        <p><span>MRP Total</span><span><strong className="rupee">&#x20B9;</strong>{parseFloat(props.totalAmount).toFixed(2)}</span></p>
                    }
                    {props.isNewCheckoutPromotionEnabled &&
                        <p><span>MRP Total</span><span><strong className="rupee">&#x20B9;</strong>{parseFloat(props.totalMrp).toFixed(2)}</span></p>
                    }
                    {(props.appliedPromotionType == "DISCOUNT" || props.appliedPromotionType == "WALLET") && props.isNewCheckoutPromotionEnabled && props.totalDiscount > 0 &&
                        <React.Fragment>
                            <p className="text-success"><span>Total Amount Saved</span><span><strong className="rupee">&#x20B9;</strong>{parseFloat(props.totalDiscount).toFixed(2)}</span></p>
                        </React.Fragment>
                    }
                    {props.appliedPromotionType == "POINT" && props.isNewCheckoutPromotionEnabled &&
                        <React.Fragment>
                            {props.totalDiscount > 0 && <p className="text-success"><span>Total Amount Saved</span><span><strong className="rupee">&#x20B9;</strong>{parseFloat(props.totalDiscount).toFixed(2)}</span></p>}
                            <p className="text-success"><span>Total Points</span><span>{parseFloat(props.totalPoint).toFixed(2)} pts</span></p>
                        </React.Fragment>
                    }
                </div>
                {props.isNewCheckoutPromotionEnabled &&
                    <div className="footer border-top font-lg">
                        <span className='col p-0'>Total Amount to be Paid</span>
                        <span className='col-5 p-0 text-right'><strong className="rupee">&#x20B9;</strong>{parseFloat(props.totalAmount).toFixed(2)}</span>
                    </div>
                }
                {validate.isNotEmpty(props.totalPbPoints) && parseFloat(props.totalPbPoints) > 0 &&
                    <div className="footer border-top font-lg">
                        <span className='col p-0'>MedPlus Payback Points to be Credited</span>
                        <span className='col-5 p-0 text-right'>{parseInt(Math.abs(props.totalPbPoints))}</span>
                    </div>
                }
                {(validate.isNotEmpty(selectedLocality) && ((parseFloat(selectedLocality.hdShippingCharges) > 0) || (parseFloat(selectedLocality.spShippingCharges) > 0))) &&
                    <div className="footer warning">
                        <div>
                            <p>Delivery charges may apply</p>
                        </div>
                    </div>
                }
            </section>
        </React.Fragment>
    )
}

export default CartSummary;