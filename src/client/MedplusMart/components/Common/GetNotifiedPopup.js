import React, { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { getSelectedLocality } from "../../../../redux/action/LocalityAction";
import ChangeLocality from "../../../components/Locality/ChangeLocality";
import { setGetNotifiedLocationConfirmationInCookie } from "../../../helpers/CommonUtil";
import Validate from "../../../helpers/Validate";
import MyAccountService from "../../../services/MyAccountService";
import Cookies from "js-cookie";
import LocationIcn from "../../../images/common/location-icn.png"
import Image from "../../../components/Common/Image";

const GetNotifiedPopup = (props) => {

    const validate = Validate();
    const selectedLocality = getSelectedLocality();

    const [showQuantityModal, setShowQuantityModal] = useState(validate.isNotEmpty(Cookies.get("getNotifyLocationConfirmed")));
    const [requestedQty, setRequestedQty] = useState("");
    const [isLocalityModalOpen, setLocalityModalOpen] = useState(false);
    const [showThankyou, setShowThankyou] = useState(false);
    const [isNotifingProduct, setIsNotifingProduct] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const handleChange = (e) => {
        e.preventDefault();
        if(validate.isNumeric(e.target.value) || "" === e.target.value ){
            setRequestedQty(e.target.value);
        }
    }

    useEffect(() => {
        if(history && history.state && history.state.latLong && selectedLocality.locationLatLong != history.state.latLong) {
            props.setShowGetNotifiedModal(true);
            setGetNotifiedLocationConfirmationInCookie();
            setShowQuantityModal(true);
        }
        window.history.replaceState({'latLong' : null}, '', window.location.href);
    }, []);

    const notifyProduct = (productId, requestedQty)=>{
        if (validate.isEmpty(requestedQty) || isNaN(requestedQty) || 0 >= parseInt(requestedQty) || 99 < parseInt(requestedQty)) {
            setErrorMsg("Please enter valid quantity for this product");
            return false;
        }
        setIsNotifingProduct(true);
        MyAccountService().productNotifyMe(productId, requestedQty).then(response => {
            setSuccessMsg("");
            setErrorMsg("");
            if (validate.isNotEmpty(response) && response.statusCode === "SUCCESS") {
                setSuccessMsg("We will reply back to your Email Id /  Mobile on stock availability");
                setShowThankyou(true);
                setTimeout(() => {
                    props.setShowGetNotifiedModal(false);
                }, 5000);
                setIsNotifingProduct(false);
            } else {
                if (response.message == "Product already notified") {
                    setErrorMsg("You have already requested to notify for this product");
                }
                else {
                    setErrorMsg(response.message);
                }
                setIsNotifingProduct(false);
            }
        }).catch(function (error) {
            console.log(error);
            setIsNotifingProduct(false);
        });
    }

    const setLatLongToState = () => {
        window.history.replaceState({'latLong' : selectedLocality.locationLatLong}, '', window.location.href);
    }

    const clearLatLongFromState = () => {
        window.history.replaceState({'latLong' : null}, '', window.location.href);
    }

  
    const closeBtn=<button type="button" onClick={() => props.setShowGetNotifiedModal(false)} className="close" >
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <rect fill="none" width="24" height="24"/>
      <path d="M20.76,19.55l-7.58-7.56,7.56-7.56a.846.846,0,0,0-.04-1.18.822.822,0,0,0-1.13,0L12,10.81,4.44,3.24A.827.827,0,0,0,3.27,4.41l7.56,7.58L3.27,19.55a.835.835,0,0,0,1.14,1.22l.04-.04L12,13.17l7.56,7.56a.833.833,0,0,0,1.17,0h0a.821.821,0,0,0,.04-1.16A.031.031,0,0,0,20.76,19.55Z"/>
    </svg>
</button>
    return (
        <React.Fragment>
            {validate.isNotEmpty(selectedLocality) && isLocalityModalOpen && <ChangeLocality modal={isLocalityModalOpen} toggle={() => setLocalityModalOpen(!isLocalityModalOpen)} selectedLocality={selectedLocality} />} 
            { validate.isNotEmpty(props.product) &&
                <Modal isOpen={props.showGetNotifiedModal} toggle={() => props.setShowGetNotifiedModal(!props.showGetNotifiedModal)} centered className="registration-user-modal">

                    <ModalHeader close={closeBtn}/>
                        
                    {!showQuantityModal && validate.isEmpty(successMsg) && <ModalBody>
                        <div style={{ textAlign: "center" }}>
                            <Image alt="Location" src={LocationIcn} className="mb-2"/>
                            {/* <button type="button" onClick={() => props.setShowGetNotifiedModal(false)} className="close icons clear-icn position-relative" aria-label="Close" /> */}
                            <h4 className="mb-4">
                                Modify Service Locality
                            </h4>
                            <p>Your current locality is <strong className="font-weight-bolder">{selectedLocality?.combination}</strong>.
                                To change your current locality <a classname="text-primary" href="javascript:void(0);" title="Click here to change locality" onClick = {() => { setLatLongToState(); setLocalityModalOpen(true);}}>Click here</a>
                            </p>
                            <button type="button" className="btn btn-brand-gradient ml-3 px-5 rounded-pill custom-btn-lg" onClick = {() => { setGetNotifiedLocationConfirmationInCookie(); setShowQuantityModal(true) }}>Proceed with current Locality</button>
                        </div>
                    </ModalBody>}
                    {showQuantityModal && validate.isEmpty(successMsg) && <div>
                        <ModalBody>
                            {validate.isNotEmpty(props.product.productName) && <h3 className="text-brand">{props.product.productName}</h3>}
                        <h4 className="font-weight-normal mb-0 display-4">Need this product?</h4>
                        <p>We will try and source it for you</p>
                        <h6 className="text-secondary small"> Select quantity for this product </h6>

                        <div className="w-75-form">
                            <div class={`form-group has-float-label ${validate.isNotEmpty(errorMsg)  && 'form-group-error'}`}>
                                <input type="text" name="Quantity" id="Quantity" maxLength={2} placeholder="  " autoComplete="off" className={errorMsg?"form-control is-invalid custom-btn-lg":"form-control custom-btn-lg"} value={requestedQty} onChange={handleChange}/>
                                <label htmlFor="Quantity" className="mb-0">Quantity in Packs 1-99</label>
                                {validate.isNotEmpty(errorMsg) && <div class="invalid-feedback">{errorMsg}</div>}
                            </div>
                            <button type="submit" class="btn btn-brand-gradient btn-block rounded-pill custom-btn-lg" onClick={() => { notifyProduct(props.product.productId, requestedQty) }} disabled = {isNotifingProduct} >
                                { isNotifingProduct &&
                                    <React.Fragment>
                                        <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                                        <span className="sr-only"></span>
                                    </React.Fragment> 
                                }
                                { !isNotifingProduct && "Submit" }
                            </button>
                        </div>
                       
                    </ModalBody></div>}
                    {validate.isNotEmpty(successMsg) && <ModalBody>
                        <div className="d-flex justify-content-between mb-3">
                            <h4 className="text-success display-3">Thank You!</h4>
                            {/* <button type="button" onClick={() => props.setShowGetNotifiedModal(false)} className="close icons clear-icn position-relative" aria-label="Close" /> */}
                        </div>
                        <div className="mb-4">
                            <h4 className="font-weight-lighter">We will reply back to your Email Id / Mobile on stock availability</h4>
                        </div>
                        {/* <hr/> */}
                        <button className="float-right btn brand-secondary px-4 rounded-pill custom-btn-lg" onClick={() => props.setShowGetNotifiedModal(false)}>Close</button>
                    </ModalBody>}
                </Modal>
            }
        </React.Fragment>
    )
}

export default GetNotifiedPopup;