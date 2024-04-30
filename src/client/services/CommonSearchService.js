import serverRequest from '../axios';
import LAB_CONFIG from '../components/MedplusLabs/constants/LabCatalogServiceConfig';
import DOCTOR_CONFIG from "../DoctorConsultation/constants/DoctorConsultationConfig";
export default () => {

    const getCommonSearchResults = obj => {
        if ("lab" === obj['requestFrom']) {
            return serverRequest(LAB_CONFIG.LAB_CATALOG.LAB_TEST.GET_LAB_TEST_SUGGESTIONS.HEADER.method, obj, LAB_CONFIG.LAB_CATALOG.LAB_TEST.GET_LAB_TEST_SUGGESTIONS.PATH);
        } else {
            return serverRequest(DOCTOR_CONFIG.API.DOCTOR_INFO.GET_SEARCH_RESULTS.HEADER.method, obj, DOCTOR_CONFIG.API.DOCTOR_INFO.GET_SEARCH_RESULTS.PATH);
        }
    }

    return Object.freeze({
        getCommonSearchResults
    })

}
