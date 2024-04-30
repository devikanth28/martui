import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import LabCheckoutAction from '../../../../../redux/action/LabCheckoutAction';
import { getLabSelectedLocality } from '../../../../../redux/action/LocalityAction';
import Validate from '../../../../helpers/Validate';
import LabCheckoutService from '../../../../services/LabCheckoutService';
import Alert from '../../../Common/Alert';
import { connect } from 'react-redux';

const PhysicalReportModal = (props) => {

    const [checkPhysicalCopy, setCheckPhysicalCopy] = useState(false);
    const [physicalReportModal, setPhysicalReportModal] = useState(false);
    const [reportDeliveryAddress, setReportDeliveryAddress] = useState({});
    const [errorMsg, setErrorMsg] = useState({});
    const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
    const [isEditModel, setEditModel] = useState(false);
    const selectedLocality = getLabSelectedLocality();
    const validate = Validate();
    const labCheckoutAction = LabCheckoutAction();
    const shoppingCart = props.shoppingCart;
    const labCheckoutService = LabCheckoutService();
    const address = props.shoppingCart.address;
    
    useEffect(() => {
        if(shoppingCart.reportDeliveryType == 'H') {
            setCheckPhysicalCopy(true);
        }
        if(validate.isNotEmpty(shoppingCart.address)) {
            setReportDeliveryAddress(shoppingCart.address);
        } else {
            if(validate.isNotEmpty(selectedLocality)) {
                setReportDeliveryAddress({...reportDeliveryAddress, 
                    ["addressLine2"]: selectedLocality.locality.split(selectedLocality.city)[0].replace(/,\s*$/, ""),
                    ["city"]:selectedLocality.city,
                    ["state"]:selectedLocality.state,
                    ["pincode"]:selectedLocality.pincode,
                });
            }
        }
    }, [])

    const needPhysicalReport = () => {
        setCheckPhysicalCopy(!checkPhysicalCopy);
        if(validate.isNotEmpty(shoppingCart)) {
            if(shoppingCart.visitType == 1 ) {
                let param = {
                    reportDeliveryType : !checkPhysicalCopy ? 'H' : 'E',
                    address :!checkPhysicalCopy ? JSON.stringify(reportDeliveryAddress) : null,
                }
                sendDeliveryReportRequest(param);
            } else {
                if(!checkPhysicalCopy && validate.isEmpty(shoppingCart.address)) {
                    setPhysicalReportModal(!physicalReportModal);
                } else {
                    let param = {
                        reportDeliveryType : !checkPhysicalCopy ? 'H' : 'E',
                        address :!checkPhysicalCopy ? JSON.stringify(reportDeliveryAddress) : null,
                    }
                    sendDeliveryReportRequest(param)
                }
            }
        }
    }
    
    const sendDeliveryReportRequest = (param) => {
        if(param.reportDeliveryType == 'H' && shoppingCart.visitType == '2') {
            let addressInfo = JSON.parse(param.address);
            if(validate.isEmpty(addressInfo)) {
                setAlertInfo("Please give address info");
                setPhysicalReportModal(true);
            } else if(validate.isEmpty(addressInfo.firstName) || validate.isNotEmpty(validate.name(addressInfo.firstName, "Name", 30))) {
                setErrorMsg(errorMsg => ({...errorMsg, ["firstName"]:validate.name(addressInfo.firstName, "Name", 30)}));
                setPhysicalReportModal(true);
                return;
            } else if(validate.isEmpty(addressInfo.addressLine1) || validate.isNotEmpty(validate.address(addressInfo.addressLine1, true, "Street", 200))) {
                setErrorMsg(errorMsg => ({...errorMsg, ["addressLine1"]:validate.address(addressInfo.addressLine1, true, "Street", 200)}));
                setPhysicalReportModal(true);
                return;
            } else if(validate.isEmpty(addressInfo.mobileNo) || validate.isNotEmpty(validate.mobileNumber(addressInfo.mobileNo))) {
                setErrorMsg(errorMsg => ({...errorMsg, ["mobileNo"]:validate.mobileNumber(addressInfo.mobileNo)}));
                setPhysicalReportModal(true);
                return;
            }
        }
        labCheckoutService.addReportDeliveryToCart(param).then(response => {
            if(validate.isNotEmpty(response) && response.statusCode === "SUCCESS" && validate.isNotEmpty(response.responseData) && validate.isNotEmpty(response.responseData.shoppingCart)) {
                let updatedShoppingCart = response.responseData.shoppingCart;
                labCheckoutAction.saveLabShoppingCart(updatedShoppingCart);
            } else if(validate.isNotEmpty(response) && response.statusCode === "FAILURE") {
                setAlertInfo(response.message);
            } else {
                setAlertInfo("System experiencing some problem, Please try after some time");
            }
        }).catch(function(error) {
            setAlertInfo({ message: "System experiencing some problem, Please try after some time", type: "" });
        });
    }

    const togglePhysicalReportModal = (closeFrom, isChecked) => {
        setPhysicalReportModal(!physicalReportModal);
        if(isEditModel && closeFrom == 'cancel') {
            setEditModel(false);
            return;
        }
        if(closeFrom == 'cancel'){
            setCheckPhysicalCopy(false);
        } else {
            let param = {
                reportDeliveryType : isChecked ? 'H' : 'E',
                address :isChecked ? JSON.stringify(reportDeliveryAddress) : null,
            }
            sendDeliveryReportRequest(param)
        }
    };

    const openEditModel = () => {
        setEditModel(true);
        setPhysicalReportModal(true);
    }

    const handleInputChange = event => {
        let feildName = event.target.name;
        let feildValue = event.target.value;

        let errMsg = addressValidation(event);
        if (errMsg)  {
            setErrorMsg(errorMsg => ({...errorMsg, [feildName]:errMsg}));
        } else {
            setErrorMsg({...errorMsg,[feildName]: ''});
        }
        setReportDeliveryAddress({...reportDeliveryAddress, [feildName]: feildValue});
    }

    const addressValidation = e => {
        if (e.target.name.indexOf('firstName') > -1) {
            return validate.name(e.target.value, "Name", 30);
        }
        if (e.target.name.indexOf('addressLine1') > -1) {
            return validate.address(e.target.value, true, e.target.id, 200);
        }
        if (e.target.name.indexOf('mobileNo') > -1) {
            return validate.mobileNumber(e.target.value);
        }
    }

    const CloseButton = <button type="button" onClick={() => togglePhysicalReportModal('cancel')} className="close" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <rect fill="none" width="24" height="24"/>
                            <path fill="#b9b9b9" d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm4.853,15.439a.5.5,0,0,1,0,.707l-.707.707a.5.5,0,0,1-.707,0L12,13.414,8.561,16.853a.5.5,0,0,1-.707,0l-.707-.707a.5.5,0,0,1,0-.707L10.586,12,7.147,8.561a.5.5,0,0,1,0-.707l.707-.707a.5.5,0,0,1,.707,0L12,10.586l3.439-3.439a.5.5,0,0,1,.707,0l.707.707a.5.5,0,0,1,0,.707L13.414,12Z"/>
                            </svg>
                        </button>

    return (
        <React.Fragment>
            <Alert alertInfo={alertInfo} onDurationEnd={setAlertInfo} duration='5000'/>
            <section className="cart-summary px-3 py-2">
                <div className="custom-control custom-checkbox font-weight-normal">
                    <input type="checkbox" className="custom-control-input" id="need-physical-copy"  onClick={() => needPhysicalReport()} checked={checkPhysicalCopy} />
                    <label className="custom-control-label pointer small" htmlFor="need-physical-copy">I need a physical copy of my reports delivered to my address (<span className='rupee'>&#x20B9;</span>{props.reportDeliveryCharges}/-)</label>
                </div>
                <Modal isOpen={physicalReportModal} toggle={() => togglePhysicalReportModal('cancel')} className="physical-report-modal my-account-modal change-password-popup modal-lg modal-dialog-centered" backdrop="static" tabIndex="-1" role="dialog" aria-labelledby="lab-physical-copy" aria-hidden="false">
                    <ModalHeader toggle={() => togglePhysicalReportModal('cancel')} close={CloseButton}>Get Physical Report</ModalHeader>
                    <ModalBody>
                        <div className="form-div pb-2">
                            <h6 className="">Please fill your details to get a physical copy of report delivery to your address</h6>
                            <div className="row mx-0 mt-3">
                                <div className="col-6 pl-0">
                                    <div className="form-group has-float-label mb-3">
                                        <input type="text" className={`form-control ${errorMsg['firstName'] ? 'is-invalid' : ''}`} id="firstName" name="firstName" maxLength="30" autoComplete="off" placeholder=" " required="" onBlur={(e) => { e.target.placeholder = " "; handleInputChange(e) }} onChange={handleInputChange} value={reportDeliveryAddress && reportDeliveryAddress.firstName ? reportDeliveryAddress.firstName : ''} onFocus={(e) => e.target.placeholder = ""}/>
                                        <label className="select-label" htmlFor="firstName">Full Name</label>
                                        <div className="invalid-feedback d-block">
                                            {errorMsg['firstName']}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6 px-0">
                                    <div className="form-group has-float-label mb-3">
                                        <input type="text" className={`form-control ${errorMsg['mobileNo'] ? 'is-invalid' : ''}`} id="mobileNo" name="mobileNo" maxLength="10" autoComplete="off" placeholder=" " required="" onBlur={(e) => { e.target.placeholder = " "; handleInputChange(e) }} onChange={handleInputChange} value={reportDeliveryAddress && reportDeliveryAddress.mobileNo ? reportDeliveryAddress.mobileNo : ''} onFocus={(e) => e.target.placeholder = ""}/>
                                        <label className="select-label" htmlFor="mobileNo">Mobile Number</label>
                                        <div className="invalid-feedback d-block">
                                            {errorMsg['mobileNo']}
                                        </div>
                                    </div>
                                </div>    
                                <div className="col-12 px-0">
                                    <div className="form-group has-float-label">
                                        <input type="text" className={`form-control ${errorMsg['addressLine1'] ? 'is-invalid' : ''}`} id="addressLine1" name="addressLine1" maxLength="200" autoComplete="off" placeholder=" " required="" onBlur={(e) => { e.target.placeholder = " "; handleInputChange(e) }} onChange={handleInputChange} value={reportDeliveryAddress && reportDeliveryAddress.addressLine1 ? reportDeliveryAddress.addressLine1 : ''} onFocus={(e) => e.target.placeholder = ""}/>
                                        <label className="select-label" htmlFor="addressLine1">Door Number/Building Name/Street Name</label>
                                        <div className="invalid-feedback d-block">
                                            {errorMsg['addressLine1']}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6 pl-0">
                                    <div className="form-group has-float-label">
                                        <input type="text" className="form-control" defaultValue={reportDeliveryAddress.addressLine2} id="locality" name="locality" maxLength="30" autoComplete="off" placeholder=" " required="" disabled readOnly={true} tabIndex="-1"/>
                                        <label className="select-label" htmlFor="locality">Locality</label>
                                    </div>
                                </div>    
                                <div className="col-6 px-0">
                                    <div className="form-group has-float-label">
                                        <input type="text" className="form-control" defaultValue={reportDeliveryAddress.city} id="city" name="city" maxLength="30" autoComplete="off" placeholder=" " required="" disabled readOnly={true} tabIndex="-1"/>
                                        <label className="select-label" htmlFor="city">City</label>
                                    </div>
                                </div>    
                                <div className="col-6 pl-0">
                                    <div className="form-group has-float-label mb-0">
                                        <input type="text" className="form-control" id="state" name="state" maxLength="30" autoComplete="off" placeholder=" " required="" defaultValue={reportDeliveryAddress.state} disabled readOnly={true} tabIndex="-1"/>
                                        <label className="select-label" htmlFor="state">State</label>
                                    </div>
                                </div>    
                                <div className="col-6 px-0">
                                    <div className="form-group has-float-label mb-0">
                                        <input type="text" className="form-control" id="pin-code" name="pin-code" maxLength="30" autoComplete="off" placeholder=" " disabled required="" defaultValue={reportDeliveryAddress.pincode} readOnly={true} tabIndex="-1"/>
                                        <label className="select-label" htmlFor="pin-code">PIN Code</label>
                                    </div>
                                </div>    
                            </div>
                        </div>
                        <div className="text-center mt-4">
                            <button type="button" className="brand-secondary btn px-5 rounded-pill" onClick={() => togglePhysicalReportModal('cancel')}>Cancel</button>
                            <button type="button" className="btn btn-brand-gradient rounded-pill px-5 ml-3 " onClick={() => togglePhysicalReportModal('save', checkPhysicalCopy)} >
                                Save &amp; Proceed
                            </button>
                        </div>
                    </ModalBody>
                </Modal>
                {address && props.shoppingCart.reportDeliveryType == 'H' && props.shoppingCart.visitType == '2' && <React.Fragment>
                    <hr class="my-3"/>
                    <h6 className="heading clearfix mb-3">Report Delivery Address
                        <a href="javascript:void(0)" title="Edit" className="btn btn-link text-primary btn-sm mt-n2" onClick={openEditModel}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 18 18" className="align-top mr-2">
                                <g transform="translate(-180.257 -249.084)">
                                    <rect fill="none" width="18" height="18" transform="translate(180.257 249.084)"/>
                                    <g transform="translate(180.258 249.086)">
                                        <path fill="#080808" d="M2.765,18A2.77,2.77,0,0,1,0,15.234V4.341A2.77,2.77,0,0,1,2.765,1.574H6.274a.6.6,0,0,1,0,1.208H2.763A1.566,1.566,0,0,0,1.208,4.346V15.234A1.568,1.568,0,0,0,2.759,16.8H13.648a1.567,1.567,0,0,0,1.564-1.563V11.725a.6.6,0,0,1,1.207,0v3.509A2.769,2.769,0,0,1,13.652,18ZM5.9,12.825a1.043,1.043,0,0,1-.727-1.281l.7-2.466a.605.605,0,0,1,.149-.269L14.177.649a2.265,2.265,0,0,1,3.172,0,2.261,2.261,0,0,1,0,3.174L9.215,11.98a.612.612,0,0,1-.278.152l-2.445.688-.313.042A1.067,1.067,0,0,1,5.9,12.825ZM7,9.528l-.6,2.041,2.022-.549.022-.007,6.9-6.922.063-.064L13.944,2.563Zm8.083-8.069-.269.242,1.452,1.454.215-.173.009-.008a1.035,1.035,0,0,0-1.407-1.514Z" transform="translate(-0.001 -0.001)"/>
                                    </g>
                                </g>
                            </svg>
                            Edit
                        </a>
                    </h6>
                    <address className="body no-select p-0 mb-3">
                        <p>{address.firstName}</p>
                        <p className="d-flex font-weight-normal">{address.addressLine1}{address.addressLine2 && ', '+address.addressLine2}{address.city && ', '+address.city}{address.state && ', '+address.state}{address.pincode && ', '+address.pincode}</p>
                        <p className="d-block mt-3">
                            <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                <g transform="translate(-180.438 -213.832)">
                                    <rect width="24" height="24" transform="translate(180.438 213.832)" fill="none"></rect>
                                    <g transform="translate(182.199 215.78)">
                                    <g transform="translate(0 1.429)">
                                        <path d="M185.394,217.171a2.043,2.043,0,0,0-.705.124,3.87,3.87,0,0,0-.728.361l-.369.26a3.029,3.029,0,0,0-.264.236,3.822,3.822,0,0,0-.979,1.742c-.771,2.889,1.118,7.237,4.7,10.82,3,3,6.621,4.87,9.442,4.87a5.349,5.349,0,0,0,1.377-.171,3.8,3.8,0,0,0,1.738-.975,2.837,2.837,0,0,0,.265-.3l.262-.374a3.9,3.9,0,0,0,.334-.689,2.167,2.167,0,0,0-.821-2.518l-2.625-1.833a2.261,2.261,0,0,0-3.063.546l-.509.731-.126-.089a24.713,24.713,0,0,1-5.47-5.468l-.089-.127.732-.51a2.2,2.2,0,0,0,.545-3.063l-1.832-2.624A2.229,2.229,0,0,0,185.394,217.171Zm11.1,17.253c-2.524,0-5.828-1.735-8.623-4.53-3.246-3.247-5.057-7.237-4.4-9.7a2.668,2.668,0,0,1,.678-1.22,1.807,1.807,0,0,1,.135-.126l.318-.225a2.535,2.535,0,0,1,.493-.24,1.03,1.03,0,0,1,1.162.4l1.831,2.622a1.042,1.042,0,0,1-.257,1.449l-1.193.833a.576.576,0,0,0-.16.783,24.809,24.809,0,0,0,6.813,6.815.585.585,0,0,0,.785-.16l.833-1.195a1.071,1.071,0,0,1,1.447-.257l2.624,1.833a1.006,1.006,0,0,1,.4,1.163l-.007.017a2.439,2.439,0,0,1-.206.435l-.223.321a1.537,1.537,0,0,1-.156.173,2.649,2.649,0,0,1-1.219.677A4.167,4.167,0,0,1,196.492,234.424Z" transform="translate(-182.178 -217.171)" fill="#343a40"></path>
                                    </g>
                                    <g transform="translate(9.963)">
                                        <path d="M192.615,215.757a.58.58,0,0,0-.034,1.158,9.141,9.141,0,0,1,8.548,8.546.589.589,0,0,0,.621.543.579.579,0,0,0,.537-.615,10.284,10.284,0,0,0-3-6.636h0a10.28,10.28,0,0,0-6.634-3Z" transform="translate(-192.036 -215.757)" fill="#343a40"></path>
                                    </g>
                                    <g transform="translate(8.736 3.129)">
                                        <path d="M191.427,218.853a.611.611,0,0,0-.6.544.58.58,0,0,0,.145.419.572.572,0,0,0,.4.2h0a6.708,6.708,0,0,1,6.274,6.275.589.589,0,0,0,.621.541h0a.578.578,0,0,0,.536-.613,7.869,7.869,0,0,0-7.362-7.36Z" transform="translate(-190.822 -218.853)" fill="#343a40"></path>
                                    </g>
                                    </g>
                                </g>
                            </svg>
                            <a className="text-primary" href={"tel:"+address.mobileNo} title="Click to Call">{address.mobileNo}</a>
                        </p>
                    </address>
                </React.Fragment>}
            </section>

        </React.Fragment>
    )
}
function mapStateToProps(state){
    return {
        shoppingCart: state.labCheckout.labShoppingCart,
    }
 }
export default connect(mapStateToProps)(PhysicalReportModal);