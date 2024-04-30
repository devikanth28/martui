import React, { useState, useEffect } from 'react';
import UserInfoAction from '../../../../redux/action/UserInfoAction';
import changePasswordIcon from '../../../images/common/my-account-password-icn-cssbg.svg';
import changeEmailIcon from '../../../images/common/my-account-mail-icn-cssbg.svg';
import updateProfile from '../../../images/common/profile_black_icon_36px.svg'
import changePhoneNumberIcon from '../../../images/common/my-account-phn-icn-cssbg.svg';
import changeLocationIcon from '../../../images/common/my-account-loc-icn-cssbg.svg';
import Validate from '../../../helpers/Validate';
import ChangepasswordModal from './ChangePasswordModal';
import GeneratePasswordModal from './GeneratePasswordModal';
import ChangePhoneNumberModal from './ChangePhoneNumberModal';
import ChangeEmailAddressModal from './ChangeEmailAddressModal';
import ChangeAddressModal from './ChangeAddressModal';
import MyAccountService from '../../../services/MyAccountService';
import UpdateProfileModal from './UpdateProfileModal';
import Alert, { ALERT_TYPE_INFO } from '../../Common/Alert';
import DeleteAccount from './DeleteAccount';

const MyProfile = (props) => {

    const userInfoAction = UserInfoAction();
    const [userInfo,setUserInfo] = useState({});
    const [userContactDetails, setUserContactDetails] = useState(undefined);
    const myAccountService = MyAccountService();
    const validate = Validate();
    const [isChangePasswordModalOpen,setChangePasswordModalOpen] = useState(false);
    const [isChangeEmailAddressModalOpen,setChangeEmailAddressModalOpen] = useState(false);
    const [isChangePhoneNumberModalOpen,setChangePhoneNumberModalOpen] = useState(false);
    const [isChangeAddressModalOpen,setChangeAddressModalOpen] = useState(false);
    const [isGeneratePasswordModalOpen,setGeneratePasswordModalOpen] = useState(false);
    const [isUpdateProfileModalOpen, setUpdateProfileModalOpen] = useState(false);
    const [showGeneratePwd,setShowGeneratePwd] = useState(false);
    const [initialLoader,setInitialLoader]=useState(false);
    const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
    const toggleChangePasswordModal = () => setChangePasswordModalOpen(!isChangePasswordModalOpen);
    const toggleEmailAddressModal = () => setChangeEmailAddressModalOpen(!isChangeEmailAddressModalOpen);
    const togglePhoneNumberModal = () => setChangePhoneNumberModalOpen(!isChangePhoneNumberModalOpen);
    const toggleChangeAddressModal = () => setChangeAddressModalOpen(!isChangeAddressModalOpen);
    const toggleGeneratePasswordModal = () => setGeneratePasswordModalOpen(!isGeneratePasswordModalOpen);
    const toggleUpdateProfileModal = () => setUpdateProfileModalOpen(!isUpdateProfileModalOpen);

    useEffect( ()=> {
        setInitialLoader(true);
        setUserContactDetails(userInfoAction.getUserContactDetails());
        setUserInfo(userInfoAction.getUserInfo());
        checkUserPwd();
        userInfoAction.reloadUserInfo();
    },[]);

    const sendOtpForMobileNumber = () => {
        myAccountService.sendOtpForMobileNumber("N").then(response => {
            if (validate.isNotEmpty(response) && response.statusCode === "SUCCESS") {
                togglePhoneNumberModal(); 
            }else{
                setAlertInfo({message:response.message,type:ALERT_TYPE_INFO});
            }
        }).catch((error) => {
            console.log(error);
            setAlertInfo({message:"System experiencing some problem, Please try after some time",type:ALERT_TYPE_INFO});
            return;
        });
    }

    const checkUserPwd = () =>{
        myAccountService.getLoggedInUserInfo().then(response => {
            setShowGeneratePwd(false);
            if(validate.isNotEmpty(response) && response.statusCode == "SUCCESS" ){
                if(validate.isNotEmpty(response.dataObject.setPassword)){
                    setShowGeneratePwd(response.dataObject.setPassword);
                }
                setUserInfo(response.dataObject.userInfo);
                setUserContactDetails(response.dataObject.userContactDetails);
                
            }
            setInitialLoader(false);
        }).catch(function(error) {
            console.log(error);
            setInitialLoader(false);
        });
    }
    const updateUserDetailsInState=(userInfo,userContactDetails)=>{
        if(validate.isNotEmpty(userInfo)){
            setUserInfo(userInfo);
        }
       if(validate.isNotEmpty(userContactDetails)){
            setUserContactDetails(userContactDetails);
       }
       
    }
    const generatedPasswordUpdate = (ispwdGenerated,newEmailId) => {
        setShowGeneratePwd(!ispwdGenerated);
        if(ispwdGenerated){
            userContactDetails.emailAddress = newEmailId;
            userInfoAction.reloadUserInfo();
        }
    }
    if(initialLoader){
        return <React.Fragment>
         <div className="text-center w-100 mb-2">
                <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
            </div>
    </React.Fragment>
    }
    return (
        <React.Fragment>
            <Alert className="toast-container b-m" alertInfo={alertInfo} duration={5000} onDurationEnd={setAlertInfo}/>
            <section className="body-height my-profile-section">
                <div className="my-account-tab">
                    {validate.isNotEmpty(userInfo) &&validate.isNotEmpty(userInfo.displaybleName) &&
                        <div className='d-flex align-items-baseline'>
                            <h5 className="user-title mr-2">Hello,<span className="lead text-capitalize">{userInfo.displaybleName}</span></h5>
                            <button className='btn btn-link mx-n2' role="button" title='Update Profile' onClick={toggleUpdateProfileModal}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                                        <g id="edit_black_icon_18px" transform="translate(-180.257 -249.084)">
                                            <rect id="Rectangle_3295" data-name="Rectangle 3295" width="18" height="18" transform="translate(180.257 249.084)" fill="none" />
                                            <g id="Group_14565" data-name="Group 14565" transform="translate(180.258 249.086)">
                                                <path id="Union_136" data-name="Union 136" d="M2.765,18A2.77,2.77,0,0,1,0,15.234V4.341A2.77,2.77,0,0,1,2.765,1.574H6.274a.6.6,0,0,1,0,1.208H2.763A1.566,1.566,0,0,0,1.208,4.346V15.234A1.568,1.568,0,0,0,2.759,16.8H13.648a1.567,1.567,0,0,0,1.564-1.563V11.725a.6.6,0,0,1,1.207,0v3.509A2.769,2.769,0,0,1,13.652,18ZM5.9,12.825a1.043,1.043,0,0,1-.727-1.281l.7-2.466a.605.605,0,0,1,.149-.269L14.177.649a2.265,2.265,0,0,1,3.172,0,2.261,2.261,0,0,1,0,3.174L9.215,11.98a.612.612,0,0,1-.278.152l-2.445.688-.313.042A1.067,1.067,0,0,1,5.9,12.825ZM7,9.528l-.6,2.041,2.022-.549.022-.007,6.9-6.922.063-.064L13.944,2.563Zm8.083-8.069-.269.242,1.452,1.454.215-.173.009-.008a1.035,1.035,0,0,0-1.407-1.514Z" transform="translate(-0.001 -0.001)" fill="#007bff" />
                                            </g>
                                        </g>
                                    </svg>
                            </button> 
                        </div>
                    }
                    <div className="my-profile-body">
                        {validate.isNotEmpty(userInfo) &&validate.isNotEmpty(userInfo.medplusId) &&
                            <div className="name-card">
                                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26">
                                <g transform="translate(-180.163 -142.663)">
                                    <rect fill="none" width="26" height="26" transform="translate(180.163 142.663)"/>
                                    <g transform="translate(182.43 145.183)">
                                        <g transform="translate(0 0)">
                                            <path fill="#FFF" d="M2.486,21.228A2.489,2.489,0,0,1,0,18.742a8.3,8.3,0,0,1,1.846-5.218,6.007,6.007,0,0,1,4.7-2.2,6.665,6.665,0,0,1,2.09.34,6.5,6.5,0,0,0,3.929,0h0a6.192,6.192,0,0,1,6.79,1.837,8.309,8.309,0,0,1,1.871,5.243,2.489,2.489,0,0,1-2.486,2.486Zm.365-6.917a7.017,7.017,0,0,0-1.57,4.43,1.22,1.22,0,0,0,1.2,1.2H18.742a1.208,1.208,0,0,0,1.2-1.179,7.013,7.013,0,0,0-1.571-4.43,4.913,4.913,0,0,0-5.4-1.456,7.753,7.753,0,0,1-4.717,0A4.824,4.824,0,0,0,6.575,12.6,4.707,4.707,0,0,0,2.851,14.311ZM4.986,5.628a5.628,5.628,0,1,1,5.628,5.628A5.634,5.634,0,0,1,4.986,5.628Zm1.282,0a4.345,4.345,0,1,0,4.345-4.346A4.35,4.35,0,0,0,6.268,5.628Z"/>
                                        </g>
                                    </g>
                                </g>
                                </svg>
                                <h6>
                                    MedPlus Id:
                                    <strong>{userInfo.medplusId}</strong>
                                </h6>
                            </div>
                        }
                        <div className="row mx-0 mt-4">
                            {validate.isNotEmpty(userInfo.displaybleName) && !validate.isNumeric(userInfo.displaybleName) &&
                                <div className="col-6">
                                    <React.Fragment><img src={changeEmailIcon} alt="Email Address" />
                                        <div className="ml-3">
                                            {validate.isNotEmpty(userInfo) && validate.isNotEmpty(userContactDetails.emailAddress) &&
                                                <React.Fragment>
                                                    <span className="font-weight-bold">Email Address</span><span className="mx-2">|</span><button className='btn p-0' role="button" title="Change Email Address" onClick={toggleEmailAddressModal}>Change Email Address</button>
                                                    <p className="text-muted">{userContactDetails.emailAddress}</p>
                                                </React.Fragment>
                                            }
                                            {validate.isNotEmpty(userInfo) && validate.isEmpty(userContactDetails.emailAddress) &&
                                                <React.Fragment>
                                                    <button className='btn p-0' role="button" title="Add Email Address" onClick={toggleEmailAddressModal}>Add Email Address</button>
                                                </React.Fragment>
                                            }
                                        </div>
                                    </React.Fragment>
                                </div>
                            }
                            {validate.isNotEmpty(userInfo) && validate.isNotEmpty(userContactDetails.shippingContactNumber) &&
                                <div className="col-6">
                                <img src={changePhoneNumberIcon} alt="Mobile Number"/>
                                    <div className="ml-3">
                                        <span className="font-weight-bold">Mobile Number</span>{validate.isNumeric(userInfo.displaybleName) ? "" : <React.Fragment><span className="mx-2">|</span><button className='btn p-0' role="button" title="Change Mobile Number" onClick={sendOtpForMobileNumber}>Change Mobile Number</button></React.Fragment>}
                                        <p className="text-muted">+91 {userContactDetails.shippingContactNumber}</p>
                                    </div>
                                </div>
                            }
                            {/* <div className="col-6">
                                <img src={changeLocationIcon} alt="change location icon" title="change location icon"/>
                                <div className="ml-3">
                                    <span className="font-weight-bold">Address</span>
                                    <span className="mx-2">|</span>
                                    <a href="javascript:void(0)" title="Change Address" onClick={toggleChangeAddressModal}>
                                    {validate.isNotEmpty(userInfo) && (validate.isNotEmpty(userContactDetails.addressLine) || validate.isNotEmpty(userContactDetails.locality) || validate.isNotEmpty(userContactDetails.city) || validate.isNotEmpty(userContactDetails.state) || validate.isNotEmpty(userContactDetails.pincode)) &&
                                        <React.Fragment>
                                            Change Address
                                        </React.Fragment>
                                    }    
                                    {validate.isNotEmpty(userInfo) && !(validate.isNotEmpty(userContactDetails.addressLine) || validate.isNotEmpty(userContactDetails.locality) || validate.isNotEmpty(userContactDetails.city) || validate.isNotEmpty(userContactDetails.state) || validate.isNotEmpty(userContactDetails.pincode)) &&
                                        <React.Fragment>
                                            Add Address
                                        </React.Fragment>
                                    }      
                                    </a>
                                        <p className="text-muted small">
                                            {validate.isNotEmpty(userInfo) &&validate.isNotEmpty(userContactDetails.addressLine) &&
                                            <React.Fragment>
                                                {userContactDetails.addressLine} ,
                                            </React.Fragment> 
                                            }
                                            {validate.isNotEmpty(userInfo) && validate.isNotEmpty(userContactDetails.locality) &&
                                            <React.Fragment>
                                                {userContactDetails.locality} ,
                                            </React.Fragment> 
                                            }
                                            {validate.isNotEmpty(userInfo) &&validate.isNotEmpty(userContactDetails.city) &&
                                            <React.Fragment>
                                                {userContactDetails.city} ,
                                            </React.Fragment> 
                                            }
                                            {validate.isNotEmpty(userInfo) && validate.isNotEmpty(userContactDetails.state) &&
                                            <React.Fragment>
                                                {userContactDetails.state} ,
                                            </React.Fragment> 
                                            }
                                            {validate.isNotEmpty(userInfo) && validate.isNotEmpty(userContactDetails.pincode) &&
                                            <React.Fragment>
                                                {userContactDetails.pincode} 
                                            </React.Fragment> 
                                            }
                                        </p>
                                </div>
                            </div> */}
                        </div>
                    </div>
                    <DeleteAccount/>
                </div>
                
            </section>
            {showGeneratePwd && 
                <GeneratePasswordModal isModalOpen={isGeneratePasswordModalOpen} toggleModal={toggleGeneratePasswordModal} generatedPasswordUpdate={generatedPasswordUpdate}/>
            }
            {!showGeneratePwd && 
                <ChangepasswordModal isModalOpen={isChangePasswordModalOpen} toggleModal={toggleChangePasswordModal} />
            }
           
            <ChangeEmailAddressModal isModalOpen={isChangeEmailAddressModalOpen} toggleModal={toggleEmailAddressModal} updateUserDetailsInState={updateUserDetailsInState} />
            {userContactDetails && userContactDetails.shippingContactNumber ? <ChangePhoneNumberModal currentMobileNumber={userContactDetails.shippingContactNumber} isModalOpen={isChangePhoneNumberModalOpen} toggleModal={togglePhoneNumberModal} updateUserDetailsInState={updateUserDetailsInState} /> : null}
            <ChangeAddressModal isModalOpen={isChangeAddressModalOpen} toggleModal={toggleChangeAddressModal} updateUserDetailsInState={updateUserDetailsInState}/>
            <UpdateProfileModal isModalOpen={isUpdateProfileModalOpen} toggleModal={toggleUpdateProfileModal} updateUserDetailsInState={updateUserDetailsInState} />
        </React.Fragment>
    )
}
export default MyProfile;