import React from "react";
import Slider from "react-slick";

const altNameSlider = {
    dots: false,
    infinite: false,
    arrows: false,
    variableWidth: true
};
const DrugComposition =() => {
    
    const alternateKeywords = ['ascorbic acid','Calcium D-Pantothenate' , 'cholecalciferol' ,'Chromium Picolinate','Folic Acid','methylcobalamin','Selenium','Vitamin A','Vitamin B1','Vitamin B3' ,'Vitamin B6','Zinc Sulphate']

    const getOtherNames= (otherNames) => {
        var otherTestNames = otherNames.map((eachName, index) =>
            <div className="item mt-0 mb-3" key={index}>
                <button role="button" className={index == otherNames.length - 1 ? "badge-pill border btn btn-sm badge-success" : "badge-pill border btn btn-sm mr-1"}>{eachName}</button>
            </div>
        );
        return otherTestNames;
    }

    return (
        <React.Fragment>
            <Slider className="popular-test-slider custom-slide-arrows" {...altNameSlider}>
                {getOtherNames(alternateKeywords)}
            </Slider>
        </React.Fragment>
    )
}
export default DrugComposition