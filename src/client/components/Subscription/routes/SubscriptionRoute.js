import React, { useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import Body from '../../Common/Body';
import ErrorBoundary from '../../Common/ErrorBoundaries';
import Footer from '../../Common/Footer';
import SubscriptionBreadcrumb from './SubscriptionBreadcrumb';
import GeneralHeader from './GeneralHeader';
import Authentication from '../../Authentication/Authentication';
import { useSelector } from 'react-redux';
import ScrollToTop from './ScrollToTop';
import { MEDPLUS_ADVANTAGE_URL_PREFIX } from '../constants/SubscriptionConstants';
const SubscriptionRoute = ({ component: Component, ...rest }) => {
    
  const [hideHeader, setHideHeader] = useState(false);
    const hideHeaderOnScroll = () =>{
        if(window.scrollY >= 140){
            setHideHeader(true);
        }else{
            setHideHeader(false);
        }
    }
    if (typeof window !== 'undefined') {
        window.addEventListener('scroll', hideHeaderOnScroll);
    } 
    const userInfo  = useSelector(state=>state.userInfo.userInfo);
    const BodySegment = (props) => {
        return(
            <ErrorBoundary {...props}>
                <main role="main" className="container-fluid">
                    <SubscriptionBreadcrumb routePath = {rest.routePath} {...props}/>
                        <ScrollToTop {...props}/>
                        <div className="row my-account-section">
                            <div className="col">
                                <Component routePath = {rest.routePath} isCorporateEmail={rest.isCorporateEmail} {...props}/>
                            </div>
                        </div>
                </main>
            </ErrorBoundary> 
        );
    }
  
    return (
        <Route {...rest} render={(props) => (
            <React.Fragment>
                <GeneralHeader hideHeader={hideHeader} routePath = {rest.routePath} isSubscriptionPage={true} isSubscription = {rest.isSubscription} isSecure = {rest.isSecure} {...props} /> 
                <Body routePath ={rest.routePath} className={hideHeader ? "" : "MyAccount"}>
                    {rest.isSecure ? 
                        Authentication.isAuthenticated(userInfo) ? 
                            Authentication.isSubscriptionLogin(props,userInfo) ?
                                BodySegment(props)
                            : <Redirect to={`${MEDPLUS_ADVANTAGE_URL_PREFIX}/subscription/loginIntermediate`}/>
                        : <Redirect to="/signInPopUp"/>
                    : BodySegment(props)
                    }
                </Body>
                <Footer {...props}/>
            </React.Fragment>
        )} />
    )
}

export default SubscriptionRoute;
