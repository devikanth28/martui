import React, { useEffect } from "react";
import BreadCrumbAction from "../../../../../redux/action/BreadCrumbAction";
import MetaTitle from "../../../../commonComponents/MetaTitle";
import ContactUsImg from "../../../../images/common/contact-us-img.svg";

const ContactUs = (props) => {

	const breadCrumbAction =  BreadCrumbAction();
	useEffect(()=>{
		breadCrumbAction.pushBreadCrumbs({name:'Contact Us',url:props.location.pathname});
	},[])

	return (
		<React.Fragment>
		<MetaTitle defaultValue={"Contact Us - MedPlusMart"}/>
			<section className="static-pages contact-us">
				<h6>Contact Us</h6>
				<div className="img-container">
					<img
						src={ContactUsImg}
						alt="Contact Us Images"
						title="Contact Us Image"
					/>
				</div>
				<p className="d-flex">
					Just call <strong>040 - 6700 6700</strong>
				</p>
				<p>You can email us @</p>
				<ol>
					<li>
						<span>Level 1 - General enquiries</span>
						<a
							href="mailto:wecare@medplusindia.com"
							title="wecare@medplusindia.com"
						>
							wecare (at) medplusindia (dot) com
						</a>
					</li>
					<li>
						<span>Level 2 - Escalation</span>
						<a
							href="mailto:escalations@medplusindia.com"
							title="escalations@medplusindia.com"
						>
							escalations (at) medplusindia (dot) com
						</a>
					</li>
					<li>
						<span>Level 3 - Service Quality</span>
						<a
							href="mailto:headservicequality@medplusindia.com"
							title="headservicequality@medplusindia.com"
						>
							headservicequality (at) medplusindia (dot) com
						</a>
					</li>
					<li>
						<span>Level 4 - Grievance Redressal</span>
						<a
							href="mailto:grievanceofficer@medplusindia.com"
							title="grievanceofficer@medplusindia.com"
						>
							grievanceofficer (at) medplusindia (dot) com
						</a>
					</li>
				</ol>
				<p className="text-center">
					<span>
						Customer service available: 6 AM - 10 PM daily
					</span>
					<span>
						Please leave a message at all other times. We will get
						back to you.
					</span>
				</p>
			</section>
		</React.Fragment>
	);
};

export default ContactUs;
