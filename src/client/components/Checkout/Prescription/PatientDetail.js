import React, { useState } from "react";
import Validate from '../../../helpers/Validate';
import Alert from '../../Common/Alert';

const PatientDetail = (props) => {

    const validate = Validate();
    const patientInfo = validate.isNotEmpty(props.patientInfo) ? props.patientInfo : {};
    const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });

    const bindPatientDetail = (event) => {
        if(event.target.id === "patientAge") {
            if(validate.isNotEmpty(event.target.value) && !validate.isNumeric(event.target.value)) {
                setAlertInfo({ message: "Invalid Patient Age", type: "" });
                props.setPatientDetailError({isError: true, errorMessage:"Invalid Patient Age"});
                event.target.focus();
                return false;
            }
            if(validate.isNotEmpty(event.target.value) && (parseInt(event.target.value) < 1 || parseInt(event.target.value) > 99)) {
                setAlertInfo({ message: "Patient Age should be between 1 to 99", type: "" });
                props.setPatientDetailError({isError: true, errorMessage:"Patient Age should be between 1 to 99"});
                event.target.focus();
                return false;
            }
        } else {
            if(validate.isNotEmpty(event.target.value) && !validate.isAlphaWithSpace(event.target.value)) {
                setAlertInfo({ message: ("Only Alphabets allowed for "+ event.target.name), type: "" });
                props.setPatientDetailError({isError: true, errorMessage:("Only Alphabets allowed for "+ event.target.name)});
                event.target.focus();
                return false;
            }
            if(validate.isNotEmpty(event.target.value) && event.target.value.length > 30) {
                setAlertInfo({ message: ("Maximum 30 characters allowed for "+ event.target.name), type: "" });
                props.setPatientDetailError({isError: true, errorMessage:("Maximum 30 characters allowed for "+ event.target.name)});
                event.target.focus();
                return false;
            }
        }
        props.setPatientDetailError({isError: false, errorMessage:""});
        props.setPatientInfo(event.target.id, event.target.value);
    }

    return(
        <React.Fragment>
            <Alert alertInfo={alertInfo} duration={5000} onDurationEnd={setAlertInfo}/>
            <div className="p-3">
                <h6 className="title mb-4">Patient Details <small className="text-secondary">(Optional)</small></h6>
                <div className="form-row no-gutters">
                    <div className="form-group has-float-label col mr-3">
                        <input type="text" className="form-control" id="patientName" name="Patient Name" maxLength="30" autoComplete="off" placeholder=" " required defaultValue={patientInfo.patientName ? patientInfo.patientName : ""} onBlur={event => bindPatientDetail(event)}/>
                        <label for="patientName" className="select-label">Patient Name</label>
                    </div>
                    <div className="form-group has-float-label col mr-3">
                        <input type="text" className="form-control" id="patientAge" name="Patient Age" maxLength="2" autoComplete="off" placeholder=" " required defaultValue={patientInfo.patientAge ? patientInfo.patientAge : ""} onBlur={event => bindPatientDetail(event)}/>
                        <label for="patientAge" className="select-label">Patient Age</label>
                    </div>
                    <div className="form-group has-float-label col">
                        <input type="text" className="form-control" id="doctorName" name="Doctors Name" maxLength="30" autoComplete="off" placeholder=" " required defaultValue={patientInfo.doctorName ? patientInfo.doctorName : ""} onBlur={event => bindPatientDetail(event)}/>
                        <label for="doctorName" className="select-label">Doctors Name</label>
                    </div>
                </div>
            </div>
            <hr className="mb-3"/>
        </React.Fragment>
    )
}
export default PatientDetail;