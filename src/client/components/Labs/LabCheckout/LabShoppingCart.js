import React, { useState, useEffect }from "react";
import LabCheckoutService from '../../../services/LabCheckoutService';
import ShoppingCartGhostImage from '../../ShoppingCart/ShoppingCartGhostImage';
import Alert from '../../Common/Alert';
import Validate from '../../../helpers/Validate';
import Promotion from '../../Checkout/OrderReview/Promotion';
import LabCartSummary from '../Common/LabCartSummary';
import LabCheckoutAction from '../../../../redux/action/LabCheckoutAction';
import CONFIG from '../../../constants/ServerConfig';

const LabShoppingCart = (props) => {

    const validate = Validate();
    const labCheckoutService = LabCheckoutService();
    const labCheckoutAction = LabCheckoutAction();

    const [isCartProductsLoading, setIsCartProductsLoading] = useState(false);
    const [isProductLoading, setIsProductLoading] = useState("");
    const [isCouponRequestLoading, setCouponRequestLoading] = useState(false);

    const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
    const [patientCartInfo, setPatientCartInfo] = useState({});
    const [couponCode, setCouponCode] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [failureMsg, setFailureMsg] = useState("");
    
    useEffect(() => {
        getLabShoppingCart();
    },[]);

    const getLabShoppingCart = () => {
        setIsCartProductsLoading(true);
        labCheckoutService.getLabShoppingCart().then(response => {
            if(validate.isNotEmpty(response) && response.statusCode === "SUCCESS" && validate.isNotEmpty(response.responseData) && validate.isNotEmpty(response.responseData.shoppingCart)) {
                prepareShoppingCartInfo(response.responseData);
            } else {
                setAlertInfo({ message: response.message, type: "" });
                continueShopping();
            }
            setIsCartProductsLoading(false);
        }).catch(function(error) {
            console.log(error);
            continueShopping();
            setIsCartProductsLoading(false);
            setAlertInfo({ message: "System experiencing some problem, Please try after some time", type: "" });
        });
    }

    const removeShoppingCartItem = (testCode) => {
        setIsProductLoading(testCode);
        labCheckoutService.removeShoppingCartItem(testCode).then(response => {
            if(validate.isNotEmpty(response) && response.statusCode === "SUCCESS" && validate.isNotEmpty(response.responseData)) {
                setPatientCartInfo(response.responseData.shoppingCart);
                updateShoppingCartInRedux(response.responseData.shoppingCart);
                if(validate.isNotEmpty(response.responseData.shoppingCart) && response.responseData.shoppingCart.totalCartItemsCount > 0) {
                    if(validate.isEmpty(response.responseData.shoppingCart.couponCode)) {
                        setSuccessMsg(undefined);
                        setCouponCode(undefined);
                        setFailureMsg(undefined);
                    }
                } else {
                    setAlertInfo({ message: "Empty ShoppingCart!", type: "" });
                    continueShopping();
                }
            } else {
                setAlertInfo({ message: response.message, type: "" });
            }
            setIsProductLoading(undefined);
        }).catch(function(error) {
            setIsProductLoading(undefined);
            setAlertInfo({ message: "System experiencing some problem, Please try after some time", type: "" });
        });

    }

    const continueShopping = () => {
        window.location.href = CONFIG.REDIRECT_HOME_URL + "lab";
    }

    const addMoreTest = ()=>{
        window.location.href = CONFIG.REDIRECT_HOME_URL + "lab/labtest-list/A";
    }

    const applyCouponCode = (coupon) => {
        if(validate.isEmpty(coupon)) {
            setFailureMsg("Please give coupon code");
            return;
        }
        setFailureMsg(undefined);
        setCouponRequestLoading(true);
        labCheckoutService.applyCouponCodeInShoppingCart(coupon).then(response => {
            if(validate.isNotEmpty(response) && response.statusCode === "SUCCESS" && validate.isNotEmpty(response.responseData) && validate.isNotEmpty(response.responseData.shoppingCart)) {
                prepareShoppingCartInfo(response.responseData);
            } else {
                setFailureMsg(response.message);
            }
            setCouponRequestLoading(false);
        }).catch(function(error) {
            setCouponRequestLoading(false);
            setAlertInfo({ message: "System experiencing some problem, Please try after some time", type: "" });
        });
    }

    const removeCouponCode = (couponCode) => {
        setCouponRequestLoading(true);
        labCheckoutService.removeCouponCode(couponCode).then(response => {
            if(validate.isNotEmpty(response) && response.statusCode === "SUCCESS" && validate.isNotEmpty(response.responseData)) {
                if(validate.isNotEmpty(response.responseData.shoppingCart) && validate.isNotEmpty(response.responseData.shoppingCart.totalCartItemsCount > 0)) {
                    setSuccessMsg("");
                    setFailureMsg("");
                    setCouponCode("");
                    setPatientCartInfo(response.responseData.shoppingCart);
                    updateShoppingCartInRedux(response.responseData.shoppingCart);
                } else {
                    setFailureMsg({ message: "Empty ShoppingCart!", type: "" });
                }
            } else {
                setFailureMsg(response.message);
            }
            setCouponRequestLoading(false);
        }).catch(function(error) {
            setCouponRequestLoading(false);
            setAlertInfo({ message: "System experiencing some problem, Please try after some time", type: "" });
        });
    }

    const prepareShoppingCartInfo = (responseData) => {
        if(validate.isNotEmpty(responseData) && validate.isNotEmpty(responseData.shoppingCart)) {
            if(validate.isNotEmpty(responseData.shoppingCart.couponCode)) {
                let couponMessage =  validate.isNotEmpty(responseData.couponMessage) ? responseData.couponMessage : "Coupon applied successfully!";
                setSuccessMsg(couponMessage);
                setCouponCode(responseData.shoppingCart.couponCode);
            }
            setPatientCartInfo(responseData.shoppingCart);
            updateShoppingCartInRedux(responseData.shoppingCart);
        }
    }

    const updateShoppingCartInRedux = (shoppingCart) => {
        if(validate.isEmpty(shoppingCart)) {
            return;
        }
        labCheckoutAction.saveLabShoppingCart(shoppingCart);
    }

    const proceedFromShoppingCart = () => {
        props.history.push("/sampleCollection");
    }

    return(
        <React.Fragment>
            { alertInfo && alertInfo.message && <Alert alertInfo={alertInfo} duration={5000} onDurationEnd={setAlertInfo}/>}
            <main role="main" className="container-lg container-fluid">
                <div className="row px-sm-3">
                    {isCartProductsLoading && <ShoppingCartGhostImage isCartProductsLoading={isCartProductsLoading} />}
                    {!isCartProductsLoading && <div className="col-8 pl-0 pr-2">
                        <section>
                            <div className="header"><p>Selected Tests</p></div>
                            <ul className="product-listview list-group list-group-flush test-items">
                               {validate.isNotEmpty(patientCartInfo) && validate.isNotEmpty(patientCartInfo.patientCart) && patientCartInfo.patientCart.shoppingCartItems.length > 0 && patientCartInfo.patientCart.shoppingCartItems.map(shoppingCartItem => {
                                    return (<ShoppingCartItem key={shoppingCartItem.testCode} isProductLoading={isProductLoading} shoppingCartItem={shoppingCartItem} removeShoppingCartItem={removeShoppingCartItem}/>)
                               })}
                                {/* <li className="list-group-item px-3 py-2 footer warning mb-0">
                                    <p className="font-weight-normal"><strong>Note:</strong> Do not eat or drink anything other than water for 8-12 hours before the test.</p>
                                </li> */}
                            </ul>
                        </section>
                    </div>}
                    {!isCartProductsLoading && <div className="col-4 pl-2 pr-0">
                        {validate.isNotEmpty(patientCartInfo) && validate.isNotEmpty(patientCartInfo.patientCart) && 
                        	<Promotion promotionBanners={{}} isLoading={isCouponRequestLoading}
                                applyCouponCode={applyCouponCode} removeCouponCode={removeCouponCode} 
                                applyCouponSuccessMsg={successMsg} applyCouponFailureMsg={failureMsg}
                                couponCode = {couponCode} header="Apply Coupon"
                            />
                        }
                        {/* <section className="select-offers border-dotted-green">
                            <div className="header">
                                <p>Apply Coupon</p>
                            </div>
                            <div className="px-3 py-2">
                                <div className="input-group mb-2">
                                    <input type="text" className="form-control " placeholder="Enter Coupon code" autoComplete="off" aria-label="Enter Coupon code" aria-describedby="button-apply"/>
                                    <div className="input-group-append">
                                        <button className="btn btn-dark" type="button">Apply</button>
                                    </div>
                                </div>
                            </div>
                        </section> */}
                        {validate.isNotEmpty(patientCartInfo) && validate.isNotEmpty(patientCartInfo.patientCart) && 
                            <LabCartSummary shoppingCartInfo={patientCartInfo} shoppingCartSummary={true}/>
                        }
                        {/* {validate.isNotEmpty(patientCartInfo) && validate.isNotEmpty(patientCartInfo.patientCart) && <section className="cart-summary">
                            <div className="header"><p>Cart Summary</p></div>
                            <div className="body">
                                <p className="font-weight-normal"><span>No. Of Items</span><span>{patientCartInfo.patientCart.shoppingCartItemsCount}</span></p>
                                <p className="font-weight-normal"><span>Total Price</span><span><strong className="rupee">&#x20B9;</strong> {parseFloat(patientCartInfo.totalPrice).toFixed(2)}</span></p>
                                {validate.isNotEmpty(patientCartInfo.totalDiscount) && patientCartInfo.totalDiscount > 0 && validate.isEmpty(patientCartInfo.couponCode) &&  <p className="font-weight-normal"><span>Discount Applied</span><span>- <strong className="rupee">&#x20B9;</strong> 00.00</span></p>}
                                {validate.isNotEmpty(patientCartInfo.couponCode) && <p className="font-weight-normal"><span>Coupon Applied (<span className="text-success font-weight-bold">{patientCartInfo.couponCode}</span>)</span><span>- <strong className="rupee">&#x20B9;</strong> 00.00</span></p>}
                                {validate.isNotEmpty(patientCartInfo.reportDeliveryTypeOff) && patientCartInfo.reportDeliveryTypeOff > 0 && <p className="font-weight-normal"><span>Report Delivery Charges</span><span><strong className="rupee">&#x20B9;</strong> {parseFloat(patientCartInfo.reportDeliveryTypeOff).toFixed(2)}</span></p>}
                                {patientCartInfo.collectionCharges && patientCartInfo.collectionCharges > 0 && <p className="font-weight-normal"><span>Collection Charges</span><span><strong className="rupee">&#x20B9;</strong> {patientCartInfo.collectionCharges}</span></p>}
                            </div>
                            <div className="footer border-top font-lg mb-0">
                                <span>Total Amount to be Paid</span>
                                <span><strong className="rupee">&#x20B9;</strong> 00.00</span>
                            </div>
                            <div className="footer success mb-0"><p className="text-success d-flex justify-content-between font-weight-bold w-100"><span>Total Savings</span><span><strong className="rupee">&#x20B9;</strong> 00.00</span></p></div>
                            {validate.isNotEmpty(patientCartInfo.collectionCharges) && patientCartInfo.collectionCharges > 0 && patientCartInfo.collectionCharges > 0 && <div className="footer warning"><div><p className="font-weight-normal"><strong>Note:</strong> For free home collection, minimal order value is Rs {patientCartInfo.minOrderAmount}/-</p></div></div>}
                        </section>} */}
                    </div>}
                </div>
            </main>
            <footer className="footer fixed-bottom mt-auto py-2">
                <div className="container-lg container-fluid px-0 px-sm-3">
                    <div className="row align-items-center no-gutters">
                        <div className="col-12 text-right">
                            <button type="button" className="brand-secondary btn px-5 rounded-pill" onClick={() => addMoreTest()}>Add More Tests</button>
                            <button type="submit" className="btn btn-brand-gradient ml-3 px-5 rounded-pill" onClick={() => proceedFromShoppingCart()}>
                                Proceed to sample Collection
                            </button>
                        </div>
                    </div>
                </div>
            </footer>
        </React.Fragment>
    )
}

