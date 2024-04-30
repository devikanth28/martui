import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Validate from '../../../helpers/Validate';
import FadeInSection from '../../../MedplusMart/components/MartCatalog/ProductCategory/CategoryDetail/Fadein';
import PrescriptionService from '../../../services/PrescriptionService';
import { getDateFormat, getDisplayTime, getTimeLeftForConsultation } from '../../constants/DoctorConsultationConstants';
import { getDisplayConsultation } from '../../helper/DoctorConsulationHelper';
import DoctorConsultationService from '../../services/DoctorConsultationService';
import DoctorImage from './DoctorImage';


const PreviouslyConsultedDoctorsTab = (props) => {

    const [doctorConsultationsList, setDoctorConsultationsList] = useState([]);
    const [noConsultations, setNoConsultations] = useState(false);
    const [loader, setLoader] = useState(true);
    const [doctorList, setDoctorList] = useState([]);
    const [viewMore, setViewMore] = useState(false);
    const [alertData, setAlertData] = useState({});
    const [noOfRecords, setNoOfRecords] = useState(4);
    const [dataLength, setDataLength] = useState(0);
    const validate = Validate();

    useEffect(()=>{
        getOtherDoctorConsultations();
    },[]);


    const customer=useSelector(state=>{
        if(validate.isNotEmpty(state) && validate.isNotEmpty(state.customer)){
            return state.customer;
        }
    })

    const getOtherDoctorConsultations = () => {
        setLoader(true);
        DoctorConsultationService().getDoctorConsultations().then(data =>{
            if(data && data.statusCode === "SUCCESS" && data.message == "SUCCESS" && data.dataObject && validate.isNotEmpty(data.dataObject.doctorConsultations) && data.dataObject.doctorConsultations.length>0){
                setDoctorConsultationData(data.dataObject.doctorConsultations);
            }else{
                setNoConsultations(true);
            }
            setLoader(false);
        }).catch(err=>{
            console.log(err);
            setLoader(false);
        });
    }

    const setDoctorConsultationData =(data)=>{
        setDoctorConsultationsList(data);
        setDataLength(data.length);
        if(data.length > noOfRecords){
            setDoctorList(data.slice(0,noOfRecords));
            setViewMore(true);
        }else{
            setDoctorList(data);
            setViewMore(false);
        }
        setInitialLoader(false);
    }

    const viewMoreRecords = () =>{
        const showRecords = (dataLength > noOfRecords + 4) ? noOfRecords + 4 : dataLength;
        setDoctorList(doctorConsultationsList.slice(0,showRecords));
        setNoOfRecords(showRecords);
        if(showRecords < dataLength){       
            setViewMore(true);
        }else{
            setViewMore(false);
        }
    }

    const getGhostImage = () =>{

        return    <React.Fragment>
                       <div style={{marginTop:"60px"}}>
                        <section className="p-3 card-menu bg-white">
                        <div className=" d-flex mb-3">
                            <div className="ph-image w-25 ph-animated mx-0  " style={{ "height": "50px" }}></div>
                            <div className="m-3">
                                <div className="line width110 ph-animated mb-2"></div>
                                <div className="line width110 ph-animated mb-2"></div>
                                <div className="line width110 ph-animated mb-2"></div>
                            </div>
                        </div>
                        <hr className="dashed"/>
                        <div className="line width110 ph-animated "></div>
                        <div className="line width250 ph-animated "></div>
                        <div className="line width110 ph-animated mb-3"></div>
                        <hr className="dashed"/>
                        <div className="line width250 ph-animated "></div>
                        <div className="line width250 ph-animated "></div>
                        <div className="d-flex justify-content-between mt-4">
                            <div className="line w-25 ph-animated mb-0" style={{ "height": "2rem" }}></div>
                            <div className="line w-25 ph-animated mt-0" style={{ "height": "2rem" }}></div>
                            <div className="line w-25 ph-animated mt-0" style={{ "height": "2rem" }}></div>
                        </div>
                </section>
                </div>
                </React.Fragment>
    }

     if(loader){
        return getGhostImage();
    } 

    return (
        <React.Fragment>
            <div class="d-flex align-items-center justify-content-between mb-3"><h5 class="m-0">Other Consultations</h5></div>
            <div className={props.fullWidth ? 'previously-consulted-doctor-container full-width' : 'previously-consulted-doctor-container' }>
                { doctorList && doctorList.map((each,index) => {
                    return <Consultation key={index} consultation={each} history={props.history} setAlertData={setAlertData} customer={customer}/>
                })}
            </div>
            {viewMore && <p className="text-center">
                        <button type="button" onClick={viewMoreRecords} className="btn btn-outline-primary mt-3 col-6 view-btn">
                            View More
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" height="12" width="12" class="align-middle ml-1">
                                <g transform="translate(-683 -700)">
                                    <path fill="#1c3ffd" d="M6.7,8.1,2,3.4,3.4,2,6.7,5.3,10,2l1.4,1.4Z" transform="translate(681 700)"></path>
                                    <rect fill="none" width="10" height="10" transform="translate(683 700)"></rect>
                                </g>
                            </svg>
                        </button>
                    </p>}
        </React.Fragment>
    );
}

