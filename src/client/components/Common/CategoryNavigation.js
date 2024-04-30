import React, { useEffect, useState } from 'react';
import { getSelectedLocality, getMembershipConfig } from '../../../redux/action/LocalityAction';
import { useSelector } from 'react-redux';
import Validate from '../../helpers/Validate';
import { getCategoryNameForUrl } from '../../helpers/CommonUtil';
import { MEDPLUS_ADVANTAGE_HOME } from '../Subscription/constants/SubscriptionConstants';
import { DIAGNOSTICS_HOME, DIAGNOSTICS_URL_PREFIX } from '../MedplusLabs/constants/LabConstants';
import Image from './Image';
import { Link } from 'react-router-dom';
import MegaDropdown from './MegaDropdown';

const CategoryNavigation = (props) => {
    const validate = Validate();
    const selectedLocality = getSelectedLocality();
    let assestsUrl = process.env.ASSETS_URL;
    const history = props.history;

    const breadCrumbFromRedux = useSelector((state) => state?.breadCrumb);
    const[activaTab, setActiveTab] = useState('general');

    const membershipConfig = getMembershipConfig();

    useEffect(() => {
        isPharmaPage(breadCrumbFromRedux);
    },[breadCrumbFromRedux]);

    const isPharmaPage = (breadCrumbFromRedux) => {
        if(validate.isNotEmpty(breadCrumbFromRedux?.filter((eachBreadCrumb) => "Pharmacy" === eachBreadCrumb.name)) || props.currentTab === "pharmacy"){
            setActiveTab("pharmacy");
        }  else{
            setActiveTab("general");
        }
    }
    
    return (
        <React.Fragment>
            <nav className="navbar  bg-light justify-content-center p-0" >
                <ul className="navbar-nav submenu justify-content-start nav-list">
                    {!props.isLabPage && !props.isDoctorPage &&
                        !props.hideHeader && <MegaDropdown hideHealthStoreDropdown={props.hideHealthStoreDropdown}  catalogCategoryies={props.catalogCategoryies} assestsUrl={assestsUrl} hideMegaDropdown={props.hideMegaDropdown} currentTab={props.currentTab} activeTab={activaTab}/>
                    }
                    <div className="nav-scroll d-flex">
                    <li className="nav-item dropdown">
                        <Link className={props.currentTab === "pharmacy" || activaTab === "pharmacy" ? "nav-link pointer text-brand" : "nav-link pointer"} to="/pharmaHome" title='Pharmacy'>
                            Pharmacy
                        </Link>
                    </li>
                    <li className="nav-item dropdown">
                        <Link to={`/${DIAGNOSTICS_HOME}`} title="Diagnostics" className={props.isLabPage ? "nav-link pointer lab-test text-brand" : "nav-link pointer lab-test"} target={props.isLabPage ? "" : "_blank"} rel='noopener'>
                            Diagnostics&nbsp;
                            <sup><span className="badge badge-success text-dark ml-1">New</span></sup>
                        </Link>
                    </li>
                    <li className="nav-item dropdown">
                        <Link to={`/doctorconsultation`} title="Doctors" className={props.isDoctorPage ? "nav-link pointer lab-test text-brand" : "nav-link pointer lab-test"} target={props.isDoctorPage ? "" : "_blank"} rel='noopener'>
                            Doctors&nbsp;
                            <sup><span className="badge badge-success text-dark ml-1">New</span></sup>
                        </Link>
                    </li>
                    {membershipConfig && membershipConfig.onlineServingPlanIds.length >0 && 
                    <li className="nav-item dropdown">
                        <Link to={`${MEDPLUS_ADVANTAGE_HOME}`} title="MedPlus Advantage" className={props.isSubscriptionPage ? "nav-link pointer lab-test text-brand" : "nav-link pointer lab-test"} target={props.isSubscriptionPage ? "" : "_blank"} rel='noopener'>
                            MedPlus Advantage&nbsp;
                            <sup><span className="badge badge-success text-dark ml-1">New</span></sup>
                        </Link>
                    </li>}
                    {!props.isLabPage && !props.isDoctorPage &&
                        <React.Fragment>
                            <li className="nav-item dropdown">
                                <Link title="MedPlus Payback Points" className={props.routePath === "paybackPoints" ? "nav-link pointer lab-test text-brand" : "nav-link pointer lab-test"} to="/paybackspecialsale" rel='noopener'>
                                    MedPlus Payback Points
                                </Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link title="Promotions" className={props.routePath == "promotions" ? "nav-link pointer text-brand" : "nav-link pointer"} to="/promotions">
                                    Promotions
                                </Link>
                            </li>
                        </React.Fragment>
                    }
                    <li className="nav-item dropdown">
                        <Link to={`/healthy-life`} title="Healthy Life" className={props.currentTab === "blog" ? "nav-link pointer text-brand" : "nav-link pointer"}>
                        Healthy Life
                        </Link>
                    </li>
                    </div>
                    {/* {!props.isLabPage && !props.isDoctorPage &&
                <React.Fragment>
                        {selectedLocality && selectedLocality.showMyWallet == "Y" && <li className="nav-item dropdown" onClick={()=>{window.location.href = "/myWallet";}}>
                    <a title="MedPlus Wallet" className="nav-link pointer" href="javascript:void(0)">
                        MedPlus Wallet
                    </a>
                </li> }
                </React.Fragment>
                } */}
                </ul>
            </nav>
        </React.Fragment>
    )
}
export default CategoryNavigation;