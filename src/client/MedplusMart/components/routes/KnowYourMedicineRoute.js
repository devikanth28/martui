import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import Body from '../../../components/Common/Body';
import ErrorBoundary from '../../../components/Common/ErrorBoundaries';
import Footer from '../../../components/Common/Footer';
import ScrollToTop from '../../../components/Subscription/routes/ScrollToTop';
import ScrollToTopButton from '../Common/ScrollToTopButton';
import KYMHeader from '../../../components/Subscription/routes/KYMHeader';
import BreadCrumb from '../../../commonComponents/BreadCrumb';

const KnowYourMedicineRoute = ({ component: Component, catalog, ...rest }) => {
    const [hideHeader, setHideHeader] = useState(false);
    const hideHeaderOnScroll = () => {
        if (window.scrollY >= 140) {
            setHideHeader(true);
        } else {
            setHideHeader(false);
        }
    }

    if (typeof window !== 'undefined') {
        window.addEventListener('scroll', hideHeaderOnScroll);
    }
    return (
        <Route {...rest} render={(props) => (
            <React.Fragment>
                {!rest.hideHeader && <KYMHeader hideHeader={hideHeader} routePath={rest.routePath} isKym={true}  {...props} {...rest} />}
                <Body routePath={rest.routePath} className={hideHeader ? "" : "MedplusMart"}>
                    <ErrorBoundary {...props}>
                        <main role="main" className={"container-fluid " + (rest.routePath === "martHome" ? "my-3" : "")}>
                        <BreadCrumb routePath = {rest.routePath} catalog={catalog} {...props} breadCrumbNotRequired={rest.breadCrumbNotRequired}/>
                            <ScrollToTop {...props} />
                            <div className="row my-account-section">
                                <div className={`col${rest.isKymHomeSearch ? ' p-0' : ''}`}>
                                    <Component routePath={rest.routePath} {...props} {...rest} />
                                </div>
                            </div>
                        </main>
                    </ErrorBoundary>
                    <ScrollToTopButton />
                </Body>
                <Footer {...props} />
            </React.Fragment>
        )} />
    );
}

export default KnowYourMedicineRoute;