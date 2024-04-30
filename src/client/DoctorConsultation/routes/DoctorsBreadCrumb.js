import React from 'react';
import { DIAGNOSTICS_URL_PREFIX } from '../../components/MedplusLabs/constants/LabConstants';
import { getTestNameFromUrl} from '../../helpers/CommonUtil';
import Validate from '../../helpers/Validate';
import { isVaildCategoryType, isVaildConsultationType, UrlTypeConstants } from '../constants/DoctorConsultationConstants';
import { getNameFromUrlValue } from '../helper/DoctorConsulationHelper';

const DoctorsBreadCrumb = (props) => {

    const validate = Validate();
    const testNameId = props.match.params.testNameId;
    const categoryNameId = props.match.params.categoryNameId;
    const breadCrumbDoctorName = props.breadCrumbDoctorName
    const marketingSection = props.match.params.marketingSection;
    const visitType = isVaildConsultationType(props.match.params.visitType) ? props.match.params.visitType : undefined;
    const paramValue= props.match.params.searchString;
    const categoryType = isVaildCategoryType(props.match.params.categoryType) ? props.match.params.categoryType : undefined;
    const consultationType = isVaildConsultationType(props.match.params.consultationType) ? props.match.params.consultationType : undefined;
    const isFromViewAll = props.match.params.isFromViewAll;

    const redirectToCategoryPage = () =>{
        props.history.push(`${DIAGNOSTICS_URL_PREFIX}/sub-category/`+categoryNameId);
    }

    const redirectToDepartmentPage = () =>{
        props.history.push(`${DIAGNOSTICS_URL_PREFIX}/department/`+categoryNameId);
    }

    const goToCategoryPage =() => {
        if(validate.isNotEmpty(testNameId)){
            (categoryNameId.includes('_LABS_') || categoryNameId.includes('_labs_') || categoryNameId == 'All' || categoryNameId == 'all') ? redirectToCategoryPage() : redirectToDepartmentPage()
        }
    }

    const getCategoryName = () => {
        return props.categoryName;
    }

    const getConsultationName = () => {
        if(Validate().isNotEmpty(visitType)){
            return visitType == UrlTypeConstants.online ? "All Online Doctors" : "All WalkIn Doctors";
        }else{
            return  props.routePath == "online-consultation" ? "Online Consultation" : "Walk In";
        }
    }

    const getCategoryType = () => {
        return categoryType == UrlTypeConstants.symptoms ? "Symptoms" : "Specialization";
    }

    const getConsultationType = () => {
        return ("doctor-category-viewall" == props.routePath ? consultationType : visitType) == "online_consultation" ? "Online Consultation" : "Walk In";
    }
    return (
        <React.Fragment>
            <nav aria-label="breadcrumb bg-none">
                <ol className="breadcrumb m-0 bgclr-tpt" itemScope itemType='https://schema.org/BreadcrumbList'>
                    {!(props.routePath == 'signInPopUp' || props.routePath == 'signin-otp-verify') &&
                        <React.Fragment>
                            <li className='breadcrumb-item'  itemProp='itemListElement' itemScope itemType='https://schema.org/ListItem'>
                                <span itemProp='name' content='home'>
                                    <a href="/" itemProp='item' title = "Home">Home</a>
                                    <meta itemProp='position' content='1'></meta>
                                </span>
                            </li>
                            <li className="breadcrumb-item" itemProp='itemListElement' itemScope itemType='https://schema.org/ListItem'>
                                <span itemProp='name' content="Doctors">
                                    { props.routePath == "DoctorConsultationHome" ? <span  title="Doctors" >Doctors</span> : <a href="/doctorconsultation" itemProp='item' title = "Doctors"> Doctors</a> }
                                    <meta itemProp='position' content='2'></meta>
                                </span>
                            </li>
                        </React.Fragment>
                    }
                    {(("doctor-category-viewall" == props.routePath && validate.isNotEmpty(consultationType)) || (("doctor-category-info" == props.routePath || "view-all-doctors" == props.routePath || "doctor-detail" == props.routePath) && validate.isNotEmpty(visitType))) &&
                        <li className={`breadcrumb-item ${consultationType ? "text-secondary" :""}`} itemProp='itemListElement' itemScope itemType='https://schema.org/ListItem'>
                            <span itemProp='name' title={getConsultationType()} content={getConsultationType()}>
                                {validate.isNotEmpty(consultationType) && <a href={`/doctorconsultation/doctors/${consultationType}`} itemProp='item' title={getConsultationType()}>{getConsultationType()}</a> || validate.isNotEmpty(visitType) && <a href={`/doctorconsultation/doctors/${visitType}`} itemProp='item' title={getConsultationType()}>{getConsultationType()}</a>}
                                <meta itemProp='position' content='4'></meta>
                            </span>
                        </li>
                    }
                    {["doctor-category-viewall", "doctor-category-info", "doctor-detail"].includes(props.routePath) && validate.isNotEmpty(categoryType) && <li className={`breadcrumb-item ${props.routePath == "doctor-category-viewall" ? "text-secondary" :""}`} itemProp='itemListElement' itemScope itemType='https://schema.org/ListItem'>
                        <span itemProp='name' title={getCategoryType()} content={getCategoryType()}>
                            {props.routePath == "doctor-category-viewall" ? getCategoryType() : <a href={`/doctorconsultation/allCategories/${categoryType}`} itemProp='item' title={getCategoryType()}>{getCategoryType()}</a>}
                            <meta itemProp='position' content='4'></meta>
                        </span>
                    </li>}
                    {(props.routePath == "online-consultation" || props.routePath == "walkin-consultation" || props.routePath == "view-all-doctors" || (props.routePath == 'doctor-detail' && isFromViewAll)) && <li className="breadcrumb-item text-secondary" itemProp='itemListElement' itemScope itemType='https://schema.org/ListItem'>
                        <span itemProp='name' title = {getConsultationName()} content={getConsultationName()}>
                        	{ props.routePath == 'doctor-detail' ? <a href={`/doctorconsultation/doctors/viewall/${visitType}`} itemProp='item' title={getConsultationName()}>{getConsultationName()}</a> : getConsultationName() }
                        	<meta itemProp='position' content='3'></meta>
                        </span>
                    </li>}
                    {(props.routePath == 'doctor-detail' || props.routePath == "doctor-category-info") && validate.isNotEmpty(paramValue) && <li className={`breadcrumb-item ${props.routePath == "doctor-category-info" ? "text-secondary" : ""}`} itemProp='itemListElement' itemScope itemType='https://schema.org/ListItem'>
                        <span itemProp='name' title = {getCategoryName()} content={getCategoryName()}>
                        	{ props.routePath == "doctor-category-info" ? getCategoryName() :(validate.isNotEmpty(categoryType) && validate.isNotEmpty(visitType) ? <a href={`/doctorconsultation/categorynamedoctor/${paramValue}/`} itemProp='item' title={getCategoryName()}>{getCategoryName()}</a> :<a href={`/doctorconsultation/doctors/${paramValue}`} itemProp='item' title={getCategoryName()}>{getCategoryName()}</a>)}
                        	<meta itemProp='position' content='3'></meta>
                        </span>
                    </li>}
                    {categoryNameId && <li className={`breadcrumb-item ${props.routePath == "subCategory" ? "text-secondary" :""}`} itemProp='itemListElement' itemScope itemType='https://schema.org/ListItem'>
                        <span itemProp='name' title = {getCategoryName()} content={getCategoryName()}>
                        	{ props.routePath == "subCategory" ? getCategoryName() : <a href="javascript:void(0)" title={getCategoryName()} itemProp='item' onClick={()=>goToCategoryPage()}>{getCategoryName()}</a>}
                        	<meta itemProp='position' content='3'></meta>
                        </span>
                    </li>}
                    {testNameId && <li className="breadcrumb-item text-secondary" itemProp='itemListElement' itemScope itemType='https://schema.org/ListItem'>
                        <span itemProp='name' title = {props.testName || getTestNameFromUrl(testNameId)} content={props.testName || getTestNameFromUrl(testNameId)} >{props.testName || getTestNameFromUrl(testNameId)}
                        	<a href="javascript:void(0)" title = {props.testName || getTestNameFromUrl(testNameId)} itemProp='item' ></a>
                        	<meta itemProp='position' content={(categoryNameId && testNameId) ? '4' : '3'}></meta>
                        </span>
                    </li>} 
                    { props.routePath == 'view-all-offers' && validate.isNotEmpty(marketingSection) && <li itemProp='itemListElement' itemScope itemType='https://schema.org/ListItem' className="breadcrumb-item text-secondary">
                        <span title = {marketingSection.replace(/-/g,' ')} itemProp='name' content="">{marketingSection.replace(/-/g,' ')}
                        	<a href="javascript:void(0)" title = {marketingSection.replace(/-/g,' ')} itemProp='item' ></a>
                        	<meta itemProp='position' content={(categoryNameId && testNameId && props.routePath == 'view-all-offers')? '5' : ((categoryNameId && testNameId)||(categoryNameId && props.routePath == 'view-all-offers') || (props.routePath == 'view-all-offers' && testNameId)) ? '4' :'3'}></meta>
                        </span>
                    </li>}
                    {props.routePath == 'doctor-detail' && validate.isNotEmpty(breadCrumbDoctorName) && <li className="breadcrumb-item text-secondary" itemProp='itemListElement' itemScope itemType='https://schema.org/ListItem'>
                        <span itemProp='name' title = {breadCrumbDoctorName} content={breadCrumbDoctorName} >{breadCrumbDoctorName}
                        	<meta itemProp='position' content='4'></meta>
                        </span>
                    </li>}
                </ol>
            </nav>
        </React.Fragment>
    );
}

export default DoctorsBreadCrumb;