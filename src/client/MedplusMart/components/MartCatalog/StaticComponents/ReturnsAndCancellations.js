import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import BreadCrumbAction from "../../../../../redux/action/BreadCrumbAction";
import MetaTitle from "../../../../commonComponents/MetaTitle";

const ReturnsAndCancellations = (props) => {

	const breadCrumbAction = BreadCrumbAction();

    useEffect(() => {
        breadCrumbAction.pushBreadCrumbs({ name: 'Returns and Cancellations', url: props.location.pathname });
    }, [props.location.pathname]);

	return (
		<React.Fragment>
		<MetaTitle defaultValue={"Instant Returns and Cancellations Policy - MedPlusMart"}/>
		<section className="static-pages returns-cancel">
		
			<h1>Returns and Cancellations</h1>
			<h4>Return Policy</h4>
			<span>
				We hope you are happy with all products you bought from us, but
				if you're not entirely satisfied, you'll find details of our
				return policy below.
			</span>
			<span>
				We strongly recommend that all items be checked fully at the
				time of delivery.
			</span>
			<span>
				You're entitled to return your items within 14 working days and
				receive a full refund.
			</span>
			<span>
				In general, an item may be eligible for return within the
				applicable return window except under the following conditions:
			</span>

			<ol className="disc-list">
				<li>Perishable items.</li>
				<li>
					Unsealed items with a protective seal due to health
					protection or hygiene reasons.
				</li>
				<li>Personal hygiene products.</li>
				<li>
					{" "}
					Products bought in a clearance sale and marked as
					“non-returnable” on the category detail or product detail
					page.
				</li>
				<li>Gift cards</li>
				<li>
					In case of prescription medicines, open packages or cut
					strips.
				</li>
			</ol>
			<h4>Terms &#38; Conditions for Returns</h4>
			<p>
				All items must be returned in their original condition, with
				price tags intact, user manual, warranty cards, original
				accessories and in the original manufacturer's box/packaging as
				delivered to you.
			</p>
			<p>
				In case of medicines, items must be returned in full, in their
				original condition, with box, strip and packaging intact.
			</p>
			<p>
				If you wish to return a device that stores any personal
				information, please ensure that you have removed all such
				information from the device prior to returning. MedPlus shall
				not be liable in any manner for any misuse or usage of such
				information.
			</p>
			<p>How to return/exchange an item?</p>
			<span>
				Please contact our customer care within 14 working days of
				receiving your items by calling us at{" "}
				<strong><a className="mx-1" href="tel:04067006700" title="For all requirements please contact 040 - 67006700">040 - 6700 6700</a></strong> or completing the form on our{" "}
				<Link to="/contactUs" className="mx-1" title="Contact Us">
					Contact Us
				</Link>{" "}
				page.
			</span>
			<span>
				Once you've notified our Customer Care team about returning /
				exchanging your items, you will receive instructions about how
				and where to send or drop off your return items. The options may
				include shipping by courier, pick up by our delivery agent, or
				drop off at a designated MedPlus store. Please note that all
				options are not available in all areas and our customer care
				will make all efforts to facilitate a convenient option.
			</span>
			<span>
				Unfortunately, we're unable to cover the costs of returning your
				items unless youâ€™ve received products other than that you
				ordered; products that are damaged; or products that have a
				shelf life of less than 3 months. Please ensure products are
				properly secured and packaged and we recommend sending all
				return items via a branded courier service where required. We
				cannot be liable for any damages incurred during return transit
				through a service other than MedPlus.
			</span>
			<p>How long will it take to process my return?</p>
			<span>
				We aim to process your return within 24 hours of receiving the
				item, and initiate the refund process. However, it may take up
				to 30 working days for the payment provider to credit the refund
				amount.
			</span>
			<span>
				Please note that upon processing the return, we are entitled to
				deduct an amount from the refund to reflect any loss of revenue
				in the value of items returned, which in some cases may be up to
				100%. Any such deduction will be communicated prior to
				processing the refund amount.
			</span>
			<span>
				In some cases, we may be able to offer only a replacement or
				credit note in place of a refund. We will notify you accordingly
				as soon as the return is processed by our returns department.
			</span>
			<h4>Cancellation Policy</h4>
			<span>
				Upon placing the order, if you would like to cancel it, you can
				do so while the order status is in a created state:
			</span>
			<span className="d-inline-block">
				<u>In order to cancel the order:</u>
			</span>
			<ol>
				<li>
					Log into your Medplusmart.com account and go to <Link to="/myProfile" className="mx-1" title="Click Here To View My Account">My Account</Link> -&gt; <Link to="/ordersHistory" className="mx-1" title="Order History">Order History</Link>
				</li>
				<li>
					Identify the order you wish to cancel and click on Cancel
					button against the order
				</li>
			</ol>
			<span>
				Once the order has been approved by our team self-cancellation
				will not be available. Please contact our customer care team at
				<a href="tel:04067006700" className="mx-1" title="For all requirements please contact 040 - 67006700">040 - 6700 6700</a> for all cancellation requests.
			</span>
			<span>
				If request for cancellation is received prior to the order being
				shipped, it'll be processed immediately and a complete refund
				will be made.
			</span>
			<span>
				Once the order is shipped, cancellations will be treated as a
				return. The process outlined above in the returns policy will be
				applicable.
			</span>
			<p>Refund Process is as follows:</p>
			<ol>
				<li>
					For cancelled orders: orders which are cancelled by MedPlus
					or Customer before processing, refund will be initiated
					automatically through the original mode of payment
				</li>
				<li>
					For return orders: orders for which return has been
					processed refund will be initiated immediately. We’ll
					attempt to issue a refund through the original payment
					method. This may take up to 30 working days for the amount
					to be credited. However in some cases we may have to use an
					alternate refund process, while in some cases we may be able
					to only provide an exchange / credit note.
				</li>
			</ol>
		</section>
		</React.Fragment>
	);
};

export default ReturnsAndCancellations;
