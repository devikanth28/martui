import React from "react";
import Slider from "react-slick";
import Validate from "../../../../helpers/Validate";

const DrugCompositionSlider = (props) => {

    const altNameSlider = {
        dots: false,
        infinite: false,
        arrows: false,
        variableWidth: true
    };

    return(
        <React.Fragment>
            {Validate().isNotEmpty(props.moleculesInfo) &&
                <Slider className="popular-test-slider custom-slide-arrows" {...altNameSlider}>
                    {props.moleculesInfo.map((eachMolecule, index) => {
                        return(
                            <div className="item mt-0 mb-3 mr-1" key={index}>
                                <button role="button" className={index == props.compositionIndex ? "badge-pill border btn btn-sm badge-success text-dark" : "badge-pill border btn btn-sm mr-1 text-dark"} onClick={() => props.setCompositionIndex(index)}>{eachMolecule.moleculeName_s}</button>
                            </div>
                        );
                    })}
                </Slider>
            }
        </React.Fragment>
    )
}

export default DrugCompositionSlider;