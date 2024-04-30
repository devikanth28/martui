import React, { useState, useEffect } from 'react';
import { Dropdown, DropdownMenu, DropdownItem, DropdownToggle, Modal, ModalBody } from 'reactstrap';
import PrescriptionService from '../../../services/PrescriptionService'
import Validate from '../../../helpers/Validate';
import HealthRecordCard from './HealthRecordCard'
import CreateOrEditHealthRecord from './CreateOrEditHealthRecord';
import DeleteHealthRecord from './DeleteHealthRecord';
import Alert, { ALERT_TYPE_ERROR, ALERT_TYPE_SUCCESS } from '../../Common/Alert';
import HealthRecordsGhostImage from './HealthRecordsGhostImage';
import noHealthRecordsFoundImage from '../../../images/common/no-health-records-cssbg.svg';
import ChangeLocality from '../../Locality/ChangeLocality';
import { getSelectedLocality } from '../../../../redux/action/LocalityAction';
import PaginationComponent from '../../Common/PaginationComponent';
import UserInfoAction from '../../../../redux/action/UserInfoAction';
import MetaTitle from '../../../commonComponents/MetaTitle';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import HealthTrends from './HealthTrends';

const validate = Validate();
const HealthRecords = (props) => {
    const userInfoAction = UserInfoAction();
    const userInfo = userInfoAction.getUserInfo();
    const selectedLocality = getSelectedLocality();
    const [isLocalityModalOpen, setLocalityModalOpen] = useState(false);
    const localityModalToggle = () => setLocalityModalOpen(!isLocalityModalOpen);
    const [currentHub, setCurrentHub] = useState("");

    const [isHealthRecordsLoading, setHealthRecordsLoading] = useState(false);
    const [healthRecords, setHealthRecords] = useState([]);
    const [presIdOrderId, setPresIdRecordId] = useState({});
    const [healthRecordTypes, setHealthRecordTypes] = useState([]);
    const prescriptionService = PrescriptionService();
    const [currentPageNo, setCurrentPageNo] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const recordsPerPage = 10;
    const [customerHealthRecord, setCustomerHealthRecord] = useState({ recordType: "PRE" });
    const [placeOrderMessageOpen, setPlaceOrderMessageOpen] = useState(false);
    const [placeOrderMessage, setPlaceOrderMessage] = useState("");
    const [isCreateHealthRecord, setIsCreateHealthRecord] = useState(false);

    const [isCreateOrEditHealthRecordModalOpen, setCreateOrEditHealthRecordModalOpen] = useState(false);
    const [isDeleteHealthRecordModalOpen, setDeleteHealthRecordModalOpen] = useState(false);

    const [recordIdToBeDeleted, setRecordIdToBeDeleted] = useState(0);
    const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
    const [searchText, setSearchText] = useState("");
    const [appliedFilters, setAppliedFilters] = useState({ "ALL": true });
    let searchPrescType = [];
    const [isSearchResult, setSearchResult] = useState(false);
    const [imageIdsToDelete, setImageIdsToDelete] = useState([]);
    const [locServiceAvailable , setLocServiceAvailable] = useState(false)
    const [isProceedLoading, setProceedLoading] = useState(false);
    const [imageServerDetail, setImageServerDetail] = useState({});
    const [showNoHealthRecordsSection, setShowNoHealthRecordsSection] = useState(false);
    const [searchOrClear, setSearchOrClear] = useState(true);
    const [sortBy, setSortBy] = useState("DESC");
    let sortType = "DESC";

    useEffect(() => {
        if (validate.isEmpty(healthRecords) && validate.isEmpty(healthRecordTypes)) {
            getMyHealthRecords(1, "");
        }
        /* if(validate.isNotEmpty(prescriptionTypeFilters)){
            searchHealthRecord();
        } */
    }, []);

    const search = (event) => {
        if ("Enter" === event.key) {
            searchHealthRecord(searchText, sortBy, true);
        }
    }
    const updateCustomerHealthRecord = (fieldName, fieldValue) => {
        if ("recordImageDetailList" === fieldName) {
            let recordImageDetailList = [];
            if (validate.isNotEmpty(customerHealthRecord) && validate.isNotEmpty(customerHealthRecord.recordImageDetailList)) {
                recordImageDetailList = customerHealthRecord.recordImageDetailList; // existing
            }
            const updatedRecordImageList = [...recordImageDetailList, ...fieldValue]; // new value will merge
            setCustomerHealthRecord({ ...customerHealthRecord, [fieldName]: updatedRecordImageList });
        } else {
            setCustomerHealthRecord({ ...customerHealthRecord, [fieldName]: fieldValue });
        }
    }
    const removeUploadedFileInfo = (index, imageName, imageId) => {
        if (validate.isNotEmpty(imageId)) {
            let imageIds = [...imageIdsToDelete];
            imageIds.push(imageId);
            setImageIdsToDelete(imageIds);
        }
        let uplaodedFiles = [...customerHealthRecord.recordImageDetailList];
        uplaodedFiles.splice(index, 1);
        setCustomerHealthRecord({ ...customerHealthRecord, ["recordImageDetailList"]: uplaodedFiles });
    }

    const createOrEditHelathRecordModalToggle = (isCreateHealthRecord, inputData) => {
        setIsCreateHealthRecord(isCreateHealthRecord);
        if (validate.isNotEmpty(inputData)) {
            setCustomerHealthRecord(inputData);
            setImageIdsToDelete([]);
        }
        if (isCreateHealthRecord) {
            setCustomerHealthRecord({ recordType: "PRE", patientName: validate.isNotEmpty(userInfo.displaybleName) ? userInfo.displaybleName : "" });
        }
        setCreateOrEditHealthRecordModalOpen(!isCreateOrEditHealthRecordModalOpen)
    }
    const deleteHealthRecordModalToggle = (recordId) => {
        setDeleteHealthRecordModalOpen(!isDeleteHealthRecordModalOpen);
        setRecordIdToBeDeleted(recordId);

    }
    const getMyHealthRecords = (pageNo, keyword) => {
        setHealthRecordsLoading(true);
        setShowNoHealthRecordsSection(false);
        let nextRecordIndex = ((pageNo - 1) * recordsPerPage);
        let limitTo = 10;
        prescriptionService.getMyHealthRecords(nextRecordIndex, keyword, searchPrescType, sortType, limitTo).then(response => {
            setHealthRecordsLoading(false);
            if (validate.isNotEmpty(response) && validate.isNotEmpty(response.statusCode) && "SUCCESS" == response.statusCode) {
                let resData = response.dataObject;
                if (validate.isEmpty(healthRecordTypes)) {
                    // prescriptionTypeFilters = preparePrescTypeFilters(resData.healthRecordTypes);
                    setHealthRecordTypes(resData.healthRecordTypes);
                }
                if (validate.isNotEmpty(resData.healthRecords)) {
                    setHealthRecords(resData.healthRecords);
                    setTotalRecords(resData.totalRecords);
                    if (validate.isEmpty(resData.totalRecords) || (validate.isNotEmpty(resData.totalRecords) && resData.totalRecords < 1)) {
                        setShowNoHealthRecordsSection(true);
                    }
                    setCurrentPageNo(pageNo);
                    setCurrentHub(resData.currentHub);
                    setLocServiceAvailable(resData.isLocalityValid)
                    setImageServerDetail(resData.imageServerDetail);
                } else {
                    setShowNoHealthRecordsSection(true);
                    setHealthRecords([]);
                    setTotalRecords(0);
                    setCurrentPageNo(pageNo);
                }
            } else if ("FAILURE" == response.statusCode) {
                setAlertInfo({ message: response.message, type: ALERT_TYPE_ERROR });
            }
            //setSearchResult(true);
        }).catch(function (error) {
            setHealthRecordsLoading(false);
            console.log(error);
        });
    }

    const createOrUpdateHealthRecord = () => {
        setProceedLoading(true);
        setShowNoHealthRecordsSection(false);
        searchPrescType = prepareFilters(appliedFilters);
        prescriptionService.createOrUpdateHealthRecord(customerHealthRecord, imageIdsToDelete, searchText, searchPrescType, sortBy).then(response => {
            setProceedLoading(false);
            if (validate.isNotEmpty(response) && validate.isNotEmpty(response.statusCode) && "SUCCESS" == response.statusCode && validate.isNotEmpty(response.dataObject)) {
                if (validate.isNotEmpty(response.dataObject.healthRecords)) {
                    setHealthRecords(response.dataObject.healthRecords);
                    setTotalRecords(response.dataObject.totalRecords);
                    if (validate.isEmpty(response.dataObject.totalRecords) || (validate.isNotEmpty(response.dataObject.totalRecords) && response.dataObject.totalRecords < 1)) {
                        setShowNoHealthRecordsSection(true);
                    }
                    setCurrentPageNo(1);
                    if (validate.isNotEmpty(response.dataObject.healthRecordId) && response.dataObject.healthRecordId < 1) {
                        setAppliedFilters({ "ALL": true });
                        setSortBy("DESC");
                        setSearchText("");
                    }
                } else {
                    setShowNoHealthRecordsSection(true);
                    setHealthRecords([]);
                    setCurrentPageNo(1);
                }
                setCreateOrEditHealthRecordModalOpen(!isCreateOrEditHealthRecordModalOpen);
            } else if ("FAILURE" == response.statusCode) {
                setAlertInfo({ message: response.message, type: ALERT_TYPE_ERROR });
            }
        }).catch(function (error) {
            setProceedLoading(false);
            console.log(error);
        });
    }

    const deleteMyHealthRecord = () => {
        setDeleteHealthRecordModalOpen(false);
        setHealthRecordsLoading(true);
        setShowNoHealthRecordsSection(false);
        searchPrescType = prepareFilters(appliedFilters);
        prescriptionService.deleteMyHealthRecord(recordIdToBeDeleted, searchText, searchPrescType, sortBy).then(response => {
            setHealthRecordsLoading(false);
            if (validate.isNotEmpty(response) && validate.isNotEmpty(response.statusCode) && "SUCCESS" == response.statusCode) {
                if (validate.isNotEmpty(response.dataObject.healthRecords)) {
                    setHealthRecords(response.dataObject.healthRecords);
                    setTotalRecords(response.dataObject.totalRecords);
                    if (validate.isEmpty(response.dataObject.totalRecords) || (validate.isNotEmpty(response.dataObject.totalRecords) && response.dataObject.totalRecords < 1)) {
                        setShowNoHealthRecordsSection(true);
                    }
                    setCurrentPageNo(1);
                } else {
                    setShowNoHealthRecordsSection(true);
                    setHealthRecords([]);
                    setCurrentPageNo(1);
                }
                setAlertInfo({ message: "Health Record deleted successfully", type: ALERT_TYPE_SUCCESS });
            } else if ("FAILURE" == response.statusCode) {
                setAlertInfo({ message: response.message, type: ALERT_TYPE_ERROR });
            }
            setSearchResult(false);
        }).catch(function (error) {
            setHealthRecordsLoading(false);
            console.log(error);
        });
    }

    const createOrderFromHealthRecord = (recordId) => {
        setPlaceOrderMessage("");
        if (validate.isEmpty(currentHub)) {
            localityModalToggle();
            return;
        }
        setPlaceOrderMessageOpen(true);
        prescriptionService.createOrderFromHealthRecord(recordId).then(response => {
            if (validate.isNotEmpty(response) && validate.isNotEmpty(response.statusCode) && "SUCCESS" == response.statusCode) {
                if (response.message == "ALREADY_PLACED") {
                    setPlaceOrderMessage("A request for an order against this Health Record is already placed, reference number is " + response.dataObject.prescriptionOrderId + ". For further queries please contact customer care 040-6700 6700")
                } else {
                    setPlaceOrderMessage("Your prescription request Id " + response.dataObject.prescriptionOrderId + " has been submitted. Customer care 040-67006700 will call you back to process your order");
                }
            } else if ("FAILURE" == response.statusCode) {
                setPlaceOrderMessageOpen(false);
                setAlertInfo({ message: response.message, type: ALERT_TYPE_ERROR });
            }
        }).catch(function (error) {
            setPlaceOrderMessageOpen(false);
            console.log(error);
        });
    }

    const searchByFilter = (presType) => {
        let filters = {};
        Object.entries(healthRecordTypes).map(([key, value]) => {
            filters[key] = false;
        });
        filters["ALL"] = false;
        filters[presType] = true;
        searchPrescType = prepareFilters(filters);
        setAppliedFilters(filters);
        searchHealthRecord(searchText, sortBy, false);
    }


    const preparePrescTypeFilters = (recordTypes) => {
        let filters = {};
        filters["ALL"] = true;
        Object.entries(recordTypes).map(([key, value]) => {
            filters[key] = false;
        });
        return filters;
    }
    const prepareFilters = (filtersType) => {
        let tempPresTypes = [];
        Object.entries(filtersType).map(([key, value]) => {
            if (value) {
                tempPresTypes.push(key);
            }
        });
        return tempPresTypes;
    }

    const searchHealthRecord = (keyword, orderBy, isRequried) => {
        sortType = orderBy;
        if (isRequried) {
            searchPrescType = prepareFilters(appliedFilters);
        }
        if (keyword == "") {
            setSearchOrClear(true);
        } else {
            setSearchOrClear(false);
        }
        getMyHealthRecords(1, keyword);
        setSearchResult(true);
    }

    const getHealthRecordByPageNo = (pageNumber) => {
        searchPrescType = prepareFilters(appliedFilters);
        sortType = sortBy;
        getMyHealthRecords(pageNumber, searchText);
    }

    const handleOnChange = (text) => {
        setSearchText(text);
        //setSearchOrClear(true);
    }

    const clear = (keyword) => {
        setSearchText("");
        searchHealthRecord(keyword, sortBy, true);
    }

    const [tabIndex, setTabIndex] = useState((props.routePath == "healthTrends") ? 1 : 0);
       
    return (
        <React.Fragment>
            <MetaTitle metaKey={`VIEW_PRESCRIPTION`} />
            <Alert alertInfo={alertInfo} duration={5000} onDurationEnd={setAlertInfo} />
            <section className="body-height">
                <div className="p-0 d-block">
                    <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
                        <div className="header p-0 mb-0">
                            <TabList className="nav nav-pills">
                                <Tab className="nav-item border-0" title="Health Records" onClick={() => props.history.push("/viewPrescription")}>
                                    <button role="button" className="nav-link py-3 btn border-0">Health Records</button>
                                </Tab>
                                <Tab className="nav-item border-0" title="Health Trends" onClick={() => tabIndex != 1 && props.history.push('/healthTrends')}>
                                    <button role="button" className="nav-link py-3 btn border-0">Health Trends</button>
                                </Tab>
                            </TabList>
                        </div>
                        <TabPanel>

                            {(isHealthRecordsLoading || validate.isNotEmpty(healthRecords) || isSearchResult) &&
                                <React.Fragment>
                                    <div className="my-account-health-records">
                                        <div className="search-box-container no-gutters">
                                            <div className="col">
                                                <input autoFocus type="text" className="form-control text-truncate" placeholder="Search By Record Name or Patient Name or Doctor Name" id="search-prescription" value={searchText} onChange={(event) => handleOnChange(event.target.value)} autoComplete="off" onKeyPress={(event) => search(event)} />
                                                <label className="sr-only" htmlFor="search-prescription">Search Prescription</label>
                                                {searchOrClear && <button className="btn btn-light search-btn btn-sm" onClick={(event) => searchHealthRecord(searchText, sortBy, true)}>Search</button>}
                                                {!searchOrClear && <button className="btn btn-light search-btn btn-sm" onClick={() => clear("")} >Clear</button>}
                                            </div>
                                            <button className="flex-center btn btn-brand-gradient rounded-pill col-3 ml-3 custom-btn-lg" onClick={() => createOrEditHelathRecordModalToggle(true, customerHealthRecord)}>
                                                <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <circle cx="12" cy="12" r="10" />
                                                    <line x1="12" y1="8" x2="12" y2="16" />
                                                    <line x1="8" y1="12" x2="16" y2="12" />
                                                </svg>
                                                Create New Health Records
                                            </button>
                                        </div>
                                        {!searchOrClear && searchText.trim().length > 0 && <p className="search-text mt-2">Showing results for "<strong className="text-brand">{searchText}</strong>"</p>}
                                        {validate.isNotEmpty(healthRecordTypes) &&
                                            <div className="filter-by-container">
                                                <div className="d-inline-block">
                                                    <p className="label-text">Filter By</p>
                                                    <button title="All" className={appliedFilters["ALL"] ? 'btn btn-badge active' : 'btn btn-badge'} role="button" onClick={() => searchByFilter("ALL")}>All</button>
                                                    {Object.entries(healthRecordTypes).map(([key, value]) => {
                                                        if (key != "ALL") {
                                                            return (
                                                                <button key={key} title={value} className={appliedFilters[key] ? 'btn btn-badge active' : 'btn btn-badge'} role="button" onClick={() => searchByFilter(key)}>{value}</button>
                                                            );
                                                        }
                                                    })
                                                    }
                                                </div>
                                                <div className="d-inline-block ml-4">
                                                    <p className="label-text">Sort By</p>
                                                    <div className="btn-group btn-group-toggle" data-toggle="buttons" >
                                                        <label title="Older" className={"btn btn-badge mr-0 " + (sortBy == "ASC" ? 'active' : '')}>
                                                            <input type="radio" name="sortBy" id="option1" value="ASC" onClick={(e) => { setSortBy(e.target.value); searchHealthRecord(searchText, "ASC", true) }} /> Older
                                                        </label>
                                                        <label title="Newer" className={"btn btn-badge mr-0 " + (sortBy == "DESC" ? 'active' : '')}>
                                                            <input type="radio" name="sortBy" id="option2" value="DESC" onClick={(e) => { setSortBy(e.target.value); searchHealthRecord(searchText, "DESC", true) }} /> Newer
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>}
                                        <div className="health-records mt-3">
                                            {!isHealthRecordsLoading && healthRecords && healthRecords.map((eachHealthRecord) => {
                                                return (validate.isNotEmpty(eachHealthRecord.recordImageDetailList) &&
                                                    <HealthRecordCard key={eachHealthRecord.recordId} healthRecord={eachHealthRecord}
                                                        healthRecordImages={eachHealthRecord.recordImageDetailList}
                                                        createOrEditHelathRecordModalToggle={createOrEditHelathRecordModalToggle}
                                                        deleteHealthRecordModalToggle={deleteHealthRecordModalToggle}
                                                        requestForOrderPlacement={createOrderFromHealthRecord}
                                                        locServiceAvailable= {locServiceAvailable}
                                                    />
                                                )
                                            })}
                                            {isHealthRecordsLoading && <HealthRecordsGhostImage />}
                                            {validate.isEmpty(healthRecords) && isSearchResult &&
                                                <div className="no-health-record-found body-height w-100">
                                                    <img className="mb-3" src={noHealthRecordsFoundImage} />
                                                    <h6>No Health Record Found</h6>
                                                </div>}
                                        </div>
                                    </div>
                                </React.Fragment>}
                        </TabPanel>
                        <TabPanel>
                            <HealthTrends {...props}/>
                        </TabPanel>
                    </Tabs>
                </div>
                {showNoHealthRecordsSection && !isSearchResult && tabIndex===0 &&
                    <div className="no-health-records body-height">
                        <svg className="mb-3" xmlns="http://www.w3.org/2000/svg" width="82.001" height="89.758" viewBox="0 0 82.001 89.758">
                            <g opacity="0.301" transform="translate(-9 -5.12)">
                                <path d="M12124.362,13264.75l-11.313-11.316a16.971,16.971,0,0,1-16.936.639h-28.992a.985.985,0,0,1-.985-.985v-6.358h-7.4a.988.988,0,0,1-.985-.985v-6.13h-7.768a.988.988,0,0,1-.985-.988v-61.516a.989.989,0,0,1,.985-.989h44.383a.987.987,0,0,1,.985.989v6.129h7.768a.987.987,0,0,1,.989.985v10.8a1.012,1.012,0,0,1-.044.207l8.03,8.113a.988.988,0,0,1,.413.8c0,.033-.017.063-.02.1v19.807a17.048,17.048,0,0,1,6.069,23.881l11.313,11.313a3.823,3.823,0,0,1,.144,5.274.772.772,0,0,1-.063.1l-.144.141a3.851,3.851,0,0,1-5.446,0Zm-9.675-12.465,11.069,11.069a1.933,1.933,0,0,0,2.66,0l.061-.063a1.877,1.877,0,0,0,0-2.66l-11.07-11.07A17.145,17.145,0,0,1,12114.688,13252.285Zm-25.8-13.374a15.147,15.147,0,1,0,15.148-15.146A15.162,15.162,0,0,0,12088.885,13238.911Zm-20.774,13.19h25.023a17.107,17.107,0,0,1,17.385-29.024v-17.948h-11.466a.983.983,0,0,1-.985-.985v-11.59h-29.957Zm-8.383-13.48v6.133h6.408v-53.186a.988.988,0,0,1,.989-.985h31.928c.023,0,.04.01.06.01a1,1,0,0,1,.264.054c.029.013.063.02.093.033a.957.957,0,0,1,.273.187s.007,0,.01.007h0l2.381,2.406v-8.07h-42.408Zm-8.757-.981h6.782v-53.419a.987.987,0,0,1,.985-.985h34.645v-5.141h-42.412Zm49.067-34.482h9.1l-9.1-9.191Zm-8.562,35.754a12.556,12.556,0,1,1,12.558,12.558A12.572,12.572,0,0,1,12091.476,13238.911Zm1.974,0a10.584,10.584,0,1,0,10.584-10.584A10.6,10.6,0,0,0,12093.449,13238.911Zm1.465,1.288a.987.987,0,0,1,1.955-.276,7.261,7.261,0,0,0,7.164,6.209.987.987,0,0,1,0,1.975A9.248,9.248,0,0,1,12094.914,13240.2Zm-22.738,3a.987.987,0,0,1,0-1.974h10.42a.987.987,0,1,1,0,1.974Zm24.11-7.251a.982.982,0,0,1-.413-1.332,9.259,9.259,0,0,1,5.606-4.577.987.987,0,1,1,.546,1.9,7.262,7.262,0,0,0-4.407,3.6.987.987,0,0,1-1.332.413Zm-24.11-3.822a.985.985,0,1,1,0-1.971h14.622a.985.985,0,0,1,0,1.971Zm0-10.973a.986.986,0,1,1,0-1.972h27.5a.986.986,0,0,1,0,1.972Zm0-7.4a.986.986,0,0,1-.986-.985v-14.915a.989.989,0,0,1,.986-.989h12.255a.988.988,0,0,1,.985.989v14.919a.984.984,0,0,1-.985.981Zm.988-1.971h10.281v-12.944h-10.281Z" transform="translate(-12040 -13171)" />
                            </g>
                        </svg>
                        <h6 className="mb-3">No Records Available</h6>
                        <button className="flex-center btn btn-brand-gradient rounded-pill px-5" onClick={() => createOrEditHelathRecordModalToggle(true, customerHealthRecord)}>
                            <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="8" x2="12" y2="16" />
                                <line x1="8" y1="12" x2="16" y2="12" />
                            </svg>
                            Create New Health Records
                        </button>
                    </div>
                }
                {tabIndex == 0 && <PaginationComponent totalNoOfRecords={totalRecords} recordsPerPage={recordsPerPage} currentPageNo={currentPageNo} onSelectHandler={getHealthRecordByPageNo} ></PaginationComponent>} 
            </section>
            {isCreateOrEditHealthRecordModalOpen && <CreateOrEditHealthRecord modal={isCreateOrEditHealthRecordModalOpen}
                toggle={setCreateOrEditHealthRecordModalOpen}
                isCreateHealthRecord={isCreateHealthRecord}
                healthRecordTypes={healthRecordTypes}
                customerHealthRecord={customerHealthRecord}
                createOrUpdateHealthRecord={createOrUpdateHealthRecord}
                updateCustomerHealthRecord={updateCustomerHealthRecord}
                removeUploadedFileInfo={removeUploadedFileInfo}
                isProceedLoading={isProceedLoading}
                imageServerDetail={imageServerDetail}
            />}

            <DeleteHealthRecord modal={isDeleteHealthRecordModalOpen} toggle={setDeleteHealthRecordModalOpen} deleteMyHealthRecord={deleteMyHealthRecord} />
            {validate.isNotEmpty(selectedLocality) && <ChangeLocality modal={isLocalityModalOpen} toggle={localityModalToggle} selectedLocality={selectedLocality} />}
            <PlaceOrderMessage modal={placeOrderMessageOpen} toggle={setPlaceOrderMessageOpen} placeOrderMessage={placeOrderMessage} />
        </React.Fragment>
    )
}

