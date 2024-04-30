import React, { useEffect, useState } from 'react';
import { Tooltip } from 'reactstrap';
import Validate from '../../../helpers/Validate';
import {RefundDetailsGhostImages} from './PurchaseHistoryGhostImage';
import moment from "moment";
import MyAccountService  from  '../../../services/MyAccountService';

const ReturnRefund = (props) => {

    const [refundDetails,setRefundDetails] = useState();
    const validate = Validate();
    const myAccountService =   MyAccountService();
    const [showGhostImages, setShowGhostImages] = useState(true);
    const [showNoDataFound, setShowNoDataFound] = useState(false);
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const toggle = () => setTooltipOpen(!tooltipOpen);

    useEffect(()=>{
        if(validate.isNotEmpty(props.orderId) && validate.isNotEmpty(props.returnId)){
            getRefundInfo(props.orderId,props.returnId);
        }
    },[props.orderId,props.returnId])

    const getRefundInfo = (orderId,returnId) =>{
        myAccountService.getReturnRefundInfo(orderId,returnId).then(response => {
            setShowGhostImages(false);
            if (validate.isNotEmpty(response) && validate.isNotEmpty(response.statusCode) && "SUCCESS" == response.statusCode && validate.isNotEmpty(response.dataObject)) {
                setRefundDetails(response.dataObject);
            } else {
                setShowNoDataFound(true);
            }
        }).catch(function(error) {
            setShowGhostImages(false);
            setShowNoDataFound(true);
            console.log(error);
        });
    }

    if(showGhostImages) {
        return(
            <RefundDetailsGhostImages/>
        )
    } else {
        return(
            <React.Fragment>
                {showNoDataFound &&
                    <React.Fragment>
                        <p>
                            Could not fetch refund details , please try again after a while.
                        </p>
                    </React.Fragment>
                }
                {refundDetails &&
                    <React.Fragment>
                        <div className="border rounded mb-3">
                            <table className="table mb-0 border-0">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col" nowrap="true" className="text-left">Transaction No</th>
                                    <th scope="col" nowrap="true">Date & Time</th>
                                    <th scope="col" nowrap="true">Mode</th>
                                    <th scope="col" nowrap="true">Status</th>
                                    <th scope="col" nowrap="true">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td nowrap="true" className="text-left">{refundDetails.refundTxId ? refundDetails.refundTxId : 'NA'}</td>
                                    <td nowrap="true">{refundDetails.refundIssueDate ? moment(new Date(refundDetails.refundIssueDate)).format("MMM DD, YYYY HH:mm") : "NA"}</td>
                                    <td nowrap="true">{refundDetails.refundMode}</td>
                                    <td nowrap="true">{refundDetails.refundModeSatus}</td>
                                    <td nowrap="true"><strong className="rupee">&#x20B9;</strong> {refundDetails.refundAmount}</td>
                                </tr>
                                {props.paymentType == 'O' &&
                                    <tr className="border-top">
                                        <td className="text-left" colSpan="5">
                                            <a className="text-primary" href="javascript:void(0)" id="refundTooltip" title="">
                                                <svg className="mr-2 align-text-top" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                                    <path fill="#2699fb" d="M9.571,6.678a.752.752,0,0,1,.75-.75h.5a.752.752,0,0,1,.75.75v.5a.752.752,0,0,1-.75.75h-.5a.752.752,0,0,1-.75-.75Zm3,7.25h-4v-1h1v-3h-1v-1h3v4h1Zm-2-12a8,8,0,1,0,8,8,8,8,0,0,0-8-8Zm0,14.5a6.5,6.5,0,1,1,6.5-6.5A6.5,6.5,0,0,1,10.571,16.428Z" transform="translate(-2.57 -1.928)"/>
                                                </svg>
                                                Know about Refund
                                                <Tooltip placement="bottom" isOpen={tooltipOpen} target="refundTooltip" toggle={toggle}>
                                                    A refund will be made to your original payment method within the next 7 working days
                                                </Tooltip>
                                            </a>
                                        </td>
                                    </tr>
                                }
                            </tbody>
                            </table>
                        </div>
                        <div className="border rounded mb-3">
                            <table className="table mb-0 border-0">
                                <thead className="thead-light">
                                    <tr>
                                        <th scope="col" nowrap="true" className="text-left">Refund ID</th>
                                        <th scope="col" nowrap="true" className="text-left">Product Name</th>
                                        <th scope="col" nowrap="true">Qty</th>
                                        <th scope="col" nowrap="true">Reason</th>
                                        <th scope="col" nowrap="true">MRP (Rs)</th>
                                        <th scope="col" nowrap="true">Rate (Rs)</th>
                                        <th scope="col" nowrap="true">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {refundDetails.martRefundItems.map((martRefundItem,i) => {
                                        return(
                                            <React.Fragment key={i}>
                                                <tr>
                                                    <td nowrap="true" className="text-left">{martRefundItem.refundId}</td>
                                                    <td className="text-left"><a href="javascript:void(0)" title={props.productDetails ? props.productDetails.get(martRefundItem.productId) ? props.productDetails.get(martRefundItem.productId).productName : martRefundItem.productId : martRefundItem.productId} className="text-dark">{props.productDetails ? props.productDetails.get(martRefundItem.productId) ? props.productDetails.get(martRefundItem.productId).productName : martRefundItem.productId : martRefundItem.productId}</a></td>
                                                    <td nowrap="true">{martRefundItem.refundQuantity}</td>
                                                    <td nowrap="true">{martRefundItem.displayRefundReason}</td>
                                                    <td nowrap="true"><strong className="rupee">&#x20B9;</strong> {martRefundItem.mrp}</td>
                                                    <td nowrap="true"><strong className="rupee">&#x20B9;</strong> {martRefundItem.rate}</td>
                                                    <td nowrap="true"><strong className="rupee">&#x20B9;</strong> {martRefundItem.refundItemAmount}</td>
                                                </tr>
                                            </React.Fragment>
                                        )
                                    })

                                    }
                                    <tr className="border-top">
                                        <td nowrap="true" className="text-right" colSpan="6">Total Refund</td>
                                        <td nowrap="true"><strong className="rupee">&#x20B9;</strong> <strong>{refundDetails.refundAmount}</strong>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </React.Fragment>
                }
            </React.Fragment>
        )
    }
}

export default ReturnRefund;