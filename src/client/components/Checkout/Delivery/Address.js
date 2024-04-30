import React, { useState } from 'react';
import { getSelectedLocality } from '../../../../redux/action/LocalityAction';
import Validate from '../../../helpers/Validate';

const Address = (props) => {
   const validate = Validate();
   const addressInfo = props.eachAddressInfo;
   const defsCss = `.a{fill:none;}.b{fill:#404040;}`;
   const selectedLocality = getSelectedLocality();
   var deliveryTypeClass = props.deliveryType === 'ONLY_HOME_DELIVERY' ? 'three-column' : '';
   var activeClass = props.selectedDeliveryType.HOME_DELIVERY === props.index ? 'active' : '';

   function prepareAddressString() {
      let addressString = addressInfo.addressLine1;
      if (addressInfo.addressLine2) {
         addressString += ", " +addressInfo.addressLine2;
      } else {
         addressString += ", " +selectedLocality.locationName;
      }
      if (addressInfo.city) {
         addressString += ", " +addressInfo.city;
      } else {
         addressString += ", " +selectedLocality.city;
      }
      if (addressInfo.state) {
         addressString += ", " +addressInfo.state;
      } else {
         addressString += ", " +selectedLocality.state;
      }
      if (addressInfo.pincode) {
         addressString += ", " + addressInfo.pincode;
      } else {
         addressString += ", " + selectedLocality.pincode;
      }
      return addressString;
   }

   return (
      <React.Fragment>
         {validate.isNotEmpty(addressInfo) &&
            <address id="address-elm" className={deliveryTypeClass +" "+ activeClass} onClick={(e) => props.setHomeDeliveryInfo(addressInfo, props.index)}>
               <p className="title-with-btn">
                  {addressInfo.firstName} {validate.isNotEmpty(addressInfo.lastName) && (" "+ addressInfo.lastName)}
                  <button aria-label='Edit' role="button" className="btn btn-link-blue shadow-none btn-sm" onClick={(e) => props.openEditAddressSection(addressInfo, e, props.index)} >
                     <svg className="align-baseline" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                        <defs>
                           <style>{defsCss}</style>
                        </defs>
                        <g transform="translate(-180.258 -249.086)">
                           <rect className="a" width="24" height="24" transform="translate(180.258 249.086)"/>
                           <path className="b" d="M-4845.372-664.182a3.693,3.693,0,0,1-3.687-3.689v-14.523a3.693,3.693,0,0,1,3.687-3.689h4.678a.806.806,0,0,1,.8.806.806.806,0,0,1-.8.806h-4.682a2.088,2.088,0,0,0-2.074,2.083v14.517a2.091,2.091,0,0,0,2.069,2.085h14.518a2.089,2.089,0,0,0,2.086-2.085v-4.678a.8.8,0,0,1,.8-.8.8.8,0,0,1,.8.8v4.678a3.692,3.692,0,0,1-3.688,3.689Zm4.178-6.9a1.377,1.377,0,0,1-.838-.655,1.373,1.373,0,0,1-.131-1.053l.929-3.288a.809.809,0,0,1,.2-.359l10.881-10.88a2.983,2.983,0,0,1,2.116-.865,2.983,2.983,0,0,1,2.114.863,3.014,3.014,0,0,1,0,4.231l-10.847,10.878a.815.815,0,0,1-.371.2l-3.259.918-.417.056A1.422,1.422,0,0,1-4841.194-671.082Zm1.468-4.4-.8,2.721,2.7-.731.03-.01,9.2-9.229.085-.085-1.951-1.952Zm10.777-10.759-.359.323,1.936,1.939.287-.231.012-.011a1.4,1.4,0,0,0-.011-1.951,1.4,1.4,0,0,0-.972-.394A1.389,1.389,0,0,0-4828.949-686.236Z" transform="translate(5029.317 937.267)"/>
                        </g>
                     </svg>
                     Edit
                  </button>
               </p>
               <p className="title">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                     <g transform="translate(-48.807 -143.086)">
                        <rect width="24" height="24" transform="translate(48.807 143.086)" fill="none"></rect>
                        <g transform="translate(53.785 145.081)">
                           <path d="M61.016,148.6a3.4,3.4,0,1,0,3.405,3.4A3.4,3.4,0,0,0,61.016,148.6Zm0,5.513a2.108,2.108,0,1,1,2.108-2.108A2.111,2.111,0,0,1,61.016,154.116Z" transform="translate(-53.808 -145.095)" fill="#343a40"></path>
                           <path d="M66.262,147.159a7,7,0,0,0-5.134-2.073h-.2a7.018,7.018,0,0,0-5.177,2.073,7.152,7.152,0,0,0-1.132,8.253,88.446,88.446,0,0,0,6.369,9.622,86.524,86.524,0,0,0,6.406-9.622A7.152,7.152,0,0,0,66.262,147.159Zm-.016,7.65a74.245,74.245,0,0,1-5.254,8.05,76.1,76.1,0,0,1-5.225-8.05,5.853,5.853,0,0,1,.924-6.755,5.6,5.6,0,0,1,4.238-1.671h.2a5.621,5.621,0,0,1,4.194,1.671A5.853,5.853,0,0,1,66.246,154.809Z" transform="translate(-53.798 -145.086)" fill="#343a40"></path>
                        </g>
                     </g>
                  </svg>
                  Address:
                  <small className="mb-3">
                     {/* {addressInfo.addressLine1}{addressInfo.addressLine2 && ', '+addressInfo.addressLine2}{addressInfo.city && ', '+addressInfo.city}{addressInfo.state && ', '+addressInfo.state}{addressInfo.pinCode && ', '+addressInfo.pinCode} */}
                     {prepareAddressString()}
                  </small>
               </p>
               <p className="title">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                     <g transform="translate(-180.438 -213.832)">
                        <rect width="24" height="24" transform="translate(180.438 213.832)" fill="none"></rect>
                        <g transform="translate(182.199 215.78)">
                           <g transform="translate(0 1.429)">
                              <path d="M185.394,217.171a2.043,2.043,0,0,0-.705.124,3.87,3.87,0,0,0-.728.361l-.369.26a3.029,3.029,0,0,0-.264.236,3.822,3.822,0,0,0-.979,1.742c-.771,2.889,1.118,7.237,4.7,10.82,3,3,6.621,4.87,9.442,4.87a5.349,5.349,0,0,0,1.377-.171,3.8,3.8,0,0,0,1.738-.975,2.837,2.837,0,0,0,.265-.3l.262-.374a3.9,3.9,0,0,0,.334-.689,2.167,2.167,0,0,0-.821-2.518l-2.625-1.833a2.261,2.261,0,0,0-3.063.546l-.509.731-.126-.089a24.713,24.713,0,0,1-5.47-5.468l-.089-.127.732-.51a2.2,2.2,0,0,0,.545-3.063l-1.832-2.624A2.229,2.229,0,0,0,185.394,217.171Zm11.1,17.253c-2.524,0-5.828-1.735-8.623-4.53-3.246-3.247-5.057-7.237-4.4-9.7a2.668,2.668,0,0,1,.678-1.22,1.807,1.807,0,0,1,.135-.126l.318-.225a2.535,2.535,0,0,1,.493-.24,1.03,1.03,0,0,1,1.162.4l1.831,2.622a1.042,1.042,0,0,1-.257,1.449l-1.193.833a.576.576,0,0,0-.16.783,24.809,24.809,0,0,0,6.813,6.815.585.585,0,0,0,.785-.16l.833-1.195a1.071,1.071,0,0,1,1.447-.257l2.624,1.833a1.006,1.006,0,0,1,.4,1.163l-.007.017a2.439,2.439,0,0,1-.206.435l-.223.321a1.537,1.537,0,0,1-.156.173,2.649,2.649,0,0,1-1.219.677A4.167,4.167,0,0,1,196.492,234.424Z" transform="translate(-182.178 -217.171)" fill="#343a40"></path>
                           </g>  
                           <g transform="translate(9.963)">
                              <path d="M192.615,215.757a.58.58,0,0,0-.034,1.158,9.141,9.141,0,0,1,8.548,8.546.589.589,0,0,0,.621.543.579.579,0,0,0,.537-.615,10.284,10.284,0,0,0-3-6.636h0a10.28,10.28,0,0,0-6.634-3Z" transform="translate(-192.036 -215.757)" fill="#343a40"></path>
                           </g>
                           <g transform="translate(8.736 3.129)">
                              <path d="M191.427,218.853a.611.611,0,0,0-.6.544.58.58,0,0,0,.145.419.572.572,0,0,0,.4.2h0a6.708,6.708,0,0,1,6.274,6.275.589.589,0,0,0,.621.541h0a.578.578,0,0,0,.536-.613,7.869,7.869,0,0,0-7.362-7.36Z" transform="translate(-190.822 -218.853)" fill="#343a40"></path>
                           </g>
                        </g>
                     </g>
                  </svg>
                  Mobile Number: 
                  <small>+91 {addressInfo.mobileNo}</small>
               </p>
            </address>
         }
      </React.Fragment>
   )
}
export default Address;
