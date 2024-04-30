import React, { useState} from 'react';
import { Modal, ModalHeader, ModalBody ,ModalFooter} from 'reactstrap';

const DeleteHealthRecord = (props)=> {
    const closeBtn = <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={()=>{props.toggle(false)}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <rect fill="none" width="24" height="24"/>
                        <path fill="#b9b9b9" d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm4.853,15.439a.5.5,0,0,1,0,.707l-.707.707a.5.5,0,0,1-.707,0L12,13.414,8.561,16.853a.5.5,0,0,1-.707,0l-.707-.707a.5.5,0,0,1,0-.707L10.586,12,7.147,8.561a.5.5,0,0,1,0-.707l.707-.707a.5.5,0,0,1,.707,0L12,10.586l3.439-3.439a.5.5,0,0,1,.707,0l.707.707a.5.5,0,0,1,0,.707L13.414,12Z"/>
                    </svg>
                </button>;

    return (
        <React.Fragment>
            <Modal backdrop="static" keyboard={false} isOpen={props.modal} toggle={props.toggle} id="delete-health-record" className="modal-lg modal-dialog-centered my-account-modal delete-prescription-popup" tabIndex="-1" role="dialog"  aria-hidden="true">
            <ModalHeader close={closeBtn}>Remove Health Record</ModalHeader>
                <ModalBody>
                    <div className="row mx-0">
                        <div className="col-6 my-account-popup-bg-icon"></div>
                        <div className="col-6">
                            <h6 className="delete-prescription-text">
                                Do you want to remove this health record?
      			            </h6>
                        </div>
                    </div>
                    <div className="text-center mt-4">
                        <button type="button" className="brand-secondary btn px-5 rounded-pill custom-btn-lg" data-dismiss="modal" onClick={()=>{props.toggle(false)}}>No</button>
                        <button type="button" className="btn btn-brand-gradient rounded-pill ml-3 px-5 custom-btn-lg" onClick={()=>{props.deleteMyHealthRecord()}}>Yes, Delete This Record</button>
                    </div>
                </ModalBody> 
            </Modal>
        </React.Fragment>
    )
}

export default DeleteHealthRecord