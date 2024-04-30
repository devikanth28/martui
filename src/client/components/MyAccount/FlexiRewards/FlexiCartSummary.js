import React, { useState, useEffect } from 'react';
import Validate from '../../../helpers/Validate';
import moneyLogo from '../../../images/common/money.svg';

const FlexiCartSummary = (props) => {
    const totalBalancePoints = props.totalBalancePoints;
    const totalRedeemedPoints = props.totalGiftCartPoints;

    const validate = Validate();
    let shoppingCartItems = props.giftItemMap;
    let totalProducts = 0;
    if(validate.isNotEmpty(props.giftItemMap)){
        for (const [productId, product] of Object.entries(props.giftItemMap)) {
            totalProducts = totalProducts+1;
        }
    }

    return (
        <React.Fragment>
            {shoppingCartItems && 
                <React.Fragment>
                    <section className="cart-summary">
                        <div className="header">
                            {!props.isPayback ? <p>Points Summary</p> : <p>MedPlus Payback Points Summary</p>}
                        </div>
                        <div className="body">
                            <p>
                                <span><span>{props.isPayback ? "Total MedPlus Payback Points Available" : "Total Available Points"}</span>
                                <hr className="border-0"/>
                                <span className="display-3  text-body">{parseInt(totalBalancePoints)}</span></span>
                                <img srcset={moneyLogo} height="81" width="68"/>
                            </p>
                        </div>
                    </section>
                    <section className="cart-summary">
                        <div className="header">
                            <p>Cart Summary</p>
                        </div>
                        <div className="body">
                            <p><span>No. Of Items</span><span>{totalProducts}</span></p>				
                            {!props.isPayback && <p><span>Points To Be Redeemed</span><span>{parseInt(totalRedeemedPoints)} Pts</span></p> }
                            {props.isPayback && <p><span>MedPlus Payback points to be debited</span><span title="Payback Points">{parseInt(totalRedeemedPoints)}</span></p>}
                            {props.isPayback && validate.isNotEmpty(props.totalDiscount) && <p><span>Cash discount on MRP</span><span className="rupee mx-1 mt-1 font-14"> &#x20b9;<p className="ml-1 font-14 d-inline-block">{props.totalDiscount}</p></span></p>}
                            {!props.isPayback && <p><span>Balance Points</span><span>{parseInt(totalBalancePoints)} Pts</span></p>}
                        </div>
                        {props.isPayback && <div className='footer border-top'>
                            <p className='font-14'><span>Total Amount to be Paid</span> </p>
                            <div> 
                                <span className="rupee mx-1 mt-1 font-14"> &#x20b9;<p className="ml-1 font-14 d-inline-block">{props.totalAmount}</p>
                                </span>                          
                             </div>
                        </div> }
                    </section>
                </React.Fragment>
            }
        </React.Fragment>
    )
}

export default FlexiCartSummary;