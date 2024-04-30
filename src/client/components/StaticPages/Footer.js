import React, { Component } from 'react';
import FooterImg from '../../images/common/footer-img.svg';
import MedPlusLab from '../../images/common/MedPlusLab.png';
import MedPlusLens from '../../images/common/MedPlusLens.png';
import Call from '../../images/common/call.svg';
import WhatsApp from '../../images/common/whatsapp.svg';
import BulkOrder from '../../images/common/bulk-order.svg';
import Community from '../../images/common/footer-community-cssbg.svg';
import Return from '../..//images/common/footer-return-cssbg.svg';
import DownloadApp from '../../images/common/download-app.png';
import AppStore from '../../images/common/App_Store-cssbg.svg';
import PlayStore from '../../images/common/Google_Play_Store-cssbg.svg';
import Sitemap from '../..//images/common/sitemap.svg';
import Privacy from '../../images/common/privacy.svg';
import TermsConditions from '../../images/common/footer-term-cssbg.svg';
class Footer extends Component {
  state = { title: 'This is in state'} 
  toggleModal = () => {
    this.setState({isOpen: !this.state.isOpen});
  }
  setTitle = event => {
    this.setState({title: event.target.value});
  }
  render() {
    return (
        <React.Fragment>           
            <section className="main-footer pt-2">
            <div className="download-app">
                <div className="col">
                    <img alt="download-app"  class="img-fluid" src={DownloadApp} />
                </div>
                <div class="col text-center">
                    <h1>Download Our App Now</h1>     
                    <p>Buy general store products and medicines from your mobile at anytime, anywhere</p>
                    <p>Available on:</p>
                    <img alt="Google Play Store" src={PlayStore} />
                    <img alt="App Store" className="pl-3" src={AppStore} />
                </div>
                </div>
                <div className="contact">
                    <div className="col-md-4 col-6 col-lg-6 p-0">
                        <img alt="whatsapp" src={WhatsApp}/> 
                        <p>
                            <small className="text-secondary d-block">WhatsApp:</small>
                            <strong >9247666000</strong>
                        </p>
                        <img alt="Call" src={Call} className="align-top mr-2 position-relative"/> 
                        <p className="d-inline-block">
                            <small className="text-secondary d-block">Need any help?</small>
                            <strong >9247666000</strong>
                        </p>
                    </div>
                    <div className="col p-0 ml-3">
                        <p >
                            <small className="text-secondary d-block">Subscribe for</small>
                            <strong >Latest Offers</strong>
                        </p>
                        <div className="form-group filled-form">
                            <input type="text" className="disabled form-control" id="user-mail" name="User mail" maxlength="40" required="" autocomplete="off" value="srikanththedesigner@gmail.com"/>
                            <label className="select-label">Email Id</label>
                        </div>
                        <button type="button" className="btn btn-brand px-5" >SUBSCRIBE</button>
                    </div>
                </div>
                <div className="border-bottom  primary-links">
                    <div>
                        <a  href="/aboutUs" title="About Us">About Us</a>
                        <a  href="/faq" title="FAQs">FAQs</a>
                        <a  href="https://pharmacy.medplusmart.com" title="Locate A MedPlus Store" target="_blank">Locate A <span className="hidden-xs">MedPlus </span>Store</a>
                        <a  href="/ordersHistory" title="Track Orders">Track Orders</a>
                        <a  href="/brands" title="Browse All Brands">Browse All Brands</a>
                        <a  href="/customerFeedback" title="Customer Feedback">Customer Feedback</a>
                        <a  href="/contactUs" title="Contact Us">Contact Us</a>
                    </div>
                    <div className="text-right">
                        <a href="https://seal.godaddy.com/verifySeal?sealID=gwfhYzQBYIT2HVDkSA7p2XUpzkVVZrLRuEHNvrtqW4XEWe5BggPQrij2O0lo" target="_blank" rel="noopener">
                            <img src="https://www.medplusmart.com/new_theme/web/images/siteseal_gd_3_h_l_m.png" alt="GoDaddy Verified &amp; Secured" title="GoDaddy Verified &amp; Secured"/>

                            </a>
                    </div>
                </div>
                <div className="col-12 p-3">
                    <div className="footerPayments">
                        <h6 className="color-dgry">Payments</h6>
                        <a className="cursorarw visa-position" title="Visa"></a>
                        <a className="cursorarw mastercard-position"  title="MasterCard"></a>
                        <a className="cursorarw maestro-position"  title="Maestro"></a>
                        <a className="cursorarw paytm-position"  title="Paytm"></a>
                        <a className="cursorarw mobikwik-position"  title="Mobikwik"></a>
                        <a className="cursorarw phonepe-position" title="PhonePe"></a>
                        <a className="cursorarw netbanking-position"  title="Net Banking"></a>
                        <a className="cursorarw cash-on-delivery-position"  title="Cash On Delivery"></a>
                    </div>
                    <div className="row p-0">
                        <div className="col-6">
                            <h6 className="title">General Store</h6>
                            <ul className="inline-list">
                            <li className="size-12">Baby-Needs:</li>
                            <li>
                                <a href="/category/Baby-Needs/Baby-Food/20031/10104" title="Baby Food">
                                Baby Food
                                </a>
                                /
                            </li>
                            <li>
                                <a href="/category/Baby-Needs/Baby-Care/20001/10104" title="Baby Care">
                                Baby Care
                                </a>
                            </li>
                            </ul>
                            <ul className="inline-list">
                            <li className="size-12">Personal Care</li>
                            <li>
                                <a href="/category/Personal-Care/Skin-Care/20002/10102" title="Skin Care">
                                Skin Care
                                </a>
                            </li>
                            <li>
                                <a href="/category/Personal-Care/Sanitary-n-Hygiene/20003/10102" title="Sanitary &amp; Hygiene">
                                Sanitary &amp; Hygiene
                                </a>
                                /
                            </li>
                            <li>
                                <a href="/category/Personal-Care/Oral-Care/20004/10102" title="Oral Care">
                                Oral Care
                                </a>
                                /
                            </li>
                            <li>
                                <a href="/category/Personal-Care/Hair-Care/20005/10102" title="Hair Care">
                                Hair Care
                                </a>
                                /
                            </li>
                            <li>
                                <a href="/category/Personal-Care/Bath-n-Body-Products/20006/10102" title="Bath &amp; Body Products">
                                Bath &amp; Body Products
                                </a>
                                /
                            </li>
                            <li>
                                <a href="/category/Personal-Care/Sexual-Wellness/20007/10102" title="Sexual Wellness">
                                Sexual Wellness
                                </a>
                                /
                            </li>
                            <li>
                                <a href="/category/Personal-Care/Deodorants-n-Perfumes/20008/10102" title="Deodorants &amp; Perfumes">
                                Deodorants &amp; Perfumes
                                </a>
                                /
                            </li>
                            <li>
                                <a href="/category/Personal-Care/Eyes-Ears-n-Lips/20009/10102" title="Eyes, Ears &amp; Lips">
                                Eyes, Ears &amp; Lips
                                </a>
                                /
                            </li>
                            <li>
                                <a href="/category/Personal-Care/Shaving-n-Hair-Removal/20010/10102" title="Shaving &amp; Hair Removal">
                                Shaving &amp; Hair Removal
                                </a>
                                /
                            </li>
                            <li>
                                <a href="/category/Personal-Care/Hand-Foot-n-Nails/20011/10102" title="Hand, Foot &amp; Nails">
                                Hand, Foot &amp; Nails
                                </a>
                            </li>
                            </ul>
                            <ul className="inline-list">
                            <li className="size-12">Health-n-Nutrition:</li>
                            <li>
                                <a href="/category/Health-n-Nutrition/Health-Drinks/20082/10103" title="Health Drinks">
                                Health Drinks
                                </a>
                                /
                            </li>
                            <li>
                                <a href="/category/Health-n-Nutrition/Breakfast-Cereals/20034/10103" title="Breakfast Cereals">
                                Breakfast Cereals
                                </a>
                                /
                            </li>
                            <li>
                                <a href="/category/Health-n-Nutrition/Nutritional-Foods/20083/10103" title="Nutritional Foods">
                                Nutritional Foods
                                </a>
                                /
                            </li>
                            <li>
                                <a href="/category/Health-n-Nutrition/Weight-Management/20077/10103" title="Weight Management">
                                Weight Management
                                </a>
                            </li>
                            </ul>
                            <ul className="inline-list">
                            <li className="size-12">OTC-n-Health-Needs:</li>
                           
                            <li>
                                <a href="/category/OTC-n-Health-Needs/First-Aid/20061/10106" title="First Aid">
                                First Aid
                                </a>
                                /
                            </li>
                            <li>
                                <a href="/category/OTC-n-Health-Needs/Pain-Relief/20062/10106" title="Pain Relief">
                                Pain Relief
                                </a>
                                /
                            </li>
                            <li>
                                <a href="/category/OTC-n-Health-Needs/Cold-Relief/20063/10106" title="Cold Relief">
                                Cold Relief
                                </a>
                                /
                            </li>
                            <li>
                                <a href="/category/OTC-n-Health-Needs/Joint-Care-n-Support/20064/10106" title="Joint Care &amp; Support">
                                Joint Care &amp; Support
                                </a>
                                /
                            </li>
                            <li>
                                <a href="/category/OTC-n-Health-Needs/Skin-n-Foot-Care/20065/10106" title="Skin &amp; Foot Care">
                                Skin &amp; Foot Care
                                </a>
                                /
                            </li>
                            <li>
                                <a href="/category/OTC-n-Health-Needs/Digestives-n-Laxatives/20066/10106" title="Digestives &amp; Laxatives">
                                Digestives &amp; Laxatives
                                </a>
                                /
                            </li>
                            <li>
                                <a href="/category/OTC-n-Health-Needs/Healthcare-Devices/20067/10106" title="Healthcare Devices">
                                Healthcare Devices
                                </a>
                                /
                            </li>
                            <li>
                                <a href="/category/OTC-n-Health-Needs/Anti-Smoking-Products/20068/10106" title="Anti-Smoking Products">
                                Anti-Smoking Products
                                </a>
                            </li>
                            </ul>
                            <ul className="inline-list">
                            <li className="size-12">Vitamins-n-Supplements:</li>
                            <li>
                                <a href="/category/Vitamins-n-Supplements/Sports-Supplements/20076/10107" title="Sports Supplements">
                                Sports Supplements
                                </a>
                                /
                            </li>
                            <li>
                                <a href="/category/Vitamins-n-Supplements/Vitamins-n-Minerals/20078/10107" title="Vitamins &amp; Minerals">
                                Vitamins &amp; Minerals
                                </a>
                                /
                            </li>
                            <li>
                                <a href="/category/Vitamins-n-Supplements/Herbal-Supplements/20079/10107" title="Herbal Supplements">
                                Herbal Supplements
                                </a>
                                /
                            </li>
                            <li>
                                <a href="/category/Vitamins-n-Supplements/Jamieson/20087/10107" title="Jamieson">
                                Jamieson
                                </a>
                            </li>
                            </ul>
                            <ul className="inline-list">
                            <li className="size-12">Diabetic-Needs:</li>
                            <li>
                                <a href="/category/Diabetic-Needs/Diabetic-Testing-Needs/20085/10108" title="Diabetic Testing Needs">
                                Diabetic Testing Needs
                                </a>
                                /
                            </li>
                            <li>
                                <a href="/category/Diabetic-Needs/Diabetic-Nutrition/20086/10108" title="Diabetic Nutrition">
                                Diabetic Nutrition
                                </a>
                                /
                            </li>
                            <li>
                                <a href="/category/Diabetic-Needs/Diabetic-Aids/20084/10108" title="Diabetic Aids">
                                Diabetic Aids
                                </a>
                            </li>
                            </ul>
                            <ul className="inline-list">
                            <li className="size-12">Household-Needs:</li>
                            <li>
                                <a href="/category/Household-Needs/Cleaning-Needs/20046/10105" title="Cleaning Needs">
                                Cleaning Needs
                                </a>
                                /
                            </li>
                            <li>
                                <a href="/category/Household-Needs/Detergents/20047/10105" title="Detergents">
                                Detergents
                                </a>
                                /
                            </li>
                            <li>
                                <a href="/category/Household-Needs/Home-Utilities/20048/10105" title="Home Utilities">
                                Home Utilities
                                </a>
                                /
                            </li>
                            
                            <li>
                                <a href="/category/Household-Needs/Kitchen-Utilities/20049/10105" title="Kitchen Utilities">
                                Kitchen Utilities
                                </a>
                                /
                            </li>
                           
                            <li>
                                <a href="/category/Household-Needs/Luggage/20054/10105" title="Luggage">
                                Luggage
                                </a>
                                /
                            </li>
                            
                            <li>
                                <a href="/category/Household-Needs/Bakery-n-Confectionary/20032/10105" title="Bakery &amp; Confectionary">
                                Bakery &amp; Confectionary
                                </a>
                                /
                            </li>
                            
                            <li>
                                <a href="/category/Household-Needs/Beverages/20033/10105" title="Beverages">
                                Beverages
                                </a>
                                /
                            </li>
                            
                            <li>
                                <a href="/category/Household-Needs/Branded-Organic-n-Ayurvedic/20041/10105" title="Branded Organic &amp; Ayurvedic">
                                Branded Organic &amp; Ayurvedic
                                </a>
                            </li>
                            </ul>
                        </div>
                        <div className="col-6">
                            <h6 className="title">Pharmacy</h6>
                            <ul className="inline-list margin-none">
                            
                            <li className="size-12">Therapeutic category:</li>
                            <li><a href="/drugsCategory/medicines/antacids-antireflux-agents-n-antiulcerants/10002/10003" title="Gastrointestinal &amp; Hepatobiliary System">Gastrointestinal &amp; Hepatobiliary System</a>
                                /
                            </li>
                            <li><a href="/drugsCategory/medicines/cardiac-drugs/10013/10014" title="Cardiovascular &amp; Hematopoietic system">Cardiovascular &amp; Hematopoietic system</a>
                                /
                            </li>
                            <li><a href="/drugsCategory/medicines/respiratory-stimulants/10033/10034" title="Respiratory System">Respiratory System</a>
                                /
                            </li>
                            <li><a href="/drugsCategory/medicines/anxiolytics/10039/10040" title="Central Nervous System">Central Nervous System</a>
                                /
                            </li>
                            <li><a href="/drugsCategory/medicines/disease-modifying-anti-rheumatic-drugs-dmards-/10054/10055" title="Musculo-Skeletal System">Musculo-Skeletal System</a>
                                /
                            </li>
                            <li><a href="/drugsCategory/medicines/androgens-n-related-synthetic-drugs/10062/10063" title="Hormones">Hormones</a>
                                /
                            </li>
                            <li><a href="/drugsCategory/medicines/oral-contraceptives/10070/10071" title="Contraceptive Agents">Contraceptive Agents</a>
                                /
                            </li>
                            <li><a href="/drugsCategory/medicines/aminoglycosides/10074/10075" title="Infectious Disease Drugs">Infectious Disease Drugs</a>
                                /
                            </li>
                            <li><a href="/drugsCategory/medicines/cytotoxic-chemotherapy/10094/10095" title="Oncology">Oncology</a>
                                /
                            </li>
                            <li><a href="/drugsCategory/medicines/preparations-for-vaginal-conditions/10100/10101" title="Genito - Urinary System">Genito - Urinary System</a>
                                /
                            </li>
                            <li><a href="/drugsCategory/medicines/insulin-preparations/10107/10108" title="Endocrine &amp; Metabolic System">Endocrine &amp; Metabolic System</a>
                                /
                            </li>
                            <li><a href="/drugsCategory/medicines/vitamins/10115/10116" title=" Vitamins &amp; Minerals"> Vitamins &amp; Minerals</a>
                                /
                            </li>
                            <li><a href="/drugsCategory/medicines/infant-nutritional-products/10119/10120" title="Nutrition">Nutrition</a>
                                /
                            </li>
                            <li><a href="/drugsCategory/medicines/eye-anti-infectives-n-antiseptics/10126/10127" title="Eye">Eye</a>
                                /
                            </li>
                            <li><a href="/drugsCategory/medicines/ear-anti-infectives-n-antiseptics/10135/10136" title="Ear &amp; Mouth / Throat">Ear &amp; Mouth / Throat</a>
                                /
                            </li>
                            <li><a href="/drugsCategory/medicines/topical-antibiotics/10140/10141" title="Dermatologicals">Dermatologicals</a>
                                /
                            </li>
                            <li><a href="/drugsCategory/medicines/anaesthetics-local-n-general/10153/10154" title="Anaesthetics &amp; Intravenous Solutions">Anaesthetics &amp; Intravenous Solutions</a>
                                /
                            </li>
                            <li><a href="/drugsCategory/medicines/antihistamines-n-antiallergics/10156/10157" title="Allergy &amp; Immune System">Allergy &amp; Immune System</a>
                                /
                            </li>
                            <li><a href="/drugsCategory/medicines/-antidotes-and-detoxifying-agents/10160/10161" title=" Antidotes, Detoxifying Agents &amp; Drugs Used in Substance Dependence"> Antidotes, Detoxifying Agents &amp; Drugs Used in Substance Dependence</a>
                                /
                            </li>
                            <li><a href="/drugsCategory/medicines/miscellaneous/10163/10164" title="Miscellaneous">Miscellaneous</a>
                            </li>
                            </ul>
                            <ul className="inline-list margin-none">
                            <li className="size-12"> Surgicals products by category:</li>
                            <li><a href="/drugsCategory/surgicals/agents/11001/11002" title="Anaesthesia">Anaesthesia</a>
                                /
                            </li>
                            <li><a href="/drugsCategory/surgicals/cathlab/11004/11005" title="Cardiovascular">Cardiovascular</a>
                                /
                            </li>
                            <li><a href="/drugsCategory/surgicals/antiseptics-disinfectants/11008/11009" title="CSSD">CSSD</a>
                                /
                            </li>
                            <li><a href="/drugsCategory/surgicals/feeding-tubes/11016/11017" title="Catheters &amp; Tubes">Catheters &amp; Tubes</a>
                                /
                            </li>
                            <li><a href="/drugsCategory/surgicals/cannulas-n-infusion-sets/11022/11023" title="IV Needs">IV Needs</a>
                                /
                            </li>
                            <li><a href="/drugsCategory/surgicals/trolleys-n-wheelchairs/11028/11029" title="Mobilization Equipment">Mobilization Equipment</a>
                                /
                            </li>
                            <li><a href="/drugsCategory/surgicals/instruments-n-accessories/11032/11033" title="Orthopaedic">Orthopaedic</a>
                                /
                            </li>
                            <li><a href="/drugsCategory/surgicals/instruments-n-accessories/11037/11038" title="Surgicals">Surgicals</a>
                                /
                            </li>
                            <li><a href="/drugsCategory/surgicals/crash-cart-supplies/11044/11045" title="Pulmonary/Emergency Care">Pulmonary/Emergency Care</a>
                                /
                            </li>
                            <li><a href="/drugsCategory/surgicals/reagents-n-consumables/11048/11049" title="Diagnostic/Imaging">Diagnostic/Imaging</a>
                            </li>
                            </ul>
                            <ul className="inline-list">
                            <li className="size-12"><a href="/pharmaHome" className="margin-none">Medicine Information:</a></li>
                            <li><a href="/viewPrescription">Health Records</a>&nbsp;/</li>
                            <li><a href="/requestProduct">Request a Product</a>&nbsp;/</li>
                            <li><a href="/storelocator">Store Locator</a>&nbsp;/</li>
                            <li><a href="/topSearches">Top Searches</a>&nbsp;/</li>
                            <li><a href="/alphabetWiseProducts/0-9">Alphabet Wise Products</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col about-medplus">
                    <p className=""><strong>About MedPlusMart:</strong></p>
                    <p><strong>MedPlus</strong>: One of the most trusted gateways to medicines and general provision</p>
                    <p>With an aim to eradicate fake and ineffective medicines, and supply high-quality medicines in India, MedPlus was launched in 2006 in Hyderabad. According to WHO research, every 1 or 2 in 10 medicines are proven to be adulterated in low/medium income countries like India and MedPlus aspires to bring about a change in this statistic. To encourage and elevate transparency in the functioning of the pharmaceutical industry, MedPlus has been successfully contributing in providing genuine and unadulterated medicines since its inception. Currently operating in 300+ cities, with 1500+ offline stores in India, MedPlus is the second largest pharmacy chain in India today. Welcome to a seamless and impeccable shopping experience!</p>
                    <p><strong>6 Reasons for you to Shop from MedPlus</strong>:</p>
                    <ol>
                        <li><strong>Authentic medicines: </strong> Be 100% assured of receiving genuine medicines</li>
                        <li><strong>Monthly provisions:</strong> One stop store for both medicines as well as monthly provisions (kiraana)</li>
                        <li><strong>Quick to-door deliveries:</strong> We ensure the delivery of well-packaged products to your doorstep at quick timelines.</li>
                        <li><strong>Pocket-friendly:</strong> Our range of discounts, offers and deals will allow you to go economical everyday, everytime. We recommend you to explore <a className="strong" href="/flexiRewards" title="FlexiRewards"><ins>FlexiRewards</ins></a>, our special saving scheme.</li>
                        <li><strong>Customer-friendly:</strong> Order from the comfort of your sofa with our easy browsing and smooth billing procedure. Our hassle-free <a className="strong" href="/pharmaHome" title="Upload Prescription"><ins>Upload Prescription</ins></a> option allows you to seamlessly upload your prescription online and have your medicines delivered to you!</li>
                        <li><strong>Track and Re-Order:</strong> Conveniently refer to all your previous bills and orders which will allow you to re-order with a single click.</li>
                    </ol>
                    <p>Also, for those of you who prefer offline shopping, <a className="strong" href="/storelocator" title="Locate your nearest store"><ins>locate your nearest store</ins></a> and get going!</p>
                </div>
                <div className="row footer-img">
                    <div className="col-7 ">
                        <div className="row p-0">
                            <div className="col-6">
                            <div className="footerPartners">
                                <h6 className="color-dgry">Partners</h6>
                                <a href="https://www.medpluslab.com" target="_blank" className="text-center" rel="noopener">
                                    <img src={MedPlusLab} title="MedPlusLab.com" alt="MedPlusLab.com" />
                                </a>
                                <a href="https://www.medpluslens.com" target="_blank" className="text-center" rel="noopener">
                                    <img src={MedPlusLens} title="MedPlusLens.com" alt="MedPlusLens.com" />
                                    </a>
                            </div>
                            </div>
                            <div className="col">
                            <div className="footerFallowus">
                                <h6 className="color-dgry">Follow us</h6>
                                <span itemscope="" itemtype="https://schema.org/Organization">
                                    <ul className="pl-0">
                                        <li>
                                        <a itemprop="sameAs" href="https://www.facebook.com/IndiaMedPlus" target="_blank" rel="noopener" title="facebook">
                                            <svg xmlns="http://www.w3.org/2000/svg" id="Facebook_Gray" width="36" height="36" viewBox="0 0 36 36">
                                                <rect id="Rectangle_5538" data-name="Rectangle 5538" width="36" height="36" transform="translate(0 0)" fill="none"/>
                                                <g id="Group_16696" data-name="Group 16696" transform="translate(0 0)">
                                                    <g id="Group_16694" data-name="Group 16694" transform="translate(0 0)">
                                                    <path id="Path_24097" data-name="Path 24097" d="M4515.62,672.94a18,18,0,1,1,18-18A18.02,18.02,0,0,1,4515.62,672.94Z" transform="translate(-4497.62 -636.941)" fill="#a8a8a8"/>
                                                    </g>
                                                    <g id="Group_16695" data-name="Group 16695" transform="translate(12.923 7.111)">
                                                    <path id="Path_24098" data-name="Path 24098" d="M4519.512,658.848v10.528a.274.274,0,0,0,.274.274h3.909a.274.274,0,0,0,.274-.274v-10.7h2.834a.273.273,0,0,0,.272-.251l.273-3.223a.275.275,0,0,0-.274-.3h-3.106v-2.288a.97.97,0,0,1,.971-.97h2.184a.275.275,0,0,0,.274-.274v-3.224a.275.275,0,0,0-.274-.274h-3.691a3.922,3.922,0,0,0-3.922,3.922V654.9h-1.955a.274.274,0,0,0-.274.274V658.4a.273.273,0,0,0,.274.274h1.955Z" transform="translate(-4517.283 -647.874)" fill="#fff" fill-rule="evenodd"/>
                                                    </g>
                                                </g>
                                            </svg>
                                        </a>
                                        </li>
                                        <li>
                                            <a itemprop="sameAs" href="https://www.instagram.com/medplusmart/" target="_blank" rel="noopener" title="Follow us on Instagram">
                                            <svg xmlns="http://www.w3.org/2000/svg" id="Instagram_Gray" width="36.287" height="36" viewBox="0 0 36.287 36">
                                                <rect fill="none" width="35.907" height="36" transform="translate(0.38 0)"/>
                                                <g transform="translate(0.286)">
                                                    <g transform="translate(-0.286)">
                                                        <path fill="#a8a8a8" id="instagramPath" d="M4586.843,677.372a17.953,17.953,0,1,1,17.953-17.953A17.973,17.973,0,0,1,4586.843,677.372Z" transform="translate(-4568.89 -641.466)"/>
                                                    </g>
                                                    <g transform="translate(5.714 6)">
                                                        <path fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2px" d="M7.5,3h9A4.5,4.5,0,0,1,21,7.5v9A4.5,4.5,0,0,1,16.5,21h-9A4.5,4.5,0,0,1,3,16.5v-9A4.5,4.5,0,0,1,7.5,3Z" transform="translate(0 0)"/>
                                                        <path fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2px" d="M19.226,15.007a3.6,3.6,0,1,1-3.033-3.033,3.6,3.6,0,0,1,3.033,3.033Z" transform="translate(-3.626 -3.574)"/>
                                                        <path fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2px" d="M26.25,9.75h0" transform="translate(-9.3 -2.7)"/>
                                                    </g>
                                                </g>
                                                </svg>
                                            </a>
                                        </li>
                                        <li>
                                        <a itemprop="sameAs" href="https://www.youtube.com/channel/UCIkVRQNwi4cCWREexw307gg?sub_confirmation=1" target="_blank" rel="noopener" title="twitter">
                                            <svg id="Youtube_Gray" xmlns="http://www.w3.org/2000/svg" width="36.001" height="36" viewBox="0 0 36.001 36">
                                                <rect id="Rectangle_5539" data-name="Rectangle 5539" width="35.907" height="36" transform="translate(0.094 0)" fill="none"/>
                                                <g id="Group_16700" data-name="Group 16700" transform="translate(0 0)">
                                                    <g id="Group_16697" data-name="Group 16697" transform="translate(0 0)">
                                                    <path id="Path_24099" data-name="Path 24099" d="M4586.843,677.372a17.953,17.953,0,1,1,17.953-17.953A17.973,17.973,0,0,1,4586.843,677.372Z" transform="translate(-4568.89 -641.466)" fill="#a8a8a8"/>
                                                    </g>
                                                    <g id="Group_16699" data-name="Group 16699" transform="translate(7.489 10.596)">
                                                    <g id="Group_16698" data-name="Group 16698">
                                                        <path id="Path_24100" data-name="Path 24100" d="M4601.575,662.237a4.626,4.626,0,0,0-4.625-4.625h-12a4.625,4.625,0,0,0-4.625,4.625v5.622a4.625,4.625,0,0,0,4.625,4.626h12a4.626,4.626,0,0,0,4.625-4.626Zm-7.569,3.094-4.785,2.624c-.208.113-.395-.038-.395-.275v-5.386c0-.239.193-.39.4-.271l4.817,2.762A.314.314,0,0,1,4594.006,665.331Z" transform="translate(-4580.327 -657.611)" fill="#fff"/>
                                                    </g>
                                                    </g>
                                                </g>
                                            </svg>
                                        </a>
                                        </li>
                                        <li>
                                        <a itemprop="sameAs" href="https://twitter.com/MedPlusIndia" target="_blank" rel="noopener" title="twitter">
                                            <svg id="Twiter_Gray" xmlns="http://www.w3.org/2000/svg" width="35.988" height="36" viewBox="0 0 35.988 36">
                                                <rect id="Rectangle_5541" data-name="Rectangle 5541" width="35.012" height="36" transform="translate(0.171)" fill="none"/>
                                                <g id="Group_16693" data-name="Group 16693" transform="translate(0 0.012)">
                                                    <g id="Group_16686" data-name="Group 16686" transform="translate(0 0)">
                                                    <path id="Path_24091" data-name="Path 24091" d="M4656.611,677.575a17.994,17.994,0,1,1,17.995-17.994A18.013,18.013,0,0,1,4656.611,677.575Z" transform="translate(-4638.618 -641.587)" fill="#a8a8a8"/>
                                                    </g>
                                                    <g id="Group_16692" data-name="Group 16692" transform="translate(7.446 9.361)">
                                                    <g id="Group_16687" data-name="Group 16687" transform="translate(0)">
                                                        <path id="Path_24092" data-name="Path 24092" d="M4670.789,657.848a8.639,8.639,0,0,1-2.118.6c.341-.057.844-.675,1.045-.924a3.891,3.891,0,0,0,.705-1.284c.019-.037.032-.082,0-.11a.121.121,0,0,0-.113.009,10.78,10.78,0,0,1-2.516.962.168.168,0,0,1-.173-.045,1.991,1.991,0,0,0-.219-.225,4.449,4.449,0,0,0-1.219-.747,4.233,4.233,0,0,0-1.868-.3,4.469,4.469,0,0,0-1.774.5,4.563,4.563,0,0,0-1.43,1.168,4.4,4.4,0,0,0-.855,1.711,4.619,4.619,0,0,0-.044,1.806c.013.1,0,.115-.087.1a13.433,13.433,0,0,1-8.643-4.4c-.1-.115-.156-.115-.238.009a4.382,4.382,0,0,0,.747,5.179c.169.16.343.321.531.467a4.416,4.416,0,0,1-1.668-.467c-.1-.064-.152-.028-.16.087a2.645,2.645,0,0,0,.025.495,4.435,4.435,0,0,0,2.732,3.533,2.565,2.565,0,0,0,.554.169,4.933,4.933,0,0,1-1.636.051c-.12-.023-.165.036-.12.151a4.6,4.6,0,0,0,3.438,2.878c.155.027.312.027.468.063-.01.014-.019.014-.028.028a5.434,5.434,0,0,1-2.347,1.244,8.4,8.4,0,0,1-3.564.457c-.192-.028-.231-.026-.284,0s-.006.078.056.128c.243.16.491.3.742.44a11.72,11.72,0,0,0,2.383.953,12.692,12.692,0,0,0,12.322-2.881c2.524-2.509,3.409-5.968,3.409-9.432,0-.136.16-.21.256-.282a8.291,8.291,0,0,0,1.669-1.744.506.506,0,0,0,.1-.334v-.018C4670.867,657.793,4670.874,657.809,4670.789,657.848Z" transform="translate(-4649.905 -655.778)" fill="#fff"/>
                                                    </g>
                                                    <g id="Group_16688" data-name="Group 16688" transform="translate(6.225 17.192)">
                                                        <path id="Path_24093" data-name="Path 24093" d="M4659.353,681.868Z" transform="translate(-4659.352 -681.868)" fill="#fff" fill-rule="evenodd"/>
                                                    </g>
                                                    <g id="Group_16689" data-name="Group 16689" transform="translate(6.066 17.192)">
                                                        <path id="Path_24094" data-name="Path 24094" d="M4659.27,681.868c-.028,0-.346,0,0,0Z" transform="translate(-4659.109 -681.868)" fill="#fff" fill-rule="evenodd"/>
                                                    </g>
                                                    <g id="Group_16690" data-name="Group 16690" transform="translate(6.931 17.195)">
                                                        <path id="Path_24095" data-name="Path 24095" d="M4660.423,681.888c0-.036.371,0,0,0C4660.423,681.869,4660.468,681.888,4660.423,681.888Z" transform="translate(-4660.423 -681.872)" fill="#fff" fill-rule="evenodd"/>
                                                    </g>
                                                    <g id="Group_16691" data-name="Group 16691" transform="translate(14.259 0.025)">
                                                        <path id="Path_24096" data-name="Path 24096" d="M4671.629,655.817a.074.074,0,0,1-.086,0Z" transform="translate(-4671.542 -655.817)" fill="#fff" fill-rule="evenodd"/>
                                                    </g>
                                                    </g>
                                                </g>
                                            </svg>
                                        </a>
                                        </li>
                                        <li>
                                        <a itemprop="sameAs" href="https://in.linkedin.com/in/medplus" target="_blank" rel="noopener" title="linkedin">
                                            <svg id="Linkidin_Gray" xmlns="http://www.w3.org/2000/svg" width="35.974" height="36" viewBox="0 0 35.974 36">
                                                <rect id="Rectangle_5540" data-name="Rectangle 5540" width="35.026" height="36" transform="translate(0.272 0)" fill="none"/>
                                                <g id="Group_16706" data-name="Group 16706" transform="translate(0 0)">
                                                    <g id="Group_16704" data-name="Group 16704" transform="translate(0 0)">
                                                    <g id="Group_16701" data-name="Group 16701">
                                                        <path id="Path_24101" data-name="Path 24101" d="M4726.333,672.96a17.987,17.987,0,1,1,17.987-17.987A18.008,18.008,0,0,1,4726.333,672.96Z" transform="translate(-4708.347 -636.987)" fill="#a8a8a8"/>
                                                    </g>
                                                    <g id="Group_16703" data-name="Group 16703" transform="translate(9.423 13.851)">
                                                        <g id="Group_16702" data-name="Group 16702">
                                                            <path id="Path_24102" data-name="Path 24102" d="M4741.351,663.472v6.715a.3.3,0,0,1-.3.3h-3.466a.3.3,0,0,1-.3-.3v-6.245c0-1.643-.587-2.766-2.06-2.766a2.225,2.225,0,0,0-2.086,1.487,2.776,2.776,0,0,0-.134.991v6.532a.3.3,0,0,1-.3.3h-3.466a.3.3,0,0,1-.3-.3c.008-1.663.043-9.733.007-11.629a.3.3,0,0,1,.3-.3h3.458a.3.3,0,0,1,.3.3v1.433c-.009.014-.021.027-.028.04H4733v-.04a4.037,4.037,0,0,1,3.665-2.021c2.676,0,4.683,1.749,4.683,5.506Zm-18.431,7.016h3.465a.3.3,0,0,0,.3-.3V658.555a.3.3,0,0,0-.3-.3h-3.465a.3.3,0,0,0-.3.3v11.632A.3.3,0,0,0,4722.919,670.488Z" transform="translate(-4722.619 -657.967)" fill="#fff"/>
                                                        </g>
                                                    </g>
                                                    </g>
                                                    <g id="Group_16705" data-name="Group 16705" transform="translate(9.155 8.226)">
                                                    <circle id="Ellipse_1067" data-name="Ellipse 1067" cx="2.177" cy="2.177" r="2.177" fill="#fff"/>
                                                    </g>
                                                </g>
                                            </svg>
                                        </a>
                                        </li>
                                    </ul>
                                </span>
                            </div>
                            </div>
                            <p className="m-3 pt-3 border-top w-100">© 2022 MedPlusMart.com. All rights reserved.</p>
                        </div>
                    </div>
                    <div className="col">
                        <img alt="footer-img"  className="img-fluid" src={FooterImg} />
                    </div>
                    </div>
                    
                <div className="bottom-text">
                    <ul>
                        <li><img alt="bulk-order" src={BulkOrder} /> <a href="javascript:void(0)"> Bulk Order</a></li>
                        <li><img alt="community" src={Community} /> <a href="javascript:void(0)">Community Delivery</a></li>
                        <li><img alt="sitemap" src={Sitemap}/> <a href="javascript:void(0)">Sitemap</a></li>
                        <li><img alt="privacy" src={Privacy}/> <a href="javascript:void(0)">Privacy</a></li>
                        <li><img alt="return" src={Return}/> <a href="javascript:void(0)">Returns & Cancellations</a></li>
                        <li><img alt="terms-condition" src={TermsConditions} /><a href="javascript:void(0)">Terms & Conditions</a></li>
                    </ul>
                </div>
                </section>
        </React.Fragment>    
    )
  }
}

export default Footer;
