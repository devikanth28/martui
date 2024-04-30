import WalletLogo from '../../images/common/medplus-wallet-logo.png';
import Wallet2xLogo from '../../images/common/medplus-wallet-logo2x.png';
import React from 'react';


const ReloadWalletSection = (props)=>{

    return (
        <React.Fragment>
            <section className="body-height">
                <div className="header add-to-wallet-header">
                    <img className="mt-3" srcSet= {`${WalletLogo} 1x, ${Wallet2xLogo} 2x`} alt="Medplus Wallet" title="Medplus Wallet"/>
                    <h6 className="text-muted small mt-2">20% off on prescription medicines (Min. order value Rs 1000)</h6>
                    <h6 className="text-muted small mb-2">5% off on OTC &amp; general products (Min. order value Rs 200)</h6>
                </div>
                <div className="add-money-to-wallet p-4">
                    {!props.disableRechargeOptions &&
                    <AddBalance amount={props.amount} addAmount={props.addAmount} handleResetClick={props.handleResetClick}
                    minReloadAmt={props.finalWalletObj.minimumReloadAmount} selectPaymentMode={props.selectPaymentMode}/>
                    }
                </div>
            </section>
        </React.Fragment>
    )
}

export const AddBalance = (props) => {
    return(
        <React.Fragment>
            <div className="add-to-wallet-container">
                <h6 className="title">Add Money to Wallet</h6>
                <div className="button-container mb-3">
                    <input type="text" className="form-control" value={'₹'+ props.amount} disabled/>
                    {props.amount != props.minReloadAmt &&
                    <a href="javascript:void(0)" title="Reset" onClick={()=>props.handleResetClick()}>
                        Reset
                    </a>}
                </div>
                <div className="button-container">
                    <button className="btn success-secondary rounded-pill ml-0 px-3" onClick={()=>props.addAmount(500)}>
                        +500
                        <svg className="align-text-bottom ml-2" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                        <g transform="translate(-0.284 -0.17)">
                            <circle fill="#343a40" opacity="0.75" cx="9" cy="9" r="9" transform="translate(0.284 0.17)"/>
                            <path fill="#fff" d="M9.671-1.743H5.94V2.07H4.295V-1.743H.582V-3.217H4.295v-3.8H5.94v3.8H9.671Z" transform="translate(4.028 11.516)"/>
                        </g>
                        </svg>
                    </button>
                    <button className="btn success-secondary px-3 rounded-pill" onClick={()=>props.addAmount(1000)}>
                        +1000
                        <svg className="align-text-bottom ml-2" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                        <g transform="translate(-0.284 -0.17)">
                            <circle fill="#343a40" opacity="0.75" cx="9" cy="9" r="9" transform="translate(0.284 0.17)"/>
                            <path fill="#fff" d="M9.671-1.743H5.94V2.07H4.295V-1.743H.582V-3.217H4.295v-3.8H5.94v3.8H9.671Z" transform="translate(4.028 11.516)"/>
                        </g>
                        </svg>
                    </button>
                    <button className="btn success-secondary rounded-pill px-3" onClick={()=>props.addAmount(1500)}>
                        +1500
                        <svg className="align-text-bottom ml-2" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                        <g transform="translate(-0.284 -0.17)">
                            <circle fill="#343a40" opacity="0.75" cx="9" cy="9" r="9" transform="translate(0.284 0.17)"/>
                            <path fill="#fff" d="M9.671-1.743H5.94V2.07H4.295V-1.743H.582V-3.217H4.295v-3.8H5.94v3.8H9.671Z" transform="translate(4.028 11.516)"/>
                        </g>
                        </svg>
                    </button>
                </div>
            </div>
            <div className="add-to-wallet-container">
                <h6 className="title pt-2">Select Payment Mode</h6>
                <form onChange={(e)=>props.selectPaymentMode(e)}  className="form-inline" id="selectPayment">
                    <div className="input-group">
                        <div className="custom-control custom-radio">
                        <input type="radio" className="custom-control-input" id="credit-card" value = "CC" name="payment-mode" defaultChecked/>
                        <label className="custom-control-label" for="credit-card">Credit Card</label>
                        </div>
                    </div>
                    <div className="input-group">
                        <div className="custom-control custom-radio">
                        <input type="radio" className="custom-control-input" id="debit-card" value = "DC" name="payment-mode"/>
                        <label className="custom-control-label" for="debit-card">Debit Card</label>
                        </div>
                    </div>
                    <div className="input-group">
                        <div className="custom-control custom-radio">
                        <input type="radio" className="custom-control-input" id="net-banking" value = "NB" name="payment-mode"/>
                        <label className="custom-control-label" for="net-banking">Net Banking</label>
                        </div>
                    </div>
                </form>
            </div> 
        </React.Fragment>
    )
}
export default ReloadWalletSection;