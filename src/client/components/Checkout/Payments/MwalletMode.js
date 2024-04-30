import React from 'react';
import { useDispatch } from 'react-redux';
import WalletLogo from '../../../images/common/medplus-wallet-logo.png';
import Wallet2xLogo from '../../../images/common/medplus-wallet-logo2x.png';

const MwalletMode = (props)=>{

    const dispatch = useDispatch();

    return (
        <React.Fragment>
            {props.walletSummary && props.walletSummary.mwalletAmount >= props.cartTotal &&
            <li>
                <div className="select-payment-container">
                    <div className="selected-payment">
                        <img srcSet={`${WalletLogo} 1x, ${Wallet2xLogo} 2x`} alt={props.mode.diaplayName} title=""/>
                        {props.createOrderLoader ?
                        <button type="submit" className="btn btn-brand-gradient rounded-pill px-4 ">
                            <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                            <span className="sr-only"></span>
                        </button>:
                        <button type="submit" className="btn btn-brand-gradient rounded-pill px-4" onClick={()=>
                        props.ispayBack ? props.onPaymentSelect(props.mode.instrument,"O") : props.onPaymentSelect('MW') }>
                            Pay
                        </button>}
                    </div>
                </div>
            </li>}
            {props.walletSummary && props.walletSummary.mwalletAmount < props.cartTotal &&
            <li>
                <div className="select-payment-container medplus-wallet-select">
                    <div className="selected-payment">
                        <img srcSet={`${WalletLogo} 1x, ${Wallet2xLogo} 2x`} alt={props.mode.diaplayName} title=""/>
                        <button type="submit" className="btn btn-brand-gradient rounded-pill" onClick={()=>{
                        props.ispayBack ? props.onPaymentSelect(props.mode.instrument,"O") : props.onPaymentSelect('MW');
                            }}>ADD MONEY</button>
                    </div>
                    <p>
                        <span>MedPlusCash: <strong className="rupee">&#x20B9;</strong>{parseFloat(props.walletSummary.mwalletAmount).toFixed(2)}</span>
                    </p>
                    <div className="note-text">
                        <p className="mt-0">  
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 18 18">
                            <g transform="translate(-762 -1106)">
                                <path d="M9.563.563a9,9,0,1,0,9,9A9,9,0,0,0,9.563.563Zm0,3.992A1.524,1.524,0,1,1,8.038,6.079,1.524,1.524,0,0,1,9.563,4.554Zm2.032,9.218a.436.436,0,0,1-.435.435H7.966a.436.436,0,0,1-.435-.435V12.9a.436.436,0,0,1,.435-.435H8.4V10.143H7.966a.436.436,0,0,1-.435-.435V8.837A.436.436,0,0,1,7.966,8.4h2.323a.436.436,0,0,1,.435.435v3.629h.435a.436.436,0,0,1,.435.435Z" transform="translate(761.437 1105.438)"/>
                            </g>
                            </svg>
                            Insufficient Balance. Add money to Wallet</p>
                        {props.selectedDiscount && Object.keys(props.selectedDiscount).includes("WALLET")  &&
                        <p>
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 18 18">
                            <g transform="translate(-762 -1106)">
                                <path d="M9.563.563a9,9,0,1,0,9,9A9,9,0,0,0,9.563.563Zm0,3.992A1.524,1.524,0,1,1,8.038,6.079,1.524,1.524,0,0,1,9.563,4.554Zm2.032,9.218a.436.436,0,0,1-.435.435H7.966a.436.436,0,0,1-.435-.435V12.9a.436.436,0,0,1,.435-.435H8.4V10.143H7.966a.436.436,0,0,1-.435-.435V8.837A.436.436,0,0,1,7.966,8.4h2.323a.436.436,0,0,1,.435.435v3.629h.435a.436.436,0,0,1,.435.435Z" transform="translate(761.437 1105.438)"/>
                            </g>
                            </svg>
                            To select other payment options, Please change the promotion type.
                        </p>}
                    </div>
                </div>
            </li>}
        </React.Fragment>
    )
}

export default MwalletMode