import React, { useState, useEffect } from 'react';
import Alert from '../../Common/Alert';
import ShowPickUpStore from '../../Common/ShowPickUpStore';
import MyAccountService from '../../../services/MyAccountService';
import Validate from '../../../helpers/Validate';
import CONFIG from '../../../constants/ServerConfig';
import ShoppingCartGhostImage from '../../ShoppingCart/ShoppingCartGhostImage';
import ProductThumbNail from '../../Common/ProductThumbNail';
import DeliveryVan from '../../../images/common/delivery-van.svg';
import { PaybackEditUpdateEvent , PaybackReviewBackEvent ,PaybackReviewProceedEvent } from '../../../Analytics/Analytics';

const validate = Validate();
const FlexiReview = (props) => {
    const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
    const myAccountService = MyAccountService();
    const [giftCart, setGiftCart] = useState({});
    const [giftItemMap, setGiftItemMap] = useState({});
    const [isCartProductsLoading, setCartProductsLoading] = useState(false);
    const [shippingDetails, setShippingDetails] = useState({});
    const [totalCartAmount, setTotalCartAmount] = useState();
    const [totalDiscount, setTotalDiscount] = useState();

    useEffect(() => {
        getGiftOrderSummary();
    }, []);

    const getGiftOrderSummary = () => {
        setCartProductsLoading(true);
        myAccountService.getGiftOrderReviewInfo(props.isPayback).then(response => {
            setCartProductsLoading(false);
            if (validate.isNotEmpty(response) && response.statusCode == "SUCCESS") {
                
                setGiftItemMap(response.dataObject.giftItemMap);
                setShippingDetails(response.dataObject.userShippingDetails);
                setTotalCartAmount(response.dataObject.totalAmount);
                setTotalDiscount(response.dataObject.totalDiscount);
                if(props.isPayback){
                    setGiftCart({...giftCart,totalRedeemedPoints:response.dataObject.totalRedeemedPoints});
                } else{
                    setGiftCart(response.dataObject.giftCart);
                }
            } else if (validate.isNotEmpty(response) && response.statusCode == "FAILURE" && response.message == "Empty gift cart" || response.message == "Empty Gift Cart") {
                setAlertInfo({ message: "Empty gift cart", type: "" });
                window.location.href = props.isPayback ? CONFIG.REDIRECT_HOME_URL+"paybackspecialsale" : CONFIG.REDIRECT_HOME_URL;
            } else if (validate.isNotEmpty(response) && response.statusCode == "FAILURE" && response.message == "Please login for cart products") {
                setAlertInfo({ message: response.message, type: "" });
                window.location.href = props.isPayback ? CONFIG.REDIRECT_HOME_URL+"paybackspecialsale" : CONFIG.REDIRECT_HOME_URL;
            } else {
                setAlertInfo({ message: response.message, type: "" });
                if(props.isPayback){
                    window.location.href = "/paybackspecialsale";
                }
            }

        }).catch(function (error) {
            console.log(error);
            setAlertInfo({ message: "System experiencing some problem, Please try after some time", type: "" });
            setCartProductsLoading(false);
        });
    }

    const createOrder = () => {
        setCartProductsLoading(true);
        if(props.isPayback){
            PaybackReviewProceedEvent()
            props.history.push('/payback/payment');
        }else{
            props.history.push('/redeemThankyou');
        }
    }
    const goBack = () => {
        if(props.isPayback){
            PaybackReviewBackEvent()
            props.history.push('/payback/store');
        }else{
            props.history.push('/flexiDelivery');
        }
    }
    return (
        <React.Fragment>
            <Alert alertInfo={alertInfo} duration={5000} onDurationEnd={setAlertInfo} />
            {isCartProductsLoading &&
                <div className="container-lg container-fluid">
                    <div className="row px-sm-3">
                        <ShoppingCartGhostImage isCartProductsLoading={isCartProductsLoading}></ShoppingCartGhostImage>
                    </div>
                </div>
            }
            {!isCartProductsLoading &&
                <React.Fragment>
                    <main role="main" className="container-lg container-fluid">
                        <div className="row px-sm-3">
                            <div className="col-8 pl-0 pr-2">
                                {giftItemMap && <FlexiCartItems isPayback={props.isPayback} totalDiscount={totalDiscount} totalCartAmount={totalCartAmount} giftItemMap={giftItemMap} totalRedeemedPoints={giftCart.totalRedeemedPoints} deliveryTime={shippingDetails.displayETA}></FlexiCartItems>}
                            </div>
                            <div className="col-4 pl-0 pr-2">
                                {giftItemMap && <FlexiCartSummary isPayback={props.isPayback} totalDiscount={totalDiscount} totalCartAmount={totalCartAmount} giftItemMap={giftItemMap}  giftCart={giftCart} ></FlexiCartSummary>}
                                {shippingDetails && <DeliveryAddressDetail deliveryDetails={shippingDetails}></DeliveryAddressDetail>}
                            </div>
                        </div>
                    </main>
                    <footer className="footer fixed-bottom mt-auto py-2">
                        <div className="container-lg container-fluid  px-0 px-sm-3">
                            <div className="row align-items-center no-gutters">
                                <div className="col-6"></div>
                                <div className="col-6 text-right">
                                    <button type="button" className="brand-secondary btn px-5 rounded-pill custom-btn-lg" onClick={() => goBack()}>Back</button>
                                    <button type="sumnit" className="btn btn-brand-gradient px-5 ml-3 rounded-pill custom-btn-lg" onClick={() => createOrder()}>Proceed</button>
                                </div>
                            </div>
                        </div>
                    </footer>
                </React.Fragment>
            }
        </React.Fragment>
    )
}

