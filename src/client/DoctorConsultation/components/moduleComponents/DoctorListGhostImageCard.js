import React from 'react';

function DoctorListGhostImageCard(props) {
    return (
            <div className="card">
            <div className="card-body p-3">
                <div className="d-flex align-items-center mb-3">
                    <div className="consultaion-appointment">
                        <div className="ph-item m-0 p-0 border-0">
                        <div className="ph-col-12 p-0">
                            <div className="ph-picture rounded-circle mb-0" style={{"height": "4rem", "width":"4rem"}}></div>
                        </div>
                        </div>
                    </div>
                    <div className="">
                        <div className="ph-item m-0 p-0 border-0">
                        <div className="px-0">
                            <div className="ph-row p-0 mb-0">
                                <div className="ph-col-12 mb-3"></div>
                                <div className="ph-col-12 mb-3"></div>
                                <div className="ph-col-12 mb-0"></div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="ph-item m-0 p-0 border-0">
                    <div className="px-0">
                        <div className="ph-row p-0 mb-0">
                        <div className="ph-col-2 mb-4"></div>
                        <div className="ph-col-2 empty mb-4"></div>
                        <div className="ph-col-6 mb-4"></div>
                        <div className="ph-col-2 mb-4 empty"></div>
                        <div className="ph-col-4 mb-3"></div>
                        <div className="ph-col-8 empty mb-3"></div>
                        <div className="ph-col-6 mb-3"></div>
                        <div className="ph-col-6 mb-3 empty"></div>
                        <div className="ph-col-10 mb-0"></div>
                        <div className="ph-col-2 mb-0 empty"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-footer bg-white px-0">
                <div className="ph-item m-0 p-0 border-0">
                    <div className="ph-col-12 p-0">
                        <div className="ph-row p-0 m-2">
                        <div className="ph-col-4 mb-0" style={{"height":"2.5rem"}}></div>
                        <div className="ph-col-4 mb-0 empty"></div>
                        <div className="ph-col-4 mb-0 rounded-pill" style={{"height":"2.5rem"}}></div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
    );
}

export default DoctorListGhostImageCard;