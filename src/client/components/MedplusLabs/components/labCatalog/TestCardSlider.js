import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import EachTest from './EachTest';
import Alert from '../../../Common/Alert';
import LabCatalogService from '../../Services/LabCatalogService';
import TestSliderGhostImage from './TestSliderGhostImage';
import Validate from '../../../../helpers/Validate';
import {getCategoryNameForUrl, getDecodedURL} from "../../../../../client/helpers/CommonUtil";
import SliderNextArrow from "../Common/SliderNextArrow";
import SliderPrevArrow from "../Common/SliderPrevArrow";
import {SendViewAllEvent} from  '../../../../Analytics/Analytics'
import FilterSliderNextArrow from "../Common/FilterSliderNextArrow";
import FilterSliderPrevArrow from "../Common/FilterSliderPrevArrow";
import { DIAGNOSTICS_URL_PREFIX } from '../../constants/LabConstants';

const TestCardSlider = (props) => {

    const labCatalogService = LabCatalogService();
    const validate = Validate();
    const [testSummaryList, setTestSummaryList] = useState([]);
    const [alertData, setAlertData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const allFilter = {name: 'All', categoryId:'All'}
    const [selectedFilter, setSelectedFilter] = useState(allFilter);
    const selectFilterSettings = {
        dots: false,
        infinite: false,
        speed: 500,
        initialSlide: 0,
        swipeToSlide: true,
        variableWidth: true,
        arrows: false,
        //prevArrow: <FilterSliderPrevArrow />,
        //nextArrow: <FilterSliderNextArrow />,
        //slidesToShow: 3,
        /* responsive: [
            {
                breakpoint: 1366,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                }
            }
        ] */
    }
    const testSliderSettings = {
        dots: false,
        infinite: false,
        speed: 500,
        initialSlide: 0,
        swipeToSlide: true,
        variableWidth: false,
        prevArrow: <SliderPrevArrow />,
        nextArrow: <SliderNextArrow />,
        slidesToShow: 5,
        responsive: [
            {
                breakpoint: 1680,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1440,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1366,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            }
        ]
    };
    useEffect(() => {
        if (validate.isNotEmpty(props.testFilters) && validate.isEmpty(selectedFilter)) {
            setSelectedFilter(props.testFilters[0])
        }
        if (validate.isNotEmpty(props.sectionTitle)) {
            if (props.isMarketingSection) {
                getMarketingSectionTestDetails();
            } else if (props.isCategorySection) {
                getTestSummaries();
            }
        }
    },[props.sectionTitle]);

    const getTestSummaries=(categoryId) => {
        setIsLoading(true);
        labCatalogService.getTestSummariesByCategoryId({pageCount:10, categoryId: categoryId || props.sectionTitle}).then(data => { if (validate.isNotEmpty(data.dataObject) && validate.isNotEmpty(data.dataObject.pathTestInfo) && validate.isNotEmpty(data.dataObject.pathTestInfo.pathTests)) {
                setTestSummaryList(data.dataObject.pathTestInfo.pathTests)
            }
            setIsLoading(false);
        }, err => {
            setIsLoading(false);
            console.log(err);
        });
    }

    const getMarketingSectionTestDetails = () => {
        setIsLoading(true)
        let params = { "page": props.page, "title": getCategoryNameForUrl(props.sectionTitle) };
        labCatalogService.getMarketingSectionTestDetails(params).then((response) => {
            if (validate.isNotEmpty(response) && validate.isNotEmpty(response.statusCode) && "SUCCESS" == response.statusCode) {
                if (validate.isNotEmpty(response.dataObject) && validate.isNotEmpty(response.dataObject.testSummaryList)) {
                    setTestSummaryList(response.dataObject.testSummaryList);
                }
            }else if(validate.isNotEmpty(response) && validate.isNotEmpty(response.statusCode) && "FAILURE" == response.statusCode) {
                //setAlertData({ message: response.message, type: 'danger' });  
            }
            setIsLoading(false)
        }).catch(function (error) {
            setAlertData({ message: `Couldn't fetch details please try later`, type: 'danger' });
            setIsLoading(false)
        });
    }

    const clearError = () => {
        setAlertData({});
    }
    
    const getPopolarTestsSlider = (sliderData) => {
        return (
            <Slider className="popular-test-slider custom-slide-arrows" {...testSliderSettings}>
                {sliderData.map((each) => {
                    return (
                        <EachTest cardIndex="left" eachTest={each} sectionTitle ={props.sectionTitle} history={props.history} ></EachTest>
                    );
                })}
            </Slider>
        )

    }

    const redirectToViewAll = ()=>{
        if (props.isCategorySection) {
            SendViewAllEvent(props.category)
            props.history.push(`${DIAGNOSTICS_URL_PREFIX}/sub-category/${selectedFilter.categoryId == 'All' ? getDecodedURL(selectedFilter.name) : getCategoryNameForUrl(getDecodedURL(selectedFilter.name), selectedFilter.categoryId)}`);
        } else if (props.isMarketingSection) {
            SendViewAllEvent(props.sectionTitle)
            props.history.push(`${DIAGNOSTICS_URL_PREFIX}/view-all-offers/${props.page}/${getDecodedURL(props.sectionTitle)}`);
        }
        
    }

    const setFilterAndData = (eachFilter) => {
        if (eachFilter.categoryId !== selectedFilter.categoryId) {
            setSelectedFilter(eachFilter)
            getTestSummaries(eachFilter.categoryId);
        }
    }
    return (
        <React.Fragment>
            <div>
                { (!props.isTitlesLoading) && (validate.isNotEmpty(testSummaryList) || isLoading) && <div className="d-flex align-items-center justify-content-between mb-3">
                    <h5 className="m-0">{props.isCategorySection ? props.category : props.sectionTitle}</h5>
                    {( validate.isEmpty(props.testFilters) && testSummaryList.length > 9) && <button type="button" role="button" onClick={() => redirectToViewAll()} className="btn brand-secondary px-4 rounded-pill">View All</button>}
                </div> }
                { validate.isNotEmpty(testSummaryList) && <section className="">
                    { validate.isNotEmpty(props.testFilters) && <div className="align-items-center d-flex justify-content-between pt-3 px-4">
                        {validate.isNotEmpty(props.testFilters) ?
                        <div className="test-filter-container">
                            <Slider className="select-test-filter" {...selectFilterSettings}>
                                { validate.isNotEmpty(props.testFilters) && <div className="item my-0" key={0}>
                                    <button type="button" className={selectedFilter.categoryId == allFilter.categoryId ? "btn btn-badge active" : "btn btn-badge"} title={allFilter.name} role="button" onClick={() => setFilterAndData(allFilter)}>{allFilter.name}</button>
                                </div> }
                                {props.testFilters.map((eachFilter, index) => {
                                    return (<div className="item my-0" key={index+1}>
                                        <button type="button" className={selectedFilter.categoryId == eachFilter.categoryId ? "btn btn-badge active" : "btn btn-badge"} title={eachFilter.name} role="button" onClick={() => setFilterAndData(eachFilter)}>{eachFilter.name}</button>
                                    </div>
                                    )
                                })}
                            </Slider>
                        </div> : <div></div>}
                        {(validate.isNotEmpty(props.testFilters) && testSummaryList.length > 9) && <button role="button" type ="button" onClick={() => redirectToViewAll()} className="btn brand-secondary px-4 rounded-pill">View All</button>}
                    </div> }
                    { (!isLoading && !props.isTitlesLoading && validate.isNotEmpty(testSummaryList)) && <div className={validate.isEmpty(props.testFilters) ? "home-page-slider-container pb-2 px-4 pt-2" : "home-page-slider-container pb-2 px-4 pt-0"}>
                        {getPopolarTestsSlider(testSummaryList)}
                    </div> }
                </section>}
            </div>
            <TestSliderGhostImage isTitlesLoading={props.isTitlesLoading} isSectionLoading={isLoading ? undefined : isLoading}></TestSliderGhostImage>
            {alertData && alertData.message && <Alert alertInfo={alertData} onDurationEnd={clearError} duration={5000} />}
        </React.Fragment>
    )
}
export default TestCardSlider;