const PlaceOrderMessage = (props) => {
    return (
        <React.Fragment>
            <Modal backdrop="static" keyboard={false} isOpen={props.modal} className="modal-dialog-centered my-account-modal edit-prescription-popup" tabIndex="-1">
                <ModalBody>
                    {validate.isEmpty(props.placeOrderMessage) ?
                        <div className="each-product">
                            <div className="card p-0">
                                <div className="ph-item mb-0 pt-3">
                                    <div className="ph-col-12 p-0 mt-n3">
                                        <div className="ph-row p-0 m-3">
                                            <div className="ph-col-12 mb-2"></div>
                                            <div className="ph-col-4 mb-3"></div>
                                            <div className="ph-col-8 empty mb-3"></div>
                                            <div className="ph-col-8 empty mb-3"></div>
                                            <div className="ph-col-4 mb-3"></div>
                                            <div className="ph-col-12 mb-3"></div>
                                            <div className="ph-col-12 mb-0"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> :
                        <React.Fragment>
                            <div>
                                <p className="mb-0">{props.placeOrderMessage}</p>
                            </div>
                            <div className="mt-4">
                                <button type="button" className="brand-secondary btn px-5 rounded-pill custom-btn-lg" onClick={() => { props.toggle(false) }}>OK, Thank You</button>
                            </div>
                        </React.Fragment>
                    }
                </ModalBody>
            </Modal>
        </React.Fragment>
    );
}
export default HealthRecords;

