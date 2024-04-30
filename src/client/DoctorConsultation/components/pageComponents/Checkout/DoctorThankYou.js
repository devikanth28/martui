import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Validate from '../../../../helpers/Validate';
import { prepareCartSummaryObjFromDoctorConsultation } from '../../../helper/DoctorConsulationHelper';
import DoctorCheckoutService from '../../../services/DoctorCheckoutService';
import DoctorsCartSummary from '../../common/DoctorsCartSummary';
import DoctorReview from '../../moduleComponents/Checkout/DoctorReview';
import DoctorThankYouHeader from '../../moduleComponents/Checkout/DoctorThankYouHeader';
import { REMOVE_DOCTOR_CONSULTATION_CHECKOUT_PARAMS } from '../../../redux/DoctorConsultationReducer';
import DoctorThankyouGhostImages from '../../../../components/DoctorConsultation/DoctorThankyouGhostImages';
import ShowPickUpStore from '../../../../components/Common/ShowPickUpStore';
import { isUserLoggedIn } from '../../../../helpers/PaymentHelper';

const DoctorThankYou = (props) => {
    const [doctorConsultation, setdoctorConsultation] = useState({});
    const [patientDetails, setpatientDetails] = useState({});
    const [doctorDetails, setdoctorDetails] = useState({});
    const [consultationDetails, setconsultationDetails] = useState({});
    const [LocationObj, setLocationObj] = useState({});
    const [WalkIn, setWalkIn] = useState(false);
    const [loader, setLoader]= useState(true);
    const [followUpOrder,setFollowUpOrder] =useState(false);
    const validate = Validate();
    const dispatch = useDispatch();
    const [paymentAwaited, setpaymentAwaited] = useState(true);
    const isUserAvailable = isUserLoggedIn();
    const orderId = useSelector(state=>{
        if(state.doctorConsultation && state.doctorConsultation.lastDoctorOrderId){
            return state.doctorConsultation.lastDoctorOrderId;
        }});
    useEffect(()=>{
        setLoader(true);
        if(validate.isEmpty(orderId)){
            props.history.push("/doctorconsultation");
        }
        DoctorCheckoutService().getBookingDetailsForSuccess({ orderId }).then((data) => {
            dispatch({type:REMOVE_DOCTOR_CONSULTATION_CHECKOUT_PARAMS});
            if (validate.isNotEmpty(data) && validate.isNotEmpty(data.statusCode) && "SUCCESS" == data.statusCode) {
                setDataObjectInState(data.dataObject);
            }
            setLoader(false);
        }).catch(e => {
            setLoader(false);
            console.log(e);
        });

    },[])

    const setDataObjectInState = (dataObj) => {
        if (validate.isNotEmpty(dataObj.patientInfo)) {
            setpatientDetails(dataObj.patientInfo);
        }
        if (validate.isNotEmpty(dataObj.doctorServiceInfo)) {
            setdoctorDetails(dataObj.doctorServiceInfo);
        }
        if (validate.isNotEmpty(dataObj.consultationInfo)) {
            setconsultationDetails(dataObj.consultationInfo);
        }
        if (validate.isNotEmpty(dataObj.consultationInfo.consultationType)) {
            let consultationType = dataObj.consultationInfo.consultationType;
            if (consultationType == 'WALKIN')
                setWalkIn(true);
            else
                setWalkIn(false);
        }
        if(validate.isNotEmpty(dataObj) &&  validate.isNotEmpty(dataObj.followUpOrder)){
            setFollowUpOrder(dataObj.followUpOrder);
        }
        if (dataObj.paymentTypeCode === "C") {
            setpaymentAwaited(false);
        } else {
            let gateWayStatus = dataObj.gateWayStatus;
            if (Validate().isEmpty(gateWayStatus)) {
                setpaymentAwaited(true);
            } else {
                if (gateWayStatus === "S") {
                    setpaymentAwaited(false);
                } else {
                    setpaymentAwaited(true);
                }
            }
        }
        setdoctorConsultation(dataObj);
        setLocationObj(dataObj.locality);
    }
    if(loader){
        <DoctorThankyouGhostImages/>
    }

    return (
        <React.Fragment>
            <div>
                <div className={`container-lg container-fluid${isUserAvailable ? "" : ' checkout'}`}>
                    <div className="row">
                        <div className="col-8 pl-0 pr-2 mx-auto">
                            <section className="thank-you-section body-height">
                                <DoctorThankYouHeader isPaymentAwaited={paymentAwaited} cartSummaryObj={prepareCartSummaryObjFromDoctorConsultation(doctorConsultation)} isFollowUpOrder={followUpOrder}/>
                                <div className="row no-gutters pb-3 d-flex">
                                    <div className='col-12 px-0 pb-3 mt-4'>
                                        <DoctorReview patientDetails={patientDetails} doctorDetails={doctorDetails} consultationDetails={consultationDetails}  walkIn={WalkIn} isfromThankYou={true} />
                                    </div>
                                    <div class="col mt-4 px-0 d-flex">
                                        { WalkIn && consultationDetails && consultationDetails.clinicStore &&
                                            <section className="card w-50 border mb-0 mr-3">
                                                <h5 className="legend-title">Clinic Address</h5>
                                                <div className='pt-3'>
                                                    <ShowPickUpStore
                                                    pickStoreName={consultationDetails.clinicStore.name}
                                                    pickUpAddress={consultationDetails.clinicStore.address}
                                                    locationLatLong={consultationDetails.clinicStore.locationLatLong}
                                                    phoneNumber={validate.isNotEmpty(consultationDetails.clinicStore.nurseStationContactNo)?consultationDetails.clinicStore.nurseStationContactNo:consultationDetails.clinicStore.phoneNumber}
                                                    excludeBodyClass={true}
                                                    />
                                                </div>
                                            </section>
                                        }
                                        {!followUpOrder && <DoctorsCartSummary cartSummaryObj={prepareCartSummaryObjFromDoctorConsultation(doctorConsultation)} isfromThankYou={true} />}

                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
            <footer class="footer fixed-bottom mt-auto py-2 pr-3">
                <div class="container px-0">
                    <div class="row align-items-center no-gutters col-8 offset-2 px-0">
                         <div class="col-12 text-right">
                            {isUserAvailable && <button role="button" class="btn brand-secondary mr-3 px-5 rounded-pill custom-btn-lg" onClick={() => props.history.push("/doctorconsultation/bookings")}>My Bookings</button>}
                            <button role="button" class="btn btn-dark px-5 rounded-pill custom-btn-lg" onClick={() => props.history.push("/")}>Go To Home</button>
                        </div>
                    </div>
                </div>
            </footer>
        </React.Fragment>
    );
}

export default DoctorThankYou;