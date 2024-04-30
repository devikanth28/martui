import React, { useState, useEffect } from 'react';
import Alert from '../../Common/Alert';
import MyAccountService from '../../../services/MyAccountService';
import Validate from '../../../helpers/Validate';
import CONFIG from '../../../constants/ServerConfig';
import ShoppingCartGhostImage from '../../ShoppingCart/ShoppingCartGhostImage';
import FlexiCartItems from '../../MyAccount/FlexiRewards/FlexiCartItems';
import FlexiCartSummary from '../../MyAccount/FlexiRewards/FlexiCartSummary';
import { PaybackCartBackEvent ,PaybackCartProceedEvent , PaybackRemoveProduct } from '../../../Analytics/Analytics';

const FlexiCart = (props) => {
    const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
    const myAccountService = MyAccountService();
    const [totalBalancePoints, setTotalBalancePoints] = useState({});
    const [totalGiftCartPoints, setTotalGiftCartPoints] = useState({});
    const [giftItemMap, setGiftItemMap] = useState({});
    const [totalAmount, setTotalAmount] = useState();
    const [totalDiscount, setTotalDiscount] = useState();

    //const [isInStock, setInStock] = useState(true);
    const validate = Validate();
    const [isCartProductsLoading, setCartProductsLoading] = useState(false);
    const [showErrorMsg, setShowErrorMsg] = useState(false);
    const [isAddToCartLoading, setAddToCartLoading] = useState(undefined);
    const isPayback = props.isPayback;

    useEffect(() => {
       getGiftCart();
    }, []);

    const getGiftCart = ()=> {
        setCartProductsLoading(true);
        myAccountService.getGiftCartInfo(isPayback).then(response => {
            setCartProductsLoading(false);
            if(validate.isNotEmpty(response) && response.statusCode == "SUCCESS"){
                setTotalBalancePoints(response.dataObject.totalBalancePoints);
                setTotalGiftCartPoints(response.dataObject.totalGiftCartPoints);
                setGiftItemMap(response.dataObject.giftItemMap);
                setTotalAmount(response.dataObject.totalAmount);
                setTotalDiscount(response.dataObject.totalDiscount);
                //(response.dataObject.isInStock);
            }else if(validate.isNotEmpty(response) && response.statusCode == "FAILURE" && response.message == "Empty gift cart"){
                setAlertInfo({ message: "Empty gift cart", type: "" });
                goBack();
            }else if(validate.isNotEmpty(response) && response.statusCode == "FAILURE" && response.message == "Please login for cart products"){
                setAlertInfo({ message: response.message, type: "" });
                window.location.href = isPayback ? CONFIG.REDIRECT_HOME_URL+"paybackspecialsale" : CONFIG.REDIRECT_HOME_URL;
            }else if(response.message == "Redemption not allowed in your locality."){
                setShowErrorMsg(true);
                setAlertInfo({ message: response.message, type: "" });
                window.location.href = isPayback ? CONFIG.REDIRECT_HOME_URL+"paybackspecialsale" : CONFIG.REDIRECT_HOME_URL
            }else if(response.statusCode == "WARNING"){
                setShowErrorMsg(true);
                setAlertInfo({ message: response.message, type: "" });
            }else{
                setAlertInfo({ message: response.message, type: "" });
                goBack();
            }
            
        }).catch(function(error) {
            console.log(error);
            setAlertInfo({ message: "System experiencing some problem, Please try after some time", type: "" });
            setCartProductsLoading(false);
        });
    }

    const modifyGiftCart = (productId, requestedQty) => {
        setAddToCartLoading(productId+"Add");
        myAccountService.addRewardProduct(productId, requestedQty, isPayback).then(response => {
            if(validate.isNotEmpty(response) && response.statusCode == "SUCCESS"){
                getGiftCart();
            }else if(validate.isNotEmpty(response) && response.statusCode == "FAILURE"){
                setAlertInfo({ message: response.message, type: "" });
            }
            setAddToCartLoading(undefined);
        }).catch(function(error) {
            console.log(error);
            setAddToCartLoading(undefined);
            setAlertInfo({ message: "System experiencing some problem, Please try after some time", type: "" });
        });
        
    }

    const removeRewardProductFromCart = (productId, requestedQty) => {
        if(isPayback && (productId in giftItemMap)) {
            let productDetail = giftItemMap[productId]
            if('productName' in productDetail) {
                PaybackRemoveProduct(productDetail['productName'])
            }
        }
        setAddToCartLoading(productId+"Remove");
        myAccountService.removeRewardProduct(productId,isPayback).then(response => {
            if(validate.isNotEmpty(response) && response.statusCode == "SUCCESS"){
                if(props.isPayback){
                    getGiftCart();
                } else {
                    setTotalBalancePoints(response.dataObject.totalBalancePoints);
                    setTotalGiftCartPoints(response.dataObject.totalGiftCartPoints);
                    setGiftItemMap(response.dataObject.giftItemMap);
                    if(validate.isEmpty(response.dataObject.giftItemMap) || response.dataObject.totalGiftCartPoints == 0){
                        goBack();
                    }
                }
            }else if(validate.isNotEmpty(response) && response.statusCode == "FAILURE" && response.message == "Empty Gift Cart"){
                goBack();
            }else if(validate.isNotEmpty(response) && response.statusCode == "FAILURE"){
                setAlertInfo({ message: response.message, type: "" });
            }
            setAddToCartLoading(undefined);
        }).catch(function(error) {
            setAddToCartLoading(undefined);
            console.log(error);
            setAlertInfo({ message: "System experiencing some problem, Please try after some time", type: "" });
        });
    }

    const goBack = () => {
        if(isPayback){
            window.location.href = "/paybackspecialsale" ;
        }else{
            window.location.href = "/redeemRewards" ;
        }
    }
    const selectDeliveryType = () => {
        if(isPayback){
            props.history.push('/payback/store');
        }else{
            props.history.push('/flexiDelivery');
        }
    }
    return (
        <React.Fragment>
            <Alert alertInfo={alertInfo} duration={5000} onDurationEnd={setAlertInfo}/>
            {isCartProductsLoading &&
                <div className="container">
                    <div className="row">
                        <ShoppingCartGhostImage isCartProductsLoading={isCartProductsLoading}></ShoppingCartGhostImage>
                    </div>
                </div>
            }
            {!isCartProductsLoading &&
                <React.Fragment>
                   {!showErrorMsg && 
                        <main role="main" className="container">
                            <div className="row">
                                <div className="col-8 pl-0 pr-2">
                                    {giftItemMap && <FlexiCartItems giftItemMap={giftItemMap} isAddToCartLoading={isAddToCartLoading}
                                        modifyGiftCart={modifyGiftCart} isPayback ={props.isPayback} removeRewardProduct={removeRewardProductFromCart}></FlexiCartItems> }
                                </div>
                                <div className="col-4 pl-0 pr-2">
                                {giftItemMap && <FlexiCartSummary totalAmount={totalAmount} totalDiscount={totalDiscount} isPayback ={props.isPayback} giftItemMap={giftItemMap} totalBalancePoints={totalBalancePoints} totalGiftCartPoints={totalGiftCartPoints} ></FlexiCartSummary>}
                                </div>
                            </div>
                        </main> 
                     }
                   
                    <footer className="footer fixed-bottom mt-auto py-2">
                        <div className="container px-0">
                            <div className="row align-items-center no-gutters">
                                <div className="col-6"></div>
                                <div className="col-6 text-right">
                                    <button type="button" className="brand-secondary btn px-5 rounded-pill custom-btn-lg"  onClick={() => {PaybackCartBackEvent();goBack()}}>Back</button>
                                    {!showErrorMsg && <button type="sumnit" className="btn btn-brand-gradient rounded-pill px-5 ml-3 custom-btn-lg"  onClick={() => {PaybackCartProceedEvent();selectDeliveryType()}}>Proceed</button>}
                                </div>
                            </div>
                        </div>
                    </footer>
                </React.Fragment>
            }
        </React.Fragment>
    )
}

export default FlexiCart;