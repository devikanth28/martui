import React from "react";
import ShowPickUpStore from "../../../../components/Common/ShowPickUpStore";
import Validate from "../../../../helpers/Validate";
import { getDateFormat, getDisplayTime } from "../../../constants/DoctorConsultationConstants";

const ConsultationInfo = (props) =>{
    const validate = Validate();
    let consultationInfo = props.consultationDetails;
    let slotDetails = consultationInfo && consultationInfo.timeSlot ? consultationInfo.timeSlot : {};
    let slotDate = consultationInfo && consultationInfo.timeSlot ? consultationInfo.timeSlot.displaySlotDate : "";
    let consultationType = consultationInfo && consultationInfo.consultationType ? (consultationInfo.consultationType == 'WALKIN' ? 'Walk-In' : 'Online') : "";

    return( 
        <React.Fragment>
            <div className='vertical-hr mx-2 payment-separator'></div>
            <div className="w-100">
                <div className='mb-3'>
                    <small className="text-secondary d-block mb-2">Consultation Type</small>
                    {validate.isNotEmpty(consultationType) &&
                        <p className=" font-14 d-block mb-0 font-weight-bold">{consultationType}</p>
                    }
                </div>
                {slotDate && slotDetails &&
                    <div>
                        <small className="text-secondary d-block mb-2">Date & Time</small>
                        {validate.isNotEmpty(slotDate) &&
                            <p className=" font-14 d-block mb-0">Date: <span className='font-weight-bold'>{getDateFormat(slotDate)}</span></p>
                        }
                        {validate.isNotEmpty(slotDetails) &&
                            <p className="mb-0 font-14">Time: <span className='font-weight-bold'>{getDisplayTime(slotDetails)}</span></p>
                        }
                    </div>
                }
            </div>
        </React.Fragment>
    );
}
export default ConsultationInfo;