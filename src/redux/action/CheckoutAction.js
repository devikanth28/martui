import { useSelector, useDispatch } from 'react-redux';
import { SET_PRESCRIPTION_OPTION_DETAILS, RESET_PRESCRIPTION_OPTION_DETAILS, SELECTED_DELIVERY_INFO, IS_NEW_ADDRESS_ADDED, RESET_SELECTED_DELIVERY_INTO, RESET_CHECKOUT_DETAILS } from '../reducer/CheckoutReducer';
import Validate from '../../client/helpers/Validate';
import { func } from 'prop-types';

export default function CheckoutAction() {

    const validate = Validate();
    const dispatch = useDispatch();
    const checkoutDetails = useSelector(state => state.checkout);

    function setPrescriptionOptionDetails(selectedPrescriptionOption, filesToUpload, uploadedFilesInfo, healthRecordId) {
        const prescriptionOptionDetails = {selectedPrescriptionOption: selectedPrescriptionOption, filesToUpload: filesToUpload, uploadedFilesInfo: uploadedFilesInfo, healthRecordId: healthRecordId};
        return dispatch({type: SET_PRESCRIPTION_OPTION_DETAILS, data: prescriptionOptionDetails});
    }

    function getPrescriptionOptionDetails() {
        let prescriptionOptionDetails = {};
        if(validate.isNotEmpty(checkoutDetails) && validate.isNotEmpty(checkoutDetails.prescriptionOptionDetails)) {
            prescriptionOptionDetails = checkoutDetails.prescriptionOptionDetails;
        }
        return prescriptionOptionDetails;
    }

    function isShowPrescriptionAtStoreSelected() {
        let isShowPrescriptionAtStore = false;
        if(validate.isNotEmpty(checkoutDetails) && validate.isNotEmpty(checkoutDetails.prescriptionOptionDetails) && "ShowPrescriptionAtStore" == checkoutDetails.prescriptionOptionDetails.selectedPrescriptionOption) {
            isShowPrescriptionAtStore = true;
        }
        return isShowPrescriptionAtStore;
    }

    function resetPrescriptionOptionDetails() {
        return dispatch({type: RESET_PRESCRIPTION_OPTION_DETAILS});
    }

    function setSelectedDeliveryDetails(deliveryInfo) {
        return dispatch({type: SELECTED_DELIVERY_INFO, data: deliveryInfo});
    }

    function getSelectedDeliveryDetails() {
        let deliveryDetails = {};
        if(validate.isNotEmpty(checkoutDetails) && validate.isNotEmpty(checkoutDetails.deliveryDetails)) {
            deliveryDetails = checkoutDetails.deliveryDetails;
        }
        return deliveryDetails;
    }

    function resetSelectedDeliveryDetails() {
        return dispatch({type: RESET_SELECTED_DELIVERY_INTO});
    }

    function setIsNewAddressAdded(flag) {
        return dispatch({type: IS_NEW_ADDRESS_ADDED, data: flag});
    }

    function isNewAddressAdded() {
        let isNewAddressAdded = false;
        if(validate.isNotEmpty(checkoutDetails) && validate.isNotEmpty(checkoutDetails.isNewAddressAdded)) {
            isNewAddressAdded = checkoutDetails.isNewAddressAdded;
        }
        return isNewAddressAdded;
    }

    function resetCheckoutDetails() {
        return dispatch({type: RESET_CHECKOUT_DETAILS});
    }

    return Object.freeze({
        setPrescriptionOptionDetails,
        getPrescriptionOptionDetails,
        isShowPrescriptionAtStoreSelected,
        resetPrescriptionOptionDetails,
        setSelectedDeliveryDetails,
        getSelectedDeliveryDetails,
        resetSelectedDeliveryDetails,
        setIsNewAddressAdded,
        isNewAddressAdded,
        resetCheckoutDetails
    });
}

