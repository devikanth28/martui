import React, {useState, useEffect} from 'react';
import CONFIG from '../../constants/ServerConfig';
import Validate from '../../helpers/Validate';
import {getProductUrl} from '../../helpers/CommonUtil';
import ProductThumbNail from '../Common/ProductThumbNail';
import ProductSearchDropDown from '../Common/ProductSearchDropDown';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
const ShoppingCartItem = (props) => {

    const validate = Validate();
    const shoppingCartItem = props.shoppingCartItem;
    const isPrescriptionRequired = shoppingCartItem.isPrescriptionRequired;
    let isQtyError = false;
    let availableProductQty = 0;
    const [showAppliedOffer,setShowAppliedOffer] = useState(false);
    if(validate.isNotEmpty(props.availableProductQty)) {
        isQtyError = true;
        availableProductQty = parseInt(props.availableProductQty);
    }

    let productDiscountPrice = 0;
    let productTotalDiscountForNewCheckOut = 0;
    if(!props.isNewCheckoutPromotionEnabled && validate.isNotEmpty(shoppingCartItem.discountPrice)) {
        productDiscountPrice = parseFloat(parseFloat(shoppingCartItem.discountPrice).toFixed(2));
    }
    if(props.isNewCheckoutPromotionEnabled && validate.isNotEmpty(shoppingCartItem.discountList)){
        shoppingCartItem.discountList.forEach((eachDiscount)=>{
            if(parseInt(eachDiscount.promotiontype)!=2 && validate.isNotEmpty(eachDiscount.discountPercent) && validate.isNotEmpty(eachDiscount.noOfPacks)){
                productTotalDiscountForNewCheckOut +=  eachDiscount.discountPrice*eachDiscount.noOfPacks;
            } else if(parseInt(eachDiscount.promotiontype)===2 && validate.isNotEmpty(eachDiscount.noOfPacks)){
                productTotalDiscountForNewCheckOut +=  shoppingCartItem.packMrp*eachDiscount.noOfPacks;
            }
        })
    }

    let restrictedQty = 99;
    if (validate.isNotEmpty(shoppingCartItem) && validate.isNotEmpty(shoppingCartItem.restrictedQuantity) && parseInt(shoppingCartItem.restrictedQuantity) > 0) {
        restrictedQty = parseInt(shoppingCartItem.restrictedQuantity);
    }

    const modifyShoppingCartProductQuantity = (productId, requestQty) => {
        if(shoppingCartItem.selectedQty !== requestQty) {
            props.modifyShoppingCartProductQuantity(productId, requestQty);
        }
    }

    useEffect(() => {
        if(validate.isNotEmpty(shoppingCartItem) && validate.isNotEmpty(shoppingCartItem.discountList)){
            setShowAppliedOffer(false);
            shoppingCartItem.discountList.forEach((eachDiscount)=>{
                if(parseInt(eachDiscount.promotiontype)!=2 && validate.isNotEmpty(eachDiscount.discountPercent) && eachDiscount.discountPercent>0){
                    setShowAppliedOffer(true);
                    return;
                }else if(parseInt(eachDiscount.promotiontype)===2 && parseFloat(eachDiscount.redemptionPointsPerUnit)>0){
                    setShowAppliedOffer(true);
                    return;
                }
            })
        }
    },[shoppingCartItem]);
    const Alternatepopover =(
        
            <Popover id="popover-basic" className="popoverBottom">
            {validate.isNotEmpty(shoppingCartItem.overFlowItems) &&
                <React.Fragment>
                    <Popover.Header as="h3">Delivery  Details</Popover.Header>
                    <Popover.Body>
                            {shoppingCartItem.overFlowItems.map((eachOverFlowItem) => {
                                return (
                                    <React.Fragment>
                                        <p className="mb-1 font-14">
                                            <strong>{eachOverFlowItem.quantity + (eachOverFlowItem.quantity > 1 ? " Packs - " : " Pack - ") + eachOverFlowItem.deliveryTime}</strong>
                                        </p>
                                    </React.Fragment>
                                    
                                )
                            })}
                    </Popover.Body>
                </React.Fragment>
            }
        </Popover>
    )
    return (
        <React.Fragment>
            {validate.isNotEmpty(shoppingCartItem) &&
            <li id={"item_"+ shoppingCartItem.productId} className={(isQtyError && availableProductQty == 0) ? "list-group-item out-of-stock flex-wrap" : "list-group-item flex-wrap"}>
                <div className="row w-100 no-gutters">
                {/* product container */}
                <div className="col">
                    <a href={CONFIG.REDIRECT_HOME_URL + getProductUrl(shoppingCartItem.productName, shoppingCartItem.productId)} title={shoppingCartItem.productName} className="product-link">
                                <ProductThumbNail imageUrl={validate.isNotEmpty(shoppingCartItem.imageUrl) ? shoppingCartItem.imageUrl : ""} productId={shoppingCartItem.productId} imagesCount={shoppingCartItem.imageUploadCount} 
                                    productName={shoppingCartItem.productName} width="48" auditForm={shoppingCartItem.auditForm}
                                    isGeneral={shoppingCartItem.auditForm === "GEN"}
                        />
                    </a>
                    <h6>
                        <a className="text-dark" href={CONFIG.REDIRECT_HOME_URL + getProductUrl(shoppingCartItem.productName, shoppingCartItem.productId)} title={shoppingCartItem.productName}>{shoppingCartItem.productName}</a>
                        <p className="text-secondary small">
                            {shoppingCartItem.packSize + " Unit(s) / pack"} <span className="mx-2">|</span>
                            MRP/Pack &nbsp;
                            <span className="rupee ml-1 mt-1">&#x20B9;</span>{parseFloat(shoppingCartItem.packMrp).toFixed(2)}
                        </p>
                    </h6>
                    {!props.isNewCheckoutPromotionEnabled && (props.appliedPromotionType == "DISCOUNT" || props.appliedPromotionType == "WALLET") && productDiscountPrice > 0 && (productDiscountPrice < parseFloat(parseFloat(shoppingCartItem.packMrp).toFixed(2))) &&
                        <p>
                            <small className="text-secondary">
                                Percentage Discount: &nbsp;
                                {((parseInt(shoppingCartItem.discountPercentage*100)%100 == 0)) ?parseFloat(shoppingCartItem.discountPercentage).toFixed(0):parseFloat(shoppingCartItem.discountPercentage).toFixed(2)} %
                            </small>
                        </p>
                    }
                    {!props.isNewCheckoutPromotionEnabled && props.appliedPromotionType == "POINT" &&
                        <p>
                            <small className="text-secondary">
                                Points: &nbsp;
                                {parseFloat(shoppingCartItem.redemptionPoints*shoppingCartItem.quantity).toFixed(2)} pts
                            </small>
                        </p>
                    }
                    {!props.isNewCheckoutPromotionEnabled &&
                    <p>
                        <small className="font-weight-bold">
                            Total Price &nbsp;
                            {productDiscountPrice > 0 && (productDiscountPrice < parseFloat(parseFloat(shoppingCartItem.packMrp).toFixed(2))) &&
                                <React.Fragment>
                                    <strong className="rupee">&#x20B9;</strong><del>{parseFloat(shoppingCartItem.packMrp*shoppingCartItem.packSizeQuantity).toFixed(2)}</del> &nbsp;
                                    <strong className="rupee">&#x20B9;</strong>{parseFloat(productDiscountPrice*shoppingCartItem.packSizeQuantity).toFixed(2)}
                                </React.Fragment>
                            }
                            {(productDiscountPrice <= 0 || (productDiscountPrice >= parseFloat(parseFloat(shoppingCartItem.packMrp).toFixed(2)))) &&
                                <React.Fragment>
                                    <strong className="rupee">&#x20B9;</strong>{parseFloat(shoppingCartItem.packMrp*shoppingCartItem.packSizeQuantity).toFixed(2)}
                                </React.Fragment>
                            }
                        </small>
                    </p>}
                    {props.isNewCheckoutPromotionEnabled && shoppingCartItem.discountList &&
                        <p>
                            <small className="font-weight-bold">
                                Total Price &nbsp;
                                {productTotalDiscountForNewCheckOut > 0 && (productTotalDiscountForNewCheckOut < shoppingCartItem.packMrp*shoppingCartItem.packSizeQuantity) &&
                                    <React.Fragment>
                                        <strong className="rupee">&#x20B9;</strong><del>{parseFloat(shoppingCartItem.packMrp*shoppingCartItem.packSizeQuantity).toFixed(2)}</del> &nbsp;
                                        <strong className="rupee">&#x20B9;</strong>{parseFloat(productTotalDiscountForNewCheckOut).toFixed(2)}
                                    </React.Fragment>
                                }
                                {(productTotalDiscountForNewCheckOut <= 0 || (productTotalDiscountForNewCheckOut >= shoppingCartItem.packMrp*shoppingCartItem.packSizeQuantity)) &&
                                    <React.Fragment>
                                        <strong className="rupee">&#x20B9;</strong>{parseFloat(shoppingCartItem.packMrp*shoppingCartItem.packSizeQuantity).toFixed(2)}
                                    </React.Fragment>
                                }
                            </small>
                        </p>
                    }

                    {isPrescriptionRequired &&
                        <p className="small text-warning pb-1">
                            <img className="mr-1" src="https://static1.medplusmart.com/medplusmart/assets/new_theme/web/images/org-relax-icon.png?v=125f83d5dad23541b3ca430730172852" alt="Prescription Records" height="12"/>&nbsp;
                            Prescription Required
                        </p>
                    }
                    <div className="form-group">
                        <ProductSearchDropDown startIndex={0} dropDownClass={(isQtyError && availableProductQty > 0) ? "mt-auto d-inline-block is-invalid" : "mt-auto d-inline-block"} 
                            restrictedQty= {restrictedQty} 
                            selectedQty={shoppingCartItem.packSizeQuantity} 
                            productId={shoppingCartItem.productId} updateCartQty={modifyShoppingCartProductQuantity} 
                        />
                        <small className="text-secondary ml-2">{shoppingCartItem.quantity > 1 ? shoppingCartItem.quantity +" Units": shoppingCartItem.quantity +" Unit"}</small>
                        {isQtyError && availableProductQty == 0 && <div className="invalid-feedback">Out Of Stock, Remove this product from your cart to preceed</div>}
                        {isQtyError && availableProductQty > 0 && <div className="invalid-feedback">{"Available Quantity is "+ availableProductQty}</div>}
                    </div>
                    {isQtyError && availableProductQty == 0 && 
                        <React.Fragment>
                            <span className="badge badge-pill outofstock mr-2">Out of stock</span>
                            <a className="btn btn-link btn-link-blue text-decoration-none text-capitalize" href={CONFIG.REDIRECT_HOME_URL + getProductUrl(shoppingCartItem.productName, shoppingCartItem.productId)} title="Check Alternatives">{(shoppingCartItem.productType == "GENERAL") ? "Check Similar/Other Products" : "Check Alternatives"}</a>
                        </React.Fragment>
                    }
                </div>
                <div className="col-4 text-right">
                    {!(isQtyError && availableProductQty == 0) &&
                        <React.Fragment>
                                    {validate.isNotEmpty(shoppingCartItem.overFlowItems) && shoppingCartItem.overFlowItems.length === 1 && <small><strong>{shoppingCartItem.overFlowItems[0].deliveryTime}</strong></small>}
                                         
                                    {validate.isNotEmpty(shoppingCartItem.overFlowItems) && shoppingCartItem.overFlowItems.length  > 1 && shoppingCartItem.overFlowItems.length < 3 && shoppingCartItem.overFlowItems.map(eachOverFlowItem => {
                                        return (eachOverFlowItem && <React.Fragment>
                                        <small>
                                           <strong>{  eachOverFlowItem.quantity + (eachOverFlowItem.quantity > 1 ? " Packs - " : " Pack - ") + eachOverFlowItem.deliveryTime}</strong> 
                                        </small><br/>
                                       </React.Fragment>)}
                                       )
                                    }
                                       
                            {validate.isNotEmpty(shoppingCartItem.overFlowItems) &&  shoppingCartItem.overFlowItems.length  >  2 &&
                               <React.Fragment>
                                    <div>
                                        <OverlayTrigger trigger="hover"  placement="bottom" overlay={Alternatepopover}>
                                            <a href="javascript:void(0);" className="popover-icon btn btn-sm mr-n2">
                                            <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="24.71" height="23.222" viewBox="0 0 36.71 23.222">
                                            <g transform="translate(0 0)">
                                                <path d="M2.57,103.906l.951-3.8a.575.575,0,0,1-.455-.562v-.613A2.417,2.417,0,0,1,5.48,96.515H9.81V95.25A1.189,1.189,0,0,1,11,94.062H33.07a1.189,1.189,0,0,1,1.188,1.188v10.423a.575.575,0,1,1-1.15,0V95.25a.038.038,0,0,0-.038-.038H11a.038.038,0,0,0-.038.038v10.423a.575.575,0,1,1-1.15,0v-.652H3.026a1.881,1.881,0,0,0-1.786,1.3H3.027a.575.575,0,0,1,.575.575v1.226a1.8,1.8,0,0,1-1.8,1.8H1.15v2.529h1.5a3.639,3.639,0,0,1,6.881,0H9.81v-4.33a.575.575,0,0,1,1.15,0v4.33H22.885a3.639,3.639,0,0,1,6.881,0h3.3a.038.038,0,0,0,.038-.038v-1.265H30.617a.575.575,0,0,1,0-1.15h5.518a.575.575,0,0,1,0,1.15H34.257v1.265a1.189,1.189,0,0,1-1.188,1.188h-3.1c0,.013,0,.025,0,.038a3.64,3.64,0,1,1-7.281,0c0-.013,0-.026,0-.038H9.732c0,.013,0,.025,0,.038a3.64,3.64,0,1,1-7.281,0c0-.013,0-.026,0-.038H.575A.575.575,0,0,1,0,113.03V106.9A3.032,3.032,0,0,1,2.57,103.906Zm7.24-6.242H5.48a1.266,1.266,0,0,0-1.265,1.265v.038H9.81Zm0,6.208v-3.755H4.7l-.939,3.755Zm16.516,12.262a2.491,2.491,0,1,0-2.491-2.491A2.494,2.494,0,0,0,26.325,116.134Zm-20.233,0A2.491,2.491,0,1,0,3.6,113.643,2.494,2.494,0,0,0,6.093,116.134Zm-4.943-7.357H1.8a.652.652,0,0,0,.651-.651v-.651H1.15v1.3Z" transform="translate(0 -94.062)"/>
                                            </g>
                                            <g transform="translate(25.137 18.394)">
                                                <g transform="translate(0)">
                                                    <path d="M129.455,350.6a1.188,1.188,0,1,1-1.188,1.188A1.189,1.189,0,0,1,129.455,350.6Z" transform="translate(-128.267 -350.597)"/>
                                                </g>
                                            </g>
                                            <g transform="translate(4.905 18.394)">
                                                <path d="M411.643,350.6a1.188,1.188,0,1,1-1.188,1.188A1.189,1.189,0,0,1,411.643,350.6Z" transform="translate(-410.455 -350.597)"/>
                                            </g>
                                            <g transform="translate(12.262 15.941)">
                                                <path d="M205.8,316.393h8.584a.575.575,0,0,1,0,1.15H205.8a.575.575,0,0,1,0-1.15Z" transform="translate(-205.227 -316.393)"/>
                                            </g>
                                            <g transform="translate(26.977 13.489)">
                                                <path d="M17.677,282.188h7.357a.575.575,0,1,1,0,1.15H17.677a.575.575,0,1,1,0-1.15Z" transform="translate(-17.102 -282.188)"/>
                                            </g>
                                            <g transform="translate(16.554 5.518)">
                                                <g transform="translate(0)">
                                                    <path d="M154.934,171.191a.575.575,0,0,0-.813,0L149.01,176.3l-2.659-2.659a.575.575,0,1,0-.813.813l3.065,3.066a.575.575,0,0,0,.813,0L154.934,172A.575.575,0,0,0,154.934,171.191Z" transform="translate(-145.37 -171.023)"/>
                                                </g>
                                            </g>
                                        </svg>
                                          Delivery details
                                            </a>
                                        </OverlayTrigger>
                                        </div>                                   
                                    </React.Fragment>  
                                
                            }
                        </React.Fragment>
                    }
                    <button className="action btn btn-outline-danger rounded-pill" type="button" onClick={() => modifyShoppingCartProductQuantity(shoppingCartItem.productId, 0)}>
                        <span className="spinner-border spinner-border-sm d-none align-text-top" role="status" aria-hidden="true"></span>
                        <span className="sr-only"></span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20">
                            <g id="Group_5352" data-name="Group 5352" transform="translate(-180.059 -283.942)">
                                <rect id="Rectangle_3094" data-name="Rectangle 3094" width="20" height="20" transform="translate(180.059 283.942)" fill="none"/>
                                <g id="Group_5352-2" data-name="Group 5352" transform="translate(182.357 285.718)">
                                    <path id="Path_3051" data-name="Path 3051" d="M197.765,288.24H194.01v-.159a2.012,2.012,0,0,0-2-2.02h-2.517a2.01,2.01,0,0,0-2,2.02v.159h-4.115a.568.568,0,1,0,0,1.136h1.417v10.868a2.378,2.378,0,0,0,2.36,2.384h7.2a2.376,2.376,0,0,0,2.358-2.383V289.376h1.059a.568.568,0,0,0,0-1.136Zm-8.276-1.044h2.52a.883.883,0,0,1,.878.885v.157h-4.268v-.157A.884.884,0,0,1,189.489,287.2Zm6.1,13.048a1.245,1.245,0,0,1-1.238,1.247h-7.2a1.244,1.244,0,0,1-1.238-1.247V289.376h9.671Z" transform="translate(-182.808 -286.061)"/>
                                    <path id="Path_3052" data-name="Path 3052" d="M192.249,301.464h.022a.6.6,0,0,0,.594-.571v-6.8a.592.592,0,1,0-1.185,0v6.753A.6.6,0,0,0,192.249,301.464Z" transform="translate(-184.33 -287.337)"/>
                                    <path id="Path_3053" data-name="Path 3053" d="M195.276,301.47h.022a.6.6,0,0,0,.594-.571l0-.051V294.1a.592.592,0,0,0-.592-.566h-.022a.6.6,0,0,0-.57.567v6.751A.6.6,0,0,0,195.276,301.47Z" transform="translate(-184.85 -287.343)"/>
                                    <path id="Path_3054" data-name="Path 3054" d="M189.223,301.464h.022a.6.6,0,0,0,.593-.571v-6.8a.592.592,0,1,0-1.184,0v6.753A.6.6,0,0,0,189.223,301.464Z" transform="translate(-183.811 -287.337)"/>
                                </g>
                            </g>
                        </svg>
                        Remove
                    </button>
                </div>
                {/* product container over */}
                </div>
                
                {props.isNewCheckoutPromotionEnabled && shoppingCartItem.discountList && showAppliedOffer &&
                <div class="row w-100 mt-3 no-gutters">
                    <div class="col">
                        <div class="offer-div">
                            <span class="text-nowrap">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" class="mr-2 align-bottom">
                                <g transform="translate(0.198 -0.206)">
                                    <rect fill="none" width="18" height="18" transform="translate(-0.198 0.206)"></rect>
                                    <path fill="#32b34b" d="M9,18a1.663,1.663,0,0,1-1.137-.444L6.719,16.493a.561.561,0,0,0-.383-.149.589.589,0,0,0-.08.005l-1.578.214a1.722,1.722,0,0,1-.234.015,1.612,1.612,0,0,1-1.606-1.3l-.274-1.506a.529.529,0,0,0-.286-.377L.871,12.682a1.533,1.533,0,0,1-.7-2.075l.7-1.373a.507.507,0,0,0,0-.466l-.7-1.373A1.505,1.505,0,0,1,.074,6.237a1.578,1.578,0,0,1,.8-.918L2.278,4.6a.53.53,0,0,0,.286-.377L2.839,2.72a1.612,1.612,0,0,1,1.6-1.3,1.747,1.747,0,0,1,.235.016l1.578.214a.594.594,0,0,0,.078.005.563.563,0,0,0,.384-.149L7.863.444a1.679,1.679,0,0,1,2.273,0l1.145,1.063a.564.564,0,0,0,.385.15.592.592,0,0,0,.078-.005l1.578-.214a1.744,1.744,0,0,1,.235-.016,1.613,1.613,0,0,1,1.6,1.3l.274,1.5a.53.53,0,0,0,.286.378l1.407.716a1.578,1.578,0,0,1,.8.918,1.505,1.505,0,0,1-.095,1.157l-.7,1.373a.507.507,0,0,0,0,.466l.7,1.373a1.533,1.533,0,0,1-.7,2.075l-1.407.716a.529.529,0,0,0-.286.377l-.274,1.506a1.613,1.613,0,0,1-1.606,1.3,1.75,1.75,0,0,1-.234-.016l-1.578-.214a.589.589,0,0,0-.08-.005.561.561,0,0,0-.383.149l-1.145,1.063A1.663,1.663,0,0,1,9,18Zm2.339-8.329A2.025,2.025,0,1,0,13.363,11.7,2.027,2.027,0,0,0,11.339,9.671Zm2.148-4.3a.406.406,0,0,0-.254.09l-8.5,6.881a.4.4,0,1,0,.509.629l8.5-6.88a.405.405,0,0,0-.256-.72Zm-6.6-.969A2.025,2.025,0,1,0,8.909,6.431,2.027,2.027,0,0,0,6.884,4.406Zm4.455,8.5A1.215,1.215,0,1,1,12.554,11.7,1.216,1.216,0,0,1,11.339,12.911ZM6.884,7.646A1.215,1.215,0,1,1,8.1,6.431,1.216,1.216,0,0,1,6.884,7.646Z" transform="translate(-0.198 0.206)"></path>
                                </g>
                                </svg>
                                {shoppingCartItem.discountList.length>1?
                                    <React.Fragment>Offers Applied:</React.Fragment>:<React.Fragment>Offer Applied:</React.Fragment>
                                }
                            </span>
                            {props.isNewCheckoutPromotionEnabled && shoppingCartItem.discountList.length>1 &&
                                <p class="ml-2 mb-0">
                                {shoppingCartItem.discountList.map((eachProductDiscount,index)=>{
                                    if(eachProductDiscount !== undefined && eachProductDiscount.discountPercent>0){
                                        return (
                                            <span>
                                            {((parseInt(eachProductDiscount.discountPercent*100)%100 == 0)) ?parseFloat(eachProductDiscount.discountPercent).toFixed(0):parseFloat(eachProductDiscount.discountPercent).toFixed(2)}
                                            % Off on {eachProductDiscount.noOfPacks} pack{eachProductDiscount.noOfPacks>1 && <React.Fragment>s</React.Fragment>}
                                            </span>
                                        )
                                    }else if(eachProductDiscount !== undefined && parseInt(eachProductDiscount.promotiontype)===2 && parseFloat(eachProductDiscount.redemptionPointsPerUnit)>0) {
                                        return(
                                            <span>
                                                {(parseInt(eachProductDiscount.redemptionPointsPerUnit*eachProductDiscount.quantity*100)%100 == 0) ?
                                                    parseFloat(eachProductDiscount.redemptionPointsPerUnit*eachProductDiscount.quantity).toFixed(0):
                                                    parseFloat(eachProductDiscount.redemptionPointsPerUnit*eachProductDiscount.quantity).toFixed(2)
                                                } Points awarded on {eachProductDiscount.noOfPacks} pack{eachProductDiscount.noOfPacks>1 && <React.Fragment>s</React.Fragment>}
                                            </span>
                                        )
                                    }
                                })}
                                </p>
                            }
                            {props.isNewCheckoutPromotionEnabled && shoppingCartItem.discountList.length==1 &&
                                <React.Fragment>
                                    {parseInt(shoppingCartItem.discountList[0].promotiontype)!=2 && shoppingCartItem.discountList[0].discountPercent && 
                                    <p class="ml-2 mb-0">
                                        {shoppingCartItem.discountList[0].quantity==shoppingCartItem.quantity &&
                                        <span className="no-listing">
                                        {((parseInt(shoppingCartItem.discountList[0].discountPercent*100)%100 == 0)) ?parseFloat(shoppingCartItem.discountList[0].discountPercent).toFixed(0):parseFloat(shoppingCartItem.discountList[0].discountPercent).toFixed(2)}
                                        % Off</span>
                                        }
                                        {shoppingCartItem.discountList[0].quantity!=shoppingCartItem.quantity &&
                                        <span className="no-listing">
                                        {((parseInt(shoppingCartItem.discountList[0].discountPercent*100)%100 == 0)) ?parseFloat(shoppingCartItem.discountList[0].discountPercent).toFixed(0):parseFloat(shoppingCartItem.discountList[0].discountPercent).toFixed(2)}
                                        % Off on {shoppingCartItem.discountList[0].noOfPacks} pack{shoppingCartItem.discountList[0].noOfPacks>1 && <React.Fragment>s</React.Fragment>}</span>
                                        }
                                    </p>}
                                    {parseInt(shoppingCartItem.discountList[0].promotiontype)===2 && parseFloat(shoppingCartItem.discountList[0].redemptionPointsPerUnit)>0 &&
                                        <p class="ml-2 mb-0">
                                            {shoppingCartItem.discountList[0].quantity==shoppingCartItem.quantity &&
                                            <span className="no-listing">
                                                {(parseInt(shoppingCartItem.discountList[0].redemptionPointsPerUnit*shoppingCartItem.discountList[0].quantity*100)%100 == 0) ?
                                                    parseFloat(shoppingCartItem.discountList[0].redemptionPointsPerUnit*shoppingCartItem.discountList[0].quantity).toFixed(0):
                                                    parseFloat(shoppingCartItem.discountList[0].redemptionPointsPerUnit*shoppingCartItem.discountList[0].quantity).toFixed(2)
                                                } Points awarded
                                            </span>}
                                            {shoppingCartItem.discountList[0].quantity!=shoppingCartItem.quantity &&
                                                <span className="no-listing">
                                                    {(parseInt(shoppingCartItem.discountList[0].redemptionPointsPerUnit*shoppingCartItem.discountList[0].quantity*100)%100 == 0) ?
                                                        parseFloat(shoppingCartItem.discountList[0].redemptionPointsPerUnit*shoppingCartItem.discountList[0].quantity).toFixed(0):
                                                        parseFloat(shoppingCartItem.discountList[0].redemptionPointsPerUnit*shoppingCartItem.discountList[0].quantity).toFixed(2)
                                                    } Points awarded on {eachProductDiscount.noOfPacks} pack{shoppingCartItem.discountList[0].noOfPacks>1 && <React.Fragment>s</React.Fragment>}
                                                </span>
                                            }
                                        </p>
                                    }
                                </React.Fragment>
                            }
                        </div>
                    </div>
                </div>}
            </li>}
        </React.Fragment>
    )
}

export default ShoppingCartItem;