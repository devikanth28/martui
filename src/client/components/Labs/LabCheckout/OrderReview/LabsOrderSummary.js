import React, { useState, useEffect } from 'react';
import Validate from '../../../../helpers/Validate';
import Alert from '../../../Common/Alert';
import Promotion from '../../../Checkout/OrderReview/Promotion';
import PhysicalReportModal from './PhysicalReportModal';
import LabCheckoutService from "../../../../services/LabCheckoutService";
import SlotDetails from '../../Common/SlotDetails';
import LabCheckoutAction from '../../../../../redux/action/LabCheckoutAction';
import LabCartSummary from '../../Common/LabCartSummary';
import CONFIG from '../../../../constants/ServerConfig';
import PatientAddress from '../../Common/PatientAddress';
import ShowPickUpStore from '../../../Common/ShowPickUpStore';
import { connect } from 'react-redux';
import { getLabSelectedLocality } from '../../../../../redux/action/LocalityAction';
import OrderReviewGhostImage from '../../../Checkout/OrderReview/OrderReviewGhostImage';
import { getDisplayableAge } from '../../../../helpers/CommonUtil';
const LabsOrderSummary = (props) => {

    const validate = Validate();
    const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
    const [successMsg, setSuccessMsg] = useState("");
    const [isReviewPageLoading, setReviewPageLoading] = useState(false);
    const [failureMsg, setFailureMsg] = useState("");
    const [couponCode, setCouponCode] = useState("");
    const [requestLoading, setRequestLoading] = useState(false);
    const [shoppingCart, setShoppingCart] = useState({});
    const [patientCart, setPatientCart] = useState([]);
    const labCheckoutService = LabCheckoutService();
    const labCheckoutAction = LabCheckoutAction();
    const selectedLocality = getLabSelectedLocality();
    const [reportDeliveryCharges, setReportDeliveryCharges] = useState(0);
    useEffect(() => {
        getLabShoppingCart();
    },[]);

    const getLabShoppingCart = ()=>{
        setReviewPageLoading(true);
        labCheckoutService.getShoppingCartInfo().then(response => {
            if(validate.isNotEmpty(response) && response.statusCode === "SUCCESS" && validate.isNotEmpty(response.responseData) && validate.isNotEmpty(response.responseData.shoppingCart)) {
                if(validate.isNotEmpty(response.responseData.shoppingCart.patientCartsMap)) {
                    preparePatientCart(response.responseData.shoppingCart);
                    setReportDeliveryCharges(response.responseData.reportDeliveryCharges);
                    if(validate.isNotEmpty(response.responseData.shoppingCart.couponCode)) {
                        setCouponCode(response.responseData.shoppingCart.couponCode.toUpperCase());
                    }
                } else {
                    setAlertInfo({ message: "Invalid Shopping Cart", type: "" });
                    props.history.push("/labShoppingCart");
                }        
            } else {
                setAlertInfo({ message: response.message, type: "" });
            }
            setReviewPageLoading(false);
        }).catch(function(error) {
            setReviewPageLoading(false);
            setAlertInfo({ message: "System experiencing some problem, Please try after some time", type: "" });
        });
    }

    const preparePatientCart = (shoppingCart) => {
        if(validate.isNotEmpty(shoppingCart) && validate.isNotEmpty(shoppingCart.patientCartsMap)) {
            setShoppingCart(shoppingCart);
            setPatientCart(shoppingCart.patientCartsMap[Object.keys(shoppingCart.patientCartsMap)[0]]);
            labCheckoutAction.saveLabShoppingCart(shoppingCart);
        }
    }

    const applyCouponCode = (coupon) => {
        if(validate.isEmpty(coupon)) {
            setFailureMsg("Please give coupon code");
            return;
        }
        setFailureMsg(undefined);
        setRequestLoading(true);
        labCheckoutService.applyCouponCode(coupon).then(response => {
            if(validate.isNotEmpty(response) && response.statusCode == "SUCCESS" && validate.isNotEmpty(response.responseData)) {
                if(validate.isNotEmpty(response.responseData.shoppingCart)) {
                    setCouponCode(response.responseData.shoppingCart.couponCode.toUpperCase());
                    preparePatientCart(response.responseData.shoppingCart);
                } else {
                    setAlertInfo({ message: response.message, type: "" });
                }
            } else{
                setFailureMsg(response.message);
            }
            setRequestLoading(false);
        }).catch(function(error) {
            setRequestLoading(false);
            setAlertInfo({ message: "System experiencing some problem, Please try after some time", type: "" });
        });
    }

    const removeCouponCode = (couponCode) => {
        setRequestLoading(true);
        labCheckoutService.removeCouponCode(couponCode).then(response => {
            if(validate.isNotEmpty(response) && response.statusCode === "SUCCESS" && validate.isNotEmpty(response.responseData) && validate.isNotEmpty(response.responseData.shoppingCart)) {
                setSuccessMsg(undefined);
                setCouponCode(undefined);
                setFailureMsg(undefined);
                preparePatientCart(response.responseData.shoppingCart);
            } else if(response.statusCode === "FAILURE"){
                setFailureMsg(response.message);
            }
            setRequestLoading(false);
        }).catch(function(error) {
            setRequestLoading(false);
            setAlertInfo({ message: "System experiencing some problem, Please try after some time", type: "" });
        });
    }

    const closeAlertMessage = () => {
        setAlertInfo({message:"", type:""});
    }

    const proceedPayment = () => {
        props.history.push('/labPayment');
    }

    const goToPatienInfo = () => {
        props.history.push('/patientAndSlotInfo');
    }

    return(
        <React.Fragment>
            <Alert alertInfo={alertInfo} onDurationEnd={closeAlertMessage} duration='5000'/>
                <main role="main" className="container-fluid container-lg">
                    <div className="row">
                        {isReviewPageLoading && <OrderReviewGhostImage isOrderDetailsLoading={isReviewPageLoading} isPromotionBannerLoading={isReviewPageLoading}></OrderReviewGhostImage>}
                        {!isReviewPageLoading && validate.isNotEmpty(shoppingCart) && shoppingCart.totalCartItemsCount > 0 && 
                            <div className="col-8 pl-0 pr-2">
                                {shoppingCart.totalCartItemsCount > 0 && 
                                    <OrderDetails shoppingCart={shoppingCart} patientCart={patientCart}></OrderDetails> 
                                }
                                <div className="row mx-0">
                                    {shoppingCart.totalCartItemsCount > 0 && 
                                        <div className="col pl-0 pr-2">
                                            <PatientAndSlotDetails patientCart={patientCart} changePatientDetail={goToPatienInfo}></PatientAndSlotDetails>
                                        </div>
                                    }
                                    <div className="col pl-2 pr-0">
                                        <HomeSamplePickup 
                                            visitType={shoppingCart.visitType}
                                            patientAddress={shoppingCart.address}
                                            storeAddress={shoppingCart.collectionCenterStore}
                                        />
                                    </div>
                                </div>
                            </div>
                        }
                        {!isReviewPageLoading && validate.isNotEmpty(shoppingCart) && shoppingCart.totalCartItemsCount > 0 && 
                            <div className="col-4 pl-2 pr-0">
                                <Promotion promotionBanners={{}} isLoading={requestLoading}
                                    applyCouponCode={applyCouponCode} removeCouponCode={removeCouponCode} 
                                    applyCouponSuccessMsg={successMsg} applyCouponFailureMsg={failureMsg}
                                    couponCode = {couponCode} header="Apply Coupon"
                                />
                                <LabCartSummary/>
                                {validate.isNotEmpty(selectedLocality) && validate.isNotEmpty(selectedLocality.homeReportDeliveryAllowed) && selectedLocality.homeReportDeliveryAllowed == "Y" && validate.isNotEmpty(reportDeliveryCharges) && parseInt(reportDeliveryCharges) > 0 && <PhysicalReportModal reportDeliveryCharges ={reportDeliveryCharges} shoppingCart={props.shoppingCart}></PhysicalReportModal>}
                                {/* {props.shoppingCart.reportDeliveryType == 'H' && props.shoppingCart.visitType == '2' && validate.isNotEmpty(props.shoppingCart.address) && <ReportDeliveryAddress shoppingCart={shoppingCart}></ReportDeliveryAddress>} */}
                            </div>
                        }
                    </div>
                </main>
            <footer className="footer fixed-bottom mt-auto py-2">
                <div className="container px-0">
                    <div className="row align-items-center no-gutters">
                        <div className="col-12 text-right">
                            <button type="button" className="brand-secondary btn px-5 rounded-pill" onClick={goToPatienInfo}>Back</button>
                            {shoppingCart &&  <button type="submit" className="btn btn-brand-gradient ml-3 px-5 rounded-pill" onClick={proceedPayment}> Proceed To Payments</button>}
                        </div>
                    </div>
                </div>
            </footer>
        </React.Fragment>
    )
}

