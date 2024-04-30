import React from 'react';
import Slider from 'react-slick';

const CustomerReviews = (props) => {
    const settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        initialSlide: 0,
        slidesToShow: 1,
        autoplay: true,
        autoplaySpeed: 8000,
        pauseOnHover: true
    }
    return (
        <React.Fragment>
            <div className="mb-4 pb-2">
                <h5 className="mb-3">Customer Reviews</h5>
                <section className="shadown-none">
                    <div className="lab-customer-review-container d-block p-0 mb-0">
                        <div className="content w-100 p-3">
                            <Slider className="customer-feedback-slider" {...settings}>
                                <div className="item">
                                    <div>
                                        <h6>Ms. S Karthik,</h6>
                                        <p className="text-secondary font-14">Moosapet (Hyderabad)</p>
                                        <span>I booked Master Health Checkup from MedPlus Lab. They came right on time and the report was delivered on the same day. Their prices are also very reasonable considering the quality of service which they provide.</span>
                                    </div>
                                </div>
                                <div className="item">
                                    <div>
                                        <h6>Ms. S Karthik,</h6>
                                        <p className="text-secondary font-14">Moosapet (Hyderabad)</p>
                                        <span>I booked Master Health Checkup from MedPlus Lab. They came right on time and the report was delivered on the same day. Their prices are also very reasonable considering the quality of service which they provide.</span>
                                    </div>
                                </div>
                                <div className="item">
                                    <div>
                                        <h6>Ms. S Karthik,</h6>
                                        <p className="text-secondary font-14">Moosapet (Hyderabad)</p>
                                        <span>I booked Master Health Checkup from MedPlus Lab. They came right on time and the report was delivered on the same day. Their prices are also very reasonable considering the quality of service which they provide.</span>
                                    </div>
                                </div>
                                <div className="item">
                                    <div>
                                        <h6>Ms. S Karthik,</h6>
                                        <p className="text-secondary font-14">Moosapet (Hyderabad)</p>
                                        <span>I booked Master Health Checkup from MedPlus Lab. They came right on time and the report was delivered on the same day. Their prices are also very reasonable considering the quality of service which they provide.</span>
                                    </div>
                                </div>
                            </Slider>
                        </div>
                    </div>
                </section>
            </div>
        </React.Fragment>
    )
}
export default CustomerReviews;