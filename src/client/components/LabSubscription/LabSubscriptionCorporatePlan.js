import React from "react"
import SubscriptionBanner from "./SubscriptionBanner"
import MembershipPlans from "./MembershipPlans"
import SubscriptionTermsAndConditions from "./SubscriptionTermsAndConditions"
import LabsFrequentlyAskedQuestions from "../LabHomePage/LabsFrequentlyAskedQuestions"
const LabSubscriptionCorporatePlan=(props)=>{
    return(
        <React.Fragment>
            <SubscriptionBanner className="d-block bg-white mb-4"/>
            <MembershipPlans isCorporatePlan={true} history={props.history}/>
            <LabsFrequentlyAskedQuestions/>
            <SubscriptionTermsAndConditions/>
        </React.Fragment>
    )
}
export default LabSubscriptionCorporatePlan