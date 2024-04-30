import React from "react";
import Validate from "../../../helpers/Validate";

const ProductPrice = (props) => {
    const validate = Validate();
   
    const preparePriceDetails=()=>{
            return(
                <React.Fragment>
                {validate.isValidPrice(props.mrpPrice) && validate.isValidPrice(props.discountedPrice) && 
                <React.Fragment>
                    <div className="d-flex">
                    <h6 className={props.offerPriceClass}>MRP <strong className="rupee">&#x20B9;</strong>{props.discountedPrice.toFixed(2)} </h6>
                    <p className={props.mrpClass}>&#x20B9;<del>{props.mrpPrice.toFixed(2)}</del></p>
                    </div>
                </React.Fragment>
                }
                {validate.isValidPrice(props.mrpPrice) && !validate.isValidPrice(props.discountedPrice) && 
                    <div>
                        <h6 className={props.offerPriceClass}>MRP <strong className="rupee">&#x20B9;</strong>{props.mrpPrice > 0 ? props.mrpPrice.toFixed(2) : "NA"} </h6>
                    </div>
                }
                </React.Fragment>
            );
        }
        return (
        <React.Fragment>
        <div className={props.productPriceClass}>
                {preparePriceDetails()}
            {validate.isNotEmpty(props.discountMessage) &&
                <p class={props.discountMessageClass}>(<span className='font-weight-bold'>{props.discountMessage}</span>)</p>}
        </div>
    </React.Fragment>
    );
}
export default ProductPrice;