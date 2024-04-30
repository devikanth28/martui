import React, { useEffect } from "react";
import BreadCrumbAction from "../../../../../redux/action/BreadCrumbAction";
import MetaTitle from "../../../../commonComponents/MetaTitle";

const WalletTermsandConditions = (props) => {

    const breadCrumbAction = BreadCrumbAction();
    useEffect(() => {
        breadCrumbAction.pushBreadCrumbs({ name: 'Wallet Terms & Conditions', url: props.location.pathname });
    }, []);

    return (
        <React.Fragment>
            <MetaTitle metaKey={'TERMS_AND_CONDITIONS'} defaultValue={"Wallet Terms & Conditions - MedPlusMart"}/>
            <section className="wallet-terms-conditions container-fluid">
                <div className="generalDetail d-flex justify-content-center">
                    <div className="w-75">
                        <div className="flexirewards-faqcontent">
                            <h1 className="h3 mt-0">Terms and conditions of use of MedPlus Wallet</h1>
                            <p><strong>Note:</strong> Please read these terms and conditions carefully by accessing or using this mobile application or website.By accepting these terms and conditions, you agree to be bound by the terms and conditions described herein and all the terms and conditions incorporated by reference. If you do not agree to all of these terms and conditions, do not use this wallet services.</p>
                            <h3 className="question">Introduction</h3>
                            <p>Optival Health Solutions Private Limited (henceforth referred to as 'MedPlus'), the owner and operator of physical pharmacy and general stores <strong>(MedPlus PS)</strong> under the 'MedPlus' brand name and the e-commerce store <strong>(MedPlusWS)</strong> under the 'MedPlus Mart' name with  website address <a href="https://www.medplusmart.com" title="medplusMart.com" aria-label="link to MedPlusMart home page">https://www.medplusmart.com</a> and MedPlus Mart App, has launched 'MedPlus Wallet', a digital closed-loop PPI (prepaid payment instrument), for the benefit of its customers in order to facilitate easy and convenient payments and provide rebates for purchases made at MedPlus PS &amp; MedPlus WS.</p>
                        </div>
                        <div className="flexirewards-faqcontent">
                            <p className="question">Requirements for registration for MedPlus Wallet</p>
                            <p>Registration is open to all customers who satisfy all of the following criteria: </p>
                            <ol>
                                <li>Customer is a resident of India</li>
                                <li>Customer has attained 18 years of age</li>
                                <li>Customer has a valid mobile number </li>
                                <li>Customer is a registered MedPlus customer with a valid MedPlus ID or registered mobile number</li>
                                <li>Customer is able to complete the registration process successfully</li>
                            </ol>
                            <p className="question">Completion of registration for MedPlus Wallet</p>
                            <p>New customers or first-time users of MedPlus services will be required to register on the MedPlus website/ mobile application by providing the details such as Full name, Email id and Mobile Number or alternatively can visit MedPlus PS for the same.Customers who have met the requirements stated above will be sent an OTP (one-time password) on their Registered Mobile Number (RMN) to complete the registration process for MedPlus Wallet. This can be accomplished at any MedPlus PS by submitting the OTP to the store assistant who is helping the customer in this process or self-verification online at MedPlus WS. Customer will receive an SMS indicating successful registration. In order to avail MedPlus wallet services, the customer will be required tologin to the MedPlus wallet through the mobile application or the website (<a href="https://www.medplusmart.com" tilte="medplusMart.com">www.medplusmart.com</a>) and accept these terms and conditions.</p>
                            <p>Please note that if the customer meets the registration requirements for MedPlusWalletas stated above but is not a registered MedPlus customer, then the customer will be required to sign up as a registered MedPlus customer at any MedPlus PS or MedPlus WS and register for MedPlus Wallet subsequently.</p>
                        </div>
                        <div className="flexirewards-faqcontent">
                            <p className="question">KYC process</p>
                            <p>In certain cases, where MedPlus accepts refund request, customer is required to fill &amp; submit a form to complete the MedPlus Wallet KYC process. MedPlus team will verify the submitted details against the details on record with MedPlus for the same customer, to successfully complete the KYC process. The required form may be submitted at any MedPlus PS or online at MedPlus WS.</p>
                            <p className="question">MedPlus Wallet: glossary of terms</p>
                            <ol>
                                <li>Wallet account balance/ Wallet balance - The money stored and available for purchases in the MedPlus Wallet account (Total of MedPlusCash and FlexiCash)</li>
                                <li><strong>Wallet load</strong> - Money credited to the wallet account through payment of cash or by credit or debit card at any MedPlus PS or at MedPlus WS </li>
                                <li><strong>Wallet spend</strong> - Money debited from the wallet account towards purchase of goods and/or services at MedPlus PS or MedPlus WS</li>
                                <li><strong>Date of credit</strong> - The calendar day on which the money is loaded in to the wallet</li>
                                <li><strong>Flexi Catalogue</strong> - An assortment of products available for purchase at any MedPlus PS or MedPlus WS exclusively for MedPlus Wallet account holders by paying FlexiCash </li>
                                <li><strong>FlexiCash</strong> - A specially designated portion of the wallet balance which can be used for purchasing products from the Flexi Catalogue. FlexiCash can also be used for all other purchases at MedPlus PS or MedPlus WS</li>
                                <li><strong>MedPlusCash</strong> - All remaining balance in the MedPlus Wallet account that is not designated as FlexiCash. MedPlusCash can be utilized for purchase of any goods or service from MedPlus PS or MedPlus WS except products from the Flexi Catalogue</li>
                                <li><strong>Date of expiry</strong> - Any amount loaded or reloaded in the MedPlus Wallet will have a validity of 11 months from the date of loading that amount .On the first of every month, the wallet account balance satisfying the condition of 11 months will become unavailable for purchases of goods and services as it shall be forfeited by the company. However, MedPlus Mart will caution the customer/wallet holder at reasonable intervals, during the 30 days' period prior to expiry of validity period of MedPlus wallet balance.</li>
                            </ol>
                            <p className="question">Wallet load guidelines</p>
                            <ol>
                                <li>Customer can load money into MedPlus Wallet account from any MedPlus PS or MedPlus WS. Accepted forms of payment for wallet load includes: cash (MedPlus PS), domestic credit/debit card, or net banking (MedPlus WS only)</li>
                                <li>International cards, travel cards, foreign currency, or transfer of money from other electronic/digital wallets are not allowed for wallet load.</li>
                                <li>For all wallet loads, 20% of the loaded amount is designated as FlexiCash, the balance amount (80% of each wallet load) is designated as MedPlusCash.<br />Example: If a customer loads INR 3000 into MedPlus Wallet, INR 2400 is credited as MedPlusCash &amp; INR 600 is credited as FlexiCash</li>
                                <li>Allowed wallet loads are INR 500, INR 1000, or INR 3000 or increments of those amounts subject to the following conditions:<br />
                                    For all first wallet loads (First time after registration) and all subsequent wallet loads where the current wallet account balance is zero (0), the minimum load is INR 3000. Additional amount in excess of INR 3000 can be loaded in multiples of INR 500 only, subject to the pertinent daily limits and total wallet account balance limit<br />
                                    For all repeat wallet loads where the current wallet account balance is not zero, the minimum load is INR 1000. Additional amount in excess of INR 1000 can be loaded in multiples of INR 500 only subject to the pertinent daily limits and total wallet account balance limit
                                </li>
                                <li>Customers loading <strong>more than  <span className="rupee">&#x20B9;</span>50,000 (using cash)</strong> to their MedPlus Wallet in a financial year, will require to submit their PAN Card at any MedPlus PS or online at MedPlus WS, failing which the customer's MedPlus Wallet account will be blocked temporarily</li>
                            </ol>
                            <p className="question">Wallet spend guidelines</p>
                            <ol>
                                <li>MedPlus Wallet is a closed PPI and the wallet balance can only be used towards purchase of goods and services from MedPlus and its group companies.</li>
                                <li>FlexiCash is a specially designated portion of wallet balance that enables the purchase of products from Flexi Catalogue at highly attractive discounts. However, if the customer so desires, it can be used towards any purchase at MedPlus.</li>
                                <li>The customer is allowed to use the entire balance in the MedPlus wallet towards any purchase at MedPlus, however different wallet load rules apply when the account balance goes to zero(0). Please review the wallet load guidelines above for further information.</li>
                                <li>All Wallet spends require an OTPto be sent to the RMN for successful completion of the transaction at MedPlus PS. In case of MedPlus WS, customers who are logged in will be able to spend money from their Wallet balance directly without an OTP.</li>
                            </ol>
                        </div>
                        <div className="flexirewards-faqcontent">
                            <p className="question">Fees &amp; Charges</p>
                            <p>MedPlus does not charge any additional fees for loading money or spending money through the MedPlus Wallet. No interest is paid on the wallet account balance.</p>
                            <p>Wallet transaction limits</p>
                            <div className="w-75">
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Nature of Transaction</th>
                                            <th>Daily Limit <span className="rupee">&#x20B9;</span></th>
                                            <th>Monthly Limit <span className="rupee">&#x20B9;</span></th>
                                            <th>Yearly Limit <span className="rupee">&#x20B9;</span></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Wallet load</td>
                                            <td>20,000</td>
                                            <td>50,000</td>
                                            <td>1,80,000</td>
                                        </tr>
                                        <tr>
                                            <td>Wallet spend</td>
                                            <td>20,000</td>
                                            <td>50,000</td>
                                            <td>1,80,000</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p>Non transferability of MedPlus Wallet</p>
                            <ol>
                                <li>Only one MedPlus Wallet account can be opened and maintained by each registered customer.</li>
                                <li>Transfer of Wallet account balance between different MedPlus wallet accounts is not permitted</li>
                                <li>Transfer of MedPlus Wallet account balance from or to any other electronic/digital wallet is not permitted</li>
                                <li>Reversal of MedPlus Wallet account balance to any bank or credit card account or withdrawal in the form of cash is not permitted</li>
                            </ol>
                            <p className="question">Closure of Wallet account</p>
                            <p>Customer, at his discretion, can request for closure of MedPlus wallet account. For initiating such a request, the customer is required to contact MedPlus customer care at the number provided below.<br />
                                Customer care will verify the request and ask for a confirmation message from the RMN prior to processing the request. Any wallet amount balance at the time of closure is considered forfeited, hence it is the responsibility of the customer to ensure that the wallet account balance is zero prior to requesting closure of the account.</p>
                            <p className="question">Expiry of Wallet account balance</p>
                            <p>Any amount loaded or reloaded in the MedPlus Wallet will have a validity of 11 months from the date of loading that amount.</p>
                            <p>MedPlus will send periodic reminders to the customers with Wallet balance at various intervals, during the 30 days' period prior to the expiry date through SMS and/or other communication channels. Customers will also be able to check their account balance through their online wallet account at MedPlus WS (Website &amp; App) on a real time basis.</p>
                            <p>Wallet balance unused after 11 months from the date of last credit will be forfeited. Such amount cannot be used for any further wallet spends nor can be reclaimed by the customer.<br />
                                Customers are requested to monitor their accounts closely to avoid expiry of wallet balance.</p>
                            <p className="question">Fraud &amp; Suspension of Wallet account</p>
                            <p>In case of any suspected fraudulent use of the Wallet account, the customer is requested to contact our customer care immediately. The account will be held in suspension until the matter is investigated and resolved. No wallet transactions, load or spend are allowed in a suspended account.</p>
                            <p>Customer is obligated to use the MedPlus Wallet balance as per the provisions of these T&amp;Cs and other norms prescribed by MedPlus from time to time. Any activity in contravention of such provisions may lead to suspension of the MedPlus Wallet account, solely at the discretion of MedPlus.</p>
                            <p className="question">Change of Registered Mobile Number</p>
                            <p>To prevent misuse, all customer requests for change of registered mobile number are handled through our customer care department only. Customers are requested to contact customer care at the number provided below. Please note that MedPlus staff at MedPlus PS will not be able to assist customers in this regard.</p>
                            <p>A request for change of RMN requires the customer to either provide proof in the form of phone bills for the RMN and the new phone number in the registered name, or confirmation via an OTP sent to the RMN.</p>
                            <p className="question">Returns and refunds for Wallet transactions</p>
                            <ol>
                                <li>In case of product returns for purchases using MedPlus Wallet balance, other than products from Flexi Catalogue, the same terms &amp; conditions applicable to all MedPlus purchases in general will apply. However, any refunds resulting from such a return will be credited to the Wallet account balance only. Further, all refund amount will be designated as MedPlusCash (Regardless of whether MedPlusCash or FlexiCash is used for the purchase transaction).</li>
                                <li>Products purchased using FlexiCash from the Flexi Catalogue cannot be returned. An exchange or repair service is provided as applicable.</li>
                                <li>Any amount added to MedPlus Wallet can't be refunded to the customer in cash or any other form.</li>
                            </ol>
                            <p className="question">Changes to terms &amp; conditions</p>
                            <p>MedPlus reserves the right to make changes to the T&amp;Cs governing MedPlus Wallet, at any time through its sole discretion. All terms and conditions are applicable to the extent permitted by law. By continuing usage of MedPlus Wallet, customer agrees to be bound by such changes/revisions of these terms &amp; conditions.</p>
                            <p className="question">Governing Law and Jurisdiction</p>
                            <p>These terms and conditions are governed by and construed in accordance with the laws of India. Customer agrees to submit to the exclusive jurisdiction of the courts at Hyderabad. Customer agrees to indemnify MedPlus for all claims arising out of or in connection with a breach of any of these T&amp;Cs and customer's use of MedPlus Wallet balance.</p>
                            <p className="question">Entire Terms and Conditions, Construction</p>
                            <p>These terms and conditions are between you and MedPlus. These terms and conditions will supersede all prior proposals and all or any other prior arrangement/agreements. In the event that any provision of these terms and conditions shall be determined to be illegal or unenforceable, that provision will be eliminated to the minimum extent necessary so that these terms and conditions shall otherwise remain in full force, effect and shall be enforceable. Headings herein are for convenience of reference only and shall in no way affect interpretation of these terms and conditions.</p>
                            <p className="question">Contact Information</p>
                            <p>Customers can also refer to the MedPlus Wallet FAQs section in the MedPlus WS for further information. In case of any questions, comments or complaints related to MedPlus Wallet,<br /> please contact our customer care at  <a href="mailto:wecare@medplusindia.com" title="write us at wecare@medplusindia.com" aria-label="write us at wecare@medplusindia.com">wecare@medplusindia.com</a> or call <strong>040 - 6700 6700.</strong></p>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}
export default WalletTermsandConditions