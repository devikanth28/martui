import React, { useEffect, useState } from "react";
import LabCatalogService from "../../Services/LabCatalogService";
import Validate from "../../../../helpers/Validate";
import LabsCatalogBanner from "../Common/LabsCatalogBanner";
import ConditionBasedTests from "./ConditionBasedTests";
import LabsBanner from "../Common/LabsBanner";
import PracticesWeOffer from "./PracticesWeOffer";
import LabsFrequentlyAskedQuestions from "./LabsFrequentlyAskedQuestions";
import CategorySquareCardSlider from "../Common/CategorySquareCardSlider";
import CustomCategoryBasesTests from "../Common/CustomCategoryBasesTests";
import LabCatalogAction from "../../redux/action/LabCatalogAction";
import TestCardSlider from '../labCatalog/TestCardSlider';
import useStaticContent from "../../../Common/CustomHooks/useStaticContent";
import CategoryContentGhostImage from "../../../Common/CategoryContentGhostImage";
import MetaTitle from "../../../../commonComponents/MetaTitle";

function LabHome(props){

    let page = "LabsHome";
    const labCatalogService = LabCatalogService();
    const validate = Validate();
    const [isMarketSectionLoading, setMarketSectionLoading] = useState(false);
    const [marketSectionTitles, setMarketSectionTitles] = useState(false);
    const [isBannersLoading, setBannersLoading] = useState(false);
    const [bannersData, setBannersData] = useState([]);
    const labCatalogAction = LabCatalogAction();
    const [radiologyCategoryId,setRadiologyCategoryId] = useState(null);
    const [pathologyCategoryId,setPathologyCategoryId] = useState(null);
    const [isContentLoading, content] = useStaticContent({itemId:"LAB_HOME", contentType : "ALL"});
    
    const getMarketingSectionTitles=() => {
        setMarketSectionLoading(true);
        labCatalogService.getMarketingSectionTitles({"page":page}).then((data) => {
            setMarketSectionTitles(data.dataObject.marketingSectionTitles);
            setMarketSectionLoading(false);
        }, (err) => {
            console.log(err);
            setMarketSectionLoading(false);
        })
    }

    const getSeparatorBanners=(screenLocation) => {
        setBannersLoading(true);
        const params = { "REQUEST_OBJ": {"requestFor":"BANNER_LABS_WEB","pageName":page,"screenLocation":screenLocation} }
        labCatalogService.getLabCatalogBannerDetails(params).then(data => {
            if (validate.isNotEmpty(data.dataObject) && validate.isNotEmpty(data.dataObject.bannerPromotion) && validate.isNotEmpty(data.dataObject.bannerPromotion.bannerPromoDetails) && validate.isNotEmpty(data.dataObject.bannerPromotion.bannerPromoDetails[screenLocation])) {
                setBannersData(data.dataObject.bannerPromotion.bannerPromoDetails[screenLocation]);
            }
            setBannersLoading(false);
        }, err => {
            setBannersLoading(false);
        });
    }

    function setTopCategories(topCategories){
        let radiologyId = null;
        let pathologyId = null;
        topCategories.forEach(eachCategory => {
            if(eachCategory.name == "Radiology"){
                radiologyId = eachCategory.categoryId
            } else if(eachCategory.name == "Pathology"){
                pathologyId = eachCategory.categoryId
            }
        })
        if(!pathologyId || !radiologyId){
            console.log("Setting empty");
            labCatalogAction.saveTopLevelCategories([])
        }
        setRadiologyCategoryId(radiologyId)
        setPathologyCategoryId(pathologyId)
    }

    const getTopLevelCategories = () => {
        if(labCatalogAction.getTopLevelCategories() && labCatalogAction.getTopLevelCategories().length > 0){
            setTopCategories(labCatalogAction.getTopLevelCategories())
        } else{
            console.log("Top Level Categories Not available so fetching them")
            labCatalogService.getTopLevelCategories({}).then((response)=>{
                if (response.dataObject && response.dataObject.length>0) {
                    labCatalogAction.saveTopLevelCategories(response.dataObject)
                    setTopCategories(response.dataObject);
                }
            }).catch(function(error) {
                console.log("Error while getting Test Summary list", error);
            });
        }
    }

    useEffect(() => {
        getMarketingSectionTitles();
        getSeparatorBanners("SEPARATOR");
        getTopLevelCategories();
    }, [])

    return (
        <React.Fragment>
            <MetaTitle metaKey={`DIAGNOSTICS`}/>
            <LabsBanner requestFor={'BANNER_LABS_WEB'} page={page} screenLocation ={"Top"} history={props.history}/>
            <LabsCatalogBanner isBannersLoading={isBannersLoading} bannerData={bannersData.filter(bannerData => bannerData.sequenceNo == 0)[0] } history={props.history} screenLocation={"SEPARATOR"} isGhostImageNeeded={false}/>
            <LabsCatalogBanner isBannersLoading={isBannersLoading} bannerData={ bannersData.filter(bannerData => bannerData.sequenceNo == 1)[0]} history={props.history} screenLocation={"SEPARATOR"} isGhostImageNeeded={false}/>
            { (marketSectionTitles.length > 0 || isMarketSectionLoading) &&  <TestCardSlider key={0} isMarketingSection={true} isTitlesLoading={isMarketSectionLoading} sectionTitle={marketSectionTitles[0]} page={page} history={props.history} /> }
            <LabsCatalogBanner isBannersLoading={isBannersLoading} bannerData={ bannersData.filter(bannerData => bannerData.sequenceNo == 2)[0]} history={props.history} screenLocation={"SEPARATOR"} isGhostImageNeeded={false}/>
            {/* Department based categories means Pathology/Radiology Derived 2nd level Categories */}
            <CategorySquareCardSlider sectionTitle="Department Wise Diagnostic Tests" categoryType="DERIVED" history={props.history}/>
            <LabsCatalogBanner isBannersLoading={isBannersLoading} bannerData={ bannersData.filter(bannerData => bannerData.sequenceNo == 3)[0]} history={props.history} screenLocation={"SEPARATOR"}/>
            {/* Radiology & Imaging Services based categories means Radiology Configured 2nd level Categories */}
            {radiologyCategoryId &&
                <CategorySquareCardSlider sectionTitle="Radiology & Imaging Services" categoryId={radiologyCategoryId} categoryType="CONFIGURED" history={props.history}/>
            }
            <LabsCatalogBanner isBannersLoading={isBannersLoading} bannerData={ bannersData.filter(bannerData => bannerData.sequenceNo == 4)[0]} history={props.history} screenLocation={"SEPARATOR"}/>
            {/* Condition based categories means Pathology Configured 2nd level Categories */}
            {pathologyCategoryId &&
                <ConditionBasedTests sectionTitle="Condition Based Diagnostic Tests" categoryId={pathologyCategoryId} history={props.history}/>
            }
            <LabsCatalogBanner isBannersLoading={isBannersLoading} bannerData={ bannersData.filter(bannerData => bannerData.sequenceNo == 5)[0]} history={props.history} screenLocation={"SEPARATOR"}/>
            <LabsBanner requestFor={'BANNER_LABS_WEB'} packageSlider={true} slides={3} title="Popular Health Packages" page={page} screenLocation ={"Popular_Packages_Banner"} history={props.history}/>
            {/* <PopularHealthPackagesSilder/> */}
            <LabsCatalogBanner isBannersLoading={isBannersLoading} bannerData={ bannersData.filter(bannerData => bannerData.sequenceNo == 6)[0]} history={props.history} screenLocation={"SEPARATOR"}/>
            <CustomCategoryBasesTests sectionTitle="Popular Health Checkups" categoryType="CUSTOM" history={props.history}/>
            <LabsCatalogBanner isBannersLoading={isBannersLoading} bannerData={ bannersData.filter(bannerData => bannerData.sequenceNo == 7)[0]} history={props.history} screenLocation={"SEPARATOR"}/>
            { marketSectionTitles.length > 1 && marketSectionTitles.slice(1).map((sectionTitle, index) => {
                return  (
                    <React.Fragment>
                        <TestCardSlider key={index+1} isMarketingSection={true} isTitlesLoading={isMarketSectionLoading} sectionTitle={sectionTitle} page={page} history={props.history} />
                        <LabsCatalogBanner isBannersLoading={isBannersLoading} bannerData={bannersData.filter(bannerData => bannerData.sequenceNo == (index+8))[0]} history={props.history} screenLocation={"SEPARATOR"}/>
                    </React.Fragment>
                )
            })}
            { bannersData.length > marketSectionTitles.length && bannersData.slice((marketSectionTitles.length || 1) + 7).map((bannerData, index) => {
                return <LabsCatalogBanner isBannersLoading={isBannersLoading} bannerData={bannersData.filter(bannerData => bannerData.sequenceNo == (index + ((marketSectionTitles.length || 1) + 7)))[0]} history={props.history} screenLocation={"SEPARATOR"}/>
            })}
            <LabsFrequentlyAskedQuestions page={page} />
            {!isContentLoading && validate.isNotEmpty(content) && validate.isNotEmpty(content.DESC) && <section className="p-5" dangerouslySetInnerHTML={{ __html: content.DESC }} />}
            {isContentLoading && <CategoryContentGhostImage/>}
            <PracticesWeOffer />
        </React.Fragment>
    )
}
export default LabHome;