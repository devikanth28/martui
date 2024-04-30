import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Dropdown, DropdownToggle, DropdownItem, DropdownMenu } from 'reactstrap';
import BreadCrumbAction from '../../../../redux/action/BreadCrumbAction';
import Validate from '../../../helpers/Validate';
import MyAccountService from '../../../services/MyAccountService';
import RegistrationService from '../../../services/RegistrationService';
import Alert from '../../../components/Common/Alert';
import { useInputField } from '../../../components/Common/CustomHooks/useInputField';
import CustomerFeedbackIcon from "../../../images/common/customer-feedback-icon.svg"
const reasons = ["Placing an Order", "Delivery", "Problem with my order", "Payments", "Store", "Customer Care", "Suggestions", "Others"];
const subReason = {
    "Placing an Order": ["Product Information", "Product Availability", "Issue Related To Checkout", "Returns", "Other Order Placing Issues"],
    "Delivery": ["Delay in Delivery", "Shipment Information", "Packing Feedback", "Curior Feedback", "Other Delivery Related Issues"],
    "Problem with my order": ["Damaged Items", "Expired Items", "Items / Parts Missing From Order", "Wrong Items Or Not As Expected", "Other Order Related Issues"],
    "Payments": ["COD Not Available", "Payment Declined", "Discounts Issue", "Wrong Price", "Other Payment Related Issues"],
}

const ErrorMessage = (props) => {
    return (
        <div className='invalid-feedback'>{props.message}</div>
    );
};

