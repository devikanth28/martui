import React, { useEffect } from "react";
import BreadCrumbAction from "../../../../../redux/action/BreadCrumbAction";
import MetaTitle from "../../../../commonComponents/MetaTitle";
import Image from "../../../../components/Common/Image"
import CommunityDeliveryIcon from "../../../../images/common/community-intro-lg.jpg"

const CommunityDelivary = (props) => {
	const breadCrumbAction =  BreadCrumbAction();
	useEffect(()=>{
		breadCrumbAction.pushBreadCrumbs({name:'Community Services - How It Works',url:props.location.pathname});
	},[])

	return (
		<React.Fragment>
		<MetaTitle defaultValue={"Introducing Community Delivery - MedPlusMart"}/>
			<Image src={CommunityDeliveryIcon} className="img-fluid" alt="Community Delivary banner" />
			<div className="row mt-4">
				<div className="container-fluid community-delivary-bg">
					<div className="col-2"></div>
					<div className="col-10 flexiRewards-content mt-4">
						<p className="question">Community Delivery</p>
						<ol>
							<li>
								This service is an option available for select
								gated communities
							</li>
							<li>
								As part of this service, all online orders from
								the community will be delivered together once
								every day to a mutually identified drop off
								point
							</li>
							<li>
								All deliveries under this service will be free
								of shipping charges
							</li>
							<li>
								Enter your Apartment / Block details on the
								delivery details page
							</li>
							<li>
								Orders placed by 11 pm under this service, will
								be delivered the next day at the communicated
								time
							</li>
						</ol>
						<div class="community-delivery-description imgpos"></div>
					</div>
					<div className="col-12 text-center Details mt-3 pt-2">
						<p className="font-weight-bold">
							If your community is not listed here,
							<br />
							please whatsapp community details to the following
							number
						</p>
						<h4>
							<a
								href="tel:7815936188"
								className="text-primary mobile-text"
								title="contact number"
							>
								+91 781 593 6188
							</a>
						</h4>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};
export default CommunityDelivary;
