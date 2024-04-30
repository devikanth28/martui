import React from "react";
import ProductDetailImage from "../../MedplusMart/components/MartCatalog/ProductDetail/ProductDetailImage";
import Validate from "../../helpers/Validate";

const KymProductDetailsCard = (props) => {
    const {productInfo,productImageUrls} = props;
    const isGenericMedicine = productInfo?.attribute?.kymProductType=='GENERIC'
    const redirectToProductDetailPage = () => {
        props?.history?.push(`/product/${props.productNameId}`);
    }

    return (
        <React.Fragment>
            <div className={`product-details-card ${isGenericMedicine ? "generic-medicine" : "branded-medicine"}`}>
                {Validate().isNotEmpty(productInfo?.attribute?.kymCategoryName) && <div>
                    <span className="custom-badge-medicine my-3">{productInfo?.attribute?.kymCategoryName} <sup>*</sup></span>
                </div>}
                <div className="p-3 Product-Section">
                    <div className="Product-Detail">
                        <ProductDetailImage product={productInfo} productImageUrls={productImageUrls} />
                        <div className="col p-0">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                {productInfo.productName && <h4 className="col-7 p-0 mb-0">{productInfo.productName}</h4>}
                                {productInfo?.attribute?.productCategoryMessage && <div>
                                    <span class="badge bg-green-100 text-dark p-2 font-16">{productInfo.attribute.productCategoryMessage} <sup>*</sup></span>
                                </div>}
                            </div>
                            <div className="col-7 p-0 mb-3">
                                <span className="text-secondary font-12">Mfg / Mkt</span>
                                {productInfo.manufacturer && <h6 className="mb-0">{productInfo.manufacturer}</h6>}
                            </div>
                            <div className="col-7 p-0 mb-3">
                                <span className="text-secondary font-12">Composition</span>
                                {productInfo.compositionName && <h6 className="mb-0">{productInfo.compositionName}</h6>}
                            </div>
                            <div className="d-flex justify-content-between">
                                {productInfo?.attribute?.auditForm && <div className="mb-3">
                                    <span className="text-secondary font-12">Audit Form</span>
                                    <h6 className="mb-0 text-capitalize">{productInfo.attribute.auditForm.toLowerCase()}</h6>
                                </div> }
                                <div>
                                    <button type="button" className="btn btn-dark btn-sm py-2 px-4" onClick={redirectToProductDetailPage}>
                                        <span className="mr-2">Know More</span>
                                        <svg className="align-middle" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                            <g id="leftchevron_black_icon_18px" transform="translate(0 16) rotate(-90)">
                                                <rect id="Rectangle_4722" data-name="Rectangle 4722" width="16" height="16" fill="none" />
                                                <path id="Path_23401" data-name="Path 23401" d="M3.938,5.132.243,1.437A.837.837,0,0,1,1.427.253l3.1,3.093,3.1-3.1A.84.84,0,0,1,9.065.835a.832.832,0,0,1-.248.592l-3.7,3.7A.84.84,0,0,1,3.938,5.132Z" transform="translate(3.627 5.503)" fill="#f8f9fa" />
                                            </g>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <p className="custom-star font-10 text-muted mb-0 mt-4">Product classification & discount slabs are for information only. May vary from the market definitions.</p>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default KymProductDetailsCard;