const CustomerFeedBack = (props) => {

    const validate = Validate();
    const myAccountService = MyAccountService();
    const registrationService = RegistrationService();
    const breadCrumbAction = BreadCrumbAction();
    const userInfo = useSelector(state => state && state.userInfo ? state.userInfo.userInfo : null);
    const userContactDetails  = useSelector(state => validate.isNotEmpty(state.userInfo.userContactDetails) ?  state.userInfo.userContactDetails : null);

    const [email, emailError, setEmail, setEmailError, onEmailChange, onEmailFocus, onEmailBlur] = useInputField("EMAIL", 45);
    const [PhoneNumber, phoneErr, setPhoneNo, setPhoneError, onPhoneChange, onPhoneFocus, onPhoneBlur] = useInputField("NUMBER",10);
    const [description, descError, setDescription, setDescError, onDescChange, onDescFocus, onDescBlur] = useInputField("TEXT");


    const [opendropdown, setopendropdown] = useState(false);
    const [openSubReasonDropdown, setOpenSubReasonDropdown] = useState(false);

    const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
    const [errorMsg, setErrorMsg] = useState([]);
    const [reason, setReason] = useState();
    const [selectedSubReason, setSelectedSubReason] = useState();
    const [reasonRequired, setReasonRequired] = useState(false);
    const [subReasonRequired, setSubReasonRequired] = useState(false);
    const [captchaValue, setCaptchaValue] = useState('');
    const [captchaError, setCaptchaError] = useState('')
    const [captchaRequired, setCaptchaRequired] = useState(false);
    const [captchaData, setCaptchaData] = useState(null);

    useEffect(() => {
        breadCrumbAction.pushBreadCrumbs({ name: 'Customer Feedback', url: props.location.pathname });
    }, [props.location.pathname]);

    useEffect(() => {
        getCaptchaImage({});
        if (validate.isNotEmpty(userInfo) && validate.isNotEmpty(userInfo.loginThrough)) {
            setPhoneNo(userInfo.loginThrough);
        }
        if(validate.isNotEmpty(userContactDetails) && !validate.email(userContactDetails.emailAddress)){
            setEmail(userContactDetails.emailAddress);
        }
    }, []);

    const toogleReason = (dropdownType) => {
        if (dropdownType === 'reason') {
            setopendropdown(!opendropdown);
            setOpenSubReasonDropdown(openSubReasonDropdown);
        } else {
            setopendropdown(opendropdown);
            setOpenSubReasonDropdown(!openSubReasonDropdown);
        }
    }

    const getCaptchaImage = (obj) => {
        registrationService.getLoginCaptcha(obj).then((response) => {
            if (response != null && response.statusCode != null && response.statusCode === "SUCCESS") {
                setCaptchaData(response.dataObject);
            }
        });
    }

    const clearInputError = (e) => {
        let feildName = e.target.id;
        setErrorMsg({ ...errorMsg, [feildName]: "" });
    }

    const handleChangeInput = (event) => {
        let feildValue = event.target.value;
        let feildName = event.target.id;
        if (feildName === 'reason') {
            setReason(feildValue);
            setReasonRequired(false);
        } else if (feildName === 'subReason') {
            setSelectedSubReason(feildValue);
            setSubReasonRequired(false);
        } else if(feildName == 'captchaCode' && validate.isNotEmpty(feildValue)){
            setCaptchaValue(feildValue);
            if(validate.isEmpty(feildValue)){
                setCaptchaRequired(true);
            }
        }
    }

    const onSubmit = (event) => {
        event.preventDefault(); 
        if(validate.isEmpty(reason)){
            setReasonRequired(true);
            return;
        }
        if(validate.isNotEmpty(subReason[reason]) && validate.isEmpty(selectedSubReason)){
            setSubReasonRequired(true);
            return;
        }
        if(validate.isEmpty(email)){
            setEmailError("Email cannot be Empty");
            return;
        }
        if(validate.isEmpty(PhoneNumber)){
            setPhoneError("Mobile Number cannot be Empty");
            return;
        }
        if(validate.isEmpty(description) || description.length < 1){
            setDescError("Description cannot be empty");
            return;
        }
        if(validate.isEmpty(captchaValue)){
            setCaptchaError("Captcha cannot be empty");
            setCaptchaRequired(true);
            return;
        }
        if(validate.isNotEmpty(emailError) || validate.isNotEmpty(phoneErr) || validate.isNotEmpty(descError)){
            return;
        }

        let obj = {
            mobileNumber: PhoneNumber,
            emailId: email, category: reason, subCategory: selectedSubReason,
            description: description
        };
        myAccountService.submitOrderComplaint(obj, captchaValue).then(data => {
            if (data.statusCode === "SUCCESS") {
                setAlertInfo({ message: "Thank You For Your FeedBack", type: "" });
                setTimeout(() => {
                    props.history.goBack();
                }, 5000);
            } else {
                setAlertInfo({ message: data.message, type: "" });
            }
        });
    }

    const closeAlertMessage = () => {
        setAlertInfo("");
    }

    return (
        <React.Fragment>
            <Alert alertInfo={alertInfo} onDurationEnd={closeAlertMessage} duration='5000' />
            <section className='shadow-none p-3 CustomerFeedback'>
                <h5 className="sectionHeading mb-4">Customer Feedback
                </h5>
                <div className='row'>
                    <div className='col-2'></div>
                    <div className='col-6'>
                        <div className="mb-4 subs-register-dropdown">
                            <label className="dropdown-label" style={{ zIndex: "1001" }}>Reason<sup className='text-danger'> *</sup></label>
                            <Dropdown isOpen={opendropdown} toggle={() => { toogleReason("reason") }} >
                                <DropdownToggle caret color="white" className="btn-block border">
                                    {validate.isNotEmpty(reason) ? <span>{reason}</span> : <span>Select Reason</span>}
                                </DropdownToggle>
                                <DropdownMenu className="w-100">
                                    {reasons.map((showReason, index) => {
                                        return (
                                            <DropdownItem key={index} value={showReason} id='reason' onClick={(event) => handleChangeInput(event)}>{showReason}</DropdownItem>
                                        )
                                    })}
                                </DropdownMenu>
                            </Dropdown>
                            { reasonRequired && <div class="text-danger small">This is mandatory Field</div> }
                        </div>
                        {validate.isNotEmpty(reason) && validate.isNotEmpty(subReason[reason]) &&
                            <div className="mb-4 subs-register-dropdown">
                                <label className="dropdown-label" style={{ zIndex: "1001" }}>Sub Reason<sup className='text-danger'> *</sup></label>
                                <Dropdown isOpen={openSubReasonDropdown} toggle={() => { toogleReason("subReason") }} >
                                    <DropdownToggle caret color="white" className="btn-block border">
                                        {validate.isNotEmpty(selectedSubReason) ? <span>{selectedSubReason}</span> : <span>Select a sub Reason</span>}
                                    </DropdownToggle>
                                    <DropdownMenu className="w-100">
                                        {subReason[reason].map((showSubReason, index) => {
                                            return (
                                                <DropdownItem key={index} value={showSubReason} id='subReason' onClick={(event) => handleChangeInput(event)}>{showSubReason}</DropdownItem>
                                            )
                                        })}
                                    </DropdownMenu>
                                </Dropdown>
                                { subReasonRequired && <div class="text-danger small">This is mandatory Field</div> }
                            </div>}
                        <div className="form-group has-float-label mb-4">
                            <input name="emailId" id="emailId" maxLength="45" type="text" autoComplete="off" className={`form-control${emailError ? ' is-invalid' : ''}`} onChange={onEmailChange} onBlur={onEmailBlur} onFocus={onEmailFocus} value={email} disabled={validate.isNotEmpty(userContactDetails) && validate.isNotEmpty(userContactDetails.emailAddress)}/>
                            <label htmlFor="emailId" className={`select-label text-capitalize`}>Email ID<sup className="text-danger"> *</sup></label>
                            <ErrorMessage message = {emailError} />
                        </div>
                        <div className="form-group has-float-label mb-4">
                            <input name="phoneNumber" id="phoneNumber" maxLength="10" disabled={validate.isNotEmpty(userInfo) && validate.isNotEmpty(userInfo.loginThrough)} type="text" autoComplete="off" className={`form-control${phoneErr ? ' is-invalid' : ''}`} onChange={onPhoneChange} onBlur={onPhoneBlur} onFocus={onPhoneFocus} value={PhoneNumber} />
                            <label htmlFor="PhoneNumber" className={`select-label text-capitalize `}>Phone Number<sup className="text-danger"> *</sup></label>
                            <ErrorMessage message = {phoneErr} />
                        </div>
                        <div className="form-group has-float-label mb-4">
                            <textarea name="description" id="description" className={`form-control${descError ? ' is-invalid' : ''}`} rows="4" placeholder=" " onChange={onDescChange} onBlur={onDescBlur} onFocus={onDescFocus} value={description}></textarea>
                            <label htmlFor="description" className={`select-label text-capitalize`}>Description<sup className="text-danger"> *</sup></label>
                            <ErrorMessage message = {descError} />
                        </div>
                        <div className="row mb-4">
                            <div className='align-items-center border col d-flex justify-content-between ml-3 px-0 rounded'>
                                <span className='rounded'>
                                    <img src={`data:image/png;base64,${validate.isNotEmpty(captchaData) && captchaData.base64Image}`} className="img-fluid" alt="captcha" title="captcha" />
                                </span>
                                <span className='border-left h-100'></span>
                                <span className='pointer'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24.004 24" onClick={() => getCaptchaImage({})}>
                                        <g id="refresh_black_icon_24px" transform="translate(-0.302)">
                                            <rect id="BG_Guide" data-name="BG Guide" width="24" height="24" transform="translate(0.306)" fill="none" />
                                            <g id="Group_2531" data-name="Group 2531" transform="translate(0.302 2)">
                                                <path id="Path_1096" data-name="Path 1096" d="M2082.81,339.873a9.622,9.622,0,0,1,9.487,8.111h-1.345a8.276,8.276,0,0,0-15.875-1.451h2.288l-1.616,1.726-1.614,1.725-1.612-1.725-1.616-1.726h2.764A9.609,9.609,0,0,1,2082.81,339.873Z" transform="translate(-2070.905 -339.873)" fill="#080808" />
                                                <path id="Path_1097" data-name="Path 1097" d="M2091.271,347.4l1.613,1.725,1.616,1.726h-2.923a9.6,9.6,0,0,1-18.657-1.355h1.344a8.278,8.278,0,0,0,15.914,1.355h-2.137l1.616-1.726Z" transform="translate(-2070.496 -338.402)" fill="#080808" />
                                            </g>
                                        </g>
                                    </svg>
                                </span>
                            </div>
                            <div className='col-8'>
                                <div className="form-group has-float-label mb-0">
                                    <input name="captchaCode" id="captchaCode" placeholder="Enter the Captcha Code" type="text" autoComplete="off" className={"form-control"} onChange={(e) => handleChangeInput(e)} onBlur={handleChangeInput} onFocus={clearInputError} onKeyPress={(event) => handleChangeInput(event)} />
                                    <label htmlFor="captchaCode" className="select-label">Please enter the Code here<sup className="text-danger"> *</sup></label>
                                    { captchaRequired && <div class="text-danger small">{captchaError}</div> }
                                </div>
                            </div>
                        </div>
                        
                        <div className="d-flex justify-content-between">
                            <div className='d-flex'>
                                <p className="text-warning mb-0 font-12">Note:</p>
                                <ul className="list-unstyled m-0 p-0 reportdelivery ml-2">
                                    <li className="small py-0 pl-0">All Fields are Mandatory</li>
                                </ul>
                            </div>
                            {<button className='btn btn-brand-gradient px-5 rounded-pill' onClick={(event) => onSubmit(event)}> Submit</button>}
                        </div>
                    </div>
                    <div className='col-4'>
                        <img className="mx-4 my-5" alt="Customer Feedback" src={CustomerFeedbackIcon} />
                    </div>
                </div>
            </section>
        </React.Fragment>
    )


}

export default CustomerFeedBack;