export default PreviouslyConsultedDoctorsTab;


const Consultation = (props) => {

    const [openEmailpop , setopenEmailpop] = useState(false);
    const [backDropLoader,setBackDropLoader]= useState(false);
    const [isLightBoxOpen,setIsLighBoxOpen] = useState(false);
    const [recordsList,setRecordsList]= useState(undefined);
    const [imageIndex,setImageIndex]= useState(0);


    const validate = Validate();
    const prescriptionService = PrescriptionService();
    let consultation = props.consultation;
    let doctorServiceInfo = consultation.doctorServiceInfo;
    let patientInfo = consultation.patientInfo;
    let consultationInfo = consultation.consultationInfo;
    let timeSlot = {};
    if(validate.isNotEmpty(consultationInfo)){
        timeSlot = consultation.consultationInfo.timeSlot;
    }
    const isFooterPresent=()=>{
        if((consultation.paymentType === "PAY_ONLINE" && validate.isNotEmpty(consultation.paymentDetails)) || consultation.status==="ORDER_STATUS_READY_FOR_PRINT" || (consultation.statusCode === "I" && consultation.gateWayStatus === "F")) 
          return true;
        return false;
    }

    const redirectToPayments = () =>{   
        props.history.push("/doctorconsultation/paymentsList");
    }

    const handleEmailInvoice = () =>{
        if (props.customer && !validate.email(props.customer.emailId)) {
          sendEmailInvoice();
        } else {
          setopenEmailpop(openEmailpop => !openEmailpop);
        }
    }

    const sendEmailInvoice = () => {
        setBackDropLoader(true);
        DoctorConsultationService().emailInvoice({ orderId: consultation.orderId }).then(response => {
            props.setAlertData({ message: response.message, type: "success" });
            setBackDropLoader(false);
        }).catch(e => {
            console.log(e);
            props.setAlertData({ message: "Something went wrong", type: "danger" });
            setBackDropLoader(false);
        })
    }

    const handleViewPrescription = (prescriptionOrderId) => {
        if (validate.isEmpty(recordsList)) {
            setBackDropLoader(true);
            prescriptionService.getHealthrecordByPrecsId(prescriptionOrderId).then(data => {
                if (data.dataObject && data.dataObject.imageList) {
                    setRecordsList(data.dataObject.imageList);
                    setIsLighBoxOpen(true);
                }
                setBackDropLoader(false);
            }).catch(err => {
                props.setAlertData({ message: "something went wrong", type: "success" });
                setBackDropLoader(false);
            })
        } else {
            setIsLighBoxOpen(true);
        }

    }

    const getDisplayStatus = (status, consultationInfo) => {
        switch (status) {
            case "ORDER_STATUS_CREATED": return getDisplayMessageForProcessing(consultationInfo);
            case "ORDER_STATUS_APPROVED": return "Confirmed";
            case "ORDER_STATUS_CANCEL": return "Cancelled";
            case "ORDER_STATUS_PROCESSING": return "In Progress";
            case "ORDER_STATUS_READY_FOR_PRINT": return "Completed";
            case "ORDER_STATUS_PATIENT_ACKNOWLEDGED": return "Acknowledged"
        }
    }

    const getDisplayMessageForProcessing = (consultation) => {
        const timeSlot = consultation.consultationInfo.timeSlot;
        const timeLeftForConsultation = getTimeLeftForConsultation(timeSlot);
        if (timeLeftForConsultation < 0) {
            return "Expired";
        }
        return "Payment Processing";
    }

    return (
        <div className="each-consulted-doc-card">
            <div className="card">
                <div className="card-body p-3">
                    <div className="d-flex">
                        <div className="consultaion-appointment">
                           <FadeInSection>
                              <DoctorImage id = {doctorServiceInfo.doctorId} doctorInfo={doctorServiceInfo} history={props.history} className={"rounded rounded-circle"}/>
                           </FadeInSection>
                        </div>
                        
                       {validate.isNotEmpty(doctorServiceInfo) && <div className='pl-3' style={{ "width": "calc(100% - 5rem)" }}>
                            <small className="text-secondary mb-0 d-block">RN - {doctorServiceInfo.registrationNo}</small>                            
                            <h6 class="mb-2 text-truncate">{"Dr. " +patientInfo.doctorName}</h6>
                            <p className="small text-secondary text-truncate mb-0"> {doctorServiceInfo.speciality[0]}</p>
                            <p class="small mb-0 text-truncate">{doctorServiceInfo.qualification[0]}</p>
                       
                        </div>}
                    </div>
                    <hr className="dashed" />
                    <div className="small">
                        <small className="text-secondary">Patient &amp; Slot</small>
                        <p className="font-weight-bold mb-0">{validate.isNotEmpty(patientInfo) && validate.isNotEmpty(patientInfo.patientName) ? patientInfo.patientName : ""}</p>
                       {validate.isNotEmpty(timeSlot) && <span className="text-secondary">{getDateFormat(timeSlot.displaySlotDate)} at {getDisplayTime(timeSlot)}</span>}
                    </div>
                    <hr className="dashed" />
                    <div className="align-items-center d-flex justify-content-between mb-3">
                        {validate.isNotEmpty(doctorServiceInfo) && <div className="font-weight-bold"><small><small>₹</small>&nbsp;{doctorServiceInfo.price}</small><span className="align-middle h4 font-weight-bold mx-2">·</span><small>{getDisplayStatus(consultation.status,consultation)}</small></div>}
                        {validate.isNotEmpty(consultation.displayDateCreated) && <small class="text-secondary">{getDateFormat(consultation.displayDateCreated)}</small>}
                    </div>
                    <div className="d-flex justify-content-between">
                        <span className="font-weight-bold small text-truncate mr-1">
                            <small className="text-secondary d-block font-weight-normal">Booking ID</small>
                            <span title={consultation.displayOrderId}>{consultation.displayOrderId}</span>
                        </span>
                        <span className="font-weight-bold small text-truncate ml-1">
                            <small className="text-secondary d-block font-weight-normal">Consultation Type</small>
                            {getDisplayConsultation(consultationInfo.consultationType)}
                        </span>
                    </div>
                </div>
               {isFooterPresent() && <div className="card-footer bg-white p-0">
                    <div className="row mx-0">
                     {consultation.paymentType === "PAY_ONLINE" && validate.isNotEmpty(consultation.paymentDetails) && <div className="col px-0"><button role="button" className="btn btn-link  btn-block no-underline text-primary" onClick={() => redirectToPayments()}>Payments</button></div>}
                     {consultation.status === "ORDER_STATUS_READY_FOR_PRINT" &&  <div className="col px-0"><button role="button" onClick={() => handleEmailInvoice()} className="btn btn-link  btn-block no-underline text-primary">Invoice</button></div>}
                     {consultation.status === "ORDER_STATUS_READY_FOR_PRINT" && consultation.prescriptionOrderId > 0 &&   <div className="col px-0"><button role="button" onClick={() => handleViewPrescription(consultation.prescriptionOrderId)} className="btn btn-link  btn-block no-underline text-primary">Prescription</button></div>}
                    </div>
                </div>}
            </div>
        </div>
    )
}