import React, { useState } from "react"
import { UncontrolledCollapse } from 'reactstrap';
import FaqArtWork from "../../../images/common/faq-subscription-icon.svg";
import Validate from "../../../helpers/Validate";

const LabsFrequentlyAskedQuestions =(props) =>{

    let parser = new DOMParser()
    const validate = Validate();
    let faqHtml = parser.parseFromString(props.faqContent, 'text/html');
    let questions = faqHtml.getElementsByTagName('section');
    let paragraph = faqHtml.getElementsByClassName('question-container');

    let ques = [...questions];
    const getStaticContent = () =>{
        if(validate.isEmpty(paragraph) || (validate.isNotEmpty(paragraph) && validate.isEmpty(paragraph[0]?.children))){
            return false;
        }
        return paragraph[0]?.children[0]?.tagName==='SPAN';
    }

    return (
        <React.Fragment>
            <section>
                <div className="frequently-asked-container">
                    <div className="faq-content">
                        <h6 className="h5">Frequently Asked Questions</h6>
                        {getStaticContent() && <span dangerouslySetInnerHTML={{__html:paragraph[0]?.children[0]?.innerHTML}} className="font-14 text-secondary"></span>}
                        <div className="question-container">
                                {ques.map((value, index) => {
                                    return <FaqStructure key={index} faq={value} index={index} />
                                })}
                        </div>
                    </div>
                    <div className="d-inline-block">
                        <img className="img-fluid" src={FaqArtWork} alt="Frequently Asked Questions" title="Frequently Asked Questions"/>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}
export default LabsFrequentlyAskedQuestions;

const FaqStructure = (props) => {
    const { faq, index } = props
    const faqtext = faq.firstElementChild.innerText
    let answertext = faq.children[1].innerHTML
    const events = ['click'];
    const [openedSections, setOpenedSections] = useState([]);
    const handleClick = e => {
        let id = e.target.id;
        if(id==''){
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
        <a id={'answer' + index}  onClick={(e) => handleClick(e)} title="Click to open answer" href="javascript:void(0)">
            {faqtext}
            <span>
                <svg className={ openedSections.indexOf('answer'+index) !== -1 ? "collapse-arrow rotate-bottom-half" : "collapse-arrow up-half"} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                    <g transform="translate(884.477 -762) rotate(90)">
                        <rect fill="none" width="16" height="16" transform="translate(762 868.477)"/>
                        <path fill="#343a40" d="M59.879,465.752l-3.694,3.694a.837.837,0,1,0,1.184,1.184l3.1-3.093,3.1,3.1a.84.84,0,0,0,1.432-.592.832.832,0,0,0-.248-.592l-3.7-3.7A.84.84,0,0,0,59.879,465.752Z" transform="translate(709.685 408.091)"/>
                    </g>
                </svg>
            </span>
        </a>
        <div className="collapse-container">
            <UncontrolledCollapse toggler={'#answer' + index} toggleEvents={events}>
                <div className="faq-answer" dangerouslySetInnerHTML={{ __html: answertext }} />
            </UncontrolledCollapse>
        </div>
    </section>
    return newElem
}