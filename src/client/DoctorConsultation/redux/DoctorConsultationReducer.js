export const LAST_DOCTOR_ORDER_ID = "LAST_DOCTOR_ORDER_ID";
export const ADD_DOCTOR_CONSULTATION_INFO = "ADD_DOCTOR_CONSULTATION_INFO";
export const ADD_SELECTED_CLINIC_ID_IN_REDUX = "ADD_SELECTED_CLINIC_ID_IN_REDUX";
export const ADD_CHECKOUT_TYPE_IN_REDUX = "ADD_CHECKOUT_TYPE_IN_REDUX";
export const ADD_CONSULTATION_TYPE_IN_REDUX = "ADD_CONSULTATION_TYPE_IN_REDUX";
export const ADD_SELECTED_DOCTOR_ID_IN_REDUX = "ADD_SELECTED_DOCTOR_ID_IN_REDUX";
export const REMOVE_DOCTOR_CONSULTATION_CHECKOUT_PARAMS = "REMOVE_DOCTOR_CONSULTATION_CHECKOUT_PARAMS";
export const REMOVE_SELECTED_CLINIC_ID_FROM_REDUX = "REMOVE_SELECTED_CLINIC_ID_FROM_REDUX";
export const DOCTORS_CATALOG_LIST = "doctorsCatalogList";
export const SET_DOCTOR_LIST_INFO_IN_REDUX = "SET_DOCTOR_LIST_INFO_IN_REDUX";
export const DOCTOR_LIST = "doctorList";
export const OTHER_DOCTOR_LIST = "otherDoctorList";
export const OTHER_DOCTOR_LIST_FILTER ="otherDoctorsListFilterData";
export const OTHER_DOCTOR_LIST_VISIT_TYPE = "otherDoctorListVisitType";
export const IS_RECORDS_COMPLETED = "isRecordsCompleted";
export const ONLINE_OR_NEARBY_DOCTOR_LIST = "onlineOrNearbyDoctorList";
export const ONLINE_OR_NEARBY_DOCTOR_VISIT_TYPE = "onlineOrNearbyDoctorVisitType";
export const ONLINE_OR_NEARBY_DOCTOR_LIST_TOTAL_RECORDS="onlineOrNearbyDoctorListTotalRecords";
export const ADD_DOCTORS_CATALOG_REDUX_DATA="ADD_DOCTORS_CATALOG_REDUX_DATA";
export const REMOVE_DOCTORS_CATALOG_REDUX_DATA ="REMOVE_DOCTORS_CATALOG_REDUX_DATA";
export const REMOVE_ALL_DOCTORS_CATALAOG_REDUX_DATA="REMOVE_ALL_DOCTORS_CATALAOG_REDUX_DATA";
export const SORT_AND_FILTER_STR ="sortAndFilterStr";


const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    let obj = {};
    switch (action.type) {
        case LAST_DOCTOR_ORDER_ID:
            return {
                ...state,
                lastDoctorOrderId: action.data
            };
        case ADD_DOCTOR_CONSULTATION_INFO: 
            return {
                ...state,
                doctorConsultation : action.data
            };
        case ADD_SELECTED_CLINIC_ID_IN_REDUX: 
            return {
                ...state,
                selectedClinicId : action.data
            };
        case ADD_CHECKOUT_TYPE_IN_REDUX:
            return {
                ...state,
                checkoutType: action.data
            };
        case ADD_CONSULTATION_TYPE_IN_REDUX: 
            return {
                ...state,
                consultationType: action.data
            };
        case ADD_SELECTED_DOCTOR_ID_IN_REDUX: 
            return {
                ...state,
                selectedDoctorId: action.data
            };
        case REMOVE_DOCTOR_CONSULTATION_CHECKOUT_PARAMS: 
            obj = {...state};
            delete obj.consultationType;
            delete obj.checkoutType;
            delete obj.selectedDoctorId;
            delete obj.selectedPatientId;
            delete obj.selectedClinicId;
            delete obj.selectedSlotId;
            delete obj.doctorConsultation;
            delete obj.lastDoctorOrderId;
            return {...obj};
        case REMOVE_SELECTED_CLINIC_ID_FROM_REDUX: 
            obj = {...state};
            delete obj.selectedClinicId;
            return {...obj};
        case ADD_DOCTORS_CATALOG_REDUX_DATA: return{
            ...state,
            [DOCTORS_CATALOG_LIST]:state.doctorsCatalogList ?{...state.doctorsCatalogList,...action.data}:{...action.data}
        }
        case SET_DOCTOR_LIST_INFO_IN_REDUX : return {
            ...state,
            ...action.data
        }
        case SET_DOCTOR_LIST_INFO_IN_REDUX : return {
            ...state,
            ...action.data
        }
        case REMOVE_ALL_DOCTORS_CATALAOG_REDUX_DATA: 
            obj ={...state}
            delete obj[DOCTORS_CATALOG_LIST]
            return {...obj}
        case REMOVE_DOCTORS_CATALOG_REDUX_DATA:
            obj={...state};
            let reduxData = obj[DOCTORS_CATALOG_LIST];
            delete reduxData[action.data];
            return {...obj,[DOCTORS_CATALOG_LIST]:reduxData}
        default:
            return state;
    }
}