import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, ModalBody} from 'reactstrap';
import LocationIcn from '../../images/common/location-icn.png';
import ChangeLocality from '../Locality/ChangeLocality';
import { getSelectedLocality, reloadSelectedLocalityInfo } from '../../../redux/action/LocalityAction';
import CartAction from '../../../redux/action/CartAction';
import UserInfoAction from '../../../redux/action/UserInfoAction';
import CheckoutAction from '../../../redux/action/CheckoutAction';
import CONFIG from '../../constants/ServerConfig';
import CheckoutService from '../../services/CheckoutService';
import Validate from '../../helpers/Validate';
import Alert from '../Common/Alert';
import ShoppingCartItem from './ShoppingCartItem';
import RecommendedCartItem from './RecommendedCartItem';
import CheckoutInfoNote from '../Common/CheckoutInfoNote';
import ApplicableOffers from './ApplicableOffers';
import CartSummary from './CartSummary';
import ShoppingCartGhostImage from './ShoppingCartGhostImage';
import ComplimentaryCartItem from './ComplimentaryCartItem';
import ComplimentaryPopup from './ComplimentaryPopup';
import ShipmentDeliverySpeed from './ShipmentDeliverySpeed';
import { checkoutStepsToAnalytics, modifyCart } from '../../Analytics/Analytics';
import PatientModel from '../Common/PatientModel';
import { Gender } from '../Common/Constants/MartConstants'
import LocalDB from '../../DataBase/LocalDB';
import { getDisplayableAge } from '../../helpers/CommonUtil';
import LocalityService from '../../services/LocalityService';

