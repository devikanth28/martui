import React, { useState ,useEffect } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import Validate from '../../../helpers/Validate';
import {Alert,ALERT_TYPE_SUCCESS,ALERT_TYPE_INFO} from '../../Common/Alert';
import UserInfoAction from '../../../../redux/action/UserInfoAction';
import RegistrationService from '../../../services/RegistrationService'
import CartAction from '../../../../redux/action/CartAction';

const UpdateProfileModal = (props) => {
    
    const userInfoAction = UserInfoAction();
    const registrationService = RegistrationService();
    const userInfo = userInfoAction.getUserInfo();
    const userContactDetails = userInfoAction.getUserContactDetails();
    const validate = Validate();
    const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
    const [emailAddress,setEmailAddress] = useState('');
    const [fullName, setFullName] = useState('');
    const [isProcessLoading, setProcessLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState({});
    const isEmailAvailable = validate.isNotEmpty(userContactDetails) && validate.isNotEmpty(userContactDetails.emailAddress);

    useEffect(() => {
        setFullName(validate.isNotEmpty(userInfo) && !validate.isNumeric(userInfo.firstName) ? userInfo.firstName != userInfo.lastName ? `${userInfo.firstName} ${userInfo.lastName}` : userInfo.firstName : '');
        setEmailAddress(validate.isNotEmpty(userContactDetails) && validate.isNotEmpty(userContactDetails.emailAddress) ? userContactDetails.emailAddress : '');
    },[props.isModalOpen]);

    const closeUpdateProfileModel = () =>{
        setFullName('');
        setEmailAddress('');
        setErrorMsg({});
        props.toggleModal();
    }

    const handleOnChange = event => {
        let id = event.target.id;
        if(id === 'emailAddress'){
            setEmailAddress(event.target.value);
            setErrorMsg('');
        }
        if(id === 'fullName'){
            setFullName(event.target.value);
        }
    }

    const handleValidation = (e) =>{
        setErrorMsg({...errorMsg,[e.target.id]: ''})
    }
    const handleInputChange = event => {
        let errMsg = validate.email(event.target.value,45);
        if (errMsg)  {
            setErrorMsg({['emailAddress']:errMsg});
        } else {
            setErrorMsg({});
        }
        setEmailAddress(event.target.value);
    }

    const handleFullName = event => {
        let errMsg = validate.name(event.target.value,"Full Name", 30);
        if (errMsg)  {
            setErrorMsg({['fullName']:errMsg});
        } else {
            setErrorMsg({});
        }
        setFullName(event.target.value);
    }
    
    const updateProfile = (event) => {
        if("Enter" === event.key){
            updateUserDetails(emailAddress,fullName)
        }
    }

    const updateUserDetails = (emailAddress,fullName) => {
        setProcessLoading(true);
        let errorsFlagMsgs = {}
        let errorFlag = false;
        if(validate.isEmpty(fullName) || validate.isNotEmpty(validate.name(fullName, "Full Name", 30))){
            errorsFlagMsgs = {...errorsFlagMsgs, ["fullName"]:validate.name(fullName, "Full Name", 30)};
            setProcessLoading(false);
            errorFlag = true
        }
        if(isEmailAvailable){
            if(validate.isEmpty(emailAddress) || validate.isNotEmpty(validate.email(emailAddress, 45))) {
                errorsFlagMsgs = {...errorsFlagMsgs, ["emailAddress"]:validate.email(emailAddress, 45)};
                setProcessLoading(false);
                errorFlag = true
            }
        } else {
            if(validate.isNotEmpty(emailAddress) && validate.isNotEmpty(validate.email(emailAddress, 45))) {
                errorsFlagMsgs = {...errorsFlagMsgs, ["emailAddress"]:validate.email(emailAddress, 45)};
                setProcessLoading(false);
                errorFlag = true
            }
        }
        if (errorFlag) {
            setProcessLoading(false);
            setErrorMsg(errorsFlagMsgs);
            return;
        }
        let customer = {};
        customer['firstName'] = fullName;
        customer['emailId'] = emailAddress;
        registrationService.registerNewCustomer({customer : JSON.stringify(customer)}).then(response =>{
            if(validate.isNotEmpty(response) && response.statusCode === "SUCCESS") {
                setProcessLoading(false);
                userInfoAction.setUserInfo(response.dataObject.userInfo);
                userInfoAction.setUserContactDetails(response.dataObject.userContactDetails);
                props.updateUserDetailsInState(response.dataObject.userInfo,response.dataObject.userContactDetails);
                closeUpdateProfileModel();
            }else{
                setAlertInfo({message:response.message,type:ALERT_TYPE_INFO});
                closeUpdateProfileModel();
            }
            setProcessLoading(false);
        }).catch(function(error) {
            console.log(error);
            closeUpdateProfileModel();
            setProcessLoading(false);
            setAlertInfo({message:"System experiencing some problem, Please try after some time",type:ALERT_TYPE_INFO});
            return;
        });
    }

    const CloseButton = <button type="button" disabled={isProcessLoading} onClick={()=>{closeUpdateProfileModel()}} className="close" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <rect fill="none" width="24" height="24"/>
                            <path fill="#b9b9b9" d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm4.853,15.439a.5.5,0,0,1,0,.707l-.707.707a.5.5,0,0,1-.707,0L12,13.414,8.561,16.853a.5.5,0,0,1-.707,0l-.707-.707a.5.5,0,0,1,0-.707L10.586,12,7.147,8.561a.5.5,0,0,1,0-.707l.707-.707a.5.5,0,0,1,.707,0L12,10.586l3.439-3.439a.5.5,0,0,1,.707,0l.707.707a.5.5,0,0,1,0,.707L13.414,12Z"/>
                            </svg>
                        </button>
    return (
        <React.Fragment>
            <Alert className="toast-container b-m" alertInfo={alertInfo} duration={5000} onDurationEnd={setAlertInfo}/>
            <Modal autoFocus={false} className="my-account-modal change-email-popup modal-lg modal-dialog-centered" backdrop="static" isOpen={props.isModalOpen} toggle={props.toggleModal}>
                <ModalHeader toggle={props.toggleModal} close={CloseButton}>
                    <React.Fragment>
                        Update Profile
                    </React.Fragment>
                </ModalHeader>
                <ModalBody>
                <div className="row mx-0">
                    <div className="col-6 my-account-popup-bg-icon"></div>
                    <div className="col-6">
                        <div className="form-group filled-form">
                            <input type="text" className={validate.isNotEmpty(errorMsg["fullName"]) ? "form-control is-invalid" : "form-control"} id="fullName"  name="Full Name" maxLength="30" required autoFocus autoComplete="new-off" value={fullName} onFocus={handleValidation} onBlur={handleFullName} onChange={handleOnChange} onKeyPress={(event) => updateProfile(event)}/>
                            <label className="select-label">Full Name <sup className="text-danger">*</sup></label>
                            <div className="invalid-feedback d-block">
                                {errorMsg['fullName']}
                            </div>
                        </div>
                        <div className="form-group filled-form mb-0">
                            <input type="text" className="form-control" id="emailAddress" name="Email Address" maxLength="45" autoComplete="new-off" value={emailAddress} onChange={handleOnChange} onBlur={isEmailAvailable ? handleInputChange : ''} onFocus={isEmailAvailable ? handleValidation : ''} onKeyPress={(event) => updateProfile(event)}/>
                            <label className="select-label">Email Address</label>
                            <div className="invalid-feedback d-block">
                                {errorMsg['emailAddress']}
                            </div>
                        </div>
                    </div>
                </div>
                    <div className="text-center mt-4">
                        <button type="button" className="brand-secondary btn px-5 rounded-pill custom-btn-lg" disabled={isProcessLoading} onClick={()=>{closeUpdateProfileModel()}}>Cancel</button>
                        <button type="button" className="btn btn-brand-gradient rounded-pill px-5 ml-3 custom-btn-lg" disabled={isProcessLoading} onClick={() =>{updateUserDetails(emailAddress,fullName)}}>
                            {isProcessLoading ? "" : "Update"}
                            {isProcessLoading &&
                                <React.Fragment>
                                    <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                                    <span className="sr-only"></span>
                                </React.Fragment>
                            }
                        </button>
                    </div>
                </ModalBody>
            </Modal>    
        </React.Fragment>
    );
}
export default UpdateProfileModal;