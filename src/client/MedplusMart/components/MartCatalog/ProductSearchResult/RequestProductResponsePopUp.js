import React from "react";
import { Link } from "react-router-dom";
import { Modal, ModalBody } from "reactstrap";

const RequestProductResponsePopUp = (props) => {

    return (
        <Modal backdrop="static" keyboard={false} isOpen={props.showResponsePopup} className="modal-dialog my-account-modal modal-dialog-centered hide-close" tabIndex="-1" autoFocus={false}>
            <ModalBody className="p-3">
                <p className="text-center">Your request has been successfully recorded. Our procurement team will try and procure this for you.</p>
                <div className="text-center mt-3">
                    <Link to={"/"}>
                        <button type="button" className="btn btn-dark px-5 ml-3">Go to Home</button>
                    </Link>
                    <button type="button" className="btn brand-secondary px-5 ml-3" onClick={props.clearForm}>Request Another Product</button>
                </div>
            </ModalBody>
        </Modal>
    )
}

export default RequestProductResponsePopUp;