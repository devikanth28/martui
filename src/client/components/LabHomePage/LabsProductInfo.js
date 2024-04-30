import React,{ useState ,useRef,useEffect} from "react"
import OverViewTestTab from "./OverViewTestTab"
import UnderstandTestResults from "./UnderstandTestResults"
import ProductDetailFeedback from "./ProductDetailFeedback"
import LabTestsIncluded from "./LabTestsIncluded"
import LabsFAQ from "./LabsFAQ"

const LabsProductInfo =(props) =>{
    const [activeTab, setActiveTab] = useState("Overview of Test");
    const [fixedDescriptionHeader,setFixedDescriptionHeader] = useState(false)
    const scrollAction = useRef(null);
    const scrollActionContent = useRef(null);
    const testsIncludedRef = useRef();
    const overViewRef = useRef();
    const underStandRef = useRef();
    const faqRef = useRef();
    const tabmenu = useRef();

    const handleScroll = (e) => {
        const visibilityContent = scrollActionContent.current.getBoundingClientRect()
        const visibility = scrollAction.current.getBoundingClientRect()
        if(visibility && (visibility.top <= 60 && visibilityContent.bottom >=0)){
            setFixedDescriptionHeader(true);
        }else{
            setFixedDescriptionHeader(false);
        }
        checkforScroll()
    }
    const checkforScroll = () => {
        const menuheight = tabmenu.current.offsetHeight
        const menuheighttop = tabmenu.current.getBoundingClientRect()
        const visibilityOverview = props.descAvailable ? overViewRef.current.getBoundingClientRect(): null
        const visibilityFaq = props.faqAvailable ? faqRef.current.getBoundingClientRect() :null
        const visibilityTest = props.testIncludedAvailable ? testsIncludedRef.current.getBoundingClientRect():null
        const visibilityUnderstanding = props.kytAvailable ? underStandRef.current.getBoundingClientRect() :null

        if(visibilityOverview && visibilityOverview.top<= (menuheighttop.top+menuheight)) {
            setActiveTab("Overview of Test")
        }
        if(visibilityUnderstanding && visibilityUnderstanding.top<=(menuheighttop.top+menuheight)) {
            setActiveTab('Understanding your test results')
        }
        if(visibilityTest && visibilityTest.top<=(menuheighttop.top+menuheight)) {
            setActiveTab('Tests Included')
        }
        if(visibilityFaq && visibilityFaq.top<=(menuheighttop.top+menuheight)) {
            setActiveTab('FAQs')
        }
    }
    useEffect(() => {
        document.addEventListener("scroll", handleScroll, { passive: true })
        return () => {
          document.removeEventListener("scroll", handleScroll)
        }
      }, [])
    return(
        <React.Fragment>
            <div className="mb-3 pb-3">
                <section className="shadow-none" ref={scrollAction} onScroll={handleScroll}>
                    <ul ref={tabmenu} className={fixedDescriptionHeader ? "nav nav-pills custom-menu-container nav-justified custom-sticky-header shadow-sm bg-white":"nav custom-menu-container nav-pills nav-justified"} id="pills-tab" role="tablist">
                        <li className="nav-item rounded-0">
                            <a className={"nav-link py-3 dark "+(activeTab == "Overview of Test" ? "active":"")} href="javascript:void(0)" data-toggle="pill"  role="tab" aria-controls="pills-overview-test" aria-selected={activeTab == "Overview of Test"} onClick={()=>setActiveTab("Overview of Test")}>Overview of Test</a>
                        </li>
                        <li className="nav-item rounded-0">
                            <a className={"nav-link  py-3 dark "+(activeTab == "Understand Test Results" ? "active":"")} href="javascript:void(0)" id="pills-Understanding-your-test-results" data-toggle="pill"  role="tab" aria-controls="pills-Understanding-your-test-results" aria-selected={activeTab == "Understand Test Results"} onClick={()=>setActiveTab("Understand Test Results")}>Understand Test Results</a>
                        </li>
                        <li className="nav-item rounded-0">
                            <a className={"nav-link py-3 dark "+(activeTab == "Tests Included" ? "active":"")} href="javascript:void(0)" id="tests included" data-toggle="pill"  role="tab" aria-controls="pills-Understanding-your-test-results" aria-selected={activeTab == "Tests Included"} onClick={()=>setActiveTab("Tests Included")}>Tests Included</a>
                        </li>
                        <li className="nav-item rounded-0">
                                <a className={"nav-link py-3 dark "+(activeTab == "FAQs" ? "active":"")} href="javascript:void(0)" id="pills-FAQs" data-toggle="pill" role="tab" aria-controls="pills-FAQs" aria-selected={activeTab == "FAQs"} onClick={()=>setActiveTab("FAQs")}>FAQs</a>
                            </li>
                    </ul>
                    <div className="p-3 pt-4" ref={scrollActionContent} onScroll={handleScroll}>
                         {props.descAvailable && <React.Fragment><div ref={overViewRef}><OverViewTestTab/></div></React.Fragment> }
                         {props.kytAvailable && <React.Fragment><div ref={underStandRef}><UnderstandTestResults/></div></React.Fragment> }
                         {props.testIncludedAvailable && <React.Fragment><div ref={testsIncludedRef}><LabTestsIncluded/></div></React.Fragment>}
                         {props.faqAvailable && <React.Fragment><div ref={faqRef}><LabsFAQ/></div></React.Fragment> }
                    </div>
                    <ProductDetailFeedback/>
                </section>
            </div>
        </React.Fragment>
    )
}
export default LabsProductInfo;