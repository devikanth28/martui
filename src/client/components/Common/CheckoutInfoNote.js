import React from 'react';
import NoteIconPath from '../../images/common/note-clr-icn.png';
import Validate from '../../helpers/Validate';

const CheckoutInfoNote = (props) => {
    const precriptionPageFlag= props.precriptionPageFlag;
    const netBankingPageflag= props.netBankingPageflag;
    const validate = Validate();
    return (
        <React.Fragment>
            <section className="info-note">
                <div className="text-center">
                    <img src={NoteIconPath} alt="Note" />
                    <p>NOTE:</p>
                </div>
                { (validate.isEmpty(netBankingPageflag) || !netBankingPageflag) && <ul className="m-0">
                    {validate.isNotEmpty(precriptionPageFlag) && precriptionPageFlag && <li>If you do not provide patient details, we shall consider login details as patient details and same will be printed on the invoice</li>}
                    <li>Prices of products may vary slightly based on batch. Final prices will be displayed prior to payment confirmation.</li>
                    <li>Statutory regulations mandate a valid prescription for buying prescription medicines. The user agrees to upload a copy or show the prescription to the store assistant prior to store pickup.</li>
                    <li>No delivery charges for community orders.</li>
                </ul> }
                { validate.isNotEmpty(netBankingPageflag) && netBankingPageflag && <ul className="m-0">
                    <li>We will redirect you to the bank you have chosen above. Once the bank verifies your net banking credentials, we will proceed with your payment.</li>
                    <li>I agree with the <a href="/privacyPolicy" className="mx-2 text-primary" target="_blank" title="Privacy Policy">Privacy Policy</a> by proceeding with this payment.</li>
                </ul> }
            </section>
        </React.Fragment>
    )
}

export default CheckoutInfoNote;