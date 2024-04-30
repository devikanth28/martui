import React, { useEffect, useState } from "react"
import amount from '../../../../images/common/amount.svg';
import Validate from "../../../../helpers/Validate";
import SubscriptionService from "../../services/SubscriptionService";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../../../Common/Alert";
import { Collapse } from "reactstrap";
import { MEDPLUS_ADVANTAGE_URL_PREFIX } from "../../constants/SubscriptionConstants";
import { SET_PLAN } from "../../redux/SubscriptionReducer";

const SubscriptionTransactionHistory=(props)=>{
    const validate  = Validate();
    const subscriptionService  = SubscriptionService();
    const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
    const [payments, setPayments] = useState(undefined);
    const [noPayments, setNoPayments] = useState(undefined);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedPayment , setSelectedPayment] = useState({});
    const dispatch = useDispatch();
    const subscriptionId = useSelector(state=>{
        if(validate.isNotEmpty(state.subscription) && validate.isNotEmpty(state.subscription.subscriptionId)){
            return state.subscription.subscriptionId;
        }
    });


    useEffect(() => {
        if(validate.isEmpty(subscriptionId)){
            setNoPayments(true);
        }else {
           getPayments();
        }
     },[]);
 
     const getPayments = () => {
         subscriptionService.getPaymentListDetails().then(data => {
             if (data.statusCode === "SUCCESS") {
                 if(validate.isNotEmpty(data['dataObject'])){
                    setPayments(data.dataObject);
                }else {
                    setNoPayments(true);
                 }                
             }else if(data.statusCode === "FAILURE" && data.message=== "NO_PAYMENTS_AVAILABLE" ){
                setNoPayments(true);
             }
             else {
                setAlertInfo({ message:validate.isEmpty(data.message) ? "Something went wrong, Plese Try again.": data.message , type: 'danger' })
             }
         }).catch((error)=>{
            setAlertInfo({ message:"Something went wrong, Plese Try again.", type: 'danger' });
         })
     }

     const cancelSubscriptionOrder =(orderId)=>{
        setIsLoading(true);
        subscriptionService.cancelSubscriptionOrder({orderIds : JSON.stringify(orderId), reason : "Payment failed"}).then(data=>{
            if (data.statusCode === "SUCCESS") {
                setAlertInfo({ message:"Payment transaction cancelled successfully." , type: 'danger' });
                setTimeout(()=>props.toggleUserTab("") ,2000);
            }else {
                setAlertInfo({ message:validate.isEmpty(data.message) ? "Something went wrong, Please Try again.": data.message , type: 'danger' });
                setIsLoading(false);
            }
        }).catch((error)=>{
            setAlertInfo({ message:"Something went wrong, Please Try again.", type: 'danger' });
            setIsLoading(false);
        })

    }

     const displayDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleString('default', { month: 'short' }) + " " + date.getDate() + ", " + date.getFullYear();
    }

    const closeAlertMessage = () => {
        setAlertInfo({message:"", type:""});
    }

    const displayStatus = (status) => {
        switch(status){
            case "I": return "Pending";
            case "F": return "Failed";
            case "S": return "Success";
            case "C": return "Created";
        }
        
    }
    return(
        <React.Fragment>
            
            <div className="bg-white my-wallet-summary ml-3 w-100">
                <p>
                    <a title="Go Back" href="javascript:void(0)" onClick={()=>props.toggleUserTab("")} class="text-dark font-weight-bold">
                        <svg class="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                            <g transform="translate(-48.941 -316.765)">
                                <rect fill="none" width="24" height="24" transform="translate(48.941 316.765)"></rect>
                                <path fill="#000000" d="M59.108,319.236a.915.915,0,0,0-.6.238l-9.3,8.706a.938.938,0,0,0,0,1.312l9.3,8.586a.945.945,0,0,0,1.312-.119.936.936,0,0,0,0-1.312l-7.394-6.917H71.987a.954.954,0,0,0,0-1.908H52.429l7.513-6.917a.847.847,0,0,0,.358-.715,1.7,1.7,0,0,0-.238-.716A5.386,5.386,0,0,0,59.108,319.236Z" transform="translate(0 -0.471)"></path>
                            </g>
                        </svg>
                        Go Back
                        </a>
                </p>
            {noPayments && <React.Fragment>
                <div className="no-purchase-history body-height w-100">
                                <svg className="mb-3" xmlns="http://www.w3.org/2000/svg" width="85.86" height="92.336" viewBox="0 0 85.86 92.336">
                                    <g transform="translate(-24 -6.5)">
                                        <path fill="#b1b1b1" d="M324.078,214.427a10.083,10.083,0,0,0,10.072-10.072v-5.188a1.11,1.11,0,1,0-2.221,0v5.188a7.852,7.852,0,1,1-15.7,0v-5.188a1.11,1.11,0,1,0-2.221,0v5.188A10.084,10.084,0,0,0,324.078,214.427Z" transform="translate(-236.342 -156.111)"/>
                                        <path fill="#b1b1b1" d="M30.927,89.328c.2,0,.4-.011.592-.027H46.793v2.082a7.45,7.45,0,0,0,7.442,7.442H75.982q.163.012.329.012a1.116,1.116,0,1,0,0-2.232h-.235a2.346,2.346,0,0,1-2.107-2.332V81.733h29.358A6.541,6.541,0,0,0,109.86,75.2a1.117,1.117,0,0,0-.011-.153l-5.063-36.327a.1.1,0,0,0,0-.019,3.8,3.8,0,0,0-3.775-3.229H84.956l-1.35-9.682,0-.019a4.322,4.322,0,0,0-4.291-3.67H75.284V18.3a11.8,11.8,0,0,0-23.591,0v3.8H47.664a4.322,4.322,0,0,0-4.29,3.67l0,.019L41.166,41.61a4.3,4.3,0,0,0-1.02-.116,4.05,4.05,0,0,0-2.5.823,2.006,2.006,0,0,1-2.518,0,4.21,4.21,0,0,0-5,0,2,2,0,0,1-2.517,0,4.048,4.048,0,0,0-2.5-.822A1.11,1.11,0,0,0,24,42.6V82.4a6.935,6.935,0,0,0,6.927,6.927Zm5.1-2.248A6.9,6.9,0,0,0,37.854,82.4v-2.85a4.469,4.469,0,1,1,8.939,0V87.08Zm18.2,9.524a5.227,5.227,0,0,1-5.221-5.221V79.552A6.664,6.664,0,0,0,47.3,75.083H66.527A5.227,5.227,0,0,1,71.748,80.3V94.274a4.535,4.535,0,0,0,.641,2.332Zm48.354-57.568,5.052,36.236a4.318,4.318,0,0,1-4.312,4.24h-29.4a7.457,7.457,0,0,0-5.783-6.471l4.74-34a1.594,1.594,0,0,1,1.581-1.345h26.544a1.593,1.593,0,0,1,1.58,1.345ZM53.914,18.3a9.575,9.575,0,1,1,19.15,0v3.8H53.914Zm-8.345,7.81a2.112,2.112,0,0,1,2.1-1.785h4.029v5.942a1.11,1.11,0,1,0,2.221,0V24.321h19.15v5.942a1.11,1.11,0,1,0,2.221,0V24.321h4.029a2.112,2.112,0,0,1,2.1,1.785l1.305,9.365h-8.25A3.8,3.8,0,0,0,70.689,38.7l0,.019-4.76,34.143H56.294V42.6a1.11,1.11,0,0,0-1.11-1.11,4.05,4.05,0,0,0-2.5.823,2.009,2.009,0,0,1-2.519,0,4.211,4.211,0,0,0-5,0,1.885,1.885,0,0,1-1.258.444,1.843,1.843,0,0,1-.644-.1ZM26.221,44.059l.148.1a4.21,4.21,0,0,0,5,0,2.006,2.006,0,0,1,2.518,0,4.21,4.21,0,0,0,5,0,2.007,2.007,0,0,1,2.518,0,4.21,4.21,0,0,0,5,0,2.008,2.008,0,0,1,2.519,0,4.212,4.212,0,0,0,5,0l.149-.1v28.8H42.323a6.7,6.7,0,0,0-6.69,6.69V82.4a4.706,4.706,0,0,1-9.413,0Z" transform="translate(0 0)"/>
                                        <path fill="#b1b1b1" d="M81.291,266.374a1.11,1.11,0,0,0,1.11,1.11H96.614a1.11,1.11,0,0,0,0-2.221H82.4A1.11,1.11,0,0,0,81.291,266.374Z" transform="translate(-46.69 -210.882)"/>
                                        <path fill="#b1b1b1" d="M53.529,267.485h2.3a1.11,1.11,0,0,0,0-2.221h-2.3a1.11,1.11,0,0,0,0,2.221Z" transform="translate(-23.16 -210.882)"/>
                                        <path fill="#b1b1b1" d="M96.614,298H82.4a1.11,1.11,0,0,0,0,2.221H96.614a1.11,1.11,0,1,0,0-2.221Z" transform="translate(-46.69 -237.56)"/>
                                        <path fill="#b1b1b1" d="M53.529,300.221h2.3a1.11,1.11,0,0,0,0-2.221h-2.3a1.11,1.11,0,0,0,0,2.221Z" transform="translate(-23.16 -237.56)"/>
                                        <path fill="#b1b1b1" d="M96.614,330.733H82.4a1.11,1.11,0,0,0,0,2.221H96.614a1.11,1.11,0,1,0,0-2.22Z" transform="translate(-46.69 -264.236)"/>
                                        <path fill="#b1b1b1" d="M53.529,332.954h2.3a1.11,1.11,0,1,0,0-2.22h-2.3a1.11,1.11,0,0,0,0,2.221Z" transform="translate(-23.16 -264.236)"/>
                                        <path fill="#b1b1b1" d="M53.529,234.751H63.7a1.11,1.11,0,1,0,0-2.221H53.529a1.11,1.11,0,1,0,0,2.221Z" transform="translate(-23.16 -184.205)"/>
                                        <path fill="#b1b1b1" d="M179.133,396.835a1.338,1.338,0,0,1,1.336,1.336,1.11,1.11,0,1,0,2.221,0,3.562,3.562,0,0,0-2.446-3.377v-.414a1.11,1.11,0,1,0-2.221,0v.414a3.555,3.555,0,0,0,1.11,6.934,1.336,1.336,0,1,1,.019,2.672h-.037a1.337,1.337,0,0,1-1.318-1.335,1.11,1.11,0,1,0-2.221,0,3.561,3.561,0,0,0,2.447,3.377v.525a1.11,1.11,0,1,0,2.221,0v-.525a3.555,3.555,0,0,0-1.11-6.933,1.336,1.336,0,1,1,0-2.672Z" transform="translate(-123.528 -315.201)"/>
                                        <path fill="#b1b1b1" d="M234.011,453.726H229.96a1.11,1.11,0,0,0,0,2.221h4.051a1.11,1.11,0,1,0,0-2.221Z" transform="translate(-166.944 -364.47)"/>
                                        <path fill="#b1b1b1" d="M234.011,427.276H229.96a1.11,1.11,0,0,0,0,2.221h4.051a1.11,1.11,0,1,0,0-2.221Z" transform="translate(-166.944 -342.914)"/>
                                        <path fill="#b1b1b1" d="M234.011,400.827H229.96a1.11,1.11,0,0,0,0,2.221h4.051a1.11,1.11,0,0,0,0-2.221Z" transform="translate(-166.944 -321.36)"/>
                                    </g>
                                </svg>
                                <h6 className="mb-3">No Payments history available</h6>
                                 {/* <button className="btn btn-brand ml-2" onClick={() =>window.location.href='/medplusAdvantage'}>Start Ordering</button> */}
             </div>
                </React.Fragment>}
            {!noPayments && validate.isNotEmpty(payments) && payments.map((payment,index) => {
                const paymentDetails=validate.isNotEmpty(payment.healthCarePaymentData)?payment.healthCarePaymentData:validate.isNotEmpty(payment.pharmaPaymentData)?payment.pharmaPaymentData:{}
                const paymentData=[]
                if(validate.isNotEmpty(payment.healthCarePaymentData) && validate.isNotEmpty(payment.pharmaPaymentData)){
                    paymentData[0]=validate.isNotEmpty(payment.pharmaPaymentData) ? payment.pharmaPaymentData : {};
                    paymentData[1]=validate.isNotEmpty(payment.healthCarePaymentData) ? payment.healthCarePaymentData : {};
                }
            return(
                <React.Fragment>
                    {(validate.isNotEmpty(payment.comboPlan) && (validate.isEmpty(payment.healthCarePaymentData) || validate.isEmpty(payment.pharmaPaymentData))) &&
                    <div className="no-products">
                        <div className="div-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="67.779" height="67.781" viewBox="0 0 67.779 67.781">
                            <g id="Search_word_not_found" data-name="Search word not found" transform="translate(599.934 3260.622)">
                                <path id="Union_2" data-name="Union 2" d="M-1086.406-3945.255l-8.864-8.865a1.412,1.412,0,0,1,0-2l.971-.972-2.978-2.979a15.339,15.339,0,0,1-9.8,3.546,15.342,15.342,0,0,1-15.343-15.341,15.342,15.342,0,0,1,15.342-15.343,15.339,15.339,0,0,1,10.85,4.494,15.337,15.337,0,0,1,.949,20.646l2.979,2.98.972-.972a1.413,1.413,0,0,1,1-.414,1.408,1.408,0,0,1,1,.414l8.864,8.86a1.413,1.413,0,0,1,0,2l-3.94,3.941a1.418,1.418,0,0,1-1,.418A1.411,1.411,0,0,1-1086.406-3945.255Zm-5.869-9.863,6.867,6.868,1.943-1.944-6.867-6.868Zm-27.325-16.747a12.516,12.516,0,0,0,12.513,12.521,12.517,12.517,0,0,0,12.522-12.512,12.516,12.516,0,0,0-3.662-8.851,12.432,12.432,0,0,0-8.853-3.673h0A12.518,12.518,0,0,0-1119.6-3971.865Zm-24,1.606a4.237,4.237,0,0,1-4.236-4.237v-33.89a4.237,4.237,0,0,1,4.236-4.237h48.011a4.236,4.236,0,0,1,4.236,4.237v25.417h-2.824v-25.417a1.411,1.411,0,0,0-1.412-1.412H-1143.6a1.412,1.412,0,0,0-1.412,1.412v33.89a1.412,1.412,0,0,0,1.412,1.412h18.357v2.825Zm43.776-1.412a7.069,7.069,0,0,0-7.061-7.06v-2.824a9.9,9.9,0,0,1,9.885,9.884Zm-39.759-7.572a1.326,1.326,0,0,1-1.326-1.327,1.326,1.326,0,0,1,1.326-1.326h12.858a1.327,1.327,0,0,1,1.326,1.326,1.326,1.326,0,0,1-1.326,1.327Zm-.581-7.962a1.327,1.327,0,0,1-1.326-1.327,1.327,1.327,0,0,1,1.326-1.328h18.714a1.327,1.327,0,0,1,1.326,1.328,1.327,1.327,0,0,1-1.326,1.327Zm18.083-7.59a1.327,1.327,0,0,1-1.327-1.327,1.326,1.326,0,0,1,1.327-1.327h21.9a1.326,1.326,0,0,1,1.327,1.327,1.327,1.327,0,0,1-1.327,1.327Zm-18.083,0a1.326,1.326,0,0,1-1.326-1.327,1.325,1.325,0,0,1,1.326-1.326h12.608a1.327,1.327,0,0,1,1.328,1.326,1.328,1.328,0,0,1-1.328,1.327Zm36.083-7.382a1.327,1.327,0,0,1-1.326-1.328,1.326,1.326,0,0,1,1.326-1.327h4.432a1.327,1.327,0,0,1,1.327,1.327,1.328,1.328,0,0,1-1.327,1.328Zm-36.083,0a1.326,1.326,0,0,1-1.326-1.327,1.326,1.326,0,0,1,1.326-1.327h31.951a1.327,1.327,0,0,1,1.327,1.327,1.327,1.327,0,0,1-1.327,1.327Z" transform="translate(547.902 752)" fill="#cecece"/>
                            </g>
                        </svg>
                        <p>
                        There is some technical issue, We are trying to fetch Plan Details. 
                        <br/>
                        Come back little later to see the details.
                        </p>
                        </div>
                    </div>
                    }
                     {validate.isEmpty(payment.comboPlan) &&
                    <section  id={"payments" + index } className={selectedPayment ? "mb-3 rounded border" : "border mb-3" }>
                        <div onClick={() => {setSelectedPayment({...selectedPayment, ["payments" + index] : !selectedPayment["payments" + index]})}} className={payments.length == 1 ? "card-header d-flex justify-content-between bg-white align-items-center" : "card-header d-flex justify-content-between bg-white align-items-center pointer"}>
                        <span>
                        {paymentDetails.planName}
                        {(validate.isNotEmpty(paymentDetails.type) && paymentDetails.type == 'CURRENT') ? validate.isNotEmpty(paymentDetails.endDate) &&  <small className="d-block text-secondary">Expires on {displayDate(paymentDetails.endDate)}</small> : (validate.isNotEmpty(paymentDetails.type) && paymentDetails.type == 'UPCOMING') ? validate.isNotEmpty(paymentDetails.startDate) &&  <small className="d-block text-secondary">Valid from {displayDate(paymentDetails.startDate)}</small> : ""}
                        </span>
                            {(payments.length > 1) && <React.Fragment>
                            { (!selectedPayment["payments" + index]) && <svg xmlns="http://www.w3.org/2000/svg" id="add_black_icon_18px" width="18" height="18" viewBox="0 0 18 18">
                                <g id="Group_15964" data-name="Group 15964">
                                    <rect id="Rectangle_3305" data-name="Rectangle 3305" width="18" height="18" fill="none" />
                                    <path id="Path_22960" data-name="Path 22960" d="M69.226,601.175H61.657v-7.569a.716.716,0,1,0-1.431,0v7.569H52.657a.716.716,0,1,0,0,1.431h7.569v7.569a.716.716,0,0,0,1.431,0v-7.569h7.569a.716.716,0,0,0,0-1.431Z" transform="translate(-51.941 -592.89)" fill="#080808" />
                                </g>
                            </svg>}
                            {(selectedPayment["payments" + index]) && <svg xmlns="http://www.w3.org/2000/svg" id="add_black_icon_18px" width="18" height="18" viewBox="0 0 18 18">
                            <g id="Group_15963" data-name="Group 15963">
                                <rect id="Rectangle_3306" data-name="Rectangle 3306" width="18" height="18" transform="translate(0 0)" fill="none" />
                                <rect id="Rectangle_3307" data-name="Rectangle 3307" width="18" height="1.431" rx="0.636" transform="translate(0 8.285)" fill="#080808" />
                            </g>
                        </svg>}
                        </React.Fragment>}
                        </div>
                        <Collapse isOpen={ payments.length == 1 ? true : selectedPayment["payments" + index]} toggler= {'payments' + index} className="p-3">
                        {validate.isNotEmpty(paymentDetails.paymentList) && paymentDetails.paymentList.map((paymentInfo,index) => { return ( <div className="card collapsable-card" key={index} >
                            <div className="card-body wallet-content font-16">
                                <p>
                                    <img src={amount} alt="Transaction Icon" title="trancation icon" height="44" />
                                    <br />
                                    {validate.isNotEmpty(paymentInfo.createdAt) &&
                                        <span className="text-secondary"> {displayDate(paymentInfo.createdAt)}</span>}
                                </p>
                                {validate.isNotEmpty(paymentInfo.paymentMode) &&
                                    <p>
                                        <span className="text-secondary d-block">Payment Mode</span>
                                        <span className="font-weight-bold">{(paymentInfo.paymentMode === 'OFFLINE' || paymentInfo.paymentMode === 'cod') ? "Offline" : "Online"}</span>
                                    </p>}
                                {validate.isNotEmpty(paymentInfo.transactionId) &&
                                    <p>
                                        <span className="text-secondary d-block">Transaction Number</span>
                                        <span className="font-weight-bold">{paymentInfo.transactionId}</span>
                                    </p>}
                                {validate.isNotEmpty(paymentInfo.txnStatus) &&
                                    <p>
                                        <span className="text-secondary d-block">Status</span>
                                        <span className="font-weight-bold">{displayStatus(paymentInfo.gatewayStatus)}</span>
                                    </p>}
                                {validate.isNotEmpty(paymentInfo.amount) &&
                                    <p>
                                        <span className="text-secondary d-block">Amount</span>
                                        <span className="font-weight-bold">{parseFloat(paymentInfo.amount).toFixed(2)}</span>
                                    </p>}
                                {validate.isNotEmpty(paymentInfo.gatewayStatus) && (paymentInfo.gatewayStatus === 'F' || paymentInfo.gatewayStatus === 'C') && (paymentInfo.orderStatus !== "ORDER_CANCELLED") &&
                                    <p>
                                        {paymentInfo.gatewayStatus === 'F' &&
                                            <button type="button" class="btn btn-outline-secondary mb-2 w-100" disabled={isLoading} onClick={() => cancelSubscriptionOrder([paymentInfo.orderId])}>Cancel</button>
                                        }
                                        <button type="button" className="btn btn-outline-brand d-block" disabled={isLoading} onClick={() => {dispatch({ type: SET_PLAN, data: paymentDetails.id }); props.history.push(`${MEDPLUS_ADVANTAGE_URL_PREFIX}/subscription/payment/` + paymentInfo.orderId)}}>{paymentInfo.gatewayStatus === 'C' ? "Pay Now" : "Retry Payment"}</button>
                                    </p>
                                }
                            </div> 
                        </div> ) })}
                    </Collapse>
                    </section>}

                    {validate.isNotEmpty(payment.comboPlan) && validate.isNotEmpty(payment.healthCarePaymentData) && validate.isNotEmpty(payment.pharmaPaymentData) &&
                     <section  id={"combo-plan" } className={"mb-3 rounded border" }>
                        <div onClick={() => {setSelectedPayment({...selectedPayment, ["payments" + index] : !selectedPayment["payments" + index]})}} className="card-header d-flex justify-content-between bg-white align-items-center">
                            <span>
                                {payment.comboPlan.displayName}
                            </span>
                            {(payments.length > 1) && <React.Fragment>
                            { (!selectedPayment["payments" + index]) && <svg xmlns="http://www.w3.org/2000/svg" id="add_black_icon_18px" width="18" height="18" viewBox="0 0 18 18">
                                <g id="Group_15964" data-name="Group 15964">
                                    <rect id="Rectangle_3305" data-name="Rectangle 3305" width="18" height="18" fill="none" />
                                    <path id="Path_22960" data-name="Path 22960" d="M69.226,601.175H61.657v-7.569a.716.716,0,1,0-1.431,0v7.569H52.657a.716.716,0,1,0,0,1.431h7.569v7.569a.716.716,0,0,0,1.431,0v-7.569h7.569a.716.716,0,0,0,0-1.431Z" transform="translate(-51.941 -592.89)" fill="#080808" />
                                </g>
                            </svg>}
                            {(selectedPayment["payments" + index]) && <svg xmlns="http://www.w3.org/2000/svg" id="add_black_icon_18px" width="18" height="18" viewBox="0 0 18 18">
                            <g id="Group_15963" data-name="Group 15963">
                                <rect id="Rectangle_3306" data-name="Rectangle 3306" width="18" height="18" transform="translate(0 0)" fill="none" />
                                <rect id="Rectangle_3307" data-name="Rectangle 3307" width="18" height="1.431" rx="0.636" transform="translate(0 8.285)" fill="#080808" />
                            </g>
                        </svg>}
                        </React.Fragment>}
                        </div> 
                        { validate.isNotEmpty(paymentData) && paymentData.map((data) =>{ return (         
                        <Collapse isOpen={true} toggler= {'payments' + index} className="p-3">
                            <div className="card collapsable-card" key={index} >
                                    <div className="card-header">
                                        <p>{data.planName}</p>
                                        {(validate.isNotEmpty(data.type) && data.type == 'CURRENT') ? validate.isNotEmpty(data.endDate) &&  <small className="d-block text-secondary">Expires on {displayDate(data.endDate)}</small> : (validate.isNotEmpty(data.type) && data.type == 'UPCOMING') ? validate.isNotEmpty(data.startDate) &&  <small className="d-block text-secondary">Valid from {displayDate(data.startDate)}</small> : ""}
                                    </div>
                                <Collapse isOpen={ payments.length==1 ? true : selectedPayment["payments" + index]} toggler= {'payments' + index} className="p-3">
                                    {validate.isNotEmpty(data.paymentList) && data.paymentList.map((paymentInfo,index) => { return ( 
                                    <div className="card collapsable-card" key={index} >
                                            <div className="card-body wallet-content font-16">
                                                <p>
                                                    <img src={amount} alt="Transaction Icon" title="trancation icon" height="44" />
                                                    <br/>
                                                    {validate.isNotEmpty(paymentInfo.createdAt) &&
                                                    <span className="text-secondary"> {displayDate(paymentInfo.createdAt)}</span>}
                                                </p>
                                                <p>
                                                    <span className="text-secondary d-block">Payment Mode</span>
                                                    <span className="font-weight-bold">{(paymentInfo.paymentMode === 'OFFLINE' || paymentInfo.paymentMode === 'cod') ? "Offline" : "Online"}</span>
                                                </p>
                                                <p>
                                                    <span className="text-secondary d-block">Transaction Number</span>
                                                    <span className="font-weight-bold">{paymentInfo.transactionId}</span>
                                                </p>
                                                <p>
                                                    <span className="text-secondary d-block">Status</span>
                                                    <span className="font-weight-bold">{displayStatus(paymentInfo.gatewayStatus)}</span>
                                                </p>
                                                <p>
                                                    <span className="text-secondary d-block">Amount</span>
                                                    <span className="font-weight-bold">{parseFloat(paymentInfo.amount).toFixed(2)}</span>
                                                </p>
                                                {(paymentData[1].paymentList.length>1 || paymentData[0].paymentList.length>1) && validate.isNotEmpty(paymentInfo.gatewayStatus) && (paymentInfo.gatewayStatus === 'F' || paymentInfo.gatewayStatus === 'C') && (paymentInfo.orderStatus !== "ORDER_CANCELLED") &&
                                                    <p>
                                                        {paymentInfo.gatewayStatus === 'F' &&
                                                            <button type="button" class="btn btn-outline-secondary mb-2 w-100 rounded-pill custom-btn-lg" disabled={isLoading} onClick={() => cancelSubscriptionOrder([paymentInfo.orderId])}>Cancel</button>
                                                        }
                                                        <button type="button" className="btn btn-outline-brand d-block rounded-pill custom-btn-lg" disabled={isLoading} onClick={() => {dispatch({ type: SET_PLAN, data: data.id });props.history.push(`${MEDPLUS_ADVANTAGE_URL_PREFIX}/subscription/payment/` + paymentInfo.orderId)}}>{paymentInfo.gatewayStatus === 'C' ? "Pay Now" : "Retry Payment"}</button>
                                                    </p>
                                                }
                                            </div>
                                    </div>
                                ) })}
                            </Collapse>
                        </div>
                        </Collapse>
                        )})}
                        <div className="p-3">
                        {validate.isNotEmpty(paymentData[0]) && validate.isNotEmpty(paymentData[0].paymentList[0].gatewayStatus) && (paymentData[0].paymentList[0].gatewayStatus === 'F' || paymentData[0].paymentList[0].gatewayStatus === 'C') && (paymentData[0].paymentList[0].orderStatus !== "ORDER_CANCELLED") &&
                       <div className="d-flex justify-content-end">
                            {paymentData[0].paymentList[0].gatewayStatus === 'F' &&
                                <button type="button" class="btn btn-outline-secondary mr-3" disabled={isLoading} onClick={() => cancelSubscriptionOrder(paymentData.map(paymentListData => {return paymentListData.paymentList[0].orderId}))}>Cancel</button>
                            }                            
                            <button type="button" className="btn btn-outline-brand" disabled={isLoading} onClick={() => {dispatch({ type: SET_PLAN, data: payment.comboPlan.id});{props.history.push(`${MEDPLUS_ADVANTAGE_URL_PREFIX}/subscription/payment/` + paymentData[0].paymentList[0].orderId)}}}>{paymentData[0].paymentList[0].gatewayStatus === 'C' ? "Pay Now" : "Retry Payment"}</button>
                            </div>
                    }</div>
                </section>                
                }

                </React.Fragment>
                 )})}
            </div>
            { alertInfo && alertInfo.message && <Alert alertInfo={alertInfo} onDurationEnd={closeAlertMessage} duration = {5000} />}
        </React.Fragment>
    )
}
export default SubscriptionTransactionHistory