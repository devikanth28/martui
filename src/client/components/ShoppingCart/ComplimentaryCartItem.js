import React, { useEffect } from 'react';
import CONFIG from '../../constants/ServerConfig';
import Validate from '../../helpers/Validate';
import ProductThumbNail from '../Common/ProductThumbNail';
import {getProductUrl} from '../../helpers/CommonUtil';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

const ComplimentaryCartItem = (props) => {
    
    const validate = Validate();
    const complimentaryCartItem = props.complimentaryCartItem;
    const complimentaryCartETA = props.complimentaryCartETA;
    const isAddedToCart = props.isAddedToCart;
    let productDiscountPrice = 0;
    if (validate.isNotEmpty(complimentaryCartItem.discountPercentage)) {
        productDiscountPrice += complimentaryCartItem.packMrp - ((complimentaryCartItem.discountPercentage / 100) * complimentaryCartItem.packMrp);


        /* complimentaryCartItem.discountList.forEach((eachDiscount) => {
            f (parseInt(eachDiscount.promotiontype) != 2 && validate.isNotEmpty(eachDiscount.discountPercent) && validate.isNotEmpty(eachDiscount.noOfPacks)) {
                productDiscountPrice += complimentaryCartItem.discountPercentage * eachDiscount.noOfPacks;
            } else if (parseInt(eachDiscount.promotiontype) === 2 && validate.isNotEmpty(eachDiscount.noOfPacks)) {
                productDiscountPrice += complimentaryCartItem.packMrp * eachDiscount.noOfPacks;
            } 
        }) */
    }

    let classInButtonForETA = "";
    if(validate.isNotEmpty(props.complimentaryCartItem) && props.complimentaryCartItem.overFlowItems.length > 1) {
        classInButtonForETA = " position-unset ";
    }

    const addOrModifyComplimentaryProductToCart = () => {
        if(isAddedToCart) {
            props.addOrModifyComplimentaryProductToCart(complimentaryCartItem.productId, 0);
        } else {
            props.addOrModifyComplimentaryProductToCart(complimentaryCartItem.productId, complimentaryCartItem.packSizeQuantity);
        }
    }
    
    const Alternatepopover =(
        <Popover id="popover-basic" className="popoverBottom">
        {validate.isNotEmpty(complimentaryCartItem.overFlowItems) &&
            <React.Fragment>
                <Popover.Header as="h3">Delivery  Detail</Popover.Header>
                <Popover.Body>
                        {complimentaryCartItem.overFlowItems.map((eachOverFlowItem) => {
                            return (
                                <React.Fragment>
                                    <p className="font-14 mb-1">
                                        <strong>{eachOverFlowItem.quantity + (eachOverFlowItem.quantity > 1 ? " Packs - " : " Pack - ") + eachOverFlowItem.deliveryTime}</strong>
                                    </p>
                                </React.Fragment>
                                
                            )
                        })}
                </Popover.Body>
            </React.Fragment>
        }
    </Popover>
)
    return (
        <React.Fragment>
            {validate.isNotEmpty(complimentaryCartItem) &&
                <li className="list-group-item">
                    <div className="col">
                        <a href={CONFIG.REDIRECT_HOME_URL + getProductUrl(complimentaryCartItem.productName, complimentaryCartItem.productId)} title={complimentaryCartItem.productName} className="product-link">
                            {complimentaryCartItem.imageUrl &&
                                <ProductThumbNail imageUrl={complimentaryCartItem.imageUrl} productId={complimentaryCartItem.productId} imagesCount={complimentaryCartItem.imageUploadCount} 
                                productName={complimentaryCartItem.productName} width="48" auditForm={complimentaryCartItem.auditForm}
                                isGeneral={ complimentaryCartItem.auditForm === "GEN"}
                                />
                            }
                        </a>
                        <h6>
                            <a className="text-dark" href={CONFIG.REDIRECT_HOME_URL + getProductUrl(complimentaryCartItem.productName, complimentaryCartItem.productId)} title={complimentaryCartItem.productName}>{complimentaryCartItem.productName}</a>
                            <small className="text-secondary">
                                {complimentaryCartItem.packSizeQuantity + " Pack(s) "}
                                <span className="mx-2"> | </span>
                                MRP &nbsp;
                                {productDiscountPrice > 0 && (parseFloat(productDiscountPrice).toFixed(2) < parseFloat(parseFloat(complimentaryCartItem.packMrp).toFixed(2))) &&
                                    <React.Fragment>
                                        <span className="rupee mx-1 mt-1">&#x20B9;</span><del>{parseFloat(complimentaryCartItem.packMrp).toFixed(2)}</del> &nbsp;
                                        <span className="rupee mx-1 mt-1">&#x20B9;</span>{parseFloat(productDiscountPrice).toFixed(2)}
                                    </React.Fragment>
                                }
                                {(productDiscountPrice <= 0 || (parseFloat(productDiscountPrice).toFixed(2) >= parseFloat(parseFloat(complimentaryCartItem.packMrp).toFixed(2)))) &&
                                    <React.Fragment>
                                        <span className="rupee ml-1 mt-1">&#x20B9;</span> {parseFloat(complimentaryCartItem.packMrp).toFixed(2)}
                                    </React.Fragment>
                                }
                                <span className="mx-2"> | </span>
                                {(complimentaryCartItem.discountPercentage && parseFloat(complimentaryCartItem.discountPercentage.toFixed(2))) && <React.Fragment> Discount {parseFloat(complimentaryCartItem.discountPercentage).toFixed(0)}% </React.Fragment>}
                            </small>
                        </h6>
                        <p>
                            {((complimentaryCartItem.discountPercentage) && parseFloat(complimentaryCartItem.discountPercentage) >= 100) &&
                                <small className="font-weight-bold">Total Price: FREE</small>
                            }
                            {(complimentaryCartItem.discountPercentage) && (parseFloat(complimentaryCartItem.discountPercentage) < 100) &&
                                <small className="font-weight-bold">
                                    Total Price &nbsp;
                                    {productDiscountPrice > 0 && (parseFloat(productDiscountPrice).toFixed(2) < parseFloat(parseFloat(complimentaryCartItem.packMrp).toFixed(2))) &&
                                        <React.Fragment>
                                            <strong className="rupee">&#x20B9;</strong>{parseFloat(productDiscountPrice * complimentaryCartItem.packSizeQuantity).toFixed(2)}
                                        </React.Fragment>
                                    }
                                    {(productDiscountPrice <= 0 || (parseFloat(productDiscountPrice).toFixed(2) >= parseFloat(parseFloat(complimentaryCartItem.packMrp).toFixed(2)))) &&
                                        <React.Fragment>
                                            <strong className="rupee">&#x20B9;</strong>{parseFloat(complimentaryCartItem.packMrp * complimentaryCartItem.packSizeQuantity).toFixed(2)}
                                        </React.Fragment>
                                    }
                                </small>
                            }
                        </p>
                    </div>
                    <div className="align-items-end col-4 d-flex flex-column justify-content-between">
                        <React.Fragment>
                            {validate.isNotEmpty(complimentaryCartItem.overFlowItems) && complimentaryCartItem.overFlowItems.length === 1 && <small><strong>{complimentaryCartETA[complimentaryCartItem.overFlowItems[0].storeId]}</strong></small>}
                            {validate.isNotEmpty(complimentaryCartItem.overFlowItems) && complimentaryCartItem.overFlowItems.length > 1 && complimentaryCartItem.overFlowItems.length < 3 && complimentaryCartItem.overFlowItems.map(eachOverFlowItem => {
                                return(eachOverFlowItem && <React.Fragment key={eachOverFlowItem.storeId}><small><strong>{eachOverFlowItem.quantity + (eachOverFlowItem.quantity > 1 ? " Packs - " : " Pack - ") + complimentaryCartETA[eachOverFlowItem.storeId]}</strong></small><br/></React.Fragment>)
                            })}
                            {validate.isNotEmpty(complimentaryCartItem.overFlowItems) && complimentaryCartItem.overFlowItems.length > 2 &&
                                <React.Fragment>
                                {validate.isNotEmpty(eachOverFlowItem.deliveryTime) && <div>
                                        <OverlayTrigger trigger="hover" placement="bottom" overlay={Alternatepopover}>
                                            <a href="javascript:void(0);" className="popover-icon btn btn-sm mr-n2">
                                            <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="24.71" height="23.222" viewBox="0 0 36.71 23.222">
                                            <g transform="translate(0 0)">
                                                <path d="M2.57,103.906l.951-3.8a.575.575,0,0,1-.455-.562v-.613A2.417,2.417,0,0,1,5.48,96.515H9.81V95.25A1.189,1.189,0,0,1,11,94.062H33.07a1.189,1.189,0,0,1,1.188,1.188v10.423a.575.575,0,1,1-1.15,0V95.25a.038.038,0,0,0-.038-.038H11a.038.038,0,0,0-.038.038v10.423a.575.575,0,1,1-1.15,0v-.652H3.026a1.881,1.881,0,0,0-1.786,1.3H3.027a.575.575,0,0,1,.575.575v1.226a1.8,1.8,0,0,1-1.8,1.8H1.15v2.529h1.5a3.639,3.639,0,0,1,6.881,0H9.81v-4.33a.575.575,0,0,1,1.15,0v4.33H22.885a3.639,3.639,0,0,1,6.881,0h3.3a.038.038,0,0,0,.038-.038v-1.265H30.617a.575.575,0,0,1,0-1.15h5.518a.575.575,0,0,1,0,1.15H34.257v1.265a1.189,1.189,0,0,1-1.188,1.188h-3.1c0,.013,0,.025,0,.038a3.64,3.64,0,1,1-7.281,0c0-.013,0-.026,0-.038H9.732c0,.013,0,.025,0,.038a3.64,3.64,0,1,1-7.281,0c0-.013,0-.026,0-.038H.575A.575.575,0,0,1,0,113.03V106.9A3.032,3.032,0,0,1,2.57,103.906Zm7.24-6.242H5.48a1.266,1.266,0,0,0-1.265,1.265v.038H9.81Zm0,6.208v-3.755H4.7l-.939,3.755Zm16.516,12.262a2.491,2.491,0,1,0-2.491-2.491A2.494,2.494,0,0,0,26.325,116.134Zm-20.233,0A2.491,2.491,0,1,0,3.6,113.643,2.494,2.494,0,0,0,6.093,116.134Zm-4.943-7.357H1.8a.652.652,0,0,0,.651-.651v-.651H1.15v1.3Z" transform="translate(0 -94.062)"/>
                                            </g>
                                            <g transform="translate(25.137 18.394)">
                                                <g transform="translate(0)">
                                                    <path d="M129.455,350.6a1.188,1.188,0,1,1-1.188,1.188A1.189,1.189,0,0,1,129.455,350.6Z" transform="translate(-128.267 -350.597)"/>
                                                </g>
                                            </g>
                                            <g transform="translate(4.905 18.394)">
                                                <path d="M411.643,350.6a1.188,1.188,0,1,1-1.188,1.188A1.189,1.189,0,0,1,411.643,350.6Z" transform="translate(-410.455 -350.597)"/>
                                            </g>
                                            <g transform="translate(12.262 15.941)">
                                                <path d="M205.8,316.393h8.584a.575.575,0,0,1,0,1.15H205.8a.575.575,0,0,1,0-1.15Z" transform="translate(-205.227 -316.393)"/>
                                            </g>
                                            <g transform="translate(26.977 13.489)">
                                                <path d="M17.677,282.188h7.357a.575.575,0,1,1,0,1.15H17.677a.575.575,0,1,1,0-1.15Z" transform="translate(-17.102 -282.188)"/>
                                            </g>
                                            <g transform="translate(16.554 5.518)">
                                                <g transform="translate(0)">
                                                    <path d="M154.934,171.191a.575.575,0,0,0-.813,0L149.01,176.3l-2.659-2.659a.575.575,0,1,0-.813.813l3.065,3.066a.575.575,0,0,0,.813,0L154.934,172A.575.575,0,0,0,154.934,171.191Z" transform="translate(-145.37 -171.023)"/>
                                                </g>
                                            </g>
                                        </svg>
                                          Delivery detail
                                            </a>
                                        </OverlayTrigger>
                                        </div>                                                                     
                                      }
                                        </React.Fragment> 
                            }
                        </React.Fragment>


                        <button className={isAddedToCart ? "btn btn-outline-danger action rounded-pill"+ classInButtonForETA : "btn btn-brand-gradient rounded-pill action "+ classInButtonForETA} type="button" onClick={() => addOrModifyComplimentaryProductToCart()}>
                            <span className="spinner-border spinner-border-sm d-none align-text-top" role="status" aria-hidden="true"></span>
                            <span className="sr-only"></span>
                            {isAddedToCart &&
                                <React.Fragment>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 20">
                                        <g id="Group_5352" data-name="Group 5352" transform="translate(-180.059 -283.942)">
                                            <rect id="Rectangle_3094" data-name="Rectangle 3094" width="20" height="20" transform="translate(180.059 283.942)" fill="none"></rect>
                                            <g id="Group_5352-2" data-name="Group 5352" transform="translate(182.357 285.718)">
                                                <path id="Path_3051" data-name="Path 3051" d="M197.765,288.24H194.01v-.159a2.012,2.012,0,0,0-2-2.02h-2.517a2.01,2.01,0,0,0-2,2.02v.159h-4.115a.568.568,0,1,0,0,1.136h1.417v10.868a2.378,2.378,0,0,0,2.36,2.384h7.2a2.376,2.376,0,0,0,2.358-2.383V289.376h1.059a.568.568,0,0,0,0-1.136Zm-8.276-1.044h2.52a.883.883,0,0,1,.878.885v.157h-4.268v-.157A.884.884,0,0,1,189.489,287.2Zm6.1,13.048a1.245,1.245,0,0,1-1.238,1.247h-7.2a1.244,1.244,0,0,1-1.238-1.247V289.376h9.671Z" transform="translate(-182.808 -286.061)"></path>
                                                <path id="Path_3052" data-name="Path 3052" d="M192.249,301.464h.022a.6.6,0,0,0,.594-.571v-6.8a.592.592,0,1,0-1.185,0v6.753A.6.6,0,0,0,192.249,301.464Z" transform="translate(-184.33 -287.337)"></path>
                                                <path id="Path_3053" data-name="Path 3053" d="M195.276,301.47h.022a.6.6,0,0,0,.594-.571l0-.051V294.1a.592.592,0,0,0-.592-.566h-.022a.6.6,0,0,0-.57.567v6.751A.6.6,0,0,0,195.276,301.47Z" transform="translate(-184.85 -287.343)"></path>
                                                <path id="Path_3054" data-name="Path 3054" d="M189.223,301.464h.022a.6.6,0,0,0,.593-.571v-6.8a.592.592,0,1,0-1.184,0v6.753A.6.6,0,0,0,189.223,301.464Z" transform="translate(-183.811 -287.337)"></path>
                                            </g>
                                        </g>
                                    </svg>
                                    Remove
                                </React.Fragment>
                            }
                            {!isAddedToCart && "Add To Cart"}
                        </button>
                    </div>
                </li>
            }
        </React.Fragment>
    );
}
export default ComplimentaryCartItem;