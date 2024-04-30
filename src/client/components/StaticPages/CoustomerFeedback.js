import React from "react";
import captchImg from '../../images/common/captcha.png';
import RefreshCaptchaIcon from '../../images/common/refresh-icn.png';
import RefreshCaptcha2xIcon from '../../images/common/refresh-icn2x.png';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const CoustomerFeedback = () => {
    return(
        <div className="static-pages coustomer-feedback">
            <h6>Customer Feedback</h6>
            <div className="row mx-0">
                <div className="col-5">
                    <div className="d-flex mt-2 justify-content-end">
                        <span className="mandatory-text">Note: All fields are mandatory</span>
                    </div>
                    <div className="d-flex">
                        <UncontrolledDropdown className="d-inline-block">
                            <DropdownToggle caret  color="white" className='btn-block'>
                                Select a sub reason
                            </DropdownToggle>
                            <DropdownMenu className="w-100">
                                <DropdownItem >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16.621 16">
                                        <g transform="translate(-12 -13)">
                                            <rect width="16" height="16" transform="translate(12 13)" fill="none"></rect>
                                            <path d="M18,9,9.75,17.25,6,13.5" transform="translate(8.5 7.5)" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"></path>
                                        </g>
                                    </svg>
                                    Damaged items
                                </DropdownItem>
                                <DropdownItem >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16.621 16">
                                        <g transform="translate(-12 -13)">
                                            <rect width="16" height="16" transform="translate(12 13)" fill="none"></rect>
                                            <path d="M18,9,9.75,17.25,6,13.5" transform="translate(8.5 7.5)" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"></path>
                                        </g>
                                    </svg>
                                    Expired items
                                </DropdownItem>
                                <DropdownItem >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16.621 16">
                                        <g transform="translate(-12 -13)">
                                            <rect width="16" height="16" transform="translate(12 13)" fill="none"></rect>
                                            <path d="M18,9,9.75,17.25,6,13.5" transform="translate(8.5 7.5)" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"></path>
                                        </g>
                                    </svg>
                                    Items/Parts Missing From Order
                                </DropdownItem>
                                <DropdownItem >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16.621 16">
                                        <g transform="translate(-12 -13)">
                                            <rect width="16" height="16" transform="translate(12 13)" fill="none"></rect>
                                            <path d="M18,9,9.75,17.25,6,13.5" transform="translate(8.5 7.5)" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"></path>
                                        </g>
                                    </svg>
                                    Wrong Items Or Not As Expected
                                </DropdownItem>
                                <DropdownItem >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16.621 16">
                                        <g transform="translate(-12 -13)">
                                            <rect width="16" height="16" transform="translate(12 13)" fill="none"></rect>
                                            <path d="M18,9,9.75,17.25,6,13.5" transform="translate(8.5 7.5)" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"></path>
                                        </g>
                                    </svg>
                                    Other Order Related Issues
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <UncontrolledDropdown className="d-inline-block">
                            <DropdownToggle caret  color="white" className='btn-block'>
                                Select a sub reason
                            </DropdownToggle>
                            <DropdownMenu className="w-100">
                                <DropdownItem >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16.621 16">
                                        <g transform="translate(-12 -13)">
                                            <rect width="16" height="16" transform="translate(12 13)" fill="none"></rect>
                                            <path d="M18,9,9.75,17.25,6,13.5" transform="translate(8.5 7.5)" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"></path>
                                        </g>
                                    </svg>
                                    Damaged items
                                </DropdownItem>
                                <DropdownItem >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16.621 16">
                                        <g transform="translate(-12 -13)">
                                            <rect width="16" height="16" transform="translate(12 13)" fill="none"></rect>
                                            <path d="M18,9,9.75,17.25,6,13.5" transform="translate(8.5 7.5)" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"></path>
                                        </g>
                                    </svg>
                                    Expired items
                                </DropdownItem>
                                <DropdownItem >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16.621 16">
                                        <g transform="translate(-12 -13)">
                                            <rect width="16" height="16" transform="translate(12 13)" fill="none"></rect>
                                            <path d="M18,9,9.75,17.25,6,13.5" transform="translate(8.5 7.5)" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"></path>
                                        </g>
                                    </svg>
                                    Items/Parts Missing From Order
                                </DropdownItem>
                                <DropdownItem >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16.621 16">
                                        <g transform="translate(-12 -13)">
                                            <rect width="16" height="16" transform="translate(12 13)" fill="none"></rect>
                                            <path d="M18,9,9.75,17.25,6,13.5" transform="translate(8.5 7.5)" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"></path>
                                        </g>
                                    </svg>
                                    Wrong Items Or Not As Expected
                                </DropdownItem>
                                <DropdownItem >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16.621 16">
                                        <g transform="translate(-12 -13)">
                                            <rect width="16" height="16" transform="translate(12 13)" fill="none"></rect>
                                            <path d="M18,9,9.75,17.25,6,13.5" transform="translate(8.5 7.5)" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"></path>
                                        </g>
                                    </svg>
                                    Other Order Related Issues
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </div>
                    <div className="d-flex">
                        <div className="form-group filled-form">
                            <input type="text" className="disabled form-control" id="phone-num" name="Mobile Number" maxlength="40" required="" autocomplete="off" value="+91 8688881231"/>
                            <label className="select-label">Mobile Number</label>
                        </div>
                        <div className="form-group filled-form" title="srikanththedesigner@gmail.com">
                            <input type="text" className="disabled form-control text-truncate" id="user-mail" name="User mail" maxlength="40" required="" autocomplete="off" value="srikanththedesigner@gmail.com"/>
                            <label className="select-label">Email Id</label>
                        </div>
                    </div>
                    <div className="form-group mb-4">
                        <label for="cancel-order-description" className="sr-only">Cancel Order Description</label>
                        <textarea className="form-control" id="cancel-order-description" rows="4" placeholder="Enter Description"></textarea>
                        <small>0/500</small>
                    </div>
                    <span>Enter the code and prove you are not a robot.</span>
                    <div className="row mx-0 mt-2 mb-4">
                        <div className="col-6 pl-0">
                            <div className="captcha-container">
                                <span>
                                    <img srcSet={captchImg} className="img-fluid" alt="captcha" title="captcha" />
                                </span>
                                <span className="border-left">
                                    <img srcSet={`${RefreshCaptchaIcon} 1x, ${RefreshCaptcha2xIcon} 2x`} alt="Refresh" title="Refresh"/>
                                </span>
                            </div>
                        </div>
                        <div className="col-6 px-0">
                            <input type="text" className="form-control otp-input" placeholder="Enter Code" value="" name="otp filed"/>
                        </div>
                    </div>
                    <div class="text-right mt-5">
                        <button type="button" className="brand-secondary btn px-5 rounded-pill" >Cancel</button>
                        <button type="button" className="btn btn-brand ml-3 px-5">Submit</button>
                    </div>
                    
                </div>
                <div className="col"></div>
            </div>
        </div>
    )
}

export default CoustomerFeedback;