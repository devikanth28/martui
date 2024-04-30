import { Helmet } from 'react-helmet';
import React, { useEffect } from 'react';
import LabImg from '../../images/common/mart-identity-cssbg.svg';
import AffixWrapper from '../Common/AffixWrapper';
import { getLabSelectedLocality, reloadSelectedLocalityInfo } from '../../../redux/action/LocalityAction';
import MyAccountRightMenu from '../Common/MyAccountRightMenu';
import LocationInHeader from './LocationInHeader';
import Validate from '../../helpers/Validate';
import UserInfoAction from '../../../redux/action/UserInfoAction';
import { useDispatch } from 'react-redux';
import { DIAGNOSTICS_HOME, DIAGNOSTICS_URL_PREFIX } from '../MedplusLabs/constants/LabConstants';


const LabCheckoutHeader = (props)=> {

    const dispatch = useDispatch();
    const selectedLocality = getLabSelectedLocality();
    const validate = Validate();
    const userInfoAction = UserInfoAction();
    var userInfo = userInfoAction.getUserInfo();
    
    let routePath = props.routePath ? props.routePath : '' ;
    let titleName = 'Checkout - MedPlusMart-Lab';
    let isCheckoutStepCompleted = true;
    const paymentSubPath = ['lab-payment', 'retryPayment','walletPayment','walletRechargeResponse','retryPaymentWalletRechargeResponse'];
    

    let currentCheckoutSteps = [];
    const checkoutSteps = [];
    checkoutSteps.push({path: 'lab-shopping-cart', header: 'Shopping Cart'});
    checkoutSteps.push({path: 'sample-collection', header: 'Sample Collection'});
    checkoutSteps.push({path: 'schedule-slot', header: 'Schedule A Slot'});
    checkoutSteps.push({path: 'lab-review-cart', header: 'Order Summary'});
    checkoutSteps.push({path: 'lab-payment', header: 'Payments'});
    let pathname = routePath;
    for(const eachCheckoutStep of checkoutSteps) {
        if(pathname.includes("lab-thank-you")) {
            titleName = 'Thank You - MedPlusMart';
        }
        currentCheckoutSteps.push(eachCheckoutStep);
    }

    const goToCheckoutStep = (checkoutStepPath) => {
        let completedCheckoutSteps = [];
        for(const eachCheckoutStep of currentCheckoutSteps) {
            if(eachCheckoutStep.path == routePath) {
                break;
            }
            completedCheckoutSteps.push(eachCheckoutStep.path);
        }
        if(completedCheckoutSteps.includes(checkoutStepPath)) {
            props.history.push(`${DIAGNOSTICS_URL_PREFIX}/`+ checkoutStepPath);
        }
    }

    useEffect(() => {
        reloadSelectedLocalityInfo(null,true,dispatch);
        if(validate.isEmpty(userInfo)) {
            userInfoAction.reloadUserInfo();
        }
    }, []);

    return (
        <React.Fragment>
            <Helmet>
                <title>{titleName}</title>
            </Helmet>
            <header className="checkout-process navbar-expand-md">
                <nav className={`navbar no-gutters ${'lab-thank-you' != routePath?'pb-0':''}`}>
                    <div className="col">
                        <a className="navbar-brand" onClick={() => window.location.href = `/${DIAGNOSTICS_HOME}`}>
                            <img srcSet={LabImg} height="30"/>
                        </a>
                    </div>
                  {('lab-payment' != routePath) && ('walletPayment'!= routePath) &&
                        <MyAccountRightMenu routePath={props.routePath} history={props.history} />
                  }
                </nav>
                {('lab-thank-you' != routePath) &&
                <AffixWrapper className="subnav-affix" id="subnav-affix" offset={0.5}>
                    <nav className="navbar subnav no-gutters" style={{'backgroundColor': '#ffffff','boxShadow': '0 0.125rem 0.25rem rgba(8, 8, 8, 0.075)','marginBottom': '1rem'}}>
                    <LocationInHeader routePath={routePath} selectedLocality={selectedLocality} isLabPage={true}/>
                        {('walletPayment'!= routePath) &&
                        <div className="col-12 col-lg-8">
                            <ul className="checkout-steps">
                                {currentCheckoutSteps.map((eachStep, index) => {
                                    if(eachStep.path == routePath){
                                        isCheckoutStepCompleted = false;
                                    }
                                    if(eachStep.path == 'lab-payment' && paymentSubPath.indexOf(routePath)!=-1){
                                        return(
                                            <li key={index+1} title={eachStep.header} className='active' onClick={() => goToCheckoutStep(eachStep.path)}>
                                                <span>{index+1}</span>{eachStep.header}
                                            </li>
                                        )
                                    }else{
                                        return (
                                            <li key={index+1} title={eachStep.header} className={eachStep.path == routePath ? 'active' : isCheckoutStepCompleted ? 'completed' : ''} onClick={() => goToCheckoutStep(eachStep.path)}>
                                                <span>{index+1}</span>{eachStep.header}
                                            </li>
                                        );
                                    }
                                })}
                            </ul>
                        </div>}
                    </nav>
                </AffixWrapper>
                }
            </header>
        </React.Fragment>
    )
}

export default LabCheckoutHeader;