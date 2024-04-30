import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import ExpressDeliveryImg from "../../../images/common/express-delivery.svg";
import ProductThumbNail from '../../Common/ProductThumbNail';
import DeliveryVan from '../../../images/common/delivery-van.svg';

const OrderItems = (props) => {
    const orderDetails = props.orderReviewDetails;
    const productImageUrls = props.productImageUrls
    return (
        <React.Fragment>    
        <div className="col-8 pl-0 pr-2">{/* Do not change these div classNamees */}
        {orderDetails.orderList && orderDetails.orderList.map((eachOrder, key )=>{
            let totalOrders = orderDetails.orderList.length;
                return(eachOrder && <Order orderNum={key} orderDetails={eachOrder} totalOrders ={totalOrders} imageURLs={productImageUrls}></Order>)
            })}
            </div>
        </React.Fragment>
    )
}

const Order = (props) => {
    const omsOrder = props.orderDetails;
    const sno = props.orderNum;
    let totalOrderPointVal = 0;
    return (
        <React.Fragment>
            <section>
                <div className="header">
                    <p className="badge-title warning">Order {props.totalOrders > 1 ? sno +1 : "Details"}</p>
                    <div className="text-left d-none">
                        <img srcSet={ExpressDeliveryImg}/>
                            <p><small>{omsOrder.deliveryTime}</small></p>
                    </div>
                    <p className="w-50 text-right">
                        <img srcset={DeliveryVan}/> {omsOrder.deliveryTime}
                    </p>
                </div>
                {/* product component */}
                <ul className="product-listview list-group list-group-flush">
                    {omsOrder.omsOrderItem && omsOrder.omsOrderItem.map((product) => {
                        let noOfPacks = product.quantity/product.packSize;
                        let itemTotalPoint = product.exactPoints*(product.packSize*noOfPacks);
                        totalOrderPointVal = totalOrderPointVal + itemTotalPoint;
                        let imageUrlInfo =  props.imageURLs[product.productId];
                        return( product &&
                        <li className="list-group-item">{/* loop this element for multiple products */}
                            {/* order details container */}
                            <div className="col">
                                <a className="product-link">
                                    {imageUrlInfo && <ProductThumbNail imageUrl={imageUrlInfo.imageUrl} productId={product.productId} imagesCount={imageUrlInfo.imageUploadCount}
                                        productName={product.productName} width="48" auditForm={product.auditFormSubName}
                                        isGeneral={(imageUrlInfo.isGeneral=="Y" || product.auditFormSubName === "GEN")?true:false}
                                        className="sc-1b6h20r-0 bxpMgI" style={{opacity: "1", transition: "opacity 0.5s ease 0s"}}/>
                                    }
                                </a>
                                <h6 className="mb-1">{product.productName}</h6>
                                <p>
                                    <small className="text-secondary">{product.packSize} Unit(s) / Packs </small>
                                    <small className="mx-2 text-secondary">|</small>
                                    <small className="font-weight-bold">MRP/Pack&nbsp;
                                        <strong className="rupee">&#x20B9;</strong>{Number(product.mrp * product.packSize).toFixed(2)}	          
                                    </small>
                                    <br/>
                                    <small className="mr-2 text-secondary">Qty {noOfPacks} Pack(s)</small>
                                </p>
                            </div>
                            <div className="col-4 text-right p-0">
                                <p className="font-weight-bold m-0">
                                    {product.mrp != product.price  &&
                                        <React.Fragment>
                                            <small className="text-secondary">
                                                <strong className="rupee"> &#x20B9;</strong> 
                                                <del>{Number.parseFloat(product.mrp * product.quantity).toFixed(2)}</del>
                                            </small>
                                        </React.Fragment>
                                    }
                                    <span className="ml-2">
                                        <strong className="rupee">&#x20B9;</strong>{Number(product.price * product.quantity).toFixed(2)}	
                                    </span>
                                </p>
                                {(omsOrder.promotionType && omsOrder.promotionType == '2' && itemTotalPoint > 0) ?
                                    <React.Fragment>
                                        <small className="text-secondary d-flex justify-content-end">Points awarded: {parseFloat(itemTotalPoint).toFixed(2)} pts</small>
                                    </React.Fragment>
                                    :
                                    <React.Fragment>
                                        { product.discountPercentage > 0 &&
                                            <React.Fragment>
                                                <small className="text-secondary d-flex justify-content-end">Percentage discount: {parseFloat(product.discountPercentage).toFixed(2)}%</small>
                                                <small className="text-secondary d-flex justify-content-end align-items-center">You saved:&nbsp;<strong className="rupee">&#x20B9;</strong>{Number.parseFloat((product.mrp * product.packSize - product.price * product.packSize) * noOfPacks).toFixed(2)}</small>
                                            </React.Fragment>
                                        }
                                    </React.Fragment>
                                }
                                {product.couponCode && product.couponCode != null && 
                                    <p className="text-success">
                                        <span className="float-right">Coupon Applied  </span>
                                    </p>
                                }
                        
                            </div>
                            {/*order details container over */}
                        </li> )
                    })}
                    <li className="order-details-summary list-group-item">{/* summary details of the products this should not be looped */}
                            {/* product container */}
                        <div className="col">
                            <div className="form-group">
                                <button className="btn btn-outline-brand rounded-pill custom-btn-lg" value="" type="button" onClick={event =>  window.location.href='/shoppingCart'}>
                                Edit / Update Quantities		
                                </button>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-xl-5 text-left font-weight-bold">
                            {parseFloat(omsOrder.orderTotal).toFixed(2) != (parseFloat(omsOrder.orderAmount-omsOrder.totalServiceCharges).toFixed(2)) &&
                                <p>
                                    <span>MRP Total</span>
                                    <span className="float-right">
                                        <strong className="rupee">&#x20B9;</strong>{parseFloat(omsOrder.orderTotal).toFixed(2)}
                                    </span>
                                </p>
                            }
                            {(omsOrder.promotionType && omsOrder.promotionType == 2) ?
                                <React.Fragment>
                                    {totalOrderPointVal > 0 && 
                                      
                                            <p className="text-success">
                                                <span>Points</span>
                                                <span className="float-right">
                                                    {parseFloat(totalOrderPointVal).toFixed(2)}
                                                </span>
                                            </p>
                                    }
                                    {(parseFloat(omsOrder.discountTotal) > 0) && 
                                        <p className="text-success">
                                            <span>Total Amount Saved</span>
                                            <span className="float-right">
                                                -<strong className="rupee">&#x20B9;</strong>{parseFloat(omsOrder.discountTotal).toFixed(2)}
                                            </span>
                                        </p>
                                    }
                                </React.Fragment>
                                :
                                <React.Fragment>
                                    {(parseFloat(omsOrder.discountTotal) > 0) &&
                                        <p className="text-success">
                                            <span>Total Amount Saved</span>
                                            <span className="float-right">
                                               - <strong className="rupee">&#x20B9;</strong>{parseFloat(omsOrder.discountTotal).toFixed(2)}
                                            </span>
                                        </p>
                                    }
                                </React.Fragment>
                            }
                            <p>
                                <span>Order Total</span>
                                <span className="float-right">
                                    <strong className="rupee">&#x20B9;</strong>{parseFloat(omsOrder.orderAmount - omsOrder.totalServiceCharges).toFixed(2)}
                                </span>
                            </p>
                        </div>
                        {/* product container over */}
                    </li>
                </ul>
                {/* product component over */}
            </section>
        </React.Fragment>
    )
}

export default OrderItems;