
import React, { useState, useEffect } from 'react';
import moment from "moment";

const SlotDetails = (props) => {
return(
    <React.Fragment>
        {props.timeSlot && <span className="small font-weight-bold">Scheduled Slot</span>}
        {props.timeSlot && <p className="d-block font-weight-normal mt-1">Date & Time: <strong>{moment(new Date(props.timeSlot.slotDate)).format("MMM DD, YYYY")} ({props.timeSlot.slotDisplayName})</strong></p>}
    </React.Fragment>
)
}

export default SlotDetails;