const ShoppingCart = (props) => {

    const dispatch = useDispatch();
    const checkoutService = CheckoutService();
    const validate = Validate();
    const cartAction = CartAction();
    const userInfoAction = UserInfoAction();
    const checkoutAction = CheckoutAction();
    const selectedLocality = getSelectedLocality();
    const userInfo = userInfoAction.getUserInfo();
    const isPrescStepRequired = cartAction.isPrescriptionStepRequired();
    const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
    const [isProceedLoading, setProceedLoading] = useState(false);
    const [isDefaultLocality, setDefaultLocality] = useState(false);
    const [isDefaultLocalitySelectedByUser, setDefaultLocalitySelectedByUser] = useState(false);
    const [promotionBanners, setPromotionBanners] = useState({});
    const [paymentBanners, setPaymentBanners] = useState({});
    const [shoppingCartDetail, setShoppingCartDetail] = useState({});
    const [shoppingCartETA, setShoppingCartETA] = useState({});
    const [availableProductQuantities, setAvailableProductQuantities] = useState({});
    const [recommendedCartDetail, setRecommendedCartDetail] = useState({});
    const [upsellProductHeading, setUpsellProductHeading] = useState("");
    const [isCartProductsLoading, setCartProductsLoading] = useState(false);
    const [isDefaultLocalityModalOpen, setDefaultLocalityModalOpen] = useState(false);
    const [isLocalityModalOpen, setLocalityModalOpen] = useState(false);
    const [complimentaryCartItem, setComplimentaryCartItem] = useState({});
    const [isAutoAddComplimentaryItem, setAutoAddComplimentaryItem] = useState(false);
    const [complimentaryMessage, setComplimentaryMessage] = useState("");
    const [isComplimentaryPopupOpen, setComplimentaryPopupOpen] = useState(false);
    const [appliedPromotionType, setAppliedPromotionType] = useState("DISCOUNT");
    const [totalMrp, setTotalMrp] = useState(0);
    const [totalAmountForPromotion, setTotalAmountForPromotion] = useState(0);
    const [minimumOrderAmount, setMinimumOrderAmount] = useState(0);
    const [isNewCheckoutPromotionEnabled, setNewCheckoutPromotionEnabled] = useState(true);
    const [isRemoveComplimentaryModalOpen, setRemoveComplimentaryModalOpen] = useState(false);
    const [newPromotionType,setNewPromotionType] = useState("");
    const [isComplimentaryOrder,setComplimentryOrder] = useState(false);
    const [isDualShipmentAllowed, setIsDualShipmentAllowed] = useState(false);
    const [selectedShipmentDeliverySpeed, setSelectedShipmentDeliverySpeed] = useState("");
    const [hubServingItemCount, setHubServingItemCount] = useState("");
    const [multipleShipmentServingStoreId, setMultipleShipmentServingStoreId] = useState("");
    const [isCheckoutAllowed, setIsCheckoutAllowed] = useState(false);
    const [recentlySearchLocalities, setRecentSearchLocalities] = useState([]);

    // patientModel related variables
    const [isAddOrEditPatientOpen, setAddOrEditPatientOpen] = useState(false);
    const [seletedPatient, setSelectedPatient] = useState({});
    const [seletedPatientForEdit, setSelectedPatientForEdit] = useState({});
    const [isSelectPatientOpen, setSelectPatientOpen] = useState(false);
    const [addPatienLoader, setAddPatienLoader] = useState(false);
    const [isConfirmationOpen, setConfirmationOpen] = useState(false);

     // patient and doctor details 
    const [patientInfoFromCart, setPatientInfoFromCart] = useState({});
    const [doctorNameToUpdate, setDoctorNameToUpdate] = useState("");
    const [doctorNameErrorMsg, setDoctorNameErrorMsg] = useState("");
    const [updateDoctorLoader, setUpdateDoctorLoader] = useState(false);
    const setDoctorName = (doctorName) => {
        if (validate.isNotEmpty(doctorName) && !validate.isAlphaWithSpace(doctorName)) {
            return;
        } else {
            setDoctorNameToUpdate(doctorName);
            setPatientInfoFromCart({...patientInfoFromCart,doctorName:doctorName});
        }
    }

    const updateDoctorToPatient = () => {
        let errorMsg = validate.name(doctorNameToUpdate, "Doctor Name");
        if (validate.isNotEmpty(errorMsg)) {
            setDoctorNameErrorMsg(errorMsg);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        } else {
        	setDoctorNameErrorMsg("");
        }
        setUpdateDoctorLoader(true);
        addPatientToShoppingCart(patientInfoFromCart.patientId,doctorNameToUpdate,validate.isEmpty(patientInfoFromCart.patientId))
    }

    const editPatient = () => {
        if(!updateDoctorLoader){
            if(validate.isNotEmpty(patientInfoFromCart)){
                setSelectedPatient(patientInfoFromCart);
            }
            setSelectPatientOpen(true);
        }
    }
    const removePatientDetailsInShoppingCart = (patientId) =>{
        checkoutService.removePatientDetailsInShoppingCart({patientId:patientId}).then((data) => {
            if (validate.isNotEmpty(data) && validate.isNotEmpty(data.statusCode) && "SUCCESS" == data.statusCode) {
                setPatientInfoFromCart({});
            } else {
                setAlertInfo({ message: "something went wrong,please try again", type: "danger" });
            }
            setAddPatienLoader(false);
            setUpdateDoctorLoader(false);
        }).catch(e => {
            console.log("error : " + JSON.stringify(e));
            setAlertInfo({ message: "something went wrong,please try again", type: "danger" });
            setAddPatienLoader(false);
            setUpdateDoctorLoader(false);
        });
    }

    const addPatientToShoppingCart = (patientId,doctor,updateDefaultDetails,doctorNameFromPatientModel) => {
        if (validate.isEmpty(patientId) && !updateDefaultDetails ) {
            setAlertInfo({ message: "Complete info not available for Selected Patient. Please Edit to Proceed.", type: "danger" });
            return;
        }
        setAddPatienLoader(true);
        checkoutService.updatePatientDetailsInShoppingCart({ patientId, doctorName: doctorNameFromPatientModel ? doctorNameFromPatientModel : doctor ? doctor : "Self", updateDefaultCustomerDetails:updateDefaultDetails}).then((data) => {
            if (validate.isNotEmpty(data) && validate.isNotEmpty(data.statusCode) && "SUCCESS" == data.statusCode) {
                setSelectPatientOpen(false);
                setSelectedPatient(data.dataObject.patientId ? data.dataObject.patientId  : null);
                setPatientInfoFromCart({ ...patientInfoFromCart, "patientName": data.dataObject.patientName, "patientAge": data.dataObject.patientAge, "gender": data.dataObject.gender, "doctorName": data.dataObject.doctorName, "patientId": data.dataObject.patientId, "dateOfBirth": data.dataObject.dateOfBirth });
                setDoctorNameToUpdate(data.dataObject.doctorName ? data.dataObject.doctorName : "Self");
                setDoctorNameErrorMsg("");
            }
            setAddPatienLoader(false);
            setUpdateDoctorLoader(false);
        }).catch(e => {
            console.log("error : " + JSON.stringify(e));
            setAlertInfo({ message: "something went wrong,please try again", type: "danger" });
            setAddPatienLoader(false);
            setUpdateDoctorLoader(false);
        });
    }

    const handlePatientModelCancel = () =>{
        setSelectPatientOpen(false);
        if(validate.isEmpty(patientInfoFromCart)){
            addPatientToShoppingCart(null,doctorNameToUpdate,true);
        }
    } 

    useEffect(() => {
        if(props.location.errorData && props.location.errorData.errorMsg){
            setAlertInfo({ message: props.location.errorData.errorMsg, type: ""}); 
        }
        if(validate.isEmpty(shoppingCartDetail)) {
            getShoppingCartProducts(null,null,true);
        }
        if(isDefaultLocalitySelectedByUser && isDefaultLocalityModalOpen) {
            proceedShoppingCart();
        }
    }, [isDefaultLocalitySelectedByUser]);

    const getShoppingCartProducts = (promotionType, isCustomerAgreeToSingleOrder,isInitialLoad)=> {
        setCartProductsLoading(true);
        setComplimentaryCartItem({});
        checkoutService.getShoppingCartProducts(promotionType, isCustomerAgreeToSingleOrder).then(response => {
            if(validate.isNotEmpty(response) && validate.isNotEmpty(response.statusCode) && response.statusCode === "SUCCESS") {
                prepareStatesToDisplayShoppingCart(response, isInitialLoad);
                LocalDB.setValue("isMartCheckoutInitiated", true);
                //verifyLocalityAndUserInfo(response.responseData.shoppingCart);
            } else if(response.statusCode === "FAILURE") {
                if ("EMPTY_CART" == response.message) {
                    setAlertInfo({ message: "Shopping cart is Empty", type: "" });
                    checkoutAction.resetCheckoutDetails();
                    //continueShopping();
                }
                else if("INVALID MEDPLUS ID" == response.message) {
                    setAlertInfo({ message: response.message, type: "" });
                    checkoutAction.resetCheckoutDetails();
                    window.location.href = CONFIG.REDIRECT_HOME_URL + "myProfile";
                } else {
                    setAlertInfo({ message: "System experiencing some problem, Please try after some time", type: "" });
                    window.location.href = CONFIG.REDIRECT_HOME_URL;
                }
            }
            setCartProductsLoading(false);
        }).catch(function(error) {
            setCartProductsLoading(false);
            setAlertInfo({ message: "System experiencing some problem, Please try after some time", type: "" });
            window.location.href = CONFIG.REDIRECT_HOME_URL;
        });
    }

    const prepareStatesToDisplayShoppingCart = (response,isInitialLoad) => {
        if (validate.isEmpty(response.dataObject) || (validate.isEmpty(response.dataObject.shoppingCartItems) && validate.isEmpty(response.dataObject.recommendedProducts))) {
            checkoutAction.resetCheckoutDetails();
            continueShopping();
        }
        cartAction.setPrescriptionStepRequired(response.dataObject.isPrescriptionRequired);
        let complimentaryItem = {};
        if (validate.isNotEmpty(response.dataObject.complimentaryItem) && response.dataObject.complimentaryItem.complimentaryType == "ADDED") {
            complimentaryItem = response.dataObject.complimentaryItem;
            setAutoAddComplimentaryItem(true);
            setComplimentryOrder(true);
        } else if (validate.isNotEmpty(response.dataObject.complimentaryItem) && response.dataObject.complimentaryItem.complimentaryType == "RECOMMENDED") {
            complimentaryItem = response.dataObject.complimentaryItem;
        } else {
            complimentaryItem = {};
            setAutoAddComplimentaryItem(false);
            setComplimentaryPopupOpen(false);
            setComplimentryOrder(false);
        }
        setComplimentaryCartItem(complimentaryItem);
        const reduxComplimentaryCartItem = cartAction.getComplimentaryCartItem();
        if(validate.isEmpty(reduxComplimentaryCartItem) || validate.isEmpty(complimentaryItem) || (reduxComplimentaryCartItem.productId != complimentaryItem.productId) || (reduxComplimentaryCartItem.discountPercentage != complimentaryItem.discountPercentage) || (reduxComplimentaryCartItem.packSizeQuantity != complimentaryItem.packSizeQuantity)) {
            cartAction.setComplimentaryCartItem(complimentaryItem);
            if(validate.isNotEmpty(complimentaryItem)) {
                setComplimentaryPopupOpen(true);
            }
        }
        setComplimentaryMessage(response.dataObject.complimentaryMessage);
        let tempShoppingCartDetail = {};
        if (validate.isNotEmpty(response.dataObject.shoppingCartItems)) {
            tempShoppingCartDetail.shoppingCartItems = response.dataObject.shoppingCartItems;
        }
        if (validate.isNotEmpty(response.dataObject.cartSummary)) {
            tempShoppingCartDetail.cartSummary = response.dataObject.cartSummary;
        }
        setShoppingCartDetail(tempShoppingCartDetail);
        checkoutStepsToAnalytics(response.dataObject.shoppingCartItems, 1);
        setShoppingCartETA(response.dataObject.shoppingCartETA);
        setAvailableProductQuantities(response.dataObject.productAvailableQty);
        if (validate.isNotEmpty(response.dataObject.isCheckoutAllowed)) {
            setIsCheckoutAllowed(response.dataObject.isCheckoutAllowed);
        }
        //setDrugSchedulesForPrescription(response.dataObject.drugSchedulesForPrescription);
        setDefaultLocality(response.dataObject.isDefaultLocality);
        //setDefaultLocalitySelectedByUser(response.dataObject.isDefaultLocalitySelectedByUser);
        if (validate.isNotEmpty(response.dataObject.promotionType)) {
            setAppliedPromotionType(response.dataObject.promotionType);
        }
        setTotalMrp(response.dataObject.totalMrp);
        setTotalAmountForPromotion(response.dataObject.totalAmountForPromotion);
        setMinimumOrderAmount(response.dataObject.minOrderAmount);
        if (response.dataObject.isNewCheckoutPromotionEnabled) {
            setNewCheckoutPromotionEnabled(response.dataObject.isNewCheckoutPromotionEnabled);
        }
        setIsDualShipmentAllowed(response.dataObject.isDualShipmentAllowed);
        if(isInitialLoad){
            if(validate.isEmpty(response.dataObject.patientDetails)){
                setSelectPatientOpen(true);
                setDoctorNameToUpdate("");
            } else {
                setSelectedPatient(response.dataObject.patientDetails);
                setPatientInfoFromCart(response.dataObject.patientDetails);
                if (validate.isNotEmpty(response.dataObject.patientDetails.doctorName)) {
                    setDoctorNameToUpdate(response.dataObject.patientDetails.doctorName);
                    setDoctorNameErrorMsg("");
                }
            }
        }
        if (!response.dataObject.isCustomerAgreedToSingleOrder){
            setSelectedShipmentDeliverySpeed("multipleShipments");
        }else{
            setSelectedShipmentDeliverySpeed("singleShipments");
        }
        setHubServingItemCount(response.dataObject.hubServingItemsCount);
        setMultipleShipmentServingStoreId(response.dataObject.multipleShipmentServingStoreId);
        if (validate.isNotEmpty(response.dataObject) && validate.isNotEmpty(response.dataObject.upsellProductHeading)) {
            setUpsellProductHeading(response.dataObject.upsellProductHeading);
        }
        if (validate.isNotEmpty(response.dataObject) && validate.isNotEmpty(response.dataObject.recommendedProducts)) {
            setRecommendedCartDetail(response.dataObject.recommendedProducts);
        }
        if (validate.isNotEmpty(response.dataObject.promotionalBanners)) {
            setPromotionBanners(response.dataObject.promotionalBanners);
        }
        if (validate.isNotEmpty(response.dataObject.paymentBanners)) {
            setPaymentBanners(response.dataObject.paymentBanners);
        }
    }
    const verifyLocalityAndUserInfo = (shoppingCart) => {
        if(validate.isNotEmpty(shoppingCart) && validate.isNotEmpty(shoppingCart.shoppingCartItems)) {
            if(validate.isEmpty(shoppingCart.localityObject.configId) || (!shoppingCart.localityObject.homeDeliveryAllowed && !shoppingCart.localityObject.storePickupAvailable)) {
                setAlertInfo({ message: "Service not available in the location", type: "" });
                checkoutAction.resetCheckoutDetails();
                continueShopping();
                return false;
            }
            if(validate.isEmpty(selectedLocality) || validate.isEmpty(selectedLocality.configId) || (selectedLocality.configId != shoppingCart.localityObject.configId)) {
                checkoutAction.resetCheckoutDetails();
                reloadSelectedLocalityInfo(null,null,dispatch);
                
            }
            if(validate.isEmpty(userInfo) || (userInfo.medplusId != shoppingCart.customerId)) {
                userInfoAction.reloadUserInfo();
                checkoutAction.resetCheckoutDetails();
            }
        }
    }

    const modifyShoppingCartProductQuantity = (productId, requestedQty) => {
        setCartProductsLoading(true);
        checkoutService.addOrModifyProductToShoppingCart(productId, requestedQty, false).then(response => {
            if (validate.isNotEmpty(response) && validate.isNotEmpty(response.statusCode) && response.statusCode === "SUCCESS") {
                if (validate.isNotEmpty(shoppingCartDetail.shoppingCartItems)) {
                    try{
                        let cartProduct = shoppingCartDetail.shoppingCartItems.find((element) => {
                            return element.productId === productId;
                        })
                        if (cartProduct) {
                            let actiontype = "add";
                            let qtyForAnalytics = requestedQty;
                            if(cartProduct.packSizeQuantity>requestedQty){
                                actiontype = "remove";
                                qtyForAnalytics = cartProduct.packSizeQuantity - requestedQty;
                            }else if(cartProduct.packSizeQuantity<requestedQty){
                                actiontype = "add";
                                qtyForAnalytics = requestedQty - cartProduct.packSizeQuantity;
                            }
                            modifyCart({ productId: productId, productName: cartProduct.productName, brand: cartProduct.brand ? cartProduct.brand : '' }, qtyForAnalytics, actiontype);
                        } else {
                            modifyCart({ productId: productId, productName: "", brand: '' }, 0, "remove");
                        }
                    }catch(err){
                        console.log(err);
                    }
                }
                prepareStatesToDisplayShoppingCart(response, null);
                //getShoppingCartProducts(newPromotionType, (selectedShipmentDeliverySpeed == "singleShipments" ? "Y" : "N"));
                //prepareStatesToDisplayShoppingCart(response);
            } else if(response.statusCode === "FAILURE") {
                if ("EMPTY_CART" == response.message) {
                    checkoutAction.resetCheckoutDetails();
                    continueShopping();
                } else {
                    setAlertInfo({ message: response.message, type: "" });
                   // setAvailableProductQuantities(response.responseData.availableProductQuantities);
                    const element = document.getElementById("item_"+ productId);
                    if(validate.isNotEmpty(element)) {
                        element.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
                    }
                }
            }
            setCartProductsLoading(false);
        }).catch(function(error) {
            setCartProductsLoading(false);
            setAlertInfo({ message: "System experiencing some problem, Please try after some time", type: "" });
        });
        checkoutAction.resetPrescriptionOptionDetails();
    }

    const addRecommendedProductToCart = (productId, requestedQty) => {
        setCartProductsLoading(true);
        checkoutService.addOrModifyProductToCart(productId, requestedQty, true).then(response => {
            if(validate.isNotEmpty(response) && validate.isNotEmpty(response.statusCode) && response.statusCode === "SUCCESS") {
                try{
                    let recommendedProduct = recommendedCartDetail.find((element) => {
                        return element.productId === productId;
                    })
                    modifyCart({ productId: productId, productName: recommendedProduct.productName, brand: recommendedProduct.brand ? recommendedProduct.brand : '' }, requestedQty, 'add');
                }catch(err){
                    console.log(err);
                }
                getShoppingCartProducts(newPromotionType, "N");
                //prepareStatesToDisplayShoppingCart(response);
            } else if(response.statusCode === "FAILURE") {
                setAlertInfo({ message: response.message, type: "" });
            }
            setCartProductsLoading(false);
        }).catch(function(error) {
            setCartProductsLoading(false);
            setAlertInfo({ message: "System experiencing some problem, Please try after some time", type: "" });
        });
        checkoutAction.resetPrescriptionOptionDetails();
    }

    const addOrModifyComplimentaryProductToCart = (productId, requestedQty) => {
        setCartProductsLoading(true);
        checkoutService.addOrModifyComplimentaryProductToCart(productId, requestedQty).then(response => {
            if(validate.isNotEmpty(response) && validate.isNotEmpty(response.statusCode) && response.statusCode === "SUCCESS") {
                prepareStatesToDisplayShoppingCart(response);
            } else if(response.statusCode === "FAILURE") {
                setAlertInfo({ message: response.message, type: "" });
            }
            setCartProductsLoading(false);
        }).catch(function(error) {
            setCartProductsLoading(false);
            setAlertInfo({ message: "System experiencing some problem, Please try after some time", type: "" });
        });
        checkoutAction.resetPrescriptionOptionDetails();
    }

    const proceedShoppingCart = () => {
        if(isDefaultLocality && !isDefaultLocalitySelectedByUser) {
            toggleDefaultLocalityModal();
            return false;
        }
        if(isDefaultLocalityModalOpen) {
            toggleDefaultLocalityModal();
        }
        if(validate.isNotEmpty(availableProductQuantities)) {
            const shoppingCartItems = shoppingCartDetail.shoppingCartItems;
            for (const [productId, qty] of Object.entries(availableProductQuantities)) {
                const shoppingCartItem = shoppingCartItems.filter((eachItem) => { return eachItem.productId == productId });
                if(validate.isNotEmpty(shoppingCartItem) && parseInt(qty) < 1) {
                    const element = document.getElementById("item_"+ shoppingCartItem[0].productId);
                    if(validate.isNotEmpty(element)) {
                        element.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
                    }
                    setAlertInfo({ message: "Remove Out Of Stock Product '" + shoppingCartItem[0].productName +"' from your cart to proceed", type: "" });
                    return false;
                }
                if (validate.isNotEmpty(shoppingCartItem[0]) && (parseInt(qty) > 0) && (parseInt(qty) < parseInt(shoppingCartItem[0].packSizeQuantity))) {
                    const element = document.getElementById("item_" + shoppingCartItem[0].productId);
                    if(validate.isNotEmpty(element)) {
                        element.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
                    }
                    setAlertInfo({ message: "For Product '" + shoppingCartItem[0].productName +"' available quantity is "+ qty, type: "" });
                    return false;
                }
            }
        }
        setProceedLoading(true);
        checkoutService.proceedShoppingCart(isDefaultLocalitySelectedByUser).then(response => {
            setProceedLoading(false);
            if (validate.isNotEmpty(response) && validate.isNotEmpty(response.statusCode) && response.statusCode === "SUCCESS") {
                setAlertInfo({ message: response.message, type: "" });
                goToNextComponent();
            } else if (response.statusCode === "FAILURE") {
                setAlertInfo({ message: response.message, type: "" });
            }
        }).catch(function (error) {
            setProceedLoading(false);
            setAlertInfo({ message: "System experiencing some problem, Please try after some time", type: "" });
        });
    }

    const goToNextComponent = () => {
        if(isPrescStepRequired){
            props.history.push('/prescription');
        } else {
            props.history.push('/delivery');
        }
    }

    const continueShopping = () => {
        window.location.href = CONFIG.REDIRECT_HOME_URL;
    }
    const toggleRemoveComplimentaryModal = () => setRemoveComplimentaryModalOpen(!isRemoveComplimentaryModalOpen);
    const proceedWithRemoveComplimentary = (promotionType) => {
        setRemoveComplimentaryModalOpen(!isRemoveComplimentaryModalOpen);
        getShoppingCartProducts(promotionType, (selectedShipmentDeliverySpeed == "singleShipments" ? "Y" : "N"));
    }
    const proceedWithDefaultPromotion = () => {
        setRemoveComplimentaryModalOpen(!isRemoveComplimentaryModalOpen);
    }

    const localityModalToggle = () => { setLocalityModalOpen(!isLocalityModalOpen); }

    const toggleDefaultLocalityModal = () => setDefaultLocalityModalOpen(!isDefaultLocalityModalOpen);

    const openLocalityModal = () => {
        toggleDefaultLocalityModal();
        localityModalToggle();
    }

    const proceedWithDefaultLocality = () => {
        setDefaultLocalitySelectedByUser(true);
    }

    const applyPromotion = (promotionType) => {
        if(appliedPromotionType != promotionType) {
            setNewPromotionType(promotionType);
            if(isComplimentaryOrder && promotionType=='POINT'){
                setRemoveComplimentaryModalOpen(!isRemoveComplimentaryModalOpen);
            }else{
                getShoppingCartProducts(promotionType, (selectedShipmentDeliverySpeed == "singleShipments" ? "Y" : "N"));
            }  
        }
    }

    const setShipmentDeliverySpeed = (updatedShipmentDeliverySpeed) => {
        if(selectedShipmentDeliverySpeed != updatedShipmentDeliverySpeed) {
            getShoppingCartProducts(newPromotionType, (updatedShipmentDeliverySpeed == "singleShipments" ? "Y" : "N"));
            setSelectedShipmentDeliverySpeed(updatedShipmentDeliverySpeed);
            // if(updatedShipmentDeliverySpeed == "multipleShipments") {
            //     setAllProductsInSingleShipment(false);
            // } else {
            //     setAllProductsInSingleShipment(true);
            // }
        }
    }

    return (
        <React.Fragment>
            { alertInfo && alertInfo.message && <Alert alertInfo={alertInfo} duration={5000} onDurationEnd={setAlertInfo}/>}
            {(isSelectPatientOpen || isAddOrEditPatientOpen || isConfirmationOpen ) && <PatientModel isAddOrEditPatientOpen={isAddOrEditPatientOpen} 
                                    isConfirmationOpen = {isConfirmationOpen}
                                    setConfirmationOpen = {setConfirmationOpen}
                                    setAddOrEditPatientOpen={setAddOrEditPatientOpen} 
                                    seletedPatientForEdit={seletedPatientForEdit} 
                                    isSelectPatientOpen={isSelectPatientOpen} 
                                    setSelectPatientOpen={setSelectPatientOpen} 
                                    seletedPatient={seletedPatient} 
                                    setSelectedPatient={setSelectedPatient} 
                                    addPatientToShoppingCart={addPatientToShoppingCart} 
                                    setSelectedPatientForEdit={setSelectedPatientForEdit} 
                                    addPatienLoader={addPatienLoader} 
                                    history={props.history} 
                                    callBackFunc={removePatientDetailsInShoppingCart} 
                                    setAlertErrorMsg={setAlertInfo}
                                    handlePatientModelCancel = {handlePatientModelCancel}
                                    errMsg = {setAlertInfo}
                                    isFromMart
                                    from = "PHARMACY"
                                    change/>
            }
            <React.Fragment>
                <main role="main" className="container-fluid container-lg">
                    {!isCartProductsLoading && validate.isNotEmpty(shoppingCartDetail) && validate.isNotEmpty(complimentaryMessage) &&
                        <div className="row mb-2 px-sm-3">
                            <div className="col p-0">
                                <section>
                                    <div className="footer warning rounded">Note: {complimentaryMessage}</div>
                                </section>
                            </div>
                        </div>
                    }
                    <div className="row px-sm-3">
                        {isCartProductsLoading && <ShoppingCartGhostImage isCartProductsLoading={isCartProductsLoading} />}
                        {!isCartProductsLoading && validate.isNotEmpty(shoppingCartDetail) &&
                            <div className="col-8 pl-0 pr-2">
                                {validate.isNotEmpty(patientInfoFromCart) &&
                                    <div className="labs-patient-info">
                                        <div className="each-info">
                                            <section className="h-100">
                                                <div className="header">
                                                    <p>Patient Details</p>
                                                </div>
                                                <div className="lab-patient-card">
                                                    <div>
                                                    <h6 className="mb-0">
                                                        <p className="patient-name text-truncate text-capitalize" >
                                                            {patientInfoFromCart.patientName}
                                                        </p> 
                                                        </h6>
                                                        <small class="text-secondary">
                                                            {getDisplayableAge(patientInfoFromCart.dateOfBirth)}
                                                            {`${patientInfoFromCart.gender && validate.isNotEmpty(Gender[patientInfoFromCart.gender]) ? patientInfoFromCart.dateOfBirth ? ' / ' + Gender[patientInfoFromCart.gender] : Gender[patientInfoFromCart.gender] : ''}`}
                                                            {`${patientInfoFromCart.doctorName ? (patientInfoFromCart.gender || patientInfoFromCart.patientAge) ? ' / Dr ' + patientInfoFromCart.doctorName : 'Dr ' + patientInfoFromCart.doctorName : ''}`}
                                                        </small>
                                                    </div>
                                                    <a className="brand-secondary btn cate-btn rounded-pill" aria-label="Edit" aria-role="button" href="javascript:void(0)" title="Edit" onClick={() =>  editPatient()  }>Edit</a>
                                                </div>
                                            </section>
                                        </div>
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
                                                        <input type="text" id="docName" className={validate.isNotEmpty(doctorNameErrorMsg) ? "form-control is-invalid" : "form-control"} maxLength={30} placeholder="Enter Doctor Name" autoComplete="off" aria-label="Enter Doctor Name" aria-describedby="basic-addon1" value={doctorNameToUpdate} onChange={(e) => { setDoctorName(e.target.value) }} onBlur={() => updateDoctorToPatient()} disabled={updateDoctorLoader} />
                                                    </div>
                                                    {validate.isNotEmpty(doctorNameErrorMsg) && <span className="text-danger"><small>{doctorNameErrorMsg}</small></span>}
                                                </div>
                                            </section>
                                        </div>
                                    </div>
                                }
                                {isDualShipmentAllowed &&
                                    <ShipmentDeliverySpeed intermediateWHId = {selectedLocality.intermediateWareHouseId} 
                                    wareHouseId = {selectedLocality.wareHouseId} 
                                    hubId = {selectedLocality.hubId} 
                                    shoppingCartETA = {shoppingCartETA} 
                                    selectedShipmentDeliverySpeed = {selectedShipmentDeliverySpeed} 
                                    setShipmentDeliverySpeed = {setShipmentDeliverySpeed}
                                    hubServingItemCount={hubServingItemCount}
                                    multipleShipmentServingStoreId= {multipleShipmentServingStoreId}
                                    />
                                }
                                {shoppingCartDetail.shoppingCartItems  && shoppingCartDetail.shoppingCartItems.length > 0 && <section>
                                    <div className="header">
                                        <p>Shopping Cart</p>
                                        <p className="d-none">Delivery Options</p>
                                    </div>
                                    <ul className="product-listview list-group list-group-flush">
                                        {shoppingCartDetail.shoppingCartItems && shoppingCartDetail.shoppingCartItems.map(eachShoppingCartItem => {
                                            return (eachShoppingCartItem && !eachShoppingCartItem.upSellProduct && (eachShoppingCartItem.complimentaryType == "NONE") &&
                                                <ShoppingCartItem key={eachShoppingCartItem.productId}
                                                    shoppingCartItem={eachShoppingCartItem}
                                                    shoppingCartETA={shoppingCartETA}
                                                    availableProductQty={validate.isNotEmpty(availableProductQuantities) ? availableProductQuantities[eachShoppingCartItem.productId] : null}
                                                    modifyShoppingCartProductQuantity={modifyShoppingCartProductQuantity}
                                                    //productImageURL={productImageURLs[eachShoppingCartItem.productId]}
                                                    appliedPromotionType={appliedPromotionType}
                                                    isNewCheckoutPromotionEnabled={isNewCheckoutPromotionEnabled}
                                                />
                                            )
                                        })}
                                    </ul>
                                </section>}
                                {validate.isNotEmpty(complimentaryCartItem) && (appliedPromotionType == "DISCOUNT" || appliedPromotionType == "WALLET") &&
                                    <section>
                                        <div className="header complimentary-header">
                                            <p>Complimentary / Offer Product</p>
                                        </div>
                                        <ul className="product-listview list-group list-group-flush">
                                            <ComplimentaryCartItem complimentaryCartItem={complimentaryCartItem} 
                                                isAutoAddComplimentaryItem={isAutoAddComplimentaryItem} 
                                                isAddedToCart={complimentaryCartItem.complimentaryType == "ADDED"}
                                                complimentaryCartETA={shoppingCartETA} 
                                                //productImageURL={productImageURLs[complimentaryCartItem.productId]} 
                                                addOrModifyComplimentaryProductToCart={addOrModifyComplimentaryProductToCart}
                                            />
                                        </ul>
                                    </section>
                                }
                                {validate.isNotEmpty(recommendedCartDetail) &&
                                    <section>
                                        <div className="header offered">
                                            <p>{validate.isNotEmpty(upsellProductHeading) ? upsellProductHeading : 'Recommended COVID-19 prevention products for you'}</p>
                                        </div>
                                        <ul className="product-listview list-group list-group-flush">
                                            {recommendedCartDetail && recommendedCartDetail.map(eachRecommendedCartItem => {
                                                return(eachRecommendedCartItem && 
                                                    <RecommendedCartItem key={eachRecommendedCartItem.productId} 
                                                        recommendedCartItem={eachRecommendedCartItem} 
                                                        recommendedCartItemETA={eachRecommendedCartItem.overFlowItems[0].deliveryTime} 
                                                        configuredQty={eachRecommendedCartItem.configuredRecommendedPackQuantity} 
                                                    isAddedToCart={eachRecommendedCartItem.quantity > 0} 
                                                        //shoppingCartItem={shoppingCartDetail.shoppingCartItemsMap[eachRecommendedCartItem.productId]} 
                                                        shoppingCartETA={shoppingCartETA} 
                                                    availableProductQty={eachRecommendedCartItem.availableRecommendedQuantity} 
                                                        modifyRecommendedCartProductQuantity={modifyShoppingCartProductQuantity} 
                                                        addRecommendedProductToCart={addRecommendedProductToCart}
                                                        //productImageURL={productImageURLs[eachRecommendedCartItem.productId]}
                                                        appliedPromotionType = {appliedPromotionType}
                                                    />
                                                )
                                            })}
                                        </ul>
                                    </section>
                                }
                                <CheckoutInfoNote/>
                            </div>
                        }
                        {!isCartProductsLoading &&
                            <div className="col-4 pl-2 pr-0">
                                {(validate.isNotEmpty(promotionBanners) || validate.isNotEmpty(paymentBanners)) && <ApplicableOffers promotionBanners={promotionBanners} paymentBanners={paymentBanners} isNewCheckoutPromotionEnabled = {isNewCheckoutPromotionEnabled} appliedPromotionType = {appliedPromotionType} applyPromotion = {applyPromotion}/>}
                                {validate.isNotEmpty(shoppingCartDetail.cartSummary) && <CartSummary noOfItems={shoppingCartDetail.cartSummary.cartItemsCount} totalMrp={shoppingCartDetail.cartSummary.totalMrp} totalAmount={shoppingCartDetail.cartSummary.totalAmount} totalPoint={shoppingCartDetail.cartSummary.pointTotal} totalDiscount={shoppingCartDetail.cartSummary.totalDiscount} appliedPromotionType={appliedPromotionType} isNewCheckoutPromotionEnabled={isNewCheckoutPromotionEnabled} selectedLocality={selectedLocality} totalPbPoints={shoppingCartDetail.cartSummary.totalPaybackPoints}/>}
                            </div>
                        }
                    </div>
                </main>
                {!isCartProductsLoading &&
                <footer className="footer fixed-bottom mt-auto py-2">
                    <div className="container-lg container-fluid px-sm-3 px-0">
                        <div className="row align-items-center no-gutters">
                            <div className="col-6">
                                    {!isCheckoutAllowed &&
                                <p className="alert alert-warning alert-sm px-2 py-1 m-0"><strong>Note:</strong> Minimum order amount should be above ₹ {minimumOrderAmount}</p>
                            }
                            </div>
                            <div className="col-6 text-right">
                                <button type="button" className="brand-secondary btn px-5 rounded-pill custom-btn-lg" disabled={isProceedLoading} onClick={() => continueShopping()}>Continue Shopping</button>
                                    {/* {parseFloat(totalAmountForPromotion) >= parseFloat(validate.isNotEmpty(selectedLocality) ? selectedLocality.minOrderAmt : 0) && */}
                                    {isCheckoutAllowed && 
                                    <button type="submit" className="btn  btn-brand-gradient ml-3 px-5 rounded-pill custom-btn-lg" disabled={isProceedLoading} onClick={() => proceedShoppingCart()}>
                                        {isProceedLoading ? "" : "Proceed"}
                                        {isProceedLoading &&
                                            <React.Fragment>
                                                <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                                                <span className="sr-only"></span>
                                            </React.Fragment>
                                        }
                                    </button>
                                }
                            </div>
                        </div>
                    </div>
                </footer>
                }
            </React.Fragment>
            <DefaultLocalityModal isModelOpen={isDefaultLocalityModalOpen} toggleDefaultLocalityModal={toggleDefaultLocalityModal} proceedWithDefaultLocality={proceedWithDefaultLocality} openLocalityModal={openLocalityModal}/>
            {validate.isNotEmpty(selectedLocality) && <ChangeLocality modal={isLocalityModalOpen} toggle={localityModalToggle} selectedLocality={selectedLocality}/>}
            {validate.isNotEmpty(complimentaryCartItem) && <ComplimentaryPopup isComplimentaryPopupOpen={isComplimentaryPopupOpen} complimentaryCartItem={complimentaryCartItem} setComplimentaryPopupOpen={setComplimentaryPopupOpen}/>}
            <RemoveComplimentaryModal isModelOpen={isRemoveComplimentaryModalOpen} toggleRemoveComplimentaryModal={toggleRemoveComplimentaryModal} onConfirmCall={proceedWithRemoveComplimentary} promotionType={newPromotionType}
                onCancelCall={proceedWithDefaultPromotion}/>
        </React.Fragment>
    );
}