const FlexiCartItems = (props) => {

    let shoppingCartItems = props.giftItemMap;
    let qtyToChange = [];

    for (let qty = 1; qty < 100; qty++) {
        qtyToChange.push(qty);
    }

    const getroutedetails = () => {
        PaybackEditUpdateEvent()
        return '/payback/cart'
    }

    return (
        <React.Fragment>
            {shoppingCartItems &&
                <section>
                    <div className="header">
                        {!props.isPayback && <p>Shopping Cart</p>}
                        {props.isPayback && <p>Order Details</p>}
                        <p>
                            <img srcset={DeliveryVan} alt="Delivery Icon"/>
                            &nbsp;{props.deliveryTime} 
                        </p>
                    </div>
                    <ul className="product-listview list-group list-group-flush">

                        {Object.keys(shoppingCartItems).map((key, i) => {
                            let productId = key;
                            let product = shoppingCartItems[key];
                            return (
                                <li className="list-group-item">
                                    <div className="col">
                                        <a href="javascript:void(0)" title={product.productName} className="product-link">
                                            <ProductThumbNail imageUrl={product.imageUrl} productId={productId} imagesCount={product.imageUploadCount}
                                                productName={product.productName} width="48" auditForm="GEN" isGeneral="true" />
                                        </a>
                                        <h6>
                                            <a className="text-dark" href="javascript:void(0)" title={product.productName}>
                                                {product.productName}
                                            </a>
                                        </h6>
                                        {!props.isPayback && <p>
                                            <small className="text-secondary">1 Unit(s)/Pack   MRP <strong className="rupee">&#x20B9;</strong> {Number(product.mrp).toFixed(2)}</small>
                                            &nbsp;  <small className="font-weight-bold">  {parseInt(product.points)} Pts</small>
                                        </p>}
                                        {props.isPayback && <p>
                                            <small className="text-secondary">1 Unit(s)/Pack <span className='font-weight-bold mx-1'>|</span><span> Qty {product.quantity}</span></small>
                                        </p>}
                                        {!props.isPayback && <p>
                                            <small className="text-secondary">Qty {product.quantity} (Packs)</small>
                                        </p>}
                                    </div>
                                    <div className="col-6 text-right">
                                        {props.isPayback && <p>
                                            <small className='font-weight-bold'>Special Price <strong className='rupee ml-1'>&#x20B9;</strong>{product.totalPrice < product.mrp
                                    ? <React.Fragment><span className="mr-2 strikethrough-diagonal">{Number(product.mrp).toFixed(2)}</span><span className='rupee small'>&#x20B9;</span>{Number(product.totalPrice).toFixed(2)}</React.Fragment>
                                    : <React.Fragment>{parseFloat(product.mrp).toFixed(2)}</React.Fragment> }</small>
                                            <small className='mx-1'>&#43;</small>
                                            <small className='font-weight-bold' title='Payback Points'>{parseInt(product.points)} Pts</small>
                                        </p>}
                                        {!props.isPayback && <small><strong>{parseInt(product.quantity * product.points)} Pts</strong></small>}
                                    </div>
                                </li>
                            )
                        }
                        )}
                        <li className="order-details-summary list-group-item">
                            <div className="col">
                                <div className="form-group">
                                    <button className="btn btn-outline-brand rounded-pill custom-btn-lg" value="" type="button" onClick={event =>  {window.location.href = props.isPayback ? getroutedetails() : '/flexiCart'}}>
                                        Edit / Update Quantities
                                    </button>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-6 col-xl-6 text-left font-weight-bold">
                                {!props.isPayback && <p>
                                    <span>Total Points</span>
                                    <span className="float-right">Pts {parseInt(props.totalRedeemedPoints)}</span>
                                </p>}
                                {props.isPayback && <div className='row'>
                                    <span className='col text-right'>Total MedPlus Payback Points</span>
                                    <span className="col-4 text-right" title='Payback Points'>{parseInt(props.totalRedeemedPoints)}</span>
                                </div>}
                                {props.isPayback && validate.isNotEmpty(props.totalDiscount) && <div className='row'>
                                    <span className='col text-right'>Cash discount on MRP</span>
                                    <div className="col-4 text-right">
                                        <span className="rupee mx-1 mt-1 font-14"> &#x20b9;
                                            <p className="ml-1 font-14 d-inline-block">{parseFloat(props.totalDiscount).toFixed(2)}</p>
                                        </span>
                                    </div>
                                </div>
                                }
                                {props.isPayback && <div className='row'>
                                    <span className='col text-right'>Total Amount to be Paid</span>
                                    <div className="col-4 text-right">
                                        <span className="rupee mx-1 mt-1"> &#x20b9;
                                            <p className="d-inline-block font-16 ml-1"> {parseFloat(props.totalCartAmount).toFixed(2)}</p>
                                        </span>
                                    </div>
                                </div>}

                            </div>
                        </li>
                    </ul>
                </section>
            }
        </React.Fragment>
    )
}

