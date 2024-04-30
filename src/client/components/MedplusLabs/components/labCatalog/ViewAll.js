import React,{useState, useEffect} from "react"
import CategoryProducts from "./CategoryProducts"
import PracticesWeOffer from "../Home/PracticesWeOffer";
import LabsBanner from "../Common/LabsBanner";
import LabCatalogService from "../../Services/LabCatalogService";
import Validate from "../../../../helpers/Validate";
import NoTestsAvailable from "../Common/NoTestsAvailable";
import {TestsListGhostImage}  from "../Common/TestListGhostImage";
import SortBySection from "../Common/SortBySection";
import { getCategoryIdFromUrl, getCategoryNameForUrl, getDepartmentIdFromUrl } from "../../../../helpers/CommonUtil";
import { DIAGNOSTICS_URL_PREFIX } from "../../constants/LabConstants";

const ViewAll =(props) =>{

    const labCatalogService = LabCatalogService();
    const validate = Validate();
    const [pathTestInfo, setPathTestInfo] = useState({});
    const [pathTests, setPathTests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortTab, setSortTab] = useState("A_TO_Z");
    const [loadMore, setLoadMore] = useState(false);
    const derived = props.location.pathname.includes("/department/");
    const test = props.match.params.test;
    let pageLength = 10;   
    const categoryId= props.match.params.categoryNameId ? props.match.params.categoryNameId.includes("_LABS_") ? getCategoryIdFromUrl(props.match.params.categoryNameId) :  getDepartmentIdFromUrl(props.match.params.categoryNameId) : "";
    const page = props.match.params.page;

    useEffect(()=>{
        if(props.location.pathname.includes("view-all-offers")){
            if(props.match.params.marketingSection.indexOf("%") > -1){
                props.history.replace(`${DIAGNOSTICS_URL_PREFIX}/view-all-offers/${props.match.params.page}/${decodeURIComponent(props.match.params.marketingSection)}`);
                return;
            }
            if (test) {
                getPackagesIncludeTest(getNameFromUrl(page))
            } else {
                getMarketingSectionTestDetails(page,getNameFromUrl(props.match.params.marketingSection));
            }
        } else if (props.location.pathname.includes("view-all-tests")) {
            getTestSummariesByCategoryId(pageLength);
        } else if (props.location.pathname.includes("search-all-tests")) {
            getTestsBySearchText(props.match.params.searchText, pathTests.length + pageLength);
        }
    }, [props.match.params.marketingSection]);

    const getNameFromUrl = (urlName) => {
        let replaceNameString = undefined;
        if(urlName) {
            replaceNameString = urlName.replace(/percent/g, "%")
                    .replace(/-and-/g, "\+").replace(/-n-/g, "&")
                    .replace(/-/g, " ");
        }
        return replaceNameString;
    }

    const getPackagesIncludeTest = (page) => {
        setIsLoading(true)
        let params = {"testCode":page};
        labCatalogService.getPackagesIncludeTest(params).then((response)=>{
            if(validate.isNotEmpty(response) && validate.isNotEmpty(response.statusCode) && "SUCCESS" == response.statusCode){
                if(validate.isNotEmpty(response.dataObject) && validate.isNotEmpty(response.dataObject.testSummaryList)){
                    setPathTests(response.dataObject.testSummaryList);
                    setPathTestInfo(response.dataObject);
                }
            }
            setIsLoading(false);
        }).catch(function(error) {
            setAlertData({ message: `Couldn't fetch details please try later`, type: 'danger' });
            setIsLoading(false)
        });
    }

    const getMarketingSectionTestDetails = (page,sectionTitle,noOfTests)=>{
        setIsLoading(true);
        let params = {"page":page,"title":getCategoryNameForUrl(sectionTitle), "noOfTests": noOfTests};
        labCatalogService.getMarketingSectionTestDetails(params).then((response)=>{
            if(validate.isNotEmpty(response) && validate.isNotEmpty(response.statusCode) && "SUCCESS" == response.statusCode){
                if(validate.isNotEmpty(response.dataObject) && validate.isNotEmpty(response.dataObject.testSummaryList)){
                    setPathTests(response.dataObject.testSummaryList);
                }
            }
            setIsLoading(false);
        }).catch((error) => {
            setIsLoading(false);
        });
    }

    const getTestSummariesByCategoryId = (pageCount, sortBy)=>{
        if(validate.isEmpty(categoryId)){
            setIsLoading(false);
            setPathTestInfo({});
            setPathTests([]);
            return false;
        } 
        if (derived) {
            setIsLoading(true);
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
        } else {
            setIsLoading(true);
            labCatalogService.getTestSummariesByCategoryId({"categoryId":categoryId, "pageCount":pageCount, sortBy:sortBy}).then((response)=>{
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
        setIsLoading(false);
        setLoadMore(false);
    }
    
    const handleLoadMore = () =>{
        setLoadMore(true);
        if (props.location.pathname.includes("view-all-tests")) {
            getTestSummariesByCategoryId(pathTests.length + pageLength, sortTab);
        } else if (props.location.pathname.includes("search-all-tests")) {
            getTestsBySearchText(props.match.params.searchText, pathTests.length + pageLength);
        }
    }

    const testListSortBy = (sortBy) =>{
        setSortTab(sortBy);
        setPathTests([]);
        getTestSummariesByCategoryId(pathTests.length, sortBy);
    }

    const getTestsBySearchText = (searchText, noOfRecords) => {
        setIsLoading(true);
        labCatalogService.getViewAllTests({ searchKey: searchText, noOfRecords: noOfRecords }).then((response) => {
            if (validate.isNotEmpty(response) && validate.isNotEmpty(response.statusCode) && "SUCCESS" == response.statusCode) {
                if (validate.isNotEmpty(response.dataObject) && validate.isNotEmpty(response.dataObject.pathTests)) {
                    setPathTests(response.dataObject.pathTests);
                    setPathTestInfo({ totalRecords: response.dataObject.totalRecords });
                }
            }
            setAllLoaders();
        }).catch(error => {
            setAllLoaders();
            console.log("Error while getting Tests", error);
        });
    }

    return (
        <React.Fragment>
            {validate.isNotEmpty(categoryId) && <LabsBanner requestFor={'BANNER_LABS_WEB'} page={categoryId} screenLocation={"TOP"} history={props.history} />}
            <section className="shadow-none">
                <div className="category-container">
                    {(validate.isNotEmpty(pathTestInfo.totalRecords) && pathTestInfo.totalRecords>1 && validate.isNotEmpty(categoryId)) && <SortBySection sortTab={sortTab} testListSortBy={testListSortBy} visibleRecordsCount={pathTests.length} totalRecords={pathTestInfo.totalRecords}></SortBySection>}
                    {isLoading && !loadMore && <TestsListGhostImage></TestsListGhostImage>}
                    {!isLoading && validate.isEmpty(pathTests) && <NoTestsAvailable text={"No Tests Available"}></NoTestsAvailable>}
                    {validate.isNotEmpty(pathTests) && pathTests.length > 0 &&
                        <CategoryProducts pathTests = {pathTests}  handleLoadMore={handleLoadMore} pageLength={pathTestInfo.totalRecords-pathTests.length>pageLength?pageLength:pathTestInfo.totalRecords-pathTests.length} history={props.history} sortTab={sortTab} testListSortBy={testListSortBy} loadMore={loadMore} totalRecords={pathTestInfo.totalRecords}/>
                    }
                </div>
            </section>
            {validate.isNotEmpty(categoryId) && <LabsBanner requestFor={'BANNER_LABS_WEB'} page={categoryId} screenLocation={"BOTTOM"} history={props.history} />}
            <PracticesWeOffer/>
        </React.Fragment>
    )
}

export default ViewAll;