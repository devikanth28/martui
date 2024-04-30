import React from 'react';
import HomePageSeperator from "../../images/common/lab-home-seperator.png";

function DoctorHomePageSeperator(props) {
    return (
        <React.Fragment>
            <a href="javascript:void(0)" title="click to know more" className="my-4 d-block pb-2">
                <img src={HomePageSeperator} alt="Click to know more" className="w-100"/>
            </a>
        </React.Fragment>
    )
}
export default DoctorHomePageSeperator
