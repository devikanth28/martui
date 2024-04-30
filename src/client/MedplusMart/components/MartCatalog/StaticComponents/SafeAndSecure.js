import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import BreadCrumbAction from "../../../../../redux/action/BreadCrumbAction";
import MetaTitle from "../../../../commonComponents/MetaTitle";

const SafeAndSecure = (props) => {

	const breadCrumbAction = BreadCrumbAction();

    useEffect(() => {
        breadCrumbAction.pushBreadCrumbs({ name: 'Safe & Secure', url: props.location.pathname });
    }, [props.location.pathname]);

	return (
		<React.Fragment>
		<MetaTitle defaultValue={"Safe & Secure - MedPlusMart"}/>
		<div className="container safe-shopping py-3">
		<h1 className="font-weight-bolder mt-3 text-center">
			<span class="light">Shopping at MedPlusMart.com is </span> Safe &amp;
			Secure
		</h1>
		<p className="text-center my-4 font-16">
			MedPlus is one of India's most trusted pharmacies with
			over 3.5 lakh customers served daily.
			<br />
			At MedPlusMart.com, we want make your shopping
			experience safe, secure &amp; hassle free.
		</p>
		<section class="card-horizontal">
			<div class="img-square-wrapper w-25 m-auto text-center">
				<img
					className="img-fluid"
					src="data:image/png;base64,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"
					alt="No Preview Available"
					data-pagespeed-url-hash="1989962404" />
			</div>
			<div class="card-body">
				<h2 className="mt-3">
					Guaranteed Genuine Products
				</h2>
				<p>
					All products, whether medicines or general
					products, bought at MedPlus Mart come from our
					own inventory and are sourced from trusted
					manufacturers &amp; distributors. We deliver the
					products directly to you. No intermediaries
					&amp; No fakes.
				</p>
				<Link to="/faq" title="FAQ" className="btn btn-link ml-n3">
					FAQs
					<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 18.001 18" className='mx-2'>
                        <g id="right_black_icon_18px" transform="translate(-48.941 -351.847)">
                          <rect id="BG_Guide" data-name="BG Guide" width="15" height="15" transform="translate(48.941 351.847)" fill="none" />
                          <path id="Path_22926" data-name="Path 22926" d="M58.6,354.508a1.275,1.275,0,0,0-.179.537.771.771,0,0,0,.269.536l5.635,5.188H49.657a.715.715,0,1,0,0,1.431H64.325l-5.546,5.188a.7.7,0,0,0,0,.984.709.709,0,0,0,.984.089l6.977-6.44a.7.7,0,0,0,0-.984l-6.977-6.53a.684.684,0,0,0-.447-.178C58.869,354.24,58.69,354.329,58.6,354.508Z" transform="translate(0 -0.448)" fill="#080808" />
                        </g>
            		</svg>
				</Link>
			</div>
		</section>
		<section class="card-horizontal">
			<div class="img-square-wrapper w-25 m-auto text-center">
				<img
					className="img-fluid"
					src=" data:image/png;base64,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"
				/>
			</div>
			<div class="card-body">
				<h2 className="mt-3">
					Home Delivery or Click & Pick
				</h2>
				<p>
					With over 1500+ store network and multiple
					delivery options, we offer you unparalleled
					convenience. Order online Upload Prescription
					for Medicines Opt for Home Delivery or Order
					online Select a MedPlus store for Pickup Show
					your prescription at store when pickup your
					medicine
				</p>
				<Link to="/storelocator" title="Store Locator" className="btn btn-link ml-n3">
					Store Locator
					<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 18.001 18" className='mx-2'>
                        <g id="right_black_icon_18px" transform="translate(-48.941 -351.847)">
                          <rect id="BG_Guide" data-name="BG Guide" width="15" height="15" transform="translate(48.941 351.847)" fill="none" />
                          <path id="Path_22926" data-name="Path 22926" d="M58.6,354.508a1.275,1.275,0,0,0-.179.537.771.771,0,0,0,.269.536l5.635,5.188H49.657a.715.715,0,1,0,0,1.431H64.325l-5.546,5.188a.7.7,0,0,0,0,.984.709.709,0,0,0,.984.089l6.977-6.44a.7.7,0,0,0,0-.984l-6.977-6.53a.684.684,0,0,0-.447-.178C58.869,354.24,58.69,354.329,58.6,354.508Z" transform="translate(0 -0.448)" fill="#080808" />
                        </g>
            </svg>
				</Link>
			</div>
		</section>
		<section class="card-horizontal">
			<div class="img-square-wrapper w-25 m-auto text-center">
				<img class="img-fluid" src="data:image/png;base64,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" />
			</div>
			<div class="card-body">
				<h2>Order from Anywhere,<br />
					Anytime - Guaranteed Availability</h2>
				<p>Order on our website, mobile app or just call our customer care at 040-67006700.<br />With us, what you see is what you get since we display only products we have available with us right now in our warehouse. No gimmicks.</p>
				<Link to="https://play.google.com/store/apps/details?id=com.medplus.mobile.android" title="Download App" target="_blank">Download App
				<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 18.001 18" className='mx-2'>
                        <g id="right_black_icon_18px" transform="translate(-48.941 -351.847)">
                          <rect id="BG_Guide" data-name="BG Guide" width="15" height="15" transform="translate(48.941 351.847)" fill="none" />
                          <path id="Path_22926" data-name="Path 22926" d="M58.6,354.508a1.275,1.275,0,0,0-.179.537.771.771,0,0,0,.269.536l5.635,5.188H49.657a.715.715,0,1,0,0,1.431H64.325l-5.546,5.188a.7.7,0,0,0,0,.984.709.709,0,0,0,.984.089l6.977-6.44a.7.7,0,0,0,0-.984l-6.977-6.53a.684.684,0,0,0-.447-.178C58.869,354.24,58.69,354.329,58.6,354.508Z" transform="translate(0 -0.448)" fill="#080808" />
                        </g>
            </svg>
				</Link><Link title="contact customer care" class="ml-3" to="/contactUs">Contact Customer Care
				<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 18.001 18" className='mx-2'>
                        <g id="right_black_icon_18px" transform="translate(-48.941 -351.847)">
                          <rect id="BG_Guide" data-name="BG Guide" width="15" height="15" transform="translate(48.941 351.847)" fill="none" />
                          <path id="Path_22926" data-name="Path 22926" d="M58.6,354.508a1.275,1.275,0,0,0-.179.537.771.771,0,0,0,.269.536l5.635,5.188H49.657a.715.715,0,1,0,0,1.431H64.325l-5.546,5.188a.7.7,0,0,0,0,.984.709.709,0,0,0,.984.089l6.977-6.44a.7.7,0,0,0,0-.984l-6.977-6.53a.684.684,0,0,0-.447-.178C58.869,354.24,58.69,354.329,58.6,354.508Z" transform="translate(0 -0.448)" fill="#080808" />
                        </g>
            	</svg>
				</Link>
			</div>
		</section>
		<section class="card-horizontal">
			<div class="img-square-wrapper w-25 m-auto text-center">
				<img class="img-fluid" alt="No Preview Available" data-pagespeed-url-hash="1849342872" src="data:image/png;base64,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" />
				</div>
				<div class="card-body">
				<h2 className="mt-3">Best Deals &amp; Discounts</h2>
				<p>
					Shopping at MedPlus Mart provides you best value for your money with industry leading discounts and promotions. You can save even more with our reward programme - FlexiRewards.
				</p>
				<Link to="/pharmaHome" title="Promotions on Prescription Medicine" className="btn btn-link ml-n3">
					Promotions on Prescription Medicine
					<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 18.001 18" className='mx-2'>
                        <g id="right_black_icon_18px" transform="translate(-48.941 -351.847)">
                          <rect id="BG_Guide" data-name="BG Guide" width="15" height="15" transform="translate(48.941 351.847)" fill="none" />
                          <path id="Path_22926" data-name="Path 22926" d="M58.6,354.508a1.275,1.275,0,0,0-.179.537.771.771,0,0,0,.269.536l5.635,5.188H49.657a.715.715,0,1,0,0,1.431H64.325l-5.546,5.188a.7.7,0,0,0,0,.984.709.709,0,0,0,.984.089l6.977-6.44a.7.7,0,0,0,0-.984l-6.977-6.53a.684.684,0,0,0-.447-.178C58.869,354.24,58.69,354.329,58.6,354.508Z" transform="translate(0 -0.448)" fill="#080808" />
                        </g>
            </svg>	
				</Link>
			</div>
		</section>
		<section class="card-horizontal">
			<div class="img-square-wrapper w-25 m-auto text-center">
				<img className="img-fluid" src="data:image/png;base64,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"
				/>
			</div>
			<div class="card-body">
				<h2 className="mt-3">
					All your Health Records & Bills in one place
				</h2>
				<p>
					We offer unlimited storage for all your records.
					Just upload, save & access from anywhere.
					Whether you shop online or offline with us,
					access all your bills at MedPlusMart.com.{" "}
				</p>
				<Link to="/myProfile" title="Your Account" className="btn btn-link ml-n3">
					Your Account
					<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 18.001 18" className='mx-2'>
                        <g id="right_black_icon_18px" transform="translate(-48.941 -351.847)">
                          <rect id="BG_Guide" data-name="BG Guide" width="15" height="15" transform="translate(48.941 351.847)" fill="none" />
                          <path id="Path_22926" data-name="Path 22926" d="M58.6,354.508a1.275,1.275,0,0,0-.179.537.771.771,0,0,0,.269.536l5.635,5.188H49.657a.715.715,0,1,0,0,1.431H64.325l-5.546,5.188a.7.7,0,0,0,0,.984.709.709,0,0,0,.984.089l6.977-6.44a.7.7,0,0,0,0-.984l-6.977-6.53a.684.684,0,0,0-.447-.178C58.869,354.24,58.69,354.329,58.6,354.508Z" transform="translate(0 -0.448)" fill="#080808" />
                        </g>
            </svg>
				</Link>
			</div>
		</section>
		<section class="card-horizontal">
		<div class="img-square-wrapper w-25 m-auto text-center">
			<img class="margin-t-20 padding-t" alt="No Preview Available" data-pagespeed-url-hash="3328157293" src=" data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF0AAABlCAYAAAAvWO8DAAAJMElEQVR4nO2cPYsjyRnH+xtovoEUaqkqjXaZ8832rtTCxggOH9oDDxjDWUI4WTBoMGxiBqbtbIKDicRtJIEcOJtOHJxZIQWGW1AgBRfIkRTcIEa9MEJcOvM4mG7RavV7VXV1a/WHJ5FarepfV//rqbeWJM6CxesKLEsNuCurrrEsNWDxusK7LHsr+FkuPizL14+6MoFPFQgbj7oyeViWr+Gu9Eb0tSRasDjNwV1ZfdSVeRTQrqErq4dl+RoWpznR15gYweI0B8tylylot1iWu581fJgVj+CurMYC2wn+rHgkmkGsgsXrCnMbiWA7n43nC6vdLvGwLF+LZsJVsXl3yHjUlcne2Q3MikdR078D+AhKA/C9A59US9lb8ElrNAPHstwVzS6SYPG6IhweFfhSQzTDUIJZ8Qh0ZSUcHE3oyipVvdeHZflaODQm4MtD0SwDCRanOeGwWEYahotBLw95XPz0Ywlab0+gUCikNjDGc4yxyhY4p1qu/fOlcGAsgxAyyeVybNJSHjn5vgG3gO/SA+eQsfgBb377IrY4OSl8JIQMI8bEqfz5fD5HWctLjbhreJwN6oNeOqfhQwjp2suPEKI6J1NrcQLu9Fmc0B91ZUIF6An8f+wWgzGuIISK0aAzspbRh1eOwOFTRSh0+FQB2jEZQsjQ7ak1MptKcOCMspbpxxLIL48dgScCOmXO7gXdAj/Yf8Bd6Q1v4ImAfldWY4A+DwidbjQxCPBEQKccfcQYX9s93amBDVTbaRrRoMATAZ1yLAZjrNrgqpK0m9kE6rVG7fqv58oO8It3X7gev6/QMcaVWKCv5wqcffM8MPD1XBEP/VMFUg394t0XoYDbb9ABekjotz+VQ3Xpq78t7hzfentygB6m4L33p55pU5AYfXgVO/BHXZmnFnr7uy+pgLtlN9wjUQ1pyDw9KvSzb55DX5PFAE8a9Ae9dE4Dvff+FEYfXnnGeq6Ig20GZY+UbU0PudzCDl2EP0cKymUZTKFLkiR9FtB/lqMNwXKDHqIxTSN02syFC/Qwvp5G6CyW2rGv6SHG1INA72sytL/7MjHxpz8+/xfGWA0RFe7QJUmSgi6J9oN+9fdfUXeekhB2eFygB52c9oPe/PaFcGAsghAy5A7dqO2+G7j8oNP2WJMS9tl+btCD1PY0efpf//JiGNLLVYyx6jTD7zZZQQ09SG1PTfaiKyuWuzLsc6RMofv1UFMDnfHGAK7QJcl7jXoqoHNYm84duteuusRDZ2wrprg1pFbB4jTntPLLD/p6rkDv/amwxvPrr46/j9J42hrSnXWKsUCXpKd3t9jB+0G3z5+mNWLpHAUFf+gcxQDdDt4P+r5sBHj27NnWWza45ule4B91ZR6kIb39qew7m8Qifvzh5S/vzot/xhhXWIbTgn/u2Ysr+Fnx6B9/O5n6QY8rLYxzS7ow6MafqEKh68qKdmdFFCUK+o8/vPwlNuAC3+OFbat2hUL/+qvj38FdWeW2tV1XVkl4aVrs2YvPn1fM72BZauj/K/279faEekfc798U9d/8+nhaLOL/BtkFR73xKvx1q8bnYqFLkiQRQjRRaV7kTVfRrls1Pk8EdN9tIrzCXhbO160an4uHjjGuEEJWcQO39yBjuG7VvF7h0PdVB+gCdIAuQAfoAnSALkAH6DEIIVTEGKuEEI0QMsQYz23Z0keEUAMh9IcDdArlcrkjY8puC3DIvoLKvGBBoAfpIBFCVoQQLSk3zajVO/0LWZah2WxuxdnZmdd1dbkUjgV02zmEvZIbIVS0v72oWq1Cr9eD29tb8FK/34eLiwv+tZ0H9EKBweuZIsgAvrLC1jTNE7STbm9vd+ATQjRmL1gL6ulO4CXpyTedBsXsc5K8ZQfearVgvV6HBm7VaDQCWZbZD03QQjfOUbF/Z30kvYZwMcbXLkO7jaDXkM/nc1bg7XabCrZV6/V6y/OZeDwL6AihhgP0zXl8GmBH6wrjo9ZzXF1dMQNuBV+tVtk9xTTQzbzXr8XnCR0hdG61FF6aTqcbqyGErKj8nQa6U7gsYas4vQ+REDIxvLhr+azrtmzCLqM9WRUKT6kgrYf7qdfrscloWEMnhKycZnwMQE7gh1bgYcputbWgPt7pdKBWq8Hx8TFIkgSKokC9XofxeLw5ptVqwWAwcPy9aTNUtZ0Gej6fz9ln1Y1zzJ3OYfQQHXuHUS7CvIlBavl4PN6AdotWqwX1eh0kSXKFrmma9aluhCnvRixSRieIxg3Zsgm32m6t9UHLnc/nc0Ebz9lsBplMZgM3k8lAvV6Hy8tLqNVqjjfADfp6vd7K3YVAlyTnhtJsYE3vswNHCJ272E03SLmt1tLv9z2hK4qygVmv1+H+/n7r+5ubm8DQAZ7sx3w6uUE3cumdcQwjny56ebyR4WyN6hFCVsY5uy43bOL36FrL7aXBYLAF3K7xeLz1FASB3m63N2WN5Ou0wwBGZuIIz/Q9NyvxOa/qVW7zSZJl2RN6q9XagLTX8NlsBoqiQDabDQV9NBr5OgN36B6ZyUSSXO2HFvqwUChAs9n0hG5ai6IonscBPNX6m5sbuLy8hNlsJha6MQHguAzZ+nghhBrYsuXE/M7pdwihotd5/fJ0HtCDKhboSZQJvVqtegIyU8BsNnuATqugDWmn09n4dKfT8TxWURRQFAVqtZrncdaeaaQh7LRCt465TKdTV0D39/eb7CSTyWz1PK2yNrhOWY5V1rH2SIVPMfRNquo3BGDPw+v1OgwGAxgMBtDpdLby+Ewms5Pl2GUZ+BpGKrwdOpc5QU4yc38/XwfYthm3yGazrk+CqX6/b02Hoy3ntkNPE3hr2f16pQBPKaFTtz+TycDl5aVvDQcAaDabdH4uSduPaZojSG23yrQXv5ptlTVroa6YItegswyW03R22WePqCfe/Ub/0hRRZv+DyGorTJdk0K6GSkLIsgyj0YgpcGuKaA5tHCTtTo73ej1q2Ov12l7D58zWvuyL7OCbzabvqi43aZq2teYFYzznufEs1UIINexj/xcXF569VmvN1jRtq8E0LGV4qOE+MhYf7WRksixDq9WCdru9FVdXV1s2YoG94rJqd59lTLCETofNmS0R6zH3Rvl8PmfMyQ7dtmcSQiaEkC5CqHGwkhTo/wCm9Lufv2kvAAAAAElFTkSuQmCC" />
		</div>
		<div class="card-body">
		<h2>One Click Re-order</h2>
		<p>Buy the same products regularly? Your order history displays all previous orders   just select, verify quantity and click order. Its as easy as that.</p>
			<Link to="/ordersHistory" title="Orders History" className="btn btn-link ml-n3">
			Orders History
			<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 18.001 18" className='mx-2'>
                        <g id="right_black_icon_18px" transform="translate(-48.941 -351.847)">
                          <rect id="BG_Guide" data-name="BG Guide" width="15" height="15" transform="translate(48.941 351.847)" fill="none" />
                          <path id="Path_22926" data-name="Path 22926" d="M58.6,354.508a1.275,1.275,0,0,0-.179.537.771.771,0,0,0,.269.536l5.635,5.188H49.657a.715.715,0,1,0,0,1.431H64.325l-5.546,5.188a.7.7,0,0,0,0,.984.709.709,0,0,0,.984.089l6.977-6.44a.7.7,0,0,0,0-.984l-6.977-6.53a.684.684,0,0,0-.447-.178C58.869,354.24,58.69,354.329,58.6,354.508Z" transform="translate(0 -0.448)" fill="#080808" />
                        </g>
            </svg>
			</Link>
		</div>
	</section>
		<section class="card-horizontal">
		<div class="img-square-wrapper w-25 m-auto text-center">
			<img className="img-fluid"
				src="data:image/png;base64,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"
				alt="No Preview Available"
				data-pagespeed-url-hash="1989962404"
			 />
		</div>
		<div class="card-body">
		<h2>Safe &amp; Secure Shopping</h2>
		 <p>We value your privacy and secure your personal information with industryleading security standards for transmission and storage of data.</p>
			<Link to="/privacypolicy" title="Privacy & Security Policy" className="btn btn-link ml-n3">
			Privacy & Security Policy
			<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 18.001 18" className='mx-2'>
                        <g id="right_black_icon_18px" transform="translate(-48.941 -351.847)">
                          <rect id="BG_Guide" data-name="BG Guide" width="15" height="15" transform="translate(48.941 351.847)" fill="none" />
                          <path id="Path_22926" data-name="Path 22926" d="M58.6,354.508a1.275,1.275,0,0,0-.179.537.771.771,0,0,0,.269.536l5.635,5.188H49.657a.715.715,0,1,0,0,1.431H64.325l-5.546,5.188a.7.7,0,0,0,0,.984.709.709,0,0,0,.984.089l6.977-6.44a.7.7,0,0,0,0-.984l-6.977-6.53a.684.684,0,0,0-.447-.178C58.869,354.24,58.69,354.329,58.6,354.508Z" transform="translate(0 -0.448)" fill="#080808" />
                        </g>
            </svg>
			</Link>
		</div>
	</section>
	</div>
		</React.Fragment>
	);
};

export default SafeAndSecure;
