import React from "react";

function FilterSliderNextArrow(props) {
const { className, onClick } = props;
return (
    <div className={className} onClick={onClick}>
        <svg xmlns="http://www.w3.org/2000/svg" width="5.153" height="8.589" viewBox="0 0 5.153 8.589">
            <path d="M6.431,13.461a.859.859,0,1,1,1.225-1.2l3.436,3.493a.859.859,0,0,1,0,1.2L7.772,20.332a.859.859,0,1,1-1.225-1.2l2.727-2.776Z" transform="translate(-6.184 -12)"/>
        </svg>
    </div>
);
}
export default FilterSliderNextArrow;