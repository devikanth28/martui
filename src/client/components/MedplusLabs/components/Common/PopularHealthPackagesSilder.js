import React from 'react';
import SliderPrevArrow from "./SliderPrevArrow"
import SliderNextArrow from "./SliderNextArrow"
import Slider from "react-slick";
import SampleImage from "../../../../images/common/sampale994X500.png"

function PopularHealthPackagesSilder(props) {
    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        prevArrow: <SliderPrevArrow classEffect='ml-2'/>,
        nextArrow: <SliderNextArrow classEffect='mr-2'/>,
        slidesToShow: 3,
        speed: 500,
        swipeToSlide: true,
      };
      const banners=[SampleImage,SampleImage,SampleImage,SampleImage,SampleImage,SampleImage,SampleImage,SampleImage,SampleImage,SampleImage,SampleImage,SampleImage,SampleImage,SampleImage]
      //const banners=["https://static1.medplusindia.com:555/jasmine/bannerImage/Labs/1432e979a0b9e1c92e6badad250f4c28.png","https://static1.medplusindia.com:555/jasmine/bannerImage/Labs/1432e979a0b9e1c92e6badad250f4c28.png","https://static1.medplusindia.com:555/jasmine/bannerImage/Labs/1432e979a0b9e1c92e6badad250f4c28.png","https://static1.medplusindia.com:555/jasmine/bannerImage/Labs/1432e979a0b9e1c92e6badad250f4c28.png","https://static1.medplusindia.com:555/jasmine/bannerImage/Labs/1432e979a0b9e1c92e6badad250f4c28.png","https://static1.medplusindia.com:555/jasmine/bannerImage/Labs/1432e979a0b9e1c92e6badad250f4c28.png","https://static1.medplusindia.com:555/jasmine/bannerImage/Labs/1432e979a0b9e1c92e6badad250f4c28.png","https://static1.medplusindia.com:555/jasmine/bannerImage/Labs/1432e979a0b9e1c92e6badad250f4c28.png","https://static1.medplusindia.com:555/jasmine/bannerImage/Labs/1432e979a0b9e1c92e6badad250f4c28.png","https://static1.medplusindia.com:555/jasmine/bannerImage/Labs/1432e979a0b9e1c92e6badad250f4c28.png","https://static1.medplusindia.com:555/jasmine/bannerImage/Labs/1432e979a0b9e1c92e6badad250f4c28.png"]
    return (
        <React.Fragment>
            <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="m-0">Popular Health Packages</h5>
            </div>
            <section className="shadow-none"> 
                <div className="department-slider-container py-0 px-3">
                    <Slider {...settings} className="center-mode-slider custom-slide-arrows py-3">
                        {banners.map((eachBanner,index) => {
                            return (
                                <a key={index} href="javascript:void(0)" title="click to know more" className="d-block">
                                    <img src={eachBanner} alt="MedPlus Labs" className="img-fluid rounded"/>
                                </a>
                            )
                        })}
                    </Slider>
                </div>
            </section>
        </React.Fragment>
    );
}

export default PopularHealthPackagesSilder;