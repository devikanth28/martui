import React from "react";
import { Link } from "react-router-dom";


const BannerRedirection = ({banner,redirectUrl,children,imageClassName,noImage,...rest})=> {

let linkProps = {};
if(banner.alternativeValue) {
    linkProps["aria-label"] = banner.alternativeValue;
    linkProps["title"] = banner.alternativeValue;
}

linkProps = {...rest,...linkProps,target:`${banner.openInNewTab ? "_blank" : "_self"}`, rel:`${banner.openInNewTab ? 'noopener noreferrer' : ''}`, title:`${banner.alternativeValue}`};
const innerChild =  noImage ? children : <img className={imageClassName} itemprop="image" alt={banner.alternativeValue} title={banner.alternativeValue} src={banner.imagePath} />;
return (
    <React.Fragment>
        {banner.redirectType =='External' ? 
             <a  href ={`${redirectUrl}`} {...linkProps} onClick ={rest.onClickEvent} role="link">
                {innerChild}
            </a> :
            <Link to={`${redirectUrl}`} {...linkProps}  onClick ={rest.onClickEvent} role="link">
                {innerChild}
            </Link>}   
    </React.Fragment>);
    }

export default BannerRedirection;