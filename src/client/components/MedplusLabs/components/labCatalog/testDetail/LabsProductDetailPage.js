import React, { useEffect, useState } from "react"
import Validate from "../../../../../helpers/Validate";
import LabCatalogService from "../../../Services/LabCatalogService";
import Alert from "../../../../Common/Alert";
import LabsProductInfo from "./LabsProductInfo"
import BookTestButton from "./BookTestButton";
import Features from "./Features";
import PopularTestsList from "./PopularTestsList";
import TestDetailGhostImage from "./TestDetailGhostImage";
import { useSelector } from "react-redux";
import NearByCollectionCenterssModal from "../../Common/NearByCollectionCenterssModal"
import { getLabSelectedLocality, getSelectedLocality } from "../../../../../../redux/action/LocalityAction";
import ChangeLocality from "../../../../Locality/ChangeLocality";
import { fixUrl, getCategoryNameForUrl, getCategoryOrDepartmentIDFromUrl, getTestCodeFromUrl, getTestNameFromUrl } from "../../../../../helpers/CommonUtil";
import LabsBanner from "../../Common/LabsBanner";
import { sendMemberEvent } from '../../../../../Analytics/Analytics';
import EstimatedReportDelivery from "../../Common/EstimatedReportDelivery";
import { Helmet } from "react-helmet";
import { MEDPLUS_ADVANTAGE_HOME } from "../../../../Subscription/constants/SubscriptionConstants";
import { DIAGNOSTICS_URL_PREFIX, getServiceOption } from "../../../constants/LabConstants";

