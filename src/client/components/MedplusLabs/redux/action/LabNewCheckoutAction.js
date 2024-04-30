import { useDispatch, useSelector } from 'react-redux';
import Validate from '../../../../helpers/Validate';
import { CLEAR_LAB_SHOPPING_CART, LAB_SHOPPING_CART, REMOVE_VISIT_TYPE, SET_NEW_ADDRESS, SET_VISIT_TYPE, IS_NEW_ADDRESS_ADDED, SAVE_LAB_ORDER_ID } from '../reducer/LabNewCheckoutReducer';

export default function LabNewCheckoutAction() {

    const validate = Validate();
    const dispatch = useDispatch();
    const checkoutDetails = useSelector(state => state.labCheckout);

    function saveLabShoppingCart(shoppingCartInfo){
        if(validate.isEmpty(shoppingCartInfo)) {
            return;
        }
        return dispatch({type: LAB_SHOPPING_CART, data: shoppingCartInfo});
    }

    function getLabShoppingCart() {
        let labShoppingCart = {};
        if(validate.isNotEmpty(checkoutDetails) && validate.isNotEmpty(checkoutDetails.labShoppingCart)) {
            labShoppingCart = checkoutDetails.labShoppingCart;
        }
        return labShoppingCart;
    }

    function setVisitType(visitType){
        if(validate.isEmpty(visitType)) {
            return;
        }
        return dispatch({type: SET_VISIT_TYPE, data: visitType});
    }

    function removeVisitType(){
        return dispatch({type: REMOVE_VISIT_TYPE});
    }

    function getVisitType() {
        let visitType = "";
        if(validate.isNotEmpty(checkoutDetails) && validate.isNotEmpty(checkoutDetails.visitType)) {
            visitType = checkoutDetails.visitType;
        }
        return visitType;
    }

    function setNewAddress(newAddrees){
        if(validate.isEmpty(newAddrees)) {
            return;
        }
        return dispatch({type: SET_NEW_ADDRESS, data: newAddrees});
    }

    function getNewAddress(){
        let newAddress = "";
        if(validate.isNotEmpty(checkoutDetails) && validate.isNotEmpty(checkoutDetails.newAddress)) {
            newAddress = checkoutDetails.newAddress;
        }
        return newAddress;
    }

    function setIsNewAddressAdded(isNewAddressAdded) {
        return dispatch({type: IS_NEW_ADDRESS_ADDED, data: isNewAddressAdded});
    }

    function isNewAddressAdded() {
        let isNewAddressAdded = false;
        if(validate.isNotEmpty(checkoutDetails) && validate.isNotEmpty(checkoutDetails.isNewAddressAdded)) {
            isNewAddressAdded = checkoutDetails.isNewAddressAdded;
        }
        return isNewAddressAdded;
    }

    function clearLabShoppingCart() {
        return dispatch({type: CLEAR_LAB_SHOPPING_CART});
    }

    function saveLabOrderId(labOrderId) {
        return dispatch({type: SAVE_LAB_ORDER_ID, data :labOrderId})
    }
    return Object.freeze({
        saveLabShoppingCart,
        getLabShoppingCart,
        clearLabShoppingCart,
        setVisitType,
        getVisitType,
        removeVisitType,
        setNewAddress,
        getNewAddress,
        setIsNewAddressAdded,
        isNewAddressAdded,
        saveLabOrderId
    });
}