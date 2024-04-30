import React, { useState, useEffect } from 'react';
import { Tooltip } from 'reactstrap';
import { useDispatch, connect, useSelector } from 'react-redux';
import MartImg from '../../images/common/mart-identity-cssbg.svg';
import WalletHeaderImg from '../../images/common/walletheader-cssbg.svg';
import LocationIco from '../../images/common/location-icn.png';
import Validate from '../../helpers/Validate';
import  { getSelectedLocality, reloadSelectedLocalityInfo } from '../../../redux/action/LocalityAction';
import MyAccountRightMenu from './MyAccountRightMenu';
import MiniCart from './MiniCart';
import CommonHeaderService from '../../services/CommonHeaderService';
import UserInfoAction from '../../../redux/action/UserInfoAction';
import NotificationModal from './NotificationModal';
import ProductSearch from './ProductSearch';
import CONFIG from '../../constants/ServerConfig';
import CategoryNavigation from './CategoryNavigation';
import ChangeLocality from '../Locality/ChangeLocality';
import { Helmet } from 'react-helmet';
import CartAction from '../../../redux/action/CartAction';
import MegaDropdown from './MegaDropdown';
import { Link } from 'react-router-dom';
import LocalityService from '../../services/LocalityService';
import NotificationBell from '../../commonComponents/NotificationBell';

