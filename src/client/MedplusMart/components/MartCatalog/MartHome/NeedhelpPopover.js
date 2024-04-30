import React, { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody} from 'reactstrap';
import CallToOrder from '../../../../images/common/Call center-amico.svg'

const NeedhelpPopover = (props) => {

    const CloseButton = <button type="button" onClick={()=>props.showNeedHelpPopover(!props.needHelpPopover)} className="close" >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <rect fill="none" width="24" height="24" />
            <path d="M20.76,19.55l-7.58-7.56,7.56-7.56a.846.846,0,0,0-.04-1.18.822.822,0,0,0-1.13,0L12,10.81,4.44,3.24A.827.827,0,0,0,3.27,4.41l7.56,7.58L3.27,19.55a.835.835,0,0,0,1.14,1.22l.04-.04L12,13.17l7.56,7.56a.833.833,0,0,0,1.17,0h0a.821.821,0,0,0,.04-1.16A.031.031,0,0,0,20.76,19.55Z" />
        </svg>
    </button>

    return (
        <React.Fragment>

            <Modal className=" modal-dialog-centered registration-user-modal" isOpen={props.needHelpPopover} toggle={()=>props.showNeedHelpPopover(!props.needHelpPopover)}>
                <ModalHeader toggle={()=>props.showNeedHelpPopover(!props.needHelpPopover)} close={CloseButton} />
                <ModalBody>
                    <div className="text-center">
                        <img src={CallToOrder} alt="Call to Order" height="146" />
                        <p className="font-16 text-secondary mb-0">For customer care help with your order, please call</p>
                        <a href="tel:040-67006700" title="Call us" className="text-dark h1">040 - 6700 6700</a>
                        <p className="font-16 text-secondary mb-0">Available from 6 AM - 10 PM everyday</p>
                        <button className="btn mt-4 mb-n4 rounded-pill px-5 brand-secondary custom-btn-lg" onClick={()=>props.showNeedHelpPopover(!props.needHelpPopover)}>Close</button>
                    </div>
                    
                </ModalBody>
            </Modal>



        </React.Fragment>
    )
}
export default NeedhelpPopover