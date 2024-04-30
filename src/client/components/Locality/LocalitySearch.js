import React, {useState, useRef, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reloadSelectedLocalityInfo, getSelectedLocality } from '../../../redux/action/LocalityAction';
import CheckoutAction from '../../../redux/action/CheckoutAction';
import LocalityService from '../../services/LocalityService';
import Validate from '../../helpers/Validate';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import MyAccountService from '../../services/MyAccountService';
import debounce from '../../MedplusMart/components/Common/Debounce';

const LocalitySearch = (props) => {

    const dispatch = useDispatch();
    const validate = Validate();
    const localityService = LocalityService();
    const checkoutAction = CheckoutAction();
    const selectedLocality = getSelectedLocality();
    const recentlySearchLocalities = props.recentlySearchLocalities;
    const recentltySearchPlaceIds = Object.keys(props.recentlySearchLocalities).reverse().slice(0, 5)
    const [isRecentLocalityDisplay, setRecentLocalityDisplay] = useState(true);
    const [isLoading, setLoading] = useState(false);
    const [localitySuggestions, setLocalitySuggestions] = useState([]);
    const [localitySelectedName, setSelectedLocalityName] = useState("");
    const [localitySelectedList, setLocalitySelectedList] = useState([]);
    const localitySearchInputRef = useRef();
    const isFromChangeAddress = props.isFromChangeAddressModal;
    const userInfo  = useSelector(state => validate.isNotEmpty(state.userInfo) && validate.isNotEmpty(state.userInfo.userInfo) ?  state.userInfo.userInfo : null);

    useEffect(() => {
        if(!isFromChangeAddress) {
            localitySearchInputRef.current.focus();
        }
    },[])

    const getLocalityAutoSuggestions =debounce((searchText) => {
        if(isFromChangeAddress){
            props.setUserProfile({...props.userProfile, locality: searchText});
        }
        if(validate.isNotEmpty(searchText) && searchText.length > 0) {
            setRecentLocalityDisplay(false);
        } else {
            setRecentLocalityDisplay(true);
            setLocalitySuggestions([]);
        }
        if(validate.isNotEmpty(searchText) && searchText.trim().length >= 3){
            setLoading(true);
            localityService.getLocalityAutoSuggestions(searchText).then((response) => {
                if(validate.isNotEmpty(response) && 'SUCCESS' == response.statusCode){
                    let topGoogleLocations = [];
                    for(const eachGoogleLocation of response.dataObject.suggestedLocations) {
                        let commaIndex = eachGoogleLocation.location.indexOf(",");
                        let location = eachGoogleLocation.location;
                        let address = "India";
                        if(location != undefined && location.indexOf(",") != -1){
                            location = eachGoogleLocation.location.substring(0, commaIndex);
                            address = eachGoogleLocation.location.substring(commaIndex+1, eachGoogleLocation.location.length); 
                        }
                        eachGoogleLocation.mainLocation = location;
                        eachGoogleLocation.address = address;
                        topGoogleLocations.push(eachGoogleLocation);
                        if(topGoogleLocations.length >= 5) {
                            break;
                        }
                    }
                    setLocalitySuggestions(topGoogleLocations);
                    setLoading(false);
                } else if("FAILURE" == response.statusCode) {
                    console.log("Error: "+ response.message);
                    setLocalitySuggestions([]);
                }
            }).catch(function(error) {
            console.log(error);
            });
        }
    },500);

    const setSelectedLocality = (pinCode, location, placeId) => {
        setLoading(true);
        let locationObject = { pinCode : pinCode, location : location, placeId : placeId }
        localityService.setSelectedLocality(locationObject).then(async response => {
            if(validate.isNotEmpty(response) && response.statusCode === "SUCCESS") {
                checkoutAction.resetCheckoutDetails();
                await reloadSelectedLocalityInfo(props.isFromShoppingCart,props.isLabPage,dispatch);
                props.closeLocalityModal();
                if(validate.isNotEmpty(userInfo)){
                    await MyAccountService().clearFlexiCart(true);
                }
                setLoading(false);
            } else if("FAILURE" == response.statusCode) {
                console.log("Error: "+ response.message);
            }
        }).catch(function(error) {
            setLoading(false);
            console.log(error);
        });
    } 

    const locateMe =() => {
       //setLoading(true); 
        if ("geolocation" in navigator){  
            navigator.geolocation.getCurrentPosition(setLocationDetails, locationError); 
        }else{
            console.log("Browser doesn't support geolocation!");
        }
    }

    const setLocationDetails = (position) => {  
        let locationObject = { lattitude: position.coords.latitude, longitude: position.coords.longitude }
        localityService.setSelectedLocality(locationObject).then(async response => {   
            //setLoading(false);
            if(validate.isNotEmpty(response) && "SUCCESS" === response.statusCode){
            props.closeLocalityModal();
            await reloadSelectedLocalityInfo(props.isFromShoppingCart,props.isLabPage,dispatch);
            if(validate.isNotEmpty(userInfo)){
                await MyAccountService().clearFlexiCart(true);
            }
            }
            else {
                console.log("ERROR", response.message);
            }
        });
    }

    const locationError = (error) => {
        //setLoading(false);
        let errorMsg  = "";
        switch (error.code) {
            case 1:
                errorMsg = "Please enable location in your browser";
            break;
            default:
                errorMsg  = "We are unable to fetch your location currently."
        }
    }

    const localitySelection = (selectedLocality) => {
        setLocalitySelectedList(selectedLocality);
        let selectedLocalityName = "";
        selectedLocality.map((eachLocality) => {
            if(validate.isNotEmpty(eachLocality.location)){
                selectedLocalityName = eachLocality.location;
            }
        });
        setSelectedLocalityName(selectedLocalityName);
    }
    
    const handleonClear = () => {
        setLocalitySelectedList([]);
        setLocalitySuggestions([]);
    }

    const changeUserProfile = (location, placeId) =>{
        if(validate.isEmpty(placeId) && validate.isNotEmpty(location)) {
            localitySuggestions.map(eachLocality => {
                if(eachLocality.mainLocation.includes(location)) {
                    placeId = eachLocality.placeId;
                }
            })
        }
        let locationObject = { location: location, placeId: placeId }
        localityService.setSelectedLocality(locationObject).then(response => {   
            if(validate.isNotEmpty(response) && "SUCCESS" === response.statusCode){
                if(isFromChangeAddress){
                    props.setUserProfile({
                        ...props.userProfile,
                        locality : response.responseData.selectedLocality.locality,
                        city :  response.responseData.selectedLocality.city,
                        state : response.responseData.selectedLocality.state ,
                        pincode : response.responseData.selectedLocality.pincode,
                        localityId : response.responseData.selectedLocality.localityId
                    })
                }
            }
            else {
                console.log("ERROR", response.message);
            }
        }).catch(function(error) {
            console.log("Error while selecting locality in change address model" +error);
            return;
        });

    }

    return (
        <form className={isFromChangeAddress ? "form-inline locality change-address-locality" : "form-inline locality"} data-type="locality-search">
            <div className="inputgroup">
                <label className="sr-only" htmlFor="LocalityName">Locality Name</label>
                {(localitySelectedName.length > 0 && !isLoading) ?
                <a href="javascript:void(0)" className="icons clear-icn" onClick={handleonClear} title="Clear"></a> : ""}
                <AsyncTypeahead
                    id="LocalityName"
                    filterBy={() => true}
                    isLoading={isLoading}
                    labelKey={(eachLocation) => `${eachLocation.mainLocation}`}
                    minLength={3}
                    maxResults={100}
                    ref={localitySearchInputRef}
                    onKeyDown={event => { 
                        if (event.key === 'Enter') {
                            isFromChangeAddress? changeUserProfile(event.target.value, null) :setSelectedLocality(null,event.target.value,null);
                      }else{
                        getLocalityAutoSuggestions();
                      }}}
                    onSearch={getLocalityAutoSuggestions}
                    onChange={(selectedLocality) => {
                        localitySelection(selectedLocality)
                        }
                    }
                    onFocus={(event)=>{
                        if(!event.target.value || event.target.value.length==0){
                            setRecentLocalityDisplay(true);
                        }else{
                            setRecentLocalityDisplay(false);
                        }
                    }}
                    onBlur={(event)=>{
                        setRecentLocalityDisplay(false);
                        }
                    }
                    defaultInputValue ={isFromChangeAddress ? props.userProfile.locality : ""}
                    options={localitySuggestions}
                    placeholder="Type your area name / pincode"
                    selected={localitySelectedList}
                    renderMenuItemChildren = {(eachLocation, props, index) => {
                       return ( <React.Fragment key={index}>
                        <li className={index == 0 ? "no-gutters active" : "no-gutters"} onClick={() => !isFromChangeAddress ? setSelectedLocality(eachLocation.pinCode, eachLocation.location, eachLocation.placeId) : changeUserProfile(eachLocation.location,eachLocation.placeId)} >
                            <div className="col">
                                <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11 4a3 3 0 11-6 0 3 3 0 016 0z"/>
                                    <path d="M7.5 4h1v9a.5.5 0 01-1 0V4z"/>
                                </svg>
                                <p>
                                    <span className="d-block text-truncate" title={eachLocation.mainLocation}>{eachLocation.mainLocation}</span>
                                    <small className="m-0"><span className="d-block text-truncate" title={eachLocation.address}>{eachLocation.address}</span></small>
                                </p>
                                <svg className="chevron-right" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 01-.708-.708L10.293 8 4.646 2.354a.5.5 0 010-.708z" clipRule="evenodd"/>
                                </svg>
                            </div>
                         </li>
                        </React.Fragment>);
                    }}
                >
                 {(selected) => (
                        <div className="rbt-aux">
                            {!!selected.length && <Loader/>}
                        </div>
                )} 
                </AsyncTypeahead>
            </div>
            {/* <label className="sr-only" htmlFor="Submit">Submit</label>
            <button type="submit" className="btn btn-brand px-4" disabled>Submit</button> */}

            {!isFromChangeAddress && isRecentLocalityDisplay && validate.isNotEmpty(recentlySearchLocalities) && 
                <ul className="dropdown-menu recent-locality d-block">
                    <span className="caret"></span>
                    <h6 className="dropdown-header">Recently search locality</h6>
                    <div className="recent-list">
                        {recentltySearchPlaceIds.map((placeId, index) => {
                            return (<React.Fragment key={placeId}>
                                <li className="no-gutters" onMouseDown={() => setSelectedLocality(null, recentlySearchLocalities[placeId], placeId)}>
                                    <div className="col">
                                        <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" d="M8.515 1.019A7 7 0 008 1V0a8 8 0 01.589.022l-.074.997zm2.004.45a7.003 7.003 0 00-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 00-.439-.27l.493-.87a8.025 8.025 0 01.979.654l-.615.789a6.996 6.996 0 00-.418-.302zm1.834 1.79a6.99 6.99 0 00-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 00-.214-.468l.893-.45a7.976 7.976 0 01.45 1.088l-.95.313a7.023 7.023 0 00-.179-.483zm.53 2.507a6.991 6.991 0 00-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 01-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 01-.401.432l-.707-.707z" clipRule="evenodd"/>
                                            <path fillRule="evenodd" d="M8 1a7 7 0 104.95 11.95l.707.707A8.001 8.001 0 118 0v1z" clipRule="evenodd"/>
                                            <path fillRule="evenodd" d="M7.5 3a.5.5 0 01.5.5v5.21l3.248 1.856a.5.5 0 01-.496.868l-3.5-2A.5.5 0 017 9V3.5a.5.5 0 01.5-.5z" clipRule="evenodd"/>
                                        </svg>
                                        <p>
                                            {recentlySearchLocalities[placeId].split(',')[0]}
                                            <small>{(recentlySearchLocalities[placeId].split(',').slice(1, Object.keys(recentlySearchLocalities).length)).join()}</small>
                                        </p>
                                    </div>
                                </li>
                            </React.Fragment>);
                        })}
                    </div>
                </ul>
            }
            {!isFromChangeAddress && <div className="d-block w-100 mt-2">
                <p id="currentLocation" className="form-text text-muted w-100 mb-0">Current Location: <strong className="text-dark">{selectedLocality && selectedLocality.combination}</strong></p>
                <button type="button" className="btn btn-link btn-sm text-capitalize text-decoration-none mt-2 ml-n2" onClick={locateMe}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-1" width="24" height="24" viewBox="0 0 24 24">
                        <g transform="translate(-8921 -11863)">
                            <rect width="24" height="24" transform="translate(8921 11863)" fill="none"/>
                            <g transform="translate(8923 11865)">
                                <path d="M10,6.363A3.636,3.636,0,1,0,13.635,10,3.647,3.647,0,0,0,10,6.363Zm8.09,2.727a8.119,8.119,0,0,0-7.181-7.181V0H9.09V1.909A7.954,7.954,0,0,0,1.909,9.09H0v1.818H1.909A8.119,8.119,0,0,0,9.09,18.089V20h1.818V18.089a8.119,8.119,0,0,0,7.181-7.181H20V9.09ZM10,16.362A6.363,6.363,0,1,1,16.362,10,6.324,6.324,0,0,1,10,16.362Z"/>
                            </g>
                        </g>
                    </svg>
                    Locate Me
                </button>
            </div>}
        </form>
    )
}

export default LocalitySearch;
