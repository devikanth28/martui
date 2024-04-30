import React, { useEffect, useState } from "react";
import InputRange from "react-input-range";
import { Collapse, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Validate from "../../../../../helpers/Validate";

const CategoryDetailFilter = (props) => {
    const [filterCollapse, setFilterCollapse] = useState({ "subLevelCategories": false, "brands": false, "availability": false,"price": false })
    const CloseButton = <button type="button" onClick={()=>{handleTransition("close")}} className="close icons clear-icn" data-dismiss="modal" aria-label="Close"><span aria-hidden="true"></span></button>

    const validate = Validate();
    const [brandsList, setBrandsList] = useState({});
    const [filteredSubLevelCategories, setFilteredSubLevelCategories] = useState([]);
    const [filteredBrandList, setFilteredBrandList] = useState([]);
    const [excludeOutOfStock, setExcludeOutOfStock] = useState(false);
    const [filteredPriceRange, setFilteredPriceRange] = useState({})
    const [searchedText, setSearchedText] = useState("");
    const [transition, ControlTransition] = useState(props.filterModalOpen)
    
    useEffect(()=>{
        setInitialFiltersInState()
    },[props.minAndMaxPrice, props.sortAndFilter, props.brandsList]);

    const setInitialFiltersInState = () => {
        setFilterCollapse({ "subLevelCategories": false, "brands": false, "availability": false,"price": false });
        setBrandsList({ ...props.brandsList });
        setSearchedText("");
        setFilteredSubLevelCategories(props.sortAndFilter.subLevelCategories ? [...props.sortAndFilter.subLevelCategories] : []);
        setFilteredBrandList(props.sortAndFilter.brands !== undefined && props.sortAndFilter.brands.length ? [...props.sortAndFilter.brands] : []);
        setExcludeOutOfStock(props.sortAndFilter.excludeOutOfStock !== undefined ? props.sortAndFilter.excludeOutOfStock : false);
        setFilteredPriceRange((validate.isNotEmpty(props.sortAndFilter.priceRange) && validate.isNotEmpty(props.sortAndFilter.priceRange.min) && validate.isNotEmpty(props.sortAndFilter.priceRange.max)) ? props.sortAndFilter.priceRange : ((validate.isNotEmpty(props.minAndMaxPrice) && validate.isNotEmpty(props.minAndMaxPrice.min) && validate.isNotEmpty(props.minAndMaxPrice.max)) ? props.minAndMaxPrice : props.startAndEndPrice));
    }

    const handleClear = () => {
        props.toggleFilterModal();
        props.setSelectedSort(0);
        props.applySortAndFilter({ subLevelCategories: [], brands: [], sort: 0 , priceRange: props.minAndMaxPrice, excludeOutOfStock: false });
    }

    const handleApply = () => {
        props.toggleFilterModal();
        props.applySortAndFilter({ subLevelCategories: filteredSubLevelCategories, brands: [...filteredBrandList], excludeOutOfStock, sort : props.sortAndFilter.sort , priceRange: filteredPriceRange });
    }

    const setSelectedFiltersInState = (filterType, fieldValue) => {
        if (filterType == "subLevelCategories") {
            setFilteredSubLevelCategories(filteredSubLevelCategories => {
                let subLevelCategories = [...filteredSubLevelCategories];
                if (subLevelCategories.includes(fieldValue)) {
                    let index = subLevelCategories.indexOf(fieldValue);
                    if (index > -1) {
                        subLevelCategories.splice(index, 1);
                    }
                } else {
                    subLevelCategories.push(fieldValue);
                }
                return [...subLevelCategories];
            });
        }
        if (filterType == "brands") {
            setFilteredBrandList(filteredBrandList => {
                let selectedBrandsList = [...filteredBrandList];
                if (selectedBrandsList.includes(fieldValue)) {
                    let index = selectedBrandsList.indexOf(fieldValue);
                    if (index > -1) {
                        selectedBrandsList.splice(index, 1);
                    }
                } else {
                    selectedBrandsList.push(fieldValue);
                }
                return [...selectedBrandsList];
            });
        }
        if (filterType == "availability" && validate.isNotEmpty(fieldValue)) {
            setExcludeOutOfStock(!excludeOutOfStock);
        }
        if (filterType == "price") {
            setFilteredPriceRange({ min: fieldValue.min, max: fieldValue.max })
        }
    }

    const handleSearch = (e) => {
        let value = e.target.value;
        let tempList = {};
        if (value === "") {
            setBrandsList(props.brandsList);
            return false;
        }
        Object.keys(props.brandsList).map((eachBrand) => {
            if (eachBrand.toUpperCase().includes(value.toUpperCase())) {
                tempList[eachBrand] = props.brandsList[eachBrand]
            }
        })
        setBrandsList({ ...tempList });
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
            <Modal className={`modal-dialog-right notification doctor-filter-modal`} modalClassName={transition ? "fadeInRight":"fadeOutRight"} isOpen={props.filterModalOpen} toggle={()=>{handleTransition("close")}}>
                <ModalHeader toggle={props.toggleFilterModal} close={CloseButton}>
                    Filters
                </ModalHeader>
                <ModalBody className="p-4">
                    <div className="filter-container">
                        {validate.isNotEmpty(props.subLevelCategories) && (!props.selectedSubCategoryId || props.selectedSubCategoryId.length <= 0) && <div className='each-filter-collapse'>
                            <a href="javascript:void(0)" title="subLevelCategories" className="collapse-toggle no-underline" onClick={() => setFilterCollapse((filterCollapse) => { return ({ ...filterCollapse, "subLevelCategories": !filterCollapse.subLevelCategories }) })}>
                                <div>
                                    <h6 className="mb-1">Categories</h6>
                                    {validate.isNotEmpty(filteredSubLevelCategories) && <small className="text-secondary">{filteredSubLevelCategories.map((each, index) => {
                                            if(index  == 0){
                                                return(
                                                    props.subLevelCategories.map((eachSubCategory) =>{
                                                        if(eachSubCategory.CategoryId == each){
                                                            return(
                                                                eachSubCategory.CategoryName
                                                            )
                                                        }
                                                    })
                                                )
                                            }else{
                                                return(
                                                    props.subLevelCategories.map((eachSubCategory)=>{
                                                        if(eachSubCategory.CategoryId == each){
                                                            return(
                                                                ", "+eachSubCategory.CategoryName
                                                            )
                                                        }
                                                    })
                                                )
                                            }
                                        })}</small>}
                                </div>
                                <span className="ml-2">
                                    <svg className={filterCollapse.subLevelCategories ? "rotate-bottom collapse-arrow" : "rotate-up collapse-arrow"} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                        <g transform="translate(-762 -906.838)">
                                            <rect fill="none" width="18" height="18" transform="translate(762 906.838)" />
                                            <path fill="#080808" d="M61.559,501.985l4.049-4.049a.917.917,0,0,0-1.3-1.3l-3.4,3.39-3.4-3.4a.921.921,0,0,0-1.569.649.912.912,0,0,0,.272.649l4.049,4.059A.922.922,0,0,0,61.559,501.985Z" transform="translate(710.032 416.557)" />
                                        </g>
                                    </svg>
                                </span>
                            </a>
                            <Collapse isOpen={filterCollapse.subLevelCategories}>
                                <div>
                                    {(validate.isNotEmpty(props.subLevelCategories) && props.subLevelCategories.length > 0) && props.subLevelCategories.map((each) => {
                                        return (<div class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" id={`filter_${each.CategoryId}`} onChange={(e) => { setSelectedFiltersInState("subLevelCategories", each.CategoryId); e.stopPropagation(); }} checked={filteredSubLevelCategories.includes(each.CategoryId)}  />
                                            <label class="custom-control-label" htmlFor={`filter_${each.CategoryId}`}>
                                                <div className="d-flex justify-content-between">
                                                    <span>{each.CategoryName}</span>
                                                    <span></span>
                                                </div>
                                            </label>
                                        </div>);
                                    })}
                                </div>
                            </Collapse>
                            <hr className="my-4  border-top-0" />
                        </div>}
                        {props.requestType !== "BRAND" && validate.isNotEmpty(brandsList) && Object.keys(brandsList).length > 0 && <div className='each-filter-collapse'>
                            <a href="javascript:void(0)" title="brands" className="collapse-toggle no-underline" onClick={() => setFilterCollapse((filterCollapse) => { return ({ ...filterCollapse, "brands": !filterCollapse.brands }) })}>
                                <div>
                                    <h6 className="mb-1">Brands</h6>
                                    {validate.isNotEmpty(filteredBrandList) && <small className="text-secondary">{filteredBrandList.map((eachSelectedBrand, index) => {
                                        if (filteredBrandList.length <= 1) {
                                            return (eachSelectedBrand);
                                        } else {
                                            index = index + 1;
                                            return (`${filteredBrandList.length != index ? eachSelectedBrand + ', ' : eachSelectedBrand}`);
                                        }
                                    })}</small>}
                                </div>
                                <span className="ml-2">
                                    <svg className={filterCollapse.brands ? "rotate-bottom collapse-arrow" : "rotate-up collapse-arrow"} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                        <g transform="translate(-762 -906.838)">
                                            <rect fill="none" width="18" height="18" transform="translate(762 906.838)" />
                                            <path fill="#080808" d="M61.559,501.985l4.049-4.049a.917.917,0,0,0-1.3-1.3l-3.4,3.39-3.4-3.4a.921.921,0,0,0-1.569.649.912.912,0,0,0,.272.649l4.049,4.059A.922.922,0,0,0,61.559,501.985Z" transform="translate(710.032 416.557)" />
                                        </g>
                                    </svg>
                                </span>
                            </a>
                            <Collapse isOpen={filterCollapse.brands}>
                                <div className="form-group has-float-label">
                                    <input type="search" className="form-control form-sm small" onChange={(e) => setSearchedText(e.target.value)} name="Filter Brands" placeholder=" " />
                                    <label for="Filter Brands">Filter Brands</label>
                                </div>
                                <div>
                                    {Object.keys(brandsList).length > 0 &&
                                        <React.Fragment>
                                            { validate.isEmpty(searchedText) ?
                                                Object.keys(brandsList).map((eachBrand) => {
                                                    return (<div class="custom-control custom-checkbox">
                                                        <input type="checkbox" class="custom-control-input" onChange={(e) => { setSelectedFiltersInState("brands", eachBrand); e.stopPropagation() }} id={`filter_${eachBrand}`} name={eachBrand} checked={filteredBrandList.indexOf(eachBrand) !== -1} />
                                                        <label class="custom-control-label" htmlFor={`filter_${eachBrand}`}>
                                                            <div className="d-flex justify-content-between">
                                                                <span>{eachBrand}</span>
                                                                <span class="text-secondary">{brandsList[eachBrand]}</span>
                                                            </div>
                                                        </label>
                                                    </div>);
                                                }) : 
                                                Object.keys(brandsList).map((eachBrand) => {
                                                    return (
                                                        <React.Fragment>
                                                            {eachBrand.toLowerCase().includes(searchedText.toLowerCase()) && <div class="custom-control custom-checkbox">
                                                                <input type="checkbox" class="custom-control-input" onChange={(e) => { setSelectedFiltersInState("brands", eachBrand); e.stopPropagation() }} id={`filter_${eachBrand}`} name={eachBrand} checked={filteredBrandList.indexOf(eachBrand) !== -1} />
                                                                <label class="custom-control-label" htmlFor={`filter_${eachBrand}`}>
                                                                    <div className="d-flex justify-content-between">
                                                                        <span>{eachBrand}</span>
                                                                        <span className="text-secondary">{brandsList[eachBrand]}</span>
                                                                    </div>
                                                                </label>
                                                            </div>}
                                                        </React.Fragment>);
                                                }) }
                                        </React.Fragment>}
                                            
                                </div>
                            </Collapse>
                            <hr className="my-4 border-top-0" />
                        </div>}
                        {<div className='each-filter-collapse'>
                            <a href="javascript:void(0)" title="availability" className="collapse-toggle no-underline" onClick={() => setFilterCollapse((filterCollapse) => { return ({ ...filterCollapse, "availability": !filterCollapse.availability }) })}>
                                <div>
                                    <h6 className="mb-1">Availability</h6>
                                    <small className="text-secondary">{excludeOutOfStock ? "Exclude Out Of Stock" : ""}</small>
                                </div>
                                <span className="ml-2">
                                    <svg className={filterCollapse.availability ? "rotate-bottom collapse-arrow" : "rotate-up collapse-arrow"} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                        <g transform="translate(-762 -906.838)">
                                            <rect fill="none" width="18" height="18" transform="translate(762 906.838)" />
                                            <path fill="#080808" d="M61.559,501.985l4.049-4.049a.917.917,0,0,0-1.3-1.3l-3.4,3.39-3.4-3.4a.921.921,0,0,0-1.569.649.912.912,0,0,0,.272.649l4.049,4.059A.922.922,0,0,0,61.559,501.985Z" transform="translate(710.032 416.557)" />
                                        </g>
                                    </svg>
                                </span>
                            </a>
                            <Collapse isOpen={filterCollapse.availability}>
                                <div>
                                    <div class="custom-control custom-checkbox">
                                        <input type="checkbox" class="custom-control-input" id="filter_availability" onClick={(e) => { setSelectedFiltersInState("availability", props.sortAndFilter.excludeOutOfStock); e.stopPropagation(); }} checked={excludeOutOfStock} />
                                        <label class="custom-control-label" for="filter_availability">
                                            <div className="d-flex justify-content-between">
                                                <span>Exclude Out Of Stock</span>
                                                <span></span>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </Collapse>
                            <hr className="my-4  border-top-0" />
                        </div>}
                        {validate.isNotEmpty(props.startAndEndPrice) && <React.Fragment>
                            <div className='each-filter-collapse'>
                            <a href="javascript:void(0)" title="price" className="collapse-toggle no-underline" onClick={() => setFilterCollapse((filterCollapse) => { return ({ ...filterCollapse, "price": !filterCollapse.price }) })}>
                                <div>
                                    <h6 className="mb-1">Price</h6>
                                </div>
                                <span className="ml-2">
                                    <svg className={filterCollapse.price ? "rotate-bottom collapse-arrow" : "rotate-up collapse-arrow"} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                        <g transform="translate(-762 -906.838)">
                                            <rect fill="none" width="18" height="18" transform="translate(762 906.838)" />
                                            <path fill="#080808" d="M61.559,501.985l4.049-4.049a.917.917,0,0,0-1.3-1.3l-3.4,3.39-3.4-3.4a.921.921,0,0,0-1.569.649.912.912,0,0,0,.272.649l4.049,4.059A.922.922,0,0,0,61.559,501.985Z" transform="translate(710.032 416.557)" />
                                        </g>
                                    </svg>
                                </span>
                            </a>
                            </div>
                            <div className="mr-2">
                                <Collapse isOpen={filterCollapse.price}>
                                    <InputRange minValue={props.startAndEndPrice.min} maxValue={props.startAndEndPrice.max} formatLabel={(value) => `Rs ${value}`} value={filteredPriceRange} onChange={(value) => setSelectedFiltersInState("price", value)} />
                                </Collapse>
                            </div>
                            </React.Fragment>
                        }
                    </div>
                </ModalBody>
                <ModalFooter>
                    <div className="w-100">
                        <div className="row">
                            <div className="col-4 pr-0">
                                <button className="btn brand-secondary rounded-pill btn-block custom-btn-lg" onClick={() => handleClear()}>Clear All</button>
                            </div>
                            <div className="col-8">
                                <button className="btn btn-brand-gradient rounded-pill  btn-block custom-btn-lg" onClick={() => handleApply()}>Apply</button>
                            </div>
                        </div>
                    </div>
                </ModalFooter>
            </Modal>
        </React.Fragment>
    );
}

export default CategoryDetailFilter