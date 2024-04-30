import React, { useState, useEffect, useMemo } from 'react';
import HomeSamplePickup from './HomeSamplePickup';
import OnlyHomeSamplePickup from './OnlyHomeSamplePickup';
import StoreSampleCollectionCentre from '../../../../Checkout/Delivery/PickUpStores';
import OnlySampleCollectionCentre from '../../../../Checkout/Delivery/OnlyStorePickUp';
import SampleCollectionGhostImages from '../../../../Checkout/Delivery/DeliveryGhostImages';
import { getLabSelectedLocality } from '../../../../../../redux/action/LocalityAction';
import Validate from '../../../../../helpers/Validate';
import Alert, { ALERT_TYPE_ERROR } from '../../../../Common/Alert';
import LabCheckoutService from '../../../Services/LabCheckoutService';
import LabNewCheckoutAction from '../../../redux/action/LabNewCheckoutAction';
import { DIAGNOSTICS_HOME, DIAGNOSTICS_URL_PREFIX,VISIT_TYPE_HOME, VISIT_TYPE_LAB } from '../../../constants/LabConstants';

const SampleCollection = (props) => {

    const labCheckoutService = LabCheckoutService();
    const selectedLocality = getLabSelectedLocality();
    const validate = Validate();
    const labNewCheckoutAction = LabNewCheckoutAction();
    const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
    const [isProceedLoading, setProceedLoading] = useState(false);
    const [deliveryType, setDeliveryType] = useState("DEFAULT_DELIVERY");
    const [customerAddressList, setCustomerAddressList] = useState([]);
    const [collectionCentresInfo, setCollectionCentresInfo] = useState({});
    const [partialCollectionCentresInfo, setPartialCollectionCentresInfo] = useState({});
    const [lastVisitCollectionCentreInfo, setLastVisitCollectionCentreInfo] = useState({});
    const [selectedDeliveryType,setSelectedDeliveryType] = useState({});
    const [homeSamplePickupAddress, setHomeSamplePickupAddress] = useState({});
    const [selectedCollectionCentreId, setSelectedCollectionCentreId] = useState("");
    const [isAllowProceedBtn, setIsAllowProceedBtn] = useState(true);
    const [addEditAddress, setAddEditAddress] = useState("");
    const [homeDeliveryLoader, setHomeDeliveryLoader] = useState(false);
    const [storePickUpLoader, setStorePickUpLoader] = useState(false);
    const [individualLoader, setIndividualLoader] = useState(false);
    const [nearByLocations, setNearByLocations] = useState(["All"]);
    const [isNewAddressAdded, setIsNewAddressAdded] = useState(false);
    const [checkoutVerticle, setCheckoutVerticle] = useState("LAB_CHECKOUT");

    useEffect(() => {
        const labShoppingCart = labNewCheckoutAction.getLabShoppingCart();
        setCheckoutVerticle("LAB_CHECKOUT");
        if(validate.isNotEmpty(labShoppingCart) && (labShoppingCart.homeSampleCollectionAllowed == "NOT_ALLOWED" || labShoppingCart.homeSampleCollectionAllowed == "PARTIALLY_ALLOWED")) {
            setDeliveryType("ONLY_STORE_PICK");
        } else if(validate.isNotEmpty(labShoppingCart) && (labShoppingCart.homeSampleCollectionAllowed == "FULLY_ALLOWED")) {
            setDeliveryType("DEFAULT_DELIVERY");
        }
        getSampleCollectionInfo();
    }, []);

    const getSampleCollectionInfo = async () => {
        setIndividualLoader(true);
        await getCustomerAddresses();
        await getCollectionCentersDetails();
        setIndividualLoader(false);
    }

    const shoppingCart = labNewCheckoutAction.getLabShoppingCart();
    const shoppingCartList = shoppingCart.shoppingCartItems;

    const memorisedShoppingcartList = useMemo(() => {
        const itemsListMap = {};
        if (validate.isNotEmpty(shoppingCartList)) {
            shoppingCartList.map(eachItem => itemsListMap[eachItem.testCode] = eachItem.testName)
        }
        return itemsListMap;
    }, [shoppingCartList])

    const getCustomerAddresses = async () => {
        setHomeDeliveryLoader(true);
        setStorePickUpLoader(true);
        labCheckoutService.getCustomerAddresses().then(response => {
            if(validate.isNotEmpty(response) && response.statusCode === "SUCCESS" && validate.isNotEmpty(response.responseData)) {
                const shoppingCartSampleCollectionInfo = response.responseData.sampleCollectionInfo;
                if(validate.isNotEmpty(shoppingCartSampleCollectionInfo) && shoppingCartSampleCollectionInfo.visitType == "HOME" && validate.isNotEmpty(shoppingCartSampleCollectionInfo.homeCollectionAddress)) {
                    const shoppingCartAddress = shoppingCartSampleCollectionInfo.homeCollectionAddress;
                    let selectedAddress = null;
                    let selectedAddressIndex = 0;
                    if(validate.isNotEmpty(response.responseData.labAddressesList)){
                        response.responseData.labAddressesList.map((eachAddress, index) => {
                            if(validate.isNotEmpty(eachAddress) && shoppingCartAddress.firstName == eachAddress.firstName && shoppingCartAddress.lastName == eachAddress.lastName && shoppingCartAddress.addressLine1 == eachAddress.addressLine1 && shoppingCartAddress.addressLine2 == eachAddress.addressLine2) {
                                selectedAddress = eachAddress;
                                selectedAddressIndex = index;
                            }
                        });
                    }
                    if(validate.isNotEmpty(selectedAddress)) {
                        setHomeDeliveryInfo(selectedAddress, selectedAddressIndex);
                        setCustomerAddressList(response.responseData.labAddressesList);
                    } else if(validate.isEmpty(selectedAddress) && selectedAddressIndex == 0) {
                        updateCustomerAddressList(shoppingCartAddress, selectedAddressIndex);
                        const labAddressesList = validate.isNotEmpty(response.responseData.labAddressesList) ? response.responseData.labAddressesList : [];
                        setCustomerAddressList([shoppingCartAddress, ...labAddressesList]);
                        setIsNewAddressAdded(true);
                    }
                } else {
                    setCustomerAddressList(validate.isNotEmpty(response.responseData.labAddressesList) ? response.responseData.labAddressesList : []);
                }
            } else if(validate.isNotEmpty(response) && response.statusCode === "FAILURE") {
                setAlertInfo({ message: "System experiencing some problem, Please try after some time", type: ALERT_TYPE_INFO});
                props.history.push(`/${DIAGNOSTICS_HOME}`);
            }
            setHomeDeliveryLoader(false);
            setStorePickUpLoader(false);
        }).catch(function(error) {
            setHomeDeliveryLoader(false);
            setStorePickUpLoader(false);
            setAlertInfo({ message: "System experiencing some problem, Please try after some time", type: ALERT_TYPE_ERROR});
        });
    }

    const getCollectionCentersDetails = async () => {
        setHomeDeliveryLoader(true);
        setStorePickUpLoader(true);
        labCheckoutService.getCollectionCenters().then(response => {
            if(validate.isNotEmpty(response) && response.statusCode === "SUCCESS" && validate.isNotEmpty(response.responseData)) {
                const shoppingCartSampleCollectionInfo = response.responseData.sampleCollectionInfo;
                let reduxCollectionCenterId = null;
                if(validate.isNotEmpty(shoppingCartSampleCollectionInfo) && shoppingCartSampleCollectionInfo.visitType == "LAB" && validate.isNotEmpty(shoppingCartSampleCollectionInfo.labCollectionCenterId)) {
                    reduxCollectionCenterId = shoppingCartSampleCollectionInfo.labCollectionCenterId;
                }
                if(validate.isNotEmpty(response.responseData.pathLabStoreInfo)) {
                    let tempNearByLocations = new Array();
                    tempNearByLocations.push("All");
                    var existingCollectionCenterInfo = null;
                    response.responseData.pathLabStoreInfo.map((eachCollectionCentre) => {
                        if(validate.isNotEmpty(eachCollectionCentre.pathLabStore.locality)) {
                            tempNearByLocations.push(eachCollectionCentre.pathLabStore.locality);
                        }
                        if(validate.isNotEmpty(reduxCollectionCenterId) && eachCollectionCentre.pathLabStore.storeId == reduxCollectionCenterId) {
                            setPickUpStoreInfo(eachCollectionCentre.pathLabStore.storeId);
                        }
                        if(validate.isNotEmpty(response.responseData.previousSelectedColletionCenter) && response.responseData.previousSelectedColletionCenter == eachCollectionCentre.pathLabStore.storeId){
                            existingCollectionCenterInfo = eachCollectionCentre.pathLabStore
                        }
                    })
                    setNearByLocations(tempNearByLocations);
                    if(validate.isNotEmpty(existingCollectionCenterInfo)) {
                        setLastVisitCollectionCentreInfo(existingCollectionCenterInfo);
                        response.responseData.pathLabStoreInfo = response.responseData.pathLabStoreInfo.filter((item) => item.pathLabStore.storeId !== existingCollectionCenterInfo.storeId)
                    }
                    setCollectionCentresInfo(response.responseData.pathLabStoreInfo);
                    setPartialCollectionCentresInfo(response.responseData.partialPathLabStoresInfo)
                }
            }
            setHomeDeliveryLoader(false);
            setStorePickUpLoader(false);
        }).catch(function(error) {
            setHomeDeliveryLoader(false);
            setStorePickUpLoader(false);
            setAlertInfo({ message: "System experiencing some problem, Please try after some time", type: ALERT_TYPE_ERROR});
        });
    }

    const setAddOrEditAddress = (value) => {
        setAddEditAddress(value);
    }

    const updateCustomerAddressList = (newCustomerAddress, addressIndex) => {
        setHomeDeliveryInfo(newCustomerAddress, addressIndex);
        if(addEditAddress === "EDIT_ADDRESS") {
            let tempCustomerAddressList = [];
            customerAddressList.map((eachAddress, index) => {
                if(index == addressIndex) {
                    tempCustomerAddressList.push(newCustomerAddress);
                } else {
                    tempCustomerAddressList.push(eachAddress);
                }
            });
            setCustomerAddressList(tempCustomerAddressList);
        } else if(addEditAddress === "ADD_ADDRESS") {
            if(validate.isNotEmpty(customerAddressList)) {
                setCustomerAddressList([newCustomerAddress, ...customerAddressList]);
            } else {
                setCustomerAddressList([newCustomerAddress]);
            }
        }
    }

    const saveSelectedDeliveryType = (data) => {
        setSelectedDeliveryType(data);
    }

    const setHomeDeliveryInfo = (address, index) => {
        setIsAllowProceedBtn(false);
        setSelectedDeliveryType({HOME_DELIVERY : index});
        setHomeSamplePickupAddress(address);
    }

    const setPickUpStoreInfo = (storeId) => {
        setIsAllowProceedBtn(false);
        setSelectedDeliveryType({STORE_PICK_UP : storeId});
        setSelectedCollectionCentreId(storeId);
    }

    const clearSelectedAddressInfo = () => {
        setSelectedDeliveryType({});
        setHomeSamplePickupAddress({});
        setSelectedCollectionCentreId("");
        setIsAllowProceedBtn(true);
    }

    const showLoader = (isHomeDeliveryLoader,isPickStoreLoader,isIndividualLoader) => {
        setHomeDeliveryLoader(isHomeDeliveryLoader);
        setStorePickUpLoader(isPickStoreLoader);
        setIndividualLoader(isIndividualLoader);
    }

    const setIsNewAddressAddedFlag = (isNewAddress) => {
        setIsNewAddressAdded(isNewAddress);
        labNewCheckoutAction.setIsNewAddressAdded(isNewAddress);
    }

    const saveSampleCollectionInfo = () => {
        setIsAllowProceedBtn(false);
        if(validate.isEmpty(selectedDeliveryType)) {
            setAlertInfo({ message: "Please Select Delivery Option", type: ALERT_TYPE_ERROR});
            return;
        }
        if (deliveryType === 'DEFAULT_DELIVERY') {
            if(validate.isNotEmpty(selectedDeliveryType.HOME_DELIVERY)) {
                if(validate.isEmpty(homeSamplePickupAddress)) {
                    setAlertInfo({ message: "Please Select Any Address", type: ALERT_TYPE_ERROR});
                    return;
                }
                setDeliveryLocationToCart(1, null, homeSamplePickupAddress);
            } else if (validate.isNotEmpty(selectedDeliveryType.STORE_PICK_UP)) {
                if(validate.isEmpty(selectedCollectionCentreId)) {
                    setAlertInfo({ message: "Please Select Any Collection Centre", type: ALERT_TYPE_ERROR});
                    return;
                }
                setDeliveryLocationToCart(2, selectedCollectionCentreId, null);
            }
        } else if (deliveryType === 'ONLY_HOME_DELIVERY') {
            if(validate.isEmpty(selectedDeliveryType.HOME_DELIVERY) || validate.isEmpty(homeSamplePickupAddress)) {
                setAlertInfo({ message: "Please Select Any Address", type: ALERT_TYPE_ERROR});
                return;
            }
            setDeliveryLocationToCart(1, null, homeSamplePickupAddress);
        } else if(deliveryType === 'ONLY_STORE_PICK') {
            if(validate.isEmpty(selectedDeliveryType.STORE_PICK_UP) || validate.isEmpty(selectedCollectionCentreId)) {
                setAlertInfo({ message: "Please Select Any Collection Centre", type: ALERT_TYPE_ERROR});
                return;
            }
            setDeliveryLocationToCart(2, selectedCollectionCentreId, null);
        } 
        setIsAllowProceedBtn(true);
    }

    const setDeliveryLocationToCart = (visitType, selectedCollectionCenterId, homeSamplePickupAddress) => {
        if(validate.isNotEmpty(visitType) && (validate.isNotEmpty(selectedCollectionCenterId) || validate.isNotEmpty(homeSamplePickupAddress))) {
            setProceedLoading(true);
            setIsAllowProceedBtn(false);
            let requestObject = {};
            if(validate.isNotEmpty(homeSamplePickupAddress)){
                labNewCheckoutAction.setVisitType(VISIT_TYPE_HOME);
                requestObject = {homeOrLab: VISIT_TYPE_HOME, firstName : homeSamplePickupAddress.firstName, addressLine1 : homeSamplePickupAddress.addressLine1, mobileNo : homeSamplePickupAddress.mobileNo};
            } else if(validate.isNotEmpty(selectedCollectionCenterId)){
                labNewCheckoutAction.setVisitType(VISIT_TYPE_LAB);
                requestObject = {homeOrLab: VISIT_TYPE_LAB, selectedCollectionCenterId : selectedCollectionCenterId};
            }
            labCheckoutService.setDeliveryLocationToCart(requestObject).then(response => {
                setProceedLoading(false);
                setIsAllowProceedBtn(true);
                if(validate.isNotEmpty(response) && response.statusCode === "SUCCESS") {
                    let isNewAddress = false;
                    if(addEditAddress === "ADD_ADDRESS") {
                        isNewAddress = true;
                    }
                    setIsNewAddressAddedFlag(isNewAddress);
                    props.history.push(`${DIAGNOSTICS_URL_PREFIX}/schedule-slot`);
                } else if(validate.isNotEmpty(response) && response.statusCode === "FAILURE") {
                    setAlertInfo({ message: response.message, type: ALERT_TYPE_ERROR});
                    if(response.message === "Lab Shopping Cart is empty"){
                        props.history.replace(`${DIAGNOSTICS_URL_PREFIX}/lab-shopping-cart`);
                    }
                } else {
                    setAlertInfo({ message: "System experiencing some problem, Please try after some time", type: ALERT_TYPE_ERROR});
                }
            }).catch(function(error){
                console.error(error);
                setProceedLoading(false);
                setIsAllowProceedBtn(true);
                setAlertInfo({ message: "System experiencing some problem, Please try after some time", type: ALERT_TYPE_ERROR});
            });
        }
    }

    const goBackAction = () => {
        props.history.push(`${DIAGNOSTICS_URL_PREFIX}/lab-shopping-cart`);
    }

    return (
        <React.Fragment>
            <main role="main" className="container-lg container-fluid">
                <div className="row position-relative">
                    {/* Home delivery section */}
                    <SampleCollectionGhostImages homeDeliveryLoader={homeDeliveryLoader} storePickUpLoader={storePickUpLoader} individualLoader={individualLoader}/>
                    {deliveryType === 'DEFAULT_DELIVERY' && !homeDeliveryLoader && !storePickUpLoader && <div className={ deliveryType === 'DEFAULT_DELIVERY' ? "col-4 pl-0 mb-3" : "col-4 pl-0 pr-2 mb-3"} style={deliveryType === 'DEFAULT_DELIVERY' ? {paddingRight: "2rem"} : {}}>
                        <HomeSamplePickup saveSelectedDeliveryType={saveSelectedDeliveryType} customerAddressList={customerAddressList} setHomeDeliveryInfo={setHomeDeliveryInfo} selectedDeliveryType={selectedDeliveryType} updateCustomerAddressList={updateCustomerAddressList} deliveryType={deliveryType} clearSelectedAddressInfo={clearSelectedAddressInfo} setAddOrEditAddress={setAddOrEditAddress} addEditAddress={addEditAddress} showLoader={showLoader} setIsNewAddressAddedFlag={setIsNewAddressAddedFlag} isNewAddressAdded={isNewAddressAdded} communitiesForHub={{}} />
                    </div>}
                    { (deliveryType === 'DEFAULT_DELIVERY' && !homeDeliveryLoader && !storePickUpLoader) && <div className="vertical-seperator">
                        <span className="shadow-sm">OR</span>
                        </div>}
                    {/* Store pickup section */}
                    {deliveryType === 'DEFAULT_DELIVERY' && !homeDeliveryLoader && !storePickUpLoader && <div className={ deliveryType === 'DEFAULT_DELIVERY' ? "col-8 pr-0 mb-3" : "col-8 pl-2 pr-0 mb-3"} style={deliveryType === 'DEFAULT_DELIVERY' ? {paddingLeft: "2rem"} : {}}>
                        {(lastVisitCollectionCentreInfo || collectionCentresInfo || partialCollectionCentresInfo) && <StoreSampleCollectionCentre selectedLocality={selectedLocality} prevSelectedStoreInfo={lastVisitCollectionCentreInfo} deliverableStoresInfo={collectionCentresInfo} partialDeliverableStoresInfo = {partialCollectionCentresInfo} setPickUpStoreInfo={setPickUpStoreInfo} selectedDeliveryType={selectedDeliveryType} deliveryType={deliveryType} nearByLocations={nearByLocations} checkoutVerticle={checkoutVerticle} saveSampleCollectionInfo={saveSampleCollectionInfo} shoppingCartList={memorisedShoppingcartList}/>}
                    </div>}
                    {deliveryType !== 'DEFAULT_DELIVERY' && <div className="col-12 p-0 mb-3">
                        {deliveryType === 'ONLY_STORE_PICK' && !storePickUpLoader && <OnlySampleCollectionCentre selectedLocality={selectedLocality} prevSelectedStoreInfo={lastVisitCollectionCentreInfo} deliverableStoresInfo={collectionCentresInfo} partialDeliverableStoresInfo = {partialCollectionCentresInfo} setPickUpStoreInfo={setPickUpStoreInfo} selectedDeliveryType={selectedDeliveryType} deliveryType={deliveryType} nearByLocations={nearByLocations} checkoutVerticle={checkoutVerticle} saveSampleCollectionInfo={saveSampleCollectionInfo} shoppingCartList={memorisedShoppingcartList}/>}
                        {deliveryType === 'ONLY_HOME_DELIVERY' && !individualLoader && <OnlyHomeSamplePickup saveSelectedDeliveryType={saveSelectedDeliveryType} customerAddressList={customerAddressList} setHomeDeliveryInfo={setHomeDeliveryInfo} selectedDeliveryType={selectedDeliveryType} deliveryType={deliveryType} setAddOrEditAddress={setAddOrEditAddress} addEditAddress={addEditAddress} clearSelectedAddressInfo={clearSelectedAddressInfo} updateCustomerAddressList={updateCustomerAddressList} showLoader={showLoader} setIsNewAddressAddedFlag={setIsNewAddressAddedFlag} isNewAddressAdded={isNewAddressAdded} communitiesForHub={{}}/>}
                    </div>}
                </div>
            </main>
            <React.Fragment>
                <footer className="footer fixed-bottom mt-auto py-2">
                    <div className="container-lg container-fluid  px-0 px-sm-3">
                        <div className="row align-items-center no-gutters">
                            <div className="col-12 text-right">
                                <button type="button" role="button" className="brand-secondary btn px-5 rounded-pill custom-btn-lg" disabled={isProceedLoading} onClick={() => goBackAction()}>Back</button>
                                <button type="button" role="button" className="btn btn-brand-gradient rounded-pill px-5 ml-3 custom-btn-lg" disabled={isAllowProceedBtn} onClick={() => saveSampleCollectionInfo()}>
                                    {isProceedLoading ? "" : "Proceed to Schedule A Slot"}
                                    {isProceedLoading &&
                                        <React.Fragment>
                                            <div className='spinner-loader'>
                                            <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                                            <span className="sr-only"></span>
                                            </div>
                                        </React.Fragment>
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                </footer>
            </React.Fragment>
            {alertInfo && alertInfo.message && <Alert alertInfo={alertInfo} duration={5000} onDurationEnd={setAlertInfo}/>}
        </React.Fragment>
    );
}
export default SampleCollection;
