import React from "react"
import DoctorConsultantIcon from "../../images/common/doctor_consultation_icn.png"
import DoctorTeleConsultantIcon from "../../images/common/doctor_tele_consultation_icn.png"
import PathologyIcon from "../../images/common/pathology_icn.png"
import RadiologyIcon from "../../images/common/radiology_icn.png"
import SurpriseCouponIcon from "../../images/common/surprise_coupon_icn.png"
import Validate from "../../helpers/Validate"
const SubscriptionBenefits =(props) =>{
    const validate = Validate();
    return(
        <React.Fragment>
            {/* commented code for Ghost Image */}
            {/* <section className={ validate.isNotEmpty(props.className) ? props.className : "mt-3 p-48 bg-white"}>
                <div className="border-0 m-0 p-0 ph-item">
                    <div className="ph-col-12 p-0">
                        <div className="ph-row p-0 mb-0">
                            <div className="mb-3 ph-col-4" style={{"height": "34px"}}></div>
                            <div className="mb-3 ph-col-8 empty" style={{"height": "34px"}}></div>
                            <div className="mb-0 ph-col-6" style={{"height" : "16px"}}></div>
                            <div className="mb-0 ph-col-6 empty" style={{"height" : "16px"}}></div>
                        </div>
                    </div>
                </div>
                <div className="row mt-4 pt-2 mb-n4">
                    <div className="col-6">
                        <div className="border-0 m-0 p-0 ph-item mb-4">
                            <div className="ph-col-12 p-0">
                                <div className="ph-row p-0 mb-0">
                                    <div className="mb-3 ph-picture mr-3" style={{"height": "64px", "width" : "64px"}}></div>
                                    <div className="mb-3 ph-picture mt-4 w-75" style={{"height": "16px"}}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="border-0 m-0 p-0 ph-item mb-4">
                            <div className="ph-col-12 p-0">
                                <div className="ph-row p-0 mb-0">
                                    <div className="mb-3 ph-picture mr-3" style={{"height": "64px", "width" : "64px"}}></div>
                                    <div className="mb-3 ph-picture mt-4 w-75" style={{"height": "16px"}}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="border-0 m-0 p-0 ph-item mb-4">
                            <div className="ph-col-12 p-0">
                                <div className="ph-row p-0 mb-0">
                                    <div className="mb-3 ph-picture mr-3" style={{"height": "64px", "width" : "64px"}}></div>
                                    <div className="mb-3 ph-picture mt-4 w-75" style={{"height": "16px"}}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="border-0 m-0 p-0 ph-item mb-4">
                            <div className="ph-col-12 p-0">
                                <div className="ph-row p-0 mb-0">
                                    <div className="mb-3 ph-picture mr-3" style={{"height": "64px", "width" : "64px"}}></div>
                                    <div className="mb-3 ph-picture mt-4 w-75" style={{"height": "16px"}}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="border-0 m-0 p-0 ph-item mb-4">
                            <div className="ph-col-12 p-0">
                                <div className="ph-row p-0 mb-0">
                                    <div className="mb-3 ph-picture mr-3" style={{"height": "64px", "width" : "64px"}}></div>
                                    <div className="mb-3 ph-picture mt-4 w-75" style={{"height": "16px"}}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}

            <section className={ validate.isNotEmpty(props.className) ? props.className : "mt-3 p-48 bg-white"}>
                <h6 className="h2 mb-2">Benefits of being a “MedPlus Advantage” Member</h6>
                <h5 className="text-secondary">The HealthPlus Plan has been rated positively by our customers...</h5>
                <div className="row mt-4 pt-2 mb-n4">
                    <div className="col-6">
                        <div className="mb-4 pb-2 d-flex align-items-center">
                            <span className="mr-3">
                                <img src={PathologyIcon} alt="Pathlogy icon" title="Pathlogy icon"/>
                            </span>
                            <h5 className="mb-0">Upto 20% off on Pathology tests</h5>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="mb-4 pb-2 d-flex align-items-center">
                            <span className="mr-3">
                                <img src={DoctorConsultantIcon} alt="Doctor consultant icon" title="Doctor consultant icon"/>
                            </span>
                            <h5 className="mb-0">Upto 25% off on doctor consultations</h5>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="pb-2 d-flex align-items-center">
                            <span className="mr-3">
                                <img src={SurpriseCouponIcon} alt="Surprise coupon icon" title="Surprise coupon icon"/>
                            </span>
                            <h5 className="mb-0">Get surprise coupons with every plan</h5>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="pb-2 d-flex align-items-center">
                            <span className="mr-3">
                                <img src={DoctorTeleConsultantIcon} alt="Doctor tele consultant icon" title="Doctor tele consultant icon"/>
                            </span>
                            <h5 className="mb-0">Upto 30% off on Tele consultations</h5>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="mb-4 pb-2 d-flex align-items-center">
                            <span className="mr-3">
                                <img src={RadiologyIcon} alt="Radiology icon" title="Radiology icon"/>
                            </span>
                            <h5 className="mb-0">Upto 35% off on Radiology tests</h5>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}
export default SubscriptionBenefits