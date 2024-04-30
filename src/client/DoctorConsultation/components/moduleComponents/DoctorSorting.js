import React, { useState } from 'react';
import DoctorFilter from '../../../components/DoctorConsultation/DoctorFilter';

export default (props) => {

    const [filterModalOpen,setFilterModalOpen] = useState(false)
    
    const toggleFilterModal=()=>{
        setFilterModalOpen(!filterModalOpen)
    }
    return (
        <React.Fragment>
                        <div className="align-items-center d-flex justify-content-between mb-3">
                            <div>
                                <button className="btn border-sort-btn filter mr-4 ml-0" onClick={()=>toggleFilterModal()}>
                                    <svg className="mr-2 align-middle" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" class="mr-2 mt-n1">
                                        <g id="Group_22672" data-name="Group 22672" transform="translate(-1727 -423)">
                                            <rect id="Rectangle_6527" data-name="Rectangle 6527" width="18" height="18" rx="3" transform="translate(1727 423)" fill="#fff"></rect>
                                            <path id="Icon_awesome-filter" data-name="Icon awesome-filter" d="M15.249,0H.751a.751.751,0,0,0-.53,1.28L6,7.061V13.5a.75.75,0,0,0,.32.614l2.5,1.749A.75.75,0,0,0,10,15.249V7.061l5.78-5.78A.751.751,0,0,0,15.249,0Z" transform="translate(1728 424)"></path>
                                        </g>
                                    </svg>
                                    All Filters
                                </button>
                                <strong className="font-14">Sort By:</strong>
                                <button className="btn border-sort-btn active">Experience</button>
                                <button className="btn border-sort-btn">No. of Consultations</button>
                                <button className="btn border-sort-btn">Rating</button>
                            </div>
                            <p className="mb-0 font-14 text-secondary">140 Items</p>
                        </div>
                        <div className="selected-filter-container">
                            <div className="each-filter">
                                <p className="text-truncate mb-0 font-14">Cardiology</p>
                                <button className="filter-remove-btn">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 16 16">
                                        <g id="close_black_icon_18px" transform="translate(-48.941 -281.937)">
                                            <rect id="Rectangle_3290" data-name="Rectangle 3290" width="16" height="16" transform="translate(48.941 281.937)" fill="none"/>
                                            <path id="Path_1951" data-name="Path 1951" d="M64.729,296.652l-6.737-6.721,6.723-6.722a.739.739,0,0,0-1.045-1.044l-6.726,6.721-6.722-6.735a.739.739,0,0,0-1.045,1.045l6.722,6.736-6.722,6.721a.739.739,0,1,0,1.006,1.083c.013-.012.026-.025.039-.038l6.722-6.722,6.723,6.722a.739.739,0,0,0,1.044,0h0a.727.727,0,0,0,.035-1.027Z" transform="translate(0 -0.002)" fill="#080808"/>
                                        </g>
                                    </svg>
                                </button>
                            </div>
                            <div className="each-filter">
                                <p className="text-truncate mb-0 font-14">Cardiology</p>
                                <button className="filter-remove-btn">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 16 16">
                                        <g id="close_black_icon_18px" transform="translate(-48.941 -281.937)">
                                            <rect id="Rectangle_3290" data-name="Rectangle 3290" width="16" height="16" transform="translate(48.941 281.937)" fill="none"/>
                                            <path id="Path_1951" data-name="Path 1951" d="M64.729,296.652l-6.737-6.721,6.723-6.722a.739.739,0,0,0-1.045-1.044l-6.726,6.721-6.722-6.735a.739.739,0,0,0-1.045,1.045l6.722,6.736-6.722,6.721a.739.739,0,1,0,1.006,1.083c.013-.012.026-.025.039-.038l6.722-6.722,6.723,6.722a.739.739,0,0,0,1.044,0h0a.727.727,0,0,0,.035-1.027Z" transform="translate(0 -0.002)" fill="#080808"/>
                                        </g>
                                    </svg>
                                </button>
                            </div>
                            <div className="each-filter">
                                <p className="text-truncate mb-0 font-14">Cardiology</p>
                                <button className="filter-remove-btn">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 16 16">
                                        <g id="close_black_icon_18px" transform="translate(-48.941 -281.937)">
                                            <rect id="Rectangle_3290" data-name="Rectangle 3290" width="16" height="16" transform="translate(48.941 281.937)" fill="none"/>
                                            <path id="Path_1951" data-name="Path 1951" d="M64.729,296.652l-6.737-6.721,6.723-6.722a.739.739,0,0,0-1.045-1.044l-6.726,6.721-6.722-6.735a.739.739,0,0,0-1.045,1.045l6.722,6.736-6.722,6.721a.739.739,0,1,0,1.006,1.083c.013-.012.026-.025.039-.038l6.722-6.722,6.723,6.722a.739.739,0,0,0,1.044,0h0a.727.727,0,0,0,.035-1.027Z" transform="translate(0 -0.002)" fill="#080808"/>
                                        </g>
                                    </svg>
                                </button>
                            </div>
                        </div>
            <DoctorFilter toggleFilterModal={toggleFilterModal} filterModalOpen={filterModalOpen}/>
        </React.Fragment>
    );
}
    
