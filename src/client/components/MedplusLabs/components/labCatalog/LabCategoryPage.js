import React, { useEffect, useState } from "react"
import TestCardSlider from "./TestCardSlider";
import CategoryProducts from "./CategoryProducts";
import Validate from "../../../../helpers/Validate";
import LabCatalogService from "../../Services/LabCatalogService";
import PracticesWeOffer from "../Home/PracticesWeOffer";
import LabsBanner from "../Common/LabsBanner";
import {TestsListGhostImage} from "../Common/TestListGhostImage";
import NoTestsAvailable from "../Common/NoTestsAvailable";
import SortBySection from "../Common/SortBySection";
import { getCategoryIdFromUrl, getCategoryNameForUrl, getCategoryNameFromUrl, getDepartmentIdFromUrl, getDepartmentNameFromUrl } from "../../../../helpers/CommonUtil";
import useStaticContent from "../../../Common/CustomHooks/useStaticContent";
import CategoryContentGhostImage from "../../../Common/CategoryContentGhostImage";
import MetaTitle from "../../../../commonComponents/MetaTitle";
import { DIAGNOSTICS_URL_PREFIX } from "../../constants/LabConstants";

const LabCategoryPage=(props) =>{
    const validate = Validate();
    const labCatalogService = LabCatalogService();
    const [pathTestInfo, setPathTestInfo] = useState([]);
    const [pathTests, setPathTests] = useState([]);
    const [categoryListLoading, setCategoryListLoading] = useState(true);
    const [marketingSectionTitles, setMarketingSectionTitles] = useState();
    const [categoryDetails, setCategoryDetails] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [loadMore, setLoadMore] = useState(false);
    const [sortTab, setSortTab] = useState("MOST_VIEWED");
    const categoryNameId = props.match.params.categoryNameId
    const derived = props.location.pathname.includes("/department/");
    let page = derived ? getDepartmentIdFromUrl(categoryNameId) : getCategoryIdFromUrl(categoryNameId);
    let categoryType = props.categoryType;
    let categoryName = derived ? getDepartmentNameFromUrl(categoryNameId) : getCategoryNameFromUrl(categoryNameId) ;
    const categoryId= derived ? getDepartmentIdFromUrl(categoryNameId) : getCategoryIdFromUrl(categoryNameId);
    let pageLength = 10;
    
    const [isContentLoading, content] = useStaticContent({itemId:(derived ? 'DEPARTMENT_' : "") + categoryId, contentType : "ALL"});
    

    useEffect(()=>{
        getCategoryDetailsById();
    }, [categoryNameId]);

    const getCategoryPageData = () =>{
        getTestSummariesByCategoryId(pageLength);
        if(!derived){
            getMarketingSectionTitles(categoryId);
        }
    }

    const getTestSummariesByCategoryId = (pageCount, sortBy)=>{
        if(validate.isEmpty(categoryId)){
            setCategoryListLoading(false);
            setPathTestInfo([]);
            setPathTests([]);
            return false;
        } 
        if (derived) {
            setCategoryListLoading(true);
            labCatalogService.getTestSummariesByDerivedCategoryId({"categoryId":categoryId, "pageCount":pageCount, sortBy:sortBy}).then((response)=>{
                if(validate.isNotEmpty(response) && validate.isNotEmpty(response.statusCode) && "SUCCESS" == response.statusCode){
                    if(validate.isNotEmpty(response.dataObject) && validate.isNotEmpty(response.dataObject.pathTestInfo)){
                        setPathTestInfo(response.dataObject.pathTestInfo);
                        setPathTests(response.dataObject.pathTestInfo.pathTests);
                    }
                }
                setAllLoaders();
            }).catch(function(error) {
                setAllLoaders();
                console.log("Error while getting Test Summary list", error);
            });
        } else{
            setCategoryListLoading(true);
            labCatalogService.getTestSummariesByCategoryId({ categoryId:categoryId || categoryName, pageCount:pageCount, sortBy:sortBy}).then((response)=>{
                if(validate.isNotEmpty(response) && validate.isNotEmpty(response.statusCode) && "SUCCESS" == response.statusCode){
                    if(validate.isNotEmpty(response.dataObject) && validate.isNotEmpty(response.dataObject.pathTestInfo)){
                        setPathTestInfo(response.dataObject.pathTestInfo);
                        setPathTests(response.dataObject.pathTestInfo.pathTests);
                    }
                }
                setAllLoaders();
            }).catch(function(error) {
                setAllLoaders();
                console.log("Error while getting Test Summary list", error);
            });
        }
    }

    const setAllLoaders =()=>{
        setCategoryListLoading(false);
        setLoadMore(false);
    }

    const getMarketingSectionTitles = (pageName) =>{
        setIsLoading(true)
        labCatalogService.getMarketingSectionTitles({"page":pageName}).then((response) =>{
            if(validate.isNotEmpty(response) && validate.isNotEmpty(response.statusCode) && "SUCCESS" == response.statusCode){
                if(validate.isNotEmpty(response.dataObject) && validate.isNotEmpty(response.dataObject.marketingSectionTitles)){
                    setMarketingSectionTitles(response.dataObject.marketingSectionTitles);
                }
            }
            setIsLoading(false)
        }).catch(function(error) {
            console.log("Error while getting Marketing section titles", error);
            setIsLoading(false)
        });
    }

    const getCategoryDetailsById = () =>{
        if(validate.isEmpty(categoryId)){
            setCategoryDetails({});
            setIsLoading(false);
        } else {
            setIsLoading(true);
            labCatalogService.getCategoryDetailsById({"categoryId":categoryId}).then((response) =>{
                if(validate.isNotEmpty(response) && validate.isNotEmpty(response.statusCode) && "SUCCESS" == response.statusCode){
                    setCategoryDetails(response.dataObject);
                    categoryName = response.dataObject.name;
                    if (validate.isNotEmpty(response.dataObject.name) && categoryId != response.dataObject.name) {
                        props.setCategoryName(response.dataObject.name);
                        const serverUrl = getCategoryNameForUrl(response.dataObject.name, categoryId);
                        if (categoryNameId != serverUrl) {
                            props.history.push(`${DIAGNOSTICS_URL_PREFIX}` + (derived ? '/department/' :  '/sub-category/') + serverUrl);
                        } else {
                            getCategoryPageData()
                        }
                    } else {
                        getCategoryPageData()
                    }
                }
                setIsLoading(false)
            }).catch(function(error) {
                console.log("Error while getting category details", error);
                setIsLoading(false)
            });
         }
    }

    const handleLoadMore = () =>{
        setLoadMore(true);
        getTestSummariesByCategoryId(pathTests.length + pageLength, sortTab);
    }
   
    const testListSortBy = (sortBy) =>{
        setSortTab(sortBy);
        setPathTests([]);
        getTestSummariesByCategoryId(pathTests.length, sortBy);
    }
   
    return(
        <React.Fragment>
            <MetaTitle metaKey={`${derived ? `DEPT_${categoryId}` : categoryId}`} isDefaultRequired={false} defaultValue={`${validate.isNotEmpty(categoryDetails) && validate.isNotEmpty(categoryDetails.metaTitle) ? categoryDetails.metaTitle : `MedPlusMart | ${categoryName}`}`}/>
            <LabsBanner requestFor={'BANNER_LABS_WEB'} page={page} screenLocation ={"TOP"} history={props.history}/>
            <section className="">
                <div className="category-container">
                    {validate.isNotEmpty(categoryName) && <h1 className="mt-0 mb-3">{categoryDetails.name || categoryName}</h1>}
                    {(validate.isNotEmpty(pathTestInfo.totalRecords) && pathTestInfo.totalRecords>1) && <SortBySection sortTab={sortTab} testListSortBy={testListSortBy} visibleRecordsCount={pathTests.length} totalRecords={pathTestInfo.totalRecords} ></SortBySection>}
                    {categoryListLoading && !loadMore && <TestsListGhostImage fromCategoryPage={true}></TestsListGhostImage>}
                    {!categoryListLoading && validate.isEmpty(pathTestInfo) && <NoTestsAvailable text={"No Test Available"}></NoTestsAvailable>}
                    {validate.isNotEmpty(pathTests) &&
                        <React.Fragment>
                            {validate.isNotEmpty(pathTests) && pathTests.length > 0 && <CategoryProducts categoryName={categoryName} categoryId={categoryId} pathTests = {pathTests} handleLoadMore={handleLoadMore}  history={props.history} pageLength={pathTestInfo.totalRecords-pathTests.length>pageLength?pageLength:pathTestInfo.totalRecords-pathTests.length} loadMore={loadMore} totalRecords={pathTestInfo.totalRecords} catName={validate.isNotEmpty(categoryName) && categoryName}/>}
                        </React.Fragment>
                    }
                    {isContentLoading && <CategoryContentGhostImage/>}
                    {!isContentLoading && validate.isNotEmpty(content) && validate.isNotEmpty(content.DESC) && <div className="mt-4" dangerouslySetInnerHTML={{ __html: content.DESC }} />}
                </div>
            </section>
            <LabsBanner requestFor={'BANNER_LABS_WEB'} page={page} screenLocation ={"BOTTOM"} history={props.history}/>
            {marketingSectionTitles && !isLoading && marketingSectionTitles.map((eachTitle,index)=>{            
                return <TestCardSlider key={index} sectionTitle={eachTitle} isMarketingSection={true} isTitlesLoading={false} page = {categoryId} history={props.history} />
            })}
           {/*  <TestCardSlider testFilters={PopularHealthTestFiltersJson} sectionTitle="Popular Health Checkups" sliderData ={ PopularTestJson }/> 
            <RelatedLabArticles /> */}
            <PracticesWeOffer/>
            {/*<LabCustomerReviews/>  */}  
      </React.Fragment>
    )
}
export default LabCategoryPage;