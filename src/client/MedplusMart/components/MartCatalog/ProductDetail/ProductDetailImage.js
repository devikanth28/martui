import React, { useState } from "react";
import ReactImageMagnify from "react-image-magnify";
import { IconSvgLodable } from "../../../../components/Common/IconSvg";
import Image from "../../../../components/Common/Image";
import Validate from "../../../../helpers/Validate";

const ProductDetailImage = (props) => {

    const validate = Validate();

    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [isNpaRequired, setIsNpaRequired] = useState(false);

    const productImageUrls = validate.isNotEmpty(props.productImageUrls) ? props.productImageUrls : [];

    if(validate.isEmpty(props.product.imageUploadCount) && props.product.imageUploadCount != "0") {
        return (
            <React.Fragment>
                 <div className='product-detail-container border-all mr-3 h-100 rounded'>
                    <div className='product-image-container-large'>
                        <div style={{"z-index":"50"}}>
                            {(props.product.isGeneral === "Y" || (props.product.isGeneral === "N" && validate.isEmpty(props.product.auditFormSubName))) ? <img src={require('../../../../images/npa-with-text.svg')} type="image/svg+xml" alt={props.product.productName} style={{"width" : productImageUrls.length > 1 ? "175px" : "250px"}} /> : <IconSvgLodable type={props.product.auditFormSubName} widthStr={productImageUrls.length > 1 ? 175 : 250} heightStr={productImageUrls.length > 1 ? 200 : 300} />}
                        </div>
                    </div>
                 </div>
            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            {validate.isNotEmpty(props.product) && productImageUrls.length > 0 && <div className='product-detail-container border-all mr-3 h-100 rounded'>
                { productImageUrls.length > 1  && <div className='product-image-container-small border-right'>
                 {productImageUrls.map((eachProductImageUrl, index) => {
                    return(
                        <button className={`btn p-0 m-1 ${index === selectedImageIndex ? "active" : ""}`} title={props.product.productName} onClick={() => {setSelectedImageIndex(index); setIsNpaRequired(false);}}>
                            <Image title={props.product.productName} src={eachProductImageUrl} />
                        </button>
                    );
                })}
                </div> }
                <div className='product-image-container-large'>
                    <div style={{"z-index":"50"}}>
                        { isNpaRequired && ((props.product.isGeneral === "Y" || (props.product.isGeneral === "N" && validate.isEmpty(props.product.auditFormSubName))) ? <img src={require('../../../../images/npa-with-text.svg')} type="image/svg+xml" alt={props.product.productName} style={{"width" : productImageUrls.length >1 ? "175px" : "250px"}} /> : <IconSvgLodable type={props.product.auditFormSubName} widthStr={productImageUrls.length > 1 ? 175 : 250} heightStr={productImageUrls.length > 1 ? 200 : 300} />)}
                        { !isNpaRequired && <ReactImageMagnify {...{
                            smallImage: {
                                alt: props.product.productName,
                                isFluidWidth: true,
                                src: productImageUrls[selectedImageIndex],
                                onError: () => setIsNpaRequired(true)
                            },
                            largeImage: {
                                src: productImageUrls[selectedImageIndex],
                                width: 500,
                                height: 600,
                            },
                            enlargedImageContainerDimensions: {
                                width: productImageUrls.length === 1 ? '150%' : '200%',
                                height: productImageUrls.length === 1 ? '125%' : '150%'
                            },
                            shouldUsePositiveSpaceLens: true,
                        }} />}
                    </div>
                </div>
            </div>}
        </React.Fragment>
    )
}

export default ProductDetailImage;