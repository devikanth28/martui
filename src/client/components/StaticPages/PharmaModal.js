import React, { useState } from 'react';
import offerInfo from '../../images/common/offerInfo.png'
import { Modal, ModalBody } from 'reactstrap';
const PharmaModal = (props) => {

    return (
        <React.Fragment>
            <Modal className="modal-lg offersDialog" backdrop="static" isOpen={props.isopen} toggle={true}>
                <div className="modal-header">
                    <h5 className="modal-title"></h5>
                    <button type="button" className="close" onClick={props.toggleChangeAddressModal}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <rect fill="none" width="24" height="24"></rect>
                            <path d="M20.76,19.55l-7.58-7.56,7.56-7.56a.846.846,0,0,0-.04-1.18.822.822,0,0,0-1.13,0L12,10.81,4.44,3.24A.827.827,0,0,0,3.27,4.41l7.56,7.58L3.27,19.55a.835.835,0,0,0,1.14,1.22l.04-.04L12,13.17l7.56,7.56a.833.833,0,0,0,1.17,0h0a.821.821,0,0,0,.04-1.16A.031.031,0,0,0,20.76,19.55Z"></path>
                        </svg>
                    </button>
                </div>
                <ModalBody className="modal-body p-0">
                    <div className="modal-body modal-body p-0">
                        <div className="row m-0">
                            <div className="col-xs-12 col-sm-4 offerModalinfo">
                                <div className="py-3">
                                    <img className="img-fluid" src={offerInfo} alt="FlexiRewards Offer" />
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-8 promotionOffers">
                                <div className="py-3  FirstOrder">
                                    <ul>
                                        <li className="strong">The offer is applicable on prescription and non prescription medicines</li>
                                        <li>No coupon code is required to avail this offer</li>
                                        <li>To avail this offer, choose reward points instead of cash discount at the time of check out.  Use the points to exchange for free Flexi Rewards products
                                            For example: If you purchase medicines <span className="strong">worth Rs.1000/-, you can take a Floor Cleaner (Rs.130/-), a Toilet Cleaner (Rs.72/-), and a Dish Wash (Rs.104/-)</span> absolutely free. That is a savings of Rs.306/- all together, resulting in <span className="strong">a 30.6% discount on your medicines.</span>
                                        </li>
                                        <li>For purchases <span className="strong">up to Rs.1000/-, you get 10 points for every Rs.100/-</span> and for purchases <span className="strong">above Rs.1000/-, you get 15 points for every Rs.100/-</span></li>
                                        <li>To  know more about flexi program, click <br />
                                            <a href="https://www.medplusmart.com/flexiRewards">https://www.medplusmart.com/flexiRewards</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </React.Fragment>
    )
}

export default PharmaModal;