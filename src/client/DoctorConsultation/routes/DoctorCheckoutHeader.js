import { Helmet } from 'react-helmet';
import React, {  useEffect } from 'react';
import LabImg from '../../images/common/mart-identity-cssbg.svg'
import AffixWrapper from '../../components/Common/AffixWrapper';
import { getLabSelectedLocality, getSelectedLocality, reloadSelectedLocalityInfo, setCookieVersionInRedux } from '../../../redux/action/LocalityAction';
import { useDispatch, useSelector } from 'react-redux';
import LabOrderAction from '../../../redux/action/LabOrderAction';
import Validate from '../../helpers/Validate';
import UserInfoAction from '../../../redux/action/UserInfoAction';
import MyAccountRightMenu from '../../components/Common/MyAccountRightMenu';
import LocationInHeader from '../../components/Header/LocationInHeader';
import { VISIT_TYPE_WALK_IN, CHECKOUT_TYPE_CLINIC_SEARCH } from '../constants/DoctorConsultationConstants';


const DoctorCheckoutHeader = (props)=> {

    const validate = Validate();
    const dispatch = useDispatch();
    const userInfoAction = UserInfoAction();
    var userInfo = userInfoAction.getUserInfo();
    const selectedLocality = getLabSelectedLocality();
    const labOrderAction = LabOrderAction();

    
    let routePath = props.routePath ? props.routePath : '' ;
    let titleName = 'Checkout - MedPlusMart-Doctor Consultation';
    let isCheckoutStepCompleted = true;
    const paymentSubPath = ['consultation-payment', 'retryPayment','walletPayment','walletRechargeResponse','retryPaymentWalletRechargeResponse'];
    

    let currentCheckoutSteps = [];
    const checkoutSteps = [];

    const checkoutTypeFromRedux = useSelector(state => state.doctorConsultation && state.doctorConsultation.checkoutType ? state.doctorConsultation.checkoutType : null);
    const consultationTypeFromRedux = useSelector(state => state.doctorConsultation && state.doctorConsultation.consultationType ? state.doctorConsultation.consultationType : null);
    const followUpOrder = useSelector(state => state.doctorConsultation && state.doctorConsultation.doctorConsultation && state.doctorConsultation.doctorConsultation.followUpOrder ? state.doctorConsultation.doctorConsultation.followUpOrder : '');

    checkoutSteps.push({path: 'schedule-consultation', header: 'Schedule Consultation'});
    if((consultationTypeFromRedux == VISIT_TYPE_WALK_IN) && (CHECKOUT_TYPE_CLINIC_SEARCH != checkoutTypeFromRedux)) {
        checkoutSteps.push({path: 'schedule-slot', header: 'Schedule A Slot'});
    }
    if(!followUpOrder){
        checkoutSteps.push({path: 'consultation-payment', header: 'Review & Payment'});
    }
    let pathname = routePath;
    for(const eachCheckoutStep of checkoutSteps) {
        if(pathname.includes("doctorconsultation/thankyou")) {
            titleName = 'Thank You - MedPlusMart-Doctor Consultation';
        }
        currentCheckoutSteps.push(eachCheckoutStep);
    }
    useEffect(() => {
        reloadSelectedLocalityInfo(null,null,dispatch);
        if(validate.isEmpty(userInfo)) {
            userInfoAction.reloadUserInfo();
        }
    }, [])

    const goToCheckoutStep = (checkoutStepPath) => {
        let completedCheckoutSteps = [];
        for(const eachCheckoutStep of currentCheckoutSteps) {
            if(eachCheckoutStep.path == routePath) {
                break;
            }
            completedCheckoutSteps.push(eachCheckoutStep.path);
        }
        if(completedCheckoutSteps.includes(checkoutStepPath)) {
            props.history.push('/doctorconsultation/'+ checkoutStepPath);
        }
    }

    return (
        <React.Fragment>
            <Helmet>
                <title>{titleName}</title>
            </Helmet>
            <header className="checkout-process navbar-expand-md">
                <nav className={`navbar no-gutters ${'DoctorConsultationThankYou' != routePath?'pb-0':''}`}>
                    <div className="col">
                        <button role="button" className="btn btn-link border-0 p-0 navbar-brand" onClick={() => window.location.href = "/doctorconsultation"}>
                            <img srcSet={LabImg} height="30"/>
                        </button>
                    </div>
                  {('consultation-payment' != routePath) && ('walletPayment'!= routePath) &&
                        <MyAccountRightMenu routePath={props.routePath} history={props.history} />
                    }
                </nav>
                {('DoctorConsultationThankYou' != routePath) &&
                <AffixWrapper className="subnav-affix" id="subnav-affix" offset={0.5}>
                    <nav className="navbar subnav no-gutters" style={{'backgroundColor': '#ffffff','boxShadow': '0 0.125rem 0.25rem rgba(8, 8, 8, 0.075)','marginBottom': '1rem'}}>
                        <LocationInHeader routePath={routePath} selectedLocality={selectedLocality} isDoctorPage={true} />
                        {('walletPayment'!= routePath) &&
                        <div className="col-12 col-lg-6">
                            <ul className="checkout-steps">
                                {currentCheckoutSteps.map((eachStep, index) => {
                                    if(eachStep.path == routePath){
                                        isCheckoutStepCompleted = false;
                                    }
                                    if(eachStep.path == 'consultation-payment' && paymentSubPath.indexOf(routePath)!=-1){
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

export default DoctorCheckoutHeader;