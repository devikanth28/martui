import React, { useState ,useEffect } from 'react';
import MyAccountService from '../../../services/MyAccountService';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import Validate from '../../../helpers/Validate';
import {Alert,ALERT_TYPE_SUCCESS,ALERT_TYPE_INFO} from '../../Common/Alert';
import UserInfoAction from '../../../../redux/action/UserInfoAction';
const ChangeEmailAddressModal = (props) => {
    
    const userInfoAction = UserInfoAction();
    const userContactDetails = userInfoAction.getUserContactDetails();
    const validate = Validate();
    const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
    const [newEmailAddress,setNewEmailAddress] = useState('');
    const [isProcessLoading, setProcessLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState({});
    const myAccountService = MyAccountService();
    const closeEmailAddressModel = () =>{
        setNewEmailAddress('');
        setErrorMsg({});
        props.toggleModal();
    }

    const handleOnChange = event => {
        let id = event.target.id;
        setNewEmailAddress(event.target.value);
    }

    const handleValidation = (e) =>{
        setErrorMsg({...errorMsg,[e.target.id]: ''})
    }
    const handleInputChange = event => {
        let errMsg = validate.email(event.target.value,45);
        if (errMsg)  {
            setErrorMsg({['newEmailAddress']:errMsg});
        } else {
            setErrorMsg({});
        }
        setNewEmailAddress(event.target.value);
    }
    
    const changeEmailAddress = (event) => {
        if("Enter" === event.key){
            updateEmailAddress(newEmailAddress);
        }
    }

    const updateEmailAddress = (newEmailAddress) =>{
        setProcessLoading(true);
        if(validate.isEmpty(newEmailAddress) || validate.isNotEmpty(validate.email(newEmailAddress, 45))) {
            setErrorMsg({["newEmailAddress"]:validate.email(newEmailAddress, 45)});
            setNewEmailAddress();setProcessLoading(false);
            return;
        }
        if(userContactDetails.emailAddress == newEmailAddress){
            setErrorMsg({["newEmailAddress"]:"Please enter different email id"});
            setProcessLoading(false);
            return;
        }
        myAccountService.changeEmailAddress(newEmailAddress).then(response =>{
            if(validate.isNotEmpty(response) && response.statusCode === "SUCCESS") {
                setProcessLoading(false);
                userInfoAction.setUserInfo(response.dataObject.userInfo);
                userInfoAction.setUserContactDetails(response.dataObject.userContactDetails);
                props.updateUserDetailsInState(response.dataObject.userInfo,response.dataObject.userContactDetails);
                closeEmailAddressModel();
                // setAlertInfo({message:response.message,type:ALERT_TYPE_SUCCESS});               
            }else{
                closeEmailAddressModel();
                setProcessLoading(false);
                setAlertInfo({message:response.message,type:ALERT_TYPE_INFO});
            }
        }).catch(function(error) {
            closeEmailAddressModel();
            setProcessLoading(false);
            setAlertInfo({message:"System experiencing some problem, Please try after some time",type:ALERT_TYPE_INFO});
            return;
        });
    }
    
    const CloseButton = <button type="button" disabled={isProcessLoading} onClick={()=>{closeEmailAddressModel()}} className="close" >
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
                    {validate.isNotEmpty(userContactDetails.emailAddress) &&
                        <React.Fragment>
                            Change Email Address
                        </React.Fragment>
                    }
                    {validate.isEmpty(userContactDetails.emailAddress) &&
                        <React.Fragment>
                            Add Email Address
                        </React.Fragment>
                    }
                </ModalHeader>
                <ModalBody>
                <div className="row mx-0">
                    <div className="col-6 my-account-popup-bg-icon"></div>
                    <div className="col-6">
                        {userContactDetails && userContactDetails.emailAddress && <div className="form-group filled-form">
                            <input type="text" disabled className="disabled form-control"  id="currentEmailAddress"  defaultValue={userContactDetails.emailAddress} name="user mail id"  autoComplete="new-off"/>
                            <label className="select-label">Current Email Address</label>
                        </div>}
                        <div className="form-group filled-form mb-0">
                            <input type="text" className={validate.isNotEmpty(errorMsg["newEmailAddress"]) ? "form-control is-invalid" : "form-control"}  id="newEmailAddress" name="New Mail Address" maxLength="45" autoFocus required autoComplete="new-off" value={newEmailAddress} onFocus={handleValidation} onBlur={handleInputChange} onChange={handleOnChange} defaultValue={newEmailAddress} onKeyPress={(event) => changeEmailAddress(event)}/>
                            <label className="select-label">{validate.isNotEmpty(userContactDetails.emailAddress) ? "Enter New Mail Address" : "Enter Mail Address"} <sup className="text-danger">*</sup></label>
                            <div className="invalid-feedback d-block">
                                {errorMsg['newEmailAddress']}
                             </div>
                        </div>
                    </div>
                </div>
                    <div className="text-center mt-4">
                        <button type="button" className="brand-secondary btn px-5 rounded-pill custom-btn-lg" disabled={isProcessLoading} onClick={()=>{closeEmailAddressModel()}}>Cancel</button>
                        <button type="button" className="btn btn-brand-gradient rounded-pill px-5 ml-3 custom-btn-lg" disabled={isProcessLoading} onClick={() =>{updateEmailAddress(newEmailAddress)}}>
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
export default ChangeEmailAddressModal;