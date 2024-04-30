import React from "react";

const PromotionalBannersGhostImage = () => {
    return (
        <React.Fragment>
            <section className="categories mt-5">
                <div className="container-fluid">
                    <div className="mb-2">
                        <div className="ph-row ph-item mb-0 pb-0 pl-0">
                            <div className="ph-col-2" style={{ height: "1.5rem" }} />
                            <div className="ph-col-8 empty"></div>
                            <div className="ml-auto ph-col-1 mb-2" style={{ height: "2rem" }} />
                        </div>
                    </div>
                    <div className="clearfix"></div>
                    <div className="promotions">
                        {[1,2,3,4,5].map(() => {
                            return (
                                <div className="itemcard">
                                    <div className="ph-picture ph-item" style={{ height: "17.4rem" }} />
                                    <div className="footer-offer">
                                        <div className="ph-row ph-item p-0">
                                            <div className="ml-3 ph-col-4" style={{ height: "1.5rem" }} />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
};

export default PromotionalBannersGhostImage;
