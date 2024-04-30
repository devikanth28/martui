import React, { useEffect, useState } from "react";
import ProductSearchDropDown from "../../../components/Common/ProductSearchDropDown";
import Validate from "../../../helpers/Validate";
import MartCatalogService from "../../services/MartCatalogService";
import { useSelector } from 'react-redux';
import CartAction from "../../../../redux/action/CartAction";
import GetNotifiedPopup from "./GetNotifiedPopup";
import SignInPopUp from "../../../components/Common/signInModelBox/SignInPopUp";
import LocalDB from "../../../DataBase/LocalDB";
import { withRouter } from "react-router";
import { getSelectedLocality } from "../../../../redux/action/LocalityAction";
import { addProducttoCart , getNotified } from "../../../Analytics/Analytics";
import Alert, { ALERT_TYPE_ERROR } from "../../../components/Common/Alert";

const AddToCart = (props) => {

    const validate = Validate();
    const cartAction = CartAction();
    const selectedLocality = getSelectedLocality();

    const [loader, setLoader] = useState(false);
    const [productQty, setProductQty] = useState(0);
    const [showGetNotifiedModal, setShowGetNotifiedModal] = useState(false)
    const [isPopUpOpen, setPopUpOpen] = useState(false);
    const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });

    const userInfo = useSelector(state=>state && state.userInfo ? state.userInfo.userInfo : null);
    const shoppingCartItem = useSelector(state => validate.isNotEmpty(state) && validate.isNotEmpty(state.cart) && validate.isNotEmpty(state.cart.shoppingCartItem) ? state.cart.shoppingCartItem : []);
    const filteredProduct = shoppingCartItem.filter(product => product.productId === props.productId);
    const reduxProductQty = validate.isNotEmpty(filteredProduct) ? Object.values(filteredProduct)[0]["quantity"] : 0;

    let catalogRestrictedQty = 99;
    if(validate.isNotEmpty(props.product) && validate.isNotEmpty(props.product.catalogRestrictedQty)){
        catalogRestrictedQty = props.product.catalogRestrictedQty;
    }

    useEffect(() => {
        setProductQty(reduxProductQty);
        if(props.setAddedToCart) {
            props.setAddedToCart(reduxProductQty > 0);
        }
    }, [reduxProductQty]);

    const handleClick = () => {
        getNotified(props.product.productName)
        setShowGetNotifiedModal(!showGetNotifiedModal);
        if(validate.isEmpty(userInfo)) {
            setPopUpOpen(true);
            LocalDB.setValue("fromPage", props.location.pathname);
            LocalDB.setValue("toPage", -1);
        }
    };

    const addOrModifyCart = (productId, requestedQuantity) => {
        setLoader(true);
        MartCatalogService().addOrModifyCart(productId, requestedQuantity, false).then((response) => {
            if(validate.isNotEmpty(response)){
                if(response.statusCode === "SUCCESS") {
                    cartAction.addOrModifyProductInCart(productId, props.product.productName, requestedQuantity);
                    validate.isNotEmpty(props.setAddedToCart) && props.setAddedToCart(requestedQuantity > 0);
                } else {
                    setAlertInfo({message: response.message, type: ALERT_TYPE_ERROR});
                }
            }
            setLoader(false);
        }).catch((error) => {
            setLoader(false);
            console.log(error);
        })
    }

    return (
        <React.Fragment>
            {alertInfo && alertInfo.message && <Alert alertInfo={alertInfo} onDurationEnd={setAlertInfo} duration='2000'/>}
            {validate.isNotEmpty(props.productId) &&
                <React.Fragment>
                    { productQty > 0 && props.isDropDownRequired &&
                        <ProductSearchDropDown
                        startIndex = {0}
                        isPacksRequired = {false}
                        dropDownClass = "btn-block"
                        restrictedQty = {catalogRestrictedQty} 
                        selectedQty = {productQty} 
                        roundedButton="custom-btn-lg font-16"
                        productId = {props.productId}
                        updateCartQty = {(productId, qty) => {
                            addOrModifyCart(productId, qty);
                        }}
                    />
                    }
                    { productQty > 0 && !props.isDropDownRequired &&
                        <button role="button" type="button" className="btn btn-block btn-brand-gradient cursor-not-allowed disabled rounded-pill custom-btn-lg">Added to Cart</button>
                    }
                    { productQty <= 0 && props.isAvailable &&
                        <button role="button" type="button" className={validate.isNotEmpty(props.classStyle) ? props.classStyle : "btn btn-block btn-brand custom-btn-lg shadow rounded-pill"} disabled={(!props.isAvailable) || loader} onClick={() => {addProducttoCart(props.product);addOrModifyCart(props.productId, 1)}}>
                            { loader &&
                                <React.Fragment>
                                    <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                                    <span className="sr-only"></span>
                                </React.Fragment> 
                            }
                            { !loader && (validate.isNotEmpty(props.displayableName) ? props.displayableName : "Add to Cart" )}
                        </button>
                    }
                    { productQty <= 0 && !props.isAvailable && validate.isNotEmpty(props.product) &&
                        <React.Fragment>
                            <button role="button" type="button" className={ (props.product.purchaseStatus === "A" && !props.isGetNotifiedNotRequired) ? `btn btn-block btn-lg btn-outline-warning rounded-pill ${props.isProductDetailsPage ? "custom-btn-xl" : "custom-btn-lg"}` : "btn btn-secondary btn-block disabled cursor-not-allowed rounded-pill custom-btn-lg"} disabled={( props.product.purchaseStatus != "A" || props.isGetNotifiedNotRequired )} onClick={handleClick}>
                                { !loader &&
                                    <React.Fragment>
                                        { (props.product.purchaseStatus === "A" && validate.isNotEmpty(selectedLocality.wareHouseId) && !props.isGetNotifiedNotRequired)  ? 
                                        (<React.Fragment>
                                           {props.isProductDetailsPage ? "" : <span className="mb-0 text-secondary mr-3 text-right">out of stock</span>}
                                            {`Get Notified`}
                                        </React.Fragment>) : "Out of Stock" }
                                    </React.Fragment>
                                }
                            </button>
                        </React.Fragment>
                    }
                </React.Fragment>
            }
            {validate.isNotEmpty(userInfo) && showGetNotifiedModal && <GetNotifiedPopup showGetNotifiedModal={showGetNotifiedModal} setShowGetNotifiedModal={setShowGetNotifiedModal} product={props.product} />}
            { isPopUpOpen && <SignInPopUp {...props} setPopUpOpen={setPopUpOpen} displayLogo={true}/> }
        </React.Fragment>
    )
}

export default withRouter(AddToCart);