import React from 'react';
import { shopByGeneralCategory } from '../../../../../Analytics/Analytics';
import Validate from '../../../../../helpers/Validate';

const SubCategoryCard=(props)=>{

return(
   <li onClick={() => {props.history.push(props.redirectTo);shopByGeneralCategory(props.title)}} className={Validate().isNotEmpty(props.className) ? props.className : 'pointer test-card'} style={{'min-height':'unset'}}>
    <div className="d-flex align-items-center">
       <div className="media-left">
       <span dangerouslySetInnerHTML={{ __html: props.svg }}/>
       </div>
       <div className="media-body">
          <p className="mb-0">{props.title}</p>
       </div>
    </div>
 </li>
);
}
export default SubCategoryCard;
