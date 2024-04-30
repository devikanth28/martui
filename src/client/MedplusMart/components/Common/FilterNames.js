import React from "react"
import Validate from "../../../helpers/Validate"

const FilterNames = (props) => {

    const validate = Validate();;

    const onRemoveSelectedFilter = (filterId, type) => {
        props.removeSelectedFilter(filterId, type)
    }

    return (<React.Fragment>
        {validate.isNotEmpty(props.selectedIds) && props.selectedIds.map((selectedId, index) => {
            let appliedFilterName = "";
            if (props.type == "subLevelCategories" && validate.isNotEmpty(props.subLevelCategories)) {
                props.subLevelCategories.map((eachSubCategory) => {
                    if (eachSubCategory.CategoryId == selectedId) {
                        appliedFilterName = eachSubCategory.CategoryName;
                    }
                })
            } else if (props.type == "priceRange") {
                appliedFilterName = `₹${selectedId.min} -  ₹${selectedId.max}`;
            } else {
                appliedFilterName = selectedId;
            }
            return (
                <React.Fragment>
                    {validate.isNotEmpty(appliedFilterName) &&
                        <div className="each-filter" title={appliedFilterName} id={index}>
                            <span className="text-truncate mb-0 font-14 mr-2">{appliedFilterName}</span>
                            <button className="filter-remove-btn" role="button" id={selectedId} title={'Remove ' + appliedFilterName} onClick={() => { onRemoveSelectedFilter(selectedId, props.type) }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 16 16" className='d-flex'>
                                    <g id="close_black_icon_18px" transform="translate(-48.941 -281.937)">
                                        <rect id="Rectangle_3290" data-name="Rectangle 3290" width="16" height="16" transform="translate(48.941 281.937)" fill="none" />
                                        <path id="Path_1951" data-name="Path 1951" d="M64.729,296.652l-6.737-6.721,6.723-6.722a.739.739,0,0,0-1.045-1.044l-6.726,6.721-6.722-6.735a.739.739,0,0,0-1.045,1.045l6.722,6.736-6.722,6.721a.739.739,0,1,0,1.006,1.083c.013-.012.026-.025.039-.038l6.722-6.722,6.723,6.722a.739.739,0,0,0,1.044,0h0a.727.727,0,0,0,.035-1.027Z" transform="translate(0 -0.002)" fill="#080808" />
                                    </g>
                                </svg>
                            </button>
                        </div>}
                    {validate.isEmpty(appliedFilterName) &&
                        <div className="each-filter px-0">
                            <div class="ph-item p-0 m-0 d-block">
                                <div class="px-0">
                                    <div class="ph-row m-0">
                                        <div style={{ "width": "200px", "height": "35px" }} class="ph-picture m-0"></div>
                                    </div>
                                </div>
                            </div>
                        </div>}
                </React.Fragment>)
        })}
    </React.Fragment>)
}

export default FilterNames;