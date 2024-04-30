import React from "react";
import Validate from '../../../../../helpers/Validate';
import ShowPickUpStore from "../../../../Common/ShowPickUpStore";
import SlotDetails from "../../../../Labs/Common/SlotDetails"

const LabWalkinCollection = (props)=>{

    const validate = Validate();

    const setTimeSlot = (date,name) =>{
        var timeSlot = {};
        timeSlot.slotDate = date;
        timeSlot.slotDisplayName = name;
        return timeSlot;
    }

    return(
        <React.Fragment>
            {props.labAddress &&
                            <section className="cart-summary">
                                    <div className="header">
                                        <p>Collection Details</p>
                                    </div>
                                    <div className="body labs-address">
                                        <span className="small font-weight-bold">Collection type:</span>
                                        <p className="d-block font-weight mt-1">Diagnostic Centre Walk-in</p>
                                        <hr className="my-3 border-bottom-0"/>
                                        <div className="">
                                            <ShowPickUpStore
                                                pickStoreName={props.labAddress.name}
                                                pickUpAddress={props.labAddress.address}
                                                locationLatLong={props.labAddress.locationLatLong}
                                                phoneNumber={props.labAddress.phoneNumber}
                                                isSmallAddressRequired={false} excludeBodyClass={true}
                                            />
                                            <hr className="my-2 border-bottom-0"/>
                                            {validate.isNotEmpty(props.walkInTests) && props.walkInTests[0].labOrderItemSlot && props.walkInTests[0].labOrderItemSlot.labTimeSlot &&
                                                <React.Fragment>
                                                    <SlotDetails timeSlot={setTimeSlot(props.walkInTests[0].labOrderItemSlot.date,props.walkInTests[0].labOrderItemSlot.labTimeSlot.displayName)}/>
                                                 </React.Fragment>
                                            }
                                           </div>
                                    </div>
                                </section>}
        </React.Fragment>
    )

}
export default LabWalkinCollection