import React, {useState} from "react";
import { useSelector } from "react-redux";
import Validate from '../../../helpers/Validate';

const AddNewAddress = (props) => {

    const selectedLocality = props.selectedLocality;
    const validate = Validate();
    const addEditAddress = props.addEditAddress;
    const userInfoFromRedis  = useSelector(state => validate.isNotEmpty(state.userInfo) ?  state.userInfo : null);
    const [customerAddress, setCustomerAddress] = useState(validate.isNotEmpty(props.customerInfo) ? props.customerInfo : addEditAddress === 'ADD_ADDRESS' ? prepareUserInfoFromRedis() : props.editAddressInfo);
    const [errorMsg, setErrorMsg] = useState({});
    
    const handleInputChange = event => {
        let feildName = event.target.name;
        let feildValue = event.target.value;

        let errMsg = addressValidation(event);
        if (errMsg)  {
            setErrorMsg(errorMsg => ({...errorMsg, [feildName]:errMsg}));
        } else {
            setErrorMsg({...errorMsg,[feildName]: ''});
        }
        setCustomerAddress({...customerAddress, [feildName]: feildValue});
        props.setCustomerInfo({...customerAddress, [feildName]: feildValue});
    }

    function prepareUserInfoFromRedis(){
        let userInfo={
            firstName : (getUserNameFromRedis()),
            mobileNo : (userInfoFromRedis && userInfoFromRedis.userContactDetails && userInfoFromRedis.userContactDetails.shippingContactNumber) ? userInfoFromRedis.userContactDetails.shippingContactNumber : ''
        }
        return userInfo;
    }
    function getUserNameFromRedis(){
        let userDisplayName = "";
        const userInfo= (userInfoFromRedis && userInfoFromRedis.userInfo) ? userInfoFromRedis.userInfo : {};
        if(userInfo && userInfo.firstName){
            userDisplayName=userInfo.firstName;
            if(userInfo.lastName && userInfo.lastName.toLowerCase() != userInfo.firstName.toLowerCase()){
                userDisplayName+= " "+userInfo.lastName;
            }
        }
        return userDisplayName;
    }

    const addressValidation = e => {
        if (e.target.name.indexOf('firstName') > -1) {
            return validate.name(e.target.value, "Name", 30);
        }
        if (e.target.name.indexOf('addressLine1') > -1) {
            return validate.address(e.target.value, true, e.target.id, 200);
        }
        if (e.target.name.indexOf('mobileNo') > -1) {
            return validate.mobileNumber(e.target.value);
        }
    }

    const addOrUpdateAddressInfo = (addressInfo) => {

        /* customerAddressList.map(eachAddress => {
            if(addressInfo.firstName === eachAddress.firstName || addressInfo.addressLine1 === eachAddress.addressLine1 || addressInfo.mobileNo === eachAddress.mobileNo) {
                return;
            }
        }); */
        if(validate.isEmpty(addressInfo)) {
            setErrorMsg(errorMsg => ({...errorMsg, ["firstName"]:validate.name(addressInfo.firstName, "Name", 30)}));
            return;
        } else if(validate.isEmpty(addressInfo.firstName) || validate.isNotEmpty(validate.name(addressInfo.firstName, "Name", 30))) {
            setErrorMsg(errorMsg => ({...errorMsg, ["firstName"]:validate.name(addressInfo.firstName, "Name", 30)}));
            return;
        } else if(validate.isEmpty(addressInfo.addressLine1) || validate.isNotEmpty(validate.address(addressInfo.addressLine1, true, "Street", 200))) {
            setErrorMsg(errorMsg => ({...errorMsg, ["addressLine1"]:validate.address(addressInfo.addressLine1, true, "Street", 200)}));
            return;
        } else if(validate.isEmpty(addressInfo.mobileNo) || validate.isNotEmpty(validate.mobileNumber(addressInfo.mobileNo))) {
            setErrorMsg(errorMsg => ({...errorMsg, ["mobileNo"]:validate.mobileNumber(addressInfo.mobileNo)}));
            return;
        }
        props.addOrUpdateDeliveryDetails(addressInfo);
    }

    const saveAddress = (event) => {
        if("Enter" === event.key){
            addOrUpdateAddressInfo(customerAddress);
        }
    }

    return (
        <div className="add-newaddress mt-n2">
            <span className="badge-title success">{addEditAddress && addEditAddress === 'ADD_ADDRESS' ? 'New Address' : 'Edit Address'}</span>     
            <form action="" className="mt-3" autoComplete="off">
                <p className="title font-weight-bold">Fill Your Details</p>
                <div className="form-group has-float-label ">
                    <input type="text" aria-labelledby="firstName-error" className={`form-control ${errorMsg['firstName']?'is-invalid':''}`} id="Fullname" placeholder=" " name="firstName" 
                    onBlur={(e)=>{e.target.placeholder = " ";handleInputChange(e)}} onChange={handleInputChange} 
                    value={customerAddress && customerAddress.firstName ? customerAddress.firstName : ''}
                    maxLength="30" autoComplete="off" onKeyPress={(event) => saveAddress(event)}
                    onFocus={(e) => e.target.placeholder = ""}/>
                    <label htmlFor="Fullname">Enter your full name</label>
                    <div className="invalid-feedback d-block" id="firstName-error">
                        {errorMsg['firstName']}
                    </div>
                </div>
                <div className="form-group has-float-label">
                    <input type="text" className={`form-control ${errorMsg['addressLine1']?'is-invalid':''}`} id="Street" placeholder=" "
                    name="addressLine1" onBlur={(e)=>{e.target.placeholder = " ";handleInputChange(e)}} 
                    onChange={handleInputChange} aria-labelledby="addressLine1-error"
                    value={customerAddress && customerAddress.addressLine1 ? customerAddress.addressLine1 : ''} 
                    maxLength="200" autoComplete="off" onKeyPress={(event) => saveAddress(event)}
                    required onFocus={(e) => e.target.placeholder = ""}/>
                    <label htmlFor="Street">Door Number/Building Name/Street Name</label>
                    <div className="invalid-feedback d-block" id="addressLine1-error">
                        {errorMsg['addressLine1']}
                    </div>
                </div>
                <div className="form-group has-float-label">
                    <input type="text" aria-labelledby="mobileNumber-err" className={`form-control ${errorMsg['mobileNo']?'is-invalid':''}`} id="Phone" placeholder=" " name="mobileNo" 
                    onBlur={(e)=>{e.target.placeholder = " ";handleInputChange(e)}}
                    onChange={handleInputChange} 
                    value={customerAddress && customerAddress.mobileNo ? customerAddress.mobileNo : ''} 
                    maxLength="10" autoComplete="off" onKeyPress={(event) => saveAddress(event)}
                    required onFocus={(e) => e.target.placeholder = ""}/>
                    <label htmlFor="Phone">Enter Mobile Number</label>
                    <div className="invalid-feedback d-block" id="mobileNumber-err">
                        {errorMsg['mobileNo']}
                    </div>
                </div>
                <p className="font-weight-bold">Selected Locality</p>
                <div className="form-group has-float-label ">
                    <input type="text" className="form-control" id="Location" defaultValue={selectedLocality.locationName} placeholder=" " readOnly={true} autoComplete="off" tabIndex="-1"/>
                    <label htmlFor="Location">Location Area</label>
                </div>
                <div className="form-group has-float-label ">
                    <input type="text" className="form-control" defaultValue={selectedLocality.city} id="City" placeholder=" " readOnly={true} autoComplete="off" tabIndex="-1"/>
                    <label htmlFor="City">City</label>
                </div>
                <div className="form-group has-float-label ">
                    <input type="text" className="form-control" defaultValue={selectedLocality.state} id="State" placeholder=" " readOnly={true} autoComplete="off" tabIndex="-1"/>
                    <label htmlFor="State">State</label>
                </div>
                <div className="form-group has-float-label ">
                    <input type="text" className="form-control" defaultValue={selectedLocality.pincode} id="Pincode" placeholder=" " readOnly={true} autoComplete="off" tabIndex="-1"/>
                    <label htmlFor="Pincode">Pin code</label>
                </div>
                <div className="d-flex justify-content-betwween mt-3">
                    <div className="w-50 mr-3"> 
                        <button type="button" role="button" className="btn btn-block brand-secondary px-5 rounded-pill custom-btn-lg" onClick={() =>props.cancelButtonAction()} tabIndex="-1">Cancel</button>
                    </div>
                    <div className="w-50"> 
                        <button type="button" role="button" className="btn btn-block btn-brand-gradient rounded-pill px-5 custom-btn-lg" onClick={() =>addOrUpdateAddressInfo(customerAddress)}>{addEditAddress === 'ADD_ADDRESS' ? 'Save' : 'Update'}</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default AddNewAddress;