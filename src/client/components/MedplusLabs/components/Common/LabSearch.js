import React, {useState} from "react";
import { useRef } from "react";
import { AsyncTypeahead,Menu,MenuItem} from 'react-bootstrap-typeahead';
import Validate from "../../../../helpers/Validate";
import RecentlySearchedTests from "./RecentlySearchedTests";
import LabCatalogService from "../../Services/LabCatalogService";
import { getCategoryNameForUrl} from "../../../../helpers/CommonUtil";
import { DIAGNOSTICS_URL_PREFIX } from "../../constants/LabConstants";

const LabSearch=(props) =>{
    const [searchValue, setSearchValue] = useState()
    const [searchResults, setSearchResults] = useState([])
    const [recentData, setRecentData] = useState(RecentlySearchedTests.getData())
    const validate = Validate();
    const labCatalogService = LabCatalogService();
    const [isLoading, setLoading] = useState(false);
    const productSearchInputRef = useRef();
    const [recentSearchDisplay, setRecentSearchDisplay] = useState(false);
    const [headerText, setHeaderText] = useState("Tests");

    const searchLabTests = async (searchText) => {
        setLoading(true);
        setRecentSearchDisplay(false);
        setSearchValue(searchText);
        if (searchText.length < 2) {
            setSearchResults([]);
            return;
        }
        labCatalogService.getLabTestsSearchSuggestions({searchKey: searchText}).then((data)=>{
            if(validate.isNotEmpty(data) && validate.isNotEmpty(data["dataObject"]) && validate.isNotEmpty(data["dataObject"]["pathTests"])){
               setSearchResults(data["dataObject"]["pathTests"]);
               let tests = data["dataObject"]["pathTests"];
               let profileTests = tests.filter(each => each.isProfile || each.package);
               if(validate.isNotEmpty(profileTests) && profileTests.length != tests.length ){
                setHeaderText("Tests & Packages");
               } else if (profileTests.length == tests.length) {
                setHeaderText("Packages")
               } else {
                setHeaderText("Tests");
               }
            } else {
                setSearchResults([]);
            }
            setLoading(false);
       }).catch(e => {
            setSearchResults([]);
            setLoading(false);
            console.log("Error: ",e);
       });
    };

    const redirectToTestPage = (test) => {
        RecentlySearchedTests.enqueue(test);
        setRecentData(RecentlySearchedTests.getData());
        props.history.push(`${DIAGNOSTICS_URL_PREFIX}/testdetails/`+getCategoryNameForUrl(test.name,test.code));;
    }

    const clearSearchResultAndText = () => {
        setSearchValue();
        setSearchResults([]);
        productSearchInputRef.current.clear();
    }

    return(
        <React.Fragment>
            <form className="form-inline search">
                <div className="input-group col p-0 labs product-search-container">
                    <div className="input-group-prepend">
                        {(validate.isEmpty(searchValue)) && !isLoading && <a className="icons search-icn pointer" title=""></a>}
                        {validate.isNotEmpty(searchValue) && !isLoading && <a className="icons clear-icn pointer" title="" onClick={() => clearSearchResultAndText()} ></a>}
                    </div>
                    <AsyncTypeahead
                        delay ={500}
                        id="LabSearch"
                        isLoading={isLoading}
                        labelKey = {(suggestion) => `${suggestion.name}`}
                        filterBy={() => true}
                        minLength={2}
                        maxResults={100}
                        ref={productSearchInputRef}
                        onKeyDown={event => {
                            if (event.key === 'Enter') {
                                setSearchValue(event.target.value);
                            }
                        }}
                        onFocus={(event)=>{
                            if(validate.isEmpty(event.target.value)){
                                setRecentSearchDisplay(true);
                            }else{
                                setRecentSearchDisplay(false);
                            }
                        }}
                        onBlur={()=>{setRecentSearchDisplay(false)}}
                        useCache={false}
                        clearButton
                        positionFixed={true}
                        onSearch={searchLabTests}
                        value={searchValue}
                        placeholder={"Search Lab Test or Health package"}
                        inputProps={{ className: 'w-100 lab-search' }}
                        options={searchResults}
                        renderMenu = {(suggestions) => {
                            return(  
                                <React.Fragment>
                                    <Menu id="LabSearch" className="search-result labs">
                                        {isLoading && <div>
                                            <div className="dropdown-item disabled">
                                                <div className=" no-data-to-show" style={{"minHeight" : "50vh"}}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="#cecece" width="89.255" height="79.22" viewBox="0 0 89.255 79.22">
                                                        <g transform="translate(970.634 3280.534)">
                                                            <path class="a" d="M-1050.729-3947.728l-8.863-8.864a1.411,1.411,0,0,1,0-2l.971-.971-2.979-2.978a15.335,15.335,0,0,1-9.8,3.546,15.343,15.343,0,0,1-15.343-15.343,15.342,15.342,0,0,1,15.341-15.343,15.345,15.345,0,0,1,10.851,4.495,15.339,15.339,0,0,1,.947,20.647l2.98,2.979.971-.972a1.413,1.413,0,0,1,1-.413,1.41,1.41,0,0,1,1,.413l8.864,8.861a1.412,1.412,0,0,1,0,2l-3.94,3.94a1.413,1.413,0,0,1-1,.418A1.407,1.407,0,0,1-1050.729-3947.728Zm-5.869-9.863,6.867,6.868,1.943-1.943-6.867-6.869Zm-27.325-16.748a12.519,12.519,0,0,0,12.513,12.522,12.52,12.52,0,0,0,12.523-12.514,12.517,12.517,0,0,0-3.662-8.85,12.425,12.425,0,0,0-8.852-3.671h-.006A12.518,12.518,0,0,0-1083.922-3974.338Zm-48.331,8.516a1.381,1.381,0,0,1-1.38-1.38v-28.976a1.381,1.381,0,0,1,1.38-1.38h17.938v-27.6a1.379,1.379,0,0,1,1.379-1.379h38.635a1.38,1.38,0,0,1,1.38,1.379v27.6h17.937a1.381,1.381,0,0,1,1.38,1.38v13.653a20.471,20.471,0,0,0-2.76-3.209v-9.064h-35.876v26.216h1.783a20.192,20.192,0,0,0,.515,2.761Zm1.38-2.761H-1095V-3994.8h-9.659v6.9a1.38,1.38,0,0,1-1.38,1.379h-13.8a1.379,1.379,0,0,1-1.379-1.379v-6.9h-9.659Zm12.417-20.7h11.039v-5.52h-11.039Zm6.9-8.279h35.876v-26.216h-9.659v6.9a1.379,1.379,0,0,1-1.379,1.379h-13.8a1.379,1.379,0,0,1-1.379-1.379v-6.9h-9.66Zm12.418-20.7h11.039v-5.52h-11.039Zm-17.937,46.914v-2.76h2.76v2.76Zm-5.52,0v-2.76h2.76v2.76Zm-5.52,0v-2.76h2.76v2.76Zm63.966-2.8a7.069,7.069,0,0,0-7.061-7.061v-2.824a9.9,9.9,0,0,1,9.884,9.885Zm-33.61-26.176v-2.759h2.76v2.759Zm-5.519,0v-2.759h2.76v2.759Zm-5.519,0v-2.759h2.759v2.759Z" transform="translate(163 746)"></path>
                                                        </g>
                                                    </svg>
                                                    <h6 className="mt-3 text-secondary font-weight-normal mb-0">Searching...</h6>
                                                </div>
                                            </div>
                                        </div>}
                                        <div className={"product-list"} style={{ minHeight:'0px'}}>
                                        {!isLoading && validate.isNotEmpty(suggestions) && <Menu.Header>{headerText}</Menu.Header> }
                                        {!isLoading && validate.isNotEmpty(suggestions) && suggestions.map(eachSuggestion => {
                                            return(
                                                <MenuItem className="no-gutters" key={eachSuggestion.code} option={eachSuggestion} onClick={() => redirectToTestPage(eachSuggestion)}>
                                                    <div className="container-fluid">
                                                        <div className="row">
                                                            <div className="col">
                                                                <p className="product-name">
                                                                    {eachSuggestion.name}
                                                                </p>
                                                                { eachSuggestion.isProfile ?
                                                                    eachSuggestion.noOfParameters > 0 && <p className="mb-0 small" style={{whiteSpace:"break-spaces"}}>{`${eachSuggestion.noOfParameters} ${eachSuggestion.noOfParameters > 1 ? 'Parameters' : 'Parameter'} Included`}</p>
                                                                    : (validate.isNotEmpty(eachSuggestion.alternateKeywords) && eachSuggestion.alternateKeywords.length > 0) && 
                                                                    <p className="mb-0 small" style={{whiteSpace:"break-spaces"}}>
                                                                        { eachSuggestion.alternateKeywords.join(",") }
                                                                    </p>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </MenuItem>
                                            )
                                        })}
                                        </div>
                                        {!isLoading && validate.isNotEmpty(suggestions) && <div className="dropdown-footer" role="heading"><a href={`${DIAGNOSTICS_URL_PREFIX}/search-all-tests/`+searchValue} className="btn btn-brand btn-block search-btn">View All Tests</a></div>}
                                        {!isLoading && validate.isEmpty(suggestions) && validate.isNotEmpty(searchValue) && <div className="dropdown-item disabled">No Tests Found</div>}
                                    </Menu>
                                </React.Fragment>
                            )}}
                        />
                </div>
                {recentSearchDisplay && validate.isEmpty(searchValue) && validate.isNotEmpty(recentData) && 
                    <div className="dropdown-menu recent-search-results d-block labs-recent-search">
                        <div className="searches-div">
                            <div class="dropdown-header" role="heading">Recently Searched</div>
                            <div className="recent-search-list">
                                {recentData && recentData.map(eachTest => {
                                    return (
                                        <a className="dropdown-item" href="javascript:void(0)" title={eachTest.name} onMouseDown={() => {setSearchValue(eachTest.name);redirectToTestPage(eachTest)}}>
                                            <div className="product-details">
                                                <h6 className="product-title text-truncate">{eachTest.name}</h6>
                                                { eachTest.isProfile ? eachTest.noOfParameters + ' Parameters Included' : (validate.isNotEmpty(eachTest.alternateKeywords) && eachTest.alternateKeywords.length > 0) && <p className="text-secondary mb-0 mt-2">{ eachTest.alternateKeywords.join(",") }</p> }
                                            </div>
                                        </a>
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
export default LabSearch;
