import React, { useEffect, useState } from 'react';
 import { getMapDirections } from '../../../helpers/CommonUtil';
import Validate from '../../../helpers/Validate';
import { getSlotDuration, getTimeLeftForConsultation } from '../../constants/DoctorConsultationConstants';
// import CancelConfirmationModal from './CancelConfirmationModal';
const CANCEL_PERIOD = 60;

export default props => {

    const consultation = props.consultation;
    
    if(Validate().isEmpty(consultation)){
        return <React.Fragment></React.Fragment>
    }

    const timeSlot = consultation.consultationInfo.timeSlot;
    
    if(Validate().isEmpty(timeSlot)){
        return <React.Fragment></React.Fragment>
    }

    const consultationType = consultation.consultationInfo.consultationType;
    let timeleftForConsultation = getTimeLeftForConsultation(timeSlot);

    if(Validate().isEmpty(timeleftForConsultation)){
        return <React.Fragment></React.Fragment>
    }    

    let timeleftForConsultationinMinutes = timeleftForConsultation / 60;
    let timeleftForConsultationinSeconds = Math.floor(timeleftForConsultation) % 60;
    let slotDuration = getSlotDuration(timeSlot);
    slotDuration = slotDuration ? slotDuration : 60;
    let tempBtnType = "EXPIRED";
    let tempBtnText = ``;
    if(timeleftForConsultationinMinutes >= CANCEL_PERIOD){
        tempBtnType = "CANCEL";
        tempBtnText = "Cancel"
    } else if(timeleftForConsultationinMinutes < CANCEL_PERIOD && timeleftForConsultationinMinutes >= 0 && timeleftForConsultationinSeconds > 0){
        if(consultationType === "TELEMEDICINE"){
            let timeleftForConsultationinMinutesToShow = Math.floor(timeleftForConsultationinMinutes) % 60;
            tempBtnType = "TIMER";
            tempBtnText = `Starts in ${timeleftForConsultationinMinutesToShow >= 10 ? timeleftForConsultationinMinutesToShow : `0${timeleftForConsultationinMinutesToShow}` }:${timeleftForConsultationinSeconds >= 10 ? timeleftForConsultationinSeconds : `0${timeleftForConsultationinSeconds}`} mins`;
        }else{
            tempBtnType = "REDIRECTION";
            tempBtnText = "Get Directions"
        }
    } else if(0 > timeleftForConsultationinMinutes && timeleftForConsultationinMinutes > (-1 * slotDuration)) {
        tempBtnType = "REDIRECTION";
        if(consultationType === "TELEMEDICINE"){
            tempBtnText = "Start Consultation";
        }else{
            tempBtnText = "Get Directions";
        }
    }
    const [btnType, setBtnType] = useState(tempBtnType);
    const [btnText, setBtnText] = useState(tempBtnText);
    const [showCancelModal, setShowCancelModal] = useState(false);
    let btnClass = `btn ${(btnType === "CANCEL") ? `btn-link text-primary` : (btnType === "REDIRECTION") ? `btn-brand-gradient rounded-pill` : `btn-link text-dark rounded-pill`} btn-block btn-sm rounded-pill`;
    
    let handleOnClick = () => {
        if(btnType === "CANCEL"){
            setShowCancelModal(!showCancelModal);
        }else if(btnType === "REDIRECTION"){
            if(consultationType === "TELEMEDICINE"){
                console.log("Start Consultation");
            }else if(consultationType === "WALKIN"){
                let pathLabStore = consultation.consultationInfo.clinicStore;
                if(Validate().isNotEmpty(pathLabStore) && Validate().isNotEmpty(pathLabStore.locationLatLong)){
                    if(window.cordova){
                        let latLongArray = pathLabStore.locationLatLong.split(",");
                        launchnavigator.navigate(latLongArray);
                    }else{
                        window.location.href = getMapDirections(pathLabStore.locationLatLong);
                    }
                }
            }
        }
        return false;
    }

    let minuteTimer;
    let secondTimer;
    let timer;
    useEffect(() => {
        if(btnType === "TIMER"){
            timer = setInterval(() => {
                let timeleftForConsultation = getTimeLeftForConsultation(timeSlot);
                let timeleftForConsultationinMinutes = timeleftForConsultation / 60;
                let timeleftForConsultationinSeconds = Math.floor(timeleftForConsultation) % 60;
                if(timeleftForConsultationinMinutes > 0 || timeleftForConsultationinSeconds > 0) {
                    let timeleftForConsultationinMinutesToShow = Math.floor(timeleftForConsultationinMinutes) % 60;
                    setBtnText(`Starts in ${timeleftForConsultationinMinutesToShow >= 10 ? timeleftForConsultationinMinutesToShow : `0${timeleftForConsultationinMinutesToShow}` }:${timeleftForConsultationinSeconds >= 10 ? timeleftForConsultationinSeconds : `0${timeleftForConsultationinSeconds}`} mins`);
                } else {
                    clearInterval(timer);
                    setBtnType("REDIRECTION");
                    if(consultationType === "TELEMEDICINE"){
                        setBtnText("Start Consultation");
                    }else if(consultationType === "WALKIN"){
                        setBtnText("Get Directions");
                    }
                }
            }, 1000);
        }
    }, []);

    if(btnType === "EXPIRED"){
        return <React.Fragment></React.Fragment>
    }

    return  <React.Fragment>
        {/* ${props.forDoctor ? `px-0` : `pr-0 pl-2`} */}
                <div className={`col px-0 `}>
                    <button className ={btnClass} onClick={handleOnClick}>{btnText}</button>
                </div>
                {/* <CancelConfirmationModal open={showCancelModal} setShowCancelModal={() => setShowCancelModal(!showCancelModal)} orderId={consultation.orderId} getUpComingConsultations={props.getUpComingConsultations}/> */}
            </React.Fragment>
}