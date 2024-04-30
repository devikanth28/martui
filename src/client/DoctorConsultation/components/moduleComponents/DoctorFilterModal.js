import React, { useState } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader, UncontrolledCollapse} from 'reactstrap';
import Validate from '../../../helpers/Validate';
import { sortAndFilterNamesToShow, getSelectedFiltersAndSortFromUrl, sortAndFilterResponseConst } from "../../constants/DoctorConsultationConstants";

function DoctorFilterModal(props) {
    const validate = Validate()
    const [transition,ControlTransition] = useState(props.filterModalOpen)
    const CloseButton = <button type="button" onClick={()=>{handleTransition("close")}} className="close icons clear-icn" data-dismiss="modal" aria-label="Close"><span aria-hidden="true"></span></button>
    const [ seletedFilterElements , setSeletedFilterElements] = useState( Validate().isNotEmpty(props.selectedFiltersAndSort) ? {...props.selectedFiltersAndSort} : getSelectedFiltersAndSortFromUrl({}));

    const setSelectedFiltersAndSortInState = (field, fieldValue, isMultipleSelection) => {
        if(isMultipleSelection){
            let fieldValues = Validate().isNotEmpty(seletedFilterElements[field]) ? [...seletedFilterElements[field]] : [];
            if(fieldValues.indexOf(fieldValue) !== -1){
                fieldValues = fieldValues.filter(each => each != fieldValue);
            }else{
                fieldValues.push(fieldValue);
            }
            setSeletedFilterElements({...seletedFilterElements, [field]: fieldValues});
        } else {
            setSeletedFilterElements({...seletedFilterElements, [field]: fieldValue});
        }
    }
    const handleApplyFilters=() => {
        if(validate.isNotEmpty(seletedFilterElements)){
            props.setSelectedFiltersAndSort(seletedFilterElements)
            props.applySortAndFilter(seletedFilterElements);
        }
    }
    const handleClearFilters=() => {
        let selectedFiltersAndSortFromUrl = getSelectedFiltersAndSortFromUrl({});
        selectedFiltersAndSortFromUrl = {...selectedFiltersAndSortFromUrl, "SORT" : seletedFilterElements["SORT"]};
        props.setSelectedFiltersAndSort(selectedFiltersAndSortFromUrl);
        setSeletedFilterElements(selectedFiltersAndSortFromUrl);
        props.toggleFilterModal();
        props.applySortAndFilter(selectedFiltersAndSortFromUrl);
    }

    const handleTransition = (from) => {
        if(from == 'close') {
            ControlTransition(!transition)
            const timeout = setTimeout(() => {
                props.toggleFilterModal()
              }, 500);
          
             return () => clearTimeout(timeout);
        }
    }

    return (
        <React.Fragment>
            <Modal className="modal-dialog-right notification doctor-filter-modal" modalClassName={transition ? "fadeInRight":"fadeOutRight"} isOpen={props.filterModalOpen} toggle={()=>{handleTransition("close")}}>
                <ModalHeader toggle={()=>{handleTransition("close")}} close={CloseButton}>
                    Filters
                </ModalHeader>
                <ModalBody className="p-4">
                    <div className="filter-container">
                        {validate.isNotEmpty(props.sortAndFilterElements) && props.sortAndFilterElements.map((each)=>{
                            return( each.type !="SORT" && <EachFilterCollapse druginfo = {props.druginfo} eachItem={each} alreadyAppliedFilters={seletedFilterElements[each.type] ? seletedFilterElements[each.type] : []} setSelectedFiltersAndSortInState={(key,value,isMultiple)=>setSelectedFiltersAndSortInState(key,value,isMultiple)}/> )
                        })}
                    </div>
                </ModalBody>
                <ModalFooter>
                    <div className="w-100">
                        <div className="row">
                            <div className="col-4 pr-0">
                                <button type="button" role="cancel" className=" btn brand-secondary btn-block rounded-pill custom-btn-lg" onClick={handleClearFilters}>Clear All</button>
                            </div>
                            <div className="col-8">
                                <button type="button" role="submit" className="btn btn-brand-gradient rounded-pill btn-block custom-btn-lg" onClick={handleApplyFilters} disabled={isSameFilters(props.selectedFiltersAndSort, seletedFilterElements)}>Apply</button>
                            </div>
                        </div>
                    </div>
                </ModalFooter>
            </Modal>
        </React.Fragment>
    );
}

