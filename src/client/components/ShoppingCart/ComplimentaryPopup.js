import React from "react";
import CONFIG from '../../constants/ServerConfig';
import BoxCap from '../../images/common/compliment-box-cap.svg';
import Flakes from '../../images/common/compliment-flakes.svg';
import Spiral from '../../images/common/compliment-spiral.svg';
import boxAnimation from '../../images/common/gift-boxs-animation.gif';
import Validate from '../../helpers/Validate';

const ComplimentaryPopup = (props) => {
    const validate = Validate();

    return(
        <React.Fragment>
        {props.isComplimentaryPopupOpen && validate.isNotEmpty(props.complimentaryCartItem) &&
            <div className="complimentary-popup-container">
                <div className="complimentary-popup">
                    <img src={Spiral} className="spiral-icon" alt="complimentary spiral icon" title="complimentary spiral icon" />
                    <img src={BoxCap} className="hat-icon" alt="complimentary cap icon" title="complimentary cap icon" />
                    <img src={Flakes} className="flakes-icon" alt="complimentary flakes icon" title="complimentary flakes icon" />
                    <h6>Congratulations, <br/><span>You've Earned</span></h6>
                    {(parseFloat(props.complimentaryCartItem.discountPercentage) >= 100) &&
                        <p> FREE <small> item </small></p>
                    }
                    {(parseFloat(props.complimentaryCartItem.discountPercentage) < 100) &&
                        <p>{"Flat "+ parseFloat(props.complimentaryCartItem.discountPercentage).toFixed(0) +"% OFF "}<small>on</small></p>
                    }
                    <a className="product-link" title={props.complimentaryCartItem.productName}>{props.complimentaryCartItem.productName}</a>
                    <img src={boxAnimation} className="box-animation-icon" alt="box animation" title="box animation" />
                    <a className="close-btn pointer" onClick= { () => props.setComplimentaryPopupOpen(false)} title="close">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24.957" height="24.957" viewBox="0 0 24.957 24.957">
                            <rect fill="none" width="24.957" height="24.957"/>
                            <path fill="#fff" d="M12.478,0A12.478,12.478,0,1,0,24.957,12.478,12.493,12.493,0,0,0,12.478,0Zm5.047,16.055a.52.52,0,0,1,0,.735l-.735.735a.52.52,0,0,1-.735,0l-3.576-3.576L8.9,17.525a.52.52,0,0,1-.735,0l-.735-.735a.52.52,0,0,1,0-.735l3.576-3.577L7.431,8.9a.52.52,0,0,1,0-.735l.735-.735a.52.52,0,0,1,.735,0l3.576,3.576,3.576-3.576a.52.52,0,0,1,.735,0l.735.735a.52.52,0,0,1,0,.735l-3.576,3.576Z"/>
                        </svg>
                    </a>
                </div>
            </div>
        }
        </React.Fragment>
    )
}

export default ComplimentaryPopup;