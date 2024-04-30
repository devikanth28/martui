import React, { useEffect, useState } from 'react';
import BreadCrumbAction from '../../../../../../redux/action/BreadCrumbAction';
import Alert, { ALERT_TYPE_ERROR, ALERT_TYPE_SUCCESS } from '../../../../../components/Common/Alert';
import Validate from '../../../../../helpers/Validate';
import MartAdminService from '../../../../services/MartAdminService';

const EnablePrescriptionUpload = (props) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [isPrescriptionUploadEnabled, setIsPrescriptionUploadEnabled] = useState('');
    const [alertData, setAlertData] = useState({});
    const validate = Validate();
    const adminService = MartAdminService();
    const [loading, setLoading] = useState(false)

    const data = ["Yes", "No"]

    const toggle = () => {
        setDropdownOpen(!dropdownOpen);
    }
    const breadCrumbAction = BreadCrumbAction();

    useEffect(() => {
        breadCrumbAction.pushBreadCrumbs({ name: 'Enable Prescription Upload', url: props.location.pathname });
        getPrescriptionEnabledInfo();
    }, []);

    const getPrescriptionEnabledInfo = () => {
        adminService.getPrescriptionEnabledInfo().then(data => {
            if (validate.isNotEmpty(data) && validate.isNotEmpty(data.message)) {
                if ("SUCCESS" == data.statusCode && validate.isNotEmpty(data.dataObject))
                    setIsPrescriptionUploadEnabled(data.dataObject);
                if ("FAILURE" == data.statusCode && "REDIRECT_TO_HOME" == data.message)
                    props.history.push("/")
            }
        }).catch(e => {
            console.log(e);
        })
    }

    const savePrescriptionEnabled = () => {
        setLoading(true);
        adminService.savePrescriptionEnabled({ isPrescriptionUploadEnabled }).then(data => {
            if (validate.isNotEmpty(data) && validate.isNotEmpty(data.message)) {
                if ("SUCCESS" == data.statusCode) {
                    setAlertData({ message: "Presciption Upload configuration saved successfully.", type: ALERT_TYPE_SUCCESS });
                }
                if ("FAILURE" == data.statusCode) {
                    setAlertData({ message: data.message, type: ALERT_TYPE_ERROR });
                }
            }
            setLoading(false);
        }).catch(error => {
            console.log(error);
            setLoading(false)
        });
    }

    const clearError = () => {
        setAlertData({});
    }


    return (
        <React.Fragment>
            {alertData && <Alert alertInfo={alertData} onDurationEnd={clearError} duration={5000} />}
            <section>
                <h1 className='h5 mb-0 border-bottom p-3'>Enable Prescription Upload</h1>
                <div className='d-flex p-3 align-items-center'>
                
                    <form style={{ gap: '1rem' }}>
                        <label className="font-12">Enable Prescription Upload</label>
                        <div className='d-flex'>
                        {data.map((val) => (
                            <div className="input-group w-auto mr-3" key={val}>
                                <div className="custom-control custom-radio">
                                    <input
                                        type="radio"
                                        className="custom-control-input"
                                        checked={val == (isPrescriptionUploadEnabled =='Y' ? "Yes" : "No")}
                                        id={val}
                                        value={val}
                                        name="vertical"
                                        onChange={() => setIsPrescriptionUploadEnabled(val =='Yes' ? 'Y' : 'N')}
                                    />
                                    <label className="custom-control-label" htmlFor={val}>
                                        {val}
                                    </label>
                                </div>
                            </div>
                        ))}
                        </div>
                    </form>
                    <div className='ml-3'>
                        <button type="submit" className="btn btn-brand-gradient ml-3 px-5 rounded-pill height-40 text-center" onClick={savePrescriptionEnabled}>
                            {loading ? <span class="spinner-border spinner-border-sm align-text-top mx-5" role="status" aria-hidden="true"></span> : <>Submit</>}
                        </button>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}
export default EnablePrescriptionUpload;