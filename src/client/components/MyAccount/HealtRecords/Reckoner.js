import React from "react";
import Validate from "../../../helpers/Validate";
import moment from "moment/moment";

const Reckoner = (props) => {
    let colours = ['#11B09433', '#11B09466', '#11B09499', '#11B094CC', '#11B094']
    const validate = Validate();
    const testData = props.reckonerData;

    function zeroFilledArray(len) {
        return new Array(len).fill(0);
    }

    return (
        <React.Fragment>
            <div className="align-items-center d-flex justify-content-between  mt-3">
                <h5 className="col p-0 mb-0">Test Names</h5>
                <div className="progress col-9 p-0">
                    {
                        colours.map((value, key) => {
                            return (
                                <React.Fragment>
                                    <div class="progress-bar col text-dark" style={{ backgroundColor: `${value}` }}>{key == 0 ? "Latest Value" : (colours.length - 1 == key ? "Oldest Value" : "")} </div>
                                </React.Fragment>
                            )
                        })
                    }
                </div>
            </div>
            {validate.isNotEmpty(testData) && testData.map((each) => {
                return (
                    <div className="row m-0 reckoner">
                        {<React.Fragment>
                            <div class="card parameter-card w-100 pl-0 pt-3">
                                <div className="d-flex justify-content-between">
                                    <h5 class="col-3">
                                        {each.testName}
                                    </h5>
                                    <React.Fragment>
                                        {validate.isNotEmpty(each.labHealthParameterInfos[0].paramResults) && each.labHealthParameterInfos[0].paramResults.map((eachParamResult) => {
                                            return (
                                                <>
                                                    <p class="card-title text-center col mb-0">{moment(new Date(eachParamResult.authenticatedDate)).format("MMM DD, YYYY")}</p>
                                                </>
                                            )
                                        })}
                                        {validate.isNotEmpty(each.labHealthParameterInfos[0].paramResults) && zeroFilledArray(5 - each.labHealthParameterInfos[0].paramResults.length).map((each) => {
                                            return (
                                                <>
                                                    <p class="card-title col mb-0"></p>
                                                </>
                                            )
                                        })}
                                    </React.Fragment>
                                </div>
                                {validate.isNotEmpty(each.labHealthParameterInfos) && each.labHealthParameterInfos.map((eachParam, index) => {
                                    return (
                                        <div className={(index == eachParam.length - 1) ? "d-flex justify-content-between p-0" : "d-flex justify-content-between p-0 mb-2"}>
                                            <p className="text-secondary col-3 mb-0 font-12">{eachParam.parameterName} <span className="d-flex">{eachParam.units ? `(value in ${eachParam.units})` : ""}</span></p>
                                            <React.Fragment>
                                                {validate.isNotEmpty(eachParam.paramResults) && eachParam.paramResults.map((eachParamResult) => {
                                                    return (
                                                        <p class="card-title text-center col mb-0">{eachParamResult.result}</p>
                                                    )
                                                })}
                                                {validate.isNotEmpty(eachParam.paramResults) && zeroFilledArray(5 - eachParam.paramResults.length).map((each) => {
                                                    return (
                                                        <p class="card-title col mb-0"></p>
                                                    )
                                                })}
                                            </React.Fragment>
                                        </div>
                                    )
                                })
                                }
                            </div>

                        </React.Fragment>
                        }
                    </div>
                )
            })}
        </React.Fragment>
    )
}
export default Reckoner;