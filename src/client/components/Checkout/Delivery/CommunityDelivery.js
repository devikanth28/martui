import React, {useState, useEffect} from "react";
import Validate from '../../../helpers/Validate';

const CommunityDelivery = (props) => {

    const validate = Validate();
    const [communityAddress, setCommunityAddress] = useState({});
    const [errorMsg, setErrorMsg] = useState({});
    
    useEffect(() => {
        if(validate.isEmpty(communityAddress)) {
            setCommunityAddress(JSON.parse(JSON.stringify(props.communityDeliveryAddress)));
        }
    },[communityAddress]);

    const handleInputChange = event => {
        let feildName = event.target.name;
        let feildValue = event.target.value;

        let errMsg = validation(event);
        if (errMsg)  {
            setErrorMsg(errorMsg => ({...errorMsg, [feildName]:errMsg}));
        } else {
            setErrorMsg({...errorMsg,[feildName]: ''});
        }
        setCommunityAddress({...communityAddress, [feildName]: feildValue});
        props.setCommunityInfo(communityAddress);
    }

    const validation = e => {
        if (e.target.name.indexOf('addressLine1') > -1) {
            return validate.address(e.target.value, true, e.target.id, 200);
        }
        if (e.target.name.indexOf('shippingMobileNo') > -1) {
            return validate.mobileNumber(e.target.value);
        }
    }

    return (
        <section className="body-height">
            <div className="header">
                <p>Community Delivery Address</p>
            </div>
            <div className="add-newaddress bg">
                <div className="row no-gutters">
                    <div className="col-4">
                        <form className="">
                            <div className="form-group has-float-label">
                                <input type="text" className="form-control" id="Street" placeholder=" " name="addressLine1" onBlur={handleInputChange} onChange={handleInputChange} value={communityAddress && communityAddress.addressLine1 ? communityAddress.addressLine1 : ''} maxLength="200" autoComplete="off" required />
                                <label htmlFor="Street" className="">Block / Flat Number <sup className="text-brand">*</sup></label>
                                <div className="invalid-feedback d-block">{errorMsg['addressLine1']}</div>
                            </div>
                            <div className="form-group has-float-label">
                            <input type="text" className="form-control" id="Phone" placeholder="Enter Mobile Number" name="shippingMobileNo" onBlur={handleInputChange} onChange={handleInputChange} value={communityAddress && communityAddress.shippingMobileNo ? communityAddress.shippingMobileNo : ''} maxLength="10" autoComplete="off" required/>
                                <label htmlFor="Phone" className="">Mobile Number <sup className="text-brand">*</sup></label>
                                <div className="invalid-feedback d-block">{errorMsg['shippingMobileNo']}</div>
                            </div>
                        </form>
                        <div className="selected-community">
	         	            <ul className="row m-0 p-0">
		                        <li className="col-lg-12 col-md-12 p-0">
                                    <div className="community-address">
                                        <p className="title">
                                            Selected Community
                                        </p>
                                        <p>
                                            Community Name
                                            <strong >{props.locality.locationName}</strong>
                                        </p>
                                        <p>
                                            Address
                                            <strong >{props.locality.address}</strong>
                                        </p>
                                        <p className="mb-0">
                                            Drop of point
                                            <strong>{props.locality.dropOffPoint}</strong>
                                        </p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default CommunityDelivery;