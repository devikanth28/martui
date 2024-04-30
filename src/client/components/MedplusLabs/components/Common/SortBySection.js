import React, { useState } from 'react';

const SortBySection = (props)=> {
    
    const MOST_VIEWED = "MOST_VIEWED"
    const A_TO_Z = "A_TO_Z";
    const Z_TO_A = "Z_TO_A";
    const sortTab = props.sortTab;
    const [tabChange, setTabChange] = useState("MOST_VIEWED");

    const sortBy = (sortBy) =>{   
        if(tabChange != sortBy){
            props.testListSortBy(sortBy);
            setTabChange(sortBy)
        }
    }

    return <div className="align-items-center d-flex justify-content-between mb-4">
                <div>
                    <strong className="font-14">Sort By:</strong>
                    <button role="button" aria-label="SortByPopularity" className={"btn border-sort-btn "+ (sortTab === MOST_VIEWED ?  "active": "")} onClick={()=>sortBy(MOST_VIEWED)}>Popularity</button>
                    <button role="button" aria-label="SortByAtoZ" className={"btn border-sort-btn "+ (sortTab === A_TO_Z ?  "active": "")} onClick={()=>sortBy(A_TO_Z)}>A-Z</button>
                    <button role="button" aria-label="SortByZtoA" className={"btn border-sort-btn "+ (sortTab === Z_TO_A ?  "active": "")} onClick={()=>sortBy(Z_TO_A)}>Z-A</button>
                </div> 
                <p className="mb-0 font-14 text-secondary"> {props.visibleRecordsCount} / {props.totalRecords} Items</p>
         </div>
}

export default  SortBySection;