import React, { useState } from "react";
import { isDrugSchduleX } from "../../../../helpers/CommonUtil";
import Validate from "../../../../helpers/Validate";
import ProductAvailableStoresModal from "./ProductAvailableStoresModal";

const ProductDeliveryInfo = (props) => {

    const validate = Validate();

    const isDrugScheduleX = isDrugSchduleX(props.product);

    const [showProductAvailableStoresModal, setShowProductAvailableStoresModal] = useState(false);

    const toggleProductAvailableStoresModal=()=>{
        setShowProductAvailableStoresModal(!showProductAvailableStoresModal);
    }

    const infoSvg = (
        <div>
            <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                <path d="M9.571,6.678a.752.752,0,0,1,.75-.75h.5a.752.752,0,0,1,.75.75v.5a.752.752,0,0,1-.75.75h-.5a.752.752,0,0,1-.75-.75Zm3,7.25h-4v-1h1v-3h-1v-1h3v4h1Zm-2-12a8,8,0,1,0,8,8,8,8,0,0,0-8-8Zm0,14.5a6.5,6.5,0,1,1,6.5-6.5A6.5,6.5,0,0,1,10.571,16.428Z" transform="translate(-2.571 -1.928)"></path>
            </svg>
        </div>
    );

    const RenderMessage = (props) => (
        <React.Fragment>
            <div className="customfooter">
                <hr className="my-4 border-top-0 border-bottom" />
                <div className="row no-gutters">
                    <div className='d-flex additional-info'>
                        <div>
                            {infoSvg}
                        </div>
                        <p className='mb-0 info' dangerouslySetInnerHTML={{ __html: props.message }}/>      
                    </div>
                </div>
            </div>
        </React.Fragment>
    );

    if(validate.isNotEmpty(props?.replacementProduct?.name)) {
        return (
            <React.Fragment></React.Fragment>
        );
    } else if(validate.isNotEmpty(props.productMessages) && !props.isShortSupply){
        return (
            <RenderMessage message={props.productMessages[0]} />
        );
    } else if(props.isDiscontinued) {
        return (
            <RenderMessage message={`This ${props.product.isGeneral === "Y" ? 'Product' : 'Medicine'} has been <strong>discountinued by the manufacturer.</strong>${props.isAlternativeProductsAvailable ? ' Please choose an altenative product.' : ""}`} />
        );
    } else if(isDrugScheduleX) {
        return(
            <RenderMessage message={`This product is <strong>Not Available for Online sale.</strong>`} />
        );
    }

    return (
		<React.Fragment>
            {(validate.isNotEmpty(props.productAvailableStoresModalData) || validate.isNotEmpty(props.standardExpectedArrival) || props.isShortSupply || validate.isNotEmpty(props.productMessages) || props.product.purchaseStatus === "A") && <div className="customfooter">
                <hr className="my-4 border-top-0 border-bottom" />
                <div className="row no-gutters">
                    {validate.isNotEmpty(props.productAvailableStoresModalData) && <div className="align-items-center col d-flex">
                        <svg xmlns="http://www.w3.org/2000/svg" width="38.932" height="32.729" viewBox="0 0 38.932 32.729">
                            <g transform="translate(-1825.002 -387.548)">
                                <path stroke="rgba(0,0,0,0)" stroke-miterlimit="0" d="M15072.245,16384.555l-9.014-3.006-8.076,3.006h-.752l-8.072-3.006-9.018,3.006a1.4,1.4,0,0,1-.937-.189c-.374-.184-.374-.562-.374-.937l2.064-15.79a1.466,1.466,0,0,1,.748-.753l8.454-3.01c.189-.185.563,0,.753,0l6.944,2.821,2.443-1.127.941,1.879-2.442.941v13.722l6.386-2.257-.563-7.9a1.113,1.113,0,0,0,.748.189,2.354,2.354,0,0,0,1.127-.189l.563,8.084,7.327,2.258-1.689-13.537-3.006-1.126c.374-.563.563-1.316.938-1.88l3.38,1.316a.8.8,0,0,1,.752.748l2.064,15.79a.685.685,0,0,1-.748.752c0,.189-.378.189-.563.189Zm-24.413-4.511,6.386,2.258v-13.537l-5.448-2.253Zm-7.7-11.279-1.689,13.537,7.323-2.258.752-13.532Zm21.962,1.164s-3.006-6.016-4.511-8.647a6.137,6.137,0,0,1,2.632-7.895,6.073,6.073,0,0,1,7.9,2.631,5.771,5.771,0,0,1,0,5.264c-.942,1.69-4.511,8.647-4.511,8.647a.677.677,0,0,1-.682.423A1,1,0,0,1,15062.092,16369.929Zm-2.067-11.279a2.821,2.821,0,1,0,2.82-2.82A2.894,2.894,0,0,0,15060.024,16358.649Z" transform="translate(-13210.5 -15964.777)"></path>
                            </g>
                        </svg>
                        <p className="mx-3 mb-0">
                            <button className="btn link availability text-primary btn text-left ml-n2" onClick={()=>{setShowProductAvailableStoresModal(true)}} role="button">
                                Also available at the
                                <br /> following stores near you
                            </button>
                        </p>
                    </div> }
                    {(validate.isNotEmpty(props.standardExpectedArrival)) && <div className="align-items-center col d-flex">
                        <svg xmlns="http://www.w3.org/2000/svg" width="49.023" height="31.01" viewBox="0 0 49.023 31.01">
                            <g transform="translate(0 -94.062)">
                                <g transform="translate(0 94.062)">
                                    <path d="M45.591,107.208l-1.27-5.078a.768.768,0,0,0,.608-.751v-.819a3.227,3.227,0,0,0-3.224-3.224H35.923V95.648a1.588,1.588,0,0,0-1.586-1.586H4.861a1.588,1.588,0,0,0-1.586,1.586v13.919a.768.768,0,1,0,1.535,0V95.648a.051.051,0,0,1,.051-.051H34.336a.051.051,0,0,1,.051.051v13.919a.768.768,0,1,0,1.535,0v-.87h9.059a2.512,2.512,0,0,1,2.385,1.74H44.98a.768.768,0,0,0-.768.768v1.637a2.408,2.408,0,0,0,2.405,2.405h.87v3.377H45.48a4.86,4.86,0,0,0-9.188,0h-.37v-5.782a.768.768,0,1,0-1.535,0v5.782H18.462a4.86,4.86,0,0,0-9.188,0H4.861a.051.051,0,0,1-.051-.051v-1.689H8.136a.768.768,0,1,0,0-1.535H.768a.768.768,0,1,0,0,1.535H3.275v1.689a1.588,1.588,0,0,0,1.586,1.586H9.008c0,.017,0,.034,0,.051a4.861,4.861,0,1,0,9.723,0c0-.017,0-.034,0-.051h17.3c0,.017,0,.034,0,.051a4.861,4.861,0,1,0,9.723,0c0-.017,0-.034,0-.051h2.509a.768.768,0,0,0,.768-.768V111.2A4.049,4.049,0,0,0,45.591,107.208Zm-9.668-8.336h5.782a1.691,1.691,0,0,1,1.689,1.689v.051H35.923Zm0,8.29v-5.015h6.821L44,107.162ZM13.868,123.537a3.326,3.326,0,1,1,3.326-3.326A3.33,3.33,0,0,1,13.868,123.537Zm27.019,0a3.326,3.326,0,1,1,3.326-3.326A3.33,3.33,0,0,1,40.886,123.537Zm6.6-9.825h-.87a.871.871,0,0,1-.87-.87v-.87h1.74v1.74Z" transform="translate(0 -94.062)"></path>
                                </g>
                                <g transform="translate(12.281 118.625)">
                                    <path d="M129.853,350.6a1.586,1.586,0,1,0,1.586,1.586A1.588,1.588,0,0,0,129.853,350.6Z" transform="translate(-128.267 -350.597)"></path>
                                </g>
                                <g transform="translate(39.3 118.625)">
                                    <path d="M412.041,350.6a1.586,1.586,0,1,0,1.586,1.586A1.588,1.588,0,0,0,412.041,350.6Z"  transform="translate(-410.455 -350.597)"></path>
                                </g>
                                <g transform="translate(19.65 115.35)">
                                    <path d="M217.457,316.393H205.995a.768.768,0,1,0,0,1.535h11.463a.768.768,0,1,0,0-1.535Z" transform="translate(-205.227 -316.393)"></path>
                                </g>
                                <g transform="translate(1.637 112.075)">
                                    <path d="M27.695,282.188H17.87a.768.768,0,0,0,0,1.535h9.825a.768.768,0,0,0,0-1.535Z" transform="translate(-17.102 -282.188)"></path>
                                </g>
                                <g transform="translate(13.919 101.431)">
                                    <path d="M158.143,171.247a.768.768,0,0,0-1.085,0l-6.826,6.826-3.551-3.551a.768.768,0,0,0-1.085,1.085l4.094,4.094a.767.767,0,0,0,1.085,0l7.369-7.369A.768.768,0,0,0,158.143,171.247Z" transform="translate(-145.37 -171.023)"></path>
                                </g>
                            </g>
                        </svg>
                        <div className="mx-3 mb-0">
                            <p className="small text-secondary mb-0">
                                Delivery option
                            </p>
                            <p className="m-0 font-weight-bold">
                                {props.standardExpectedArrival}
                            </p>
                        </div>
                    </div> }
                    { props.product.isInStock || props.product.availQty > 0
                    ?
                        <React.Fragment>
                            { (props.isShortSupply || validate.isNotEmpty(props.product.returnAndReplacableMsg)) && <div className='d-flex additional-info col align-items-center'>
                                {infoSvg}
                                <p className='mb-0 info'>
                                    { validate.isNotEmpty(props.productMessages) && props.productMessages[0] }
                                    { validate.isNotEmpty(props.product.returnAndReplacableMsg) && ((validate.isNotEmpty(props.productMessages) ? " " : "") + props.product.returnAndReplacableMsg) }
                                </p>
                            </div> }
                        </React.Fragment>
                    :
                        <React.Fragment>
                            {props.product.purchaseStatus === "A" && <div className='col d-flex'>
                                <div>
                                    <svg className="mr-2 align-text-top" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                        <path d="M9.571,6.678a.752.752,0,0,1,.75-.75h.5a.752.752,0,0,1,.75.75v.5a.752.752,0,0,1-.75.75h-.5a.752.752,0,0,1-.75-.75Zm3,7.25h-4v-1h1v-3h-1v-1h3v4h1Zm-2-12a8,8,0,1,0,8,8,8,8,0,0,0-8-8Zm0,14.5a6.5,6.5,0,1,1,6.5-6.5A6.5,6.5,0,0,1,10.571,16.428Z" transform="translate(-2.571 -1.928)"></path>
                                    </svg>
                                </div>
                                <p className='text-orange mb-0'>Click 'Get Notified' and enter your details if you want us to source this product for you.</p>
                            </div>}
                        </React.Fragment>
                    }
                </div>
            </div>}
            {showProductAvailableStoresModal && <ProductAvailableStoresModal showProductAvailableStoresModal={showProductAvailableStoresModal}  productAvailableStoresModalData={props.productAvailableStoresModalData} toggleProductAvailableStoresModal={toggleProductAvailableStoresModal}/> }
		</React.Fragment>
	);
}

export default ProductDeliveryInfo;