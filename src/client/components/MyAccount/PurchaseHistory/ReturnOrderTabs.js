import React, { useEffect, useState } from 'react';
import TrackReturn from './TrackReturn';
import ReturnRefund from './ReturnRefund';
const ReturnOrderTabs = (props) => {

    const [refundActiveTabName,setRefundActiveTabName] = useState((props.showTrackReturn && props.showRefundDetails) ? 'TrackRefund' : props.showTrackReturn ? 'TrackRefund' : 'RefundDetails');
    return(
        <div className="tab-section">
            <ul className="nav nav-pills nav-justified" id="pills-tab" role="tablist">
                {props.showTrackReturn && 
                    <li className="nav-item">
                        <a className={"nav-link py-3 "+(refundActiveTabName == "TrackRefund" ? "active":"")} href="javascript:void(0)" id="pills-track-refund-tab" data-toggle="pill"  role="tab" aria-controls="pills-track-refund" aria-selected={refundActiveTabName == "TrackRefund"} onClick={()=> {if(props.showRefundDetails) setRefundActiveTabName("TrackRefund")}}>Track Return</a>
                    </li>
                }
                {props.showRefundDetails && 
                    <li className="nav-item">
                        <a className={"nav-link py-3 "+(refundActiveTabName == "RefundDetails" ? "active":"")} href="javascript:void(0)" id="pills-refund-details-tab" data-toggle="pill"  role="tab" aria-controls="pills-refund-details" aria-selected={refundActiveTabName == "RefundDetails"} onClick={()=>{if(props.showTrackReturn)setRefundActiveTabName("RefundDetails")}}>Refund Details</a>
                    </li>
                }
            </ul>
            <div className="tab-content">
                {refundActiveTabName == 'TrackRefund' && 
                    <React.Fragment>
                        <div className="tab-pane pills-track-order show active" id="pills-track-refund" role="tabpanel" aria-labelledby="pills-track-refund-tab">
                            <TrackReturn martCustomerReturnRequestStatusTrack = {props.eachReturn.martCustomerReturnRequestStatusTrack} requestId= {props.eachReturn.requestId} returnId = {props.eachReturn.returnId}/>
                        </div>
                    </React.Fragment>
                }
                {refundActiveTabName == 'RefundDetails' && 
                    <React.Fragment>
                        <div className="tab-pane pills-refund-details fade show active" id="pills-refund-details" role="tabpanel" aria-labelledby="pills-refund-details-tab">
                            <ReturnRefund returnId = {props.eachReturn.returnId} orderId = {props.orderId} productDetails = {props.productDetails} paymentType={props.paymentType} />
                        </div>
                    </React.Fragment>
                }
            </div>
        </div>
    )
}

export default ReturnOrderTabs;