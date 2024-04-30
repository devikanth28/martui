import React, { useState, useEffect } from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import MyProfileImg from '../../images/common/myprofile-icn.svg';
import MedplusWalletImg from '../../images/common/medpluswallet-icn.svg';
import MyWhishListImg from '../../images/common/mywishlist-icn.svg';
import FrequentlyOrderedIcn from '../../images/common/frequently-ordered-list-18px.svg';
import PurchaseHistoryImg from '../../images/common/purchasehistory-icn.svg';
import LabOrdersImg from "../../images/common/laborder-icon.svg";
import HealthRecordsImg from '../../images/common/healthrecords-icn.svg';
import FlexiRewardsImg from '../../images/common/flexirewards-icn.svg';
import PayBackPointsImg from '../../images/common/PaybackPoints-icn.svg';
import CONFIG from '../../constants/ServerConfig';
import Validate from '../../helpers/Validate';
import UserInfoAction from '../../../redux/action/UserInfoAction';
import CartAction from '../../../redux/action/CartAction';
import { getSelectedLocality } from '../../../redux/action/LocalityAction';
import MyRefill from '../../images/common/refill-icn.svg';
import LocalDB from '../../DataBase/LocalDB';
import MyComplaintsIcn from "../../images/common/my-complaints-icn-18.svg";
import MyBookingIcn from "../../images/common/mybooking-icn.svg";
import SignInPopUp from './signInModelBox/SignInPopUp';
import MDxPointsWalletIcon from '../../images/common/MDx_PointsWallet_18px.svg'
import Cookies from 'js-cookie';
import CheckoutAction from '../../../redux/action/CheckoutAction';
import LabOrderAction from '../../../redux/action/LabOrderAction';
import CommonHeaderService from '../../services/CommonHeaderService';
import store from '../../../redux/store';
import { SET_TOKEN_VALIDATE } from '../../../redux/reducer/TokenValidateReducer';


