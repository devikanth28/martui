import React, { useState } from "react";
import ProductThumbNail from "../../../components/Common/ProductThumbNail";
import Validate from "../../../helpers/Validate";
import WishListIcon from "./WishListIcon";
import ProductName from "./ProductName";
import ProductPrice from "./ProductPrice";
import AddToCart from "./AddToCart";
import { getCompositionProductUrl, getProductRedirectUrl } from "../../../helpers/CommonUtil";
import { Link } from "react-router-dom";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import FadeInSection from "../MartCatalog/ProductCategory/CategoryDetail/Fadein";
import { KymProductType } from "../../../components/Common/Constants/MartConstants";

const ProductSummaryCard = (props) => {

    const product = props.product;
    const validate = Validate();


    const [isAddedToCart, setAddedToCart] = useState(false);
    const [isAddedToWishlist, setIsAddedToWishlist] = useState(product.isWishListProduct ?? false);


    const manufacturerdetail = (
        <Popover id="popover-basic">
        {
            <React.Fragment>
                <Popover.Header as="h6">Other Information</Popover.Header>
                <Popover.Body>
                   <ul className="list-unstyled mb-0">
                   {((validate.isNotEmpty(product?.attribute?.packSize) && product?.attribute?.packSize > 0) || (validate.isNotEmpty(product?.packSize) && product?.packSize > 0)) && <li className="row no-gutters"> 
                        <span className="text-secondary font-12 col-4 text-right">Pack Size: </span>
                        <span className="font-weight-bold ml-2 col font-12">{product.attribute.packSize ?? product.packSize}</span>
                    </li>}
                    {validate.isNotEmpty(product.compositionName) && <li className="row no-gutters">
                        <span className="text-secondary font-12 col-4 text-right">Comp: </span>
                        <span className="font-weight-bold ml-2 col font-12">{product.compositionName}</span>
                    </li>}
                   </ul>
                </Popover.Body>
            </React.Fragment>
        }
    </Popover>
    )

    return (
        <React.Fragment>
            {validate.isNotEmpty(product) &&
                <div className={props.width ? "item h-100" : "item h-100"}>
                    <div className={`card mx-2 mb-2 product-card position-relative ${(props.isKym && product?.attribute?.isMHS) ? 'gradient-Cotton-Candy' : ''}`} style={props.isKym ? { 'min-height': '22.375rem' } : { 'min-height': '20rem' }}>
                        <div className="card-body p-0">
                            {validate.isNotEmpty(product.productId) && !props.showinformation && product.isGeneral && !props.isKym &&
                                <span onClick={(e) => e.stopPropagation()}>
                                     <WishListIcon productId={product.productId} wishlistType={product.isGeneral ? "GENERAL" : "PHARMACY"} isAddedToWishlist={isAddedToWishlist} wishListClass="wishlist-icon btn-link no-underline" setIsWishlisted={setIsAddedToWishlist} title={!isAddedToWishlist ? "Add to Frequently Ordered Products" : "Remove from Frequently Ordered Products"}/>
                                </span>
                            }
                            {validate.isNotEmpty(product.productId) && props.showinformation && !product.isGeneral &&
                                <span className="wishlist-icon btn btn-link no-underline" onClick={(e) => e.stopPropagation()}>
                                    <OverlayTrigger trigger="hover" placement={props.cardIndex} overlay={manufacturerdetail}>
                                            <div className="popover-icon">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 17 17"><g id="note_black_icon_18px" transform="translate(0.5 0.5)"><path id="Icon_awesome-info-circle" data-name="Icon awesome-info-circle" d="M8.563.563a8,8,0,1,0,8,8A8,8,0,0,0,8.563.563Zm0,3.548A1.355,1.355,0,1,1,7.208,5.466,1.355,1.355,0,0,1,8.563,4.111ZM10.369,12.3a.387.387,0,0,1-.387.387H7.143a.387.387,0,0,1-.387-.387V11.53a.387.387,0,0,1,.387-.387H7.53V9.079H7.143a.387.387,0,0,1-.387-.387V7.917a.387.387,0,0,1,.387-.387H9.208a.387.387,0,0,1,.387.387v3.226h.387a.387.387,0,0,1,.387.387Z" transform="translate(-0.563 -0.563)" fill="none" stroke="#6c757d" stroke-width="1"></path></g></svg></div>
                                    </OverlayTrigger>
                                </span>
                            }
                           <Link className="text-decoration-none" to = {props.isKym ? getCompositionProductUrl(product.compositionName, props.compositionId, product.productName, product.productId) : getProductRedirectUrl(product.productId, product.productName, props.topCategoryNameId, props.parentCategoryNameId, props.currentCategoryNameId)} role="link">
                                <div className="px-2 pointer">
                                    <div className={isAddedToCart ? "text-center mb-2 eachCard position-relative" : "text-center mb-2"}>
                                        <FadeInSection>
                                            <ProductThumbNail imagesCount={product.imageUploadCount} showNpaWithText={true} imageUrl={product.imageUrl} productId={product.productId} productName={product.productName} className={`d-inline-block ${(props.isKym && product?.attribute?.isMHS)? "blend-mode-multiply":''}`} isGeneral={product.isGeneral} auditForm={product.auditFormSubName} svgHeight={props.height} svgWidth={props.width} />
                                        </FadeInSection>
                                    </div>
                                    {validate.isNotEmpty(product?.attribute?.kymCategoryName) && props.isKym && <div className=''>
                                        <span className={`p-2 mb-2 mt-2 badge font-12 generic-medicine-pill-color badge-pill font-weight-bolder ${product?.attribute?.kymProductType == KymProductType.GENERIC ? "generic-medicine-pill-color" : "branded-medicine-pill-color"}`}>{product?.attribute?.kymCategoryName}</span>
                                    </div>}
                                    {validate.isNotEmpty(product.manufacturer) && <div>
                                        <p className='font-12 text-secondary mb-1 text-truncate'>{product.manufacturer}</p>
                                    </div>}
                                    <div className="d-flex flex-column justify-content-between">
                                    {validate.isNotEmpty(product.productName) &&
                                        <ProductName productName={product.productName} productClass="truncate-line-2" productStyle={{ minHeight: '2.375rem' }} />}
                                        {validate.isValidPrice(product.mrpPrice) && (product.mrpPrice || product.discountedPrice) &&
                                            <ProductPrice productPriceClass=" " discountedPrice={product.discountedPrice} offerPriceClass="mb-0" mrpPrice={product.mrpPrice} mrpClass="mb-0 text-secondary font-14 ml-2" discountMessage={product.discountStr} discountMessageClass="mb-2 font-12 ml-0 text-dark" />
                                            }
                                    </div>
                                </div>
                            </Link>
                        </div>
                        {validate.isNotEmpty(product.productId) && !props.isKym &&
                                    <div className="card-footer bg-white p-2 border-0" onClick={(e) => e.stopPropagation()}>
                                        <AddToCart productId={product.productId} product = {product} isAvailable={product.isInStock} classStyle="btn btn-block btn-brand-gradient rounded-pill custom-btn-lg" isDropDownRequired = {props.isDropDownRequired} setAddedToCart={setAddedToCart} />
                        </div>}
                        {props.isKym &&
                            <Link className="text-decoration-none" to={getCompositionProductUrl(product.compositionName, props.compositionId, product.productName, product.productId)} role="link">
                                <div className='card-footer bg-transparent p-2 border-0'>
                                    <button className='btn custom-btn-lg btn-block btn-dark rounded-pill'>Know more</button>
                                </div>
                            </Link>
                        }
                    </div>
                </div>}
        </React.Fragment>
    )
}

export default ProductSummaryCard;
