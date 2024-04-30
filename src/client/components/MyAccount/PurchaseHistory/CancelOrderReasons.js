import React from "react";
import Validate from "../../../helpers/Validate";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const CancelOrderReasons = (props) => {

    const validate = Validate()
    return (
        <React.Fragment>
            <div className={"subs-register-dropdown mb-3"}>
                <label className="dropdown-label" style={{ zIndex: "1001" }}>Select a Reason to Cancel</label>
                <Dropdown isOpen={props.isOpen} toggle={() => props.toggle(!props.isOpen)}>
                    <DropdownToggle caret color="white" className="btn-block border">
                        {validate.isNotEmpty(props.selectedReason) ? <span>{props.selectedReason}</span> : <span>Reason to Cancel</span>}
                    </DropdownToggle>
                    <DropdownMenu className="w-100" style={{ 'max-height': '10rem', 'overflow-y': 'auto' }}>
                        {props.cancelReasonsList && props.cancelReasonsList.map((reason, index) => {
                            return (
                                <DropdownItem key={index} tag="a" href="javascript:void(0);" title={reason} onClick={() => { props.setSelectedReason(reason) }}>{reason}</DropdownItem>
                            )
                        })}
                    </DropdownMenu>
                </Dropdown>
            </div>
        </React.Fragment>
    )
}
export default CancelOrderReasons