
import React from 'react';

const AppliedPaymentOffer = (props)=>{
   let promotionBanners = props.promotionBanners;
    return (
        <React.Fragment>
        {promotionBanners &&
            <section className="select-offers border-dotted-green">
                <div className="header">
                    <p>{props.header}</p>
                </div>
                <div className="px-3 py-2">
                    {Object.keys(promotionBanners).map((key)=> {
                        return (
                            <React.Fragment>
                                {key == 'COUPON' &&
                                    <div className="mb-2">
                                        <input type="text" id="couponCode" value={promotionBanners?.key} className="form-control is-valid" placeholder="Enter Coupon code" autoComplete="off" aria-label="Enter Coupon code" aria-describedby="button-apply" readOnly="true"/>
                                        <div className="valid-feedback"> Coupon Applied Successfully </div>
                                    </div>
                                }
                                {promotionBanners != null &&
                                    <React.Fragment>
                                        {key == "DISCOUNT" && 
                                            <React.Fragment>
                                                <label className="active">
                                                    <img src={promotionBanners?.DISCOUNT} alt="Discount on Medicines"/>
                                                </label>
                                            </React.Fragment>
                                        }
                                    </React.Fragment>
                                }
                            </React.Fragment>
                        )
                    })}
                </div>
                {/* {(!props.isRetryPayment || "Y"!=props.isRetryPayment)&&
                <div className="footer border-top m-0">
                    <p><button className="btn btn-link btn-sm" onClick={props.handleOfferChange}>Click Here</button> to change the offer</p>
                </div>
                } */}
            </section>}
        </React.Fragment>
    )
}

export default AppliedPaymentOffer