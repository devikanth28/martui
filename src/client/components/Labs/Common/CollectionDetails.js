

import React, { useState, useEffect } from 'react';
import PatientAddress from '../Common/PatientAddress';
import CollectionCenterAddress from '../Common/CollectionCenterAddress';
import PhlebotomistDetails from '../Common/PhlebotomistDetails';
import SlotDetails from '../Common/SlotDetails';
import ShowPickUpStore from '../../../components/Common/ShowPickUpStore'

const CollectionDetails = (props) =>{

    return(
        <React.Fragment>
            <section className="delivery-detail mb-3">
                <div className="header">
                    <p>Collection Details</p>
                    {props.visitType && props.visitType=="1" ?
                    <span className="badge-title success right">Home Sample Pickup</span>:
                    <span className="badge-title success right">Sample Collection Center</span>
                    }
                </div>
                <div className="body">
                    {props.visitType && props.visitType=="1" &&
                    <PatientAddress isHeaderRequired={true} 
                    firstName={props.patientAddress.firstName}
                    lastName={props.patientAddress.lastName}
                    address1={props.patientAddress.addressLine1}
                    address2={props.patientAddress.addressLine2}
                    city={props.patientAddress.city}
                    state={props.patientAddress.state}
                    pinCode={props.patientAddress.pincode}
                    mobile={props.patientAddress.mobileNo}
                    locationConfigId={props.patientAddress.locationConfigId}/>}
                    {props.visitType && props.visitType=="2" &&
                    <ShowPickUpStore
                    pickStoreName={props.storeAddress.name}
                    pickUpAddress={props.storeAddress.address}
                    locationLatLong={props.storeAddress.locationLatLong}
                    phoneNumber={props.storeAddress.phoneNumber}
                    isSmallAddressRequired={true} excludeBodyClass={true}/>}
                    {props.timeSlot &&
                    <React.Fragment>
                        <hr className="my-3"/>
                        <SlotDetails timeSlot={props.timeSlot}/>
                    </React.Fragment>
                    }
                </div>
            </section>
            {props.reportDeliveryType && props.reportDeliveryType=='H' &&
            <section className="delivery-detail mb-3">
                <div className="header">
                    <p>Report Delivery Address</p>
                </div>
                <div className="body">
                    {props.patientAddress &&
                    <PatientAddress isHeaderRequired={false} 
                    firstName={props.patientAddress.firstName}
                    lastName={props.patientAddress.lastName}
                    address1={props.patientAddress.addressLine1}
                    address2={props.patientAddress.addressLine2}
                    city={props.patientAddress.city}
                    state={props.patientAddress.state}
                    pinCode={props.patientAddress.pincode}
                    mobile={props.patientAddress.mobileNo}
                    locationConfigId={props.patientAddress.locationConfigId}/>}
                </div>
            </section>}
        </React.Fragment>
    )

}

export default CollectionDetails