import React from "react";
import { useSelector } from "react-redux";
import Validate from "../helpers/Validate";

const RefreshCatalog = (props)=> {
    const validate = Validate();
    const toggle = useSelector(state => validate.isNotEmpty(state?.locality?.selectedLocality?.combination) ?  state.locality.selectedLocality.combination  : '');
    return(
        <React.Fragment key ={toggle} >
            {props.children}
        </React.Fragment>
    );
}
export default RefreshCatalog;