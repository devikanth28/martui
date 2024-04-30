import React from 'react';
import Validate from '../../../../helpers/Validate';

const ApplicableOffers = (props) => {

   const validate = Validate();

   let productPromotionsArray = [];

   const svg = (
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" className='offers-tag'>
         <path id="np_tag_888732_000000" d="M34.145,27.982l-8.71-8.71a1.581,1.581,0,0,0-1.219-.523H18.41a1.71,1.71,0,0,0-1.742,1.742V26.3a1.581,1.581,0,0,0,.523,1.219l8.71,8.71a1.684,1.684,0,0,0,2.439,0l5.806-5.806A1.684,1.684,0,0,0,34.145,27.982ZM20.732,23.976a1.162,1.162,0,1,1,1.162-1.162A1.165,1.165,0,0,1,20.732,23.976Z" transform="translate(-16.668 -18.75)" fill="#08CE73" />
      </svg>
   );

   if(validate.isNotEmpty(props.productPromotion)) {
      {validate.isNotEmpty(props.productPromotion.suplementPromotionRanges) && props.productPromotion.suplementPromotionRanges.map((eachProductPromotion) => {
         if(eachProductPromotion.campaignType === 5 && eachProductPromotion.fromQuantity > 0 && validate.isNotEmpty(eachProductPromotion.displayMessage)) {
            productPromotionsArray.push(eachProductPromotion.displayMessage);
         }
      })}
      {validate.isNotEmpty(props.productPromotion.specialPromotionRanges) && props.productPromotion.specialPromotionRanges.map((eachProductPromotion) => {
         if(eachProductPromotion.displayMessage) {
            productPromotionsArray.push(eachProductPromotion.displayMessage);
            return;
         }
         if(eachProductPromotion.fromQuantity === 1) {
            if(eachProductPromotion.discountType === 1 || eachProductPromotion.discountType === 2) {
               productPromotionsArray.push("FLAT " + (eachProductPromotion.discountPercentage.toString().indexOf(".") !== -1 ? parseFloat(eachProductPromotion.discountPercentage).toFixed(2) : eachProductPromotion.discountPercentage) + " % OFF");
            }
            if(eachProductPromotion.discountType === 3 && eachProductPromotion.discountAmount > 1) {
               productPromotionsArray.push("FLAT ₹" + (eachProductPromotion.discountPercentage.toString().indexOf(".") !== -1 ? parseFloat(eachProductPromotion.discountAmount * props.product.packSize).toFixed(2) : eachProductPromotion.discountAmount  * props.product.packSize) + " OFF");
            }
         } else {
            if(eachProductPromotion.discountType === 1 || eachProductPromotion.discountType === 2) {
               productPromotionsArray.push("On " + eachProductPromotion.fromQuantity + " or more units " + (eachProductPromotion.discountPercentage.toString().indexOf(".") !== -1 ? parseFloat(eachProductPromotion.discountPercentage).toFixed(2) : eachProductPromotion.discountPercentage) + " % instant discount");
            }
            if(eachProductPromotion.discountType === 3 && eachProductPromotion.discountAmount > 1) {
               productPromotionsArray.push("On " + eachProductPromotion.fromQuantity + " or more units ₹" + (eachProductPromotion.discountPercentage.toString().indexOf(".") !== -1 ? parseFloat(eachProductPromotion.discountAmount * props.product.packSize).toFixed(2) : eachProductPromotion.discountAmount * props.product.packSize) + " instant discount");
            }
         }
      })}
      {validate.isNotEmpty(props.productPromotion.slabs) && props.productPromotion.slabs.map((eachProductPromotion) => {
         if(eachProductPromotion.discountPercentage > 0 && eachProductPromotion.fromValue > 0) {
            productPromotionsArray.push(eachProductPromotion.displayMessage + ` <a class="text-decoration-none" href=/offertermsandconditions#disc${eachProductPromotion.discountPercentage}tnc title="Offer Terms &amp; Conditions" target="_blank" rel="noopener"><strong>T &amp; C</strong></a>`);
         }
      })}
   }

   return (
      <React.Fragment>
         {validate.isNotEmpty(props.productPromotion) && productPromotionsArray.length > 0 && 
            <section className={`mb-3 ${props.class == "Resolution"? "w-50" :""}`}>
               <div className='Applicable-offers'>
                  <h4 class="px-2"><span className="strong sub-Applicable-offers">Applicable Offers</span></h4>
                  <ul className="mb-0 px-2">
                     { productPromotionsArray.map((eachProductPromotion, index) => {
                        return(
                           <li className='mb-2 d-flex align-items-center'>
                              {svg}
                              <div className='pl-2 font-14' dangerouslySetInnerHTML={{ __html: eachProductPromotion }} />
                           </li>
                        );
                     })}
                  </ul>
               </div>
            </section>}
      </React.Fragment>
   )
}

export default ApplicableOffers;
