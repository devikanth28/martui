import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Body from '../Common/Body';
import LabCheckoutHeader from '../Header/LabCheckoutHeader';
import ErrorBoundary from '../Common/ErrorBoundaries';
import DoctorCheckoutHeader from '../../DoctorConsultation/routes/DoctorCheckoutHeader';
import Authentication from './Authentication';
import UserInfoAction from '../../../redux/action/UserInfoAction';

const LabCheckoutRoute = ({ component: Component, ...rest }) => {

    const userInfo = UserInfoAction().getUserInfo();
    
    return (
        <Route {...rest} render={(props) => (
            <React.Fragment>
                {rest.isDoctorPage && <DoctorCheckoutHeader routePath = {rest.routePath} {...props} />}
                {!rest.isDoctorPage && <LabCheckoutHeader routePath = {rest.routePath} {...props} />}
                <Body routePath ={rest.routePath} className="checkout">
                    {(Authentication.cookieBasedAuth(userInfo) ? 
                        <ErrorBoundary {...props}> <Component {...props} routePath = {rest.routePath}/></ErrorBoundary> 
                        : <Redirect to="/signInPopUp"/>)}
                </Body>
            </React.Fragment>
        )} />
    )
}

export default LabCheckoutRoute;