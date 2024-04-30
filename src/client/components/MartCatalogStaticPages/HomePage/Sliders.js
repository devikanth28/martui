import React, { useState } from 'react';
import Slider from "react-slick";
const imageurl = "https://static2.medplusmart.com/live/bannerImage/Mart"
const Sliders = (props) => {
    const sideScrollSettings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    }
 const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover:true,
        pauseOnDotsHover: true,
        appendDots: dots => (
            <div>
                <ul className="homepage-main-slider-dots"> {dots} </ul>
              </div>
          ),
          customPaging: i => (
            <React.Fragment>
                  {i == 0 && <div>
                      <a href="javascript:void(0);">Get 75% Off on<small className='d-block'>MedPlus Diagnostics</small></a>
                  </div>}
                  {i == 1 && <div>
                      <a href="javascript:void(0);">Flat 20% Off<small className='d-block'>On every medicine</small></a>
                  </div>}
                  {i == 2 && <div>
                      <a href="javascript:void(0);">Now Own Your<small className='d-block'>MedPlus Franchise</small></a>
                  </div>}
                  {i == 3 && <div>
                      <a href="javascript:void(0);">Get Flat 3000<small className='d-block'>Paytm CashBack Points</small></a>
                  </div>}
                  {i == 4 && <div>
                      <a href="javascript:void(0);">Get Upto 600<small className='d-block'>Mobikwik Cashback</small></a>
                  </div>}
                  {i == 5 && <div>
                      <a href="javascript:void(0);">Upto 480 Off<small className='d-block'>Baby Diapers</small></a>
                  </div>}
            </React.Fragment>
          )
    };
    return (
        <React.Fragment>
            <div className='mb-3'>
                <div className="row mx-0">
                    <div className="col-9 px-0">
                        <Slider {...settings} className="homepage-main-slider" role="img" aria-label="OFFERS AT MEDPLUS">
                            <div>
                                <a aria-label="MedPlus Diagnostics" href="javascript:void(0)">
                                    <img className="img-fluid" alt="Get 75% Off on MedPlus Diagnostics" src = {`${imageurl}/a99be2a2746b77e7135fe0d13d7f8461.jpg`}/>
                                </a>
                            </div>
                            <div>
                                <a aria-label="Medicine Details" href="javascript:void(0)">
                                     <img className="img-fluid" alt="Flat 20% Off on Every medicine" src = {`${imageurl}/ca47bb31b452773b805989845bb875e9.jpg`}/>
                                </a>
                            </div>
                            <div>
                                <a aria-label = "MedPlus Franchise" href ="javascript:void(0)">
                                    <img className="img-fluid" alt="Now Own Your MedPlus Franchise" src = {`${imageurl}/df42929731e53adda20bb52e1df4c626.jpg`}/>
                                </a>
                            </div>
                            <div>
                                <a aria-label= "Paytm Cashback Details" href="javscript:void(0)">
                                    <img className="img-fluid" alt="Get Flat 3000 Paytm Cashback Points" src = {`${imageurl}/23db1ce758527e4f1d82351a27804ae1.jpg`}/>
                                </a>
                            </div>
                            <div>
                                <a aria-label= "Mobikwik Cashback Details" href="javascript:void(0)">
                                  <img className="img-fluid" alt= "Get Upto 600 Mobikwik Cashback " src = {`${imageurl}/c9fd7d2403f0202e4b7b78d5372a0fdf.jpg`} />
                                </a>
                            </div>
                            <div>
                                <a aria-label= "Offers on baby Diapers" href="javascript:void(0)">
                                  <img className="img-fluid" alt ="Upto 480 Off on baby Diapers" src = {`${imageurl}/7a12301567a663b5652ad0cdd70411b7.jpg`} />
                                </a>
                            </div>
                        </Slider>
                    </div>
                    <div className="col-3 pr-0">
                        <Slider {...sideScrollSettings} className="homepage-aside-slider">
                            <div>
                                <div className='slider-img-content' style={{"backgroundImage" : "url(https://static2.medplusmart.com/live/bannerImage/Mart/8e1f74f67f835ce00f16feb4c2c9e23d.jpg)"}}></div>
                                <div className='slider-img-content' style={{"backgroundImage" : "url(https://static2.medplusmart.com/live/bannerImage/Mart/e10e46f47a5a9daa930873b0b4693a03.jpg)"}}></div>
                            </div>
                            <div>
                                 <div className='slider-img-content' style={{"backgroundImage" : "url(https://static2.medplusmart.com/live/bannerImage/Mart/8e1f74f67f835ce00f16feb4c2c9e23d.jpg)"}}></div>
                                <div className='slider-img-content' style={{"backgroundImage" : "url(https://static2.medplusmart.com/live/bannerImage/Mart/e10e46f47a5a9daa930873b0b4693a03.jpg)"}}></div>
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default Sliders