import React, { useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import Body from '../Common/Body';
import ErrorBoundary from '../Common/ErrorBoundaries';
import MyAccountBreadcrumb from '../MyAccount/MyAccountBreadcrumb';
import MyAccountLeftSection from '../MyAccount/MyAccountLeftSection';
import CommonHeader from '../Common/CommonHeader';
import Footer from '../Common/Footer';

const MyAccountRoute = ({ component: Component, ...rest }) => {
    
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
    return (
        <Route {...rest} render={(props) => (
            <React.Fragment>
                <CommonHeader hideHeader={hideHeader} routePath = {rest.routePath} {...props} fromMyAccount={true}/> 
                <Body routePath ={rest.routePath} className={hideHeader ? "" : "MyAccount"}>
                    <ErrorBoundary {...props}>
                        <main role="main" className="container-fluid">
                            <MyAccountBreadcrumb routePath = {rest.routePath} {...props}/>
                            <div className="row my-account-section">
                                {rest.routePath !="prescriptionUpload"  && <div className="col-2 my-account-option-list pr-0">
                                    <MyAccountLeftSection routePath = {rest.routePath} {...props}/>
                                </div>}
                                <div className="col">
                                    <Component routePath = {rest.routePath} {...props} isPayback={rest.isPayback} isMdxPoints= {rest.isMdxPoints} />
                                </div>
                            </div>
                        </main>
                    </ErrorBoundary>
                </Body>
                <Footer {...props}/>
            </React.Fragment>
        )} />
    )
}

export default MyAccountRoute;
