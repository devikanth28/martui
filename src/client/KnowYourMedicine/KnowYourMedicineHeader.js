import React from "react";
import MedicineSearch from "./MedicineSearch";

const KnowYourMedicineHeader = () => {

    return(
        <React.Fragment>
            <div className="kym-header row no-gutters">
                <div className='col-3 d-flex align-items-center'>
                    <a class="back-icn me-3" href="javascript:void(0);" title="Back">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                                <g id="Group_36161" data-name="Group 36161" transform="translate(-32 -98)">
                                    <rect id="Rectangle_12906" data-name="Rectangle 12906" width="32" height="32" rx="4" transform="translate(32 98)" fill="none" />
                                    <g id="Group_36160" data-name="Group 36160" transform="translate(-1711.935 -117.012)">
                                        <g id="Group_374" data-name="Group 374" transform="translate(1748.935 223.012)">
                                            <path id="Path_119" data-name="Path 119" d="M1757.938,222.512l-8,8,8,8" transform="translate(-1747.935 -222.512)" fill="none" stroke="#323232" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                                            <path id="Path_120" data-name="Path 120" d="M1751.072,241.589h18" transform="translate(-1749.072 -233.586)" fill="none" stroke="#323232" stroke-linecap="round" stroke-width="2" />
                                        </g>
                                    </g>
                                </g>
                            </svg>
                    </a>
                    <div className="pl-2 w-auto">
                        <h6 className="m-0 text-truncate text-capitalize" >Know Your Medicine</h6>
                    </div>
                </div>
                <div className="col-7 d-flex justify-content-center">
                    <MedicineSearch />
                </div>
            </div>
        </React.Fragment>
    );
};

export default KnowYourMedicineHeader;