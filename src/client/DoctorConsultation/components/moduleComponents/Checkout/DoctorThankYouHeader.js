import React from 'react';


const DoctorThankYouHeader = (props) =>{
  return (
  <React.Fragment>
    {(props.cartSummaryObj.paymentType == 'PAY_ONLINE' && props.isPaymentAwaited) ?
      <div className="status-container awaited">
         <span></span>
        <h2>Awaiting Payment</h2>
        <p>Your Consultation will be shceduled once payment is successful</p>
      </div>
      :
      <div className="status-container success">
        <span></span>
        <h2>Thank You..!</h2>
        {props.isFollowUpOrder ? <p>Your FollowUp Consultation has been scheduled successfully</p> : <p>Your Consultation has been scheduled successfully</p> }
      </div>
    }
  </React.Fragment>);
}


export default DoctorThankYouHeader;