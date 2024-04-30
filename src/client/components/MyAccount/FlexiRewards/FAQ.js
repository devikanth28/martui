import React, { useState, useEffect } from 'react';
import flexiRewardLogo from '../../../images/common/flexireward-bg-full.png';
import flexiRewardLogo2x from '../../../images/common/flexireward-bg-full2x.png';
import FlexiRewardGhostImage from './FlexiRewardGhostImage';
import felxirewardlogo from '../../../images/common/separators/separator-flexirewards-logo.svg'
import PaybackGifts from '../../../images/common/separators/Payback-banner-img.svg'

const FAQ = (props) => {

    const [loader, setLoader] = useState(true);

    useEffect(() => {
        setLoader(false);
    }, []);
    return (
        <React.Fragment>
            {!loader && <div id="FAQ">
                <div className="body ">
                    <section className="flexi-banner">
                        <div className="container-fluid">
                            <div className="row">
                                <div className='align-items-center col-4 d-flex'>
                                    <img src ={PaybackGifts} alt="Payback FAQ Banner" title='Payback FAQ Banner' className='d-block mx-auto  banner-img-padding'/>
                                </div>
                                <div className="col pb-2">
                                    <h1 className='mt-3'>MedPlus Payback Points</h1>
                                    <h6 className="strong my-3">With MedPlus Payback Points, you earn points for every purchase and still continue to enjoy your cash discount.</h6>
                                    <p className="title">Features of MedPlus Payback Points</p>
                                    <p>Every time you shop at MedPlus whether in store or online, you earn points along with your cash discount. These points can be used to purchase our wide range of special sale products at special prices.</p>
                                    <p>MedPlus Payback points have a validity of 3 years from the date they are earned.</p>
                                    <small className='d-block text-right'>*Terms &amp; Conditions Apply</small>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* <img alt="flexirewards image" srcset="images/common/flexireward-bg-full.png 1x, images/common/flexireward-bg-full2x.png 2x" class="img-fluid"  /> */}
                    {/* <img alt="flexirewards-image" srcSet={`${flexiRewardLogo} 1x, ${flexiRewardLogo2x} 2x`} className="img-fluid"  /> */}
                    <div className="p-3 flexirewards-faq">
                        <div className="col border-bottom-0 flexirewards-faqcontent">
                            <p className="question w-100">Why MedPlus Payback points?</p>
                            <p className="text-secondary w-100">With MedPlus Payback points, you earn points on every purchase at MedPlus (whether in store or online) and still continue to enjoy your cash discount. They give you an access to purchase from a wide range of special sale products at special prices.</p>
                            {/* <div className="faq-why-rewards imgpos"></div> */}
                        </div>
                        <div className="col border-bottom-0 flexirewards-faqcontent">
                            <p className="question w-100">How many points do I get per rupee?</p>
                            <p className="text-secondary w-100">You will get one MedPlus payback point per rupee of purchase.</p>
                            {/* <div className="faq-why-rewards imgpos"></div> */}
                        </div>
                        <div className="col border-bottom-0 flexirewards-faqcontent">
                            <p className="question w-100">Do the points get auto added to my MedPlus payback point wallet?</p>
                            <p className="text-secondary w-100">Yes. The MedPlus payback points will automatically get added to the wallet and you can check your points here&nbsp;<a href="/paybackspecialsale" title='Payback Special Sale'>Payback Special Sale</a>.</p>
                            {/* <div className="faq-why-rewards imgpos"></div> */}
                        </div>
                        <div className="col border-bottom-0 flexirewards-faqcontent">
                            <p className="question w-100">Do I need to separately subscribe for the MedPlus payback points?</p>
                            <p className="text-secondary w-100">No. Every MedPlus customer is automatically a subscriber of the MedPlus payback points account.</p>
                            {/* <div className="faq-why-rewards imgpos"></div> */}
                        </div>
                        <div className="col border-bottom-0 flexirewards-faqcontent">
                            <p className="question w-100">Where can I check my MedPlus payback points?</p>
                            <p className="text-secondary w-100">You can check your payback points here&nbsp;<a href="/paybackspecialsale" title='Payback Special Sale'>Payback Special Sale</a>.</p>
                            {/* <div className="faq-why-rewards imgpos"></div> */}
                        </div>
                        <div className="col border-bottom-0 flexirewards-faqcontent">
                            <p className="question w-100">How does MedPlus Payback Point work?</p>
                            <p className="text-secondary w-100">MedPlus Payback Points are awarded for every successful purchase without having to give away your cash discount. Points earned can be used for the purchase of our special sale products at special prices. </p>
                            <p className="text-secondary w-100">For complete MedPlus Payback Points Special sale product catalogue <a href="javascript:void(0)" onClick={()=>{ window.scrollTo({ top: 0, left: 0, behavior: "smooth" }); props.setTab(0)}} title='Special sale Product Catalogue'>click here</a></p>
                            {/* <div className="faq-reward-program imgpos"></div> */}
                        </div>
                        <div className="col border-bottom-0 flexirewards-faqcontent">
                            <p className="question w-100">Can I exchange the MedPlus Payback Points for cash?</p>
                            <p className="text-secondary w-100">The MedPlus Payback points earned cannot be exchanged for cash. These can only be used for the purchase of our special sale products.</p>
                            {/* <div className="faq-reward-program imgpos"></div> */}
                        </div>
                        <div className="col border-bottom-0 flexirewards-faqcontent">
                            <p className="question w-100">How long are MedPlus Payback Points valid?</p>
                            <p className="text-secondary w-100">MedPlus payback points have a validity of 3 years from the date they are awarded.</p>
                            {/* <div className="faq-reward-program imgpos"></div> */}
                        </div>
                        <div className="col border-bottom-0 flexirewards-faqcontent">
                            <p className="question w-100">Where can I use MedPlus Payback points to purchase products from Special Sale Catalog?</p>
                            <p className="text-secondary w-100">You can use MedPlus Payback points for the purchase of products from Special Sale Catalog at any <a href="/storelocator" title="Visit at MedPlus Store">MedPlus Store </a>or <a href="/" title='medplusmart.com' target="_blank" rel="noopener">www.medplusmart.com</a> or <a href="javascript:void(0)" title='MedPlus App'>MedPlus App</a>. You can view your point balance and history in My account section.</p>
                            <p className="text-secondary w-100"><sup>*</sup>Subject to stock availability.</p>
                            {/* <div className="faq-reward-points imgpos"></div> */}
                        </div>
                        <div className="col border-bottom-0 flexirewards-faqcontent">
                            <p className="question w-100">Can I return the products purchased from the special sale catalog?</p>
                            <p className="text-secondary w-100">No, you cannot return the products purchased from the special sale catalog.</p>
                            {/* <div className="faq-cash-points imgpos"></div> */}
                        </div>
                        <div className="col border-bottom-0 flexirewards-faqcontent">
                            <p className="question w-100">Will I have a warranty on products in the special sale catalog?</p>
                            <p className="text-secondary w-100">Warranty will be available on selected products only. </p>
                            {/* <div className="faq-cash-points imgpos"></div> */}
                        </div>
                        <div className="col border-bottom-0 flexirewards-faqcontent">
                            <p className="question w-100">Will I earn MedPlus Payback points on purchase of special sale catalog products?</p>
                            <p className="text-secondary w-100">No, you will not earn any additional MedPlus Payback points when you purchase a product from the special sale catalog.</p>
                            {/* <div className="faq-cash-points imgpos"></div> */}
                        </div>
                        <div className="col border-bottom-0 flexirewards-faqcontent">
                            <p className="question w-100">Can I transfer the MedPlus Payback points to my friends / relatives or any other customer?</p>
                            <p className="text-secondary w-100">No, MedPlus Payback points are non-transferrable.</p>
                            {/* <div className="faq-points-validity imgpos"></div> */}
                        </div>
                        <div className="col border-bottom-0 flexirewards-faqcontent">
                            <p className="question w-100">What products will be available under the special sale catalog?</p>
                            <p className="text-secondary w-100">A wide range of daily-use household items will be available for purchase under the special sale catalog. However, these products may vary from time to time subject to stock availability.</p>
                            {/* <div className="faq-account-balance imgpos"></div> */}
                        </div>
                        <div className="col flexirewards-faqcontent">
                            <p className="question w-100">Other important Terms &amp; Conditions for MedPlus Payback Points:</p>
                            <ol className="w-100 text-secondary">
                                <li>MedPlus Payback Points are awarded up on successful completion of a purchase whether in store or online.</li>
                                <li>For Online orders MedPlus Payback points are earned only upon successful delivery of the order. If the order is cancelled, you will not earn points for the transaction.</li>
                                <li>MedPlus Payback points once earned are available for immediate usage. </li>
                                <li>MedPlus Payback Points can also be used at anytime up to 3 years from the date of accrual.</li>
                                <li>MedPlus Payback Points cannot be converted to cash under any circumstances.</li>
                                <li>MedPlus Payback Points are non-transferrable.</li>
                                <li>Products purchased from the special sale catalog cannot be returned.</li>
                            </ol>
                        </div>
                        <div className="col flexirewards-faqcontent">
                            <p className="question w-100">Do MedPlus Payback Points apply on MedPlus Diagnostic purchases as well?</p>
                            <p className="text-secondary w-100">No, MedPlus Diagnostics purchases/transactions do not qualify for MedPlus Payback Points.</p>
                            {/* <div className="faq-account-balance imgpos"></div> */}
                        </div>
                    </div>
                </div>
            </div>}
            <FlexiRewardGhostImage FAQLoader={loader}></FlexiRewardGhostImage>
        </React.Fragment>
    )
}
export default FAQ;