const ShoppingCartItem = (props) => {
    let shoppingCartItem = props.shoppingCartItem;
    return(
        <React.Fragment>
            {props.isProductLoading == shoppingCartItem.testCode? <div className="ph-item">
                <div className="ph-col-1 p-0">
                    <div className="ph-picture"></div>
                </div>
                <div>
                    <div className="ph-row">
                        <div className="ph-col-6"></div>
                        <div className="ph-col-4 empty"></div>
                        <div className="ph-col-2"></div>
                        <div className="ph-col-2"></div>
                        <div className="ph-col-10 empty"></div>
                        <div className="ph-col-6"></div>
                        <div className="ph-col-6 empty"></div>
                        <div className="ph-col-2"></div>
                        <div className="ph-col-10 empty"></div>
                    </div>
                </div>
            </div> 
            :
            <li className="list-group-item">
                <div className="each-test">
                    <h6>
                        {shoppingCartItem.testName}
                    </h6>
                    <p className="mb-0">
                        {shoppingCartItem.mrp != shoppingCartItem.price && 
                            <React.Fragment>
                                <small>Price &nbsp;<strong className="rupee">&#x20B9;</strong>&nbsp;<del>{parseFloat(shoppingCartItem.mrp).toFixed(2)}</del></small> &nbsp;<span className="font-weight-bold"><strong className="rupee">&#x20B9;</strong>{parseFloat(shoppingCartItem.price).toFixed(2)}</span>
                            </React.Fragment>
                        }
                        {shoppingCartItem.mrp == shoppingCartItem.price && 
                            <React.Fragment>
                                <small>Price</small> <span className="font-weight-bold"><strong className="rupee">&#x20B9;</strong>&nbsp;{parseFloat(shoppingCartItem.price).toFixed(2)}</span>
                            </React.Fragment>
                        }
                    </p>
                    <button className="action btn btn-outline-danger rounded-pill test-action" type="button" onClick={() =>props.removeShoppingCartItem(shoppingCartItem.testCode)}>
                        <span className="spinner-border spinner-border-sm d-none align-text-top" role="status" aria-hidden="true"></span>
                        <span className="sr-only"></span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20">
                            <g id="Group_5352" data-name="Group 5352" transform="translate(-180.059 -283.942)">
                                <rect id="Rectangle_3094" data-name="Rectangle 3094" width="20" height="20" transform="translate(180.059 283.942)" fill="none"></rect>
                                <g id="Group_5352-2" data-name="Group 5352" transform="translate(182.357 285.718)">
                                    <path id="Path_3051" data-name="Path 3051" d="M197.765,288.24H194.01v-.159a2.012,2.012,0,0,0-2-2.02h-2.517a2.01,2.01,0,0,0-2,2.02v.159h-4.115a.568.568,0,1,0,0,1.136h1.417v10.868a2.378,2.378,0,0,0,2.36,2.384h7.2a2.376,2.376,0,0,0,2.358-2.383V289.376h1.059a.568.568,0,0,0,0-1.136Zm-8.276-1.044h2.52a.883.883,0,0,1,.878.885v.157h-4.268v-.157A.884.884,0,0,1,189.489,287.2Zm6.1,13.048a1.245,1.245,0,0,1-1.238,1.247h-7.2a1.244,1.244,0,0,1-1.238-1.247V289.376h9.671Z" transform="translate(-182.808 -286.061)"></path>
                                    <path id="Path_3052" data-name="Path 3052" d="M192.249,301.464h.022a.6.6,0,0,0,.594-.571v-6.8a.592.592,0,1,0-1.185,0v6.753A.6.6,0,0,0,192.249,301.464Z" transform="translate(-184.33 -287.337)"></path>
                                    <path id="Path_3053" data-name="Path 3053" d="M195.276,301.47h.022a.6.6,0,0,0,.594-.571l0-.051V294.1a.592.592,0,0,0-.592-.566h-.022a.6.6,0,0,0-.57.567v6.751A.6.6,0,0,0,195.276,301.47Z" transform="translate(-184.85 -287.343)"></path>
                                    <path id="Path_3054" data-name="Path 3054" d="M189.223,301.464h.022a.6.6,0,0,0,.593-.571v-6.8a.592.592,0,1,0-1.184,0v6.753A.6.6,0,0,0,189.223,301.464Z" transform="translate(-183.811 -287.337)"></path>
                                </g>
                            </g>
                        </svg>
                        Remove
                    </button>
                </div>
            </li>}
        </React.Fragment>
    )
}

export default LabShoppingCart;