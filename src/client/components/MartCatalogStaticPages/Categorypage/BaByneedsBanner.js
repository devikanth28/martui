import React from 'react'
import BannerPlaceholder from './CategoryPagePlaceholders/BannerPlaceholder'
const BaByneedsBanner = () => {
  return (
   <React.Fragment>
        <a href="javascript:void(0)" title="click to know more" className=" d-block pb-2">
        <img className="img-fluid rounded" src='https://static2.medplusmart.com/live/bannerImage/Mart/b337a8ecb129e58f1c5652b38455cbed.jpg' alt="Click to know more" />
        </a>
        <BannerPlaceholder/>
   </React.Fragment>
  )
}
export default BaByneedsBanner