const isSameFilters = (filtersFromProps, filtersFromState) => {
    let isSame = true;
    Object.keys(filtersFromState).every(each => {
        if(each === sortAndFilterResponseConst.SPECIALITIES){
            if(filtersFromProps[each].length !== filtersFromState[each].length ){
                isSame = false;
                return false;
            }
            let sameSpecialities = filtersFromState[each].every(eachSpeciality => filtersFromProps[each].indexOf(eachSpeciality) !== -1);
            if(!sameSpecialities){
                isSame = false;
                return false;
            }
        }
        if(each === sortAndFilterResponseConst.GENDERS || each === sortAndFilterResponseConst.ONLINE_STATUS || each === sortAndFilterResponseConst.CONSULTATION_TYPES){
            if(filtersFromProps[each] !== filtersFromState[each]){
                isSame = false;
                return false;
            }
        }
        return true;
    });
    return isSame;
}

const EachFilterCollapse = (props) => {
    const validate = Validate();
    const [searchString, setSearchString] = useState()
    const eachItem = props.eachItem;
    const [openedSections, setOpenedSections] = useState([]);
    const events = ['click'];

    const handleClick = e => {
        let id = e.target.id;
        if (id == ''){
            id = e.currentTarget.id
        }
        if(openedSections.indexOf(id) === -1){
            let tempArray = [...openedSections];
            tempArray.push(id);
            setOpenedSections(tempArray);
        }else{
            let tempArray = openedSections.filter(each => each !== id);
            setOpenedSections(tempArray);
        }
    }

    return <React.Fragment>
        <div className='each-filter-collapse'>
            <a href="javascript:void(0)" title={sortAndFilterNamesToShow[eachItem.type]} id={'collapse' + eachItem.type} onClick={(e) => handleClick(e)} className="collapse-toggle no-underline">
                <div>
                    <h6 className="mb-1">{sortAndFilterNamesToShow[eachItem.type]}</h6>
                    {validate.isNotEmpty(props.alreadyAppliedFilters) && <small className="text-secondary">
                        <React.Fragment>
                            {eachItem.isMultipleSelection && props.alreadyAppliedFilters.map((eachSelected, index)=>{
                                if(index  == 0){
                                    return(
                                        eachItem.elements.map((eachFilterElement) =>{
                                            if(eachFilterElement.id == eachSelected){
                                                return(
                                                    eachFilterElement.name
                                                )
                                            }
                                        })
                                    )
                                }
                                else{
                                    return(
                                        eachItem.elements.map((eachFilterElement)=>{
                                            if(eachFilterElement.id == eachSelected){
                                                return(
                                                    ", "+eachFilterElement.name
                                                )
                                            }
                                        })
                                    )
                                }
                            })}
                            {!eachItem.isMultipleSelection && <React.Fragment>
                                {eachItem.elements.map((eachFilterElement)=>{
                                    if(eachFilterElement.id == props.alreadyAppliedFilters){
                                        return(
                                            eachFilterElement.name
                                        )
                                    }
                                })}
                            </React.Fragment>}
                        </React.Fragment>
                    </small> }
                </div>
                <span className="ml-2">
                     <svg className={ openedSections.indexOf('collapse'+eachItem.type) !== -1 ? "rotate-bottom collapse-arrow" : "rotate-up collapse-arrow"} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                        <g transform="translate(-762 -906.838)">
                            <rect fill="none" width="18" height="18" transform="translate(762 906.838)"/>
                            <path fill="#080808" d="M61.559,501.985l4.049-4.049a.917.917,0,0,0-1.3-1.3l-3.4,3.39-3.4-3.4a.921.921,0,0,0-1.569.649.912.912,0,0,0,.272.649l4.049,4.059A.922.922,0,0,0,61.559,501.985Z" transform="translate(710.032 416.557)"/>
                        </g>
                    </svg>
                </span>
            </a>
            {!props.druginfo && <UncontrolledCollapse toggler={'collapse' + eachItem.type} toggleEvents={events}>
                { eachItem.showSearchOptionForElements && eachItem.elements.length > 0 && <div className="form-group has-float-label doctor-filter-container">
                    <input type="text" className="form-control form-sm small text-truncate" id={eachItem.type+"_search"} name={eachItem.type+"_search"} maxLength="100" autoComplete="off"  required placeholder=" " value={searchString} onChange={(e)=>setSearchString(e.target.value)}/>
                    <label for={eachItem.type+"_search"}>Search specialization</label>
                    { validate.isNotEmpty(searchString) && <a aria-label='clear' href='javascript:void(0)' title='clear' onClick={()=>setSearchString("")} className='btn btn-sm search-icon-btn'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 18 18">
                            <g id="close_black_icon_18px" transform="translate(-48.941 -281.937)">
                                <rect id="Rectangle_3290" data-name="Rectangle 3290" width="18" height="18" transform="translate(48.941 281.937)" fill="none"/>
                                <path id="Path_1951" data-name="Path 1951" d="M66.7,298.492l-7.579-7.562,7.563-7.563a.831.831,0,0,0-1.175-1.175l-7.567,7.562-7.562-7.578a.832.832,0,0,0-1.175,1.176l7.562,7.579-7.562,7.562a.831.831,0,1,0,1.132,1.218c.015-.013.029-.028.043-.043l7.562-7.563,7.563,7.563a.831.831,0,0,0,1.175,0h0a.818.818,0,0,0,.039-1.156Z" transform="translate(0 -0.002)" fill="#080808"/>
                            </g>
                        </svg>
                    </a> }
                </div>}
                <div>
                    { eachItem.elements.map((eachFilterItem)=>{
                        if(validate.isNotEmpty(searchString) && eachFilterItem.name.toLowerCase().includes(searchString.toLowerCase())){
                            return(
                                <div class={ eachItem.isMultipleSelection ? "custom-control custom-checkbox" : "custom-control custom-radio"}>
                                    <input type={ eachItem.isMultipleSelection ? "checkbox" : 'radio'} class="custom-control-input" id={eachItem.type+"_"+eachFilterItem.id} name={eachItem.type} onClick={()=>props.setSelectedFiltersAndSortInState(eachItem.type, eachFilterItem.id, eachItem.isMultipleSelection)} checked={ eachItem.isMultipleSelection ? props.alreadyAppliedFilters.includes(eachFilterItem.id) : props.alreadyAppliedFilters == eachFilterItem.id} value={eachItem.type+"_"+eachFilterItem.id}/>
                                    <label class="custom-control-label" for={eachItem.type+"_"+eachFilterItem.id}>
                                        <div className="d-flex justify-content-between">
                                            <span>{eachFilterItem.name}</span>
                                            <span>{eachFilterItem.numberOfElements}</span>
                                        </div>
                                    </label>
                                </div>
                            )
                        }
                        else if(validate.isEmpty(searchString)){
                            return(
                                <div class={ eachItem.isMultipleSelection ? "custom-control custom-checkbox" : "custom-control custom-radio"}>
                                    <input type={ eachItem.isMultipleSelection ? "checkbox" : 'radio'} class="custom-control-input" id={eachItem.type+"_"+eachFilterItem.id} name={eachItem.type} onClick={()=>props.setSelectedFiltersAndSortInState(eachItem.type, eachFilterItem.id, eachItem.isMultipleSelection)} checked={ eachItem.isMultipleSelection ? props.alreadyAppliedFilters.includes(eachFilterItem.id) : props.alreadyAppliedFilters == eachFilterItem.id} value={eachItem.type+"_"+eachFilterItem.id}/>
                                    <label class="custom-control-label" for={eachItem.type+"_"+eachFilterItem.id}>
                                        <div className="d-flex justify-content-between">
                                            <span>{eachFilterItem.name}</span>
                                            <span>{eachFilterItem.numberOfElements}</span>
                                        </div>
                                    </label>
                                </div>
                            )
                        }
                    })}
                </div>
            </UncontrolledCollapse> } 
            {props.druginfo && <div></div>}
            <hr className="my-4"/>
        </div>
    </React.Fragment>
}

export default DoctorFilterModal;