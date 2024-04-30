import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Validate from '../../../helpers/Validate';
import { DOCTOR_LIST, IS_RECORDS_COMPLETED, OTHER_DOCTOR_LIST, OTHER_DOCTOR_LIST_FILTER, OTHER_DOCTOR_LIST_VISIT_TYPE, SET_DOCTOR_LIST_INFO_IN_REDUX, SORT_AND_FILTER_STR } from '../../redux/DoctorConsultationReducer';
import DoctorConsultationService from '../../services/DoctorConsultationService';
import DoctorCard from './DoctorCard';
import DoctorListGhostImage from './DoctorListGhostImage';
import DoctorListGhostImageCard from './DoctorListGhostImageCard';

export default (props) => {

    const visitType = props.visitType;
    const priority = props.priority;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [doctorsList, setDoctorsList] = useState([]);
    const [isRecordsCompleted, setIsRecordsCompleted] = useState(false);
    const [loadMoreDoctorsCount,setLoadMoreDoctorsCount] = useState(0);
    const [initialLoader, setInitialLoader] = useState(true);
    const [dataLoader, setDataLoader] = useState(true);
    const dispatch = useDispatch();
    const doctorConsultationService = DoctorConsultationService();

    let doctorCardsPerPage = 10;

    let otherDoctorsObjFromRedux = useSelector(state => {
        return Validate().isNotEmpty(state) && Validate().isNotEmpty(state.doctorConsultation) && Validate().isNotEmpty(state.doctorConsultation[props.sortList?OTHER_DOCTOR_LIST_FILTER:OTHER_DOCTOR_LIST]) ? {...state.doctorConsultation[props.sortList?OTHER_DOCTOR_LIST_FILTER:OTHER_DOCTOR_LIST]} : {};
    });

    const otherDoctorsVisitTypeFromRedux = useSelector((state)=>{
        return Validate().isNotEmpty(state) && Validate().isNotEmpty(state.doctorConsultation) && Validate().isNotEmpty(state.doctorConsultation[OTHER_DOCTOR_LIST_VISIT_TYPE]) ? state.doctorConsultation[OTHER_DOCTOR_LIST_VISIT_TYPE] : [];
    });

    useEffect(() => {
        let sortAndFilterStr = props.history.location.search;
        if(Validate().isNotEmpty(otherDoctorsObjFromRedux) && ((!props.sortList && visitType == otherDoctorsVisitTypeFromRedux) || (props.sortList && sortAndFilterStr === otherDoctorsObjFromRedux[SORT_AND_FILTER_STR]))){
            let isRecordsCompletedFromRedux = Validate().isEmpty(otherDoctorsObjFromRedux[IS_RECORDS_COMPLETED]) || otherDoctorsObjFromRedux[IS_RECORDS_COMPLETED];
            let doctorList = Validate().isNotEmpty(otherDoctorsObjFromRedux[DOCTOR_LIST]) ? [...otherDoctorsObjFromRedux[DOCTOR_LIST]] : [];
            setDoctorsList(doctorList);
            setCurrentIndex(doctorList.length);
            setIsRecordsCompleted(isRecordsCompletedFromRedux)
            setInitialLoader(false);
            setDataLoader(false)
            if(!props.sortList){
                props.setVisibleDoctorCount(doctorList.length)
                setDoctorsCount(doctorList.length)
            }
        }else{
            getOtherDoctors();
        }
    },[])

    const getOtherDoctors = () => {
        const obj = { visitType, priority, startIndex: currentIndex , paramValue: props.paramValue, consultationTypeCatalog: true};
        if(props.history && props.history.location && Validate().isNotEmpty(props.history.location.search)) {
            let sortAndFilterStr = props.history.location.search;
            sortAndFilterStr = sortAndFilterStr.substring(1, sortAndFilterStr.length);
            try {
                sortAndFilterStr = atob(sortAndFilterStr);
            } catch (err) {
                console.log("Invalid URL parameter");
            }
            if(Validate().isNotEmpty(sortAndFilterStr)){
                obj["priority"] = "";
                obj["consultationTypeCatalog"] = false;
                obj["paramValue"] = `${obj["paramValue"]}?${sortAndFilterStr}`;
                obj["sortAndFilter"] = true;
            }
        }
        doctorConsultationService.getDoctorsForCatalog(obj).then( (data) => {
            let doctors = [];
            let doctorRecords = [];
            if (data.statusCode === 'SUCCESS' && Validate().isNotEmpty(data.dataObject)) {
                doctors = data.dataObject.doctors || [];
                doctorRecords = [...doctorsList, ...doctors];
                let recordsCompleted = false;
                setDoctorsList(doctorRecords);
                setCurrentIndex(doctorRecords.length);
                if (doctorRecords.length >= data.dataObject.totalRecords) {
                    recordsCompleted = true;
                }
                setIsRecordsCompleted(recordsCompleted);
                setDoctorsCount(data.dataObject.totalRecords);
                dispatch({type: SET_DOCTOR_LIST_INFO_IN_REDUX , data : {[props.sortList?OTHER_DOCTOR_LIST_FILTER:OTHER_DOCTOR_LIST] : {[DOCTOR_LIST] : [...doctorRecords],[IS_RECORDS_COMPLETED] : recordsCompleted}, [OTHER_DOCTOR_LIST_VISIT_TYPE]: visitType,[SORT_AND_FILTER_STR]: props.sortList?props.history.location.search:''}});
                let totalLoadDoctorsCount = parseInt(data.dataObject.totalRecords-doctorRecords.length);
                setLoadMoreDoctorsCount(totalLoadDoctorsCount>doctorCardsPerPage?doctorCardsPerPage:totalLoadDoctorsCount);
                props.setVisibleDoctorCount(doctors.length)
                if (totalLoadDoctorsCount <=0  || doctors.length < doctorCardsPerPage) {
                    setIsRecordsCompleted(true);
                    dispatch({type: SET_DOCTOR_LIST_INFO_IN_REDUX , data : {[props.sortList?OTHER_DOCTOR_LIST_FILTER:OTHER_DOCTOR_LIST] : {[DOCTOR_LIST] : [...doctorRecords], [IS_RECORDS_COMPLETED] : true},[OTHER_DOCTOR_LIST_VISIT_TYPE]: visitType,[SORT_AND_FILTER_STR]: props.sortList?props.history.location.search:''}});
                }
                if (Validate().isEmpty(doctorRecords) && currentIndex === 0) {
                    setDataErrorMsg('No data found');
                    dispatch({type: SET_DOCTOR_LIST_INFO_IN_REDUX , data : {[props.sortList?OTHER_DOCTOR_LIST_FILTER:OTHER_DOCTOR_LIST] : {}, [OTHER_DOCTOR_LIST_VISIT_TYPE]: visitType}});
                }
            } else if(data.statusCode === 'FAILURE' && "NO_DOCTORS_AVAILABLE" === data.message && currentIndex === 0) {
                if(currentIndex === 0){
                    setDataErrorMsg('No data found');
                    dispatch({type: SET_DOCTOR_LIST_INFO_IN_REDUX , data : {[props.sortList?OTHER_DOCTOR_LIST_FILTER:OTHER_DOCTOR_LIST] : {}, [OTHER_DOCTOR_LIST_VISIT_TYPE]: visitType}});
                }else{
                    setIsRecordsCompleted(true);
                    dispatch({type: SET_DOCTOR_LIST_INFO_IN_REDUX , data : {[props.sortList?OTHER_DOCTOR_LIST_FILTER:OTHER_DOCTOR_LIST] : {[DOCTOR_LIST] : [...doctorRecords], [IS_RECORDS_COMPLETED] : true,[SORT_AND_FILTER_STR]: props.sortList?props.history.location.search:''},[OTHER_DOCTOR_LIST_VISIT_TYPE]: visitType}});
                }

            } else if( currentIndex === 0 && (data.statusCode === 'FAILURE' || data.statusCode === 'CLIENT_ERROR')) {
                setDataErrorMsg('Something went wrong');
            } else if (data.statusCode === '404') {
                setDataErrorMsg('No active internet');
            }
            setInitialLoader(false);
            setDataLoader(false);
        }).catch(error => {
            setDataErrorMsg('Something went wrong'); 
            setInitialLoader(false);
            setDataLoader(false);
        });
    }

    const setDataErrorMsg = (message) => {
        if (props.setMessage)
            props.setMessage(message);
    }

    const setDoctorsCount = (count) =>{
        if(props.setOtherDoctorsCount){
            props.setOtherDoctorsCount(count);
        }
    }

    const loadMoreDoctors= ()=>{
        if(Validate().isNotEmpty(doctorsList) && !isRecordsCompleted && !dataLoader){
            setDataLoader(true);
            getOtherDoctors();
        }
    }

    return (
        <React.Fragment>
            {initialLoader && <React.Fragment>
                <DoctorListGhostImage />
                <div className='doctor-list-container'>
                    {[1, 2, 3, 4].map(() => {
                        return (
                            <div className={Validate().isNotEmpty(visitType) ? "doctor-card px-0 mt-2" : "each-doctor-card px-0 mt-2"}>
                                <DoctorListGhostImageCard />
                            </div>
                        )
                    })}
                </div>
            </React.Fragment>}
             {!initialLoader && Validate().isNotEmpty(doctorsList) && <section className="shadow-none">
                    <div className="pt-3">
                    <div className="d-flex align-items-center justify-content-between align-items-center mb-0">
                    <h5 className="mt-0 mb-3"> {props.title}</h5>
                   {props.sortList && <p className="mb-0 font-14 text-secondary"> {props.visibleDoctorCount} / {Validate().isNotEmpty(props.doctorsCount) ? props.doctorsCount : 0} {Validate().isNotEmpty(props.doctorsCount) && props.doctorsCount > 1 ? 'Doctors' : 'Doctor'}</p>}
                    </div>
                        <div className="doctor-list-container">
                            {Validate().isNotEmpty(doctorsList) && doctorsList.length > 0 && doctorsList.map((doctorInfo)=>{
                                return(
                                    <React.Fragment>
                                        <div className="doctor-card">
                                            <DoctorCard doctorInfo={doctorInfo} visitType={visitType} isFromViewAll={props.isFromViewAll} history={props.history}/>
                                        </div>
                                    </React.Fragment>
                                )
                            })}
                            {dataLoader && [1,2,3,4].map(()=>{
                                return(
                                    <div className='doctor-card'>
                                      {  <DoctorListGhostImageCard/>}
                                    </div>
                                )
                            })}
                        </div>
                        {!dataLoader && !isRecordsCompleted && loadMoreDoctorsCount>0 && <button className="btn brand-secondary px-5 mt-5 rounded-pill btn-block custom-btn-lg" onClick={loadMoreDoctors}>Load {loadMoreDoctorsCount} More Doctors From {props.title}</button>}
                    </div>
                </section>}
        </React.Fragment>
    );
}
