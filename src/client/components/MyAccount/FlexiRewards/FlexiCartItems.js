import React, { useState, useEffect } from 'react';
import ProductThumbNail from '../../Common/ProductThumbNail';
import CONFIG from '../../../constants/ServerConfig';
import ProductSearchDropDown from '../../Common/ProductSearchDropDown';
import {getProductUrl} from '../../../helpers/CommonUtil';
import moment from "moment";

const FlexiCartItems = (props) => {

    let shoppingCartItems = props.giftItemMap;
    let requestFrom = props.requestFrom;
    let qtyToChange = [];

    for (let qty = 1; qty < 100 ; qty++) {
        qtyToChange.push(qty);
    }

    return (
        <React.Fragment>
            <section>
                <div className="header">
                    <p>Shopping Cart</p>
                </div>
            {shoppingCartItems &&
            <ul className="product-listview list-group list-group-flush">

                {Object.keys(shoppingCartItems).map((key, i) => {
                    let productId = key;
                    let product = shoppingCartItems[key];
                    return (
                        <li className={`list-group-item ${product.isInStock == "false" ? "out-of-stock" : ""}`}>
                        <div className="col">
                        <a href={CONFIG.REDIRECT_HOME_URL + getProductUrl(product.productName, productId)} title={product.productName} className="product-link">
                                 <ProductThumbNail imageUrl={product.imageUrl} productId={productId}  imagesCount={product.imageUploadCount}
                                    productName={product.productName} width="48" auditForm="GEN" isGeneral="true"/>
                            </a>
                            <h6>
                            <a className="text-dark" href={props.isPayback ? "javascript:void(0)" : CONFIG.REDIRECT_HOME_URL + getProductUrl(product.productName, productId)} title={product.productName}>
                                {product.productName}
                                </a>
                            </h6>
                            <p className='mb-2'>
                                {props.isPayback && <small className='font-weight-bold'>Special Price <strong className='rupee ml-1'>&#x20B9;</strong>{product.totalPrice < product.mrp
                                    ? <React.Fragment><span className="mr-2 strikethrough-diagonal">{Number(product.mrp).toFixed(2)}</span><span className='rupee small'>&#x20B9;</span>{Number(product.totalPrice).toFixed(2)}</React.Fragment>
                                    : <React.Fragment>{parseFloat(product.mrp).toFixed(2)}</React.Fragment> }</small>}
                                {!props.isPayback && <small className="text-secondary">MRP <strong className="rupee">&#x20B9;</strong>{Number(product.mrp).toFixed(2)}</small>  } 
                                {props.isPayback && <React.Fragment><span className='mx-1'>&#43;</span> <small className="font-weight-bold ml-n1">{parseInt(product.points)} <span title='Payback Points'>Pts</span></small></React.Fragment>}
                                {!props.isPayback && <React.Fragment><span className='mx-1'>&#43;</span> <small className="font-weight-bold ml-n1">{parseInt(product.points)} <span>Pts</span></small></React.Fragment>}
                            </p>
                           
                            {product.isInStock == "true" ? 
                                <React.Fragment>
                                    {props.isAddToCartLoading === productId+"Add" ?
                                        <button className="btn  btn-brand loader-btn">
                                                <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                                                <span className="sr-only"></span>
                                        </button>
                                        :
                                        <div className="form-group">
                                            <ProductSearchDropDown startIndex={1} dropDownClass={"d-inline-block"}
                                                restrictedQty= {99} 
                                                selectedQty={product.quantity} 
                                                productId={productId} updateCartQty={props.modifyGiftCart} />
                                            {/* <small className="text-secondary ml-2">1 Unit</small>*/}
                                        </div>
                                    }
                                </React.Fragment>
                                :
                                <span className="badge badge-pill outofstock ml-n2">Out of stock</span>
                            }
                        </div>
                        <div className="col-3 text-right">
                            {props.isAddToCartLoading === productId+"Remove" ?
                                <React.Fragment>
                                    <small>{product.deliveryTime && <strong>Pickup by {moment(new Date(product.deliveryTime)).format("MMM DD, YYYY")}</strong>}</small>					    
                                    <button className="btn  btn-outline-danger action" type="button">
                                    <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                                    <span className="sr-only"></span>
                                    </button>
                                </React.Fragment>
                            :
                            <React.Fragment>
                                <small>{product.deliveryTime && <strong>Pickup by {moment(new Date(product.deliveryTime)).format("MMM DD, YYYY")}</strong>}</small>					    
                                <button className="btn  btn-outline-danger action rounded-pill" type="button" onClick={() => props.removeRewardProduct(productId)}>
                                <span className="spinner-border spinner-border-sm d-none align-text-top" role="status" aria-hidden="true"></span>
                                <span className="sr-only"></span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20">
                                <g id="Group_5352" data-name="Group 5352" transform="translate(-180.059 -283.942)">
                                    <rect id="Rectangle_3094" data-name="Rectangle 3094" width="20" height="20" transform="translate(180.059 283.942)" fill="none"/>
                                    <g id="Group_5352-2" data-name="Group 5352" transform="translate(182.357 285.718)">
                                        <path id="Path_3051" data-name="Path 3051" d="M197.765,288.24H194.01v-.159a2.012,2.012,0,0,0-2-2.02h-2.517a2.01,2.01,0,0,0-2,2.02v.159h-4.115a.568.568,0,1,0,0,1.136h1.417v10.868a2.378,2.378,0,0,0,2.36,2.384h7.2a2.376,2.376,0,0,0,2.358-2.383V289.376h1.059a.568.568,0,0,0,0-1.136Zm-8.276-1.044h2.52a.883.883,0,0,1,.878.885v.157h-4.268v-.157A.884.884,0,0,1,189.489,287.2Zm6.1,13.048a1.245,1.245,0,0,1-1.238,1.247h-7.2a1.244,1.244,0,0,1-1.238-1.247V289.376h9.671Z" transform="translate(-182.808 -286.061)"/>
                                        <path id="Path_3052" data-name="Path 3052" d="M192.249,301.464h.022a.6.6,0,0,0,.594-.571v-6.8a.592.592,0,1,0-1.185,0v6.753A.6.6,0,0,0,192.249,301.464Z" transform="translate(-184.33 -287.337)"/>
                                        <path id="Path_3053" data-name="Path 3053" d="M195.276,301.47h.022a.6.6,0,0,0,.594-.571l0-.051V294.1a.592.592,0,0,0-.592-.566h-.022a.6.6,0,0,0-.57.567v6.751A.6.6,0,0,0,195.276,301.47Z" transform="translate(-184.85 -287.343)"/>
                                        <path id="Path_3054" data-name="Path 3054" d="M189.223,301.464h.022a.6.6,0,0,0,.593-.571v-6.8a.592.592,0,1,0-1.184,0v6.753A.6.6,0,0,0,189.223,301.464Z" transform="translate(-183.811 -287.337)"/>
                                    </g>
                                </g>
                                </svg>
                                Remove
                                </button>
                            </React.Fragment>
                            }
                        </div>
                    </li>
                    )}
                )}
                </ul>
            }
            </section>
        </React.Fragment>
    )
}

export default FlexiCartItems;