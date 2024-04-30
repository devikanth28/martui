import React from 'react';
import { getCategoryNameFromUrl, getDepartmentNameFromUrl, getTestNameFromUrl} from '../../../helpers/CommonUtil';
import Validate from '../../../helpers/Validate';
import { DIAGNOSTICS_HOME, DIAGNOSTICS_URL_PREFIX } from '../constants/LabConstants';
import { Link } from 'react-router-dom';

const LabBreadcrumb = (props) => {

    const validate = Validate();
    let testNameId = props.match.params.testNameId;
    let categoryNameId = props.match.params.categoryNameId;
    let marketingSection = props.match.params.marketingSection;

    const getCategoryName = () => {
        return (props.categoryName || ((categoryNameId.includes('_LABS_') || (categoryNameId.includes('_labs_') || categoryNameId == 'All' || categoryNameId == 'all')) ? getCategoryNameFromUrl(categoryNameId) : getDepartmentNameFromUrl(categoryNameId)));
    }
    
    return (
        <React.Fragment>
            <nav aria-label="breadcrumb bg-none">
                <ol className="breadcrumb m-0 bgclr-tpt" itemScope itemType='https://schema.org/BreadcrumbList'>
                    {!(props.routePath == 'signInPopUp' || props.routePath == 'signin-otp-verify') &&
                        <React.Fragment>
                            <li className='breadcrumb-item' itemProp='itemListElement' itemScope itemType='https://schema.org/ListItem'>
                                <span itemProp='name' content='home'>
                                    <Link to="/" itemProp='item' title = "Home" >Home</Link>
                                    <meta itemProp='position' content='1'></meta>
                                </span>
                            </li>
                            <li className="breadcrumb-item" itemProp='itemListElement' itemScope itemType='https://schema.org/ListItem'>
                                <span itemProp='name' content="Diagnostics">
                                    { props.routePath == "LabHome" ? <span  title="Diagnostics" >Diagnostics</span> : <Link to={`/${DIAGNOSTICS_HOME}`} itemProp='item' title = "Diagnostics"> Diagnostics</Link> }
                                    <meta itemProp='position' content='2'></meta>
                                </span>
                            </li>
                        </React.Fragment>
                    }
                        {categoryNameId &&
                        <li className={`breadcrumb-item ${props.routePath == "subCategory" ? 'text-secondary':''}`} itemProp='itemListElement' itemScope itemType='https://schema.org/ListItem'>
                            <span itemProp='name' title={getCategoryName()} content={getCategoryName()}>
                                {props.routePath == "subCategory" ? getCategoryName() :
                                    ((categoryNameId.includes('_LABS_') || categoryNameId.includes('_labs_') || categoryNameId == 'All' || categoryNameId == 'all') ?
                                        <Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/${categoryNameId}`} title={getCategoryName} itemProp='item'>{getCategoryName()}</Link> : <Link to={`${DIAGNOSTICS_URL_PREFIX}/department/${categoryNameId}`} title={getCategoryName} itemProp='item'>{getCategoryName()}</Link>)}
                                <meta itemProp='position' content='3'></meta>
                            </span>
                        </li>}

                    {testNameId && 
                        <li className="breadcrumb-item text-secondary" itemProp='itemListElement' itemScope itemType='https://schema.org/ListItem'>
                            <span itemProp='name' title={props.testName || getTestNameFromUrl(testNameId)} content={props.testName || getTestNameFromUrl(testNameId)} >
                                {props.testName || getTestNameFromUrl(testNameId)}
                                <meta itemProp='position' content={(categoryNameId && testNameId) ? '4' : '3'}></meta>
                            </span>
                        </li>}

                    {props.routePath == 'viewAllOffers' && validate.isNotEmpty(marketingSection) &&
                        <li itemProp='itemListElement' itemScope itemType='https://schema.org/ListItem' className="breadcrumb-item text-secondary font-14">
                            <span title={marketingSection.replace(/-/g, ' ')} itemProp='name' content={marketingSection.replace(/-/g, ' ')}>
                                {marketingSection.replace(/-/g, ' ')}
                                <meta itemProp='position' content={(categoryNameId && testNameId && props.routePath == 'viewAllOffers') ? '3' : ((categoryNameId && testNameId) || (categoryNameId && props.routePath == 'viewAllOffers') || (props.routePath == 'viewAllOffers' && testNameId)) ? '4' : '3'}></meta>
                            </span>
                        </li>
                    }

                    {props.routePath == 'diagnosticsTnc' &&
                        <li itemProp='itemListElement' itemScope itemType='https://schema.org/ListItem' className="breadcrumb-item text-secondary font-14">
                            <span title={'Terms & Conditions'} itemProp='name' content={'Terms & Conditions'}>
                                Terms & Conditions
                                <meta itemProp='position' content={'3'} />
                            </span>
                        </li>
                    }
                </ol>
            </nav>
        </React.Fragment>
    );
}

export default LabBreadcrumb;