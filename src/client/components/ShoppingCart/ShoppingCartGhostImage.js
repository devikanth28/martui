import React from 'react';

const ShoppingCartGhostImage = (props) => {

    return (
        <React.Fragment>
            {props.isCartProductsLoading &&
                <React.Fragment>
                    <div className="col-8 pl-0 pr-2">

                    {props.isLabsCart && <React.Fragment><div className="labs-patient-info">
                            <div className="each-info">
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
                                    <div className="lab-patient-card">
                                        <div className="ph-item p-0 m-0 pt-3">
                                            <div className="ph-row d-block">
                                                <div className="ph-col-4"></div>
                                                <div className="ph-col-2"></div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                            <div className="each-info">
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
                                    <div className="px-3 pb-3 pt-2">
                                        <div className="ph-item p-0 m-0 pt-3">
                                            <div className="ph-row d-block">
                                                <div className="ph-col-12"></div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div> 


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
                            <div className="d-flex justify-content-between px-3 pb-3 pt-2">
                                <div className="w-100">
                                    <div className="ph-item p-0 m-0 pt-3">
                                        <div className="ph-row d-block">
                                            <div className="ph-col-4"></div>
                                            <div className="ph-col-2"></div>
                                        </div>
                                    </div>

                                </div>
                                <div className="w-100">
                                    <div className="ph-item p-0 m-0 pt-3">
                                        <div className="ph-row d-block">
                                            <div className="ph-col-4"></div>
                                            <div className="ph-col-2"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section> </React.Fragment> }

                        <section>
                            <div className="header d-block mb-0">
                                <div className="ph-item m-0 p-0 border-0">
                                    <div className="ph-col-12 p-0">
                                        <div className="ph-row p-0 m-3">
                                            <div className="ph-col-4 mb-0"></div>
                                            <div className="ph-col-6 empty mb-0"></div>
                                            <div className="ph-col-2 mb-0"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="ph-item mb-0">
                                <div className="ph-col-1 p-0">
                                    <div className="ph-picture"></div>
                                </div>
                                <div>
                                    <div className="ph-row">
                                        <div className="ph-col-4"></div>
                                        <div className="ph-col-6 empty"></div>
                                        <div className="ph-col-2"></div>
                                        <div className="ph-col-6"></div>
                                        <div className="ph-col-6 empty"></div>
                                        <div className="ph-col-2"></div>
                                        <div className="ph-col-10 empty"></div>
                                        <div className="ph-col-6"></div>
                                        <div className="ph-col-6 empty"></div>
                                        <div className="ph-col-2"></div>
                                        <div className="ph-col-10 empty"></div>
                                        <div className="ph-col-8"></div>
                                        <div className="ph-col-2 empty"></div>
                                        <div className="ph-col-2 "></div>
                                    </div>
                                </div>
                            </div>
                            <div className="ph-item rounded-xl">
                                <div className="ph-col-1 p-0">
                                    <div className="ph-picture"></div>
                                </div>
                                <div>
                                    <div className="ph-row">
                                        <div className="ph-col-4"></div>
                                        <div className="ph-col-6 empty"></div>
                                        <div className="ph-col-2"></div>
                                        <div className="ph-col-6"></div>
                                        <div className="ph-col-6 empty"></div>
                                        <div className="ph-col-2"></div>
                                        <div className="ph-col-10 empty"></div>
                                        <div className="ph-col-6"></div>
                                        <div className="ph-col-6 empty"></div>
                                        <div className="ph-col-2"></div>
                                        <div className="ph-col-10 empty"></div>
                                        <div className="ph-col-8"></div>
                                        <div className="ph-col-2 empty"></div>
                                        <div className="ph-col-2 "></div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                    <div className="col-4 pl-2 pr-0">
                    {props.isLabsCart && <React.Fragment>
                        <div className="ph-item p-0 m-0 mb-3">
                            <div className="ph-col-12 p-0">
                                <div className="ph-picture m-0" style={{ "height": "12rem" }}></div>
                            </div>
                        </div>
                    </React.Fragment>}
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
                            <div className="ph-item rounded-xl">
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
                    </div>
                </React.Fragment>
            }
        </React.Fragment>
    );
}

export default ShoppingCartGhostImage;