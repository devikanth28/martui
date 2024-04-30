import React from 'react'
import PatientAddress from '../Labs/Common/PatientAddress'
import LabCartSummary from '../MedplusLabs/components/Common/LabCartSummary'

const PaymentModes = (props) => {
    const paymentModes = [
        {
            imgSrc : "https://static2.medplusmart.com/live/martpwa/V9/mCart/images/Credit-Card.svg",
            title : "All Credit Cards are accepted"
 
        },
        {
            imgSrc: "https://static2.medplusmart.com/live/martpwa/V9/mCart/images/Debit-Card.svg",
            title : "All Debit Cards are accepted"
        },
        {
            imgSrc : "https://static2.medplusmart.com/live/martpwa/V9/mCart/images/Net-Banking.svg",
            title : "All Banks Are Accepted"
        },
        {
            imgSrc : "https://static2.medplusmart.com/live/martpwa/V9/mCart/images/Paytm-Logo.svg",
            title : "Wallet / Postpaid / Credit Card / Debit Card"
        }
    ]
    return (
        <>
        <div className='row px-sm-3'>
        <div className='col-lg-8 col-12'>

        <section >
                        <div className="header">
                            <h4 className='my-2'>Payment Options</h4>
                        </div>
            <div class="payment-options pt-2">
                <ul>
                    {paymentModes.map((eachMode)=>{
                        return(
                            <li>
                                <div class="select-payment-container ">
                                    <div class="selected-payment">
                                        <div className='radio-btn-payment-mode'>
                                            <img srcset={eachMode?.imgSrc} alt="All Credit Cards are accepted" title={eachMode.title} />
                                            <button type="submit" role="button" class="btn btn-brand-gradient rounded-pill px-4">Pay</button>
                                        </div>
                                            <p class="w-100">{eachMode.title}</p>
                                            
                                    </div>
                            </div>
                        </li>
                        )
                    })}
                </ul>
            </div>
        </section>
        </div>
        <div className='col-lg-4 col-12'>
            <LabCartSummary itemsCount={5} totalPrice={1500} totalAmount={1500}/>
            <section className="delivery-detail mb-3">
            <div className="header">
                    <p>Collection Details</p>
                    {props.patientAddress ?
                    <span className="badge-title success right font-14">Home Sample Pickup</span>:
                    <span className="badge-title success right font-14">Sample Collection Center</span>
                    }
                </div>
                        <div className='body'>

                            <PatientAddress firstName={"KukatPally"}
                                lastName={"MedPlus Diagnostic Center"}
                                address1={"Metro Pillar No. C980, Above Max"}
                                address2={"Habsiguda X Roads"}
                                city={"Hyderabad"}
                                state={"Telengana"}
                                mobile={"040 23909890"} />
                        </div>
            </section>
        </div>
        </div>
        </>
    )
}

export default PaymentModes