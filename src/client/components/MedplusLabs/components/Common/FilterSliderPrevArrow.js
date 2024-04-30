import React from "react";

function FilterSliderPrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div className={className} onClick={onClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 18 18">
                <g transform="translate(-868.477 780) rotate(-90)">
                    <rect fill="none" width="18" height="18" transform="translate(762 868.477)"/>
                    <path fill="#080808" d="M60.371,465.782l-4.156,4.156a.942.942,0,0,0,1.332,1.332l3.49-3.48,3.491,3.491a.945.945,0,0,0,1.611-.666.936.936,0,0,0-.279-.666L61.7,465.782A.945.945,0,0,0,60.371,465.782Z" transform="translate(710.138 408.731)"/>
                </g>
            </svg>
        </div>
    );
}

export default FilterSliderPrevArrow;