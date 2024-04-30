import React, { useState, useEffect } from "react"
import { DIAGNOSTICS_HOME, DIAGNOSTICS_URL_PREFIX, Gender } from "../../../constants/LabConstants";
import LabCheckoutAction from "../../../../../../redux/action/LabCheckoutAction";
import LabCheckoutService from "../../../Services/LabCheckoutService";
import PatientModel from "../../../../Common/PatientModel";
import Validate from "../../../../../helpers/Validate";
import Alert from "../../../../Common/Alert";
import LabShoppingCartItem from "./LabShoppingCartItem";
import LabCartSummary from '../../Common/LabCartSummary';
import ShoppingCartGhostImage from '../../../../ShoppingCart/ShoppingCartGhostImage';
import { getDisplayableAge } from "../../../../../helpers/CommonUtil";
import LabCheckoutInfoNote from "../../../../Common/LabCheckoutInfoNote";


const LabShoppingCart = (props) => {
    const [openEditModal, setOpenEditModal] = useState(false);
    const [editAddressModal, setEditAddressModal] = useState(false);

    const [isMultipleServiceOptionsRequired, setMultipleServiceOptionsRequired] = useState(false);
    const [errorMsg, setErrorMsg] = useState({});
    const [initialLoader, setInitialLoader] = useState(true);
    const [backDropLoader, setBackDropLoader] = useState(false);
    const [shoppingCart, setShoppingCart] = useState({});
    const [homeSampleCollectionItems, setHomeSampleCollectionItems] = useState([]);
    const [labSampleCollectionItems, setLabSampleCollectionItems] = useState([]);
    const [cartSummary, setCartSummary] = useState({});
    const [deliveryView, setDeliveryView] = useState("N");
    const [seletedPatient, setSelectedPatient] = useState({});
    const [seletedPatientForEdit, setSelectedPatientForEdit] = useState({});
    const [isSelectPatientOpen, setSelectPatientOpen] = useState(false);
    const [isAddOrEditPatientOpen, setAddOrEditPatientOpen] = useState(false);
    const [doctorNameToUpdate, setDoctorNameToUpdate] = useState("");
    const [isSubscribedPatient, setIsSubscribedPatient] = useState(false);
    const [doctorNameErrorMsg, setDoctorNameErrorMsg] = useState("");
    const [change, setChange] = useState(false);
    const [addPatienLoader, setAddPatienLoader] = useState(false);
    const [updateDoctorLoader, setUpdateDoctorLoader] = useState(false);
    const [shoppingCartBanner, setShoppingCartBanner] = useState("");
    const [isConfirmationOpen, setConfirmationOpen] = useState(false);
    const [isGenderRestricted, setIsGenderRestricted] = useState(false);
    const [isDuplicateItem, setIsDuplicateItem] = useState(false);
    const labCheckOutService = LabCheckoutService();
    const labCheckoutAction = LabCheckoutAction();
    const validate = Validate();

    useEffect(() => {
        if(validate.isNotEmpty(props?.location?.state?.errorMessage)){
            setErrorMsg({ message: props.location.state.errorMessage, type: "danger" ,timeOut:10000});
            toggleOpenSelectPatientModal();
        }
        labCheckoutAction.removeNewAddress();
        getLabShoppingCart();
    }, []);

    const getLabShoppingCart = () => {
        setInitialLoader(true);
        labCheckOutService.getLabShoppingCart().then((data) => {
            setShoppingCartFromResponse(data);
            setInitialLoader(false);
        }).catch(e => {
            console.log(e);
            setErrorMsg({ message: "something went wrong, please try again", type: "danger" });
            setInitialLoader(false);
        });
    }

    const checkForGenderResctrcitedTests = (responseData) => {
        let isGenderRestricted = false;
        if (responseData.shoppingCart && responseData.shoppingCart.shoppingCartItems && responseData.shoppingCart.shoppingCartItems.length > 0) {
            for (let index = 0; index < responseData.shoppingCart.shoppingCartItems.length; index++) {
                if (responseData.shoppingCart.shoppingCartItems[index].genderRestricted) {
                    isGenderRestricted = true;
                    break;
                }
            }
        }
        if (responseData.homeSampleCollectionItems && responseData.homeSampleCollectionItems.length > 0) {
            for (let index = 0; index < responseData.homeSampleCollectionItems.length; index++) {
                if (responseData.homeSampleCollectionItems[index].genderRestricted) {
                    isGenderRestricted = true;
                    break;
                }
            }
        }
        if (responseData.labSampleCollectionItems && responseData.labSampleCollectionItems.length > 0) {
            for (let index = 0; index < responseData.labSampleCollectionItems.length; index++) {
                if (responseData.labSampleCollectionItems[index].genderRestricted) {
                    isGenderRestricted = true;
                    break;
                }
            }
        }
        setIsGenderRestricted(isGenderRestricted);
    }

    const checkForDuplicateItem = response => {
        let shoppingCartItems = validate.isNotEmpty(response) 
                                && validate.isNotEmpty(response.shoppingCart) 
                                && validate.isNotEmpty(response.shoppingCart.shoppingCartItems) 
                                ? [...response.shoppingCart.shoppingCartItems] : [] ;
        if(!shoppingCartItems.length){
            return;
        }
        let duplicateItem = false;
        shoppingCartItems.every(each => {
            if(each.duplicateItem){
                duplicateItem = true;
                return false;
            }
            return true;
        });
        setIsDuplicateItem(duplicateItem);
    }

    const setShoppingCartFromResponse = (data) => {
        if (validate.isNotEmpty(data) && validate.isNotEmpty(data.statusCode) && "SUCCESS" == data.statusCode && validate.isNotEmpty(data.responseData)) {
            setMultipleServiceOptionsRequired(data.responseData.isMultipleServiceOptionsRequired);
            checkForGenderResctrcitedTests(data.responseData);
            setShoppingCart(data.responseData.shoppingCart);
            setHomeSampleCollectionItems(data.responseData.homeSampleCollectionItems);
            setLabSampleCollectionItems(data.responseData.labSampleCollectionItems);
            setCartSummary(data.responseData.cartSummary);
            setShoppingCartBanner(data.responseData.shoppingCartBanner);
            checkForDuplicateItem(data.responseData);
            if (validate.isEmpty(data.responseData.homeSampleCollectionItems)) {
                setDeliveryView("N");
            }
            if (validate.isEmpty(data.responseData.labSampleCollectionItems)) {
                setDeliveryView("F");
            }
            if (validate.isEmpty(data.responseData.shoppingCart.patientInfo)) {
                setSelectPatientOpen(true);
                setDoctorNameToUpdate("");
            } else {
                setSelectedPatient(data.responseData.shoppingCart.patientInfo);
                if (validate.isNotEmpty(data.responseData.shoppingCart.patientInfo.doctorName)) {
                    setDoctorNameToUpdate(data.responseData.shoppingCart.patientInfo.doctorName);
                    setDoctorNameErrorMsg("");
                }
            }
            if(validate.isNotEmpty(data.responseData.isSubscribedPatient)){
                setIsSubscribedPatient(data.responseData.isSubscribedPatient);
            }
        } else if (validate.isNotEmpty(data) && "FAILURE" == data.statusCode && validate.isNotEmpty(data.message)) {
            if ("Lab Shopping Cart is empty" == data.message) {
                labCheckoutAction.clearLabShoppingCart();
                redirectToLabWebsite();
            } else if ("Invalid Locality Info" == data.message) {
                setErrorMsg({ message: "Currently we are not serving the selected locality", type: "danger" });
                labCheckoutAction.clearLabShoppingCart();
                redirectToLabWebsite();
            } else if ("INVALID_CUSTOMER" == data.message) {
                redirectToLabWebsite();
            } else {
                setErrorMsg({ message: data.message, type: "danger" });
            }
        }
    }

    const redirectToLabWebsite = () => {
        props.history.push(`/${DIAGNOSTICS_HOME}`);
    }

    const redirectToCollectionPage = () => {
        if (validate.isEmpty(shoppingCart.patientInfo.doctorName) || validate.isEmpty(doctorNameToUpdate)) {
            setDoctorNameErrorMsg("Doctor Name is Required");
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        if (isGenderRestricted) {
            setErrorMsg({ message: "Please remove Gender Restricted tests from cart", type: "danger" });
            return
        }
        if(isDuplicateItem){
            setErrorMsg({ message: "Please remove Duplicate tests from cart.", type: "danger" });
            let duplicateItems = document.getElementsByClassName("duplicateTest");
            if(duplicateItems.length){
                duplicateItems[0].scrollIntoView();
            }
            return;
        }
        props.history.push(`${DIAGNOSTICS_URL_PREFIX}/sample-collection`);
    }

    const removePatientFromLabShoppingCart = (patientId) => {
        labCheckOutService.removePatientFromLabShoppingCart({ patientId: patientId }).then((data) => {
            if (validate.isNotEmpty(data) && "FAILURE" == data.statusCode && validate.isNotEmpty(data.message)) {
                setErrorMsg({ message: data.message, type: "danger" });
                labCheckoutAction.clearLabShoppingCart();
                setTimeout(() => redirectToLabWebsite(), 2000);
            }
        }).catch(e => {
            console.log("error : " + JSON.stringify(e));
            setErrorMsg({ message: "something went wrong,please try again", type: "danger" });
        });
    }

    const addPatientToShoppingCart = (patientId,doctor,updateDefaultDetails,doctorNameFromPatientModel) => {
        if (validate.isEmpty(patientId)) {
            setErrorMsg({ message: "Complete info not available for Selected Patient. Please Edit to Proceed.", type: "danger" });
            return;
        }
        setAddPatienLoader(true);
        labCheckOutService.addPatientToShoppingCart(patientId, doctorNameFromPatientModel ? doctorNameFromPatientModel : seletedPatient ? seletedPatient.doctorName : "Self").then((data) => {
            setShoppingCartFromResponse(data);
            if (validate.isNotEmpty(data) && validate.isNotEmpty(data.statusCode) && "SUCCESS" == data.statusCode && validate.isNotEmpty(data.responseData)) {
                setSelectPatientOpen(false);
            }
            setAddPatienLoader(false);
        }).catch(e => {
            console.log("error : " + JSON.stringify(e));
            setErrorMsg({ message: "something went wrong,please try again", type: "danger" });
            setAddPatienLoader(false);
        });
    }


    const updateDoctorToPatient = () => {
        let errorMsg = validate.name(doctorNameToUpdate, "Doctor Name");
        if (validate.isNotEmpty(errorMsg)) {
            setDoctorNameErrorMsg(errorMsg);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        setUpdateDoctorLoader(true);
        labCheckOutService.updateDoctorToPatient("", doctorNameToUpdate).then((data) => {
            setShoppingCartFromResponse(data);
            setUpdateDoctorLoader(false);
        }).catch(e => {
            console.log("error : " + JSON.stringify(e));
            setErrorMsg({ message: "something went wrong,please try again", type: "danger" });
            setUpdateDoctorLoader(false);
        });
    }

    const toggleOpenSelectPatientModal = () => {
        setSelectPatientOpen(!isSelectPatientOpen)
    }

    function toggleEditAddressModal() {
        setEditAddressModal(!editAddressModal)
    }
    const showEditAddressModel = () => {
        toggleGetPhysicalReportModal()
        toggleEditAddressModal()
    }

    const clearError = () => {
        setErrorMsg({});
    }

    const removeTestFromCart = (testId) => {
        setBackDropLoader(true);
        labCheckOutService.removeTestFromCart(testId).then((data) => {
            setShoppingCartFromResponse(data);
            setBackDropLoader(false);
            if (validate.isNotEmpty(data) && validate.isNotEmpty(data.statusCode) && "SUCCESS" == data.statusCode && validate.isNotEmpty(data.responseData)) {
                labCheckoutAction.saveLabShoppingCart(data.responseData.shoppingCart);
            }
        }).catch(e => {
            console.log("error : " + JSON.stringify(e));
            setErrorMsg({ message: "something went wrong,please try again", type: "danger" });
            setBackDropLoader(false);
        });
    }

    const setDoctorName = (doctorName) => {
        if (validate.isNotEmpty(doctorName) && !validate.isAlphaWithSpace(doctorName)) {
            return;
        } else {
            setDoctorNameToUpdate(doctorName);
        }
    }

    return (
        <React.Fragment>
            {validate.isNotEmpty(errorMsg) && <Alert alertInfo={errorMsg} onDurationEnd={clearError} duration={errorMsg.timeOut || 5000} />}
            <main role="main" className="container-lg container-fluid">
                <div className="row px-sm-3">
                    {initialLoader && <ShoppingCartGhostImage isCartProductsLoading={initialLoader} isLabsCart={true} />}
                    <div className="col-8 pl-0 pr-2">
                        {validate.isNotEmpty(shoppingCart.patientInfo) &&
                            <div className="labs-patient-info">
                                <div className="each-info">
                                    <section className="h-100">
                                        <div className="header">
                                            <p>Selected Patient</p>
                                        </div>
                                        <div className="lab-patient-card">
                                            <div>
                                                <h6 className="mb-0"><p className="patient-name text-truncate text-capitalize" style={isSubscribedPatient ? {} : { maxWidth: "unset" }}>{shoppingCart.patientInfo.patientName}</p> {isSubscribedPatient && <span className="badge badge-primary ml-1 align-top">MA Participant</span>}</h6>
                                                <small className="text-secondary">{validate.isNotEmpty(shoppingCart.patientInfo.dateOfBirth) && getDisplayableAge(shoppingCart.patientInfo.dateOfBirth)} {validate.isNotEmpty(shoppingCart.patientInfo.gender) && validate.isNotEmpty(shoppingCart.patientInfo.dateOfBirth) && "/"} {validate.isNotEmpty(shoppingCart.patientInfo.gender) && Gender[shoppingCart.patientInfo.gender]} {validate.isNotEmpty(shoppingCart.patientInfo.doctorName) && (" / Dr " + shoppingCart.patientInfo.doctorName)}</small>
                                            </div>
                                            <button className="btn brand-secondary cate-btn rounded-pill" aria-label="Edit" role="button" title="Edit" onClick={() => { setChange(true); toggleOpenSelectPatientModal(); }}>Edit</button>
                                        </div>
                                    </section>
                                </div>
                                {/* {validate.isEmpty(shoppingCart.patientInfo.doctorName) && */}
                                <div className="each-info">
                                    <section className="h-100">
                                        <div className="header">
                                            <p>Doctor Details</p>
                                        </div>
                                        <div className="px-3 pb-3 pt-2">
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text" id="basic-addon1">Dr</span>
                                                </div>
                                                <input type="text" id="docName" className={validate.isNotEmpty(doctorNameErrorMsg) ? "form-control is-invalid" : "form-control"} maxLength={30} placeholder="Enter Doctor Name" autoComplete="off" aria-label="Enter Doctor Name" aria-describedby="doctor-field" value={doctorNameToUpdate} onChange={(e) => { setDoctorName(e.target.value) }} onBlur={() => updateDoctorToPatient()} disabled={updateDoctorLoader} />
                                            </div>
                                            {validate.isNotEmpty(doctorNameErrorMsg) && <span className="text-danger" id="doctor-field"><small>{doctorNameErrorMsg}</small></span>}
                                        </div>
                                    </section>
                                </div>
                                {/* } */}
                            </div>}
                        {isMultipleServiceOptionsRequired &&
                            <section>
                                <div className="header">
                                    <p>Home collection is available for some of the tests you have selected. Would you like:</p>
                                </div>
                                <div className="d-flex justify-content-between px-3 pb-3 pt-2">
                                    <div className="w-100">
                                        <div className="custom-control custom-radio">
                                            <input type="radio" id="labCollection" className="custom-control-input" name="collectionType" />
                                            <label className="custom-control-label pl-2 pointer" htmlFor="labCollection">
                                                <p className="font-weight-bold mb-0 font-14">All samples collected at Lab</p>
                                                <small>All sample are collected at Lab Walk-in</small>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="w-100">
                                        <div className="custom-control custom-radio">
                                            <input type="radio" id="partialLabCollection" className="custom-control-input" name="collectionType" />
                                            <label className="custom-control-label pl-2 pointer" htmlFor="partialLabCollection">
                                                <p className="font-weight-bold mb-0 font-14">Partial Home sample collection</p>
                                                <small>3 Tests at Home and 2 tests at Lab Walk-in</small>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </section>}
                        {validate.isNotEmpty(shoppingCart) && validate.isNotEmpty(shoppingCart.shoppingCartItems) && deliveryView != "P" &&
                            <section>
                                <div className="header"><p>Test Details</p></div>
                                <ul className="product-listview list-group list-group-flush test-items">
                                    {shoppingCart.shoppingCartItems.map(eachLabShoppingCartItem => {
                                        return (eachLabShoppingCartItem &&
                                            <LabShoppingCartItem key={eachLabShoppingCartItem.testCode} labShoppingCartItem={eachLabShoppingCartItem} removeTestFromCart={removeTestFromCart} />
                                        )
                                    })}
                                </ul>
                            </section>}
                        {validate.isNotEmpty(homeSampleCollectionItems) && deliveryView == "P" &&
                            <section>
                                <div className="header"><p>Selected Tests (for Home Collection)</p></div>
                                <ul className="product-listview list-group list-group-flush test-items">
                                    {homeSampleCollectionItems && homeSampleCollectionItems.map(eachLabShoppingCartItem => {
                                        return (eachLabShoppingCartItem &&
                                            <LabShoppingCartItem key={eachLabShoppingCartItem.testCode} labShoppingCartItem={eachLabShoppingCartItem} removeTestFromCart={removeTestFromCart} />
                                        )
                                    })}
                                </ul>
                            </section>}
                        {validate.isNotEmpty(labSampleCollectionItems) && deliveryView == "P" &&
                            <section>
                                <div className="header"><p>Selected Tests ( for Lab Walk-In)</p></div>
                                <ul className="product-listview list-group list-group-flush test-items">
                                    {labSampleCollectionItems && labSampleCollectionItems.map(eachLabShoppingCartItem => {
                                        return (eachLabShoppingCartItem &&
                                            <LabShoppingCartItem key={eachLabShoppingCartItem.testCode} labShoppingCartItem={eachLabShoppingCartItem} removeTestFromCart={removeTestFromCart} />
                                        )
                                    })}
                                </ul>
                            </section>}
                          {isSubscribedPatient && <LabCheckoutInfoNote/>}
                    </div>
                    <div className="col-4 pl-2 pr-0">
                        {!initialLoader && shoppingCartBanner && <img className="img-fluid mb-3 w-100 rounded" src={shoppingCartBanner} alt="Click to know more" />}
                        {!initialLoader && validate.isNotEmpty(cartSummary) &&
                            <LabCartSummary couponCode={shoppingCart.couponCode} {...cartSummary} isShoppingCart={true} shoppingCart={shoppingCart}/>
                        }
                    </div>
                </div>
            </main>
            {(isSelectPatientOpen || isAddOrEditPatientOpen || isConfirmationOpen) && <PatientModel errMsg={setErrorMsg} isAddOrEditPatientOpen={isAddOrEditPatientOpen} setAddOrEditPatientOpen={setAddOrEditPatientOpen} seletedPatientForEdit={seletedPatientForEdit} isSelectPatientOpen={isSelectPatientOpen} setSelectPatientOpen={setSelectPatientOpen} seletedPatient={seletedPatient} setSelectedPatient={setSelectedPatient} addPatientToShoppingCart={addPatientToShoppingCart} setSelectedPatientForEdit={setSelectedPatientForEdit} addPatienLoader={addPatienLoader} history={props.history} callBackFunc={removePatientFromLabShoppingCart} setAlertErrorMsg={setErrorMsg} isConfirmationOpen = {isConfirmationOpen} setConfirmationOpen = {setConfirmationOpen}/>}
            <footer className="footer fixed-bottom mt-auto py-2">
                <div className="container-lg container-fluid  px-0 px-sm-3">
                    <div className="row align-items-center no-gutters">
                        <div className="col-12 text-right">
                            <button type="button" role="button" className="brand-secondary btn px-5 rounded-pill custom-btn-lg" onClick={() => redirectToLabWebsite()}>Add More Tests</button>
                            <button type="button" role="button" className="btn btn-brand-gradient rounded-pill px-5  ml-3 custom-btn-lg" onClick={() => redirectToCollectionPage()}>Proceed</button>
                        </div>
                    </div>
                </div>
            </footer>
        </React.Fragment>
    )
}
export default LabShoppingCart;
