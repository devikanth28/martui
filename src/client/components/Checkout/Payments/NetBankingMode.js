import React, {useState} from 'react';
import SelectSearch from 'react-select-search/dist/cjs/index.js';
import CheckoutInfoNote from '../../Common/CheckoutInfoNote';

const NetBankingMode = (props) => {
    const [selectedBankCode, setSelectedBankCode] = useState("");
    let allBankOption = new Array();
    props.bankList.ALLBANKS.map(eachBank =>{
        allBankOption.push({'name':eachBank.bankName, 'value':eachBank.bankId});
    })
    const eachNetBank = (props, option, snapshot, className) =>{
        return (
            <button {...props} className={`btn ${option.value==selectedBankCode?" active":""}`} type="button" role="button">
                <span>{option.name}</span>
            </button>
        );
    }
    
    return(
        <React.Fragment>
            <section>
                <div className="net-banking-payment-mode">
                    <div className="header">
                        <a title="Back to Payment Options" onClick={props.handleBackClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <g transform="translate(-48.941 -316.765)">
                                    <rect fill="none" width="24" height="24" transform="translate(48.941 316.765)"/>
                                    <path fill="#e71c37" d="M59.108,319.236a.915.915,0,0,0-.6.238l-9.3,8.706a.938.938,0,0,0,0,1.312l9.3,8.586a.945.945,0,0,0,1.312-.119.936.936,0,0,0,0-1.312l-7.394-6.917H71.987a.954.954,0,0,0,0-1.908H52.429l7.513-6.917a.847.847,0,0,0,.358-.715,1.7,1.7,0,0,0-.238-.716A5.386,5.386,0,0,0,59.108,319.236Z" transform="translate(0 -0.471)"/>
                                </g>
                            </svg>
                            Back to Payment Options
                        </a>
                        <div>
                            Amount to be paid
                            <h6 className="payment-amount">₹ {props.totalPayble}</h6>
                        </div>
                    </div>
                    <h6 className="bank-title">
                        Select any Bank to Pay
                    </h6>
                    <div className="select-bank-container">
                        {props.bankList && props.bankList.TOPBANKS && props.bankList.TOPBANKS.map(eachTopBank => {
                            return(
                                <div className="each-bank" id={eachTopBank.bankId} onClick={()=>setSelectedBankCode(eachTopBank.bankId)}>
                                    <div className={`content ${eachTopBank.bankId==selectedBankCode ? " active":""}`}>
                                        <img src={eachTopBank.imageUrl} alt={eachTopBank.bankName} title={eachTopBank.bankName} />
                                        <p className="text-truncate" title={eachTopBank.bankName}>{eachTopBank.bankName}</p>
                                    </div>  
                                </div>
                            )
                        })}
                    </div>
                    {props.bankList.ALLBANKS &&
                    <React.Fragment>
                        <h6 class="bank-title mt-4">Search &amp; Select Bank</h6>
                        <div className="select-banks-dropdown-container">
                         <SelectSearch 
                            onChange={setSelectedBankCode}
                            value={selectedBankCode}
                            className="select-net-bank" 
                            options={allBankOption} 
                            renderOption={eachNetBank}
                            search
                            placeholder="Search and Select from all other Banks" />
                        </div>
                    </React.Fragment>}
                    <div class="net-banking-footer">
                        <button role="button" class="brand-secondary btn mr-3 px-5 custom-btn-lg rounded-pill" onClick={props.handleBackClick}>
                            Back        
                        </button>
                        {props.createOrderLoader ?
                        <button role="button" class="btn btn-brand-gradient px-5 custom-btn-lg">
                            <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                            <span className="sr-only"></span>
                        </button> :
                        <button role="button" class="btn btn-brand-gradient custom-btn-lg rounded-pill px-5" onClick={()=>{props.onPaymentSelect(selectedBankCode)}}>
                            Pay ₹ {props.totalPayble}
                        </button>}
                    </div>
                </div>
            </section>
            <CheckoutInfoNote netBankingPageflag="true" />
        </React.Fragment>
    )
}

export default NetBankingMode;
