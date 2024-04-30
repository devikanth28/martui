import React from 'react';

function DoctorThankYouHeader(props) {
    return (
        <React.Fragment>
            <div className="status-container awaited">
                <span></span>
                <h2>Awaiting Payment</h2>
                <p>Order will be confirmed once payment is successful</p>
            </div>
            {/* <div className="status-container success">
                <span></span>
                <h2>Thank You..!</h2>
                <p>Your order is being processed</p>
            </div> */}
        </React.Fragment>
    );
}

export default DoctorThankYouHeader;