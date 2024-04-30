import React, { useEffect, useState } from "react";
import BreadCrumbAction from "../../../../../../redux/action/BreadCrumbAction";
import Alert, { ALERT_TYPE_ERROR, ALERT_TYPE_SUCCESS } from "../../../../../components/Common/Alert";
import Validate from "../../../../../helpers/Validate";
import MartAdminService from "../../../../services/MartAdminService";
const ConfigurePrescriptionAndConsultation = (props) => {
 
    const [isEPrescriptionEnabled, setIsEPrescriptionEnabled] = useState('');
    const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
    const [loading, setLoading] = useState(false)
    const breadCrumbAction = BreadCrumbAction();
    const martAdminService = MartAdminService()
    const validate = Validate()
    const data = ["Yes", "No"]


    useEffect(() => {
        breadCrumbAction.pushBreadCrumbs({ name: 'Configure E Prescription', url: props.location.pathname });
        getEPrescriptionConfig()
    }, []);


    const getEPrescriptionConfig = () =>{
        martAdminService.getIsEPrescriptionConfig().then(data => {
            if (validate.isNotEmpty(data) && validate.isNotEmpty(data.message)) {
                if ("SUCCESS" === data.statusCode && validate.isNotEmpty(data.dataObject))
                    setIsEPrescriptionEnabled(data.dataObject);
                if ("FAILURE" == data.statusCode && "REDIRECT_TO_HOME" == data.message)
                    props.history.push("/")
            }
        }).catch(e => {
            console.log(e);
        })

    }

    const saveConfig = () => {
        setLoading(true);
        martAdminService.saveEPrescriptionConfig({ isEnable: isEPrescriptionEnabled }).then(response => {
            if (response.statusCode == 'SUCCESS') {
                setAlertInfo({ message: response.message, type: ALERT_TYPE_SUCCESS });
            } else if(response.message){
                setAlertInfo({ message: response.message, type: ALERT_TYPE_ERROR });
            } else {
                setAlertInfo({ message: "Something went wrong", type: ALERT_TYPE_ERROR });
            }
            setLoading(false);
        }).catch(error => {
            console.log(error);
            setAlertInfo({ message: "Something went wrong", type: ALERT_TYPE_ERROR });
            setLoading(false);
        })
    }

    const clearError = () => {
        setAlertInfo({});
    }


    return (
        <React.Fragment>
            {alertInfo && <Alert alertInfo={alertInfo} onDurationEnd={clearError} duration={5000} />}
            <section>
                <h1 className='h5 mb-0 border-bottom p-3'>Configure E Prescription</h1>
                <div className='d-flex p-3 align-items-center'>
                
                    <form style={{ gap: '1rem' }}>
                        <label className="font-weight-bold">Configure E Prescription</label>
                        <div className='d-flex'>
                        {data.map((val) => (
                            <div className="input-group w-auto mr-3" key={val}>
                                <div className="custom-control custom-radio">
                                    <input
                                        type="radio"
                                        className="custom-control-input"
                                        checked={val == (isEPrescriptionEnabled =='Y' ? "Yes" : "No")}
                                        id={val}
                                        value={val}
                                        name="vertical"
                                        onChange={() => setIsEPrescriptionEnabled(val =='Yes' ? 'Y' : 'N')}
                                    />
                                    <label className="custom-control-label" htmlFor={val}>
                                        {val}
                                    </label>
                                </div>
                            </div>
                        ))}
                        </div>
                    </form>
                    <button type="submit" className="btn btn-brand-gradient ml-3 px-5 rounded-pill height-40 text-center" onClick={saveConfig}>
                    {loading ? <span class="spinner-border spinner-border-sm align-text-top mx-5" role="status" aria-hidden="true"></span> : <>Submit</>}
                    </button>
                </div>
            </section>
        </React.Fragment>
    );
};

export default ConfigurePrescriptionAndConsultation;