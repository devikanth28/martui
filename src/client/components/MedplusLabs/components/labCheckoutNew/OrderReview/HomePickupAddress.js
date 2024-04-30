import React from "react"
import Validate from '../../../../../helpers/Validate';
import PatientAddress from "../../../../Labs/Common/PatientAddress";
import SlotDetails from "../../../../Labs/Common/SlotDetails"

const HomePickupAddress=(props)=>{

    const validate = Validate();

    const setTimeSlot = (date,name) =>{
        var timeSlot = {};
        timeSlot.slotDate = date;
        timeSlot.slotDisplayName = name;
        return timeSlot;
    }

    return(
        <React.Fragment>
            {props.homeAddress && 
                            <div className="each-info">
                                <section className="cart-summary">
                                    <div className="header">
                                        <p>Collection Details</p>
                                    </div>
                                    <div className="body labs-address">
                                        <span className="small font-weight-bold">Collection type:</span>
                                        <p className="d-block font-weight mt-1">Home Sample Collection</p>
                                        <hr className="my-3"/>
                                        <div className="">
                                            <p className="font-weight-bold">{validate.isNotEmpty(props.homeAddress.firstName) && props.homeAddress.firstName } {validate.isNotEmpty(props.homeAddress.lastName) && props.homeAddress.lastName }</p>
                                            <address className="no-select p-0">
                                            <PatientAddress
                                                isHeaderRequired={false} 
                                                address1={props.homeAddress.addressLine1}
                                                address2={props.homeAddress.addressLine2}
                                                city={props.homeAddress.city}
                                                state={props.homeAddress.state}
                                                pinCode={props.homeAddress.pincode}
                                                mobile={props.homeAddress.mobileNo}
                                                locationConfigId={props.homeAddress.locationConfigId}
                                            />
                                            </address>
                                            <hr className="my-2"/>
                                            {props.homeTests && props.homeTests[0].labOrderItemSlot && props.homeTests[0].labOrderItemSlot.labTimeSlot &&
                                                <React.Fragment>
                                                    <SlotDetails timeSlot={setTimeSlot(props.homeTests[0].labOrderItemSlot.date,props.homeTests[0].labOrderItemSlot.labTimeSlot.displayName)}/>
                                                </React.Fragment>
                                            }
                                        </div>
                                    </div>
                                </section>
                                
                            </div>
                            }
        </React.Fragment>
    )
}
export default HomePickupAddress