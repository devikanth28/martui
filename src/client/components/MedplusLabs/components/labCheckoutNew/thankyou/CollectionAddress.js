import React from 'react';
import Validate from '../../../../../helpers/Validate';
import ShowPickUpStore from '../../../../Common/ShowPickUpStore';
import PatientAddress from '../../../../Labs/Common/PatientAddress';
import SlotDetails from '../../Common/SlotDetails';

const SlotCollectionDeliveryReportDetails = (props) => {


  const validate = Validate();
  const labAddress = props.labAddress;
  const homeAddress = props.homeAddress;
  const deliveryAddress = props.deliveryAddress;
  const slot = props.slot;

  return (<React.Fragment>
    <div className="d-flex flex-wrap w-100">
      <div className="patient-addresses mt-4 w-100">
        <div className="card pt-4 w-100">
          {validate.isNotEmpty(deliveryAddress) ?
          <h6 className="legend-title">Scheduled Slot, Collection &amp; Delivery Report Details</h6> :
          <h6 className="legend-title">Scheduled Slot &amp; Collection Details</h6>}
          <div className="d-flex">
            {validate.isNotEmpty(labAddress) &&
              <div className="each-address w-100">
                <div class="col px-0 mb-3">
                  <SlotDetails excludeLable={true} date={slot.date} slotDisplayName={slot.labTimeSlot.displayName} />
                </div>
                <ShowPickUpStore
                  isLab={true}
                  pickStoreName={labAddress.name}
                  pickUpAddress={labAddress.address}
                  locationLatLong={labAddress.locationLatLong}
                  phoneNumber={labAddress.phoneNumber}
                  isSmallAddressRequired={true} excludeBodyClass={true} />
              </div>}
            {validate.isNotEmpty(homeAddress) &&
              <div className="each-address">
              <div class="col px-0 mb-3">
                <SlotDetails excludeLable={true} date={slot.date} slotDisplayName={slot.labTimeSlot.displayName} />
              </div>
                <PatientAddress isLab={true} isHeaderRequired={false}
                  firstName={homeAddress.firstName}
                  lastName={homeAddress.lastName}
                  address1={homeAddress.addressLine1}
                  address2={homeAddress.addressLine2}
                  city={homeAddress.city}
                  state={homeAddress.state}
                  pinCode={homeAddress.pincode}
                  mobile={homeAddress.mobileNo}
                  locationConfigId={homeAddress.locationConfigId} />
              </div>}
            {validate.isNotEmpty(deliveryAddress) &&
              <div className="each-address">
                <PatientAddress isLab={true} isHeaderRequired={false}
                  firstName={deliveryAddress.firstName}
                  lastName={deliveryAddress.lastName}
                  address1={deliveryAddress.addressLine1}
                  address2={deliveryAddress.addressLine2}
                  city={deliveryAddress.city}
                  state={deliveryAddress.state}
                  pinCode={deliveryAddress.pincode}
                  mobile={deliveryAddress.mobileNo}
                  locationConfigId={deliveryAddress.locationConfigId} />
              </div>}
          </div>
        </div>
      </div>
    </div>
  </React.Fragment>);
}

export default SlotCollectionDeliveryReportDetails;