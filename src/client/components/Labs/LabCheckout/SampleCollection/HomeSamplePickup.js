import React, { useState } from 'react';
import Validate from '../../../../helpers/Validate';
import Address from '../../../Checkout/Delivery/Address';
import AddNewAddress from '../../../Checkout/Delivery/AddNewAddress';
import Artwork from '../../../../images/common/Artwork-cssbg.svg';
import { getLabSelectedLocality } from '../../../../../redux/action/LocalityAction';

const HomeSamplePickup = (props) => {

    const validate = Validate();
    const selectedLocality = getLabSelectedLocality();
    const customerAddressList = props.customerAddressList;
    const [editAddressInfo, setEditAddressInfo] = useState({});
    const addEditAddress = props.addEditAddress;
    
    const openNewAddressSection = () => {
        props.clearSelectedAddressInfo();
        props.setAddOrEditAddress("ADD_ADDRESS");
        setEditAddressInfo({});
    }
    
    const openEditAddressSection = (address, event, index) => {
        event.stopPropagation();
        props.setAddOrEditAddress("EDIT_ADDRESS");
        address["index"] = index;
        setEditAddressInfo(address);
    }

    const cancelButtonAction = () => {
        props.setAddOrEditAddress("");
    }

    const addOrUpdateDeliveryDetails = (addressInfo) => {
        props.showLoader(true,false,false);
        let index = 0;
        if(addEditAddress === "EDIT_ADDRESS") {
            index = editAddressInfo.index;
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
        <React.Fragment>
            <section className="body-height">
                <div className="header mb-0">
                    <p>Home Sample Pickup</p>
                </div>
                <div className="home-delivery-option-tab">
                    <div className={validate.isEmpty(addEditAddress) ? 'select-address' : ''}>
                        {validate.isEmpty(addEditAddress) && validate.isNotEmpty(customerAddressList) && <p className="title">Saved Address: {!props.isNewAddressAdded && <button type="submit" className="btn btn-brand" onClick={() =>openNewAddressSection()}>add new address</button>}</p>}
                        {validate.isEmpty(addEditAddress) && validate.isNotEmpty(customerAddressList) && customerAddressList.length > 0 && customerAddressList.map((eachAddress, index) => 
                            <Address key={index} index={index} eachAddressInfo={eachAddress} openEditAddressSection={openEditAddressSection} setHomeDeliveryInfo={props.setHomeDeliveryInfo} selectedDeliveryType={props.selectedDeliveryType} deliveryType={props.deliveryType}/>
                        )}
                        {validate.isNotEmpty(addEditAddress) && <AddNewAddress selectedLocality={selectedLocality} addEditAddress={addEditAddress} editAddressInfo={editAddressInfo} setAlertMessage={props.setAlertMessage} cancelButtonAction={cancelButtonAction} setIsNewAddressAddedFlag={props.setIsNewAddressAddedFlag} showLoader={props.showLoader} addOrUpdateDeliveryDetails={addOrUpdateDeliveryDetails}/>}
                    </div>
                    {validate.isEmpty(customerAddressList) && validate.isEmpty(addEditAddress) && 
                        <div className="col text-center p-3 ">
                            <img alt="artwork" className="vertical-inline-inherit" title="artwork" src={Artwork} height="200"/>
                            <h6 className="title my-2">No Address added</h6>
                            <p className="mb-2">Please add an address for home sample pickup</p>
                            <button type="submit" className="btn btn-brand my-2 px-4" onClick={() =>openNewAddressSection()}>add new address</button>
                        </div>
                    }
                </div>
            </section>
        </React.Fragment>
    );
}

export default HomeSamplePickup;
