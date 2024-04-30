import React from "react"
import LabsBanner from './LabsBanner';
import TestCardSlider from "./TestCardSlider";
import HomePageBanner from "../../images/common/lab-homepage-banner.png"
import HomePageSeperator from "../../images/common/lab-home-seperator.png";
import ConditionBasedTestSlider from "./ConditionBasedTestSlider";
import { PopularTestJson, ConditionBasedTestJson, DepartmentWiseTestJson, RadiologyImageServicesJson,PopularHealthTestFiltersJson  } from "./LabStaticJsonData";
import LabCustomerReviews from "./LabCustomerReviews"
import SquareCardSlider from "./SquareCardSlider";

const PathologyLandingPage =() =>{
    return (
    <React.Fragment>
        <LabsBanner bannerSrc={HomePageBanner}/>
        <ConditionBasedTestSlider showViewAll={false} sectionTitle="Condition Based Diagnostic Tests" conditionBasedTestJson ={ ConditionBasedTestJson }/>
        <TestCardSlider sectionTitle="Popular Diagnostic Tests" sliderData ={ PopularTestJson }/>
        <SquareCardSlider sliderTitle="Department Wise Diagnostic Tests"  sliderContent={DepartmentWiseTestJson}/>
        <a href="javascript:void(0)" title="click to know more" className="my-4 d-block pb-2">
                <img src={HomePageSeperator} alt="Click to know more" className="w-100"/>
        </a>
        <TestCardSlider sectionTitle="Popular Health Packages" sliderData ={ PopularTestJson }/>
        <TestCardSlider testFilters={PopularHealthTestFiltersJson} sectionTitle="Popular Health Checkups" sliderData ={ PopularTestJson }/>
        <a href="javascript:void(0)" title="click to know more" className="my-4 d-block pb-2">
                <img src={HomePageSeperator} alt="Click to know more" className="w-100"/>
        </a>
        <LabCustomerReviews/>

    </React.Fragment>
    )   
}

export default PathologyLandingPage