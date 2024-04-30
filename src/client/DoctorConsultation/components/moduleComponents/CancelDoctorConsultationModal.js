import React, { useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Validate from "../../../helpers/Validate";
import DoctorConsultationService from "../../services/DoctorConsultationService";
import CancelOrderIcn from "../../../images/common/refil-interval-icn.svg";

const CancelDoctorConsultationModal = (props) => {

  const [reason, setReason] = useState("");
  const [showErrorMsg, setShowErrorMsg] = useState("");
  const [loader, setLoader] = useState(false);
  const doctorConsultationService = DoctorConsultationService();
  const validate = Validate();

  const cancelOrder = (orderId) => {
    if (validate.isEmpty(reason)) {
      setShowErrorMsg("Please enter reason for cancellation.");
      setTimeout(() => { setShowErrorMsg(undefined) }, 3000);
      return false;
    }
    setLoader(true);
    doctorConsultationService.cancelDoctorConsultation({ consultationId: orderId, reason: reason }).then(data => {
      if (data.statusCode === "SUCCESS") {
        props.getUpComingConsultations(false);
        props.setShowCancelModal();
      } else {
        setShowErrorMsg(data.message);
        setTimeout(() => { setShowErrorMsg(undefined) }, 3000);
      }
      setLoader(false);
    });
  }

  const handleInputChange = event => {
    setReason(event.target.value);
}

  if (!props.open) {
    return <React.Fragment></React.Fragment>
  }

  return (
    <React.Fragment>
      <Modal backdrop="static" keyboard={false} onOpened={() => setReason("")} isOpen={props.open} className="modal-lg modal-dialog-centered cancel-order-popup" tabIndex="-1" autoFocus={false}>
        <ModalBody>
          <div>
            <img className="img-fluid" src={CancelOrderIcn} alt="cancel appointment" title="cancel appointment" />
            <h6>Do you want to cancel appointment?</h6>
            <div className="form-group">
              <label htmlFor="cancel-appointment-reason" id="reason" name="reason" className="sr-only">Cancel Appointment Reason</label>
              <textarea maxLength="200" onChange={handleInputChange} className="form-control" id="cancel-appointment-reason" rows="4" placeholder="Please specify reason for cancellation" autoFocus={true}></textarea>
              <div className="invalid-feedback d-block">
                {showErrorMsg}
              </div>
              <small className="float-right">{reason.length}/200</small>
            </div>
            <div className="text-center mt-4">
              {!loader && <button type="button" className="btn brand-secondary px-5 rounded-pill" onClick={() => props.setShowCancelModal()}>Close</button>}
              <button type="button" role="cancel" className="btn btn-brand-gradient rounded-pill ml-3 px-5" onClick={() => cancelOrder(props.orderId)}>
                {loader ? "" : "Yes, Cancel My Appointment"}
                {loader &&
                  <React.Fragment>
                    <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                    <span className="sr-only"></span>
                  </React.Fragment>
                }
              </button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </React.Fragment>
  );
}

export default CancelDoctorConsultationModal;
