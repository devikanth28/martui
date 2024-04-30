import React, { useState, useEffect } from "react";
import Validate from "../../../../helpers/Validate";
import DoctorCheckoutService from "../../../services/DoctorCheckoutService";
import ApplyCoupon from "../../../../components/MedplusLabs/components/labCheckoutNew/OrderReview/ApplyCoupon";
import PaymentOptions from "./PaymentOptions";
import {Alert, ALERT_TYPE_ERROR, ALERT_TYPE_SUCCESS, ALERT_TYPE_INFO } from "../../../../components/Common/Alert";
import DoctorsCartSummary from "../../common/DoctorsCartSummary";
import DoctorReview from "../../moduleComponents/Checkout/DoctorReview";
import { prepareCartSummaryObjFromDoctorConsultation } from "../../../helper/DoctorConsulationHelper";
import HiddenForm from "../../../../components/Checkout/Payments/HiddenForm";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { LAST_DOCTOR_ORDER_ID, ADD_DOCTOR_CONSULTATION_INFO } from "../../../redux/DoctorConsultationReducer";
import { ErrorMessagesMap, VISIT_TYPE_WALK_IN, CHECKOUT_TYPE_CLINIC_SEARCH } from "../../../constants/DoctorConsultationConstants";
import ForceCancelConfirmationModal from "../../../../commonComponents/ForceCancelConfirmationModal";
import ShowPickUpStore from "../../../../components/Common/ShowPickUpStore";
import LocalDB from "../../../../DataBase/LocalDB";

