import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getSelectedLocality } from "../../../../../redux/action/LocalityAction";
import { shareProduct } from "../../../../Analytics/Analytics";
import ChangeLocality from "../../../../components/Locality/ChangeLocality";
import { getCompositionNameForUrl, getProductUrl, isDrugSchduleX } from "../../../../helpers/CommonUtil";
import Validate from "../../../../helpers/Validate";
import AddToCart from "../../Common/AddToCart";
import WishListIcon from "../../Common/WishListIcon";
import MemberShipProductDiscountInfo from "./MemberShipProductDiscountInfo";
import ProductDiscountInfo from "./ProductDiscountInfo";
import SocialProfiles from "./SocialProfiles";

const ProductInfo = (props) => {

    const validate = Validate();
    const selectedLocality = getSelectedLocality();

    const isDrugScheduleX = isDrugSchduleX(props.product);

    const [isLocalityModalOpen, setLocalityModalOpen] = useState(false);
    const [showSocialIcons , setShowSocialIcons] = useState(false)

    const localityModalToggle = () => setLocalityModalOpen(!isLocalityModalOpen);

    const GetCurrentMaxDiscount = () => {
        let offerAmount = 0;
        let offerAmountRounded = 0;
        if(validate.isNotEmpty(props.productPromotion) && validate.isNotEmpty(props.productPromotion.slabs)){
            let currentMaxDiscount = 0;
            Object.keys(props.productPromotion.slabs).map((key) => {
                if(props.productPromotion.slabs[key].fromValue > 0 && currentMaxDiscount < props.productPromotion.slabs[key].discountPercentage){
                    offerAmount = props.productPromotion.slabs[key].fromValue;
                    offerAmountRounded =  offerAmount.toString().includes('.') ? offerAmount.toFixed(2) : offerAmount;
                    currentMaxDiscount = props.productPromotion.slabs[key].discountPercentage;
                }
            })
            return offerAmountRounded > 0 ? <small className="d-block">On bills above <span className="rupee">₹</span>{offerAmountRounded} </small> : <React.Fragment></React.Fragment>;
        }
        return <React.Fragment></React.Fragment>;
    }

    let discountType = "slab";
    if(props?.productPromotion?.specialPromotionRanges){
        props.productPromotion.specialPromotionRanges.map((eachSpecialPromotionRange) => {
            if(eachSpecialPromotionRange && !(eachSpecialPromotionRange.fromQuantity >1)) {
                discountType = "specialPromotion";
            }
        });
    }

    return (
        <React.Fragment>
            {showSocialIcons && <SocialProfiles isOpen={showSocialIcons} setIsOpen={setShowSocialIcons}/>}
            {validate.isNotEmpty(props.product) && <div className="product-detail-instructions row no-gutters">
                <div className="product-detail-description col-7">
                    { props.isPrescriptionRequired && <div className="py-1 mb-1 font-14">
                        <span className="align-text-top badge badge-pill mr-1 prescription">Rx</span>Prescription Required
                    </div> }
                    <div className="p-0 mb-3">
                        { props.product.isGeneral === 'N' &&  validate.isNotEmpty(props.product.manufacturer) &&
                            <Link  className="small composition-title composition-underline" to={`/manufacturer/${props.product.manufacturer}`} title={"More Products From " + props.product.manufacturer}>Mfg/Mkt: {props.product.manufacturer}</Link>
                        }
                        { props.product.isGeneral === 'Y' &&  validate.isNotEmpty(props.product.brand) && 
                            <Link className="small composition-title composition-underline" to={`/brand/${props.product.brand}`} title={"More Products From " + props.product.brand}>{props.product.brand}</Link>
                        }
                        <h4 className="text-uppercase mt-0 composition-country">{props.product.productName}</h4>
                    </div>
                    { props.product.isGeneral === 'N' && <div className='mb-3'>
                        { validate.isNotEmpty(props.product.compositionName) && props.product.compositionName !== "Not Available" &&
                        <React.Fragment>
                            <p className="composition-title small mb-0">Composition</p>
                            <div className="font-14 mb-3 composition-underline">
                                    <Link to={getCompositionNameForUrl(props.product.compositionId, props.product.compositionName)} className="composition-country font-weight-bold" title="Click to view relevant composition's products" >{props.product.compositionName}</Link>
                            </div>
                        </React.Fragment> }
                        { validate.isNotEmpty(props.categoryInfo) && <React.Fragment>
                            <p className="composition-title small mb-0">Therapeutic Class</p>
                            <div className="composition-underline font-14">
                            {Object.entries(props.categoryInfo).map(([, value], index) => {
                                return(
                                    <Link to={value.therapeuticClassRedirectUrl} title={value.name} className="composition-country font-weight-bold">{`${value.name}${index !== Object.entries(props.categoryInfo).length - 1 ? ', ' : ""}`}</Link>
                                );
                            })}
                            </div>
                        </React.Fragment> }
                    </div> }
                    { validate.isNotEmpty(props.product.countryOfOrigin) && <p className="composition-country font-14 font-weight-bold mb-0">Country of origin: {props.product.countryOfOrigin}</p> }
                    { (validate.isNotEmpty(props.product.manufacturerAddress) || validate.isNotEmpty(props.product.packerAddress) || validate.isNotEmpty(props.product.importerAddress) || validate.isNotEmpty(props.product.marketerAddress)) && <p className="font-weight-bold mb-0 mt-1">
                        <button className="btn btn-link font-14 composition-country text-decoration-none ml-n3" onClick={props.ScrollToSellerInfo}>Seller Information
                            <svg className="ml-1" xmlns="http://www.w3.org/2000/svg" width="16" height="8" viewBox="0 0 16 8">
                                <path fill="#2699fb" d="M4.52,14.5A2.482,2.482,0,0,1,7,12.02h3.2V10.5H7a4,4,0,1,0,0,8h3.2V16.98H7A2.482,2.482,0,0,1,4.52,14.5Zm3.28.8h6.4V13.7H7.8ZM15,10.5H11.8v1.52H15a2.48,2.48,0,0,1,0,4.96H11.8V18.5H15a4,4,0,0,0,0-8Z" transform="translate(-3 -10.5)"></path>
                            </svg>
                        </button>
                    </p> }
                    { props.product.isGeneral === 'Y' && validate.isNotEmpty(props.variationProductsInfo) && props.variationProductsInfo.length > 1 && <div>
                        <div className="font-14 mt-3 strong composition-title">
                            Other Variants
                        </div>
                        <div className="prod-variant">
                            <ul className="list-inline">
                                {
                                    props.variationProductsInfo.map((variant) => {
                                        return (
                                            <li>
                                                <button className={`btn btn-link rounded-pill ${props.product.variantName === variant.variantName ? 'active' : variant.isInStock ? '' : 'disabled'}`} onClick={() => {if(props.product.variantName != variant.variantName) props.history.push("/" + getProductUrl(variant.productName, variant.productId))}} title={variant.variantName}>{variant.variantName}</button>
                                            </li>
                                        );
                                    })
                                }
                            </ul>
                        </div>
                    </div> }
                </div>

                { validate.isEmpty(props.isDiscontinued) &&
                    <div className="product-detail-checkout col-5 p-0">
                        <span className="btn-group btn-group-toggle filter-by-container">
                            <button className="btn btn-badge mx-0 py-2" onClick={()=>{setShowSocialIcons(!showSocialIcons);shareProduct(props.product.productName)}}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <defs>
                                        <clipPath id="clip-path">
                                            <rect id="Rectangle_9924" data-name="Rectangle 9924" width="24" height="24" transform="translate(1734 1071)" fill="#e6e6e6" />
                                        </clipPath>
                                    </defs>
                                    <g id="share-icn" transform="translate(-1734 -1071)" clip-path="url(#clip-path)">
                                        <path id="share-icn-2" data-name="share-icn" d="M21,11.813a2.794,2.794,0,0,1-2.082-.937l-7.508,4.047c.008.089.027.174.027.265s-.018.164-.025.246l7.518,4.051a2.8,2.8,0,1,1-.742,1.89c0-.038.009-.073.011-.111l-7.584-4.088a2.814,2.814,0,1,1-.015-3.989l7.6-4.095c0-.031-.009-.061-.009-.092A2.813,2.813,0,1,1,21,11.813Z" transform="translate(1731.19 1067.812)" fill="#6c757d" fill-rule="evenodd" />
                                    </g>
                                </svg>
                            </button>
                            <WishListIcon isAddedToWishlist={props.isWishlisted} wishListClass={`align-items-center btn btn-badge d-flex mx-0 pl-2 py-2 ${props.isWishlisted ? 'active' : ''}`} productId={props.product.productId} wishlistType={props.product.isGeneral === 'Y' ? 'GENERAL' : 'PHARMACY'} setIsWishlisted={props.setIsWishlisted} title={!props.isWishlisted ? "Add to Frequently Ordered Products" : "Remove from Frequently Ordered Products"}/>
                        </span>
                        { 
                        props.memberShipPrice ? <MemberShipProductDiscountInfo discountedPrice={props.discountedPrice} productPromotion={props.productPromotion} isDiscontinued={props.isDiscontinued} product={props.product} discountPercent={props.discountPercent} discountString={props.discountString} memberShipPrice={props.memberShipPrice} pharmaSubscribed={props.pharmaSubscribed} hubStatus={props.hubStatus} isFridgeItemAllowed={props.isFridgeItemAllowed} replacementProduct={props.replacementProduct} availQty={props.availQty} membershipPricePerUnit={props.membershipPricePerUnit} bestPharmaPlanInfo={props.bestPharmaPlanInfo} history={props.history}/>:
                        <ProductDiscountInfo discountedPrice={props.discountedPrice} productPromotion={props.productPromotion} isDiscontinued={props.isDiscontinued} product={props.product} discountPercent={props.discountPercent} discountString={props.discountString} pharmaSubscribed={props.pharmaSubscribed} hubStatus={props.hubStatus} isFridgeItemAllowed={props.isFridgeItemAllowed} replacementProduct={props.replacementProduct} availQty={props.availQty}/>
                        }
                    </div>
                }
                { validate.isNotEmpty(props?.replacementProduct?.name) && <React.Fragment>
                        <div className='d-flex mb-2 mt-3'>
                            <svg id="note_black_icon_18px" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                                <path id="Icon_awesome-info-circle" data-name="Icon awesome-info-circle" d="M9.563.563a9,9,0,1,0,9,9A9,9,0,0,0,9.563.563Zm0,3.992A1.524,1.524,0,1,1,8.038,6.079,1.524,1.524,0,0,1,9.563,4.554Zm2.032,9.218a.436.436,0,0,1-.435.435H7.966a.436.436,0,0,1-.435-.435V12.9a.436.436,0,0,1,.435-.435H8.4V10.143H7.966a.436.436,0,0,1-.435-.435V8.837A.436.436,0,0,1,7.966,8.4h2.323a.436.436,0,0,1,.435.435v3.629h.435a.436.436,0,0,1,.435.435Z" transform="translate(-0.563 -0.563)" fill="#dc3545"/>
                            </svg>
                            <h6 className='text-danger ml-2 font-14'>This product by the manufacturer has been replaced with</h6>
                        </div>
                        <div class="align-items-center col-12 d-flex p-3 justify-content-between rounded" style={{"border":"1px solid"}}>
                            <span class="mb-0">{props.replacementProduct.name}</span>
                            <button type="button" class="brand-secondary  border border-danger btn px-5 rounded-pill custom-btn-lg" onClick={() => props.history.push("/" + getProductUrl(props.replacementProduct.name, props.replacementProduct.id))}>View Product</button>
                        </div>
                    </React.Fragment>
                }
            </div> }
            {validate.isNotEmpty(selectedLocality) && <ChangeLocality modal={isLocalityModalOpen} toggle={localityModalToggle} selectedLocality={selectedLocality}/>}
        </React.Fragment>
    );
}
export default ProductInfo