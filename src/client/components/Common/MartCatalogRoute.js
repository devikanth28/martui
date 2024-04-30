import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import Body from './Body';
import ErrorBoundary from './ErrorBoundaries';
import Footer from './Footer';
import GeneralHeader from '../Subscription/routes/GeneralHeader';
import MartBreadcrumb from './MartBreadCrumb';
import ScrollToTop from '../Subscription/routes/ScrollToTop';
const MartCatalogRoute = ({ component: Component, ...rest }) => {

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
                <GeneralHeader hideHeader={hideHeader} routePath = {rest.routePath} isMartPage={true} {...props} isPayback={rest.isPayback}/> 
                <Body routePath ={rest.routePath} className={hideHeader ? "" : "MedPlusMart"}>
                    <ErrorBoundary {...props}>
                        <main role="main" className={"container-fluid container-lg"}>
                            {rest.routePath !="martHome" && <MartBreadcrumb routePath = {rest.routePath} {...props}/> }
                            <ScrollToTop {...props}/>
                            <div className="row my-account-section">
                                <div className="col">
                                    <Component routePath = {rest.routePath} isPayback={rest.isPayback} {...props} />
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


export default MartCatalogRoute;