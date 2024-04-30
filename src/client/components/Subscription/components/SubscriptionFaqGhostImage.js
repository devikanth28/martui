import React from "react";
const SubscriptionFaqGhostImage = () => {
    return (
        <section className="frequently-asked-container">
            <div className="faq-content">
                <div className="ph-item p-0">
                    <div className="ph-col-12 p-0">
                        <div className="ph-row">
                            <div className="ph-col-2 mb-3" style={{ "height": "2rem" }}></div>
                        </div>
                        <div className="ph-row">
                            <div className="ph-col-12 mb-3"></div>
                            <div className="ph-col-4"></div>
                        </div>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(() => {
                            return (
                                <div className="ph-row">
                                    <div className="ph-col-4 mb-4"></div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className="d-inline-block">
                <div className="m-0 p-0 ph-item" style={{ "background-color": "unset" }}>
                    <div className="ph-col-12 p-0">
                        <div className="ph-row p-0 mb-0">
                            <div className="ph-picture m-0" style={{ "height": "21.875rem", "width": "21.875rem" }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default SubscriptionFaqGhostImage;