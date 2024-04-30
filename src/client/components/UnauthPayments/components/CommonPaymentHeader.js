import React from "react";

const CommonPaymentHeader=(props)=>{
    return(
        <div className="payment-header">
            <header className="checkout-process navbar-expand-md">
                <nav className='navbar no-gutters'>
                    <div className="col">
                        <img srcSet={require("../../../images/common/mart-identity-cssbg.svg")} height="30" /* onClick={()=>{props.history.push("/")}} *//>
                    </div>
                </nav>
            </header>
        </div>
    )
}
export default CommonPaymentHeader;