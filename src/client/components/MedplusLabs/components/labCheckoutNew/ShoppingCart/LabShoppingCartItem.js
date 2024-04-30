import React, { useState } from "react";
import Validate from "../../../../../helpers/Validate";
import EstimatedReportDelivery from "../../Common/EstimatedReportDelivery";

const LabShoppingCartItem = (props) => {
    return (
        <React.Fragment>
            {Validate().isNotEmpty(props.labShoppingCartItem) &&
                <li className={`${props.labShoppingCartItem.genderRestricted || props.labShoppingCartItem.duplicateItem ? "out-of-stock border-danger" : ""} list-group-item ${props.labShoppingCartItem.duplicateItem ? "duplicateTest" : ""}`}>
                    <div className="each-test">
                        <h6>{props.labShoppingCartItem.testName}</h6>
                        <p className="mb-0"><small>Price</small>&nbsp;
                            {(parseFloat(props.labShoppingCartItem.mrp) > parseFloat(props.labShoppingCartItem.price)) &&
                                <React.Fragment><small><strong className="rupee">₹</strong></small>
                                    <del className="text-secondary small mr-2">{parseFloat(props.labShoppingCartItem.mrp).toFixed(2)}</del></React.Fragment>}
                            <span>
                                <span className="rupee">₹</span>
                                <span className="font-weight-bold">{parseFloat(props.labShoppingCartItem.price).toFixed(2)}</span>
                            </span>
                        </p>
                        {
                            !props.labShoppingCartItem.genderRestricted &&  !props.labShoppingCartItem.duplicateItem && (
                            (Validate().isNotEmpty(props.labShoppingCartItem.reportDeliveryTime) && props.labShoppingCartItem.reportDeliveryTime > 0 )
                                || (!props.labShoppingCartItem.codallowed)) && <EstimatedReportDelivery isCheckoutPage={true} reportDeliveryTime={props.labShoppingCartItem.reportDeliveryTime} codallowed={!props.labShoppingCartItem.codallowed ? !props.labShoppingCartItem.codallowed : undefined} />}
                        {props.labShoppingCartItem.genderRestricted && <EstimatedReportDelivery showGenderRestrictedMessage={true} isCheckoutPage={true} />}
                        {props.labShoppingCartItem.duplicateItem && <EstimatedReportDelivery showDuplicateItemMessage={true} isCheckoutPage={true} />}
                        {/* <small className="text-secondary">Note: Do not eat or drink anything other than water for 8-12 hours before the test.</small> */}
                        <button className="action btn btn-outline-danger rounded-pill test-action" type="button" role="button" onClick={() => props.removeTestFromCart(props.labShoppingCartItem.testCode)} >
                            <span className="spinner-border spinner-border-sm d-none align-text-top" role="status" aria-hidden="true"></span><span className="sr-only"></span>
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
                        </button>
                    </div>
                </li>
            }
        </React.Fragment>
    )
}
export default LabShoppingCartItem;