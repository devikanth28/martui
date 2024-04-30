import React, { useEffect, useRef, useState } from "react"
import Validate from "../../../../../helpers/Validate";
import LabTestsIncluded from "./LabTestsIncluded";
import LabsProfileParameters from "./LabsProfileParameters";

const LabsProductInfo = (props) => {
    const [activeTab, setActiveTab] = useState("Overview of Test");
    const [fixedDescriptionHeader, setFixedDescriptionHeader] = useState(false)
    const scrollAction = useRef(null);
    const scrollActionContent = useRef(null);
    const testsIncludedRef = useRef();
    const profileParametersRef = useRef();
    const overViewRef = useRef();
    const underStandRef = useRef();
    const faqRef = useRef();
    const tabmenu = useRef();

    const validate = Validate();

    const handleScroll = (e) => {
        const visibilityContent = scrollActionContent.current.getBoundingClientRect()
        const visibility = scrollAction.current.getBoundingClientRect()
        if (visibility && (visibility.top <= 60 && visibilityContent.bottom >= 0)) {
            setFixedDescriptionHeader(true);
        } else {
            setFixedDescriptionHeader(false);
        }
        checkforScroll()
    }

    const scrollToSection = (ref) => {
        if (ref && ref.current) {
            window.scrollTo({ top: (ref.current.offsetTop - (fixedDescriptionHeader ? 75 : 130)), behavior: 'smooth' });
            // ref.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    const checkforScroll = () => {
        const menuheight = tabmenu.current.offsetHeight
        const menuheighttop = tabmenu.current.getBoundingClientRect()
        const visibilityOverview = props.descAvailable ? overViewRef.current.getBoundingClientRect() : null
        const visibilityFaq = props.faqAvailable ? faqRef.current.getBoundingClientRect() : null
        const visibilityTest = props.testIncludedAvailable ? testsIncludedRef.current.getBoundingClientRect() : null
        const visibilityParameters = props.testParametersAvailable ? profileParametersRef.current.getBoundingClientRect() : null
        const visibilityUnderstanding = props.kytAvailable ? underStandRef.current.getBoundingClientRect() : null

        if (visibilityOverview && visibilityOverview.top <= (menuheighttop.top + menuheight)) {
            setActiveTab("Overview of Test")
        }
        if (visibilityUnderstanding && visibilityUnderstanding.top <= (menuheighttop.top + menuheight)) {
            setActiveTab("Understand Test Results")
        }
        if (visibilityTest && visibilityTest.top <= (menuheighttop.top + menuheight)) {
            setActiveTab("Tests Included")
        }
        if (visibilityParameters && visibilityParameters.top <= (menuheighttop.top + menuheight)) {
            setActiveTab("Parameters")
        }
        if (visibilityFaq && visibilityFaq.top <= (menuheighttop.top + menuheight)) {
            setActiveTab("FAQs")
        }
    }

    useEffect(() => {
        document.addEventListener("scroll", handleScroll, { passive: true })
        if (validate.isNotEmpty(props.selectedTab)) {
            setActiveTab(props.selectedTab);
        };
        return () => {
            document.removeEventListener("scroll", handleScroll)
        }
    }, [props.selectedTab])



    const displayStaticContent = (section) => {
        if (section == "Overview of Test") {
            return validate.isNotEmpty(props.labTestContent['DESC']) ? props.labTestContent['DESC'] : "No Data available";
        }
        if (section == "Understand Test Results") {
            return validate.isNotEmpty(props.labTestContent['KNOWYOURTEST']) ? props.labTestContent['KNOWYOURTEST'] : "No Data available";
        }
        if (section == "FAQs") {
            return validate.isNotEmpty(props.labTestContent['FAQ']) ? props.labTestContent['FAQ'] : "No Data available";
        }
    }

    return (
        <React.Fragment>
            <div className="mb-3 pb-3">
                <section className="shadow-none" ref={scrollAction} onScroll={handleScroll}>
                    <ul ref={tabmenu} className={fixedDescriptionHeader ? "nav nav-pills custom-menu-container nav-justified custom-sticky-header shadow-sm bg-white" : "nav custom-menu-container nav-pills nav-justified"} id="pills-tab" role="tablist">
                        {props.descAvailable &&
                            <li className="nav-item">
                                <button className={"btn w-100 font-16 nav-link p-3 font-weight-bold dark " + (activeTab == "Overview of Test" ? "active" : "")} data-toggle="pill" role="tab" aria-controls="pills-overview-test" aria-selected={activeTab == "Overview of Test"} onClick={() => { setActiveTab("Overview of Test"); scrollToSection(overViewRef) }}>Overview of Test</button>
                            </li>
                        }
                        {props.kytAvailable &&
                            <li className="nav-item">
                                <button className={"btn w-100 font-16 nav-link p-3 font-weight-bold dark " + (activeTab == "Understand Test Results" ? "active" : "")} id="pills-Understanding-your-test-results" data-toggle="pill" role="tab" aria-controls="pills-Understanding-your-test-results" aria-selected={activeTab == "Understand Test Results"} onClick={() => { setActiveTab("Understand Test Results"); scrollToSection(underStandRef) }}>Understand Test Results</button>
                            </li>
                        }
                        {props.testIncludedAvailable &&
                            <li className="nav-item">
                                <button className={"btn w-100 font-16 nav-link p-3 font-weight-bold dark " + (activeTab == "Tests Included" ? "active" : "")} id="tests included" data-toggle="pill" role="tab" aria-controls="pills-Understanding-your-test-results" aria-selected={activeTab == "Tests Included"} onClick={() => { setActiveTab("Tests Included"); scrollToSection(testsIncludedRef) }}>Tests Included</button>
                            </li>
                        }
                        {props.testParametersAvailable &&
                            <li className="nav-item">
                                <button className={"btn w-100 font-16 nav-link p-3 font-weight-bold dark " + (activeTab == "Parameters" ? "active" : "")} id="Parameters" data-toggle="pill" role="tab" aria-controls="pills-parameters" aria-selected={activeTab == "Parameters"} onClick={() => { setActiveTab("Parameters"); scrollToSection(profileParametersRef) }}>Parameters</button>
                            </li>
                        }
                        {props.faqAvailable &&
                            <li className="nav-item">
                                <button className={"btn w-100 font-16 nav-link p-3 font-weight-bold dark " + (activeTab == "FAQs" ? "active" : "")} id="pills-FAQs" data-toggle="pill" role="tab" aria-controls="pills-FAQs" aria-selected={activeTab == "FAQs"} onClick={() => { setActiveTab("FAQs"); scrollToSection(faqRef) }}>FAQs</button>
                            </li>
                        }
                    </ul>
                    <div className="p-3 pt-4" ref={scrollActionContent} onScroll={handleScroll}>
                        {props.descAvailable &&
                            <React.Fragment>
                                <div id="over-test-section" className="lab-test-overview-desc" ref={overViewRef} dangerouslySetInnerHTML={{ __html: displayStaticContent("Overview of Test") }} />
                                {(props.kytAvailable || props.testIncludedAvailable || props.faqAvailable) && <hr className="my-4 mx-n3 solid" />}
                            </React.Fragment>
                        }
                        {props.kytAvailable &&
                            <React.Fragment>
                                <div dangerouslySetInnerHTML={{ __html: displayStaticContent("Understand Test Results") }} ref={underStandRef} />
                                {(props.testIncludedAvailable || props.faqAvailable) && <hr className="my-4 mx-n3 solid" />}
                            </React.Fragment>
                        }
                        {props.testIncludedAvailable &&
                            <div ref={testsIncludedRef}>
                                <LabTestsIncluded includedParameterCount = {props.testParametersCount ? props.testParametersCount : 0 } includedTestsCount={props.includedTestsCount} testsIncluded={props.testsIncluded} includeDoctorConsultation={props.includeDoctorConsultation} history={props.history} />
                                {(props.testIncludedAvailable) && <hr className="my-4 mx-n3 solid" />}
                            </div>
                        }
                        {props.testParametersAvailable &&
                            <div ref={profileParametersRef}>
                                <LabsProfileParameters testParameters={props.testParameters} testParametersCount={props.testParametersCount}/>
                                {(props.faqAvailable) && <hr className="my-4 mx-n3 solid" />}
                            </div>
                        }
                        {props.faqAvailable &&
                            <React.Fragment>
                                <div className="labs-question-container" dangerouslySetInnerHTML={{ __html: displayStaticContent("FAQs") }} ref={faqRef} />
                            </React.Fragment>
                        }
                    </div>
                </section>
            </div>
        </React.Fragment>
    )
}
export default LabsProductInfo;