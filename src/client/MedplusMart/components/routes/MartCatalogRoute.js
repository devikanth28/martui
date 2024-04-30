import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import BreadCrumb from '../../../commonComponents/BreadCrumb';
import Body from '../../../components/Common/Body';
import ErrorBoundary from '../../../components/Common/ErrorBoundaries';
import Footer from '../../../components/Common/Footer';
import GeneralHeader from '../../../components/Subscription/routes/GeneralHeader';
import ScrollToTop from '../../../components/Subscription/routes/ScrollToTop';
import ScrollToTopButton from '../Common/ScrollToTopButton';

const MartCatalogRoute = ({ component: Component,catalog, ...rest }) => {

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
                <GeneralHeader hideHeader={hideHeader} routePath = {rest.routePath} isMartPage={true}  {...props} isDownload={rest.isDownload} currentTab={rest.currentTab}/> 
                <Body routePath ={rest.routePath} className={hideHeader ? "" : "MedplusMart"}>
                    <ErrorBoundary {...props}>
                        <main role="main" className={"container-fluid "+ (rest.routePath === "martHome" ? "my-3":"")}>
                            <BreadCrumb routePath = {rest.routePath} catalog={catalog} {...props} breadCrumbNotRequired={rest.breadCrumbNotRequired}/>
                            <ScrollToTop {...props}/>
                            <div className="row my-account-section">
                                <div className="col">
                                    <Component routePath = {rest.routePath} {...props} isPayback={rest.isPayback} />
                                </div>
                            </div>
                        </main>
                    </ErrorBoundary> 
                    <ScrollToTopButton />
                </Body>
                <Footer {...props}/>
            </React.Fragment>
        )} />
    )
}


export default MartCatalogRoute;