const CommonHeader = (props) => {
    const dispatch = useDispatch();
    const validate = Validate();
    const userInfoAction = UserInfoAction();
    const cartAction = CartAction();
    var userInfo = userInfoAction.getUserInfo();
    const selectedLocality = getSelectedLocality();
    const commonHeaderService = CommonHeaderService();  
    const [isNotificationModal, setNotificationModal] = useState(false);
    const [notification, setNotification] = useState({});
    const [shoppingCartItem, setShoppingCartItem] = useState([]);
    const [loader, setLoader] = useState(true);
    const [unReadNotificationCount, setUnReadNotificationCount] = useState(0);
    const [mWalletInfo, setMWalletInfo] = useState({});
    const [localitionTitle, setLocalitionTitle] = useState(false);
    const toggleNotificationModal = () => setNotificationModal(!isNotificationModal);
    const isPrescriptionUploadEnabled = true;
    let routePath = props.routePath ? props.routePath : '' ;
    let titleName = 'My Profile - MedPlusMart';
    const [refreshMWallet, setRefreshMWallet] = useState(true);
    const [hideHealthStoreDropdown, setHideHealthStoreDropdown] = useState(false);
    const martCategoriesFromRedux = useSelector((state) => (validate.isNotEmpty(state) && validate.isNotEmpty(state.medplusCatalog) && validate.isNotEmpty(state.medplusCatalog.martCatalog)) ? state.medplusCatalog.martCatalog : {});
    const catalogCategoryies = (validate.isNotEmpty(selectedLocality) && validate.isNotEmpty(selectedLocality['catalogId'])) ? martCategoriesFromRedux[selectedLocality['catalogId']] : validate.isNotEmpty(martCategoriesFromRedux['CATALOG_DFT1']) ? martCategoriesFromRedux['CATALOG_DFT1'] : {};
    let assestsUrl = process.env.ASSETS_URL;
    useEffect(() => {
        userInfoAction.reloadUserInfo();
        cartAction.updateShoppingCartInfo();
        getMWalletAmount();
        reloadSelectedLocalityInfo(null,null,dispatch);        
    }, []);

    const toggleLocaltionTitle = () => setLocalitionTitle(!localitionTitle);

    const goToUserAccount = (redirectUrl) => {
        if(props.routePath !== redirectUrl) {
            window.location.href = CONFIG.REDIRECT_HOME_URL + redirectUrl;
        }
    }

    const goToHome = () => {
        window.location.href = CONFIG.REDIRECT_HOME_URL;
    }

    let localityAvailability = '';
    if(validate.isNotEmpty(selectedLocality)) {
        if("C" === selectedLocality.configType) {
            localityAvailability = <small>Drop Off Point: {selectedLocality.dropOffPoint}</small>;
        } else if(selectedLocality.homeDeliveryAllowed && selectedLocality.storePickupAvailable) {
            localityAvailability = <small>Home Delivery & Store Pickup Available</small>;
        } else if(selectedLocality.homeDeliveryAllowed && !selectedLocality.storePickupAvailable) {
            localityAvailability = <small>Home Delivery Available</small>;
        } else if(!selectedLocality.homeDeliveryAllowed && selectedLocality.storePickupAvailable) {
            localityAvailability = <small>Store Pickup Available</small>;
        } else {
            localityAvailability = <small>No Service Available</small>;
        }
    }

    const getMiniShoppingCart = () => {
        commonHeaderService.getMiniShoppingCart().then(response => {
            if(validate.isNotEmpty(response) && response.statusCode === "SUCCESS" && response.responseData) {
                setShoppingCartItem(response.responseData.customerMiniCart);
                setUnReadNotificationCount(response.responseData.unreadNotificationCount);
            }
        }).catch(function(error) {
            console.log("System experiencing some problem, Please try after some time");
            return;
        });
    }

    const clearShoppingCart = () => {
        commonHeaderService.clearShoppingCart().then(response => {
            setShoppingCartItem([]);
            cartAction.clearShoppingCart();
        }).catch(function(error) {
            console.log("System experiencing some problem, Please try after some time");
            return;
        }); 
    }

    const getMWalletAmount = () => {
        if (validate.isEmpty(userInfo) || validate.isEmpty(userInfo.userLoginId)){
            return;
        }
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
       
            if(routePath == "myWallet"){
                setRefreshMWallet(false);   
            }
        }else if(!refreshMWallet && routePath != "myWallet"){
            setRefreshMWallet(true);
        }
    }
    
    const hideMegaDropdown = () => {
        setHideHealthStoreDropdown(true);
        setTimeout(() => {
            setHideHealthStoreDropdown(false);
        }, 300);
    }

    const [isLocalityModalOpen, setLocalityModalOpen] = useState(false);
    const localityModalToggle = () => { setLocalityModalOpen(!isLocalityModalOpen); }
    
    if(routePath != 'myWallet' && !refreshMWallet){
        setRefreshMWallet(true);
    }

    if(routePath == 'myAccount'){
        titleName = 'My Profile - MedPlusMart';
    }else if(routePath == 'viewPrescription'){
        titleName = 'View Prescription - MedPlusMart';
    }else if(routePath == 'purchaseHistory'){
        titleName = 'Order History - MedPlusMart';
    }else if(routePath == 'labOrders'){
        titleName = 'My Lab Orders - MedPlusMart';
    }else if(routePath == 'labOrderDetail'){
        titleName = 'My Lab Orders - MedPlusMart';
    }else if(routePath == 'myRefills'){
        titleName = 'Refill Orders - MedPlusMart';
    }else if(routePath == 'refillDetails'){
        titleName = 'Refill Orders - MedPlusMart';
    }else if(routePath == 'myWishlist'){
        titleName = 'Frequently Ordered List - MedPlusMart';
    }else if(routePath == 'flexiRewards'){
        titleName = 'FlexiRewards - MedPlusMart';
    }else if(routePath == 'myWallet'){
        titleName = 'My Wallet - MedPlusMart';
        getMWalletAmount();
    }else if(routePath == 'myCoupons'){
        titleName = 'My Coupons - MedPlusMart';
    }else if(routePath == 'myComplaints'){
        titleName = 'My Complaints - MedPlusMart';
    }else if(routePath == 'myBookings' || routePath == 'doctorconsultationbookings'){
        titleName = 'My Bookings - MedPlusMart';
    }else if(routePath == 'paybackPointsHistory'){
        titleName = 'MedPlus Payback Points History'
    }else if(routePath == 'mdxPointsHistory'){
        titleName = 'MDx Points Wallet History'
    }else{
        titleName = 'My Account - MedPlusMart';
    }

    return (
        <React.Fragment>
            {validate.isNotEmpty(titleName) && 
            <Helmet>
                <title>{titleName}</title>
            </Helmet>}
            <header className={props.hideHeader ? "main-header navbar-expand-md fixed-top" : "main-header navbar-expand-md"}>
                { !props.hideHeader && 
                    <React.Fragment>
                        <nav className="navbar no-gutters pt-0">
                            <div className="col d-flex">
                                <Link to={"/"} className="navbar-brand" title="MedPlusMart">
                                    <img srcSet={MartImg} alt="MedPlusMart" height="30"/>
                                </Link>
                            </div>
                            <div className="col-10 text-right">
                                <ul className="navbar-nav justify-content-end top-categories">
                                    {/* <li className="nav-item">
                                        <a className="nav-link" href="javascript:void(0)" title="Promotions" onClick={() => goToUserAccount("promotions")}>Promotions</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="javascript:void(0)" title="Healthy Life" onClick={() => goToUserAccount("healthy-life")}>Healthy Life</a>
                                    </li> */}
                                    <li className="nav-item">
                                        <a className="nav-link" href="tel:040-67006700" title="Call 040 - 67006700 for help!">Call 040 - 67006700 for help!</a>
                                    </li>
                                    <li className="nav-item">
                                        <button role="button" className="nav-link btn border-0 hover-red" title="Store Finder" onClick={() => goToUserAccount("storelocator")}>Store Finder</button>
                                    </li>
                                    {validate.isNotEmpty(userInfo) && validate.isNotEmpty(mWalletInfo) && <li className="nav-item wallet-amount">
                                        <button role="button" className="nav-link btn p-0 border-0 text-right" onClick={() => props.history.push('/myWallet')}>
                                            <img srcSet={WalletHeaderImg} height="24px" alt="MedPlus Wallet" title="MedPlus Wallet"></img>
                                            <small>Wallet Cash</small>
                                            <strong className="text-brand rupee">&#x20B9; {Number.parseFloat(mWalletInfo.mwalletAmount + mWalletInfo.flexiAmount).toFixed(2)}</strong>  	        
                                        </button>
                                    </li>}
                                    <MyAccountRightMenu routePath={props.routePath} history={props.history} ></MyAccountRightMenu>
                                </ul>
                            </div>
                        </nav>
                        <hr className="mt-n2 mb-0"/>
                    </React.Fragment>
                }
                <nav className="navbar subnav no-gutters">
                {props.hideHeader &&                             
                    <MegaDropdown hideHealthStoreDropdown={hideHealthStoreDropdown} removeMargin ={true} catalogCategoryies={catalogCategoryies} assestsUrl={assestsUrl} hideMegaDropdown={hideMegaDropdown}/>
                  
                }
                    <div className="col-sm-2  col-3  user-locality" onClick={()=>{localityModalToggle()}}>
                    
                        <h6 className="m-0">                       
                            <img srcSet={LocationIco} className="mr-3" alt="Location Icons"></img>                            
                            <div className="text-truncate pointer " id="locationTooltip">
                                {selectedLocality && selectedLocality.combination}<br/>
                                {localityAvailability}
                                <Tooltip placement="bottom" isOpen={localitionTitle} target="locationTooltip" toggle={toggleLocaltionTitle}>
                                    {selectedLocality && selectedLocality.combination}
                                </Tooltip>
                            </div>
                        </h6>
                    </div>
                    {validate.isNotEmpty(selectedLocality) && <ChangeLocality modal={isLocalityModalOpen} toggle={localityModalToggle} selectedLocality={selectedLocality}/>}
                    { !props.fromMyAccount && <div className="col-6 px-3">
                         <ProductSearch getShoppingCart={getMiniShoppingCart} shoppingCartItem={props.cartItems}></ProductSearch>
                    </div> }
                    {/* search & compositions result dropdown over */}
                    <div className="col text-right pl-3">
                        {isPrescriptionUploadEnabled && 
                            validate.isNotEmpty(selectedLocality) &&
                            validate.isNotEmpty(selectedLocality.saleAllowed) &&
                            "G" != selectedLocality.saleAllowed &&
                            validate.isNotEmpty(selectedLocality.hubId) &&
                        <button role="button" className={ `btn gradient-upload-btn border-0 rounded-pill ${props.fromMyAccount ? ' mr-3 ' : 'float-left'}` } data-target="ga-react-header-upload-prescription" title="Upload Prescription" onClick={() => routePath != "prescriptionUpload" ? props.history.push("/prescriptionUpload") : ""}>
                            Upload Prescription
                        </button>
                        }
                        {/* <a href='/doctorHome' role="button"  className={`btn gradient ml-32 border-0 ${props.fromMyAccount ? ' mx-3 ' : 'float-left'}`} title='Doctors'>
                            Doctors
                        </a> */}
                            <NotificationBell/>

                        <MiniCart clearShoppingCart={clearShoppingCart} {...props}></MiniCart>
                    </div>
                </nav>
                { !props.hideHeader && <CategoryNavigation {...props} catalogCategoryies={catalogCategoryies} hideMegaDropdown={hideMegaDropdown} hideHealthStoreDropdown={hideHealthStoreDropdown} /> }
            </header>
        </React.Fragment>
    )
}

function mapStateToProps(state){
    return {
        cartItems: state.cart.shoppingCartItem,
    }
 }

export default connect(mapStateToProps)(CommonHeader);
