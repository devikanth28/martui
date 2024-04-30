import React, { useState, useEffect } from 'react';
import Validate from '../../../helpers/Validate';
import LabCheckoutService from "../../../services/LabCheckoutService";
import { Collapse } from 'reactstrap';
import ThankYouGhostImage from '../../Checkout/Thankyou/ThankYouGhostImage';
import moment from "moment";
import Alert, { ALERT_TYPE_ERROR } from '../../Common/Alert';
import ShowPickUpStore from '../../Common/ShowPickUpStore';
import CONFIG from '../../../constants/ServerConfig';
import LabCheckoutAction from '../../../../redux/action/LabCheckoutAction';
import { getDisplayableAge } from '../../../helpers/CommonUtil';

const validate = Validate();
const LabsThankyou = (props) => {

    const labCheckoutService = LabCheckoutService();
    const [labOrderDetails,setLabOrderDetails] = useState({});
    const [patientDetails,setPatientDetails] = useState({});
    const [labOrderItems,setLabOrderItems] = useState({});
    const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
    const [isThankYouLoading, setThankYouLoading] = useState(false);
    const [collectionCenterInfo,setCollectionCenterInfo] = useState({})
    const [patientAddress , setPatientAddress] = useState({});
    const [itemsCount,setItemsCount] =useState(0);
   
    const labCheckoutAction = LabCheckoutAction();

    useEffect(() => {
        getLabOrderSummary();
    },[])

    const getLabOrderSummary = () => {
        setThankYouLoading(true);
        labCheckoutService.getLabOrderSummaryDetails().then(response => {
            if(validate.isNotEmpty(response) && response.statusCode == 'SUCCESS' && validate.isNotEmpty(response.responseData)) {
                let data = response.responseData;
                if(validate.isNotEmpty(data.labOrderDetails)){
                    labCheckoutAction.clearLabShoppingCart();
                    let laborderData = data.labOrderDetails;
                    setLabOrderDetails(laborderData);
                    if(validate.isNotEmpty(data.collectionCenterInfo) && validate.isNotEmpty(data.collectionCenterInfo[0])){
                        setCollectionCenterInfo(data.collectionCenterInfo[0]);
                    }
                    if(laborderData.labOrderPatients && laborderData.labOrderPatients[0] && validate.isNotEmpty(laborderData.labOrderPatients[0].customerPatient)){
                        setPatientDetails(laborderData.labOrderPatients[0].customerPatient);
                    }
                    if(laborderData.labOrderPatients && laborderData.labOrderPatients[0] && validate.isNotEmpty(laborderData.labOrderPatients[0].labOrderItems)){
                        setLabOrderItems(laborderData.labOrderPatients[0].labOrderItems);
                        let labOrderItems = laborderData.labOrderPatients[0].labOrderItems;
                        let productCount = 0;
                        let profileIds = [];
                        labOrderItems.map(item => {
                                 if(item.profile){
                                    if(profileIds.indexOf(item.profileId) === -1){
                                       profileIds.push(item.profileId);
                                       productCount += 1;
                                    }
                                 }else{
                                    productCount += 1;
                                 }
                              });
                        setItemsCount(productCount);
                    }
                    if(validate.isNotEmpty(laborderData.labOrderAddress)){
                        setPatientAddress(laborderData.labOrderAddress)
                    }
                }
            }else if(validate.isNotEmpty(response) && response.statusCode === "FAILURE"){
                setAlertInfo({message:response.message, type:ALERT_TYPE_ERROR});
            }else{
                setAlertInfo({message:"System experiencing some problem, Please try after some time", type:ALERT_TYPE_ERROR});
            }
            setThankYouLoading(false);
        }).catch( error => {
            setThankYouLoading(false);
            console.log(error);
        });
    }

    const goToHome = () => {
        window.location.href = CONFIG.REDIRECT_HOME_URL;
    }

    let paymentClass = "success";
    let paymentHeaderMessage = "Thank You..!";
    let paymentMessage = "Your order is being processed";
    if(labOrderDetails && labOrderDetails.paymentType === "O" && labOrderDetails.gateWayStatus === "I"){
        paymentClass = "awaited";
        paymentHeaderMessage = "Payment is Awaited";
        paymentMessage = "Order will be confirmed once payment is successfull";
    }

    return(
        <React.Fragment>
        <Alert alertInfo={alertInfo} duration={5000} onDurationEnd={setAlertInfo}/>
        <main className="container-lg container-fluid" role="main">
            { isThankYouLoading && <ThankYouGhostImage  isThankYouLoading={true} isRefillHeader={false}/>}
            { !isThankYouLoading && validate.isNotEmpty(labOrderDetails) &&
            <div className="row px-sm-3">
                <div className={`success-animation d-none`}>
                    <div className="success-tick-container fadeIn animated delay01s">
                        <div>
                            <svg className="check-ani" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.2 130.2" height="130">
                                <circle className="path circle1" fill="none" stroke="#08ce73" stroke-width="6" stroke-miterlimit="10" cx="65.1" cy="65.1" r="62.1"></circle>
                                <polyline className="path check" fill="none" stroke="#08ce73" stroke-width="6" stroke-linecap="round" stroke-miterlimit="10" points="100.2,40.2 51.5,88.8 29.8,67.5 "></polyline>
                            </svg>
                            <h2>Done</h2>
                            <h3>Order successfully placed</h3>
                        </div>
                    </div>
                </div>
                <div className="col-8 pl-0 pr-2 mx-auto">
                    <section className="thank-you-section body-height-single-nav-no-footer">
                        <div className={`status-container ${paymentClass}`}>
                            <span></span>
                            <h2>{paymentHeaderMessage}</h2>
                            <p>{paymentMessage}</p>
                        </div>
                        <div className="row no-gutters px-sm-3">
                            {validate.isNotEmpty(patientDetails) && <PatientDoctorSlotInfo labOrderItems= {labOrderItems} patientDetails= {patientDetails}/>}
                            <CollectionDetails patientAddress = {patientAddress} collectionCenterInfo = {collectionCenterInfo} visitType = {labOrderDetails.visitType}/>
                            {validate.isNotEmpty(labOrderDetails) && <LabOrderSummary labOrderDetails = {labOrderDetails} itemsCount = {itemsCount}/>}
                        </div>
                        {validate.isNotEmpty(labOrderItems) && <OrderItemDetails labOrderItems = {labOrderItems} displayOrderId={labOrderDetails.displayOrderId}/>}
                    </section>
                </div>
            </div>}
        </main>
        { !isThankYouLoading  && 
            <footer className="footer fixed-bottom mt-auto py-2" style={{paddingRight: "15px"}}>
                <div className="container-lg container-fluid  px-0 px-sm-3">
                    <div className="row align-items-center no-gutters">
                        <div className="col-12 text-right">
                            <button type="button" className="brand-secondary btn px-5 rounded-pill" onClick={goToHome}>Continue Shopping</button>
                        </div>
                    </div>
                </div>
            </footer>
        }
        </React.Fragment>
    )
}

