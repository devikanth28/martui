import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserInfoAction from '../../../redux/action/UserInfoAction';
import CartAction from '../../../redux/action/CartAction';
import { getSelectedLocality, reloadSelectedLocalityInfo } from '../../../redux/action/LocalityAction';
import Validate from '../../helpers/Validate';
import MartImg from '../../images/common/mart-identity-cssbg.svg';
import CONFIG from '../../constants/ServerConfig';
import { Helmet } from 'react-helmet';
import AffixWrapper from '../Common/AffixWrapper';
import MyAccountRightMenu from '../Common/MyAccountRightMenu';
import LocationInHeader from './LocationInHeader';

const  CheckoutHeader = (props)=> {
    const dispatch = useDispatch();
    const validate = Validate();
    const cartAction = CartAction();
    const userInfoAction = UserInfoAction();
    var userInfo = userInfoAction.getUserInfo();
    const selectedLocality = getSelectedLocality();
    const isPaybackOrder = useSelector(state => state && state.checkout && state.checkout.isPaybackOrder ? state.checkout.isPaybackOrder : false)
    let routePath = props.routePath ? props.routePath : '' ;
    let isCheckoutStepCompleted = true;
    const checkoutSteps = [];
    const isRetryPaymentPage = (props.match.params.retryOrderId || props.match.params.cartId) ? true : false;

    if(routePath == 'flexiDelivery' || routePath == 'flexiCart' || routePath == 'flexiReview' || routePath == 'redeemThankyou'){
        checkoutSteps.push({path: 'flexiCart', header: 'Shopping Cart'});
        checkoutSteps.push({path: 'flexiDelivery', header: 'Delivery Details'});
        checkoutSteps.push({path: 'flexiReview', header: 'Review'});
    } else if(props.isPayback || isPaybackOrder){
        checkoutSteps.push({path: 'payback/cart', header: 'Shopping Cart'});
        checkoutSteps.push({path: 'payback/store', header: 'Delivery Details'});
        checkoutSteps.push({path: 'payback/review', header: 'Review'});
        checkoutSteps.push({path: 'payback/payment', header: 'Payments'});
    } else{
        checkoutSteps.push({path: 'shoppingCart', header: 'Shopping Cart'});
        checkoutSteps.push({path: 'prescription', header: 'Prescription Details'});
        checkoutSteps.push({path: 'delivery', header: 'Delivery Details'});
        checkoutSteps.push({path: 'orderReview', header: 'Promotions & Review'});
        checkoutSteps.push({path: 'payment', header: 'Payment'});
    }


    const paymentSubPath = ['payment', 'retryPayment','walletPayment','walletRechargeResponse','retryPaymentWalletRechargeResponse'];
    let pathname = routePath;
    let titleName = 'Checkout - MedPlusMart';
    let currentCheckoutSteps = [];
    for(const eachCheckoutStep of checkoutSteps) {
        if(pathname.includes("thankyou")) {
            titleName = 'Thank You - MedPlusMart';
        }
        if(!cartAction.isPrescriptionStepRequired() && eachCheckoutStep.path == 'prescription') {
            continue;
        }
        currentCheckoutSteps.push(eachCheckoutStep);
    }
    

    useEffect(() => {
		const script = document.createElement('script');
        script.src = "https://www.artfut.com/static/tagtag.min.js?campaign_code=eca3afd2d1";
        script.async = true;
        script.onerror = 'var self = this;window.ADMITAD=window.ADMITAD||{},ADMITAD.Helpers=ADMITAD.Helpers||{},ADMITAD.Helpers.generateDomains=function(){for(var e=new Date,n=Math.floor(new Date(2020,e.getMonth(),e.getDate()).setUTCHours(0,0,0,0)/1e3),t=parseInt(1e12*(Math.sin(n)+1)).toString(30),i=["de"],o=[],a=0;a<i.length;++a)o.push({domain:t+"."+i[a],name:t});return o},ADMITAD.Helpers.findTodaysDomain=function(e){function n(){var o=new XMLHttpRequest,a=i[t].domain,D="https://"+a+"/";o.open("HEAD",D,!0),o.onload=function(){setTimeout(e,0,i[t])},o.onerror=function(){++t<i.length?setTimeout(n,0):setTimeout(e,0,void 0)},o.send()}var t=0,i=ADMITAD.Helpers.generateDomains();n()},window.ADMITAD=window.ADMITAD||{},ADMITAD.Helpers.findTodaysDomain(function(e){if(window.ADMITAD.dynamic=e,window.ADMITAD.dynamic){var n=function(){return function(){return self.src?self:""}}(),t=n(),i=(/campaign_code=([^&]+)/.exec(t.src)||[])[1]||"";t.parentNode.removeChild(t);var o=document.getElementsByTagName("head")[0],a=document.createElement("script");a.src="https://www."+window.ADMITAD.dynamic.domain+"/static/"+window.ADMITAD.dynamic.name.slice(1)+window.ADMITAD.dynamic.name.slice(0,1)+".min.js?campaign_code="+i,o.appendChild(a)}});';
        document.body.appendChild(script);
        reloadSelectedLocalityInfo(null,null,dispatch);
        if(validate.isEmpty(userInfo)) {
            userInfoAction.reloadUserInfo();
        }
    }, []);

    const goToHome = () => {
        window.location.href = CONFIG.REDIRECT_HOME_URL;
    }

    const goToCheckoutStep = (checkoutStepPath) => {
        if(validate.isEmpty(currentCheckoutSteps.filter(step=>step.path == routePath)) || isRetryPaymentPage){
            return;
        }
        let completedCheckoutSteps = [];
        for(const eachCheckoutStep of currentCheckoutSteps) {
            if(eachCheckoutStep.path == routePath) {
                break;
            }
            completedCheckoutSteps.push(eachCheckoutStep.path);
        }
        if(completedCheckoutSteps.includes(checkoutStepPath)) {
            props.history.push('/'+ checkoutStepPath);
        }
    }

    return (
        <React.Fragment>
            <Helmet>
                <title>{titleName}</title>
            </Helmet>
            <header className="checkout-process navbar-expand-md">
                <nav className={`navbar no-gutters ${'thankyou' != routePath?'pb-0':''}`}>
                    <div className="col">
                        <a className="navbar-brand" onClick={() => goToHome()} title="MedPlusMart">
                            <img srcSet={MartImg} height="30"/>
                        </a>
                    </div>
                    {('payment' != routePath) && ('walletPayment'!= routePath) && ('payback/payment'!= routePath) &&
                        <MyAccountRightMenu routePath={props.routePath} history={props.history} />
                    }
                </nav>
                {('thankyou' != routePath && 'payback/thankyou' != routePath ) &&
                <AffixWrapper className="subnav-affix" id="subnav-affix" offset={0.5}>
                    <nav className="navbar subnav no-gutters" style={{'backgroundColor': '#ffffff','boxShadow': '0 0.125rem 0.25rem rgba(8, 8, 8, 0.075)','marginBottom': '1rem'}}>
                            <LocationInHeader routePath={routePath} selectedLocality={selectedLocality}  />
                            {('walletPayment' != routePath) &&
                                <div className="col-12 col-lg-8">
                            <ul className="checkout-steps">
                                {currentCheckoutSteps.map((eachStep, index) => {
                                    if(eachStep.path == routePath){
                                        isCheckoutStepCompleted = false;
                                    }
                                    if(eachStep.path == 'payment' && paymentSubPath.indexOf(routePath)!=-1){
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

export default CheckoutHeader;
