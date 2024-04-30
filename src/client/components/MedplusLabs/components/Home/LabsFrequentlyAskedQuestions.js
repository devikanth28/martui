import React, { useState, useEffect } from "react"
import FaqArtWork from "../../../../images/common/faq-subscription-icon.svg"
import { UncontrolledCollapse } from 'reactstrap';
import Validate from "../../../../helpers/Validate";
import LabCatalogService from "../../Services/LabCatalogService";

const FaqStructure = (props) => {
    const { faq, index } = props;
    const faqtext = faq && faq.firstElementChild && faq.firstElementChild.innerText || ''; 
    const answertext = faq && faq.children[1] && faq.children[1].innerHTML || '';
    const events = ['click'];
    const [openedSections, setOpenedSections] = useState([]);
    const handleClick = e => {
        let id = e.target.id;
        if (id == ''){
            id = e.currentTarget.id
        }
        if(openedSections.indexOf(id) === -1){
            let tempArray = [...openedSections];
            tempArray.push(id);
            setOpenedSections(tempArray);
        }else{
            let tempArray = openedSections.filter(each => each !== id);
            setOpenedSections(tempArray);
        }
    }
    let newElem = <section>
        <button role="button" className="btn py-0 shadow-none" id={'answer' + index} onClick={(e) => handleClick(e)} title="Click to open answer">
            {faqtext}
            <span>
                <svg className={ openedSections.indexOf('answer'+index) !== -1 ? "collapse-arrow rotate-bottom-half" : "collapse-arrow up-half"} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                    <g transform="translate(884.477 -762) rotate(90)">
                        <rect fill="none" width="16" height="16" transform="translate(762 868.477)"/>
                        <path fill="#343a40" d="M59.879,465.752l-3.694,3.694a.837.837,0,1,0,1.184,1.184l3.1-3.093,3.1,3.1a.84.84,0,0,0,1.432-.592.832.832,0,0,0-.248-.592l-3.7-3.7A.84.84,0,0,0,59.879,465.752Z" transform="translate(709.685 408.091)"/>
                    </g>
                </svg>
            </span>
        </button>
        <div className="collapse-container">
            <UncontrolledCollapse toggler={'#answer' + index} toggleEvents={events}>
                <div className="faq-answer" dangerouslySetInnerHTML={{ __html: answertext }} />
            </UncontrolledCollapse>
        </div>
    </section>
    return newElem
}
 
const LabsFrequentlyAskedQuestions =(props) =>{

    const [noFaqContent,setNoFaqContent] = useState(true);
    const [faqQuestions,setFaqQuestions] = useState([]);
    const [ghostImage,setGhostImage] = useState(true);

    const validate = Validate();
    const labCatalogService = LabCatalogService();

    useEffect(() => {
        let parser = new DOMParser();
        setGhostImage(true)
        let params={
            itemId: props.page.toUpperCase(),
            contentType: 'ALL'
        }
        labCatalogService.getLabStaticContent(params).then((data)=>{
            if(validate.isNotEmpty(data) && validate.isNotEmpty(data['dataObject']) && validate.isNotEmpty(data['dataObject']['result'])){
                let faqData = data['dataObject']['result']['FAQ'];
                if(validate.isNotEmpty(faqData)){
                    setNoFaqContent(false);
                    let faqHtml = parser.parseFromString(faqData, 'text/html');
                    let questions = faqHtml.getElementsByTagName('section');
                    setFaqQuestions([...questions]);
                }   
                setGhostImage(false)
            } else{
                console.log("No data Available");
                setGhostImage(false)
            }
        }).catch(e => {
            console.log("Error: ",e);
            setGhostImage(false)
        });
      }, []);
    if(ghostImage){
        return (
            <section className={props.sectionMarginClass}>
                {/* Ghost Image Start */}
                <div className="frequently-asked-container">
                    <div className={`${props.hideIcon ? 'w-100' : ""} faq-content`}>
                        <div className="ph-item p-0">
                            <div className="ph-col-12 p-0">
                                <div className="ph-row" style={{"width": "20%"}}>
                                <div className="ph-col-12"></div>
                            </div>
                            <div className="ph-row">
                                <div className="ph-col-12 mb-3" style={{"height": "2rem"}}>
                            </div>
                            </div>
                            <div className="ph-row" style={{"width": "35%"}}>
                                    <div className="ph-col-12 mb-4">
                                </div>
                            </div>
                            <div className="ph-row" style={{"width": "35%"}}>
                                    <div className="ph-col-12 mb-4">
                                </div>
                            </div>
                            <div className="ph-row" style={{"width": "35%"}}>
                                    <div className="ph-col-12 mb-4">
                                </div>
                            </div>
                            <div className="ph-row" style={{"width": "35%"}}>
                                    <div className="ph-col-12 mb-4">
                                </div>
                            </div>
                            <div className="ph-row" style={{"width": "35%"}}>
                                    <div className="ph-col-12 mb-4">
                                </div>
                            </div>
                            <div className="ph-row" style={{"width": "35%"}}>
                                    <div className="ph-col-12 mb-4">
                                </div>
                            </div>
                            <div className="ph-row" style={{"width": "35%"}}>
                                    <div className="ph-col-12 mb-4">
                                </div>
                            </div>
                            <div className="ph-row" style={{"width": "35%"}}>
                                    <div className="ph-col-12 mb-4">
                                </div>
                            </div>
                            <div className="ph-row" style={{"width": "35%"}}>
                                    <div className="ph-col-12 mb-4">
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                    { !props.hideIcon && <div className="d-inline-block">
                        <div className="m-0 p-0 ph-item" style={{"backgroundColor": 'unset'}}>
                            <div className="ph-col-12 p-0">
                                <div className="ph-row p-0 mb-0">
                                    <div className="ph-picture m-0" style={{"height": '350px',"width":"350px"}}></div>
                                </div>
                            </div>
                        </div>
                    </div>} 
                </div>
                {/* Ghost Image End */}
            </section>
        )
    }

    return(
        <React.Fragment>
            {!noFaqContent && 
            <section className={props.sectionMarginClass}>
                <div className="frequently-asked-container">
                    <div className={`${props.hideIcon ? 'w-100' : ""} faq-content`}>
                        <h6 className="h5">Frequently Asked Questions</h6>
                        <p className="font-14 text-secondary">To help you navigate our site better and make your shopping experience easier, we have provided answers to some frequently asked questions. You are always welcome to call our customer service if your question remains unanswered.</p>
                        <div className="question-container">
                                {faqQuestions.map((value, index) => {
                                    return <FaqStructure faq={value} index={index} key={index}/>
                                })}
                        </div>
                    </div>
                    { !props.hideIcon && <div className="d-inline-block">
                        <img className="img-fluid" src={props.icon ? props.icon : FaqArtWork} alt="Frequently Asked Questions" title="Frequently Asked Questions"/>
                    </div>}
                </div>
                
            </section>
        }
        </React.Fragment>
    )
}
export default LabsFrequentlyAskedQuestions;

