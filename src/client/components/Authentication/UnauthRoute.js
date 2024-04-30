import ErrorBoundary from "../Common/ErrorBoundaries";
import CommonPaymentHeader from "../UnauthPayments/components/CommonPaymentHeader";
import Body from '../Common/Body';
import React from 'react';
import { Route } from 'react-router-dom';

const UnauthRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={(props) => (
            <React.Fragment>
                <CommonPaymentHeader />
                <Body routePath={rest.routePath} className="unauthPayments">
                    <ErrorBoundary {...props}> <Component {...props} routePath={rest.routePath} /></ErrorBoundary>
                </Body>
            </React.Fragment>
        )} />
    )
}
export default UnauthRoute;