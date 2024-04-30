import React from 'react'
import ApplicableOffersPlaceholders from './ProductDetailPagePlaceholders/ApplicableOffersPlaceholders'
const   ApplicableOffers = () => {
  return (
      <React.Fragment>
    <section>
   <div className='Applicable-offers'>
      <h4 class="px-2"><span className="strong sub-Applicable-offers">ApplicableOffers</span></h4>
              <ul className="mb-0 pl-2">
                 <li className='mb-2 position-relative'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" className='offers-tag'>
                       <path id="np_tag_888732_000000" d="M34.145,27.982l-8.71-8.71a1.581,1.581,0,0,0-1.219-.523H18.41a1.71,1.71,0,0,0-1.742,1.742V26.3a1.581,1.581,0,0,0,.523,1.219l8.71,8.71a1.684,1.684,0,0,0,2.439,0l5.806-5.806A1.684,1.684,0,0,0,34.145,27.982ZM20.732,23.976a1.162,1.162,0,1,1,1.162-1.162A1.165,1.165,0,0,1,20.732,23.976Z" transform="translate(-16.668 -18.75)" fill="#08CE73" />
                    </svg>
                    <div className='pl-5'>
                       <span class="font-14">Flat 35% Off</span>
                       <span className='d-block font-14'>On prescription medicines, orders above Rs 1000 T & C</span>
                    </div>
                    <hr/>
                 </li>
                 <li className='mb-2 position-relative'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" className='offers-tag'>
                       <path id="np_tag_888732_000000" d="M34.145,27.982l-8.71-8.71a1.581,1.581,0,0,0-1.219-.523H18.41a1.71,1.71,0,0,0-1.742,1.742V26.3a1.581,1.581,0,0,0,.523,1.219l8.71,8.71a1.684,1.684,0,0,0,2.439,0l5.806-5.806A1.684,1.684,0,0,0,34.145,27.982ZM20.732,23.976a1.162,1.162,0,1,1,1.162-1.162A1.165,1.165,0,0,1,20.732,23.976Z" transform="translate(-16.668 -18.75)" fill="#08CE73" />
                    </svg>
                    <div className='pl-5'>
                       <span class="font-14">Flat 35% Off</span>
                       <span className='d-block font-14'>On prescription medicines, orders above Rs 1000 T & C</span>
                    </div>
                 </li>
              </ul>
   </div>
</section>
<ApplicableOffersPlaceholders/>
</React.Fragment>
  )
}
export default ApplicableOffers