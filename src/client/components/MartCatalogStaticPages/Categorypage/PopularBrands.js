import React from 'react'
import DoctorSlider from '../../DoctorConsultation/DoctorSlider'
import PopularPlaceholders from './CategoryPagePlaceholders/PopularPlaceholders'
const PopularBrands = () => {
  return (
    <React.Fragment>
         <div class="row m-0">
            <div class="col-sm-6  pl-0">
               <section class="categories-tpt pb-0">
                  <div class="d-flex align-items-center justify-content-between ">
                     <h5 class="m-0 my-2"> Popular Brands</h5>
                  </div>
                  <div class="container-fluid my-2 p-0">
                     <DoctorSlider source="Derived" />
                  </div>
               </section>
            </div>
            <div class="col-sm-6 col-md-6 col-lg-6 p-0">
               <div class="mb-3">
                  <section class="categories-tpt promotion-banner padding-none py-0">
                     <a style={{ backgroundImage: "url(https://static2.medplusmart.com/live/bannerImage/Mart/5f6c78d61327b86ac74ba908cbc3ea20.jpg)" }} title='Gummy banner'>
                     </a>
                  </section>
               </div>
            </div>
         </div>
          <PopularPlaceholders/> 
   </React.Fragment>
  )
}
export default PopularBrands