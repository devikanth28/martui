import React from "react";
import ProductThumbNail from "../../components/Common/ProductThumbNail";
import { getProductUrl } from "../../helpers/CommonUtil";
import Validate from "../../helpers/Validate";

const GenericAlternatives=(props)=>{
    const {product} = props;
    if(Validate().isEmpty(product)){
        return <React.Fragment></React.Fragment>
    }

    const redirectToKymProductDetail=()=>{
        const productUrl = getProductUrl(product?.productName, product?.productId);
        props.history.push(`/kym/${productUrl}`);
    }

    return(
        <React.Fragment>
            <li className="list-separator">
                <div className='d-flex align-items-center justify-content-between pointer' onClick={redirectToKymProductDetail}>
                    <div className='d-flex w-auto'>
                        <div className='mr-2'>
                            <ProductThumbNail auditForm={product?.auditFormSubName} />
                        </div>
                        <div>
                            <h6 className='mb-1'>{product?.productName}</h6>
                            <p className='font-12 mb-0 text-secondary'>{product?.manufacturer}</p>
                        </div>
                    </div>
                    {product?.productCategoryMessage && <div className={`col-5 text-right p-0`}>
                        <label className={`font-14 mb-0 text-dark font-weight-bold ${product?.isMHS ? 'medplus-product-manufacturing' : 'bg-light'} rounded p-1`}>{product.productCategoryMessage}</label>
                    </div>}
                </div>
            </li>
        </React.Fragment>
    )
}
export default GenericAlternatives;