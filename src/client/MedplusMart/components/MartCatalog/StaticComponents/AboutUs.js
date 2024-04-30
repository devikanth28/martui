import React, { useEffect, useState } from "react";
import BreadCrumbAction from "../../../../../redux/action/BreadCrumbAction";
import MetaTitle from "../../../../commonComponents/MetaTitle";

const AboutUs = (props) => {

	const breadCrumbAction =  BreadCrumbAction();
	useEffect(()=>{
		breadCrumbAction.pushBreadCrumbs({name:'About Us',url:props.location.pathname});
	},[])
	
	return (
		<React.Fragment>
		<MetaTitle defaultValue={"About Us - MedPlusMart"}/>
			<section class="static-pages about-us">
				<h6>About Us</h6>
				<span>
					<a href="https://www.medplusmart.com" title="MedPlus Mart">MedPlusMart.com</a> is the online gateway to
					your favourite medical and general store, MedPlus. With over
					2980 pharmacy stores and omni-channel service, MedPlus is
					trusted by over 3 lakh customers daily across 7 states in
					India.
				</span>
				<br />
				<span>
					At medplusmart.com you can order the products you regularly
					buy from our stores from the convenience of home and pick
					them up from a MedPlus store near you. To start shopping,
					simply search for the products you wish to buy, choose the
					quantity and place the order. We will inform you when the
					medicines are ready for pick up. All orders are filled
					within 6 hrs during the regular business hours and on the
					next day for evening or weekend orders.
				</span>
				<br />
				<span>
					At medplusmart.com, you can also view or{" "}
					<strong>take prints</strong> of all your previous{" "}
					<strong>MedPlus bills</strong>, and conveniently{" "}
					<strong>reorder</strong> the products you bought earlier.
					Regardless of how you shop at MedPlus, be assured that we
					will continue to offer you high quality and genuine
					products, stored and handled in optimal conditions at
					attractive discounts.
				</span>
				<br />
				<span>
					MedPlus has always been and continue to be your one-stop
					shop for all your{" "}
					<strong>medicines and general product</strong> needs, now
					with the added convenience of shopping from home at the
					click of a button.
				</span>
			</section>
		</React.Fragment>
	);
};

export default AboutUs;
