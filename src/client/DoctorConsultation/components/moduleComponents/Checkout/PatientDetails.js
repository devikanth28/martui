import React from 'react';
import { Gender } from '../../../../components/MedplusLabs/constants/LabConstants';
import { getDisplayableAge } from '../../../../helpers/CommonUtil';
import Validate from '../../../../helpers/Validate';
import { MobileNoLink } from '../../common/MobileNoLink';

const PatientDetails = (props) => {

    const validate = Validate();
    return (
        <React.Fragment> {
            validate.isNotEmpty(props.patientDetails) &&
            <div className={`w-100`}>
                <small className="text-secondary d-block mb-2">Patient</small>
                <h6>{props.patientDetails.patientName}</h6>
                    <p className="text-secondary mb-2 font-14">{validate.isNotEmpty(props.patientDetails.dateOfBirth) && getDisplayableAge(props.patientDetails.dateOfBirth)} {validate.isNotEmpty(props.patientDetails.gender) && validate.isNotEmpty(props.patientDetails.dateOfBirth) && "/"} {validate.isNotEmpty(props.patientDetails.gender) && Gender[props.patientDetails.gender]} {validate.isNotEmpty(props.patientDetails.doctorName) && (" / Dr "+ props.patientDetails.doctorName)}</p>
                <MobileNoLink className="text-primary font-14" mobileNo =  {props.patientDetails.mobile}/>
            </div>
                
        }</React.Fragment>
    )
}
export default PatientDetails;