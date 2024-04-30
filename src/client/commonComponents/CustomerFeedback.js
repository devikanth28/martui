import React, { useState } from "react";
import { Dropdown, DropdownToggle, DropdownItem, DropdownMenu } from 'reactstrap'

const CustomerFeedback = () => {

    const [openDropdown, setOpenDropdown] = useState(false)
    const toogleReason = () => {
        setOpenDropdown(!openDropdown)
    }

    return (
        <React.Fragment>
            <section className='shadow-none p-3 CustomerFeedback'>
                <h5 className="sectionHeading mb-4">Customer Feedback
                    <span className='underline'></span>
                </h5>
                <div className='row'>
                    <div className='col-2'></div>
                    <div className='col-6'>
                        <div className="mb-4 subs-register-dropdown">
                            <label className="dropdown-label" style={{ zIndex: "1001" }}>Reason<sup className='text-danger'> *</sup></label>
                            <Dropdown isOpen={openDropdown} toggle={toogleReason}>
                                <DropdownToggle caret color="white" className="btn-block border">
                                    <span>Select Reason</span>
                                </DropdownToggle>
                                <DropdownMenu className="w-100">
                                    <DropdownItem>Header</DropdownItem>
                                    <DropdownItem>Action</DropdownItem>
                                    <DropdownItem>Another Action</DropdownItem>
                                    <DropdownItem>Another Action</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                        <div className="form-group has-float-label mb-4">
                            <input name="emailId" id="emailId" maxLength="50" placeholder=" " type="text" autoComplete="off" className={"form-control"} value="" />
                            <label htmlFor="emailId" className="select-label text-capitalize">Email ID<sup className="text-danger"> *</sup></label>
                            <div className="invalid-feedback"></div>
                        </div>
                        <div className="form-group has-float-label mb-4">
                            <input name="phoneNumber" id="phoneNumber" maxLength="10" placeholder=" " type="tel" autoComplete="off" className={"form-control"} value="" />
                            <label htmlFor="PhoneNumber" className="select-label">Phone Number<sup className="text-danger"> *</sup></label>
                            <div className="invalid-feedback"></div>
                        </div>
                        <div className="form-group has-float-label mb-4">
                            <textarea name="Description" id="Description" className="form-control" rows="4" placeholder="Enter Description"></textarea>
                            <label htmlFor="Description" className="select-label">Description</label>
                            <div className='invalid-feedback'></div>
                        </div>
                        <div className="row mb-4 no-gutters">
                            <div className='col-4'>
                                <img className="img-fluid" alt="captchaImg" src="https://www.medplusmart.com/new_theme/images/captcha/1647805196477.jpg" id="captchaImg" /> <br/>
                                <small>Unable to read, Refresh
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24.004 24">
                                        <g id="refresh_black_icon_24px" transform="translate(-0.302)">
                                            <rect id="BG_Guide" data-name="BG Guide" width="24" height="24" transform="translate(0.306)" fill="none" />
                                            <g id="Group_2531" data-name="Group 2531" transform="translate(0.302 2)">
                                                <path id="Path_1096" data-name="Path 1096" d="M2082.81,339.873a9.622,9.622,0,0,1,9.487,8.111h-1.345a8.276,8.276,0,0,0-15.875-1.451h2.288l-1.616,1.726-1.614,1.725-1.612-1.725-1.616-1.726h2.764A9.609,9.609,0,0,1,2082.81,339.873Z" transform="translate(-2070.905 -339.873)" fill="#080808" />
                                                <path id="Path_1097" data-name="Path 1097" d="M2091.271,347.4l1.613,1.725,1.616,1.726h-2.923a9.6,9.6,0,0,1-18.657-1.355h1.344a8.278,8.278,0,0,0,15.914,1.355h-2.137l1.616-1.726Z" transform="translate(-2070.496 -338.402)" fill="#080808" />
                                            </g>
                                        </g>
                                    </svg>
                                </small>
                            </div>
                            <div className='col-8'>
                                <div className="form-group has-float-label mb-4">
                                    <input name="captchaCode" id="captchaCode" placeholder=" " type="text" autoComplete="off" className={"form-control"} value="" />
                                    <label htmlFor="captchaCode" className="select-label">Please enter the Code here<sup className="text-danger"> *</sup></label>
                                    <div className="invalid-feedback"></div>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex align-items-center justify-content-between'>
                            <p className='text-secondary mb-0 small'>Note: All fields are Mandatory</p>
                            <button className='btn btn-brand px-5'> Submit</button>
                        </div>
                    </div>
                    <div className='col-4'>
                        <img className="m-5" alt="Customer Feedback" src="https://static1.medplusmart.com/medplusmart/assets/_5f049cde411ef75de3dd1077f16785c2_/new_theme/web/images/feedback-icn.png" />
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
}

export default CustomerFeedback;