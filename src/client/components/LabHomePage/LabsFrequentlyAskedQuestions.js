import React, { useState } from "react"
import FaqArtWork from "../../images/common/faq-subscription-icon.svg"
import { UncontrolledCollapse } from 'reactstrap';
import { Collapse } from 'reactstrap';

const FaqStructure = (props) => {
    const { faq, index } = props
    const faqtext = faq.firstElementChild.innerText
    const [openedSections, setOpenedSections] = useState([]);
    const answertext = faq.lastElementChild.innerText
    const events = ['click'];
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
        <a id={'answer' + index} onClick={(e) => handleClick(e)} title="Click to open answer" href="javascript:void(0)">
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
                <p>{answertext}</p>
            </UncontrolledCollapse>
        </div>
    </section>
    return newElem
}

const LabsFrequentlyAskedQuestions =() =>{
    const l1 =  '<div className="question-container"> '+
    '<section>' +
    '<a href="javascript:void(0)" title="click to expand"> '+
            'What are the benefits of MedPlus HealthPlus Plan?'+
            '<span>'+
            '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">' +
                '<g transform="translate(884.477 -762) rotate(90)">'+
                    '<rect fill="none" width="16" height="16" transform="translate(762 868.477)"/>'+
                    '<path fill="#343a40" d="M59.879,465.752l-3.694,3.694a.837.837,0,1,0,1.184,1.184l3.1-3.093,3.1,3.1a.84.84,0,0,0,1.432-.592.832.832,0,0,0-.248-.592l-3.7-3.7A.84.84,0,0,0,59.879,465.752Z" transform="translate(709.685 408.091)"/>'+
                '</g>'+
            '</svg>' +
            '</span>'+
        '</a>'+
        '<div toggler="#question1">' +
            '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>'+
        '</div>'+
    '</section>' +
    '<section>'+
        '<a href="javascript:void(0)" title="click to expand">'+
            'How long is my MedPlus HealthPlus Plan membership valid for?'+
            '<span>'+
            '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">'+
                '<g transform="translate(884.477 -762) rotate(90)">'+
                    '<rect fill="none" width="16" height="16" transform="translate(762 868.477)"/>'+
                    '<path fill="#343a40" d="M59.879,465.752l-3.694,3.694a.837.837,0,1,0,1.184,1.184l3.1-3.093,3.1,3.1a.84.84,0,0,0,1.432-.592.832.832,0,0,0-.248-.592l-3.7-3.7A.84.84,0,0,0,59.879,465.752Z" transform="translate(709.685 408.091)"/>'+
                '</g>'+
            '</svg>'+
            '</span>'+
        '</a>'+
        '<div toggler="#question2">'+
            '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>'+
        '</div>' +
    '</section>'+
    '<section>'+
        '<a href="javascript:void(0)" title="click to expand">'+
            'How long is my MedPlus HealthPlus Plan membership valid for?'+
            '<span>'+
            '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">'+
                '<g transform="translate(884.477 -762) rotate(90)">'+
                    '<rect fill="none" width="16" height="16" transform="translate(762 868.477)"/>'+
                    '<path fill="#343a40" d="M59.879,465.752l-3.694,3.694a.837.837,0,1,0,1.184,1.184l3.1-3.093,3.1,3.1a.84.84,0,0,0,1.432-.592.832.832,0,0,0-.248-.592l-3.7-3.7A.84.84,0,0,0,59.879,465.752Z" transform="translate(709.685 408.091)"/>'+
                '</g>'+
            '</svg>'+
            '</span>'+
        '</a>'+
        '<div toggler="#question3">'+
            '<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>'+
        '</div>' +
    '</section>'+
'</div>'


    let parser = new DOMParser()
    let faqHtml = parser.parseFromString(l1, 'text/html');
    let questions = faqHtml.getElementsByTagName('section');
    let ques = [...questions];
    return(
        <section>
            {/* Ghost Image Start */}
            <div className="frequently-asked-container d-none">
                <div className="faq-content">
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
                <div class="d-inline-block">
                        <div class="m-0 p-0 ph-item" style={{"background-color": 'unset'}}>
                            <div class="ph-col-12 p-0">
                                <div class="ph-row p-0 mb-0">
                                     <div class="ph-picture m-0" style={{"height": '350px',"width":"350px"}}></div>
                                </div>
                            </div>
                        </div>
                    </div> 
            </div>
            {/* Ghost Image End */}

            <div className="frequently-asked-container">
                <div className="faq-content">
                    <h6 className="h5">Frequently Asked Questions</h6>
                    <p className="font-14 text-secondary">To help you navigate our site better and make your shopping experience easier, we have provided answers to some frequently asked questions. You are always welcome to call our customer service if your question remains unanswered.</p>
                    <div className="question-container">
                            {ques.map((value, index) => {
                                return <FaqStructure faq={value} index={index} />
                            })}
                    </div>
                </div>
                <div className="d-inline-block">
                    <img className="img-fluid" src={FaqArtWork} alt="Frequently Asked Questions" title="Frequently Asked Questions"/>
                </div>
            </div>
            
        </section>
    )
}
export default LabsFrequentlyAskedQuestions;

