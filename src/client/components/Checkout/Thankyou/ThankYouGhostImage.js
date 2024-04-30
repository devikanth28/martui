import React from 'react';

const ThankYouGhostImage = (props) => {

    return (
        <React.Fragment>
            {props.isThankYouLoading && 
                <React.Fragment>
                     <div className="row">
                        <div className={props.isRefillHeader ? "col-8 pl-0 pr-2" : "col-8 pl-0 pr-2 mx-auto"}>
                            <section>
                                <div className="header d-block mb-0">
                                    <div className="ph-item m-0 p-0 border-0">
                                        <div className="ph-col-12 p-0">
                                        <div className="ph-row p-0 m-3">
                                            <div className="ph-col-4 empty "></div>
                                            <div className="ph-col-4  "></div>
                                            <div className="ph-col-4 empty"></div>
                                            
                                            <div className="ph-col-12  "></div>
                                        </div>
                                        
                                        </div>
                                    </div>
                                </div>
                                <div className="row no-gutters">
                                    <div className="col-6 mt-4 pl-3">
                                    <div className="card order-summary p-0">
                                        <div className="ph-item mb-0">
                                                <div>
                                                    <div className="ph-row">
                                                    <div className="ph-col-4"></div>
                                                    <div className="ph-col-6 empty"></div>
                                                    <div className="ph-col-2"></div>
                                                    <div className="ph-col-6"></div>
                                                    <div className="ph-col-6 empty"></div>
                                                    <div className="ph-col-12 "></div>
                                                        <div className="ph-col-6 empty"></div>
                                                    <div className="ph-col-12 "></div>
                                                    </div>
                                                </div>
                                            </div>
                                    </div>
                                    </div>
                                    <div className="col-6 mt-4 px-3">
                                    <div className="card order-summary p-0">
                                        <div className="ph-item mb-0">
                                                <div>
                                                    <div className="ph-row">
                                                    <div className="ph-col-4"></div>
                                                    <div className="ph-col-6 empty"></div>
                                                    <div className="ph-col-2"></div>
                                                    <div className="ph-col-6"></div>
                                                    <div className="ph-col-6 empty"></div>
                                                    <div className="ph-col-12 "></div>
                                                        <div className="ph-col-6 empty"></div>
                                                    <div className="ph-col-12 "></div>
                                                    </div>
                                                </div>
                                            </div>
                                    </div>
                                    </div>
                                    <div className="col-12 mt-4">
                                    <div className="card m-3 p-0">
                                        <div className="ph-item mb-0">
                                                <div>
                                                    <div className="ph-row">
                                                    <div className="ph-col-12 "></div>
                                                    <div className="ph-col-12 "></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                            <div className="card m-3 p-0">
                                            <div className="ph-item mb-0">
                                                    <div>
                                                        <div className="ph-row">
                                                        <div className="ph-col-12 "></div>
                                                        <div className="ph-col-12 "></div>
                                                        </div>
                                                    </div>
                                                </div>
                                        </div>
                                        </div>
                                </div>
                            </section>
                            </div>
                          {props.isRefillHeader &&  <div className="col-4 pl-2 pr-0">
                            <section>
                                <div className="header d-block mb-0">
                                    <div className="ph-item m-0 p-0 border-0">
                                        <div className="ph-col-12 p-0">
                                        <div className="ph-row p-0 m-3">
                                            <div className="ph-col-4 mb-0"></div>
                                            <div className="ph-col-6 empty mb-0"></div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="ph-item mb-0">
                                    <div>
                                        <div className="ph-row">
                                        <div className="ph-col-4"></div>
                                        <div className="ph-col-6 empty"></div>
                                        <div className="ph-col-6"></div>
                                        <div className="ph-col-6 empty"></div>
                                        <div className="ph-col-12 "></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="ph-item mb-0">
                                    <div>
                                        <div className="ph-row">
                                        <div className="ph-col-4"></div>
                                        <div className="ph-col-6 empty"></div>
                                        <div className="ph-col-6"></div>
                                        <div className="ph-col-6 empty"></div>
                                        <div className="ph-col-12 "></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="ph-item">
                                    <div>
                                        <div className="ph-row">
                                        <div className="ph-col-4"></div>
                                        <div className="ph-col-6 empty"></div>
                                        <div className="ph-col-6"></div>
                                        <div className="ph-col-6 empty"></div>
                                        <div className="ph-col-12 "></div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>}
                    </div>
                </React.Fragment>
            }
        </React.Fragment>
            
    );
}

export default ThankYouGhostImage;