import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Body from '../../components/Common/Body';
import ErrorBoundary from '../../components/Common/ErrorBoundaries';
import Footer from '../../components/Common/Footer';
import GeneralHeader from '../../components/Subscription/routes/GeneralHeader';
import DoctorsBreadCrumb from './DoctorsBreadCrumb';
import Validate from '../../helpers/Validate';
import ScrollToTop from '../../components/Subscription/routes/ScrollToTop';

const DoctorConsultationRoute = ({ component: Component, ...rest }) => {

    const validate = Validate();
    const [testName, setTestName] = useState();
    const isHome = (rest.path === "/doctorconsultation");
    const [categoryName, setCategoryName] = useState();
    const [breadCrumbDoctorName, setBreadCrumbDoctorName] = useState();
    
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
    if(rest.routePath != "doctor-detail" && validate.isNotEmpty(breadCrumbDoctorName)){
        setBreadCrumbDoctorName("");
    }
    return (
        <Route {...rest} render={(props) => (
            <React.Fragment>
                <GeneralHeader hideHeader={hideHeader} routePath = {rest.routePath} isDoctorPage={true} {...props} /> 
                <Body routePath ={rest.routePath} className={hideHeader ? "" : "MedPlusLabs"}>
                    <ErrorBoundary {...props}>
                        <main role="main" className={"container-fluid "+ (isHome ? "my-3":"")}>
                            {!isHome && <DoctorsBreadCrumb routePath = {rest.routePath} testName={testName} breadCrumbDoctorName={breadCrumbDoctorName} categoryName={categoryName} {...props}/> }
                            <ScrollToTop {...props}/>
                            <div className="row my-account-section">
                                <div className="col">
                                    <Component routePath = {rest.routePath} {...props} {...rest} key={props.location.search} setTestName={setTestName} setBreadCrumbDoctorName={setBreadCrumbDoctorName} setCategoryName={setCategoryName}/>
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


export default DoctorConsultationRoute;