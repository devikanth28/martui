import React from "react"
import SubscriptionBanner from "./SubscriptionBanner"
import SubscriptionPlanDetail from "./SubscriptionPlanDetail"
import LabCustomerReviews from "../LabHomePage/LabCustomerReviews"
import LabsFrequentlyAskedQuestions from "../LabHomePage/LabsFrequentlyAskedQuestions"
import SubscriptionTermsAndConditions from "./SubscriptionTermsAndConditions"
const LabSubscriptionPlanDetail=(props)=>{
    return(
        <React.Fragment>
            <SubscriptionBanner className="d-block bg-white mb-4"/>
            <SubscriptionPlanDetail history={props.history}/>
            {/* <LabCustomerReviews/> */}
            <LabsFrequentlyAskedQuestions/>
            <SubscriptionTermsAndConditions/>
        </React.Fragment>
    )
}
export default LabSubscriptionPlanDetail