const FlexiCartSummary = (props) => {
    const pointTotal = props.giftCart.pointTotal;
    const totalRedeemedPoints = props.giftCart.totalRedeemedPoints;

    let shoppingCartItems = props.giftItemMap;
    let totalProducts = 0;
    if (validate.isNotEmpty(props.giftItemMap)) {
        for (const [productId, product] of Object.entries(props.giftItemMap)) {
            totalProducts = totalProducts + 1;
        }
    }

    return (
        <React.Fragment>
            {shoppingCartItems &&
                <React.Fragment>
                    <section className="cart-summary">
                        <div className="header">
                            <p>Cart Summary</p>
                        </div>
                        <div className="body">
                            <p><span>No. Of Items</span><span>{totalProducts}</span></p>
                            {props.isPayback && <p><span>MedPlus Payback points to be debited</span><span title="Payback Points">{parseInt(totalRedeemedPoints)}</span></p>}
                            {props.isPayback && validate.isNotEmpty(props.totalDiscount) && <p><span>Cash discount on MRP</span><span className="rupee mx-1 mt-1 font-14"> &#x20b9;<p className="ml-1 font-14 d-inline-block">{parseFloat(props.totalDiscount).toFixed(2)}</p></span></p>}
                            {!props.isPayback && <p><span>Points To Be Redeemed</span><span>{parseInt(totalRedeemedPoints)} Pts</span></p>}
                            {!props.isPayback && <p><span>Available Points</span><span>{parseInt(pointTotal - totalRedeemedPoints)} Pts</span></p>}
                        </div>
                        {props.isPayback && <div className='footer border-top'>
                            <p><span className='font-14'>Total Amount to be Paid</span> </p>
                            <div>
                                <span className="rupee mx-1 mt-1"> &#x20b9;
                                    <p className="d-inline-block font-14 ml-1">{parseFloat(props.totalCartAmount).toFixed(2)}</p>
                                </span>
                            </div>
                        </div>}
                    </section>
                </React.Fragment>
            }
        </React.Fragment>
    )
}

const DeliveryAddressDetail = (props) => {
    let deliveryDetails = props.deliveryDetails;
    return (
        <React.Fragment>
            {deliveryDetails && deliveryDetails.pickUpAddress &&
                <section className="delivery-detail">
                    <div className="header">
                        <p>Delivery Details</p>
                        <span className="badge-title success right">Pick Up Details</span>
                    </div>
                    <ShowPickUpStore
                        pickStoreName={deliveryDetails.pickStoreName}
                        pickUpAddress={deliveryDetails.pickUpAddress}
                        locationLatLong={deliveryDetails.locationLatLong}
                        phoneNumber={deliveryDetails.phoneNumber}
                        isSmallAddressRequired={true}
                    />
                </section>
            }
        </React.Fragment>
    )
}
export default FlexiReview;