import React, { useState } from "react";
import Validate from '../../../../helpers/Validate';
import Address from '../../../Checkout/Delivery/Address';
import Artwork from '../../../../images/common/Artwork-cssbg.svg';
import { getLabSelectedLocality } from '../../../../../redux/action/LocalityAction';

const OnlyHomeSamplePickup = (props) => {

    const selectedLocality = getLabSelectedLocality();
    const customerAddressList = props.customerAddressList;
    const validate = Validate();
    const addEditAddress = props.addEditAddress;
    const [errorMsg, setErrorMsg] = useState({});
    const [customerAddress, setCustomerAddress] = useState({});

    const openNewAddressSection = () => {
        props.clearSelectedAddressInfo();
        props.setAddOrEditAddress("ADD_ADDRESS");
        setCustomerAddress({});
    }

    const openEditAddressSection = (address, event, index) => {
        event.stopPropagation();
        props.setAddOrEditAddress("EDIT_ADDRESS");
        address["index"] = index;
        setCustomerAddress(address);
    }

    const cancelButtonAction = () => {
        props.setAddOrEditAddress("");
    }

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
    }

    const addressValidation = e => {
        if (e.target.name.indexOf('firstName') > -1) {
            return validate.name(e.target.value,"Name", 30);
        }
        if (e.target.name.indexOf('addressLine1') > -1) {
            return validate.address(e.target.value, true, e.target.id, 200);
        }
        if (e.target.name.indexOf('mobileNo') > -1) {
            return validate.mobileNumber(e.target.value);
        }
    }

    const addOrUpdateAddressInfo = (addressInfo) => {
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
        props.showLoader(true,false,false);
        let index = 0;
        if(addEditAddress === "EDIT_ADDRESS") {
            index = customerAddress.index;
        } else if(addEditAddress === "ADD_ADDRESS") {
            props.setIsNewAddressAddedFlag(true);
            addressInfo.city = selectedLocality.city;
            addressInfo.state = selectedLocality.state;
            addressInfo.pincode = selectedLocality.pincode;
        }
        props.updateCustomerAddressList(addressInfo, index);
        props.setAddOrEditAddress("");
        props.showLoader(false,false,false);
    }

    return (
        <section className="body-height">
            <div className="header">
                <p>Home Sample Pickup</p>
            </div>
            {validate.isNotEmpty(customerAddressList) && customerAddressList.length > 0 && validate.isEmpty(addEditAddress) && 
                <div className="select-address px-3 py-2">
                    <p className="title d-flex" style={{'justify-content':'normal'}}><span className="mr-5">Saved Address: </span>{!props.isNewAddressAdded && <button type="submit" className="btn btn-brand ml-5" onClick={() =>openNewAddressSection()}>ADD NEW ADDRESS</button>}</p>
                    <div className="address-container">
                        {customerAddressList.map((eachAddress, index) => 
                            <Address key={index} index={index} eachAddressInfo={eachAddress} openEditAddressSection={openEditAddressSection} setHomeDeliveryInfo={props.setHomeDeliveryInfo} selectedDeliveryType={props.selectedDeliveryType} deliveryType={props.deliveryType}/>
                        )}
                    </div>
                </div>
            }
            {validate.isNotEmpty(addEditAddress) && 
                <div className="add-newaddress">
                    <p className="title">{addEditAddress && addEditAddress === 'ADD_ADDRESS' ? 'New Address' : 'Edit Address'}</p>
                    <div className="row no-gutters">
                        <div className="col-6">
                            <form action="" autoComplete="off">
                                <div className="form-group has-float-label ">
                                    <input type="text" className={`form-control ${errorMsg['firstName']?'is-invalid':''}`} id="Fullname" placeholder=" " 
                                    name="firstName" onBlur={(e)=>{e.target.placeholder = " ";handleInputChange(e)}} onChange={handleInputChange} 
                                    value={customerAddress && customerAddress.firstName ? customerAddress.firstName : ''} 
                                    maxLength="30" autoComplete="off" onFocus={(e) => e.target.placeholder = ""}/>
                                    <label htmlFor="Fullname">Enter your full name</label>
                                    <div className="invalid-feedback d-block">
                                        {errorMsg['firstName']}
                                    </div>
                                </div>
                                <div className="form-group has-float-label">
                                    <input type="text" className={`form-control ${errorMsg['addressLine1']?'is-invalid':''}`} id="Street" placeholder=" " 
                                    name="addressLine1" onBlur={(e)=>{e.target.placeholder = " ";handleInputChange(e)}} onChange={handleInputChange} 
                                    value={customerAddress && customerAddress.addressLine1 ? customerAddress.addressLine1 : ''} 
                                    maxLength="200" autoComplete="off" required onFocus={(e) => e.target.placeholder = ""}/>
                                    <label htmlFor="Street">Door Number/Building Name/Street Name</label>
                                    <div className="invalid-feedback d-block">
                                        {errorMsg['addressLine1']}
                                    </div>	              
                                </div>
                                <div className="form-group has-float-label">
                                    <input type="text" className={`form-control ${errorMsg['mobileNo']?'is-invalid':''}`} id="Phone" placeholder=" "
                                    name="mobileNo" onBlur={(e)=>{e.target.placeholder = " ";handleInputChange(e)}}
                                    onChange={handleInputChange} value={customerAddress && customerAddress.mobileNo ? customerAddress.mobileNo : ''} 
                                    maxLength="10" autoComplete="off" required onFocus={(e) => e.target.placeholder = ""}/>
                                    <label htmlFor="Phone">Enter Mobile Number</label>
                                    <div className="invalid-feedback d-block">
                                        {errorMsg['mobileNo']}
                                    </div>
                                </div>
                                <p>Selected Locality</p>
                                <div className="form-group has-float-label ">
                                    <input type="text" className="form-control is-valid" defaultValue={selectedLocality.locality} id="Location" placeholder=" " readOnly={true} autoComplete="off"/>
                                    <label htmlFor="Location">Location Area</label>
                                </div>
                                <div className="form-group has-float-label ">
                                    <input type="text" className="form-control is-valid" defaultValue={selectedLocality.city} id="city" placeholder=" " readOnly={true} autoComplete="off"/>
                                    <label htmlFor="city">City</label>
                                </div>
                                <div className="form-group has-float-label ">
                                    <input type="text" className="form-control is-valid" defaultValue={selectedLocality.state} id="State" placeholder=" " readOnly={true} autoComplete="off"/>
                                    <label htmlFor="State">State</label>
                                </div>
                                <div className="form-group has-float-label ">
                                    <input type="text" className="form-control is-valid" defaultValue={selectedLocality.pincode} id="Pincode" placeholder=" " readOnly={true} autoComplete="off"/>
                                    <label htmlFor="Pincode">Pin code</label>
                                </div>
                                <div className="d-flex justify-content-betwween mt-3">
                                    <div className="w-50 mr-3"> 
                                        <button type="button" className="btn btn-block brand-secondary px-5" onClick={() =>cancelButtonAction()}>CANCEL</button>
                                    </div>
                                    <div className="w-50"> 
                                        <button type="button" className="btn btn-block btn-brand-gradient px-5" onClick={() =>addOrUpdateAddressInfo(customerAddress)}>{addEditAddress === 'ADD_ADDRESS' ? 'Save' : 'Update'}</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-6 m-auto text-center">
                            <img alt="artwork" className="vertical-inline-inherit"  title="artwork" src={Artwork} height="200"/>
                        </div>
                    </div>
                </div>
            }
            {validate.isEmpty(customerAddressList) && validate.isEmpty(addEditAddress) &&
                <div className="col text-center p-3 ">
                    <img alt="artwork" className="vertical-inline-inherit" title="artwork" src={Artwork} height="200"/>
                    <p className="title my-2">No Address added <br/>Please add a address to home delivery</p>
                    <button type="submit" className="btn btn-brand my-2 px-4" onClick={() =>openNewAddressSection()}>ADD NEW ADDRESS</button>
                </div>
            }
        </section>
    );
}
export default OnlyHomeSamplePickup;