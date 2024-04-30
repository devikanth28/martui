import React from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem }  from 'reactstrap';


const QuantityDropDown = (props) => {

    const restrictedQty = parseInt(props.restrictedQty);
    let selectedQty = parseInt(props.selectedQty);

    let  maxQty = restrictedQty > 0 ? restrictedQty : 99; 
    selectedQty =  (restrictedQty > 0 && restrictedQty < selectedQty) ? restrictedQty : selectedQty;

    let qtyToChange = [];
    for (let qty = 1; qty <= maxQty ; qty++) {
        qtyToChange.push(qty);
    }
    return (
        <React.Fragment>
            <div className="custom-dropdown">
        <UncontrolledDropdown>
            <DropdownToggle caret className="btn btn-block" color="white">
              {"Qty " +props.productQty[props.productId] + " (Packs)"}
            </DropdownToggle>
            <DropdownMenu modifiers={{
              setMaxHeight: {
                enabled: true,
                order: 890,
                fn: (data) => {
                  return {
                    ...data,
                    styles: {
                      ...data.styles,
                      overflow: 'auto',
                      maxHeight: 200,
                    },
                  };
                },
              },
            }}
        >
            {qtyToChange.map((qty) =>{
            return(
                <DropdownItem className={props.productQty[props.productId] == qty ? 'active':''} key={props.productId+"-"+qty} value={qty} onClick={()=>props.updateCartQty(props.productId,qty)}>
                {qty+" (Packs)"}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16.621 16">
                    <g transform="translate(-12 -13)">
                        <rect width="16" height="16" transform="translate(12 13)" fill="none"></rect>
                        <path d="M18,9,9.75,17.25,6,13.5" transform="translate(8.5 7.5)" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                    </g>
                </svg>
                </DropdownItem>
            )})}
            </DropdownMenu>
        </UncontrolledDropdown>
        </div>
        </React.Fragment>
    )
}

export default QuantityDropDown;
