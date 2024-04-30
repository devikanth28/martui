import React, { useEffect, useRef, useState } from 'react';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { useSelector } from 'react-redux';
import BreadCrumbAction from '../../../../../../redux/action/BreadCrumbAction';
import Alert, { ALERT_TYPE_INFO } from '../../../../../components/Common/Alert';
import Validate from '../../../../../helpers/Validate';
import LocalityService from '../../../../../services/LocalityService';
import MartAdminService from '../../../../services/MartAdminService';
import debounce from '../../../Common/Debounce';

const LocalityInfo = (props) => {
    const validate = Validate();
    const breadCrumbAction = BreadCrumbAction();
    const localityService = LocalityService();

    const [localityDetails, setLocalityDetails] = useState({});
    const [value, setValue] = useState('');
    const [localitySuggestions, setLocalitySuggestions] = useState([]);
    const [selectedlocalitySuggestion, setSelectedlocalitySuggestion] = useState([]);
    const selectedLocality = useSelector(state => state.locality && state.locality.selectedLocality);
    const [localitySelection, setLocalitySelection] = useState('store');
    const [islocalitySuggestionsLoading, setLocalitySuggestionsLoading] = useState(false);
    const localityFieldRef = useRef();
    const [alertInfo, setAlertInfo] = useState({});



    const [localityValue, setLocalityValue] = useState({
        'store': '',
        'Lat-Long': '',
        'Locality': ''
    });

    const localityBasedSearch = [
        {
            name: 'store',
            placeholder: 'Ex:INAPHYD00384'
        },
        {
            name: 'Lat-Long',
            placeholder: 'Ex:16.34235,78.23156'
        },
        {
            name: 'Locality',
            placeholder: 'Type your area name / pincode'
        }
    ]

    useEffect(() => {
        getLocalityDetails();
        breadCrumbAction.pushBreadCrumbs({ name: 'Locality Info', url: props.location.pathname });
    }, []);

    const getLocalityDetails = (obj) => {
        MartAdminService().getLocalityDetails(obj).then(response => {
            if (validate.isNotEmpty(response) && response.statusCode === 'SUCCESS' && validate.isNotEmpty(response.dataObject)) {
                setLocalityDetails(response.dataObject);
            }
            else if (validate.isNotEmpty(response) && response.statusCode === 'FAILURE' && validate.isNotEmpty(response.message)) {
                setLocalityDetails({});
                setAlertInfo({ message: response.message, type: ALERT_TYPE_INFO })

            }
        }).catch((err) => {
            console.log(err);
        }
        );
    }

    const localityDetailSubmitForm = (event) => {
        event.preventDefault();
        let obj = {};
        if (localitySelection === 'store') {
            if (validate.isEmpty(value) || value.length != 12) {
                setAlertInfo({ message: 'Please enter valid StoreId', type: ALERT_TYPE_INFO });
                return false;
            }
            obj = { storeId: value }
        } else if (localitySelection === 'Lat-Long') {
            if (validate.isEmpty(value) || value.split(',').length != 2) {
                setAlertInfo({ message: 'Please enter Valid Latitude and Longitude', type: ALERT_TYPE_INFO });
                return false;
            }
            obj = { latLong: value }
        }
        else if (localitySelection === 'Locality') {
            if (validate.isEmpty(value)) {
                setAlertInfo({ message: 'Please select Valid Location', type: ALERT_TYPE_INFO });
                return false;
            }
            obj = { placeId: selectedlocalitySuggestion.placeId, location: selectedlocalitySuggestion.location }
        }
        getLocalityDetails(obj);
        setValue('');
        setLocalityValue({
            'store': '',
            'Lat-Long': '',
            'Locality': ''
        });
        setLocalitySelection('store');
        setSelectedlocalitySuggestion({});
        if (localityFieldRef.current) {
            localityFieldRef.current.clear();
        }
    }


    const setAsLocality = () => {
        if (!validate.isNotEmpty(localityDetails.locality.locationLatLong)) {
            setAlertInfo({ message: 'Invalid Locality', type: ALERT_TYPE_INFO });
            return false;
        }
        if ((localityDetails.locality.locationLatLong.split(',')).length != 2) {
            setAlertInfo({ message: 'Invalid Lat Lng', type: ALERT_TYPE_INFO });
            return false;
        }
        let locationObject = { pinCode: validate.isNotEmpty(localityDetails.locality.pincode)?localityDetails.locality.pincode:null , location: localityDetails.locality.combination, placeId: localityDetails.locality.placeId }
        localityService.setSelectedLocality(locationObject).then(response => {
            if (validate.isNotEmpty(response) && response.statusCode === 'SUCCESS' && validate.isNotEmpty(response.dataObject)) {
                window.location.href = '/';
            }
            else if (response.statusCode === 'FAILURE' && validate.isNotEmpty(response.message)) {
                setLocalityDetails({});
                setAlertInfo({ message: response.message, type: ALERT_TYPE_INFO });
            }
        }).catch((err) => {
            console.log(err);
            setAlertInfo({ message: 'Internal server problem', type: ALERT_TYPE_INFO })
        })
    }


    const setLocationParams = (placeId, location) => {
        if (validate.isNotEmpty(placeId) || validate.isNotEmpty(location)) {
            setSelectedlocalitySuggestion({ location: location, placeId: placeId });
            setValue(location);
            setLocalityValue({
                'store': '',
                'Lat-Long': '',
                'Locality': location
            });
            setLocalitySuggestions([]);
        } else {
            setAlertInfo({ message: 'Please select Valid Location', typeL: ALERT_TYPE_INFO });
            setLocalitySuggestions([]);
        }
    }

    const handleLocalityBasedSearch = (e) => {
        setLocalitySelection(e.target.name);
        setValue('');
        setLocalityValue({
            'store': '',
            'Lat-Long': '',
            'Locality': ''
        });
        setLocalitySuggestions([]);
        if (localityFieldRef.current) {
            localityFieldRef.current.clear();
        }
    }


    const handleLocalityValue = (e) => {
        const { value, name } = e.target;
        if (name === localitySelection) {
            setLocalityValue((prevState) => ({
                ...prevState,
                [name]: value
            }));
        }
        setValue(value);
    };

    const getLocationSuggestions = debounce((searchTerm) => {
        if (validate.isNotEmpty(searchTerm) && searchTerm.trim().length >= 3) {
            setLocalitySuggestionsLoading(true);
            localityService.getLocalityAutoSuggestions(searchTerm).then(response => {
                if (validate.isNotEmpty(response) && validate.isNotEmpty(response.statusCode) && response.statusCode === 'SUCCESS' && validate.isNotEmpty(response.dataObject)) {
                    if (validate.isNotEmpty(response.dataObject.suggestedLocations)) {
                        setLocalitySuggestions(response.dataObject.suggestedLocations);
                    }
                    else {
                        setLocalitySuggestions([]);
                    }
                } else {
                    setLocalitySuggestions([]);
                }
                setLocalitySuggestionsLoading(false);

            }).catch((err) => {
                console.log(err);
                setLocalitySuggestionsLoading(false);

            });
        }
        else {
            setLocalitySuggestions([]);
        }
    }, 500);

    return (
        <React.Fragment>
            {validate.isNotEmpty(alertInfo) && <Alert alertInfo={alertInfo} onDurationEnd={setAlertInfo} duration={3000} />}

            <section>
                <h1 className='h5 mb-3 header p-3'>Locality Info</h1>
                <div className='p-3'>
                    <form>
                        <div className='card'>
                            <div className='row p-3' >
                                {localityBasedSearch.map((item) => {
                                    return (
                                        <div className={`col-3`} key={item.name} >
                                            <label className={`${item.name == 'Locality' ? 'mr-3' : ''}`}>
                                                <input
                                                    name={item.name}
                                                    type='radio'
                                                    value={item.name}
                                                    checked={localitySelection === item.name}
                                                    onChange={(e) => handleLocalityBasedSearch(e)}
                                                    className='mr-2'
                                                />
                                                {item.name}</label>
                                            {item.name != "Locality" && <input autocomplete='off' type='text' name={item.name} placeholder={item?.placeholder} value={localityValue[item.name]} onChange={(e) => handleLocalityValue(e)} className={`${localitySelection !== item.name ? 'locality-select cursor-not-allowed' : ''} ml-3 form-control w-auto`} disabled={localitySelection !== item.name} />}
                                            {item.name === "Locality" &&

                                                <div className='w-75'>
                                                    <form className={"locality"} data-type="locality-search">
                                                        <AsyncTypeahead
                                                            name={item.name}
                                                            placeholder={item?.placeholder}
                                                            id="LocalityName"
                                                            disabled={localitySelection !== item.name}
                                                            filterBy={() => true}
                                                            className={`${localitySelection !== item.name ? 'cursor-not-allowed' : ''} ml-3`}
                                                            isLoading={islocalitySuggestionsLoading}
                                                            labelKey={(eachLocation) => `${eachLocation.location}`}
                                                            maxResults={100}
                                                            delay={200}
                                                            onSearch={getLocationSuggestions}
                                                            clearButton
                                                            onKeyDown={(event) => {
                                                                if (event.key === 'Enter') {
                                                                    const selectedOption = localitySuggestions.filter(((item) => item.location === event.target.value));
                                                                    if (validate.isNotEmpty(selectedOption) && validate.isNotEmpty(event.target.value)) {
                                                                        setLocationParams(selectedOption[0].placeId, selectedOption[0].location);
                                                                        setValue(event.target.value);
                                                                    } else if (validate.isEmpty(event.target.value)) {
                                                                        setAlertInfo({ message: 'Please select Valid Location', typeL: ALERT_TYPE_INFO });
                                                                    }
                                                                }
                                                            }
                                                            }
                                                            ref={localityFieldRef}
                                                            options={localitySuggestions}
                                                            renderMenuItemChildren={(eachLocation, index) => {
                                                                return (<React.Fragment key={index}>
                                                                    <li className={`${index == 0 ? "no-gutters active" : "no-gutters"} p-1`} onClick={() => setLocationParams(eachLocation.placeId, eachLocation.location)} >
                                                                        <div className="col">
                                                                            <span className="d-block text-truncate" title={eachLocation.location}>{eachLocation.location}</span>
                                                                        </div>
                                                                    </li>
                                                                </React.Fragment>);
                                                            }}
                                                        >
                                                            {(selected) => {
                                                                return (
                                                                    <div className="rbt-aux">
                                                                        {selected.length && <Loader />}
                                                                    </div>
                                                                )
                                                            }}
                                                        </AsyncTypeahead>
                                                    </form>
                                                </div>
                                            }
                                        </div>
                                    )
                                })}
                                <div>

                                    <button onClick={localityDetailSubmitForm} type='submit' role='button' class='btn-brand-gradient btn px-5 rounded-pill custom-btn-lg ml-5'>Submit</button>
                                </div>
                            </div>
                        </div>
                    </form>


                    {<div>
                        {validate.isNotEmpty(localityDetails) && validate.isNotEmpty(localityDetails.locality) && <div>

                            <div className='row mt-3 no-gutters'>
                                <div className='col-4'>
                                    <div className='card p-3'>
                                        <div className='d-flex'>
                                            <p className='title font-weight-bold'>Selected Locality</p>
                                            <div>
                                                {validate.isNotEmpty(selectedLocality) && localityDetails.locality.configId != selectedLocality.configId && <button onClick={setAsLocality} role='button' class='btn-brand-gradient btn px-5 rounded-pill custom-btn-lg ml-5'>Set as Locality</button>}
                                            </div>
                                        </div>
                                        <div class=''>
                                            {validate.isNotEmpty(localityDetails.locality.locality) && <h5 className='font-14'><small>Locality</small><br />{localityDetails.locality.locality}</h5>}
                                            {validate.isNotEmpty(localityDetails.locality.combination) && <p class='mb-0 font-14'><small>Address</small><br />{localityDetails.locality.combination}</p>}
                                        </div>
                                    </div>
                                </div>

                                {/**serving info */}
                                {validate.isNotEmpty(localityDetails.locality.hubId) ? <>

                                    <div className='col-4 px-3'>
                                        <div className='card p-3'>
                                            <p className='title font-weight-bold'>Serving Info</p>
                                            <div className='d-flex justify-content-between'>
                                                <div>
                                                    <p className='mb-1'><small>Hub Details</small>  {validate.isNotEmpty(localityDetails.locality.isPolygon) && 'Y' === localityDetails.locality.isPolygon && <span className='font-16 font-weight-bold'>-Polygon</span>}   </p>
                                                    <h6 className='mb-0 font-14'>{localityDetails.locality.hubId} {validate.isNotEmpty(localityDetails.locality.hubWorkingHrs) && <span>[{localityDetails.locality.hubWorkingHrs} O'Clock]</span>}</h6>
                                                    <span className='font-14'>ETA - {localityDetails.locality.intermediateWareHouseETA}hrs, Buffer ETA - {localityDetails.locality.intermediateWareHouseBufferETA}hrs</span>
                                                </div>
                                                {validate.isNotEmpty(localityDetails.locality.wareHouseId) && <div>
                                                    <small>Warehouse</small>
                                                    <h6 className='mb-0 font-14'>{localityDetails.locality.wareHouseId}  {validate.isNotEmpty(localityDetails.locality.wareHouseWorkingHrs) && <span>[{localityDetails.locality.wareHouseWorkingHrs} O'Clock]</span>}</h6>
                                                    <span> {validate.isNotEmpty(localityDetails.locality.wareHouseETA) && <span>ETA - {localityDetails.locality.wareHouseETA}hrs,</span>}  {validate.isNotEmpty(localityDetails.locality.wareHouseBufferETA) && <span>Buffer ETA - {localityDetails.locality.wareHouseBufferETA}hrs</span>}</span>
                                                </div>}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Other Config */}
                                    <div className='col-4'>
                                        <div className='card'>
                                            <p className='title pl-3 pt-3 font-weight-bold'>Others Info</p>
                                            <div className='d-flex flex-wrap'>
                                                {validate.isNotEmpty(localityDetails.locality.configId) ?
                                                    <div className='col-6'>
                                                        <small>
                                                            Config ID
                                                        </small>
                                                        <p>{localityDetails.locality.configId} {validate.isNotEmpty(localityDetails.locality.pincode) && <span>[Pincode - <strong>{localityDetails.locality.pincode}</strong>]</span>}</p>
                                                    </div> :
                                                    validate.isNotEmpty(localityDetails.locality.pincode) && <div className='col-6'>
                                                        <small>
                                                            Pincode -
                                                        </small>
                                                        <p>{localityDetails.locality.pincode}</p>
                                                    </div>}

                                                {validate.isNotEmpty(localityDetails.locality.allowedOnlinePayment) && <div className='col-6'>
                                                    <small>
                                                        Payments
                                                    </small>
                                                    <p>{validate.isNotEmpty(localityDetails.locality.allowedOnlinePayment) && <span>Online - {localityDetails.locality.allowedOnlinePayment ? 'true' : 'false'},</span>} COD - {validate.isNotEmpty(localityDetails.locality.allowedCod) ? localityDetails.locality.allowedCod : 'N'}, Home Delivery - {validate.isNotEmpty(localityDetails.locality.allowedHomeDeliver) ? localityDetails.locality.allowedHomeDeliver : 'N'}</p>
                                                </div>}

                                                {validate.isNotEmpty(localityDetails.locality.locationLatLong) && <div className='col-6'>
                                                    <small>
                                                        Lat-Long
                                                    </small>
                                                    <p>{localityDetails.locality.locationLatLong.replace(',', ', ')}</p>
                                                </div>}


                                                {validate.isNotEmpty(localityDetails.locality.fridgeItemAllowed) && <div className='col-6'>
                                                    <small>
                                                        Fridge Item
                                                    </small>
                                                    <p>{localityDetails.locality.fridgeItemAllowed ? 'true' : 'false'}</p>
                                                </div>}

                                                {validate.isNotEmpty(localityDetails.locality.radiusForPickUp) && <div className='col-6'>
                                                    <small>
                                                        Pickup Radius
                                                    </small>
                                                    <p>{localityDetails.locality.radiusForPickUp}Km</p>
                                                </div>}
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                    </div>

                                    {validate.isNotEmpty(localityDetails.locality.membershipConfig) && <div className='col-4'>
                                        <div className='card'>
                                            <p className='title pl-3 pt-3 font-weight-bold'>MembershipConfig</p>
                                            <div className='d-flex flex-wrap'>
                                                {validate.isNotEmpty(localityDetails.locality.membershipConfig.optivalStoreId) && <div className='col-6'> <small>OptivalStoreID</small><p>{localityDetails.locality.membershipConfig.optivalStoreId}</p></div>}
                                                {validate.isNotEmpty(localityDetails.locality.membershipConfig.medplusStoreId) && <div className='col-6'> <small>MedplusStoreID</small><p>{localityDetails.locality.membershipConfig.medplusStoreId}</p></div>}
                                                {validate.isNotEmpty(localityDetails.locality.membershipConfig.polygonIds) && <div className='col-6'> <small>PolygonIds</small><p>{localityDetails.locality.membershipConfig.polygonIds.join(', ')}</p></div>}
                                                {validate.isNotEmpty(localityDetails.locality.membershipConfig.configuredPlanIds) && <div className='col-6' > <small>ConfiguredPlanIds :</small><p>{localityDetails.locality.membershipConfig.configuredPlanIds.join(', ')}</p></div>}
                                                {validate.isNotEmpty(localityDetails.locality.membershipConfig.onlineServingPlanIds) && <div className='col-6'> <small>OnlineServingPlanIds :</small><p>{localityDetails.locality.membershipConfig.onlineServingPlanIds.join(', ')}</p></div>}
                                                {validate.isNotEmpty(localityDetails.locality.membershipConfig.bestPlanId) && <div className='col-6'> <small>BestPlanID :</small><p>{localityDetails.locality.membershipConfig.bestPlanId}</p></div>}
                                            </div>
                                        </div>
                                    </div>}
                                </> : <div className='col-4 px-3'><div className='card p-3'>
                                    <p className='title font-weight-bold'>Locality Geo Details</p>
                                    {validate.isNotEmpty(localityDetails.locality.pincode) && <div>
                                        <small>Pincode </small>
                                        <p>{localityDetails.locality.pincode}</p></div>}
                                    {validate.isNotEmpty(localityDetails.locality.locationLatLong) && <div>
                                        <span>Lat/Lng</span>
                                        <p >{localityDetails.locality.locationLatLong.replace(',', ', ')}</p></div>}
                                </div></div>}
                            </div>

                            {validate.isNotEmpty(localityDetails) && validate.isNotEmpty(localityDetails.deliverableStoresDetails) && <div>
                                <p className='title mb-0 pt-3 font-weight-bold'>Pickup Store</p>
                                {validate.isNotEmpty(localityDetails.deliverableStoresDetails) ? <div>
                                    <div className='address-container near-by-store-info'>
                                        {validate.isNotEmpty(localityDetails.deliverableStoresDetails) && Object.keys(localityDetails.deliverableStoresDetails).map((key) => {
                                            return (
                                                <address className='address-outline four-column address-no-style px-3 store-info rounded cursor-auto'>
                                                    <div class="d-flex justify-content-between">
                                                        {validate.isNotEmpty(key) && <div className="title">
                                                            <small>Store Id</small>
                                                            <p>{key}</p>
                                                        </div>}
                                                        {validate.isNotEmpty(localityDetails.deliverableStoresDetails[key].dist) && <p className='distance'>{parseFloat(localityDetails.deliverableStoresDetails[key].dist).toFixed(2)}Km</p>}
                                                    </div>

                                                    {validate.isNotEmpty(localityDetails.deliverableStoresDetails[key].name_s) && <p className="text-capitalize mb-3 text-secondary font-12" style={{ "wordWrap": "break-word" }}>
                                                        {localityDetails.deliverableStoresDetails[key].name_s}
                                                    </p>}

                                                </address>

                                            )
                                        })}
                                    </div>
                                </div> : <div> <p>No Pickup store available.</p>
                                </div>}
                            </div>}

                        </div>
                        }
                    </div>
                    }
                </div>
            </section>
        </React.Fragment>
    )
}

export default LocalityInfo;