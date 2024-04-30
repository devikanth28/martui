import React from 'react';

const DeliveryGhostImages = (props)=>{
    return (
        <React.Fragment>
            {props.homeDeliveryLoader &&
            <div className="col-4 pr-3">  
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
            </div>}
            {props.storePickUpLoader && 
            <div className="col-8 pl-0 pr-2">
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
                    <div className="payment-options">
                        <div className="ph-item mb-0 border-0">
                            <div className="ph-row">
                                <div className="ph-col-12 "></div>
                            </div>
                        </div>
                        <ul>
                        <li>
                            <div className="p-1 rounded-xl select-payment-container">
                                <div className="ph-item mb-0">
                                    <div>
                                    <div className="ph-row">
                                        <div className="ph-col-4"></div>
                                        <div className="ph-col-6 empty"></div>
                                        <div className="ph-col-2"></div>
                                        <div className="ph-col-6"></div>
                                        <div className="ph-col-6 empty"></div>
                                        <div className="ph-col-12 "></div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="p-1 rounded-xl select-payment-container">
                                <div className="ph-item mb-0">
                                    <div>
                                    <div className="ph-row">
                                        <div className="ph-col-4"></div>
                                        <div className="ph-col-6 empty"></div>
                                        <div className="ph-col-2"></div>
                                        <div className="ph-col-6"></div>
                                        <div className="ph-col-6 empty"></div>
                                        <div className="ph-col-12 "></div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="p-1 rounded-xl select-payment-container">
                                <div className="ph-item mb-0">
                                    <div>
                                    <div className="ph-row">
                                        <div className="ph-col-4"></div>
                                        <div className="ph-col-6 empty"></div>
                                        <div className="ph-col-2"></div>
                                        <div className="ph-col-6"></div>
                                        <div className="ph-col-6 empty"></div>
                                        <div className="ph-col-12 "></div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="p-1 rounded-xl select-payment-container">
                                <div className="ph-item mb-0">
                                    <div>
                                    <div className="ph-row">
                                        <div className="ph-col-4"></div>
                                        <div className="ph-col-6 empty"></div>
                                        <div className="ph-col-2"></div>
                                        <div className="ph-col-6"></div>
                                        <div className="ph-col-6 empty"></div>
                                        <div className="ph-col-12 "></div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        </ul>
                    </div>
                </section>
            </div>}
            {props.individualLoader && 
            <div className="col-12 pl-0 pr-2 ">
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
                    <div className="payment-options">
                        <div className="ph-item mb-0 border-0">
                            <div className="ph-row">
                                <div className="ph-col-12 "></div>
                            </div>
                        </div>
                        <ul style={{"columnCount":"3"}}>
                            <li>
                                <div className="p-1 rounded-xl select-payment-container">
                                    <div className="ph-item mb-0">
                                        <div>
                                        <div className="ph-row">
                                            <div className="ph-col-4"></div>
                                            <div className="ph-col-6 empty"></div>
                                            <div className="ph-col-2"></div>
                                            <div className="ph-col-6"></div>
                                            <div className="ph-col-6 empty"></div>
                                            <div className="ph-col-12 "></div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="p-1 rounded-xl select-payment-container">
                                    <div className="ph-item mb-0">
                                        <div>
                                        <div className="ph-row">
                                            <div className="ph-col-4"></div>
                                            <div className="ph-col-6 empty"></div>
                                            <div className="ph-col-2"></div>
                                            <div className="ph-col-6"></div>
                                            <div className="ph-col-6 empty"></div>
                                            <div className="ph-col-12 "></div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="p-1 rounded-xl select-payment-container">
                                    <div className="ph-item mb-0">
                                        <div>
                                        <div className="ph-row">
                                            <div className="ph-col-4"></div>
                                            <div className="ph-col-6 empty"></div>
                                            <div className="ph-col-2"></div>
                                            <div className="ph-col-6"></div>
                                            <div className="ph-col-6 empty"></div>
                                            <div className="ph-col-12 "></div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="p-1 rounded-xl select-payment-container">
                                    <div className="ph-item mb-0">
                                        <div>
                                        <div className="ph-row">
                                            <div className="ph-col-4"></div>
                                            <div className="ph-col-6 empty"></div>
                                            <div className="ph-col-2"></div>
                                            <div className="ph-col-6"></div>
                                            <div className="ph-col-6 empty"></div>
                                            <div className="ph-col-12 "></div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="p-1 rounded-xl select-payment-container">
                                    <div className="ph-item mb-0">
                                        <div>
                                        <div className="ph-row">
                                            <div className="ph-col-4"></div>
                                            <div className="ph-col-6 empty"></div>
                                            <div className="ph-col-2"></div>
                                            <div className="ph-col-6"></div>
                                            <div className="ph-col-6 empty"></div>
                                            <div className="ph-col-12 "></div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="p-1 rounded-xl select-payment-container">
                                    <div className="ph-item mb-0">
                                        <div>
                                        <div className="ph-row">
                                            <div className="ph-col-4"></div>
                                            <div className="ph-col-6 empty"></div>
                                            <div className="ph-col-2"></div>
                                            <div className="ph-col-6"></div>
                                            <div className="ph-col-6 empty"></div>
                                            <div className="ph-col-12 "></div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </section>
            </div>}
        </React.Fragment>
    )
}
export default DeliveryGhostImages;