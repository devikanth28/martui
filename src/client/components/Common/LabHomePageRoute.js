import React from 'react';
import {Route } from 'react-router-dom';
import Body from './Body';
import ErrorBoundary from './ErrorBoundaries';
import Footer from './Footer';
import StaticHeader from './StaticHeader';
const LabHomePageRoute =({ component: Component, ...rest }) =>{
    return (
        <Route {...rest} render={(props) => (
            <React.Fragment>
                 <StaticHeader routePath = {rest.routePath} {...props} />
                 <Body routePath ={rest.routePath} className="lab-home-page">
                    <ErrorBoundary {...props}>
                        <main role="main" className="container-fluid my-3">
                            <Component routePath = {rest.routePath} details ={rest.details} showCorporate ={rest.showCorporate}  {...props} />
                        </main>
                    </ErrorBoundary>
                </Body>
                <Footer {...props}/>
            </React.Fragment>
        )} />
    )
}
export default LabHomePageRoute;