import React, { useState } from 'react';
import LoginWithOtp from './LoginWithOtp';
import ForgotPassword from './ForgotPassword';
import LoginWithPassword from './LoginWithPassword';

const SignIn = (props) =>{
    const [mobileNumber,setMobileNumber] = useState('')
    const goToLoginPage = () =>{
        props.setShowModal({
            LoginWithPassword : true
        })
    }

    function setLogInMobile(mobile){
        setMobileNumber(mobile)
        props.setShowModal({
            LoginWithOtp: true
        })
    }
    
    return(
        <React.Fragment>
            {props.LoginWithPassword && !props.LoginWithOtp &&
                <React.Fragment>
                    {(!props.otpVerification && (props.LoginWithOtp || props.ForgotPassword)) &&
                        <React.Fragment>
                            <a title="Back" onClick={()=>{goToLoginPage()}} href="javascript:void(0)" className="btn btn-link btn-sm ml-n2 mt-n5 no-underline text-dark">
                                <svg className="align-middle mr-2" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                                    <g transform="translate(-48.941 -316.765)">
                                        <rect fill="none" width="24" height="24" transform="translate(48.941 316.765)"></rect>
                                        <path fill="#000000" d="M59.108,319.236a.915.915,0,0,0-.6.238l-9.3,8.706a.938.938,0,0,0,0,1.312l9.3,8.586a.945.945,0,0,0,1.312-.119.936.936,0,0,0,0-1.312l-7.394-6.917H71.987a.954.954,0,0,0,0-1.908H52.429l7.513-6.917a.847.847,0,0,0,.358-.715,1.7,1.7,0,0,0-.238-.716A5.386,5.386,0,0,0,59.108,319.236Z" transform="translate(0 -0.471)"></path>
                                    </g>
                                </svg>
                                Back
                            </a>
                        </React.Fragment>
                    }
                    <h6 className="title">
                        Hello User,
                        <strong>Welcome to MedPlusMart</strong>
                    </h6>
                    <small>Login with your registered mail Id or mobile number</small>
                    <LoginWithPassword setShowModal={props.setShowModal} setLogInMobile={setLogInMobile}/>
                </React.Fragment>
            }
            {props.LoginWithOtp && !props.LoginWithPassword &&
                <LoginWithOtp setShowModal={props.setShowModal} otpVerification={props.otpVerification} mobileNumber={mobileNumber}/>
            }
            {props.ForgotPassword &&
                <ForgotPassword setShowModal={props.setShowModal} />
            }
        </React.Fragment>
    )
}

export default SignIn ;