import React, { useState ,useEffect } from 'react';
import MyAccountService from '../../../services/MyAccountService';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import Validate from '../../../helpers/Validate';
import {Alert,ALERT_TYPE_SUCCESS,ALERT_TYPE_INFO} from '../../Common/Alert';
import UserInfoAction from '../../../../redux/action/UserInfoAction';

const ChangepasswordModal = (props) => {
    
    const userInfoAction = UserInfoAction();
    const userInfo = userInfoAction.getUserInfo();
    const [errorMsg, setErrorMsg] = useState({});
    const [isProcessLoading, setProcessLoading] = useState(false);
    const [passwordObject,setPasswordObject] = useState({});
    const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
    const validate = Validate();
    const myAccountService = MyAccountService();
    const closePasswordModal = () =>{
        setPasswordObject({});
        setErrorMsg({});
        setProcessLoading(false);
        props.toggleModal();
    }

    const handleOnChange = event => {
        let feildName = event.target.id;
        let feildValue = event.target.value;
        setPasswordObject({...passwordObject, [feildName]: feildValue});
    }

    const preventSpace = e =>{
        if (e.keyCode == 32) {
			e.preventDefault();
		}
    }
    
    const handleValidation = (e) =>{
        setErrorMsg({...errorMsg,[e.target.id]: ''})
    }
    
    const handleInputChange = event => {
        let errMsg = passwordObjectValidation(event);
        let feildName = event.target.id;
        if (errMsg)  {
            setErrorMsg({[feildName]:errMsg});
        } else {
            setErrorMsg({});
        }
        if (event.target.id.indexOf('rePassword') > -1) {
            if(event.target.value != passwordObject.newPassword){
                setErrorMsg({[feildName]:"Password and re-enter password do not match."});
            }else{
                setErrorMsg({});
            }
        }
    }

    const passwordObjectValidation = (e) =>{
        if (e.target.id.indexOf('oldPassword') > -1) {
            return validate.password(e.target.value,"Old Password", 20);
        }
        if (e.target.id.indexOf('newPassword') > -1) {
            return validate.password(e.target.value, "New Password", 20);
        }
    }

    const changePassword = (event) => {
        if("Enter" === event.key){
            updatePassword(passwordObject);
        }
    }

    const updatePassword = (passwordObject) =>{
        setProcessLoading(true);
        if(validate.isEmpty(passwordObject)) {
            setErrorMsg({["oldPassword"]:validate.password(passwordObject.oldPassword, "Old Password", 20)});setProcessLoading(false);
            return;
        } else if(validate.isEmpty(passwordObject.oldPassword) || validate.isNotEmpty(validate.password(passwordObject.oldPassword, "oldPassword", 20))) {
            setErrorMsg({["oldPassword"]:validate.password(passwordObject.oldPassword, "Old Password", 20)});setProcessLoading(false);
            return;
        } else if(validate.isEmpty(passwordObject.newPassword) || validate.isNotEmpty(validate.password(passwordObject.newPassword, "newPassword", 20))) {
            setErrorMsg({["newPassword"]:validate.password(passwordObject.newPassword, "New Passowrd", 20)});setProcessLoading(false);
            return;
        } else if(passwordObject.newPassword != passwordObject.rePassword) {
            setErrorMsg({["rePassword"]:"Password and re-enter password do not match."});setProcessLoading(false);
            return;
        }
        myAccountService.changePassword(passwordObject).then(response =>{
            if(validate.isNotEmpty(response) && response.statusCode === "SUCCESS") {        
                setAlertInfo({message:response.message,type:ALERT_TYPE_SUCCESS});
                closePasswordModal();
            }else if(validate.isNotEmpty(response) && validate.isNotEmpty(response.message) && response.message == "BOTH_PASSWORDS_SAME" ){
                setProcessLoading(false);
                setPasswordObject({
                    oldPassword : '',
                    newPassword : '',
                    rePassword : ''
                });
                setErrorMsg({["oldPassword"]:"Your new password can not be same as your current password."});
            }else if(validate.isNotEmpty(response) && validate.isNotEmpty(response.message) && response.message == "INCORRECT_PASSWORD" ){
                setProcessLoading(false);
                setPasswordObject({
                    oldPassword : '',
                    newPassword : '',
                    rePassword : ''
                });
                setErrorMsg({["oldPassword"]:"Incorrect password. Please try again."});
            }else{
                closePasswordModal();
                setAlertInfo({message:response.message,type:ALERT_TYPE_INFO,});
            }
        }).catch(function(error) {
            setErrorMsg({});
            setProcessLoading(true);
            props.toggleModal();
            setAlertInfo({message:"System experiencing some problem, Please try after some time",type:ALERT_TYPE_INFO});
            return;
        });

    }
    
    const CloseButton = <button type="button" disabled={isProcessLoading} onClick={()=>{closePasswordModal()}} className="close" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <rect fill="none" width="24" height="24"/>
                            <path fill="#b9b9b9" d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm4.853,15.439a.5.5,0,0,1,0,.707l-.707.707a.5.5,0,0,1-.707,0L12,13.414,8.561,16.853a.5.5,0,0,1-.707,0l-.707-.707a.5.5,0,0,1,0-.707L10.586,12,7.147,8.561a.5.5,0,0,1,0-.707l.707-.707a.5.5,0,0,1,.707,0L12,10.586l3.439-3.439a.5.5,0,0,1,.707,0l.707.707a.5.5,0,0,1,0,.707L13.414,12Z"/>
                            </svg>
                        </button>
    return (
        <React.Fragment>
            <Alert className="toast-container b-m" alertInfo={alertInfo} duration={5000} onDurationEnd={setAlertInfo}/>
            <Modal autoFocus={false} className="my-account-modal change-password-popup modal-lg modal-dialog-centered" backdrop="static" isOpen={props.isModalOpen} toggle={props.toggleModal}>
                <ModalHeader toggle={props.toggleModal} close={CloseButton}>
                    Change Password
                </ModalHeader>
                <ModalBody>
                    <div className="row mx-0">
                        <div className="col-6 my-account-popup-bg-icon"></div>
                        <div className="col-6">
                            <div className="form-group filled-form">
                                <input type="text" disabled className="disabled form-control text-truncate" id="user-mail" name="User mail" maxLength="40" autoComplete="new-off" defaultValue={userInfo.userLoginId}/>
                                <label className="select-label">User Id</label>
                            </div>
                            <div className="form-group filled-form">
                                <input onFocus={handleValidation} autoFocus  type="password" className={validate.isNotEmpty(errorMsg["oldPassword"]) ? "form-control is-invalid" : "form-control"} id="oldPassword" name="Old Password" maxLength={20} value = {passwordObject.oldPassword} required autoComplete="new-off" onBlur={(event)=>handleInputChange(event)} onChange={handleOnChange} onKeyDown={preventSpace} defaultValue={passwordObject.oldPassword} onKeyPress={(event) => changePassword(event)} />
                                <label className="select-label" >Old Password <sup className="text-danger">*</sup></label>
                                <div className="invalid-feedback d-block">
                                    {errorMsg['oldPassword']}
                                </div>
                            </div>
                            <div className="form-group filled-form">
                                <input onFocus={handleValidation} type="password" className={validate.isNotEmpty(errorMsg["newPassword"]) ? "form-control is-invalid" : "form-control"}  id="newPassword"  name="New Password" value = {passwordObject.newPassword} required autoComplete="new-off" onBlur={(event)=>handleInputChange(event)} onChange={handleOnChange} onKeyDown={preventSpace} defaultValue={passwordObject.newPassword} onKeyPress={(event) => changePassword(event)} maxLength={20}/>
                                <label  className="select-label">New Password <sup className="text-danger">*</sup></label>
                                {validate.isEmpty(errorMsg['newPassword']) &&
                                <small class="form-text text-muted">
                                    Password must be 6-20 characters long.
                                </small>}
                                <div className="invalid-feedback d-block">
                                    {errorMsg['newPassword']}
                                </div>
                            </div>
                            <div className="form-group filled-form">
                                <input onFocus={handleValidation} type="password" className={validate.isNotEmpty(errorMsg["rePassword"]) ? "form-control is-invalid" : "form-control"}  id="rePassword" name="Re-Enter Password" value = {passwordObject.rePassword} required autoComplete="new-off" onBlur={(event)=>handleInputChange(event)} onChange={handleOnChange} onKeyDown={preventSpace} defaultValue={passwordObject.rePassword} onKeyPress={(event) => changePassword(event)} maxLength={20}/>
                                <label  className="select-label">Re-Enter Password <sup className="text-danger">*</sup></label>
                                <div className="invalid-feedback d-block">
                                    {errorMsg['rePassword']}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center mt-4">
                        <button type="button" className="brand-secondary btn px-5 rounded-pill" disabled={isProcessLoading} onClick={()=>{closePasswordModal()}}>Cancel</button>
                        <button type="button" className="btn btn-brand-gradient rounded-pill px-5 ml-3" disabled={isProcessLoading} onClick={() => updatePassword(passwordObject)}>
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

export default ChangepasswordModal;