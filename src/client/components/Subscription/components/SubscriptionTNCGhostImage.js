import React from 'react';
const SubscriptionTNCGhostImage = () => {
    return (
        <section>
            <div className="subscription-terms">
                <div className="mb-4 pb-2">
                    <div className="p-0 ph-item m-0">
                        <div className="px-0">
                            <div className="ph-row p-0 m-0">
                                <div className="ph-col-4" style={{ "height": "1.5rem" }}></div>
                                <div className="ph-col-8 empty" style={{ "height": "1.5rem" }}></div>
                                <div className="ph-col-12 mb-2" style={{ "height": "1rem" }}> </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="subs-terms-container">
                    <div>
                        <div className="p-0 ph-item m-0">
                            <div className="ph-col-12 p-0 m-0">
                                {[1, 2, 3, 4, 5, 6].map(() => {
                                    return (
                                        <div className="ph-row p-0">
                                            <div className="mb-3 ph-col-8" style={{ "height": "1.125rem" }}></div>
                                            <div className="mb-2 ph-col-12"></div>
                                            <div className="mb-2 ph-col-12"></div>
                                            <div className="mb-2 ph-col-12"></div>
                                            <div className="mb-2 ph-col-12"></div>
                                            <div className="ph-col-4"></div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SubscriptionTNCGhostImage;