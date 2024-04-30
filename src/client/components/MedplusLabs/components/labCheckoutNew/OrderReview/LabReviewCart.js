import React, { useEffect, useState } from "react";
import Validate from '../../../../../helpers/Validate';
import SelectedTests from "./SelectedTests";
import HomePickupAddress from "./HomePickupAddress";
import LabWalkinCollection from "./LabWalkinCollection";
import LabCheckOutService from "../../../Services/LabCheckoutService";
import LabCartSummary from "../../Common/LabCartSummary";
import ApplyCoupon from "./ApplyCoupon";
import PatientAndDoctorDetails from "../../Common/PatientAndDoctorDetails";
import Alert from "../../../../Common/Alert";
import ReportAddress from "./ReportAddress";
import PatientAddress from "../../../../Labs/Common/PatientAddress";
import OrderReviewGhostImage from "../../../../Checkout/OrderReview/OrderReviewGhostImage";
import MDxPoints from "./MdxPoints";
import { DIAGNOSTICS_URL_PREFIX } from "../../../constants/LabConstants";
const LabReviewCart=(props)=>{

    const labCheckoutService = LabCheckOutService();
    const validate = Validate();
    const [patientDetails, setPatientDetails] = useState();
    const [homeTests, setHomeTests] = useState();
    const [walkInTests, setWalkInTests] = useState();
    const [homeAddress, setHomeAddress] = useState();
    const [labAddress, setLabAddress] = useState();
    const [cartSummary, setCartSummary] = useState({});
    const [couponApplied, setCouponApplied] = useState(null);
    const [reportDeliveryData, setReportDeliveryData] = useState(false);
    const [reportDeliveryCheck, setReportDeliveryCheck] = useState(false);
    const [alertData, setAlertData] = useState({});
    const [openGetPhysicalReportModal, setOpenGetPhysicalReportModal] = useState(false);
    const [initialLoader, setInitialLoader] = useState(true);
    const [isEditReportModel, setEditReportModel] = useState(false);
    const [labMinOrderAmount, setLabMinOrderAmount] = useState(0);
    const [allowSpecialDiscount, setAllowSpecialDiscount] = useState(false);
    const [buttonLoader, setButtonLoader] = useState(false);
    const [mdxFlag, setMdxFlag] = useState();
    const [reportDeliveryChargesBeforeDiscount,setReportDeliveryChargesBeforeDiscount] = useState(0);


    useEffect(()=>{
        getLabCartInfo(mdxFlag);
    },[]);

    const clearError = () => {
        setAlertData({});
    }

    const getLabCartInfo = (mdxFlag) => {
       labCheckoutService.getLabCartInfo(mdxFlag).then((response)=>{
            if(validate.isNotEmpty(response) && validate.isNotEmpty(response.statusCode) && "SUCCESS" == response.statusCode && validate.isNotEmpty(response.responseData)){
                setCartDetailsInState(response.responseData);
            } else if(validate.isNotEmpty(response) && validate.isNotEmpty(response.statusCode) && "WARNING"==response.statusCode && validate.isNotEmpty(response.message)) {
               props.history.push({pathname:`${DIAGNOSTICS_URL_PREFIX}/lab-shopping-cart`,state:{errorMessage:response.message}});
            }else{
                props.history.push(`${DIAGNOSTICS_URL_PREFIX}/lab-shopping-cart`);
            }
            setInitialLoader(false);
        }).catch(function(error) {
            setInitialLoader(false);
            console.log("Error while getting lab cart Info", error);
           props.history.push(`${DIAGNOSTICS_URL_PREFIX}/lab-shopping-cart`);
        }); 
    }

    const setCartDetailsInState= (responseData) => {
        setOpenGetPhysicalReportModal(false);
        setPatientDetails(responseData.patientDetails);
        setWalkInTests(responseData.walkInLabOrderItems);
        setHomeTests(responseData.homeLabOrderItems);
        setHomeAddress(responseData.homeAddress);
        setLabAddress(responseData.labAddress);
        setCartSummary({
            totalPrice: responseData.cartSummary.totalPrice,
            totalAmount: responseData.cartSummary.totalAmount, 
            itemsCount: responseData.cartSummary.itemsCount, 
            totalDiscount: responseData.cartSummary.totalDiscount, 
            minOrderAmount: responseData.cartSummary.minOrderForFreeSampleCollection,
            reportDeliveryCharges: responseData.cartSummary.reportDeliveryCharges,
            collectionCharges: responseData.cartSummary.collectionCharges,
            applicableMdxPoints: responseData.cartSummary.applicableMdxPoints,
            applicableMdxPointsWorth: responseData.cartSummary.applicableMdxPointsWorth,
            applyMdxPointsPayment: responseData.cartSummary.applyMdxPointsPayment,
            customerMdxPoints: responseData.cartSummary.customerMdxPoints,
            collectionChargesMrp: responseData.cartSummary.collectionChargesMrp,
            reportDeliveryChargesMrp: Math.abs(responseData.cartSummary.reportDeliveryChargesMrp),
            totalSavings : responseData.cartSummary.totalSavings,
            reportDeliveryChargesDiscountCouponCode : responseData.cartSummary.reportDeliveryChargesDiscountCouponCode,
            sampleCollectionChargesDiscountCouponCode : responseData.cartSummary.sampleCollectionChargesDiscountCouponCode
        });
        if(validate.isEmpty(responseData.couponApplied) && responseData?.reportDeliveryData?.reportDeliveryCharges > 0){
            setReportDeliveryChargesBeforeDiscount(responseData.reportDeliveryData.reportDeliveryCharges);
        }
        setMdxFlag(responseData.cartSummary.applyMdxPointsPayment ? responseData.cartSummary.applyMdxPointsPayment : false);
        setCouponApplied(responseData.couponApplied);
        let reportDeliveryData = responseData.reportDeliveryData;
        setReportDeliveryData(reportDeliveryData);
        if(reportDeliveryData && reportDeliveryData.homeReportDeliveryAllowed && validate.isNotEmpty(reportDeliveryData.deliveryType) && "HOME" == reportDeliveryData.deliveryType && validate.isNotEmpty(reportDeliveryData.address)){
            setReportDeliveryCheck(true);
        } else {
            setReportDeliveryCheck(false);
        }
        setLabMinOrderAmount(responseData.labMinOrderAmount ? responseData.labMinOrderAmount : 0);
        setAllowSpecialDiscount((validate.isNotEmpty(responseData.couponApplied) &&  responseData.cartSummary.totalAmount <= 0 && responseData.cartSummary.totalDiscount > 0) || (responseData.cartSummary.totalAmount <= 0 && validate.isNotEmpty(responseData.labCartInfo) && responseData.labCartInfo.applyMdxPointsPayment));
        setInitialLoader(false);
    }

    const addReportDeliveryInfo = (type,address) =>{
        setInitialLoader(true);
        let obj;
        if(validate.isNotEmpty(address)){
            obj = {reportDeliveryType:type,reportAddress:JSON.stringify(address).replace(/&/g, "-amp-").replace(/amp;/g," "),removeCouponCode: (validate.isEmpty(cartSummary.sampleCollectionChargesDiscountCouponCode) && validate.isNotEmpty(cartSummary.reportDeliveryChargesDiscountCouponCode)) ? true : false}
        } else {
            obj = {reportDeliveryType:type, removeCouponCode: (validate.isEmpty(cartSummary.sampleCollectionChargesDiscountCouponCode) && validate.isNotEmpty(cartSummary.reportDeliveryChargesDiscountCouponCode)) ? true : false}
        }
        labCheckoutService.addReportDeliveryInfo(obj).then(response=>{
            if(validate.isNotEmpty(response) && validate.isNotEmpty(response.statusCode) && "SUCCESS" == response.statusCode && validate.isNotEmpty(response.responseData)){
                setCartDetailsInState(response.responseData);
                if(validate.isNotEmpty(response.message) && "Success" != response.message){
                    setAlertData({message:response.message,type:'danger'});
                    setCouponApplied(response.responseData.couponApplied);
                }
            } else {
                setAlertData({message:"Something went wrong",type:'danger'});
                setTimeout(() => props.history.push(`${DIAGNOSTICS_URL_PREFIX}/lab-shopping-cart`), 2000);
            }
            setInitialLoader(false);
        }).catch((err)=>{
            setAlertData({message:"Something went wrong",type:'danger'});
            setTimeout(() => props.history.push(`${DIAGNOSTICS_URL_PREFIX}/lab-shopping-cart`), 2000);
            console.log("Error while getting adding report delivery info", err);
            setInitialLoader(false);
        })
    }

    function toggleGetPhysicalReportModal(){
        if(reportDeliveryCheck){
            addReportDeliveryInfo("E");
        }else{
            setEditReportModel(false);
            if(validate.isEmpty(homeAddress)){
                setOpenGetPhysicalReportModal(true);
            }else{
                addReportDeliveryInfo("H",homeAddress);
            }
        }
    }

    const onReportDeliveryCancel=()=>{
        setOpenGetPhysicalReportModal(false);
        if(!isEditReportModel){
            setReportDeliveryCheck(false);
        }
    }

    const proceedPayment = () => {
        props.history.push(`${DIAGNOSTICS_URL_PREFIX}/lab-payment`);
    }

    const submitLabOrderWithoutPayment = () => {
        setButtonLoader(true);
        labCheckoutService.submitLabOrder({paymentType: cartSummary.applyMdxPointsPayment ? 'O' : 'C'}).then((response)=>{
            if(response != null && response.statusCode != null && response.statusCode === "SUCCESS"){
                props.history.replace(`${DIAGNOSTICS_URL_PREFIX}/lab-thank-you`);
            }else if(response != null && response.statusCode != null && response.statusCode === "FAILURE"){
                setButtonLoader(false);
                if("LAB_SLOTS_ALREADY_FILLED" === response.message || "Agent has reached max limit for this slot, Please select different slot OR Agent" === response.message){
                    setAlertData({message:"Selected slot is full, please select another slot",type:'danger'});
                    setTimeout(() => props.history.replace(`${DIAGNOSTICS_URL_PREFIX}/schedule-slot`), 2000);
                }else{
                    setAlertData({message:"System experiencing some problem, Please try after some time",type:'danger'});
                }
            }else{
                setButtonLoader(false);
                setAlertData({message:"Something went wrong",type:'danger'});
            }
        },(err)=>{
            console.log(err);
            setButtonLoader(false);
            setAlertData({message:"Something went wrong",type:'danger'});
        })
    }

    const goBackAction = () => {
        props.history.push(`${DIAGNOSTICS_URL_PREFIX}/schedule-slot`);
    }

    const openEditModel = () => {
       setOpenGetPhysicalReportModal(true);
       setEditReportModel(true);
    }

    const handleMdxUsageClick = () => {
        setInitialLoader(true);
        getLabCartInfo(!mdxFlag);
        setMdxFlag(!mdxFlag);
    }

    return(
        <React.Fragment>
            {alertData && alertData.message && <Alert alertInfo={alertData} onDurationEnd={clearError} duration='5000' />}
            <main role="main" className="container-lg container-fluid">
            {initialLoader && <OrderReviewGhostImage isOrderDetailsLoading={true} />}
              { !initialLoader  && <div className="row px-sm-3">
                    <div className="col-8 pl-0 pr-2">
                        <PatientAndDoctorDetails isReviewCard={true} patientDetails={patientDetails} history={props.history}/>
                        <SelectedTests homeTests={homeTests} walkInTests={walkInTests} cartSummary={cartSummary}/>
                        <HomePickupAddress homeAddress = {homeAddress} homeTests={homeTests}/>
                        <LabWalkinCollection labAddress = {labAddress} walkInTests = {walkInTests}/>
                    </div>
                    <div className="col-4 pl-2 pr-0">
                        <ApplyCoupon history={props.history} couponCode = {couponApplied} setParentState = {(data)=>{setCartDetailsInState(data)}} disableApplyCoupon={cartSummary.applyMdxPointsPayment && validate.isNotEmpty(cartSummary.totalAmount) && cartSummary.totalAmount == 0}/>
                        {cartSummary && (validate.isNotEmpty(cartSummary.customerMdxPoints) && cartSummary.customerMdxPoints > 0) && (validate.isNotEmpty(cartSummary.applicableMdxPointsWorth) && parseFloat(cartSummary.applicableMdxPointsWorth) > 0) && <MDxPoints handleMdxUsageClick={handleMdxUsageClick} mdxFlag={mdxFlag} cartSummary={cartSummary}/>}
                        {cartSummary && <LabCartSummary couponCode = {couponApplied} {...cartSummary} labMinOrderAmount = {labMinOrderAmount} allowSpecialDiscount = {allowSpecialDiscount}/>}
                        {reportDeliveryData && reportDeliveryData.homeReportDeliveryAllowed && reportDeliveryData.homeReportDeliveryAllowed === "Y" &&
                        <React.Fragment>
                            <section class="cart-summary px-3 py-2">
                            <div class="custom-control custom-checkbox font-weight-normal">
                                <input type="checkbox" class="custom-control-input" id="need-physical-copy"  onClick={() => toggleGetPhysicalReportModal()} checked={reportDeliveryCheck} />
                                <label class="custom-control-label pointer small" for="need-physical-copy">I need a physical copy of my reports delivered to my address {Math.abs(parseInt(reportDeliveryChargesBeforeDiscount)) > 0 ?`(₹${Math.abs(parseInt(reportDeliveryChargesBeforeDiscount))})`:``}</label>
                            </div>
                            </section>
                        {openGetPhysicalReportModal && <ReportAddress openpop = {openGetPhysicalReportModal} reportDeliveryData={reportDeliveryData} updateprop={(obj)=>setOpenGetPhysicalReportModal(obj)} addReportDeliveryInfo = {(type,adress)=>addReportDeliveryInfo(type,adress)} onReportDeliveryCancel={()=>onReportDeliveryCancel()} isEditReportModel={isEditReportModel}/>}
                        {validate.isNotEmpty(reportDeliveryData.deliveryType) && "HOME" == reportDeliveryData.deliveryType && reportDeliveryData.address &&
                            <section className="delivery-detail mb-3">
                            <div className="header">
                                <p>Report Delivery Address</p>
                                {validate.isNotEmpty(walkInTests) && <button title="Edit" role="button" aria-label="Edit" className="btn btn-link no-underline text-primary btn-sm mt-n2" onClick={openEditModel}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 18 18" className="align-top mr-2">
                                <g transform="translate(-180.257 -249.084)">
                                    <rect fill="none" width="18" height="18" transform="translate(180.257 249.084)"/>
                                    <g transform="translate(180.258 249.086)">
                                        <path fill="#080808" d="M2.765,18A2.77,2.77,0,0,1,0,15.234V4.341A2.77,2.77,0,0,1,2.765,1.574H6.274a.6.6,0,0,1,0,1.208H2.763A1.566,1.566,0,0,0,1.208,4.346V15.234A1.568,1.568,0,0,0,2.759,16.8H13.648a1.567,1.567,0,0,0,1.564-1.563V11.725a.6.6,0,0,1,1.207,0v3.509A2.769,2.769,0,0,1,13.652,18ZM5.9,12.825a1.043,1.043,0,0,1-.727-1.281l.7-2.466a.605.605,0,0,1,.149-.269L14.177.649a2.265,2.265,0,0,1,3.172,0,2.261,2.261,0,0,1,0,3.174L9.215,11.98a.612.612,0,0,1-.278.152l-2.445.688-.313.042A1.067,1.067,0,0,1,5.9,12.825ZM7,9.528l-.6,2.041,2.022-.549.022-.007,6.9-6.922.063-.064L13.944,2.563Zm8.083-8.069-.269.242,1.452,1.454.215-.173.009-.008a1.035,1.035,0,0,0-1.407-1.514Z" transform="translate(-0.001 -0.001)"/>
                                    </g>
                                </g>
                                </svg>
                                Edit
                                </button>}
                            </div>
                            <div className="body">
                                <PatientAddress isHeaderRequired={false} 
                                    firstName={reportDeliveryData.address.firstName}
                                    lastName={reportDeliveryData.address.lastName}
                                    address1={reportDeliveryData.address.addressLine1}
                                    address2={reportDeliveryData.address.addressLine2}
                                    city={reportDeliveryData.address.city}
                                    state={reportDeliveryData.address.state}
                                    pinCode={reportDeliveryData.address.pincode}
                                    mobile={reportDeliveryData.address.mobileNo}
                                />
                            </div>
                            </section>
                        }
                        </React.Fragment>
                        }
                    </div>
                </div>}
            </main>
            <footer class="footer fixed-bottom mt-auto py-2">
                <div class="container-lg container-fluid px-sm-3 px-0">
                    <div class="row align-items-center no-gutters">
                        <div className="col-6">
                            {!allowSpecialDiscount && validate.isNotEmpty(labMinOrderAmount) && validate.isNotEmpty(cartSummary) && labMinOrderAmount > 0 && (parseFloat(cartSummary.totalAmount) < parseFloat(labMinOrderAmount)) &&
                                <p className="alert alert-warning alert-sm px-2 py-1 m-0"><strong>Note:</strong> Minimum order amount should be above ₹ {labMinOrderAmount}</p>
                            }
                        </div>
                        <div class="col-6 text-right">
                            <button type="button" role="button" class="brand-secondary btn px-5 rounded-pill custom-btn-lg" onClick={() => goBackAction()}>Back</button>
                            {!allowSpecialDiscount && validate.isNotEmpty(labMinOrderAmount) && validate.isNotEmpty(cartSummary) && labMinOrderAmount > 0 && (parseFloat(cartSummary.totalAmount) >= parseFloat(labMinOrderAmount)) &&
                            <button type="submit" role="button" className="btn btn-brand-gradient rounded-pill px-5  ml-3 custom-btn-lg" onClick={proceedPayment}> Proceed To Payments</button>}
                            {allowSpecialDiscount && <button disabled={buttonLoader} type="submit" role="button" className="btn btn-brand-gradient ml-3 px-5 rounded-pill custom-btn-lg" onClick={submitLabOrderWithoutPayment}> Submit order</button>}
                        </div>
                    </div>
                </div>
            </footer>
        </React.Fragment>
    )
}
export default LabReviewCart