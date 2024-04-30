import React from "react";
import DoctorsSvgComponents from "../common/DoctorsSvgComponents";
const NoListAvailable = (props)=>{
    return <React.Fragment>
        <div className="body-height no-data-to-show">
            <DoctorsSvgComponents type={props.type} />
            <h6 class="mt-3">{props.message}</h6>
            {props.showbutton && <button className="flex-center btn btn-brand-gradient rounded-pill px-5 custom-btn-lg" onClick={()=>props.history.push(props.redirectionUrl)}>Start Consultation</button>}
        </div>
    </React.Fragment>
}

export default NoListAvailable;