import React from 'react';
import { Modal, ModalBody } from 'reactstrap';
const EmailInvoiceModal = (props) => {
    return (
        <React.Fragment>
            <Modal className="my-account-modal modal-dialog-centered refill-interval-popup" backdrop="static" isOpen={props.openModal} toggle={props.toggleModel} style={{ paddingRight: "15px" }}>
                <div class="modal-header">
                    <h5 class="modal-title"> Email Invoice</h5>
                    <button type="button" class="close">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <rect fill="none" width="24" height="24"></rect>
                            <path fill="#b9b9b9" d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm4.853,15.439a.5.5,0,0,1,0,.707l-.707.707a.5.5,0,0,1-.707,0L12,13.414,8.561,16.853a.5.5,0,0,1-.707,0l-.707-.707a.5.5,0,0,1,0-.707L10.586,12,7.147,8.561a.5.5,0,0,1,0-.707l.707-.707a.5.5,0,0,1,.707,0L12,10.586l3.439-3.439a.5.5,0,0,1,.707,0l.707.707a.5.5,0,0,1,0,.707L13.414,12Z"></path>
                        </svg>
                    </button>
                </div>
                <ModalBody className="modal-body p-0">
                    <div class="modal-body modal-body p-4">
                        <p className="pb-3">Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit</p>
                        <div class="form-group has-float-label form-group-error">
                            <input type="text" class="form-control is-invalid" id="loginId" name="Email/Phone" autocomplete="new-off" placeholder=" " maxlength="45" value="" />
                            <label for="loginId">Enter Email Id </label>
                            <div class="invalid-feedback d-block text-left">Enter valid emailId/mobile</div>
                        </div>
                        <button type="button" class="btn brand-secondary px-4 rounded-pill" value="false">Cancel</button><button class="btn btn-brand px-4 ml-3" type="button" value="true">Submit</button>
                    </div>
                </ModalBody>
            </Modal>
        </React.Fragment>
    )
}

export default EmailInvoiceModal;