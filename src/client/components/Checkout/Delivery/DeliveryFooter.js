import React, { useState, useEffect } from 'react';
import CheckoutService from '../../../services/CheckoutService';
import Loader, { BackDropLoader } from '../../Common/Loader';
import Validate from '../../../helpers/Validate';

const DeliveryFooter = (props) => {

   const [isLoading, setLoading] = useState(false);
   
   const saveDeliveryDetails = () => {
      CheckoutService().saveDeliveryDetails(props.customerSelectedAddress).then(response =>{
         setLoading(false);
         if(response != null && response.responseData != null) {
             console.log(JSON.stringify(response));
         }
      }).catch(function(error) {
         setLoading(false);
         console.log(error);
      });
   }

   return (
      <React.Fragment>
         <footer className="footer fixed-bottom mt-auto py-3">
            <div className="container text-right">
               <button type="button" className="brand-secondary btn px-5 rounded-pill custom-btn-lg" onClick={() => props.onBackClick()}>Back</button>
               <button type="submit" className="btn btn-brand px-5 rounded-pill custom-btn-lg" onClick={() => saveDeliveryDetails()}>Proceed</button>
            </div>
         </footer>
      </React.Fragment>
   )
}
export default DeliveryFooter;