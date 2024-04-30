import React, { useEffect, useState } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader, UncontrolledCollapse} from 'reactstrap';

const LiveTracking =() => {
    const [ModalStatus , ShowModal] = useState(false)
    const toggleModel = () => {
        ShowModal(!ModalStatus)
    }
    const CloseButton = <button type="button" onClick={()=>toggleModel()} className="close icons clear-icn" data-dismiss="modal" aria-label="Close"><span aria-hidden="true"></span></button>
    return (
        <React.Fragment>
            <button onClick={()=>ShowModal(!ModalStatus)} className='btn btn-block'>Sample Button</button>
            <Modal className="modal-dialog-right notification doctor-filter-modal location-tracking" isOpen={ModalStatus} toggle={()=>toggleModel()}>
                <ModalHeader>
                        <h4 className='mb-0 font-weight-bold'>Track Order</h4>
                        <button type="button" onClick={()=>toggleModel()} className="close icons clear-icn" data-dismiss="modal" aria-label="Close"><span aria-hidden="true"></span></button>
                </ModalHeader>
                    <h5 className="text-secondary px-3 font-weight-light h6 mb-0 py-2 border-bottom">Order Id:
                        <a href="/orderDetails/16423639" title="Click to view Order" className="btn font-weight-bold text-primary p-0 ml-1">
                            OTGMM2200108786</a></h5>
                <ModalBody className="px-4 py-0">
                    <ul className='list-unstyled px-4 pt-0 statusInfo'>
                        <li className='mb-2 pt-4'>
                            <span className='step-circ step-completed-circ'></span>
                            <span className='trackorderHeading'>APPROVAL</span>
                        </li>
                        <li className="statusInfo-inverted mb-2">
                            <ul className="list-unstyled statusInfo-subLevel">
                                <li className='mb-3'>
                                    <span class="step-completed-circ-small"></span>
                                    <span class="statusInfo-panel wbrk">
                                        <small>Order is created and waiting for doctor to generate prescription
                                        </small><br/>
                                            <small>Thu,13 Oct 2022 | 11:23 PM</small>
                                    </span>
                                </li>
                            </ul>
                        </li>
                        <li className='mb-3'>
                            <span className='step-circ step-pending-circ'></span>
                            <span className='trackorderHeading'>PROCESSING</span>
                        </li>
                        <li className='mb-3'>
                            <span className='step-circ step-pending-circ'></span>
                            <span className='trackorderHeading'>DISPATCH</span>
                        </li>
                        <li className='mb-3'>
                            <span className='step-circ step-pending-circ'></span>
                            <span className='trackorderHeading'>DELIVERY</span>
                        </li>
                    </ul>
                </ModalBody>
            </Modal>
        </React.Fragment>
    )
}

export default LiveTracking