import React from 'react';

function DoctorCartSummary(props) {
    return (
        <React.Fragment>
            { !props.fromThankYou &&  <section className="cart-summary">
                <div className="header">
                    <p>Appointment Charges</p>
                </div>
                <div className="body"> 
                    {/* <p><span>Total Price</span><span><strong class="rupee">₹</strong>&nbsp;00.00</span></p>                   */}
                    <p><span>Consultation Fees</span><span><strong className="rupee">₹</strong>&nbsp;00.00</span></p>
                    <p><span>Discount Applied</span><span>-&nbsp;<strong className="rupee">₹</strong>&nbsp;00.00</span></p>
                    <p><span>Coupon Applied (<span className="text-success">TEST20</span>)</span><span><strong className="rupee">₹</strong>&nbsp;00.00</span></p>
                    {/* <p><span>Report Delivery Charges</span><span><strong className="rupee">₹</strong>&nbsp;00.00</span></p>
                    <p><span>Collection Charges</span><span><strong className="rupee">₹</strong>&nbsp;00.00</span></p> */}
                </div>
                <div className="footer border-top font-lg success-bg">
                    <p><span>Total Amount to be Paid</span><span><strong className="rupee">₹</strong>&nbsp;00.00</span></p>
                    <p className="alert alert-success alert-item"><span>Total Amount Saved</span><span><strong className="rupee">₹</strong>&nbsp;00.00</span></p>
                </div>
            </section>}
            { props.fromThankYou &&  <div class="card order-summary">
                <h5 class="legend-title">Order Summary</h5>
                <div class="pt-3">
                    {/* <p><span>No. Of Items</span><span>03</span></p> */}
                    <p><span>Consultation Fees</span><span><strong className="rupee">₹</strong>&nbsp;00.00</span></p>
                    <p><span>Discount Applied</span><span>-&nbsp;<strong className="rupee">₹</strong>&nbsp;00.00</span></p>
                    <p><span>Coupon Applied (<span className="text-success">TEST20</span>)</span><span><strong className="rupee">₹</strong>&nbsp;00.00</span></p>
                    {/* <p><span>Report Delivery Charges</span><span><strong className="rupee">₹</strong>&nbsp;00.00</span></p>
                    <p><span>Collection Charges</span><span><strong className="rupee">₹</strong>&nbsp;00.00</span></p> */}
                    <div className="footer border-top font-lg success-bg px-0">
                    <p><span>Total Amount to be Paid</span><span><strong className="rupee">₹</strong>&nbsp;00.00</span></p>
                    <p className="alert alert-success alert-item px-0"><span>Total Amount Saved</span><span><strong className="rupee">₹</strong>&nbsp;00.00</span></p>
                </div>
                    {/* <p><span>Total Amount Saved</span><span class="text-success"><strong class="rupee">₹</strong> &nbsp;00.00</span></p> */}
                </div>
            </div>}
        </React.Fragment>
    );
}

export default DoctorCartSummary;