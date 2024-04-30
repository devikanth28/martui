import React from 'react'
import Slider from 'react-slick'
import { PromotionBanners } from '../HomePage/staticData'
const Promotions = () => {
    const settings={
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
       arrows : false,
    }
    const categoryNames=[
        "ALL",
        "OTC & HEALTH NEEDS",
        "PHARMACY",
        "PERSONAL CARE",
        "DIABETIC NEEDS",
        "VITAMINS & SUPPLEMENTS",
        "BABY NEEDS",
        "HOUSEHOLD NEEDS",
        "AYIRVEDIC",
        "HEALTH & NUTRATION"
    ]
    const separateBanners=[
        "https://static2.medplusmart.com/live/bannerImage/Mart/c1eb5ba38f78e0f0534da246c82fe983.jpg",
        "https://static2.medplusmart.com/live/bannerImage/Mart/2829b7004e56d399cb795e5ef0c29a9c.jpg",
        'https://static2.medplusmart.com/live/bannerImage/Mart/fb5484c6dcf19396204fa04e575d057d.jpg',
        'https://static2.medplusmart.com/live/bannerImage/Mart/867b2a025a2e7695352ede9f4c171918.jpg'
    ]
  return (
    <React.Fragment>
        <Slider {...settings}>
        {PromotionBanners.map((each)=>{
            return(
                <div>
                    <img className="img-fluid rounded" src={each.imageSrc} alt="Click to know more" />
                </div>
            )
        })}
        </Slider>
        <div className='d-flex justify-content-center flex-wrap filter-container pt-5' style={{"gap":"1rem"}}>
        {categoryNames.map((each)=>{
            return(
                <button className='rounded-pill btn brand-secondary'>{each}</button>
            )
        })}
        </div>
        <div className='row my-3'>
            {separateBanners.map((each)=>{
                return(
                    <div className='col-6 my-2'>
                        <img className='img-fluid rounded seperate-banners' src={each} alt="click to know more"/>
                    </div>
                )
            })}
            <p><span className='text-danger'>*</span>Only for selected localities</p>
        </div>



        
    </React.Fragment>
  )
}

export default Promotions