import React from "react";
import NoSymptoms from "../../../images/common/store-doctor-banner-icon.svg"
const DoctorsNoSympotoms = (props) => {
    return (
        <React.Fragment>
            <section className="d-flex align-items-center h-100 justify-content-center" style={props.isHomePage ? { "height": "calc(100% - 51px)" } : {}}>
                <div>
                    <img src={NoSymptoms} alt="No Symptoms and Specializations" height="120px" className="w-100"/>
                    <p className="mb-0 mt-3 text-center">No Symptoms or Specializations Available </p>
                </div>
            </section>
        </React.Fragment>
    )
}

export default DoctorsNoSympotoms