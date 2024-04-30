import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import DoctorProfile from "../../images/common/doctor-profile-1.png"
function DoctorSlider(props) {
  const sliderCategoryPageResponsive ={
    "home" : [
      {
          breakpoint: 1366,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          }
        },
        {
          breakpoint: 1280,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          }
        },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      }
    ],
    "category" : []
  }
  const sliderSettings={
      dots: false,
      infinite: false,
      speed: 500,
      initialSlide: 0,
      swipe: true,
      swipeToSlide: true,
      variableWidth: false,
      prevArrow: <SliderPrevArrow/>,
      nextArrow: <SliderNextArrow/>,
      slidesToShow: (props.source =="category" ? 9: 5),
      responsive: (props.source == "category" ? sliderCategoryPageResponsive.category : sliderCategoryPageResponsive.home)
  }
  function SliderPrevArrow(props) {
      const { className, style, onClick } = props;
      return (
          <div className={className} onClick={onClick}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g transform="translate(-868.477 786) rotate(-90)"><rect fill="none" width="24" height="24" transform="translate(762 868.477)"/><path fill="#e71c37" d="M61.848,465.874l-5.541,5.541a1.256,1.256,0,1,0,1.776,1.776l4.653-4.64,4.655,4.655a1.261,1.261,0,0,0,2.149-.888,1.248,1.248,0,0,0-.373-.888l-5.543-5.556A1.26,1.26,0,0,0,61.848,465.874Z" transform="translate(711.498 410.651)"/></g></svg>
          </div>
      );
    }
    function SliderNextArrow(props) {
      const { className, onClick } = props;
      return (
          <div className={className} onClick={onClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g transform="translate(-906.838 786) rotate(-90)"><rect fill="none" width="24" height="24" transform="translate(762 906.838)"/><path fill="#e71c37" d="M63.432,503.859l5.4-5.4a1.223,1.223,0,0,0-1.73-1.73l-4.533,4.52-4.533-4.533a1.228,1.228,0,0,0-2.092.865,1.216,1.216,0,0,0,.363.865l5.4,5.411A1.229,1.229,0,0,0,63.432,503.859Z" transform="translate(711.356 418.584)"/></g></svg>
          </div>
      );
    }
  const getSliderContent=()=>{
      return(
          <Slider className="condition-based-test-slider doctor-slider custom-slide-arrows inner-arrows" {...sliderSettings}>
              {[1,2,3,4,5,6,7,8].map((each) => {
                  return (
                      <div className="item">
                          <a href="javascript:void(0)" title="Dr. Satyanath">
                              <div className="card border-0">
                                  <div className="card-body p-2 text-center">
                                      <div className="img-container border">
                                          <img src="https://static2.medplusmart.com/brandImages/mamypoko.jpg" alt="mamypoko" height="96" title="mamypoko" className="img-fluid rounded-circle" />
                                      </div>
                                  </div>
                              </div>
                          </a>
                      </div>
                  );
              })}
          </Slider>
      )
  }
  return (
      <React.Fragment>
          <section className="shadow-none h-100">
              <div className="px-3" style={{"padding-bottom":"2.1rem"}}>
                <div className="d-flex align-items-center justify-content-between">
                    <h5 className="m-0">{props.sectionTitle}</h5>
                </div>
                  <div className="home-page-slider-container condition-based-test-slider mb-n3 mx-n3">
                      {getSliderContent()}
                  </div>
              </div>
          </section>
      </React.Fragment>
  );
}
export default DoctorSlider;