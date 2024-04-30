import React from "react"
import { UncontrolledCollapse } from 'reactstrap';
const TestStructure = (props) => {

    const index = props.index
    let testCount = false
    let testValue = []
    const events = ['click'];
    const firstText = props.test.childNodes
    const firstValue = firstText[0].innerText
    if (firstText.length >= 2) {
        testCount = true
        testValue = firstText[1].childNodes
        if (testValue.length) {
            testValue = [...testValue]
        }
    }

    let newElem = <div className="border bg-white rounded">
        <a id={'test' + index} title="Click to open answer" className="header-tabs font-14 p-2" >
            {firstValue}
            {testCount && <React.Fragment> (Includes {testValue.length} tests)</React.Fragment>}
            {testCount && <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                    <g transform="translate(-762 -906.838)">
                        <rect fill="none" width="18" height="18" transform="translate(762 906.838)" />
                        <path fill="#080808" d="M61.559,501.985l4.049-4.049a.917.917,0,0,0-1.3-1.3l-3.4,3.39-3.4-3.4a.921.921,0,0,0-1.569.649.912.912,0,0,0,.272.649l4.049,4.059A.922.922,0,0,0,61.559,501.985Z" transform="translate(710.032 416.557)" />
                    </g>
                </svg>
            </span>}
        </a>
        {testCount && <div>
            <UncontrolledCollapse toggler={'#test' + index} toggleEvents={events}>
                <div className="p-2">
                    {testValue.map((value) => {
                        return <div><a href="javascript:void(0)" title={value.innerText}>{value.innerText}</a></div>
                    })}
                </div>
            </UncontrolledCollapse>
        </div> }
    </div>
    return newElem

}

const LabTestsIncluded = (props) => {
    const li = '<div className="row margin-none test-info labproduct">' +
        '<section>' +
        '<h5> Test Included 68 Parameters </h5>' +
        '<div>' +
        '<a href="javascript:void(0)" id="question1" title="Click to open answer">' +
        'But I must explain to you how all this mistaken' +
        '<span>' +
        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">' +
        '<g transform="translate(-762 -906.838)">' +
        '<rect fill="none" width="18" height="18" transform="translate(762 906.838)" />' +
        '<path fill="#080808" d="M61.559,501.985l4.049-4.049a.917.917,0,0,0-1.3-1.3l-3.4,3.39-3.4-3.4a.921.921,0,0,0-1.569.649.912.912,0,0,0,.272.649l4.049,4.059A.922.922,0,0,0,61.559,501.985Z" transform="translate(710.032 416.557)" />' +
        '</g>' +
        '</svg>' +
        '</span>' +
        '</a>' +
        '<div toggler="#question1">' +
        '<a href="javascript:void(0)" title="test1">Test1</a>' +
        '<a href="javascript:void(0)" title="test2">Test2</a>' +
        '<a href="javascript:void(0)" title="test3">Test3</a>' +
        '<a href="javascript:void(0)" title="test4">Test4</a>' +
        '</div>' +
        '</div>' +
        '<div>' +
        '<a href="javascript:void(0)" id="question1" title="Click to open answer">' +
        'But I must explain to you how all this mistaken' +
        '<span>' +
        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">' +
        '<g transform="translate(-762 -906.838)">' +
        '<rect fill="none" width="18" height="18" transform="translate(762 906.838)" />' +
        '<path fill="#080808" d="M61.559,501.985l4.049-4.049a.917.917,0,0,0-1.3-1.3l-3.4,3.39-3.4-3.4a.921.921,0,0,0-1.569.649.912.912,0,0,0,.272.649l4.049,4.059A.922.922,0,0,0,61.559,501.985Z" transform="translate(710.032 416.557)" />' +
        '</g>' +
        '</svg>' +
        '</span>' +
        '</a>' +
        '<div toggler="#question1">' +
        '<a href="javascript:void(0)" title="test1">Test1</a>' +
        '<a href="javascript:void(0)" title="test2">Test2</a>' +
        '</div>' +
        '</div>' +
        '<div>' +
        '<a href="javascript:void(0)" id="question1" title="Click to open answer">' +
        'But I must explain to you how all this mistaken' +
        '<span>' +
        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">' +
        '<g transform="translate(-762 -906.838)">' +
        '<rect fill="none" width="18" height="18" transform="translate(762 906.838)" />' +
        '<path fill="#080808" d="M61.559,501.985l4.049-4.049a.917.917,0,0,0-1.3-1.3l-3.4,3.39-3.4-3.4a.921.921,0,0,0-1.569.649.912.912,0,0,0,.272.649l4.049,4.059A.922.922,0,0,0,61.559,501.985Z" transform="translate(710.032 416.557)" />' +
        '</g>' +
        '</svg>' +
        '</span>' +
        '</a>' +
        '</div>' +
        '<div>' +
        '<a href="javascript:void(0)" id="question1" title="Click to open answer">' +
        'But I must explain to you how all this mistaken' +
        '<span>' +
        '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">' +
        '<g transform="translate(-762 -906.838)">' +
        '<rect fill="none" width="18" height="18" transform="translate(762 906.838)" />' +
        '<path fill="#080808" d="M61.559,501.985l4.049-4.049a.917.917,0,0,0-1.3-1.3l-3.4,3.39-3.4-3.4a.921.921,0,0,0-1.569.649.912.912,0,0,0,.272.649l4.049,4.059A.922.922,0,0,0,61.559,501.985Z" transform="translate(710.032 416.557)" />' +
        '</g>' +
        '</svg>' +
        '</span>' +
        '</a>' +
        '</div>' +
        '</section>' +
        '</div>'


    let parser = new DOMParser()
    let faqHtml = parser.parseFromString(li, 'text/html');
    let testIncluded = faqHtml.getElementsByTagName('section');
    testIncluded = testIncluded[0].childNodes
    testIncluded = [...testIncluded];
    testIncluded = testIncluded.slice(1)
    return (
        <React.Fragment>
            <div className="lab-test-included">
                <section>
                    <h5 class="heading">Test Included 68 Parameters</h5>
                    {testIncluded.map((value, index) => {
                        return <TestStructure test={value} index={index} />
                    })}
                </section>
            </div>
        </React.Fragment>
    )
}



export default LabTestsIncluded
