import React, { useEffect } from 'react';
import Validate from '../../../../helpers/Validate';
import ConsultationInfo from './ConsultationInfo';
import DoctorDetails from './DoctorDetails';
import PatientDetails from './PatientDetails';

const DoctorReview = (props) => {
    const validate = Validate();
    return (
        <React.Fragment>
            {validate.isNotEmpty(props) && !props.isfromThankYou && 
                <React.Fragment>
                    <section>
                        <div className="header"><p>Appointment Details</p></div>
                        <div className={`align-items-strech appointment-details pb-3 pt-2 px-3` }>
                            <PatientDetails walkIn={props.walkIn} patientDetails={props.patientDetails}/>
                            <DoctorDetails walkIn={props.walkIn} doctorDetails={props.doctorDetails}/>
                            <ConsultationInfo walkIn={props.walkIn} consultationDetails={props.consultationDetails}/>
                        </div>
                    </section>
                </React.Fragment>
            }
            {validate.isNotEmpty(props) && props.isfromThankYou && 
                <React.Fragment>
                    <div className="card pt-4">
                        <h6 className="legend-title">Appointment Details</h6>
                        <div className="body">
                            <div className={`align-items-strech appointment-details` }>
                                <PatientDetails walkIn={props.walkIn} patientDetails={props.patientDetails}/>
                                <DoctorDetails walkIn={props.walkIn} doctorDetails={props.doctorDetails}/>
                                <ConsultationInfo walkIn={props.walkIn} consultationDetails={props.consultationDetails}/>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            }
        </React.Fragment>
    );
}
export default DoctorReview;
