import React from 'react'
import SplitBanner from './CategoryPagePlaceholders/SplitBanner'
const PromotinalOffers = () => {
   return (
      <React.Fragment>
         <section class="categories mt-5">
            <div class="container-fluid">
               <div class="d-flex align-items-center justify-content-between mb-3">
                  <h5 class="m-0">Promotional Offer For You</h5>
                  <button type="button" role="button" class="btn brand-secondary px-4">View All</button>
               </div>
               <div class="clearfix"></div>
               <div class="promotions">
                  <div class="itemcard">
                     <a href="javaScript:void(0);" title="Huggies Special Offer Packs">
                        <figure>
                           <img class="img-fluid" itemprop="image" alt="Huggies Special Offer Packs" title="Huggies Special Offer Packs" src="https://static2.medplusmart.com/live/bannerImage/Mart/5038cfd2359e6fef9c0b83fd42ea23da.jpg" />
                        </figure>
                     </a>
                     <div class="footer-offer">
                        <h4 class="mb-3 ml-3">
                           <small> Upto Rs 480 Off </small>
                           <strong class="text-danger"> Huggies <sup> * </sup> </strong>
                        </h4>
                     </div>
                  </div>
                  <div class="itemcard">
                     <a href="javaScript:void(0);" title="BonnyBoo">
                        <figure>
                           <img class="img-fluid" itemprop="image" alt="BonnyBoo" src="https://static2.medplusmart.com/live/bannerImage/Mart/32cb3de8b2cc5bd3123ca310e0fd82b6.jpg" />
                        </figure>
                     </a>
                     <div class="footer-offer">
                        <h4 class="mb-3 ml-3">
                           <small> Upto Rs 480 Off </small>
                           <strong class="text-danger"> Huggies <sup> * </sup> </strong>
                        </h4>
                     </div>
                  </div>
                  <div class="itemcard">
                     <a href="javaScript:void(0);" title="Kiddos">
                        <figure>
                           <img class="img-fluid" itemprop="image" alt="Kiddos" src="https://static2.medplusmart.com/live/bannerImage/Mart/c2b1b72f3bb2f94e3df43b7b29cd768f.jpg" />
                        </figure>
                     </a>
                     <div class="footer-offer">
                        <h4 class="mb-3 ml-3">
                           <small> Upto Rs 480 Off </small>
                           <strong class="text-danger"> Huggies <sup> * </sup> </strong>
                        </h4>
                     </div>
                  </div>
                  <div class="itemcard">
                     <a title="Mamypoko">
                        <figure>
                           <img class="img-fluid" itemprop="image" alt="Mamypoko" src="https://static2.medplusmart.com/live/bannerImage/Mart/4a11266f7947b468957a6d321f9b6989.jpg" />
                        </figure>
                     </a>
                     <div class="footer-offer">
                        <h4 class="mb-3 ml-3">
                           <small> Upto Rs 480 Off </small>
                           <strong class="text-danger"> Huggies <sup> * </sup> </strong>
                        </h4>
                     </div>
                  </div>
                  <div class="itemcard">
                     <a href="javaScript:void(0);" title="Pampers">
                        <figure>
                           <img class="img-fluid" itemprop="image" alt="Pampers" src="https://static2.medplusmart.com/live/bannerImage/Mart/49318c59ada9c5215037ff7ab23864aa.jpg" />
                        </figure>
                     </a>
                     <div class="footer-offer">
                        <h4 class="mb-3 ml-3">
                           <small> Upto Rs 480 Off </small>
                           <strong class="text-danger"> Huggies <sup> * </sup> </strong>
                        </h4>
                     </div>
                  </div>
               </div>
            </div>
         </section>
         <SplitBanner />
      </React.Fragment>
   )
}
export default PromotinalOffers