import React from "react";


export default (props)=>{
    if(props.registrationNumber)
        return   <small className="text-secondary mb-0 d-block">RN - {props.registrationNumber}</small>
    return <React.Fragment></React.Fragment>
}