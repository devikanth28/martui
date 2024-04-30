import React, { useEffect } from "react";
import SiteMapBannerImg from '../../../../images/common/sitemap-banner-img.svg';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import Validate from '../../../../helpers/Validate';
import BreadCrumbAction from "../../../../../redux/action/BreadCrumbAction";
import { getCategoryNameForUrl, getDoctorsUrl, isMac } from '../../../../helpers/CommonUtil';
import { getSelectedLocality } from '../../../../../redux/action/LocalityAction';
import { DIAGNOSTICS_URL_PREFIX } from "../../../../components/MedplusLabs/constants/LabConstants";
import MetaTitle from "../../../../commonComponents/MetaTitle";

const SiteMap = (props) => {

    const selectedLocality = getSelectedLocality();
    const validate = Validate();
    const breadCrumbAction = BreadCrumbAction();

    const martCategoriesFromRedux = useSelector((state) => (validate.isNotEmpty(state?.medplusCatalog?.martCatalog)) ? state.medplusCatalog.martCatalog : {});
    const doctorsCategory = useSelector(state => validate.isNotEmpty(state?.medplusCatalog?.doctorCatalog?.doctorsCatalog) ? state.medplusCatalog.doctorCatalog.doctorsCatalog : {});
    const labCategoryData = useSelector(state => validate.isNotEmpty(state?.medplusCatalog?.labCatalog?.diagnosticCatalog) ? state.medplusCatalog.labCatalog.diagnosticCatalog : {});
    const catalogCategoryies = (validate.isNotEmpty(selectedLocality) && validate.isNotEmpty(selectedLocality['catalogId'])) ? martCategoriesFromRedux[selectedLocality['catalogId']] : validate.isNotEmpty(martCategoriesFromRedux['CATALOG_DFT1']) ? martCategoriesFromRedux['CATALOG_DFT1'] : {};

    useEffect(() => {
        breadCrumbAction.pushBreadCrumbs({ name: 'Site Map', url: props.location.pathname });
    }, [])

    const getUrl = (categoryName, categoryId) => {
        if (validate.isEmpty(categoryId)) {
            return (`${DIAGNOSTICS_URL_PREFIX}`);
        }
        if (categoryId.includes("LABS_")) {
            return (`${DIAGNOSTICS_URL_PREFIX}/sub-category/` + getCategoryNameForUrl(categoryName + "", categoryId))
        } else {
            return (`${DIAGNOSTICS_URL_PREFIX}/department/` + getCategoryNameForUrl(categoryName + "", categoryId));
        }
    }

    const getSubCategories = (categoryData) => {
        if (validate.isEmpty(categoryData)) {
            return (
                <React.Fragment></React.Fragment>
            )
        }
        return (
            Object.entries(categoryData).map(([key, value]) => {
                return (
                    <React.Fragment>
                        <li aria-role="listitem">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                                <g transform="translate(-906.838 780) rotate(-90)">
                                    <rect fill="none" width="18" height="18" transform="translate(762 906.838)" />
                                    <path fill="#080808" d="M61.559,501.985l4.049-4.049a.917.917,0,1,0-1.3-1.3l-3.4,3.39-3.4-3.4a.921.921,0,0,0-1.569.649.912.912,0,0,0,.272.649l4.049,4.059A.922.922,0,0,0,61.559,501.985Z" transform="translate(710.032 416.557)" />
                                </g>
                            </svg>
                            <Link to={getUrl(value, key)} title={value} aria-label={`Redirecting to ${value}`}>
                                {value}
                            </Link>
                        </li>
                    </React.Fragment>
                )
            }))
    }

    const getDoctorsSubCategories = (subCategoryData, topCategoryName) => {
        if (validate.isEmpty(subCategoryData)) {
            return (
                <React.Fragment></React.Fragment>
            )
        }
        return (
            Object.entries(subCategoryData).map(([key, value]) => {
                return (
                    <React.Fragment>
                        <li aria-role="listitem">
                            <Link to={getDoctorsUrl(topCategoryName, value, key)} title={value} aria-label={`Redirecting to ${value}`}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                                <g transform="translate(-906.838 780) rotate(-90)">
                                    <rect fill="none" width="18" height="18" transform="translate(762 906.838)" />
                                    <path fill="#080808" d="M61.559,501.985l4.049-4.049a.917.917,0,1,0-1.3-1.3l-3.4,3.39-3.4-3.4a.921.921,0,0,0-1.569.649.912.912,0,0,0,.272.649l4.049,4.059A.922.922,0,0,0,61.559,501.985Z" transform="translate(710.032 416.557)" />
                                </g>
                            </svg>
                                {value}
                            </Link>
                        </li>
                    </React.Fragment>
                )
            }))
    }

    const svg = <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
        <g transform="translate(-906.838 780) rotate(-90)">
            <rect fill="none" width="18" height="18" transform="translate(762 906.838)" />
            <path fill="#080808" d="M61.559,501.985l4.049-4.049a.917.917,0,1,0-1.3-1.3l-3.4,3.39-3.4-3.4a.921.921,0,0,0-1.569.649.912.912,0,0,0,.272.649l4.049,4.059A.922.922,0,0,0,61.559,501.985Z" transform="translate(710.032 416.557)" />
        </g>
    </svg>;

    const data = {
        "About Us": [
            {
                redirectTo: "/aboutUs",
                title: "About MedPlusMart.com"
            },
            {
                redirectTo: "/pharmaHome",
                title: "Pharmacy"
            },
            {
                redirectTo: "/",
                title: "General store"
            },
            {
                redirectTo: "/customerFeedback",
                title: "Customer Feedback"
            },
            {
                redirectTo: "/contactUs",
                title: "Contact Us"
            },
            {
                redirectTo: "/storeLocator",
                title: "Store Locator"
            },
            {
                redirectTo: "/signInPopUp",
                title: "Register Here"
            },
            {   redirectTo:(isMac() ? "https://apps.apple.com/us/app/medplus-drug-directory-store/id1070265254" : "https://play.google.com/store/apps/details?id=com.medplus.mobile.android"),
                title: "Download Apps",
            },
            {
                redirectTo: "/faq",
                title: "FAQS"
            },
            {
                redirectTo: "/healthy-life",
                title: "Healthy Life"
            }
        ],
        "Pharmacy": [
            {
                redirectTo: "/pharmaHome",
                title: "Medical Information"
            },
            {
                redirectTo: "/ordersHistory",
                title: "My Purchases"
            },
            {
                redirectTo: "/viewPrescription",
                title: "Health Records"
            },
            {
                redirectTo: "/requestProduct",
                title: "Request a Product"
            },
            {
                redirectTo: "/myWishList",
                title: "Frequently Ordered List"
            },
            {
                redirectTo: "/storelocator",
                title: "Store Locator"
            }

        ]

    }

    return (
        <React.Fragment>
            <MetaTitle metaKey={'SITEMAP'} defaultValue={"Site Map - MedPlusMart"}/>
            <section className="static-pages sitemap">
                <h6>Sitemap for MedPlus Mart</h6>
                <div className="img-container">
                    <img src={SiteMapBannerImg} alt="sitemap banner image" title="sitemap banner image" />
                </div>
                <div className="row no-gutters">
                    <div className="each-site-group col-3">
                        {validate.isNotEmpty(data) && Object.entries(data).map(([categoryName, value]) => {
                            return (
                                <React.Fragment>
                                    <p>{categoryName}</p>
                                    <ul aria-role="list">
                                        {value.map((eachSubCategory) => {
                                            return (
                                                <li aria-role="listitem">
                                                       { eachSubCategory.redirectTo.startsWith("http")? 
                                                        <a href = {eachSubCategory.redirectTo} target="_blank"  title={eachSubCategory.title} aria-label={`Redirecting to ${eachSubCategory.title}`} >
                                                            {svg}
                                                            {eachSubCategory.title}
                                                        </a>
                                                        :
                                                        <Link to={eachSubCategory.redirectTo}  title={eachSubCategory.title} aria-label={`Redirecting to ${eachSubCategory.title}`}  >
                                                            {svg}
                                                            {eachSubCategory.title}
                                                        </Link>}

                                                </li>
                                            );
                                        }
                                        )}
                                    </ul>
                                </React.Fragment>)
                        }
                        )}
                    </div>
                    {validate.isNotEmpty(catalogCategoryies) &&
                        <div className="each-site-group col-8">
                            <p>Health Store</p>
                            <div className="general-store-sitemap">
                                {validate.isNotEmpty(catalogCategoryies) && catalogCategoryies.map((eachCatalogCategory) => {
                                    return (
                                        <React.Fragment>
                                            <div className="each">
                                                <ul aria-role="list">
                                                    <li aria-role="listitem">
                                                        <Link to={`/categories/${getCategoryNameForUrl(eachCatalogCategory.categoryName, eachCatalogCategory.categoryId)}`} title={eachCatalogCategory.categoryName} aria-label={`Redirecting to ${eachCatalogCategory.categoryName}`}>  
                                                            {svg}
                                                            {eachCatalogCategory.categoryName}
                                                        </Link>
                                                    </li>
                                                    {validate.isNotEmpty(eachCatalogCategory.subCategoryInfo) && eachCatalogCategory.subCategoryInfo.map((eachSubCategory) => {
                                                        return (
                                                            <li aria-role="listitem">
                                                                <Link to={`/categories/${getCategoryNameForUrl(eachCatalogCategory.categoryName, eachCatalogCategory.categoryId)}/${getCategoryNameForUrl(eachSubCategory.categoryName, eachSubCategory.categoryId)}`} title={eachSubCategory.categoryName} aria-label={`Redirecting to ${eachSubCategory.categoryName}`}>
                                                                    {svg}
                                                                    {eachSubCategory.categoryName}
                                                                </Link>
                                                            </li>
                                                        )
                                                    })}
                                                </ul>
                                            </div>
                                        </React.Fragment>)
                                })}
                            </div>
                        </div>}{validate.isNotEmpty(labCategoryData) &&
                            <div className="each-site-group col">
                                <p>Diagnostics</p>
                                <div className="general-store-sitemap">
                                    {Object.entries(labCategoryData).map(([topCategoryName, categoryData]) => {
                                        return (
                                            <React.Fragment>
                                                <div className="each">
                                                    <ul aria-role="list">
                                                        <li aria-role="listitem">
                                                            <Link to='/diagnostics' title={topCategoryName} aria-label={`Redirecting to ${topCategoryName}`}>
                                                               {svg}
                                                                {topCategoryName}
                                                            </Link>
                                                        </li>
                                                        {getSubCategories(categoryData)}
                                                    </ul>
                                                </div>
                                            </React.Fragment>)
                                    })}
                                </div>
                            </div>}
                    {validate.isNotEmpty(doctorsCategory) &&
                        <div className="each-site-group col">
                            <p>Doctors</p>
                            <div className="general-store-sitemap">
                                {Object.entries(doctorsCategory).map(([topCategoryName, subCategoryData]) => {

                                    return (
                                        <React.Fragment>
                                            <div className="each">
                                                <ul aria-role="list">
                                                    <li aria-role="listitem">
                                                        <Link to='/doctorconsultation' title={topCategoryName} aria-label={`Redirecting to ${topCategoryName}`}>
                                                            {svg}
                                                            {topCategoryName}
                                                        </Link>
                                                    </li>
                                                    {getDoctorsSubCategories(subCategoryData, topCategoryName)}
                                                </ul>
                                            </div>
                                        </React.Fragment>)
                                })}
                            </div>
                        </div>}

                </div>
            </section>
        </React.Fragment >
    )
}

export default SiteMap;