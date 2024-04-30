import React, { useState, useEffect }  from 'react';
import CODLogo from '../../../images/common/cash-on-delivery-logo.png';
import COD2xLogo from '../../../images/common/cash-on-delivery-logo2x.png';
import RefreshCaptchaIcon from '../../../images/common/refresh-icn.png';
import RefreshCaptcha2xIcon from '../../../images/common/refresh-icn2x.png';
import COCLogo from '../../../images/common/Cash-on-Collection.svg';
import config from '../../../constants/ServerConfig'
import DoctorCategoryDefaultIcons from '../../../DoctorConsultation/constants/DoctorCategoryDefaultIcons';

const CODMode = (props)=>{
    
    const [showCaptcha, setShowCaptcha] = useState(false);

    const placeOrder = (event) => {
        if("Enter" === event.key){
            props.onPaymentSelect("C");
        }
    }
    return (
        <React.Fragment>
            <li>
                <div className={`select-payment-container cash-on-delivery-select ${props.selectedDiscount && Object.keys(props.selectedDiscount).includes("WALLET") ? " disabled" : ""}`}>
                    <div className="selected-payment" onClick={()=>setShowCaptcha(!showCaptcha)}>
                        {props.vertical=='mart' &&<img srcSet={`${CODLogo} 1x, ${COD2xLogo} 2x`} alt="Cash On Delivery" title=""/>}
                        {props.vertical=='lab' &&<img alt="Cash On Collection" title="" src={COCLogo}/>}
                        {props.vertical=='doctor' && 
                            DoctorCategoryDefaultIcons().getRelatedIcon("PAY_AT_CLINIC")
                        }
                        <p>
                        	{props.mode.displayName}
                        </p>
                    </div>

                    {showCaptcha && (props.selectedDiscount ? !Object.keys(props.selectedDiscount).includes("WALLET") : true) &&
                    <div className="captcha-section">
                        <p className="no-offer">
                            Enter the code and prove you are not a robot. 
                        </p>
                        <div className="row mx-0">
                            <div className="col pr-3">
                                <div className="captcha-container p-0">
                                    <span className="p-1">
                                        {props.captchaData && props.captchaData.captchaImgPath &&
                                        <img src={`${config.REDIRECT_HOME_URL}${props.captchaData.captchaImgPath}`}  className="img-fluid" alt="captcha" title="captcha"/>
                                        }
                                        {props.captchaData && props.captchaData.base64Image &&
                                        <img src={`data:image/png;base64,${props.captchaData.base64Image}`}  className="img-fluid" alt="captcha" title="captcha"/>
                                        }
                                    </span>
                                    <span className="p-1 border-left">
                                        <img srcSet={`${RefreshCaptchaIcon} 1x, ${RefreshCaptcha2xIcon} 2x`} alt="Refresh" title="Refresh" onClick={props.refreshCaptcha}/>
                                    </span>
                                </div>
                            </div>
                            <div className="col">
                                <input type="text" onChange={(event)=>props.handleOnChangeCaptcha(event.target.value)} value={props.captchaText} onKeyPress={(event) => placeOrder(event)} className="form-control mb-3 captcha-input-box" autoComplete="off"/>
                            </div>
                        </div>
                        {props.createOrderLoader ?
                        <button role="button" className="btn btn-brand-gradient rounded-pill btn-block">
                            <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                            <span className="sr-only"></span>
                        </button>:
                        <button role="button" className="btn btn-brand-gradient rounded-pill btn-block" onClick={()=> props.onPaymentSelect("C")}>
                            place the order
                        </button>
                        }
                        
                    </div>}
                </div>
            </li>
        </React.Fragment>
    )
}

export default CODMode