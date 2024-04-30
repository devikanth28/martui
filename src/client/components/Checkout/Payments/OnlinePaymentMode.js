import React from 'react';
import AllPayLogo from '../../../images/common/all-payments-logo-cssbg.svg';
import CCLogo from '../../../images/common/credit-card-logo-cssbg.svg';
import DCLogo from '../../../images/common/debit-card-logo-cssbg.svg';
import NBLogo from '../../../images/common/net-banking-logo-cssbg.svg';

import Paytm1XLogo from '../../../images/common/paytm-logo.png';
import Paytm2XLogo from '../../../images/common/paytm-logo2x.png';
import Phonepe1XLogo from '../../../images/common/phone-pe-logo.png';
import Phonepe2XLogo from '../../../images/common/phone-pe-logo2x.png';
import Jiomoney1XLogo from '../../../images/common/jio-money-logo.png';
import Jiomoney2XLogo from '../../../images/common/ingenico-logo2x.png';
import Ebs1XLogo from '../../../images/common/ingenico-logo.png';
import Ebs2XLogo from '../../../images/common/ingenico-logo2x.png';
import Mobikwik1XLogo from '../../../images/common/mobikwik-logo.png';
import Mobikwik2XLogo from '../../../images/common/mobikwik-logo2x.png';
import Amazonpay1XLogo from '../../../images/common/amazon-pay-logo.png';
import Amazonpay2XLogo from '../../../images/common/amazon-pay-logo2x.png';
import UPIpay1XLogo from '../../../images/common/upi-payments-logo.png';
import UPIpay2XLogo from '../../../images/common/upi-payments-logo2x.png';
import PayU1XLogo from '../../../images/common/payu-logo.png';
import PayU2XLogo from '../../../images/common/payu-logo2x.png';
import Upii from '../../../images/common/upii-logo.svg';
import MwalletMode from './MwalletMode';

const OnlinePaymentMode = (props)=>{

    const btnLoader = props.createOrderLoader;

    return (
        <React.Fragment>
            {props.mode &&<li>
                <div className={`select-payment-container ${props.selectedDiscount && Object.keys(props.selectedDiscount).includes("WALLET") ? " disabled" : ""} ${props.activeClass?'active':''}`} onClick={()=>{props.setModeId && props?.setModeId(props.mode.modeId)}}>
                    <div className="selected-payment">
                        {/* props.mode.imgUrl &&<img srcSet={props.mode.imgUrl} alt={props.mode.displayName} title={props.mode.displayName}/> */}
                        {props.mode.modeId && (props.mode.modeId=='PPE') &&
                        <img srcSet={`${Phonepe1XLogo} 1x, ${Phonepe2XLogo} 2x`} alt={props.mode.displayName} title=""/>
                        }
                        {props.mode.modeId && (props.mode.modeId=='JM') &&
                            <img srcSet={`${Jiomoney1XLogo} 1x, ${Jiomoney2XLogo} 2x`} alt={props.mode.displayName} title="" />
                        }
                        {props.mode.modeId && (props.mode.modeId=='AMZPAY') &&
                            <img srcSet={`${Amazonpay1XLogo} 1x, ${Amazonpay2XLogo} 2x`} alt={props.mode.displayName} title="" />
                        }
                        {props.mode.modeId && (props.mode.modeId=='EBS') &&
                            <img srcSet={`${Ebs1XLogo} 1x, ${Ebs2XLogo} 2x`} alt={props.mode.displayName} title="" />
                        }
                        {props.mode.modeId && (props.mode.modeId=='MK') &&
                            <img srcSet={`${Mobikwik1XLogo} 1x, ${Mobikwik2XLogo} 2x`} alt={props.mode.displayName} title="" />
                        }
                        {props.mode.modeId && (props.mode.modeId=='PPI') &&
                            <img srcSet={`${Paytm1XLogo} 1x, ${Paytm2XLogo} 2x`} alt={props.mode.displayName} title="" />
                        }
                        {props.mode.modeId && props.mode.modeId=='PAYU' &&
                            <img srcset={`${PayU1XLogo} 1x, ${PayU2XLogo} 2x`} alt={props.mode.displayName} title="" />
                        }
                        {props.mode.modeId && props.mode.modeId=='RPAY' &&
                            <img srcSet={AllPayLogo} alt={props.mode.displayName} title="" />
                        }
                        {props.mode.modeId && props.mode.modeId=='CC' &&
                            <img srcSet={CCLogo} alt={props.mode.displayName} title="" />
                        }
                        {props.mode.modeId && props.mode.modeId=='DC' &&
                            <img srcSet={DCLogo} alt={props.mode.displayName} title="" />
                        }
                        {props.mode.modeId && props.mode.modeId=='NB' &&
                            <img srcSet={NBLogo} alt={props.mode.displayName} title="" />
                        }
                        {props.mode.modeId && (props.mode.modeId=='UPI') &&
                            <img srcSet={`${UPIpay1XLogo} 1x, ${UPIpay2XLogo} 2x`} alt={props.mode.displayName} title="" />
                        }

                        {props.mode.modeId && (props.mode.modeId == 'UPII') &&
                            <img srcSet={Upii} alt={props.mode.displayName} title="" />
                        }
                        
                        {props.mode.modeId === btnLoader ?
                        <button type="submit" role="button" className="btn btn-brand-gradient rounded-pill px-4 btn-show">
                            <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                            <span className="sr-only"></span>
                        </button>:
                        <button type="submit" role="button" className="btn btn-brand-gradient rounded-pill px-4" onClick={()=> {props.onPaymentSelect(props.mode.modeId,"O")}}>Pay
                        </button>
                        }
                        {props.mode.displayName &&<p className="w-100">
                            {props.mode.displayName}
                            {props.mode.modeId && props.mode.modeId=='PAYU' &&
                                <span class="small">- Powered by PayU</span>
                            }
                        </p>}
                    </div>
                    {props.mode.promotionText && 
                    <p> {props.mode.promotionText} </p>
                    }
                </div>
            </li>}
        </React.Fragment>
    )
}

export default OnlinePaymentMode