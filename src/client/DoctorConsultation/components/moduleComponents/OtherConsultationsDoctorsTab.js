import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Validate from '../../../helpers/Validate';
import PrescriptionService from '../../../services/PrescriptionService';
import { getConsultationString, getDateFormat, getDisplayTime, VISIT_TYPE_ONLINE,VISIT_TYPE_WALK_IN, CHECKOUT_TYPE_VISIT_UNDEFINED, CHECKOUT_TYPE_VISIT_ONLINE, CHECKOUT_TYPE_VISIT_WALK_IN} from '../../constants/DoctorConsultationConstants';
import { getDisplayConsultation, getDisplayStatus, statusColour } from '../../helper/DoctorConsulationHelper';
import DoctorConsultationService from '../../services/DoctorConsultationService';
import DoctorCheckoutService  from '../../services/DoctorCheckoutService';
import DoctorImage from './DoctorImage';
import NoListAvailable from './NoListAvailable';
import DoctorEmailConfirmation from '../pageComponents/DoctorEmailConfirmation';
import Alert from '../../../components/Common/Alert';
import { getDecodedURL } from '../../../helpers/CommonUtil';
import LocalDB from '../../../DataBase/LocalDB';
import { ADD_CHECKOUT_TYPE_IN_REDUX, ADD_DOCTOR_CONSULTATION_INFO ,ADD_SELECTED_DOCTOR_ID_IN_REDUX,REMOVE_DOCTOR_CONSULTATION_CHECKOUT_PARAMS,ADD_CONSULTATION_TYPE_IN_REDUX} from '../../redux/DoctorConsultationReducer';
import { useDispatch } from 'react-redux';
import { getChatHeaderData } from '../../../components/Chat/Common/ChatHelper';
import FadeInSection from '../../../MedplusMart/components/MartCatalog/ProductCategory/CategoryDetail/Fadein';

