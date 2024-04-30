import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Validate from '../../../helpers/Validate';
import LiveTrackingPopOver from '../MartCatalog/MartHome/LiveTrackingPopOver';
import UpcomingConsulationIcon from "../../../images/common/Upcoming_Consultation_44px.svg"
import { myAccountCards } from '../../../Analytics/Analytics';

const CustomerAccountCard = (props) => {

    const [showLiveTrackingPopup, setShowLiveTrackingPopup] = useState(false);

    const handleClick = (e) =>  {
        myAccountCards(props.title)
        if(Validate().isNotEmpty(props.redirectTo) && props.redirectTo.includes("/orderDetails/")) {
            e.preventDefault();
            setShowLiveTrackingPopup(!showLiveTrackingPopup);
        } else if (Validate().isNotEmpty(props.redirectTo) && props.redirectTo.includes("/retryPayment/")) {
            e.preventDefault();
            window.location.href = props.redirectTo;
        }
    }

    const handleError = (e) => {
        e.preventDefault();
        if(e.target.alt === "Upcoming Consultation") {
            e.target.src = UpcomingConsulationIcon
        }
    }

    return (
        <div className="home-page-title">
            <Link className='text-decoration-none' to={props.redirectTo} title = {props.title} onClick = {handleClick} role="link">
                <div className="test-card card" style={{'minHeight':'unset'}}>
                    <div className="card-body p-3"><div className="d-flex justify-content-between">
                        <div className="align align-items-center d-flex" role="button">
                            <span className="mr-3"><img src={props.imagePath} alt={props.title} role="img" width='44' height='44' onError={handleError}/></span><div>
                                <h6 className="font-14 title mb-1">{props.title}</h6>
                                <p className="text-secondary mb-0 font-12">{props.description}</p>
                            </div>
                        </div>
                        <div className="my-auto"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g id="rightchevron_black_icon_24px" transform="translate(-906.838 786) rotate(-90)"><rect id="Rectangle_4721" data-name="Rectangle 4721" width="24" height="24" transform="translate(762 906.838)" fill="none"></rect><path id="Path_23400" data-name="Path 23400" d="M63.432,503.859l5.4-5.4a1.223,1.223,0,0,0-1.73-1.73l-4.533,4.52-4.533-4.533a1.228,1.228,0,0,0-2.092.865,1.216,1.216,0,0,0,.363.865l5.4,5.411A1.229,1.229,0,0,0,63.432,503.859Z" transform="translate(711.356 418.584)" fill="#080808"></path></g></svg></div>
                    </div>
                    </div>
                </div>
            </Link>
            {showLiveTrackingPopup && <LiveTrackingPopOver showLiveTrackingPopup = {showLiveTrackingPopup} setShowLiveTrackingPopup = {setShowLiveTrackingPopup} />}
        </div>
    );
}

export default CustomerAccountCard;
