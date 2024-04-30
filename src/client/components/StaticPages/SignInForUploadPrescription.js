import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody} from 'reactstrap';
import SignInModalImg from '../../images/common/registration-page-img.svg';
const SignInForUploadPrescription = () => {
    const [signInModal, setSignInModal] = useState(true);
    const [showOtpSection, setShowOtpSection] = useState(false);
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
                    { !showOtpSection && <React.Fragment>
                        <h6 className="title">
                            Hello User,
                            <strong>Mobile Number Verification</strong>
                        </h6>
                        <small>To upload prescription, please provide your registered mobile number to receive the One-Time Password (OTP)</small>
                        <div className="w-75-form">
                            <div className="form-group has-float-label">
                                <input type="text" className="form-control"  id="loginNumber"  name="LoginNumber"  maxLength="20" autoComplete="off" required placeholder=" "/>
                                <label  for="loginNumber">Mobile No</label>
                            </div>
                            <button className="btn btn-brand btn-block" onClick={ ()=> setShowOtpSection(!showOtpSection)}>Send OTP</button>
                        </div>
                    </React.Fragment> }

                    { showOtpSection && <React.Fragment>
                        <h6 className="title">
                            Hello User,
                            <strong>OTP</strong>
                        </h6>
                        <small>Please type OTP sent to <span className="h6 ml-1">9666870341</span></small>
                    <div className="w-75-form">
                        <div className="form-group has-float-label">
                            <input type="text" className="form-control"  id="otp-feild"  name="password"  maxLength="20" autoComplete="off" required placeholder=" "/>
                            <label  for="otp-feild">Enter OTP</label>
                        </div>
                        <div className="btn-container mb-4">
                            <a href="javascript:void(0)" title="Resend OTP">Resend OTP</a>
                            {/* <a href="javascript:void(0)" title="OTP on Call" className="float-right">OTP on Call</a> */}
                        </div>
                        <div className="d-flex">
                            <button className="btn brand-secondary btn-block mr-3">Change Number</button>
                            <button className="btn btn-brand btn-block mt-0">Verify OTP</button>
                        </div>
                    </div>
                    </React.Fragment> }
                </div>
            </div>
        </ModalBody>
    </Modal>
    )
}
export default SignInForUploadPrescription;