export const  DefaultLocalityModal = (props) => {
    return (
        <React.Fragment>
            <Modal className="modal-dialog-centered refill-interval-popup" backdrop="static" isOpen={props.isModelOpen} toggle={props.toggleDefaultLocalityModal} style={{paddingRight: "15px"}}>
                <ModalBody className="modal-body">
                    <img srcSet={LocationIcn}/>
                    <h5><strong>Modify Service Locality</strong></h5>
                    <p>Your current locality is <strong>"Bala Nagar, Hyderabad"</strong>.
                    To change your current locality <a className="text-primary" title="Click here to change locality" onClick={() => props.openLocalityModal()}><strong>Click here</strong></a></p>
                    <button type="button" className="btn btn-brand-gradient ml-3 px-5 rounded-pill" onClick={() => props.proceedWithDefaultLocality()}>Proceed with current Locality</button>
                </ModalBody>
            </Modal>    
        </React.Fragment>
    );
}

export const  RemoveComplimentaryModal = (props) => {
    return (
        <React.Fragment>
            <Modal className="modal-dialog-centered refill-interval-popup" backdrop="static" isOpen={props.isModelOpen} toggle={props.toggleRemoveComplimentaryModal} style={{paddingRight: "15px"}}>
                <ModalBody className="modal-body">
                    <p>selecting flexi reward promotion might remove the complimentary product</p>
                    <button type="button" className="btn btn-brand px-3 ml-2" onClick={() => props.onCancelCall()}>CANCEL</button>
                    <button type="button" className="btn btn-brand px-3 ml-2" onClick={() => props.onConfirmCall(props.promotionType)}>OK</button>
                </ModalBody>
            </Modal>    
        </React.Fragment>
    );
}
export default ShoppingCart;
