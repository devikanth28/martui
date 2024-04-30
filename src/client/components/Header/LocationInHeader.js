import React, { useState } from 'react';
import { Tooltip } from 'reactstrap';
import Validate from '../../helpers/Validate';
import LocationIco from '../../images/common/location-icn.png';
import LocalityService from '../../services/LocalityService';
import ChangeLocality from '../Locality/ChangeLocality';

const LocationInHeader = (props) =>{
    const validate = Validate();
    let selectedLocality = props.selectedLocality;
    const [localitionTitle, setLocalitionTitle] = useState(false);
    const [isLocalityModalOpen, setLocalityModalOpen] = useState(false);
    let localityAvailability = '';
    let routePath = props.routePath ? props.routePath : '' ;

    const toggleLocaltionTitle = () => setLocalitionTitle(!localitionTitle);
    //const localityModalToggle = () => setLocalityModalOpen(!isLocalityModalOpen);

    const localityModalToggle = () => { setLocalityModalOpen(!isLocalityModalOpen); }

    if(validate.isNotEmpty(selectedLocality)) {
        if (props.isLabPage) {
            if (selectedLocality.collectionCenterId) {
                if (selectedLocality.sampleCollectionAllowed === "A" || selectedLocality.sampleCollectionAllowed === 'H') {
                    localityAvailability = <small>Home Sample Collection Available</small>;
                } else {
                    localityAvailability = <small>Service Available</small>;
                }
            } else {
                localityAvailability = <small>No Service Available</small>;
            }
        }
        else {
            if ("C" === selectedLocality.configType) {
                localityAvailability = <small>Drop Off Point: {selectedLocality.dropOffPoint}</small>;
            } else if (selectedLocality.homeDeliveryAllowed && selectedLocality.storePickupAvailable) {
                localityAvailability = <small>Home Delivery & Store Pickup Available</small>;
            } else if (selectedLocality.homeDeliveryAllowed && !selectedLocality.storePickupAvailable) {
                localityAvailability = <small>Home Delivery Available</small>;
            } else if (!selectedLocality.homeDeliveryAllowed && selectedLocality.storePickupAvailable) {
                localityAvailability = <small>Store Pickup Available</small>;
            } else {
                localityAvailability = <small>No Service Available</small>;
            }
        }
    }
return (
    <React.Fragment>
        <div className="col-4">
            <div className="location">
                <h6 className="m-0">
                    <img className="mr-3" src={LocationIco} alt="Location Icon" height="34" title="" />
                    <div className="mr-3 text-truncate" id="locationTooltip">
                        {/* <small>Your current location is</small><br/> */}
                        {selectedLocality && selectedLocality.combination}<br />
                        {!props.isDoctorPage && localityAvailability}
                        <Tooltip placement="bottom" isOpen={localitionTitle} target="locationTooltip" toggle={toggleLocaltionTitle}>
                            {selectedLocality && selectedLocality.combination}
                        </Tooltip>
                    </div>
                    {(('shoppingCart' == routePath) || ('schedule-consultation' == routePath) || ('lab-shopping-cart' == routePath) )&& <button type="button" className="btn brand-secondary btn-sm px-4 rounded-pill" data-toggle="modal" data-target="#address-change" onClick={() => { localityModalToggle() }}>Change</button>}
                </h6>
            </div>
        </div>
        {validate.isNotEmpty(selectedLocality) && <ChangeLocality modal={isLocalityModalOpen} toggle={localityModalToggle} selectedLocality={selectedLocality} />}
    </React.Fragment>
)
}
export default LocationInHeader;