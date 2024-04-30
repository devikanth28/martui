import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ProductThumbNail from '../../Common/ProductThumbNail';
import { Modal, ModalBody } from 'reactstrap';
import MyAccountService from '../../../services/MyAccountService';
import Validate from '../../../helpers/Validate';
import Alert from '../../Common/Alert';
import ProductSearchDropDown from '../../Common/ProductSearchDropDown';
import Slider from 'react-slick';
import SliderNextArrow from '../../MedplusLabs/components/Common/SliderNextArrow';
import SliderPrevArrow from '../../MedplusLabs/components/Common/SliderPrevArrow';
import { PaybackProductAddtoCart } from '../../../Analytics/Analytics';

const RewardProduct = (props) => {

    const product = props.product;
    const [isProductMoreDetailModal, setProductMoreDetailModal] = useState(false);
    const toggleProductMoreDetailModal = () => setProductMoreDetailModal(!isProductMoreDetailModal);
    const [isAddToCartLoading, setAddToCartLoading] = useState(false);
    const [alertInfo, setAlertInfo] = useState({});
    const validate = Validate();
    const smallImageUrl = product.imageUrl.split(",")[0];
    const largeImageUrls = product.imageUrl.split(",").slice(1);
    const userInfo = useSelector(state => state && state.userInfo ? state.userInfo.userInfo : null);
    useEffect(() => {
    }, [props.cartQty]);

    let qtyToChange = [];
    for (let qty = 0; qty < 100; qty++) {
        qtyToChange.push(qty);
    }

    const closeAlertMessage = () => {
        setAlertInfo({});
    }

    const addOrModifyGiftProduct = (productId, requestedQty, e) => {
        let action = "ADD";
        if (props.isAddedToCart && requestedQty == 0) {
            action = "REMOVE";
        }
        if(props.isPayback) {
            PaybackProductAddtoCart(product.productName, action)
        }
        setAddToCartLoading(true);
        if (action == "ADD") {
            MyAccountService().addRewardProduct(product.productId, requestedQty, props.isPayback).then(response => {
                if (validate.isNotEmpty(response) && response.statusCode === "SUCCESS" && validate.isNotEmpty(response.dataObject.giftItemMap)) {
                    props.updateCart(response.dataObject);
                    props.setCartItemDropDownOpen(true);
                    setTimeout(() => {
                        props.setCartItemDropDownOpen(false);
                    }, 3000);
                } else {
                    setAlertInfo({ message: response.message ? response.message : "Error occured while adding Flexi Product", type: "" });
                }
                setAddToCartLoading(false);
            }).catch(function (error) {
                console.log("System experiencing some problem, Please try after some time");
                setAddToCartLoading(false);
                return;
            });
        } else if (action == "REMOVE") {
            MyAccountService().removeRewardProduct(product.productId, props.isPayback).then(response => {
                if (validate.isNotEmpty(response) && response.statusCode === "SUCCESS") {
                    props.updateCart(response.dataObject);
                }
                props.setCartItemDropDownOpen(true);
                setTimeout(() => {
                    props.setCartItemDropDownOpen(false);
                }, 3000);
                setAddToCartLoading(false);
            }).catch(function (error) {
                console.log("System experiencing some problem, Please try after some time");
                setAddToCartLoading(false);
                return;
            });
        }
    };

    return (
        <React.Fragment>
            {alertInfo && alertInfo.message && <Alert alertInfo={alertInfo} onDurationEnd={closeAlertMessage} duration='5000' />}
            <div className={!props.isPayback ? "each-reward" : "each-reward payback"} key={props.index}>
                <div className="card p-2">
                    <div className='text-center'>
                        <ProductThumbNail imageUrl={smallImageUrl} productId={product.productId}
                            productName={product.productName} height="170" width="142" auditForm="GEN" imagesCount = {product.imageUploadCount}
                            isGeneral={true} showNpaWithText={true}></ProductThumbNail>
                    </div>
                    <h6 className="card-title text-left mt-2">{product.productName}</h6>
                    <a href="javascript:void();" className="text-primary small py-1" onClick={() => toggleProductMoreDetailModal()}>More Details</a>
                    {props.isPayback && <div className='mb-1'>
                        <small>Get this product for </small><br/>
                        <div> 
                            <p className="rupee mx-1 mt-1 text-brand"> &#x20b9;
                                <span className="d-inline-block h6 mr-2 text-brand">{parseFloat(product.specialSalePrice).toFixed(2)} &#43; {parseInt(product.paybackPoints)} <span>Pts</span></span></p>                       
                        </div>
                    </div>}
                    {!props.isPayback && <div className="mb-1">
                        <span className="rupee mx-1 mt-1"> &#x20b9;<strong className="font16 mr-2"> {parseFloat(product.mrp).toFixed(2)} </strong></span>
                        <span className="font-weight-bold text-brand float-right"> {parseInt(product.points)} <span>Pts</span>  </span>
                    </div>}
                    {(props.isPayback ? (validate.isNotEmpty(userInfo) && validate.isNotEmpty(userInfo.medplusId)) : true) && <div className="d-flex justify-content-between">
                        {isAddToCartLoading ?
                            <button className="btn btn-brand-gradient rounded-pill btn-block">
                                <React.Fragment>
                                    <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                                    <span className="sr-only"></span>
                                </React.Fragment>
                            </button>
                            :
                            props.isAddedToCart ?
                                <ProductSearchDropDown
                                    startIndex={0}
                                    dropDownClass={"mt-auto w-100"}
                                    restrictedQty={0}
                                    selectedQty={props.cartQty}
                                    productId={product.productId} updateCartQty={addOrModifyGiftProduct}
                                    roundedButton="custom-btn-lg font-16"
                                />
                                :
                                <button className="btn btn-brand-gradient rounded-pill btn-block ga-add-to-card-flexicard custom-btn-lg" onClick={(e) => addOrModifyGiftProduct(product.productId, 1, e)}>
                                    Add To Cart
                                </button>
                        }
                    </div>}
                </div>
            </div>
            <MoreDetailModal largeImageUrls={largeImageUrls} userInfo={userInfo} isPayback={props.isPayback} qtyToChange={qtyToChange} isModelOpen={isProductMoreDetailModal} {...props} isAddToCartLoading={isAddToCartLoading} toggleProductMoreDetailModal={toggleProductMoreDetailModal} product={product} modifyGftCart={addOrModifyGiftProduct} />
        </React.Fragment>
    )
}

