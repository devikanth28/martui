
import React from 'react';
import OfferImg from '../../../images/samples/10percent-off-img.jpg';

const PaymentOffer = (props)=>{
    return (
        <React.Fragment>
            <label className="radio-icn active">
                <img srcSet={OfferImg} alt="10% Off on Medicines"/>
            </label>
        </React.Fragment>
    )
}

export default PaymentOffer