

import React, { useState, useEffect } from 'react';
import Validate from '../../../helpers/Validate';
import SubscriptionService from '../services/SubscriptionService';
import LabsFrequentlyAskedQuestions from './LabsFrequentlyAskedQuestions';
import SubscriptionPlanDetail from './SubscriptionPlanDetail';
import SubscriptionTermsAndConditions from './SubscriptionTermsAndConditions';
import SubscriptionBanner from './SubscriptionBanner';
import { BannerPlanDetail } from '../constants/SubscriptionConstants';
import SubscriptionTNCGhostImage from './SubscriptionTNCGhostImage';
import SubscriptionFaqGhostImage from './SubscriptionFaqGhostImage';
import {getPlanIdFromUrl} from '../constants/SubscriptionConstants';
import useStaticContent from '../../Common/CustomHooks/useStaticContent';

const SubscriptionPlanDetails = (props) =>{

    const validate = Validate();
    const [subscription,setSubscription] = useState(undefined);
    let planId = getPlanIdFromUrl(props.match.params.planDetailParams);
    const [isStaticContentLoading, staticContent] = useStaticContent({itemId: validate.isNotEmpty(planId) ? "PLAN_" + planId : "", contentType: "ALL"});

    useEffect(() => {
        if(validate.isNotEmpty(staticContent)){
           subscriptionContent(staticContent);
        }
    },[staticContent])

    const subscriptionContent = (staticContent) => {
        let noOFElements=RemoveHtml(staticContent.DESC);
        let offers = ""
        for (let i = 0; i < noOFElements.length; i++) {
            offers = offers + (noOFElements[i].textContent).replace(/\n/g, " ")
        }
        setSubscription(offers);
    }

    const RemoveHtml = (content) => {
        let parser = new DOMParser()
        let faqHtml = parser.parseFromString(content, 'text/html');
        return faqHtml.getElementsByTagName('ul');
    }

    return(
        <React.Fragment>
            <SubscriptionBanner planId={planId} pageName={BannerPlanDetail} className="d-block mb-4"/>
            <SubscriptionPlanDetail {...props} history={props.history} planDesc={staticContent?.DESC} planId={planId} desc={subscription}/>
            {isStaticContentLoading && <SubscriptionFaqGhostImage/>}
            {isStaticContentLoading && <SubscriptionTNCGhostImage/>}
            {!isStaticContentLoading && validate.isNotEmpty(staticContent?.FAQ) && <LabsFrequentlyAskedQuestions faqContent={staticContent.FAQ}/>}
            {!isStaticContentLoading && validate.isNotEmpty(staticContent?.TNC) && <SubscriptionTermsAndConditions termsAndConditions={staticContent.TNC}/>}
        </React.Fragment>
    )

}

export default SubscriptionPlanDetails