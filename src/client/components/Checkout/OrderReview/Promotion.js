import React, { useEffect, useState } from 'react';
import Validate from '../../../helpers/Validate';

const Promotion = (props) => {
    const promotionBanners = props.promotionBanners;
    const promotionType = props.promotionType;
    const validate = Validate();
    const [couponCode, setCouponCode] = useState(props.couponCode ? props.couponCode : "");
    const [header, setHeader] = useState(validate.isNotEmpty(props.header)?props.header:"Applicable Offers");
    let couponApplyMsg = null;
    let couponClass = "";
    let couponMessageClass = "";

    useEffect(()=> {
        setCouponCode(props.couponCode)
    },[props.couponCode])

    if(validate.isNotEmpty(props.applyCouponSuccessMsg) || validate.isNotEmpty(props.couponCode)){
        couponApplyMsg = props.applyCouponSuccessMsg;
        couponClass = "is-valid";
        couponMessageClass = "valid-feedback"
    }else if(validate.isNotEmpty(props.applyCouponFailureMsg)){
        couponApplyMsg = props.applyCouponFailureMsg;
        couponClass = "is-invalid";
        couponMessageClass = "invalid-feedback"
    }
    
    return (
        <React.Fragment>
           {promotionBanners && 
            <section className="select-offers border-dotted-green">
                <div className="header">
                    <p>{header}</p>
                </div>
                <div className="px-3 py-2">
                    <div className="input-group mb-2">
                            {couponClass && couponClass == 'is-valid' ? 
                                <input type="text" id="couponCode" className={`form-control ${couponClass}`} placeholder="Enter Coupon code" autoComplete="off" aria-label="Enter Coupon code" aria-describedby="button-apply" value={couponCode.toUpperCase()} readOnly={true} disabled={props.disableApplyCoupon}/>
                            : 
                                <input type="text" id="couponCode" className={`form-control ${couponClass}`} placeholder="Enter Coupon code" autoComplete="off" aria-label="Enter Coupon code" aria-describedby="button-apply" value={couponCode} onInput={e => setCouponCode(e.target.value)} disabled={props.disableApplyCoupon}/>
                            }
                        <div className="input-group-append">
                            {couponClass && couponClass == 'is-valid' ? 
                                <button className="btn btn-dark rounded-right" style={{minWidth:"75px"}} type="button"  role="button" onClick={() => {props.removeCouponCode(props.couponCode);setCouponCode("");}}>
                                    {props.isLoading ? 
                                        <React.Fragment>
                                            <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                                            <span className="sr-only"></span>
                                        </React.Fragment>
                                     : 
                                     "Remove"
                                    }
                                </button>
                            : 
                                <button className="btn btn-dark" type="button" role="button" style={{minWidth:"75px"}}  onClick={() => props.applyCouponCode(couponCode)} disabled={props.disableApplyCoupon}>
                                    {props.isLoading ? 
                                        <React.Fragment>
                                            <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                                            <span className="sr-only"></span>
                                        </React.Fragment>
                                     : 
                                     "Apply"
                                    }
                                </button>
                            }
                        </div>
                        {couponApplyMsg && 
                            <div className={couponMessageClass} id="button-apply">  {couponApplyMsg} </div>
                        }
                    </div>
                     {promotionBanners.DISCOUNT && 
                        <React.Fragment>
                             <label className={`${promotionType == "DISCOUNT" ? " active" : ""}`}>
                                 <img src={promotionBanners.DISCOUNT} alt="Discount on Medicines"/>
                            </label>
                            <hr className='border-bottom-0'/>
                        </React.Fragment>
                    }
                </div>
            </section>
           }
        </React.Fragment>
        )
}
    
export default Promotion;