import React from 'react';

const DoctorClinicGhostImage = () => {
    return (
        <React.Fragment>
            <div className="body-height">
                <div className="px-3 mb-n3 pb-3 mb-n3">
                    { [0,1,2].map(()=>{
                    return( 
                        <div className="ph-item mb-3 p-3 border">
                            <div className="px-0">
                                <div className="ph-row mb-0">
                                    <div className="ph-col-6 mb-3"></div>
                                    <div className="ph-col-6 empty mb-3"></div>
                                    <div className="ph-col-10 mb-4"></div>
                                    <div className="ph-col-2 empty mb-4"></div>
                                    <div className="ph-col-2 mb-0"></div>
                                    <div className="ph-col-2 mb-0 empty"></div>
                                    <div className="ph-col-2 mb-0"></div>
                                </div>
                            </div>
                        </div>
                    )})}
                </div>
            </div>
        </React.Fragment>
    );
}
export default DoctorClinicGhostImage;