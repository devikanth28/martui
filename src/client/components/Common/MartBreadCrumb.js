import React from 'react';
import CONFIG from '../../constants/ServerConfig';

const MartBreadcrumb = (props) => {

    const goToHome = () => {
       window.location.href = CONFIG.REDIRECT_HOME_URL;
    }

    function getPageName() {
        var pageName = "";
        switch (props.routePath) {
            case 'pharmaHome': return pageName="Pharmacy";
            case 'promotions': return pageName="Promotions";
        }
        return pageName;
    }
     
    return (
        <React.Fragment>
            <nav aria-label="breadcrumb bg-none">
                <ol className="breadcrumb m-0 bgclr-tpt" itemScope itemType='https://schema.org/BreadcrumbList'>
                    {!(props.routePath == 'signInPopUp' || props.routePath == 'signin-otp-verify') &&
                        <React.Fragment>
                            <li className='breadcrumb-item bg-none p-0 mb-0' itemProp='itemListElement' itemScope itemType='https://schema.org/ListItem'>
                                <span itemProp='name' content='home'>
                                    <a href="javascript:void(0)" itemProp='item' title = "Home" onClick={goToHome}>Home</a>
                                    <meta itemProp='position' content='1'></meta>
                                </span>
                            </li>
                            {(props.routePath == 'pharmaHome' || props.routePath == 'promotions') &&
                                <li className="breadcrumb-item text-brand" itemProp='itemListElement' itemScope itemType='https://schema.org/ListItem'>
                                    <span itemProp='name' content={getPageName()}>
                                        <span title={getPageName()}>{getPageName()}</span>
                                        <meta itemProp='position' content='2'></meta>
                                    </span>
                                </li>
                            }
                            {props.routePath == 'paybackPoints' &&
                                <li className="breadcrumb-item text-brand" itemProp='itemListElement' itemScope itemType='https://schema.org/ListItem'>
                                    <span itemProp='name' content="paybackPoints">
                                        <span  title="MedPlus Payback Points" >MedPlus Payback Points</span>
                                        <meta itemProp='position' content='2'></meta>
                                    </span>
                                </li>
                            }
                        </React.Fragment>
                    }
                </ol>
            </nav>
        </React.Fragment>
    );
}

export default MartBreadcrumb;