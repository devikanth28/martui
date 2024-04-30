

import React, {useState} from 'react';
import {IconSvgLodable} from './IconSvg';
import Image from './Image';
import Validate from '../../helpers/Validate';

const ProductThumbNail = (props)=>{
    if (Validate().isNotEmpty(props.imagesCount)) {
            return (
                <Image src={props.imageUrl}
                    alt={props.productName} className={props.className} width={props.width} height={props.height}
                     isPharmaProduct={!props.isGeneral } showNpaWithText={props.showNpaWithText} showKymNpa={props.showKymNpa} />
            )
    } else {
        if (props.isGeneral) {
            return (
                <Image src={null}
                alt={props.productName} className={props.className} width={props.width} height={props.height}
                 isPharmaProduct={!props.isGeneral } showNpaWithText={props.showNpaWithText}/>
                
            )
        } else {
            return (
                <IconSvgLodable type={props.auditForm} classStr={props.svgClassName} heightStr={props.svgHeight} widthStr={props.svgWidth} />
            )
        }
    }


    /* if((props.isGeneral || (isPharmaImage && Validate().isNotEmpty(props.imagesCount) && props.imagesCount > 0)) && props.imageUrl != undefined){
        return(
            <Image src={props.imageUrl} 
            alt={props.productName} className={props.className} width={props.width}  height={props.height}
            handleError={handlePharmaImage} isPharmaProduct={props.isGeneral? false:true}/>
        )
    }else{
        return(
            <IconSvgLodable type={props.auditForm} classStr={props.svgClassName}  heightStr={props.svgHeight} widthStr={props.svgWidth}/>
        )
    } */
}

export default ProductThumbNail;