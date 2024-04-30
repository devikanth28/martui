import React from "react";
import { getDisplayableAge } from "../../../../helpers/CommonUtil";
import Validate from "../../../../helpers/Validate";
import { DIAGNOSTICS_URL_PREFIX, Gender } from "../../constants/LabConstants";

const PatientAndDoctorDetails = (props) =>{

    const validate = Validate();

    function redirectToShoppingCart(){
        props.history.push(`${DIAGNOSTICS_URL_PREFIX}/lab-shopping-cart`);
    }

    return(
        <React.Fragment>
            {validate.isNotEmpty(props.patientDetails) && (props.isReviewCard ?
            <section className="cart-summary">
                <div className="header">
                    <p>Patient &amp; Doctor Details</p>
                    <button aria-label="Edit" role="button" title="Edit" className="btn btn-link no-underline text-primary btn-sm" onClick={() => redirectToShoppingCart()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 18 18" className="align-top mr-2">
                        <g transform="translate(-180.257 -249.084)">
                        <rect fill="none" width="18" height="18" transform="translate(180.257 249.084)"></rect>
                        <g transform="translate(180.258 249.086)">
                            <path fill="#080808" d="M2.765,18A2.77,2.77,0,0,1,0,15.234V4.341A2.77,2.77,0,0,1,2.765,1.574H6.274a.6.6,0,0,1,0,1.208H2.763A1.566,1.566,0,0,0,1.208,4.346V15.234A1.568,1.568,0,0,0,2.759,16.8H13.648a1.567,1.567,0,0,0,1.564-1.563V11.725a.6.6,0,0,1,1.207,0v3.509A2.769,2.769,0,0,1,13.652,18ZM5.9,12.825a1.043,1.043,0,0,1-.727-1.281l.7-2.466a.605.605,0,0,1,.149-.269L14.177.649a2.265,2.265,0,0,1,3.172,0,2.261,2.261,0,0,1,0,3.174L9.215,11.98a.612.612,0,0,1-.278.152l-2.445.688-.313.042A1.067,1.067,0,0,1,5.9,12.825ZM7,9.528l-.6,2.041,2.022-.549.022-.007,6.9-6.922.063-.064L13.944,2.563Zm8.083-8.069-.269.242,1.452,1.454.215-.173.009-.008a1.035,1.035,0,0,0-1.407-1.514Z" transform="translate(-0.001 -0.001)"></path>
                        </g>
                        </g>
                    </svg>
                        Edit
                    </button>
                </div>
                <div className="body">
                        <div className="row no-gutters">
                            <div className="col-6 pr-2">
                                <small className="mb-2 d-block text-secondary mt-2">Patient Info</small>
                                <p className="h6 font-weight-normal d-block">Name: &nbsp;<strong>{validate.isNotEmpty(props.patientDetails) ? props.patientDetails.patientName : ''}</strong></p>
                                {props.patientDetails && <p className="font-weight-normal h6 d-block">Age/Gender: &nbsp;<strong>{validate.isNotEmpty(props.patientDetails.dateOfBirth) && getDisplayableAge(props.patientDetails.dateOfBirth)} {props.patientDetails.gender ? ' / ' + Gender[props.patientDetails.gender] : ''}</strong></p>}
                            </div>
                            <div className="col-6 pl-2">
                                <small className="mb-2 d-block text-secondary mt-2">Doctor Info</small>
                                <p className="h6 font-weight-normal d-block">Doctor Name: &nbsp;<strong>{validate.isNotEmpty(props.patientDetails) && props.patientDetails.doctorName ? 'Dr ' + props.patientDetails.doctorName : ''}</strong></p>
                            </div>
                        </div>
                    {/* <p className="d-block font-weight-normal">Name: <strong> {validate.isNotEmpty(props.patientDetails) && props.patientDetails.patientName}</strong></p>
                    <p className="d-block font-weight-normal">Age / Gender: <strong> {validate.isNotEmpty(props.patientDetails) && validate.isNotEmpty(props.patientDetails.age) && (parseInt(props.patientDetails.age) <= 0 ? " < 1 Yr " : props.patientDetails.age +" Yrs ")} {validate.isNotEmpty(props.patientDetails) && (props.patientDetails.gender ? ' / ' + Gender[props.patientDetails.gender] : '')}</strong></p>
                    <p className="d-block font-weight-normal">Doctor Name: <strong> {validate.isNotEmpty(props.patientDetails) && (props.patientDetails.doctorName ? ' Dr '+props.patientDetails.doctorName : '' )}</strong></p> */}
                </div>
            </section> :
            <div className="col-12 px-0 pb-3 mt-4">
                <div className="card pt-4">
                <h6 className="legend-title">Patient &amp;  Doctor Details</h6>
                <div className="body">
                    <div className="row mx-0 px-0">
                    <div className="col-6 px-0">
                        <small className="mb-2 d-block text-secondary mt-2">Patient Info</small>
                        <p className="h6 font-weight-normal">Name: &nbsp;<strong>{validate.isNotEmpty(props.patientDetails) ? props.patientDetails.patientName :''}</strong></p>
                                    {props.patientDetails && <p className="font-weight-normal h6 d-block">Age/Gender: &nbsp;<strong>{validate.isNotEmpty(props.patientDetails.dateOfBirth) && getDisplayableAge(props.patientDetails.dateOfBirth)} {props.patientDetails.gender ? ' / ' + Gender[props.patientDetails.gender] : ''}</strong></p>}
                    </div>
                    <div className="col-6 px-0">
                        <small className="mb-2 d-block text-secondary mt-2">Doctor Info</small>
                        <p className="h6 font-weight-normal">Doctor Name: &nbsp;<strong>{validate.isNotEmpty(props.patientDetails) && props.patientDetails.doctorName ? 'Dr ' + props.patientDetails.doctorName : ''}</strong></p>
                    </div>
                    </div>
                </div>
            </div>
          </div>
            )}
        </React.Fragment>
    )
}

export default PatientAndDoctorDetails