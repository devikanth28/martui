import React, { useState } from "react";
import Validate from "../../../helpers/Validate";
import OnlinePaymentMode from "../../Checkout/Payments/OnlinePaymentMode";

const CommonPaymentModes = (props) => {
    const validate = Validate();
    return (
        <div>
            <section>
                <div className="header mb-0">
                    <h4 className='my-2'>Payment Options</h4>
                </div>
                <div class="payment-options crm-payment-options">
                    <ul>
                        {validate.isNotEmpty(props.paymentModes) && Object.keys(props.paymentModes).map((key) => {
                            const paymentMode = { modeId: key, ...props.paymentModes[key] }
                            if(key == "COD" || key == "MW"){
                                return;
                            }
                            return (
                                <OnlinePaymentMode mode={paymentMode} onPaymentSelect={(modeId, paymentType) => { props.handleClickOnPay(modeId, paymentType) }} createOrderLoader={props?.paymentLoading ? props.selectedModeId : undefined} activeClass={props.selectedModeId==key} setModeId={props.setModeId}/>
                            )
                        })}
                    </ul>
                </div>
            </section>
        </div>
    )
}
export default CommonPaymentModes;