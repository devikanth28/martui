import React, { useEffect, useState } from "react"
import amount from '../../../images/common/amount.svg';
import Validate from "../../../helpers/Validate";
import Alert from "../../Common/Alert";
const DoctorConsultationTransactionHistory=(props)=>{
    const validate  = Validate();
    const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
    const [payments, setPayments] = useState(undefined);
    const [refund, setRefund] = useState(undefined);
    const [noPayments, setNoPayments] = useState(undefined);
    const paymentDetails = props.consultation.paymentDetails;
    const refundDetails = props.consultation.refundDetails;
    const displayOrderId = props.consultation.displayOrderId;

    useEffect(() => {
        validate.scrollToTop();
        if(validate.isEmpty(paymentDetails) && validate.isEmpty(refundDetails)){
            setNoPayments(true);
        }else{
            if(validate.isNotEmpty(paymentDetails)){
                setPayments(paymentDetails);
                if(validate.isNotEmpty(refundDetails)){
                    setRefund(refundDetails);
                }
            }
        }
     },[]);
 

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
            default : "-";
        }
        
    }
    const redirectToDoctorsTab = () => {
        props.setUpcomingConsultationIdFromCache(null);
        props.setOrderId(displayOrderId);
        props.showPayments(false);
    }

    if(noPayments){
        return <React.Fragment>
            <div className="no-purchase-history body-height w-80">
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
        </React.Fragment>
    }

    const getRefundTransactionNumber= (payment)=>{
        if(validate.isEmpty(payment.labOrderPaymentDetail)){
            return "NA";
        }
        const labOrderPaymentDetail = payment.labOrderPaymentDetail[0];
        return labOrderPaymentDetail.txnNumber;
    }

    const refundDisplayStatus = (refundInfo)=>{
        if(validate.isEmpty(refundInfo.labOrderPaymentDetail)){
            return "Refund Initiated";
        }
        const labOrderPaymentDetail = refundInfo.labOrderPaymentDetail[0];
        return refundStatus(labOrderPaymentDetail.status);
    }

    const refundStatus=(status)=>{
        switch(status){
            case "REFUND_DONE" : return "Refunded";
            default : return "Refund Initiated";
        }

    }

    return(
        <React.Fragment>
            <div className="bg-white my-wallet-summary w-100 p-3">
                <p>
                    <a title="Go Back" href="javascript:void(0)" onClick={() => redirectToDoctorsTab()} class="text-dark font-weight-bold">
                        <svg class="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                            <g transform="translate(-48.941 -316.765)">
                                <rect fill="none" width="24" height="24" transform="translate(48.941 316.765)"></rect>
                                <path fill="#000000" d="M59.108,319.236a.915.915,0,0,0-.6.238l-9.3,8.706a.938.938,0,0,0,0,1.312l9.3,8.586a.945.945,0,0,0,1.312-.119.936.936,0,0,0,0-1.312l-7.394-6.917H71.987a.954.954,0,0,0,0-1.908H52.429l7.513-6.917a.847.847,0,0,0,.358-.715,1.7,1.7,0,0,0-.238-.716A5.386,5.386,0,0,0,59.108,319.236Z" transform="translate(0 -0.471)"></path>
                            </g>
                        </svg>
                        Go Back
                    </a>
                </p>
                {validate.isNotEmpty(payments) && payments.map((payment, index) => {
                    return (
                        <div>
                            <h5>Payment Details</h5>
                        <div className="card" key={index} >
                            <div className="card-body wallet-content font-16">
                                <p>
                                    <img src={amount} alt="Transaction Icon" title="trancation icon" height="44" />
                                    <br />
                                    {validate.isNotEmpty(payment.date) &&
                                        <span className="text-secondary"> {displayDate(payment.date)}</span>}
                                </p>
                                {validate.isNotEmpty(payment.mode) &&
                                    <p>
                                        <span className="text-secondary d-block">Payment Mode</span>
                                        <span className="font-weight-bold">{(payment.mode === 'OFFLINE' || payment.mode === 'cod') ? "Offline" : "Online"}</span>
                                    </p>}
                                {validate.isNotEmpty(payment.txnNumber) &&
                                    <p>
                                        <span className="text-secondary d-block">Transaction Number</span>
                                        <span className="font-weight-bold">{payment.txnNumber}</span>
                                    </p>}

                                <p>
                                    <span className="text-secondary d-block">Status</span>
                                    {validate.isNotEmpty(props.consultation.gateWayStatus) &&
                                        <span className="font-weight-bold">{displayStatus(props.consultation.gateWayStatus)}</span>
                                    }
                                </p>
                                {validate.isNotEmpty(payment.amount) &&
                                    <p>
                                        <span className="text-secondary d-block">Amount</span>
                                        <span className="font-weight-bold">{parseFloat(payment.amount).toFixed(2)}</span>
                                    </p>}
                            </div>
                        </div>
                        </div>)
                })}
                {validate.isNotEmpty(refund) && refund.map((payment, index) => {
                    return (
                        <div>
                            <h5>Refund Details</h5>
                        <div className="card" key={index} >
                            <div className="card-body wallet-content font-16">
                                <p>
                                    <img src={amount} alt="Transaction Icon" title="trancation icon" height="44" />
                                    <br />
                                    {validate.isNotEmpty(payment.displayDateCreated) &&
                                        <span className="text-secondary"> {displayDate(payment.displayDateCreated)}</span>}
                                </p>
                                {validate.isNotEmpty(payment) &&
                                    <p>
                                        <span className="text-secondary d-block">Payment Mode</span>
                                        <span className="font-weight-bold">Online</span>
                                    </p>}
                                {validate.isNotEmpty(payment) &&
                                    <p>
                                        <span className="text-secondary d-block">Transaction Number</span>
                                        <span className="font-weight-bold">{getRefundTransactionNumber(payment)}</span>
                                    </p>}

                                <p>
                                    <span className="text-secondary d-block">Status</span>
                                    {validate.isNotEmpty(payment) &&
                                        <span className="font-weight-bold">{refundDisplayStatus(payment)}</span>
                                    }
                                </p>
                                {validate.isNotEmpty(payment.totalRefund) &&
                                    <p>
                                        <span className="text-secondary d-block">Amount</span>
                                        <span className="font-weight-bold">{parseFloat(payment.totalRefund).toFixed(2)}</span>
                                    </p>}
                            </div>
                        </div>
                        </div>)
                })}
            </div>
            {alertInfo && alertInfo.message && <Alert alertInfo={alertInfo} onDurationEnd={closeAlertMessage} duration={5000} />}
        </React.Fragment>
    )
}
export default DoctorConsultationTransactionHistory