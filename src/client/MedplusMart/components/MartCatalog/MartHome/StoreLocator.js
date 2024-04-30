import React, { useEffect, useRef, useState } from 'react';
import Validate from '../../../../helpers/Validate';
import MartCatalogService from '../../../services/MartCatalogService';
import StoreLocatorGhostImage from './StoreLocatorGhostImage';
import { getSelectedLocality } from '../../../../../redux/action/LocalityAction';
import LocalityService from '../../../../services/LocalityService';
import { Tab, TabList, Tabs,TabPanel } from 'react-tabs';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import BreadCrumbAction from '../../../../../redux/action/BreadCrumbAction';
import StoreLocatorTimmings from './StoreLocatorTimmings';
import LabCatalogService from '../../../../components/MedplusLabs/Services/LabCatalogService';
import { Link } from 'react-router-dom';
import debounce from '../../Common/Debounce';



const StoreLocator = (props) => {

    const localityService = LocalityService();
    const martCatalogService=MartCatalogService();
    const labCatalogService=LabCatalogService();
    const validate=Validate();
    const selectedLocality = getSelectedLocality();
    const [pharmacyStores,setPharmacyStores] = useState([]);
    const [diagnosticsStores,setDiagnosticsStores] = useState([]);
    const [isStoreLocationsLoading,setStoreLocationsLoading] = useState(false);
    const [localitySuggestions,setLocalitySuggestions] = useState([]);
    const [islocalitySuggestionsLoading,setLocalitySuggestionsLoading] = useState(false);
    const [selectedLocalityName, setSelectedLocalityName] = useState("");
    const [localitySelectedList, setLocalitySelectedList] = useState([]);
    const [selectedLatLong,setSelectedLatLong] = useState('');
    const [tabIndex, setTabIndex] = useState((props.location.hash === '#diagnostics' || (props.match.params.storeType && props.match.params.storeType.toLowerCase() === 'diagnostics')) ? 1 : 0);
    const localityFieldRef = useRef();
    const breadCrumbAction = BreadCrumbAction();

    useEffect(()=>{
      if(validate.isNotEmpty(selectedLocality) && validate.isNotEmpty(selectedLocality.locationLatLong)){
      setSelectedLatLong(selectedLocality.locationLatLong);
      }
      if(validate.isNotEmpty(selectedLocality) && validate.isNotEmpty(selectedLocality.combination)){
        setSelectedLocalityName(selectedLocality.combination);
        }
        breadCrumbAction.pushBreadCrumbs({name:'Locate A Store',url:props.location.pathname}); 
    },[])

    useEffect(()=>{
      if(validate.isNotEmpty(selectedLatLong)){
        getNearByStores();
        getNearByCollectionCenters();
      }
    },[selectedLatLong])

    const updateStores = (locationName)=>{
      martCatalogService.getLatitudeLongitude({locationName:locationName}).then(response=>{
        if(validate.isNotEmpty(response) && validate.isNotEmpty(response.statusCode) && response.statusCode === 'SUCCESS' && validate.isNotEmpty(response.dataObject)){
          setSelectedLatLong(response.dataObject);
        }
      }).catch(function(error){
        console.log(error);
      })
    }

  const getLocationSuggestions = debounce((searchTerm)=>{
    if (validate.isNotEmpty(searchTerm)  && searchTerm.trim().length >= 3) {
      setLocalitySuggestionsLoading(true);
      localityService.getLocalityAutoSuggestions(searchTerm).then(response=>{
        if(validate.isNotEmpty(response) && validate.isNotEmpty(response.statusCode) && response.statusCode === 'SUCCESS' && validate.isNotEmpty(response.dataObject)){
          if(validate.isNotEmpty(response.dataObject.suggestedLocations)){
            setLocalitySuggestions(response.dataObject.suggestedLocations);
          }
          else{
            setLocalitySuggestions([]);
          }
        }
         else{
          setLocalitySuggestions([]);
        } 
        setLocalitySuggestionsLoading(false);
      }).catch(function(error){
        console.log(error);
        setLocalitySuggestionsLoading(false);
      });
    } else{
      setLocalitySuggestions([]);
    } 
    },500);

  const getNearByStores = () => {
    setStoreLocationsLoading(true);
    martCatalogService.getNearByStores({ latLong: selectedLatLong }).then(response => {
      if (validate.isNotEmpty(response) && validate.isNotEmpty(response.statusCode) && response.statusCode == 'SUCCESS' && validate.isNotEmpty(response.dataObject)) {
        setPharmacyStores(response.dataObject);
      } else {
        setPharmacyStores([]);
      }
      setStoreLocationsLoading(false);
    }).catch(function (error) {
      console.log(error);
      setStoreLocationsLoading(false);
    })
  }

  const getNearByCollectionCenters = () => {
    setStoreLocationsLoading(true);
    labCatalogService.getNearByCollectionCenters({ latLong: selectedLatLong }).then(response => {
      if (validate.isNotEmpty(response) && validate.isNotEmpty(response.statusCode) && response.statusCode == 'SUCCESS' && validate.isNotEmpty(response.dataObject)) {
        setDiagnosticsStores(response.dataObject);
      } else {
        setDiagnosticsStores([]);
      }
      setStoreLocationsLoading(false);
    }).catch(function (error) {
      console.log(error);
      setStoreLocationsLoading(false);
    })
  }
  const DiagnosticsStoreLocatorCard=({store})=>{
    const [diagnosticsStoreTimings , setDiagnosticsStoreTimings] = useState(false)
    let getDirection =''
    const defsCss = `.a{fill:none;}.b{fill:#404040;}`;
    if(validate.isNotEmpty(store.locationLatLong) && validate.isNotEmpty(selectedLatLong)) {
      getDirection = "http://maps.google.com/?saddr="+selectedLatLong+"&daddr="+store.locationLatLong 
    } 
    return (
      <React.Fragment>
          {diagnosticsStoreTimings && validate.isNotEmpty(store.storeAvailability) && <StoreLocatorTimmings isOpen={diagnosticsStoreTimings} close={()=>{setDiagnosticsStoreTimings(!diagnosticsStoreTimings)}} store={store}/> }
           {validate.isNotEmpty(store) && <address className='address-outline four-column address-no-style px-3 store-info rounded cursor-auto' >
          <div class="d-flex justify-content-between">
            {validate.isNotEmpty(store.name) && <p className="title">
              {store.name}
            </p>}
            {validate.isNotEmpty(store.distance) && <p className='distance'>{store.distance.toFixed(2)} Kms</p>}
          </div>
          
          {validate.isNotEmpty(store.address) && <p className="text-capitalize mb-3 text-secondary font-12" style={{ "wordWrap": "break-word" }}>
            {store.address}
          </p>}
          <p className="title">
            {validate.isNotEmpty(store.phoneNumber) &&
            <a className="mr-2 text-primary btn btn-link btn-sm ml-n2" href={"tel:" + store.phoneNumber} title="Click to Call">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                  <g id="Group_1501" data-name="Group 1501" transform="translate(0.842 0.487)">
                    <rect id="Rectangle_2075" data-name="Rectangle 2075" width="16" height="16" transform="translate(-0.842 -0.487)" fill="none" />
                    <g id="Group_1500" data-name="Group 1500" transform="translate(-0.081 0.069)">
                      <path id="Path_1067" data-name="Path 1067" d="M13.152,11.537,11.2,10.173a1.789,1.789,0,0,0-2.431.434l-.312.45A17.1,17.1,0,0,1,6.279,9.2,17.193,17.193,0,0,1,4.42,7.019l.45-.312A1.747,1.747,0,0,0,5.3,4.268L3.94,2.325a1.753,1.753,0,0,0-2-.655,3.21,3.21,0,0,0-.564.274L1.1,2.15a1.661,1.661,0,0,0-.213.19A2.952,2.952,0,0,0,.13,3.681C-.449,5.868.96,9.137,3.65,11.827c2.248,2.248,4.968,3.65,7.094,3.65a4.229,4.229,0,0,0,1.052-.13,2.952,2.952,0,0,0,1.341-.754,2.284,2.284,0,0,0,.206-.236l.2-.282a2.736,2.736,0,0,0,.259-.541A1.707,1.707,0,0,0,13.152,11.537Zm-.373,1.623h0a2.043,2.043,0,0,1-.145.312l-.16.236c-.03.038-.069.076-.1.114a1.87,1.87,0,0,1-.853.472,3,3,0,0,1-.77.091c-1.844,0-4.267-1.28-6.324-3.33C2.042,8.672.709,5.754,1.189,3.963a1.87,1.87,0,0,1,.472-.853.845.845,0,0,1,.084-.084l.229-.168a2.4,2.4,0,0,1,.343-.168.828.828,0,0,1,.2-.03.66.66,0,0,1,.533.29L4.412,4.9a.668.668,0,0,1,.107.5.653.653,0,0,1-.274.419l-.884.617a.552.552,0,0,0-.152.739,17.027,17.027,0,0,0,2.3,2.8,17.027,17.027,0,0,0,2.8,2.3.546.546,0,0,0,.739-.152l.617-.884a.642.642,0,0,1,.427-.259.693.693,0,0,1,.5.1l1.951,1.364A.622.622,0,0,1,12.779,13.16Z" transform="translate(-0.001 -0.518)" fill="#404040" />
                      <path id="Path_1068" data-name="Path 1068" d="M15.287,2.445a7.728,7.728,0,0,0-5-2.255A.548.548,0,0,0,9.71.7a.556.556,0,0,0,.511.579A6.68,6.68,0,0,1,16.461,7.52a.545.545,0,0,0,.571.511h0a.546.546,0,0,0,.511-.579A7.7,7.7,0,0,0,15.287,2.445Z" transform="translate(-2.312 -0.189)" fill="#404040" />
                      <path id="Path_1069" data-name="Path 1069" d="M9.02,4.32a4.872,4.872,0,0,1,4.557,4.557.558.558,0,0,0,.579.511h0a.548.548,0,0,0,.511-.579A5.958,5.958,0,0,0,9.1,3.23a.58.58,0,0,0-.587.511A.551.551,0,0,0,9.02,4.32Z" transform="translate(-2.026 -0.913)" fill="#404040" />
                    </g>
                  </g>
                </svg>
              {store.phoneNumber}</a>
            }
            <a className="text-primary btn btn-link btn-sm mr-n2" href={getDirection} target="_blank" title="Get Directions">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                <g id="Group_5452" data-name="Group 5452" transform="translate(-336.08 -141.659)">
                  <rect id="Rectangle_3144" data-name="Rectangle 3144" width="16" height="16" transform="translate(336.08 141.659)" fill="none" />
                  <g id="Group_5451" data-name="Group 5451" transform="translate(336.335 141.914)">
                    <g id="Group_5449" data-name="Group 5449">
                      <path id="Path_2570" data-name="Path 2570" d="M347.527,145.064a7.872,7.872,0,1,0,7.872,7.872A7.882,7.882,0,0,0,347.527,145.064Zm0,14.878a7.006,7.006,0,1,1,7.006-7.006A7.014,7.014,0,0,1,347.527,159.942Z" transform="translate(-339.655 -145.064)" fill="#404040" />
                    </g>
                    <g id="Group_5450" data-name="Group 5450" transform="translate(3.264 4.026)">
                      <path id="Path_2571" data-name="Path 2571" d="M350.8,150.1a.861.861,0,0,0-.394.1l-6.2,3.186a.866.866,0,0,0,.212,1.615l2.611.568a.119.119,0,0,1,.084.067l1.112,2.429a.866.866,0,0,0,1.623-.138l1.789-6.736a.867.867,0,0,0-.3-.895h0A.861.861,0,0,0,350.8,150.1Zm-1.844,7.263a.118.118,0,0,1-.109-.07l-1.139-2.485-2.671-.581a.12.12,0,0,1-.03-.224l5.472-2.813a.119.119,0,0,1,.13.013.121.121,0,0,1,.041.125l-1.578,5.946a.12.12,0,0,1-.106.089Z" transform="translate(-343.741 -150.104)" fill="#404040" />
                    </g>
                  </g>
                </g>
              </svg>
              Get Directions
            </a>

           {validate.isNotEmpty(store.storeAvailability) && <a className='mr-2 small btn btn-link btn-sm ml-n2 text-primary' title ="Check Center Timings" href="javascript:void(0)"  onClick={()=>setDiagnosticsStoreTimings(!diagnosticsStoreTimings)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                <g id="Group_5460" data-name="Group 5460" transform="translate(-2750 -4333)">
                  <rect id="Rectangle_2076" data-name="Rectangle 2076" width="16" height="16" transform="translate(2750 4333)" fill="none" />
                  <path id="Union_25" data-name="Union 25" d="M2.345,13.656A8,8,0,1,1,13.657,2.344,8,8,0,1,1,2.345,13.656ZM1.12,8.008A6.88,6.88,0,1,0,8,1.12,6.89,6.89,0,0,0,1.12,8.008Zm6.548,1.8a.552.552,0,0,1-.392-.157.54.54,0,0,1-.165-.385V5.882a.549.549,0,0,1,1.1,0V8.709h1.971a.549.549,0,0,1,0,1.1Z" transform="translate(2750 4333)" fill="#404040" />
                </g>
              </svg>
              Check Center Timings
            </a>}
          </p>
        </address>}
      </React.Fragment>
      );  
  }

  const NoStoreAvailableSvg=()=>{
    return (
      <React.Fragment>
          <div className='py-4 text-center No-store-find'>
              <svg xmlns="http://www.w3.org/2000/svg"  width="109.608" height="76.949" viewBox="0 0 109.608 76.949"><g transform="translate(240.047 3297.626)"><path d="M-202.437-3275.435a.545.545,0,0,0-.073-.273l-4.372-7.651a1.732,1.732,0,0,0-1.5-.871H-234.1a1.733,1.733,0,0,0-1.5.871l-4.372,7.651a.554.554,0,0,0-.072.273,5.112,5.112,0,0,0,2.355,4.3v16.345h-.627a.551.551,0,0,0-.551.55.551.551,0,0,0,.551.551h34.153a.551.551,0,0,0,.551-.551.551.551,0,0,0-.551-.55h-.627v-16.345A5.11,5.11,0,0,0-202.437-3275.435Zm-6.4,20.648H-214.8v-1.843h5.964Zm0-2.945H-214.8v-10.086h5.964Zm2.945,2.945h-1.843v-13.581a.551.551,0,0,0-.551-.552h-7.066a.551.551,0,0,0-.551.552v13.581H-236.59v-15.81a5.107,5.107,0,0,0,1.657.276,5.12,5.12,0,0,0,4.564-2.806,5.119,5.119,0,0,0,4.563,2.806,5.119,5.119,0,0,0,4.564-2.806,5.119,5.119,0,0,0,4.563,2.806,5.119,5.119,0,0,0,4.564-2.806,5.119,5.119,0,0,0,4.563,2.806,5.117,5.117,0,0,0,1.658-.276Zm-23.886-20.1h7.948a4.017,4.017,0,0,1-3.974,3.462A4.019,4.019,0,0,1-229.78-3274.884Zm9.127,0h7.948a4.017,4.017,0,0,1-3.974,3.462A4.019,4.019,0,0,1-220.653-3274.884Zm13.1,3.462a4.019,4.019,0,0,1-3.974-3.462h3.827a.551.551,0,0,0,.551-.551.551.551,0,0,0-.551-.551h-27.086a.551.551,0,0,0-.551.551.551.551,0,0,0,.551.551h3.826a4.017,4.017,0,0,1-3.974,3.462,4.018,4.018,0,0,1-3.974-3.462h1.766a.551.551,0,0,0,.551-.551.551.551,0,0,0-.551-.551h-1.406l3.9-6.826a.627.627,0,0,1,.544-.316h25.72a.627.627,0,0,1,.544.316l3.9,6.826h-1.406a.551.551,0,0,0-.551.551.551.551,0,0,0,.551.551h1.767A4.019,4.019,0,0,1-207.552-3271.422Z" fill="#bcbcbc"></path><path d="M-218.3-3268.92h-15.9a.551.551,0,0,0-.551.552v11.187a.551.551,0,0,0,.551.551h15.9a.551.551,0,0,0,.551-.551v-11.187A.552.552,0,0,0-218.3-3268.92Zm-.551,11.188h-14.8v-10.086h14.8Z" fill="#bcbcbc"></path><path d="M-132.168-3221.779h-.626v-16.344a5.115,5.115,0,0,0,2.355-4.3.554.554,0,0,0-.072-.273l-4.372-7.651a1.733,1.733,0,0,0-1.5-.871H-162.1a1.733,1.733,0,0,0-1.5.871l-4.371,7.651a.545.545,0,0,0-.073.273,5.115,5.115,0,0,0,2.355,4.3v3.791a.741.741,0,0,0-.74-.725h-15.53c3.4-4.189,14.042-18.066,14.042-27.859a15.485,15.485,0,0,0-15.626-15.3,15.485,15.485,0,0,0-15.627,15.3.744.744,0,0,0,.744.744.745.745,0,0,0,.745-.744,13.991,13.991,0,0,1,14.138-13.811,13.993,13.993,0,0,1,14.138,13.811c0,9.624-11.431,24.138-14.13,27.429a102.972,102.972,0,0,1-7.282-10.025,53.761,53.761,0,0,1-5.856-11.794.751.751,0,0,0-.923-.486.737.737,0,0,0-.447.364.74.74,0,0,0-.048.574,55.1,55.1,0,0,0,6.017,12.138,104.473,104.473,0,0,0,6.973,9.659h-15.557a.744.744,0,0,0-.744.744.744.744,0,0,0,.744.744h34.229a.741.741,0,0,0,.74-.725v12.515h-.626a.551.551,0,0,0-.551.551.551.551,0,0,0,.551.551h34.152a.551.551,0,0,0,.551-.551A.551.551,0,0,0-132.168-3221.779Zm-4.672,0H-142.8v-1.842h5.965Zm0-2.944H-142.8v-10.086h5.965Zm2.944,2.944h-1.842v-13.581a.551.551,0,0,0-.551-.551h-7.066a.551.551,0,0,0-.551.551v13.581h-20.686v-15.81a5.081,5.081,0,0,0,1.658.277,5.119,5.119,0,0,0,4.563-2.806,5.12,5.12,0,0,0,4.564,2.806,5.119,5.119,0,0,0,4.563-2.806,5.12,5.12,0,0,0,4.564,2.806,5.119,5.119,0,0,0,4.563-2.806,5.12,5.12,0,0,0,4.564,2.806,5.075,5.075,0,0,0,1.657-.277Zm-23.885-20.1h7.947a4.017,4.017,0,0,1-3.973,3.461A4.018,4.018,0,0,1-157.781-3241.875Zm9.127,0h7.947a4.017,4.017,0,0,1-3.973,3.461A4.018,4.018,0,0,1-148.654-3241.875Zm13.1,3.461a4.018,4.018,0,0,1-3.974-3.461h3.827a.551.551,0,0,0,.551-.551.551.551,0,0,0-.551-.551h-27.087a.551.551,0,0,0-.551.551.551.551,0,0,0,.551.551h3.826a4.017,4.017,0,0,1-3.973,3.461,4.019,4.019,0,0,1-3.975-3.461h1.766a.551.551,0,0,0,.551-.551.551.551,0,0,0-.551-.551h-1.406l3.9-6.826a.627.627,0,0,1,.544-.316h25.72a.627.627,0,0,1,.544.316l3.9,6.826h-1.406a.55.55,0,0,0-.551.551.551.551,0,0,0,.551.551h1.766A4.018,4.018,0,0,1-135.553-3238.414Z" fill="#bcbcbc"></path><path d="M-146.3-3235.911h-15.9a.551.551,0,0,0-.551.551v11.188a.551.551,0,0,0,.551.551h15.9a.551.551,0,0,0,.551-.551v-11.188A.551.551,0,0,0-146.3-3235.911Zm-.551,11.188h-14.8v-10.086h14.8Z" fill="#bcbcbc"></path><path d="M-197.168-3259.869a.744.744,0,0,0-.744-.744h-.007a.744.744,0,0,0-.74.748.743.743,0,0,0,.747.74A.744.744,0,0,0-197.168-3259.869Z" fill="#bcbcbc"></path><path d="M-189.192-3265.143a.74.74,0,0,0-.425-.38.743.743,0,0,0-.569.03.744.744,0,0,0-.381.423,7.447,7.447,0,0,0,3.445,9.016,7.446,7.446,0,0,0,9.45-1.961,7.445,7.445,0,0,0-.426-9.641,7.444,7.444,0,0,0-9.585-1.121.745.745,0,0,0-.2,1.034.745.745,0,0,0,1.033.2,5.938,5.938,0,0,1,7.642.9,5.938,5.938,0,0,1,.338,7.688,5.938,5.938,0,0,1-7.534,1.565,5.937,5.937,0,0,1-2.753-7.186A.749.749,0,0,0-189.192-3265.143Z" fill="#bcbcbc"></path><path d="M-183.548-3275.239a12.7,12.7,0,0,0-10.957,6.325.743.743,0,0,0,.283,1,.745.745,0,0,0,1.005-.253,11.2,11.2,0,0,1,9.669-5.581.744.744,0,0,0,.744-.744A.744.744,0,0,0-183.548-3275.239Z" fill="#bcbcbc"></path><path d="M-194.594-3294.649a.745.745,0,0,0,.744-.744v-1.489a.744.744,0,0,0-.744-.744.745.745,0,0,0-.745.744v1.489A.745.745,0,0,0-194.594-3294.649Z" fill="#bcbcbc"></path><path d="M-194.594-3288.7a.744.744,0,0,0,.744-.744v-1.488a.744.744,0,0,0-.744-.744.745.745,0,0,0-.745.744v1.488A.745.745,0,0,0-194.594-3288.7Z" fill="#bcbcbc"></path><path d="M-198.315-3292.417h1.488a.744.744,0,0,0,.744-.744.744.744,0,0,0-.744-.744h-1.488a.744.744,0,0,0-.744.744A.744.744,0,0,0-198.315-3292.417Z" fill="#bcbcbc"></path><path d="M-192.362-3292.417h1.488a.744.744,0,0,0,.744-.744.744.744,0,0,0-.744-.744h-1.488a.744.744,0,0,0-.744.744A.744.744,0,0,0-192.362-3292.417Z" fill="#bcbcbc"></path><path d="M-157.781-3262.1a.744.744,0,0,0,.744-.744v-1.488a.744.744,0,0,0-.744-.744.744.744,0,0,0-.744.744v1.488A.744.744,0,0,0-157.781-3262.1Z" fill="#bcbcbc"></path><path d="M-157.781-3256.148a.744.744,0,0,0,.744-.744v-1.489a.744.744,0,0,0-.744-.743.744.744,0,0,0-.744.743v1.489A.744.744,0,0,0-157.781-3256.148Z" fill="#bcbcbc"></path><path d="M-161.5-3259.868h1.488a.746.746,0,0,0,.745-.745.745.745,0,0,0-.745-.744H-161.5a.744.744,0,0,0-.744.744A.745.745,0,0,0-161.5-3259.868Z" fill="#bcbcbc"></path><path d="M-155.549-3259.868h1.488a.745.745,0,0,0,.744-.745.744.744,0,0,0-.744-.744h-1.488a.744.744,0,0,0-.744.744A.745.745,0,0,0-155.549-3259.868Z" fill="#bcbcbc"></path></g></svg>
                              
                              <h3 className='my-2'>No Store Available.</h3>
                              <p>No store available for the searched location.</p>
          </div>
      </React.Fragment>
    );
  }




  const PharmacyStoreLocationCard = ({store})=>{
    let getDirection =''
    const defsCss = `.a{fill:none;}.b{fill:#404040;}`;
    if(validate.isNotEmpty(store.locationLatLong) && validate.isNotEmpty(selectedLatLong)) {
      getDirection = "http://maps.google.com/?saddr="+selectedLatLong+"&daddr="+store.locationLatLong 
    } 
    return (
        <React.Fragment>
        {validate.isNotEmpty(store) && <address className='address-outline four-column address-no-style px-3 store-info rounded cursor-auto' >
          <div class="d-flex justify-content-between">
            {validate.isNotEmpty(store.name_s) && <p className="title">
              {store.name_s}
            </p>}
            {validate.isNotEmpty(store.dist) && <p className='distance'>{store.dist.toFixed(2)} Kms</p>}
          </div>
          
          {validate.isNotEmpty(store.address_s) && <p className="text-capitalize mb-3 text-secondary font-12" style={{ "wordWrap": "break-word" }}>
            {store.address_s}
          </p>}
          <p className="title">
            {validate.isNotEmpty(store.phoneNumber_s) && 
             <a className="mr-2 small btn btn-link btn-sm ml-n2 text-primary" href={"tel:" + store.phoneNumber_s} title="Click to Call">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                  <g id="Group_1501" data-name="Group 1501" transform="translate(0.842 0.487)">
                    <rect id="Rectangle_2075" data-name="Rectangle 2075" width="16" height="16" transform="translate(-0.842 -0.487)" fill="none" />
                    <g id="Group_1500" data-name="Group 1500" transform="translate(-0.081 0.069)">
                      <path id="Path_1067" data-name="Path 1067" d="M13.152,11.537,11.2,10.173a1.789,1.789,0,0,0-2.431.434l-.312.45A17.1,17.1,0,0,1,6.279,9.2,17.193,17.193,0,0,1,4.42,7.019l.45-.312A1.747,1.747,0,0,0,5.3,4.268L3.94,2.325a1.753,1.753,0,0,0-2-.655,3.21,3.21,0,0,0-.564.274L1.1,2.15a1.661,1.661,0,0,0-.213.19A2.952,2.952,0,0,0,.13,3.681C-.449,5.868.96,9.137,3.65,11.827c2.248,2.248,4.968,3.65,7.094,3.65a4.229,4.229,0,0,0,1.052-.13,2.952,2.952,0,0,0,1.341-.754,2.284,2.284,0,0,0,.206-.236l.2-.282a2.736,2.736,0,0,0,.259-.541A1.707,1.707,0,0,0,13.152,11.537Zm-.373,1.623h0a2.043,2.043,0,0,1-.145.312l-.16.236c-.03.038-.069.076-.1.114a1.87,1.87,0,0,1-.853.472,3,3,0,0,1-.77.091c-1.844,0-4.267-1.28-6.324-3.33C2.042,8.672.709,5.754,1.189,3.963a1.87,1.87,0,0,1,.472-.853.845.845,0,0,1,.084-.084l.229-.168a2.4,2.4,0,0,1,.343-.168.828.828,0,0,1,.2-.03.66.66,0,0,1,.533.29L4.412,4.9a.668.668,0,0,1,.107.5.653.653,0,0,1-.274.419l-.884.617a.552.552,0,0,0-.152.739,17.027,17.027,0,0,0,2.3,2.8,17.027,17.027,0,0,0,2.8,2.3.546.546,0,0,0,.739-.152l.617-.884a.642.642,0,0,1,.427-.259.693.693,0,0,1,.5.1l1.951,1.364A.622.622,0,0,1,12.779,13.16Z" transform="translate(-0.001 -0.518)" fill="#404040" />
                      <path id="Path_1068" data-name="Path 1068" d="M15.287,2.445a7.728,7.728,0,0,0-5-2.255A.548.548,0,0,0,9.71.7a.556.556,0,0,0,.511.579A6.68,6.68,0,0,1,16.461,7.52a.545.545,0,0,0,.571.511h0a.546.546,0,0,0,.511-.579A7.7,7.7,0,0,0,15.287,2.445Z" transform="translate(-2.312 -0.189)" fill="#404040" />
                      <path id="Path_1069" data-name="Path 1069" d="M9.02,4.32a4.872,4.872,0,0,1,4.557,4.557.558.558,0,0,0,.579.511h0a.548.548,0,0,0,.511-.579A5.958,5.958,0,0,0,9.1,3.23a.58.58,0,0,0-.587.511A.551.551,0,0,0,9.02,4.32Z" transform="translate(-2.026 -0.913)" fill="#404040" />
                    </g>
                  </g>
                </svg>
              {store.phoneNumber_s}</a>
            }
            <a className="small text-primary btn btn-link btn-sm mr-n2" href={getDirection} target="_blank" title="Get Directions">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                <g id="Group_5452" data-name="Group 5452" transform="translate(-336.08 -141.659)">
                  <rect id="Rectangle_3144" data-name="Rectangle 3144" width="16" height="16" transform="translate(336.08 141.659)" fill="none" />
                  <g id="Group_5451" data-name="Group 5451" transform="translate(336.335 141.914)">
                    <g id="Group_5449" data-name="Group 5449">
                      <path id="Path_2570" data-name="Path 2570" d="M347.527,145.064a7.872,7.872,0,1,0,7.872,7.872A7.882,7.882,0,0,0,347.527,145.064Zm0,14.878a7.006,7.006,0,1,1,7.006-7.006A7.014,7.014,0,0,1,347.527,159.942Z" transform="translate(-339.655 -145.064)" fill="#404040" />
                    </g>
                    <g id="Group_5450" data-name="Group 5450" transform="translate(3.264 4.026)">
                      <path id="Path_2571" data-name="Path 2571" d="M350.8,150.1a.861.861,0,0,0-.394.1l-6.2,3.186a.866.866,0,0,0,.212,1.615l2.611.568a.119.119,0,0,1,.084.067l1.112,2.429a.866.866,0,0,0,1.623-.138l1.789-6.736a.867.867,0,0,0-.3-.895h0A.861.861,0,0,0,350.8,150.1Zm-1.844,7.263a.118.118,0,0,1-.109-.07l-1.139-2.485-2.671-.581a.12.12,0,0,1-.03-.224l5.472-2.813a.119.119,0,0,1,.13.013.121.121,0,0,1,.041.125l-1.578,5.946a.12.12,0,0,1-.106.089Z" transform="translate(-343.741 -150.104)" fill="#404040" />
                    </g>
                  </g>
                </g>
              </svg>
              Get Directions
            </a>
          </p>
        </address>}

        </React.Fragment>
        );
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
  return (
    <React.Fragment>

      {!isStoreLocationsLoading &&
        <React.Fragment>
        <section className='px-3'>
            <div className='py-2 search-input d-flex align-items-center justify-content-between store-finder'>
              <h2 className='mb-0'>Store Locator
                <span className='h5 ml-2'>Near by Stores based on locality selected</span>
              </h2>
              
              <div style={{width:'45%'}}>
                <form className={"locality"} data-type="locality-search">
                  <AsyncTypeahead
                    id="LocalityName"
                    filterBy={() => true}
                    isLoading={islocalitySuggestionsLoading}
                    labelKey={(eachLocation) => `${eachLocation.location}`}
                    maxResults={100}
                    delay = {200}
                    ref={localityFieldRef}
                    onSearch={getLocationSuggestions}
                    onKeyDown={event => { 
                        if (event.key === 'Enter') {
                          updateStores(event.target.value);
                        }
                    }}
                    clearButton
                    defaultInputValue ={selectedLocalityName}
                    options={localitySuggestions}
                    placeholder="Type your area name / pincode"
                    onChange={(selectedLocality) => {
                        localitySelection(selectedLocality)
                        }
                    }
                    onFocus={(event)=>{
                      setLocalitySuggestions([]);
                      setLocalitySelectedList([]);
                      localityFieldRef.current.clear();
                    }}
                    selected={localitySelectedList}
                    renderMenuItemChildren = {(eachLocation, props, index) => {
                       return ( <React.Fragment key={index}>
                        <li className={index == 0 ? "no-gutters active" : "no-gutters"} onClick={() => updateStores(eachLocation.location)} >
                            <div className="col">
                                <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11 4a3 3 0 11-6 0 3 3 0 016 0z"/>
                                    <path d="M7.5 4h1v9a.5.5 0 01-1 0V4z"/>
                                </svg>
                                <p>
                                    <span className="d-block text-truncate" title={eachLocation.location}>{eachLocation.location}</span>
                                     <small className="m-0"><span className="d-block text-truncate" title={eachLocation.location}>{eachLocation.location}</span></small>
                                </p>
                                <svg className="chevron-right" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 01-.708-.708L10.293 8 4.646 2.354a.5.5 0 010-.708z" clipRule="evenodd"/>
                                </svg>
                            </div>
                         </li>
                        </React.Fragment>);
                    }}
                >
                 {(selected) => {
                  return(
                        <div className="rbt-aux">
                            {selected.length && <Loader/>}
                        </div>
                )} }
                </AsyncTypeahead>
                </form>
              </div>
              

            </div>
            <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
                <div className="header p-0 mb-0">
                    <TabList className="nav nav-pills">
                        <Tab className="nav-item border-0" title="Pharmacies">
                        <Link className="nav-link py-3" to={`${props.location.pathname}#pharmacy`}>Pharmacies</Link>
                        </Tab>
                        <Tab className="nav-item border-0" title="Diagnostics">
                        <Link className="nav-link py-3" to={`${props.location.pathname}#diagnostics`}>Diagnostics</Link>
                        </Tab>
                    </TabList>
                </div>
               <TabPanel>
                {validate.isNotEmpty(pharmacyStores) && <div className='address-container near-by-store-info py-2'>
                    { pharmacyStores.map((store)=>{return (<PharmacyStoreLocationCard  store={store}/>);})}
                </div>}
                {validate.isEmpty(pharmacyStores) &&  <NoStoreAvailableSvg/>}
                </TabPanel>
                <TabPanel>
                {validate.isNotEmpty(diagnosticsStores) && <div className='address-container near-by-store-info py-2'> 
                    {diagnosticsStores.map(store =>{ return (<DiagnosticsStoreLocatorCard store={store}/>);})}
                </div>}
                {validate.isEmpty(diagnosticsStores) &&  <NoStoreAvailableSvg/>}   
                </TabPanel>
          </Tabs>
        </section>
      </React.Fragment>
      }
      {isStoreLocationsLoading && <StoreLocatorGhostImage/>}
    </React.Fragment>
  )
}
export default StoreLocator;