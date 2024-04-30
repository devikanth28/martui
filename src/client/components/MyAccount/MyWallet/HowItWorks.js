import React, { useState, useEffect } from 'react';
import WalletBGImg from '../../../images/common/wallet-bg-full.png';
import WalletBG2XImg from '../../../images/common/wallet-bg-full2x.png';
import WaletBannerLogo from '../../../images/common/separators/separator-wallet-logo.svg';
import Add4000Img from '../../../images/common/4000.png';
import Add6000Img from '../../../images/common/6000.png';
import Add9000Img from '../../../images/common/9000.png';


const HowItWorks = (props) => {
    return (
        <React.Fragment>
            <div id="walletWorks">
                <div className="body">
                    <section class="wallet-banner">
                        <div class="container-fluid">
                            <div class="row">
                            <div class="banner-img-padding pb-2 col">
                                <img class="mt-3" src={WaletBannerLogo} alt="MedPlus Wallet" height="32" />
                                <h6 class="strong my-3">MedPlus Wallet is a prepaid wallet where you can load money & use it for shopping at any MedPlus Store</h6>
                                <p class="title">Benefits of MedPlus Wallet</p>
                                <p>With MedPlus Wallet you can save upto 60% on all medicine purchases</p>
                                <p>Enjoy exclusive offers of upto 50% off on FMCG & General products</p>
                                <p>Access to select products from the FlexiCash Catalogue at deep discounts</p>
                            </div> 
                            <p class="tnc">*Terms & Conditions Apply</p>
                            </div>
                        </div>
                    </section>
                    {/* <img alt="MedplusWallet" srcset={`${WalletBGImg} 1x, ${WalletBG2XImg} 2x`} className="img-fluid border-bottom"/> */}
                    <section className="wallet-faq p-3 mb-2">
                        <h6 className="mb-2 title">Why MedPlus Wallet?</h6>
                        <p className="mb-4 text-secondary">MedPlus Wallet is a prepaid wallet where you can load money &amp; use it for shopping at any MedPlus Store</p>
                        <div className="row p-0">
                        <div className="col-6 mb-3">
                            <h6 className="mb-2 title">Benefits</h6>
                            <ul className="disc mb-4 text-secondary">
                                <li >With MedPlus Wallet you can save upto 60% on all medicine purchases</li>
                                <li >Enjoy exclusive offers of upto 50% off on FMCG &amp; General products</li>
                                <li >Access to select products from the FlexiCash Catalogue at deep discounts</li>
                            </ul>
                        </div>
                        <div className="col-6 mb-3">
                            <h6 className="mb-2 title">How it works?</h6>
                            <ul className="disc mb-0 text-secondary">
                                <li >Visit any MedPlus outlet to get registered for the MedPlus Wallet</li>
                                <li ><sup>*</sup>The wallet has to be loaded by a minimum of Rs 3000 for the first time</li>
                                <li >You can reload MedPlus Wallet in multiples of Rs 1000 &amp; start enjoying wallet benefits</li>
                                <li >Every time you load your wallet, 80% amount is credited as Ordinary Cash &amp; 20% amount is credited as Flexi cash</li>
                                <li >You can use flexi cash to buy products from Flexi Catalogue at deep discounts</li>
                                <li >Make hassle free payments with a secure OTP validation</li>
                            </ul>
                        </div>
                        <div className="col-4">
                            <div className="card mb-2">
                                <img className="img-fluid border-bottom" alt="3 Pc Kadhai set" src={Add6000Img}/>
                                <ul className="mb-0  ml-3 p-3 text-secondary">
                                    <li>Load your MedPlus Wallet by Rs 6000</li>
                                    <li>Get a 3 Pc Kadhai set worth Rs 2500 with 1200 flexi cash</li>
                                    <li>Buy prescription medicines at 20% discount (MRP of Rs 6000) with remaining wallet balance of Rs 4800</li>
                                    <li>Resulting in savings of Rs 2500 on purchase of Rs 6000</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="card mb-2">
                                <img className="img-fluid border-bottom" alt="3 Pc Kadhai set" src={Add9000Img}/>
                                <ul className="mb-0  ml-3 p-3 text-secondary">
                                    <li>Load your MedPlus Wallet by Rs 9000</li>
                                    <li>Get a 24" Trolley suitcase worth Rs5500 with 1800 flexi cash</li>
                                    <li>Buy prescription medicines at 20% discount (MRP of Rs 9000) with remaining wallet balance of Rs 7200</li>
                                    <li>Resulting in savings of Rs 5500 on purchase of Rs 9000</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-4">
                            <div className="card mb-2">
                                <img className="img-fluid border-bottom" alt="3 Pc Kadhai set" src={Add4000Img}/>
                                <ul className="mb-0  ml-3 p-3 text-secondary">
                                    <li>Load your MedPlus Wallet by Rs 4000</li>
                                    <li>Get a set of 2 premium Bath Towels worth Rs 2398 with 800 flexi cash</li>
                                    <li>Buy prescription medicines at 20% discount (MRP of Rs 4000) with remaining wallet balance of Rs 3200</li>
                                    <li>Resulting in savings of Rs 2398 on purchase of Rs 4000</li>
                                </ul>
                            </div>
                        </div>
                        </div>
                    </section>
                </div>
                <section className="d-none">
                    <div className="ph-item mb-0 border-0 px-0 pb-0">
                        <div className="px-0">
                            <div className="ph-row">
                            <div className="ph-picture " style={{"height":"222px"}}></div>
                            </div>
                        </div>
                    </div>
                    <div className="ph-item mb-0 pt-3">
                        <div className="px-0">
                            <div className="ph-row mb-0">
                            <div className="ph-col-2"></div>
                            <div className="ph-col-10 empty"></div>
                            <div className="ph-col-10"></div>
                            </div>
                        </div>
                        </div>
                    <div className="row mx-0 px-3">
                        <div className="col-6 px-0">
                            <div className="ph-item mb-0 pt-3 px-0">
                            <div className="px-0">
                                <div className="ph-row mb-0">
                                <div className="ph-col-2"></div>
                                <div className="ph-col-10 empty"></div>
                                <div className="ph-col-8 mt-3"></div>
                                <div className="ph-col-8 mt-2"></div>
                                <div className="ph-col-8 mt-2"></div>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="ph-item mb-0 pt-3 px-0">
                            <div className="px-0">
                                <div className="ph-row mb-0">
                                <div className="ph-col-2"></div>
                                <div className="ph-col-10 empty"></div>
                                <div className="ph-col-8 mt-3"></div>
                                <div className="ph-col-8 mt-2"></div>
                                <div className="ph-col-8 mt-2"></div>
                                <div className="ph-col-8 mt-2"></div>
                                <div className="ph-col-8 mt-2"></div>
                                <div className="ph-col-8 mt-2"></div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mx-0 px-3">
                            <div className="col-4">
                                <div className="ph-item mb-0 border-0 px-0 pb-0">
                                <div className="px-0">
                                    <div className="ph-row">
                                    <div className="ph-picture " style={{"height":"150px"}}></div>
                                    </div>
                                </div>
                            </div>
                                <div className="ph-item mb-0 pt-0 px-0">
                                    <div className="px-0">
                                        <div className="ph-row mb-0">
                                        <div className="ph-col-12 mt-2"></div>
                                        <div className="ph-col-12 mt-2"></div>
                                        <div className="ph-col-12 mt-2"></div>
                                        <div className="ph-col-12 mt-2"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="ph-item mb-0 border-0 px-0 pb-0">
                                <div className="px-0">
                                    <div className="ph-row">
                                    <div className="ph-picture " style={{"height":"150px"}}></div>
                                    </div>
                                </div>
                            </div>
                            <div className="ph-item mb-0 pt-0 px-0">
                                <div className="px-0">
                                    <div className="ph-row mb-0">
                                    <div className="ph-col-12 mt-2"></div>
                                    <div className="ph-col-12 mt-2"></div>
                                    <div className="ph-col-12 mt-2"></div>
                                    <div className="ph-col-12 mt-2"></div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="ph-item mb-0 border-0 px-0 pb-0">
                                <div className="px-0">
                                    <div className="ph-row">
                                    <div className="ph-picture " style={{"height":"150px"}}></div>
                                    </div>
                                </div>
                            </div>
                            <div className="ph-item mb-0 pt-0 px-0">
                                <div className="px-0">
                                    <div className="ph-row mb-0">
                                    <div className="ph-col-12 mt-2"></div>
                                    <div className="ph-col-12 mt-2"></div>
                                    <div className="ph-col-12 mt-2"></div>
                                    <div className="ph-col-12 mt-2"></div>
                                    </div>
                                </div>
                                </div>
                            </div>
                    </div>
                </section>
            </div>
        </React.Fragment>
    )
}

export default HowItWorks