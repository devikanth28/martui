import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { UncontrolledCollapse} from "reactstrap";
import BreadCrumbAction from "../../../../../redux/action/BreadCrumbAction";
import MetaTitle from "../../../../commonComponents/MetaTitle";
import SignInPopUp from "../../../../components/Common/signInModelBox/SignInPopUp";
import Validate from "../../../../helpers/Validate";
import faqIcon from "../../../../../client/images/common/faq-icon.svg"
const Faq = (props) => {

	const validate = Validate();
	const userInfo = useSelector(state => state?.userInfo?.userInfo ?  state.userInfo.userInfo : null);
	const [showSigninPopup, setShowSigninPopup] = useState(false);
	const breadCrumbAction =  BreadCrumbAction();
	useEffect(()=>{
		breadCrumbAction.pushBreadCrumbs({name:'Frequently Asked Questions',url:props.location.pathname});

	},[])
	const [openedSections, setOpenedSections] = useState([]);
	const handleClick = (i) => {
		let temp = [...openedSections]
		temp[i] = !temp[i]
		setOpenedSections(temp)
		
    }

	return (
		<React.Fragment>
		<MetaTitle defaultValue={"Frequently Asked Questions - MedPlusMart"}/>
			<section class="frequently-asked-container static-pages">
				<div className="faq-content question-container">
				<h6>Frequently Asked Questions</h6>
				<p className="font-14 text-secondary">
					To help you navigate our site better and make your shopping
					experience easier, we have provided answers to some
					frequently asked questions. You are always welcome to call
					our customer service if your question remains unanswered.
				</p>

				<section>
						<a id={'toggle' + 0} className="pointer" onClick={() => handleClick(0)} title="Click To See The Answer">
						What products are available at medplusmart.com
						<svg class={`mr-2 ${openedSections[0] ? "collapse-arrow rotate-bottom-half":"collapse-arrow rotate-up-half"}`} width="16" height="16" viewBox="0 0 16 16"><g transform="translate(884.477 -762) rotate(90)"><rect fill="none" width="16" height="16" transform="translate(762 868.477)"></rect><path fill="#343a40" d="M59.879,465.752l-3.694,3.694a.837.837,0,1,0,1.184,1.184l3.1-3.093,3.1,3.1a.84.84,0,0,0,1.432-.592.832.832,0,0,0-.248-.592l-3.7-3.7A.84.84,0,0,0,59.879,465.752Z" transform="translate(709.685 408.091)"></path></g></svg>
						</a>
						<div className="collapse-container">
							<UncontrolledCollapse toggler={"#toggle" + 0}>
								<div className="faq-answer">
								<p>
									<a href="https://www.medplusmart.com" title="MedPlusMart" className="d-inline text-danger pl-0">Medplusmart.com</a> is an online extension of
									your medplus store with a wider range of
									medical and general products. You can
									purchase anything that you usually buy at a
									MedPlus store plus more. Just type the name
									of the product you need in our search box
									and select from the displayed options to
									start shopping.
								</p>
								</div>
							</UncontrolledCollapse>
						</div>
				</section>
				<section>
					
						
						<a id={'toggle' + 1} className="pointer" onClick={() => handleClick(1)} title="Click To See The Answer">
						How do I place an order?
						<span>
						<svg class={`mr-2 ${openedSections[1] ? "collapse-arrow rotate-bottom-half":"collapse-arrow rotate-up-half"}`} width="16" height="16" viewBox="0 0 16 16"><g transform="translate(884.477 -762) rotate(90)"><rect fill="none" width="16" height="16" transform="translate(762 868.477)"></rect><path fill="#343a40" d="M59.879,465.752l-3.694,3.694a.837.837,0,1,0,1.184,1.184l3.1-3.093,3.1,3.1a.84.84,0,0,0,1.432-.592.832.832,0,0,0-.248-.592l-3.7-3.7A.84.84,0,0,0,59.879,465.752Z" transform="translate(709.685 408.091)"></path></g></svg>
						</span>
						</a>
					

					<UncontrolledCollapse toggler={'#toggle' + 1}>
						<div className="faq-answer">
								<p>
									For placing a new order, go to online
									orders, type the name of the product you
									wish to purchase in the search box, select
									from the displayed options, review the
									product details, enter a quantity and add to
									cart. Once all required items are added to
									the cart, click on checkout, verify the
									order, select a delivery mode and enter the
									required details and submit the order.
								</p>
								<p>
									You will receive a confirmation mail to your
									registered email ID with the order details
									and an <strong className="font-weight-bolder">SMS</strong> on your registered mobile number
									updating you about the order status.
								</p>
								<p>
									If you order contains medicines please show
									your prescription to our delivery assistant
									or store assistant at the time of receipt of
									the products and payment.
								</p>
								</div>
					</UncontrolledCollapse>
				</section>
				<section>
					
						
						<a id={'toggle' + 2} className="pointer" onClick={()=>handleClick(2)} title="Click To See Answer">
						Do I have to be a existing MedPlus customer to shop at
						medplusmart.com ?
						<span>
						<svg class={`mr-2 ${openedSections[2] ? "collapse-arrow rotate-bottom-half":"collapse-arrow rotate-up-half"}`} width="16" height="16" viewBox="0 0 16 16"><g transform="translate(884.477 -762) rotate(90)"><rect fill="none" width="16" height="16" transform="translate(762 868.477)"></rect><path fill="#343a40" d="M59.879,465.752l-3.694,3.694a.837.837,0,1,0,1.184,1.184l3.1-3.093,3.1,3.1a.84.84,0,0,0,1.432-.592.832.832,0,0,0-.248-.592l-3.7-3.7A.84.84,0,0,0,59.879,465.752Z" transform="translate(709.685 408.091)"></path></g></svg>
						</span>
						</a>
					
					<UncontrolledCollapse toggler={'#toggle' + 2}>
								<p className="faq-answer">
									No. <a href="https://www.medplusmart.com" title="MedPlusMart" className="d-inline text-danger pl-0">Medplusmart.com</a> is open to new and
									returning customers. If you are an existing
									customer of MedPlus and have a store issued
									MedPlus Card or ID, by creating an online
									account and registering your card, you will
									be able to view and print all your previous
									bills and conveniently reorder from them.
								</p>
					</UncontrolledCollapse>
				</section>
				<section>
						<a id={'toggle' + 3} className="pointer" onClick={() => handleClick(3)} title="Click To See The Answer">
						Do I have to create an account to shop at
						medplusmart.com
						<span>
						<svg class={`mr-2 ${openedSections[3] ? "collapse-arrow rotate-bottom-half":"collapse-arrow rotate-up-half"}`} width="16" height="16" viewBox="0 0 16 16"><g transform="translate(884.477 -762) rotate(90)"><rect fill="none" width="16" height="16" transform="translate(762 868.477)"></rect><path fill="#343a40" d="M59.879,465.752l-3.694,3.694a.837.837,0,1,0,1.184,1.184l3.1-3.093,3.1,3.1a.84.84,0,0,0,1.432-.592.832.832,0,0,0-.248-.592l-3.7-3.7A.84.84,0,0,0,59.879,465.752Z" transform="translate(709.685 408.091)"></path></g></svg>
						</span>
						</a>
					<UncontrolledCollapse toggler={"#toggle" + 3}>
						<div className="faq-answer">
								<p>
									Yes, it is mandatory to create an account on
									medplusmart.com to be able to shop online.
									Even if you are an existing MedPlus
									customer, you are required to create an
									online account for yourself to shop at
									medplusmart.com. While creating the account
									or at a later point of time, you will be
									able to combine your online and offline
									accounts to:
								</p>
								<p>View or print your previous bills</p>
								<p>Reorder products conveniently</p>
								<p>Track your ValuePlus loyalty points</p>
								<p>
									To create an account you must have a valid
									email address and a mobile number. If you'd
									like to create an account now and enjoy
									these benefits, please<Link to="/myProfile" title={validate.isEmpty(userInfo) ? " Login / Sign Up": " Click Here To View My Account"} className="d-inline text-danger pl-0" >{validate.isEmpty(userInfo) ? " Login / Sign Up": " Click Here To View My Account"}</Link>
								</p>
								</div>
					</UncontrolledCollapse>
				</section>
				<section>
						<a id={'toggle' + 4} className="pointer" onClick={() => handleClick(4)} title="Click To See The Answer">
						How do I create an account?
						<span>
						<svg class={`mr-2 ${openedSections[4] ? "collapse-arrow rotate-bottom-half":"collapse-arrow rotate-up-half"}`} width="16" height="16" viewBox="0 0 16 16"><g transform="translate(884.477 -762) rotate(90)"><rect fill="none" width="16" height="16" transform="translate(762 868.477)"></rect><path fill="#343a40" d="M59.879,465.752l-3.694,3.694a.837.837,0,1,0,1.184,1.184l3.1-3.093,3.1,3.1a.84.84,0,0,0,1.432-.592.832.832,0,0,0-.248-.592l-3.7-3.7A.84.84,0,0,0,59.879,465.752Z" transform="translate(709.685 408.091)"></path></g></svg>
						</span>
						</a>
					<UncontrolledCollapse toggler={"#toggle" + 4}>
						<div className="faq-answer">
								<p>
									Click on <Link to="/myProfile" title={validate.isEmpty(userInfo) ? " Login / Sign Up ": " Click Here To View My Account "} className="d-inline text-danger pl-0" >{validate.isEmpty(userInfo) ? " Login / Sign Up": " Click Here To View My Account"}</Link>{" "}
									 at the top of any page on the website. Then
									click on Register now. Enter your email
									address and password. Re-enter your password
									to create an account. Your email ID will be
									used as your default username for your
									account.
								</p>
								<p>
									While choosing a password, please remember
									that:
								</p>
								<ol>
									<li>
										Passwords are case sensitive. For
										example Password and password will be
										treated as different from one another.
									</li>
									<li>
										Passwords must be of 6 or more
										characters.
									</li>
									<li>
										Adding numbers and special characters to
										your password will make them difficult
										to hack.
									</li>
								</ol>
								<p>
									While registering, you can opt to combine
									your offline MedPlus ID to your online
									account by providing your MedPlus ID or
									registered mobile number. You will be
									required to enter a OTP sent to your phone
									to complete the registration process.
								</p>
								<p>
									If you are not an existing MedPlus customer,
									you can create a MedPlus ID while completing
									the registration process.
								</p>
								<p>
									You have an option to do this anytime later
									by visiting the{" "}
									<strong class="txtshadowsml">
										'My Account'
									</strong>{" "}
									section of the website. If you would like to
									create a new account now, please{" "}
									<Link to="/myProfile" title={validate.isEmpty(userInfo) ? " Login / Sign Up": " Click Here To View My Account"} className="d-inline text-danger pl-0" >{validate.isEmpty(userInfo) ? " Login / Sign Up": " Click Here To View My Account"}</Link>
									
								</p>
							</div>
					</UncontrolledCollapse>
				</section>
				<section>
						<a id={"toggle" + 5} className="pointer" onClick={() => handleClick(5)} title="Click To see Answer">
						I have a MedPlus store issued Customer ID number. How do
						I link it to my online account?
						<span>
						<svg class={`mr-2 ${openedSections[5] ? "collapse-arrow rotate-bottom-half":"collapse-arrow rotate-up-half"}`} width="16" height="16" viewBox="0 0 16 16"><g transform="translate(884.477 -762) rotate(90)"><rect fill="none" width="16" height="16" transform="translate(762 868.477)"></rect><path fill="#343a40" d="M59.879,465.752l-3.694,3.694a.837.837,0,1,0,1.184,1.184l3.1-3.093,3.1,3.1a.84.84,0,0,0,1.432-.592.832.832,0,0,0-.248-.592l-3.7-3.7A.84.84,0,0,0,59.879,465.752Z" transform="translate(709.685 408.091)"></path></g></svg>
						</span>
						</a>
					<UncontrolledCollapse toggler={"#toggle" + 5}>
								<p className="faq-answer">
									At the time of online account creation,
									select the option "I have a store issued
									MedPlus ID" and follow the instructions. You
									will be required to enter a OTP sent to your
									registered mobile number to complete the
									process. Alternatively, if you have already
									created an online account, go the My
									Account, then click My MedPlus Card. Select
									the box 'Register my store issued MedPlus
									Card'. Provide your MedPlus Card no and
									registered mobile no. and follow the
									instructions.
								</p>
					</UncontrolledCollapse>
				</section>
				<section>
						<a id={"toggle" + 6} className="pointer" onClick={() => handleClick(6)} title="Click To See The Answer">
						I am a registered user. How do I Edit/Manage{" "}
						<strong class="txtshadowsml">MY ACCOUNT</strong>?
						<span>
						<svg class={` mr-2 ${openedSections[6] ? "collapse-arrow rotate-bottom-half":"collapse-arrow rotate-up-half"}`} width="16" height="16" viewBox="0 0 16 16"><g transform="translate(884.477 -762) rotate(90)"><rect fill="none" width="16" height="16" transform="translate(762 868.477)"></rect><path fill="#343a40" d="M59.879,465.752l-3.694,3.694a.837.837,0,1,0,1.184,1.184l3.1-3.093,3.1,3.1a.84.84,0,0,0,1.432-.592.832.832,0,0,0-.248-.592l-3.7-3.7A.84.84,0,0,0,59.879,465.752Z" transform="translate(709.685 408.091)"></path></g></svg>
						</span>
						</a>
					<UncontrolledCollapse toggler={"#toggle" + 6}>
							  <div className="faq-answer">
								<p>
									You can edit/update/manage your personal
									information, including your name, address,
									contact information and password at any
									time. To access your account, click on{" "}
									<Link to="/myProfile" title={validate.isEmpty(userInfo) ? " Login / Sign Up ": " Click Here To View My Account "} className="d-inline text-danger pl-0" >{validate.isEmpty(userInfo) ? " Login / Sign Up": " Click Here To View My Account"}</Link>{" "}
									. Once logged in, click on the down arrow
									beside your name and click{" "}
									<strong class="font-weight-bolder">
										My Account
									</strong>
									. You will also be able to view your order
									history here.
								</p>
								<p>
									It is important to keep your account
									information accurate and up to date, since
									our customer service will be unable to help
									you if you are not able to verify the
									information provided by you in your account.
								</p>
								</div>
					</UncontrolledCollapse>
				</section>

				<section>
						<a id={"toggle" + 7} className="pointer" onClick={() => handleClick(7)} title="Click To See The Answer">
						My email ID has changed. What should I do?
						<svg class={`mr-2 ${openedSections[7] ? "collapse-arrow rotate-bottom-half":"collapse-arrow rotate-up-half"}`} width="16" height="16" viewBox="0 0 16 16"><g transform="translate(884.477 -762) rotate(90)"><rect fill="none" width="16" height="16" transform="translate(762 868.477)"></rect><path fill="#343a40" d="M59.879,465.752l-3.694,3.694a.837.837,0,1,0,1.184,1.184l3.1-3.093,3.1,3.1a.84.84,0,0,0,1.432-.592.832.832,0,0,0-.248-.592l-3.7-3.7A.84.84,0,0,0,59.879,465.752Z" transform="translate(709.685 408.091)"></path></g></svg>
						</a>
					<UncontrolledCollapse toggler={"#toggle" + 7}>
								<p className="faq-answer">
									Since your registered <strong>email ID</strong> is your
									unique user ID, we use this to keep track of
									all your transaction related information.
									This cannot be changed without creating a
									new account. You can continue to use this
									email ID as your username and update the
									contact email address in your My Account
									page. Once this is done, you will receive
									all communications at this new email
									address. However your user ID for logging
									into your account will remain the same.
								</p>
					</UncontrolledCollapse>
				</section>
				<section>
						<a id={"toggle" + 8} className="pointer" onClick={() => handleClick(8)} title="Click To See The Answer">
						I forgot my password. What should I do?
						<svg class={`mr-2 ${openedSections[8] ? "collapse-arrow rotate-bottom-half":"collapse-arrow rotate-up-half"}`} width="16" height="16" viewBox="0 0 16 16"><g transform="translate(884.477 -762) rotate(90)"><rect fill="none" width="16" height="16" transform="translate(762 868.477)"></rect><path fill="#343a40" d="M59.879,465.752l-3.694,3.694a.837.837,0,1,0,1.184,1.184l3.1-3.093,3.1,3.1a.84.84,0,0,0,1.432-.592.832.832,0,0,0-.248-.592l-3.7-3.7A.84.84,0,0,0,59.879,465.752Z" transform="translate(709.685 408.091)"></path></g></svg>
						</a>
					<UncontrolledCollapse toggler={"#toggle" + 8}>
								<p className="faq-answer">
									If you forget your password, we can email
									you a new, secure password. Click on{" "}
									<strong className="font-weight-bolder">
										SIGN IN/REGISTER
									</strong>{" "}
									at the top of any page on the website, and
									click on Forgot Password and enter your
									registered email ID and submit. We will send
									you a mail on your registered email ID with
									instructions on creating a new password.
								</p>
					</UncontrolledCollapse>
				</section>
				<section>
						<a id={"toggle" + 9} className="pointer" onClick={() => handleClick(9)} title="Click To See The Answer">
						Are any delivery charges applicable for online orders?
						<svg class={`mr-2 ${openedSections[9] ? "collapse-arrow rotate-bottom-half":"collapse-arrow rotate-up-half"}`} width="16" height="16" viewBox="0 0 16 16"><g transform="translate(884.477 -762) rotate(90)"><rect fill="none" width="16" height="16" transform="translate(762 868.477)"></rect><path fill="#343a40" d="M59.879,465.752l-3.694,3.694a.837.837,0,1,0,1.184,1.184l3.1-3.093,3.1,3.1a.84.84,0,0,0,1.432-.592.832.832,0,0,0-.248-.592l-3.7-3.7A.84.84,0,0,0,59.879,465.752Z" transform="translate(709.685 408.091)"></path></g></svg>
						</a>
					<UncontrolledCollapse toggler={"#toggle" + 9}>
								<p className="faq-answer">
									Yes, delivery charges may be applicable for
									some orders. This will depend on the
									destination address and order amount.
									Delivery charges will be communicated on the
									order review page before confirmation and
									payment.
								</p>
					</UncontrolledCollapse>
				</section>
				<section>
						<a id={"toggle" + 10} className="pointer" onClick={() => handleClick(10)} title="Click To See The Answer">
						How do I pay for the order?
						<svg class={`mr-2 ${openedSections[10] ? "collapse-arrow rotate-bottom-half":"collapse-arrow rotate-up-half"}`} width="16" height="16" viewBox="0 0 16 16"><g transform="translate(884.477 -762) rotate(90)"><rect fill="none" width="16" height="16" transform="translate(762 868.477)"></rect><path fill="#343a40" d="M59.879,465.752l-3.694,3.694a.837.837,0,1,0,1.184,1.184l3.1-3.093,3.1,3.1a.84.84,0,0,0,1.432-.592.832.832,0,0,0-.248-.592l-3.7-3.7A.84.84,0,0,0,59.879,465.752Z" transform="translate(709.685 408.091)"></path></g></svg>
						</a>
					<UncontrolledCollapse toggler={"#toggle" + 10}>
								<p className="faq-answer">
									At Medplusmart.com we have multiple payment
									options available for the customers.
									Customers can choose to pay through
									Debit/Credit/Net Banking/Wallets at the time
									of creating orders. We also have COD option
									available for selected locations. You are
									requested to select your locality to check
									if COD services available in your location.
								</p>
					</UncontrolledCollapse>
				</section>
				<section>
						<a id={"toggle" + 11} className="pointer" onClick={() => handleClick(11)} title="Click To See The Answer">
						How do I submit my prescription for medicine purchases?
						<svg class={`mr-2 ${openedSections[11] ? "collapse-arrow rotate-bottom-half":"collapse-arrow rotate-up-half"}`} width="16" height="16" viewBox="0 0 16 16"><g transform="translate(884.477 -762) rotate(90)"><rect fill="none" width="16" height="16" transform="translate(762 868.477)"></rect><path fill="#343a40" d="M59.879,465.752l-3.694,3.694a.837.837,0,1,0,1.184,1.184l3.1-3.093,3.1,3.1a.84.84,0,0,0,1.432-.592.832.832,0,0,0-.248-.592l-3.7-3.7A.84.84,0,0,0,59.879,465.752Z" transform="translate(709.685 408.091)"></path></g></svg>
						</a>
					<UncontrolledCollapse toggler={"#toggle" + 11}>
								<p className="faq-answer">
									You can upload prescription from your
									computer or from the list of saved
									prescription in your registered account.
									Medplus representative will verify the
									prescription for order before confirmation.
									Alternatively, have your prescription to be
									displayed to our delivery assistant or store
									assistant at the time of receipt of
									products. Please note that we will not be
									able to handover any medicine without a
									valid prescription.
								</p>
					</UncontrolledCollapse>
				</section>
				<section>
						
						<a id={"toggle" + 12} className="pointer" onClick={() => handleClick(12)} title="Click To See The Answer">
						Does my order has any expiry date for pick up?
						<svg class={`mr-2 ${openedSections[12] ? "collapse-arrow rotate-bottom-half":"collapse-arrow rotate-up-half"}`} width="16" height="16" viewBox="0 0 16 16"><g transform="translate(884.477 -762) rotate(90)"><rect fill="none" width="16" height="16" transform="translate(762 868.477)"></rect><path fill="#343a40" d="M59.879,465.752l-3.694,3.694a.837.837,0,1,0,1.184,1.184l3.1-3.093,3.1,3.1a.84.84,0,0,0,1.432-.592.832.832,0,0,0-.248-.592l-3.7-3.7A.84.84,0,0,0,59.879,465.752Z" transform="translate(709.685 408.091)"></path></g></svg>
						</a>
					<UncontrolledCollapse toggler={"#toggle" + 12}>
								<p className="faq-answer">
									Yes. The order placed by the customer
									expires after 7 days from the time when
									customer receives a message informing him
									about the readiness of the order for pick
									up. All the expired orders are cancelled
									automatically and informed to the respective
									customers through a message on the
									registered mobile number.
								</p>
					</UncontrolledCollapse>
				</section>
				<section>
						<a id={"toggle" + 13} className="pointer" onClick={() => handleClick(13)} title="Click To See The Answer">
						How do I cancel an order?
						<svg class={`mr-2 ${openedSections[13] ? "collapse-arrow rotate-bottom-half":"collapse-arrow rotate-up-half"}`} width="16" height="16" viewBox="0 0 16 16"><g transform="translate(884.477 -762) rotate(90)"><rect fill="none" width="16" height="16" transform="translate(762 868.477)"></rect><path fill="#343a40" d="M59.879,465.752l-3.694,3.694a.837.837,0,1,0,1.184,1.184l3.1-3.093,3.1,3.1a.84.84,0,0,0,1.432-.592.832.832,0,0,0-.248-.592l-3.7-3.7A.84.84,0,0,0,59.879,465.752Z" transform="translate(709.685 408.091)"></path></g></svg>
						</a>
					<UncontrolledCollapse toggler={"#toggle" + 13}>
								<p className="faq-answer">
								For guidance on <a  href="/returnsandcancellations" className="text-danger d-inline pl-0" title="Know About Cancellation Policy">Cancellation Policy</a>
								</p>
					</UncontrolledCollapse>
				</section>
				<section>
						
						<a id={"toggle" + 14} className="pointer" onClick={() => handleClick(14)} title="Click To See The Answer">
						How do I return an order?
						<svg class={`mr-2 ${openedSections[14] ? "collapse-arrow rotate-bottom-half":"collapse-arrow rotate-up-half"}`} width="16" height="16" viewBox="0 0 16 16"><g transform="translate(884.477 -762) rotate(90)"><rect fill="none" width="16" height="16" transform="translate(762 868.477)"></rect><path fill="#343a40" d="M59.879,465.752l-3.694,3.694a.837.837,0,1,0,1.184,1.184l3.1-3.093,3.1,3.1a.84.84,0,0,0,1.432-.592.832.832,0,0,0-.248-.592l-3.7-3.7A.84.84,0,0,0,59.879,465.752Z" transform="translate(709.685 408.091)"></path></g></svg>
						</a>
					<UncontrolledCollapse toggler={"#toggle" + 14}>
								<p className="faq-answer">
									For guidance on <a  href="/returnsandcancellations" className="text-danger d-inline pl-0" title="Know About Returns and Cancellations">Retuns And Cancellations</a>
								
								</p>
					</UncontrolledCollapse>
				</section>
				</div>
				<div>
					<img src={faqIcon} className="img-fluid" title="Frequently Asked Questions" alt="Frequently Asked Questions"/>
				</div>
			</section>
		</React.Fragment>
	);
};

export default Faq;
