import React, { useEffect, useState } from "react";
import NoStoreFoundIcon from '../../../images/common/medplus-store-icn.svg';
import PickUpStore from "./PickStore";
import Validate from '../../../helpers/Validate';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const PickUpStores = (props) => {

    const defsCss = `.a{fill:none;}.b{fill:#404040;}`;
    const prevSelectedStoreInfo = props.prevSelectedStoreInfo;
    const nearByStores = props.deliverableStoresInfo;
    const otherNearByStores = props.partialDeliverableStoresInfo;
    const [filteredLabStores, setFilteredLabstores] = useState([]);
    const [filteredPartialLabStores, setFilteredPartialLabStores] = useState([]);
    const [selectedPartialStore , setPartialSelectedStore] = useState(undefined)
    const [searchText, setSearchText] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('ALL');
    const validate = Validate();
    var getDirection = prevSelectedStoreInfo ? "http://maps.google.com/?saddr="+props.selectedLocality.locationLatLong+"&daddr="+prevSelectedStoreInfo.locationLatLong : "";

    useEffect(()=>{
        if(props.checkoutVerticle == 'LAB_CHECKOUT' && (validate.isNotEmpty(nearByStores) || validate.isNotEmpty(otherNearByStores))){
            filterStores();
        }
    },[nearByStores, otherNearByStores])

    const filterStores = (searchText) => {
        let tempPathLab = nearByStores;
        let tempPartialPathLab = otherNearByStores;
        if (validate.isNotEmpty(searchText)) {
            if (validate.isNotEmpty(nearByStores)) {
                if (props.checkoutVerticle == 'LAB_CHECKOUT') {
                    tempPathLab = nearByStores.filter(eachStore => eachStore.pathLabStore.name.toLowerCase().includes(searchText.toLowerCase()) || eachStore.pathLabStore.address.toLowerCase().includes(searchText.toLowerCase()));
                }
                else if (props.checkoutVerticle == 'MART_CHECKOUT') {
                    tempPathLab = nearByStores.filter(eachStore => eachStore.storeName.toLowerCase().includes(searchText.toLowerCase()) || eachStore.address.toLowerCase().includes(searchText.toLowerCase()));
                }
            }
            if (validate.isNotEmpty(otherNearByStores) && (props.checkoutVerticle == 'LAB_CHECKOUT')) {
                tempPartialPathLab = otherNearByStores.filter(eachPartialStore => eachPartialStore.pathLabStore.name.toLowerCase().includes(searchText.toLowerCase()) || eachPartialStore.pathLabStore.address.toLowerCase().includes(searchText.toLowerCase()));
            }
        }
        setFilteredLabstores(tempPathLab);
        setFilteredPartialLabStores(tempPartialPathLab);
        setSearchText(searchText);
    }

    return (
        <section className="body-height">
            <div className="header  mb-0">
                <p >
                    {props.checkoutVerticle == "MART_CHECKOUT" && "Pickup From A MedPlus Store"}
                    {props.checkoutVerticle == "LAB_CHECKOUT" && "Diagnostic Centre Walk-in"}
                </p>
            </div>
            {validate.isNotEmpty(prevSelectedStoreInfo) && 
                <div className="selectpickupstore">
                    <span className="badge-title success">
                        {props.checkoutVerticle == "MART_CHECKOUT" && "Your last selected store"}
                        {props.checkoutVerticle == "LAB_CHECKOUT" && "Your last Visited Collection Centre"}
                    </span>
                    <address className={props.selectedDeliveryType.STORE_PICK_UP === prevSelectedStoreInfo.storeId ? 'no-style active m-0' : 'no-style m-0'} onClick={e => props.setPickUpStoreInfo(prevSelectedStoreInfo.storeId)}>
                        <p className="title">
                            {prevSelectedStoreInfo.storeName ? prevSelectedStoreInfo.storeName : prevSelectedStoreInfo.name}
                        </p>
                        <p>
                            <small>
                                {prevSelectedStoreInfo.address}
                            </small>
                        </p>     
                        <p className="title">
                            <span className="mr-3 small">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                    <g transform="translate(-180.438 -213.832)">
                                        <rect width="24" height="24" transform="translate(180.438 213.832)" fill="none"></rect>
                                        <g transform="translate(182.199 215.78)">
                                            <g transform="translate(0 1.429)">
                                            <path d="M185.394,217.171a2.043,2.043,0,0,0-.705.124,3.87,3.87,0,0,0-.728.361l-.369.26a3.029,3.029,0,0,0-.264.236,3.822,3.822,0,0,0-.979,1.742c-.771,2.889,1.118,7.237,4.7,10.82,3,3,6.621,4.87,9.442,4.87a5.349,5.349,0,0,0,1.377-.171,3.8,3.8,0,0,0,1.738-.975,2.837,2.837,0,0,0,.265-.3l.262-.374a3.9,3.9,0,0,0,.334-.689,2.167,2.167,0,0,0-.821-2.518l-2.625-1.833a2.261,2.261,0,0,0-3.063.546l-.509.731-.126-.089a24.713,24.713,0,0,1-5.47-5.468l-.089-.127.732-.51a2.2,2.2,0,0,0,.545-3.063l-1.832-2.624A2.229,2.229,0,0,0,185.394,217.171Zm11.1,17.253c-2.524,0-5.828-1.735-8.623-4.53-3.246-3.247-5.057-7.237-4.4-9.7a2.668,2.668,0,0,1,.678-1.22,1.807,1.807,0,0,1,.135-.126l.318-.225a2.535,2.535,0,0,1,.493-.24,1.03,1.03,0,0,1,1.162.4l1.831,2.622a1.042,1.042,0,0,1-.257,1.449l-1.193.833a.576.576,0,0,0-.16.783,24.809,24.809,0,0,0,6.813,6.815.585.585,0,0,0,.785-.16l.833-1.195a1.071,1.071,0,0,1,1.447-.257l2.624,1.833a1.006,1.006,0,0,1,.4,1.163l-.007.017a2.439,2.439,0,0,1-.206.435l-.223.321a1.537,1.537,0,0,1-.156.173,2.649,2.649,0,0,1-1.219.677A4.167,4.167,0,0,1,196.492,234.424Z" transform="translate(-182.178 -217.171)" fill="#343a40"></path>
                                            </g>
                                            <g transform="translate(9.963)">
                                            <path d="M192.615,215.757a.58.58,0,0,0-.034,1.158,9.141,9.141,0,0,1,8.548,8.546.589.589,0,0,0,.621.543.579.579,0,0,0,.537-.615,10.284,10.284,0,0,0-3-6.636h0a10.28,10.28,0,0,0-6.634-3Z" transform="translate(-192.036 -215.757)" fill="#343a40"></path>
                                            </g>
                                            <g transform="translate(8.736 3.129)">
                                            <path d="M191.427,218.853a.611.611,0,0,0-.6.544.58.58,0,0,0,.145.419.572.572,0,0,0,.4.2h0a6.708,6.708,0,0,1,6.274,6.275.589.589,0,0,0,.621.541h0a.578.578,0,0,0,.536-.613,7.869,7.869,0,0,0-7.362-7.36Z" transform="translate(-190.822 -218.853)" fill="#343a40"></path>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                                <a aria-label="click to Call" role="link" className="text-primary" href={"tel:"+prevSelectedStoreInfo.phoneNumber} title="Click to Call">{prevSelectedStoreInfo.phoneNumber}</a>
                            </span>
                            {/* <span className="mr-3 small">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                                    <defs>
                                        <style></style>
                                    </defs>
                                    <g transform="translate(-2750 -4333)">
                                        <rect className="a" width="18" height="18" transform="translate(2750 4333)"/>
                                        <path className="b" d="M-2747.7-4317.637a8.941,8.941,0,0,1-2.637-6.364,8.941,8.941,0,0,1,2.637-6.363,8.943,8.943,0,0,1,6.364-2.637,8.938,8.938,0,0,1,6.363,2.637,8.941,8.941,0,0,1,2.637,6.363,8.941,8.941,0,0,1-2.637,6.364,8.938,8.938,0,0,1-6.363,2.637A8.943,8.943,0,0,1-2747.7-4317.637Zm-1.377-6.354a7.751,7.751,0,0,0,7.74,7.739,7.758,7.758,0,0,0,7.739-7.749,7.75,7.75,0,0,0-7.739-7.739A7.759,7.759,0,0,0-2749.075-4323.991Zm7.367,2.026a.622.622,0,0,1-.441-.177.608.608,0,0,1-.186-.433v-3.807a.615.615,0,0,1,.619-.618.614.614,0,0,1,.618.618v3.18h2.217a.615.615,0,0,1,.619.619.615.615,0,0,1-.619.619Z" transform="translate(5500.335 8666)"/>
                                    </g>
                                </svg>
                                Open until 11:00 PM
                            </span> */}
                            {validate.isNotEmpty(prevSelectedStoreInfo.distance) &&
                                <span className="mr-3 small">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                                        <defs>
                                            <style>{defsCss}</style>
                                        </defs>
                                        <g transform="translate(-336.82 -179.867)">
                                            <rect className="a" width="18" height="18" transform="translate(336.82 179.867)"/>
                                            <g transform="translate(-1.85 -1.473)">
                                                <g transform="translate(338.67 182.341)">
                                                <path className="b" d="M342.225,189.911a.924.924,0,1,0,.924.924A.922.922,0,0,0,342.225,189.911Zm11.484-5.172a.923.923,0,1,0,.923.923.921.921,0,0,0-.923-.923Z" transform="translate(-338.969 -182.613)"/>
                                                <path className="b" d="M341.926,197.459l-.113-.184c-1.174-1.91-3.143-5.332-3.143-6.794a3.27,3.27,0,0,1,6.513,0c0,1.116-1.161,3.392-2.184,5.18h6.185c1.19,0,1.654-.69,1.692-1.281a1.19,1.19,0,0,0-1.041-1.3h-1.975a2.143,2.143,0,0,1-1.942-2.39,2.649,2.649,0,0,1,.464-1.558,1.721,1.721,0,0,1,1.442-.723h3.4a8.467,8.467,0,0,1-1.07-3.106,3.271,3.271,0,0,1,6.514,0c0,1.463-1.97,4.884-3.143,6.795l-.113.184-.113-.184c-.4-.653-.991-1.639-1.544-2.668h-3.93a.752.752,0,0,0-.658.371,1.651,1.651,0,0,0-.23.887c0,.681.316,1.371.923,1.371l2.046,0a2.182,2.182,0,0,1,1.983,2.352,2.447,2.447,0,0,1-2.7,2.263H342.4c-.132.221-.254.42-.36.592Zm0-8.926a2.2,2.2,0,0,0-2.235,1.948c0,1.021,1.481,3.7,2.235,5.006.755-1.3,2.236-3.982,2.236-5.006A2.2,2.2,0,0,0,341.926,188.534Zm11.484-5.173a2.171,2.171,0,0,0-2.237,1.947c0,1.023,1.481,3.706,2.237,5.006.754-1.3,2.236-3.983,2.236-5.006A2.2,2.2,0,0,0,353.411,183.361Z" transform="translate(-338.67 -182.341)"/>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                    {parseFloat(prevSelectedStoreInfo.distance).toFixed(2)} kms
                                </span>
                            }
                            <a rel="noopener" aria-label="Get Directions" role="link" className="mr-3 small text-primary" href={getDirection} target="_blank" title="Get Directions">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                                    <defs>
                                        <style>{defsCss}</style>
                                    </defs>
                                    <g transform="translate(-336.335 -141.914)">
                                        <rect className="a" width="18" height="18" transform="translate(336.335 141.914)"/>
                                        <g transform="translate(336.335 141.914)">
                                            <path className="b" d="M348.655,145.064a9,9,0,1,0,9,9A9.011,9.011,0,0,0,348.655,145.064Zm0,17.01a8.01,8.01,0,1,1,8.01-8.01A8.019,8.019,0,0,1,348.655,162.074Z" transform="translate(-339.655 -145.064)"/>
                                            <g transform="translate(3.732 4.602)">
                                            <path className="b" d="M351.815,150.1a.985.985,0,0,0-.451.11l-7.087,3.642a.99.99,0,0,0,.242,1.847l2.985.649a.137.137,0,0,1,.1.077l1.272,2.777a.99.99,0,0,0,1.856-.158l2.045-7.7a.991.991,0,0,0-.337-1.023h0A.985.985,0,0,0,351.815,150.1Zm-2.108,8.3a.135.135,0,0,1-.124-.08l-1.3-2.841-3.053-.664a.137.137,0,0,1-.034-.256l6.256-3.216a.136.136,0,0,1,.148.015.138.138,0,0,1,.047.143l-1.8,6.8a.137.137,0,0,1-.121.1Z" transform="translate(-343.741 -150.104)"/>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                                Get Directions
                            </a>
                        </p>
                    </address>
                </div>
            }
            {validate.isNotEmpty(prevSelectedStoreInfo) && Object.keys(nearByStores).length > 0 && <hr className="solid"/>}
            {nearByStores && props.checkoutVerticle != 'LAB_CHECKOUT' && Object.keys(nearByStores).length > 0 && <div className="nearbystore">
                <p className="title m-3">Nearby Stores <span className="small text-secondary">(Stores based on locality selected)</span></p>
                <SearchBar selectedLocation={selectedLocation} setSelectedLocation={(location) => setSelectedLocation(location)} nearByStores={nearByStores} searchText={searchText} setSearchText={(text) => filterStores(text)} {...props} />
                <div className="address-container">
                    {nearByStores && Object.keys(nearByStores).map(function (key) {
                        const isLocationMatched = validate.isEmpty(selectedLocation) || (validate.isNotEmpty(selectedLocation) && selectedLocation === 'ALL') || (validate.isNotEmpty(selectedLocation) && nearByStores[key].locality.toUpperCase().replace(/ /g, "_") === selectedLocation);
                        const isSearchKeyMatched = validate.isNotEmpty(nearByStores[key]) && ((validate.isNotEmpty(nearByStores[key].storeName) && nearByStores[key].storeName.toLowerCase().includes(searchText.toLowerCase())) || (validate.isNotEmpty(nearByStores[key].name) && nearByStores[key].name.toLowerCase().includes(searchText.toLowerCase())) || nearByStores[key].address.toLowerCase().includes(searchText.toLowerCase()));
                        return (isSearchKeyMatched && isLocationMatched && <PickUpStore key={key} eachStoreInfo={nearByStores[key]} prevSelectedStoreId={props.prevSelectedStoreId} setPickUpStoreInfo={props.setPickUpStoreInfo} selectedDeliveryType={props.selectedDeliveryType} deliveryType={props.deliveryType} locationLatLong={props.selectedLocality.locationLatLong} />)
                    })}
                </div>
            </div>
            }
            {props.checkoutVerticle == 'LAB_CHECKOUT' && (nearByStores || otherNearByStores) && <div className="nearbystore">
                    <div className="mt-4"> <SearchBar selectedLocation={selectedLocation} setSelectedLocation={(location) => setSelectedLocation(location)} nearByStores={nearByStores} otherNearByStores={otherNearByStores} searchText={searchText} setSearchText={(text) => filterStores(text)} {...props} /></div>                
                    {filteredLabStores && Object.keys(filteredLabStores).length > 0 && <React.Fragment>
                    <p className="title mx-3 mt-0">Centers Available For All Selected Tests <span className="small text-secondary">(based on the locality you selected)</span></p>
                    <div className="address-container">
                    {filteredLabStores && Object.keys(filteredLabStores).map(function (key) {
                        return <PickUpStore key={key} eachStoreInfo={filteredLabStores[key].pathLabStore} prevSelectedStoreId={props.prevSelectedStoreId} setPickUpStoreInfo={props.setPickUpStoreInfo} selectedDeliveryType={props.selectedDeliveryType} deliveryType={props.deliveryType} locationLatLong={props.selectedLocality.locationLatLong} />
                    })}
                    </div>
                </React.Fragment>
                }

                {filteredPartialLabStores && Object.keys(filteredPartialLabStores).length > 0 && <React.Fragment>
                    <p className="title mx-3 mb-0">Other Centres Available </p>
                    <div className="address-container">
                    {filteredPartialLabStores && Object.keys(filteredPartialLabStores).map(function (key) {
                        return <PickUpStore key={key} eachStoreInfo={filteredPartialLabStores[key].pathLabStore} eachStoreCompleteInfo={filteredPartialLabStores[key]} availableTestCodes={filteredPartialLabStores[key].availableTestCodes} unAvailableTestCodes={filteredPartialLabStores[key].unAvailableTestCodes} isPartialTestCenters prevSelectedStoreId={props.prevSelectedStoreId} setPickUpStoreInfo={props.setPickUpStoreInfo} selectedDeliveryType={props.selectedDeliveryType} deliveryType={props.deliveryType} locationLatLong={props.selectedLocality.locationLatLong} saveSampleCollectionInfo={props.saveSampleCollectionInfo} selectedPartialStore={selectedPartialStore} setPartialSelectedStore={setPartialSelectedStore} shoppingCartList={props.shoppingCartList}/>
                    })}
                    </div>
                </React.Fragment>
                }
            </div>
            }
            {((validate.isEmpty(prevSelectedStoreInfo) && validate.isEmpty(nearByStores)) || (props.checkoutVerticle=='LAB_CHECKOUT' && validate.isEmpty(nearByStores) && validate.isEmpty(otherNearByStores))) &&
                <div className="no-data-to-show" style={{minHeight : "calc(100vh - 18rem"}}>
                    <img src={NoStoreFoundIcon} alt="no data to show" title="No Store Available"/>
                    <h6 className="mt-3 mb-0">No Store Available</h6>
                </div>
            }
        </section>
    )
}
export default PickUpStores;

