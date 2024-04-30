import React,{useEffect, useState} from 'react';
import { Modal, ModalBody } from 'reactstrap';
import CancelOrderIcn from "../../../images/common/refil-interval-icn.svg";
import Validate from '../../../helpers/Validate';
import MyAccountService from '../../../services/MyAccountService';
import Alert, { ALERT_TYPE_ERROR, ALERT_TYPE_SUCCESS, ALERT_TYPE_WARNING } from '../../Common/Alert';
import CancelOrderReasons from './CancelOrderReasons';


const CancelOrder = (props)=> {
    const [comment, setComment] = useState("");
    const [errorMsg, setErrorMsg] = useState({});
    const [cancelLoader, setCancelLoader] = useState(false);
    const [cancelReasonsopen, setCancelReasonsopen] = useState(false);
    const [selectedReason, setSelectedReason] = useState('');
    const validate = Validate();
    const [alertInfo, setAlertInfo] = useState({});
    const myAccountService = MyAccountService();
    const [reasonsList, setReasonsList] = useState([]);
    const OTHERS = "Others";

    useEffect(() => {
        if(validate.isEmpty(reasonsList)) {
            getOrderCancelReasons();
        }
    }, [])

    const closeBtn =    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={()=>{props.toggle(false)}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <rect fill="none" width="24" height="24"/>
                                <path fill="#b9b9b9" d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm4.853,15.439a.5.5,0,0,1,0,.707l-.707.707a.5.5,0,0,1-.707,0L12,13.414,8.561,16.853a.5.5,0,0,1-.707,0l-.707-.707a.5.5,0,0,1,0-.707L10.586,12,7.147,8.561a.5.5,0,0,1,0-.707l.707-.707a.5.5,0,0,1,.707,0L12,10.586l3.439-3.439a.5.5,0,0,1,.707,0l.707.707a.5.5,0,0,1,0,.707L13.414,12Z"/>
                            </svg>
                        </button>;
   
   const handleInputChange = event => {
        setComment(event.target.value);
    }

    const getOrderCancelReasons = () => {
        myAccountService.getCancelReasons({orderType : "P"}).then((response) => {
            if(response.statusCode == "SUCCESS" && validate.isNotEmpty(response.dataObject.orderCancellationReasons)) {
                setReasonsList(response.dataObject.orderCancellationReasons);
            } else {
                setReasonsList([]);
            }
        }).catch((error) => {
            console.log(error);
            setReasonsList([]);
        });
    }

    const cancelOrder = () => {
        if(validate.isEmpty(selectedReason)) {
            setAlertInfo({message:"Please select the reason to proceed with cancellation", type: ALERT_TYPE_WARNING});
            return;
        }
        if(selectedReason == OTHERS && validate.isEmpty(comment)) {
            setErrorMsg(errorMsg => ({...errorMsg, ["description"]:validate.name(comment, "Description", 30)}));
            return;
        }
        let orderId = props.orderId;
        if(validate.isEmpty(orderId)) {
            setErrorMsg(errorMsg => ({...errorMsg, ["description"]:"Invalid Order Id"}));
            return;
        }        
        let cancelOrderType = props.cancelOrderType;
        if(validate.isEmpty(cancelOrderType)) {
            setErrorMsg(errorMsg => ({...errorMsg, ["description"]:"Invalid order type"}));
            return;
        }
        setCancelLoader(true);
        myAccountService.cancelOrder(orderId, validate.isNotEmpty(selectedReason) &&  selectedReason != OTHERS ? selectedReason : selectedReason + "$" + comment, cancelOrderType === "PRESCRIPTION" ? "P" : undefined).then(response => {
            if (validate.isNotEmpty(response) && validate.isNotEmpty(response.statusCode) && "SUCCESS" == response.statusCode) {
                setAlertInfo({ message: "Order Cancelled successfully", type: ALERT_TYPE_SUCCESS});
                props.updateOrderList();
            } else if("FAILURE" == response.statusCode){
                setAlertInfo({message:response.message, type: ALERT_TYPE_ERROR});
            }
            setCancelLoader(false);
            setSelectedReason('');
        }).catch(function(error) {
            console.log(error);
            setAlertInfo({message:"Unable to cancel order", type: ALERT_TYPE_ERROR});
            setCancelLoader(false);
            setSelectedReason('');
            props.toggle();
        });
        
    }

    const closeModal = () => {
        setSelectedReason("");
        setComment('');
        props.toggle(false);
    }

    return (
        <React.Fragment>
            <Alert alertInfo={alertInfo} duration={5000} onDurationEnd={setAlertInfo}/>
            <Modal backdrop="static" keyboard={false} isOpen={props.modal} className="modal-lg modal-dialog-centered cancel-order-popup" tabIndex="-1" autoFocus={false}>
                <ModalBody>
                    <div>
                        <img className="img-fluid" src={CancelOrderIcn} alt="cancel Order"  title="cancel order"/>
                        <h6>Please select the reason for Order Cancellation</h6>
                        
                        <div className="form-group">

                            <CancelOrderReasons isOpen={cancelReasonsopen} toggle={() => setCancelReasonsopen(!cancelReasonsopen)} selectedReason={selectedReason} cancelReasonsList={reasonsList} setSelectedReason={setSelectedReason}></CancelOrderReasons>

                            {selectedReason == OTHERS && <div>
                                <label htmlFor="cancel-order-description" id="Description" name="description" className="sr-only">Cancel Order Description</label>
                                <textarea maxLength="200" onChange={handleInputChange} className="form-control" id="cancel-order-description" rows="4" placeholder="Please specify reason for cancellation" autoFocus={true} onFocus={() =>  setErrorMsg(errorMsg => ({...errorMsg, ["description"]:""}))}></textarea>
                                <div className="invalid-feedback d-block">
                                    {errorMsg['description']}
                                </div>
                                <small className="float-right">{comment.length}/200</small>
                            </div>}
                            {props.isPrePaidOrder == "S" && <small className="float-left">We require 7 working days for processing the refund.</small>}
                        </div>
                        
                        <div className="text-center mt-4">
                            {!cancelLoader && <button type="button" className="brand-secondary btn px-5 rounded-pill custom-btn-lg" onClick={() => closeModal()}>No</button>}
                            <button type="button" disabled={validate.isEmpty(selectedReason)} className="btn btn-brand-gradient rounded-pill ml-3 px-5 custom-btn-lg"onClick={() => cancelOrder()}>
                                {cancelLoader ? "" : "Yes, Cancel my Order"}
                                {cancelLoader &&
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
    )
}

export default CancelOrder