import React, { useState, useEffect, useRef } from 'react';
import moneyLogo from '../../../images/common/money.svg';
import MyAccountService from '../../../services/MyAccountService';
import LocalityService from '../../../services/LocalityService';
import Validate from '../../../helpers/Validate';
import Alert from '../../Common/Alert';
import RewardProduct from './RewardProduct';
import FlexiRewardGhostImage from './FlexiRewardGhostImage';
import RedemptionErrorLogo from '../../../images/common/redumption-error.svg';
import PaybackErrorLogo from '../../../images/common/paybackPoints-error.svg'
import ChangeLocality from '../../Locality/ChangeLocality';
import { getSelectedLocality, reloadSelectedLocalityInfo } from '../../../../redux/action/LocalityAction';
import CheckoutAction from '../../../../redux/action/CheckoutAction';
import { Modal, ModalBody, Table } from 'reactstrap';
import LocalDB from "../../../DataBase/LocalDB";
import { useDispatch, useSelector } from 'react-redux';
import LocationIcn from '../../../images/common/location-icn.png';
import PaybackLoginBanner from '../../PayBackPoints/PaybackLoginbanner';
import Cookies from "js-cookie";
import moment from "moment";
import { PaybackViewShoppingCart } from '../../../Analytics/Analytics';


const RedeemRewards = (props) => {
    const [loader, setLoader] = useState(true);
    const [redeemRewardOnlyProductsLoader, setRedeemRewardOnlyProductsLoader] = useState(false);
    const [giftProductList, setGiftProductList] = useState([]);
    const [giftCategoriesList, setGiftCategories] = useState({});
    const [currentGiftCategory, setCurrentGiftCategory] = useState("");
    const [availablePoints, setAvailablePoints] = useState("0");
    const [redeemedPoints, setRedeemedPoints] = useState("0");
    const [totalCartAmount, setTotalCartAmount] = useState("0");
    const [giftCart, setGiftCart] = useState({});
    const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
    const [errMessage, setErrMessage] = useState("");
    const myAccountService = MyAccountService();
    const validate = Validate();
    const giftCartCount = validate.isNotEmpty(giftCart) && Object.keys(giftCart).length > 0 ? Object.keys(giftCart).length : 0;
    const [isLocalityModalOpen, setLocalityModalOpen] = useState(false);
    const localityModalToggle = () => setLocalityModalOpen(!isLocalityModalOpen);
    const selectedLocality = getSelectedLocality();
    const [isCartItemDropDown, setCartItemDropDownOpen] = useState(false);
    const cartDropDownToggle = (e) => {
        if (isCartItemDropDown) {
            setCartItemDropDownOpen(false);
        } else {
            setCartItemDropDownOpen(true);
        }
    };
    const dispatch = useDispatch();
    const checkoutAction = CheckoutAction();
    const localityService = LocalityService();
    const [showModal, setShowModal] = useState(false);
    const userInfo = useSelector(state=>state && state.userInfo ? state.userInfo.userInfo : null);
    const [payBackProductIdList, setPayBackProductIdList] = useState();
    const [selectedLocalityForFlexiRewards, setSelectedLocalityForFlexiRewards] = useState(LocalDB.getObject("flexiLocality"));
    const [ isRecordsCompleted, setIsRecordsCompleted] = useState(true);
    const [ productsLoadMoreLoader, setProductsLoadMoreLoader] = useState(false);
    const miniCartRef = useRef(null);
    const miniCartToggleRef = useRef(null);
    var todayDate = new Date();
    var date = todayDate.getFullYear()+'-'+(todayDate.getMonth()+1)+'-'+todayDate.getDate();

    useEffect(() => {
        if(validate.isNotEmpty(selectedLocalityForFlexiRewards) && validate.isNotEmpty(LocalDB.getValue("SESSIONID"))) {
            LocalDB.removeValue("flexiLocality");
            if(selectedLocality.placeId === selectedLocalityForFlexiRewards.placeId) {
                getFlexiRewardsInfo();
            } else {
                setShowModal(true);
            }
        } else {
            getFlexiRewardsInfo();
        }
    }, []);

    useEffect(() => {
        document.addEventListener('click', handleClickOutsideMiniCart);
        return () => {
            document.removeEventListener('click', handleClickOutsideMiniCart);
        };
    }, [isCartItemDropDown]);

    const handleClickOutsideMiniCart = (event) => {
        if (miniCartRef && miniCartToggleRef && miniCartRef.current && !miniCartRef.current.contains(event.target) && !miniCartToggleRef.current.contains(event.target) && isCartItemDropDown) {
            setCartItemDropDownOpen(false);
        }
    };
    const changeLocalityAndReload = (locality) => {
        setShowModal(false);
        LocalDB.removeValue("flexiLocality");
        let locationObject = { pinCode: locality.pinCode, location: locality.location, placeId: locality.placeId }
        localityService.setSelectedLocality(locationObject).then(async response => {  
          if(validate.isNotEmpty(response) && response.statusCode === "SUCCESS") {
                checkoutAction.resetCheckoutDetails();
                await reloadSelectedLocalityInfo(null,null,dispatch);
            } else if("FAILURE" == response.statusCode) {
                console.log("Error: "+ response.message);
                setShowModal(false);
                getFlexiRewardsInfo();
            }
        }).catch(function(error) {
            console.log("response", error);
            setShowModal(false);
            getFlexiRewardsInfo();
        });
      }

    const getFlexiRewardsInfo = (loadMoreProductFlag) => {
        let dataObject = {};

        const giftSearchCriteria = {
            "catagoryids":[],
            "sortCode":2,
            "startIndex":0,
            "noOfRecords":12
        }
        const catalogSearchCriteria = {
            "productIds" : loadMoreProductFlag ? payBackProductIdList : [],
            "categoryId" : currentGiftCategory,
            "loadMoreProducts" : loadMoreProductFlag ? true : false,
            "startIndex" : giftProductList.length,
            "limit" : 10
        }
        setProductsLoadMoreLoader(true);
        myAccountService.getFlexiRewardsInfo(JSON.stringify( props.isPayback ? catalogSearchCriteria : giftSearchCriteria ),props.isPayback).then(response => {
            if(validate.isNotEmpty(response) && response.statusCode === "SUCCESS" && response.dataObject) {
                dataObject = response.dataObject;
                if(loadMoreProductFlag){
                    setGiftProductList([...giftProductList, ...dataObject.giftRedemptionProducts]);
                } else{
                    setGiftProductList( dataObject.giftRedemptionProducts );
                }
                if(validate.isNotEmpty(dataObject.giftSubCategories)) {
                    setGiftCategories(dataObject.giftSubCategories);
                }
                const availablePoints = validate.isNotEmpty(dataObject.customerLoylityPoints) ? dataObject.customerLoylityPoints.balance : 0;
                setAvailablePoints(parseInt(availablePoints));
                if(validate.isNotEmpty(dataObject.currentGiftCategory)) {
                    setCurrentGiftCategory(dataObject.currentGiftCategory);
                }
                if(validate.isNotEmpty(dataObject.giftItemMap)) {
                    setGiftCart(dataObject.giftItemMap);
                }
                updateRedeemedPoints(dataObject.giftItemMap);
                if(validate.isNotEmpty(dataObject.isRecordsCompleted)) {
                    setIsRecordsCompleted(dataObject.isRecordsCompleted);
                }
                if(validate.isNotEmpty(dataObject.payBackProductIdList)) {
                    setPayBackProductIdList(dataObject.payBackProductIdList);
                }
                if(validate.isNotEmpty(response.dataObject.isRedemptionAllowed) && "N" == response.dataObject.isRedemptionAllowed) {
                    setErrMessage(response.message);
                }
                if(validate.isNotEmpty(response.dataObject.REDEMPTION_ERROR)) {
                    setErrMessage(response.dataObject.REDEMPTION_ERROR);
                }
            } else if(response.statusCode === "FAILURE") {
                setErrMessage(response.message);
            } else {
                setAlertInfo({ message: response.message, type: "" });
            }
            setLoader(false);
            setProductsLoadMoreLoader(false);
        }).catch(function(error) {
            console.log("System experiencing some problem, Please try after some time");
            setLoader(false);
            setProductsLoadMoreLoader(false);
            return;
        });
    }

    const getGiftCategoryproducts = (categoryId) => {
        //setLoader(true);
        setRedeemRewardOnlyProductsLoader(true);
        setProductsLoadMoreLoader(true);
        if(validate.isEmpty(categoryId)) {
            return;
        }
        const catalogSearchCriteria = {
            "productIds" : [],
            "categoryId" : categoryId,
            "loadMoreProducts" : false,
            "limit" : 10
        }
        myAccountService.getGiftCategoryProducts({"categoryId":categoryId},props.isPayback,JSON.stringify(catalogSearchCriteria)).then(response => {
            if(validate.isNotEmpty(response) && response.statusCode === "SUCCESS" && response.dataObject) {
                let dataObject = response.dataObject;
                if(props.isPayback){
                    if(validate.isNotEmpty(dataObject.giftRedemptionProducts)){
                        setGiftProductList(dataObject.giftRedemptionProducts);
                    }
                    if(validate.isNotEmpty(dataObject.payBackProductIdList)){
                        setPayBackProductIdList(dataObject.payBackProductIdList);
                    }
                    if(validate.isNotEmpty(dataObject.currentGiftCategory)){
                        setCurrentGiftCategory(dataObject.currentGiftCategory);
                    }
                    if(validate.isNotEmpty(dataObject.isRecordsCompleted)) {
                        setIsRecordsCompleted(dataObject.isRecordsCompleted);
                    }
                }
                else{
                    if(validate.isNotEmpty(dataObject.productList)){
                        setGiftProductList(dataObject.productList);
                    }
                }
                if(validate.isNotEmpty(dataObject.currentGiftCategory)){
                    setCurrentGiftCategory(dataObject.currentGiftCategory);
                }
            }
            else {
                setAlertInfo({ message: response.message, type: "" });
            }
            //setLoader(false);
            setRedeemRewardOnlyProductsLoader(false);
            setProductsLoadMoreLoader(false);
        }).catch(function(error) {
            console.log("System experiencing some problem, Please try after some time");
            //setLoader(false);
            setRedeemRewardOnlyProductsLoader(false);
            setProductsLoadMoreLoader(false);
            return;
        });
    }

    const updateRedeemedPoints = (giftItemMap) => {
        if(validate.isNotEmpty(giftItemMap)) {
            let totalRedeemedPoints = 0;
            let totalCartAmount = 0;
            Object.keys(giftItemMap).filter(Id => {
                if(props.isPayback){
                    totalRedeemedPoints = totalRedeemedPoints + parseInt(giftItemMap[Id].paybackPoints * giftItemMap[Id].quantity);
                    totalCartAmount = totalCartAmount + (giftItemMap[Id].mrp * giftItemMap[Id].quantity);
                }
                else{
                    totalRedeemedPoints = totalRedeemedPoints + parseInt(giftItemMap[Id].points * giftItemMap[Id].quantity);
                }
            });
            setRedeemedPoints(parseInt(totalRedeemedPoints));
            setTotalCartAmount(parseFloat(totalCartAmount).toFixed(2));
        } else {
            setRedeemedPoints("0");
            setTotalCartAmount("0");
        }
    }

    const updateCart = (dataObject) => {
        setGiftCart(dataObject["giftItemMap"]);
		updateRedeemedPoints(dataObject["giftItemMap"]);
    }

    const showAlert = (message) => {
        setAlertInfo({ message: message, type: "" });
    }

    const goToShoppingCart = () => {
        if(props.isPayback){
            PaybackViewShoppingCart("View Shopping Cart")
            props.history.push('/payback/cart')
        }else{
            props.history.push('/flexiCart')
        }
        
    }

    const clearShoppingCart = () => {
        if(props.isPayback) {
            PaybackViewShoppingCart('Clear Cart')
        }
        MyAccountService().clearFlexiCart(props.isPayback).then(response => {
            if(validate.isNotEmpty(response) && response.statusCode === "SUCCESS") {
                setGiftCart(response.dataObject["giftItemMap"]);
                updateRedeemedPoints(response.dataObject["giftItemMap"]);
            }
        }).catch(function(error) {
            console.log("System experiencing some problem, Please try after some time");
            setLoader(false);
            return;
        });
    }

    const getCategoryProducts = (categoryId) => {
        if(currentGiftCategory != categoryId){
            getGiftCategoryproducts(categoryId);
            setCurrentGiftCategory(categoryId);
        }
    }

    return (
        <React.Fragment>
            {!loader && <div id="redeemRewards">
                {errMessage && 
                    <div className="no-health-records body-height">
                    {!props.isPayback && <img className="mb-3" alt="Redemption Error Logo" title="Redemption Error Logo" src={RedemptionErrorLogo}></img> }
                    {props.isPayback && <img className='mb-3' alt="Payback Error Logo" title='Payback Error Logo' src={PaybackErrorLogo}/>}
                    <h6 className="mb-0">{errMessage == "NON_SERVING_LOCALITY" ? "Service is not available for this locality" : errMessage}</h6>
                    {errMessage == "NON_SERVING_LOCALITY" && <button className="mt-3 btn btn-brand-gradient rounded-pill px-5 custom-btn-lg" onClick={()=>localityModalToggle()}>Change Locality</button>}
                </div> 
                }
                {!errMessage && <div className={props.isPayback ? "body redeem-reward pt-2" : "body redeem-reward"}>
                    {(validate.isEmpty(userInfo) || validate.isEmpty(userInfo.medplusId)) && <PaybackLoginBanner/>}
                    {validate.isNotEmpty(userInfo) && validate.isNotEmpty(userInfo.medplusId) &&
                        <div className="point-summary">
                            <img alt="money" src={moneyLogo}></img>
                            <h6 className="title">
                                {props.isPayback ?  <strong>MedPlus Payback Points Summary</strong> :  <strong>Rewards Points Summary</strong>}
                                <p className="d-flex align-items-center">{props.isPayback ? "Total MedPlus Payback points available as on" : "Total available points for redemption as on"} {moment(date).format("MMM DD, YYYY")} <strong className='display-3'>{parseInt(availablePoints)}</strong> points</p>
                            </h6>
                            <div className="cart" ref={miniCartToggleRef} id="cartIcon" onClick={(event) =>cartDropDownToggle(event)}>
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" xmlSpace="preserve">
                                    <g>
                                        <polyline className="st0" points="1,1 4,1 7.1,12.5 8,16 21,16 "></polyline>
                                        <polyline className="st0" points="5,4 23,4 20,13 8,13 	"></polyline>
                                    </g>
                                    <g>
                                        <path fill="#fff" d="M11,20c0.6,0,1,0.4,1,1s-0.4,1-1,1s-1-0.4-1-1S10.4,20,11,20 M11,18.4c-1.4,0-2.6,1.2-2.6,2.6s1.2,2.6,2.6,2.6 s2.6-1.2,2.6-2.6S12.4,18.4,11,18.4L11,18.4z"></path>
                                    </g>
                                    <g>
                                        <path  fill="#fff" d="M18,20c0.6,0,1,0.4,1,1s-0.4,1-1,1s-1-0.4-1-1S17.4,20,18,20 M18,18.4c-1.4,0-2.6,1.2-2.6,2.6s1.2,2.6,2.6,2.6 s2.6-1.2,2.6-2.6S19.4,18.4,18,18.4L18,18.4z"></path>
                                    </g>
                                </svg>
                                <div className="cart-count">{giftCartCount}</div>
                            </div>

                            {isCartItemDropDown && 
                                <div className="flexi-minicart dropdown-menu dropdown-menu-right show" ref={miniCartRef}>
                                    {validate.isNotEmpty(giftCart) && 
                                        <div className="minicart p-0">
                                            <span className="caret"></span>
                                            <div className="header p-3" >
                                                <h6 >
                                                    Current Order
                                                </h6>
                                                <a href="javascript:void(0);" onClick={() => clearShoppingCart()} >Clear Cart</a>
                                            </div>
                                            <div className="table-header m-3" >
                                                <h6 >
                                                    Product Name
                                                </h6>
                                                <h6 >Qty (Packs)</h6>
                                            </div>
                                            <div className="cartscrolldiv border rounded">
                                                <Table className="table table-hover" >
                                                    <tbody>
                                                        {Object.keys(giftCart).map(productId => {
                                                            return (<tr key={productId}>
                                                                <td className="col-sm-6 col-md-6">
                                                                    {giftCart[productId].productName}
                                                                </td>
                                                                <td className="col-sm-1 col-md-1 text-right" >
                                                                    {giftCart[productId].quantity}
                                                                </td>
                                                            </tr>)
                                                        })}
                                                    </tbody>
                                                </Table>
                                            </div>
                                            <div>
                                                <button className="border-0 btn btn-block btn-brand-gradient" type="button" id="pharmaCheckOutBtn" onClick={()=>goToShoppingCart()} >View Shopping Cart</button>
                                            </div>
                                        </div>
                                    }
                                    {validate.isEmpty(giftCart) && 
                                        <React.Fragment>
                                            <span className="caret"></span>
                                            <p className="m-3 padding-all margin-t-20 alert alert-info"> You have not added any products to Cart </p>
                                        </React.Fragment>
                                    }
                                </div>
                            }
                            {/* <UncontrolledDropdown >
                                <DropdownToggle>
                                    <div className="cart" id="cartIcon">
                                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 24 24" xmlSpace="preserve">
                                            <g>
                                                <polyline className="st0" points="1,1 4,1 7.1,12.5 8,16 21,16 "></polyline>
                                                <polyline className="st0" points="5,4 23,4 20,13 8,13 	"></polyline>
                                            </g>
                                            <g>
                                                <path fill="#fff" d="M11,20c0.6,0,1,0.4,1,1s-0.4,1-1,1s-1-0.4-1-1S10.4,20,11,20 M11,18.4c-1.4,0-2.6,1.2-2.6,2.6s1.2,2.6,2.6,2.6 s2.6-1.2,2.6-2.6S12.4,18.4,11,18.4L11,18.4z"></path>
                                            </g>
                                            <g>
                                                <path  fill="#fff" d="M18,20c0.6,0,1,0.4,1,1s-0.4,1-1,1s-1-0.4-1-1S17.4,20,18,20 M18,18.4c-1.4,0-2.6,1.2-2.6,2.6s1.2,2.6,2.6,2.6 s2.6-1.2,2.6-2.6S19.4,18.4,18,18.4L18,18.4z"></path>
                                            </g>
                                        </svg>
                                        <div className="cart-count">{giftCartCount}</div>
                                    </div>
                                </DropdownToggle>
                                <DropdownMenu>
                                    {validate.isNotEmpty(giftCart) && <div className="minicart p-0">
                                        <span className="caret"></span>
                                        <div className="header p-3" >
                                            <h6 >
                                                Current Order
                                            </h6>
                                            <a href="javascript:void(0);" onClick={() => props.clearShoppingCart()} >Clear Cart</a>
                                        </div>
                                        <div className="table-header m-3" >
                                            <h6 >
                                                Product Name
                                            </h6>
                                            <h6 >Qty</h6>
                                        </div>
                                        <div className="cartscrolldiv">
                                            <div className="border rounded">
                                                <Table className="table table-hover" >
                                                    <tbody>
                                                        {Object.keys(giftCart).map(productId => {
                                                            return (<tr key={productId}>
                                                                <td className="col-sm-6 col-md-6">
                                                                    {giftCart[productId].productName}
                                                                </td>
                                                                <td className="col-sm-1 col-md-1 text-right" >
                                                                    {giftCart[productId].quantity}
                                                                </td>
                                                            </tr>)
                                                        })}
                                                    </tbody>
                                                </Table>
                                            </div>
                                        </div>
                                        <div>
                                            <button className="btn  btn-brand  btn-block" type="button" id="pharmaCheckOutBtn" onClick={() => props.history.push('/flexiCart')} >View Shopping Cart</button>
                                        </div>
                                    </div>}
                                    {validate.isEmpty(giftCart) && <span className="caret"><p className="m-3"> You have not added any products to Cart </p></span>}
                                </DropdownMenu>
                            </UncontrolledDropdown> */}
                                    
                            {validate.isNotEmpty(giftCart) && <p className="redeemed-points-text">{props.isPayback ? "Available MedPlus Payback points" : "Available Points"} <strong>&nbsp; {parseInt(availablePoints-redeemedPoints)}</strong> 
                                <span className="dot-separator text-dark"></span> {!props.isPayback ? <span >Redeemed Points </span> : <span>For product(s) in cart</span> } 
                                {props.isPayback ?  <strong> &nbsp;<span className='rupee'>&#x20B9;</span>{parseFloat(totalCartAmount).toFixed(2)} +&nbsp;{parseInt(redeemedPoints)} Pts</strong> :  <strong> &nbsp;{parseInt(redeemedPoints)}</strong>}
                            </p>}
                        </div>
                    }
                    {giftCategoriesList && <div className="scrollmenu mb-3">
                        {Object.keys(giftCategoriesList).map((eachCategoryId) => {
                            return (<button key={eachCategoryId} title={giftCategoriesList[eachCategoryId]} className={`btn btn-badge ${currentGiftCategory == eachCategoryId ? "active" : ""}`} role="button" value={giftCategoriesList[eachCategoryId]} onClick={() => getCategoryProducts(eachCategoryId)}>{giftCategoriesList[eachCategoryId]}</button>)
                        })}
                        {/* {giftCategoriesList.map((eachCategory, index) =>
                            <button key={index} title={eachCategory.CategoryName} className={`btn btn-badge ${currentGiftCategory == eachCategory.CategoryId ? "active" : ""}`} role="button" value={eachCategory.CategoryName} onClick={() => getGiftCategoryproducts(eachCategory.CategoryId)}>{eachCategory.CategoryName.toLowerCase()}</button>
                        )} */}
                    </div>}
                   { !redeemRewardOnlyProductsLoader && <div className="row m-0 px-2 mt-n2 pb-2">
                        {validate.isNotEmpty(giftProductList) && giftProductList.map(product => {
                            const cartQty = (validate.isNotEmpty(giftCart) && validate.isNotEmpty(giftCart[product.productId])) ? parseInt(giftCart[product.productId].quantity) : 1;
                            return(product &&
                                <RewardProduct product={product} 
                                    setCartItemDropDownOpen={setCartItemDropDownOpen}
                                    key={product.productId} 
                                    cartQty={cartQty}
                                    isAddedToCart={validate.isNotEmpty(giftCart) && validate.isNotEmpty(giftCart[product.productId])}
                                    showAlert={showAlert} updateCart={updateCart} isPayback = {props.isPayback}>
                                </RewardProduct>
                            )
                        })}
                    </div> }
                    <FlexiRewardGhostImage redeemRewardOnlyProductsLoader={redeemRewardOnlyProductsLoader}></FlexiRewardGhostImage>
                    { (props.isPayback && !isRecordsCompleted ) && <div className='px-3 mt-2 pb-4'>
                        <button className='brand-secondary btn px-5 rounded-pill btn-block custom-btn-lg' onClick={()=>getFlexiRewardsInfo(true)} disabled={productsLoadMoreLoader}>
                            {productsLoadMoreLoader ?
                            <React.Fragment>
                                <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                                <span className="sr-only"></span>
                            </React.Fragment> : 
                            "Load More Products"
                        }
                        </button>
                    </div>}
                </div>}
            </div>}
            {showModal &&
                <Modal className="modal-dialog-centered refill-interval-popup" backdrop="static" isOpen={showModal} toggle={()=>setShowModal(!showModal)} style={{paddingRight: "15px"}}>
                    <ModalBody className="modal-body">
                        <img srcSet={LocationIcn}/>
                        <h5><strong>Modify Service Locality</strong></h5>
                        <p>Your current locality is <strong>{selectedLocality.combination.split(',')[0]}</strong>.
                        To change your current locality to <strong>{selectedLocalityForFlexiRewards.location.split(',')[0]}</strong> <a className="text-primary pointer" title="Click here to change locality" onClick={() => changeLocalityAndReload(selectedLocalityForFlexiRewards)}><strong>Click here</strong></a></p>
                        <button type="button" className="btn btn-brand-gradient rounded-pill px-3 ml-2" onClick={()=>{LocalDB.removeValue("flexiLocality");setShowModal(false);getFlexiRewardsInfo();}}>Proceed with current Locality</button>
                    </ModalBody>
                </Modal>
            }
            <Alert alertInfo={alertInfo} duration={5000} onDurationEnd={setAlertInfo}/>
            <FlexiRewardGhostImage redeemRewardLoader={loader}></FlexiRewardGhostImage>
            {validate.isNotEmpty(selectedLocality) && <ChangeLocality modal={isLocalityModalOpen} toggle={localityModalToggle} selectedLocality={selectedLocality}/>}
        </React.Fragment>
    )
}
export default RedeemRewards;