const ConsultationPayment =(props)=>{
    const validate = Validate();
    const doctorCheckoutService = DoctorCheckoutService();
    const dispatch = useDispatch();
    //retry variables
    const orderId = props.match.params.orderId;
    const [isInitiatePayment, setIsInitiatePayment] = useState(false);
    const [retryCartId, setRetryCartId] = useState("");
    const [isRetryPayment, setIsRetryPayment] = useState(false);
    //review page variables
    const [consultationInfo, setConsultationInfo] = useState({});
    const [walkIn, setWalkIn] = useState(false);
    const [disableOrdering, setDisableOrdering]= useState(false);
    const [isAllowedForFreeConsultation, setAllowedForFreeConsultation] = useState(false);
    const [minimumConsultationAmount, setMinimumConsultationAmount]= useState(0.00);
    const [couponText, setCouponText] = useState("");
    const [LocationObj, setLocationObj] = useState({});
    // payment variables
    const [paymentOptions, setPaymentOptions] = useState({});
    const [formData, setFormData] = useState(null);
    const [selectedOnlineMode, setSelectedOnlineMode] = useState("");
    const [isCODOrderBtnLoading, setCODOrderBtnLoading] = useState(false);
    const userInfo = useSelector(state => state.userInfo ? state.userInfo.userInfo ? state.userInfo.userInfo : {} : {} );
    const userContactDetails = useSelector(state => state.userInfo ? state.userInfo.userContactDetails ? state.userInfo.userContactDetails : {} : {});
    const locality = useSelector(state => state.locality ? state.locality ? state.locality.selectedLocality : {} : {});
    const checkoutTypeFromRedux = useSelector(state => state.doctorConsultation && state.doctorConsultation.checkoutType ? state.doctorConsultation.checkoutType : null);
    const consultationTypeFromRedux = useSelector(state => state.doctorConsultation && state.doctorConsultation.consultationType ? state.doctorConsultation.consultationType : null);
    const [paymentOptionsLoader, setPaymentOptionsLoader] = useState(false);
    //force cance confirmation modal
    const [openModal, setOpenModal] = useState(false);

    const [alertData, setAlertData] = useState({});
    const [initialBackDropLoader, setinitialBackDropLoader] = useState(true);
    
    useEffect(() => {
        setinitialBackDropLoader(true);
        if(props.location && props.location.errorMsg) {
            setAlertData({ message: props.location.errorMsg, type: ALERT_TYPE_ERROR});
        }
        if(validate.isNotEmpty(orderId)){
            getBookingDetailsForRetry(orderId);
        }else{
            getBookingDetailsForReview();
        }
    }, []);

    const getBookingDetailsForRetry = (orderId)=>{
        setinitialBackDropLoader(true);
        doctorCheckoutService.getDoctorConsultationForRetry({"orderId":orderId}).then(data => {
            setinitialBackDropLoader(false);
            if(validate.isNotEmpty(data) && "SUCCESS" === data.statusCode && validate.isNotEmpty(data.dataObject)){
                setReviewPageData(data.dataObject, false);
                setMinimumConsultationAmount(0);
                setRetryCartId(data.dataObject.DOCTOR_CONSULTATION.cartId);
                if(data.message === "RETRY"){
                    setIsRetryPayment(true);
                }else if(data.message === "INITIATE"){
                    setIsInitiatePayment(true);
                }
                getPaymentOptions();
            } else if(validate.isNotEmpty(data) && data.message) {
                if(data.message === "NO DOCTOR CONSULTATION FOUND"){
                    setAlertData({message:"We could not find any doctor consultation.",type:"danger"});
                }else if(data.message === "TRANSACTION_AWAITING"){
                    setAlertData({message:"Your recent transaction is awaiting for payment confirmation. Please check after 60 minutes.",type:"danger"});
                }else if(data.message === "TRANSACTION_COMPLETED"){
                    setAlertData({message:"We have already confirmed your order and are processing it.",type:"danger"});
                }else if(data.message === "INVALID_CUSTOMERID" || data.message === "INVALID_TOKEN"){
                    setAlertData({message:"It appears that this order does not belong to you, Please Verify", type:"danger"});
                }else{
                    setAlertData({ message: data.message ? data.message : "We apologize, but we are currently unable to process your request. Please try again later.", type: 'danger'});
                }
                setTimeout(() => {
                    props.history.push("/doctorconsultation");
                }, 5000);
            }else{
                props.history.push("/doctorconsultation");     
            }
        }).catch(err=>{
            console.log('retry error', err);
            props.history.push("/doctorconsultation");
        });
    }

    const getBookingDetailsForReview=()=>{
        setinitialBackDropLoader(true);
        doctorCheckoutService.getDoctorConsultationForReview().then(data => {
            if(validate.isNotEmpty(data) &&"SUCCESS" === data.statusCode && validate.isNotEmpty(data.dataObject)){
                setReviewPageData(data.dataObject, false);
                getPaymentOptions();
            }else{
                setAlertData({ message: data.message, type: ALERT_TYPE_ERROR});
                props.history.push("/doctorconsultation/schedule-consultation");
            }
            setinitialBackDropLoader(false);
        }).catch(err=>{
            console.log('err',err);
            setinitialBackDropLoader(false);
            props.history.push("/doctorconsultation/schedule-consultation");
        });
    }

    const getPaymentOptions=()=>{
        setPaymentOptionsLoader(true);
        doctorCheckoutService.getPaymentMethods().then(data => {
            if(validate.isNotEmpty(data) &&"SUCCESS" === data.statusCode && validate.isNotEmpty(data.dataObject)){
                setPaymentOptions(data.dataObject);
            }
            setPaymentOptionsLoader(false);
        }).catch(err=>{
            setPaymentOptionsLoader(false);
            props.history.push("/doctorconsultation/schedule-consultation");
        });
    }

    const setReviewPageData = (data, isFromApplyCoupon)=> {
        setConsultationInfo(data.DOCTOR_CONSULTATION);
        setDisableOrdering(data.DISABLE_ORDERING);
        setMinimumConsultationAmount(data.MINIMUM_AMOUNT_VALUE);
        setCouponText(data.DOCTOR_CONSULTATION.couponCode);
        setLocationObj(data.DOCTOR_CONSULTATION.locality);
        setAllowedForFreeConsultation(validate.isNotEmpty(data.ALLOWED_FOR_FREE_CONSULTATION) ? data.ALLOWED_FOR_FREE_CONSULTATION : false);
        if (validate.isNotEmpty(data.DOCTOR_CONSULTATION.consultationInfo.consultationType)) {
            let consultationType = data.DOCTOR_CONSULTATION.consultationInfo.consultationType;
            if (consultationType == 'WALKIN')
                setWalkIn(true);
            else
                setWalkIn(false);
        }
        if(isFromApplyCoupon) {
            dispatch({type: ADD_DOCTOR_CONSULTATION_INFO, data: data.DOCTOR_CONSULTATION});
        }
    }

    const createBooking = (paymentType, paymentMode, captchaCode) => {
        paymentType == "C" ? setCODOrderBtnLoading(true) : setSelectedOnlineMode(paymentMode);
        if(isRetryPayment){
            if (Validate().isEmpty(retryCartId)) {
                setAlertData({ message: "Please select Payment Mode"});
                return;
            }
            doctorCheckoutService.retryPaymentForConsultation({paymentType, "cartId" : retryCartId,CAPTCHA_CODE : captchaCode}).then(data => {
                handleResponse(data, paymentType, paymentMode);
            }).catch(err=>{
                setAlertData({message:"Unable to do retry payment",type:"danger"});
                setCODOrderBtnLoading(false);
                setSelectedOnlineMode("");
            });
        } else {
            doctorCheckoutService.createBookingForConsultation({paymentType, initiatePayment : isInitiatePayment, CAPTCHA_CODE : captchaCode}).then(data => {
                handleResponse(data, paymentType, paymentMode);
            }).catch(err=>{
                setCODOrderBtnLoading(false);
                setSelectedOnlineMode("");
                setAlertData({message:"Unable to create order",type:ALERT_TYPE_ERROR});
            });
        }
    }

    const handleResponse = (data, paymentType, paymentMode) => {
        setCODOrderBtnLoading(false);
        setSelectedOnlineMode("");
        if(data.statusCode === "SUCCESS"){
            dispatch({type:LAST_DOCTOR_ORDER_ID,data:data.dataObject.orderId});
            if(paymentType === "C"){
                props.history.push("/doctorconsultation/thankyou");
            }else{
                handlePaymentSubmitData(data.dataObject,paymentMode);
            }
        }else{
            if(data.message === "INVALID_CAPTCHA"){
                setAlertData({message:ErrorMessagesMap[data.message], type:ALERT_TYPE_ERROR});
            } else if(data.message === "SLOT_NOT_AVAILABLE"){
                setAlertData({message:ErrorMessagesMap[data.message],type:ALERT_TYPE_ERROR})
                setTimeout(()=>{
                    props.history.replace("/doctorconsultation/schedule-consultation");
                },2000)
            }else if(data.message === "NO DOCTOR CONSULTATION FOUND"){
                setAlertData({message:"We could not find any doctor consultation.",type:ALERT_TYPE_ERROR})
                setTimeout(()=>{
                    props.history.replace("/doctorconsultation");
                },2000) 

            }else if(validate.isNotEmpty(ErrorMessagesMap[data.message])){
                setAlertData({message:ErrorMessagesMap[data.message],type:ALERT_TYPE_ERROR})
            }else{
                setAlertData({message : data.message,type:ALERT_TYPE_ERROR});
            }
        }
    }

    const handlePaymentSubmitData = (data, paymentMode) => {
        var formData = {};
        var inputArray = [];
        var formValues = {
            "formId": "paymentForm",
            "formAction": `${process.env.API_URL}doctorconsultationRequestPayment`,
            "formMethod": "post",
            "formStyle": { display: 'none' }
        };
        inputArray.push({"name":"tokenId","value":LocalDB.getValue("SESSIONID")});
        inputArray.push({"name":"customerId", value : LocalDB.getValue("customerId")});
        inputArray.push({"name":"instrument","value":paymentMode});
        inputArray.push({"name":"referenceId","value":data.cartId});
        inputArray.push({"name":"amount","value":parseFloat(data.grandTotal).toFixed(2)});
        inputArray.push({"name":"company","value":"optival"});
        inputArray.push({"name":"userId","value":Validate().isNotEmpty(userInfo.userLoginId)?userInfo.userLoginId:data.customerId});
        inputArray.push({"name":"mobileNo","value":userContactDetails.shippingContactNumber});
        inputArray.push({"name":"customerId","value":data.customerId});
        inputArray.push({"name":"customerName","value":userInfo.firstName});
        inputArray.push({"name":"pincode","value":Validate().isNotEmpty(userContactDetails.pincode)?userContactDetails.pincode:locality.pincode});
        inputArray.push({"name":"state","value":Validate().isNotEmpty(userContactDetails.state)?userContactDetails.state:locality.state});
        inputArray.push({"name":"city","value":Validate().isNotEmpty(userContactDetails.city)?userContactDetails.city:locality.city});
        inputArray.push({"name":"country","value":"IND"});
        inputArray.push({"name":"address","value":Validate().isNotEmpty(userContactDetails.addressLine)?userContactDetails.addressLine : "IND"});
        formData = { ...formValues, inputArray: inputArray };
        setFormData(formData)
    }

    const handleBack = () => {
        if(isRetryPayment){
            setOpenModal(true);
        } else {
            if((validate.isNotEmpty(consultationTypeFromRedux) && VISIT_TYPE_WALK_IN == consultationTypeFromRedux) && ( validate.isNotEmpty(checkoutTypeFromRedux) && CHECKOUT_TYPE_CLINIC_SEARCH != checkoutTypeFromRedux)) {
                props.history.push("/doctorconsultation/schedule-slot");
            } else {
                props.history.push("/doctorconsultation/schedule-consultation");
            }
        }
    }

    const forceCancelTheOrder = () => {
        doctorCheckoutService.forceCancelDoctorConsultation({orderId:orderId}).then(data=>{
            if(validate.isNotEmpty(data) && validate.isNotEmpty(data.statusCode) && "SUCCESS" === data.statusCode){
                props.history.replace("/doctorconsultation");    
            }else{
                console.log(data);
            }
        }).catch(function(error){
            console.error(error);
            props.history.replace("/doctorconsultation");
        });
    }

    if(formData){
        return (
            <HiddenForm formData = {formData} />
        )
    }

    if(initialBackDropLoader){
        return(
            <div>
                <div class="container-lg container-fluid">
                    <div class="row px-sm-3">
                        <div class="col-8 pl-0 pr-2">
                            <section class="">
                                <div class="">
                                    <div class="ph-item ph-row py-0 py-4">
                                        <div class="ph-col-6"></div>
                                    </div>
                                </div>
                                <div class="d-flex justify-content-between pb-3 pt-2 px-3">
                                    <div class="col-3">
                                        <div class="ph-item ph-row py-0">
                                            <div class="mb-2 ph-col-12"></div>
                                        </div>
                                        <div class="ph-item ph-row py-0">
                                            <div class="ph-col-12"></div>
                                        </div>
                                        <div class="ph-item ph-row py-0">
                                            <div class="mb-2 ph-col-12"></div>
                                        </div>
                                        <div class="ph-item ph-row py-0">
                                            <div class="mb-2 ph-col-12"></div>
                                        </div>
                                    </div>
                                    <div class="vertical-hr mx-2"></div>
                                    <div class="col-3">
                                        <div class="ph-item ph-row py-0">
                                            <div class="mb-2 ph-col-12"></div>
                                        </div>
                                        <div class="ph-item ph-row py-0">
                                            <div class="ph-col-12"></div>
                                        </div>
                                        <div class="ph-item ph-row py-0">
                                            <div class="mb-2 ph-col-12"></div>
                                        </div>
                                        <div class="ph-item ph-row py-0">
                                            <div class="ph-col-12"></div>
                                        </div>
                                    </div>
                                    <div class="vertical-hr mx-2"></div>
                                    <div class="col-3">
                                        <div class="ph-item ph-row py-0">
                                            <div class="mb-2 ph-col-12"></div>
                                        </div>
                                        <div class="ph-item ph-row py-0">
                                            <div class="ph-col-12"></div>
                                        </div>
                                        <div class="ph-item ph-row py-0">
                                            <div class="mb-2 ph-col-12"></div>
                                        </div>
                                        <div class="ph-item ph-row py-0">
                                            <div class="ph-col-12"></div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                        <div class="col-4 pl-2 pr-0">
                            <section class="border-secondary select-offers">
                                <div class="">
                                    <div class="mb-0 ml-3 ph-item ph-row py-3">
                                        <div class="ph-col-6"></div>
                                    </div>
                                </div>
                                <div class="px-3 py-2">
                                    <div class="ph-item ph-row py-0">
                                        <div class="ph-col-12" style={{"height":" 2rem"}}></div>
                                    </div>
                                </div>
                            </section>
                            <section class="cart-summary">
                                <div class="ph-item ph-row py-0 mb-3 ">
                                    <div class="ph-col-6"></div>
                                </div>
                                <div class="card order-summary">
                                    <div class="pt-3">
                                        <div>
                                            <div class="ph-item ph-row py-0">
                                                <div class="ph-col-2"></div>
                                                <div class="ph-col-8 empty"></div>
                                                <div class="ph-col-2"></div>
                                            </div>
                                            <div class="ph-item ph-row py-0">
                                                <div class="ph-col-2"></div>
                                                <div class="ph-col-8 empty"></div>
                                                <div class="ph-col-2"></div>
                                            </div>
                                            <div class="ph-item ph-row py-0">
                                                <div class="ph-col-2"></div>
                                                <div class="ph-col-8 empty"></div>
                                                <div class="ph-col-2"></div>
                                            </div>
                                        </div>
                                        <div class="footer border-top font-lg success-bg px-0">
                                            <div class="mt-2 ph-item ph-row py-0">
                                                <div class="ph-col-2"></div>
                                                <div class="ph-col-8 empty"></div>
                                                <div class="ph-col-2"></div>
                                            </div>
                                            <div class="ph-item ph-row py-0">
                                                <div class="ph-col-2"></div>
                                                <div class="ph-col-8 empty"></div>
                                                <div class="ph-col-2"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <React.Fragment>
           {alertData && <Alert alertInfo={alertData} duration={5000} onDurationEnd={setAlertData} />}
           <ForceCancelConfirmationModal openModal = {openModal} toggleModel={()=>{setOpenModal(!openModal)}} 
            handleConfirmation={(flag)=>{
                setOpenModal(false);
                if(flag=='true'){
                    forceCancelTheOrder();
                }else{
                    return false;
                }
            }}/>
            <div className="container-lg container-fluid">
                <div className="row px-sm-3">
                    <div className="col-8 pl-0 pr-2">
                        <DoctorReview patientDetails={consultationInfo.patientInfo} doctorDetails={consultationInfo.doctorServiceInfo} consultationDetails={consultationInfo.consultationInfo} locationObj={LocationObj} walkIn={walkIn}/>
                        {(!disableOrdering && !isAllowedForFreeConsultation) &&
                            <PaymentOptions paymentOptionsLoader={paymentOptionsLoader || initialBackDropLoader} isCODOrderBtnLoading={isCODOrderBtnLoading} selectedOnlineMode= {selectedOnlineMode} handleBooking={(paymentType,selectedPaymentMode,captchaCode)=>createBooking(paymentType,selectedPaymentMode,captchaCode)} paymentOptions={paymentOptions} isRetryPayment= {isRetryPayment} isCodAllowed={walkIn} history={props.history}/>
                        }
                        {disableOrdering && !isAllowedForFreeConsultation &&
                            <p class="mb-0 text-center">Minimum Consultation amount is Rs {parseFloat(minimumConsultationAmount).toFixed(2)}</p>
                        }
                    </div>
                    <div className="col-4 pl-2 pr-0">
                        {!isRetryPayment && 
                            <ApplyCoupon history={props.history} couponCode={couponText} setParentState={(data) => setReviewPageData(data, true)} isDoctorConsultation={true}/>
                        }
                        <DoctorsCartSummary cartSummaryObj={prepareCartSummaryObjFromDoctorConsultation(consultationInfo)}/>
                        {walkIn && consultationInfo && consultationInfo.consultationInfo && consultationInfo.consultationInfo.clinicStore &&
                            <section className="delivery-detail">
                                <div className="header">
                                    <p>Clinic Address</p>
                                    <span className="badge-title success right">Walk In</span>
                                </div>
                                <ShowPickUpStore
                                pickStoreName={consultationInfo.consultationInfo.clinicStore.name}
                                pickUpAddress={consultationInfo.consultationInfo.clinicStore.address}
                                locationLatLong={consultationInfo.consultationInfo.clinicStore.locationLatLong}
                                phoneNumber={validate.isNotEmpty(consultationInfo.consultationInfo.clinicStore.nurseStationContactNo)?consultationInfo.consultationInfo.clinicStore.nurseStationContactNo:consultationInfo.consultationInfo.clinicStore.phoneNumber}
                                />
                            </section>
                        }
                    </div>
                </div>
            </div>
            <footer className="footer fixed-bottom mt-auto py-2">
                <div className="container-lg container-fluid px-0 px-sm-3">
                    <div className="row align-items-center no-gutters">
                    	<div className="col-12 text-right">
                            <button role="button" onClick={()=>handleBack()} className="btn brand-secondary px-5 rounded-pill custom-btn-lg">Back</button>
                            {/* !isRetryPayment && 
                                <button role="button" onClick={()=>props.history.push("/doctorconsultation")} className="btn btn-dark px-5 ml-3">Browse Other Doctors</button>
                            */}
                            {isAllowedForFreeConsultation && 
                                <button role="button" className="btn btn-brand-gradient rounded-pill px-5 ml-3 custom-btn-lg" onClick={() => createBooking("C", "COD", null)}>Confirm &amp; Proceed</button>
                            }
                        </div>
                    </div>
                </div>
            </footer>
        </React.Fragment>
    );
}

export default ConsultationPayment;