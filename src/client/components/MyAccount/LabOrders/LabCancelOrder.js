import React,{useState} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';
import CancelOrderIcn from "../../../images/common/refil-interval-icn.svg";
import Validate from '../../../helpers/Validate';


const LabCancelOrder = (props)=> {
    const [cancelReason, setCancelReason] = useState("");
    const [errorMsg, setErrorMsg] = useState({});
    const [isCancelProceeded, setCancelProceeded] = useState(false);
    const validate = Validate();

    const closeBtn = <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={()=>{props.toggle(false)}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <rect fill="none" width="24" height="24"/>
                        <path fill="#b9b9b9" d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm4.853,15.439a.5.5,0,0,1,0,.707l-.707.707a.5.5,0,0,1-.707,0L12,13.414,8.561,16.853a.5.5,0,0,1-.707,0l-.707-.707a.5.5,0,0,1,0-.707L10.586,12,7.147,8.561a.5.5,0,0,1,0-.707l.707-.707a.5.5,0,0,1,.707,0L12,10.586l3.439-3.439a.5.5,0,0,1,.707,0l.707.707a.5.5,0,0,1,0,.707L13.414,12Z"/>
                    </svg>
                </button>;

    const handleInputChange = (event) => {
        setCancelReason(event.target.value);
    }

    const cancelOrder = () => {
        setCancelProceeded(true);
        if(validate.isEmpty(cancelReason)) {
            setCancelProceeded(false);
            setErrorMsg(errorMsg => ({...errorMsg, ["description"]:validate.name(cancelReason, "Description", 30)}));
            return;
        }
        props.cancelOrder(cancelReason);
    }

    return (
        <React.Fragment>
            <Modal backdrop="static" keyboard={false} isOpen={props.modal} className="modal-lg modal-dialog-centered cancel-order-popup" tabIndex="-1" autoFocus={false}>
                <ModalBody>
                    <div>
                        <img className="img-fluid" src={CancelOrderIcn} alt="cancel Order"  title="cancel order"/>
                        <h6>Do you want to Cancel Order?</h6>
                        <div className="form-group">

                            
                                <label htmlFor="cancel-order-description" id="Description" name="description" className="sr-only">Cancel Order Description</label>
                                <textarea maxLength="200" onChange={handleInputChange} className="form-control" id="cancel-order-description" rows="4" placeholder="Please specify reason for cancellation" autoFocus={true}></textarea>
                                <div className="invalid-feedback d-block">
                                    {errorMsg['description']}
                                <small className="float-right">{cancelReason.length}/200</small>
                            </div>

                        </div>
                        <div className="text-center mt-4">
                            <button type="button" className="brand-secondary btn px-5 rounded-pill custom-btn-lg" disabled={isCancelProceeded} onClick={()=>{props.toggle(false)}}>No</button>
                            <button type="button" className="btn btn-brand-gradient rounded-pill ml-3 px-5 custom-btn-lg" disabled={isCancelProceeded} onClick={()=>{cancelOrder()}}>
                                {isCancelProceeded ? "" : "Yes, Cancel my Order"}
                                {isCancelProceeded &&
                                    <React.Fragment>
                                        <div className='spinner-loader'>
                                        <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                                        <span className="sr-only"></span>
                                        </div>
                                    </React.Fragment>
                                }
                            </button>
                        </div>
                    </div>
                </ModalBody>
            </Modal> 
        </React.Fragment>
    )
}

export default LabCancelOrder