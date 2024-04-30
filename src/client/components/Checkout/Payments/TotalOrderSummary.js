import React from 'react';

const TotalOrderSummary = (props)=>{
    return (
        <React.Fragment>
            <section className="cart-summary">
                <div className="body mt-2">
                    <p className="title-block">Order Total 
                        <span className="text-secondary">(Order 1 + Order 2)</span>
                    </p>
                    <p>
                        <span>Total Order MRP</span>
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
                            - <strong className="rupee">&#x20B9;</strong> 100
                        </span>
                    </p>
                </div>
                <div className="footer border-top font-lg">
                    <span>Total Amount to be Paid</span>
                    <span>
                        <strong className="rupee">&#x20B9;</strong> 1000.00
                    </span>
                </div>
            </section>
        </React.Fragment>
    )
}

export default TotalOrderSummary