import UserInfoAction from '../../../../redux/action/UserInfoAction';
import { UncontrolledButtonDropdown ,DropdownItem,DropdownToggle,DropdownMenu} from 'reactstrap';
import React, { useState, useEffect } from 'react';
import Validate from '../../../helpers/Validate';
import MyAccountService  from  '../../../services/MyAccountService';
import Alert from '../../Common/Alert';

import axios from 'axios';






const CustomerFeedBack = (props)=>{

    const validate =  Validate();
    const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
    const myAccountService =   MyAccountService();
    const userInfoAction = UserInfoAction();
    const userContactDetails = userInfoAction.getUserContactDetails();
    const [isProceedLoading, setProceedLoading] = useState(false);

    const [description,setDescription] = useState("");
    const [reason,setSelectedReason] = useState("Select Reason");
    const [subReason,setSelectedSubReason] = useState("Select a Sub Reason");
    const [errorMsg, setErrorMsg] = useState({});

    const reasons = {"Select Reason":[],
                    "Placing an Order":["Product Information","Product Availability","Issue Related To Checkout","Returns","Other Order Placing Issues"],
                    "Delivery":["Delay in Delivery","Shipment Information","Packing Feedback","Curior Feedback","Other Delivery Related Issues"],
                    "Problem with my order":["Damaged Items","Expired Items","Items / Parts Missing From Order","Wrong Items Or Not As Expected","Other Order Related Issues"],
                    "Payments":["COD Not Available","Payment Declined","Discounts Issue","Wrong Price","Other Payment Related Issues"],
                    "Store":[],
                    "Customer Care":[],
                    "Suggestions":[],
                    "Others":[]
                    };
    const changeReason = (index)=>{
        setSelectedSubReason("Select a Sub Reason");
        let reason = Object.keys(reasons)[index];
        setSelectedReason(reason);
    }
    const changeSubReason = (subReason) =>{
        setSelectedSubReason(subReason);
        setErrorMsg({...errorMsg,["subReason"]: ''});
    }
    const handleInputChange = event => {
        let feildName = event.target.name;
        let fieldValue = event.target.value;
        if (validate.isEmpty(fieldValue)){
            setErrorMsg(errorMsg => ({...errorMsg, [feildName]:"Description Is Required"}));
        } else {
            setErrorMsg({...errorMsg,[feildName]: ''});
        }
        setDescription(fieldValue);
    }
    const submitCustomerFeedBack = ()=>{
        if(validate.isEmpty(subReason) || subReason == "Select a Sub Reason"){
            setErrorMsg(errorMsg => ({...errorMsg, ["subReason"]:"Sub Reason Is Required"}));
            return;
        } else if(validate.isEmpty(description)) {
            setErrorMsg(errorMsg => ({...errorMsg, ["description"]:"Description Is Required"}));
            return;
        }
        setProceedLoading(true);
        let customerComplaint = {
            "orderId" :props.displayOrderId,
            "description":description,
            "category":reason,
            "subCategory":subReason
        };
        
        /* console.log("customer data :",customerComplaint);
        let headers = {'Content-Type': 'application/json','dataType':'json'};
        axios.post('http://192.168.42.163:81/saveCustomerFeedBack.mart',JSON.stringify(customerComplaint),headers)
        .then(res => {
            console.log(res.data)
        }).catch(function(error) {
                console.log(error);
        });
        */
        myAccountService.saveCustomerFeedBack(customerComplaint).then(response => {
            setProceedLoading(false);
            if (validate.isNotEmpty(response) && validate.isNotEmpty(response.statusCode) && "SUCCESS" == response.statusCode) {
                setAlertInfo({message:response.message, type: ""});
                props.setActiveTab("TrackOrder");
			} else if("FAILURE" == response.statusCode){
                setAlertInfo({message:response.message, type: ""});          
             }
        }).catch(function(error) {
            setProceedLoading(false);
            console.log(error);
        }); 

    }
    useEffect(() => {
       if(validate.isNotEmpty(props.displayOrderId)){
            setSelectedReason("Problem with my order");
       }
     }, []);

    return (
        <React.Fragment>
        <Alert alertInfo={alertInfo} duration={5000} onDurationEnd={setAlertInfo}/>
        <div className="tab-pane pills-report-issue fade show active" id="pills-report-issue" role="tabpanel" aria-labelledby="pills-report-issue-tab">
            <div className="row mx-0">
                <div className="col-6">
                    <strong>Report an Issue</strong>
                    <div className="d-flex mt-2">
                        {validate.isNotEmpty(props.displayOrderId) && 
                        <span>Order Id: {props.displayOrderId}</span>}
                        <span className="mandatory-text">Note: All fields are mandatory</span>
                    </div>
                    <div className="d-flex with-dropdown">
                    {validate.isNotEmpty(props.displayOrderId) && 
                        <span>Reason:<span>Problem With My Order</span></span>}
                    {validate.isEmpty(props.displayOrderId) && 
                        <UncontrolledButtonDropdown>
                            <DropdownToggle caret className="btn btn-block" color="white">
                                {reason}
                            </DropdownToggle>
                            <DropdownMenu>
                                <span className="caret"></span>
                                {Object.keys(reasons).map((reason,index) =>{
                                return (
                                    <DropdownItem key={index} onClick={()=> changeReason(index)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16.621 16">
                                            <g transform="translate(-12 -13)">
                                                <rect width="16" height="16" transform="translate(12 13)" fill="none"></rect>
                                                <path d="M18,9,9.75,17.25,6,13.5" transform="translate(8.5 7.5)" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"></path>
                                            </g>
                                        </svg>
                                        {reason}
                                    </DropdownItem>
                                )})}
                            </DropdownMenu>
                        </UncontrolledButtonDropdown>}
                        {validate.isNotEmpty(reasons[reason]) && 
                        <UncontrolledButtonDropdown>
                            <DropdownToggle caret className="btn btn-block" color="white">
                                {subReason}
                            </DropdownToggle>
                            <DropdownMenu>
                                <span className="caret"></span>
                                <DropdownItem onClick={()=> changeSubReason("Select a Sub Reason")}>Select a Sub Reason</DropdownItem>
                                {reasons[reason].map((subReason,index) =>{
                                return (
                                    <DropdownItem key={index} onClick={()=> changeSubReason(subReason)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16.621 16">
                                            <g transform="translate(-12 -13)">
                                                <rect width="16" height="16" transform="translate(12 13)" fill="none"></rect>
                                                <path d="M18,9,9.75,17.25,6,13.5" transform="translate(8.5 7.5)" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"></path>
                                            </g>
                                        </svg>
                                        {subReason}
                                    </DropdownItem>
                                )})}
                            </DropdownMenu>
                        </UncontrolledButtonDropdown>}
                        <div className="invalid-feedback d-block">
                            {errorMsg['subReason']}
                        </div>
                    </div>
                    <div className="d-flex">
                        <div className="form-group filled-form">
                            <input type="text" className="disabled form-control" id="phone-num" name="Mobile Number" maxLength="40" required autoComplete="off" defaultValue={"+91 "+ valide.isNotEmpty(userContactDetails.shippingContactNumber)?userContactDetails.shippingContactNumber:""} maxLength="10" minLength="10"/>
                            <label className="select-label">Mobile Number</label>
                        </div>
                        <div className="form-group filled-form" title={userContactDetails.emailAddress}>
                            <input type="text" className="disabled form-control text-truncate" id="user-mail" name="User mail" maxLength="40" required="" autoComplete="off" defaultValue={userContactDetails.emailAddress} />
                            <label className="select-label">Email Id</label>
                        </div>
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="issue-order-description" className="sr-only">Issue Order Description</label>
                        <textarea className="form-control" id="Description" name="description" rows="4" placeholder="Enter Description" onChange={handleInputChange} required maxLength="500"></textarea>
                        <small>{description.length}/500</small>
                        <div className="invalid-feedback d-block">
                            {errorMsg['description']}
                        </div>
                    </div>
                    <button type="button" className="brand-secondary btn px-5 rounded-pill" onClick={()=>props.setActiveTab("TrackOrder")} disabled={isProceedLoading}>Cancel</button>
                    <button type="button" className="btn btn-brand-gradient rounded-pill ml-3 px-5" onClick={()=>submitCustomerFeedBack()}>
                    {isProceedLoading ? "" :"Submit"}
                    {isProceedLoading &&
                        <React.Fragment>
                            <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                            <span className="sr-only"></span>
                        </React.Fragment>
                    }
                    </button>
                </div>
                <div className="col"></div>
            </div>
        </div>
        </React.Fragment>
    );
}
export default CustomerFeedBack;
