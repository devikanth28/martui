import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Validate from "../../../../../helpers/Validate";
import LabCheckOutService from "../../../Services/LabCheckoutService";
import LabNewCheckoutAction from "../../../redux/action/LabNewCheckoutAction";
import Alert from "../../../../Common/Alert";
import {sendAddToCartEvent} from '../../../../../Analytics/Analytics';
import LocalDB from "../../../../../DataBase/LocalDB";
import SignInPopUp from "../../../../Common/signInModelBox/SignInPopUp";

const BookTestButton = (props) => {
    const validate = Validate();
    const labCheckOutService = LabCheckOutService();
    const [isTestExists, setIsTestExists] = useState(false);
    const [loader,setLoader] = useState('');
    const [alertData, setAlertData] = useState({});
    const labCheckoutAction = LabNewCheckoutAction();
    const labShoppingCart = labCheckoutAction.getLabShoppingCart();
    const [isPopUpOpen, setPopUpOpen] = useState(false);

    const customerId = useSelector(state=>{
        if(validate.isNotEmpty(state.userInfo) && validate.isNotEmpty(state.userInfo.userInfo) && validate.isNotEmpty(state.userInfo.userInfo.medplusId)){
            return state.userInfo.userInfo.medplusId;
        }
    });

    useEffect(() => {
        checkIsTestExist();
    }, [labShoppingCart]);

    const checkIsTestExist = () => {
        if (validate.isNotEmpty(labShoppingCart) && validate.isNotEmpty(labShoppingCart.shoppingCartItems)) {
            labShoppingCart.shoppingCartItems.forEach(cartItem => {
                if (cartItem.testCode == props.testCode) {
                    setIsTestExists(true);
                }
            });
        } else {
            setIsTestExists(false);
        }
    }

    const addToCart = async (event) => {
        setLoader(true);
        let addTestToCartData = { testId : props.testCode, customerId : customerId }
        await labCheckOutService.addTestToCart(addTestToCartData).then((data)=>{
            setLoader(false);
            if(validate.isNotEmpty(data)){
                if(data.statusCode == 'SUCCESS' && validate.isNotEmpty(data.responseData) && validate.isNotEmpty(data.responseData.shoppingCart)){
                     labCheckoutAction.saveLabShoppingCart(data.responseData.shoppingCart);
                     sendAddToCartEvent(data.responseData.shoppingCart.shoppingCartItems.filter(each=>(each.testCode == props.testCode))[0].testName);
                     setIsTestExists(true); 
                }else {
                    setAlertData({message:data.message,type:'danger'});
                    console.log("Unable to add test to cart");
                }
            }
        }).catch((error) => { 
            setAlertData({message:"Unable to add test to cart",type:'danger'});
            console.log(error);
            setLoader(false);
        })
        if(event){
            event.stopPropagation();
        }
    };

    //Remove this method later
    const removeFromCart = (event) => {
        setLoader(true);
        labCheckOutService.removeTestFromCart(props.testCode).then((data)=>{
            setLoader(false);
            if(validate.isNotEmpty(data)){
                if(data.statusCode == 'SUCCESS'){
                    if(validate.isNotEmpty(data.responseData) && validate.isNotEmpty(data.responseData.shoppingCart)){
                        labCheckoutAction.saveLabShoppingCart(data.responseData.shoppingCart);
                    }else {
                        labCheckoutAction.clearLabShoppingCart();
                    }
                    setIsTestExists(false); 
                }else if("FAILURE" == data.statusCode && validate.isNotEmpty(data.message) && "Lab Shopping Cart is empty" === data.message) {
                    setIsTestExists(false);
                    labCheckoutAction.clearLabShoppingCart();
                }else {
                    setAlertData({message:data.message,type:'danger'});
                }
            }
        }).catch((error) => {
            setAlertData({message:"Unable to remove test from cart",type:'danger'});
            console.log(error);
            setLoader(false);
        })
        event.stopPropagation();
    };

    const clearError = () => {
        setAlertData({});
    }

    const handleClickOnAddCart = (e) => {
         e.preventDefault();
        if (validate.isNotEmpty(customerId)) {
            if (!isTestExists) {
                //sendAddToCartEvent(e)
                addToCart(e);
            }
        } else {
            openSigninpopup();
        }
    }


    const openSigninpopup = () =>{
        LocalDB.setValue("fromPage", window.location.href);
        LocalDB.setValue("toPage", -1);
        setPopUpOpen(!isPopUpOpen);
    }

    return (
        <React.Fragment>
            { alertData && alertData.message && <Alert alertInfo={alertData} onDurationEnd={clearError} duration = {5000} />}           
            { props.available && <button role="button" type="button" style={validate.isNotEmpty(props.customStyle) ? props.customStyle : {}} className={validate.isNotEmpty(props.classStyle) ? props.classStyle : "btn btn-block btn-brand-gradient rounded-pill"} disabled={loader}  onClick={(event) => handleClickOnAddCart(event)}>
                {loader ? 
                    <React.Fragment>
                        <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                        <span className="sr-only"></span>
                    </React.Fragment>
                    : <React.Fragment>{!isTestExists ? 
                        "Add to Cart" 
                        :
                        <React.Fragment>
                            Added 
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 18 18" class="align-text-top ml-2">
                                <g id="tickmark_black_icon_18px" transform="translate(-1458 -558)">
                                <path id="check" d="M18,6,8.375,15.625,4,11.25" transform="translate(1456 556)" fill="rgba(0,0,0,0)" stroke={validate.isNotEmpty(props.classStyle) && props.classStyle =='btn brand-secondary border-0' ? "#E71C37" : '#fff'} stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                                </g>
                            </svg>
                        </React.Fragment>}
                    </React.Fragment>
                }
            </button>}
            { isPopUpOpen && <SignInPopUp addToDiagnosticCart={addToCart} {...props} setPopUpOpen={setPopUpOpen} displayLogo={true}/> }
        </React.Fragment>)
}

export default BookTestButton