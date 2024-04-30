import React, { useState, useEffect } from 'react';
import WaletBannerLogo from '../../../images/common/separators/separator-wallet-logo.svg';
import WalletBGImg from '../../../images/common/wallet-bg-full.png';
import WalletBG2XImg from '../../../images/common/wallet-bg-full2x.png';

const FAQ = (props) => {
    return (
        <React.Fragment>
            <div id='walletFAQ'>
                <div className="body">
                    <section class="wallet-banner">
                        <div class="container-fluid">
                            <div class="row">
                            <div class="banner-img-padding pb-2 col">
                                <img class="mt-5" src={WaletBannerLogo} alt="MedPlus Wallet" height="32" />
                                <h6 class="strong my-3">MedPlus Wallet is a prepaid wallet where you can load money &amp; use it for shopping at any MedPlus Store</h6>
                                <p>With MedPlus Wallet you can SAVE UPTO 20% On Every Purchase</p>
                            </div> 
                            <p class="tnc">*Terms &amp; Conditions Apply</p>
                            </div>
                        </div>
                    </section>
                <section className="wallet-faq p-3 mb-2">
                    <div className="col p-0">
                        <h6 className="mb-2 title">How do I sign up for MedPlus Wallet?</h6>
                        <p className="mb-4 ">The sign-up process if fairly simple. You can visit any MedPlus store, and provide details of your Name, Mobile Number, date of birth and Address on the form provided. Once an account is created, load up your wallet with a minimum of Rs.3000/- by cash or credit/debit card payment. You can start using the wallet account for payments immediately at any MedPlus store by providing the OTP that is sent to your registered mobile number for every transaction.</p>
                        <h6 className="mb-2 title ">What documents are accepted for KYC?</h6>
                        <p className="mb-4 ">If you load more than Rs 50000 in your MedPlus Wallet using cash in a Financial Year, you need to undergo the Full KYC process. Your PAN Card details will be required to complete the Full KYC process</p>
                        <h6 className="mb-2 title">How can I load money into the wallet? What is the minimum &amp; maximum allowed?</h6>
                        <p>You can fund your MedPlus Wallet account using Card (Credit/Debit) or Cash payment at any MedPlus store by providing your registered mobile number to the store employee.</p>
                        <p>When the current wallet balance is zero (This will be the case when you sign up initially or when you use up the entire available balance amount for any transaction), the minimum amount you can load is Rs.3000/-</p>
                        <p>When you load a wallet when there is an existing balance in the account, however minimum (Not less than a Rupee), you can load a minimum of Rs.1000/- and in increments thereof</p>
                        <p className="mb-4 ">The maximum wallet account balance at any time cannot exceed Rs.20000/-</p>
                        <h6 className="mb-2 title">Is there a time limit to the usage of money loaded in MedPlus Wallet?</h6>
                        <p>Yes, the money loaded into the MedPlus Wallet should be used in its entirety within 11 months from the date of credit. The remaining balance after 11 months, will automatically be transferred to an escrow account for safekeeping and will not be available for any transactions.</p>
                        <h6 className="mb-2 title">What happens if I return an item purchased using my MedPlus Wallet?</h6>
                        <p>For all the MedPlus wallet transactions, the net amount of return will always be credited back into your wallet. The refund amount cannot be paid out as cash or using any other payment mode.</p>
                        <h6 className="mb-2 title">Can money in MedPlus Wallet be refunded or transferred to a different account?</h6>
                        <p className="mb-4">No, once the money is added to the wallet, it cannot be refunded in the form of cash. The entire wallet balance has to be used for purchases only. Transfers to other wallets is also not allowed.</p>
                        <h6 className="mb-2 title">How do I know my Wallet is secure and how do I keep track of the balance available?</h6>
                        <p>For every wallet transaction, an OTP will be sent to your registered mobile number. This OTP should be entered by the store employee to complete the billing process &amp; only then the amount would be credited / debited, to / from the wallet.</p>
                        <p>You will also receive an SMS update or notification for every wallet transaction with details of the transaction and the available balance. Alternatively, you can also check your balance at any MedPlus store or by contacting our call centre <a href="tel:040-6700-6700" title='call us at 040-6700 6700'>(040-6700 6700)</a>.</p>
                        <p className="mb-4">Once online account is enabled, you will also be able to see all the transactions and the balance available online at MedPlusMart.com or in the MedPlus Mart app.</p>
                        <h6 className="mb-2 title">Can I use my wallet at any non MedPlus store?</h6>
                        <p className="mb-4">No. Since this is a closed wallet, you can use it for all transactions at any company owned <a href="/storelocator" title='MedPlus Store'>MedPlus Store</a> or while purchasing medicines at <a href="/" title='MedPlus home'>www.medplusmart.com </a>website or MedPlusmart app only. </p>
                        <h6 className="mb-2 title">Is there a time limit to the usage of money loaded in MedPlus Wallet?</h6>
                        <p className="mb-4">Yes, the money loaded into the MedPlus Wallet should be used in its entirety within 11 months from the date of credit. The remaining balance after this 11 months, will automatically be transferred to an escrow account for safekeeping and will not be available for any transactions.</p>
                        <h6 className="mb-2 title">What happens if I return an item purchased using my MedPlus Wallet?</h6>
                        <p>For all the wallet transactions, the net amount of return will always be credited back into your wallet as ordinary wallet cash. The amount cannot be paid out as cash or using any other payment mode.</p>
                        <p>However, products purchased with Flexicash cannot be returned or exchanged unless there is prior damage or manufacturer's defect at the time of purchase.</p>
                        <h6 className="mb-2 title">Can money in MedPlus Wallet be refunded or transferred to a different account?</h6>
                        <p className="mb-4">No, once the money is added to the wallet, it cannot be refunded in the form of cash. The entire wallet balance has to be used for purchases only. Transfers to other wallets is also not allowed.</p>
                        <h6 className="mb-2 title">How do I know my Wallet is secure and how do I keep track of the balance available?</h6>
                        <p>For every wallet transaction, an OTP will be sent to your registered mobile number. This OTP should be entered by the store employee to complete the billing process &amp; only then the amount would be credited / debited, to / from the wallet.</p>
                        <p>You will also receive an SMS update or notification for every wallet transaction with details of the transaction and the available balance. Alternatively, you can also check your balance at any <a href="/storelocator" title='MedPlus Store'>MedPlus Store</a> or by contacting our call centre <a href="tel:040-6700-6700" title='call us at 040-6700 6700'>(040-6700 6700)</a>.</p>
                        <p>Once online account is enabled, you will also be able to see all the transactions and the balance available online at <a href="/" title='MedPlus Home'>MedPlusMart.com</a> or in the MedPlus Mart app.</p>
                        <h6 className="mb-2 title">Can I use my wallet at any non MedPlus store?</h6>
                        <p className="mb-4">No. Since this is a closed wallet, you can use it for all transactions at any company owned <a href="/storelocator" title='MedPlus Store'>MedPlus Store</a> only. It will shortly be enabled for online transactions at Medplusmart.com and MedPlus App as well.</p>
                        <h6 className="mb-2 title">Can I pay for a transaction partly using the Wallet balance and combine it with another payment mode?</h6>
                        <p>Yes, if you do not have sufficient Wallet balance to pay for the transaction, you may pay the remaining balance amount in Cash or through Card. However, in this case, your Wallet balance will become zero and you will have to load your wallet with a minimum load of Rs. 3000/- the next time you want to use it.</p>
                        <p>This also means that if you choose to use your Wallet balance for paying for a transaction, you cannot combine it with another payment mode if there is sufficient amount available in the wallet to pay for the entire transaction.</p>
                        <p className="mb-4">A more convenient alternative would be to load your wallet prior to the transaction in any installment(s) of Rs. 1000/- in order to retain some balance even after your transaction.</p>
                        <h6 className="mb-2 title">What if I want to purchase more than 20,000 in a day?</h6>
                        <p className="mb-4">You could combine wallet payment with another payment mode as above.</p>
                        <h6 className="mb-2 title">Can I change the registered mobile number of my MedPlus Wallet account?</h6>
                        <p className="mb-4">Yes. You may call our customer care <a href="tel:040-6700-6700" title='call us at 040-6700 6700'>(040-6700 6700)</a> for the number change. Upon verifying your identity, our care representative will enable the change using an OTP confirmation.</p>
                        <h6 className="mb-2 title">Can another member of my family use my MedPlus Wallet?</h6>
                        <p className="mb-4">Yes. As long as they have access to the OTP sent to the registered mobile number, any family member can successfully make a purchase.</p>
                        <h6 className="mb-2 title">How do I receive information about the Wallet offers &amp; promotions?</h6>
                        <p className="mb-4">Unless you specifically opt out of our communication updates by informing our customer care, we will send you periodic communications about the offers available through email / WhatsApp / SMS/ or other forms of notifications.</p>
                        <h6 className="mb-2 title">What is the customer care number?</h6>
                        <p>You can choose to reach out and speak to our customer care executive by calling <a href="tel:040-6700-6700" title='call us at 040-6700 6700'>040-6700 6700</a> or you can write to us as <a href="mailto:wecare@medplusindia.com" title='write us at wecare@medplusindia.com' rel="noopener" target="_blank">wecare (at) medplusmart (dot) com</a></p>
                    </div>
                </section>
                </div>
                <section className="d-none">
                    <div className="ph-item mb-0 border-0 px-0 pb-0">
                    <div className="px-0">
                        <div className="ph-row">
                            <div className="ph-picture " style={{'height':"222px"}}></div>
                        </div>
                    </div>
                    </div>
                    <div className="ph-item mb-0 pt-3">
                    <div className="px-0">
                        <div className="ph-row mb-0">
                            <div className="ph-col-6"></div>
                            <div className="ph-col-6 empty"></div>
                            <div className="ph-col-12"></div>
                            <div className="ph-col-2"></div>
                        </div>
                    </div>
                    </div>
                    <div className="ph-item mb-0 pt-3">
                    <div className="px-0">
                        <div className="ph-row mb-0">
                            <div className="ph-col-6"></div>
                            <div className="ph-col-6 empty"></div>
                            <div className="ph-col-12"></div>
                            <div className="ph-col-2"></div>
                        </div>
                    </div>
                    </div>
                    <div className="ph-item mb-0 pt-3">
                    <div className="px-0">
                        <div className="ph-row mb-0">
                            <div className="ph-col-6"></div>
                            <div className="ph-col-6 empty"></div>
                            <div className="ph-col-12"></div>
                            <div className="ph-col-2"></div>
                        </div>
                    </div>
                    </div>
                    <div className="ph-item mb-0 pt-3">
                    <div className="px-0">
                        <div className="ph-row mb-0">
                            <div className="ph-col-6"></div>
                            <div className="ph-col-6 empty"></div>
                            <div className="ph-col-12"></div>
                            <div className="ph-col-2"></div>
                        </div>
                    </div>
                    </div>
                    <div className="ph-item mb-0 pt-3">
                    <div className="px-0">
                        <div className="ph-row mb-0">
                            <div className="ph-col-6"></div>
                            <div className="ph-col-6 empty"></div>
                            <div className="ph-col-12"></div>
                            <div className="ph-col-2"></div>
                        </div>
                    </div>
                    </div>
                    <div className="ph-item mb-0 pt-3">
                    <div className="px-0">
                        <div className="ph-row mb-0">
                            <div className="ph-col-6"></div>
                            <div className="ph-col-6 empty"></div>
                            <div className="ph-col-12"></div>
                            <div className="ph-col-2"></div>
                        </div>
                    </div>
                    </div>
                    <div className="ph-item mb-0 pt-3">
                    <div className="px-0">
                        <div className="ph-row mb-0">
                            <div className="ph-col-6"></div>
                            <div className="ph-col-6 empty"></div>
                            <div className="ph-col-12"></div>
                            <div className="ph-col-2"></div>
                        </div>
                    </div>
                    </div>
                </section>
            </div>
        </React.Fragment>
    )
}

export default FAQ