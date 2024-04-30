import React from 'react';

const PrescriptionGhostImage = (props) => {
    return (
        <React.Fragment>
            <div className="col-5 pr-2 py-3 pl-0">
                <div className="ml-3">
                    <div className="ph-item border mb-3 rounded-xl">
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
                            </div>
                        </div>
                    </div>
                    <div className="ph-item border mb-3 rounded-xl">
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
                            </div>
                        </div>
                    </div>
                    {!props.showOnlyTwo && <div className="ph-item border mb-3 rounded-xl">
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
                            </div>
                        </div>
                    </div>}
                </div>
            </div>
            <div className="col-1 p-0"></div>
            {!props.showOnlyTwo && <div className="col-5 p-0 pr-2 py-3">
                <div className="ph-item border mb-3 rounded-xl">
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
                        </div>
                    </div>
                </div>
            </div>}
        </React.Fragment>
    )
}

export default PrescriptionGhostImage;