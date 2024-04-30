import React, { useEffect, useState } from "react"
import LabCheckOutService from "../../../Services/LabCheckoutService";
import Validate from "../../../../../helpers/Validate";
import { Modal, ModalBody,ModalHeader } from "reactstrap";
import PatientAddress from "../../../../Labs/Common/PatientAddress";
import PhysicalReport from "./PhysicalReport";
import ReportDeliveryGhostImage from "./ReportDeliveryGhostImage";
import { getSelectedLocality } from "../../../../../../redux/action/LocalityAction";
import UserInfoAction from "../../../../../../redux/action/UserInfoAction";
import Alert from "../../../../Common/Alert";
import { DIAGNOSTICS_URL_PREFIX } from "../../../constants/LabConstants";
const ReportAddress = (props) => {
    const labCheckoutService = LabCheckOutService();
    const selectedLocality = getSelectedLocality();
    const userInfoAction = UserInfoAction();
    var userContactDetails = userInfoAction.getUserContactDetails();
    var userInfo = userInfoAction.getUserInfo();

    const validate = Validate();
    const [homeAddress,setHomeAddress] = useState([]);
    const [showExistingAddress, setShowExistingAddress] = useState(false);
    const [openGetPhysicalReportModal, setOpenGetPhysicalReportModal] = useState(props.openpop);
    const [seletedAddress,setSelectedAddress] = useState();
    const [selectedIndex,setSelectedIndex] = useState([]);
    const [initialLoader, setInitialLoader] = useState(false);
    const [errorMsg, setErrorMsg] = useState({});
    const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
    const [address,setAddress] = useState({

  firstName: userInfo.firstName,
  lastName: userInfo.lastName,
  addressLine1: userInfo.addressLine,
  addressLine2: selectedLocality.locationName,
  city: selectedLocality.city,
  state: selectedLocality.state,
  pincode: selectedLocality.pincode,
  mobileNo: userContactDetails.shippingContactNumber,
  latitudeLongitude: null,
  isCommunityDropOff: null,
  locationConfigId: null,
  displaybleName: userInfo.displaybleName
    });

    useEffect(()=>{
        if(props.isEditReportModel){
            setShowExistingAddress(false);
            setEditAddressInfo();
        }else{
            getCustomerAddresses();
        }
    },[]);

    const setEditAddressInfo = ()=>{
        let reportAddress = props.reportDeliveryData.address;
        let updateAddress = {...address};
            updateAddress.firstName=reportAddress.firstName;
            updateAddress.lastName=reportAddress.lastName;
            updateAddress.addressLine1=reportAddress.addressLine1;
            updateAddress.addressLine2=reportAddress.addressLine2;
            updateAddress.city=reportAddress.city;
            updateAddress.state=reportAddress.state;
            updateAddress.pincode=reportAddress.pincode;
            updateAddress.mobileNo=reportAddress.mobileNo;
            updateAddress.displaybleName=reportAddress.firstName+" "+(validate.isNotEmpty(reportAddress.lastName)?reportAddress.lastName:'');
            setAddress(updateAddress);
    }

   const getCustomerAddresses = ()=>{
       setInitialLoader(true);
        labCheckoutService.getCustomerAddresses({}).then(data => {
            if(validate.isNotEmpty(data) && validate.isNotEmpty(data.statusCode)){
                if(data.statusCode == "SUCCESS"){
                    if(data.message === "No Address Found"){
                        setShowExistingAddress(false);
                    }else {
                        setHomeAddress(data.responseData.labAddressesList);
                        setShowExistingAddress(true);
                        let sampleCollectionInfo = data.responseData.sampleCollectionInfo;
                        if(validate.isNotEmpty(sampleCollectionInfo) && validate.isNotEmpty(sampleCollectionInfo.homeCollectionAddress)){
                            let addressFromShoppingCart = sampleCollectionInfo.homeCollectionAddress;
                            data.responseData.labAddressesList.map((eachAddress, index) => {
                                if(validate.isNotEmpty(eachAddress) && addressFromShoppingCart.firstName === eachAddress.firstName && addressFromShoppingCart.lastName === eachAddress.lastName && addressFromShoppingCart.addressLine1 === eachAddress.addressLine1 && addressFromShoppingCart.addressLine2 === eachAddress.addressLine2) {
                                    setSelectedAddress(eachAddress)
                                    setSelectedIndex(index);
                                }
                            });
                        }
                    }
                }else{
                    setAlertData({message:"Something went wrong",type:'danger'});
                    setTimeout(() => props.history.push(`${DIAGNOSTICS_URL_PREFIX}/lab-shopping-cart`), 200);
                }
                setInitialLoader(false);
            }
        }).catch(function(error){
            console.error(error);
            setInitialLoader(false);
            setAlertData({message:"Something went wrong",type:'danger'});
            setTimeout(() => props.history.push(`${DIAGNOSTICS_URL_PREFIX}/lab-shopping-cart`), 200);
        });    
    }

    const showEditAddressModel=()=>{
        setShowExistingAddress(false);
    }

    function onReportDeliveryCancel(){
       props.onReportDeliveryCancel();

    }

    function setName(){
        let index = address.displaybleName.lastIndexOf(' ');
        if(index == -1){   
            let updateAddress = {...address};
            updateAddress.firstName = address.displaybleName;
            updateAddress.lastName = null;
            return updateAddress;
        }else{
            let updateAddress = {...address};
            updateAddress.firstName = address.displaybleName.substring(0,index);
            updateAddress.lastName=address.displaybleName.substring(index+1);
            return updateAddress;
        }      
    }

    function saveAndContinue(){
        if(showExistingAddress && seletedAddress == undefined){
            setAlertInfo({message:"Please Select Address to Continue",type:'danger'});
            return;
        }else if(!showExistingAddress){
            if(validate.isEmpty(address)) {
                setAlertInfo({message:"Please give address info",type:'danger'});
                return;
            } else if(validate.isEmpty(address.displaybleName) || validate.isNotEmpty(validate.name(address.displaybleName, "Name", 30))) {
                setErrorMsg(errorMsg => ({...errorMsg, ["displaybleName"]:validate.name(address.displaybleName, "Name", 30)}));
                setAlertInfo({message:"Please give FullName",type:'danger'});
                return;
            } else if(validate.isEmpty(address.mobileNo) || validate.isNotEmpty(validate.mobileNumber(address.mobileNo))) {
                setErrorMsg(errorMsg => ({...errorMsg, ["mobileNo"]:validate.mobileNumber(address.mobileNo)}));
                setAlertInfo({message:"Please give Mobile Number",type:'danger'});
                return;
            } else if(validate.isEmpty(address.addressLine1) || validate.isNotEmpty(validate.address(address.addressLine1))) {
                setErrorMsg(errorMsg => ({...errorMsg, ["addressLine1"]:validate.address(address.addressLine1)}));
                setAlertInfo({message:"Please give Address",type:'danger'});
                return;
            }
        }
       setOpenGetPhysicalReportModal(false);
       props.addReportDeliveryInfo("H",showExistingAddress ? seletedAddress : setName());  
    }

    const onSelect = (address, key) =>{
        setSelectedIndex(key);
        setSelectedAddress(address);
    }

    return (
        <React.Fragment>
        <Alert alertInfo={alertInfo} onDurationEnd={setAlertInfo} duration='5000'/>
        <Modal backdrop="static" keyboard={false} isOpen={openGetPhysicalReportModal} className="modal-dialog my-account-modal modal-dialog-centered hide-close" tabIndex="-1" autoFocus={false}>
            {initialLoader && <ReportDeliveryGhostImage isReportDeliveryLoading={true}></ReportDeliveryGhostImage>}
               {!initialLoader  && <div>
                <ModalHeader className="labs-patient-header">
                    Get Physical Report
                    {!props.isEditReportModel && showExistingAddress &&<button type="button" role="button" className="btn btn-outline-success btn-sm float-right" onClick={()=>showEditAddressModel()}>Add New Address</button>}
                    {!props.isEditReportModel && validate.isNotEmpty(homeAddress) && !showExistingAddress &&<button type="button" role="button" className="btn btn-outline-success btn-sm float-right" onClick={() => setShowExistingAddress(true)}>Existing Address</button>}
                </ModalHeader>
                {!props.isEditReportModel && !initialLoader && showExistingAddress &&
                <ModalBody className="p-3">
                        <div className="scroll-content">
                        {homeAddress && homeAddress.map((each,key)=>{
                        return(
                        <div className="border rounded mb-3 p-2">
                            <div className="custom-control custom-radio font-weight-normal" onClick={() => onSelect(each, key)}>
                                <input type="radio" className="custom-control-input" name="physical-report-address"  id={"address"+key}/>
                                <label for={"address"+key} className="custom-control-label pointer w-100">
                                    <div>
                                        <p className="font-weight-bold mb-1"> {validate.isNotEmpty(each.firstName) && each.firstName } {validate.isNotEmpty(each.lastName) && each.lastName }</p>
                                        <p className="mb-0">{each.addressLine1},
                                                            {each.addressLine2},
                                                            {each.city},
                                                            {each.state},
                                                            {each.pincode}
                                        </p>
                                    </div>
                                </label>
                                <p className="d-block mt-2 mb-0 font-14">
                                    <a className="no-underline text-primary" role="link" href="tel:04067006700" title="Click to Call">
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
                                        <a aria-label="click to Call" role="link" class="text-primary" href={`tel:${each.mobileNo}`} title="Click to Call">{each.mobileNo}</a>
                                    </a>
                                </p>
                            </div>
                        </div>)})}
                        </div>
                        <div className="text-center mt-3">
                             <button type="button" role="button" className="brand-secondary btn px-5 rounded-pill" onClick={() => onReportDeliveryCancel()}>Cancel</button>
                            <button type="button" role="button" className="btn btn-brand-gradient ml-3 px-5 rounded-pill" onClick={() => saveAndContinue()}>
                                {initialLoader ? 
                                <React.Fragment>
                                    <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                                    <span className="sr-only"></span>
                                </React.Fragment>
                                : <React.Fragment>Save & Continue</React.Fragment>
                            }
                            </button>
                        </div>
                </ModalBody>}
                {!initialLoader && (!showExistingAddress || props.isEditReportModel) &&
                <ModalBody>
                        <PhysicalReport updateprop={(obj)=>setShowExistingAddress(obj)} addressInfo={address}/>
                        <div className="text-center mt-3">
                             <button type="button" role="button" className="brand-secondary btn px-5 rounded-pill" onClick={() => onReportDeliveryCancel()}>Cancel</button>
                            <button type="button" role="button" className="btn btn-brand-gradient ml-3 px-5 rounded-pill" onClick={() => saveAndContinue()}>
                                {initialLoader ? 
                                <React.Fragment>
                                    <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                                    <span className="sr-only"></span>
                                </React.Fragment>
                                : <React.Fragment>Save & Continue</React.Fragment>
                            }
                            </button>
                        </div>                    
                </ModalBody>}
                </div>}
            </Modal>
        </React.Fragment>

    )
}

export default ReportAddress