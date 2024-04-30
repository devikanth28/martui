import React, { useEffect } from "react";
import BreadCrumbAction from "../../../../../redux/action/BreadCrumbAction";
import useStaticContent from "../../../../components/Common/CustomHooks/useStaticContent";
import Validate from "../../../../helpers/Validate";
import OfferTermsAndConditionsPlaceholders from "./OfferTermsAndConditionsPlaceholders";

const OfferTermsandConditions = (props) => {

    const validate = Validate();
    const breadCrumbAction = BreadCrumbAction();

    const [isContentLoading, content] = useStaticContent({itemId : props.isLabComponent ? "DIAGNOSTICS" : "TermsAndConditionsOffers", contentType : "ALL"});

	useEffect(() => {
        if(!props.isLabComponent) {
            breadCrumbAction.pushBreadCrumbs({
                name: "Terms & Conditions",
                url: props.location.pathname,
            });
        }
	}, []);

    useEffect(() => {
        if(!isContentLoading) {
            const eleId = props?.location?.hash?.substring(1);
            if(validate.isEmpty(eleId)) return;
            let ele = document.getElementById(eleId);
            if(ele) {
                ele.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
            }
        }
    }, [isContentLoading]);

    return (
        <React.Fragment>
           {isContentLoading && <OfferTermsAndConditionsPlaceholders/>}
           {!isContentLoading && ( props.isLabComponent ? validate.isNotEmpty(content?.TNC) : validate.isNotEmpty(content?.DESC)) && <div className={`OffersandConditions ${props.isLabComponent ? "" : 'container-fluid'}`}>
                <section className={props.isLabComponent ? "subscription-terms" : "py-4 row"}>
                    <h1 className={props.isLabComponent ? "" : "col-xs-12 col-sm-10 col-sm-offset-1 col-md-10 col-md-offset-1 m-auto"}>Terms and Conditions</h1>
                    <span dangerouslySetInnerHTML={{ __html: props.isLabComponent ? content.TNC : content.DESC }}></span>
                </section>
           </div>}
        </React.Fragment>
    )
}
export default OfferTermsandConditions