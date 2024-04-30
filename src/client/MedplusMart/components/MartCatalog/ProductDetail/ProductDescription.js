import React, { useEffect, useRef, useState } from 'react';
import Validate from '../../../../helpers/Validate';
import MartCatalogService from '../../../services/MartCatalogService';
import DrugCompositionSlider from './DrugCompositionSlider';
import ProductDescriptionGhostImage from './ProductDescriptionGhostImage';

const ProductDescription = (props) => {

    const validate = Validate();
    let productId = validate.isNotEmpty(props.productId) ? props.productId : "";

    const [isDescriptionLoading, setIsDescriptionLoading] = useState(true);
    const [description, setDescription] = useState("");
    const [faq, setFaq] = useState("");
    const [activeTab, setActiveTab] = useState("");
    const [fixedDescriptionHeader, setFixedDescriptionHeader] = useState(false);
    const [compositionIndex, setCompositionIndex] = useState(0);

    const martCatalogService = MartCatalogService();
    const scrollAction = useRef(null);
    const scrollActionContent = useRef(null);
    const tabmenu = useRef();
    const medicineInfoRef = useRef();
    const drugCompositionInfoRef = useRef();
    const faqRef = useRef();
    useEffect(() => {
        if(validate.isNotEmpty(productId)){
            getProductDescription(productId);
        }
    }, [productId]);

    useEffect(() => {
        if(validate.isNotEmpty(props.product) && validate.isNotEmpty(props.product.isGeneral) && props.product.isGeneral != 'Y'){
            document.addEventListener("scroll", handleScroll, { passive: true })
            if(validate.isNotEmpty(activeTab)){
                setActiveTab(activeTab);
            }
            return () => {
                document.removeEventListener("scroll", handleScroll)
            }
        }
    }, [activeTab])

    const getProductDescription = (productId) => {
        setIsDescriptionLoading(true);
        martCatalogService.getProductDescFromWordPress(productId).then(response => {
            if (validate.isNotEmpty(response) && response.statusCode === "SUCCESS" && validate.isNotEmpty(response.dataObject?.result?.DESC)) {
                setDescription(response.dataObject.result.DESC);
                setActiveTab("Medicine Information");
                props.productDesc(response.dataObject.result.DESC)
            } else if (validate.isNotEmpty(props.product) && validate.isNotEmpty(props.product.productLongDescription)) {
                setDescription(`<h4>${props.product.isGeneral === "Y" ? 'Product' : 'Medicine'} Information</h4>` + props.product.productLongDescription);
                setActiveTab("Medicine Information");
            } else {
                setDescription("");
                setActiveTab("Drug Composition Information");
            }
            if (validate.isNotEmpty(response) && response.statusCode === "SUCCESS" && validate.isNotEmpty(response.dataObject?.result?.FAQ)){
                setFaq(response.dataObject.result.FAQ);
            } else {
                setFaq("");
            }
            setIsDescriptionLoading(false);
        }).catch((err) => {
            setIsDescriptionLoading(false);
            console.log(err);
        });
    }

    const handleScroll = () => {
        const visibilityContent = scrollActionContent.current.getBoundingClientRect();
        const visibility = scrollAction.current.getBoundingClientRect();

        if (visibility && (visibility.top <= 60 && visibilityContent.bottom >= 70)) {
            setFixedDescriptionHeader(true);
        } else {
            setFixedDescriptionHeader(false);
        }
        checkforScroll()
    }

    const checkforScroll = () => {
        const menuheight = tabmenu.current.offsetHeight;
        const menuheighttop = tabmenu.current.getBoundingClientRect();
        const visibilityMedicineInfo = validate.isNotEmpty(description) ? medicineInfoRef.current.getBoundingClientRect() : null;
        const visibilityDrugCompositionInfo = validate.isNotEmpty(props.moleculesInfo) ? drugCompositionInfoRef.current.getBoundingClientRect() : null;
        const visibilityFaq = validate.isNotEmpty(faq) ? faqRef.current.getBoundingClientRect() : null;

        if (visibilityMedicineInfo && ((menuheighttop.top + menuheight) - visibilityMedicineInfo.bottom) < 0) {
            setActiveTab("Medicine Information");
        } else if (visibilityDrugCompositionInfo && ((menuheighttop.top + menuheight) - visibilityDrugCompositionInfo.bottom) < 0) {
            setActiveTab("Drug Composition Information");
        } else if (visibilityFaq && ((menuheighttop.top + menuheight) - visibilityFaq.bottom) < 0) {
            setActiveTab("FAQs");
        }
    }

    const scrollToSection = (ref) => {
        if (ref && ref.current) {
            window.scrollTo({ top: (ref.current.offsetTop - (fixedDescriptionHeader ? 75 : 130)), behavior: 'smooth' });
        }
    };

    if(isDescriptionLoading){
        return( <ProductDescriptionGhostImage /> );
    }

    return (
        <React.Fragment>
            { validate.isNotEmpty(props.product) && validate.isNotEmpty(props.product.isGeneral) && props.product.isGeneral === 'Y'
            ?
                validate.isNotEmpty(description) && <section className='mb-4'>
                    <div className="p-3 pt-4">
                        <div id="over-test-section">
                            <div className="row margin-none medicine-info labproduct">
                                <div className="col-md-12">
                                    <div dangerouslySetInnerHTML={{ __html: description }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            :   <React.Fragment>
                    { (description || (validate.isNotEmpty(props.moleculesInfo) && props.moleculesInfo[0] !== 'Not Available') || faq ) &&  <div className="mb-4 pb-3">
                        <section ref={scrollAction} onScroll={handleScroll}>
                            <ul ref={tabmenu} className={fixedDescriptionHeader ? "nav nav-pills custom-menu-container nav-justified custom-sticky-header shadow-sm bg-white" : "nav custom-menu-container nav-pills nav-justified"} id="pills-tab" role="tablist">
                                {validate.isNotEmpty(description) &&
                                    <li className="nav-item">
                                        <a className={"nav-link p-3 font-weight-bold dark " + (activeTab === "Medicine Information" ? "active" : "")} href="javascript:void(0)" id = 'medicine information' data-toggle="pill" role="tab" aria-controls="pills-medicine-information" aria-selected={activeTab === "Medicine Information"} onClick={() => { setActiveTab("Medicine Information"); scrollToSection(medicineInfoRef) }}>Medicine Information</a>
                                    </li>
                                }
                                {validate.isNotEmpty(props.moleculesInfo) &&
                                    <li className="nav-item">
                                        <a className={"nav-link p-3 font-weight-bold dark " + (activeTab === "Drug Composition Information" ? "active" : "")} href="javascript:void(0)" id='drug composition info' data-toggle="pill" role="tab" aria-controls="pills-drug-composition-info" aria-selected={activeTab === "Drug Composition Information"} onClick={() => { setActiveTab("Drug Composition Information"); scrollToSection(drugCompositionInfoRef) }}>Drug Composition Information</a>
                                    </li>
                                }
                                {validate.isNotEmpty(faq) &&
                                    <li className="nav-item">
                                        <a className={"nav-link p-3 font-weight-bold dark " + (activeTab === "FAQs" ? "active" : "")} href="javascript:void(0)" id="FAQs" data-toggle="pill" role="tab" aria-controls="pills-faq" aria-selected={activeTab === "FAQs"} onClick={() => { setActiveTab("FAQs"); scrollToSection(faqRef) }}>FAQs</a>
                                    </li>
                                }
                            </ul>
                            <div className="p-3 pt-4" ref={scrollActionContent} onScroll={handleScroll}>
                                {validate.isNotEmpty(description) &&
                                    <React.Fragment>
                                        <div dangerouslySetInnerHTML={{ __html: description }} ref={medicineInfoRef}/>
                                        {(validate.isNotEmpty(props.moleculesInfo) || validate.isNotEmpty(faq)) && <hr className="my-4 mx-n3 solid" />}
                                    </React.Fragment>
                                }
                                {validate.isNotEmpty(props.moleculesInfo) &&
                                    <React.Fragment>
                                        <div ref={drugCompositionInfoRef}>
                                            <DrugCompositionSlider moleculesInfo = {props.moleculesInfo} compositionIndex = {compositionIndex} setCompositionIndex = {setCompositionIndex} />
                                            {Object.entries(props.moleculesInfo[compositionIndex]).map(([key, value]) => {
                                                return(
                                                    <React.Fragment>
                                                        { "moleculeName_s" != key &&<h6>{key}</h6> }
                                                        { "moleculeName_s" != key &&<p className='font-14 text-secondary'>{value}</p> }
                                                    </React.Fragment>
                                                );
                                            })}
                                        </div>
                                        {validate.isNotEmpty(faq) && <hr className="my-4 mx-n3 solid" />}
                                    </React.Fragment>
                                }
                                {validate.isNotEmpty(faq) &&
                                    <React.Fragment>
                                        <div dangerouslySetInnerHTML={{ __html: faq }} ref={faqRef}/>
                                    </React.Fragment>
                                }
                            </div>
                        </section>
                    </div>}
                </React.Fragment>
            }
        </React.Fragment>
    )
}
export default ProductDescription
