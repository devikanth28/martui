import React from "react"
import LabsBanner from './LabsBanner';
import TestCardSlider from "./TestCardSlider";
import HomePageBanner from "../../images/common/lab-homepage-banner.png"
import HomePageSeperator from "../../images/common/lab-home-seperator.png";
import { PopularTestJson,  RadiologyImageServicesJson  } from "./LabStaticJsonData";
import SquareCardSlider from "./SquareCardSlider";
import PracticesWeOffer from "./PracticesWeOffer"

const RadiologyLandingPage =() =>{
    return (
        <React.Fragment>
            <LabsBanner bannerSrc={HomePageBanner}/>
            <SquareCardSlider sliderTitle="Department Wise Radiology Tests"  sliderContent={RadiologyImageServicesJson}/>
            <TestCardSlider sectionTitle="Popular Diagnostic Tests" sliderData ={ PopularTestJson }/>
            <a href="javascript:void(0)" title="click to know more" className="my-4 d-block pb-2">
                <img src={HomePageSeperator} alt="Click to know more" className="w-100"/>
            </a>
            <TestCardSlider sectionTitle="Popular Radiology Package" sliderData ={ PopularTestJson }/>
            <PracticesWeOffer isFromProductDetail={false}/>
        </React.Fragment>
    )
}
export default RadiologyLandingPage