import React from 'react'

export default function SliderPrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div className={`${props.classEffect ? props.classEffect :''} ${className}`} onClick={onClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g transform="translate(-868.477 786) rotate(-90)"><rect fill="none" width="24" height="24" transform="translate(762 868.477)"/><path fill="#e71c37" d="M61.848,465.874l-5.541,5.541a1.256,1.256,0,1,0,1.776,1.776l4.653-4.64,4.655,4.655a1.261,1.261,0,0,0,2.149-.888,1.248,1.248,0,0,0-.373-.888l-5.543-5.556A1.26,1.26,0,0,0,61.848,465.874Z" transform="translate(711.498 410.651)"/></g></svg>
        </div>
    );
}