const MyAccountRightMenu = (props) => {

    const validate = Validate();
    const userInfoAction = UserInfoAction();
    const cartAction = CartAction();
    const checkoutAction = CheckoutAction();
    const labOrderAction = LabOrderAction();
    var userInfo = userInfoAction.getUserInfo();
    const selectedLocality = getSelectedLocality();
    const [isPopUpOpen, setPopUpOpen] = useState(false);
    const displaybleName = validate.isNotEmpty(userInfo) ? userInfo.displaybleName:"";

    const goToUserAccount = (redirectUrl) => {
        if(props.routePath !== redirectUrl) {
            if("logout" == redirectUrl) {
                CommonHeaderService().removeSession({}).then(async (data) => {
                    Cookies.remove("customerId",{path:'/'});
                    Cookies.remove("tokenId",{path:'/'});
                    userInfoAction.resetUserInfo();
                    cartAction.clearComplimentaryCartItem();
                    cartAction.clearShoppingCart();
                    checkoutAction.resetCheckoutDetails();
                    labOrderAction.clearLabOrders();
                    Cookies.remove("getNotifyLocationConfirmed");
                    Cookies.remove("b_token");
                    Cookies.remove("s_token");
                    if (typeof window !== 'undefined') {
                        LocalDB.removeValue("SESSIONID");
                        LocalDB.removeValue("b_token");
                        LocalDB.removeValue("s_token");
                        LocalDB.removeValue("MOBILE_NUMBER");
                        LocalDB.removeValue("customerId");
                        LocalDB.removeValue("subscriptionCustomer");
                        LocalDB.removeValue("corporateCustomerLogin");
                        LocalDB.removeValue("RECENTLY_VIEWED_PRODUCT");
                        LocalDB.removeValue("recentlyViewedProductIds");
                        LocalDB.removeValue("fireBaseToken");
                    }
                    store.dispatch({type : SET_TOKEN_VALIDATE, data : false});
                }).catch((error) => {
                    console.log(error);
                    db.removeValue("SESSIONID");
                })
                props.history.push('/');
                return;
            }
            props.history.push('/' + redirectUrl);
        }
    }

    const openSigninpopup = () =>{
        LocalDB.setValue("fromPage", window.location.href);
        LocalDB.setValue("toPage", -1);
        setPopUpOpen(!isPopUpOpen);
    }

    return (
        <React.Fragment>
            {validate.isEmpty(userInfo) ?
                <div className="d-inline-block user-dropdown mr-n3 dropdown">
                    <a className="user dropdown-toggle btn btn-white" href="javascript:void(0);" title="Login / Sign up" id="signInLink" onClick={()=>openSigninpopup()}>
                        <span className="user-name">Login / Sign up</span>
                        <span className="user-icn"></span>
                    </a>
                </div>
            :
            <UncontrolledDropdown className="d-inline-block user-dropdown mr-n3" title ={displaybleName}>
                <DropdownToggle caret  color="white" className='user'>
                    <span className="user-name">{displaybleName}</span>
                    <span className="user-icn"></span>
                </DropdownToggle>
                {validate.isNotEmpty(userInfo) &&
                    <DropdownMenu className=" w-100 dropdown-menu-right">
                        <DropdownItem title="My Account" onClick={() => goToUserAccount("myProfile")}><img srcSet={MyProfileImg} className='mr-2 align-text-bottom'/> <span>My Account</span></DropdownItem>
                        <DropdownItem title="Purchase History" onClick={() => {LocalDB.setObject("loadOrders", {"loadNormalOrder" : true, "loadCanceledOrder" : true}); goToUserAccount("ordersHistory")}}><img srcSet={PurchaseHistoryImg} className='mr-2 align-text-bottom'/><span>Purchase History</span></DropdownItem>
                        <DropdownItem title="My Lab Orders" onClick={() => goToUserAccount("labOrders")}><img srcSet={LabOrdersImg} className='mr-2 align-text-bottom'/><span>My Lab Orders</span></DropdownItem>
                        <DropdownItem title="Refill History" onClick={() => goToUserAccount("myRefills")}><img srcSet={MyRefill} className='mr-2 align-text-bottom'/> <span>Refill History</span></DropdownItem>
                        <DropdownItem title="Health Records" onClick={() => goToUserAccount("viewPrescription")}><img srcSet={HealthRecordsImg} className='mr-2 align-text-bottom'/><span>Health Records</span></DropdownItem>
                        <DropdownItem className="text-truncate" title="Frequently Ordered List" onClick={() => goToUserAccount("myWishList")}><img srcSet={FrequentlyOrderedIcn} className='mr-2 align-text-bottom'/> <span>Frequently Ordered List</span></DropdownItem>
                        <DropdownItem title="My Bookings" onClick={() => goToUserAccount("myBookings")}><img srcSet={MyBookingIcn} className='mr-2 align-text-bottom'/> <span>My Bookings</span></DropdownItem>
                        <DropdownItem title="FlexiRewards" onClick={() => goToUserAccount("flexiRewards")}><img srcSet={FlexiRewardsImg} className='mr-2 align-text-bottom'/> <span>FlexiRewards</span></DropdownItem>
                        <DropdownItem className="align-items-center d-flex" title="MDx Points Wallet History" onClick={() => goToUserAccount("mdx/pointHistory")}><img srcSet={MDxPointsWalletIcon} className='mr-2 align-text-bottom'/> <span className='text-wrap'>MDx Points Wallet History</span></DropdownItem>
                        <DropdownItem className="align-items-center d-flex" title="MedPlus Payback Points History" onClick={() => goToUserAccount("payback/pointHistory")}><img srcSet={PayBackPointsImg} className='mr-2 align-text-bottom'/> <span className='text-wrap'>MedPlus Payback Points History</span></DropdownItem>
                        {validate.isNotEmpty(selectedLocality) && selectedLocality.showMyWallet == "Y" && <DropdownItem title="My Wallet" onClick={() => goToUserAccount("myWallet")}><img srcSet={MedplusWalletImg} className='mr-2 align-text-bottom'/><span>My Wallet</span></DropdownItem> }
                        <DropdownItem title="My Complaints" onClick={() => goToUserAccount("myComplaints")}><img srcSet={MyComplaintsIcn} className='mr-2 align-text-bottom'/><span>My Complaints</span></DropdownItem>
                        
                        <DropdownItem divider />
                        <DropdownItem title="Logout" onClick={() =>goToUserAccount("logout")}><span>Logout</span></DropdownItem>
                    </DropdownMenu>
                }
            </UncontrolledDropdown>}
            { isPopUpOpen && <SignInPopUp {...props} setPopUpOpen={setPopUpOpen} displayLogo={true}/> }
        </React.Fragment>
    )
}
export default MyAccountRightMenu;
