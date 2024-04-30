import dateFormat from "dateformat";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import UserInfoAction from "../../../../../redux/action/UserInfoAction";
import Alert, { ALERT_TYPE_ERROR } from "../../../../components/Common/Alert";
import PatientModel from "../../../../components/Common/PatientModel";
import { Gender } from "../../../../components/MedplusLabs/constants/LabConstants";
import ShoppingCartGhostImage from '../../../../components/ShoppingCart/ShoppingCartGhostImage';
import { MEDPLUS_ADVANTAGE_HOME } from "../../../../components/Subscription/constants/SubscriptionConstants";
import { getDecodedURL, getDisplayableAge } from '../../../../helpers/CommonUtil';
import Validate from "../../../../helpers/Validate";
import { CHECKOUT_TYPE_CLINIC_SEARCH, CHECKOUT_TYPE_VISIT_UNDEFINED, ErrorMessagesMap, getDisplayTime, VISIT_TYPE_ONLINE, VISIT_TYPE_WALK_IN } from "../../../constants/DoctorConsultationConstants";
import { prepareCartSummaryObjFromDoctorConsultation } from '../../../helper/DoctorConsulationHelper';
import { ADD_CONSULTATION_TYPE_IN_REDUX, ADD_DOCTOR_CONSULTATION_INFO, ADD_SELECTED_CLINIC_ID_IN_REDUX, LAST_DOCTOR_ORDER_ID, REMOVE_SELECTED_CLINIC_ID_FROM_REDUX } from '../../../redux/DoctorConsultationReducer';
import DoctorCheckoutService from "../../../services/DoctorCheckoutService";
import DoctorsCartSummary from "../../common/DoctorsCartSummary";
import ConsultationInfo from "../../moduleComponents/Checkout/ConsultationInfo";
import SelectClinic from "../../moduleComponents/Checkout/SelectClinic";
import SlotSelection from "../../moduleComponents/Checkout/SlotSelection";
import LabCheckoutInfoNote from "../../../../components/Common/LabCheckoutInfoNote";

