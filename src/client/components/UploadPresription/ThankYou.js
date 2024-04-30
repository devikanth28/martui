import React from 'react';
import UserInfoAction from '../../../redux/action/UserInfoAction';
import CONFIG from '../../constants/ServerConfig';
import uploadPrescriptionImg from '../../images/common/uploaded-prescription.svg'

const Thankyou = (props) => {

    var userContactDetails = UserInfoAction().getUserContactDetails();
    const goToHome = () => {
        window.location.href = CONFIG.REDIRECT_HOME_URL;
    }
    const viewOrder = ()=> {
       window.location.href = `${CONFIG.REDIRECT_HOME_URL}ordersHistory`;
    }
   return (
    <React.Fragment>
            <section>
           <div className="body-height no-data-to-show py-5">
               <img src={uploadPrescriptionImg} title="Order Received" alt="Order Received" />
                   {props.isAlreadyPlaced ?
                       <span>A request for an order against this Health Record is already placed, reference number is <strong>{props.message}</strong> .<br /> For further queries please contact customer care <a className="font-weight-bold text-dark text-decoration-none" href="tel:040-67006700" title="Click to call">040-67006700</a></span>
                       : <span>Your prescription request id <strong>{props.message}</strong> has been submitted.<br />Customer care <a className="font-weight-bold text-dark text-decoration-none" href="tel:040-67006700" title="Click to call">040-67006700</a> will call you back to process your order</span>}
               <div className="mt-5">
                   {userContactDetails.shippingContactNumber && <button type="button" className="brand-secondary btn px-5 rounded-pill custom-btn-lg" onClick={() => viewOrder()} >View Order</button>}
                   <button type="submit" className="btn btn-brand-gradient ml-3 px-5 rounded-pill custom-btn-lg" onClick={() => goToHome()}>Continue shopping</button>
               </div>
           </div>
           </section>
    </React.Fragment>
   )
}

export default Thankyou;