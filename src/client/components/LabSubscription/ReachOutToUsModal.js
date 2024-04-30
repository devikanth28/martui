import React, { useRef } from "react"
import { Modal, ModalBody } from 'reactstrap';
import ReachOutToUs from "./ReachOut"; 
import uploadPrescriptionImg from '../../images/common/uploaded-prescription.svg'

const ReachOutToUsModal=(props) =>{
    const formDivRef = useRef({})

    return(
        <React.Fragment>
            <Modal className="my-account-modal  modal-dialog-centered" backdrop="static" isOpen={props.isModalOpen} toggle={props.toggleModal}>
                { !props.showReachOutMOdalThankYou && <ModalBody className="p-4">
                    <div ref={formDivRef}>
                        <ReachOutToUs/>
                    </div>
                    <div className="text-center">
                        <button type="button" className="brand-secondary btn px-5 rounded-pill" onClick={()=>props.toggleModal("cancel", formDivRef.current.offsetHeight)}>Cancel</button>
                        <button type="button" className="btn btn-brand-gradient ml-3 px-5 rounded-pill" onClick={() => props.toggleModal("submit", formDivRef.current.offsetHeight)}>
                            Submit
                            { false && <React.Fragment>
                                <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                                <span className="sr-only"></span>
                            </React.Fragment>}
                        </button>
                    </div>
                </ModalBody>}
                { props.showReachOutMOdalThankYou && <ModalBody className="p-4 text-center">
                    <div className="flex-center mb-4 flex-column" style={{"height" : props.modalHeight}}>
                        <img src={uploadPrescriptionImg} title="Successfully Received" alt="Successfully Received" height="144px" className="mb-3"/>
                        <p className="display-3 mb-0">Thank You..!</p>
                        <p className="lead mb-0">You have successfully submited you company details. Our executive will get connected with your HR Person soon</p>
                    </div>
                    <div className="text-center">
                        <button type="button" className="brand-secondary btn px-5 rounded-pill" onClick={()=>props.toggleModal("cancel")}>Close</button>
                    </div>
                </ModalBody>}
            </Modal>
        </React.Fragment>
    )
}
export default ReachOutToUsModal