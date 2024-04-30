import React from 'react';
import Slider from "react-slick";
import DoctorProfile from "../../images/common/doctor-profile-2.png"
function UpcomingConsulationSlider(props) {
    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        initialSlide: 0,
        swipe: true,
        swipeToSlide: true,
        prevArrow: <SliderPrevArrow/>,
        nextArrow: <SliderNextArrow/>,
        //slidesToShow: 3,
        /* responsive: [
            {
                breakpoint: 1920,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 1440,
                settings: {
                    //variableWidth: true,
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 1366,
                settings: {
                  //variableWidth: true
                  slidesToShow: 3
                }
            },
            {
                breakpoint: 1280,
                settings: {
                  slidesToShow: 2,
                }
            }
        ] */
        responsive: [
            {
                breakpoint: 1920,
                settings: {
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 1440,
                settings: {
                    //variableWidth: true,
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 1366,
                settings: {
                  //variableWidth: true
                  slidesToShow: 1
                }
            },
            {
                breakpoint: 1280,
                settings: {
                  slidesToShow: 1,
                }
            }
          ]
    };
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
            <Slider className="custom-slide-arrows upcoming-consultation-slider" {...sliderSettings}>
                {[1,2,3,4,5,6,7,8].map((each) => {
                    return (
                        <div className="item px-5 pb-3">
                            <div className="card">
                                <div className='card-body p-3'>
                                    <div className="d-flex align-items-center">
                                        <div className="img-container">
                                            <img src={DoctorProfile} alt="Dr. Satyanath" title="Dr. Satyanath" className="img-fluid rounded rounded-circle" width={64}/>
                                            <span className="badge badge-success">Paid</span>
                                        </div>
                                        <div>
                                            <h6 className="mb-2 text-truncate">Dr. Satyanath RV</h6>
                                            <p className="small text-secondary mb-0">Dermatologist</p>
                                            <p className="small mb-0">MD-Skin & VD</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer pt-2 pb-3 px-3 bg-white">
                                    <div className='mb-2'>
                                        <p className="font-weight-bold mb-0 text-truncate">Ch Sampath Kumar</p>
                                        <small className="text-secondary">Today at - 08:00 AM - 09:00 AM</small>
                                    </div>
                                    <div>
                                        <button className="btn btn-outline-dark btn-block btn-sm">Starts in 30mins</button>
                                        {/* <button className="btn btn-brand px-4 btn-sm">Start Consultation</button> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </Slider>
        )
    }
    return (
        <React.Fragment>
            <section className="shadow-none">
                <div className={ props.fromMyBookings ? "px-0" : "p-3"}>
                    <div className="d-flex align-items-center justify-content-between mb-3">
                        <h5 className="m-0">{props.sectionTitle}</h5>
                    </div>
                    <div className='upcoming-consultation mx-n3 mb-n3'>
                        <div className="px-0 mx-n2 mb-0">
                            {getSliderContent()}
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
}

export default UpcomingConsulationSlider;