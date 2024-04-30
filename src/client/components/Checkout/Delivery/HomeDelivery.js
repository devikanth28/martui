import React, { useState } from 'react';
import Address from './Address';
import AddNewAddress from './AddNewAddress';
import Validate from '../../../helpers/Validate';
import NoAddressesFound from '../../../images/common/NoAddressesFound.svg';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { getSelectedLocality } from '../../../../redux/action/LocalityAction';
import CheckoutService from '../../../services/CheckoutService';

const HomeDelivery = (props) => {
    const validate = Validate();
    const communitiesInfo = props.communitiesForHub;
    const isCommunityDropAllowed = props.isCommunityDropAllowed;
    const [customerInfo, setCustomerInfo] = useState({});
    return (
        <React.Fragment>
            <section className="body-height">
                <div className="header mb-0">
                    <p>Home Delivery Options</p>
                </div>
                <Tabs className="home-community-delivery-tabs react-tabs">
                    <TabList className="nav nav-pills">
                        <Tab className="nav-item" title="Door Delivery">
                            <a href="javascript:void(0)" className="nav-link">Door Delivery</a>
                        </Tab>
                        {validate.isNotEmpty(communitiesInfo) && isCommunityDropAllowed && <Tab className="nav-item" title="Community Drop off">
                            <a href="javascript:void(0)" className="nav-link">Community Drop off</a>
                        </Tab>}
                    </TabList>
                    <TabPanel>
                        <HomeDeliveryOptionTab {...props} setCustomerInfo={setCustomerInfo} customerInfo={customerInfo}/>
                    </TabPanel>
                    <TabPanel>
                        <CommunityDeliveryOptionTab {...props}/>
                    </TabPanel>
                </Tabs>
            </section>
        </React.Fragment>
    )
}

const HomeDeliveryOptionTab = (props) =>{
    const selectedLocality = getSelectedLocality();
    const validate = Validate();
    const customerAddressList = props.customerAddressList;
    const [editAddressInfo, setEditAddressInfo] = useState(validate.isNotEmpty(props.customerInfo) ? props.customerInfo : {});
    const addEditAddress = props.addEditAddress;
    
    const openNewAddressSection = () => {
        props.clearSelectedAddressInfo();
        props.setAddOrEditAddress("ADD_ADDRESS");
        setEditAddressInfo({});
    }
    
    const openEditAddressSection = (address, event, index) => {
        event.stopPropagation();
        props.setAddOrEditAddress("EDIT_ADDRESS");
        address["index"] = index;
        setEditAddressInfo(address);
        props.setCustomerInfo(address);
    }
    
    const openHomeDelivery = () => {
        props.setAddOrEditAddress("");
    }
    
    const cancelButtonAction = () => {
        props.setAddOrEditAddress("");
        props.setCustomerInfo({});
    }

    const addOrUpdateDeliveryDetails = (addressInfo) => {
        props.showLoader(true,false,false);
        CheckoutService().addOrUpdateDeliveryDetails(addressInfo).then(response =>{
            if (validate.isNotEmpty(response) && validate.isNotEmpty(response.dataObject) && response.statusCode=="SUCCESS" && validate.isNotEmpty(response.dataObject.address)) {
                let index = 0;
                if(addEditAddress === "EDIT_ADDRESS") {
                    index = editAddressInfo.index;
                    props.updateCustomerAddressList(response.dataObject.address, index, false);
                } else if(addEditAddress === "ADD_ADDRESS") {
                    props.setIsNewAddressAddedFlag(true);
                    props.updateCustomerAddressList(response.dataObject.address, index, true);
                }
                
            } else if(validate.isNotEmpty(response) && response.statusCode === "FAILURE") {
                props.setAlertMessage(response.message);
            } else {
                props.setAlertMessage("System experiencing some problem, Please try after some time");
            }
            props.setAddOrEditAddress("");
            props.showLoader(false,false,false);
        }).catch(function(error) {
            props.setAddOrEditAddress("");
            props.showLoader(false,false,false);
            props.setAlertMessage("System experiencing some problem, Please try after some time");
        });
    }

    return(
        <React.Fragment>
            <div className="home-delivery-option-tab">
                <div className={validate.isEmpty(addEditAddress) ? 'select-address' : ''}>
                    {validate.isEmpty(addEditAddress) && validate.isNotEmpty(customerAddressList) && <p className="title">Saved Address: {!props.isNewAddressAdded && <button type="submit" className="btn btn-brand-gradient rounded-pill" onClick={() =>openNewAddressSection()}>ADD NEW ADDRESS</button>}</p>}
                    {validate.isEmpty(addEditAddress) && validate.isNotEmpty(customerAddressList) && customerAddressList.length > 0 && customerAddressList.map((eachAddress, index) => 
                        <Address key={index} index={index} eachAddressInfo={eachAddress} openEditAddressSection={openEditAddressSection} setHomeDeliveryInfo={props.setHomeDeliveryInfo} selectedDeliveryType={props.selectedDeliveryType} deliveryType={props.deliveryType}/>
                    )}
                    {validate.isNotEmpty(addEditAddress) && <AddNewAddress customerInfo={props.customerInfo} setCustomerInfo={props.setCustomerInfo} selectedLocality={selectedLocality} addOrUpdateDeliveryDetails={addOrUpdateDeliveryDetails} addEditAddress={addEditAddress} editAddressInfo={editAddressInfo} openHomeDelivery={openHomeDelivery} updateCustomerAddressList={props.updateCustomerAddressList} setAlertMessage={props.setAlertMessage} cancelButtonAction={cancelButtonAction} setIsNewAddressAddedFlag={props.setIsNewAddressAddedFlag} showLoader={props.showLoader}/>}
                </div>
                {validate.isEmpty(customerAddressList) && validate.isEmpty(addEditAddress) && <div className="col text-center p-3 ">
                    <img alt="NoAddressesFound" className="vertical-inline-inherit" title="NoAddressesFound" src={NoAddressesFound}/>
                    <p className="title my-2">No Address added <br/>Please add a address to home delivery</p>
                    <button type="submit" className="btn btn-brand-gradient rounded-pill my-2 px-4 custom-btn-lg" onClick={() =>openNewAddressSection()}>Add New Address</button>
                </div>}
            </div>
        </React.Fragment>
        
        )
    }
    
