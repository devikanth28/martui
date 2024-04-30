import React from 'react';
import { ModalBody, ModalFooter } from 'reactstrap';
import CircleIcon from '../../images/common/info-circle-icn.png';

const CommunityAddress = () => {
    return (
        <React.Fragment>
        <ModalBody className="pt-0">
        <address className="active">
            <p className="title">
                <strong id="communityName">Betop Madhu Malancha</strong>
            </p>
            <p className="title">
               Address:
                <small>
                    Sy No.80 to 84, Near Ratnadeep Supermarket, Patrika Nagar, Madhapur
                </small>
            </p>
            <p className="title">
            	Drop off point:
					<small>Daily 7pm At Security Main Gate</small>
            </p>
            <div className="container text-right">
               <button type="button" className="brand-secondary btn px-5 rounded-pill">Cancel</button>
               <button type="submit" className="btn btn-brand px-5">Continue</button>
            </div>
        </address>
        </ModalBody>
        <ModalFooter className="general-note">
            <img src={CircleIcon} alt="Note" />
            <ul>
                <li>Selection of service locality / pincode is required to place an order. Our Default locality is Balanagar, Hyderabad.</li>
            </ul>
        </ModalFooter>
        </React.Fragment>
    )
}

export default CommunityAddress