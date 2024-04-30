import React, { useState } from 'react';
import { getSelectedLocality } from '../../../../../../redux/action/LocalityAction';
import Validate from '../../../../../helpers/Validate';
import Alert from '../../../../Common/Alert';

const PhysicalReport = (props) =>{

    const [errorMsg, setErrorMsg] = useState({});
    const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });

    const selectedLocality = getSelectedLocality();
    const validate = Validate();

    const handleInputChange = event => {
        let feildName = event.target.name;
        let feildValue = event.target.value;

        let errMsg = addressValidation(event);
        if (errMsg)  {
            setErrorMsg(errorMsg => ({...errorMsg, [feildName]:errMsg}));
        } else {
            setErrorMsg({...errorMsg,[feildName]: ''});
        }
        props.addressInfo[feildName]=feildValue;
    }

    const addressValidation = e => {
        if (e.target.name.indexOf('displaybleName') > -1) {
            return validate.name(e.target.value, "Name", 30);
        }
        if (e.target.name.indexOf('addressLine1') > -1) {
            return validate.address(e.target.value, true, e.target.id, 200);
        }
        if (e.target.name.indexOf('mobileNo') > -1) {
            return validate.mobileNumber(e.target.value);
        }
    }

    return (
        <React.Fragment>
                    <Alert alertInfo={alertInfo} onDurationEnd={setAlertInfo} duration='5000'/>
                        <div className="form-div pb-2 physical-report-modal">
                            <h6 className="">Please fill your details to get a physical copy of report delivery to your address</h6>
                            <div className="row mx-0 mt-3">
                                <div className="col-6 pl-0">
                                    <div className="form-group has-float-label mb-4">
                                        <input type="text" className={`form-control ${errorMsg['displaybleName'] ? 'is-invalid' : ''}`} id="displaybleName" name="displaybleName" maxLength="30" value={props.addressInfo && props.addressInfo.displaybleName?props.addressInfo.displaybleName:''} autoComplete="off" placeholder=" " required="" onBlur={(e) => { e.target.placeholder = " "; handleInputChange(e) }} onChange={handleInputChange} onFocus={(e) => e.target.placeholder = ""}/>
                                        <label className="select-label" htmlFor="displaybleName">Full Name</label>
                                        <div className="invalid-feedback d-block">
                                            {errorMsg['displaybleName']}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6 px-0">
                                    <div className="form-group has-float-label mb-4">
                                        <input type="text" className={`form-control ${errorMsg['mobileNo'] ? 'is-invalid' : ''}`} id="mobileNo" name="mobileNo" maxLength="10" value={props.addressInfo && props.addressInfo.mobileNo?props.addressInfo.mobileNo:''} autoComplete="off" placeholder=" " required="" onBlur={(e) => { e.target.placeholder = " "; handleInputChange(e) }} onChange={handleInputChange} onFocus={(e) => e.target.placeholder = ""}/>
                                        <label className="select-label" htmlFor="mobileNo">Mobile Number</label>
                                        <div className="invalid-feedback d-block">
                                            {errorMsg['mobileNo']}
                                        </div>
                                    </div>
                                </div>    
                                <div className="col-12 px-0">
                                    <div className="form-group has-float-label">
                                        <input type="text" className={`form-control ${errorMsg['addressLine1'] ? 'is-invalid' : ''}`} id="addressLine1" name="addressLine1" value={props.addressInfo && props.addressInfo.addressLine1?props.addressInfo.addressLine1:''} maxLength="200" autoComplete="off" placeholder=" " required="" onBlur={(e) => { e.target.placeholder = " "; handleInputChange(e) }} onChange={handleInputChange} onFocus={(e) => e.target.placeholder = ""}/>
                                        <label className="select-label" htmlFor="addressLine1">Door Number/Building Name/Street Name</label>
                                        <div className="invalid-feedback d-block">
                                            {errorMsg['addressLine1']}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6 pl-0">
                                    <div className="form-group has-float-label">
                                        <input type="text" className="form-control" defaultValue={props.addressInfo.addressLine2} id="locality" name="locality" maxLength="30" autoComplete="off" placeholder=" " required="" disabled readOnly={true} tabIndex="-1"/>
                                        <label className="select-label" htmlFor="locality">Locality</label>
                                    </div>
                                </div>    
                                <div className="col-6 px-0">
                                    <div className="form-group has-float-label">
                                        <input type="text" className="form-control" defaultValue={props.addressInfo.city} id="city" name="city" maxLength="30" autoComplete="off" placeholder=" " required="" disabled readOnly={true} tabIndex="-1"/>
                                        <label className="select-label" htmlFor="city">City</label>
                                    </div>
                                </div>    
                                <div className="col-6 pl-0">
                                    <div className="form-group has-float-label mb-0">
                                        <input type="text" className="form-control" id="state" name="state" maxLength="30" autoComplete="off" placeholder=" " required="" defaultValue={props.addressInfo.state} disabled readOnly={true} tabIndex="-1"/>
                                        <label className="select-label" htmlFor="state">State</label>
                                    </div>
                                </div>    
                                <div className="col-6 px-0">
                                    <div className="form-group has-float-label mb-0">
                                        <input type="text" className="form-control" id="pin-code" name="pin-code" maxLength="30" autoComplete="off" placeholder=" " disabled required="" defaultValue={props.addressInfo.pincode} disabled readOnly={true} tabIndex="-1"/>
                                        <label className="select-label" htmlFor="pin-code">PIN Code</label>
                                    </div>
                                </div>    
                            </div>
                        </div>
        </React.Fragment>
    )
}

export default PhysicalReport