import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


const GetNotifiedPopover = (props) => {
    const togglepopover = () => {
        props.setopen(!props.open)
    }
    return (
        <React.Fragment>
            <div>
                <Modal isOpen={props.open} toggle={togglepopover} centered>
                   
                    <ModalBody>
                        {/* locality popover started */}
                        <div style={{ "text-align": "center" }}>
                            <img alt="location" src="https://static1.medplusmart.com/medplusmart/assets/_65c351f57fdd89c3072ce94328de9bef_/new_theme/web/images/new/addresschange-color-icon-44px.svg" />
                            <button type="button" onClick={() => togglepopover()} className="close icons clear-icn position-relative" aria-label="Close">
                            </button>
                            <h5>
                                <strong style={{ "color": "#08CE73" }}>Modify Service Locality</strong>
                            </h5>
                            <p className="margin-b-20">Your current locality is <strong>6/56, Bhavani Nagar, Moosapet, Hyderabad, Telangana 500018, India</strong>.
                                To change your current locality <a classname="text-primary" href="javascript:void(0);" title="Click here to change locality">Click here</a>
                            </p>
                            <button type="button" className="btn btn-brand-gradient ml-3 px-5 rounded-pill" onClick={() => productPopOver()}>Proceed with current Locality</button>
                        </div>
                            {/* product popover started */}
                        <div className="d-flex align-items-center justify-content-between mb-3">
                            <p className="mb-0 title display-4" style={{"color": "#485dc5"}}>HORLICKS POWDER 2KG</p>
                            <button type="button" onClick={() => togglepopover()} className="close icons clear-icn position-relative" aria-label="Close">
                            </button>
                        </div>
                        <h3 className="mb-0">Need this product?</h3>
                        <p>We will try and source it for you</p>
                        <h6 className="text-secondary small">We will try and source it for you</h6>
                        <div className="form-inline justify-content-between">
                            <div className="form-group has-float-label mb-2 flex-grow-1 mr-2">
                                <input name="name" id="name" placeholder="Quality in Packs 1-99" type="text" className="p-2 w-100"/>
                            </div>
                            <button type="submit" className="btn btn-brand-gradient mb-2 flex-grow-1 ml-2" style={{"border-radius":"0rem 3rem 3rem 0rem"}}>Submit</button>
                        </div>
                        {/* thank you popover started */}

                        <div className="d-flex justify-content-between mb-3">
                            <h4 style={{ "color": "#08CE73" }}>Thank You!</h4>
                            <button type="button" onClick={() => togglepopover()} className="close icons clear-icn position-relative" aria-label="Close">
                            </button>
                        </div>
                        <div>
                        <h4 className="font-weight-lighter">we will reply back to your Email Id / Mobile on stock availability</h4>
                        </div>
                        <hr/>
                        <button className="float-right" style={{"color": "#485dc5"}} onClick={()=>togglepopover()}>Close</button>
                    </ModalBody>
                </Modal>
            </div>
        </React.Fragment>
    )
}
export default GetNotifiedPopover