import React, { useState, useEffect } from 'react'
import BreadCrumbAction from '../../../../../redux/action/BreadCrumbAction'
import { useInputField } from '../../../../../client/components/Common/CustomHooks/useInputField';
import { getSelectedLocality } from '../../../../../redux/action/LocalityAction';
import UserInfoAction from '../../../../../redux/action/UserInfoAction';
import Validate from '../../../../helpers/Validate';
import Alert, { ALERT_TYPE_INFO, ALERT_TYPE_SUCCESS } from '../../../../components/Common/Alert';
import MartCatalogService from '../../../services/MartCatalogService';
import Sanitizer_hundredml from '../../../../images/Hand-Sanitizer-100ml.png';
import Sanitizer_oneLitre from '../../../../images/Hand-Sanitizer-1ltr.png';
import Sanitizer_fiveLitre from '../../../../images/Hand-Sanitizer-5ltr.png';
import HandWash_threeHundredml from '../../../../images/Hand-Wash-300ml.png';
import HandWash_oneLitre from '../../../../images/Hand-Wash-1-ltr.png';
import Masks from '../../../../images/Cloth-Masks.png';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
const imageUrl = "https://static1.medplusmart.com/medplusmart/assets"

const BulkOrder = (props) => {

  const validate = Validate();
  const breadCrumbAction = BreadCrumbAction();
  const userInfoAction = UserInfoAction();
  const getLocation = getSelectedLocality();
  const [isOpen,setOpen]=useState(false);
  const [checker, setChecker] = useState({ AVEL0048: true, AVEL0045: true, AVEL0055: true, AVEL0036: true, AVEL0044: true, AVEL0049: true, CLOT0142: true });
  const [quantity, setQuantity] = useState({ AVEL0048: '', AVEL0045: '', AVEL0055: '', AVEL0036: '', AVEL0044: '', AVEL0049: '', CLOT0142: '' });
  const [quantityError, setQuantityError] = useState({ AVEL0048: '', AVEL0045: '', AVEL0055: '', AVEL0036: '', AVEL0044: '', AVEL0049: '', CLOT0142: '' });
  const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
  const [orderedProducts,setOrderedProducts] = useState({});
  const [loader, setLoader]=useState(false);

  const [userName, userNameError, setUserName, setUserNameError, handleUserNameOnChange, handleUserNameFocusInput, handleUserNameOnBlur] = useInputField("NAME", 40);
  const [mobileNumber, mobileNumberErrorMessage, setMobileNumberValue, setMobileNumberError, handleMobileNumberOnChange, handlemMobileNumberFocusInput, handleMobileNumberOnBlur] = useInputField("MOBILE_NUMBER", 10);
  const [city, cityErrorMessage, setCity, setCityError, handleCityOnChange, handleCityFocusInput, handleCityOnBlur] = useInputField("NAME", 15);
  const [state, stateErrorMessage, setState, setStateError, handleStateOnChange, handleStateFocusInput, handleStateOnBlur] = useInputField("NAME", 15);
  
  const initialValue = "1";
  let emptyQuantity = true; 

  const data = {
    "Sanitizer": [
      {
        imagePath: Sanitizer_hundredml,
        name: 'AVELIA HAND SANITIZER ETHANOL BASED BLUE 100ML',
        productId: 'AVEL0048',
        quantity: quantity.AVEL0048,
        checker: checker.AVEL0048,
        quantityError: quantityError.AVEL0048
      },
      {
        imagePath: Sanitizer_oneLitre,
        name: 'AVELIA HAND SANITIZER ETHANOL BASED 1LITRE',
        productId: 'AVEL0045',
        quantity: quantity.AVEL0045,
        checker: checker.AVEL0045,
        quantityError: quantityError.AVEL0045
      },
      {
        imagePath: Sanitizer_fiveLitre,
        name: 'AVELIA HAND SANITIZER ETHANOL BASED 5LITRE',
        productId: 'AVEL0055',
        quantity: quantity.AVEL0055,
        checker: checker.AVEL0055,
        quantityError: quantityError.AVEL0055
      }
    ],
    "Hand Wash": [
      {
        imagePath: HandWash_threeHundredml,
        name: 'AVELIA SKIN SOFT HAND WASH 300M',
        productId: 'AVEL0036',
        quantity: quantity.AVEL0036,
        checker: checker.AVEL0036,
        quantityError: quantityError.AVEL0036
      },
      {
        imagePath: HandWash_oneLitre,
        name: 'AVELIA SKIN SOFT HAND WASH 1LITRE',
        productId: 'AVEL0044',
        quantity: quantity.AVEL0044,
        checker: checker.AVEL0044,
        quantityError: quantityError.AVEL0044
      }
    ],
    "Surface Disinfectant Sanitizer": [
      {
        imagePath: Sanitizer_oneLitre,
        name: 'AVELIA HAND SANITIZER ETHANOL BASED 1LITRE',
        productId: 'AVEL0049',
        quantity: quantity.AVEL0049,
        checker: checker.AVEL0049,
        quantityError: quantityError.AVEL0049
      }
    ],
    "Masks": [
      {
        imagePath: Masks,
        name: 'CLOTH MASK MODEL-1',
        productId: 'CLOT0142',
        quantity: quantity.CLOT0142,
        checker: checker.CLOT0142,
        quantityError: quantityError.CLOT0142
      }
    ]
  }

  useEffect(() => {
    breadCrumbAction.pushBreadCrumbs({ name: 'Bulk Order', url: props.location.pathname });
    setMobileNumberValue(userInfoAction.getUserContactDetails().shippingContactNumber);
    const displaybleName = userInfoAction.getUserInfo().displaybleName;
    setUserName(validate.isAlphaWithSpace(displaybleName) ? displaybleName : "");
    setCity(getLocation.city);
    setState(getLocation.state);
  }, []);

  const checked = (e) => {
    !e.target.checked ? setChecker({ ...checker, [e.target.name]: true }) : setChecker({ ...checker, [e.target.name]: false })
    e.target.checked ? setQuantity({ ...quantity, [e.target.name]: initialValue }) : setQuantity({ ...quantity, [e.target.name]: "" })
    !e.target.checked && setQuantityError({ ...quantityError, [e.target.name]: "" })
  };

  const scrollToView = (element) => {
    element && element.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
    setLoader(false);
   }

  const handleQuantityOnChange = (e) => {
    if (e.target.value >= 1 && !e.target.checked) {
      setQuantityError({ ...quantityError, [e.target.name]: "" });
    }
    if (e.target.value === '' || (validate.isNumeric(e.target.value) && e.target.value.length < 7)) {
      setQuantity({ ...quantity, [e.target.name]: e.target.value });
    }
  }

  const handleQuantityOnBlur = (e) => {
    if (e.target.value === '') {
      setQuantityError({ ...quantityError, [e.target.name]: "This is mandatory field" });
      const element = document.getElementById(e.target.name);
      scrollToView(element);
    }
    if (validate.isNotEmpty(e.target.value) && parseInt(e.target.value) <= 0) {
      setQuantityError({ ...quantityError, [e.target.name]: "Quantity Enter valid quantity(1 - 999999)" });
      const element = document.getElementById(e.target.name);
      scrollToView(element);
    }
  }

  const handleQuantityFocusInput = (e) => {
    setQuantityError({ ...quantityError, [e.target.name]: "" });
  }

  const setToInitialValues = () => {
    setChecker({ AVEL0048: true, AVEL0045: true, AVEL0055: true, AVEL0036: true, AVEL0044: true, AVEL0049: true, CLOT0142: true });
    setQuantity({ AVEL0048: '', AVEL0045: '', AVEL0055: '', AVEL0036: '', AVEL0044: '', AVEL0049: '', CLOT0142: '' });
    setQuantityError({ AVEL0048: '', AVEL0045: '', AVEL0055: '', AVEL0036: '', AVEL0044: '', AVEL0049: '', CLOT0142: '' });
    emptyQuantity = true;
  }
  const saveBulkOrder = () => {
    setLoader(true);
    if (validate.isEmpty(userName)) {
      setUserNameError("This is a mandatory field");
    }
    if (validate.isEmpty(mobileNumber)) {
      setMobileNumberError("This is a mandatory field");
    }
    if (validate.isEmpty(city)) {
      setCityError("This is a mandatory field");
    }
    if (validate.isEmpty(state)) {
      setStateError("This is a mandatory field");
    }
     let selectedProducts = {};
     let ordered = {}
    Object.entries(data).map(([, value]) => {
      value.map((eachProduct) => {
        if (validate.isNumeric(eachProduct.quantity) && eachProduct.quantity > 0) {
          selectedProducts[eachProduct.productId] = eachProduct.quantity;
          ordered[eachProduct.name] = eachProduct.quantity;
        }
        else if (eachProduct.quantityError != "") {
          emptyQuantity = false;
          const element = document.getElementById(eachProduct.productId);
          scrollToView(element);
          return;
        }
      })
    });

    if (validate.isEmpty(selectedProducts) && emptyQuantity) {
      setAlertInfo({ message: "Please select atleast one product.", type: ALERT_TYPE_INFO })
      emptyQuantity = true;
      setLoader(false);
      return;
    }
    setOrderedProducts(ordered);
    const reqObject = {
      ...(validate.isNotEmpty(userName) && { userName: userName }),
      ...(validate.isNotEmpty(mobileNumber) && { mobileNumber: mobileNumber }),
      ...(validate.isNotEmpty(city) && { city: city }),
      ...(validate.isNotEmpty(state) && { state: state }),
      ...(validate.isNotEmpty(selectedProducts) && { selectedProducts: selectedProducts })
    };
    if (validate.isNotEmpty(reqObject) && validate.isNotEmpty(selectedProducts) && emptyQuantity) {
      MartCatalogService().saveBulkOrder({reqObject : JSON.stringify(reqObject)}).then((response) => {
        if("SUCCESS" === response?.statusCode && validate.isNotEmpty(response?.message)) {
          setLoader(false);
          setOpen(!isOpen);
          setToInitialValues();
        } else if(validate.isNotEmpty(response?.message)) {
          setAlertInfo({ message: response.message, type: ALERT_TYPE_INFO })
          setLoader(false);
        }
      }).catch((err) => {
        console.log(err);
        setLoader(false)
      });
    }
  }
  const closeBtn = <button type="button" className="close" onClick={() => setOpen(!isOpen)} style={{ "right": "0px" }}>
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <rect fill="none" width="24" height="24"></rect>
    <path d="M20.76,19.55l-7.58-7.56,7.56-7.56a.846.846,0,0,0-.04-1.18.822.822,0,0,0-1.13,0L12,10.81,4.44,3.24A.827.827,0,0,0,3.27,4.41l7.56,7.58L3.27,19.55a.835.835,0,0,0,1.14,1.22l.04-.04L12,13.17l7.56,7.56a.833.833,0,0,0,1.17,0h0a.821.821,0,0,0,.04-1.16A.031.031,0,0,0,20.76,19.55Z"></path>
  </svg>
</button>
  const ThankYouPopUp=(props)=>{
    return(
      <React.Fragment>
          <Modal centered className="registration-user-modal modal-lg" backdrop="static" isOpen={isOpen} toggle={true}>
        <ModalHeader close={closeBtn}/>
          <ModalBody>
            <div>
              <h2 className="display-2 text-success">Thank You!</h2>
              <p>for ordering below given products</p>
              <ul class="list-group" aria-role="list">
              {Object.entries(props.selectedProducts).map(([key, value]) => {
             return(
                  <React.Fragment>
                    { value > 0 &&
                        <li class="list-group-item" aria-role="listitem">
                          <h4>{key}</h4>
                         <p className='text-secondary mb-0'>Ordered Qty:{value}</p>
                        </li> }
                  </React.Fragment>
                )        
            })}
             </ul>
              <button type="button" className='btn float-right brand-secondary custom-btn-lg my-3 px-5 rounded-pill' onClick={() => setOpen(!isOpen)}>close</button>
            </div>
          </ModalBody>
        </Modal>
      </React.Fragment>
    )
  }
  return (
    <React.Fragment >
      <section>
          {isOpen && orderedProducts && <ThankYouPopUp selectedProducts={orderedProducts}/>}
        <div className='container'>
          <h6 className="title-text mb-0 py-3">MedPlus Health Solutions (MHS) is a licensed manufacturer of products which are essential in fighting Covid-19 effectively.</h6>
          <div className='row no-gutters'>
            <div className='col-5'>
              <h6 className="secondary-title-text my-1">We manufacture the following in our own factories</h6>
              <ul className="py-1">
                <li>Alcohol based Hand Sanitizer (100 ml, 1ltr, 5ltr),</li>
                <li>Liquid Hand Wash (300 ml, 1ltr),</li>
                <li>Disinfectant Surface Sanitizer (1ltr, 5 ltr)</li>
                <li>Two layered Cloth Masks made in 100% cotton.</li>
              </ul>
            </div>
            <div className='col-5'>
              <h6 className="secondary-title-text my-1">We are also bulk suppliers for the below</h6>
              <ul className="py-1">
                <li>N 95 Masks, KN 95 Masks, 3 layered surgical masks</li>
                <li>Rubber gloves</li>
                <li>Pulse Oximeters</li>
                <li>Thermometers, both contact and contactless</li>
              </ul>
            </div>
            <p className="secondary-title-text">We can supply above products in bulk, either on our own brand names or if the order size is sufficiently large on your brands.</p>
          </div>
        </div>
      </section>
      <section className='Product-Enquiry mb-3 mt-4'>
        <div className='Product-Enquiry-Detail container p-3'>
          <h6 className='form-title m-0 mb-3'>For Product Enquiry Please Fill The Form</h6>
          <div className='each-row row'>
            <div className='col-3'>
              <div className="form-group each-group has-float-label">
                <input type="text" value={userName} className="form-control type-address" id="Name" name="Name" maxlength="40" autocomplete="off" required="" placeholder=" " onChange={handleUserNameOnChange} onFocus={handleUserNameFocusInput} onBlur={handleUserNameOnBlur} />
                <label htmlFor="Name">Name </label>
                {validate.isNotEmpty(userNameError) && <div className="invalid-feedback d-block">{userNameError}</div>}
              </div>
            </div>
            <div className='col-3'>
              <div className="form-group has-float-label each-group form-group-error">
                <input type="text" value={mobileNumber} className="form-control type-address" id="Contact Number" name="Contact Number" maxlength="10" autocomplete="off" required="" placeholder=" " onChange={handleMobileNumberOnChange} onFocus={handlemMobileNumberFocusInput} onBlur={handleMobileNumberOnBlur} />
                <label htmlFor="Contact Number">Contact Number </label>
                {validate.isNotEmpty(mobileNumberErrorMessage) && <div className="invalid-feedback d-block">{mobileNumberErrorMessage}</div>}
              </div>
            </div>
            <div className='col-3'>
              <div className="form-group has-float-label each-group form-group-error">
                <input type="text" value={city} className="form-control type-address" id="city" name="city" maxlength="20" autocomplete="off" required="" placeholder=" " onBlur={handleCityOnBlur} onChange={handleCityOnChange} onFocus={handleCityFocusInput} />
                <label htmlFor="city">City </label>
                {validate.isNotEmpty(cityErrorMessage) && <div className="invalid-feedback d-block">{cityErrorMessage}</div>}
              </div>
            </div>
            <div className='col-3'>
              <div className="form-group has-float-label each-group form-group-error">
                <input type="text" value={state} className="form-control type-address" id="State" name="state" maxlength="20" autocomplete="off" required="" placeholder=" " onFocus={handleStateFocusInput} onChange={handleStateOnChange} onBlur={handleStateOnBlur} />
                <label htmlFor="State">state </label>
                {validate.isNotEmpty(stateErrorMessage) && <div className="invalid-feedback d-block">{stateErrorMessage}</div>}
              </div>
            </div>
          </div>
        </div>
        <div className='products-container container'>
          <h6 className='title-text mb-3'>Select required products along with quantity:</h6>
          {Object.entries(data).map(([categoryName, value]) => {
            return (
              <React.Fragment>
                <h6 className='text-brand'>{categoryName + ":"}</h6>
                <ul className='pl-0' aria-role="list">
                  {value.map((eachProduct) => {
                    return (
                      <li aria-role="listitem">
                        <img src={eachProduct.imagePath} />
                        <div className='bulkProductList'>
                          <label className="form-group form-check m-0 pointer select-product" htmlFor={eachProduct.productId}>
                            <input type="checkbox" name={eachProduct.productId} id={eachProduct.productId} onChange={checked} checked={!(eachProduct.checker)} />
                            <span className="checkmark" ></span>
                            <span className="v-align-sub d-block ml-3">
                              <p title={eachProduct.name}>{eachProduct.name}</p>
                            </span>
                          </label>
                          <div className="form-group Quantity has-float-label each-group form-group-error">
                            <input type="text" className="form-control type-address" id={eachProduct.productId} name={eachProduct.productId} maxlength="6" autocomplete="off" required="" placeholder=" " disabled={eachProduct.checker} value={eachProduct.quantity} onChange={handleQuantityOnChange} onBlur={handleQuantityOnBlur} onFocus={handleQuantityFocusInput} />
                            <label htmlFor={eachProduct.productId}>Enter Quantity </label></div>
                          {validate.isNotEmpty(eachProduct.quantityError) && <div className="invalid-feedback d-block ml-32">{eachProduct.quantityError}</div>}
                        </div>
                      </li>
                    );
                  }
                  )}
                </ul>
              </React.Fragment>
            );
          })}
          <button type="button" role="button" className='btn btn-brand-gradient custom-btn-lg px-5 rounded-pill' onClick={()=>{saveBulkOrder()}}>
            {loader && <React.Fragment>
              <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
              <span className="sr-only"></span>
            </React.Fragment>
            }
          { !loader && "Submit"}
          </button>
        </div>
        <hr class="border-bottom-0 mb-0 mt-5 solid"/>
        <div class="text-center py-5">
        <h3 className='mb-0'>For all requirements please contact:<a href="tel:8499904848" title='For all requirements please contact:849 990 4848' className="ml-3 text-primary align-middle" aria-label="For all requirements please contact:8499904848">849 990 4848</a></h3>
      </div>
      </section>
      <Alert alertInfo={alertInfo} duration={5000} onDurationEnd={setAlertInfo} />
    </React.Fragment>
  )
}
export default BulkOrder