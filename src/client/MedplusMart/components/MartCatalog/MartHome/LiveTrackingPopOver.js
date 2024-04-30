import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import Validate from '../../../../helpers/Validate';

const LiveTrackingPopOver = (props) => {
    
    const validate = Validate();

    const displayOrderId  = useSelector(state => state?.trackOrder?.displayOrderId ? state.trackOrder.displayOrderId : "");
    const orderId  = useSelector(state => state?.trackOrder?.orderId ? state.trackOrder.orderId : "");
    const orderInfo  = useSelector(state => state?.trackOrder?.orderInfo ? state.trackOrder.orderInfo : {});
    
    if(validate.isEmpty(displayOrderId) || validate.isEmpty(orderId) || validate.isEmpty(orderInfo)) {
        return (
            <React.Fragment></React.Fragment>
        );
    }
    return (
        <React.Fragment>
            <Modal className="modal-dialog-right notification doctor-filter-modal location-tracking" isOpen={props.showLiveTrackingPopup} toggle={() => props.setShowLiveTrackingPopup(false)}>
                <ModalHeader>
                    <h4 className='mb-0 font-weight-bold'>Track Order</h4>
                    <button type="button" onClick={() => props.setShowLiveTrackingPopup(false)} className="close icons clear-icn" data-dismiss="modal" aria-label="Close"><span aria-hidden="true"></span></button>
                </ModalHeader>
                    <h5 className="text-secondary px-3 font-weight-light h6 mb-0 py-2 border-bottom">Order Id:
                        <Link to={`/orderDetails/${orderId}`} title="Click to view Order" className="btn font-weight-bold text-primary p-0 ml-1">{displayOrderId}</Link>
                    </h5>
                <ModalBody className="px-4 py-0">
                    <ul className='list-unstyled px-4 pt-0 statusInfo'>
                        {Object.entries(orderInfo).map(([key, value], index) => {
                            return(
                                <React.Fragment>
                                    <li className={index === 0 ? 'mb-2 pt-4' : 'mb-3'} id={"TrackInfoHeader" + index}>
                                        <span className={`step-circ ${value.length > 0 ? 'step-completed-circ' : 'step-pending-circ'}`}></span>
                                        <span className='trackorderHeading'>{key}</span>
                                    </li>
                                    {value.length > 0 && value.map((data, index) => {
                                        return(
                                            <li className="statusInfo-inverted mb-2" key={"TrackInfoData" + index}>
                                                <ul className="list-unstyled statusInfo-subLevel">
                                                    <li className='mb-3'>
                                                        <span class="step-completed-circ-small"></span>
                                                        <span class="statusInfo-panel wbrk">
                                                            <small>{data.status}</small>
                                                            <br/>
                                                            <small>{data.date}</small>
                                                        </span>
                                                    </li>
                                                </ul>
                                            </li>
                                        );
                                    })}
                                </React.Fragment>
                            );
                        })}
                    </ul>
                </ModalBody>
            </Modal>
        </React.Fragment>
    )
}

export default LiveTrackingPopOver;