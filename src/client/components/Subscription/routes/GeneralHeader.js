import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MartImg from '../../../images/common/mart-identity-cssbg.svg';
import Validate from '../../../helpers/Validate';
import { getLabSelectedLocality, getSelectedLocality, reloadSelectedLocalityInfo } from '../../../../redux/action/LocalityAction';
import MiniCart from '../../Common/MiniCart';
import CommonHeaderService from '../../../services/CommonHeaderService';
import UserInfoAction from '../../../../redux/action/UserInfoAction';
import ProductSearch from '../../Common/ProductSearch';
import CONFIG from '../../../constants/ServerConfig';
import CategoryNavigation from '../../Common/CategoryNavigation';
import ChangeLocality from '../../Locality/ChangeLocality';
import { Helmet } from 'react-helmet';
import CartAction from '../../../../redux/action/CartAction';
import { Tooltip } from 'reactstrap';
import MyAccountRightMenu from '../../Common/MyAccountRightMenu';
import LocalityService from '../../../services/LocalityService';
import LocalDB from '../../../DataBase/LocalDB';
import LabMiniCart from '../../MedplusLabs/components/Common/LabMiniCart'
import { CLEAR_DATA } from '../redux/SubscriptionReducer';
import LabCatalogService from '../../MedplusLabs/Services/LabCatalogService';
import {SET_SUBSCRIBED} from '../../MedplusLabs/redux/reducer/LabCatalogReducer';
import Cookies from "js-cookie";
import CommonSearch from '../../../commonComponents/CommonSearch';
import {sendPrescriptionEvent} from '../../../Analytics/Analytics'
import WalletHeaderImg from '../../../images/common/walletheader-cssbg.svg';
import MartCatalogService from '../../../MedplusMart/services/MartCatalogService';
import { RESET_MART_CATALOG_DATA, SET_MART_CATALOG_DATA } from '../../../../redux/reducer/MedplusCatalogReducer';
import { Link } from 'react-router-dom';
import MegaDropdown from '../../Common/MegaDropdown';
import NotificationBell from '../../../commonComponents/NotificationBell';
const GeneralHeader = (props) => {
    const dispatch = useDispatch();
    const validate = Validate();
    const userInfoAction = UserInfoAction();
    const cartAction = CartAction();
    var userInfo = userInfoAction.getUserInfo();
    const selectedLocality = getSelectedLocality();
    const selectedLabLocality = getLabSelectedLocality();
    const commonHeaderService = CommonHeaderService();
    const [isAdminUser,setIsAdminUser] = useState();
    const [shoppingCartItem, setShoppingCartItem] = useState([]);
    const [loader, setLoader] = useState(true);
    const [localitionTitle, setLocalitionTitle] = useState(false);
    const [mWalletInfo, setMWalletInfo] = useState({});
    const [refreshMWallet, setRefreshMWallet] = useState(true);
    const isPrescriptionUploadEnabled = !props.isDoctorPage;
    const labCatalogService = LabCatalogService();
    const cartItems = useSelector(state=> state.cart && state.cart.shoppingCartItem ? state.cart.shoppingCartItem : null);
    const martCatalogService = MartCatalogService();
    const martCategoriesFromRedux = useSelector((state) => (validate.isNotEmpty(state) && validate.isNotEmpty(state.medplusCatalog) && validate.isNotEmpty(state.medplusCatalog.martCatalog)) ? state.medplusCatalog.martCatalog : {});
    const catalogCategoryies = (validate.isNotEmpty(selectedLocality) && validate.isNotEmpty(selectedLocality['catalogId'])) ? martCategoriesFromRedux[selectedLocality['catalogId']] : validate.isNotEmpty(martCategoriesFromRedux['CATALOG_DFT1']) ? martCategoriesFromRedux['CATALOG_DFT1'] : {};
    let assestsUrl = process.env.ASSETS_URL;
    const [hideHealthStoreDropdown, setHideHealthStoreDropdown] = useState(false);

    useEffect(()=>{
        setLoader(true);
        if (props.routePath === "signInPopUp" && validate.isNotEmpty(LocalDB.getValue('customerId')) && validate.isNotEmpty(LocalDB.getValue("SESSIONID"))) {
            if (window.history.length < 3) {
                window.location.href = CONFIG.REDIRECT_HOME_URL;
            } else {
                let url = LocalDB.getValue("fromPage");
                LocalDB.removeValue("fromPage");
                if(url) {
                    window.location.href = url;
                } else {
                    props.history.go(-1);
                }
            }
        } else {
            if(validate.isNotEmpty(userInfo) && userInfo.adminUser){
                setIsAdminUser(userInfo.adminUser);
                Cookies.set("tokenId", LocalDB.getValue("SESSIONID"), {path: '/' });
            } else {
                setIsAdminUser(false);
            }
            if (validate.isNotEmpty(userInfo) && validate.isNotEmpty(userInfo.userLoginId)) {
               if (props.isMartPage) {
                    getMWalletAmount();
                } else {
                    getSubscriptionStatus();
                }
            } else {
                userInfoAction.resetUserInfo();
                dispatch({ type: CLEAR_DATA });
            }
            if(props.isMartPage){
                cartAction.updateShoppingCartInfo();
            }
            setLoader(false);
        }
    },[]);

    useEffect(()=>{
        let catalogId = '';
        if(validate.isNotEmpty(selectedLocality)){
            catalogId=selectedLocality.catalogId;
        }
        if(validate.isEmpty(catalogId)){
            catalogId = "CATALOG_DFT1";
        }
        if(validate.isNotEmpty(selectedLocality) && validate.isEmpty(martCategoriesFromRedux[catalogId])){
            getMartCategories();
        }
    }, [selectedLocality])
    
    const getMartCategories = () => {
        dispatch({type:RESET_MART_CATALOG_DATA})
            martCatalogService.getCatalogCategories().then((data) => {
                if (data && data.statusCode == "SUCCESS" && data.dataObject) {
                    let catalogId = validate.isNotEmpty(selectedLocality) && validate.isNotEmpty(selectedLocality['catalogId']) ? selectedLocality['catalogId'] : 'CATALOG_DFT1';
                    dispatch({type:SET_MART_CATALOG_DATA ,catalogId:catalogId,data:data.dataObject});
                }
            }).catch((err)=>{
                console.log(err);
            });
    };

    const getMWalletAmount = () => {
        if(refreshMWallet){
            commonHeaderService.getMWalletAmount().then(response => {
                if(validate.isNotEmpty(response) && "SUCCESS" == response.message) {
                   if(validate.isNotEmpty(mWalletInfo) && mWalletInfo.mwalletAmount != response.dataObject.mwalletAmount ||  mWalletInfo.flexiAmount != response.dataObject.flexiAmount){
                        setMWalletInfo(response.dataObject);
                  }
                }else{
                    setMWalletInfo({});
                }
            }).catch(function(error) {
                console.log("System experiencing some problem, Please try after some time");
                return;
            });
       
            if(props.routePath == "myWallet"){
                setRefreshMWallet(false);   
            }
        }else if(!refreshMWallet && props.routePath != "myWallet"){
            setRefreshMWallet(true);
        }
    }

    const getSubscriptionStatus = () => {
        labCatalogService.getSubscriptionStatus({}).then((res)=>{
            if (res.dataObject) {
                dispatch({type: SET_SUBSCRIBED,data: res.dataObject.active});            
            } else {
                dispatch({type: SET_SUBSCRIBED,data: false});
             }
        }).catch((error) => {
            console.log(error);
        })
    } 
   
    const toggleLocaltionTitle = () => setLocalitionTitle(!localitionTitle);

    const [localityAvailability, setLocalityAvailability] = useState('');
    const [labLocalityAvailability, setLabLocalityAvailability] = useState('');
    useEffect(()=>{
        if(validate.isNotEmpty(selectedLocality)) {
            if("C" === selectedLocality.configType) {
                setLocalityAvailability(`Drop Off Point: ${selectedLocality.dropOffPoint}`);
            } else if(selectedLocality.homeDeliveryAllowed && selectedLocality.storePickupAvailable) {
                setLocalityAvailability('Home Delivery & Store Pickup Available');
            } else if(selectedLocality.homeDeliveryAllowed && !selectedLocality.storePickupAvailable) {
                setLocalityAvailability('Home Delivery Available');
            } else if(!selectedLocality.homeDeliveryAllowed && selectedLocality.storePickupAvailable) {
                setLocalityAvailability('Store Pickup Available');
            } else {
                setLocalityAvailability('No Service Available');
            }
        }
        
        if(validate.isNotEmpty(selectedLabLocality)) {
            if(selectedLabLocality.collectionCenterId ){
                 if(selectedLabLocality.sampleCollectionAllowed === "A" || selectedLabLocality.sampleCollectionAllowed=== 'H') {
                    setLabLocalityAvailability('Home Sample Collection Available');
                 }else{
                    setLabLocalityAvailability('Service Available');
                 }
             } else {
                setLabLocalityAvailability('No Service Available');
             }
         }
    },[selectedLocality,selectedLabLocality])

    const clearShoppingCart = () => {
        cartAction.clearShoppingCart();
        if(validate.isNotEmpty(userInfo) && validate.isNotEmpty(userInfo.medplusId)) {
            commonHeaderService.clearShoppingCart().then(response => {
                setShoppingCartItem([]);
            }).catch(function(error) {
                console.log("Error : ", error);
                return;
            }); 
        }
    }
    
    const [isLocalityModalOpen, setLocalityModalOpen] = useState(false);
    const localityModalToggle = () => {setLocalityModalOpen(!isLocalityModalOpen);}

    const getTitleName = (routePath) =>{
        switch(routePath) {
            case "medplusAdvantage" : return 'MedPlus Advantage – Best Health Check up Packages for full family';
            case "subscriptionPlanDetail" : return 'Subscription Plan Detail';
            case "subscriptionLogin" : return 'Mobile Verification';
            case "subscriptionLoginOtp" : return 'Mobile Verification - OTP';
            case "subscriptionCorporateLogin" : return 'Corporate Verification';
            case "subscriptionCorporateLoginOtp" : return 'Corporate OTP Verification';
            case "individualRegistration" : return 'Subscription Registration';
            case "paybackPoints" : return 'MedPlus Payback Points';
            case "pharmaHome" : return "Buy Medicines from India's Popular Pharmacy - MedPlusMart";
            default : return 'Online Pharmacy Store in India. Best value on medicines-MedPlus';
        }
    }

    const hideMegaDropdown = () => {
        setHideHealthStoreDropdown(true);
        setTimeout(() => {
            setHideHealthStoreDropdown(false);
        }, 300);
    }

    return (
        <React.Fragment>
             <Helmet>
                <title>{getTitleName(props.routePath ? props.routePath : '')}</title>
            </Helmet>
            <header className={props.hideHeader ? "main-header navbar-expand-md fixed-top" : "main-header navbar-expand-md"}>
                { !props.hideHeader && 
                    <React.Fragment>
                        <nav className="navbar no-gutters py-0 border-bottom">
                            <div className="d-flex">
                                <Link to={"/"} role="link" className="navbar-brand" title="MedPlus Mart">
                                    <img srcSet={MartImg} alt="MedPlusMart" height="30"/>
                                </Link>
                            </div>
                            <div className="col text-right">
                                <ul className="navbar-nav justify-content-end top-categories">
                                    <li className="nav-item active">
                                        <a role="link" className="nav-link" href="tel:040-67006700" title="Call 040 - 67006700 for help!">Call 040 - 67006700 for help!</a>
                                    </li>
                                    {isAdminUser && <li className="nav-item">
                                        <Link role="link" to="/martAdminServices" className="nav-link text-brand"   title="Admin Panel" target={"_blank"}>Admin panel</Link>
                                   </li>}
                                    <li className="nav-item">
                                        <Link role="link" className="nav-link" to={`/storelocator#${props.isLabPage ? "diagnostics" : "pharmacy"}`} title="Store Finder">Store Finder</Link>
                                   </li>
                                   <li className="nav-item download-links pl-3 pr-2">
                                        <p className='d-inline font-14'>Download App</p>
                                        <a role="link" className="border-0 btn btn-link d-inline nav-link p-0" href="https://play.google.com/store/apps/details?id=com.medplus.mobile.android" title="Android App" target="_blank">
                                            <div className='android d-inline'></div>
                                        </a>
                                        <a role="link" className="border-0 btn btn-link d-inline nav-link p-0" href="https://apps.apple.com/us/app/medplus-drug-directory-store/id1070265254" title="IOS App" target="_blank">
                                            <div className='ios d-inline'></div>
                                        </a>
                                   </li>
                                   {!loader && props.isMartPage && validate.isNotEmpty(userInfo) && validate.isNotEmpty(mWalletInfo) && <li className="nav-item wallet-amount">
                                        <button className="border-0 bg-none nav-link text-right" onClick={() => props.history.push('/myWallet')}>
                                            <img srcSet={WalletHeaderImg} height="24px" alt="MedPlus Wallet" title="MedPlus Wallet"></img>
                                            <small>Wallet Cash</small>
                                            <strong className="text-brand rupee">&#x20B9; {Number.parseFloat(mWalletInfo.mwalletAmount + mWalletInfo.flexiAmount).toFixed(2)}</strong>  	        
                                        </button>
                                    </li>}
                                   {!loader && <MyAccountRightMenu routePath={props.routePath} history={props.history}></MyAccountRightMenu>}       
                                </ul>
                            </div>
                        </nav>
                    </React.Fragment>
                }
                <nav className="navbar subnav no-gutters">
                {props.hideHeader && props.isMartPage &&                      
                    <MegaDropdown hideHealthStoreDropdown={hideHealthStoreDropdown} removeMargin ={true} catalogCategoryies={catalogCategoryies} assestsUrl={assestsUrl} hideMegaDropdown={hideMegaDropdown}/>
                  
                }
                    <div className="col-1  col-lg-3  user-locality d-none d-lg-block" onClick={()=>{localityModalToggle()}}>
                       
                        
                        <h6 className="m-0">
                            {/* <img srcSet={LocationIco} className="mr-3" alt="Location Icon" title="Select Locality"/> */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">
                                <g transform="translate(0 0.406)"><circle cx="18" cy="18" r="18" transform="translate(0 -0.406)" fill="#f5f5f7"/>
                                <g transform="translate(8.2 7.794)"><g transform="translate(0 0)"><rect width="21" height="21" transform="translate(-0.2 -0.2)" fill="none"/></g><g transform="translate(3.086 0)">
                                <path d="M.85,10.868A7.6,7.6,0,0,1,2.033,2.184,7.219,7.219,0,0,1,7.418,0h.208a7.2,7.2,0,0,1,5.343,2.184,7.581,7.581,0,0,1,1.173,8.683A89.94,89.94,0,0,1,7.48,21,92.707,92.707,0,0,1,.85,10.868ZM3.008,3.129a6.2,6.2,0,0,0-.965,7.108A80.551,80.551,0,0,0,7.48,18.711a78.765,78.765,0,0,0,5.468-8.474,6.181,6.181,0,0,0-.955-7.1A5.813,5.813,0,0,0,7.626,1.376H7.418A5.8,5.8,0,0,0,3.008,3.129ZM4.09,7.187A3.41,3.41,0,1,1,7.5,10.6,3.408,3.408,0,0,1,4.09,7.187Zm1.3.01A2.11,2.11,0,1,0,7.5,5.087,2.11,2.11,0,0,0,5.391,7.2Z" transform="translate(-0.286 -0.2)"/>
                                </g>
                                </g>
                                </g>
                            </svg>
                            <div className="text-truncate pointer  px-3" id="locationTooltip">
                                {props.isLabPage ?
                                    <React.Fragment>
                                        {selectedLabLocality && selectedLabLocality.combination}<br/>
                                        <small>{labLocalityAvailability}</small>   
                                    </React.Fragment>
                                    : <React.Fragment>
                                        {selectedLocality && selectedLocality.combination}<br/>
                                        {!props.isDoctorPage && <small>{localityAvailability}</small>}       
                                    </React.Fragment>

                                }
                                <Tooltip placement="bottom" isOpen={localitionTitle} target="locationTooltip" toggle={toggleLocaltionTitle}>
                                    {selectedLocality && selectedLocality.combination}     
                                </Tooltip>
                            </div>
                        </h6>
                    </div>
                    {validate.isNotEmpty(selectedLocality) && <ChangeLocality isLabPage = {props.isLabPage} modal={isLocalityModalOpen} toggle={localityModalToggle} selectedLocality={selectedLocality}/>}
                   
                    <span onClick={()=>{localityModalToggle()}} className="d-lg-none d-block mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">
                        <g transform="translate(0 0.406)"><circle cx="18" cy="18" r="18" transform="translate(0 -0.406)" fill="#f5f5f7"/>
                        <g transform="translate(8.2 7.794)"><g transform="translate(0 0)"><rect width="21" height="21" transform="translate(-0.2 -0.2)" fill="none"/></g><g transform="translate(3.086 0)">
                        <path d="M.85,10.868A7.6,7.6,0,0,1,2.033,2.184,7.219,7.219,0,0,1,7.418,0h.208a7.2,7.2,0,0,1,5.343,2.184,7.581,7.581,0,0,1,1.173,8.683A89.94,89.94,0,0,1,7.48,21,92.707,92.707,0,0,1,.85,10.868ZM3.008,3.129a6.2,6.2,0,0,0-.965,7.108A80.551,80.551,0,0,0,7.48,18.711a78.765,78.765,0,0,0,5.468-8.474,6.181,6.181,0,0,0-.955-7.1A5.813,5.813,0,0,0,7.626,1.376H7.418A5.8,5.8,0,0,0,3.008,3.129ZM4.09,7.187A3.41,3.41,0,1,1,7.5,10.6,3.408,3.408,0,0,1,4.09,7.187Zm1.3.01A2.11,2.11,0,1,0,7.5,5.087,2.11,2.11,0,0,0,5.391,7.2Z" transform="translate(-0.286 -0.2)"/>
                        </g>
                        </g>
                        </g>
                    </svg>
                    </span>
                    <div className={"col-6 col-lg-6  px-3 pl-sm-0"}>
                        {props.isSubscriptionPage || props.isPayback ? 
                            <React.Fragment></React.Fragment> 
                            : (props.isLabPage || props.isDoctorPage ) ? 
                                <CommonSearch isLabPage = {props.isLabPage} isDoctorPage = {props.isDoctorPage} />
                                :<ProductSearch shoppingCartItem={cartItems} history={props.history}></ProductSearch>
                        }
                    </div>
                    {/* search & compositions result dropdown over */}
                      
                    <div className="col text-right pl-0 inline-flex">
                    {isPrescriptionUploadEnabled && 
                            validate.isNotEmpty(selectedLocality) &&
                            validate.isNotEmpty(selectedLocality.saleAllowed) &&
                            "G" != selectedLocality.saleAllowed &&
                            validate.isNotEmpty(selectedLocality.hubId) &&
                            <button className={!props.isSubscriptionPage ? `btn gradient-upload-btn border-0 float-left rounded-pill px-3` : `btn gradient-upload-btn border-0 mr-3 px-3 rounded-pill`} title="Upload"  onClick={()=>{sendPrescriptionEvent();window.location.href = CONFIG.REDIRECT_HOME_URL + "newUserPrescriptionUpload"}}>
                            Upload
                        </button>
                        }
                        {/* <a href='/doctorHome' role="button"  className="btn gradient ml-32 border-0 float-left" title='Doctors'>
                            Doctors
                        </a> */}
                        {props.routePath != 'paybackPoints' && 
                            <React.Fragment>
                            <NotificationBell/>
                                {!loader && !(props.isSubscriptionPage || props.isDoctorPage) && (props.isLabPage ?
                                    <LabMiniCart history={props.history} isLoggedInCustomer={validate.isNotEmpty(LocalDB.getValue("customerId"))?true:false}/>
                                    :<MiniCart cartItems = {cartItems} clearShoppingCart={clearShoppingCart} {...props}></MiniCart>)
                                }
                            </React.Fragment>
                        }
                    </div>
                </nav>
                { !props.hideHeader && <CategoryNavigation {...props} catalogCategoryies={catalogCategoryies} hideMegaDropdown={hideMegaDropdown} hideHealthStoreDropdown={hideHealthStoreDropdown}/> }
            </header>
        </React.Fragment>
    )
}

export default GeneralHeader;
