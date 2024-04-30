import React from "react"
import SubscriptionBenefits from "./SubscriptionBenefits"
import MembershipPlans from "./MembershipPlans"
import LabCustomerReviews from "../LabHomePage/LabCustomerReviews"
import LabsFrequentlyAskedQuestions from "../LabHomePage/LabsFrequentlyAskedQuestions"
import CorporateSearch from "./CorporateSearch"
import SubscriptionBanner from "./SubscriptionBanner"
const LabSubscriptionHomePage =(props) =>{
    return(
        <React.Fragment>
            <div className="mb-4 pb-2">
                <section>
                    <SubscriptionBanner sectionClass="shadow-none" className="mb-n5 d-block bg-white"/>
                    <SubscriptionBenefits className="mt-3 p-48 bg-white shadow-none"/>
                </section>
            </div>
            <MembershipPlans history={props.history}/>
            <CorporateSearch history={props.history}/>
            <LabCustomerReviews/>
            <LabsFrequentlyAskedQuestions/>
        </React.Fragment>
    )
}
export default LabSubscriptionHomePage