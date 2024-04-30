import React from "react";
import Validate from "../../../helpers/Validate";

const ProductName = (props) => {
    return (
        <React.Fragment>
            {Validate().isNotEmpty(props.productName) &&
                <h6 className={props.productClass} style={props.productStyle}>
                    <span title={props.productName}>{props.productName}</span>
                </h6>}
        </React.Fragment>
    )
}
export default ProductName;