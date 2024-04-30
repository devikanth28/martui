
import React from 'react';

const OrderSummary = (props)=>{
    return (
        <React.Fragment>
            <div className="body">
                <p className="title">Order 1</p>
                <p>
                    <span>No. Of Items</span>
                    <span>02</span>
                </p>
                <p>
                    <span>MRP Total</span>
                    <span>
                        <strong className="rupee">&#x20B9;</strong> 250.34
                    </span>
                </p>
                <p>
                    <span>Delivery Charges</span>
                    <span>
                        <strong className="rupee">&#x20B9;</strong> 100
                    </span>
                </p>
                <p className="text-success">
                    <span>Total Amount Saved</span>
                    <span>
                        <strong className="rupee">&#x20B9;</strong> 100
                    </span>
                </p>
            </div>
        </React.Fragment>
    )
}

export default OrderSummary