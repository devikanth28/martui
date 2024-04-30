import React, { useState ,useEffect } from 'react';
import MyAccountService from '../../../services/MyAccountService';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import Validate from '../../../helpers/Validate';
import {Alert,ALERT_TYPE_SUCCESS,ALERT_TYPE_INFO} from '../../Common/Alert';
import { getSelectedLocality} from '../../../../redux/action/LocalityAction';
import UserInfoAction from '../../../../redux/action/UserInfoAction';
import LocalitySearch from '../../Locality/LocalitySearch';
const ChangeAddressModal = (props) => {
    
    const [errorMsg, setErrorMsg] = useState({});
    const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
    const validate = Validate();
    const myAccountService = MyAccountService();
    var selectedLocality = getSelectedLocality();
    const userInfoAction = UserInfoAction();
    var userInfo = userInfoAction.getUserInfo();
    const [isProcessLoading, setProcessLoading] = useState(false);
    var userContactDetails = userInfoAction.getUserContactDetails();
    const [userProfile,setUserProfile] = useState({
        firstName : validate.isNotEmpty(userInfo.firstName) ? userInfo.firstName : "" ,
        lastName : validate.isNotEmpty(userInfo.lastName) ? userInfo.lastName : "" ,
        addressLine : validate.isNotEmpty(userContactDetails.addressLine) ? userContactDetails.addressLine : "" ,
        locality : validate.isNotEmpty(userContactDetails.locality) ? userContactDetails.locality : selectedLocality.localityName ,
        localityId : validate.isNotEmpty(userContactDetails.localityId) ? userContactDetails.localityId : "99999",
        city : validate.isNotEmpty(userContactDetails.city) ? userContactDetails.city : selectedLocality.city ,
        state : validate.isNotEmpty(userContactDetails.state) ? userContactDetails.state : selectedLocality.state ,
        pincode : validate.isNotEmpty(userContactDetails.pincode) ? userContactDetails.pincode : selectedLocality.pincode,
        receiveUpdates : validate.isNotEmpty(userInfo.recieveUpdates) ? userInfo.recieveUpdates : true 
    });

    useEffect(()=>{
        setUserProfile({
            firstName : validate.isNotEmpty(userInfo.firstName) ? userInfo.firstName : "" ,
            lastName : validate.isNotEmpty(userInfo.lastName) ? userInfo.lastName : "" ,
            addressLine : validate.isNotEmpty(userContactDetails.addressLine) ? userContactDetails.addressLine : "" ,
            locality : validate.isNotEmpty(userContactDetails.locality) ? userContactDetails.locality : selectedLocality.localityName ,
            localityId : validate.isNotEmpty(userContactDetails.localityId) ? userContactDetails.localityId : "99999",
            city : validate.isNotEmpty(userContactDetails.city) ? userContactDetails.city : selectedLocality.city ,
            state : validate.isNotEmpty(userContactDetails.state) ? userContactDetails.state : selectedLocality.state ,
            pincode : validate.isNotEmpty(userContactDetails.pincode) ? userContactDetails.pincode : selectedLocality.pincode,
            receiveUpdates : validate.isNotEmpty(userInfo.recieveUpdates) ? userInfo.recieveUpdates : true
        });
    },[userInfo,userContactDetails]);

    const closeAddressModal = () =>{
        setUserProfile({
            firstName : validate.isNotEmpty(userInfo.firstName) ? userInfo.firstName : "" ,
            lastName : validate.isNotEmpty(userInfo.lastName) ? userInfo.lastName : "" ,
            addressLine : validate.isNotEmpty(userContactDetails.addressLine) ? userContactDetails.addressLine : "" ,
            locality : validate.isNotEmpty(userContactDetails.locality) ? userContactDetails.locality : selectedLocality.localityName ,
            localityId : validate.isNotEmpty(userContactDetails.localityId) ? userContactDetails.localityId : "99999",
            city : validate.isNotEmpty(userContactDetails.city) ? userContactDetails.city : selectedLocality.city ,
            state : validate.isNotEmpty(userContactDetails.state) ? userContactDetails.state : selectedLocality.state ,
            pincode : validate.isNotEmpty(userContactDetails.pincode) ? userContactDetails.pincode : selectedLocality.pincode,
            receiveUpdates : validate.isNotEmpty(userInfo.recieveUpdates) ? userInfo.recieveUpdates : true
        });
        setErrorMsg({})
        props.toggleModal();
        setProcessLoading(false);
    }

    const handleOnChange = event => {
        let feildName = event.target.id;
        let feildValue = event.target.value;
        setUserProfile({...userProfile, [feildName]: feildValue});
    }

    const handleValidation = (e) =>{
        setErrorMsg({...errorMsg,[e.target.id]: ''})
    }

    const handleInputChange = event => {
        let feildName = event.target.id;
        let errMsg = validateUserProfile(event);
        if (errMsg)  {
            setErrorMsg(errorMsg => ({...errorMsg, [feildName]:errMsg}));
        } else {
            setErrorMsg({...errorMsg,[feildName]: ''});
        }
    }

    const validateUserProfile = (e) =>{
        if (e.target.id.indexOf('firstName') > -1) {
            return validate.name(e.target.value,"First Name", 20);
        }else if (e.target.id.indexOf('lastName') > -1) {
            return validate.lastName(e.target.value, "Last Name", 30);
        }else if (e.target.id.indexOf('addressLine') > -1) {
            return validate.address(e.target.value,true,"Address", 200);
        }else if (e.target.id.indexOf('locality') > -1) {
            return validate.address(e.target.value, true, "Locality", 45);
        }
    }

    const updateUserProfile = (event) => {
        if("Enter" === event.key){
            changeAddress(userProfile);
        }
    }

    const changeAddress = (userProfile) =>{
        setProcessLoading(true);
        if(validate.isEmpty(userProfile)) {
            setErrorMsg({["firstName"]:validate.name(userProfile.firstName, "First Name", 20)});
            setProcessLoading(false);
            return;
        } else if(validate.isEmpty(userProfile.firstName) || validate.isNotEmpty(validate.name(userProfile.firstName, "First Name", 20))){
            setErrorMsg({["firstName"]:validate.name(userProfile.firstName, "First Name", 20)});
            setProcessLoading(false);
            return;
        } else if(validate.isEmpty(userProfile.lastName) || validate.isNotEmpty(validate.lastName(userProfile.lastName, "Last Name", 30))) {
            setErrorMsg({["lastName"]:validate.lastName(userProfile.lastName, "Last Name", 30)});
            setProcessLoading(false);
            return;
        } else if(validate.isEmpty(userProfile.addressLine) || validate.isNotEmpty(validate.address(userProfile.addressLine,true, "Address", 200))) {
            setErrorMsg({["addressLine"]:validate.address(userProfile.addressLine,true, "Address", 200)});
            setProcessLoading(false);
            return;
        } else if(validate.isEmpty(userProfile.locality) || validate.isNotEmpty(validate.address(userProfile.locality,true, "Locality", 200)) || validate.isEmpty(userProfile.city) || validate.isEmpty(userProfile.state) || validate.isEmpty(userProfile.pincode)) {
            setAlertInfo({message:"please select a valid locality",type:ALERT_TYPE_INFO});
            setProcessLoading(false);
            return;
        }
        let customer = {};
        let address = {};
        customer['firstName'] = userProfile.firstName;
        customer['lastName'] =userProfile.lastName;
        customer['emailId'] = userContactDetails.emailAddress;
        customer['customerID'] = userInfo.medplusId;
        customer['createdBy'] = userInfo.medplusId;
        customer['modifiedBy'] = userInfo.medplusId;
        customer['receiveUpdates'] = userProfile.receiveUpdates ? "1" : "0";
        customer['webLoginID'] = userInfo.userLoginId;
        address['address'] = userProfile.addressLine;
        address['locality'] = userProfile.locality;
        address['city'] = userProfile.city;
        address['state'] = userProfile.state;
        address['pincode'] =userProfile.pincode;
        myAccountService.changeAddress({customer : JSON.stringify(customer) , addressStr : JSON.stringify(address).replace(/&/g, "-amp-").replace(/amp;/g," "),localityId:userProfile.localityId}).then(response =>{
            if(validate.isNotEmpty(response) && response.statusCode === "SUCCESS") {
                Promise.resolve(userInfoAction.setUserInfo(response.dataObject.userInfo),
                userInfoAction.setUserContactDetails(response.dataObject.userContactDetails)).then(
                    props.updateUserDetailsInState(response.dataObject.userInfo,response.dataObject.userContactDetails),
                    closeAddressModal()
                )
                // setAlertInfo({message:response.message,type:ALERT_TYPE_SUCCESS});               
            }else{
                closeAddressModal();
                setAlertInfo({message:response.message,type:ALERT_TYPE_INFO});
            }
        }).catch(function(error) {
            closeAddressModal();
            setAlertInfo({message:"System experiencing some problem, Please try after some time",type:ALERT_TYPE_INFO});
            return;
        });

    }
    const CloseButton = <button type="button" disabled={isProcessLoading} onClick={closeAddressModal} className="close" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <rect fill="none" width="24" height="24"/>
                            <path fill="#b9b9b9" d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm4.853,15.439a.5.5,0,0,1,0,.707l-.707.707a.5.5,0,0,1-.707,0L12,13.414,8.561,16.853a.5.5,0,0,1-.707,0l-.707-.707a.5.5,0,0,1,0-.707L10.586,12,7.147,8.561a.5.5,0,0,1,0-.707l.707-.707a.5.5,0,0,1,.707,0L12,10.586l3.439-3.439a.5.5,0,0,1,.707,0l.707.707a.5.5,0,0,1,0,.707L13.414,12Z"/>
                            </svg>
                        </button>
    return (
        <React.Fragment>
            <Alert className="toast-container b-m" alertInfo={alertInfo} duration={5000} onDurationEnd={setAlertInfo}/>
            <Modal autoFocus={false} className="my-account-modal change-address-popup modal-lg modal-dialog-centered" backdrop="static" isOpen={props.isModalOpen} toggle={props.toggleModal}>
                <ModalHeader toggle={props.toggleModal} close={CloseButton}>
                     Change Address
                </ModalHeader>
                <ModalBody>
                    <div className="row">
                    <div className="col-6 my-account-popup-bg-icon"></div>
                        <div className="col-6 p-0">
                            <div className="form-group filled-form">
                                <input type="text" autoFocus onFocus={handleValidation} className={validate.isNotEmpty(errorMsg["firstName"]) ? "form-control is-invalid" : "form-control"}  id="firstName"  name="first name"  maxLength="20" autoComplete="new-off" value={userProfile.firstName} onBlur={handleInputChange} onChange={handleOnChange} defaultValue={userProfile.firstName} onKeyPress={(event) => updateUserProfile(event)} />
                                <label  className="select-label">Enter your first name <sup className="text-danger">*</sup></label>
                                <div className="invalid-feedback d-block">
                                    {errorMsg['firstName']}
                                </div>
                            </div>
                            <div className="form-group filled-form">
                                <input type="text" onFocus={handleValidation} className={validate.isNotEmpty(errorMsg["lastName"]) ? "form-control is-invalid" : "form-control"}  id="lastName"  name="last name"  maxLength="30" autoComplete="new-off" value={userProfile.lastName} onBlur={handleInputChange} onChange={handleOnChange} defaultValue={userProfile.lastName} onKeyPress={(event) => updateUserProfile(event)} />
                                <label  className="select-label">Enter your last name <sup className="text-danger">*</sup></label>
                                <div className="invalid-feedback d-block">
                                    {errorMsg['lastName']}
                                </div>
                            </div>
                            <div className="form-group filled-form mb-4">
                                <input type="text" onFocus={handleValidation} className={validate.isNotEmpty(errorMsg["addressLine"]) ? "form-control is-invalid" : "form-control"}  id="addressLine"  name="address" maxLength="200" value={userProfile.addressLine} autoComplete="new-off" onBlur={handleInputChange} onChange={handleOnChange} defaultValue={userProfile.addressLine} onKeyPress={(event) => updateUserProfile(event)} />
                                <label  className="select-label">Door Number/Building Name/Street Name <sup className="text-danger">*</sup></label>
                                <div className="invalid-feedback d-block">
                                    {errorMsg['addressLine']}
                                </div>
                            </div>
                            <p className="font-weight-bold">Select locality</p>
                            <LocalitySearch changeAddress={changeAddress} userProfile={userProfile} setUserProfile = {setUserProfile} isFromChangeAddressModal={true}/>
                            <div className="form-group filled-form">
                                <input type="text" disabled className="form-control disabled"  id="city" name="city feild" Value={userProfile.city+", "+userProfile.state+", "+userProfile.pincode} maxLength="40" required="" autoComplete="new-off" />
                                <label  className="select-label">City, State, Pincode</label>
                            </div>
                            {/* <div className="form-group filled-form">
                                <input type="text" disabled className="form-control disabled"  id="state" name="state feild" Value={userProfile.state} maxLength="40" required="" autoComplete="new-off"/>
                                <label  className="select-label">State</label>
                            </div>
                            <div className="form-group filled-form">
                                <input type="text" disabled className="form-control disabled"  id="pincode" name="pin code feild" Value={userProfile.pincode} maxLength="40" required="" autoComplete="new-off" />
                                <label  className="select-label">Pincode</label>
                            </div> */}
                        </div>
                    </div>
                    <div className="row justify-content-end">
                        <div className="custom-control custom-checkbox d-inline-block pointer" onClick={()=>{setUserProfile({
                                ...userProfile,
                                receiveUpdates : !userProfile.receiveUpdates
                            });}}>
                            <input type="checkbox" className="custom-control-input" id="recieveUpdates" checked={userProfile.receiveUpdates} readOnly/>
                            <label className="custom-control-label" htmlFor="recieve-updates">Yes I would like to be updated of new promotional offers.</label>
                        </div>
                    </div>
                    <div className="text-center mt-4">
                        <button type="button" className="brand-secondary btn px-5 rounded-pill" disabled={isProcessLoading} onClick={closeAddressModal}>Cancel</button>
                        <button type="button" className="btn btn-brand-gradient rounded-pill px-5 ml-3" disabled={isProcessLoading} onClick={() => changeAddress(userProfile)}>
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
export default ChangeAddressModal;