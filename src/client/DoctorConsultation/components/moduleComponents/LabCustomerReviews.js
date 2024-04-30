import React from "react"
import Slider from "react-slick";
import CustomerReviewIcon from "../../../images/common/Customer Survey-pana.svg"
const LabCustomerReviews=() =>{
    const settings ={
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
    return(
        <section>

            {/* Ghost Image Start */}
            <div className="lab-customer-review-container d-none">
                <div className="content">
                <div className="ph-item p-0">
                    <div className="ph-col-12 p-0">
                        <div className="ph-row mb-3" style={{"width": "20%"}}>
                            <div className="ph-col-12 mb-0" style={{"height": "2rem"}}>
                            </div>
                        </div>
                        <div className="ph-row mb-4" style={{"width": "30%"}}>
                            <div className="ph-col-12">
                            </div>
                        </div>
                        <div className="ph-row mb-3" style={{"width": "10%"}}>
                            <div className="ph-col-12 mb-0" style={{"height": "2rem"}}>
                            </div>
                        </div>
                        <div className="ph-row mb-3" style={{"width": "15%"}}>
                            <div className="ph-col-12">
                            </div>
                        </div>
                        <div className="ph-row mb-4">
                            <div className="ph-col-12 mb-0" style={{"height": "2rem"}}>
                            </div>
                        </div>
                        <div class="ph-row mb-0" style={{"width": "5%"}}>
                            <div class="ph-col-12">
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                <div class="d-inline-block">
                        <div class="m-0 p-0 ph-item" style={{"background-color": 'unset'}}>
                            <div class="ph-col-12 p-0">
                                <div class="ph-row p-0 mb-0">
                                     <div class="ph-picture m-0" style={{"height": '250px',"width":"350px"}}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            {/* Ghost Image End */}

            <div className="lab-customer-review-container">
                <div className="content">
                    <h5 className="mt-4">In Customer's Own Words</h5>
                    <p className="text-secondary font-14 mb-4">The HealthPlus Plan has been rated positively by our customers....</p>
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
                <div className="d-inline-block"><img src={CustomerReviewIcon} alt="In Customer's Own Words" title="In Customer's Own Words"/></div>
            </div>
        </section>
    )
}
export default LabCustomerReviews;