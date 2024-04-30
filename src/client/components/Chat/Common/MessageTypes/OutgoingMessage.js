import React, { useState, useEffect } from "react";
import ReactHtmlParser from 'react-html-parser';
import Lightbox from '../../../../lib/image-lightbox/index';
import "../../css/OutgoingMessage.css";
import DefaultBanner from '../../images/image-load.gif';

/**
 * Functional component for Message
 * @param {*} props
 */

const OutgoingMessage = (props) => {
    const dialogue = (
        <div className="section_outgoing">
            <div className="message outgoing">
                {props.text && <p>{ReactHtmlParser(props.text)}</p>}
                {props.image && <Images image={props.image} />}
                <span className="time-stamp">{props.time}</span>
            </div>
        </div>
    );
    return dialogue;
}

/**
 * Functional component for showing images
 * @param {*} props 
 */
const Images = (props) => {
    const [imgPath, setImgPath] = useState();
    const [tempImgPath, setTempImgPath] = useState();
    useEffect(() => {
        if (props.image) {
            setTempImgPath(props.image.imagePath);
            setImgPath(props.image.imagePath);
        }
    }, []);
    const handleImageLoadError = () => {
        setImgPath(DefaultBanner);
        setTimeout(() => {
            setImgPath(tempImgPath);
        }, 5000);
    }
    const [showPopUpImage, setShowPopUpImage] = useState(false);
    const handlePopUp = () => {
        setShowPopUpImage(showPopUpImage => !showPopUpImage);
    }

    return <React.Fragment>
            {window.parent.location.href.includes("orderDetails") && showPopUpImage && props.image.imagePath && <Lightbox
                mainSrc={imgPath}
                nextSrc={false}
                prevSrc={false}
                onCloseRequest={() => handlePopUp()}
            />}{props.image.imagePath ? <img src={imgPath ? imgPath : DefaultBanner} alt={props.image.originalImageName} onError={() => handleImageLoadError()} onClick={() => {
                if(window.parent.location.href.includes("orderDetails")){
                    return handlePopUp();
                } else {
                    return window.top.open(imgPath, '_blank');
                }
            } } /> : <p>{props.image.originalImageName}</p>}</React.Fragment>;
}

export default OutgoingMessage;