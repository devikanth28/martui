import React, { useEffect, useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import Body from '../Common/Body';
import CheckoutHeader from '../Header/CheckoutHeader';
import ErrorBoundary from '../Common/ErrorBoundaries';

const CheckoutRoute = ({ component: Component, ...rest }) => {

    return (
        <Route {...rest} render={(props) => (
            <React.Fragment>
                <CheckoutHeader routePath = {rest.routePath} {...props} isPayback={rest.isPayback} />
                <Body routePath ={rest.routePath} className="checkout">
                    <ErrorBoundary {...props}> <Component {...props} isPayback={rest.isPayback} isMart = {rest.isMart} routePath = {rest.routePath}/></ErrorBoundary>
                </Body>
            </React.Fragment>
        )} />
    )
}

export default CheckoutRoute;
