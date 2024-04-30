import React, { useState } from "react";
import Validate from "../../../helpers/Validate"
import { SubscriptionPaymentDetails } from "../../Subscription/components/Payment";

const SubscriptionCartSummary = ({cartSummary,planType,isUpgradeOrder}) => {
    const validate= Validate();
    const [selectedTrigger , setSelectedTrigger] = useState();
    const OpenpopoverModel = (targets) => {
        if(cartSummary.totalDisc || cartSummary.additionalRenewalDisc){
            setSelectedTrigger(targets)
        }
    }

    return (
        <div>
            {validate.isNotEmpty(cartSummary) && validate.isNotEmpty(planType) &&
                <section className="cart-summary discounted-model">
                    {validate.isNotEmpty(selectedTrigger) &&  <SubscriptionPaymentDetails target={selectedTrigger} setSelectedTrigger={setSelectedTrigger} cartSummary={cartSummary}/> }
                    <div className="header">
                        <p>Cart Summary</p>
                    </div>
                    {!isUpgradeOrder && <div>
                        <div className="body">
                            <p>
                                <span>No. Of Members</span>
                                <span>{cartSummary.totalMembers}</span>
                            </p>
                            {planType === "INDIVIDUAL" && validate.isNotEmpty(cartSummary.primaryFee) && parseFloat(cartSummary.primaryFee) > 0 &&
                                <p>
                                    <span>Base Plan Charges <span className='small text-secondary'>(Primary Member)</span></span>
                                    <span>
                                        <strong className="rupee">&#x20B9;</strong>{parseFloat(cartSummary.primaryFee).toFixed(2)}
                                    </span>
                                </p>}

                            {planType === "INDIVIDUAL_COMBO" && validate.isNotEmpty(cartSummary.plans) && cartSummary.plans.length > 1 &&
                                <div>
                                    <p className="mt-3">
                                        <span className="text-secondary">Base Plan Charges <span className='small text-secondary'>(Primary Member)</span></span>
                                    </p>
                                    <div>
                                        {cartSummary.plans.map((plan) => {
                                            return (
                                                validate.isNotEmpty(plan.amount) && parseFloat(plan.amount) > 0 &&
                                                <p>  <span>{plan.displayName}</span>
                                                    <span>
                                                        <strong className="rupee">&#x20B9;</strong>{parseFloat(plan.amount).toFixed(2)}
                                                    </span>
                                                </p>)
                                        })}
                                    </div>
                                </div>
                            }

                            {validate.isNotEmpty(cartSummary.addOnFees) &&
                                <p className="mt-3">
                                    <span className="text-secondary">Additional Member Charges</span>
                                </p>
                            }
                            {validate.isNotEmpty(cartSummary.addOnFees) &&
                                cartSummary.addOnFees.map((eachAddOnFeesDetails) => {
                                    return (<React.Fragment>
                                        <p>
                                            <span>Age Group {`${eachAddOnFeesDetails.displayName} (${eachAddOnFeesDetails.noOfMembers})`} </span>
                                            <span><strong className="rupee">&#x20B9;</strong>{parseFloat(eachAddOnFeesDetails.totalAddOnfee).toFixed(2)}</span>
                                        </p>
                                    </React.Fragment>)
                                }
                                )
                            }
                            <hr className="border-bottom-0 mb-2" />
                            {
                                validate.isNotEmpty(cartSummary.totalMrp) && parseFloat(cartSummary.totalMrp) > 0 &&
                                <p>
                                    <span>Total Amount</span>
                                    <span>
                                        <strong className="rupee">&#x20B9;</strong>{parseFloat(cartSummary.totalMrp).toFixed(2)}
                                    </span>
                                </p>}
                            {
                                validate.isNotEmpty(cartSummary.totalDisc) && parseFloat(cartSummary.totalDisc) > 0 &&
                                <p className="text-success">
                                    <span className={validate.isNotEmpty(cartSummary.totalDisc) ? "dashed-dark":""} id="DiscountDetails" onClick={()=> {OpenpopoverModel("DiscountDetails")}}>Base Plan {cartSummary.addOnFees && cartSummary.addOnFees.length != 0 && "& Member(s)"} Discount</span>
                                    <span>
                                        -<strong className="rupee">&#x20B9;</strong>{parseFloat(cartSummary.totalDisc).toFixed(2)}
                                    </span>
                                </p>}
                            {cartSummary.additionalRenewalDisc > 0 &&
                                <p className="text-success">
                                    <span className={validate.isNotEmpty(cartSummary.additionalRenewalDisc) ? "dashed-dark":""} id="RenewalDiscount" onClick={()=>{OpenpopoverModel('RenewalDiscount')}}>Renewal Discount Applied</span>
                                    <span>
                                        -<strong className="rupee">&#x20B9;</strong>{parseFloat(cartSummary.additionalRenewalDisc).toFixed(2)}
                                    </span>
                                </p>}
                        </div>
                        <div className="footer border-top font-lg mb-0 mt-n2">
                            <span>Total Amount to be Paid</span>
                            <span>
                                <strong className="rupee">&#x20B9;</strong>{parseFloat(cartSummary.totalPrice).toFixed(2)}
                            </span>
                        </div>
                        {cartSummary.totalSavings && <div className="bg-success footer border-top font-lg mb-0">
                            <span>Total Savings</span>
                            <span>
                                <strong className="rupee">&#x20B9;</strong>{parseFloat(cartSummary.totalSavings).toFixed(2)}
                            </span>
                        </div>}
                    </div>}
                    {isUpgradeOrder &&
                        <div>
                            <div className="body">
                                <p>
                                    <span>No. Of Members</span>
                                    <span>{cartSummary.totalMembers}</span>
                                </p>
                            </div>
                            <div className="footer border-top font-lg mb-0 mt-n2">
                                <span>Total Amount to be Paid</span>
                                <span>
                                    <strong className="rupee">&#x20B9;</strong>{parseFloat(cartSummary.totalPrice).toFixed(2)}
                                </span>
                            </div>
                        </div>}
                </section>
            }
        </div>
    )
}
export default SubscriptionCartSummary;