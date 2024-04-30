import React, { useEffect, useState } from 'react'
import Validate from '../../../../../helpers/Validate';
import ThankYouGhostImage from '../../../../Checkout/Thankyou/ThankYouGhostImage';
import Alert from '../../../../Common/Alert';
import { DIAGNOSTICS_HOME, DIAGNOSTICS_URL_PREFIX, VISIT_TYPE_BOTH, VISIT_TYPE_LAB } from '../../../constants/LabConstants';
import LabNewCheckoutAction from '../../../redux/action/LabNewCheckoutAction';
import LabCheckOutService from '../../../Services/LabCheckoutService';
import PatientAndDoctorDetails from '../../Common/PatientAndDoctorDetails';
import SlotCollectionDeliveryReportDetails from './CollectionAddress';
import LabCheckoutSuccessHeader from './LabCheckoutSuccessHeader';
import OrderItemDetails from './OrderItemDetails';
import OrderSummary from './OrderSummary';
import { isUserLoggedIn } from '../../../../../helpers/PaymentHelper';

const LabThankYou = (props) => {

  const labCheckOutService = LabCheckOutService();
  const labCheckoutAction = LabNewCheckoutAction();
  const validate = Validate();
  const [initialLoader, setInitialLoader] = useState(true);
  const [showRetryOption, setShowRetryOption] = useState(false);
  const [paymentAwaited, setPaymentAwaited] = useState(undefined);
  const [paymentType, setPaymentType] = useState(undefined);
  const [patientDetails, setPatientDetails] = useState(undefined);
  const [cartSummary, setCartSummary] = useState(undefined);
  const [homeAddress, setHomeAddress] = useState(undefined);
  const [labAddress, setLabAddress] = useState(undefined);
  const [homeTests, setHomeTests] = useState(undefined);
  const [walkInTests, setWalkInTests] = useState(undefined);
  const [slot, setSlot] = useState(undefined);
  const [deliveryAddress, setDeliveryAddress] = useState(undefined);
  const [couponApplied, setCouponApplied] = useState(undefined);
  const [partialOrdersLeft, setPartialOrdersLeft] = useState(undefined);
  const [showPendingTests,setPendingTests] = useState(false);
  const [walkInLabOrders, setWalkInLabOrders] = useState();
  const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });

  const isUserAvailable = isUserLoggedIn();

  useEffect(() => {
    labCheckOutService.getLabOrderThankYouResponse({}).then((data) => {
      if (validate.isNotEmpty(data) && validate.isNotEmpty(data.statusCode) && "SUCCESS" == data.statusCode && validate.isNotEmpty(data.responseData)) {
        labCheckoutAction.clearLabShoppingCart();
        setDataObjectInState(data.responseData);
      } else if ("FAILURE" == data.statusCode) {
        goToHome();
      } else if (data.statusCode === "404" && data.message === "Network Error") {
        setShowRetryOption(true);
      } else {
        goToHome();
      }
    }).catch(e => {
      setShowRetryOption(true);
    });
  }, []);

  const setDataObjectInState = (dataObj) => {
    //need to check  payment status of success
    setPaymentAwaited(validate.isNotEmpty(dataObj.paymentStatus) && dataObj.paymentStatus == 'S' ? false : true);
    if (validate.isNotEmpty(dataObj.paymentType)) {
      setPaymentType(dataObj.paymentType);
    }
    if (validate.isNotEmpty(dataObj.patientDetails)) {
      setPatientDetails(dataObj.patientDetails);
    }
    if (validate.isNotEmpty(dataObj.cartSummary)) {
      setCartSummary(dataObj.cartSummary);
    }
    if (validate.isNotEmpty(dataObj.homeAddress)) {
      setHomeAddress(dataObj.homeAddress);
    }
    if (validate.isNotEmpty(dataObj.labAddress)) {
      setLabAddress(dataObj.labAddress);
    }
    if (validate.isNotEmpty(dataObj.homeLabOrderItemsMap)) {
      setHomeTests(dataObj.homeLabOrderItemsMap);
    }
    if (validate.isNotEmpty(dataObj.walkInLabOrderItemsMap)) {
      setWalkInTests(dataObj.walkInLabOrderItemsMap);
    }
    if (validate.isNotEmpty(dataObj.homeLabOrderItemsMap) &&
      validate.isNotEmpty(Object.values(dataObj.homeLabOrderItemsMap)[0][0])) {
      setSlot(Object.values(dataObj.homeLabOrderItemsMap)[0][0].labOrderItemSlot);
    } else if (validate.isNotEmpty(dataObj.walkInLabOrderItemsMap) &&
      validate.isNotEmpty(Object.values(dataObj.walkInLabOrderItemsMap)[0][0])) {
      setSlot(Object.values(dataObj.walkInLabOrderItemsMap)[0][0].labOrderItemSlot);
    }
    if (validate.isNotEmpty(dataObj.reportDeliveryData) &&
      validate.isNotEmpty(dataObj.reportDeliveryData.address)) {
        setDeliveryAddress(dataObj.reportDeliveryData.address);
    }
    if (validate.isNotEmpty(dataObj.couponApplied)) {
      setCouponApplied(dataObj.couponApplied);
    }
    if (validate.isNotEmpty(dataObj.walkInLabOrders)) {
      setWalkInLabOrders(dataObj.walkInLabOrders);
    }
    if (validate.isNotEmpty(dataObj.partialOrderLeft)) {
      setPartialOrdersLeft([...dataObj.partialOrderLeft]);
      setPendingTests(true);
    }
    setInitialLoader(false);
  }

  const goToHome = () => {
    props.history.replace(`/${DIAGNOSTICS_HOME}`);
  }

  /* if (showRetryOption) {
      return (
          <NoConnectionLodable history={props.history} location={props.location} />
      );
  } */

  const addRemainingTestsToCart = () => {
    // setBackDropLoader(true);
    if (validate.isEmpty(walkInLabOrders)) {
      setAlertInfo({ message: "Unable to process your request", type: 'warning' });
      // setBackDropLoader(false);
    }
    let obj = {};
    let cardId = walkInLabOrders[0].cartId;
    obj["cartId"] = cardId;
    labCheckOutService.addRemainingTestsToCart(obj).then((data) => {
      if (validate.isNotEmpty(data) && validate.isNotEmpty(data.statusCode) && "SUCCESS" == data.statusCode && validate.isNotEmpty(data.message) && validate.isNotEmpty(data.responseData) && validate.isNotEmpty(data.responseData.shoppingCart)) {
        labCheckoutAction.saveLabShoppingCart(data.responseData.shoppingCart);
        let vistType = data.message == "LabWalkIn" ? VISIT_TYPE_LAB : VISIT_TYPE_BOTH;
        labCheckoutAction.setVisitType(vistType);
        props.history.push(`${DIAGNOSTICS_URL_PREFIX}/sample-collection`);
      } else if (validate.isNotEmpty(data) && validate.isNotEmpty(data.statusCode) && "FAILURE" == data.statusCode && validate.isNotEmpty(data.message)) {
        setAlertInfo({ message: data.message, type: 'danger' });
      }
      // setBackDropLoader(false);
    }).catch(() => {
      setAlertInfo({ message: "Something went wrong", type: 'danger' });
      // setBackDropLoader(false);
    })
  }

  if (initialLoader) {
    return (
      <div className="container-lg container-fluid">
        <ThankYouGhostImage isThankYouLoading={true} />
      </div>
    );
  }

  return (
    <React.Fragment>
      <Alert alertInfo={alertInfo} duration={5000} onDurationEnd={setAlertInfo} />
      <div className={`container-lg container-fluid${isUserAvailable ? "" : ' checkout'}`}>
        <div className="row px-sm-3">
          <div className="col-8 pl-0 pr-2 mx-auto">
            <section className="thank-you-section body-height-single-nav-no-footer">
              <LabCheckoutSuccessHeader isPaymentAwaited={paymentAwaited} paymentType={paymentType} />
              <div className="row no-gutters">
                {validate.isNotEmpty(patientDetails) && validate.isNotEmpty(slot) &&
                  <PatientAndDoctorDetails patientDetails={patientDetails} />}
                <div className={validate.isNotEmpty(deliveryAddress) ? 'col-12 mr-3' : 'col mr-3'}> 
                  <SlotCollectionDeliveryReportDetails homeAddress={homeAddress} slot={slot} labAddress={labAddress} deliveryAddress={deliveryAddress} />
               </div>                
                {validate.isNotEmpty(cartSummary) && validate.isNotEmpty(paymentType) &&
                 <div className='col'> <OrderSummary frompage={"Lab"} cartSummary={cartSummary} paymentType={paymentType} couponApplied={couponApplied} /> </div>}
              </div>
              {validate.isNotEmpty(homeTests) &&
                <OrderItemDetails items={homeTests} displayName={"Home Pickup"} />}
              {validate.isNotEmpty(walkInTests) &&
                <OrderItemDetails items={walkInTests} displayName={"Lab Walk-In"} />}
            </section>
            {isUserAvailable && validate.isNotEmpty(partialOrdersLeft) && <section className="card-box shadow-none p-3">
              <label className="form-group form-check mb-0 d-flex align-items-center" for="showpendingitems" style={{height:"30px" }}>
                <h6 className="font14 line-height-md ml-3 mb-0">In your shopping cart,you have few more tests to be booked. Would you like to book them now</h6>
                <input type="checkbox" checked={showPendingTests} onChange={(e) => setPendingTests(!showPendingTests)} id="showpendingitems" />
                <span className="checkmark"></span>
              </label>
              { <div className="card mt-3">
                <ul className="list-group list-group-flush">
                  {partialOrdersLeft.map((value) => { return (<li className={showPendingTests ? "list-group-item" :"list-group-item disabled" }>
                    
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24.621 24" className='align-text-bottom mr-2 ml-n2'>
                      <g id="tickmark_black_icon_18px" transform="translate(-1458 -558)">
                        <rect id="Rectangle_5706" data-name="Rectangle 5706" width="24" height="24" rx="3" transform="translate(1458 558)" fill="#fff" />
                        <path id="Icon_feather-check" data-name="Icon feather-check" d="M26,9,12.25,23,6,16.636" transform="translate(1454.5 554.5)" fill="none" stroke={showPendingTests ? "#08CE73" :"rgb(108 117 125 / 50%)"} stroke-linecap="round" stroke-linejoin="round" stroke-width="3" />
                      </g>
                    </svg>
                    
                    
                    
                    {value}</li>) })}
                </ul>
              </div>}
            </section>}
          </div>
        </div>
      </div>
      <footer className="footer fixed-bottom mt-auto py-2 pr-3">
        <div className="container-lg container-fluid px-0 px-sm-3">

          <div className="d-flex align-items-center no-gutters flex-row-reverse col-8 offset-2 px-0">
            <div>
              <button type="button" role="button" className="btn brand-secondary px-5 rounded-pill custom-btn-lg" onClick={goToHome}>Continue Shopping</button>
              {isUserAvailable && showPendingTests && <button type="button" role="button" onClick={addRemainingTestsToCart} className="ml-3 btn btn-brand-gradient px-5 rounded-pill custom-btn-lg">Schedule</button> }
            </div>
          </div>
        </div>

      </footer>
    </React.Fragment>
  )
}
export default LabThankYou