const DoctorConsultationCart = (props) => {

    const validate = Validate();
    const dispatch = useDispatch();
    const doctorCheckoutService = DoctorCheckoutService();
    const userInfoAction = UserInfoAction();
    var userInfo = userInfoAction.getUserInfo();

    const doctorIdFromRedux = useSelector(state => state.doctorConsultation && state.doctorConsultation.selectedDoctorId ? state.doctorConsultation.selectedDoctorId : "");
    const checkoutTypeFromRedux = useSelector(state => state.doctorConsultation && state.doctorConsultation.checkoutType ? state.doctorConsultation.checkoutType : null);
    const consultationTypeFromRedux = useSelector(state => state.doctorConsultation && state.doctorConsultation.consultationType ? state.doctorConsultation.consultationType : null);
    const clinicIdFromRedux = useSelector(state => state.doctorConsultation && state.doctorConsultation.selectedClinicId ? state.doctorConsultation.selectedClinicId : "");
    const consultationInfoFromRedux = useSelector(state => state.doctorConsultation && state.doctorConsultation.doctorConsultation ? state.doctorConsultation.doctorConsultation : {});
    const consultationSlot = (validate.isNotEmpty(consultationInfoFromRedux) && validate.isNotEmpty(consultationInfoFromRedux.consultationInfo) && validate.isNotEmpty(consultationInfoFromRedux.consultationInfo.timeSlot)) ? consultationInfoFromRedux.consultationInfo.timeSlot : {};
    const [isNewCustomer, setIsNewCustomer] = useState(validate.isNotEmpty(userInfo) && (validate.isNotEmpty(userInfo.firstName) && validate.isNumeric(userInfo.firstName)) && (validate.isNotEmpty(userInfo.lastName) && validate.isNumeric(userInfo.lastName)))
    const [initialLoader, setInitialLoader] = useState(false);
    const [errorMsg, setErrorMsg] = useState({});
    const [doctorConsultationInfo, setDoctorConsultationInfo] = useState(validate.isNotEmpty(consultationInfoFromRedux) ? consultationInfoFromRedux : {});
    const [isSelectPatientOpen, setSelectPatientOpen] = useState((validate.isEmpty(consultationInfoFromRedux) || validate.isEmpty(consultationInfoFromRedux.patientInfo)) && !isNewCustomer);
    const [isAddOrEditPatientOpen, setAddOrEditPatientOpen] = useState(false);
    const [seletedPatient, setSelectedPatient] = useState((validate.isNotEmpty(consultationInfoFromRedux) && validate.isNotEmpty(consultationInfoFromRedux.patientInfo)) ? consultationInfoFromRedux.patientInfo : {});
    const [seletedPatientForEdit, setSelectedPatientForEdit] = useState({});
    const [addPatienLoader, setAddPatienLoader] = useState(false);
    const [selectedClinicId, setSelectedClinicId] = useState(validate.isNotEmpty(clinicIdFromRedux) ? clinicIdFromRedux : "");
    const [selectedConsultationType, setSelectedConsultationType] = useState(validate.isNotEmpty(consultationTypeFromRedux) ? consultationTypeFromRedux : "");
    const [selectedSlot, setSelectedSlot] = useState(validate.isNotEmpty(consultationSlot) ? {"displayName": getDisplayTime(consultationSlot), "slotId": consultationSlot.slotId} : {});
    const [selectedSlotDate, setSelectedSlotDate] = useState(validate.isNotEmpty(consultationSlot) ?  dateFormat(consultationSlot.displaySlotDate,"yyyy-mm-dd") : "");
    const [followUpOrder,setFollowUpOrder] = useState(false);
    const [parentOrderId,setParentOrderId] = useState((validate.isNotEmpty(consultationInfoFromRedux) && validate.isNotEmpty(consultationInfoFromRedux.followUpOrderInfo) && validate.isNotEmpty(consultationInfoFromRedux.followUpOrderInfo.parentOrderId)) ? consultationInfoFromRedux.followUpOrderInfo.parentOrderId :'');
    const [followUpLoader,setFollowUpLoader] = useState(false);
    const [isConfirmationOpen, setConfirmationOpen] = useState(false);

    useEffect(() => {
        let patientId = null;
        if(validate.isNotEmpty(consultationInfoFromRedux) && validate.isNotEmpty(consultationInfoFromRedux.patientInfo)) {
            patientId = consultationInfoFromRedux.patientInfo.patientId;
        }
        if(validate.isEmpty(consultationInfoFromRedux)) {
            addPrimaryInfoToDoctorConsultation(patientId, doctorIdFromRedux, consultationTypeFromRedux, validate.isNotEmpty(clinicIdFromRedux) ? clinicIdFromRedux : null,parentOrderId);
        } else {
            getDoctorConsultationInfo();
        }
    }, []);

    const getDoctorConsultationInfo = () => {
        setInitialLoader(true);
        doctorCheckoutService.getDoctorConsultationForReview().then(data => {
            if(validate.isNotEmpty(data) && "SUCCESS" == data.statusCode && validate.isNotEmpty(data.dataObject)) {
                setSelectPatientOpen(validate.isEmpty(data.dataObject.DOCTOR_CONSULTATION.patientInfo));
                setFollowUpOrder(validate.isNotEmpty(data.dataObject.DOCTOR_CONSULTATION) && validate.isNotEmpty(data.dataObject.DOCTOR_CONSULTATION.followUpOrder) ? data.dataObject.DOCTOR_CONSULTATION.followUpOrder : false);
                setParentOrderId((validate.isNotEmpty(data.dataObject.DOCTOR_CONSULTATION) && validate.isNotEmpty(data.dataObject.DOCTOR_CONSULTATION.followUpOrderInfo) && validate.isNotEmpty(data.dataObject.DOCTOR_CONSULTATION.followUpOrderInfo.parentOrderId)) ? data.dataObject.DOCTOR_CONSULTATION.followUpOrderInfo.parentOrderId : '');
                setDoctorConsultationInfo(data.dataObject.DOCTOR_CONSULTATION);
                setSelectedPatient((validate.isNotEmpty(data.dataObject.DOCTOR_CONSULTATION) && validate.isNotEmpty(data.dataObject.DOCTOR_CONSULTATION.patientInfo)) ? data.dataObject.DOCTOR_CONSULTATION.patientInfo : {});
                dispatch({type: ADD_DOCTOR_CONSULTATION_INFO, data: data.dataObject.DOCTOR_CONSULTATION});
            } else if(validate.isNotEmpty(data) && "FAILURE" == data.statusCode && validate.isNotEmpty(data.message)) {
                if("NO DOCTOR CONSULTATION FOUND" == data.message) {
                    let patientId = null;
                    if(validate.isNotEmpty(consultationInfoFromRedux) && validate.isNotEmpty(consultationInfoFromRedux.patientInfo)) {
                        patientId = consultationInfoFromRedux.patientInfo.patientId;
                    }
                    addPrimaryInfoToDoctorConsultation(patientId, doctorIdFromRedux, consultationTypeFromRedux, validate.isNotEmpty(clinicIdFromRedux) ? clinicIdFromRedux : null, parentOrderId);
                }
            }
            setInitialLoader(false);
        }).catch(err=>{
            setInitialLoader(false);
            console.log('err', err);
        });
    }

    const removePatientFromDoctorConsulationInfo = (patientId) =>{
        doctorCheckoutService.removePatientFromDoctorConsulationInfo({patientId :patientId}).then((data) => {
            if(validate.isNotEmpty(data) && "FAILURE" == data.statusCode && validate.isNotEmpty(data.message)) {
                setErrorMsg({message :data.message, type : ALERT_TYPE_ERROR });
                setTimeout(() => redirectToDoctorConsultationPage("/doctorconsultation"), 2000);
            }
        }).catch(e => {
            console.log("error : "+ JSON.stringify(e));
            setErrorMsg({message :"something went wrong,please try again", type : "danger" });
        });
    }

    const addPatientToDoctorConsultation = (patientId) => {
        if(validate.isEmpty(patientId)) {
            setErrorMsg({ message :"Complete info not available for Selected Patient. Please Edit to Proceed.", type : ALERT_TYPE_ERROR });
            return;
        }
        setAddPatienLoader(true);
        addPrimaryInfoToDoctorConsultation(patientId, doctorIdFromRedux, selectedConsultationType, validate.isNotEmpty(clinicIdFromRedux) ? clinicIdFromRedux : null, parentOrderId);
    }

    const addPrimaryInfoToDoctorConsultation = (patientId, doctorId, consultationType, clinicId, parentOrderId,redirectionUrl) => {
        let primaryInfoForDoctorConsultation = { doctorId : doctorId, patientId : patientId, consultationType : consultationType, clinicId : clinicId ,parentOrderId : parentOrderId };
        doctorCheckoutService.addPrimaryInfoToDoctorConsultation(primaryInfoForDoctorConsultation).then(data => {
            if(validate.isNotEmpty(data) && validate.isNotEmpty(data.statusCode) && "SUCCESS" == data.statusCode && validate.isNotEmpty(data.dataObject)) {
                setSelectPatientOpen(validate.isEmpty(data.dataObject.patientInfo));
                setDoctorConsultationInfo(data.dataObject);
                setSelectedPatient((validate.isNotEmpty(data.dataObject) && validate.isNotEmpty(data.dataObject.patientInfo)) ? data.dataObject.patientInfo : {});
                setSelectedClinicId((validate.isNotEmpty(data.dataObject) && validate.isNotEmpty(data.dataObject.consultationInfo) && VISIT_TYPE_WALK_IN == data.dataObject.consultationInfo.consultationTypeCode && validate.isNotEmpty(data.dataObject.consultationInfo.clinicStore)) ? data.dataObject.consultationInfo.clinicStore.storeId : "");
                dispatch({type: ADD_DOCTOR_CONSULTATION_INFO, data: data.dataObject});
                dispatch({ type: ADD_SELECTED_CLINIC_ID_IN_REDUX, data: (validate.isNotEmpty(data.dataObject) && validate.isNotEmpty(data.dataObject.consultationInfo) && VISIT_TYPE_WALK_IN == data.dataObject.consultationInfo.consultationTypeCode && validate.isNotEmpty(data.dataObject.consultationInfo.clinicStore)) ? data.dataObject.consultationInfo.clinicStore.storeId : ""});
                if(validate.isNotEmpty(redirectionUrl)){
                    props.history.push(redirectionUrl);
                }
            } else if(validate.isNotEmpty(data) && "FAILURE" == data.statusCode && validate.isNotEmpty(data.message)) {
                setErrorMsg({message :data.message, type : ALERT_TYPE_ERROR });
                setTimeout(() => redirectToDoctorConsultationPage("/doctorconsultation"), 2000);
            }
            setInitialLoader(false);
            setAddPatienLoader(false);
        }).catch(e => {
            console.log("error : "+ JSON.stringify(e));
            setAddPatienLoader(false);
            setInitialLoader(false);
            setErrorMsg({message :"something went wrong,please try again", type : ALERT_TYPE_ERROR });
        });
    }

    const createFollowUpBooking = () => {
        setFollowUpLoader(true);
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
            setFollowUpLoader(false);
        }).catch(err=>{
            setFollowUpLoader(false);
            setErrorMsg({message:"Unable to create order",type:ALERT_TYPE_ERROR});
        });
    }

    const redirectToDoctorConsultationPage = (doctorPageURL) =>{
        props.history.push(doctorPageURL);
    }

    const goToSubscriptionHomePage = (event) => {
        props.history.push(MEDPLUS_ADVANTAGE_HOME);
        event.stopPropagation();
    }

    const proceedToNextStep = () => {
        if((VISIT_TYPE_WALK_IN == selectedConsultationType) && (CHECKOUT_TYPE_CLINIC_SEARCH != checkoutTypeFromRedux)) {
            if(validate.isEmpty(selectedClinicId)) {
                setErrorMsg({message :"Select Clinic to proceed", type : ALERT_TYPE_ERROR });
                return;
            }
            addPrimaryInfoToDoctorConsultation(seletedPatient.patientId, doctorIdFromRedux, selectedConsultationType, selectedClinicId, parentOrderId,"/doctorconsultation/schedule-slot");
        }
        if((VISIT_TYPE_ONLINE == selectedConsultationType) || ((VISIT_TYPE_WALK_IN == selectedConsultationType) && (CHECKOUT_TYPE_CLINIC_SEARCH == checkoutTypeFromRedux))) {
            if(validate.isEmpty(selectedSlot) || validate.isEmpty(selectedSlot.slotId)) {
                setErrorMsg({message :"Select Slot to proceed", type : ALERT_TYPE_ERROR });
                return;
            }
            addDoctorConsultationInfo(selectedClinicId, selectedSlot.slotId);
        }
    }

    const addDoctorConsultationInfo = (clinicId, slotId) => {
        doctorCheckoutService.addDoctorConsultationInfo({clinicId: clinicId, slotId: slotId}).then(data => {
            if(validate.isNotEmpty(data) && validate.isNotEmpty(data.statusCode) && "SUCCESS" == data.statusCode && validate.isNotEmpty(data.dataObject)) {
                dispatch({type: ADD_DOCTOR_CONSULTATION_INFO, data: data.dataObject});
                if(validate.isNotEmpty(clinicId)) {
                    dispatch({type: ADD_SELECTED_CLINIC_ID_IN_REDUX, data: clinicId});
                }
                if(followUpOrder) {    
                    createFollowUpBooking();
                }else {
                    props.history.push("/doctorconsultation/payments/");
                }
            } else if(validate.isNotEmpty(data) && "FAILURE" == data.statusCode && validate.isNotEmpty(data.message)) {
                setErrorMsg({message : "Unable to set slot for consultation, please try again", type : ALERT_TYPE_ERROR});
                setTimeout(() => window.location.reload(), 2000);
            }
        }).catch(e => {
            console.log("error : "+ JSON.stringify(e));
            setErrorMsg({message :"something went wrong, please try again", type : ALERT_TYPE_ERROR });
        });
    }

    const changeConsultationType = (consultationType) => {
        if(consultationType === VISIT_TYPE_WALK_IN){
            dispatch({type: REMOVE_SELECTED_CLINIC_ID_FROM_REDUX});
        }
        dispatch({type: ADD_CONSULTATION_TYPE_IN_REDUX, data : consultationType});
        setSelectedConsultationType(consultationType);
        setSelectedSlot({});
        setSelectedSlotDate("");
        setDoctorConsultationInfo({});
        setInitialLoader(true);
    addPrimaryInfoToDoctorConsultation((validate.isNotEmpty(seletedPatient) ? seletedPatient.patientId : null), doctorIdFromRedux, consultationType, (consultationType === VISIT_TYPE_WALK_IN) ? selectedClinicId : null, parentOrderId);
    }

    const goToDoctorDetailPage = () => {
        const doctorName = (validate.isNotEmpty(doctorConsultationInfo) && validate.isNotEmpty(doctorConsultationInfo.doctorServiceInfo)) ? doctorConsultationInfo.doctorServiceInfo.name : "";
        const doctorId = (validate.isNotEmpty(doctorConsultationInfo) && validate.isNotEmpty(doctorConsultationInfo.doctorServiceInfo)) ? doctorConsultationInfo.doctorServiceInfo.doctorId : "";
        let backPageURL = "";
        if(validate.isNotEmpty(doctorName) && validate.isNotEmpty(doctorId)) {
            backPageURL = "/doctorconsultation/doctor/" + getDecodedURL(doctorName).toLowerCase() + '_' + doctorId;
        } else {
            backPageURL = "/doctorconsultation";
        }
        redirectToDoctorConsultationPage(backPageURL);
    }

    return  (
        <React.Fragment>
            {validate.isNotEmpty(errorMsg) && <Alert alertInfo={errorMsg} onDurationEnd={setErrorMsg} duration={5000}/>}
            <main role="main" className="container-fluid container-lg">
                <div className="row px-sm-3">
                    {initialLoader && <ShoppingCartGhostImage isCartProductsLoading={initialLoader} isLabsCart={true}/>}
                    {validate.isNotEmpty(doctorConsultationInfo) &&
                        <React.Fragment>
                            <div className="col-8 pl-0 pr-2">
                                {validate.isNotEmpty(doctorConsultationInfo.patientInfo) &&
                                    <div className="labs-patient-info">
                                        <div className="each-info mx-0 w-100">
                                            <section>
                                                <div className="header mb-0">
                                                    <p>Selected Patient</p>
                                                </div>
                                                <div className="lab-patient-card mt-0">
                                                    <div>
                                                        <h6 className="mb-0"><p className="patient-name text-truncate">{doctorConsultationInfo.patientInfo.patientName}</p>{doctorConsultationInfo.subscribedPatient && <span className="badge badge-primary ml-1 align-top">MA Participant</span>}</h6>
                                                        <small className="text-secondary">{validate.isNotEmpty(doctorConsultationInfo.patientInfo.dateOfBirth) && getDisplayableAge(doctorConsultationInfo.patientInfo.dateOfBirth)} {validate.isNotEmpty(doctorConsultationInfo.patientInfo.gender) && validate.isNotEmpty(doctorConsultationInfo.patientInfo.dateOfBirth) && "/" } {validate.isNotEmpty(doctorConsultationInfo.patientInfo.gender) && Gender[doctorConsultationInfo.patientInfo.gender]} {validate.isNotEmpty(doctorConsultationInfo.patientInfo.doctorName) && (" / Dr "+ doctorConsultationInfo.patientInfo.doctorName)}</small>
                                                    </div>
                                                    {!followUpOrder &&<button role="button" className="btn brand-secondary cate-btn rounded-pill" title="Change" aria-label="Change" onClick={()=> setSelectPatientOpen(true)}>Change</button>}
                                                </div>
                                            </section>
                                        </div>
                                    </div>
                                }
                                {validate.isNotEmpty(doctorConsultationInfo.doctorServiceInfo) &&
                                    <section>
                                        <div className="header mb-0">
                                            <p>Doctor Details</p>
                                        </div>
                                        <div className="p-3">
                                            <div className="d-flex justify-content-between">
                                                <div className="col pr-0">
                                                    <p className="mb-2 font-14 text-secondary">RN - {doctorConsultationInfo.doctorServiceInfo.registrationNo}</p>
                                                    <h6 className="mb-1">Dr. {doctorConsultationInfo.doctorServiceInfo.name}</h6>
                                                    {validate.isNotEmpty(doctorConsultationInfo.doctorServiceInfo.speciality) && <p className="mb-1 small text-secondary">{doctorConsultationInfo.doctorServiceInfo.speciality.join(", ")}</p>}
                                                    {(validate.isNotEmpty(doctorConsultationInfo.doctorServiceInfo.qualification) || validate.isNotEmpty(doctorConsultationInfo.doctorServiceInfo.department)) && <p className="mb-2 small">{doctorConsultationInfo.doctorServiceInfo.qualification.join(", ")} {(validate.isEmpty(doctorConsultationInfo.doctorServiceInfo.qualification) || validate.isEmpty(doctorConsultationInfo.doctorServiceInfo.department)) ? "" : " - "} {doctorConsultationInfo.doctorServiceInfo.department ? doctorConsultationInfo.doctorServiceInfo.department : ""}</p>}
                                                    {!followUpOrder && <h6 className="mb-0 mt-3"><small>₹</small>{parseFloat(doctorConsultationInfo.grandTotal).toFixed(2)} {validate.isNotEmpty(doctorConsultationInfo.totalDiscount) && parseFloat(doctorConsultationInfo.totalDiscount) > 0 && <span className="text-secondary small ml-2"><small>₹</small><del>{parseFloat(doctorConsultationInfo.totalPrice).toFixed(2)}</del></span>}</h6>}
                                                </div>
                                                {!followUpOrder && (validate.isNotEmpty(doctorConsultationInfo.doctorServiceInfo.subscriptionPrice) && !doctorConsultationInfo.subscribedPatient && validate.isNotEmpty(doctorConsultationInfo?.locality?.membershipConfig?.bestPlanId)) &&
                                                    <div className="align-items-end d-flex">
                                                        <button title="MedPlus Advantage Member Price" className="brand-secondary btn font-12 px-4 rounded-pill" type="button" role="button" onClick={(event) => goToSubscriptionHomePage(event)}>
                                                        <span>Buy MedPlus Advantage<br/>&amp; Get consultation for
                                                                 <small className="ml-1">₹</small>{parseFloat(doctorConsultationInfo.doctorServiceInfo.subscriptionPrice).toFixed(2)}</span>
                                                        </button>
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </section>
                                }
                                <section>
                                    <div className="header px-3 py-2">
                                        <p className="mb-0"><strong>{validate.isNotEmpty(checkoutTypeFromRedux) && (CHECKOUT_TYPE_VISIT_UNDEFINED == checkoutTypeFromRedux) ? "Select Consultation Type" : (validate.isNotEmpty(selectedConsultationType) && (VISIT_TYPE_ONLINE == selectedConsultationType) ? "Online Consultation (Select Date & Time)" : ((CHECKOUT_TYPE_CLINIC_SEARCH == checkoutTypeFromRedux) ? "Walk-in Consultation (Select Date & Time)" : "Walk-in Consultation (Select Clinic)"))}</strong></p>
                                    </div>
                                    {validate.isNotEmpty(checkoutTypeFromRedux) && (CHECKOUT_TYPE_VISIT_UNDEFINED == checkoutTypeFromRedux) && 
                                    <React.Fragment>
                                    <div className="px-3 py-2">
                                            <div className="mb-2">
                                                <button type="button" role="button" onClick={() => changeConsultationType(VISIT_TYPE_ONLINE)} className={(VISIT_TYPE_ONLINE == selectedConsultationType) ? "btn btn-blue-shadow mr-3 custom-btn-lg with-tick active arrow-up" : "btn btn-blue-shadow mr-3 custom-btn-lg with-tick" }>Online Consultation</button>
                                                <button type="button" role="button" onClick={() => changeConsultationType(VISIT_TYPE_WALK_IN)} className={(VISIT_TYPE_WALK_IN == selectedConsultationType) ? "btn btn-blue-shadow custom-btn-lg with-tick active  arrow-up" : "btn btn-blue-shadow custom-btn-lg with-tick"}>Walk-in Consultation</button>
                                            </div>
                                    </div>
                                 <hr className='mb-3 mt-0'/>
                                    </React.Fragment>}
                                    {(VISIT_TYPE_WALK_IN == selectedConsultationType) && (CHECKOUT_TYPE_CLINIC_SEARCH != checkoutTypeFromRedux) && <SelectClinic doctorId={doctorIdFromRedux} selectedClinicId={selectedClinicId} setSelectedClinicId={setSelectedClinicId} history={props.history}/> }
                                    {((VISIT_TYPE_ONLINE == selectedConsultationType) || ((VISIT_TYPE_WALK_IN == selectedConsultationType) && (CHECKOUT_TYPE_CLINIC_SEARCH == checkoutTypeFromRedux))) && <SlotSelection doctorId={doctorIdFromRedux} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} selectedSlotDate={selectedSlotDate} setSelectedSlotDate={setSelectedSlotDate} consultationType={selectedConsultationType} selectedClinicId={selectedClinicId} history={props.history} parentOrderId={parentOrderId}/>}
                                </section>
                                {validate.isNotEmpty(doctorConsultationInfo) && doctorConsultationInfo.subscribedPatient && <LabCheckoutInfoNote/> }
                            </div>
                            <div className="col-4 pl-2 pr-0">
                                {!followUpOrder && <DoctorsCartSummary cartSummaryObj={prepareCartSummaryObjFromDoctorConsultation(doctorConsultationInfo)} isfromThankYou={false}/>}
                            </div>
                        </React.Fragment>
                    }
                </div>
            </main>
            {(isSelectPatientOpen || isAddOrEditPatientOpen || isConfirmationOpen ) && <PatientModel errMsg={setErrorMsg} isAddOrEditPatientOpen={isAddOrEditPatientOpen} setAddOrEditPatientOpen={setAddOrEditPatientOpen} seletedPatientForEdit={seletedPatientForEdit} isSelectPatientOpen={isSelectPatientOpen} setSelectPatientOpen={setSelectPatientOpen} seletedPatient={seletedPatient} setSelectedPatient={setSelectedPatient} addPatientToShoppingCart={addPatientToDoctorConsultation} setSelectedPatientForEdit={setSelectedPatientForEdit} addPatienLoader={addPatienLoader} history={props.history} callBackFunc={removePatientFromDoctorConsulationInfo} callBackFuncAfterAddOrEdit ={addPrimaryInfoToDoctorConsultation} setAlertErrorMsg={setErrorMsg} isConfirmationOpen = {isConfirmationOpen} setConfirmationOpen = {setConfirmationOpen}/>}
            <footer className="footer fixed-bottom mt-auto py-2">
                <div className="container-fluid container-lg px-0 px-sm-3">
                    <div className="row align-items-center no-gutters">
                        <div className="col-12 text-right">
                            <button role="button" className="btn brand-secondary rounded-pill px-5 custom-btn-lg" onClick={() => goToDoctorDetailPage()} disabled = {followUpLoader}>Back</button>
                            {followUpLoader ?
                            <button className="btn btn-brand-gradient rounded-pill px-5 ml-3">
                            <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                            <span className="sr-only"></span>
                            </button> :
                            <button role="button" className="btn btn-brand-gradient rounded-pill px-5 ml-3 custom-btn-lg" onClick={() => proceedToNextStep()}>Confirm & Proceed</button>}
                        </div>
                    </div>
                </div>
            </footer>
        </React.Fragment>
    );
}
export default DoctorConsultationCart;