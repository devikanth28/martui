import React from "react"
import SubscriptionBanner from "./SubscriptionBanner"
import SubscriptionBenefits from "./SubscriptionBenefits"
import UpgradePlan from "./UpgradePlan"
const SubscriptionUpgrade=(props)=>{
    return(
        <React.Fragment>
            <SubscriptionBanner className="d-block mb-4"/>
            <SubscriptionBenefits />
            <UpgradePlan/>
        </React.Fragment>
    )
}
export default SubscriptionUpgrade