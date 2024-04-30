import React, { useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import BreadCrumb from '../../../commonComponents/BreadCrumb';
import Body from '../../../components/Common/Body';
import ErrorBoundary from '../../../components/Common/ErrorBoundaries';
import MartAdminHeader from './MartAdminHeader';


const MartAdminRoute = ({ component: Component,catalog, ...rest }) => {

    const [isMarketingAdmin, setIsMarketingAdmin] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);

    return (
        <Route {...rest} render={(props) => (
            <React.Fragment>
                <MartAdminHeader routePath={rest.routePath} setIsLoading={setIsLoading} setIsMarketingAdmin={setIsMarketingAdmin} {...props} />
                <Body routePath={rest.routePath} className={"container-fluid"}>
                    <ErrorBoundary {...props}>
                        <BreadCrumb catalog={catalog} {...props} />
                        <div className="row my-account-section">
                            <div className="col">
                                <Component routePath={rest.routePath} isMarketingAdmin={isMarketingAdmin} isLoading={isLoading} {...props} />
                            </div>
                        </div>
                    </ErrorBoundary>
                </Body>
            </React.Fragment>
        )} />
    )
}


export default MartAdminRoute;