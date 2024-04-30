import React from "react"
import DoctorConsultantIcon from "../../../images/common/doctor_consultation_icn.png"
import DoctorTeleConsultantIcon from "../../../images/common/doctor_tele_consultation_icn.png"
import PathologyIcon from "../../../images/common/pathology_icn.png"
import RadiologyIcon from "../../../images/common/radiology_icn.png"
import SurpriseCouponIcon from "../../../images/common/surprise_coupon_icn.png"
import Validate from "../../../helpers/Validate"
const SubscriptionBenefits =(props) =>{
    const validate = Validate();
    return(
        <React.Fragment>
            <section className={ validate.isNotEmpty(props.className) ? props.className : "mt-3 p-64 bg-white"}>
                <h1 className="h2 mb-2 display-3 font-weight-bolder">MedPlus Advantage – Healthcare plans for your family</h1>
                <h5 className="text-secondary">One Card – 3 benefits</h5>
                <div className="row mt-5">
	                    <div className="col-4 d-flex flex-column">
		                    <span className="mb-3">
		                        <img src={SurpriseCouponIcon} alt="Surprise coupon icon" title="Surprise coupon icon"/>
		                    </span>
		                    <h5 className="display-4 mb-0">Free Diagnostic Tests at MRP, worth your card fee</h5>
		                </div>
                    	<div className="col-4 d-flex flex-column">
                            <span className="mb-3">
                                <img src={PathologyIcon} alt="Pathlogy icon" title="Pathlogy icon"/>
                            </span>
                            <h5 className="display-4 mb-0">Flat 75% discount on all diagnostic tests, health profiles and preventive health check-up packages</h5>
                        </div>
                        <div className="col-4 d-flex flex-column">
                            <span className="mb-3">
                                <img src={DoctorConsultantIcon} alt="Doctor consultant icon" title="Doctor consultant icon"/>
                            </span>
                            <h5 className="display-4 mb-0">Flat 50% discount on all online & offline consultations with MedPlus In-house doctors</h5>
                        </div>
                       
                   {/* <div className="col-6 pr-0">
                   		<div className="mb-4 pb-2 d-flex align-items-center">
                            <span className="mr-3">
                                <img src={RadiologyIcon} alt="Radiology icon" title="Radiology icon"/>
                            </span>
                            <h5 className="mb-0">Flat 75% off on all health profiles and packages</h5>
                        </div>*/
                        /*<div className="pb-2 d-flex align-items-center">
                            <span className="mr-3">
                                <img src={DoctorTeleConsultantIcon} alt="Doctor tele consultant icon" title="Doctor tele consultant icon"/>
                            </span>
                            <h5 className="mb-0">Upto 12% off on Tele consultations</h5>
                        </div>
                    </div>*/}
                </div>
            </section>
        </React.Fragment>
    )
}
export default SubscriptionBenefits