import React,{useState} from 'react';
import Validate from '../../../../../helpers/Validate';
import { Openpopover } from '../../Common/LabCartSummary';

const OrderSummary = (props) => {

  const validate = Validate();
  const cartSummary = props.cartSummary;
  const paymentType = props.paymentType;
  const couponApplied = props.couponApplied;

  const [selectedTrigger , setSelectedTrigger] = useState()
    

  const OpenpopoverModel = (targets) => {

    if (couponApplied && cartSummary.reportDeliveryChargesDiscountCouponCode  && targets == 'reportDeliveryCharges' && props.frompage=='Lab') {
      setSelectedTrigger(targets)
    }
    if (couponApplied && cartSummary.sampleCollectionChargesDiscountCouponCode && targets == 'collectionCenters' && props.frompage=='Lab') {
      setSelectedTrigger(targets)
    }
    if (couponApplied && targets == 'couponApplied' && props.frompage=='Lab') {
      setSelectedTrigger(targets)
    }
  }

  return (<React.Fragment>
    {validate.isNotEmpty(selectedTrigger) && validate.isNotEmpty(couponApplied) && <Openpopover rest={props.cartSummary} couponCode={couponApplied} target={selectedTrigger} setSelectedTrigger={setSelectedTrigger} />}
    <div className="col mt-4 px-0">
      <div className="card order-summary discounted-model">
        <h5 className="legend-title">Order Summary</h5>
        <div className="pt-3">
          {validate.isNotEmpty(cartSummary.totalPrice) && parseFloat(cartSummary.totalPrice) > 0 &&
          <p>
            <span>Cart MRP Total</span>
            <span><strong className="rupee">₹</strong>{parseFloat(cartSummary.totalPrice).toFixed(2)}</span>
          </p>}
          {validate.isNotEmpty(couponApplied) && validate.isNotEmpty(cartSummary.totalDiscount) && parseFloat(cartSummary.totalDiscount) > 0 &&
          <p>
            <span id="couponApplied" className={validate.isNotEmpty(couponApplied) && props.frompage=='Lab'  ? 'dashed-dark' : ' '} onClick={()=> {OpenpopoverModel("couponApplied")}}>Coupon Applied (<strong class="text-success">{couponApplied}</strong>)</span>
            <span class="text-success"> - <strong class="rupee">₹</strong>{parseFloat(cartSummary.totalDiscount).toFixed(2)}</span>
          </p>}
          {validate.isEmpty(couponApplied) && validate.isNotEmpty(cartSummary.totalDiscount) && parseFloat(cartSummary.totalDiscount) > 0 &&
          <p>
            <span>Discount Applied</span>
            <span class="text-success"> - <strong class="rupee">₹</strong>{parseFloat(cartSummary.totalDiscount).toFixed(2)}</span>
          </p>}
          {validate.isNotEmpty(cartSummary.applicableMdxPointsWorth) && parseFloat(cartSummary.applicableMdxPointsWorth) > 0 && cartSummary.applyMdxPointsPayment &&
          <p>
            <span>MDx Wallet Discount</span>
            <span class="text-success"> - <strong class="rupee">₹</strong>{parseFloat(cartSummary.applicableMdxPointsWorth).toFixed(2)}</span>
          </p>}
          {validate.isNotEmpty(cartSummary.collectionChargesMrp) && parseFloat(cartSummary.collectionChargesMrp) > 0 &&
          <p>
            <span className={validate.isNotEmpty(couponApplied) && props.frompage=='Lab' &&  validate.isNotEmpty(cartSummary.sampleCollectionChargesDiscountCouponCode) ? 'dashed-dark': ''} id="collectionCenters" onClick={() =>{OpenpopoverModel("collectionCenters")}}>Collection Charges</span>
            {cartSummary.sampleCollectionChargesDiscountCouponCode ? (cartSummary.collectionCharges && cartSummary.collectionCharges >0) ? <><span><del className="rupee">₹{parseFloat(cartSummary.collectionChargesMrp).toFixed(2)}</del> <strong><strong className="rupee">&#x20B9;</strong>{parseFloat(cartSummary.collectionCharges).toFixed(2)}</strong></span></> : <><span><del className="rupee">₹{parseFloat(cartSummary.collectionChargesMrp).toFixed(2)}</del> <strong>Free</strong></span></>: <><span><strong className="rupee">₹{parseFloat(cartSummary.collectionChargesMrp).toFixed(2)}</strong></span></> }
          </p>}
          {validate.isNotEmpty(cartSummary.reportDeliveryChargesMrp) && parseFloat(cartSummary.reportDeliveryChargesMrp) > 0 &&
          <p>
            <span id="reportDeliveryCharges" className={validate.isNotEmpty(couponApplied) && props.frompage =='Lab' && validate.isNotEmpty(cartSummary.reportDeliveryChargesDiscountCouponCode) ? 'dashed-dark':''} onClick={() =>{OpenpopoverModel("reportDeliveryCharges")}}>Report Delivery Charges</span>
            {cartSummary.reportDeliveryChargesDiscountCouponCode ? (cartSummary.reportDeliveryCharges && cartSummary.reportDeliveryCharges > 0) ? <><span><del className="rupee">₹{parseFloat(cartSummary.reportDeliveryChargesMrp).toFixed(2)}</del> <strong><strong className="rupee">&#x20B9;</strong>{parseFloat(cartSummary.reportDeliveryCharges).toFixed(2)}</strong></span></> : <><span><del className="rupee">₹{parseFloat(cartSummary.reportDeliveryChargesMrp).toFixed(2)}</del> <strong>Free</strong></span></>: <><span><strong className="rupee">₹{parseFloat(cartSummary.reportDeliveryChargesMrp).toFixed(2)}</strong></span></> }
          </p>}
          
          {validate.isNotEmpty(paymentType) && validate.isNotEmpty(cartSummary.totalAmount) && parseFloat(cartSummary.totalAmount) > 0 && <p><span>Payment Type</span><span>{paymentType}</span></p>}
          <hr className="solid" />
          {validate.isNotEmpty(cartSummary.itemsCount) && cartSummary.itemsCount > 0 &&
            <p><span>No.of Items</span><span>{cartSummary.itemsCount}</span></p>}
          {validate.isNotEmpty(cartSummary.totalAmount) &&
            <p>
              <span>{paymentType === "Cash On Collection" ? `Amount to be Paid` : `Amount paid`}</span>
              <span><strong className="rupee">₹</strong>{parseFloat(cartSummary.totalAmount).toFixed(2)}</span>
            </p>}
          {validate.isNotEmpty(cartSummary.totalSavings) && parseFloat(cartSummary.totalSavings) > 0 &&
            <p>
              <span>Total Amount Saved</span>
              <span class="text-success"><strong class="rupee">₹</strong>{parseFloat(cartSummary.totalSavings).toFixed(2)}</span>
            </p>}
        </div>
      </div>
    </div>
  </React.Fragment>);
}

export default OrderSummary;