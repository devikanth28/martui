import React, { useState, useEffect } from 'react';
import LabCheckoutService from '../../../../services/LabCheckoutService';
import HomeSamplePickup from './HomeSamplePickup';
import OnlyHomeSamplePickup from './OnlyHomeSamplePickup';
import StoreSampleCollectionCentre from '../../../Checkout/Delivery/PickUpStores';
import OnlySampleCollectionCentre from '../../../Checkout/Delivery/OnlyStorePickUp';
import SampleCollectionGhostImage from '../../../Checkout/Delivery/DeliveryGhostImages';
import { getLabSelectedLocality } from '../../../../../redux/action/LocalityAction';
import Validate from '../../../../helpers/Validate';
import AlertMessage from '../../../Common/AlertMessage';
import LabCheckoutAction from '../../../../../redux/action/LabCheckoutAction';
import { remove } from 'js-cookie';

const SampleCollection = (props) => {

    const labCheckoutService = LabCheckoutService();
    const selectedLocality = getLabSelectedLocality();
    const validate = Validate();
    const labCheckoutAction = LabCheckoutAction();
    const [isProceedLoading, setProceedLoading] = useState(false);
    const [deliveryType, setDeliveryType] = useState("DEFAULT_DELIVERY");
    const [customerAddressList, setCustomerAddressList] = useState([]);
    const [collectionCentresInfo, setCollectionCentresInfo] = useState({});
    const [lastVisitCollectionCentreInfo, setLastVisitCollectionCentreInfo] = useState({});
    const [selectedDeliveryType,setSelectedDeliveryType] = useState({});
    const [homeSamplePickupAddress, setHomeSamplePickupAddress] = useState({});
    const [selectedCollectionCentreId, setSelectedCollectionCentreId] = useState("");
    const [message, setMessage] = useState("");
    const [showAlertMessage, setShowAlertMessage] = useState(true);
    const [isAllowProceedBtn, setIsAllowProceedBtn] = useState(true);
    const [addEditAddress, setAddEditAddress] = useState("");
    const [homeDeliveryLoader, setHomeDeliveryLoader] = useState(false);
    const [storePickUpLoader, setStorePickUpLoader] = useState(false);
    const [individualLoader, setIndividualLoader] = useState(false);
    const [nearByLocations, setNearByLocations] = useState(["All"]);
    const [isNewAddressAdded, setIsNewAddressAdded] = useState(false);
    const [checkoutVerticle, setCheckoutVerticle] = useState("LAB_CHECKOUT");

    useEffect(() => {
        setCheckoutVerticle("LAB_CHECKOUT");
        if(validate.isNotEmpty(selectedLocality) && selectedLocality.sampleCollectionAllowed == "H") {
            setDeliveryType("ONLY_HOME_DELIVERY");
        } else if(validate.isNotEmpty(selectedLocality) && selectedLocality.sampleCollectionAllowed == "L") {
            setDeliveryType("ONLY_STORE_PICK");
        } else if(validate.isNotEmpty(selectedLocality) && selectedLocality.sampleCollectionAllowed == "A") {
            setDeliveryType("DEFAULT_DELIVERY");
        }
        getSampleCollectionInfo();
    }, []);

    const getSampleCollectionInfo = async () => {
        setHomeDeliveryLoader(true);
        setStorePickUpLoader(true);
        setIndividualLoader(true);
        await getCustomerAddresses();
        await getCollectionCentersDetails();
        setHomeDeliveryLoader(false);
        setStorePickUpLoader(false);
        setIndividualLoader(false);
    }

    const getCustomerAddresses = async () => {
        labCheckoutService.getCustomerAddresses().then(response => {
            if(validate.isNotEmpty(response) && response.statusCode === "SUCCESS" && validate.isNotEmpty(response.responseData)) {
                const reduxSampleCollectionInfo = labCheckoutAction.getSampleCollectionInfoFromShoppingCart();
                if(validate.isNotEmpty(reduxSampleCollectionInfo) && reduxSampleCollectionInfo.visitType == "1" && validate.isNotEmpty(reduxSampleCollectionInfo.address)) {
                    const reduxAddress = reduxSampleCollectionInfo.address;
                    let selectedAddress = null;
                    let selectedAddressIndex = 0;
                    response.responseData.map((eachAddress, index) => {
                        if(validate.isNotEmpty(eachAddress) && reduxAddress.firstName == eachAddress.firstName && reduxAddress.lastName == eachAddress.lastName && reduxAddress.addressLine1 == eachAddress.addressLine1 && reduxAddress.addressLine2 == eachAddress.addressLine2) {
                            selectedAddress = eachAddress;
                            selectedAddressIndex = index;
                        }
                    });
                    if(validate.isNotEmpty(selectedAddress)) {
                        setHomeDeliveryInfo(selectedAddress, selectedAddressIndex);
                        setCustomerAddressList(response.responseData);
                    } else if(validate.isEmpty(selectedAddress) && selectedAddressIndex == 0) {
                        updateCustomerAddressList(reduxAddress, selectedAddressIndex);
                        setCustomerAddressList([reduxAddress, ...response.responseData]);
                        setIsNewAddressAdded(true);
                    }
                } else {
                    setCustomerAddressList(response.responseData);
                }
            }
        }).catch(function(error) {
            setAlertMessage("System experiencing some problem, Please try after some time");
        });
    }

    const getLastVisitCollectionCenterId = async () => {
        return labCheckoutService.getLastVisitCollectionCenter().then(response => {
            if(validate.isNotEmpty(response) && response.statusCode === "SUCCESS" && validate.isNotEmpty(response.responseData)) {
                return response.responseData;
            } else {
                return "";
            }
        }).catch(function(error) {
            setAlertMessage("System experiencing some problem, Please try after some time");
            return "";
        });
    }

    const getCollectionCentersDetails = async () => {
        const lastVisitCollectionCenterId = await getLastVisitCollectionCenterId();
        labCheckoutService.getCollectionCenters().then(response => {
            if(validate.isNotEmpty(response) && response.statusCode === "SUCCESS" && validate.isNotEmpty(response.responseData)) {
                const reduxSampleCollectionInfo = labCheckoutAction.getSampleCollectionInfoFromShoppingCart();
                let reduxCollectionCenterId = null;
                if(validate.isNotEmpty(reduxSampleCollectionInfo) && reduxSampleCollectionInfo.visitType == "2" && validate.isNotEmpty(reduxSampleCollectionInfo.collectionCenterId)) {
                    reduxCollectionCenterId = reduxSampleCollectionInfo.collectionCenterId;
                }
                if(validate.isNotEmpty(response.responseData.collectionCentersMap)) {
                    let tempNearByLocations = new Array();
                    tempNearByLocations.push("All");
                    Object.keys(response.responseData.collectionCentersMap).map(key => {
                        const eachCollectionCentre = response.responseData.collectionCentersMap[key];
                        if(validate.isNotEmpty(eachCollectionCentre.locality)) {
                            tempNearByLocations.push(eachCollectionCentre.locality);
                        }
                        if(validate.isNotEmpty(reduxCollectionCenterId) && eachCollectionCentre.storeId == reduxCollectionCenterId) {
                            setPickUpStoreInfo(eachCollectionCentre.storeId);
                        }
                    });
                    setNearByLocations(tempNearByLocations);
                    if(validate.isNotEmpty(lastVisitCollectionCenterId) && validate.isNotEmpty(response.responseData.collectionCentersMap[lastVisitCollectionCenterId])) {
                        setLastVisitCollectionCentreInfo(response.responseData.collectionCentersMap[lastVisitCollectionCenterId]);
                        delete response.responseData.collectionCentersMap[lastVisitCollectionCenterId];
                    }
                    setCollectionCentresInfo(response.responseData.collectionCentersMap);
                }
            }
        }).catch(function(error) {
            setAlertMessage("System experiencing some problem, Please try after some time");
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
            setCustomerAddressList([newCustomerAddress, ...customerAddressList]);
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

    const closeAlertMessage = () => {
        setMessage('');
        setShowAlertMessage(false);
    }

    const showLoader = (isHomeDeliveryLoader,isPickStoreLoader,isIndividualLoader) => {
        setHomeDeliveryLoader(isHomeDeliveryLoader);
        setStorePickUpLoader(isPickStoreLoader);
        setIndividualLoader(isIndividualLoader);
    }

    const setIsNewAddressAddedFlag = (isNewAddress) => {
        setIsNewAddressAdded(isNewAddress);
        labCheckoutAction.setIsNewAddressAdded(isNewAddress);
    }

    const saveSampleCollectionInfo = () => {
        setIsAllowProceedBtn(false);
        if(validate.isEmpty(selectedDeliveryType)) {
            setAlertMessage("Please Select Delivery Option");
            return;
        }
        if (deliveryType === 'DEFAULT_DELIVERY') {
            if(validate.isNotEmpty(selectedDeliveryType.HOME_DELIVERY)) {
                if(validate.isEmpty(homeSamplePickupAddress)) {
                    setAlertMessage("Please Select Any Address");
                    return;
                }
                addSampleCollectionConfig(1, null, JSON.stringify(homeSamplePickupAddress));
            } else if (validate.isNotEmpty(selectedDeliveryType.STORE_PICK_UP)) {
                if(validate.isEmpty(selectedCollectionCentreId)) {
                    setAlertMessage("Please Select Any Collection Centre");
                    return;
                }
                addSampleCollectionConfig(2, selectedCollectionCentreId, null);
            }
        } else if (deliveryType === 'ONLY_HOME_DELIVERY') {
            if(validate.isEmpty(selectedDeliveryType.HOME_DELIVERY) || validate.isEmpty(homeSamplePickupAddress)) {
                setAlertMessage("Please Select Any Address");
                return;
            }
            addSampleCollectionConfig(1, null, JSON.stringify(homeSamplePickupAddress));
        } else if(deliveryType === 'ONLY_STORE_PICK') {
            if(validate.isEmpty(selectedDeliveryType.STORE_PICK_UP) || validate.isEmpty(selectedCollectionCentreId)) {
                setAlertMessage("Please Select Any Collection Centre");
                return;
            }
            addSampleCollectionConfig(2, selectedCollectionCentreId, null);
        } 
        setIsAllowProceedBtn(true);
    }

    const addSampleCollectionConfig = (visitType, selectedCollectionCenterId, homeSamplePickupAddress) => {
        if(validate.isNotEmpty(visitType) && (validate.isNotEmpty(selectedCollectionCenterId) || validate.isNotEmpty(homeSamplePickupAddress))) {
            setProceedLoading(true);
            setIsAllowProceedBtn(false);
            labCheckoutService.addSampleCollectionConfig(visitType, selectedCollectionCenterId, homeSamplePickupAddress).then(response => {
                setProceedLoading(false);
                setIsAllowProceedBtn(true);
                if(validate.isNotEmpty(response) && response.statusCode === "SUCCESS" && validate.isNotEmpty(response.responseData)) {
                    labCheckoutAction.saveLabShoppingCart(response.responseData.shoppingCart);
                    let isNewAddress = false;
                    if(addEditAddress === "ADD_ADDRESS") {
                        isNewAddress = true;
                    }
                    setIsNewAddressAddedFlag(isNewAddress);
                    props.history.push('/patientAndSlotInfo');
                } else if(validate.isNotEmpty(response) && response.statusCode === "FAILURE") {
                    setAlertMessage(response.message);
                } else {
                    setAlertMessage("System experiencing some problem, Please try after some time");
                }
            }).catch(function(error) {
                setProceedLoading(false);
                setIsAllowProceedBtn(true);
                setAlertMessage("System experiencing some problem, Please try after some time");
            });
        }
    }

    const setAlertMessage = (message) => {
        setShowAlertMessage(true);
        setMessage(message);
    }

    const goBackAction = () => {
        props.history.push('/labShoppingCart');
    }

    return (
        <React.Fragment>
            <main role="main" className="container-lg container-fluid">
                <div className="row">
                    {/* Home delivery section */}
                    <SampleCollectionGhostImage homeDeliveryLoader={homeDeliveryLoader} storePickUpLoader={storePickUpLoader} individualLoader={individualLoader}/>
                    {deliveryType === 'DEFAULT_DELIVERY' && !homeDeliveryLoader && <div className="col-4 pl-0 pr-2 mb-3">
                        <HomeSamplePickup saveSelectedDeliveryType={saveSelectedDeliveryType} customerAddressList={customerAddressList} setHomeDeliveryInfo={setHomeDeliveryInfo} selectedDeliveryType={selectedDeliveryType} updateCustomerAddressList={updateCustomerAddressList} deliveryType={deliveryType} clearSelectedAddressInfo={clearSelectedAddressInfo} setAlertMessage={setAlertMessage} setAddOrEditAddress={setAddOrEditAddress} addEditAddress={addEditAddress} showLoader={showLoader} setIsNewAddressAddedFlag={setIsNewAddressAddedFlag} isNewAddressAdded={isNewAddressAdded} communitiesForHub={{}} />
                    </div>}
                    {/* Store pickup section */}
                    {deliveryType === 'DEFAULT_DELIVERY' && <div className="col-8 pl-2 pr-0 mb-3">
                        {(lastVisitCollectionCentreInfo || collectionCentresInfo) && <StoreSampleCollectionCentre selectedLocality={selectedLocality} prevSelectedStoreInfo={lastVisitCollectionCentreInfo} deliverableStoresInfo={collectionCentresInfo} setPickUpStoreInfo={setPickUpStoreInfo} selectedDeliveryType={selectedDeliveryType} deliveryType={deliveryType} selectedLocality={selectedLocality} nearByLocations={nearByLocations} checkoutVerticle={checkoutVerticle}/>}
                    </div>}
                    {deliveryType !== 'DEFAULT_DELIVERY' &&  <div className="col-12 p-0 mb-3">
                        {deliveryType === 'ONLY_STORE_PICK' && <OnlySampleCollectionCentre selectedLocality={selectedLocality} prevSelectedStoreInfo={lastVisitCollectionCentreInfo} deliverableStoresInfo={collectionCentresInfo} setPickUpStoreInfo={setPickUpStoreInfo} selectedDeliveryType={selectedDeliveryType} deliveryType={deliveryType} selectedLocality={selectedLocality} nearByLocations={nearByLocations} checkoutVerticle={checkoutVerticle}/>}
                        {deliveryType === 'ONLY_HOME_DELIVERY' && !individualLoader && <OnlyHomeSamplePickup saveSelectedDeliveryType={saveSelectedDeliveryType} customerAddressList={customerAddressList} setHomeDeliveryInfo={setHomeDeliveryInfo} selectedDeliveryType={selectedDeliveryType} deliveryType={deliveryType} setAddOrEditAddress={setAddOrEditAddress} addEditAddress={addEditAddress} clearSelectedAddressInfo={clearSelectedAddressInfo} setAlertMessage={setAlertMessage} updateCustomerAddressList={updateCustomerAddressList} showLoader={showLoader} setIsNewAddressAddedFlag={setIsNewAddressAddedFlag} isNewAddressAdded={isNewAddressAdded} communitiesForHub={{}}/>}
                    </div>}
                </div>
            </main>
            <React.Fragment>
                <footer className="footer fixed-bottom mt-auto py-2">
                    <div className="container-lg container-fluid px-0 px-sm-3">
                        <div className="row align-items-center no-gutters">
                            <div className="col-12 text-right">
                                <button type="button" className="brand-secondary btn px-5 rounded-pill" disabled={isProceedLoading} onClick={() => goBackAction()}>Back</button>
                                <button type="submit" className="btn btn-brand-gradient ml-3 px-5 rounded-pill" disabled={isAllowProceedBtn} onClick={() => saveSampleCollectionInfo()}>
                                    {isProceedLoading ? "" : "Proceed to Patient & Slot Info"}
                                    {isProceedLoading &&
                                        <React.Fragment>
                                            <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                                            <span className="sr-only"></span>
                                        </React.Fragment>
                                    }
                                </button>
                            </div>
                        </div>
                    </div>
                </footer>
            </React.Fragment>
            {message && <AlertMessage message={message} showAlertMessage={showAlertMessage} closeAlertMessage={closeAlertMessage}/>}
        </React.Fragment>
    )
}
export default SampleCollection;
