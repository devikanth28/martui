import React from 'react';

const DeliveryDetail = (props)=>{
    return (
        <React.Fragment>
            <section className="delivery-detail">
                <div className="header">
                    <p>Delivery Detail</p>	<span className="badge-title success right">Home Delivery</span>
                </div>
                <div className="body">
                    <p>MEDPLUS MART MADHAPUR</p>
                    <small>
                    Sy No.80 to 84, Near Ratnadeep Supermarket, Patrika Nagar, Madhapur, Hyderabad, Telangana 500081
                    </small>
                </div>
            </section>
        </React.Fragment>
    )
}

export default DeliveryDetail