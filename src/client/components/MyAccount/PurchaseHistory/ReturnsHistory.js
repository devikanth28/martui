import React, { useEffect, useState } from 'react';
import Validate from '../../../helpers/Validate';
import moment from "moment";
import CONFIG from '../../../constants/ServerConfig';
import ProductThumbNail from '../../Common/ProductThumbNail';
import ReturnOrderTabs from './ReturnOrderTabs'
import {getProductUrl} from '../../../helpers/CommonUtil';

const ReturnsHistory = (props) =>{
    const validate = Validate();
    
    return (
        <React.Fragment>
            {validate.isNotEmpty(props.orderReturnInfo) && 
                props.orderReturnInfo.map((eachReturn,i) =>{
                    if(validate.isEmpty(eachReturn.returnId)) {
                        return(
                            <React.Fragment key={i}>
                                <div className="return-section">
                                    <hr className="mb-3" />
                                    <div className="order-heading">
                                        <div>
                                            <h6>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                <path fill="#fc8019" fill-rule="evenodd" d="M12,0A12,12,0,1,0,24,12,12,12,0,0,0,12,0Zm-.97,6.155A.75.75,0,0,0,9.97,5.095L6.595,8.47a.75.75,0,0,0,0,1.061L9.97,12.905a.75.75,0,1,0,1.061-1.061L8.936,9.75h5.877a2.813,2.813,0,0,1,0,5.625H7.125a.75.75,0,0,0,0,1.5h7.688a4.313,4.313,0,0,0,0-8.625H8.936Z"/>
                                            </svg>
                                            <span className="ml-2 text-orange font-weight-bold text-capitalize">{eachReturn.statusValue.toLowerCase()}</span>
                                            </h6>
                                        </div>
                                        <div>
                                            <small className="text-muted">Date of Return <strong className="text-dark">{moment(new Date(eachReturn.dateCreated)).format("MMM DD, YYYY HH:mm")}</strong></small>
                                        </div>
                                    </div>
                                    <div className="h-auto order-id">
                                        <div>
                                            <p className="mb-1">Return Request ID<strong>{eachReturn.requestId}</strong></p>
                                            <p>Reason for Return:<strong>{eachReturn.reasonType}</strong></p>
                                        </div>
                                        <div>
                                            <p>Ticket Refrence ID<a href="/myComplaints" className="m-0" title="Go to Complaints"><strong className="text-primary">{eachReturn.referenceId}</strong></a></p>
                                        </div>
                                    </div>
                                    {validate.isNotEmpty(eachReturn.martCustomerReturnDetails) &&
                                        <div className="return-details pb-3"> 
                                            <table className="table border-bottom-0 border-top-0 mb-4">
                                                <thead className="thead-light">
                                                    <tr>
                                                        <th scope="col" colSpan="4" nowrap="true">Product Name</th>
                                                        <th scope="col" nowrap="true" className="text-left">Mfg / Mkt</th>
                                                        {/* <th scope="col" nowrap="true">PackSize</th>
                                                        <th scope="col" nowrap="true">Ordered Qty (Units)</th>
                                                        <th scope="col" nowrap="true"> Delivered Qty (Units)</th> */}
                                                        <th scope="col" nowrap="true">Returned Qty (Units)</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        eachReturn.martCustomerReturnDetails.map(eachItem => {
                                                            let id = eachItem.productId;
                                                            let productName  = eachItem.productName ? eachItem.productName : props.productDetails ? props.productDetails.get(id) ? props.productDetails.get(id).productName : '' : '';
                                                            let productUrl = CONFIG.REDIRECT_HOME_URL + getProductUrl(productName, id);
                                                            let imageUrl = eachItem.imageUrl ? eachItem.imageUrl : props.productDetails ? props.productDetails.get(id) ? props.productDetails.get(id).imageUrlInfo ? props.productDetails.get(id).imageUrlInfo.imageUrl : '':'':'';
                                                            imageUrl = imageUrl ? imageUrl : props.productDetails.values() ? props.productDetails.values().next().value ? props.productDetails.values().next().value.imageUrlInfo ? props.productDetails.values().next().value.imageUrlInfo.imageUrl : '' : '' : '';
                                                            let imagesCount = props.productDetails ? props.productDetails.get(id) ? props.productDetails.get(id).imageUrlInfo ? props.productDetails.get(id).imageUrlInfo.imageUploadCount : 1 : 1 :1;
                                                            let auditForm = eachItem.auditForm ? eachItem.auditForm : props.productDetails ? props.productDetails.get(id) ? props.productDetails.get(id).imageUrlInfo ? props.productDetails.get(id).imageUrlInfo.auditFormSubName : '' : '' : '';  
                                                            let isGeneral = eachItem.isGeneral ? eachItem.isGeneral : props.productDetails ? props.productDetails.get(id) ? props.productDetails.get(id).imageUrlInfo ? props.productDetails.get(id).imageUrlInfo.isGeneral : '' : '' : '';
                                                            return(
                                                                <tr key={eachItem.productId}>
                                                                    <td colSpan="4">
                                                                        <div>
                                                                            <div className="product-img-container">
                                                                                <ProductThumbNail imageUrl={imageUrl} productId={id} imagesCount={imagesCount} 
                                                                                    productName={productName} height="45" auditForm={auditForm}
                                                                                    isGeneral={(isGeneral=="Y" || auditForm === "GEN") ? true : false} /> 
                                                                            </div>
                                                                            <span>
                                                                                <a className="text-secondary font-weight-bold" title={productName} href={productUrl}>{productName}</a>
                                                                            </span>
                                                                        </div>
                                                                    </td>
                                                                    <td className="text-left">{eachItem.manufacturer}</td>
                                                                    {/* <td nowrap="true">{eachItem.packSize}</td>
                                                                    <td nowrap="true">{eachItem.orderedQty}</td>
                                                                    <td nowrap="true">{eachItem.deliveredQty}</td> */}
                                                                    <td nowrap="true">{eachItem.returnQty}</td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    }
                                </div>
                                <ReturnOrderTabs showTrackReturn={true} showRefundDetails = {false} eachReturn = {eachReturn} orderId = {props.orderId} productDetails = {props.productDetails} paymentType={props.paymentType}  />
                            </React.Fragment>
                        )
                    } else if (eachReturn.offlineReturn) {
                        return(
                            <React.Fragment key={i}>
                                <div className="return-details">
                                    <hr className="border-dark my-4"/>
                                    <div className="order-heading">
                                        <div className="d-flex align-items-center">
                                            <h6>
                                                Return Details
                                            </h6>
                                            <span className="dot-separator text-dark"></span>
                                            <p className="order-id">Return ID <strong>{eachReturn.returnId}</strong></p>
                                        </div>
                                        <div>
                                            <small className="text-muted">Date of Return <strong>{moment(new Date(eachReturn.dateCreated)).format("MMM DD, YYYY HH:mm")}</strong></small>
                                            <span className="dot-separator text-dark"></span>
                                            <small className="text-muted">Total Amount <strong className="amount-text"><strong className="rupee">&#x20B9;</strong> {Number(eachReturn.totalRefund).toFixed(2)}</strong></small>
                                        </div>
                                    </div>
                                    <table className="table border-bottom-0">
                                        <thead className="thead-light">
                                            <tr>
                                                <th scope="col" colSpan="4" nowrap="true">Product Name</th>
                                                <th className="text-left" scope="col" nowrap="true">Mfg / Mkt</th>
                                                <th scope="col" nowrap="true">MRP (Per Unit)</th>
                                                <th scope="col" nowrap="true">Quantity</th>
                                                <th scope="col" nowrap="true">Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Object.values(eachReturn.martCustomerReturnDetails).map((returnedProduct)=>{
                                                let id = returnedProduct.productId;
                                                let productName  = returnedProduct.productName ? returnedProduct.productName : props.productDetails ? props.productDetails.get(id) ? props.productDetails.get(id).productName : '' : '';
                                                let productUrl = CONFIG.REDIRECT_HOME_URL + getProductUrl(productName, id);
                                                let imageUrl = returnedProduct.imageUrl ? returnedProduct.imageUrl : props.productDetails ? props.productDetails.get(id) ? props.productDetails.get(id).imageUrlInfo ? props.productDetails.get(id).imageUrlInfo.imageUrl : '':'':'';
                                                imageUrl = imageUrl ? imageUrl : props.productDetails.values() ? props.productDetails.values().next().value ? props.productDetails.values().next().value.imageUrlInfo ? props.productDetails.values().next().value.imageUrlInfo.imageUrl : '' : '' : '';
                                                let imagesCount = props.productDetails ? props.productDetails.get(id) ? props.productDetails.get(id).imageUrlInfo ? props.productDetails.get(id).imageUrlInfo.imageUploadCount : 1 : 1 :1;
                                                let auditForm = returnedProduct.auditForm ? returnedProduct.auditForm : props.productDetails ? props.productDetails.get(id) ? props.productDetails.get(id).imageUrlInfo ? props.productDetails.get(id).imageUrlInfo.auditFormSubName : '' : '' : '';  
                                                let isGeneral = returnedProduct.isGeneral ? returnedProduct.isGeneral : props.productDetails ? props.productDetails.get(id) ? props.productDetails.get(id).imageUrlInfo ? props.productDetails.get(id).imageUrlInfo.isGeneral : '' : '' : '';
                                                
                                            return (
                                            <tr key={returnedProduct.productId}>
                                                <td colSpan="4">
                                                    <div>
                                                        <div className="product-img-container">
                                                        <ProductThumbNail imageUrl={imageUrl} productId={id} imagesCount={imagesCount} 
                                                            productName={productName} height="45" auditForm={auditForm}
                                                            isGeneral={(isGeneral=="Y" || auditForm === "GEN") ? true : false} /> 
                                                        </div>
                                                        <span>
                                                            <a className="text-secondary font-weight-bold" href={productUrl} title={returnedProduct.productName}>{returnedProduct.productName}</a>
                                                        </span>
                                                    </div>
                                                </td>
                                                <td class="text-left">{returnedProduct.manufacturer}</td> 
                                                <td nowrap="true"><strong className="rupee">&#x20B9;</strong>  {Number(returnedProduct.mrp).toFixed(2)}</td>
                                                <td nowrap="true">{returnedProduct.returnedQty}</td>
                                                <td nowrap="true"><strong className="rupee">&#x20B9;</strong>  {Number(returnedProduct.amount).toFixed(2)}</td>
                                            </tr>)})}
                                            <tr className="border-top">
                                                <td className="text-right" colSpan="7" nowrap="true"><strong>Total Amount:</strong></td>
                                                <td nowrap="true"><strong className="rupee">&#x20B9;</strong><strong> {Number(eachReturn.totalRefund).toFixed(2)}</strong></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <ReturnOrderTabs showTrackReturn={false} showRefundDetails = {true} eachReturn = {eachReturn} orderId = {props.orderId} productDetails = {props.productDetails} paymentType={props.paymentType} />
                            </React.Fragment>
                        )
                    } else {
                        return (
                            <React.Fragment key={i}>
                                <div className="return-section">
                                    <hr className="mb-3" />
                                    <div className="order-heading">
                                        <div>
                                            <h6>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                <path fill="#fc8019" fill-rule="evenodd" d="M12,0A12,12,0,1,0,24,12,12,12,0,0,0,12,0Zm-.97,6.155A.75.75,0,0,0,9.97,5.095L6.595,8.47a.75.75,0,0,0,0,1.061L9.97,12.905a.75.75,0,1,0,1.061-1.061L8.936,9.75h5.877a2.813,2.813,0,0,1,0,5.625H7.125a.75.75,0,0,0,0,1.5h7.688a4.313,4.313,0,0,0,0-8.625H8.936Z"/>
                                            </svg>
                                            <span className="ml-2 text-orange font-weight-bold text-capitalize">{eachReturn.statusValue.toLowerCase()}</span>
                                            </h6>
                                        </div>
                                        <div>
                                            <small className="text-muted">Date of Return <strong className="text-dark">{moment(new Date(eachReturn.dateCreated)).format("MMM DD, YYYY HH:mm")}</strong></small>
                                        </div>
                                    </div>
                                    <div className="h-auto order-id">
                                        <div>
                                            <p className="mb-1">Return ID<strong>{eachReturn.returnId}</strong></p>
                                            <p>Reason for Return:<strong>{eachReturn.reasonType}</strong></p>
                                        </div>
                                        <div>
                                            <p>Ticket Refrence ID<a href="/myComplaints" className="m-0" title="Go to Complaints"><strong className="text-primary">{eachReturn.referenceId}</strong></a></p>
                                        </div>
                                    </div>
                                    {validate.isNotEmpty(eachReturn.martCustomerReturnDetails) &&
                                        <div className="return-details pb-3"> 
                                            <table className="table border-bottom-0 border-top-0 mb-4">
                                                <thead className="thead-light">
                                                    <tr>
                                                        <th scope="col" colSpan="4" nowrap="true">Product Name</th>
                                                        <th className="text-left" scope="col" nowrap="true">Mfg / Mkt</th>
                                                        <th scope="col" nowrap="true">MRP (Per Unit)</th>
                                                        <th scope="col" nowrap="true">Quantity</th>
                                                        <th scope="col" nowrap="true">Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {Object.values(eachReturn.martCustomerReturnDetails).map((returnedProduct)=>{
                                                        let id = returnedProduct.productId;
                                                        let productName  = returnedProduct.productName ? returnedProduct.productName : props.productDetails ? props.productDetails.get(id) ? props.productDetails.get(id).productName : '' : '';
                                                        let productUrl = CONFIG.REDIRECT_HOME_URL + getProductUrl(productName, id);
                                                        let imageUrl = returnedProduct.imageUrl ? returnedProduct.imageUrl : props.productDetails ? props.productDetails.get(id) ? props.productDetails.get(id).imageUrlInfo ? props.productDetails.get(id).imageUrlInfo.imageUrl : '':'':'';
                                                        imageUrl = imageUrl ? imageUrl : props.productDetails.values() ? props.productDetails.values().next().value ? props.productDetails.values().next().value.imageUrlInfo ? props.productDetails.values().next().value.imageUrlInfo.imageUrl : '' : '' : '';
                                                        let imagesCount = props.productDetails ? props.productDetails.get(id) ? props.productDetails.get(id).imageUrlInfo ? props.productDetails.get(id).imageUrlInfo.imageUploadCount : 1 : 1 :1;
                                                        let auditForm = returnedProduct.auditForm ? returnedProduct.auditForm : props.productDetails ? props.productDetails.get(id) ? props.productDetails.get(id).imageUrlInfo ? props.productDetails.get(id).imageUrlInfo.auditFormSubName : '' : '' : '';  
                                                        let isGeneral = returnedProduct.isGeneral ? returnedProduct.isGeneral : props.productDetails ? props.productDetails.get(id) ? props.productDetails.get(id).imageUrlInfo ? props.productDetails.get(id).imageUrlInfo.isGeneral : '' : '' : '';
                                                        
                                                    return (
                                                    <tr key={returnedProduct.productId}>
                                                        <td colSpan="4">
                                                            <div>
                                                                <div className="product-img-container">
                                                                <ProductThumbNail imageUrl={imageUrl} productId={id} imagesCount={imagesCount} 
                                                                    productName={productName} height="45" auditForm={auditForm}
                                                                    isGeneral={(isGeneral=="Y" || auditForm === "GEN") ? true : false} /> 
                                                                </div>
                                                                <span>
                                                                    <a className="text-secondary font-weight-bold" href={productUrl} title={returnedProduct.productName}>{returnedProduct.productName}</a>
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td class="text-left">{returnedProduct.manufacturer}</td> 
                                                        <td nowrap="true"><strong className="rupee">&#x20B9;</strong>  {Number(returnedProduct.mrp).toFixed(2)}</td>
                                                        <td nowrap="true">{returnedProduct.returnedQty}</td>
                                                        <td nowrap="true"><strong className="rupee">&#x20B9;</strong>  {Number(returnedProduct.amount).toFixed(2)}</td>
                                                    </tr>)})}
                                                    <tr className="border-top">
                                                        <td className="text-right" colSpan="7" nowrap="true"><strong>Total Amount:</strong></td>
                                                        <td nowrap="true"><strong className="rupee">&#x20B9;</strong><strong> {Number(eachReturn.totalRefund).toFixed(2)}</strong></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    }
                                </div>
                                <ReturnOrderTabs showTrackReturn={true} showRefundDetails = {true} eachReturn = {eachReturn} orderId = {props.orderId} productDetails = {props.productDetails} paymentType={props.paymentType} />
                            </React.Fragment>
                        )
                        
                    }
                })
            }
        </React.Fragment>
    )
}
export default ReturnsHistory;