const CommunityDeliveryOptionTab = (props) =>{
    const validate = Validate();
    const selectedLocality = getSelectedLocality();
    const communitiesInfo = props.communitiesForHub;
    const [communityAddress, setCommunityAddress] = useState(props.communityDeliveryAddress);
    const [errorMsg, setErrorMsg] = useState({});
    const [searchText, setSearchText] = useState('');
    let prevSelectedCommunityInfo = {};
    if(validate.isNotEmpty(props.prevSelectedCommunityInfo)) {
        const selectedCommunityInfo = props.prevSelectedCommunityInfo;
        let infoArray = props.prevSelectedCommunityInfo.addressLine2.match(/([^,]*),(.*)/);
        var prevSelectedCommunityName = infoArray[1];
        Object.keys(communitiesInfo).filter(key => {
            let communityAddrInfo = communitiesInfo[key].split("$$$");
            let communityName = communityAddrInfo[0];
            if(communityName == prevSelectedCommunityName) {
                prevSelectedCommunityInfo["firstName"] = selectedCommunityInfo.firstName;
                prevSelectedCommunityInfo["communityName"] = communityName;
                prevSelectedCommunityInfo["configId"] = key;
                prevSelectedCommunityInfo["addressLine1"] = selectedCommunityInfo.addressLine1;
                prevSelectedCommunityInfo["addressLine2"] = communityAddrInfo[2];
                prevSelectedCommunityInfo["dropOffDetail"] = communityAddrInfo[1];
                prevSelectedCommunityInfo["mobileNo"] = selectedCommunityInfo.mobileNo
            }
        })
    }
    const handleInputChange = (event, communityType) => {
        let feildName = event.target.name;
        let feildValue = event.target.value;

        let errMsg = validation(event);
        if (errMsg)  {
            setErrorMsg(errorMsg => ({...errorMsg, [feildName]:errMsg}));
        } else {
            setErrorMsg({...errorMsg,[feildName]: ''});
        }
        const commAddress = {...communityAddress, [feildName]: feildValue};
        setCommunityAddress(commAddress);
        let prevSelectedCommunity = props.prevSelectedCommunityInfo;
        if(communityType == "PreviousCommunity") {
            const prevCommunity = props.prevSelectedCommunityInfo;
            prevSelectedCommunity = {...prevCommunity, [feildName]: feildValue};
        }
        props.setCommunityInfo(commAddress, prevSelectedCommunity);
        
    }

    const validation = e => {
        if (e.target.name.indexOf('addressLine1') > -1) {
            return validate.address(e.target.value, true, "Block / Flat Number", 200);
        }
        if (e.target.name.indexOf('mobileNo') > -1) {
            return validate.mobileNumber(e.target.value);
        }
    }
    
    const setCommunityInfo = (data) => {
        props.saveSelectedDeliveryType({COMMUNITY_DELIVERY : data.configId});
        setErrorMsg({});
        if(data["configId"] == prevSelectedCommunityInfo.configId) {
            props.setCommunityInfo(data);
            return;
        }
        if(communityAddress && data.configId == communityAddress.configId) {
            return;
        }
        let selectedCommunityInfo = {firstName:communityAddress.firstName, mobileNo:props.communityDeliveryAddress.mobileNo,...data}
        setCommunityAddress(selectedCommunityInfo);
    }

    const setPrevSelectedCommunity = (data) => {
        props.saveSelectedDeliveryType({COMMUNITY_DELIVERY : data.configId});
        setErrorMsg({});
        setCommunityAddress(data);
        props.setCommunityInfo(data);
    }
    
    return(
        <React.Fragment>
            <div className="community-delivery-option-tab">
                <div className="form-group has-float-label">
                    {validate.isEmpty(searchText) && <a className="icons search-icn pointer" title=""></a>}
                    <input type="text" className="form-control" name="community-search" id="community-search" placeholder=" " required autoComplete="off" maxLength="200" value={searchText || ''} onChange={(e) => setSearchText(e.target.value)}/>
                    <label htmlFor="community-search" className="select-label">Search for the near community</label>
                    {validate.isNotEmpty(searchText) && <a className="icons clear-icn d-block" title="" href="javascript:void(0)" onClick={() => setSearchText('')}></a>}
                </div>
                <div className="near-by-communities">
                    {validate.isNotEmpty(prevSelectedCommunityInfo) && 
                        <address key={prevSelectedCommunityInfo.configId} className={validate.isNotEmpty(props.selectedDeliveryType.COMMUNITY_DELIVERY) && props.selectedDeliveryType.COMMUNITY_DELIVERY == prevSelectedCommunityInfo.configId ? 'active' : ''} onClick={(e) => setPrevSelectedCommunity(prevSelectedCommunityInfo)}>
                            <p className="title-with-btn">
                                {prevSelectedCommunityInfo.communityName}
                            </p>
                            <p className="title">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                    <g transform="translate(-48.807 -143.086)">
                                    <rect width="24" height="24" transform="translate(48.807 143.086)" fill="none"></rect>
                                    <g transform="translate(53.785 145.081)">
                                        <path d="M61.016,148.6a3.4,3.4,0,1,0,3.405,3.4A3.4,3.4,0,0,0,61.016,148.6Zm0,5.513a2.108,2.108,0,1,1,2.108-2.108A2.111,2.111,0,0,1,61.016,154.116Z" transform="translate(-53.808 -145.095)" fill="#343a40"></path>
                                        <path d="M66.262,147.159a7,7,0,0,0-5.134-2.073h-.2a7.018,7.018,0,0,0-5.177,2.073,7.152,7.152,0,0,0-1.132,8.253,88.446,88.446,0,0,0,6.369,9.622,86.524,86.524,0,0,0,6.406-9.622A7.152,7.152,0,0,0,66.262,147.159Zm-.016,7.65a74.245,74.245,0,0,1-5.254,8.05,76.1,76.1,0,0,1-5.225-8.05,5.853,5.853,0,0,1,.924-6.755,5.6,5.6,0,0,1,4.238-1.671h.2a5.621,5.621,0,0,1,4.194,1.671A5.853,5.853,0,0,1,66.246,154.809Z" transform="translate(-53.798 -145.086)" fill="#343a40"></path>
                                    </g>
                                    </g>
                                </svg>
                                Address:
                                <small className="mb-3">{prevSelectedCommunityInfo.addressLine2}, {selectedLocality.city}, {selectedLocality.state},{selectedLocality.pincode}</small>
                            </p>
                            <p className="title">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <g transform="translate(-88 -588)">
                                        <rect fill="none" width="24" height="24" transform="translate(88 588)"></rect>
                                        <path fillRule="evenodd" fill="#343a40" d="M129.607,90.42l7.607,4.395v8.79L129.607,108,122,103.605v-8.79Zm0-6.42h0a.448.448,0,0,0-.507.507V88.73a.448.448,0,0,0,.507.507h0c.169,0,.338-.169.338-.507V84.507C129.945,84.169,129.776,84,129.607,84Zm3.719,2.2h0c-.169,0-.338.169-.338.507v4.223c0,.338.169.507.338.507h0a.448.448,0,0,0,.507-.507V86.7A.448.448,0,0,0,133.325,86.2Zm-7.607,0h0c-.169,0-.338.169-.338.507v4.223c0,.338.169.507.338.507h0a.448.448,0,0,0,.507-.507V86.7A.448.448,0,0,0,125.719,86.2Zm3.212,14.2v5.578l-5.578-3.043V97.351Zm1.352,5.578v-5.578l5.578-3.043v5.578Zm5.578-10.311-6.254,3.55-6.254-3.55,6.254-3.55Z" transform="translate(-30 504)"></path>
                                    </g>
                                </svg>
                                Drop Off Point:<small>{prevSelectedCommunityInfo.dropOffDetail}</small>
                            </p>
                            {communityAddress.configId != prevSelectedCommunityInfo.configId && <p className="title">
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
                                    Mobile Number:<small>{prevSelectedCommunityInfo.mobileNo}</small>
                                </p>}
                            {validate.isNotEmpty(props.selectedDeliveryType.COMMUNITY_DELIVERY) && props.selectedDeliveryType.COMMUNITY_DELIVERY == prevSelectedCommunityInfo.configId && <hr className=" my-3 ml-n5 mr-n3 solid"/>}
                            {validate.isNotEmpty(props.selectedDeliveryType.COMMUNITY_DELIVERY) && props.selectedDeliveryType.COMMUNITY_DELIVERY == prevSelectedCommunityInfo.configId && <div className="select-address-form">
                                <h6 className="text-body title">Please fill the below fields</h6>
                                <div className="form-group">
                                    <label className="small">Block / Flat Number <sup className="text-danger">*</sup></label>
                                    <input type="text" className="form-control" id="Street" placeholder="Enter block / flat number" name="addressLine1" onBlur={(event) => handleInputChange(event, "PreviousCommunity")} onChange={(event) => handleInputChange(event, "PreviousCommunity")} value={prevSelectedCommunityInfo.addressLine1 || ''} maxLength="200" autoComplete="new-off" required/>
                                    <div className="invalid-feedback d-block">{errorMsg['addressLine1']}</div>
                                </div>
                                <div className="form-group mb-0">
                                    <label className="small">Mobile Number <sup className="text-danger">*</sup></label>
                                    <input type="text" className="form-control" id="Phone" placeholder="Enter Mobile Number" name="mobileNo" onBlur={(event) => handleInputChange(event, "PreviousCommunity")} onChange={(event) => handleInputChange(event, "PreviousCommunity")} value={prevSelectedCommunityInfo.mobileNo || ''} maxLength="10" autoComplete="new-off" required />
                                    <div className="invalid-feedback d-block">{errorMsg['mobileNo']}</div>
                                </div>
                            </div>}
                        </address>
                    }
                    {validate.isNotEmpty(communitiesInfo) && Object.keys(communitiesInfo).map(key => {
                        let communityAddrInfo = communitiesInfo[key].split("$$$");
                        let communityName = communityAddrInfo[0];
                        let dropOffDetail = communityAddrInfo[1];
                        let addressLine2 = communityAddrInfo[2];
                        let communityAddressInfo = { configId: key, addressLine2: addressLine2 }
                        const isSearchKeyMatched = communityName.toLowerCase().includes(searchText);
                        const isSelected = validate.isNotEmpty(props.selectedDeliveryType.COMMUNITY_DELIVERY) && props.selectedDeliveryType.COMMUNITY_DELIVERY == key ? true : false;
                        return ( isSearchKeyMatched && prevSelectedCommunityInfo.configId != key &&
                            <address key={key} className={isSelected ? 'active ' : ''} onClick={(e) => setCommunityInfo(communityAddressInfo)}>
                                <p className="title-with-btn">
                                    {communityName}
                                </p>
                                <p className="title">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                        <g transform="translate(-48.807 -143.086)">
                                        <rect width="24" height="24" transform="translate(48.807 143.086)" fill="none"></rect>
                                        <g transform="translate(53.785 145.081)">
                                            <path d="M61.016,148.6a3.4,3.4,0,1,0,3.405,3.4A3.4,3.4,0,0,0,61.016,148.6Zm0,5.513a2.108,2.108,0,1,1,2.108-2.108A2.111,2.111,0,0,1,61.016,154.116Z" transform="translate(-53.808 -145.095)" fill="#343a40"></path>
                                            <path d="M66.262,147.159a7,7,0,0,0-5.134-2.073h-.2a7.018,7.018,0,0,0-5.177,2.073,7.152,7.152,0,0,0-1.132,8.253,88.446,88.446,0,0,0,6.369,9.622,86.524,86.524,0,0,0,6.406-9.622A7.152,7.152,0,0,0,66.262,147.159Zm-.016,7.65a74.245,74.245,0,0,1-5.254,8.05,76.1,76.1,0,0,1-5.225-8.05,5.853,5.853,0,0,1,.924-6.755,5.6,5.6,0,0,1,4.238-1.671h.2a5.621,5.621,0,0,1,4.194,1.671A5.853,5.853,0,0,1,66.246,154.809Z" transform="translate(-53.798 -145.086)" fill="#343a40"></path>
                                        </g>
                                        </g>
                                    </svg>
                                    Address:
                                    <small className="mb-3">{addressLine2}, {selectedLocality.city}, {selectedLocality.state},{selectedLocality.pincode}</small>
                                </p>
                                <p className="title">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <g transform="translate(-88 -588)">
                                            <rect fill="none" width="24" height="24" transform="translate(88 588)"></rect>
                                            <path fillRule="evenodd" fill="#343a40" d="M129.607,90.42l7.607,4.395v8.79L129.607,108,122,103.605v-8.79Zm0-6.42h0a.448.448,0,0,0-.507.507V88.73a.448.448,0,0,0,.507.507h0c.169,0,.338-.169.338-.507V84.507C129.945,84.169,129.776,84,129.607,84Zm3.719,2.2h0c-.169,0-.338.169-.338.507v4.223c0,.338.169.507.338.507h0a.448.448,0,0,0,.507-.507V86.7A.448.448,0,0,0,133.325,86.2Zm-7.607,0h0c-.169,0-.338.169-.338.507v4.223c0,.338.169.507.338.507h0a.448.448,0,0,0,.507-.507V86.7A.448.448,0,0,0,125.719,86.2Zm3.212,14.2v5.578l-5.578-3.043V97.351Zm1.352,5.578v-5.578l5.578-3.043v5.578Zm5.578-10.311-6.254,3.55-6.254-3.55,6.254-3.55Z" transform="translate(-30 504)"></path>
                                        </g>
                                    </svg>
                                    Drop Off Point:<small>{dropOffDetail}</small>
                                </p>
                                {!isSelected && <p className="title">
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
                                    Mobile Number:<small>{communityAddress.mobileNo}</small>
                                </p>}
                                {isSelected && <hr className=" my-3 ml-n5 mr-n3 solid"/>}
                                {isSelected && <div className="select-address-form">
                                    <h6 className="text-body title">Please fill the below fields</h6>
                                    <div className="form-group">
                                        <label className="small">Block / Flat Number <sup className="text-danger">*</sup></label>
                                        <input autoFocus={isSelected} type="text" className="form-control" id="Street" placeholder="Enter block / flat number" name="addressLine1" onBlur={(event) => handleInputChange(event, "NewCommunity")} onChange={(event) => handleInputChange(event, "NewCommunity")} value={communityAddress.addressLine1 || ''} maxLength="200" autoComplete="new-off" required/>
                                        <div className="invalid-feedback d-block">{errorMsg['addressLine1']}</div>
                                    </div>
                                    <div className="form-group mb-0">
                                        <label className="small">Mobile Number <sup className="text-danger">*</sup></label>
                                        <input type="text" className="form-control" id="Phone" placeholder="Enter Mobile Number" name="mobileNo" onBlur={(event) => handleInputChange(event, "NewCommunity")} onChange={(event) => handleInputChange(event, "NewCommunity")} value={communityAddress.mobileNo || ''} maxLength="10" autoComplete="new-off" required />
                                        <div className="invalid-feedback d-block">{errorMsg['mobileNo']}</div>
                                    </div>
                                </div>}
                            </address>
                        )
                    })}
                </div>
            </div>
        </React.Fragment>
        )
    }
    export default HomeDelivery;
