import React, { useMemo, useState } from "react";
import BarGraph from '@medplus/mart-common-components/HealthTrendsPdf';
import { UncontrolledTooltip } from 'reactstrap';
import Validate from "../../../helpers/Validate";
import moment from "moment/moment";

const HealthTrendsDashBoard = React.forwardRef((props, ref) => {

    return (
        <React.Fragment>
            <DisplayGrapDetails {...props} ref={ref} />
            <DisplayParameterDetailsAndBioReferenceRange {...props} />
        </React.Fragment>
    )
});

export const DisplayGrapDetails = React.forwardRef((props, ref) => {

    const customerSelection = props.customerSelection;
    const validate = Validate();
    const [parameterInfo, setParameterInfo] = useState();
    const parameterData = props.parameterData;
    const parameterName = useMemo(() => {
        if (!parameterData) {
            return "";
        }
        if (validate.isNotEmpty(customerSelection.parameterId)) {
            const parameterInfo = parameterData.find(each => each.parameterId == customerSelection.parameterId);
            return parameterInfo.parameterName;
        }
        return "";
    }, [parameterData]);

    return (
        <div class="card parameter-card mb-4" style={{ height: "350px" }}>
            <p className="font-12 mx-3 text-secondary mt-3 mb-0">Parameter Value</p>
            <div className="d-flex justify-content-between">
                <h5 class="ml-3">{props.parameterName} <span className="text-secondary"></span></h5>
                <ul className="garphs-dots">
                    <li><span className="dot normal"></span>Normal</li>
                    <li><span className="dot abnormal"></span>Abnormal</li>
                    <li><span className="dot critical"></span>Critical</li>
                </ul>
            </div>
            <BarGraph {...props} height={window.screen.height / 7} width={window.screen.width / 3} ref={ref} />
        </div>

    )
});

export const DisplayParameterDetailsAndBioReferenceRange = (props) => {
    return (
        <React.Fragment>
            <div class="card parameter-card">
                <div class="card-header d-flex">
                    <span className="col">Parameter</span>
                    {props.labels.map((eachLabel) => {
                        return <span className='col text-center'>{moment(new Date(eachLabel)).format("MMM DD, YYYY")}</span>
                    })}
                </div>
                <div class="card-body d-flex">
                    <p class="card-title col mb-0 text-left">{props.title}</p>
                    {props.barData.data.map((value) => {
                        return <p class="card-title col mb-0 text-center">{value}</p>
                    })}
                </div>
            </div>
            <h5 class="ml-3 mt-4">
                Bio Reference Range (values in {props.units})
                <span className="pl-1" id="UncontrolledTooltipExample">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                        <path id="Icon_awesome-info-circle" data-name="Icon awesome-info-circle" d="M8.563.563a8,8,0,1,0,8,8A8,8,0,0,0,8.563.563Zm0,3.548A1.355,1.355,0,1,1,7.208,5.466,1.355,1.355,0,0,1,8.563,4.111ZM10.369,12.3a.387.387,0,0,1-.387.387H7.143a.387.387,0,0,1-.387-.387V11.53a.387.387,0,0,1,.387-.387H7.53V9.079H7.143a.387.387,0,0,1-.387-.387V7.917a.387.387,0,0,1,.387-.387H9.208a.387.387,0,0,1,.387.387v3.226h.387a.387.387,0,0,1,.387.387Z" transform="translate(-0.563 -0.563)" fill="rgba(108,117,125,0.4)"></path>
                    </svg>
                </span>
                <UncontrolledTooltip placement="bottom" target="UncontrolledTooltipExample">
                    Bio Reference Range is Based On The Current Age Of The Patient
                </UncontrolledTooltip>
            </h5>
            <div class="card parameter-card">
                <div class="card-header d-flex">
                    <span className=" col">Normal</span>
                    <span className=" col"> Abnormal</span>
                    <span className=" col">Critical</span>
                </div>
                <div class="card-body d-flex px-3 py-0">
                    <p class="card-title col normal p-3 mb-0 text-left">{props.bioReferenceRange.Normal}</p>
                    <p class="card-title col abnormal p-3 mb-0 text-left">{props.bioReferenceRange.Abnormal}</p>
                    <p class="card-title col critical p-3 mb-0 text-left">{props.bioReferenceRange.Critical}</p>
                </div>
            </div>
        </React.Fragment>
    )

}

export default HealthTrendsDashBoard;
