import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Body from '../../Common/Body';
import ErrorBoundary from '../../Common/ErrorBoundaries';
import Footer from '../../Common/Footer';
import GeneralHeader from '../../Subscription/routes/GeneralHeader';
import LabBreadcrumb from './LabBreadCrumb';
import Validate from '../../../helpers/Validate';
import ScrollToTop from '../../Subscription/routes/ScrollToTop';
import { DIAGNOSTICS_HOME } from '../constants/LabConstants';
const LabCatalogRoute = ({ component: Component, ...rest }) => {

    const validate = Validate();
    const [testName, setTestName] = useState();
    const isHome = rest.path === `/${DIAGNOSTICS_HOME}`;
    const [categoryName, setCategoryName] = useState();
    
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
                <GeneralHeader hideHeader={hideHeader} routePath = {rest.routePath} isLabPage={true} {...props} /> 
                <Body routePath ={rest.routePath} className={hideHeader ? "" : "MedPlusLabs"}>
                    <ErrorBoundary {...props}>
                        <main role="main" className={"container-fluid "+ (isHome ? "my-3":"")}>
                            {!isHome && <LabBreadcrumb routePath = {rest.routePath} testName={testName} categoryName={categoryName} {...props}/> }
                            <ScrollToTop {...props}/>
                            <div className="row my-account-section">
                                <div className="col">
                                    <Component routePath = {rest.routePath} {...props} setTestName={setTestName} setCategoryName={setCategoryName} isLabComponent/>
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


export default LabCatalogRoute;