const OtherConsultationsDoctorsTab = (props) => {

    const [doctorConsultationsList, setDoctorConsultationsList] = useState([]);
    const [noOtherConsultations, setNoOtherConsultations] = useState(false);
    const [loader, setLoader] = useState(true);
    const [doctorList, setDoctorList] = useState([]);
    const [viewMore, setViewMore] = useState(false);
    const [alertData, setAlertData] = useState({});
    const [noOfRecords, setNoOfRecords] = useState(4);
    const [dataLength, setDataLength] = useState(0);
    const [animate, setAnimate] = useState("");
    const validate = Validate();

    useEffect(() => {
        getOtherDoctorConsultations();
    },[]);

    useEffect(() => {
        if (props.reloadOtherConsultations) {
            getOtherDoctorConsultations();
        }
    },[props.reloadOtherConsultations]);

    useEffect(()=>{
        if(validate.isNotEmpty(props.orderId) && LocalDB.getValue("orderHistoryScrollTop")){
            document.getElementsByTagName("html")[0].scrollTop = LocalDB.getValue("orderHistoryScrollTop");
            setAnimate(props.orderId);
            props.setOrderId("");
        }
    },[props.orderId])

    const customer = useSelector(state => {
        if (validate.isNotEmpty(state) && validate.isNotEmpty(state.userInfo) && validate.isNotEmpty(state.userInfo.userInfo) && validate.isNotEmpty(state.userInfo.userContactDetails)) {
            const userInfo = state.userInfo.userInfo;
            const userContactDetails = state.userInfo.userContactDetails;
            return { ...userInfo, ...userContactDetails };
        }
    });

    const getOtherDoctorConsultations = () => {
        setLoader(true);
        DoctorConsultationService().getDoctorConsultations().then(data => {
            if (data && data.statusCode === "SUCCESS" && data.message == "SUCCESS" && data.dataObject && validate.isNotEmpty(data.dataObject.doctorConsultations) && data.dataObject.doctorConsultations.length > 0) {
                setDoctorConsultationData(data.dataObject.doctorConsultations);
                setNoOtherConsultations(false);
                props.setNoConsultations(false);
            } else {
                props.setNoConsultations(true);
                setNoOtherConsultations(true);
            }
            setLoader(false);
            if (validate.isNotEmpty(props.setReloadOtherConsultations)) {
                props.setReloadOtherConsultations(false);
            }
        }).catch(err => {
            console.log(err);
            setLoader(false);
            if (validate.isNotEmpty(props.setReloadOtherConsultations)) {
                props.setReloadOtherConsultations(false);
            }
        });
    }

    const setDoctorConsultationData = (data) => {
        setDoctorConsultationsList(data);
        setDataLength(data.length);
        if (data.length > noOfRecords) {
            setDoctorList(data.slice(0, noOfRecords));
            setViewMore(true);
        } else {
            setDoctorList(data);
            setViewMore(false);
        }
        setLoader(false);
    }

    const viewMoreRecords = () => {
        const showRecords = (dataLength > noOfRecords + 4) ? noOfRecords + 4 : dataLength;
        setDoctorList(doctorConsultationsList.slice(0, showRecords));
        setNoOfRecords(showRecords);
        if (showRecords < dataLength) {
            setViewMore(true);
        } else {
            setViewMore(false);
        }
    }

    if (noOtherConsultations && !props.noUpcomingConsultations) {
        return <React.Fragment>
            <NoListAvailable class="div-center p-4" message="No Previous Consultations Found" type={"NO_DOCTORS"} />
        </React.Fragment>
    }

    if(props.noConsultations && props.noUpcomingConsultations){
        return <React.Fragment>
            <NoListAvailable message="You haven't booked any consultations yet" type={"NO_DOCTORS"} showbutton= {true} redirectionUrl ={'/doctorconsultation'} history={props.history}/>
        </React.Fragment>
    }

    const getGhostImage = () => {
        return (
            <React.Fragment>
                <div className="ph-row ph-item p-0 m-0 mb-4 bg-transparent">
                    <div className="ph-col-6 m-0"></div>
                    <div className="ph-col-6 empty"></div>
                </div>
                <div className='previously-consulted-doctor-container'>
                    {/* ghost image */}
                    {[0, 1, 2, 3].map(() => {
                        return (
                            <div className="each-consulted-doc-card">
                                <div className="card">
                                    <div className="card-body p-3">
                                        <div className="d-flex">
                                            <div className="consultaion-appointment">
                                                <div className="img-container ">
                                                    <div className="ph-row">
                                                        <div className="rounded-circle m-0" style={{ "height": "66px", "width": " 68px" }}></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ "width": "calc(100% - 5rem)" }} className="mt-1 mx-2">
                                                <div className="m-0 mb-1 mb-2 p-0 ph-item ph-row">
                                                    <div className="ph-col-6 m-0"></div>
                                                </div>
                                                <div className="m-0 mb-1 mb-2 p-0 ph-item ph-row">
                                                    <div className="ph-col-6 m-0"></div>
                                                </div>
                                                <div className="m-0 mb-1 mb-2 p-0 ph-item ph-row">
                                                    <div className="ph-col-6 m-0"></div>
                                                </div>
                                                <div className="m-0 mb-3 p-0 ph-item ph-row">
                                                    <div className="ph-col-6 m-0"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <hr className="dashed" />
                                        <div className="small">
                                            <div className="m-0 my-2 p-0 ph-item ph-row">
                                                <div className="ph-col-4 m-0"></div>
                                            </div>
                                            <div className="m-0 mb-1 mb-2 p-0 ph-item ph-row">
                                                <div className="ph-col-2 m-0"></div>
                                            </div>
                                            <div className="m-0 mb-2 p-0 ph-item ph-row">
                                                <div className="ph-col-6 m-0"></div>
                                            </div>
                                        </div>
                                        <hr className="dashed" />
                                        <div className="align-items-center d-flex justify-content-between mb-3 mt-3">
                                            <div className="m-0 mb-1 p-0 ph-item ph-row" style={{ "width": "100px" }}>
                                                <div className="m-0 ph-col-10"></div>
                                            </div>
                                            <div className="m-0 mb-1  p-0 ph-item ph-row" >
                                                <div className="m-0 ph-col-12" style={{ "width": "80px" }}></div>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between mt-4" >
                                            <span className="small font-weight-bold" >
                                                <div className="m-0 mb-2 p-0 ph-item ph-row" >
                                                    <div className="m-0 ph-col-12" style={{ "width": "80px" }}></div>
                                                </div>
                                                <div className="m-0 mb-1  p-0 ph-item ph-row" >
                                                    <div className="m-0 ph-col-12" style={{ "width": "80px" }}></div>
                                                </div>
                                            </span>
                                            <span className="small font-weight-bold" >
                                                <div className="m-0 mb-2 p-0 ph-item ph-row" >
                                                    <div className="m-0 ph-col-12" style={{ "width": "80px" }}></div>
                                                </div>
                                                <div className="m-0 mb-1  p-0 ph-item ph-row">
                                                    <div className="m-0 ph-col-12" style={{ "width": "80px" }}></div>
                                                </div>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="card-footer bg-white p-0">
                                        <div className="row mx-0">
                                            <div className="col ml-2 pt-2 px-0">
                                                <div>
                                                    <div className="p-0 ph-item ph-row pt-1" style={{ "width": "90px" }}>
                                                        <div className="mb-0 ph-col-12" style={{ "height": "2rem" }}></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col ml-2 pt-2 px-0">
                                                <div>
                                                    <div className="p-0 ph-item ph-row pt-1" style={{ "width": "90px" }}>
                                                        <div className="mb-0 ph-col-12" style={{ "height": "2rem" }}></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col ml-2 pt-2 px-0" >
                                                <div>
                                                    <div className="p-0 ph-item ph-row pt-1" style={{ "width": "90px" }}>
                                                        <div className="mb-0 ph-col-12" style={{ "height": "2rem" }}></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </React.Fragment>
        )
    }

    if (loader) {
        return getGhostImage();
    }

    const closeAlertMessage = () => {
        setAlertData({ message: "", type: "" });
    }

    return (
        <React.Fragment>
            {alertData && alertData.message && <Alert alertInfo={alertData} onDurationEnd={closeAlertMessage} duration={5000} />}
            <div className="d-flex align-items-center justify-content-between mb-3"><h5 className="m-0">Previous Consultations</h5></div>
            <div className={props.fullWidth ? 'previously-consulted-doctor-container full-width' : 'previously-consulted-doctor-container'}>
                {doctorList && doctorList.map((each, index) => {
                    return <Consultation toggleChat={props.toggleChat} orderId={animate} consult={props.consult} key={index} setShowPayments={props.setShowPayments} consultation={each} history={props.history} setAlertData={setAlertData} customer={customer} />
                })}
            </div>
            {viewMore && <p className="text-center">
                <button type="button" onClick={viewMoreRecords} className="btn brand-secondary px-5 rounded-pill custom-btn-lg">
                    Load More Consultations
                </button>
            </p>}
        </React.Fragment>
    );
}

export default OtherConsultationsDoctorsTab;


const Consultation = (props) => {

    const [openEmailpop, setopenEmailpop] = useState(false);
    const [recordsList, setRecordsList] = useState(undefined);
    const [alertData,setAlertData] = useState({});
    const dispatch = useDispatch();
    const validate = Validate();
    const prescriptionService = PrescriptionService();
    let consultation = props.consultation;
    let doctorServiceInfo = consultation.doctorServiceInfo;
    let patientInfo = consultation.patientInfo;
    let consultationInfo = consultation.consultationInfo;
    let timeSlot = {};
    if (validate.isNotEmpty(consultationInfo)) {
        timeSlot = consultation.consultationInfo.timeSlot;
    }
    const isFooterPresent = () => {
        if ((consultation.paymentType === "PAY_ONLINE" && validate.isNotEmpty(consultation.paymentDetails)) || consultation.status === "ORDER_STATUS_READY_FOR_PRINT" || (consultation.statusCode === "I" && consultation.gateWayStatus === "F"))
            return true;
        return false;
    }

    const redirectToPayments = () => {
        LocalDB.setValue("orderHistoryScrollTop", document.getElementsByTagName("html")[0].scrollTop);
        props.setShowPayments(true);
        props.consult(consultation);
    }

    const handleEmailInvoice = () => {
        if (props.customer && !validate.email(props.customer.emailAddress)) {
            sendEmailInvoice();
        } else {
            setopenEmailpop(openEmailpop => !openEmailpop);
        }
    }

    const sendEmailInvoice = () => {
        DoctorConsultationService().emailInvoice({ orderId: consultation.orderId }).then(response => {
            props.setAlertData({ message: response.message, type: "success" });
        }).catch(e => {
            console.log(e);
            props.setAlertData({ message: "Something went wrong", type: "danger" });
        })
    }

    const openImageUrl = (url) => {
        window.open(`${url}`);
    }

    const handleViewPrescription = (prescriptionOrderId) => {
        if (validate.isEmpty(recordsList)) {
            prescriptionService.getHealthrecordByPrecsId(prescriptionOrderId).then(data => {
                if (data.dataObject && data.dataObject.imageList) {
                    setRecordsList(data.dataObject.imageList);
                    const url = data.dataObject.imageList[0].imagePath
                    openImageUrl(url);
                }
            }).catch(err => {
                props.setAlertData({ message: "something went wrong", type: "success" });
            })
        } else {
            openImageUrl(recordsList[0].imagePath);
        }

    }

    const closeAlertMessage = () => {
        setAlertData({ message: "", type: "" });
    }

    const FollowUpDoctor=(orderId)=>{
        DoctorCheckoutService().getFollowUpDoctorDetailsToValidate({orderId: orderId}).then(data=>{
            if(Validate().isNotEmpty(data) && data.statusCode == "SUCCESS" && Validate().isNotEmpty(data.dataObject)){
                dispatch({type:REMOVE_DOCTOR_CONSULTATION_CHECKOUT_PARAMS}); 
                dispatch({type: ADD_DOCTOR_CONSULTATION_INFO, data: data.dataObject.FOLLOWUP_CONSULTATION});
                dispatch({type : ADD_SELECTED_DOCTOR_ID_IN_REDUX, data: data.dataObject.FOLLOWUP_CONSULTATION.doctorServiceInfo.doctorId});
                if(data.dataObject.FOLLOWUP_CONSULTATION_TYPE == "B"){
                    dispatch({type: ADD_CHECKOUT_TYPE_IN_REDUX, data: CHECKOUT_TYPE_VISIT_UNDEFINED});
                    dispatch({type: ADD_CONSULTATION_TYPE_IN_REDUX, data: VISIT_TYPE_ONLINE});
                }else if(data.dataObject.FOLLOWUP_CONSULTATION_TYPE == "T"){
                    dispatch({type: ADD_CHECKOUT_TYPE_IN_REDUX, data: CHECKOUT_TYPE_VISIT_ONLINE});
                    dispatch({type: ADD_CONSULTATION_TYPE_IN_REDUX, data: VISIT_TYPE_ONLINE});
                }else if(data.dataObject.FOLLOWUP_CONSULTATION_TYPE == "W"){
                    dispatch({type: ADD_CHECKOUT_TYPE_IN_REDUX, data: CHECKOUT_TYPE_VISIT_WALK_IN});
                    dispatch({type: ADD_CONSULTATION_TYPE_IN_REDUX, data: VISIT_TYPE_WALK_IN});
                }

                props.history.push("/doctorconsultation/schedule-consultation");
            }
            else if(Validate().isNotEmpty(data) && data.statusCode == "FAILURE"){
                setAlertData({ message: data.message, type: "Warning" })
            }
        }).catch(err=>{
            setAlertData({ message: "Unable to process the followUp order", type: "Error" })
            console.log('error :', err);
        })
    }

    return (
        <React.Fragment>
             {alertData && alertData.message && <Alert alertInfo={alertData} onDurationEnd={closeAlertMessage} duration={5000} />}
             {openEmailpop && <DoctorEmailConfirmation openpop={openEmailpop} updateprop={setopenEmailpop} orderId={consultation.orderId} setAlertData={props.setAlertData} />}
           	 {validate.isNotEmpty(doctorServiceInfo) && <div className="each-consulted-doc-card">
                <div className={consultation.displayOrderId === props.orderId ? "card payment-shake": "card"}>
                    <div className="card-body p-3">
                      <a role="link" href={'/doctorconsultation/doctor/' + getDecodedURL(doctorServiceInfo.name).toLowerCase() + '_' + doctorServiceInfo.doctorId + '/' + getConsultationString(props.visitType)} className="text-dark no-underline">
                            <div className="d-flex">
                                <div className="consultaion-appointment">
                                    <FadeInSection>
                                         <DoctorImage id={doctorServiceInfo.doctorId} doctorInfo={doctorServiceInfo} history={props.history} className={"rounded rounded-circle"} />
                                    </FadeInSection>
                                </div>

                                {validate.isNotEmpty(doctorServiceInfo) && <div className='pl-3 position-relative' style={{ "width": "calc(100% - 5rem)" }}>
                                    <small className="text-secondary mb-0 d-block w-75">RN - {doctorServiceInfo.registrationNo}</small>
                                    {consultation.eligibleForHelp && 
                                        <button type="button" role="button" onClick={(ev)=> {ev.preventDefault() ;props.toggleChat(getChatHeaderData("DOCTOR_CONSULTATION_ORDER", consultation))}} className="btn btn-link btn-sm font-12 position-absolute text-primary" style={{"right":"-0.5rem","top":"-0.25rem"}}>Help?</button>
                                    }
                                    <h6 className="mb-2 text-truncate">{patientInfo.doctorName}</h6>
                                    {validate.isNotEmpty(doctorServiceInfo.speciality) && <p className="small text-secondary text-truncate mb-0">{doctorServiceInfo.speciality[0]}</p>}
                                    {validate.isNotEmpty(doctorServiceInfo.qualification) && <p className="small mb-0 text-truncate">{doctorServiceInfo.qualification[0]}</p>}
                                </div>}
                                
                            </div>
                        </a>
                        <hr className="dashed border-bottom-0" />
                        <div className='align-items-center d-flex justify-content-between'>
                            <div className="small">
                                <small className="text-secondary">Patient &amp; Slot</small>
                                <p className="font-weight-bold mb-0">{validate.isNotEmpty(patientInfo) && validate.isNotEmpty(patientInfo.patientName) ? patientInfo.patientName : ""}</p>
                                {validate.isNotEmpty(timeSlot) && <span className="text-secondary">{getDateFormat(timeSlot.displaySlotDate)} at {getDisplayTime(timeSlot)}</span>}
                            </div>
                        {consultation.followUpEligible &&  <button type="button" className="btn btn-link mr-n2 no-underline text-primary"  onClick={()=>FollowUpDoctor(consultation.orderId)}>Follow Up</button> }
                        </div>
                        <hr className="dashed border-bottom-0" />
                        <div className="align-items-center d-flex justify-content-between mb-3">
                            {validate.isNotEmpty(doctorServiceInfo) && <div className="font-weight-bold">
                            {!consultation.followUpOrder && <React.Fragment><small><small>₹</small>{doctorServiceInfo.price}</small>
                                <span className="mx-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#343A40" width="4" height="4" viewBox="0 0 4 4">
                                        <g transform="translate(0.473 -6)">
                                            <path d="M2,0A2,2,0,1,1,0,2,2,2,0,0,1,2,0Z" transform="translate(-0.473 6)" />
                                        </g>
                                    </svg>
                                </span></React.Fragment> }
                                <small className={statusColour(consultation)}>{getDisplayStatus(consultation.status, consultation)}</small>
                            </div>}
                            {validate.isNotEmpty(consultation.displayDateCreated) && <small className="text-secondary">{getDateFormat(consultation.displayDateCreated)}</small>}
                        </div>
                        <div className="d-flex justify-content-between"><span className="font-weight-bold small text-truncate mr-1"><small className="text-secondary d-block font-weight-normal">Booking ID</small><span title={consultation.displayOrderId}>{consultation.displayOrderId}</span></span><span className="font-weight-bold small text-truncate ml-1"><small className="text-secondary d-block font-weight-normal">Consultation Type</small>{getDisplayConsultation(consultationInfo.consultationType)}</span></div>
                    </div>
                    {isFooterPresent() && <div className="card-footer bg-white p-0">
                        <div className="row no-gutters">
                            {consultation.paymentType === "PAY_ONLINE" && validate.isNotEmpty(consultation.paymentDetails) && <div className="col"><button role="button" className="btn btn-link btn-block no-underline text-primary" onClick={() => redirectToPayments()}>Payments</button></div>}
                            {consultation.status === "ORDER_STATUS_READY_FOR_PRINT" && <div className="col"><button role="button" onClick={() => handleEmailInvoice()} className="btn btn-link btn-block no-underline text-primary">Invoice</button></div>}
                            {consultation.status === "ORDER_STATUS_READY_FOR_PRINT" && consultation.prescriptionOrderId > 0 && <div className="col"><button role="button" onClick={() => handleViewPrescription(consultation.prescriptionOrderId)} className="btn btn-link btn-block no-underline text-primary">Prescription</button></div>}
                            {(consultation.statusCode === "I" && consultation.gateWayStatus === "F") && <div className="col"> <button type="button" onClick={() => props.history.push(`/doctorconsultation/payments/${consultation.orderId}`)} className="btn btn-link btn-block no-underline text-primary">Retry Payment</button></div>}
                        </div>
                    </div>}
                </div>
            </div>}
        </React.Fragment>

    )
}
