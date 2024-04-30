import React ,{useEffect,useState} from 'react';
import {useSelector } from "react-redux";
import Validate from "../../../helpers/Validate";
import CONFIG from '../../../constants/ServerConfig';
import {getPlanNameFromUrl, MEDPLUS_ADVANTAGE_HOME, MEDPLUS_ADVANTAGE_URL_PREFIX} from '../constants/SubscriptionConstants';

const SubscriptionBreadcrumb = (props) => {


    const validate = Validate();
    const [routePath,setRoutePath] = useState(props.routePath);
    const [pathName,setPathaName] = useState(props.location.pathname);
    let planName = getPlanNameFromUrl(props.match.params.planDetailParams);


    useEffect(()=>{
        setPathaName(props.location.pathname);
        setRoutePath(props.routePath);
    },[props.routePath,props.location.pathname]);

    const goToHome = () => {
        window.location.href = CONFIG.REDIRECT_HOME_URL;
    }

    const goToMedPlusAdvantageHome = () => {
        props.history.replace(`${MEDPLUS_ADVANTAGE_HOME}`);
     }

    const companyName = useSelector(state=>{
        if(validate.isNotEmpty(state) && validate.isNotEmpty(state.subscription) && validate.isNotEmpty(state.subscription.companyDetails)){
            return state.subscription.companyDetails.name;
        }
    });
    
   /*  const planName = useSelector(state=>{
        if(validate.isNotEmpty(state) && validate.isNotEmpty(state.subscription) && validate.isNotEmpty(state.subscription.planInfo)){
            return state.subscription.planInfo.name;
        }
    }); */

    
    return (
        <React.Fragment>
            <nav aria-label="breadcrumb bg-none">
                <ol className="breadcrumb bg-none mb-0" itemScope itemType='https://schema.org/BreadcrumbList'>
                    <li className="breadcrumb-item" itemProp='itemListElement' itemScope itemType='https://schema.org/ListItem'>
                        <span itemProp='name' content='home'>
                        <a href="/" itemProp='item' title = "Home">Home</a>
                        <meta itemProp='position' content='1'></meta>
                        </span>
                        </li>
                    <li className={`breadcrumb-item ${pathName == MEDPLUS_ADVANTAGE_HOME ? "text-secondary" :""}`} itemProp='itemListElement' itemScope itemType='https://schema.org/ListItem'>
                        <span itemProp='name' content="Medplus Subscription">

                        { (pathName == `${MEDPLUS_ADVANTAGE_HOME}` || pathName == `${MEDPLUS_ADVANTAGE_URL_PREFIX}/plans`) ? "MedPlus Advantage":
                        <a href={`${MEDPLUS_ADVANTAGE_HOME}`} itemProp="item" title = "MedPlus Advantage">MedPlus Advantage</a>}
                          <meta itemProp='position' content='2'></meta>
                        </span>
                    </li>
                    { routePath =='subscriptionPlanDetail' && <React.Fragment>
                        {validate.isNotEmpty(companyName) && 
                         <li className="breadcrumb-item text-secondary"><a href="javascript:void(0)" title = {(companyName ? companyName : 'Corporate') + "Membership Plans"} onClick={() => props.history.replace("/corporateMemberPlans")}> {companyName ? companyName : 'Corporate'} Membership Plans</a></li>}
                         <li className="breadcrumb-item text-secondary text-capitalize" itemProp='itemListElement' itemScope itemType='https://schema.org/ListItem'> <span itemProp='name' content={planName ? planName : "Subscription Plan Details"}>{planName ? planName : "Subscription Plan Details"}<meta itemProp='position' content='3'></meta></span></li></React.Fragment>
                    }
                    { (pathName == `${MEDPLUS_ADVANTAGE_URL_PREFIX}/subscription/login` || routePath =='subscriptionLogin' || routePath =='subscriptionCorporateLogin') && <li className="breadcrumb-item text-secondary" itemProp='itemListElement' itemScope itemType='https://schema.org/ListItem'><span itemProp='item' content="Subscription">Subscription</span></li>}
                    { (pathName == `${MEDPLUS_ADVANTAGE_URL_PREFIX}/subscription/loginOtp` || routePath =='subscriptionLoginOtp' || routePath =='subscriptionCorporateLoginOtp') && <li className="breadcrumb-item text-secondary" itemProp='itemListElement' itemScope itemType='https://schema.org/ListItem'><span itemProp='item' content="Verify OTP">Verify OTP</span></li>}
                    { routePath =='individualRegistration' && <li className="breadcrumb-item text-secondary" itemProp='itemListElement' itemScope itemType='https://schema.org/ListItem'><span itemProp='item' content="Individual Registration">Individual Registration</span></li>}
                    { routePath =='corporateRegistration' && <li className="breadcrumb-item text-secondary" itemProp='itemListElement' itemScope itemType='https://schema.org/ListItem'><span itemProp='item' content="Corporate Registration">Corporate Registration</span></li>}
                    { routePath =='MemberRegistration' && <li className="breadcrumb-item text-secondary" itemProp='itemListElement' itemScope itemType='https://schema.org/ListItem'><span itemProp='item' content="Registration">Registration</span></li>}
                    { routePath =='subscriptionPayment' && <li className="breadcrumb-item text-secondary" itemProp='itemListElement' itemScope itemType='https://schema.org/ListItem'><span itemProp='item' content="Payments">Payments</span></li>}
                    { routePath =='subscriptionThankyou' && <li className="breadcrumb-item text-secondary" itemProp='itemListElement' itemScope itemType='https://schema.org/ListItem'><span itemProp='item' content="Thank you">Thank You</span></li>}
                    { routePath =='companyList' && <li className="breadcrumb-item text-secondary" itemProp='itemListElement' itemScope itemType='https://schema.org/ListItem'><span itemProp='item' content="Select Company">Select Company</span></li>}
                    { routePath =='corporateMemberPlans' && <li className="breadcrumb-item text-secondary" itemProp='itemListElement' itemScope itemType='https://schema.org/ListItem'> <span itemProp='item' content={companyName}>{companyName ? companyName : 'Corporate'} Membership Plans</span></li>}
                </ol>
            </nav>
        </React.Fragment>
    );
}

export default SubscriptionBreadcrumb;