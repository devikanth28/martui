import React, { useEffect } from "react"
import { useState } from "react";
import { Modal, ModalBody } from 'reactstrap';
import Validate from "../../../helpers/Validate";
import SubscriptionService from "../services/SubscriptionService";
import Alert from "../../Common/Alert";

const ReachOutToUsModal=(props) =>{
    const validate=Validate();
    const subscriptionService=SubscriptionService();
    const [errorMsg, setErrorMsg] = useState({});
    const [load,setLoad]=useState(false);
    const [buttonFlag,setButtonFlag]=useState(true)
    const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
    const [subscriptionMemberDetails , setSubscriptionMemberDetails] = useState({
        "customerName" : '', 
        "organizationName" : '',
        "customerMobile": '',
        "hrName" : '',
        "hrMobile": ''
    })

    const handleInputChange = event => {
        let feildName = event.target.id;
        let errMsg = validateInputs(event);
        if (errMsg)  {
            setErrorMsg(errorMsg => ({...errorMsg, [feildName]:errMsg}));
        } else {
            setErrorMsg({...errorMsg,[feildName]: ''});
        }
    }


    const validateInputs = (e) =>{
        if (e.target.id == 'organizationName') {
            if(!validate.validateStringWithLength(e.target.value,50)) {
                return "Company name is mandatory field";
            }
        }
        else if (e.target.id.indexOf('customerName') > -1) {
            if(!validate.validateStringWithLength(e.target.value,45)) {
                return "Name is mandatory field";
            }
        } 
        else if (e.target.id.indexOf('customerMobile') > -1) {
            return  validateMobileNumber(e.target.value,"Contact number")
        }
        else if (e.target.id.indexOf('hrName') > -1) {
            if(!validate.validateStringWithLength(e.target.value,45)) {
                return "HR name is mandatory field";
            }
        }
        else if (e.target.id.indexOf('hrMobile') > -1) {
            return  validateMobileNumber(e.target.value,"HR contact number");
        } 
    }

    const validateMobileNumber = (mobileNo,fieldName) => {
        var mobileNoPattern = /^[0-9]{10}$/;
        var errorMsg;
        if (validate.isEmpty(mobileNo)) {
            errorMsg = fieldName +" is mandatory field";
        } else if (mobileNo < 1000000000 || mobileNo > 9999999999) {
            errorMsg =  fieldName + " must be 10 digits and can't start with 0";
        } else if (!mobileNoPattern.test(mobileNo)) {
            errorMsg = fieldName + " is not valid";
        } else {
            errorMsg = undefined;
        }
        return errorMsg;
    }
    

    const handleChange=(e) => {     
        let fieldName = e.target.id;
        let fieldValue = e.target.value;
        let maxLength = e.target.maxLength;
        if (maxLength && fieldValue.length > maxLength) {
            return;
        } else if((fieldName == "customerName" || fieldName == "hrName") && validate.isNotEmpty(fieldValue) && !validate.isAlphaWithSpace(fieldValue)){
            return;
        } else if((fieldName == "organizationName") && validate.isNotEmpty(fieldValue) && !validate.isAlphaNumericWithSpace(fieldValue)){
            return;
        } else if ((fieldName == "customerMobile" || fieldName == "hrMobile")  && validate.isNotEmpty(fieldValue) && !validate.isNumeric(fieldValue)) { 
            return;
        }
        setSubscriptionMemberDetails({...subscriptionMemberDetails,[fieldName]:fieldValue})
        handleInputChange(e);
      }

    const handleValidation = (e) =>{
        let formfield = e.target.id
        setErrorMsg(prevState=> ({
            ...prevState,
            [formfield]: ''
        }))
    }

    const checkErrorMsg=()=>{
        for(var obj in errorMsg){
            if(errorMsg[obj]!==''){
                return true;
            } 
        }
        return false;
    }

    const handleOnClickCancel=()=>{
        props.toggleModal('cancel');
        setErrorMsg({})
        setSubscriptionMemberDetails({
            "customerName" : '', 
            "organizationName" : '',
            "customerMobile": '',
            "hrName" : '',
            "hrMobile": ''
        })
    }

    const enableSubmit = ()  => {
        const isDisabled = (checkErrorMsg() || validate.isEmpty(subscriptionMemberDetails['organizationName']) || validate.isEmpty(subscriptionMemberDetails['customerName']) || validate.isEmpty(subscriptionMemberDetails['customerMobile']) || validate.isEmpty(subscriptionMemberDetails['hrName']) || validate.isEmpty(subscriptionMemberDetails['hrMobile']));
        setButtonFlag(isDisabled);
    }

    useEffect(() => {
        enableSubmit();
     },[errorMsg]);



    const handleOnClickRegister=()=>{
            setLoad(true);
            var data={
                'organization':JSON.stringify(subscriptionMemberDetails)
            }

            subscriptionService.createOrganization(data)
           .then(data=>{
               setLoad(false)
               if(data.statusCode==="FAILURE"){
                  
                setAlertInfo({
                    message: data.dataObject[0],
                    type: "Error"
                })
                handleOnClickCancel()
               }
               else if(data.statusCode==="SUCCESS"){
                   handleOnClickCancel()
                setAlertInfo({
                    message: "Thank you",
                    type: "Success"
                })
               }
               
            })
           .catch(err=>{
            setLoad(false);
            handleOnClickCancel
            setAlertInfo({
                message: "Try again later",
                type: "Info"
            })
           })
        
    }
    return(
        <React.Fragment>
            { alertInfo && alertInfo.message && <Alert alertInfo={alertInfo} duration={5000} onDurationEnd={setAlertInfo}/>}
            <Modal className="my-account-modal  modal-dialog-centered" backdrop="static" isOpen={props.isModalOpen} toggle={props.toggleModal}>
                <ModalBody className="p-4">
                <React.Fragment>
            
        <React.Fragment>

            <div>
                <p>Provide your company details</p>
                <div className="form-group has-float-label  my-4">
                        <input type="text" id="customerName" name="customerName" onChange= {(e)=>{handleChange(e)}} onBlur={handleInputChange} onFocus={handleValidation} autoComplete="off"   className={`form-control ${validate.isNotEmpty(errorMsg['customerName']) ? "is-invalid" : ''}`} maxlength={45} autocomplete="off" placeholder=" " value={subscriptionMemberDetails['customerName']}/>
                        <label htmlFor="customerName" className="select-label">Enter your name</label>  
                        <div className="invalid-feedback">{errorMsg['customerName']}</div>           
                </div>
                <div className="form-group has-float-label mb-3">
                        <input type="text" id="organizationName" name="organizationName" onChange= {(e)=>{handleChange(e)}} onBlur={handleInputChange} onFocus={handleValidation}  className={`form-control ${validate.isNotEmpty(errorMsg['organizationName']) ? "is-invalid" : ''}`} maxlength={50} autocomplete="off" placeholder=" " value={subscriptionMemberDetails['organizationName']}/>
                        <label htmlFor="organizationName" className="select-label">Name of the company</label>
                        <div className="invalid-feedback">{errorMsg['organizationName']}</div>  
                </div>
                <div className = "form-group has-float-label mb-3">
                        <input type="tel" pattern="[1-9]{1}[0-9]{9}"  className={validate.isNotEmpty(errorMsg['customerMobile'])?"is-invalid form-control":"form-control"} onChange= {(e)=>{handleChange(e)}} onBlur={handleInputChange} onFocus={handleValidation} id="customerMobile" name="Mobile Number" maxLength={10} autoComplete="off" placeholder=" " value={subscriptionMemberDetails['customerMobile']}/>
                        <label htmlFor="customerMobile" className="select-label">Your Contact Number</label>
                        { validate.isNotEmpty(errorMsg['customerMobile']) && <small className="help-block text-left errmsg margin-none text-danger"> {errorMsg['customerMobile']} </small> }  
                </div>
                <div className = "form-group has-float-label mb-3">
                        <input type="text"  className={validate.isNotEmpty(errorMsg['hrName'])?"is-invalid form-control":"form-control"} onChange= {(e)=>{handleChange(e)}} onBlur={handleInputChange} onFocus={handleValidation} id="hrName" name="HR Mobile Number" maxlength={45} autocomplete="off" placeholder=" " value={subscriptionMemberDetails['hrName']}/>
                        <label htmlFor="hrName" className="select-label">Company HR Point of Contact Name</label> 
                        { validate.isNotEmpty(errorMsg['hrName']) && <small className="help-block text-left errmsg margin-none text-danger"> {errorMsg['hrName']} </small> } 
                </div>
                <div className = "form-group has-float-label mb-3">
                        <input type="tel" pattern="[1-9]{1}[0-9]{9}" className={validate.isNotEmpty(errorMsg['hrMobile'])?"is-invalid form-control":"form-control"} id="hrMobile" name="HR Poc Mobile Number" onChange= {(e)=>{handleChange(e)}} onBlur={handleInputChange} onFocus={handleValidation} maxlength={10} autocomplete="off" placeholder=" " value={subscriptionMemberDetails['hrMobile']}/>
                        <label htmlFor="hrMobile" className="select-label">Company HR POC Contact Number</label>
                        { validate.isNotEmpty(errorMsg['hrMobile']) && <small className="help-block text-left errmsg margin-none text-danger"> {errorMsg['hrMobile']} </small> }  
                </div>
            </div>
        </React.Fragment>
        </React.Fragment>
                    <div className="text-center">
                        <button type="button" className="brand-secondary btn px-5 rounded-pill" onClick={()=>handleOnClickCancel()}>Cancel</button>
                        <button type="button" className="btn btn-brand-gradient ml-3 px-5 rounded-pill" disabled={buttonFlag} onClick={() =>handleOnClickRegister()}>
                            Register
                            { load && <React.Fragment>
                                <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                                <span className="sr-only"></span>
                            </React.Fragment>}
                        </button>
                    </div>
                </ModalBody>
            </Modal>
        </React.Fragment>
    )
}
export default ReachOutToUsModal