const SearchBar = (props) => {
    const validate = Validate();
    const nearByStoresLength = validate.isNotEmpty(props.nearByStores) ? Object.keys(props.nearByStores).length : 0;
    const otherNearByStoresLength = validate.isNotEmpty(props.otherNearByStores) ? Object.keys(props.otherNearByStores).length : 0;
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        initialSlide: 0,
        slidesToShow: 1,
        /* slidesToScroll: 1, */
        swipe: false,
        variableWidth: true,
        arrows: true
    };
    var nearByLocationsDiv = props.nearByLocations && props.nearByLocations.map((eachLocationName, index) =>
        <div className="item" key={index}>
            <button className={props.selectedLocation === eachLocationName.toUpperCase().replace(/ /g,"_") ? 'btn-outline-brand btn' : 'btn-outline-dark btn'} role="button" value={eachLocationName} onClick={() => props.setSelectedLocation(eachLocationName.toUpperCase().replace(/ /g,"_"))}>{eachLocationName}</button>
        </div>
    );
    return( <React.Fragment>
        {(nearByStoresLength > 3 || otherNearByStoresLength >3) && <div className="d-flex justify-content-between">
                    <div className="col-6">
                        <form className="form community">
                            <div className="filled-form form-group">
                                <input type="text" className="form-control searchBarInput" id="name" name="location name" maxLength="200" onChange={(e) => props.setSearchText(e.target.value)} required autoComplete="off" value={props.searchText}  placeholder=" "/>
                                {validate.isEmpty(props.searchText) && <button role="button" className="btn btn-link shadow-none icons search-icn" onClick={(ev) => ev.preventDefault()} title=""></button>}
                                {validate.isNotEmpty(props.searchText) && <button role="button" className="btn btn-link shadow-none icons clear-icn d-block" title="" onClick={() => props.setSearchText('')}></button>}
                                <label className="select-label">Search for the nearby stores </label>            
                            </div>
                            <ul className="dropdown-menu locality-search-result dropdown-menu-store">
                                <span className="caret"></span>
                                <div className="locality-search-list">
                                    <li className="no-gutters">
                                        <div className="col">
                                            <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M11 4a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                                <path d="M7.5 4h1v9a.5.5 0 01-1 0V4z"></path>
                                            </svg>
                                            <p>
                                            Shyamal Cross Road
                                                <small>Shyamal, Ahmedabad, Gujarat, India</small>
                                            </p>
                                            <svg className="chevron-right" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 01-.708-.708L10.293 8 4.646 2.354a.5.5 0 010-.708z" clipRule="evenodd"></path>
                                            </svg>
                                        </div>
                                    </li>
                                    <li className="no-gutters">
                                        <div className="col">
                                            <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M11 4a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                                <path d="M7.5 4h1v9a.5.5 0 01-1 0V4z"></path>
                                            </svg>
                                            <p>
                                            Shyamal Cross Road
                                                <small>Shyamal, Ahmedabad, Gujarat, India</small>
                                            </p>
                                            <svg className="chevron-right" width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 01.708 0l6 6a.5.5 0 010 .708l-6 6a.5.5 0 01-.708-.708L10.293 8 4.646 2.354a.5.5 0 010-.708z" clipRule="evenodd"></path>
                                            </svg>
                                        </div>
                                    </li>
                                </div>
                            </ul>
                        </form>
                    </div>
                    {props.nearByLocations && props.nearByLocations.length > 2 && 
                        <div className="col-6 px-5">
                            <div className="main-content">
                                <Slider className="nearbystore-carousel" {...settings}>
                                    {nearByLocationsDiv}
                                </Slider>
                            </div>
                        </div>
                    }
                </div>}
    </React.Fragment>
    )
}