import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import MyAccountRightMenu from '../../../components/Common/MyAccountRightMenu';
import MartImg from '../../../images/common/mart-identity-cssbg.svg';
import UserInfoAction from '../../../../redux/action/UserInfoAction';
import Validate from '../../../helpers/Validate';
import MartAdminService from '../../services/MartAdminService';

const MartAdminHeader = (props) => {

    const userInfo = UserInfoAction().getUserInfo();
    const validate = Validate();
    const marketingAdminRoutePaths = ['martAdminServices', 'metaInformation'];

    useEffect(() => {
        getAdminUserData();
    },[]);

    const getAdminUserData = () => {
        MartAdminService().getCustomerInfo({"userCustomerId" : userInfo.medplusId}).then((response) => {
            if(validate.isNotEmpty(response) && validate.isNotEmpty(response.statusCode) && response.statusCode == 'SUCCESS'){
                if(validate.isEmpty(response.dataObject) && validate.isEmpty(response.dataObject.userInfo) && !response.dataObject.userInfo.adminUser){
                    props.history.replace('/');
                } else if(response?.dataObject?.isMartMarketingAdmin === "yes"){
                    props.setIsMarketingAdmin(true);
                    if(!marketingAdminRoutePaths.includes(props.routePath)){
                        props.history.replace('/');
                    }
                }
            } else if(validate.isNotEmpty(response.message) && response.message == "UNAUTHORISED_USER"){
                props.history.replace('/');
            }
            props.setIsLoading(false);
        }).catch((error) => {
            console.log(error);
            props.setIsLoading(false);
        })
    }

    return (
        <React.Fragment>
            <Helmet>
                <title>Online Pharmacy Store in India. Best value on medicines - MedPlusMart</title>
            </Helmet>
            <header className="checkout-process navbar-expand-md mb-0">
                <nav className={"navbar no-gutters"}>
                    <div className="col">
                        <Link to={"/"} role="link" className="navbar-brand" title="MedPlusMart">
                            <img srcSet={MartImg} alt="MedPlusMart" height="30" />
                        </Link>
                    </div>
                    <MyAccountRightMenu history={props.history} />
                </nav>
            </header>
        </React.Fragment>
    )
}

export default MartAdminHeader;