export const MoreDetailModal = (props) => {
    const validate = Validate();
    const settings = {
        customPaging: function (i) {
            return (
                <div className="custompagination rounded">
                    <span></span>
                </div>
            );
        },
        dots: true,
        dotsClass: "slick-dots mb-2",
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <SliderPrevArrow />,
        nextArrow: <SliderNextArrow />,
    };

    const imgClass = "img-fluid col-4";
    return (
        <React.Fragment>
            <Modal className={validate.isEmpty(props.product.productLongDescription) ? "modal-dialog-centered rewards-viewmore modal-sm" : "modal-dialog-centered rewards-viewmore modal-lg"} backdrop="static" isOpen={props.isModelOpen} toggle={props.toggleProductMoreDetailModal}>
                <ModalBody className="modal-body">
                    <div className="row">
                        <div className={validate.isEmpty(props.product.productLongDescription) ? 'col-12 mb-4' : 'col-4'}>
                            <Slider className='payback-points-slider-container ' {...settings}>
                                {props.largeImageUrls.map(image => {
                                    return (
                                        <ProductThumbNail imageUrl={image} productId={props.product.productId}
                                            className="col"
                                            imagesCount = {props.product.imageUploadCount}
                                            productName={props.product.productName} auditForm="GEN"
                                            isGeneral={true} height={230}></ProductThumbNail>
                                    )
                                })}
                            </Slider>
                        </div>
                        <div className="col text-left">
                            <h6 className="title">{props.product.productName}</h6>
                            {props.isPayback && <div>
                                <div className='d-inline-block'>
                                    <p className="rupee mx-1 mt-1 text-brand"> &#x20b9;<span className="d-inline-block h6 m-0 text-brand">{parseFloat(props.product.specialSalePrice).toFixed(2)} &#43; {parseInt(props.product.paybackPoints)} Pts</span></p>
                                </div>
                            </div>}
                            {validate.isNotEmpty(props.product.productLongDescription) && <div className='flexirewardsDetailContent' dangerouslySetInnerHTML={{ __html: props.product.productLongDescription }}></div> }
                        </div>
                    </div>
                </ModalBody>
                <div className="text-center mb-4">
                    <div className="d-flex justify-content-center">
                        <button type="button" className={validate.isNotEmpty(props.product.productLongDescription) ? "brand-secondary btn px-5 rounded-pill mr-3 custom-btn-lg": "btn brand-secondary px-4 mr-3 rounded-pill custom-btn-lg"} data-dismiss="modal" onClick={() => props.toggleProductMoreDetailModal()}>Close</button>
                        {(props.isPayback ? (validate.isNotEmpty(props.userInfo) && validate.isNotEmpty(props.userInfo.medplusId)) : true) &&
                            <React.Fragment>
                                {props.isAddToCartLoading ?
                                    <button className="btn btn-brand-gradient rounded-pill px-5 viewmore-loader">
                                        <React.Fragment>
                                            <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                                            <span className="sr-only"></span>
                                        </React.Fragment>
                                    </button>
                                    :
                                    props.isAddedToCart ?
                                        <ProductSearchDropDown
                                            startIndex={0}
                                            restrictedQty={0}
                                            selectedQty={props.cartQty}
                                            productId={props.product.productId} updateCartQty={props.modifyGftCart}
                                        />
                                        :
                                        <button className={validate.isNotEmpty(props.product.productLongDescription) ? "btn btn-brand-gradient rounded-pill px-5 custom-btn-lg": "btn btn-brand-gradient px-4 rounded-pill custom-btn-lg"}  onClick={(e) => props.modifyGftCart(props.product.productId, 1, e)}>
                                            Add To Cart
                                        </button>}
                            </React.Fragment>
                        }
                    </div>
                </div>
            </Modal>
        </React.Fragment>
    );
}

export default RewardProduct;