const PatientDoctorSlotInfo = (props) => {

    let patientDetails = props.patientDetails;
    let labOrderItems = props.labOrderItems;

    const getTimeSlot = () => {
        if(labOrderItems && validate.isNotEmpty(labOrderItems[0]) && validate.isNotEmpty(labOrderItems[0].labOrderItemSlot)) {
            let slotInfo = labOrderItems[0].labOrderItemSlot;
            if(validate.isNotEmpty(slotInfo.date)){
                let date =  moment(slotInfo.date).format("MMM DD, YYYY");
                let timeSlot = slotInfo.labTimeSlot && slotInfo.labTimeSlot.name 
                return `${date}(${timeSlot})`;
            }
        }
    }
    const getAgeGender = () => {
        let ageGender = "";
        let gender = {"M":"Male","F":"Female"};
        if(validate.isNotEmpty(patientDetails.dateOfBirth)){
            ageGender += getDisplayableAge(patientDetails.dateOfBirth);
        }
        if(validate.isNotEmpty(patientDetails.gender) && validate.isNotEmpty(gender[patientDetails.gender])){
            ageGender += gender[patientDetails.gender];
        }
        return ageGender;
    };

    return(
        <div className="col-12 px-0 pb-3 mt-4">
            <div class="card pt-4">
                <h6 class="legend-title">Patient, Doctor &amp; Schedule Slot Details</h6>
                <div class="body">
                    <div class="row mx-0 px-0">
                        <div class="col-4 px-0">
                            <small class="mb-2 d-block text-secondary mt-2">Patient Info</small>
                            {validate.isNotEmpty(patientDetails.patientName) && <p class="h6 font-weight-normal">Name: &nbsp;<strong>{patientDetails.patientName}</strong></p>}
                            <p class="font-weight-normal h6">Age/Gender: &nbsp;<strong>{getAgeGender()}</strong></p>
                        </div>
                        {validate.isNotEmpty(patientDetails.doctorName) && <div class="col-4 px-0">
                            <small class="mb-2 d-block text-secondary mt-2">Doctor Name</small>
                            <p class="h6 font-weight-normal"><strong>{patientDetails.doctorName}</strong></p>
                        </div>}
                        {validate.isNotEmpty(labOrderItems) && validate.isNotEmpty(labOrderItems[0] && validate.isNotEmpty(labOrderItems[0].labOrderItemSlot)) && <div class="col-4 px-0">
                            <small class="mb-2 d-block text-secondary mt-2">Scheduled Slot</small>
                            <p class="h6 font-weight-normal"><strong>{getTimeSlot()}</strong></p>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

const CollectionDetails = (props) => {  
    let patientAddress = props.patientAddress;
    let collectionCenterInfo = props.collectionCenterInfo;  
    return (
        <div class="col-6 mt-4 pr-2">
            <div class="card pt-4">
                <h6 class="legend-title">Collection Details</h6>
                {props.visitType == "1" ? <React.Fragment>
                    <p class="text-success mb-0 mt-2 font-weight-bold">Home Sample Pickup</p>
                   <address class="no-select pt-2 p-0">
                        <p><span>Customer Name: </span><span class="font-weight-normal">{patientAddress.firstName}{patientAddress.lastName} </span></p>
                        <p><span>Address:</span><span class="font-weight-normal">{patientAddress.addressLine1}, {patientAddress.addressLine2},{patientAddress.city} {patientAddress.state}, {patientAddress.pincode}</span></p>
                        {validate.isNotEmpty(patientAddress.emaild) && <p><span>Email:</span><span class="font-weight-normal text-info">{patientAddress.emaild}</span></p>}
                        {validate.isNotEmpty(patientAddress.mobileNo) && <p><span>Mobile:</span><span class="font-weight-normal">+91 {patientAddress.mobileNo}</span></p>}
                    </address> 
                </React.Fragment> : props.visitType == "2" &&
                <React.Fragment>
                    <p class="text-success mb-2 mt-2 font-weight-bold">Sample Collection Center</p>
                    <ShowPickUpStore pickUpAddress={collectionCenterInfo.address} locationLatLong={collectionCenterInfo.locationLatLong} pickStoreName={collectionCenterInfo.name} phoneNumber={collectionCenterInfo.phoneNumber} isSmallAddressRequired={false} excludeBodyClass={true}/>
                </React.Fragment>}
            </div>
        </div>
    )
}
                            
const LabOrderSummary = (props) => {
    let labOrderDetails = props.labOrderDetails;
    let totalPrice = labOrderDetails.totalPrice;
    let totalAmount = labOrderDetails.totalAmount;
    let couponData = labOrderDetails.coupons && labOrderDetails.coupons[0] ? labOrderDetails.coupons[0] : "";
    let reportDeliveryCharges = labOrderDetails.deliveryTypeAmountOff ? Math.abs(labOrderDetails.deliveryTypeAmountOff) : 0;
    let paymentType = labOrderDetails.paymentType ? labOrderDetails.paymentType == "C" ? "COD" : "Prepaid" : "";
    let totalDiscount = labOrderDetails.totalDiscount;
    let itemsCount = props.itemsCount;
    let collectionCharges = labOrderDetails.collectionCharges ? labOrderDetails.collectionCharges : 0;
    return (                       
        <div class="col-6 mt-4 pl-2">
            <div class="card order-summary">
                <h5 class="legend-title">Order Summary</h5>
                <div class="pt-3">
                    {validate.isNotEmpty(totalPrice) &&  <p>
                        <span>Cart MRP Total</span>
                       <span><strong class="rupee">&#x20B9;</strong> &nbsp;{parseFloat(totalPrice).toFixed(2)}</span>
                    </p>}
                    {validate.isNotEmpty(couponData) && <p>
                        <span>Coupon Applied (<strong className="text-success">{couponData}</strong>)</span>
                        <span className="text-success"> - <strong class="rupee">&#x20B9;</strong> &nbsp;{parseFloat(totalDiscount).toFixed(2)}</span>
                    </p>}
                    {labOrderDetails.reportDeliveryType === 'H' && validate.isNotEmpty(reportDeliveryCharges) && reportDeliveryCharges > 0 && <p>
                        <span>Report Delivery Charges</span>
                        <span><strong class="rupee">&#x20B9;</strong> &nbsp;{reportDeliveryCharges}</span>
                    </p>}
                    {labOrderDetails.visitType === '1' && validate.isNotEmpty(collectionCharges) && collectionCharges > 0 && <p>
                        <span>Collection Charges</span>
                        <span><strong class="rupee">&#x20B9;</strong> &nbsp;{collectionCharges}</span>
                    </p>}
                    {validate.isNotEmpty(paymentType) && <p>
                        <span>Payment Type</span>
                        <span>{paymentType}</span>
                    </p>}
                    <hr class="solid" />
                    {validate.isNotEmpty(itemsCount)&& itemsCount > 0 && <p>
                        <span>No.of Items</span>
                        <span>{itemsCount}</span>
                    </p>}
                    {paymentType === 'COD' ? validate.isNotEmpty(totalAmount) && <p>
                        <span>Amount to be paid</span>
                        <span><strong class="rupee">&#x20B9;</strong> &nbsp;{parseFloat(totalAmount).toFixed(2)}</span>
                    </p> : validate.isNotEmpty(totalAmount) && <p>
                        <span>Amount paid</span>
                        <span><strong class="rupee">&#x20B9;</strong> &nbsp;{parseFloat(totalAmount).toFixed(2)}</span>
                    </p>}
                    {validate.isNotEmpty(totalDiscount) && totalDiscount > 0 && <p>
                        <span>Total Amount Saved</span>
                        <span class="text-success"><strong class="rupee">&#x20B9;</strong> &nbsp;{parseFloat(totalDiscount).toFixed(2)}</span>
                    </p>}
                </div>
            </div>
        </div>
    )
}
const OrderItemDetails = (props) => {
    let labOrderItems = props.labOrderItems;
    const [labOrderCollapse, setLabOrderCollapse] = useState(false);
    let profileIds = [];
    return (
        <div className="panel-group">
            <div className="panel panel-default">
                <div className="panel-heading">
                    <a className="toggle-arrow" href="javascript:void(0)" title="click to view details" onClick={() => setLabOrderCollapse(!labOrderCollapse)}>
                        <span>Your Order ID</span>
                        <p>Order - {props.displayOrderId}</p>
                        <svg className={ labOrderCollapse ? "rotate-arrow" : "rotate-arrow d-none"} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 18 18">
                            <rect fill="none" width="18" height="18" transform="translate(0 0)"/>
                            <rect fill="#080808" width="18" height="1.431" rx="0.636" transform="translate(0 8.285)"/>
                        </svg>
                        <svg className={ labOrderCollapse ? "rotate-arrow d-none" : "rotate-arrow"} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 18 18">
                            <rect fill="none" width="18" height="18"/>
                            <path fill="#080808" d="M69.226,601.175H61.657v-7.569a.716.716,0,1,0-1.431,0v7.569H52.657a.716.716,0,1,0,0,1.431h7.569v7.569a.716.716,0,0,0,1.431,0v-7.569h7.569a.716.716,0,0,0,0-1.431Z" transform="translate(-51.941 -592.89)"/>
                        </svg>
                    </a>
                </div>
                <Collapse isOpen={labOrderCollapse}>
                    <div className="panel-collapse">
                        {validate.isNotEmpty(labOrderItems) && labOrderItems.map((eachItem,index) =>{ 
                             if(eachItem.profile) {
                                if(profileIds.indexOf(eachItem.profileId) === -1){
                                   profileIds.push(eachItem.profileId);
                                    return <div className="panel-body mx-n3">
                                    <p className="d-flex justify-content-between mb-0">
                                        <strong>{eachItem.profileName}</strong>
                                        <span className="text-secondary">
                                        {eachItem.mrp > eachItem.price ? 
                                            <React.Fragment>
                                                <React.Fragment>   
                                                    <strong class="rupee">&#x20B9;</strong>&nbsp;<del className="mr-2">{ parseFloat(eachItem.mrp).toFixed(2)}</del>
                                                </React.Fragment>
                                                <React.Fragment>
                                                    <strong class="rupee text-dark">&#x20B9;</strong>&nbsp;<strong className="text-dark">{parseFloat(eachItem.price ).toFixed(2)}</strong>
                                                </React.Fragment>
                                            </React.Fragment> : <React.Fragment>
                                                    <strong class="rupee text-dark">&#x20B9;</strong>&nbsp;<strong className="text-dark">{parseFloat(eachItem.mrp).toFixed(2)}</strong>
                                                </React.Fragment>}
                                        </span>
                                    </p>
                                </div>}
                                else{
                                return <React.Fragment></React.Fragment>
                             }
                        }else{
                            return <div className="panel-body mx-n3">
                            <p className="d-flex justify-content-between mb-0">
                                <strong>{eachItem.testName}</strong>
                                <span className="text-secondary">
                                        {eachItem.mrp > eachItem.price ? 
                                            <React.Fragment>
                                                <React.Fragment>   
                                                    <strong class="rupee">&#x20B9;</strong>&nbsp;<del className="mr-2">{ parseFloat(eachItem.mrp).toFixed(2)}</del>
                                                </React.Fragment>
                                                <React.Fragment>
                                                    <strong class="rupee text-dark">&#x20B9;</strong>&nbsp;<strong className="text-dark">{parseFloat(eachItem.price ).toFixed(2)}</strong>
                                                </React.Fragment>
                                            </React.Fragment> : <React.Fragment>
                                                    <strong class="rupee text-dark">&#x20B9;</strong>&nbsp;<strong className="text-dark">{parseFloat(eachItem.mrp).toFixed(2)}</strong>
                                                </React.Fragment>}
                                </span>
                            </p>
                        </div>}
                        })}
                    </div>
                </Collapse>
            </div>
        </div>
    )
}
export default LabsThankyou;