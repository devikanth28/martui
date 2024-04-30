import React from 'react';
import { MenuItem } from 'react-bootstrap-typeahead';
import ProductThumbNail from './ProductThumbNail';
import RightBlackIcon from "../../images/common/rightchevron_black_icon_24px.svg"

function KYMSearchResult(props) {
    let isFuzzyResult = false;
    const eachProduct = props.eachProduct;
    const productSearchType = props.productSearchType;
    if (eachProduct.productId == "FUZZY_RESULT") {
        isFuzzyResult = true;
    }
    return (
        <>
            {!props.isAllFuzzyResult && isFuzzyResult && <h6 className="dropdown-header border-top">Did you mean?</h6>}
            { !isFuzzyResult &&
                <MenuItem className="no-gutters" option={eachProduct} onClick={() => props.handleKYMItemClick(eachProduct)}>
                <div className='d-flex align-items-center'>
                    <div className="product-img-container">
                        <ProductThumbNail showKymNpa={true} imageUrl={props.imagesUrls[eachProduct.productId]} productId={eachProduct.productId} imagesCount={eachProduct.imageUploadCount}
                            productName={eachProduct.productName}
                                isGeneral={(eachProduct.isGeneral == "Y" || eachProduct.auditFormSubName === "GEN") ? true : false} auditForm={productSearchType == "C" ? "COMPOSITION-ICON" : eachProduct.auditFormSubName}></ProductThumbNail>
                    </div>
                    <div className="container-fluid row align-items-center mx-0 w-100">
                        <div className="col text-wrap">
                            <p className={`product-name`}>
                                {productSearchType == "C" ? eachProduct.compositionName_s : eachProduct.productName}
                            </p>
                            {productSearchType != "C" && eachProduct.manufacturer && <small className='text-muted'>{eachProduct.manufacturer}</small>}
                        </div>
                        {props.isPageBody && <>
                            <div className="col-3 text-right">
                                <img src={RightBlackIcon} alt="right black icon" />
                            </div>
                        </>}
                    </div>
                </div>
            </MenuItem >}
        </>
        
    );
}

export default KYMSearchResult;