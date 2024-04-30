import React from 'react';
import TestCardSlider from "./TestCardSlider";
import { PopularTestJson, ConditionBasedTestJson, PopularDiagnosticTestJson, DepartmentWiseTestJson, RadiologyImageServicesJson,PopularHealthTestFiltersJson  } from "./LabStaticJsonData";
import ConditionBasedTestSlider from "./ConditionBasedTestSlider";
import SquareCardSlider from "./SquareCardSlider";
import HomePageBanner from "../../images/common/lab-homepage-banner.png"
import PracticesWeOffer from "./PracticesWeOffer"
import HomePageSeperator from "../../images/common/lab-home-seperator.png";
import LabsFrequentlyAskedQuestions from "./LabsFrequentlyAskedQuestions"
import LabCustomerReviews from "./LabCustomerReviews"
import LabsBanner from './LabsBanner';

const LabHomePage =(props) =>{
    return(
        <React.Fragment>
            <LabsBanner bannerSrc={HomePageBanner}/>
            <TestCardSlider sectionTitle="Popular Diagnostic Tests" history={props.history} sliderData ={ PopularDiagnosticTestJson } showParameters ={true}/>
            <a href="javascript:void(0)" title="click to know more" className="my-4 d-block pb-2">
                <img src={HomePageSeperator} alt="Click to know more" className="w-100"/>
            </a>
            <ConditionBasedTestSlider showViewAll={false} sectionTitle="Condition Based Diagnostic Tests" conditionBasedTestJson ={ ConditionBasedTestJson }/>
            <PracticesWeOffer isFromProductDetail={false}/>
            <SquareCardSlider history={props.history} sliderTitle="Department Wise Diagnostic Tests"  sliderContent={DepartmentWiseTestJson}/>
            <SquareCardSlider sliderTitle="Radiology & Imaging Services"  sliderContent={RadiologyImageServicesJson}/>
            <TestCardSlider testFilters={PopularHealthTestFiltersJson} sectionTitle="Popular Health Checkups"  showParameters ={false} sliderData ={ PopularTestJson }/>
            <TestCardSlider sectionTitle="Popular Health Packages"  showParameters ={false} sliderData ={ PopularTestJson }/>
            <LabsFrequentlyAskedQuestions/>
            <LabCustomerReviews/>
        </React.Fragment>
    )
}
export default LabHomePage;