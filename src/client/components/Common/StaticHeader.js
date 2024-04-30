import React, { useState, useEffect } from 'react';
import { useDispatch, connect } from 'react-redux';
import MartImg from '../../images/common/mart-identity-cssbg.svg';
import LocationIco from '../../images/common/location-icn.png';
import Validate from '../../helpers/Validate';
import   { getSelectedLocality, reloadSelectedLocalityInfo } from '../../../redux/action/LocalityAction';
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
import { UncontrolledDropdown, DropdownToggle} from 'reactstrap';
import { Tooltip } from 'reactstrap';
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
    const toggleNotificationModal = () => setNotificationModal(!isNotificationModal);
    const [localitionTitle, setLocalitionTitle] = useState(false);
    const isPrescriptionUploadEnabled = true;
    let routePath = props.routePath ? props.routePath : '' ;
    let titleName = 'My Profile - MedPlusMart';

    useEffect(() => {
        //cartAction.updateShoppingCartInfo();
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
    
    const [isLocalityModalOpen, setLocalityModalOpen] = useState(false);
    const localityModalToggle = () => { setLocalityModalOpen(!isLocalityModalOpen); }

    if(routePath == 'newUserPrescriptionUpload'){
        titleName = 'Upload Prescription- MedPlusMart';
}
    return (
        <React.Fragment>
             <Helmet>
                <title>{titleName}</title>
            </Helmet>
            <header className={props.hideHeader ? "main-header navbar-expand-md fixed-top" : "main-header navbar-expand-md"}>
                { !props.hideHeader && 
                    <React.Fragment>
                        <nav className="navbar no-gutters pt-0">
                            <div className="col d-flex">
                                <a className="navbar-brand" href="javascript:void(0)" onClick={() => goToHome()}>
                                    <img srcSet={MartImg} alt="MedPlusMart" height="30"/>
                                </a>
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
                                        <a className="nav-link" href="javascript:void(0)" title="Store Finder" onClick={() => goToUserAccount("storelocator")}>Store Finder</a>
                                   </li>
                                    <UncontrolledDropdown className="d-inline-block user-dropdown mr-n3">
                                                <DropdownToggle color="white" className='user'>
                                                    <span className="user-name" onClick={() => window.location.href=CONFIG.REDIRECT_HOME_URL+"reactAuthenticate"}>{validate.isNotEmpty(userInfo) ? userInfo.displaybleName : "Login / Sign up"}</span>
                                                    <span className="user-icn"></span>
                                                </DropdownToggle>
                                    </UncontrolledDropdown>          
                                </ul>
                            </div>
                        </nav>
                        <hr className="mt-n2 mb-0"/>
                    </React.Fragment>
                }
                <nav className="navbar subnav no-gutters">
                    <div className="col-sm-2 col-md-3 col-3  user-locality" onClick={()=>{localityModalToggle()}}>
                        <h6 className="m-0">
                            <img srcSet={LocationIco} className="mr-3" alt="Location Icon"  title=""/>
                            <div className="text-truncate pointer" id="locationTooltip">
                                {selectedLocality && selectedLocality.combination}<br/>
                                {localityAvailability}
                                <Tooltip placement="bottom" isOpen={localitionTitle} target="locationTooltip" toggle={toggleLocaltionTitle}>
                                    {selectedLocality && selectedLocality.combination}
                                </Tooltip>
                            </div>
                        </h6>
                    </div>
                    {validate.isNotEmpty(selectedLocality) && <ChangeLocality modal={isLocalityModalOpen} toggle={localityModalToggle} selectedLocality={selectedLocality}/>}
                    <div className="col-6 px-3">
                        <ProductSearch getShoppingCart={getMiniShoppingCart} shoppingCartItem={props.cartItems}></ProductSearch>
                    </div>
                    {/* search & compositions result dropdown over */}
                      
                    <div className="col text-right pl-3">
                    {isPrescriptionUploadEnabled && 
                            validate.isNotEmpty(selectedLocality) &&
                            validate.isNotEmpty(selectedLocality.saleAllowed) &&
                            "G" != selectedLocality.saleAllowed &&
                            validate.isNotEmpty(selectedLocality.hubId) &&
                        <button className="btn gradient-upload-btn border-0 float-left rounded-pill" title="Upload Prescription" onClick={""}>
                            Upload Prescription
                        </button>
                        }
                        {/* <a href='/doctorHome' role="button"  className="btn gradient ml-32 border-0 float-left" title='Doctors'>
                            Doctors
                        </a> */}
                            <NotificationBell/>
                        <MiniCart clearShoppingCart={clearShoppingCart} {...props}></MiniCart>
                    </div>
                </nav>
                { !props.hideHeader && <CategoryNavigation {...props} /> }
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
