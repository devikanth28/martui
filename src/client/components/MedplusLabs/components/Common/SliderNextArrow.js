import React from 'react'

export default function SliderNextArrow(props) {
    const { className, onClick } = props;
    return (
        <div className={`${props.classEffect ? props.classEffect :''} ${className}`} onClick={onClick}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g transform="translate(-906.838 786) rotate(-90)"><rect fill="none" width="24" height="24" transform="translate(762 906.838)"/><path fill="#e71c37" d="M63.432,503.859l5.4-5.4a1.223,1.223,0,0,0-1.73-1.73l-4.533,4.52-4.533-4.533a1.228,1.228,0,0,0-2.092.865,1.216,1.216,0,0,0,.363.865l5.4,5.411A1.229,1.229,0,0,0,63.432,503.859Z" transform="translate(711.356 418.584)"/></g></svg>
        </div>
    );
}