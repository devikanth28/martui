import React from 'react';
const NoDataToShow = (props) => {
    const HealthRecordSvg= <svg className="mr-2" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="10"/>
                                <line x1="12" y1="8" x2="12" y2="16"/>
                                <line x1="8" y1="12" x2="16" y2="12"/>
                            </svg>;
    
    const getSvg = (type) =>{
        let DisplaySvg = "";
        switch(type){
        case 'Create New Health Records':
            DisplaySvg = HealthRecordSvg;
        break;
        default:
            DisplaySvg="N/A"
        break;
        }
        return DisplaySvg;
        }
    return(
        <div className={props.className +" no-data-to-show body-height"}>
            <img src={props.image} alt="MedPlus" title=""/>
            <h6 className="mb-0 font-weight-normal col-6">{props.message}</h6>
            {props.buttonText && <button className={ props.buttonClassName +" btn btn-brand px-5 mt-3"} onClick={()=> props.action()}>
                {getSvg(props.buttonText)}
                {props.buttonText}
            </button> }
        </div>
    )
}
export default NoDataToShow;