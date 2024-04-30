import { useSelector, useDispatch } from 'react-redux';
import { IS_PRESCRIPTION_STEP_REQUIRED, COMPLIMENTARY_CART_ITEM, RESET_COMPLIMENTARY_CART_ITEM, SHOPPING_CART_ITEMS, RESET_SHOPPING_CART_INFO } from '../reducer/CartReducer';
import Validate from '../../client/helpers/Validate';
import CommonHeaderService from '../../client/services/CommonHeaderService';

export default function CartAction() {

    const validate = Validate();
    const dispatch = useDispatch();
    const cartInfo = useSelector(state => state.cart);
    const userInfo = useSelector(state => state?.userInfo?.userInfo ? state.userInfo.userInfo : {});

    function isPrescriptionStepRequired() {
        let isPrescriptionRequired = false;
        if(validate.isNotEmpty(cartInfo) && validate.isNotEmpty(cartInfo.isPrescriptionStepRequired)) {
            isPrescriptionRequired = cartInfo.isPrescriptionStepRequired;
        }
        return isPrescriptionRequired;
    }

    function setPrescriptionStepRequired(isPrescriptionStepRequired){
        return dispatch({type: IS_PRESCRIPTION_STEP_REQUIRED, data: isPrescriptionStepRequired});
    }

    function setComplimentaryCartItem(complimentaryCartItem) {
        return dispatch({type: COMPLIMENTARY_CART_ITEM, data: complimentaryCartItem});
    }

    function getComplimentaryCartItem() {
        let complimentaryCartItem = {};
        if(validate.isNotEmpty(cartInfo) && validate.isNotEmpty(cartInfo.complimentaryCartItem)) {
            complimentaryCartItem = cartInfo.complimentaryCartItem;
        }
        return complimentaryCartItem;
    }

    function clearComplimentaryCartItem() {
        return dispatch({type: RESET_COMPLIMENTARY_CART_ITEM});
    }

    function updateShoppingCartInfo(setAddToCartLoading) {
        if(validate.isNotEmpty(userInfo) && validate.isNotEmpty(userInfo.medplusId)) {
            CommonHeaderService().getMiniShoppingCart().then(response => {
                if(setAddToCartLoading){
                    setAddToCartLoading(undefined); 
                }
                if(validate.isNotEmpty(response) && response.statusCode === "SUCCESS" && validate.isNotEmpty(response.dataObject) && validate.isNotEmpty(response.dataObject.customerMiniCart)) {
                    dispatch({
                        type: SHOPPING_CART_ITEMS,
                        data: response.dataObject.customerMiniCart
                    });
                } else {
                    return dispatch({ type: RESET_SHOPPING_CART_INFO });
                }
            }).catch(function(error) {
                console.log("Error : ", error);
                if(setAddToCartLoading){
                    setAddToCartLoading(undefined); 
                }
                return;
            });
        }
    }
    
    function clearShoppingCart() {
        return dispatch({type: RESET_SHOPPING_CART_INFO});
    }

    function addOrModifyProductInCart(productId, productName, qty) {
        let shoppingCartItems = validate.isNotEmpty(cartInfo.shoppingCartItem) ? cartInfo.shoppingCartItem : [];
        shoppingCartItems.map((product, index) => {
            if(product.productId === productId){
                shoppingCartItems.splice(index, 1);
            }
        })
        if(qty > 0) {
            dispatch({
                type: SHOPPING_CART_ITEMS,
                data: [...shoppingCartItems, {
                    quantity: qty, 
                    productId: productId, 
                    productName: productName
                }]
            });
        } else {
            dispatch({
                type: SHOPPING_CART_ITEMS,
                data: shoppingCartItems
            });
        }
    }

    return Object.freeze({
        isPrescriptionStepRequired,
        setPrescriptionStepRequired,
        setComplimentaryCartItem,
        getComplimentaryCartItem,
        clearComplimentaryCartItem,
        updateShoppingCartInfo,
        clearShoppingCart,
        addOrModifyProductInCart
    });
}

