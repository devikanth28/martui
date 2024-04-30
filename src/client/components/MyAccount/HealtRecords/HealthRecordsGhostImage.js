import React from 'react';

const HealthRecordsGhostImage = () => {
    let numberOfCards = [1,2,3,4];

    
    return (
        numberOfCards.map((index)=>{
            return (
        <div className="each-health-record" key = {index}>
            <div className="ph-item mb-0 pt-0 border rounded-xl">
                <div className="ph-col-12 p-0 mt-3">
                    <div className="ph-picture" style={{ height: "100px" }}></div>
                </div>
                <div className="px-0">
                    <div className="ph-row">
                        <div className="ph-col-12 mb-4"></div>
                        <div className="ph-col-6 mr-3"></div>
                        <div className="ph-col-4"></div>
                        <div className="ph-col-6 mr-3"></div>
                        <div className="ph-col-4"></div>
                        <div className="ph-col-6 mr-3"></div>
                        <div className="ph-col-4"></div>
                        <div className="ph-col-6 mr-3"></div>
                        <div className="ph-col-4"></div>
                        <div className="ph-col-2 mt-3"></div>
                        <div className="ph-col-8 empty mt-3"></div>
                        <div className="ph-col-2 mt-3"></div>
                        <div className="ph-col-12 mt-3"></div>
                    </div>
                </div>
            </div>
        </div>)}))
}

export default HealthRecordsGhostImage;