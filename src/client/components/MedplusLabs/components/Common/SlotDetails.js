
import moment from "moment";
import React from 'react';

const SlotDetails = (props) => {
if (props.excludeLable) {
    return(
        <React.Fragment>
            <small class="mb-2 d-block text-secondary mt-2">Scheduled Slot</small>
            <p class="h6 font-weight-normal"><strong>{moment(new Date(props.date)).format("MMM DD, YYYY")}({props.slotDisplayName})</strong></p>
        </React.Fragment>
    )
}
return(
    <React.Fragment>
        <span className="small font-weight-bold">Schedule Slot Details</span>
        <p className="d-block font-weight-normal mt-1">Date & Time: <strong>{moment(new Date(props.date)).format("MMM DD, YYYY")} ({props.slotDisplayName})</strong></p>
    </React.Fragment>
)
}

export default SlotDetails;