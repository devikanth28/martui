
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import CartAction from '../../../redux/action/CartAction';
import ProductThumbNail from './ProductThumbNail';
import CheckoutService from '../../services/CheckoutService';
import ProductSearchDropDown from './ProductSearchDropDown';
import { MenuItem} from 'react-bootstrap-typeahead';
import Validate from '../../helpers/Validate';

const ProductSearchResult = (props)=>{

    const validate = Validate();
    const cartAction = CartAction();
    const eachProduct = props.eachProduct;
    const [isLoading, setLoading] = useState(false);

    const addOrModifyProductInCart = (productId, requestedQuantity, productName, event) => {
        setLoading(true);
        event.stopPropagation();
        CheckoutService().addOrModifyProductToCart(productId, requestedQuantity, false).then((response) => {
            if(validate.isNotEmpty(response)){
                if(response.statusCode === "SUCCESS") {
                    cartAction.addOrModifyProductInCart(productId, productName, requestedQuantity);
                } else if(response.statusCode === "FAILURE" && validate.isNotEmpty(response.message)) {
                    props.showAlertInfo(response.message);
                }
            }
            setLoading(false);
    }).catch((error) => {
        setLoading(false);
        console.log(error);
        });
    }

    let btnContent = "ADD TO CART";
    let productInfoUnavailable = false;
    let isFuzzyResult = false;
    let isProductReasonAvailable = false;

    if (validate.isNotEmpty(eachProduct.drugSchedule) && eachProduct.drugSchedule.includes("X")) {
        btnContent = "ALTERNATIVES";
    }

     if(!eachProduct.inStock) {
        if(eachProduct.isGeneral == "Y") {
            btnContent = "OUT OF STOCK";
        } else {
            btnContent = "ALTERNATIVES";
        }
    }
    if(validate.isNotEmpty(eachProduct.isSellable) && eachProduct.isSellable == "N") {
        if(eachProduct.isGeneral == "Y") {
            btnContent = "OUT OF STOCK";
        } else {
            productInfoUnavailable = true;
            btnContent = "ALTERNATIVES";
        }
    }
    if(validate.isNotEmpty(eachProduct.productReasons) && eachProduct.productReasons.length > 0) {
        if(!(validate.isNotEmpty(eachProduct.productReasons[0]) && "Only few items left. Please buy as soon as possible.".indexOf(eachProduct.productReasons[0]) > -1)) {
            btnContent = "ALTERNATIVES";
        }
        productInfoUnavailable = false;
        isProductReasonAvailable = true;
    }

    const addToCartClick = (eachProduct, e) => {
        e.stopPropagation();
        if(btnContent == "ADD TO CART" ) {
            addOrModifyProductInCart(eachProduct.productId, 1, eachProduct.productName, e);
        } else if(btnContent == "ALTERNATIVES") {
            props.goToProductDetail(eachProduct);
        }
    }
    
    const productClick = (eachProduct) => {
        props.goToProductDetail(eachProduct);
    }
    let shoppingCartProduct = {};
    if(props.shoppingCartProducts.includes(eachProduct.productId)) {
        shoppingCartProduct = props.shoppingCartItem.filter(prod => prod.productId == eachProduct.productId)[0];
        btnContent = "ADDED";
    }
    if(eachProduct.productId == "FUZZY_RESULT") {
        isFuzzyResult = true;
    }
    return(
        <React.Fragment key={props.index}>
            {!props.isAllFuzzyResult && props.eachSuggType == "PRODUCT_SUGGESTION" && isFuzzyResult && <h6 className="dropdown-header border-top">Did you mean?</h6>}
            {props.eachSuggType == "PRODUCT_SUGGESTION" && !isFuzzyResult && 
            <MenuItem className="no-gutters" option={eachProduct} onClick={() => productClick(eachProduct)}>
                <div className="product-img-container">
                    <ProductThumbNail imageUrl={props.imagesUrls[eachProduct.productId]} productId={eachProduct.productId} imagesCount={eachProduct.imageUploadCount} 
                        productName={eachProduct.productName}
                        isGeneral={(eachProduct.isGeneral== "Y" || eachProduct.auditFormSubName === "GEN") ? true : false} auditForm={eachProduct.auditFormSubName}></ProductThumbNail>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col">
                                <p className="product-name">
                                    {eachProduct.productName}
                                </p>
                            </div>
                            <div className="col-3 text-right">
                                {/* <span>{validate.isEmpty(props.discountValue)? "Loading..": props.discountValue}</span> */}
                                {!productInfoUnavailable 
                                    ? props.productDiscount === undefined ? <p className="mrp-text"><strong className="rupee">&#x20B9;</strong> {parseFloat(eachProduct.packSizeMrp).toFixed(2)} <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span></p> 
                                                                        : Object.keys(props.productDiscount).length > 0 && props.productDiscount[eachProduct.productId] !== undefined && props.productDiscount[eachProduct.productId] > 0 
                                                                                ?  <p className="mrp-text"><strong className="rupee">&#x20B9;</strong><strike>{parseFloat(eachProduct.packSizeMrp).toFixed(2)}</strike> {props.productDiscount[eachProduct.productId]}</p>
                                                                                :  <p className="mrp-text"><strong className="rupee">&#x20B9;</strong>{parseFloat(eachProduct.packSizeMrp).toFixed(2)}</p>
                                    : <React.Fragment></React.Fragment>}
                            </div>
                    </div>
                    <div className="row">
                        <div className="col-8 d-flex align-items-center">
                            {(!productInfoUnavailable && !isProductReasonAvailable ) && <small className="align vertical-inline-sub d-block text-secondary">{eachProduct.packSize} Units / Pack</small>}
                            {productInfoUnavailable && <small className="align vertical-inline-sub d-block text-secondary">Product Info Unavailable.</small>}
                            {isProductReasonAvailable && validate.isNotEmpty(eachProduct.productReasons[0]) && <small className="align vertical-inline-sub d-block text-secondary text-truncate" dangerouslySetInnerHTML={{ __html: eachProduct.productReasons[0] }} />}
                        </div>
                        <div className="col text-right pr-3">
                                {!isLoading && btnContent != "ADDED" && <a className={`btn btn-link btn-sm cart-btn ${btnContent == "OUT OF STOCK" ? "text-secondary disabled cursor-not-allowed" : ""} ${btnContent == "ALTERNATIVES" ? "text-primary " : ""}`} href="javascript:void();" onClick={(e) => addToCartClick(eachProduct, e)} disabled={ isLoading || "ADDED" == btnContent} title={btnContent}>{btnContent}</a>}
                            {!isLoading && btnContent == "ADDED" &&
                            <React.Fragment>
                                <ProductSearchDropDown startIndex={0} 
                                restrictedQty= {eachProduct.catalogRestrictedQty} 
                                selectedQty={shoppingCartProduct.quantity} 
                                productId={eachProduct.productId}
                                updateCartQty={(productId, qty, e) => {
                                    addOrModifyProductInCart(productId, qty, eachProduct.productName, e);
                                }}
                                />
                                {/* <span>{shoppingCartProduct.requestedQuantity*eachProduct.packSize} Units</span> */}
                            </React.Fragment>
                            }
                            {isLoading &&
                            <a className="btn btn-link cart-btn btn-sm search-btn-loader" href="javascript:void();"  title={"Adding..."}>
                                <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                                <span className="sr-only"></span>
                            </a>
                            }
                        </div>
                    </div>
                </div>
            </MenuItem>}
            {props.eachSuggType == "COMPOSITION_SUGGESTION" && <MenuItem key={eachProduct.compositionId_s} option={eachProduct} onClick={() => props.selectComposition(eachProduct.compositionName_s, eachProduct.compositionId_s)}>
                <p>{eachProduct.compositionName_s}</p>
            </MenuItem>}
        </React.Fragment>
    )
}
export default ProductSearchResult;