const OrderDetails = (props) => {

    const validate = Validate();
    const shoppingCart = props.shoppingCart;
    const patientCart = props.patientCart;

    const addMoreTest = ()=>{
        window.location.href = CONFIG.REDIRECT_HOME_URL + "lab/labtest-list/A";
    }
    return(
        <React.Fragment>
             <section>
                <div className="header">
                    <p className="badge-title warning">Order Details</p>
                </div>
                <ul className="product-listview list-group list-group-flush">
                    { validate.isNotEmpty(shoppingCart) && validate.isNotEmpty(patientCart) && patientCart.shoppingCartItems.map((item, key )=>{
                        return(
                            <li key={item.testCode} className="list-group-item p-3">
                                <div className="col">
                                    <h6 className="mb-0 mt-1">{item.testName}</h6>
                                </div>
                                <div className="col-4 text-right p-0">
                                    <p className="font-weight-bold m-0">
                                        {item.discountPercentage != null && item.discountPercentage != 0 && 
                                            <small className="text-secondary">
                                                <strong className="rupee"> &#x20B9; </strong>
                                                <del>{Number(item.mrp).toFixed(2)}</del>
                                            </small>
                                        }
                                        <span className="ml-2">
                                            <strong className="rupee">&#x20B9;</strong> {Number(item.mrp - (item.mrp/100) * item.discountPercentage).toFixed(2)}
                                        </span>
                                    </p>
                                </div>
                            </li>
                            )
                        })
                    } 
                    <li className="order-details-summary list-group-item">
                        <div className="col">
                            <div className="form-group"><button className="btn btn-outline-brand px-5" value="" type="button" onClick={addMoreTest}>Add More Tests</button></div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-5 text-left font-weight-bold pr-0">
                            <p><span>Total Price</span><span className="float-right"><strong className="rupee">&#x20B9;</strong> {Number(shoppingCart.totalPrice).toFixed(2)} </span></p>
                            {(shoppingCart.totalDiscount && shoppingCart.totalDiscount) > 0 && <p className="text-success"><span>Total Savings</span><span className="float-right">- <strong className="rupee">&#x20B9;</strong> {Number(shoppingCart.totalDiscount).toFixed(2)}</span></p>}
                            {(shoppingCart.totalDiscount && shoppingCart.totalDiscount) > 0 && <p className="mb-0"><span>Order Total</span><span className="float-right"><strong className="rupee">&#x20B9;</strong> {Number(shoppingCart.totalAmount).toFixed(2)}</span></p>}
                        </div>
                    </li>
                   {/*  <li className="list-group-item px-3 py-2 footer warning mb-0">
                        <p className="font-weight-normal"><strong>Note:</strong> Do not eat or drink anything other than water for 8-12 hours before the test.</p>
                    </li> */}
                </ul>
            </section>
        </React.Fragment>
    )
}

const PatientAndSlotDetails = (props) => {
    const patientCart = props.patientCart;
    return (
        <React.Fragment>
            {patientCart && <section className="cart-summary">
                <div className="header">
                    <p>Patient, Doctor & Slot Details</p>
                    <a href="javascript:void(0)" title="Edit" className="btn btn-link text-primary btn-sm" onClick={props.changePatientDetail}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 18 18" className="align-top mr-2">
                            <g transform="translate(-180.257 -249.084)">
                                <rect fill="none" width="18" height="18" transform="translate(180.257 249.084)"/>
                                <g transform="translate(180.258 249.086)">
                                    <path fill="#080808" d="M2.765,18A2.77,2.77,0,0,1,0,15.234V4.341A2.77,2.77,0,0,1,2.765,1.574H6.274a.6.6,0,0,1,0,1.208H2.763A1.566,1.566,0,0,0,1.208,4.346V15.234A1.568,1.568,0,0,0,2.759,16.8H13.648a1.567,1.567,0,0,0,1.564-1.563V11.725a.6.6,0,0,1,1.207,0v3.509A2.769,2.769,0,0,1,13.652,18ZM5.9,12.825a1.043,1.043,0,0,1-.727-1.281l.7-2.466a.605.605,0,0,1,.149-.269L14.177.649a2.265,2.265,0,0,1,3.172,0,2.261,2.261,0,0,1,0,3.174L9.215,11.98a.612.612,0,0,1-.278.152l-2.445.688-.313.042A1.067,1.067,0,0,1,5.9,12.825ZM7,9.528l-.6,2.041,2.022-.549.022-.007,6.9-6.922.063-.064L13.944,2.563Zm8.083-8.069-.269.242,1.452,1.454.215-.173.009-.008a1.035,1.035,0,0,0-1.407-1.514Z" transform="translate(-0.001 -0.001)"/>
                                </g>
                            </g>
                        </svg>
                        Edit
                    </a>
                </div>
                <div className="body">
                    <p className="d-block font-weight-normal">Name: <strong> {patientCart.patientName}</strong></p>
                    <p className="d-block font-weight-normal">Age / Gender: <strong> {getDisplayableAge(patientCart.dateOfBirth)} / {patientCart.gender == 'M' ? 'Male' : 'Female'}</strong></p>
                    <p className="d-block font-weight-normal">Doctor Name: <strong> Dr {patientCart.doctorName}</strong></p>
                    <hr className="my-2"/>
                    <SlotDetails timeSlot={patientCart.timeSlot}/>
                </div>
            </section>}
        </React.Fragment>
    )
}

const HomeSamplePickup = (props) => {
    return (
        <React.Fragment>
            <section className="cart-summary">
                <div className="header">
                    {props.visitType && props.visitType == "1" ?
                        <p>Home Sample Pickup</p>:
                        <p>Sample Collection Center</p>
                    }
                </div>
                <div className="body labs-address">
                    {props.visitType && props.visitType=="1" ?
                        <PatientAddress 
                            isHeaderRequired={true} 
                            firstName={props.patientAddress.firstName}
                            lastName={props.patientAddress.lastName}
                            address1={props.patientAddress.addressLine1}
                            address2={props.patientAddress.addressLine2}
                            city={props.patientAddress.city}
                            state={props.patientAddress.state}
                            pinCode={props.patientAddress.pincode}
                            mobile={props.patientAddress.mobileNo}
                            locationConfigId={props.patientAddress.locationConfigId}
                        />
                     : 
                        <ShowPickUpStore
                            pickStoreName={props.storeAddress.name}
                            pickUpAddress={props.storeAddress.address}
                            locationLatLong={props.storeAddress.locationLatLong}
                            phoneNumber={props.storeAddress.phoneNumber}
                            isSmallAddressRequired={false} excludeBodyClass={true}
                        />
                    }
                </div>
            </section>
        </React.Fragment>
    )
}

function mapStateToProps(state){
    return {
        shoppingCart: state.labCheckout.labShoppingCart,
    }
 }
export default connect(mapStateToProps)(LabsOrderSummary);