import React, { useState, useEffect } from "react";
import Validate from "../../../../helpers/Validate";
import Alert, { ALERT_TYPE_ERROR } from "../../../../components/Common/Alert";
import { getSelectedLocality } from '../../../../../redux/action/LocalityAction';
import DoctorCheckoutService from "../../../services/DoctorCheckoutService";
import DoctorClinicGhostImage from "./DoctorClinicGhostImage";
import DoctorClinic from "../../../../components/Checkout/Delivery/PickStore";

const SelectClinic = (props) => {

    const validate = Validate();
    const doctorCheckoutService = DoctorCheckoutService();
    const selectedLocality = getSelectedLocality();
    const [errorMsg, setErrorMsg] = useState({});
    const [clinicLoader, setClinicLoader] = useState(false);
    const [doctorClinics, setDoctorClinics] = useState([]);

    useEffect(() => {
        getAvailableDoctorClinics();
    }, []);

    const getAvailableDoctorClinics = () => {
        setClinicLoader(true);
        doctorCheckoutService.getAvailableClinics({doctorId : props.doctorId}).then(response => {
            if(validate.isNotEmpty(response) && validate.isNotEmpty(response.statusCode) && "SUCCESS" == response.statusCode && validate.isNotEmpty(response.dataObject)) {
                setDoctorClinics(response.dataObject);
            } else {
                setDoctorClinics([]);
            }
            setClinicLoader(false);
        }).catch(e => {
            console.log("error : "+ JSON.stringify(e));
            setClinicLoader(false);
            setErrorMsg({message :"Something went wrong, please try again", type : ALERT_TYPE_ERROR });
        });
    }

    return (
        <React.Fragment>
            {validate.isNotEmpty(errorMsg) && <Alert alertInfo={errorMsg} onDurationEnd={setErrorMsg} duration={5000}/>}
            {clinicLoader && validate.isEmpty(doctorClinics) && <DoctorClinicGhostImage/>}
            {!clinicLoader && validate.isNotEmpty(doctorClinics) &&
                <section className="">
                    <div className="nearbystore">
                        <div className="address-container d-block">
                            {doctorClinics.map(eachDoctorClinic => {
                                return (eachDoctorClinic && <DoctorClinic key={eachDoctorClinic.storeId} eachStoreInfo={eachDoctorClinic} setPickUpStoreInfo={props.setSelectedClinicId} selectedDeliveryType={{STORE_PICK_UP : props.selectedClinicId}} deliveryType={"DOCTOR_CLINIC"} locationLatLong={selectedLocality.locationLatLong}/>);
                            })}
                        </div>
                    </div>
                </section>
            }
        </React.Fragment>
    );
}
export default SelectClinic;