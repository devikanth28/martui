import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { UncontrolledCollapse } from 'reactstrap';
import { getCategoryNameForUrl } from "../../../../../helpers/CommonUtil";
import Validate from "../../../../../helpers/Validate";
import { DIAGNOSTICS_URL_PREFIX } from "../../../constants/LabConstants";
const TestStructure = (props) => {

    const index = props.index;
    const events = ['click'];
    const [test, setTest] = useState(false);
    const [multipleTestsFlag, setMulipleTestsFlag] = useState(false);
    const [multipleTests, setMulipleTests] = useState([]);

    const validate = Validate();

    const [openedSections, setOpenedSections] = useState([]);
    const handleClick = e => {
        let id = e.target.id;
        if (openedSections.indexOf(id) === -1) {
            let tempArray = [...openedSections];
            tempArray.push(id);
            setOpenedSections(tempArray);
        } else {
            let tempArray = openedSections.filter(each => each !== id);
            setOpenedSections(tempArray);
        }
    }

    useEffect(() => {
        if (validate.isNotEmpty(props.test)) {
            setTest(props.test);
        }
        if (validate.isNotEmpty(props.test) && validate.isNotEmpty(props.test.tests) && props.test.tests.length > 0) {
            setMulipleTests(props.test.tests);
            setMulipleTestsFlag(true);
        }
    }, []);

    const redirectToTestDetailPage = (testName, testCode) => {
        props.history.push(`${DIAGNOSTICS_URL_PREFIX}/testdetails/` + getCategoryNameForUrl(testName, testCode));
    }


    return (
        <React.Fragment>
            {validate.isNotEmpty(test) &&
                <li className="list-group-item p-0">
                    <button id={'test' + index} onClick={(e) => handleClick(e)} title={multipleTestsFlag ? "click to expand" : test.name} className="btn w-100 header-tabs text-dark font-14 py-2 px-3" onClick={() => { return multipleTestsFlag ? null : redirectToTestDetailPage(test.name, test.code) }}>
                        <span>
                            <svg className="opentab" xmlns="http://www.w3.org/2000/svg" xmlnsxlink="http://www.w3.org/1999/xlink" width="16" height="16" viewBox="0 0 18 18">
                                <g id="link_tab_icon_18px" transform="translate(-1761 -666)" clip-path="url(#clip-path)">
                                    <g id="noun-external-link-3388428-404040" transform="translate(1751.332 656.333)">
                                        <path id="Path_42754" data-name="Path 42754" d="M25.868,17.868a.8.8,0,0,0-.8.8v6.4h-12.8v-12.8h6.4a.8.8,0,1,0,0-1.6h-7.2a.8.8,0,0,0-.8.8v14.4a.8.8,0,0,0,.8.8h14.4a.8.8,0,0,0,.8-.8v-7.2a.8.8,0,0,0-.8-.8Z" transform="translate(0 0)" fill="#080808" />
                                        <path id="Path_42755" data-name="Path 42755" d="M66.918,10.729a.807.807,0,0,0-.306-.062h-4a.8.8,0,1,0,0,1.6h2.069L58.846,18.1h0a.8.8,0,1,0,1.131,1.131L65.812,13.4v2.069a.8.8,0,1,0,1.6,0v-4a.8.8,0,0,0-.494-.738Z" transform="translate(-40.744 0)" fill="#080808" />
                                    </g>
                                </g>
                            </svg>
                            {test.name}
                            {multipleTestsFlag ? <span className="text-secondary"> (Includes {multipleTests.length} tests)</span> :
                                test.noOfParameters > 1 ? <span className="text-secondary"> (Includes {test.noOfParameters} parameters)</span> : <React.Fragment></React.Fragment>
                            }
                        </span>
                        {multipleTestsFlag && <span>
                            <svg className={openedSections.indexOf('test' + index) !== -1 ? "collapse-arrow rotate-bottom" : "collapse-arrow rotate-up"} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                <g transform="translate(-762 -906.838)">
                                    <rect fill="none" width="18" height="18" transform="translate(762 906.838)" />
                                    <path fill="#080808" d="M61.559,501.985l4.049-4.049a.917.917,0,0,0-1.3-1.3l-3.4,3.39-3.4-3.4a.921.921,0,0,0-1.569.649.912.912,0,0,0,.272.649l4.049,4.059A.922.922,0,0,0,61.559,501.985Z" transform="translate(710.032 416.557)" />
                                </g>
                            </svg>
                        </span>}
                    </button>
                    {multipleTestsFlag && <div>
                        <UncontrolledCollapse toggler={'#test' + index} toggleEvents={events} className="mb-2">
                            {multipleTests &&
                                <ul>
                                    {multipleTests.map((value) => {
                                        return <li>{value && value.name && <Link className="btn shadow-none d-block secondary-text-link text-left px-0 font-weight-normal" to={`${DIAGNOSTICS_URL_PREFIX}/testdetails/` + getCategoryNameForUrl(value.name, value.code)} target="_blank" title={value.name}>{value.name} {value.noOfParameters > 1 && <span className="text-secondary"> (Includes {value.noOfParameters} parameters)</span>}</Link>}</li>
                                    })}
                                </ul>}
                        </UncontrolledCollapse>
                    </div>}
                </li>}
        </React.Fragment>
    );
}

const LabTestsIncluded = (props) => {
    const [loadmore, setLoadMore] = useState(false)
    const [noTests, setNoTests] = useState(true);
    const [tests, setTests] = useState([]);
    const validate = Validate();

    useEffect(() => {
        if (validate.isNotEmpty(props.testsIncluded)) {
            setNoTests(false);
            setTests(props.testsIncluded);
            setLoadMore(props.testsIncluded.length < 4)
        }
    }, []);

    if (noTests) {
        return "No Test available";
    }

    return (
        <React.Fragment>
            {validate.isNotEmpty(tests) &&
                <div className="lab-test-included">
                    <section className="shadow-none">
                        <h5 className="heading">
                            Includes
                            {props.includedTestsCount > 0 &&
                                ` ${props.includedTestsCount} ${props.includedTestsCount > 1 ? ' tests' : ' test'}`
                            }
                            {props.includedParameterCount > 0 &&
                                ` (${props.includedParameterCount} ${props.includedParameterCount > 1 ? ' parameters' : ' parameter'})` 
                            }
                            {props.includeDoctorConsultation &&
                                ` & 1 free doctor consultation`
                            }
                        </h5>
                        <ul className="list-group">
                            {tests.map((value, index) => {
                                return <TestStructure test={value} index={index} history={props.history} />
                            })}
                        </ul>
                    </section>
                </div>}
        </React.Fragment>
    )
}



export default LabTestsIncluded