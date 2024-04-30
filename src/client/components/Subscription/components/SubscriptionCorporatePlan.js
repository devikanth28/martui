import React, { useEffect, useState } from "react"
import SubscriptionBanner from "./SubscriptionBanner"
import MembershipPlans from "./MembershipPlans"
import SubscriptionTermsAndConditions from "./SubscriptionTermsAndConditions"
import { useSelector } from "react-redux"
import Validate from "../../../helpers/Validate"
import SubscriptionService from "../services/SubscriptionService"
import LabsFrequentlyAskedQuestions from "./LabsFrequentlyAskedQuestions"
import { BannerCorporatePlans, MEDPLUS_ADVANTAGE_URL_PREFIX } from "../constants/SubscriptionConstants"
import SubscriptionTNCGhostImage from './SubscriptionTNCGhostImage';
import SubscriptionFaqGhostImage from './SubscriptionFaqGhostImage';

const SubscriptionCorporatePlan=(props)=>{

    const[faqContent, setFaqContent] = useState(undefined);
    const [termsAndConditions,setTermsAndConditions] = useState(undefined);
    const[contentLoader,setContentLoader] = useState(true);
    const subscriptionService  = SubscriptionService();
    const validate  = Validate();

    const companyDetails = useSelector(state=>{
        if(validate.isNotEmpty(state) && validate.isNotEmpty(state.subscription) && validate.isNotEmpty(state.subscription.companyDetails)){
            return state.subscription.companyDetails;
        }
    });

    useEffect(() => {
        if(validate.isEmpty(companyDetails)){
            props.history.replace(`${MEDPLUS_ADVANTAGE_URL_PREFIX}/companyList`);
        } else {
            subscriptionService.getSubscriptionContent({"corporateId":companyDetails.orgId}).then(data=>{
                if("SUCCESS" === data.statusCode){
                    setFaqContent(data.dataObject.FAQ);
                    setTermsAndConditions(data.dataObject.TNC);
                }
                setContentLoader(false);
            }).catch(e =>{
                console.log(e);
                setContentLoader(false);
            })
        }
    },[])
   
    return(
        <React.Fragment>
            <SubscriptionBanner pageName={BannerCorporatePlans} className="d-block mb-4"/>
            <MembershipPlans {...props} isCorporatePlan = {true} />
            {contentLoader && <SubscriptionFaqGhostImage/>}
            {contentLoader && <SubscriptionTNCGhostImage/>}
            {validate.isNotEmpty(faqContent) && <LabsFrequentlyAskedQuestions faqContent={faqContent} />}
            {termsAndConditions && <SubscriptionTermsAndConditions termsAndConditions={termsAndConditions}/>}
        </React.Fragment>
    )
}
export default SubscriptionCorporatePlan;