import React from 'react';
import Validate from '../../helpers/Validate';

const ApplicableOffers = (props) => {

    const validate = Validate();
    const promotionBanners = props.promotionBanners;
    const paymentBanners = props.paymentBanners;

    return (
        <React.Fragment>
            {(validate.isNotEmpty(promotionBanners) || validate.isNotEmpty(paymentBanners)) &&
                <section className="applicable-offers border-dotted-green">
                    <div className="header">
                        <p>Applicable Offers</p>
                    </div>
                    <div className="px-3 py-2">
                        {!props.isNewCheckoutPromotionEnabled &&
                            <React.Fragment>
                                <p className="text-secondary small mb-1">Offer can be selected on promotions and review page before final checkout</p>
                                {validate.isNotEmpty(promotionBanners) && 
                                    Object.entries(promotionBanners).map(([bannerKey, bannerValue]) => {
                                        return(bannerKey && bannerValue && <React.Fragment key={bannerKey}><hr className='border-bottom-0'/><img src={bannerValue} alt={bannerKey}/></React.Fragment>)
                                    })
                                }
                            </React.Fragment>
                        }
                        {props.isNewCheckoutPromotionEnabled &&
                            <React.Fragment>
                                <p className="text-secondary small mb-1">Coupon code can be applied on review page before final checkout</p>
                                {validate.isNotEmpty(promotionBanners) && 
                                    Object.entries(promotionBanners).map(([bannerKey, bannerValue]) => {
                                        return(bannerKey && bannerValue && <React.Fragment key={bannerKey}><hr className='border-bottom-0'/><label className={`pointer ${props.appliedPromotionType == bannerKey ? " active" : ""}`}><img src={bannerValue} alt={bannerKey}/></label></React.Fragment>)
                                    })
                                }
                            </React.Fragment>
                        }
                        {validate.isNotEmpty(paymentBanners) && 
                            Object.entries(paymentBanners).map(([bannerKey, bannerValue]) => {
                                return(bannerKey && bannerValue && <React.Fragment key={bannerKey}><hr className='border-bottom-0'/><img src={bannerValue} alt={bannerKey}/></React.Fragment>)
                            })
                        }
                    </div>
                </section>
            }
        </React.Fragment>
    )
}

export default ApplicableOffers;