const LabsProductDetailPage = (props) => {

    const validate = Validate();
    const labCatalogService = LabCatalogService();
    const [loader, setLoader] = useState(true);
    const [labTestContent, setLabTestContent] = useState(true);
    const [selectedTab, setSelectedTab] = useState("Description");
    const [testData, setTestData] = useState('');
    const [testIncludedAvailable, setTestIncludedAvailable] = useState(false);
    const [testParametersAvailable, setTestParametersAvailable] = useState(false);
    const [faqAvailable, setFaqAvailable] = useState(false);
    const [kytAvailable, setKytAvailable] = useState(false);
    const [descAvailable, setDescAvailable] = useState(false);
    const [alertData, setAlertData] = useState({});
    const [nearByCollectionCenters, setNearByCollectionCenters] = useState([]);
    const selectedLabLocality = getLabSelectedLocality();
    const selectedLocality = getSelectedLocality();
    const [isLocalityModalOpen, setLocalityModalOpen] = useState(false);
    const [displayNoDataFound, setDisplayNoDataFound] = useState(false)
    const categoryNameId = props.match.params.categoryNameId
    const categoryId = validate.isNotEmpty(categoryNameId) ? getCategoryOrDepartmentIDFromUrl(categoryNameId) : undefined;
    const localityModalToggle = () => setLocalityModalOpen(!isLocalityModalOpen);
    const testCodeName = props.match.params.testNameId;
    let testCode = getTestCodeFromUrl(testCodeName);
    let testNameFromUrl = getTestNameFromUrl(props.match.params.testNameId);
    const isSubscribed = useSelector(state => {
        if (validate.isNotEmpty(state.labCatalog) && validate.isNotEmpty(state.labCatalog.isSubscribed) && validate.isNotEmpty(state.userInfo) && validate.isNotEmpty(state.userInfo.userInfo)) {
            return state.labCatalog.isSubscribed;
        }
    })

    const getOtherNames = (otherNames) => {
        var otherTestNames = otherNames.map((eachName, index) =>
            <button role="button" type="button" key={index} className={index == 0 ? `badge border-sort-btn bg-white px-2 mx-0 mb-1 ${getActiveClass(eachName)}` : `badge border-sort-btn bg-white px-2 mb-1 ${getActiveClass(eachName)}`}>{eachName}</button>
        );
        return otherTestNames;
    }

    const getActiveClass = (eachTestName) => {
        return eachTestName.trim().toLowerCase() === testNameFromUrl.trim().toLowerCase() ? "active" : 'no-hover';
    }

    const getTestDetails = () => {
        if (validate.isEmpty(testCode)) {
            props.history.goBack();
        }
        setLoader(true);
        let params = {
            testId: testCode
        }
        labCatalogService.getTestsDetailsByTestId(params).then((data) => {
            if (validate.isNotEmpty(data) && validate.isNotEmpty(data['dataObject'])) {
                const testDetails = data['dataObject'];
                setTestData(testDetails);
                if (validate.isNotEmpty(testDetails)) {
                    props.setTestName(testDetails.name);
                }
                if (validate.isNotEmpty(testDetails.tests)) {
                    setTestIncludedAvailable(true);
                    if (!(faqAvailable || kytAvailable || descAvailable)) {
                        setSelectedTab("Tests Included")
                    }
                }
                if (!testDetails.isProfile && !testDetails.package && validate.isNotEmpty(testDetails.parameters)) {
                    setTestParametersAvailable(true);
                    setSelectedTab("Parameters")
                }
                if (categoryId) {
                    getCategoryDescriptionById(testDetails);
                } else {
                    const testUrls = getAlternativeTestUrls(testDetails.alternateKeywords, testDetails.code);
                    const testUrl = getCategoryNameForUrl(testDetails.name, testDetails.code);
                    testUrls.push(testUrl);
                    if (!testUrls.includes(testCodeName)) {
                        fixUrl(testCodeName, testUrl);
                    }
                }
            } else {
                setAlertData({ message: "Details of the test are not available", type: 'danger' });
                setDisplayNoDataFound(true)
                console.log("No data Available");
            }
            setLoader(false);
        }).catch(e => {
            setAlertData({ message: "Unable to get test details", type: 'danger' });
            setDisplayNoDataFound(true)
            console.log("Error: ", e);
            setLoader(false);
        });
    }

    const getAlternativeTestUrls = (alterValues, codeTest) => {
        if (alterValues) {
            return alterValues.map(testUrl => (getCategoryNameForUrl(testUrl.trim(), codeTest)));
        }
        return [];

    }

    const getTestStaticContent = () => {
        let params = {
            itemId: "LAB_" + testCode,
            contentType: 'ALL'
        }
        labCatalogService.getLabStaticContent(params).then((data) => {
            if (validate.isNotEmpty(data) && validate.isNotEmpty(data['dataObject']) && validate.isNotEmpty(data['dataObject']['result'])) {
                setLabTestContent(data['dataObject']['result']);
                setDataAvailableAndTab(validate.isNotEmpty(data['dataObject']['result']['FAQ']), setFaqAvailable, "FAQs")
                setDataAvailableAndTab(validate.isNotEmpty(data['dataObject']['result']['KNOWYOURTEST']), setKytAvailable, "Understand Test Results")
                setDataAvailableAndTab(validate.isNotEmpty(data['dataObject']['result']['DESC']), setDescAvailable, "Overview of Test")
            }
        }).catch(e => {
            console.log("Error: ", e);
        });
    }

    const setDataAvailableAndTab = (dataAvailable, setFunc, dataType) => {
        if (dataAvailable) {
            setSelectedTab(dataType)
        }
        setFunc(dataAvailable)
    }

    const getCategoryDescriptionById = (testDetails) => {
        if (validate.isNotEmpty(categoryId)) {
            labCatalogService.getCategoryDetailsById({ "categoryId": categoryId }).then((response) => {
                if (validate.isNotEmpty(response) && validate.isNotEmpty(response.statusCode) && "SUCCESS" == response.statusCode) {
                    if (response.dataObject.name) {
                        if (categoryId === 'All' || categoryId.includes("CUSTOM"))
                            return;
                        props.setCategoryName(response.dataObject.name);
                        const serverCategoryUrl = getCategoryNameForUrl(response.dataObject.name, categoryId);
                        const testUrls = getAlternativeTestUrls(testDetails.alternateKeywords, testDetails.code);
                        const testUrl = getCategoryNameForUrl(testDetails.name, testDetails.code);
                        testUrls.push(testUrl);
                        if ((categoryNameId != serverCategoryUrl) || (!testUrls.includes(testCodeName))) {
                            fixUrl(testCodeName,`${DIAGNOSTICS_URL_PREFIX}/testdetails/${serverCategoryUrl}/${testUrl}`);
                        }
                    }
                }
            }).catch(function (error) {
                console.log("Error while getting category description", error);
            });
        }
    }

    useEffect(() => {
        getTestDetails();
        getTestStaticContent();
        getNearByCollectionCenters();
    }, [props.match.params.testNameId]);

    const getNearByCollectionCenters = () => {
        labCatalogService.getTestServingCenters(testCode).then((response) => {
            if (validate.isNotEmpty(response) && response.statusCode == "SUCCESS" && validate.isNotEmpty(response.dataObject)) {
                setNearByCollectionCenters(response.dataObject);
            }
        }).catch(e => {
            console.log("Error: ", e);
        });
    }

    const clearError = () => {
        setAlertData({});
    }

    const isContentAvailable = () => {
        return (faqAvailable || kytAvailable || descAvailable || testIncludedAvailable || testParametersAvailable)
    }

    const goToSubscriptionPage = () => {
        sendMemberEvent(testData.name)
        props.history.push(`${MEDPLUS_ADVANTAGE_HOME}`);
    }

    const getGenderIcon = (gender) => {
        switch (gender) {
            case "Male": return <>
                <svg className="ml-1 mr-3" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="36" height="36" viewBox="0 0 36 36">
                    <g id="male-icn" transform="translate(-472 -811)" clip-path="url(#clip-path)">
                        <path id="Union_176" data-name="Union 176" d="M6.9,26.111A11.292,11.292,0,1,1,17.5,6.28L20.676,3.1l-2.237-.448A1.341,1.341,0,0,1,18.7,0a1.242,1.242,0,0,1,.269.029l4.688.937A1.328,1.328,0,0,1,24.7,2.023l.939,4.687A1.341,1.341,0,0,1,24.6,8.283a1.3,1.3,0,0,1-.268.027,1.34,1.34,0,0,1-1.311-1.075L22.569,5,19.55,8.014A11.291,11.291,0,0,1,6.9,26.111Zm-4.216-10.4A8.611,8.611,0,1,0,11.289,7.1,8.62,8.62,0,0,0,2.679,15.709Z" transform="translate(477.251 815.5)" fill="#080808" />
                    </g>
                </svg>
            </>;
            case "Female": return <>
                <svg className="ml-1 mr-3" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="36" height="36" viewBox="0 0 36 36">
                    <g id="female-icn" transform="translate(-472 -811)" clip-path="url(#clip-path)">
                        <g id="Group_28546" data-name="Group 28546" transform="translate(479 815)">
                            <path id="Union_173" data-name="Union 173" d="M6.767,21.287a11.085,11.085,0,0,1,0-20.416,11.081,11.081,0,0,1,8.624,20.416,11.11,11.11,0,0,1-8.624,0ZM2.478,11.078a8.6,8.6,0,1,0,8.6-8.6A8.61,8.61,0,0,0,2.478,11.078Z" fill="#080808" />
                            <g id="Group_28546-2" data-name="Group 28546" transform="translate(7.492 20.828)">
                                <path id="Union_175" data-name="Union 175" d="M0,6.188V.984a.983.983,0,1,1,1.966,0v5.2A.983.983,0,1,1,0,6.188Z" transform="translate(2.602 0)" fill="#080808" />
                                <path id="Union_174" data-name="Union 174" d="M.983,1.966A.983.983,0,0,1,.983,0H6.188a.983.983,0,0,1,0,1.966Z" transform="translate(0 3.643)" fill="#080808" />
                            </g>
                        </g>
                    </g>
                </svg>
            </>;
            case "Others Gender": return <>
                <svg className="ml-1 mr-3" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="36" height="36" viewBox="0 0 36 36">
                    <g id="other-gender-icn" transform="translate(-472 -811)" clip-path="url(#clip-path)">
                        <g id="Group_28547" data-name="Group 28547" transform="translate(-842.75 -438.35)">
                            <g id="Group_28547-2" data-name="Group 28547" transform="translate(1320.98 1256.623)">
                                <path id="Union_173" data-name="Union 173" d="M6.218,19.559A10.185,10.185,0,0,1,6.218.8a10.182,10.182,0,0,1,7.924,18.759,10.208,10.208,0,0,1-7.924,0Zm-3.941-9.38a7.9,7.9,0,1,0,7.9-7.9A7.911,7.911,0,0,0,2.277,10.179Z" fill="#080808" />
                                <g id="Group_28546" data-name="Group 28546" transform="translate(6.884 19.138)">
                                    <path id="Union_175" data-name="Union 175" d="M0,5.686V.9A.9.9,0,1,1,1.807.9V5.686A.9.9,0,1,1,0,5.686Z" transform="translate(2.391 0)" fill="#080808" />
                                    <path id="Union_174" data-name="Union 174" d="M.9,1.807A.9.9,0,0,1,.9,0H5.686a.9.9,0,0,1,0,1.807Z" transform="translate(0 3.348)" fill="#080808" />
                                </g>
                            </g>
                            <path id="Union_178" data-name="Union 178" d="M6.336,23.992A10.375,10.375,0,1,1,16.08,5.77L19,2.852,16.942,2.44A1.232,1.232,0,0,1,17.178,0a1.142,1.142,0,0,1,.247.026l4.307.861a1.22,1.22,0,0,1,.966.971l.863,4.306A1.232,1.232,0,0,1,22.6,7.611a1.2,1.2,0,0,1-.246.025,1.231,1.231,0,0,1-1.2-.988l-.412-2.057L17.963,7.364A10.375,10.375,0,0,1,6.336,23.992ZM2.462,14.434a7.912,7.912,0,1,0,7.911-7.912A7.92,7.92,0,0,0,2.462,14.434Z" transform="translate(1320.75 1252.35)" fill="#080808" />
                        </g>
                    </g>
                </svg>
            </>;
        }
    }

    /* if(loader){
        return(
            <TestDetailGhostImage></TestDetailGhostImage>
        )
    } */

    const getUnavailableMessage = (msg, changeLocalityFlag) => {
        return <div className="border d-flex justify-content-between p-2 rounded mt-3">
            <p className="font-14 m-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <g id="location_black_icon_24px" transform="translate(-48.941 -142.962)">
                        <rect id="Rectangle_3286" data-name="Rectangle 3286" width="24" height="24" transform="translate(48.941 142.962)" fill="none" />
                        <g id="Group_14535" data-name="Group 14535">
                            <path id="Union_130" data-name="Union 130" d="M-4748.071-675.757a8.605,8.605,0,0,1,1.363-9.931,8.44,8.44,0,0,1,6.228-2.494h.241a8.419,8.419,0,0,1,6.177,2.494,8.607,8.607,0,0,1,1.361,9.931,104.129,104.129,0,0,1-7.707,11.576A106.367,106.367,0,0,1-4748.071-675.757Zm2.493-8.854a7.039,7.039,0,0,0-1.111,8.128,91.342,91.342,0,0,0,6.287,9.685,89.372,89.372,0,0,0,6.321-9.685,7.043,7.043,0,0,0-1.112-8.128,6.76,6.76,0,0,0-5.046-2.01h-.241A6.742,6.742,0,0,0-4745.579-684.611Zm1.1,4.747a4.1,4.1,0,0,1,4.1-4.1,4.1,4.1,0,0,1,4.1,4.1,4.1,4.1,0,0,1-4.1,4.1A4.1,4.1,0,0,1-4744.482-679.864Zm1.559,0a2.539,2.539,0,0,0,2.537,2.535,2.538,2.538,0,0,0,2.537-2.535,2.539,2.539,0,0,0-2.537-2.537A2.54,2.54,0,0,0-4742.923-679.864Z" transform="translate(4801.327 831.143)" fill="#080808" />
                        </g>
                    </g>
                </svg>
                {msg} {changeLocalityFlag && <button role="button" onClick={() => { localityModalToggle() }} className="btn btn-link text-primary" title="Change Locality">Change Locality</button>}
            </p>
            {changeLocalityFlag && <ChangeLocality modal={isLocalityModalOpen} toggle={localityModalToggle} selectedLocality={selectedLocality} />}
        </div>
    }

    return (
        <React.Fragment>
            <div className="row mx-0">
                {loader && <div className="col-8 pl-0 pr-2"> <TestDetailGhostImage /> </div>}
                {!loader && validate.isNotEmpty(testData) &&
                    <React.Fragment>
                        <Helmet>
                            <title>
                                {(testData.serviceMetaData && testData.serviceMetaData.metaTitle) ? testData.serviceMetaData.metaTitle : testData.displayName}
                            </title>
                        </Helmet>
                        <div className="col-8 pl-0 pr-2">
                            <section className="p-3">
                                <div className="d-flex justify-content-between">
                                    <div>
                                        {validate.isNotEmpty(testData.departmentName) && <button role="button" aria-label={testData.departmentName} title={testData.departmentName} onClick={() => props.history.push(`${DIAGNOSTICS_URL_PREFIX}/department` + `/${getCategoryNameForUrl(testData.departmentName, testData.departmentId)}`)} className="btn btn-link no-underline shadow-none font-14 text-secondary px-0">{testData.departmentName}</button>}
                                        {validate.isNotEmpty(testData.name) &&
                                            <h5 className="mt-1 mb-3">{testData.name}</h5>}
                                        {validate.isNotEmpty(testData.alternateKeywords) &&
                                            <div className="mb-3">
                                                <span className="d-block font-14 text-secondary">Also known as:</span>
                                                {getOtherNames(testData.alternateKeywords)}
                                            </div>}
                                    </div>
                                </div>
                                {isSubscribed ?
                                    <div className="d-flex justify-content-between">
                                        <div className="font-16">
                                            {validate.isNotEmpty(testData?.mrp) &&
                                        	<h6 className="font-weight-normal mb-1">MRP  
                                                    <span className="ml-1 rupee">₹</span>
                                                    {validate.isNotEmpty(testData.subscriptionPrice)?
                                                    <del>{parseFloat(testData.mrp).toFixed(2)}</del>:parseFloat(testData.mrp).toFixed(2)}
                                            </h6>}
                                            {validate.isNotEmpty(testData.subscriptionPrice) && 
                                            <h6 className="font-weight-normal">MA Price  ₹
                                                <span className="h3">{parseFloat(testData.subscriptionPrice).toFixed(2)}</span>
                                            </h6>}
                                        </div>
                                        {testData.available && <div className="w-25"> <BookTestButton testCode={testData.code} available={testData.available} classStyle="btn custom-btn-xl btn-brand-gradient rounded-pill w-100" isButton={false} ></BookTestButton></div>}</div>
                                         : 
                                         <div>
                                        <div className="col pl-0">
                                            {validate.isNotEmpty(testData.subscriptionPrice) &&
                                            <div className="d-flex justify-content-between mb-4">
                                                <div>
                                                    <span className="text-secondary font-14">MA Price </span>
                                                        <h6 className="h3 mb-0">
                                                            <strong className="rupee font-16"> &#x20B9;</strong>{parseFloat(testData.subscriptionPrice).toFixed(2)}
                                                        </h6>
                                                </div>
                                                {validate.isNotEmpty(testData.subscriptionPlanPrice) &&
                                                    <React.Fragment>
                                                        <div className="w-25">
                                                         <button onClick={goToSubscriptionPage} title="MedPlus Advantage Member Price" className="brand-secondary btn py-1 font-12 mb-0 rounded-pill w-100" role="button">
                                                            Get MedPlus <br /> Advantage For<span className="ml-1 rupee small">₹</span>{parseInt(testData.subscriptionPlanPrice)}</button>
                                                        </div>
                                                    </React.Fragment>
                                                }
                                            </div>}
                                            <div className="d-flex justify-content-between">
                                                {validate.isNotEmpty(testData?.mrp) &&
                                                <div>
                                                    <span className="text-secondary font-14">MRP</span>
                                                        <h6 className="h3 mb-0">
                                                            <strong className="rupee font-16"> &#x20B9;</strong>{ parseFloat(testData.mrp).toFixed(2)}
                                                        </h6>
                                                </div>}
                                                <div className="w-25">
                                                    <BookTestButton testCode={testData.code} available={testData.available} classStyle="btn btn-brand-gradient rounded-pill shadow w-100 custom-btn-xl" isButton={true}></BookTestButton>
                                                </div>
                                            </div>
                                            {validate.isNotEmpty(testData.couponAvailable) &&
                                                <p className="text-success mb-0">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 18 18" className="align-top mr-2">
                                                        <g transform="translate(0.198 -0.206)">
                                                            <rect fill="none" width="18" height="18" transform="translate(-0.198 0.206)"></rect>
                                                            <path fill="#08CE73" d="M9,18a1.663,1.663,0,0,1-1.137-.444L6.719,16.493a.561.561,0,0,0-.383-.149.589.589,0,0,0-.08.005l-1.578.214a1.722,1.722,0,0,1-.234.015,1.612,1.612,0,0,1-1.606-1.3l-.274-1.506a.529.529,0,0,0-.286-.377L.871,12.682a1.533,1.533,0,0,1-.7-2.075l.7-1.373a.507.507,0,0,0,0-.466l-.7-1.373A1.505,1.505,0,0,1,.074,6.237a1.578,1.578,0,0,1,.8-.918L2.278,4.6a.53.53,0,0,0,.286-.377L2.839,2.72a1.612,1.612,0,0,1,1.6-1.3,1.747,1.747,0,0,1,.235.016l1.578.214a.594.594,0,0,0,.078.005.563.563,0,0,0,.384-.149L7.863.444a1.679,1.679,0,0,1,2.273,0l1.145,1.063a.564.564,0,0,0,.385.15.592.592,0,0,0,.078-.005l1.578-.214a1.744,1.744,0,0,1,.235-.016,1.613,1.613,0,0,1,1.6,1.3l.274,1.5a.53.53,0,0,0,.286.378l1.407.716a1.578,1.578,0,0,1,.8.918,1.505,1.505,0,0,1-.095,1.157l-.7,1.373a.507.507,0,0,0,0,.466l.7,1.373a1.533,1.533,0,0,1-.7,2.075l-1.407.716a.529.529,0,0,0-.286.377l-.274,1.506a1.613,1.613,0,0,1-1.606,1.3,1.75,1.75,0,0,1-.234-.016l-1.578-.214a.589.589,0,0,0-.08-.005.561.561,0,0,0-.383.149l-1.145,1.063A1.663,1.663,0,0,1,9,18Zm2.339-8.329A2.025,2.025,0,1,0,13.363,11.7,2.027,2.027,0,0,0,11.339,9.671Zm2.148-4.3a.406.406,0,0,0-.254.09l-8.5,6.881a.4.4,0,1,0,.509.629l8.5-6.88a.405.405,0,0,0-.256-.72Zm-6.6-.969A2.025,2.025,0,1,0,8.909,6.431,2.027,2.027,0,0,0,6.884,4.406Zm4.455,8.5A1.215,1.215,0,1,1,12.554,11.7,1.216,1.216,0,0,1,11.339,12.911ZM6.884,7.646A1.215,1.215,0,1,1,8.1,6.431,1.216,1.216,0,0,1,6.884,7.646Z" transform="translate(-0.198 0.206)"></path>
                                                        </g>
                                                    </svg>
                                                    {testData.couponAvailable}
                                                </p>
                                            }
                                        </div>

                                    </div>}
                                    <div className="col-12 px-0">
                                    <div className="deliverystatus">
                                        {validate.isNotEmpty(testData.serviceOption) &&
                                            <p className="mb-0 mt-3">
                                                <span className="text-secondary font-14">Sample Collection Option</span>
                                                <strong className="d-block">{getServiceOption(testData.serviceOption)}</strong>
                                            </p>
                                        }
                                        {validate.isNotEmpty(testData.reportDeliveryTime) && testData.reportDeliveryTime > 0 && <EstimatedReportDelivery isCheckoutPage={false} reportDeliveryTime={testData.reportDeliveryTime} />}
                                        {!testData.codallowed && <p className="mb-0 mt-3">
                                            <span className="text-secondary font-14">Cash on Collection Option</span>
                                            <strong className="d-block">Is not available for this test</strong></p>}
                                        {/* {validate.isNotEmpty(testData.genderSpecification) &&
                                            <p className="mb-0 mt-3">
                                                <span className="text-secondary font-14">Bookings allowed for</span>
                                                <strong className="d-block">{testData.genderSpecification} patients only</strong>
                                            </p>
                                        } */}
                                    </div>
                                </div>
                                <div className="d-flex">
                                    {validate.isNotEmpty(testData.genderSpecification) && <div className="border col d-flex mr-2 mt-3 p-2 rounded">
                                        <div className="align-items-center d-flex">
                                            { getGenderIcon(testData.genderSpecification)}
                                            <p className="font-14 m-0"><span className="text-secondary font-14">Bookings allowed for</span><strong className="d-block">{testData.genderSpecification} patients only</strong></p>
                                        </div>
                                    </div>}
                                    {!(validate.isEmpty(selectedLabLocality) || validate.isEmpty(selectedLocality) || validate.isEmpty(selectedLabLocality.collectionCenterId)) &&
                                        validate.isNotEmpty(nearByCollectionCenters) &&
                                        <div className="border col d-flex mr-2 mt-3 p-2 rounded">
                                            <NearByCollectionCenterssModal nearByCollectionCenters={nearByCollectionCenters} selectedLocality={selectedLocality} />
                                        </div>
                                    }
                                    {((validate.isEmpty(selectedLabLocality) || validate.isEmpty(selectedLocality) || validate.isEmpty(selectedLabLocality.collectionCenterId)) || (!(validate.isEmpty(selectedLabLocality) || validate.isEmpty(selectedLocality) || validate.isEmpty(selectedLabLocality.collectionCenterId)) && !testData.available)) &&
                                        <div className="border col d-flex mr-2 mt-3 p-2 rounded">
                                            <div>
                                                <svg className="ml-1 mr-3" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">
                                                    <g id="location_black_icon_36px" transform="translate(0 0.048)">
                                                        <rect id="Rectangle_3302" data-name="Rectangle 3302" width="36" height="36" transform="translate(0 -0.048)" fill="none" />
                                                        <g id="Group_28548" data-name="Group 28548" transform="translate(8 3.952)">
                                                            <path id="Union_130" data-name="Union 130" d="M1.152,14.5A10.039,10.039,0,0,1,2.742,2.909,9.847,9.847,0,0,1,10.008,0h.281A9.823,9.823,0,0,1,17.5,2.909,10.042,10.042,0,0,1,19.084,14.5,121.475,121.475,0,0,1,10.093,28,124.106,124.106,0,0,1,1.152,14.5ZM4.061,4.165a8.212,8.212,0,0,0-1.3,9.483,106.631,106.631,0,0,0,7.334,11.3,104.27,104.27,0,0,0,7.375-11.3,8.217,8.217,0,0,0-1.3-9.483A7.887,7.887,0,0,0,10.289,1.82h-.281A7.865,7.865,0,0,0,4.061,4.165ZM5.34,9.7a4.778,4.778,0,1,1,4.778,4.778A4.78,4.78,0,0,1,5.34,9.7Zm1.819,0a2.959,2.959,0,1,0,2.959-2.959A2.962,2.962,0,0,0,7.159,9.7Z" transform="translate(0)" fill="#080808" />
                                                        </g>
                                                    </g>
                                            </svg>
                                                </div>
                                        <p className="font-14 m-0">
                                            <span>Our services {!(validate.isEmpty(selectedLabLocality) || validate.isEmpty(selectedLocality) || validate.isEmpty(selectedLabLocality.collectionCenterId) && !testData.available) && <span>For test</span> } are not currently available in this location</span>
                                            <a  href="javascript:void(0)" onClick={() => { localityModalToggle() }} className="text-primary" title="Change Locality">Change Locality</a>
                                        </p>
                                        <ChangeLocality modal={isLocalityModalOpen} toggle={localityModalToggle} selectedLocality={selectedLocality} />
                                    </div>}
                                </div>


                                {/* {
                                    getUnavailableMessage("This test is not available in your locality.", false)
                                }
                                {
                                    getUnavailableMessage("Our services are not currently available in this location", true,'yes')
                                } */}
                                {(validate.isEmpty(selectedLabLocality) || validate.isEmpty(selectedLocality) || validate.isEmpty(selectedLabLocality.collectionCenterId)) &&
                                    <div className="border-top mt-3 mx-n3 pt-3 px-3">
                                        <p className="font-14 m-0"><span className="text-warning">Note:</span> Price shown above is tentative price. Please change your location to get exact price.</p>
                                    </div>
                                }
                                {(validate.isNotEmpty(testData.sampleTypeName) || validate.isNotEmpty(testData.specialInstructions)) &&
                                    <div className="mt-3">
                                        <div className="alert mb-n3 mx-n3 px-3 bottom-rounded-xl text-dark alert-warning mb-0 text-dark">
                                            {validate.isNotEmpty(testData.sampleTypeName) &&
                                                <div>
                                                    <strong>Test Requirements</strong>
                                                    <p className="font-14 mb-2">Sample Type: {testData.sampleTypeName.toLowerCase()}</p>
                                                </div>}
                                            {validate.isNotEmpty(testData.specialInstructions) &&
                                                <div>
                                                    <strong>Test Precautions</strong>
                                                    <p className="font-14 mb-0">{testData.specialInstructions}</p>
                                                </div>}
                                        </div>
                                    </div>}
                            </section>
                            {isContentAvailable() && <LabsProductInfo testParametersAvailable={testParametersAvailable} isProfileOrPackage={(testData.isProfile || testData.package)} testParametersCount={testData.noOfParameters} testParameters={testData.parameters} labTestContent={labTestContent} testsIncluded={testData.tests} testIncludedAvailable={testIncludedAvailable} faqAvailable={faqAvailable} kytAvailable={kytAvailable} descAvailable={descAvailable} selectedTab={selectedTab} includedTestsCount={testData.testIds ? testData.testIds.length : 0} history={props.history} includeDoctorConsultation={testData.includeDoctorConsultation}/>}
                        </div>
                        <div className="col-4 pr-0 pl-2">
                            <LabsBanner requestFor={'BANNER_LABS_WEB'} fromProductDetail={true} page={testData.code} screenLocation={"TOP_RIGHT"} history={props.history} />
                            <PopularTestsList sectionTitle="Packages that include this test" page={testData.id} history={props.history}/>
                            <Features />
                        </div>
                    </React.Fragment>
                }
            </div>
            {alertData && alertData.message && <Alert alertInfo={alertData} onDurationEnd={clearError} duration={5000} />}
            {displayNoDataFound &&
                <section>
                    <div className="no-flexi-transaction body-height">
                        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80.724" viewBox="0 0 80 80.724">
                            <g id="Layer_41" data-name="Layer 41" transform="translate(-1.96 -1.417)">
                                <path id="Path_30092" data-name="Path 30092" d="M71.3,74.146H65.371A37.35,37.35,0,0,0,75.3,48.83a36.94,36.94,0,0,0-3.291-15.31,9.3,9.3,0,0,0-6.969-12.5l1.039-3.837a1.406,1.406,0,0,0-.133-1.013,1.367,1.367,0,0,0-.813-.626l-3.864-1.026.693-2.572s2.8.733,2.918.733a1.323,1.323,0,0,0,.666-.187,1.34,1.34,0,0,0,.626-.8l1.372-5.157A1.324,1.324,0,0,0,66.6,4.912L53.726,1.461a1.316,1.316,0,0,0-1,.133,1.332,1.332,0,0,0-.626.813L50.714,7.55a1.332,1.332,0,0,0,.946,1.626l2.572.693-.68,2.572L49.688,11.4a1.406,1.406,0,0,0-1.013.133,1.367,1.367,0,0,0-.626.813l-6.9,25.743a1.355,1.355,0,0,0,.946,1.639l1.292.346-1.039,3.851a1.406,1.406,0,0,0,.133,1.013,1.367,1.367,0,0,0,.813.626l1.292.346-1.039,3.864a1.324,1.324,0,0,0,.946,1.626s5.37,1.426,5.49,1.426a1.458,1.458,0,0,0,.666-.173,1.367,1.367,0,0,0,.626-.813L52.3,47.977s1.519.386,1.639.386a1.32,1.32,0,0,0,1.279-.986l1.039-3.851s1.506.386,1.626.386a1.332,1.332,0,0,0,1.292-.986l1.053-3.957a9,9,0,0,0,2.678.506A26.441,26.441,0,0,1,56.564,67.91a9.3,9.3,0,0,0-7.915-4.424,8.841,8.841,0,0,0-1.332.107V62.154h9.327a1.332,1.332,0,0,0,1.332-1.332v-4a1.332,1.332,0,0,0-1.332-1.332H29.995a1.332,1.332,0,0,0-1.332,1.332v4a1.332,1.332,0,0,0,1.332,1.332h9.327V74.146H26a4.009,4.009,0,0,0-4,4v2.665a1.332,1.332,0,0,0,1.332,1.332H73.966A1.332,1.332,0,0,0,75.3,80.809V78.144A4.009,4.009,0,0,0,71.3,74.146ZM53.646,6.951l.68-2.572,10.3,2.758-.693,2.572Zm5.743,4.3L58.7,13.826l-2.572-.693.693-2.572ZM49.035,49.869l-2.572-.693.693-2.572,2.572.68Zm3.957-4.464L45.265,43.34l.693-2.585,7.728,2.079Zm3.944-4.464L44.065,37.491l6.223-23.171,12.858,3.464L62.307,20.9a9.31,9.31,0,0,0-4.49,16.789Zm6.369-4.1a6.662,6.662,0,1,1,6.662-6.662A6.662,6.662,0,0,1,63.306,36.838Zm4,11.992A29.116,29.116,0,0,0,65.638,39.2,9.4,9.4,0,0,0,70.3,36.331a34.179,34.179,0,0,1,2.332,12.5A34.7,34.7,0,0,1,61.614,74.146H57.976V72.814a9.312,9.312,0,0,0-.293-2.292A29.3,29.3,0,0,0,67.3,48.83ZM48.649,66.152a6.662,6.662,0,0,1,6.662,6.662v1.332H41.987V72.814A6.662,6.662,0,0,1,48.649,66.152Zm-6.662.147V62.154h2.665v2.252A8.985,8.985,0,0,0,41.987,66.3Zm-10.66-6.809V58.157H55.311v1.332ZM72.633,79.476H24.665V78.144A1.332,1.332,0,0,1,26,76.811H71.3a1.332,1.332,0,0,1,1.332,1.332Z" transform="translate(6.662 0)" fill="#cecece" />
                                <path id="Path_30093" data-name="Path 30093" d="M25.322,33.317a1.332,1.332,0,0,0-1.332-1.332H22.657V29.2a7.947,7.947,0,0,0,3.292-1.366L27.92,29.8l-.942.942a1.332,1.332,0,1,0,1.884,1.884l3.768-3.768a1.332,1.332,0,1,0-1.884-1.884l-.942.942-1.971-1.971A7.947,7.947,0,0,0,29.2,22.657h2.785v1.332a1.332,1.332,0,1,0,2.665,0V18.66a1.332,1.332,0,1,0-2.665,0v1.332H29.2A7.947,7.947,0,0,0,27.834,16.7L29.8,14.729l.942.942a1.332,1.332,0,1,0,1.884-1.884l-3.768-3.768A1.332,1.332,0,1,0,26.978,11.9l.942.942-1.971,1.971a7.947,7.947,0,0,0-3.292-1.366V10.665h1.332a1.332,1.332,0,1,0,0-2.665H18.66a1.332,1.332,0,1,0,0,2.665h1.332V13.45A7.947,7.947,0,0,0,16.7,14.815l-1.971-1.971.942-.942a1.332,1.332,0,1,0-1.884-1.884l-3.768,3.768A1.332,1.332,0,1,0,11.9,15.671l.942-.942L14.815,16.7a7.947,7.947,0,0,0-1.366,3.292H10.665V18.66A1.332,1.332,0,1,0,8,18.66v5.33a1.332,1.332,0,1,0,2.665,0V22.657H13.45a7.947,7.947,0,0,0,1.366,3.292L12.845,27.92l-.942-.942a1.332,1.332,0,1,0-1.884,1.884l3.768,3.768a1.332,1.332,0,1,0,1.884-1.884l-.942-.942L16.7,27.834A7.947,7.947,0,0,0,19.992,29.2v2.785H18.66a1.332,1.332,0,1,0,0,2.665h5.33A1.332,1.332,0,0,0,25.322,33.317ZM15.995,21.325a5.33,5.33,0,1,1,5.33,5.33A5.33,5.33,0,0,1,15.995,21.325Z" transform="translate(2.008 2.189)" fill="#cecece" />
                                <path id="Path_30094" data-name="Path 30094" d="M33.347,42.143l9.642,2.468a1.332,1.332,0,0,0,1.622-1.622l-2.468-9.642a21.346,21.346,0,1,0-8.794,8.794ZM4.678,23.333a18.654,18.654,0,1,1,34.885,9.174,1.332,1.332,0,0,0-.133.99l2.04,7.975L33.5,39.43a1.332,1.332,0,0,0-.989.133A18.638,18.638,0,0,1,4.678,23.333Z" transform="translate(0 0.18)" fill="#cecece" />
                                <path id="Path_30095" data-name="Path 30095" d="M26.654,37.332A1.332,1.332,0,0,0,25.322,36H9.332A1.332,1.332,0,0,0,8,37.332v5.33a1.332,1.332,0,0,0,1.332,1.332h1.332V63.981a6.662,6.662,0,0,0,13.325,0V43.995h1.332a1.332,1.332,0,0,0,1.332-1.332ZM17.327,67.979a4,4,0,0,1-4-4V62.649h2.665a1.332,1.332,0,0,0,0-2.665H13.33V57.319h2.665a1.332,1.332,0,0,0,0-2.665H13.33V51.989h7.995V63.981A4,4,0,0,1,17.327,67.979Zm4-18.654H13.33v-5.33h7.995Zm2.665-7.995H10.665V38.665H23.989Z" transform="translate(2.008 11.497)" fill="#cecece" />
                                <path id="Path_30096" data-name="Path 30096" d="M50,24a4,4,0,1,0,4-4A4,4,0,0,0,50,24Zm5.33,0A1.332,1.332,0,1,1,54,22.665,1.332,1.332,0,0,1,55.33,24Z" transform="translate(15.971 6.178)" fill="#cecece" />
                            </g>
                        </svg>
                        <h6 className="mt-2">Details of the test are not available</h6>
                    </div>
                </section>
            }
        </React.Fragment>
    )
}
export default LabsProductDetailPage;