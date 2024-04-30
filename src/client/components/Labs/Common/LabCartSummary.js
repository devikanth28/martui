import React from 'react';
import Validate from '../../../helpers/Validate';
import { connect } from 'react-redux';

const LabCartSummary = (props) =>{
    const validate = Validate();
    return(
        <React.Fragment>
            <section className="cart-summary">
                <div className="header"><p>Cart Summary</p></div>
                <div className="body">
                    <p className="font-weight-normal"><span>No. Of Items</span><span>{props.shoppingCart.totalCartItemsCount}</span></p>
                    <p className="font-weight-normal"><span>Total Price</span><span><strong className="rupee">&#x20B9;</strong> {parseFloat(props.shoppingCart.totalPrice).toFixed(2)}</span></p>
                    {validate.isNotEmpty(props.shoppingCart.totalDiscount) && validate.isEmpty(props.shoppingCart.couponCode) && props.shoppingCart.totalDiscount > 0 && <p className="font-weight-normal"><span>Discount Applied</span><span>- <strong className="rupee">&#x20B9;</strong> {parseFloat(props.shoppingCart.totalDiscount).toFixed(2)}</span></p>}
                    {validate.isNotEmpty(props.shoppingCart.couponCode) && <p className="font-weight-normal"><span>Coupon Applied (<span className="text-success font-weight-bold">{props.shoppingCart.couponCode}</span>)</span><span>- <strong className="rupee">&#x20B9;</strong> {parseFloat(props.shoppingCart.totalDiscount).toFixed(2)}</span></p>}
                    {validate.isNotEmpty(props.shoppingCart.reportDeliveryTypeOff) && (props.shoppingCart.reportDeliveryTypeOff < 0 || props.shoppingCart.reportDeliveryTypeOff > 0) && <p className="font-weight-normal"><span>Report Delivery Charges</span><span><strong className="rupee">&#x20B9;</strong> {Math.abs(props.shoppingCart.reportDeliveryTypeOff)}</span></p>}
                    {!props.shoppingCartSummary && validate.isNotEmpty(props.shoppingCart.collectionCharges) && props.shoppingCart.collectionCharges > 0 && <p className="font-weight-normal"><span>Collection Charges</span><span><strong className="rupee">&#x20B9;</strong> {props.shoppingCart.collectionCharges}</span></p>}
                </div>
                <div className="footer border-top font-lg mb-0">
                    <span>Total Amount to be Paid</span>
                    <span><strong className="rupee">&#x20B9;</strong>&nbsp;{parseFloat(props.shoppingCart.totalAmountAfterAdjustments).toFixed(2)}</span>
                </div>
                {validate.isNotEmpty(props.shoppingCart.totalDiscount) && props.shoppingCart.totalDiscount > 0 && <div className="footer success mb-0"><p className="text-success d-flex justify-content-between font-weight-bold w-100"><span>Total Savings</span><span><strong className="rupee">&#x20B9;</strong> {parseFloat(props.shoppingCart.totalDiscount).toFixed(2)}</span></p></div>}
                {props.shoppingCart.totalPrice && props.shoppingCart.totalPrice < props.shoppingCart.minOrderAmount && validate.isNotEmpty(props.shoppingCart.collectionCharges) && props.shoppingCart.collectionCharges > 0 && <div className="footer warning"><div><p className="font-weight-normal"><strong>Note:</strong> For free home collection, minimum order value is <span className='rupee'>&#x20B9;</span>{props.shoppingCart.minOrderAmount}/-</p></div></div>}
            </section>
        </React.Fragment>
    )
}

function mapStateToProps(state){
    return {
        shoppingCart: state.labCheckout.labShoppingCart,
    }
 }
export default connect(mapStateToProps)(LabCartSummary);