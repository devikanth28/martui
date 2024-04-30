import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { CHECKOUT_TYPE_VISIT_ONLINE, CHECKOUT_TYPE_VISIT_WALK_IN, CHECKOUT_TYPE_CLINIC_SEARCH, CHECKOUT_TYPE_VISIT_UNDEFINED, VISIT_TYPE_ONLINE, VISIT_TYPE_WALK_IN } from '../../constants/DoctorConsultationConstants';
import { ADD_CHECKOUT_TYPE_IN_REDUX, ADD_CONSULTATION_TYPE_IN_REDUX, ADD_SELECTED_CLINIC_ID_IN_REDUX, ADD_SELECTED_DOCTOR_ID_IN_REDUX, REMOVE_DOCTOR_CONSULTATION_CHECKOUT_PARAMS } from '../../redux/DoctorConsultationReducer';
import Validate from '../../../helpers/Validate';
import SignInPopUp from "../../../components/Common/signInModelBox/SignInPopUp";
import Cookies from "js-cookie";
import LocalDB from "../../../DataBase/LocalDB";
import {sendDoctorsBookAppointment} from '../../../Analytics/Analytics'
import DoctorCheckoutService from "../../services/DoctorCheckoutService";
import Alert from '../../../components/Common/Alert';

const BookAppointment = (props) => {

    const dispatch = useDispatch();
    const validate = Validate();
    const [isPopUpOpen, setPopUpOpen] = useState(false);
    const [alertData, setAlertData] = useState({})
    const [loader,setLoader] = useState(false);
    const bookAppointment = () => {
        setLoader(true);
        DoctorCheckoutService().clearBookingConsultation().then(data => {
             if(validate.isNotEmpty(data) && "SUCCESS" == data.statusCode){
                sendDoctorsBookAppointment(props.doctorName,props.consultationType);
                dispatch({type : REMOVE_DOCTOR_CONSULTATION_CHECKOUT_PARAMS});
                dispatch({type : ADD_SELECTED_DOCTOR_ID_IN_REDUX, data: props.doctorId});
                dispatch({type: ADD_CONSULTATION_TYPE_IN_REDUX, data: validate.isNotEmpty(props.consultationType) ? props.consultationType : VISIT_TYPE_ONLINE});
                if(validate.isNotEmpty(props.consultationType) && props.consultationType === VISIT_TYPE_WALK_IN) {
                    if(validate.isNotEmpty(props.clinicId)){
                        dispatch({type: ADD_CHECKOUT_TYPE_IN_REDUX, data: CHECKOUT_TYPE_CLINIC_SEARCH});
                        dispatch({type: ADD_SELECTED_CLINIC_ID_IN_REDUX, data: props.clinicId});
                    } else {
                        dispatch({type: ADD_CHECKOUT_TYPE_IN_REDUX, data: CHECKOUT_TYPE_VISIT_WALK_IN});
                    }
                } else if(validate.isNotEmpty(props.consultationType) && props.consultationType === VISIT_TYPE_ONLINE) {
                    dispatch({type: ADD_CHECKOUT_TYPE_IN_REDUX, data: CHECKOUT_TYPE_VISIT_ONLINE});
                } else {
                    dispatch({type: ADD_CHECKOUT_TYPE_IN_REDUX, data: CHECKOUT_TYPE_VISIT_UNDEFINED});
                }
                if (validate.isNotEmpty(LocalDB.getValue('customerId')) && validate.isNotEmpty(LocalDB.getValue("SESSIONID"))) {
                    props.history.push('/doctorconsultation/schedule-consultation');
                } else {
                    LocalDB.setValue("fromPage", '/doctorconsultation/schedule-consultation');
                    LocalDB.setValue("toPage", -1);
                    setPopUpOpen(!isPopUpOpen);
                }
            }
            else if(validate.isNotEmpty(data) && data.statusCode=='FAILURE' && validate.isNotEmpty(data.message)){
                setAlertData({message : data.message , type : 'Warning'});
            } 
            setLoader(false);
        }).catch(err=>{
            setLoader(false);
            console.log('err', err);
        });
        
        //props.history.push("/doctorconsultation/schedule-consultation");
    }

    const closeAlertMessage = () => {
        setAlertData({ message: "", type: "" });
    }

    return (
        <React.Fragment>
            {alertData && alertData.message && <Alert alertInfo={alertData} onDurationEnd={closeAlertMessage} duration={5000} />}
            {loader ?
            <button className={props.className}>
                <div className="px-5">
                <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                <span className="sr-only"></span>
                </div>
            </button> : 
            <button type="button" role="button" className={props.className} onClick={() => bookAppointment()}>Book Appointment</button> }
            { isPopUpOpen && <SignInPopUp {...props} setPopUpOpen={setPopUpOpen} displayLogo={true}/> }
        </React.Fragment>
        
    )
}
export default BookAppointment;