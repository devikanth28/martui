import React, { useState } from 'react'
import LocalDB from '../../DataBase/LocalDB';
import PaybackLock from "../../images/common/paybacklock.svg"
import SignInPopUp from '../Common/signInModelBox/SignInPopUp';

const PaybackLoginBanner = (props) => {

    const [isPopUpOpen, setPopUpOpen] = useState(false);

    const openSignInPopUp = () => {
        LocalDB.setValue("fromPage", '/paybackspecialsale');
        LocalDB.setValue("toPage", -1);
        setPopUpOpen(!isPopUpOpen);
    }
    return (
        <React.Fragment>
            { isPopUpOpen && <SignInPopUp {...props} setPopUpOpen={setPopUpOpen} displayLogo={true}/> }
            <section className="payback-banner">
                <div className="w-100">
                    <img src={PaybackLock} className="payback-login-key" alt="Lock Icon" title="please login to add items into cart" />
                    <div className="payback-text adverstiment">
                        <h5 className="d-inline-flex font-weight-normal mb-0 p-3">To view your accumulated points and add<br />products to your cart, you must be logged in </h5>
                        <a href="javascript:void(0)" onClick={()=>openSignInPopUp()} title="Login" aria-label="Login" aria-role="button" className="banner-hover-btn login-button btn btn-brand btn-lg px-5 rounded-pill">Login
                            <svg className="pl-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <g id="right_white_icon_24px" transform="translate(-48.941 -351.846)">
                                    <rect id="BG_Guide" data-name="BG Guide" width="24" height="24" transform="translate(48.941 351.846)" fill="none"></rect>
                                    <path id="Path_22926" data-name="Path 22926" d="M61.82,354.579a1.7,1.7,0,0,0-.238.716,1.028,1.028,0,0,0,.358.715l7.513,6.917H49.9a.954.954,0,1,0,0,1.908H69.453l-7.394,6.917a.936.936,0,0,0,0,1.312.945.945,0,0,0,1.312.119l9.3-8.586a.936.936,0,0,0,0-1.312l-9.3-8.706a.912.912,0,0,0-.6-.238C62.178,354.222,61.94,354.341,61.82,354.579Z" fill="#fff"></path>
                                </g>
                            </svg>
                        </a>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )

}
export default PaybackLoginBanner