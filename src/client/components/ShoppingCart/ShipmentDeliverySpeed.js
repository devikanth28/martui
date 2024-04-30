import React from 'react';
const ShipmentDeliverySpeed =(props) =>{

    const handleShipmentDeliverySpeedChange = (event) => {
        if(props.selectedShipmentDeliverySpeed != event.target.id) {
            props.setShipmentDeliverySpeed(event.target.id);
        }
    }

    return(
        <section>
            <div className="header">
                <p>Choose a Delivery Speed</p>
            </div>
            <div className="d-flex justify-content-between px-3 pb-3">
                <div className="w-100">
                    <div className="custom-control custom-radio">
                        <input type="radio" id="multipleShipments" className="custom-control-input" checked={props.selectedShipmentDeliverySpeed =='multipleShipments'} onChange={event => handleShipmentDeliverySpeedChange(event)}/>
                        <label className="custom-control-label pl-2 pointer" htmlFor="multipleShipments">
                            <p className="font-weight-bold mb-0 font-14">Multiple Shipments</p>
                            {props.hubServingItemCount && props.multipleShipmentServingStoreId &&
                            <small> {props.hubServingItemCount} item(s) -- {props.shoppingCartETA[props.hubId]}.<br/>
                            Remaining products -- {props.shoppingCartETA[props.multipleShipmentServingStoreId]}.
                                {/* <span className="d-block text-secondary">Get your orders in multiple packs. Some orders arrive a day after</span> */}
                            </small>
                            }
                        </label>
                    </div>
                </div>
                <div className="w-100">
                    <div className="custom-control custom-radio">
                        <input type="radio" id="singleShipments" className="custom-control-input" checked={props.selectedShipmentDeliverySpeed == 'singleShipments'} onChange={event => handleShipmentDeliverySpeedChange(event)}/>
                        <label className="custom-control-label pl-2 pointer" htmlFor="singleShipments">
                            <p className="font-weight-bold mb-0 font-14">Single Shipment</p>
                            <small><span className="d-block text-secondary">Get all your products -- <span className="ml-1 text-dark">{props.shoppingCartETA[props.multipleShipmentServingStoreId]}</span></span></small>
                        </label>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default ShipmentDeliverySpeed;