import React, { useEffect, useState } from 'react';
import RegistrationModalImg from '../../../images/common/registration-page-img.svg';
import { Modal, ModalHeader, ModalBody} from 'reactstrap';
import LocalDB from '../../../DataBase/LocalDB';
import CONFIG from '../../../constants/ServerConfig';
import {SIGNIN_OTP_VERIFY} from '../../Common/RoutingConstants';
import Validate from '../../../helpers/Validate';
import VerifyOtp from './VerifyOtp';
import LoginWithOtp from './SignIn/LoginWithOtp';
import RegistrationForm from './SignUp/RegistrationForm';

const SignInPopUp = (props) =>{
    const [showModal,setShowModal] = useState({});
    const [signInPopUpModal, setSignInPopUpModal] = useState(false);
    const otpVerification = props.routePath == SIGNIN_OTP_VERIFY;
    const [closeModal,setCloseModal] = useState(false);
    const validate = Validate();
    const toggle = () => {
        setSignInPopUpModal(!signInPopUpModal);
        setShowModal({});
    }

    useEffect(()=>{
        setSignInPopUpModal(true);
        if(props.openVerifyModal || (otpVerification && validate.isEmpty(validate.mobileNumber(LocalDB.getValue("MOBILE_NUMBER"))))){
            setShowModal({
                VerifyOtp: true,
            });
        } else {
            setShowModal({
                LoginWithOtp: true
            });
        }
    },[props.openVerifyModal])

    useEffect(()=>{
        if(validate.isNotEmpty(window)){
            window.scrollTo(0,0);
        }
    });

    const CloseButton = <button type="button" onClick={()=>closeSignInPopUpModel()} className="close" >
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <rect fill="none" width="24" height="24"/>
                                <path d="M20.76,19.55l-7.58-7.56,7.56-7.56a.846.846,0,0,0-.04-1.18.822.822,0,0,0-1.13,0L12,10.81,4.44,3.24A.827.827,0,0,0,3.27,4.41l7.56,7.58L3.27,19.55a.835.835,0,0,0,1.14,1.22l.04-.04L12,13.17l7.56,7.56a.833.833,0,0,0,1.17,0h0a.821.821,0,0,0,.04-1.16A.031.031,0,0,0,20.76,19.55Z"/>
                              </svg>
                        </button>

    const closeSignInPopUpModel = () => {
        if (props.setPopUpOpen) {
            LocalDB.removeValue("fromPage");
            LocalDB.removeValue("toPage");
            props.setPopUpOpen(false);
        } else {
            toggle();
            let url = LocalDB.getValue("toPage");
            let fromUrl = LocalDB.getValue("fromPage");
            LocalDB.removeValue("toPage");
            LocalDB.removeValue("fromPage");
            if (url) {
                if (!isNaN(url)) {
                    if (url.toString() === "-2" && window.history.length < 3) {
                        window.location.href = CONFIG.REDIRECT_HOME_URL
                    } else {
                        window.history.go(url)
                    }
                }
            } else if (fromUrl) {
                window.location.href = fromUrl;
            } else {
                window.location.href = CONFIG.REDIRECT_HOME_URL
            }   
        }
    }
    useEffect(()=>{
        if(otpVerification && validate.isEmpty(LocalDB.getValue("MOBILE_NUMBER"))){
            closeSignInPopUpModel();
        }
    },[otpVerification])

    return (
        <React.Fragment>
        <div className="page-height no-data-to-show" style={{display: props.displayLogo ? "none" : ""}}>
            <section className="p-3 rounded w-100 mb-4 mt-3">
                <img className="mb-3" srcSet={RegistrationModalImg} alt="MedPlus Login" title="MedPlus Login"/>
                <h5 className=" mb-0 font-weight-normal mt-4">Hello User,<strong className="d-block h3 mt-2">Welcome to MedPlusMart</strong></h5>
            </section>
        </div>
        <Modal backdrop="static" keyboard={false}  className={"modal-dialog-centered registration-user-modal"} isOpen={signInPopUpModal} toggle={toggle} autoFocus={false} tabIndex={-1}>
            <ModalHeader toggle={toggle} close={otpVerification || closeModal ? <React.Fragment></React.Fragment> : CloseButton } />
                <ModalBody>
                    <div className="row mx-0">
                        {showModal.VerifyOtp &&
                            <div className="col px-0">
                                <VerifyOtp  addToDiagnosticCart={props.addToDiagnosticCart} setShowModal={setShowModal} routePath={props.routePath} setCloseModal={setCloseModal}/>
                            </div>
                        }
                        {showModal.LoginWithOtp &&
                            <div className="col px-0">
                                <LoginWithOtp setShowModal={setShowModal}/>
                            </div>
                        }
                        {showModal.RegistrationForm && 
                            <div className="col-12 px-0">
                                <RegistrationForm setShowModal={setShowModal} />
                            </div>
                        }
                    </div>
                </ModalBody>
            </Modal>
        </React.Fragment>
    )
}
export default SignInPopUp;


        