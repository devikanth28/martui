import React from 'react';
import {Route } from 'react-router-dom';
import MyAccountBreadcrumb from '../MyAccount/MyAccountBreadcrumb';
import Body from './Body';
import ErrorBoundary from './ErrorBoundaries';
import Footer from './Footer';
import StaticHeader from './StaticHeader';

const StaticRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={(props) => (
            <React.Fragment>
                 <StaticHeader routePath = {rest.routePath} {...props} />
                 <Body routePath ={rest.routePath} className="MyAccount">
                    <ErrorBoundary {...props}>
                        <main role="main" className="container-fluid">
                            <MyAccountBreadcrumb routePath = {rest.routePath} {...props}/>
                            <section>
                                <div className="row my-account-section">
                                    <div className="col">
                                        <Component routePath = {rest.routePath} {...props} />
                                    </div>
                                </div>
                            </section>
                        </main>
                    </ErrorBoundary>
                </Body>
                <Footer {...props}/>
            </React.Fragment>
        )} />
    )
}

export default StaticRoute;
