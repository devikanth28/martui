import { useSelector, useDispatch } from 'react-redux';
import { LAB_SHOPPING_CART, IS_NEW_ADDRESS_ADDED, CLEAR_LAB_SHOPPING_CART,REMOVE_NEW_ADDRESS } from '../reducer/LabCheckoutReducer';
import Validate from '../../client/helpers/Validate';

export default function LabCheckoutAction() {

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

    function getSampleCollectionInfoFromShoppingCart() {
        let sampleCollectionInfo = {};
        if(validate.isNotEmpty(checkoutDetails) && validate.isNotEmpty(checkoutDetails.labShoppingCart)) {
            let labShoppingCart = checkoutDetails.labShoppingCart;
            if(validate.isNotEmpty(labShoppingCart.visitType) && labShoppingCart.visitType == "1" && validate.isNotEmpty(labShoppingCart.address)) {
                sampleCollectionInfo.visitType = labShoppingCart.visitType;
                sampleCollectionInfo.address = labShoppingCart.address;
                sampleCollectionInfo.collectionCenterId = null;
            } else if(validate.isNotEmpty(labShoppingCart.visitType) && labShoppingCart.visitType == "2" && validate.isNotEmpty(labShoppingCart.collectionCenterStore.storeId)) {
                sampleCollectionInfo.visitType = labShoppingCart.visitType;
                sampleCollectionInfo.address = null;
                sampleCollectionInfo.collectionCenterId = labShoppingCart.collectionCenterStore.storeId;
            }
        }
        return sampleCollectionInfo;
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

    function removeNewAddress(){
        return dispatch({type: REMOVE_NEW_ADDRESS});
    }

    return Object.freeze({
        saveLabShoppingCart,
        getLabShoppingCart,
        setIsNewAddressAdded,
        isNewAddressAdded,
        getSampleCollectionInfoFromShoppingCart,
        clearLabShoppingCart,
        removeNewAddress
    });
}