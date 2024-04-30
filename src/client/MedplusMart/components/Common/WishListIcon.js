import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Validate from "../../../helpers/Validate";
import MyAccountService from '../../../services/MyAccountService';
import SignInPopUp from '../../../components/Common/signInModelBox/SignInPopUp';
import LocalDB from '../../../DataBase/LocalDB';

const WishListIcon = (props) => {

    const validate = Validate();
    const myAccountService = MyAccountService();

    const [isPopUpOpen, setPopUpOpen] = useState(false);

    const userInfo  = useSelector(state => validate.isNotEmpty(state.userInfo.userInfo) ?  state.userInfo.userInfo : null);

    const modifyWishlist = (event) => {
        event.stopPropagation();
        if (validate.isNotEmpty(userInfo)) {
            myAccountService.modifyWishList(props.productId, props.wishlistType, props.isAddedToWishlist ? 'REMOVE' : 'ADD').then((response) => {
                if(validate.isNotEmpty(response) && validate.isNotEmpty(response.statusCode) && 'SUCCESS' === response.statusCode){
                    props.setIsWishlisted(!props.isAddedToWishlist)
                }
            }).catch((error) => {
                console.log(error);
            });
        } else {
            LocalDB.setValue("fromPage", window.location.href);
            LocalDB.setValue("toPage", -1);
            setPopUpOpen(!isPopUpOpen);
        }
    }

    const wishlistedIconSvg= (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 21.352">
        <defs>
          <linearGradient id="linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
            <stop offset="0" stop-color="#e71c37"/>
            <stop offset="1" stop-color="#ff5c94"/>
          </linearGradient>
        </defs>
        <path id="heart_1_" data-name="heart (1)" d="M22.1,2.09A6.454,6.454,0,0,0,17.3,0a6.038,6.038,0,0,0-3.771,1.3A7.715,7.715,0,0,0,12,2.894,7.711,7.711,0,0,0,10.475,1.3,6.037,6.037,0,0,0,6.7,0,6.454,6.454,0,0,0,1.9,2.09,7.5,7.5,0,0,0,0,7.213,8.933,8.933,0,0,0,2.38,13.06a50.756,50.756,0,0,0,5.959,5.593c.826.7,1.761,1.5,2.733,2.351a1.409,1.409,0,0,0,1.855,0c.972-.85,1.908-1.648,2.734-2.352A50.733,50.733,0,0,0,21.62,13.06,8.932,8.932,0,0,0,24,7.213,7.5,7.5,0,0,0,22.1,2.09Zm0,0" fill="url(#linear-gradient)"/>
      </svg>
    );

    const notWishListedIconSvg=  (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 23.578 20.977">
            <path id="heart_1_" data-name="heart (1)" d="M21.707,2.053A6.34,6.34,0,0,0,16.991,0a5.931,5.931,0,0,0-3.7,1.279,7.579,7.579,0,0,0-1.5,1.564,7.575,7.575,0,0,0-1.5-1.564A5.931,5.931,0,0,0,6.586,0,6.34,6.34,0,0,0,1.87,2.053,7.37,7.37,0,0,0,0,7.086,8.776,8.776,0,0,0,2.338,12.83a49.862,49.862,0,0,0,5.854,5.494c.811.691,1.73,1.475,2.685,2.31a1.384,1.384,0,0,0,1.823,0c.955-.835,1.875-1.619,2.686-2.31a49.841,49.841,0,0,0,5.853-5.494,8.775,8.775,0,0,0,2.338-5.744A7.369,7.369,0,0,0,21.707,2.053Zm0,0" fill="#6c757d" />
        </svg>);

    return (
        <React.Fragment>
            {validate.isNotEmpty(props.productId) &&
                <button className={`btn ${props.wishListClass}`} title={props.title} onClick={(e) => modifyWishlist(e)}>
                    {props.isAddedToWishlist ? wishlistedIconSvg : notWishListedIconSvg}
                </button>}
            { isPopUpOpen && <SignInPopUp {...props} setPopUpOpen={setPopUpOpen} displayLogo={true}/> }
        </React.Fragment>
    )
}
export default WishListIcon;