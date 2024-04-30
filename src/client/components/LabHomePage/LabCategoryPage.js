import React from "react"
import LabsBanner from './LabsBanner';
import HomePageBanner from "../../images/common/lab-homepage-banner.png"
import CategoryProducts from "./CategoryProducts"
import PageSeperator from "../../images/common/lab-home-seperator.png";
import PracticesWeOffer from "./PracticesWeOffer"
import TestCardSlider from "./TestCardSlider";
import LabCustomerReviews from "./LabCustomerReviews"
import RelatedLabArticles from "./RelatedLabArticles"
import { PopularTestJson, PopularDiagnosticTestJson, PopularHealthTestFiltersJson  } from "./LabStaticJsonData";
const LabCategoryPage=() =>{
    return(
        <React.Fragment>
            <LabsBanner bannerSrc={HomePageBanner}/>
            <section className="shadow-none">
                <div className="category-container">
                    <h5 className="mt-0 mb-3">Biochemistry</h5>
                    <p className="mb-4 pb-2">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus…</p>
                    <CategoryProducts productsList={PopularTestJson} />
                </div>
                
            </section>
            <a href="javascript:void(0)" title="click to know more" className="my-4 d-block pb-2">
                <img src={PageSeperator} alt="Click to know more" className="w-100"/>
            </a>
            <TestCardSlider sectionTitle="Popular Diagnostic Tests" sliderData ={ PopularDiagnosticTestJson }/>
            <TestCardSlider testFilters={PopularHealthTestFiltersJson} sectionTitle="Popular Health Checkups" sliderData ={ PopularTestJson }/>
            <RelatedLabArticles />
            <PracticesWeOffer isFromProductDetail={false}/>
            <LabCustomerReviews/>
        </React.Fragment>
    )
}
export default LabCategoryPage;