import React, { useEffect, useState } from "react";
import LabsBanner from "../../../components/MedplusLabs/components/Common/LabsBanner";
import Validate from "../../../helpers/Validate";
import { getConsultationType, getSelectedFiltersAndSortFromUrl, sortAndFilterRequestConst, sortAndFilterResponseConst, UrlTypeConstants, VISIT_TYPE_WALK_IN } from "../../constants/DoctorConsultationConstants";
import { getClinicIdFromUrlValue, getIdFromTheUrlValue, getNameFromUrlValue, getPageTypeFromUrlValue, prepareSeachStringParam } from "../../helper/DoctorConsulationHelper";
import DoctorConsultationService from "../../services/DoctorConsultationService";
import DoctorCard from "./DoctorCard";
import DoctorListGhostImage from "./DoctorListGhostImage";
import NoDoctorsAvailable from "./NoDoctorsAvailable";
import { compile } from 'path-to-regexp';
import DoctorSortAndFilter from "./DoctorSortAndFilter";
import { ADD_DOCTORS_CATALOG_REDUX_DATA, DOCTORS_CATALOG_LIST } from "../../redux/DoctorConsultationReducer";
import { useDispatch,useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import useStaticContent from "../../../components/Common/CustomHooks/useStaticContent";
import CategoryContentGhostImage from "../../../components/Common/CategoryContentGhostImage";
import DoctorListGhostImageCard from "./DoctorListGhostImageCard";

const DoctorCategoryInfo = (props) => {

    let doctorCardsPerPage = 10;

    const validate = Validate();
    const [currentIndex,setCurrentIndex] = useState(0);
    const [doctorsList, setDoctorsList] = useState([]);
    const [isRecordsCompleted, setIsRecordsCompleted] = useState(false);
    const [catalogLoader, setCatalogLoader] = useState(true);
    const [loadMoreDoctorsCount,setLoadMoreDoctorsCount] = useState(0);
    const dispatch = useDispatch();
    const paramValue = props.match.params.searchString;
    const categoryType = props.match.params.categoryType;
    const visitTypeParam = props.match.params.visitType;
    const pageType=paramValue?getPageTypeFromUrlValue(paramValue):(props.history.location.pathname.indexOf("viewall") !== -1) ? visitTypeParam:"";
    const isViewAll = (props.history.location.pathname.indexOf("viewall") !== -1) ? true : false;
    const [isFromViewAll,fromViewAll] = useState(props.history.location.pathname.indexOf("viewall")!== -1);
    const specializationName = getNameFromUrlValue(paramValue);
    const specilizationId= getIdFromTheUrlValue(paramValue);
    const clinicId = (validate.isNotEmpty(paramValue) && paramValue.indexOf(UrlTypeConstants.clinics) != -1) ? getClinicIdFromUrlValue(paramValue) : undefined;
    const visitType = validate.isNotEmpty(clinicId)?VISIT_TYPE_WALK_IN:getConsultationType(visitTypeParam);
    const [listingName,setListingName] = useState(specializationName);
    const doctorConsultationService = DoctorConsultationService();
    const [totalDoctorsCount,setTotalDoctorsCount]= useState(0);
    const [isContentLoading, content] = useStaticContent({itemId:((pageType === UrlTypeConstants.specialization ? 'DR_SPECIALIZATION_' : 'DR_SYMPTOMS_') + specilizationId), contentType : "ALL"});
    const doctorsListFromReduxData = useSelector(state=>{
        if(validate.isNotEmpty(state) && validate.isNotEmpty(state.doctorConsultation) && validate.isNotEmpty(state.doctorConsultation[DOCTORS_CATALOG_LIST])){
            let doctorsList = state.doctorConsultation[DOCTORS_CATALOG_LIST]
            return  (paramValue && doctorsList[`${pageType}_${specilizationId}${visitType?`_${visitType}`:``}`])?doctorsList[`${pageType}_${specilizationId}${visitType?`_${visitType}`:``}`]:{}
        }
    })
    let sortAndFilterString = props.history.location.search;
    let pathName = props.history.location.pathname;
    sortAndFilterString = validate.isNotEmpty(sortAndFilterString) && sortAndFilterString.length > 1 ? sortAndFilterString.substring(1, sortAndFilterString.length) : {};
    const selectedFiltersAndSortFromUrl = getSelectedFiltersAndSortFromUrl(sortAndFilterString);

    const requestObjForSortAndFilters = {
        "visitType" : visitType,
        "paramValue" : paramValue,
        "requestFrom" : "WEB",
        "forSortAndFilterRequest" : true
    }

    useEffect(() => {
        let doctorsListFromRedux;
        let totalRecordsFromRedux;
        let categoryListingName;
        if(validate.isNotEmpty(doctorsListFromReduxData) && validate.isEmpty(sortAndFilterString)){
            doctorsListFromRedux= doctorsListFromReduxData.doctorsList;
            totalRecordsFromRedux = doctorsListFromReduxData.totalRecords;
            categoryListingName = doctorsListFromReduxData.categoryListingName;
        }
        if(validate.isNotEmpty(totalRecordsFromRedux)){
            setCatalogLoader(false);
            setListingName(categoryListingName);
            setDoctorsList(doctorsListFromRedux?doctorsListFromRedux:[]);
            setCurrentIndex(doctorsListFromRedux?doctorsListFromRedux.length:0);
            let totalLoadDoctorsCount = parseInt(totalRecordsFromRedux-doctorsListFromRedux.length);
            setTotalDoctorsCount(totalRecordsFromRedux);
            setLoadMoreDoctorsCount(totalLoadDoctorsCount>doctorCardsPerPage?doctorCardsPerPage:totalLoadDoctorsCount);
            if(doctorsListFromRedux && totalRecordsFromRedux <= doctorsListFromRedux.length)
                setIsRecordsCompleted(true);
            else
                setIsRecordsCompleted(false);
        }else{
            getDoctorsInfoForCatalog(0);
        }
    }, [paramValue]);
    
    useEffect(() => {
        props.setCategoryName(listingName);
    }, [listingName]);

    const getDoctorsInfoForCatalog=(startIndex)=>{
        let obj= {};
        obj["startIndex"] = startIndex;
        obj["visitType"] = visitType;

        if(paramValue)
            obj["paramValue"] = paramValue;
        else{
            if(pageType === UrlTypeConstants.online || pageType ===  UrlTypeConstants.walkin){
                obj["priority"] =1;
                obj['consultationTypeCatalog']=true;
                obj['paramValue']= pageType;
            }
        }

        obj["requestFrom"]="WEB";
        if(props.history && props.history.location && validate.isNotEmpty(props.history.location.search)) {
            let sortAndFilterStr = props.history.location.search;
            sortAndFilterStr = sortAndFilterStr.substring(1, sortAndFilterStr.length);
            try {
                sortAndFilterStr = atob(sortAndFilterStr);
            } catch(err) {
                console.log("Invalid URL parameter");
            }
            if(validate.isNotEmpty(sortAndFilterStr)){
                obj["priority"] = "";
                obj["consultationTypeCatalog"] = false;
                obj["paramValue"] = `${obj["paramValue"]}?${sortAndFilterStr}`;
                obj["sortAndFilter"] = true;
            }
        }
        doctorConsultationService.getDoctorsForCatalog(obj).then(data=>{
             if(validate.isNotEmpty(data) && validate.isNotEmpty(data.statusCode) && "SUCCESS" === data.statusCode && validate.isNotEmpty(data.dataObject)){
                let doctors =  data.dataObject.doctors ;
                 let listingNameFromDB = data.dataObject.listingName;
                 setListingName(listingNameFromDB);
                 if(validate.isNotEmpty(listingNameFromDB) && listingNameFromDB.toLowerCase() !== listingName.toLowerCase()){
                    let updatedParamValue =  prepareSeachStringParam(specilizationId, pageType, listingNameFromDB);
                    const toPath = compile(props.match.path);
                    const newPath = toPath({ ...props.match.params, searchString:updatedParamValue });
                    props.history.replace(newPath);
                 }
                if(validate.isNotEmpty(doctors)){
                    let doctorsInfoState = [];
                    if(startIndex == 0){
                        doctorsInfoState=[...doctors]
                    } else {
                         doctorsInfoState =[...doctorsList, ...doctors];

                    }
                    setCurrentIndex(doctorsInfoState.length);
                    setDoctorsList(doctorsInfoState);
                    let totalLoadDoctorsCount = parseInt(data.dataObject.totalRecords-doctorsInfoState.length);
                    setTotalDoctorsCount(data.dataObject.totalRecords);
                    setLoadMoreDoctorsCount(totalLoadDoctorsCount>doctorCardsPerPage?doctorCardsPerPage:totalLoadDoctorsCount);    
                    if(totalLoadDoctorsCount <= 0 || doctors.length < doctorCardsPerPage){
                        setIsRecordsCompleted(true);
                    }
                    if(!obj["sortAndFilter"] && obj["paramValue"]){
                        dispatch({type:ADD_DOCTORS_CATALOG_REDUX_DATA,data:{[`${pageType}_${specilizationId}${visitType?`_${visitType}`:``}`]:{"doctorsList": doctorsInfoState,"totalRecords":data.dataObject.totalRecords,"categoryListingName": listingNameFromDB}}});
                    }
                }else{
                    setIsRecordsCompleted(true);
                } 
                
            }else{
                setIsRecordsCompleted(true);
            }
            setCatalogLoader(false);
        }).catch((e) => {
            console.log(e);
            setCatalogLoader(false);
        });

    }

    const loadMoreDoctors= ()=>{
        if(validate.isNotEmpty(doctorsList) && !isRecordsCompleted){
            getDoctorsInfoForCatalog(currentIndex);
        }
    }

    const applySortAndFilter = (filtersAndSort) => {
        let obj = {};
        obj[sortAndFilterRequestConst.SPECIALITIES_IDS] = filtersAndSort[sortAndFilterResponseConst.SPECIALITIES];
        obj[sortAndFilterRequestConst.ONLINE_STATUS] = filtersAndSort[sortAndFilterResponseConst.ONLINE_STATUS];
        obj[sortAndFilterRequestConst.GENDER] = filtersAndSort[sortAndFilterResponseConst.GENDERS];
        obj[sortAndFilterRequestConst.CONSULTATION_TYPE] = filtersAndSort[sortAndFilterResponseConst.CONSULTATION_TYPES];
        obj[sortAndFilterRequestConst.SORT] = filtersAndSort[sortAndFilterResponseConst.SORT];
        let str = "";
        Object.keys(obj).map(each => {
            if (each == sortAndFilterRequestConst.SPECIALITIES_IDS) {
                let specialitiesStr = obj[each].join(",");
                str += `${each}=${specialitiesStr}::`;
            } else {
                str += `${each}=${obj[each]}::`
            }
        })
        str = str.substring(0, str.length - 2);
        if (validate.isNotEmpty(str)) {
            let url = props.history.location.pathname + "?" + btoa(str);
            if(validate.isEmpty(sortAndFilterString))
                props.history.push(url);
            else
                props.history.replace(url)
        }
    }

    const redirectToAllDoctors = ()=>{
        let location = props.location.pathname;
            console.log(location);
            if(validate.isNotEmpty(pathName)){
                let url = location;
                props.history.push(url);
            }
    }

    const loadmoreDoctorType = (type)=>{
        switch(type){
            case UrlTypeConstants.specialization:
                return `${listingName}`;
            case UrlTypeConstants.symptoms:
                return `${listingName}`;
            case UrlTypeConstants.online:
                return 'Online Consultation';
            case UrlTypeConstants.clinics:
                return 'Walk In';
            case UrlTypeConstants.walkin:
                return 'Walk In';
            default:
                return ""
        }

    }

    return (
        <React.Fragment>
            <Helmet>
                <title>{`${validate.isNotEmpty(listingName) ? (pageType === UrlTypeConstants.symptoms ? `Know Symptoms of ${listingName}` : `${listingName} Specialist Appointment online`):'MedPlusMart'}`}</title>
            </Helmet>
            {(pageType === UrlTypeConstants.specialization || pageType === UrlTypeConstants.symptoms) && <LabsBanner requestFor={'BANNER_DOCTORS_WEB'} page={pageType == "specialization" ? "SPECIALIZATION": "SYMPTOM"} screenLocation ={"Top"} history={props.history}/>}
            {!catalogLoader && validate.isNotEmpty(doctorsList) && <section className="category-container">
                    <div className="pb-0">
                        <div className={ isViewAll ? "d-flex justify-content-between mb-3" : "mb-3"}>
                            {pageType === UrlTypeConstants.specialization && <h5 className="mt-0 mb-0">Doctors Available in <span>{listingName}</span></h5>}
                            {pageType === UrlTypeConstants.symptoms && <h5 className="mt-0 mb-0">Doctors Available for {listingName}</h5>}   
                            {pageType === UrlTypeConstants.clinics && <h5 className="mt-0 mb-0">Visit a doctor</h5>}   
                            {pageType === UrlTypeConstants.online && <h5 className="mt-0 mb-0">Doctors online</h5>}
                            {pageType === UrlTypeConstants.walkin && <h5 className="mt-0 mb-0">Doctors available near you</h5>}
                            {(isViewAll && validate.isNotEmpty(totalDoctorsCount))&& <p className="mb-0 font-14 text-secondary">{doctorsList.length} / {totalDoctorsCount} Doctors</p>}
                        </div>
                    {(validate.isNotEmpty(sortAndFilterString) || (validate.isNotEmpty(doctorsList) && doctorsList.length >= 1)) && <DoctorSortAndFilter forCompletePage={false} visibleDoctorCount={doctorsList.length} visitType={visitType} history={props.history} selectedFiltersAndSortFromUrl={selectedFiltersAndSortFromUrl} applySortAndFilter={applySortAndFilter}  doctorsInfo={doctorsList} redirectToAllDoctors={redirectToAllDoctors} requestObjForSortAndFilters={requestObjForSortAndFilters} doctorsCount={totalDoctorsCount} page = {"listPage"}/> }
                        <div className="doctor-list-container">
                            {validate.isNotEmpty(doctorsList) && doctorsList.length > 0 && doctorsList.map((doctorInfo)=>{
                                return(
                                    <React.Fragment key={doctorInfo.doctorId}>
                                        <div className="each-doctor-card">
                                            <DoctorCard doctorInfo={doctorInfo} visitType={visitType} isFromViewAll={isFromViewAll} searchString={paramValue} categoryType={categoryType} history={props.history} clinicId={clinicId}/>
                                        </div>
                                    </React.Fragment>
                                )
                            })}
                        </div>
                        {!isRecordsCompleted && <button role="button" className="btn brand-secondary px-5 mt-5 mb-4 rounded-pill custom-btn-lg btn-block" onClick={loadMoreDoctors}>Load {validate.isNotEmpty(loadMoreDoctorsCount) && loadMoreDoctorsCount} More Doctors From {`${loadmoreDoctorType(pageType)}`}</button>}
                    </div>
                    { !isContentLoading && validate.isNotEmpty(content) && validate.isNotEmpty(content.DESC) && <div className="p-0 mt-4" dangerouslySetInnerHTML={{ __html: content.DESC }} /> }
                    { isContentLoading && <CategoryContentGhostImage /> }
                </section>}
                {!catalogLoader && validate.isEmpty(doctorsList) && <React.Fragment>
                    <NoDoctorsAvailable class="div-center p-4" message={"No doctors found"} history={props.history} />
                </React.Fragment>}
            {catalogLoader && <section>
                <div className="p-3">
                    <DoctorListGhostImage />
                </div>
                <div className="doctor-list-container p-3">
                    {[1, 2, 3, 4].map(() => {
                        return (
                            <div className="each-doctor-card">
                                <DoctorListGhostImageCard />
                            </div>
                        )
                    })}
                </div>
            </section>
                    }
        </React.Fragment>
    )
}

export default DoctorCategoryInfo;