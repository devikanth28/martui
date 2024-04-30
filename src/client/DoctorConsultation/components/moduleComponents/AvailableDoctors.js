import React, { useEffect, useState } from 'react';
import DoctorCard from "./DoctorCard"
import Slider from "react-slick";
import Validate from '../../../helpers/Validate';
import { getConsultationString } from '../../constants/DoctorConsultationConstants';
import DoctorConsultationService from '../../services/DoctorConsultationService';
import DoctorListGhostImage from './DoctorListGhostImage';
import { useDispatch, useSelector } from 'react-redux';
import { ONLINE_OR_NEARBY_DOCTOR_LIST, ONLINE_OR_NEARBY_DOCTOR_LIST_TOTAL_RECORDS, ONLINE_OR_NEARBY_DOCTOR_VISIT_TYPE, SET_DOCTOR_LIST_INFO_IN_REDUX } from '../../redux/DoctorConsultationReducer';

const AvailableDoctors = (props) => {
    const [doctorsList, setDoctorsList] = useState([]);
    const visitType = props.visitType;
    const priority = props.priority;
    const [initialLoader, setInitialLoader] = useState(true);

    const doctorConsultationService = DoctorConsultationService();

    const dispatch = useDispatch();

    const doctorInfoListFromRedux = useSelector((state) => {
        return Validate().isNotEmpty(state) && Validate().isNotEmpty(state.doctorConsultation) && Validate().isNotEmpty(state.doctorConsultation[ONLINE_OR_NEARBY_DOCTOR_LIST]) ? [...state.doctorConsultation[ONLINE_OR_NEARBY_DOCTOR_LIST]] : [];
    });

    const totalRecordsFromRedux = useSelector((state)=>{
        return Validate().isNotEmpty(state) && Validate().isNotEmpty(state.doctorConsultation) && Validate().isNotEmpty(state.doctorConsultation[ONLINE_OR_NEARBY_DOCTOR_LIST_TOTAL_RECORDS]) ? state.doctorConsultation[ONLINE_OR_NEARBY_DOCTOR_LIST_TOTAL_RECORDS] : 0;
    });

    const visitTypeFromRedux = useSelector((state)=>{
        return Validate().isNotEmpty(state) && Validate().isNotEmpty(state.doctorConsultation) && Validate().isNotEmpty(state.doctorConsultation[ONLINE_OR_NEARBY_DOCTOR_VISIT_TYPE]) ? state.doctorConsultation[ONLINE_OR_NEARBY_DOCTOR_VISIT_TYPE] : [];
    });

    useEffect(() => {
        if(Validate().isNotEmpty(doctorInfoListFromRedux) && Validate().isNotEmpty(totalRecordsFromRedux) && visitType == visitTypeFromRedux){
            setDoctorsList([...doctorInfoListFromRedux]);
            setInitialLoader(false);
            setDoctorsCount(doctorInfoListFromRedux.length);
        }else{
            getAvailableorNearbyDoctors();
        }
    }, [])

    const getAvailableorNearbyDoctors = () => {
        const obj = { visitType, priority, startIndex: 0 , consultationTypeCatalog: true};
        doctorConsultationService.getDoctorsForCatalog(obj).then( (data) => {
            if (data.statusCode === 'SUCCESS' && Validate().isNotEmpty(data.dataObject)) {
                if (Validate().isNotEmpty(data.dataObject.doctors)) {
                    setDoctorsList(data.dataObject.doctors);
                    setDoctorsCount(data.dataObject.totalRecords);
                    dispatch({type: SET_DOCTOR_LIST_INFO_IN_REDUX, data : {[ONLINE_OR_NEARBY_DOCTOR_LIST] : [...data.dataObject.doctors],[ONLINE_OR_NEARBY_DOCTOR_LIST_TOTAL_RECORDS]: data.dataObject.totalRecords, [ONLINE_OR_NEARBY_DOCTOR_VISIT_TYPE]: visitType}});
                } else {
                    setDataErrorMsg('No data found');
                    dispatch({type: SET_DOCTOR_LIST_INFO_IN_REDUX, data : {[ONLINE_OR_NEARBY_DOCTOR_LIST] : [],[ONLINE_OR_NEARBY_DOCTOR_LIST_TOTAL_RECORDS]:0, [ONLINE_OR_NEARBY_DOCTOR_VISIT_TYPE]: visitType}});
                }
            } else if (data.statusCode === 'FAILURE' && "NO_DOCTORS_AVAILABLE" === data.message) {
                dispatch({type: SET_DOCTOR_LIST_INFO_IN_REDUX, data : {[ONLINE_OR_NEARBY_DOCTOR_LIST] : [],[ONLINE_OR_NEARBY_DOCTOR_LIST_TOTAL_RECORDS]:0, [ONLINE_OR_NEARBY_DOCTOR_VISIT_TYPE]: visitType}});
                setDataErrorMsg('No data found');
            } else if(data.statusCode === 'FAILURE' || data.statusCode === 'CLIENT_ERROR') {
                setDataErrorMsg('Something went wrong');
            } else if (data.statusCode === '404') {
                setDataErrorMsg('No active internet');
            }
            setInitialLoader(false);
        }).catch((error) => {
            setDataErrorMsg('Something went wrong');
            setInitialLoader(false);
        });
    }

    const setDoctorsCount = (count) =>{
        if(props.setAvlDoctorsCount){
            if(count >=10){
                props.setAvlDoctorsCount(10);
            }
            else{
                props.setAvlDoctorsCount(count);
            }
        }
    }

    const setDataErrorMsg = (message) => {
        if (props.setMessage)
            props.setMessage(message);
    }

    const viewAllDoctors = () =>{
        const consultationType = getConsultationString(visitType);
        props.history.push(`/doctorconsultation/doctors/viewall/${consultationType}`);
    }


    return (
        <React.Fragment>
            {initialLoader && <div className={Validate().isNotEmpty(props.categoryListType) && Validate().isNotEmpty(visitType) ? "doctor-card px-0 mt-2" : "each-doctor-card px-0 mt-2"}>
                <DoctorListGhostImage />
            </div>
            }
            {!initialLoader && Validate().isNotEmpty(doctorsList) && <section className="shadow-none">
                <div>
                    <div className="d-flex align-items-center justify-content-between align-items-center mb-0">
                        <h5 className="m-0">{props.title}</h5>
                        <p className="mb-0 font-14 text-secondary"> {props.visibleDoctorCount} / {Validate().isNotEmpty(props.doctorsCount) ? props.doctorsCount : 0} {Validate().isNotEmpty(props.doctorsCount) && props.doctorsCount > 1 ? 'Doctors' : 'Doctor'}</p>
                    </div>
                    <div className="doctor-list-container mb-0 d-block pb-0 mx-n2">
                        <div className='d-flex flex-wrap'>
                        {Validate().isNotEmpty(doctorsList) && doctorsList.length > 0 && doctorsList.map((doctorInfo)=>{
                        return(
                            <React.Fragment>
                                <div className={Validate().isNotEmpty(props.categoryListType) && Validate().isNotEmpty(visitType) ? "doctor-card px-0 mt-2":"each-doctor-card px-0 mt-2"}>
                                    <DoctorCard doctorInfo={doctorInfo} visitType={visitType} history={props.history}/> 
                                </div>
                            </React.Fragment>
                            )
                        })}
                        </div>
                    </div>
                </div>
            </section>}
        </React.Fragment>
    )
}
export default AvailableDoctors