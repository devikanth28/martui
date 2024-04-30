import React, { useEffect, useRef, useState } from 'react';
import { AsyncTypeahead, Menu, MenuItem } from 'react-bootstrap-typeahead';
import RecentlySearchedTests from '../components/MedplusLabs/components/Common/RecentlySearchedTests';
import CONFIG from '../constants/ServerConfig';
import db from '../DataBase/LocalDB';
import Validate from '../helpers/Validate';
import CommonSearchService from '../services/CommonSearchService';
import {sendDoctorsSearchData,sendDiagnosticsSearchData} from '../Analytics/Analytics'
import { DIAGNOSTICS_URL_PREFIX } from '../components/MedplusLabs/constants/LabConstants';
import { Link } from 'react-router-dom';

export default props => {

    let requestFrom = props.isLabPage ? "lab" : "doctor";
    let recentSearchLocalDbKey = props.isLabPage ? "RECENTLY_VIEWED" : "RECENTLY_CONSULTED";
    let placeHolderText = props.isLabPage ? "Search Lab Test or Health package" : "Eg: Sam / Physician / Fever / Koti";
    let searchRequestObj = {};
    const recentlySearchedLimit = 10;
    searchRequestObj['requestFrom'] = requestFrom;

    const [searchInput, setSearchInput] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const [noSearchFound, setNoSearchFound] = useState(false);
    const [recentData, setRecentData] = useState(RecentlySearchedTests.getData())
    const [isLoading, setLoading] = useState(false);
    const productSearchInputRef = useRef();
    const [recentSearchDisplay, setRecentSearchDisplay] = useState(false);
    const [headerText, setHeaderText] = useState("Tests");
    const [cursorPoint, setCursorPoint] = useState(-1);
    
    useEffect(() => {
        if (Validate().isEmpty(searchInput)) {
            setRecentData(Validate().isNotEmpty(db.getValue(recentSearchLocalDbKey)) ? db.getObject(recentSearchLocalDbKey) : []);
        }
    }, [searchInput]);

    const clearSearchResultAndText = () => {
        setSearchInput("");
        setSearchResults([]);
        setRecentSearchDisplay(true);
        setCursorPoint(-1);
        productSearchInputRef.current.clear();
    }

    const insertLocalStorage = (recentlyBookedOrSearchedList) => {
        return db.setObject(recentSearchLocalDbKey, recentlyBookedOrSearchedList);
    }

    const getLocalStorage = (localDbkey) => {
        return db.getValue(localDbkey);
    }

    const updateLocalStorage = (document) => {
        let recentlyBookedOrSearchedList = getLocalStorage(recentSearchLocalDbKey);
        if (Validate().isEmpty(recentlyBookedOrSearchedList)) {
            recentlyBookedOrSearchedList = [];
            recentlyBookedOrSearchedList.push(document);
        } else {
            recentlyBookedOrSearchedList = JSON.parse(recentlyBookedOrSearchedList);
            recentlyBookedOrSearchedList = recentlyBookedOrSearchedList.filter(item => item.documentDisplayName != document.documentDisplayName);
            recentlyBookedOrSearchedList.unshift(document);
            if (recentlyBookedOrSearchedList.length > recentlySearchedLimit) {
                recentlyBookedOrSearchedList.pop();
            }
        }
        insertLocalStorage(recentlyBookedOrSearchedList);
    }

    const searchData = async (searchInput) => {
        if (Validate().isEmpty(searchInput)) {
            setSearchInput("");
            setRecentSearchDisplay(true);
            setNoSearchFound(false);
            return;
        } else {
            setRecentSearchDisplay(false);
            if (searchInput.length < 3) {
                setSearchResults([]);
                setNoSearchFound(false);
                return;
            }
        }
        setCursorPoint(-1);
        setLoading(true);
        setSearchInput(searchInput.trim());
        searchRequestObj['searchKey'] = searchInput.trim();
        await CommonSearchService().getCommonSearchResults(searchRequestObj).then(data => {
            if (Validate().isNotEmpty(data) && data.statusCode == "SUCCESS" && Validate().isNotEmpty(data["dataObject"]) && Validate().isNotEmpty(data.dataObject.displaySearchItems)) {
                setSearchResults(data.dataObject.displaySearchItems);
                setNoSearchFound(false);
                if ("lab" === searchRequestObj['requestFrom']) {
                    setHeaderText(data.dataObject.displaySearchHeader);
                }
            } else {
                setNoSearchFound(true);
                setSearchResults([]);
            }
            setLoading(false)
        }).catch(function (error) {
            setSearchResults([]);
            setLoading(false);
        });
    }

    const handleClickOnSearchItem = (document) => {
        updateLocalStorage(document);
        setRecentData(getLocalStorage(recentSearchLocalDbKey));
        if(props.isLabPage){
            sendDiagnosticsSearchData(searchInput,document.documentDisplayName)
        } else if (props.isDoctorPage){
            sendDoctorsSearchData(searchInput, document.documentDisplayName);
        }
        window.location.href = CONFIG.REDIRECT_HOME_URL + document.documentRedirectUrl?.replace(/-+/g, "-");
    }

    const handleKeyDown = (event) => {
    	if ((Validate().isEmpty(searchResults) && !recentSearchDisplay) || (recentSearchDisplay && Validate().isEmpty(recentData))) {
            return;
        }
        let listLength = recentSearchDisplay ? recentData.length : searchResults.length;
        if (event.keyCode === 38 && cursorPoint > 0) {
            let cursor = cursorPoint - 1;
            setCursorPoint(cursor);
            let displayVal = recentSearchDisplay ? recentData[cursor].documentDisplayName : searchResults[cursor].documentDisplayName;
            if (!recentSearchDisplay)
                setSearchInput(displayVal);
        } else if (event.keyCode === 40 && (cursorPoint < (listLength - 1))) {
            let cursor = cursorPoint + 1;
            setCursorPoint(cursor);
            let displayVal = recentSearchDisplay ? recentData[cursor].documentDisplayName : searchResults[cursor].documentDisplayName;
            if (!recentSearchDisplay)
                setSearchInput(displayVal);
        } else if (event.keyCode === 13 && cursorPoint > -1) {
            let displayVal = recentSearchDisplay ? recentData[cursorPoint] : searchResults[cursorPoint];
            if (!recentSearchDisplay)
                setSearchInput(displayVal);
            handleClickOnSearchItem(displayVal);
            setRecentSearchDisplay(false);
        }
    }

    return (
        <React.Fragment>
            <form className="form-inline search">
                <div className="input-group col p-0 labs product-search-container">
                    <div className="input-group-prepend">
                        {(Validate().isEmpty(searchInput)) && !isLoading && <button role="button" className="icons search-icn pointer border-0" title="" disabled></button>}
                        {Validate().isNotEmpty(searchInput) && !isLoading && <button role="button" className="icons clear-icn pointer border-0" title="" onClick={() => clearSearchResultAndText()}  ></button>}
                    </div>
                    <AsyncTypeahead
                        delay={500}
                        id="commonSearchKey"
                        isLoading={isLoading}
                        labelKey={(suggestion) => `${suggestion.documentDisplayName}`}
                        filterBy={() => true}
                        minLength={2}
                        maxResults={100}
                        ref={productSearchInputRef}
                        onKeyDown={(event) => handleKeyDown(event)}
                        onFocus={(event) => {
                            if (Validate().isEmpty(event.target.value)) {
                                setRecentSearchDisplay(true);
                            } else {
                                setRecentSearchDisplay(false);
                            }
                        }}
                        onInputChange={(searchInput) => {
                            if (Validate().isEmpty(searchInput)) {
                                clearSearchResultAndText()
                            }
                        }}
                        onBlur={() => { setRecentSearchDisplay(false) }}
                        useCache={false}
                        clearButton
                        positionFixed={true}
                        onSearch={searchData}
                        value={searchInput}
                        placeholder={placeHolderText}
                        inputProps={{ className: 'w-100 lab-search' }}
                        options={searchResults}
                        renderMenu={(suggestions) => {
                            return (
                                <React.Fragment>
                                    <Menu id="CommonSearch" className="search-result labs">
                                        {isLoading && <div>
                                            <div className="dropdown-item disabled">
                                                <div className=" no-data-to-show" style={{ "minHeight": "50vh" }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#cecece" width="89.255" height="79.22" viewBox="0 0 89.255 79.22">
                                                        <g transform="translate(970.634 3280.534)">
                                                            <path class="a" d="M-1050.729-3947.728l-8.863-8.864a1.411,1.411,0,0,1,0-2l.971-.971-2.979-2.978a15.335,15.335,0,0,1-9.8,3.546,15.343,15.343,0,0,1-15.343-15.343,15.342,15.342,0,0,1,15.341-15.343,15.345,15.345,0,0,1,10.851,4.495,15.339,15.339,0,0,1,.947,20.647l2.98,2.979.971-.972a1.413,1.413,0,0,1,1-.413,1.41,1.41,0,0,1,1,.413l8.864,8.861a1.412,1.412,0,0,1,0,2l-3.94,3.94a1.413,1.413,0,0,1-1,.418A1.407,1.407,0,0,1-1050.729-3947.728Zm-5.869-9.863,6.867,6.868,1.943-1.943-6.867-6.869Zm-27.325-16.748a12.519,12.519,0,0,0,12.513,12.522,12.52,12.52,0,0,0,12.523-12.514,12.517,12.517,0,0,0-3.662-8.85,12.425,12.425,0,0,0-8.852-3.671h-.006A12.518,12.518,0,0,0-1083.922-3974.338Zm-48.331,8.516a1.381,1.381,0,0,1-1.38-1.38v-28.976a1.381,1.381,0,0,1,1.38-1.38h17.938v-27.6a1.379,1.379,0,0,1,1.379-1.379h38.635a1.38,1.38,0,0,1,1.38,1.379v27.6h17.937a1.381,1.381,0,0,1,1.38,1.38v13.653a20.471,20.471,0,0,0-2.76-3.209v-9.064h-35.876v26.216h1.783a20.192,20.192,0,0,0,.515,2.761Zm1.38-2.761H-1095V-3994.8h-9.659v6.9a1.38,1.38,0,0,1-1.38,1.379h-13.8a1.379,1.379,0,0,1-1.379-1.379v-6.9h-9.659Zm12.417-20.7h11.039v-5.52h-11.039Zm6.9-8.279h35.876v-26.216h-9.659v6.9a1.379,1.379,0,0,1-1.379,1.379h-13.8a1.379,1.379,0,0,1-1.379-1.379v-6.9h-9.66Zm12.418-20.7h11.039v-5.52h-11.039Zm-17.937,46.914v-2.76h2.76v2.76Zm-5.52,0v-2.76h2.76v2.76Zm-5.52,0v-2.76h2.76v2.76Zm63.966-2.8a7.069,7.069,0,0,0-7.061-7.061v-2.824a9.9,9.9,0,0,1,9.884,9.885Zm-33.61-26.176v-2.759h2.76v2.759Zm-5.519,0v-2.759h2.76v2.759Zm-5.519,0v-2.759h2.759v2.759Z" transform="translate(163 746)"></path>
                                                        </g>
                                                    </svg>
                                                    <h6 className="mt-3 text-secondary font-weight-normal mb-0">Searching...</h6>
                                                </div>
                                            </div>
                                        </div>}
                                        <div className={"product-list"} style={{ minHeight: '0px' }}>
                                            {!isLoading && ("lab" === searchRequestObj['requestFrom']) && Validate().isNotEmpty(suggestions) && <Menu.Header>{headerText}</Menu.Header>}
                                            {!isLoading && Validate().isNotEmpty(suggestions) && suggestions.map((eachSuggestion, index) => {
                                                return (
                                                    <MenuItem className={cursorPoint === index ? 'active no-gutters' : 'no-gutters'} key={eachSuggestion.documentDisplayName} option={eachSuggestion} onClick={() => handleClickOnSearchItem(eachSuggestion)}>
                                                        <div className="container-fluid">
                                                            <div className="row">
                                                                <div className="col">
                                                                    <p className="product-name">{eachSuggestion.documentDisplayName}</p>
                                                                    {Validate().isNotEmpty(eachSuggestion.documentSubText) &&
                                                                        <p className="mb-0 small text-secondary" style={{ whiteSpace: "break-spaces" }}>
                                                                            {eachSuggestion.documentSubText.trim()}
                                                                        </p>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </MenuItem>
                                                )
                                            })}
                                        </div>
                                        {!isLoading && props.isLabPage && Validate().isNotEmpty(suggestions) && <div className="dropdown-footer" role="heading"><a href={`${DIAGNOSTICS_URL_PREFIX}/search-all-tests/` + searchInput} className="btn btn-brand btn-block search-btn">View All</a></div>}
                                        {!isLoading && Validate().isEmpty(suggestions) && Validate().isNotEmpty(searchInput) && <div className="dropdown-item disabled">No search found</div>}
                                    </Menu>
                                </React.Fragment>
                            )
                        }}
                    />
                </div>
                {recentSearchDisplay && Validate().isEmpty(searchInput) && Validate().isNotEmpty(recentData) &&
                    <div className="dropdown-menu recent-search-results d-block labs-recent-search">
                        <div className="searches-div">
                            <div class="dropdown-header" role="heading">Recently Searched</div>
                            <div className="recent-search-list">
                                {recentData && recentData.map((eachData, index) => {
                                    return (
                                        <button role="button" className={cursorPoint === index ? 'active dropdown-item' : 'dropdown-item'} title={eachData.documentDisplayName} onMouseDown={() => { setSearchInput(eachData.documentDisplayName); handleClickOnSearchItem(eachData) }}>
                                            <div className="product-details">
                                                <h6 className="product-title text-truncate">{eachData.documentDisplayName}</h6>
                                                {Validate().isNotEmpty(eachData.documentSubText) && <p className="text-secondary mb-0 mt-2 small" style={{ whiteSpace: "break-spaces" }}>{eachData.documentSubText.trim()}</p>}
                                            </div>
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                }
            </form>
        </React.Fragment>
    )
}

