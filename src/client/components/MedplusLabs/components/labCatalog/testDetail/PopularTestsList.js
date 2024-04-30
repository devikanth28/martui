import React, { useEffect, useState } from "react"
import Validate from "../../../../../helpers/Validate";
import Alert from "../../../../Common/Alert";
import LabCatalogService from "../../../Services/LabCatalogService";
import BookTestButton from "./BookTestButton";
import { getCategoryNameForUrl } from "../../../../../helpers/CommonUtil";
import { useSelector } from "react-redux";
import { DIAGNOSTICS_URL_PREFIX } from "../../../constants/LabConstants";
import { MEDPLUS_ADVANTAGE_HOME } from "../../../../Subscription/constants/SubscriptionConstants";
import { Link } from "react-router-dom";

const PopularTestsList = (props) => {
    const validate = Validate();
    const labCatalogService = LabCatalogService();
    const [testSummaryList, setTestSummaryList] = useState([]);
    const [alertData, setAlertData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    let noOfTests = 10;

    useEffect(() => {
        getPackagesIncludeTest();
    }, [props.page]);

    const getPackagesIncludeTest = () => {
        setIsLoading(true)
        let params = { "testCode": props.page, "noOfTests": noOfTests };
        labCatalogService.getPackagesIncludeTest(params).then((response) => {
            if (validate.isNotEmpty(response) && validate.isNotEmpty(response.statusCode) && "SUCCESS" == response.statusCode) {
                if (validate.isNotEmpty(response.dataObject) && validate.isNotEmpty(response.dataObject.testSummaryList)) {
                    setTestSummaryList(response.dataObject.testSummaryList);
                }
                else {
                    setTestSummaryList([]);
                }
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
    const isSubscribed = useSelector(state => {
        if (validate.isNotEmpty(state.labCatalog) && validate.isNotEmpty(state.labCatalog.isSubscribed) && validate.isNotEmpty(state.userInfo) && validate.isNotEmpty(state.userInfo.userInfo)) {
            return state.labCatalog.isSubscribed;
        }
    })
    
    const goToSubscriptionPage = () => {      
      return  props.history.push(`${MEDPLUS_ADVANTAGE_HOME}`);
    }

    function getTestList(testList) {
        return (
            testList.map((each, index) => {
                return (
                    <React.Fragment>
                        <div className={(index == 0 && index != testList.length - 1) ? "d-flex flex-column justify-content-between align-items-center no-gutters pb-3" : (index == 0 && index == testList.length - 1) ? "d-flex flex-column justify-content-between align-items-center no-gutters" : index == testList.length - 1 ? "d-flex flex-column justify-content-between align-items-center no-gutters border-top pt-3" : "d-flex flex-column justify-content-between align-items-center no-gutters border-top py-3"}>
                            <div className="col">
                                {validate.isNotEmpty(each.name) &&
                                    <Link className="text-dark no-underline" title={each.name} to={`${DIAGNOSTICS_URL_PREFIX}/testdetails/` + `${getCategoryNameForUrl(each.name, each.code)}`} >
                                        <h6 className="h5 mb-2">{each.name}</h6>
                                    </Link>
                                }
                                {validate.isNotEmpty(each.noOfParameters) && each.noOfParameters > 0 && <p className="small text-secondary">Includes {each.noOfParameters} {each.noOfParameters > 1 ? "Parameters" : "Parameter"} </p>}
                            </div>
                            {!isSubscribed && <div className="col">
                                <div className="d-flex justify-content-between align-items-center no-gutters mb-4">
                                    <div className="col">
                                        
                                        {validate.isNotEmpty(each.subscriptionPrice) &&
                                            <React.Fragment>
                                                <span className="text-secondary font-14">MA Price</span>
                                                <h6 className="h5 mb-0"><strong className="rupee font-16"> ₹</strong>{parseFloat(each.subscriptionPrice).toFixed(2)}</h6>
                                            </React.Fragment>
                                        }
                                    </div>
                                    {validate.isNotEmpty(each.subscriptionPlanPrice) && 
                                    <div className={`${!(window.screen.width <= 1368) ? "col-5":""}`}>
                                        <button onClick={goToSubscriptionPage} title="MedPlus Advantage Member Price" className="btn btn-block brand-secondary py-1 font-12 mb-0 rounded-pill" role="button">
                                        Get MedPlus <br /> Advantage for<span class="ml-1 rupee small">₹</span>{parseInt(each.subscriptionPlanPrice)}</button>                                                          
                                        </div>
                                    }
                                </div>
                                <div className="d-flex justify-content-between align-items-center no-gutters">
                                    <div className="col">
                                        <span className="text-secondary font-14">MRP</span>
                                        {validate.isNotEmpty(each?.mrp) && <h6 className="h5 mb-0"><strong className="rupee font-16"> ₹</strong>{parseFloat(each.mrp).toFixed(2)}</h6>
                                        }
                                    </div>
                                    <div className="col-5">
                                        <BookTestButton testCode={each.code} available={each.available} classStyle="btn btn-brand-gradient btn-block rounded-pill shadow custom-btn-xl" customStyle={{ "minWidth": "6.4rem" }} isButton={true}></BookTestButton>
                                    </div>
                                </div>
                            </div>}
                            {isSubscribed && (validate.isNotEmpty(each.subscriptionPrice) || validate.isNotEmpty(each.mrp)) && <div className="col">
                                <div className="align-items-center d-flex justify-content-between no-gutters">
                                    <div className="col">
                                        { validate.isNotEmpty(each.mrp) && <span className="text-secondary font-14">MRP
                                                <span className="rupee font-14">₹</span>
                                                {validate.isNotEmpty(each.subscriptionPrice) ? <del>{parseFloat(each.mrp).toFixed(2)}</del>:parseFloat(each.mrp).toFixed(2)}
                                        </span>}
                                        { validate.isNotEmpty(each.subscriptionPrice) && <h6 className="h5 mb-0">
                                            <span className="font-16 font-weight-normal">MA Price </span>
                                            <span className="rupee font-16">₹</span>
                                            {parseFloat(each.subscriptionPrice).toFixed(2)}
                                        </h6>}
                                    </div>
                                    <div className="col-5">
                                        <BookTestButton testCode={each.code} available={each.available} classStyle="btn btn-brand-gradient btn-block rounded-pill shadow custom-btn-xl" customStyle={{ "minWidth": "6.4rem" }} isButton={true} />
                                    </div>
                                </div>
                            </div>}
                        </div>

                    </React.Fragment>
                );
            })
        )
    }

    if (isLoading) {
        return (
            <div>
                <div className="ph-row mb-3 w-100">
                    <div className="ph-col-6"></div>
                </div>
                <div className="mb-3 pb-3">
                    <section className="shadow-none p-3">
                        <div className="pb-3">
                            <div className="d-flex justify-content-between align-items-center py-3">
                                <div className="w-75">
                                    <div className="ph-row mb-3">
                                        <div className="ph-col-6"></div>
                                    </div>
                                    <div className="ph-row mb-0">
                                        <div className="ph-col-2"></div>
                                    </div>
                                </div>
                                <div className="w-25">
                                    <div className="ph-row mb-0">
                                        <div className="ph-col-12"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pb-3">
                            <div className="d-flex justify-content-between align-items-center border-top py-3">
                                <div className="w-75">
                                    <div className="ph-row mb-3">
                                        <div className="ph-col-6"></div>
                                    </div>
                                    <div className="ph-row mb-0">
                                        <div className="ph-col-2"></div>
                                    </div>
                                </div>
                                <div className="w-25">
                                    <div className="ph-row mb-0">
                                        <div className="ph-col-12"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pb-3">
                            <div className="d-flex justify-content-between align-items-center border-top py-3">
                                <div className="w-75">
                                    <div className="ph-row mb-3">
                                        <div className="ph-col-6"></div>
                                    </div>
                                    <div className="ph-row mb-0">
                                        <div className="ph-col-2"></div>
                                    </div>
                                </div>
                                <div className="w-25">
                                    <div className="ph-row mb-0">
                                        <div className="ph-col-12"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pb-3">
                            <div className="d-flex justify-content-between align-items-center border-top py-3">
                                <div className="w-75">
                                    <div className="ph-row mb-3">
                                        <div className="ph-col-6"></div>
                                    </div>
                                    <div className="ph-row mb-0">
                                        <div className="ph-col-2"></div>
                                    </div>
                                </div>
                                <div className="w-25">
                                    <div className="ph-row mb-0">
                                        <div className="ph-col-12"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pb-3">
                            <div className="d-flex justify-content-between align-items-center border-top py-3">
                                <div className="w-75">
                                    <div className="ph-row mb-3">
                                        <div className="ph-col-6"></div>
                                    </div>
                                    <div className="ph-row mb-0">
                                        <div className="ph-col-2"></div>
                                    </div>
                                </div>
                                <div className="w-25">
                                    <div className="ph-row mb-0">
                                        <div className="ph-col-12"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pb-3">
                            <div className="d-flex justify-content-between align-items-center border-top py-3">
                                <div className="w-75">
                                    <div className="ph-row mb-3">
                                        <div className="ph-col-6"></div>
                                    </div>
                                    <div className="ph-row mb-0">
                                        <div className="ph-col-2"></div>
                                    </div>
                                </div>
                                <div className="w-25">
                                    <div className="ph-row mb-0">
                                        <div className="ph-col-12"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pb-3">
                            <div className="d-flex justify-content-between align-items-center border-top py-3">
                                <div className="w-75">
                                    <div className="ph-row mb-3">
                                        <div className="ph-col-6"></div>
                                    </div>
                                    <div className="ph-row mb-0">
                                        <div className="ph-col-2"></div>
                                    </div>
                                </div>
                                <div className="w-25">
                                    <div className="ph-row mb-0">
                                        <div className="ph-col-12"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="pb-3">
                            <div className="d-flex justify-content-between align-items-center border-top py-3">
                                <div className="w-75">
                                    <div className="ph-row mb-3">
                                        <div className="ph-col-6"></div>
                                    </div>
                                    <div className="ph-row mb-0">
                                        <div className="ph-col-2"></div>
                                    </div>
                                </div>
                                <div className="w-25">
                                    <div className="ph-row mb-0">
                                        <div className="ph-col-12"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </section>
                </div>

            </div>
        );
    }
    return (
        <React.Fragment>
            {validate.isNotEmpty(testSummaryList) &&
                <React.Fragment>
                    <h5 className="mb-3">{props.sectionTitle}</h5>
                    <div className="mb-3 pb-3">
                        <section>
                            <div className="p-3">
                                {getTestList(testSummaryList)}
                            </div>
                        </section>
                    </div>
                </React.Fragment>}

            {alertData && alertData.message && <Alert alertInfo={alertData} onDurationEnd={clearError} duration={5000} />}
        </React.Fragment>
    )
}
export default PopularTestsList