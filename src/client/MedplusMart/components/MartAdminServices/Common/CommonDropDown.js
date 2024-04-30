import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Alert from '../../../../components/Common/Alert';


const DropdownItemComponent = ({ eachArea, onClickHandler }) => {
    return (
        <DropdownItem onClick={() => onClickHandler(eachArea)}>
            <React.Fragment>{eachArea}</React.Fragment>
        </DropdownItem>
    );
};

const CommonDropDown = (props) => {

    const [isDropDownOpen, setDropDownOpen] = useState(false);

    const toggle = () => setDropDownOpen((prevState) => !prevState);

    const closeToastMessage = (alertInfo)=>{
        props.setAlertInfo(alertInfo);
    }

    const dropDownModifiers = {
        setMaxHeight: {
            enabled: true,
            order: 890,
            fn: (data) => {
                return {
                    ...data,
                    styles: {
                        ...data.styles,
                        overflow: "auto",
                        maxHeight: 200,
                    },
                };
            },
        },
    };

    if(!props.selectTypes) {
        return <React.Fragment></React.Fragment>
    }

    return (
        <React.Fragment>
            <section>
                {props.title && <h1 className="h5 mb-0 border-bottom p-3">{props.title}</h1>}
                    <div className="d-flex p-3">
                        {props.title && <p>
                            {props.title}
                        </p>}
                        <Dropdown isOpen={isDropDownOpen} toggle={toggle} onClick={(e) => e.stopPropagation()} className="col-3 ">
                            <DropdownToggle caret className={`btn btn-block border ${props.extraClassName}`} color="white">
                                {props.initialText ? props.initialText : "SelectType"}
                            </DropdownToggle>
                            <DropdownMenu modifiers={dropDownModifiers}>
                                {props.selectTypes.map((eachArea) => (
                                    <DropdownItemComponent key={eachArea} eachArea={eachArea} onClickHandler={props.handleAreaSelection} />
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                        <div className="col-7">
                        <button type="button" className="btn btn-brand-gradient px-5 rounded-pill" onClick={props.handleSubmit}>
                            Submit
                        </button>
                        </div>
                    </div>
            </section>
            {props.alertInfo && <Alert alertInfo={props.alertInfo} onDurationEnd={closeToastMessage} duration='5000' />}
        </React.Fragment>
	);
}

CommonDropDown.propTypes = {
    selectTypes : PropTypes.array.isRequired,
    handleSubmit : PropTypes.func.isRequired,
    handleAreaSelection : PropTypes.func.isRequired,
    setAlertInfo : PropTypes.func.isRequired,
    extraClassName : PropTypes.string,
    title : PropTypes.string,
    initialText : PropTypes.string,
    alertInfo : PropTypes.object
};

export default CommonDropDown;