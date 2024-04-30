import React, {useState } from "react";
import ProductThumbNail from "../../../components/Common/ProductThumbNail";
import Validate from "../../../helpers/Validate";
import WishListIcon from "./WishListIcon";
import {getProductUrl} from '../../../helpers/CommonUtil';
import { Link } from "react-router-dom";

const SimilarProductCard = (props) => {
    const similarProduct = props.similarProduct;
    const validate = Validate();
    const [isAddedToWishlist,setIsAddedToWishlist]=useState(similarProduct.isWishListProduct ?? false);
    const preparePriceDetails=()=>{
        return (
            <React.Fragment>
            {validate.isValidPrice(similarProduct.mrpPrice) && validate.isValidPrice(similarProduct.discountedPrice) && 
            <React.Fragment>
                <h6 className="mb-0"><strong className="rupee">&#x20B9;</strong>{similarProduct.discountedPrice.toFixed(2)} </h6>
                <p className="mb-0 text-secondary font-14 ml-2">&#x20B9;<del>{similarProduct.mrpPrice.toFixed(2)}</del></p>
            </React.Fragment>
            }
            {validate.isValidPrice(similarProduct.mrpPrice) && !validate.isValidPrice(similarProduct.discountedPrice) && 
                <h6 className="mb-0"><strong className="rupee">&#x20B9;</strong>{similarProduct.mrpPrice.toFixed(2)}</h6>
            }
            </React.Fragment>

        );
    }

    return (
        <React.Fragment>
             <section className='p-2 other-product'>
                    <div className='row mx-0'>
                        <div className='col-2 text-center p-0'>
                            <Link to={`/${getProductUrl(similarProduct.productName,similarProduct.productId)}`} className='no-underline' title={similarProduct.productName} role="link">
                            <ProductThumbNail imageUrl={validate.isNotEmpty(similarProduct.imageUrl) ? similarProduct.imageUrl : ""} productId={similarProduct.productId} imagesCount={similarProduct.imageUploadCount} 
                            productName={similarProduct.productName} width="48" auditForm={"GEN"}
                            isGeneral={((true)) ? true : false}
                        />
                            </Link>
                        </div>
                        <div className='col-10 pr-0'>
                            <div className='d-flex justify-content-between'>
                                <div>
                                    <button className='btn btn-link p-0 text-left d-block font-14 mb-1 no-underline text-primary' onClick = {() => props.history.push("/" + getProductUrl(similarProduct.productName,similarProduct.productId))} role="button">{similarProduct.productName}</button>
                                    <div className="d-flex mb-1 price">
                                            {preparePriceDetails()}
                                    </div>
                                    {validate.isNotEmpty(similarProduct.discountStr) &&
                                    <p class="mb-0 font-14">{similarProduct.discountStr}</p>}
                                </div>
                                <div className="mt-n1 mr-n2">
                                    {validate.isNotEmpty(similarProduct.productId)  && validate.isNotEmpty(similarProduct.isGeneral) && <WishListIcon productId={similarProduct.productId} isAddedToWishlist={isAddedToWishlist}  wishlistType={similarProduct.isGeneral ? 'GENERAL' : 'PHARMACY'} wishListClass=" btn btn-link no-underline" setIsWishlisted={setIsAddedToWishlist} title={!isAddedToWishlist ? "Add to Frequently Ordered Products" : "Remove from Frequently Ordered Products"}/>}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
        </React.Fragment>
        
    )
}
export default SimilarProductCard;