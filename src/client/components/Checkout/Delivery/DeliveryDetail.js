import React, { useState, useEffect, useDebugValue } from 'react';
import CheckoutInfoNote from '../../Common/CheckoutInfoNote';
import CheckoutService from '../../../services/CheckoutService';
import HomeDelivery from './HomeDelivery';
import PickUpStores from './PickUpStores';
import OnlyStorePickUp from './OnlyStorePickUp';
import OnlyHomeDelivery from './OnlyHomeDelivery';
import CommunityDelivery from './CommunityDelivery';
import { getSelectedLocality } from '../../../../redux/action/LocalityAction';
import Validate from '../../../helpers/Validate';
import AlertMessage from '../../Common/AlertMessage';
import CartAction from '../../../../redux/action/CartAction';
import CheckoutAction from '../../../../redux/action/CheckoutAction';
import DeliveryGhostImages from './DeliveryGhostImages';
import { nonCommunityAddressTypes } from '../../Common/Constants/MartConstants';
import { checkoutStepsToAnalytics, PaybackDeliveryBackEvent, PaybackDeliveryProceedEvent } from '../../../Analytics/Analytics';
import { useSelector } from 'react-redux';

const DeliveryDetail = (props) => {
    const selectedLocality = getSelectedLocality();
    const checkoutAction = CheckoutAction();
    const validate = Validate();
    const [isProceedLoading, setProceedLoading] = useState(false);
    const [deliveryType, setDeliveryType] = useState("");
    const [customerAddressList, setCustomerAddressList] = useState([]);
    const [deliverableStoresInfo, setDeliverableStoresInfo] = useState([]);
    const [prevSelectedStoreInfo, setPrevSelectedStoreInfo] = useState({});
    const [prevSelectedCommunityInfo, setPrevSelectedCommunityInfo] = useState({});
    const [selectedDeliveryType,setSelectedDeliveryType] = useState({});
    const [homeDeliveryAddress, setHomeDeliveryAddress] = useState({});
    const [storePickUpAddress, setStorePickUpAddress] = useState({});
    const [communityDeliveryAddress, setCommunityDeliveryAddress] = useState({});
    const [message, setMessage] = useState("");
    const [showAlertMessage, setShowAlertMessage] = useState(true);
    const [isAllowProceedBtn, setIsAllowProceedBtn] = useState(true);
    const isPrescRequired = CartAction().isPrescriptionStepRequired();
    const [addEditAddress, setAddEditAddress] = useState("");
    const [homeDeliveryLoader, setHomeDeliveryLoader] = useState(true);
    const [storePickUpLoader, setStorePickUpLoader] = useState(true);
    const [individualLoader, setIndividualLoader] = useState(false);
    const isShowPrescriptionAtStore = CheckoutAction().isShowPrescriptionAtStoreSelected();
    const [nearByLocations, setNearByLocations] = useState(["All"]);
    const [isNewAddressAdded, setIsNewAddressAdded] = useState(false);
    const [communitiesForHub, setCommunitiesForHub] = useState({});
    const [checkoutVerticle, setCheckoutVerticle] = useState("MART_CHECKOUT");
    const [isHomeDeliveryAllowed, setIsHomeDeliveryAllowed] = useState(false);
    const [isStorePickUpAllowed, setIsStorePickUpAllowed] = useState(false);
    const [isCommunityDropAllowed, setIsCommunityDropAllowed] = useState(true);
    const isPayback = props.isPayback;
    let checkoutType = (props.routePath.includes("flexiDelivery") || isPayback) ? "FLEXI_CHECKOUT" : "DEFAULT_CHECKOUT";
    const userContactDetails = useSelector(state => state && state.userInfo ? state.userInfo.userContactDetails : null);
    

    useEffect(() => {
        setCheckoutVerticle("MART_CHECKOUT");
        if(checkoutType.includes("FLEXI_CHECKOUT")) {
            setIndividualLoader(true);
            getFlexiPageDeliveryDetails();
            setHomeDeliveryLoader(false);
            setStorePickUpLoader(false);
        } else {
            setIndividualLoader(false);
            getDeliveryDetails();
        }       
    }, []);

    useEffect(() => {
        if (isStorePickUpAllowed) {
            getStorePickAddresses();
        }
        //setDeliveryTypeToState(isHomeDeliveryAllowed, isStorePickUpAllowed);
        
    }, [isStorePickUpAllowed]);

    useEffect(() => {
        if (isHomeDeliveryAllowed) {
            getHomeDeliveryAddresses();
        }
        //setDeliveryTypeToState(isHomeDeliveryAllowed, isStorePickUpAllowed);

    }, [isHomeDeliveryAllowed]);

    const setDeliveryTypeToState = (isHomeDeliveryAllowed, isStorePickUpAllowed) => {
        if (isHomeDeliveryAllowed && isStorePickUpAllowed) {
            setDeliveryType("DEFAULT_DELIVERY")
        } else if (!isHomeDeliveryAllowed && isStorePickUpAllowed) {
            setDeliveryType("ONLY_STORE_PICK");
            setHomeDeliveryLoader(false);
        } else if (isHomeDeliveryAllowed && !isStorePickUpAllowed) {
            setDeliveryType("ONLY_HOME_DELIVERY");
            setStorePickUpLoader(false);
        }
    }

    const prepareAddressListFromResponse = (addressList, selectedAddress) => {
        let tempAdressArr = [];
        let isSelectedaddressExistsInList = false;
        addressList = addressList.filter((each) => { return nonCommunityAddressTypes.includes(each.isCommunityDropOff) });
        addressList.map((each) => {
            if ((each.addressLine1 == selectedAddress.addressLine1) && (each.firstName == selectedAddress.firstName) && (each.lastName == selectedAddress.lastName) && (each.mobileNo == selectedAddress.mobileNo) && (each.pincode == selectedAddress.pincode) && (each.latitudeLongitude == selectedAddress.latitudeLongitude) ) {
                isSelectedaddressExistsInList = true;
            }
        });
        if (!isSelectedaddressExistsInList) {
            tempAdressArr = [selectedAddress, ...addressList];
        } else {
            tempAdressArr = addressList;
        }
        setCustomerAddressList(tempAdressArr);
        return tempAdressArr;
    }

    const getHomeDeliveryAddresses = () => {
        setHomeDeliveryLoader(true);
        CheckoutService().getAddressAndCommunities().then(response => {
            if (validate.isNotEmpty(response) && response.statusCode === "SUCCESS" && response.dataObject) {
               // const isReduxInfoAvaiable = validate.isNotEmpty(selectedReduxDeliveryInfo) ? true : false;
                let tempCommunityObj = {}
                setIsNewAddressAdded(checkoutAction.isNewAddressAdded());
                if (validate.isNotEmpty(response.dataObject.communityList)) {
                    let tempCommunityList = response.dataObject.communityList;
                    tempCommunityList.map((each) => {
                        tempCommunityObj[each.communityId] = `${each.communityName}$$$${each.dropOffPoint}$$$${each.address}`;
                    });
                    setCommunitiesForHub(tempCommunityObj);
                    if (validate.isNotEmpty(userContactDetails)) {
                        setCommunityDeliveryAddress({ "mobileNo": userContactDetails.shippingContactNumber});
                    }
                }
                if (validate.isNotEmpty(response.dataObject.addressList)){
                    setCustomerAddressList(response.dataObject.addressList.filter((each) => { return nonCommunityAddressTypes.includes(each.isCommunityDropOff)}));
                }

                if (response.dataObject.selectedAddress) {
                    let tempSelectedAddress = response.dataObject.selectedAddress;
                    if (tempSelectedAddress.isCommunityDropOff != "Y") {
                        if (validate.isEmpty(response.dataObject.addressList)) {
                            setCustomerAddressList([tempSelectedAddress]);
                            setHomeDeliveryInfo(tempSelectedAddress, 0)
                        } else {
                            let tempCustomerAddress = prepareAddressListFromResponse(response.dataObject.addressList, tempSelectedAddress);
                            for (let index = 0; index < tempCustomerAddress.length; index++) {
                                let eachAddress = tempCustomerAddress[index];
                                if (eachAddress.firstName === tempSelectedAddress.firstName && eachAddress.addressLine1 === tempSelectedAddress.addressLine1 && eachAddress.mobileNo === tempSelectedAddress.mobileNo) {
                                    setHomeDeliveryInfo(eachAddress, index);
                                    break;
                                }
                            }
                        }
                    } 
                }
               /*  if (response.dataObject.selectedAddress && response.dataObject.addressList) {
                    if (response.dataObject.selectedAddress.isCommunityDropOff == 0 && response.dataObject.addressList) {
                        let tempCustomerAddress = response.dataObject.addressList;
                        let tempSelectedAddress = response.dataObject.selectedAddress;
                        for (let index = 0; index < tempCustomerAddress.length; index++) {
                            let eachAddress = tempCustomerAddress[index];
                            if (eachAddress.firstName === tempSelectedAddress.firstName && eachAddress.addressLine1 === tempSelectedAddress.addressLine1 && eachAddress.mobileNo === tempSelectedAddress.mobileNo) {
                                setHomeDeliveryInfo(eachAddress, index);
                                break;
                            }
                        }
                   }
                     else if (response.dataObject.communityList) {
                        let tempCommunityAddress = response.dataObject.communityList;
                        for (let index = 0; index < tempCommunityAddress; index++) {
                            let eachCommunity = tempCommunityAddress[index];
                            if (eachCommunity.communityId === tempCommunityAddress.communityId) {
                                setPrevSelectedCommunityInfo(eachCommunity, index);
                                break;
                            }
                        }
                    } 
                } */
                setHomeDeliveryLoader(false);
            }
        }
        ).catch(function (error) {
            setHomeDeliveryLoader(false);
            setStorePickUpLoader(false);
            setIndividualLoader(false);
            setAlertMessage("System experiencing some problem, Please try after some time");
            return;
        });
    }

    const getStorePickAddresses = () => {
        CheckoutService().getPickStoreDetails().then(response => {
            if (validate.isNotEmpty(response) && response.statusCode === "SUCCESS" && response.dataObject) {
                checkoutStepsToAnalytics([], 2);
                let tempStoreObj = [];
                if (validate.isNotEmpty(response.dataObject.availableStores)) {
                    let tempStores = response.dataObject.availableStores;
                    tempStores.map((each, index) => {
                        tempStoreObj.push(each);
                    })
                    setDeliverableStoresInfo(tempStoreObj);
                }
                if (validate.isEmpty(response.dataObject.availableStores) && checkoutType.includes("FLEXI_CHECKOUT")) {
                    setAlertMessage('Redemption not allowed in your locality.');
                    isPayback ? props.history.push('/paybackspecialsale') : props.history.push('/flexiRewards');
                }
                const selectedReduxDeliveryInfo = checkoutAction.getSelectedDeliveryDetails();
                const isReduxInfoAvaiable = validate.isNotEmpty(selectedReduxDeliveryInfo) ? true : false;
                if (validate.isNotEmpty(response.dataObject.prevSelectedStoreInfo)) {
                    setPrevSelectedStoreInfo(response.dataObject.prevSelectedStoreInfo);
                }
                if (validate.isNotEmpty(response.dataObject.nearByAreas)) {
                    setNearByLocations([...nearByLocations, ...response.dataObject.nearByAreas]);
                }
                if (response.dataObject.selectPickStoreId) {
                    setPickUpStoreInfo(response.dataObject.selectPickStoreId);
                }
                /* if (isReduxInfoAvaiable) {
                    if (selectedReduxDeliveryInfo["DELIVERY_TYPE"] === "ONLY_STORE_PICK") {
                        validate.isNotEmpty(selectedReduxDeliveryInfo["pickStoreId"]) ? setPickUpStoreInfo(selectedReduxDeliveryInfo["pickStoreId"]) : "";
                    } else {
                        checkoutAction.resetSelectedDeliveryDetails();
                    }
                } */

            } else if (validate.isNotEmpty(response) && response.statusCode === "FAILURE") {
                setAlertMessage(response.message);
            } else {
                setAlertMessage("System experiencing some problem, Please try after some time");
            }
            setHomeDeliveryLoader(false);
            setStorePickUpLoader(false);
            setIndividualLoader(false);
        }).catch(function (error) {
            setHomeDeliveryLoader(false);
            setStorePickUpLoader(false);
            setIndividualLoader(false);
            setAlertMessage("System experiencing some problem, Please try after some time");
            return;
        });
        
    }

    const getDeliveryDetails = () => {
        CheckoutService().getDeliveryDetails(checkoutType).then(response => {
            if (validate.isNotEmpty(response) && response.statusCode === "SUCCESS" && response.dataObject) {
                checkoutStepsToAnalytics([], 2);
                setIsHomeDeliveryAllowed(response.dataObject.isHomeDeliveryAllowed);
                setIsStorePickUpAllowed(response.dataObject.isStorePickUpAllowed);
                setIsCommunityDropAllowed(response.dataObject.isCommunityDropAllowed);
                if (response.dataObject.isHomeDeliveryAllowed) {
                    setHomeDeliveryLoader(true);
                }
                if (response.dataObject.isStorePickUpAllowed) {
                    setStorePickUpLoader(true);
                }
                setDeliveryTypeToState(response.dataObject.isHomeDeliveryAllowed, response.dataObject.isStorePickUpAllowed);
                /* if (validate.isNotEmpty(response.dataObject.deliveryType)) {
                    if (response.dataObject.deliveryType == "S") {
                        setDeliveryType("ONLY_STORE_PICK");
                    } else if (response.dataObject.deliveryType == "D") {
                        setDeliveryType("ONLY_HOME_DELIVERY");
                    } else {
                        setDeliveryType("DEFAULT_DELIVERY");
                    }
                } */
                /* if (!response.dataObject.deliveryType && !response.dataObject.isStorePickUpAllowed) {
                    setAlertMessage("Delivery details not found");
                } */
            }
        }
        ).catch(function (error) {
            setHomeDeliveryLoader(false);
            setStorePickUpLoader(false);
            setIndividualLoader(false);
            setAlertMessage("System experiencing some problem, Please try after some time");
            return;
        });
    }

    const getFlexiPageDeliveryDetails = () => {
        CheckoutService().getFlexiPageDeliveryDetails(isPayback).then(response =>{
            if(validate.isNotEmpty(response) && response.statusCode === "SUCCESS" && response.dataObject) {
                checkoutStepsToAnalytics([],2);
                const selectedReduxDeliveryInfo = checkoutAction.getSelectedDeliveryDetails();
                const isReduxInfoAvaiable = validate.isNotEmpty(selectedReduxDeliveryInfo) ? true : false;
                let responseData = response.dataObject;
                if(validate.isEmpty(responseData.prevSelectedStoreInfo) && validate.isEmpty(responseData.pickupStores) && checkoutType.includes("FLEXI_CHECKOUT")){
                    setAlertMessage('Redemption not allowed in your locality.');
                    isPayback ? props.history.push('/paybackspecialsale') : props.history.push('/flexiRewards');
                }
                setDeliveryType("ONLY_STORE_PICK");
                setDeliverableStoresInfo(responseData.pickupStores);
                setPrevSelectedStoreInfo(responseData.prevSelectedStoreInfo);
                if(validate.isNotEmpty(responseData.nearByAreas)){
                    setNearByLocations([...nearByLocations, ...responseData.nearByAreas]);
                }
                if (isReduxInfoAvaiable) {
                    if(selectedReduxDeliveryInfo["DELIVERY_TYPE"] ===  "STORE_PICK_UP" || selectedReduxDeliveryInfo["DELIVERY_TYPE"] ===  "ONLY_STORE_PICK") {
                        validate.isNotEmpty(selectedReduxDeliveryInfo["pickStoreId"]) ? setPickUpStoreInfo(selectedReduxDeliveryInfo["pickStoreId"]) : "";
                    } else {
                        checkoutAction.resetSelectedDeliveryDetails();
                    }
                }
            } else if(validate.isNotEmpty(response) && response.statusCode === "FAILURE") {
                setAlertMessage(response.message);
                if(isPayback){
                    window.location.href = "/paybackspecialsale" ;
                }
            } else {
                setAlertMessage("System experiencing some problem, Please try after some time");
                if(isPayback){
                    window.location.href = "/paybackspecialsale" ;
                }
            }
            setHomeDeliveryLoader(false);
            setStorePickUpLoader(false);
            setIndividualLoader(false);
        }).catch(function(error) {
            setHomeDeliveryLoader(false);
            setStorePickUpLoader(false);
            setIndividualLoader(false);
            setAlertMessage("System experiencing some problem, Please try after some time");
            return;
        });
    }

    const setPreviousSelectedCommunityInfo = (addressList) => {
        var addresses = [];
        let isFirstRecord = false;
        addressList.map(eachAddress => {
            if(eachAddress.isCommunityDropOff == "1" && !isFirstRecord) {
                isFirstRecord = true;
                setPrevSelectedCommunityInfo(eachAddress);
            }
            if(validate.isEmpty(eachAddress.isCommunityDropOff) || eachAddress.isCommunityDropOff == null || eachAddress.isCommunityDropOff == "0") {
                addresses.push(eachAddress);
            }
        });
        return addresses;
    }

    const setAddOrEditAddress = (value) => {
        setAddEditAddress(value);
    }

    const updateCustomerAddressList = (data, index, isNewAddressAdded) => {
        let tempDataArr = [];
        tempDataArr[0] = data;
        let tempAddres = [...customerAddressList];
        if (isNewAddressAdded){
            tempAddres = [...tempDataArr, ...customerAddressList];
        } else {
            tempAddres[index] = data;
        }
        //tempCustomerAddressList = setPreviousSelectedCommunityInfo(tempCustomerAddressList);
        setHomeDeliveryInfo(tempAddres[index], index);
        setCustomerAddressList(tempAddres);






       // setHomeDeliveryInfo(data,index);
        /* tempAddres[0] = data;
        let tempcustomerAddressList = [];
        if (index == 0) {
            tempcustomerAddressList = [...tempAddres, ...customerAddressList ];
        } else {
            tempcustomerAddressList = [...customerAddressList, ...tempAddres];
            tempcustomerAddressList = [...customerAddressList, ...tempAddres];
            index = tempcustomerAddressList.length -1;
        }
       tempcustomerAddressList = setPreviousSelectedCommunityInfo(tempcustomerAddressList);
       setCustomerAddressList(tempcustomerAddressList);
        setHomeDeliveryInfo(tempAddres,index); */
    }

    const saveSelectedDeliveryType = (data) => {
        setSelectedDeliveryType(data);
    }

    const setHomeDeliveryInfo = (address, index) => {
        setIsAllowProceedBtn(false);
        setSelectedDeliveryType({HOME_DELIVERY : index});
        address["DELIVERY_TYPE"] = "HOME_DELIVERY";
        address["index"] = index;
        setHomeDeliveryAddress(address);
    }

    const setPickUpStoreInfo = (storeId) => {
        setIsAllowProceedBtn(false);
        setSelectedDeliveryType({STORE_PICK_UP : storeId});
        let obj = {};
        obj["DELIVERY_TYPE"] = "STORE_PICK_UP";
        obj["pickStoreId"] = storeId;
        setStorePickUpAddress(obj);
    }

    const setCommunityInfo = (communityAddress, prevSelectedCommunity) => {
        setIsAllowProceedBtn(false);
        setSelectedDeliveryType({COMMUNITY_DELIVERY : communityAddress.configId});
        communityAddress["DELIVERY_TYPE"] = "COMMUNITY_DELIVERY";
        setCommunityDeliveryAddress(communityAddress);
        if(validate.isNotEmpty(prevSelectedCommunity)) {
            setPrevSelectedCommunityInfo(prevSelectedCommunity);
        }
    }

    const clearSelectedAddressInfo = () => {
        setSelectedDeliveryType({});
        setHomeDeliveryAddress({});
        setStorePickUpAddress({});
        setCommunityDeliveryAddress({});
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

    const setIsNewAddressAddedFlag = (flag) => {
        setIsNewAddressAdded(flag);
        checkoutAction.setIsNewAddressAdded(flag);
    }

    const saveDeliveryInfo = () => {
        if(checkoutType.includes("FLEXI_CHECKOUT")) {
            if(isPayback) {
                PaybackDeliveryProceedEvent()
            }
            saveflexiDeliveryInfo();
        } else {
            saveDeliveryDetails();
        }
    }

    const saveflexiDeliveryInfo = () => {
        if(validate.isEmpty(storePickUpAddress)) {
            setAlertMessage("Please Select Any PickStore");
            return;
        }
        if(validate.isNotEmpty(storePickUpAddress)) {
            setProceedLoading(true);
            setIsAllowProceedBtn(false);
            CheckoutService().saveFlexiDeliveryDetails(storePickUpAddress,isPayback).then(response =>{
                setProceedLoading(false);
                setIsAllowProceedBtn(true);
                if(validate.isNotEmpty(response) && response.statusCode === "SUCCESS") {
                    checkoutAction.setSelectedDeliveryDetails(storePickUpAddress);
                    isPayback ? props.history.push('/payback/review') : props.history.push('/flexiReview');
                } else if(validate.isNotEmpty(response) && response.statusCode === "FAILURE") {
                    setAlertMessage(response.message);
                    return;
                } else {
                    setAlertMessage("System experiencing some problem, Please try after some time");
                    return;
                }
            }).catch(function(error) {
                setProceedLoading(false);
                setIsAllowProceedBtn(true);
                setAlertMessage("System experiencing some problem, Please try after some time");
                return;
            });
        }
    }

    const saveDeliveryDetails = () => {
        setIsAllowProceedBtn(false);
        if (deliveryType === 'DEFAULT_DELIVERY') {
            if(validate.isEmpty(selectedDeliveryType)) {
                setAlertMessage("Please Select Delivery Option");
                return;
            } else if(validate.isNotEmpty(selectedDeliveryType.HOME_DELIVERY)) {
                if(validate.isEmpty(homeDeliveryAddress)) {
                    setAlertMessage("Please Select Delivery Option");
                    return;
                }
                saveDeliveryDetailServiceCall(homeDeliveryAddress);
            } else if (validate.isNotEmpty(selectedDeliveryType.STORE_PICK_UP)) {
                if(validate.isEmpty(storePickUpAddress)) {
                    setAlertMessage("Please Select Delivery Option");
                    return;
                }
                saveDeliveryDetailServiceCall(storePickUpAddress);
            }else if(validate.isNotEmpty(selectedDeliveryType.COMMUNITY_DELIVERY)) {
                if(validate.isEmpty(communityDeliveryAddress)) {
                    setAlertMessage("Please Give Community Information");
                    return;
                } else if(validate.isEmpty(communityDeliveryAddress.addressLine1) || validate.isNotEmpty(validate.address(communityDeliveryAddress.addressLine1, true, "Flot No", 200))) {
                    setAlertMessage(validate.address(communityDeliveryAddress.addressLine1, true, "Address", 200));
                    return;
                } else if(validate.isEmpty(communityDeliveryAddress.mobileNo) || validate.isNotEmpty(validate.mobileNumber(communityDeliveryAddress.mobileNo)) ) {
                    setAlertMessage(validate.mobileNumber(communityDeliveryAddress.mobileNo))
                    return;
                }
                saveDeliveryDetailServiceCall(communityDeliveryAddress);
            }
        } else if(deliveryType === 'ONLY_HOME_DELIVERY') {
            if(validate.isEmpty(homeDeliveryAddress) && validate.isEmpty(communityDeliveryAddress)) {
                setAlertMessage("Please Select Any Address");
                return;
            }
            if(validate.isNotEmpty(homeDeliveryAddress)) {
                saveDeliveryDetailServiceCall(homeDeliveryAddress);
                return;
            }
            if(validate.isNotEmpty(communityDeliveryAddress)) {
                if(validate.isEmpty(communityDeliveryAddress.addressLine1) || validate.isNotEmpty(validate.address(communityDeliveryAddress.addressLine1, true, "Flot No", 200))) {
                    setAlertMessage(validate.address(communityDeliveryAddress.addressLine1, true, "Address", 200));
                    return;
                } else if(validate.isEmpty(communityDeliveryAddress.mobileNo) || validate.isNotEmpty(validate.mobileNumber(communityDeliveryAddress.mobileNo)) ) {
                    setAlertMessage(validate.mobileNumber(communityDeliveryAddress.mobileNo))
                    return;
                }
                saveDeliveryDetailServiceCall(communityDeliveryAddress);
                return;
            }
        } else if(deliveryType === 'ONLY_STORE_PICK') {
            if(validate.isEmpty(storePickUpAddress)) {
                setAlertMessage("Please Select Any PickStore");
                return;
            }
            storePickUpAddress["checkOutType"] = checkoutType;
            saveDeliveryDetailServiceCall(storePickUpAddress);
        } else if(deliveryType === 'COMMUNITY_DELIVERY') {
            if(validate.isEmpty(communityDeliveryAddress)) {
                setAlertMessage("Please Give Community Information");
                return;
            } else if(validate.isEmpty(communityDeliveryAddress.addressLine1) || validate.isNotEmpty(validate.address(communityDeliveryAddress.addressLine1, true, "Flot No", 200))) {
                setAlertMessage(validate.address(communityDeliveryAddress.addressLine1, true, "Address", 200));
                return;
            } else if(validate.isEmpty(communityDeliveryAddress.mobileNo) || validate.isNotEmpty(validate.mobileNumber(communityDeliveryAddress.mobileNo)) ) {
                setAlertMessage(validate.mobileNumber(communityDeliveryAddress.mobileNo))
                return;
            }
            saveDeliveryDetailServiceCall(communityDeliveryAddress);
        }
        setIsAllowProceedBtn(true);
    }

    function getDeliveryTypeKey(deliveryType){
        switch (deliveryType) {
            case 'COMMUNITY_DELIVERY': return 'C';
            case 'STORE_PICK_UP': return 'S';
            case 'HOME_DELIVERY': return 'D';
        }
    }

    const saveDeliveryDetailServiceCall= (data) => {
        if(validate.isNotEmpty(data)) {
            setProceedLoading(true);
            setIsAllowProceedBtn(false);
            if (checkoutType != 'FLEXI_CHECKOUT') {
                data["deliveryType"] = getDeliveryTypeKey(data.DELIVERY_TYPE);
                if (getDeliveryTypeKey(data.DELIVERY_TYPE) == 'S') {
                    data["pickstoreId"] = data.pickStoreId;
                } else {
                    if (data.DELIVERY_TYPE == "COMMUNITY_DELIVERY") {
                        data.locationConfigId = data.configId;
                    }
                    data["address"] = JSON.stringify(data);
                }
            }
            CheckoutService().saveDeliveryDetails(data).then(response =>{
                setProceedLoading(false);
                setIsAllowProceedBtn(true);
                if(validate.isNotEmpty(response) && response.statusCode === "SUCCESS") {
                    data["DELIVERY_TYPE"] = deliveryType;
                    checkoutAction.setSelectedDeliveryDetails(data);
                    checkoutType == 'FLEXI_CHECKOUT' ? props.history.push('/flexiReview') : props.history.push('/orderReview');
                } else if(validate.isNotEmpty(response) && response.statusCode === "FAILURE") {
                    setAlertMessage(response.message);
                    return;
                } else {
                    setAlertMessage("System experiencing some problem, Please try after some time");
                    return;
                }
            }).catch(function(error) {
                setProceedLoading(false);
                setIsAllowProceedBtn(true);
                setAlertMessage("System experiencing some problem, Please try after some time");
                return;
            });
        }
    }

    const setAlertMessage = (msg) => {
        setShowAlertMessage(true);
        setMessage(msg);
    }

    const goBackAction = () => {
        if(checkoutType == 'FLEXI_CHECKOUT'){
            if(isPayback) {
                PaybackDeliveryBackEvent()
                props.history.push('/payback/cart')
            } else {
                props.history.push('/flexiCart')
            }
            // isPayback ? props.history.push('/payback/cart') : props.history.push('/flexiCart')
        }else {
            isPrescRequired ? props.history.push('/prescription') : props.history.push('/shoppingCart');
        }
    }

    return (
        <React.Fragment>
            <main role="main" className="container-fluid container-lg">
                <div className="row position-relative no-gutters">
                    {/* Home delivery section */}
                    <DeliveryGhostImages homeDeliveryLoader={homeDeliveryLoader} storePickUpLoader={storePickUpLoader} individualLoader={individualLoader}/>
                    {deliveryType === 'DEFAULT_DELIVERY' && !homeDeliveryLoader && <div className={ deliveryType === 'DEFAULT_DELIVERY' ? "col-4 pl-0 mb-3" : "col-4 pl-0 pr-2 mb-3"} style={deliveryType === 'DEFAULT_DELIVERY' ? {paddingRight: "2rem"} : {}}>
                        <HomeDelivery prevSelectedCommunityInfo={prevSelectedCommunityInfo} saveSelectedDeliveryType={saveSelectedDeliveryType} setCommunityInfo={setCommunityInfo} communityDeliveryAddress={communityDeliveryAddress} customerAddressList={customerAddressList} setHomeDeliveryInfo={setHomeDeliveryInfo} selectedDeliveryType={selectedDeliveryType} updateCustomerAddressList={updateCustomerAddressList} deliveryType={deliveryType} clearSelectedAddressInfo={clearSelectedAddressInfo} setAlertMessage={setAlertMessage} setAddOrEditAddress={setAddOrEditAddress} addEditAddress={addEditAddress} showLoader={showLoader} setIsNewAddressAddedFlag={setIsNewAddressAddedFlag} isNewAddressAdded={isNewAddressAdded} communitiesForHub={communitiesForHub} isCommunityDropAllowed={isCommunityDropAllowed}></HomeDelivery>
                    </div>}
                    {deliveryType === 'DEFAULT_DELIVERY' && !homeDeliveryLoader && <div className="vertical-seperator">
                        <span className="shadow-sm">OR</span>
                        </div>}
                    {/* Store pickup section */}
                    {deliveryType === 'DEFAULT_DELIVERY' && !homeDeliveryLoader && <div className={ deliveryType === 'DEFAULT_DELIVERY' ? "col-8 pr-0 mb-3" : "col-8 pl-2 pr-0 mb-3"} style={deliveryType === 'DEFAULT_DELIVERY' ? {paddingLeft: "2rem"} : {}}>
                        {(prevSelectedStoreInfo || deliverableStoresInfo) && <PickUpStores selectedLocality={selectedLocality} prevSelectedStoreInfo={prevSelectedStoreInfo} deliverableStoresInfo={deliverableStoresInfo} setPickUpStoreInfo={setPickUpStoreInfo} selectedDeliveryType={selectedDeliveryType} deliveryType={deliveryType} nearByLocations={nearByLocations} checkoutVerticle={checkoutVerticle}/>}
                    </div>}
                    {deliveryType !== 'DEFAULT_DELIVERY' &&  <div className="col-12 p-0 mb-3">
                        {deliveryType === 'ONLY_STORE_PICK' && (!storePickUpLoader) && <OnlyStorePickUp selectedLocality={selectedLocality} prevSelectedStoreInfo={prevSelectedStoreInfo} deliverableStoresInfo={deliverableStoresInfo} setPickUpStoreInfo={setPickUpStoreInfo} selectedDeliveryType={selectedDeliveryType} deliveryType={deliveryType} nearByLocations={nearByLocations} checkoutVerticle={checkoutVerticle}/>}
                        {deliveryType === 'ONLY_HOME_DELIVERY' && (!homeDeliveryLoader)  && <OnlyHomeDelivery prevSelectedCommunityInfo={prevSelectedCommunityInfo} saveSelectedDeliveryType={saveSelectedDeliveryType} setCommunityInfo={setCommunityInfo} communityDeliveryAddress={communityDeliveryAddress} customerAddressList={customerAddressList} setHomeDeliveryInfo={setHomeDeliveryInfo} selectedDeliveryType={selectedDeliveryType} deliveryType={deliveryType} setAddOrEditAddress={setAddOrEditAddress} addEditAddress={addEditAddress} clearSelectedAddressInfo={clearSelectedAddressInfo} setAlertMessage={setAlertMessage} updateCustomerAddressList={updateCustomerAddressList} showLoader={showLoader} setIsNewAddressAddedFlag={setIsNewAddressAddedFlag} isNewAddressAdded={isNewAddressAdded} communitiesForHub={communitiesForHub}  isCommunityDropAllowed={isCommunityDropAllowed}></OnlyHomeDelivery>}
                        {/* {deliveryType === 'COMMUNITY_DELIVERY' && <CommunityDelivery locality={selectedLocality} communityDeliveryAddress={communityDeliveryAddress} setCommunityInfo={setCommunityInfo}/>} */}
                    </div>}
                    {!(props.routePath.includes("flexiDelivery") || isPayback) &&<CheckoutInfoNote/>}
                </div>
            </main>
            <React.Fragment>
                <footer className="footer fixed-bottom mt-auto py-2">
                    <div className="container-lg container-fluid px-3">
                        <div className="row align-items-center no-gutters">
                            <div className="col-12 text-right">
                                <button type="button" className="brand-secondary btn px-5 rounded-pill custom-btn-lg" disabled={isProceedLoading} onClick={() => goBackAction()}>Back</button>
                                <button type="submit" className="btn btn-brand-gradient ml-3 px-5 rounded-pill custom-btn-lg" disabled={isAllowProceedBtn} onClick={() => saveDeliveryInfo()}>
                                    {isProceedLoading ? "" : "Proceed"}
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
export default DeliveryDetail;
