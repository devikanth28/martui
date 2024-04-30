import React, { useEffect, useState } from 'react';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Collapse } from 'reactstrap';
import Validate from '../../../../../helpers/Validate';
function PharmacyCategoryDetailFilter(props) {
    const validate = Validate();
    const [selectedCategoryId, setSelectedCategoryId] = useState(props.currentCategoryDetails.selectedCategoryId);
    const [filterCollapse, setFilterCollapse] = useState({});
    const [searchStrings, setSearchStrings] = useState({});
    const [subCollapse, setSubCollapse] = useState({});
    const [transition,ControlTransition] = useState(props.filterModalOpen)
    const CloseButton = <button type="button" onClick={()=>{handleTransition("close")}} className="close icons clear-icn" data-dismiss="modal" aria-label="Close"><span aria-hidden="true"></span></button>;
    const buildRedirectUrlForCategory=(parentCategoryName, categoryName, categoryId, subCatName, subCatId)=>{
        setSelectedCategoryId(subCatId);
        props.setSelectedFilterData({
            "parentCategoryName": parentCategoryName,
            "categoryName" : categoryName,
            "categoryId" : categoryId,
            "subCatName" : subCatName,
            "subCatId": subCatId
        })
    }
    const handleReset=()=>{
        setSelectedCategoryId(props.currentCategoryDetails.selectedCategoryId);
        props.setSelectedFilterData({});
    }

    const formatEntryString =(str) =>{
        return str.replace(/ /g,"-").toLowerCase();
    }

    useEffect(()=>{
        openSelectedCategoryCollapse();
    }, [])

    const openSelectedCategoryCollapse =() =>{
        setFilterCollapse({ [formatEntryString(props.currentCategoryDetails.selectedParentCategoryName)]: !filterCollapse[formatEntryString(props.currentCategoryDetails.selectedParentCategoryName)] });
        setSubCollapse( { [props.currentCategoryDetails.selectedsubCatId] : !subCollapse[props.currentCategoryDetails.selectedsubCatId] });
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
                        {props.pharmacyCategories && Object.entries(props.pharmacyCategories).map(([eachParentCategoryId, eachParentCategoryValue]) => {
                            return (
                                <React.Fragment>
                                    <div className='each-filter-collapse'>
                                        <a href="javascript:void(0)" title={eachParentCategoryValue.categoryName} className="collapse-toggle no-underline" onClick={() => setFilterCollapse({[formatEntryString(eachParentCategoryValue.categoryName)]: !filterCollapse[formatEntryString(eachParentCategoryValue.categoryName)]})}>
                                            <div>
                                                <h6 className="mb-1">{eachParentCategoryValue.categoryName}</h6>
                                                {/* <small className="text-secondary">Cardiology, Orthopedics</small> */}
                                            </div>
                                            <span className="ml-2">
                                                <svg className={filterCollapse[formatEntryString(eachParentCategoryValue.categoryName)] ? "rotate-bottom collapse-arrow" : "rotate-up collapse-arrow"} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                                    <g transform="translate(-762 -906.838)">
                                                        <rect fill="none" width="18" height="18" transform="translate(762 906.838)" />
                                                        <path fill="#080808" d="M61.559,501.985l4.049-4.049a.917.917,0,0,0-1.3-1.3l-3.4,3.39-3.4-3.4a.921.921,0,0,0-1.569.649.912.912,0,0,0,.272.649l4.049,4.059A.922.922,0,0,0,61.559,501.985Z" transform="translate(710.032 416.557)" />
                                                    </g>
                                                </svg>
                                            </span>
                                        </a>
                                        <Collapse isOpen={filterCollapse[formatEntryString(eachParentCategoryValue.categoryName)]}>
                                            {/* {<div className="form-group has-float-label doctor-filter-container">
                                                <input type="text" className="form-control form-sm small text-truncate" id={eachParentCategoryId + "_search"} name={eachParentCategoryId + "_search"} maxLength="100" autoComplete="off" required placeholder=" " value={searchStrings[eachParentCategoryId]} onChange={(e) => setSearchStrings({ [eachParentCategoryId]: e.target.value })} />
                                                <label for={eachParentCategoryId + "_search"}>Search {eachParentCategoryValue.categoryName}</label>
                                                {validate.isNotEmpty(searchStrings[eachParentCategoryId]) && <a aria-label='clear' href='javascript:void(0)' title='clear' onClick={() => setSearchStrings({ [eachParentCategoryId]: "" })} className='btn btn-sm search-icon-btn'>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 18 18">
                                                        <g id="close_black_icon_18px" transform="translate(-48.941 -281.937)">
                                                            <rect id="Rectangle_3290" data-name="Rectangle 3290" width="18" height="18" transform="translate(48.941 281.937)" fill="none" />
                                                            <path id="Path_1951" data-name="Path 1951" d="M66.7,298.492l-7.579-7.562,7.563-7.563a.831.831,0,0,0-1.175-1.175l-7.567,7.562-7.562-7.578a.832.832,0,0,0-1.175,1.176l7.562,7.579-7.562,7.562a.831.831,0,1,0,1.132,1.218c.015-.013.029-.028.043-.043l7.562-7.563,7.563,7.563a.831.831,0,0,0,1.175,0h0a.818.818,0,0,0,.039-1.156Z" transform="translate(0 -0.002)" fill="#080808" />
                                                        </g>
                                                    </svg>
                                                </a>}
                                            </div>} */}
                                            { eachParentCategoryValue.subCatInfo && 
                                                Object.entries(eachParentCategoryValue.subCatInfo).map(([eachCategoryId,eachCategoryValue ]) => {
                                                    return (
                                                        <React.Fragment>
                                                            <a href="javascript:void(0)" title={eachParentCategoryValue.categoryName} className="collapse-toggle no-underline" onClick={() => setSubCollapse(({ [eachCategoryId]: !subCollapse[eachCategoryId] }))}>
                                                                <div>
                                                                    <h6 className="mb-1 ml-3">{eachCategoryValue.categoryName}</h6>
                                                                    {/* <small className="text-secondary">Cardiology, Orthopedics</small> */}
                                                                </div>                                                               
                                                                <span className="ml-2">                                                
                                                                {subCollapse[eachCategoryId] ?
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 18 18">
                                                                    <rect fill="none" width="12" height="12" transform="translate(0 0)"/>
                                                                    <rect fill="080808" width="18" height="1.431" rx="0.636" transform="translate(0 8.285)"/>
                                                                </svg>
                                                                 :                                                            
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 18 18">
                                                                <rect fill="none" width="12" height="12"/>
                                                                <path fill="#080808" d="M69.226,601.175H61.657v-7.569a.716.716,0,1,0-1.431,0v7.569H52.657a.716.716,0,1,0,0,1.431h7.569v7.569a.716.716,0,0,0,1.431,0v-7.569h7.569a.716.716,0,0,0,0-1.431Z" transform="translate(-51.941 -592.89)"/>
                                                               </svg>
                                                                }
                                                            </span>
                                                            </a>
                                                            <Collapse isOpen={subCollapse[eachCategoryId]}>
                                                                <div className="mb-3">
                                                                    { eachCategoryValue.subCatInfo && Object.entries(eachCategoryValue.subCatInfo).map(([eachSubCategoryId, eachSubCategoryValue]) => {
                                                                        /* if(eachSubCategoryId==selectedCategoryId){
                                                                            setFilterCollapse( {[eachParentCategoryId] : !filterCollapse[eachParentCategoryId] });
                                                                            setSubCollapse( {[eachCategoryId] : !subCollapse[eachCategoryId] });
                                                                        } */
                                                                        return (
                                                                            <React.Fragment>
                                                                                <div className="custom-control custom-radio ml-3">
                                                                                    <input type="radio" class="custom-control-input" id={eachSubCategoryId + "_radioButton"} name="categoryFilter" onClick={()=>{buildRedirectUrlForCategory(eachParentCategoryValue.categoryName, eachCategoryValue.categoryName, eachCategoryId, eachSubCategoryValue, eachSubCategoryId)}} checked={eachSubCategoryId==selectedCategoryId}/>
                                                                                    <label class="custom-control-label" for={eachSubCategoryId + "_radioButton"}>
                                                                                        <div className="d-flex justify-content-between">
                                                                                            <span>{eachSubCategoryValue}</span>
                                                                                            <span></span>
                                                                                        </div>
                                                                                    </label>
                                                                                </div>
                                                                            </React.Fragment>
                                                                        )
                                                                    })}
                                                                </div>
                                                            </Collapse>
                                                        </React.Fragment>
                                                    )
                                                })
                                            }
                                        </Collapse>   
                                        <hr className="my-4 border-top-0" />                                    
                                    </div>                                  
                                </React.Fragment>
                            )
                        })}
                       
                    </div>
                </ModalBody>
                <ModalFooter>
                    <div className="w-100">
                        <div className="row">
                            <div className="col-4 pr-0">
                                <button className="btn brand-secondary rounded-pill btn-block custom-btn-lg" onClick={()=>{handleReset()}}>Reset</button>
                            </div>
                            <div className="col-8">
                                <button className="btn btn-brand-gradient rounded-pill  btn-block custom-btn-lg" onClick={()=>{props.toggleFilterModal(); props.applyCategoryFilter()}} disabled={props.currentCategoryDetails.selectedCategoryId == selectedCategoryId}>View</button>
                            </div>
                        </div>
                    </div>
                </ModalFooter>
            </Modal>
        </React.Fragment>
    );
}

export default PharmacyCategoryDetailFilter;