import React from "react";
import Slider from "react-slick";
import SliderPrevArrow from "../Common/SliderPrevArrow"
import SliderNextArrow from "../Common/SliderNextArrow"
import BannerRedirection from "../../../../commonComponents/BannerRedirection";
import { pharmacySeperators } from "../../../../Analytics/Analytics";

function LabsBannerSlider(props){
    const banners = props.banners || []
    const screenLocation = props.screenLocation || ''
    const bannerRedirectionVals = props.bannerRedirectionVals || []
    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        prevArrow: <SliderPrevArrow classEffect='ml-4'/>,
        nextArrow: <SliderNextArrow classEffect='mr-4'/>,
        slidesToShow: props.slides || 1,
        speed: 500,
        swipeToSlide: true,
      };
    if(!banners || banners.length<1){
        return <React.Fragment></React.Fragment>
    }


    const handleClick =(bannerDetails) => {
        if(props.isPharmacy) {
            pharmacySeperators(props.history.location.pathname,bannerDetails.alternativeValue)
        }
    }

    return (
        <React.Fragment>
            {banners.length>1?
                <section className={props.packageSlider ? " " : "shadow-none bg-transparent" }>
                    <div className={(props.packageSlider ? ("department-slider-container py-0" + (banners.length > 3 ? "" : " px-3")): "")}>
                        <Slider {...settings} className={ "center-mode-slider custom-slide-arrows " + (props.packageSlider ? ("py-3" + (banners.length == 3 ? " mx-n2 center-justified" : " px-3")) : "mb-4") }>
                            {banners.map((eachBanner,index) => {
                                return (
                                    <BannerRedirection redirectUrl={(bannerRedirectionVals[screenLocation] && bannerRedirectionVals[screenLocation][index]) ? bannerRedirectionVals[screenLocation][index] : ''} banner={eachBanner} key={index} role="button" className="d-block" imageClassName={"img-fluid rounded-xl"} onClickEvent={()=>handleClick(eachBanner)}/>
                                    )
                            })}
                        </Slider>
                    </div>
                </section>
                :
                <div className={props.isPharmacy ? "banner-shadow-seperator mb-4 rounded-xl":""}>
                    <BannerRedirection role="button" banner={banners[0]} redirectUrl={(bannerRedirectionVals[screenLocation] && bannerRedirectionVals[screenLocation][0]) ? bannerRedirectionVals[screenLocation][0] : ''} className={props.isPharmacy ? "mb-3 d-block":"mb-4 d-block"} imageClassName={"img-fluid rounded-xl"} onClickEvent={()=>handleClick(banners[0])}/>
                </div>
            }
        </React.Fragment>
    )
}

export default LabsBannerSlider;