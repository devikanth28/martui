import moment from "moment";
import React, { useEffect, useState } from 'react';
import Validate from '../../../helpers/Validate';
import ProductThumbNail from '../../Common/ProductThumbNail';
import {OrderDetailsGhostImage} from './PurchaseHistoryGhostImage';
import { getSelectedLocality } from '../../../../redux/action/LocalityAction';
import LocalDB from "../../../DataBase/LocalDB";
import CONFIG from '../../../constants/ServerConfig';
import MyAccountService  from  '../../../services/MyAccountService';
import {getProductUrl} from '../../../helpers/CommonUtil';

const InvoiceOrderDetail = (props) => {
    const validate = Validate();
    const myAccountService=MyAccountService();
	const purchaseDetails = props.purchaseDetails;
    const [returnDetails,setReturnDetails]=useEffect(undefined);
    const status = purchaseDetails.isReturned ? "Returned" : "Delivered";
    const selectedLocality = getSelectedLocality();
    
    useEffect(()=>{
        if(validate.isNotEmpty(purchaseDetails) && purchaseDetails.isReturned){
           myAccountService.getReturnOrderDetails(purchaseDetails.invoiceId,purchaseDetails.company).then((data)=>{
               if(validate.isNotEmpty(data) && validate.isNotEmpty(data.statusCode) && "SUCCESS" == data.statusCode){
                   setReturnDetails(data.dataObject.returnInfoList);
               }
           })
        }

    },[])

    return (
        <React.Fragment>
            <div className="header">
                <p>
                    <a onClick={()=>{LocalDB.setValue('fromOrderDetails', purchaseDetails.invoiceId); props.history.push("/ordersHistory");}} href="javascript:void(0)">
                        <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                            <g transform="translate(-48.941 -316.765)">
                                <rect fill="none" width="24" height="24" transform="translate(48.941 316.765)"></rect>
                                <path fill="#000000" d="M59.108,319.236a.915.915,0,0,0-.6.238l-9.3,8.706a.938.938,0,0,0,0,1.312l9.3,8.586a.945.945,0,0,0,1.312-.119.936.936,0,0,0,0-1.312l-7.394-6.917H71.987a.954.954,0,0,0,0-1.908H52.429l7.513-6.917a.847.847,0,0,0,.358-.715,1.7,1.7,0,0,0-.238-.716A5.386,5.386,0,0,0,59.108,319.236Z" transform="translate(0 -0.471)"></path>
                            </g>
                        </svg>
                        Back to purchase history
                    </a>
                </p>
                {validate.isNotEmpty(purchaseDetails) && <div className="order-controls">
                    <a href="javascript:void(0)" title="previous Order" className={` mr-2 btn my-0 btn-sm ${purchaseDetails.isFirstOrder ? "disabled" : ""}`} onClick={purchaseDetails.isFirstOrder ? () => false : () => props.getPreviousOrNextDetailPage("INVOICE", -1, purchaseDetails.invoiceId)} disabled={purchaseDetails.isFirstOrder}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <g transform="translate(-868.477 786) rotate(-90)">
                                <rect fill="none" width="24" height="24" transform="translate(762 868.477)"/>
                                <path fill="#080808" d="M61.848,465.874l-5.541,5.541a1.256,1.256,0,1,0,1.776,1.776l4.653-4.64,4.655,4.655a1.261,1.261,0,0,0,2.149-.888,1.248,1.248,0,0,0-.373-.888l-5.543-5.556A1.26,1.26,0,0,0,61.848,465.874Z" transform="translate(711.498 410.651)"/>
                            </g>
                        </svg>
                        <span className="ml-2">Previous Order</span>
                    </a>
                    <a href="javascript:void(0)" title="next Order" className={`btn my-0 ml-2 btn-sm ${purchaseDetails.isLastOrder ? "disabled" : ""}`} onClick={purchaseDetails.isLastOrder ? () => false : () => props.getPreviousOrNextDetailPage("INVOICE", 1, purchaseDetails.invoiceId)}>
                        <span className="mr-2">Next Order</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <g transform="translate(-906.838 786) rotate(-90)">
                                <rect fill="none" width="24" height="24" transform="translate(762 906.838)"/>
                                <path fill="#080808" d="M63.432,503.859l5.4-5.4a1.223,1.223,0,0,0-1.73-1.73l-4.533,4.52-4.533-4.533a1.228,1.228,0,0,0-2.092.865,1.216,1.216,0,0,0,.363.865l5.4,5.411A1.229,1.229,0,0,0,63.432,503.859Z" transform="translate(711.356 418.584)"/>
                            </g>
                        </svg>
                    </a>
                </div>}
            </div>
            <div className="order-detail">
                {validate.isEmpty(purchaseDetails) && <OrderDetailsGhostImage/>}
                {validate.isNotEmpty(purchaseDetails) && 
                <React.Fragment>
                    <div className="order-heading">
                        <div>
                            <h6 className="text-success">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 23.999 24">
                                    <g data-name="Group 14808" transform="translate(-1154 -448)">
                                        <path id="Path_195" data-name="Path 195" d="M1786.571,36.242a12,12,0,1,1-12,12A12,12,0,0,1,1786.571,36.242Z" transform="translate(-620.571 411.758)" fill="#08ce73"/>
                                        <path id="Path_3698" data-name="Path 3698" d="M1787.169,58.46l-.158.028c-.171-.053-.421-.093-.528-.241l-3.974-3.971a.7.7,0,0,1,.073-1.013.659.659,0,0,1,.987.076l3.458,3.311,9.46-9.42a.745.745,0,0,1,1.053-.018.794.794,0,0,1,.019,1.08l-10.024,9.935A.611.611,0,0,1,1787.169,58.46Z" transform="translate(-623.748 406.747)" fill="#fff" stroke="rgba(0,0,0,0)" strokeMiterlimit="10" strokeWidth="1"/>
                                    </g>
                                </svg>
                                {status}
                            </h6>
                        </div>
                        <div>
                            <small className="text-muted">Ordered On {moment(new Date(purchaseDetails.dateCreated)).format("MMM DD, YYYY HH:mm")}</small>
                            <span className="dot-separator text-dark"></span>
                            <small className="text-muted">Total Amount <strong className="amount-text"><strong className="rupee">&#x20B9;</strong> {Number(purchaseDetails.orderAmount).toFixed(2)}</strong></small>
                        </div>
                    </div>
                    <div className="order-id">
                        {validate.isNotEmpty(purchaseDetails.displayOrderId) &&  
                            <p>Invoice ID  <strong>{purchaseDetails.displayOrderId}</strong> </p>
                        }
                        <div>
                            {purchaseDetails.pickStoreId && <a className="btn btn-link btn-sm" href="javascript:void(0)" onClick={() => window.open(`${CONFIG.REDIRECT_HOME_URL}/my-profile/printInvoiceDetails?invoiceId=${purchaseDetails.invoiceId}&storeId=${purchaseDetails.pickStoreId}&company=${props.company}`)}>Print Receipt</a>}
                            {(selectedLocality && selectedLocality.hubId) &&<a className="btn btn-link btn-sm" href="javascript:void(0)" onClick={()=>{LocalDB.setValue("previousPage", "InvoiceDetails"); props.history.push({pathname: `/reOrder/${purchaseDetails.invoiceId}`, state:{company: props.company, type: "INVOICE_ORDER"}})}}>Re-Order</a>}
                        </div>
                    </div>
                    <table className="table border-bottom-0">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col" colSpan="4" nowrap="true">Product Name</th>
                                <th className="text-left" scope="col" nowrap="true">Mfg / Mkt</th>
                                <th scope="col" nowrap="true">Expiry</th>
                                <th scope="col" nowrap="true">MRP(Per Unit)</th>
                                <th scope="col" nowrap="true">Quantity</th>
                                <th scope="col" nowrap="true">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                        {purchaseDetails && purchaseDetails.orderHistoryItemDTOs.map((invoiceItem)=>{
                            let imageUrlInfo = invoiceItem.productImage;
                            let productName  = invoiceItem.productName;
                            let id = invoiceItem.productId;
                            let productUrl = CONFIG.REDIRECT_HOME_URL + getProductUrl(productName, id);
                            return (
                                <React.Fragment>
                                    {invoiceItem && invoiceItem.productId && 
                                        <tr key={invoiceItem.productId}>
                                                        <td colSpan="4">
                                                            {imageUrlInfo && 
                                                            <div>
                                                                <div className="product-img-container">
                                                                    <ProductThumbNail imageUrl={imageUrlInfo} productId={invoiceItem.productId} imagesCount={invoiceItem.imageUploadCount} 
                                                                        productName={invoiceItem.productName} auditForm={invoiceItem.auditFormSubName}
                                                                        isGeneral={(invoiceItem.isGeneral=="Y" || invoiceItem.auditFormSubName === "GEN") ? true : false} />
                                                                </div>
                                                                <span>
                                                                    <a href={productUrl} title={invoiceItem.productName} className="text-dark font-weight-bold">{invoiceItem.productName}</a>
                                                                </span>
                                                            </div>}
                                                        </td>
                                            <td className="text-left">{invoiceItem.manufacturer}</td>
                                            <td nowrap="true">{invoiceItem.dateExpiry}</td>
                                            <td nowrap="true"><strong className="rupee">&#x20B9;</strong>&nbsp;{parseFloat(invoiceItem.mrpPerUnit).toFixed(2)}</td>
                                            <td nowrap="true">{invoiceItem.quantity}</td>
                                            <td nowrap="true"><strong className="rupee">&#x20B9;</strong>&nbsp;{parseFloat(invoiceItem.mrpPerUnit*invoiceItem.quantity).toFixed(2)}</td>
                                        </tr>}
                                </React.Fragment>)})}
                            {purchaseDetails.totalAmount > 0 &&
                                <tr className="border-top">
                                    <td className="text-right" colSpan="8" nowrap="true"><strong>Sub Amount:</strong></td>
                                    <td nowrap="true"><strong className="rupee">&#x20B9;</strong> <strong>{purchaseDetails.totalAmount}</strong></td>
                                </tr>
                            }
                            {purchaseDetails.amountSaved > 0 &&
                                <tr>
                                    <td className="text-right" colSpan="8" nowrap="true"><strong>Discount Amount:</strong></td>
                                    <td nowrap="true">(-)<strong className="rupee">&#x20B9;</strong> <strong>{parseFloat(purchaseDetails.amountSaved).toFixed(2)}</strong></td>
                                </tr>}
                            {purchaseDetails.pointsEarned > 0 &&
                                <tr>
                                    <td className="text-right" colSpan="8" nowrap="true"><strong> Points:</strong></td>
                                    <td nowrap="true"><strong className="rupee">Pts</strong> <strong>{parseInt(purchaseDetails.pointsEarned)}</strong></td>
                                </tr>}
                            <tr className="border-top">
                                <td className="text-right" colSpan="8" nowrap="true"><strong>Total Amount:</strong></td>
                                <td nowrap="true"><strong className="rupee">&#x20B9;</strong> <strong>{parseFloat(purchaseDetails.orderAmount).toFixed(2)}</strong></td>
                            </tr>
                        </tbody>
                    </table>
                    {/* return table start here  */}
                    {validate.isNotEmpty(returnDetails) &&  returnDetails.map((returnItem)=> {
                    return (
                    <div className="return-details" key={returnItem.refundId}>
                        <hr className="border-dark border-dashed my-4" />
                        <div className="order-heading">
                            <div className="d-flex align-items-center">
                                <h6>
                                    Return Details
                                </h6>
                                <span className="dot-separator text-dark"></span>
                                <p className="order-id p-0">Return ID <strong>{returnItem.refundId}</strong></p>
                            </div>
                            <div>
                                <small className="text-muted">Date of Return {moment(new Date(returnItem.dateCreated)).format("MMM DD, YYYY HH:mm")}</small>
                                <span className="dot-separator text-dark"></span>
                                <small className="text-muted">Total Amount <strong className="amount-text"><strong className="rupee">&#x20B9;</strong> {parseFloat(returnItem.totalRefund).toFixed(2)}</strong></small>
                            </div>
                        </div>
                        <table className="table border-bottom-0 mb-0">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col" colSpan="4" nowrap="true">Product Name</th>
                                    <th className="text-left" scope="col" nowrap="true">Mfg / Mkt</th> 
                                    <th scope="col" nowrap="true">Quantity</th>
                                    <th scope="col" nowrap="true">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {returnItem.productDetails && returnItem.productDetails.map((returnedProduct)=>{
                                    let productItems = purchaseDetails.orderHistoryItemDTOs;
                                    let product=undefined;
                                    productItems.map(item=>{
                                        if(item.productId == returnedProduct.productId){
                                            product= item;
                                        }
                                    })
                                    let imageUrlInfo =product.productImage;
                                    let productName  = returnedProduct.productName;
                                return (
                                <tr key={returnedProduct.ProductID}>
                                    <td colSpan="4">
                                        <div>
                                         {imageUrlInfo && <ProductThumbNail imageUrl={imageUrlInfo} productId={product.ProductId} imagesCount={product.imageUploadCount} 
                                            productName={productName} height="45"
                                            auditForm={product.auditForm}
                                            isGeneral={(product.isGeneral=="Y" || product.auditForm === "GEN") ? true : false} /> 
                                        }
                                        <span>
                                            <a className="text-dark" title={productName} href="javascript:void(0)">{productName}</a>
                                        </span>
                                        </div>
                                    </td>
                                    <td className="text-left">{returnedProduct.manufacturer}</td> 
                                    <td nowrap="true">{returnedProduct.quantity}</td>
                                    <td nowrap="true"><strong className="rupee">&#x20B9;</strong>  {parseFloat(returnedProduct.productRefund).toFixed(2)}</td>
                                </tr>)})}
                                <tr className="border-top">
                                    <td className="text-right" colSpan="6" nowrap="true"><strong>Total Amount:</strong></td>
                                    <td nowrap="true"><strong className="rupee">&#x20B9;</strong> <strong> {parseFloat(returnItem.totalRefund).toFixed(2)}</strong></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>)})}
                    {/* return table end here */}


                </React.Fragment>}             
            </div>
        </React.Fragment>
    );
}

export default InvoiceOrderDetail;


 








