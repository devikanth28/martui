import React, { useEffect, useState } from "react";
import { getSelectedLocality } from "../../../../redux/action/LocalityAction";
import { getChatHeaderData } from "../../../components/Chat/Common/ChatHelper";
import { getDecodedURL } from "../../../helpers/CommonUtil";
import Validate from "../../../helpers/Validate";
import { getButtonClass, getDateFormat, getDisplayTime, getSlotDuration, getTimeLeftForConsultation } from "../../constants/DoctorConsultationConstants";
import CancelDoctorConsultationModal from "./CancelDoctorConsultationModal";
import DoctorImage from "./DoctorImage";

const CANCEL_PERIOD = 60;

const Consultation = (props) => {

  const [btnType, setBtnType] = useState("");
  const [btnText, setBtnText] = useState("");
  const [showCancelModal, setShowCancelModal] = useState(false);
  const selectedLocality = getSelectedLocality();

  const validate = Validate();
  const consultation = props.consultation;
  const consultationType = consultation && consultation.consultationInfo.consultationType;
  const timeSlot = consultation && consultation.consultationInfo.timeSlot;

  let timeleftForConsultation = getTimeLeftForConsultation(timeSlot);
  const teleconsultationInfo = consultation.teleConsultationInfo;
  let timer;
  useEffect(() => {
    if (validate.isEmpty(consultation)) {
      return;
    }
    let timeleftForConsultationinMinutes = timeleftForConsultation / 60;
    let timeleftForConsultationinSeconds = Math.floor(timeleftForConsultation) % 60;
    let tempBtnType = "EXPIRED";
    let tempBtnText = ``;
    if (consultationType === "TELEMEDICINE" && teleconsultationInfo && teleconsultationInfo.PATIENT && teleconsultationInfo.DOCTOR && teleconsultationInfo.PATIENT === "PATIENT_END_TIME" && teleconsultationInfo.DOCTOR === "DOCTOR_END_TIME") {
      tempBtnText = "Call ended";
      tempBtnType = "CONSULTATION_END";
    } else if (consultationType === "TELEMEDICINE" && teleconsultationInfo && teleconsultationInfo.PATIENT && teleconsultationInfo.DOCTOR && teleconsultationInfo.PATIENT === "PATIENT_START_TIME" && teleconsultationInfo.DOCTOR === "DOCTOR_START_TIME") {
      tempBtnText = "Already in Call";
      tempBtnType = "PATIENT_JOINED_CALL";
    } else if (consultationType === "TELEMEDICINE" && validate.isNotEmpty(teleconsultationInfo) && teleconsultationInfo.DOCTOR && teleconsultationInfo.DOCTOR === "DOCTOR_START_TIME") {
      tempBtnText = (teleconsultationInfo.PATIENT && teleconsultationInfo.PATIENT === "PATIENT_END_TIME") ? "Join Again" : "Join Call";
      tempBtnType = "DOCTOR_JOINED_CALL";
    } else if (timeleftForConsultationinMinutes >= CANCEL_PERIOD) {
      tempBtnType = "CANCEL";
      tempBtnText = "Cancel"
    } else if (timeleftForConsultationinMinutes < CANCEL_PERIOD && timeleftForConsultationinMinutes >= 0 && timeleftForConsultationinSeconds > 0) {
      if (consultationType === "TELEMEDICINE") {
        let timeleftForConsultationinMinutesToShow = Math.floor(timeleftForConsultationinMinutes) % 60;
        tempBtnType = "TIMER";
        tempBtnText = `Starts in ${timeleftForConsultationinMinutesToShow >= 10 ? timeleftForConsultationinMinutesToShow : `0${timeleftForConsultationinMinutesToShow}`}:${timeleftForConsultationinSeconds >= 10 ? timeleftForConsultationinSeconds : `0${timeleftForConsultationinSeconds}`} mins`;
      } else {
        tempBtnType = "REDIRECTION";
        tempBtnText = "Get Directions"
      }
    } else {
      tempBtnType = "REDIRECTION";
      if (consultationType === "TELEMEDICINE") {
        tempBtnText = "Start Consultation";
      } else {
        tempBtnText = "Get Directions";
      }
    }
    setBtnText(tempBtnText);
    setBtnType(tempBtnType);
  }, [consultation]);

  useEffect(() => {
    if (btnType === "TIMER") {
      timer = setInterval(() => {
        let timeleftForConsultation = getTimeLeftForConsultation(timeSlot);
        let timeleftForConsultationinMinutes = timeleftForConsultation / 60;
        let timeleftForConsultationinSeconds = Math.floor(timeleftForConsultation) % 60;
        if (timeleftForConsultationinMinutes > 0 || timeleftForConsultationinSeconds > 0) {
          let timeleftForConsultationinMinutesToShow = Math.floor(timeleftForConsultationinMinutes) % 60;
          setBtnText(`Starts in ${timeleftForConsultationinMinutesToShow >= 10 ? timeleftForConsultationinMinutesToShow : `0${timeleftForConsultationinMinutesToShow}`}:${timeleftForConsultationinSeconds >= 10 ? timeleftForConsultationinSeconds : `0${timeleftForConsultationinSeconds}`} mins`);
        } else {
          clearInterval(timer);
          setBtnType("REDIRECTION");
          if (consultationType === "TELEMEDICINE") {
            setBtnText("Start Consultation");
          } else if (consultationType === "WALKIN") {
            setBtnText("Get Directions");
          }
        }
      }, 1000);
    } else {
      clearInterval(timer);
    }
  }, [btnType]);

  if (validate.isEmpty(consultation)) {
    return <React.Fragment></React.Fragment>
  }
  if (validate.isEmpty(timeSlot)) {
    return <React.Fragment></React.Fragment>
  }
  if (validate.isEmpty(timeleftForConsultation)) {
    return <React.Fragment></React.Fragment>
  }

  const btnClass = `btn rounded-pill ${getButtonClass(btnType)} btn-block custom-btn-lg`

  const handleConsultationVideoRedirection = () => {
    if (consultation.status === "ORDER_STATUS_PATIENT_ACKNOWLEDGED" || consultation.status === "ORDER_STATUS_PROCESSING") {
      const redirectUrl = `/consultationrequest/${consultation.orderId}`
      props.history.push(redirectUrl);
    } else {
      props.setAlertInfo({ message: "Consultation is in progress, please try again later. Sorry for the inconvenience caused", type: "" });
    }
  }

  const handleOnClick = () => {
    if (btnType === "CANCEL") {
      setShowCancelModal(!showCancelModal);
    } else if (btnType === "REDIRECTION" || btnType === "DOCTOR_JOINED_CALL" || btnType === "PATIENT_JOINED_CALL") {
      if (consultationType === "TELEMEDICINE") {
        console.log("Start Consultation");
        handleConsultationVideoRedirection();
      } else if (consultationType === "WALKIN") {
        let locationLatLong = consultation.consultationInfo.clinicStore.locationLatLong;
        window.open("http://maps.google.com/?saddr=" + selectedLocality.locationLatLong + "&daddr=" + locationLatLong, "_blank");
      }
    }
    return false;
  }

  const getIcon = () => {
    if (btnType === "DOCTOR_JOINED_CALL") {
      return <svg className={"call_icon"} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
        <g id="phone_black_icon_18px" transform="translate(-180.258 -213.144)">
          <rect id="Rectangle_3293" data-name="Rectangle 3293" width="18" height="18" transform="translate(180.258 213.144)" fill="none" />
          <g id="Group_14556" data-name="Group 14556" transform="translate(185.258 213.898)">
            <path id="Union_137" data-name="Union 137" d="M.246,12.051c-3.123-3.122-4.769-6.913-4.1-9.43A3.323,3.323,0,0,1-3,1.1,2.337,2.337,0,0,1-2.768.9l.321-.227A3.432,3.432,0,0,1-1.813.355,1.789,1.789,0,0,1-1.2.247a1.944,1.944,0,0,1,1.58.824l1.6,2.287a1.918,1.918,0,0,1-.474,2.67l-.638.445.078.111a20.278,20.278,0,0,0,2.2,2.57,20.238,20.238,0,0,0,2.571,2.2l.111.078.444-.638a1.971,1.971,0,0,1,2.67-.475l2.288,1.6a1.889,1.889,0,0,1,.715,2.194,3.353,3.353,0,0,1-.291.6l-.229.327a2.419,2.419,0,0,1-.23.263,3.323,3.323,0,0,1-1.516.85,4.645,4.645,0,0,1-1.2.149C6.017,16.3,2.864,14.669.246,12.051Z" transform="translate(0)" fill="#fff" />
          </g>
        </g>
      </svg>
    }
    return null;
  }

  if(validate.isEmpty(consultation) || validate.isEmpty(consultation.doctorServiceInfo)){
    return <React.Fragment></React.Fragment>
  }

  return <React.Fragment>
    <div className={props.fromMyBookings ? "item pb-3" : "item px-5 pb-3"}>
      <div className={props.upcomingConsultationIdFromCache == consultation.displayOrderId ? "payment-shake card":"card"}>
        <a role="link" href={'/doctorconsultation/doctor/' + getDecodedURL(consultation.doctorServiceInfo.name).toLowerCase() + '_' + consultation.doctorServiceInfo.doctorId} aria-label ={consultation.doctorServiceInfo.name} title={consultation.doctorServiceInfo.name} className="text-dark no-underline" >
          <div className='card-body p-3'>
            <div className="d-flex align-items-center">
              <div className="img-container">
                <DoctorImage doctorInfo={consultation.doctorServiceInfo} className="rounded rounded-circle" history={props.history} id={consultation.doctorServiceInfo.doctorId} width={80} />
                {consultation.paymentType === "PAY_ONLINE" && "S" === consultation.gateWayStatus && <span className="badge badge-success">Paid</span>}
              </div>
              <div>
                <small className="text-secondary mb-0 d-block w-75">{"RN - " + consultation.doctorServiceInfo.registrationNo}</small>
                {consultation.eligibleForHelp && 
                  <button type="button" role="button" onClick={(ev)=> {ev.preventDefault() ;props.toggleChat(getChatHeaderData("DOCTOR_CONSULTATION_ORDER", consultation))}} className="btn btn-link btn-sm font-12 position-absolute text-primary" style={{"right":"0.5rem","top":"0.7rem"}}>Help?</button>
                }
                {validate.isNotEmpty(consultation.doctorServiceInfo.name) && <h6 className="mb-2 text-truncate">{"Dr. " + consultation.doctorServiceInfo.name}</h6>}
                {validate.isNotEmpty(consultation.doctorServiceInfo.speciality) && <p className="small text-secondary text-truncate mb-0">{consultation.doctorServiceInfo.speciality.join(", ")}</p>}
                {validate.isNotEmpty(consultation.doctorServiceInfo.qualification) && <p className="small mb-0 text-truncate">{consultation.doctorServiceInfo.qualification.join(", ")}</p>}
              </div>
            </div>
          </div>
        </a>
        <div className="card-footer pt-2 pb-3 px-3 bg-white">
          <div className="mb-2">
            <p className="font-weight-bold mb-0 text-truncate">{consultation.patientInfo.patientName}</p>
            <p className="text-secondary small mb-1 font-weight-bold"><abbr title="Booking ID" className="initialism">BID:</abbr> {consultation.displayOrderId}</p>
            {validate.isNotEmpty(timeSlot) && <p className="text-secondary small">{getDateFormat(timeSlot.displaySlotDate)} at {getDisplayTime(timeSlot)}</p>}
          </div>
          <div>
            {validate.isNotEmpty(btnText) && ((btnType === 'TIMER' || btnType === 'CONSULTATION_END') ?
              <div className="border-dark text-center border py-1 rounded-sm font-14">{btnText}</div> :
              <button className={btnClass} type="button" role="button" onClick={handleOnClick}>{getIcon()}{btnText}</button>)}
            <CancelDoctorConsultationModal open={showCancelModal} setShowCancelModal={() => setShowCancelModal(!showCancelModal)} orderId={consultation.orderId} getUpComingConsultations={props.getUpComingConsultations} />
          </div>
        </div>
      </div>
    </div>
  </React.Fragment>
}

export default Consultation;