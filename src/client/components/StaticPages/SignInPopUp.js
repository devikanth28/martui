import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody} from 'reactstrap';
import SignInModalImg from '../../images/common/registration-page-img.svg';

const SignInPopUp =() => {
    const [signInModal, setSignInModal] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [changeOpacity, setChangeOpacity] = useState(false);

    const toggle = () => setSignInModal(!signInModal);
    
    const CloseButton = <button type="button" onClick={toggle} className="close" >
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <rect fill="none" width="24" height="24"/>
                                <path d="M20.76,19.55l-7.58-7.56,7.56-7.56a.846.846,0,0,0-.04-1.18.822.822,0,0,0-1.13,0L12,10.81,4.44,3.24A.827.827,0,0,0,3.27,4.41l7.56,7.58L3.27,19.55a.835.835,0,0,0,1.14,1.22l.04-.04L12,13.17l7.56,7.56a.833.833,0,0,0,1.17,0h0a.821.821,0,0,0,.04-1.16A.031.031,0,0,0,20.76,19.55Z"/>
                              </svg>
                          </button>
    return(
        <Modal className=" modal-lg modal-dialog-centered registration-user-modal" isOpen={signInModal} toggle={toggle}>
            <ModalHeader toggle={toggle} close={CloseButton} />
            <ModalBody>
                <div className="row mx-0">
                    <div className="col img-div pl-0">
                            <img className="img-fluid" srcSet={SignInModalImg} alt="Registration popup image" title="Registration popup image" height="270"/>
                        <ul>
                            <li>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <g transform="translate(16525 17978)">
                                    <rect fill="none" width="24" height="24" transform="translate(-16525 -17978)"/>
                                    <path fill="#08ce73" d="M9.975,20h0a2.185,2.185,0,0,1-1.1-.59,3.645,3.645,0,0,0-1.227-.717,2.347,2.347,0,0,0-.588-.075h-.03a6.664,6.664,0,0,0-.844.072,2.168,2.168,0,0,1-1.207-.039,2.184,2.184,0,0,1-.641-1.045,3.689,3.689,0,0,0-.717-1.256,3.687,3.687,0,0,0-1.25-.726,2.183,2.183,0,0,1-1.041-.645A2.174,2.174,0,0,1,1.3,13.772a3.8,3.8,0,0,0,0-1.463,3.66,3.66,0,0,0-.712-1.229A2.2,2.2,0,0,1,0,9.975a2.2,2.2,0,0,1,.594-1.1A3.631,3.631,0,0,0,1.31,7.648a3.766,3.766,0,0,0,0-1.462,2.181,2.181,0,0,1,.037-1.209A2.2,2.2,0,0,1,2.4,4.338a3.742,3.742,0,0,0,1.257-.716,3.716,3.716,0,0,0,.723-1.253,2.184,2.184,0,0,1,.646-1.042A2.167,2.167,0,0,1,6.229,1.3a3.851,3.851,0,0,0,.744.073A3.828,3.828,0,0,0,7.692,1.3,3.633,3.633,0,0,0,8.923.588,2.2,2.2,0,0,1,10.026,0a2.194,2.194,0,0,1,1.1.591,3.619,3.619,0,0,0,1.226.718,3.824,3.824,0,0,0,.739.072,3.809,3.809,0,0,0,.724-.07,2.179,2.179,0,0,1,1.208.038,2.182,2.182,0,0,1,.642,1.05,3.7,3.7,0,0,0,.717,1.256,3.71,3.71,0,0,0,1.25.724,2.179,2.179,0,0,1,1.041.646,2.173,2.173,0,0,1,.031,1.207,3.778,3.778,0,0,0,0,1.463,3.673,3.673,0,0,0,.711,1.229,2.189,2.189,0,0,1,.588,1.1,2.195,2.195,0,0,1-.593,1.1,3.645,3.645,0,0,0-.717,1.227,3.772,3.772,0,0,0,0,1.462,2.181,2.181,0,0,1-.037,1.207,2.191,2.191,0,0,1-1.046.641,3.72,3.72,0,0,0-1.256.716,3.692,3.692,0,0,0-.723,1.25,2.2,2.2,0,0,1-.646,1.042,2.187,2.187,0,0,1-1.208.031,3.8,3.8,0,0,0-.741-.073,3.837,3.837,0,0,0-.721.069,3.657,3.657,0,0,0-1.23.712,2.193,2.193,0,0,1-1.1.587ZM6.061,9.691a.832.832,0,0,0-.588,1.419l2.655,2.656a.833.833,0,0,0,1.176,0l5.577-5.578a.831.831,0,0,0-1.176-1.175L8.716,12,6.648,9.935A.824.824,0,0,0,6.061,9.691Z" transform="translate(-16523 -17976)"/>
                                </g>
                            </svg>
                            Participate in FlexiRewards program
                            </li>
                            <li>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <g transform="translate(16525 17978)">
                                    <rect fill="none" width="24" height="24" transform="translate(-16525 -17978)"/>
                                    <path fill="#08ce73" d="M9.975,20h0a2.185,2.185,0,0,1-1.1-.59,3.645,3.645,0,0,0-1.227-.717,2.347,2.347,0,0,0-.588-.075h-.03a6.664,6.664,0,0,0-.844.072,2.168,2.168,0,0,1-1.207-.039,2.184,2.184,0,0,1-.641-1.045,3.689,3.689,0,0,0-.717-1.256,3.687,3.687,0,0,0-1.25-.726,2.183,2.183,0,0,1-1.041-.645A2.174,2.174,0,0,1,1.3,13.772a3.8,3.8,0,0,0,0-1.463,3.66,3.66,0,0,0-.712-1.229A2.2,2.2,0,0,1,0,9.975a2.2,2.2,0,0,1,.594-1.1A3.631,3.631,0,0,0,1.31,7.648a3.766,3.766,0,0,0,0-1.462,2.181,2.181,0,0,1,.037-1.209A2.2,2.2,0,0,1,2.4,4.338a3.742,3.742,0,0,0,1.257-.716,3.716,3.716,0,0,0,.723-1.253,2.184,2.184,0,0,1,.646-1.042A2.167,2.167,0,0,1,6.229,1.3a3.851,3.851,0,0,0,.744.073A3.828,3.828,0,0,0,7.692,1.3,3.633,3.633,0,0,0,8.923.588,2.2,2.2,0,0,1,10.026,0a2.194,2.194,0,0,1,1.1.591,3.619,3.619,0,0,0,1.226.718,3.824,3.824,0,0,0,.739.072,3.809,3.809,0,0,0,.724-.07,2.179,2.179,0,0,1,1.208.038,2.182,2.182,0,0,1,.642,1.05,3.7,3.7,0,0,0,.717,1.256,3.71,3.71,0,0,0,1.25.724,2.179,2.179,0,0,1,1.041.646,2.173,2.173,0,0,1,.031,1.207,3.778,3.778,0,0,0,0,1.463,3.673,3.673,0,0,0,.711,1.229,2.189,2.189,0,0,1,.588,1.1,2.195,2.195,0,0,1-.593,1.1,3.645,3.645,0,0,0-.717,1.227,3.772,3.772,0,0,0,0,1.462,2.181,2.181,0,0,1-.037,1.207,2.191,2.191,0,0,1-1.046.641,3.72,3.72,0,0,0-1.256.716,3.692,3.692,0,0,0-.723,1.25,2.2,2.2,0,0,1-.646,1.042,2.187,2.187,0,0,1-1.208.031,3.8,3.8,0,0,0-.741-.073,3.837,3.837,0,0,0-.721.069,3.657,3.657,0,0,0-1.23.712,2.193,2.193,0,0,1-1.1.587ZM6.061,9.691a.832.832,0,0,0-.588,1.419l2.655,2.656a.833.833,0,0,0,1.176,0l5.577-5.578a.831.831,0,0,0-1.176-1.175L8.716,12,6.648,9.935A.824.824,0,0,0,6.061,9.691Z" transform="translate(-16523 -17976)"/>
                                </g>
                            </svg>
                            Avail discounts at our stores
                            </li>
                            <li>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <g transform="translate(16525 17978)">
                                    <rect fill="none" width="24" height="24" transform="translate(-16525 -17978)"/>
                                    <path fill="#08ce73" d="M9.975,20h0a2.185,2.185,0,0,1-1.1-.59,3.645,3.645,0,0,0-1.227-.717,2.347,2.347,0,0,0-.588-.075h-.03a6.664,6.664,0,0,0-.844.072,2.168,2.168,0,0,1-1.207-.039,2.184,2.184,0,0,1-.641-1.045,3.689,3.689,0,0,0-.717-1.256,3.687,3.687,0,0,0-1.25-.726,2.183,2.183,0,0,1-1.041-.645A2.174,2.174,0,0,1,1.3,13.772a3.8,3.8,0,0,0,0-1.463,3.66,3.66,0,0,0-.712-1.229A2.2,2.2,0,0,1,0,9.975a2.2,2.2,0,0,1,.594-1.1A3.631,3.631,0,0,0,1.31,7.648a3.766,3.766,0,0,0,0-1.462,2.181,2.181,0,0,1,.037-1.209A2.2,2.2,0,0,1,2.4,4.338a3.742,3.742,0,0,0,1.257-.716,3.716,3.716,0,0,0,.723-1.253,2.184,2.184,0,0,1,.646-1.042A2.167,2.167,0,0,1,6.229,1.3a3.851,3.851,0,0,0,.744.073A3.828,3.828,0,0,0,7.692,1.3,3.633,3.633,0,0,0,8.923.588,2.2,2.2,0,0,1,10.026,0a2.194,2.194,0,0,1,1.1.591,3.619,3.619,0,0,0,1.226.718,3.824,3.824,0,0,0,.739.072,3.809,3.809,0,0,0,.724-.07,2.179,2.179,0,0,1,1.208.038,2.182,2.182,0,0,1,.642,1.05,3.7,3.7,0,0,0,.717,1.256,3.71,3.71,0,0,0,1.25.724,2.179,2.179,0,0,1,1.041.646,2.173,2.173,0,0,1,.031,1.207,3.778,3.778,0,0,0,0,1.463,3.673,3.673,0,0,0,.711,1.229,2.189,2.189,0,0,1,.588,1.1,2.195,2.195,0,0,1-.593,1.1,3.645,3.645,0,0,0-.717,1.227,3.772,3.772,0,0,0,0,1.462,2.181,2.181,0,0,1-.037,1.207,2.191,2.191,0,0,1-1.046.641,3.72,3.72,0,0,0-1.256.716,3.692,3.692,0,0,0-.723,1.25,2.2,2.2,0,0,1-.646,1.042,2.187,2.187,0,0,1-1.208.031,3.8,3.8,0,0,0-.741-.073,3.837,3.837,0,0,0-.721.069,3.657,3.657,0,0,0-1.23.712,2.193,2.193,0,0,1-1.1.587ZM6.061,9.691a.832.832,0,0,0-.588,1.419l2.655,2.656a.833.833,0,0,0,1.176,0l5.577-5.578a.831.831,0,0,0-1.176-1.175L8.716,12,6.648,9.935A.824.824,0,0,0,6.061,9.691Z" transform="translate(-16523 -17976)"/>
                                </g>
                            </svg>
                            Access your previous bills & records
                            </li>
                            <li>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <g transform="translate(16525 17978)">
                                    <rect fill="none" width="24" height="24" transform="translate(-16525 -17978)"/>
                                    <path fill="#08ce73" d="M9.975,20h0a2.185,2.185,0,0,1-1.1-.59,3.645,3.645,0,0,0-1.227-.717,2.347,2.347,0,0,0-.588-.075h-.03a6.664,6.664,0,0,0-.844.072,2.168,2.168,0,0,1-1.207-.039,2.184,2.184,0,0,1-.641-1.045,3.689,3.689,0,0,0-.717-1.256,3.687,3.687,0,0,0-1.25-.726,2.183,2.183,0,0,1-1.041-.645A2.174,2.174,0,0,1,1.3,13.772a3.8,3.8,0,0,0,0-1.463,3.66,3.66,0,0,0-.712-1.229A2.2,2.2,0,0,1,0,9.975a2.2,2.2,0,0,1,.594-1.1A3.631,3.631,0,0,0,1.31,7.648a3.766,3.766,0,0,0,0-1.462,2.181,2.181,0,0,1,.037-1.209A2.2,2.2,0,0,1,2.4,4.338a3.742,3.742,0,0,0,1.257-.716,3.716,3.716,0,0,0,.723-1.253,2.184,2.184,0,0,1,.646-1.042A2.167,2.167,0,0,1,6.229,1.3a3.851,3.851,0,0,0,.744.073A3.828,3.828,0,0,0,7.692,1.3,3.633,3.633,0,0,0,8.923.588,2.2,2.2,0,0,1,10.026,0a2.194,2.194,0,0,1,1.1.591,3.619,3.619,0,0,0,1.226.718,3.824,3.824,0,0,0,.739.072,3.809,3.809,0,0,0,.724-.07,2.179,2.179,0,0,1,1.208.038,2.182,2.182,0,0,1,.642,1.05,3.7,3.7,0,0,0,.717,1.256,3.71,3.71,0,0,0,1.25.724,2.179,2.179,0,0,1,1.041.646,2.173,2.173,0,0,1,.031,1.207,3.778,3.778,0,0,0,0,1.463,3.673,3.673,0,0,0,.711,1.229,2.189,2.189,0,0,1,.588,1.1,2.195,2.195,0,0,1-.593,1.1,3.645,3.645,0,0,0-.717,1.227,3.772,3.772,0,0,0,0,1.462,2.181,2.181,0,0,1-.037,1.207,2.191,2.191,0,0,1-1.046.641,3.72,3.72,0,0,0-1.256.716,3.692,3.692,0,0,0-.723,1.25,2.2,2.2,0,0,1-.646,1.042,2.187,2.187,0,0,1-1.208.031,3.8,3.8,0,0,0-.741-.073,3.837,3.837,0,0,0-.721.069,3.657,3.657,0,0,0-1.23.712,2.193,2.193,0,0,1-1.1.587ZM6.061,9.691a.832.832,0,0,0-.588,1.419l2.655,2.656a.833.833,0,0,0,1.176,0l5.577-5.578a.831.831,0,0,0-1.176-1.175L8.716,12,6.648,9.935A.824.824,0,0,0,6.061,9.691Z" transform="translate(-16523 -17976)"/>
                                </g>
                            </svg>
                            Exclusive MedPlus Family Health Plan Offer
                            </li>
                        </ul>
                    </div>
                    <div className="col px-0 pt-5">
                        <h6 className="title">
                            Hello User,
                            <strong>Welcome to MedPlusmart</strong>
                        </h6>
                        <small>Login with your registered mail Id or mobile number</small>
                        <div className="w-75-form">
                            <div className="form-group has-float-label">
                                <input type="text" className="form-control"  id="loginId"  name="Email/Phone"  maxLength="20" autoComplete="off" required placeholder=" "/>
                                <label  for="loginId">Email Id / Mobile No</label>
                            </div>
                            <div className="form-group has-float-label password-feild">
                                <input type={ showPassword ? "text" : "password"} className="form-control" onFocus={() =>{ setChangeOpacity(true)}} id="password"  name="password"  maxLength="20" autoComplete="off" required placeholder=" "/>
                                <label  for="password">Enter Password</label>
                                <a href="javascript:void(0)" onClick={ () => { setShowPassword(!showPassword)}}>{ !showPassword && <svg className={ changeOpacity ? "full-opacity" : "" } xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24.748 24.748">
                                    <g className="svg-opacity" opacity="0.3" transform="translate(0.488 0.732)">
                                        <rect fill="none" width="24" height="24"/>
                                        <g transform="translate(17250 18250)">
                                            <path fill="#b7b7b7" d="M30.114,31.523l.386-.478-.414-.5c-3.641-4.3-7.559-6.457-11.7-6.35-6.7.159-11.31,6.138-11.5,6.4l-.386.478.414.478c3.559,4.225,7.421,6.35,11.448,6.35h.276C25.314,37.741,29.921,31.762,30.114,31.523ZM18.555,36.332c-3.421.08-6.786-1.7-9.959-5.288,1.186-1.355,4.993-5.155,9.848-5.261,3.448-.08,6.786,1.7,9.959,5.288C27.217,32.4,23.41,36.226,18.555,36.332ZM18.5,27.166a3.882,3.882,0,1,0,4.028,3.879A3.96,3.96,0,0,0,18.5,27.166Zm0,6.191a2.313,2.313,0,1,1,2.4-2.312A2.359,2.359,0,0,1,18.5,33.357Z" transform="translate(-17256.5 -18269.186)"/>
                                            <g fill="#b7b7b7" stroke="#FFF" transform="translate(-17249.074 -18247.904) rotate(-45)">
                                                <rect stroke="none" width="2" height="29" rx="1"/>
                                                <rect fill="none" x="-0.5" y="-0.5" width="3" height="30" rx="1.5"/>
                                            </g>
                                        </g>
                                    </g>
                                </svg>} 
                                { showPassword && <svg className={ changeOpacity ? "full-opacity" : "" } xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                                    <g className="svg-opacity" opacity="0.3">
                                        <rect id="Rectangle_2791" data-name="Rectangle 2791" width="24" height="24" fill="none"/>
                                        <g id="Group_4075" data-name="Group 4075" transform="translate(17250 18250)">
                                        <path id="Path_1936" data-name="Path 1936" d="M30.114,31.523l.386-.478-.414-.5c-3.641-4.3-7.559-6.457-11.7-6.35-6.7.159-11.31,6.138-11.5,6.4l-.386.478.414.478c3.559,4.225,7.421,6.35,11.448,6.35h.276C25.314,37.741,29.921,31.762,30.114,31.523ZM18.555,36.332c-3.421.08-6.786-1.7-9.959-5.288,1.186-1.355,4.993-5.155,9.848-5.261,3.448-.08,6.786,1.7,9.959,5.288C27.217,32.4,23.41,36.226,18.555,36.332ZM18.5,27.166a3.882,3.882,0,1,0,4.028,3.879A3.96,3.96,0,0,0,18.5,27.166Zm0,6.191a2.313,2.313,0,1,1,2.4-2.312A2.359,2.359,0,0,1,18.5,33.357Z" transform="translate(-17256.5 -18269.186)" fill="#b7b7b7"/>
                                        </g>
                                    </g>
                                    </svg> }
                                    </a>
                            </div>
                            <div className="btn-container mb-4">
                                <a href="javascript:void(0)" title="Login with OTP">Login with OTP</a>
                                <a href="javascript:void(0)" title="Forgot Password?" className="float-right">Forgot Password?</a>
                            </div>
                            <button className="btn btn-brand btn-block">LOGIN</button>
                            <p className="mb-0 mt-4">New to MedPlus Mart? <a href="javascript:void(0)" title="register" className="ml-2 font-weight-bold">Register</a></p>
                        </div>
                        <div className="w-75-form d-none">
                            <div className="form-group has-float-label">
                                <input type="text" className="form-control"  id="loginId"  name="Email/Phone"  maxLength="20" autoComplete="off" value="+91 8688881231" required placeholder=" " disabled/>
                            </div>
                            <div className="form-group has-float-label">
                                <input type="text" className="form-control"  id="otp-feild"  name="password"  maxLength="20" autoComplete="off" required placeholder=" "/>
                                <label  for="otp-feild">Enter OTP</label>
                            </div>
                            <div className="btn-container mb-4">
                                <a href="javascript:void(0)" title="Resend OTP">Resend OTP</a>
                                {/* <a href="javascript:void(0)" title="OTP on Call" className="float-right">OTP on Call</a> */}
                            </div>
                            <button className="btn btn-brand btn-block">LOGIN</button>
                            <p className="mt-4 mb-0">New to MedPlus Mart? <a href="javascript:void(0)" title="register" className="ml-2 font-weight-bold">Register</a></p>
                        </div>
                        <div className="w-75-form d-none">
                        <div className="form-group has-float-label">
                                <input type="text" className="form-control"  id="f-loginId"  name="Email/Phone"  maxLength="20" autoComplete="off" required placeholder=" "/>
                                <label  for="f-loginId">Email Id / Mobile No</label>
                        </div>
                            <button className="btn btn-brand btn-block">SEND PASSWORD</button>
                            <p className="mt-4 mb-0">New to MedPlus Mart? <a href="javascript:void(0)" title="register" className="ml-2 font-weight-bold">Register</a></p>
                        </div>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    )
}
export default SignInPopUp;