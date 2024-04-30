import React, { useState } from "react"
import Validate from "../../helpers/Validate";

const ReachOutToUs = (props) => {

    const validate=Validate();
    const [errorMsg, setErrorMsg] = useState({});
    const [subscriptionMemberDetails , setSubscriptionMemberDetails] = useState({
        "Name" : '', 
        "CompanyName" : '',
        "ContactNo": '',
        "HRContactNo" : '',
        "HRPocContactNo": ''
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
        if (e.target.id == 'CompanyName') {
            if(!validate.validateStringWithLength(e.target.value,30)) {
                return "CompanyName Must be Maximum of 30 Characters"
            }
        }
        else if (e.target.id.indexOf('Name') > -1) {
            return validate.name(e.target.value,"Name");
        } 
        else if (e.target.id.indexOf('ContactNo') > -1) {
            return  validate.mobileNumber(e.target.value)
        } 
    }

    const handleChange=(e) => {        
        let fieldName = e.target.id;
        let fieldValue = e.target.value
        setSubscriptionMemberDetails({...subscriptionMemberDetails,[fieldName]:fieldValue})
      }

    const handleValidation = (e) =>{
        let formfield = e.target.id
        setErrorMsg(prevState=> ({
            ...prevState,
            [formfield]: ''
        }))
    }
    const handleEnter=(e)=> {
        if (e.keyCode == 13) {
            e.target.blur();
        } 
    }

    return (
        <React.Fragment>
            <div>
                <p>Provide your company details</p>
                <div className="form-group has-float-label  my-4">
                        <input type="text" id="Name" name="name" onChange= {(e)=>{handleChange(e)}} onBlur={handleInputChange} onFocus={handleValidation} autoComplete="off"   className={`form-control ${validate.isNotEmpty(errorMsg['Name']) ? "is-invalid" : ''}`} maxlength="30" autocomplete="off" placeholder=" "/>
                        <label htmlFor="Name" className="select-label">Enter your name</label>  
                        <div className="invalid-feedback">{errorMsg['Name']}</div>           
                </div>
                <div className="form-group has-float-label mb-4">
                        <input type="text" id="CompanyName" name="name" onChange= {(e)=>{handleChange(e)}} onBlur={handleInputChange} onFocus={handleValidation}  className={`form-control ${validate.isNotEmpty(errorMsg['CompanyName']) ? "is-invalid" : ''}`} maxlength="30" autocomplete="off" placeholder=" "/>
                        <label htmlFor="CompanyName" className="select-label">Name of the company</label>
                        <div className="invalid-feedback">{errorMsg['CompanyName']}</div>  
                </div>
                <div className = "form-group has-float-label mb-4">
                        <input type="tel" pattern="[1-9]{1}[0-9]{9}"  className={validate.isNotEmpty(errorMsg['ContactNo'])?"is-invalid form-control":"form-control"} onChange= {(e)=>{handleChange(e)}} onBlur={handleInputChange} onFocus={handleValidation} id="ContactNo" name="Mobile Number" maxlength="10" autocomplete="off" placeholder=" "/>
                        <label htmlFor="ContactNo" className="select-label">Your Contact Number</label>
                        { validate.isNotEmpty(errorMsg['ContactNo']) && <small className="help-block text-left errmsg margin-none text-danger"> {errorMsg['ContactNo']} </small> }  
                </div>
                <div className = "form-group has-float-label mb-4">
                        <input type="tel" pattern="[1-9]{1}[0-9]{9}" className={validate.isNotEmpty(errorMsg['HRContactNo'])?"is-invalid form-control":"form-control"} onChange= {(e)=>{handleChange(e)}} onBlur={handleInputChange} onFocus={handleValidation} id="HRContactNo" name="HR Mobile Number" maxlength="10" autocomplete="off" placeholder=" "/>
                        <label htmlFor="HRContactNo" className="select-label">Company HR Point of Contact Name</label> 
                        { validate.isNotEmpty(errorMsg['HRContactNo']) && <small className="help-block text-left errmsg margin-none text-danger"> {errorMsg['HRContactNo']} </small> } 
                </div>
                <div className = "form-group has-float-label mb-4">
                        <input type="tel" pattern="[1-9]{1}[0-9]{9}" className={validate.isNotEmpty(errorMsg['HRPocContactNo'])?"is-invalid form-control":"form-control"} id="HRPocContactNo" name="HR Poc Mobile Number" onChange= {(e)=>{handleChange(e)}} onBlur={handleInputChange} onFocus={handleValidation} maxlength="10" autocomplete="off" placeholder=" "/>
                        <label htmlFor="HRPocContactNo" className="select-label">Company HR POC Contact Number</label>
                        { validate.isNotEmpty(errorMsg['HRPocContactNo']) && <small className="help-block text-left errmsg margin-none text-danger"> {errorMsg['HRPocContactNo']} </small> }  
                </div>
            </div>
        </React.Fragment>
    )
}

export default ReachOutToUs
