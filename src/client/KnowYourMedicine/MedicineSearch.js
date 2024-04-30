import React, { useState, useRef, useEffect } from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import Validate from '../helpers/Validate';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const MedicineSearch = (props) => {
    const [productSearchType, setProductSearchType] = useState("Medicine");
    const [searchedText, setSearchedText] = useState('');
    const productSearchInputRef = useRef();
    const validate = Validate();
    const [showCancelButton, setShowCancelButton] = useState(false);

    useEffect(() => {
        setShowCancelButton(searchedText.length > 0 ? true : false);
    }, [searchedText]);

    const changeProductSearchType = (key) => {
        clearSearchResultAndText();
        setProductSearchType(key);
    }

    const clearSearchResultAndText = () => {
        setSearchedText('');
        productSearchInputRef.current.clear();
    }

    return (
        <React.Fragment>
            <form className="form-inline search w-100">
                <div className="input-group col p-0 product-search-container">
                    <div className="input-group-prepend  d-none  d-lg-block">
                        <div className="dropdown">
                            <UncontrolledDropdown>
                                <DropdownToggle className="btn btn-light" caret>
                                    {productSearchType}
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem title={"Medicine"} className={productSearchType == "Medicine" ? "custom-active" : ""} onClick={() => changeProductSearchType("Medicine")}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 18 18" className="align-text-top ml-n2 mr-2">
                                            <g id="tickmark_black_icon_18px" transform="translate(-1458 -558)">
                                                <path id="check" d="M18,6,8.375,15.625,4,11.25" transform="translate(1456 556)" fill="rgba(0,0,0,0)" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                                            </g>
                                        </svg>
                                        Medicine
                                    </DropdownItem>
                                    <DropdownItem title={"Compositions"} className={productSearchType == "Compositions" ? "custom-active" : ""} onClick={() => changeProductSearchType("Compositions")}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 18 18" className="align-text-top ml-n2 mr-2">
                                            <g id="tickmark_black_icon_18px" transform="translate(-1458 -558)">
                                                <path id="check" d="M18,6,8.375,15.625,4,11.25" transform="translate(1456 556)" fill="rgba(0,0,0,0)" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                                            </g>
                                        </svg>
                                        Compositions
                                    </DropdownItem>                                        
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </div>
                    </div>
                    {!showCancelButton && <button className="p-0 border-0 icons search-icn pointer" disabled role="button"></button>}
                    {showCancelButton && <button className="p-0 border-0 icons clear-icn pointer" onClick={() => clearSearchResultAndText()} ></button>}
                    <AsyncTypeahead
                        delay={500}
                        id="ProductSearch"
                        filterBy={() => true}
                        minLength={3}
                        maxResults={100}
                        ref={productSearchInputRef}
                        useCache={false}
                        onSearch={() => {console.log("Searching.....")}}
                        clearButton
                        positionFixed={true}
                        onChange={(text) => {
                            setShowCancelButton(text?.length > 0 ? true : false);
                        }}
                        value={searchedText}
                        placeholder={productSearchType === "Medicine" ? "Search for...Pharmacy Products" : "Search for...Compositions"}
                        inputProps={{ className: 'w-100' }}
                    >
                    </AsyncTypeahead>
                </div>
            </form>
        </React.Fragment>
    )

}
export default MedicineSearch;
