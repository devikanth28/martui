import React from 'react';
import DoctorListGhostImageCard from "./DoctorListGhostImageCard"

function DoctorListGhostImage(props) {
    return (
            <div>
                <div className="mb-4" style={{"width" : "15%"}}>
                    <div className="ph-item m-0 p-0 border-0">
                        <div className="px-0">
                            <div className="ph-row p-0 mb-0">
                                <div className="ph-col-12 mb-0" style={{"height": "24px"}}></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="m-0 p-0 ph-item ph-row">
                    <div className="ph-col-1 m-0 rounded-pill" style={{ "height": "35px" }}></div>
                    <div className="ph-col-1 m-0 empty" style={{ "height": "35px" }}></div>
                    <div className="ph-col-1 m-0 rounded-pill" style={{ "height": "35px" }}></div>
                    <div className="ph-col-8 m-0 empty" style={{ "height": "35px" }}></div>
                    <div className="ph-col-1 m-0" style={{"height":"1rem"}}></div>
                </div>
            </div>
    );
}

export default DoctorListGhostImage;