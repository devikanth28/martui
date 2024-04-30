import React from "react";
import Validate from "../../../../helpers/Validate";

const DoctorDetails = (props)=>{

    const validate = Validate();
    return (
        <React.Fragment>
            {
            validate.isNotEmpty(props.doctorDetails) && validate.isNotEmpty(props.walkIn) &&
            <React.Fragment>
            <div className="vertical-hr mx-2 payment-separator"></div>
            <div className={`w-100`}>
                <small className="text-secondary d-block mb-2">Doctor</small>
                <h6>Dr. {props.doctorDetails.name}</h6>
                <p className="text-secondary mb-2 font-14">{props.doctorDetails.speciality.join(", ")}</p>
                <p className="mb-0 font-14">{props.doctorDetails.qualification.join(", ")}</p>
            </div>
            </React.Fragment>
}
</React.Fragment>
    )

}
export default DoctorDetails;