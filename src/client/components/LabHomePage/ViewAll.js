import React from "react"
import CategoryProducts from "./CategoryProducts"
import LabsBanner from './LabsBanner';
import HomePageBanner from "../../images/common/lab-homepage-banner.png"
import LabCustomerReviews from "./LabCustomerReviews"
import PracticesWeOffer from "./PracticesWeOffer"
import { PopularTestJson, PopularDiagnosticTestJson, PopularHealthTestFiltersJson  } from "./LabStaticJsonData";

const ViewAll =(props) =>{
    const source = 'All'
    const handleData = () => {
        if(source =="All"){
            return PopularDiagnosticTestJson
        } else if(source =='') {
            return PopularTestJson
        }
    }
    return (
        <React.Fragment>
            <LabsBanner bannerSrc={HomePageBanner}/>
            <CategoryProducts productsList={PopularTestJson} />
            <PracticesWeOffer isFromProductDetail={false}/>
        </React.Fragment>
    )
}

export default ViewAll