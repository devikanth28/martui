import React, { useState } from 'react';
import { useEffect } from 'react';
import DoctorFilterModal from './DoctorFilterModal';
import DoctorConsultationServices from "../../services/DoctorConsultationService";
import Validate from '../../../helpers/Validate';

export default (props) => {


    const selectedFiltersAndSortFromUrl = props.selectedFiltersAndSortFromUrl;

    const validate = Validate();
    let pathName = props.history.location.pathname;
    const paramValue = pathName.split("/doctors/")[1];
    const [filterModalOpen, setFilterModalOpen] = useState(false)
    const doctorConsultationService = DoctorConsultationServices();
    const [sortAndFilterElements, setSortAndFilterElements] = useState([]);
    const [showSortAndFilter,setShowSortAndFilter] = useState(false)
    const [sortAndFilterLoader,setSortAndFilterLoader] = useState(true)
    const [selectedSort, setSelectedSort] = useState("")
    const [selectedFiltersAndSort, setSelectedFiltersAndSort] = useState(Validate().isNotEmpty(selectedFiltersAndSortFromUrl) ? {...selectedFiltersAndSortFromUrl} : {});
    const [filterNames,setFilterNames] = useState({});
    const [typeWiseSortAndFilterInfo,setTypeWiseSortAndFilterInfo] = useState({});

    useEffect(()=>{
        getSortAndFilters();
        setSelectedSorting();
    },[])

    const getSortAndFilters = () => {
        doctorConsultationService.getSortAndFilters({...props.requestObjForSortAndFilters}).then(data => {
            if (data.statusCode === "SUCCESS") {
                if(validate.isNotEmpty(data.dataObject)){
                    setSortAndFilterElements(data.dataObject);
                    prepareIdWiseNameElements(data.dataObject);
                    setSortAndFilterLoader(false)
                    setShowSortAndFilter(true)
                }
            } else {
                console.log(data.message);
                setSortAndFilterLoader(false)
            }
        });
    }

    const setSelectedSorting = ()=>{
        if(Validate().isNotEmpty(selectedFiltersAndSortFromUrl) && Validate().isNotEmpty(selectedFiltersAndSortFromUrl["SORT"])){
            setSelectedSort(selectedFiltersAndSortFromUrl["SORT"]);
        }
    }

    const prepareIdWiseNameElements = (data) =>{
        data.map((eachFilterInfo=>{
            eachFilterInfo.elements.map((eachFilterElements=>{
                filterNames[eachFilterElements.id]=eachFilterElements.name;
            }))
            typeWiseSortAndFilterInfo[eachFilterInfo.type] = eachFilterInfo
        }))
    }

    const toggleFilterModal = () => {
        setFilterModalOpen(!filterModalOpen)
    }
    
    const showSelectedSortInfo = (field, fieldValue, isMultipleSelection) =>{
        let selectedFiltersAndSortInState = {...selectedFiltersAndSort};
        if(Validate().isNotEmpty(selectedSort)){
            setSelectedSort("");  
            selectedFiltersAndSortInState = {...selectedFiltersAndSortInState, [field]: ""};
        }else{
            setSelectedSort(fieldValue);
            selectedFiltersAndSortInState = {...selectedFiltersAndSortInState, [field]: fieldValue};
        }
        setSelectedFiltersAndSort({ ...selectedFiltersAndSortInState });
        validateAndApplySortAndFilters(selectedFiltersAndSortInState);
    }

    const isAnyFilterSelected = (selectedFiltersInfo) =>{
        var isFilterSelected = false;
        if(Validate().isNotEmpty(selectedFiltersInfo)){
            Object.keys(selectedFiltersInfo).map(eachFilter => {
                if(Validate().isNotEmpty(selectedFiltersInfo[eachFilter])){
                   isFilterSelected  = true;
                }
           })
        }
        return isFilterSelected;
    }

    const applySortAndFilter = (selectedFiltersAndSort) => {
        setSelectedFiltersAndSort(selectedFiltersAndSort);
        setFilterModalOpen(!filterModalOpen);
        validateAndApplySortAndFilters(selectedFiltersAndSort);
    }

    const OnRemoveFilter = (removeId,type,index) =>{
        let selectedFiltersAndSortInState = {...selectedFiltersAndSort};
        if(typeWiseSortAndFilterInfo[type].isMultipleSelection){
            let fieldValues = Validate().isNotEmpty(selectedFiltersAndSortInState[type]) ? selectedFiltersAndSortInState[type] : [];
            if(fieldValues[index] !== -1){
                fieldValues = fieldValues.filter(each => each !== fieldValues[index]);
                selectedFiltersAndSortInState = {...selectedFiltersAndSortInState, [type]: fieldValues}
            }
        }else{
            selectedFiltersAndSortInState = {...selectedFiltersAndSortInState, [type]: ""}
        }
        setSelectedFiltersAndSort({ ...selectedFiltersAndSortInState });
        validateAndApplySortAndFilters(selectedFiltersAndSortInState);
    }

    const validateAndApplySortAndFilters = (selectedFiltersAndSortInState) => {
        var isFilterSelected = isAnyFilterSelected(selectedFiltersAndSortInState);
        if (isFilterSelected) {
            props.applySortAndFilter(selectedFiltersAndSortInState);
        } else {
            props.redirectToAllDoctors();
        }
    }

    const isSelectedFiltersAvailable =(selectedFiltersAndSort) =>{
        let isFiltersAvailable = false;
        Object.keys(selectedFiltersAndSort).every((each)=>{
            if(each != "SORT"){
                if(validate.isNotEmpty(selectedFiltersAndSort[each])){
                    isFiltersAvailable = true;
                    return false;
                }
                return true;
            }
        })
        return isFiltersAvailable;
    }
    return (
        <React.Fragment>
            {showSortAndFilter && <div className={props.forCompletePage ? "align-items-center d-flex justify-content-between mb-3" : "align-items-center d-flex justify-content-between mb-3"}>
                <div>
                    <button type="button" role="button" className="btn border-sort-btn filter mr-4 ml-0" onClick={() => toggleFilterModal()}>
                        <svg className="mr-2 align-middle" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" class="mr-2 mt-n1">
                            <g id="Group_22672" data-name="Group 22672" transform="translate(-1727 -423)">
                                <rect id="Rectangle_6527" data-name="Rectangle 6527" width="18" height="18" rx="3" transform="translate(1727 423)" fill="#fff"></rect>
                                <path id="Icon_awesome-filter" data-name="Icon awesome-filter" d="M15.249,0H.751a.751.751,0,0,0-.53,1.28L6,7.061V13.5a.75.75,0,0,0,.32.614l2.5,1.749A.75.75,0,0,0,10,15.249V7.061l5.78-5.78A.751.751,0,0,0,15.249,0Z" transform="translate(1728 424)"></path>
                            </g>
                        </svg>
                        All Filters
                        {isSelectedFiltersAvailable(selectedFiltersAndSort) && <span className='text-success ml-1'>&#9679;</span> }
                    </button>
                    {validate.isNotEmpty(sortAndFilterElements) && sortAndFilterElements.map((eachItem)=>{
                        if(eachItem["type"] === "SORT"){
                            return (
                                <React.Fragment>
                                    <strong className="font-14">Sort By:</strong>
                                    {eachItem.elements.map((each) => {
                                        return (
                                            <button type='button' role="button" className={selectedSort === each.id ? "btn border-sort-btn active" : "btn border-sort-btn"} onClick={() => { showSelectedSortInfo(eachItem["type"], each.id, false) }}>{each.name}</button>
                                        )
                                    })}
                                </React.Fragment>
                            )
                        }
                    })}
                </div>
                {props.page == "listPage" && <p className="mb-0 font-14 text-secondary"> {props.visibleDoctorCount} / {Validate().isNotEmpty(props.doctorsCount) ? props.doctorsCount : 0} {Validate().isNotEmpty(props.doctorsCount) && props.doctorsCount > 1 ? 'Doctors' : 'Doctor'}</p>}
            </div>}
            {sortAndFilterLoader && <div className={props.forCompletePage ? "" : "mb-3"}>
                <div className="bg-transparent m-0 p-0 ph-item ph-row">
                    <div className="ph-col-1 m-0 rounded-pill" style={{ "height": "35px" }}></div>
                    <div className="ph-col-1 m-0 empty" style={{ "height": "35px" }}></div>
                    <div className="ph-col-1 m-0 rounded-pill" style={{ "height": "35px" }}></div>
                    <div className="ph-col-7 m-0 empty" style={{ "height": "35px" }}></div>
                    <div className="ph-col-2 m-0" ></div>
                </div>
            </div>}
            {isSelectedFiltersAvailable(selectedFiltersAndSort) && <div className={props.forCompletePage ? "selected-filter-container mt-3" : "selected-filter-container" }>
                {Validate().isNotEmpty(selectedFiltersAndSort) &&
                    Object.keys(selectedFiltersAndSort).map(each => {
                        if (Validate().isNotEmpty(selectedFiltersAndSort[each])) {
                            let selectedIds = [];
                            if (each == "SPECIALITY" && selectedFiltersAndSort[each].length > 1) {
                                selectedFiltersAndSort[each].map((eachElement => {
                                    selectedIds.push(eachElement);
                                }))
                                return (<FilterNames selectedIds={selectedIds} filterNames={filterNames} type={each} removeSelectedFilter={OnRemoveFilter} />)
                            } else if (each != "SORT") {
                                selectedIds.push(selectedFiltersAndSort[each]);
                                return (<FilterNames selectedIds={selectedIds} filterNames={filterNames} type={each} removeSelectedFilter={OnRemoveFilter} />)
                            }
                        }
                    })
                }
            </div> }
            {(validate.isNotEmpty(sortAndFilterElements) && filterModalOpen) && <DoctorFilterModal selectedFiltersAndSort={selectedFiltersAndSort} setSelectedFiltersAndSort={setSelectedFiltersAndSort} applySortAndFilter={applySortAndFilter} toggleFilterModal={toggleFilterModal} sortAndFilterElements={sortAndFilterElements} filterModalOpen={filterModalOpen} />}
        </React.Fragment>
    );
}

const FilterNames = (props) => {

    const onRemoveSelectedFilter=(filterId,type,index)=>{
        props.removeSelectedFilter(filterId,type,index);
    }
    return(<React.Fragment>
                    {Validate().isNotEmpty(props.selectedIds) && props.selectedIds.map((selectedId,index)=>{
                        let appliedFilterName = props.filterNames[selectedId]
                        return(
                            <React.Fragment>
                            {Validate().isNotEmpty(appliedFilterName) && 
                            <div className="each-filter" title={appliedFilterName} id={index}>
                                <span className="text-truncate mb-0 font-14 mr-2">{appliedFilterName}</span>
                                <button className="filter-remove-btn" role="button" id={selectedId} title={'Remove '+appliedFilterName} onClick={()=>onRemoveSelectedFilter(selectedId,props.type,index)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 16 16" className='d-flex'>
                                        <g id="close_black_icon_18px" transform="translate(-48.941 -281.937)">
                                            <rect id="Rectangle_3290" data-name="Rectangle 3290" width="16" height="16" transform="translate(48.941 281.937)" fill="none" />
                                            <path id="Path_1951" data-name="Path 1951" d="M64.729,296.652l-6.737-6.721,6.723-6.722a.739.739,0,0,0-1.045-1.044l-6.726,6.721-6.722-6.735a.739.739,0,0,0-1.045,1.045l6.722,6.736-6.722,6.721a.739.739,0,1,0,1.006,1.083c.013-.012.026-.025.039-.038l6.722-6.722,6.723,6.722a.739.739,0,0,0,1.044,0h0a.727.727,0,0,0,.035-1.027Z" transform="translate(0 -0.002)" fill="#080808" />
                                        </g>
                                    </svg>
                                </button>
                            </div> }
                            {Validate().isEmpty(appliedFilterName) && 
                                <div className="each-filter px-0">
                                    <div class="ph-item p-0 m-0 d-block">
                                        <div class="px-0">
                                            <div class="ph-row m-0">
                                                <div style={{"width": "200px","height": "35px"}} class="ph-picture m-0"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>}
                    </React.Fragment>)
                    })}
    </React.Fragment>)
}
