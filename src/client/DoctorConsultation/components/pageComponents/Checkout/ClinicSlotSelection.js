import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import dateFormat from "dateformat";
import Alert, { ALERT_TYPE_ERROR } from "../../../../components/Common/Alert";
import Validate from "../../../../helpers/Validate";
import { ADD_DOCTOR_CONSULTATION_INFO, ADD_SELECTED_CLINIC_ID_IN_REDUX, LAST_DOCTOR_ORDER_ID } from '../../../redux/DoctorConsultationReducer';
import DoctorCheckoutService from "../../../services/DoctorCheckoutService";
import { prepareCartSummaryObjFromDoctorConsultation } from '../../../helper/DoctorConsulationHelper';
import { ErrorMessagesMap, getDisplayTime, WalkIn } from "../../../constants/DoctorConsultationConstants";
import DoctorReview from "../../moduleComponents/Checkout/DoctorReview";
import DoctorsCartSummary from "../../common/DoctorsCartSummary";
import SlotSelection from "../../moduleComponents/Checkout/SlotSelection";
import ShowPickUpStore from "../../../../components/Common/ShowPickUpStore";

const ClinicSlotSelection = (props) => {

    const validate = Validate();
    const dispatch = useDispatch();
    const doctorCheckoutService = DoctorCheckoutService();

    const consultationInfoFromRedux = useSelector(state => state.doctorConsultation && state.doctorConsultation.doctorConsultation ? state.doctorConsultation.doctorConsultation : {});
    const consultationTypeFromRedux = useSelector(state => state.doctorConsultation && state.doctorConsultation.consultationType ? state.doctorConsultation.consultationType : null);
    const doctorIdFromRedux = useSelector(state => state.doctorConsultation && state.doctorConsultation.selectedDoctorId ? state.doctorConsultation.selectedDoctorId : "");
    const clinicIdFromRedux = useSelector(state => state.doctorConsultation && state.doctorConsultation.selectedClinicId ? state.doctorConsultation.selectedClinicId : "");
    const consultationSlot = (validate.isNotEmpty(consultationInfoFromRedux) && validate.isNotEmpty(consultationInfoFromRedux.consultationInfo) && validate.isNotEmpty(consultationInfoFromRedux.consultationInfo.timeSlot) && (WalkIn == consultationInfoFromRedux.consultationInfo.consultationType)) ? consultationInfoFromRedux.consultationInfo.timeSlot : {};
    const parentOrderIdFromRedux =(validate.isNotEmpty(consultationInfoFromRedux) && validate.isNotEmpty(consultationInfoFromRedux.followUpOrderInfo) && validate.isNotEmpty(consultationInfoFromRedux.followUpOrderInfo.parentOrderId)) ? consultationInfoFromRedux.followUpOrderInfo.parentOrderId :'';
    const followUpOrder = (validate.isNotEmpty(consultationInfoFromRedux) && validate.isNotEmpty(consultationInfoFromRedux.followUpOrder)) ? consultationInfoFromRedux.followUpOrder : ''
    const [errorMsg, setErrorMsg] = useState({});
    const [selectedSlot, setSelectedSlot] = useState(validate.isNotEmpty(consultationSlot) ? {"displayName": getDisplayTime(consultationSlot), "slotId": consultationSlot.slotId} : {});
    const [selectedSlotDate, setSelectedSlotDate] = useState(validate.isNotEmpty(consultationSlot) ?  dateFormat(consultationSlot.displaySlotDate,"yyyy-mm-dd") : "");
    const [loader,setLoader] = useState(false);
    const nurseStationContactNumber = consultationInfoFromRedux?.consultationInfo?.clinicStore?.nurseStationContactNo;

    const addDoctorConsultationInfo = () => {
        if(validate.isEmpty(selectedSlot) || validate.isEmpty(selectedSlot.slotId)) {
            setErrorMsg({message :"Select Slot to proceed", type : ALERT_TYPE_ERROR });
            return;
        }
        doctorCheckoutService.addDoctorConsultationInfo({clinicId: clinicIdFromRedux, slotId: selectedSlot.slotId}).then(data => {
            if(validate.isNotEmpty(data) && validate.isNotEmpty(data.statusCode) && "SUCCESS" == data.statusCode && validate.isNotEmpty(data.dataObject)) {
                dispatch({type: ADD_DOCTOR_CONSULTATION_INFO, data: data.dataObject});
                dispatch({type: ADD_SELECTED_CLINIC_ID_IN_REDUX, data: clinicIdFromRedux});
                if(followUpOrder) {
                    createFollowUpBooking();
                }else {
                    props.history.push("/doctorconsultation/payments/");
                }
            } else if(validate.isNotEmpty(data) && "FAILURE" == data.statusCode && validate.isNotEmpty(data.message)) {
                setErrorMsg({message : "Unable to set slot for consultation", type : ALERT_TYPE_ERROR});
                setTimeout(() => props.history.push("/doctorconsultation/schedule-consultation"), 2000);
                
            }
        }).catch(e => {
            console.log("error : "+ JSON.stringify(e));
            setErrorMsg({message :"something went wrong,please try again", type : ALERT_TYPE_ERROR });
        });
    }

    const createFollowUpBooking = () => {
        setLoader(true);
        doctorCheckoutService.createBookingForConsultation({}).then(data => {
            if(data.statusCode === "SUCCESS"){
                dispatch({type:LAST_DOCTOR_ORDER_ID,data:data.dataObject.orderId});
                props.history.push("/doctorconsultation/thankyou");
            }else{
                if(data.message === "SLOT_NOT_AVAILABLE"){
                    setErrorMsg({message:ErrorMessagesMap[data.message],type:ALERT_TYPE_ERROR})
                    setTimeout(()=>{
                        props.history.replace("/doctorconsultation/schedule-consultation");
                    },2000)
                }else if(data.message === "NO DOCTOR CONSULTATION FOUND"){
                    setErrorMsg({message:"We could not find any doctor consultation.",type:ALERT_TYPE_ERROR})
                    setTimeout(()=>{
                        props.history.replace("/doctorconsultation");
                    },2000) 
    
                }else if(validate.isNotEmpty(ErrorMessagesMap[data.message])){
                    setErrorMsg({message:ErrorMessagesMap[data.message],type:ALERT_TYPE_ERROR})
                }else{
                    setErrorMsg({message : data.message,type:ALERT_TYPE_ERROR});
                }
            }
            setLoader(false);
        }).catch(err=>{
            setLoader(false);
            setErrorMsg({message:"Unable to create order",type:ALERT_TYPE_ERROR});
        });
    }

    return (
        <React.Fragment>
            {validate.isNotEmpty(errorMsg) && <Alert alertInfo={errorMsg} onDurationEnd={setErrorMsg} duration={5000}/>}
            <div className="container-lg container-fluid">
                <div className="row px-sm-3">
                    <div className="col-8 pl-0 pr-2">
                        <DoctorReview patientDetails={validate.isNotEmpty(consultationInfoFromRedux) && validate.isNotEmpty(consultationInfoFromRedux.patientInfo) ?  consultationInfoFromRedux.patientInfo : {}} doctorDetails={validate.isNotEmpty(consultationInfoFromRedux) && validate.isNotEmpty(consultationInfoFromRedux.doctorServiceInfo) ?  consultationInfoFromRedux.doctorServiceInfo : {}} consultationDetails={validate.isNotEmpty(consultationInfoFromRedux) && validate.isNotEmpty(consultationInfoFromRedux.consultationInfo) ?  consultationInfoFromRedux.consultationInfo : {}}  walkIn={true} isfromThankYou={false} />
                        <section>
                            <div className="header"><p>Select Date & Time</p></div>
                            <SlotSelection doctorId={doctorIdFromRedux} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} selectedSlotDate={selectedSlotDate} setSelectedSlotDate={setSelectedSlotDate} consultationType={consultationTypeFromRedux} selectedClinicId={clinicIdFromRedux} history={props.history} parentOrderId = {parentOrderIdFromRedux} />
                        </section>
                    </div>
                    <div className="col-4 pl-2 pr-0">
                        {!followUpOrder && <DoctorsCartSummary cartSummaryObj={prepareCartSummaryObjFromDoctorConsultation(consultationInfoFromRedux)} isfromThankYou={false}/>}
                        {validate.isNotEmpty(consultationInfoFromRedux) && validate.isNotEmpty(consultationInfoFromRedux.consultationInfo) &&
                            <section className="delivery-detail">
                                <div className="header">
                                    <p>Clinic Address</p>
                                    <span className="badge-title success right">Walk In</span>
                                </div>
                                <ShowPickUpStore
                                pickStoreName={consultationInfoFromRedux.consultationInfo.clinicStore.name}
                                pickUpAddress={consultationInfoFromRedux.consultationInfo.clinicStore.address}
                                locationLatLong={consultationInfoFromRedux.consultationInfo.clinicStore.locationLatLong}
                                phoneNumber={validate.isNotEmpty(nurseStationContactNumber)?nurseStationContactNumber:consultationInfoFromRedux.consultationInfo.clinicStore.phoneNumber}
                                />
                            </section>
                        }
                    </div>
                </div>
            </div>
            <footer className="footer fixed-bottom mt-auto py-2">
                <div className="container-lg container-fluid  px-0 px-sm-3">
                    <div className="row align-items-center no-gutters">
                        <div className="col-12 text-right">
                            <button type="button" className="btn brand-secondary px-5 rounded-pill custom-btn-lg" onClick={() => props.history.push("/doctorconsultation/schedule-consultation")} disabled={loader}>Back</button>
                            {loader ? 
                            <button className="btn btn-brand-gradient rounded-pill  ml-3 custom-btn-lg px-5">
                                <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                                <span className="sr-only"></span>
                            </button> :
                            <button type="submit" className="btn btn-brand-gradient rounded-pill  ml-3 px-5 custom-btn-lg" onClick={() => addDoctorConsultationInfo()}>Confirm &amp; Proceed</button>}
                        </div>
                    </div>
                </div>
            </footer>
        </React.Fragment>
    )

}
export default ClinicSlotSelection;