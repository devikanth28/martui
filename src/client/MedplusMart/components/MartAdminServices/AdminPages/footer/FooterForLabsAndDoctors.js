import React, { useEffect, useState } from 'react'
import BreadCrumbAction from '../../../../../../redux/action/BreadCrumbAction';
import LabCatalogService from '../../../../../components/MedplusLabs/Services/LabCatalogService';
import Alert, { ALERT_TYPE_ERROR, ALERT_TYPE_SUCCESS, ALERT_TYPE_WARNING } from '../../../../../components/Common/Alert';
import DoctorConsultationService from '../../../../../DoctorConsultation/services/DoctorConsultationService';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import MartAdminService from '../../../../services/MartAdminService';
const FooterForLabsAndDoctors = (props) => {
  const breadCrumbAction = BreadCrumbAction();
  const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
  const [pushLoader, setPushLoader] = useState(false);
  const [generateLoader, setGenerateLoader] = useState(false);
  useEffect(() => {
    breadCrumbAction.pushBreadCrumbs({ name: ' Configure Footer', url: props.location.pathname });
  }, []);

  const closeAlertMessage = () => {
    setAlertInfo({ message: "", type: "" });
  }

  const pushLabDataIntoRedis = (e) => {
    setPushLoader(true);
    e.preventDefault();
    LabCatalogService().pushLabDatIntoRedis({}).then(response => {
      if (response.statusCode == 'SUCCESS') {
        setAlertInfo({ message: 'Success while pushing lab data into Redis.', type: ALERT_TYPE_SUCCESS });
      } else if (response.message == "UNAUTHORIZED_USER") {
        setAlertInfo({ message: 'User is Unauthorised', type: ALERT_TYPE_WARNING });
      } else {
        setAlertInfo({ message: 'Failure while pushing lab data into Redis', type: ALERT_TYPE_ERROR });
      }
      setPushLoader(false);
    }).catch(error => {
      console.log(error);
      setPushLoader(false);
    });
  }

  const pushDoctersDataIntoRedis = (e) => {
    e.preventDefault();
    setPushLoader(true);
    DoctorConsultationService().pushDoctersDataIntoRedis({}).then(response => {
      if (response.statusCode == 'SUCCESS') {
        setAlertInfo({ message: 'Success while pushing lab data into Redis.', type: ALERT_TYPE_SUCCESS });
      } else if (response.message == "UNAUTHORIZED_USER") {
        setAlertInfo({ message: 'User is Unauthorised', type: ALERT_TYPE_WARNING });
      } else {
        setAlertInfo({ message: 'Failure while pushing lab data into Redis', type: ALERT_TYPE_ERROR });
      }
      setPushLoader(false);
    }).catch(error => {
      console.log(error);
      setPushLoader(false);
    });
  }

  const generateLabCategories = (e) => {
    e.preventDefault();
    setGenerateLoader(true);
    MartAdminService().generateLabCategory({}).then(response => {
      if (response.statusCode == 'SUCCESS') {
        setAlertInfo({ message: response.message, type: ALERT_TYPE_SUCCESS });
      } else if (response.statusCode == 'WARNING') {
        setAlertInfo({ message: response.message, type: ALERT_TYPE_WARNING });
      } else {
        setAlertInfo({ message: response.message, type: ALERT_TYPE_ERROR });
      }
      setGenerateLoader(false);
    }).catch(error => {
      console.log(error);
      setGenerateLoader(false);
    });
  }

  const generateDoctorsCategories = (e) => {
    e.preventDefault();
    setGenerateLoader(true);
    MartAdminService().generateDoctorsCategory({}).then(response => {
      if (response.statusCode == 'SUCCESS') {
        setAlertInfo({ message: response.message, type: ALERT_TYPE_SUCCESS });
      } else if (response.statusCode == 'WARNING') {
        setAlertInfo({ message: response.message, type: ALERT_TYPE_WARNING });
      } else {
        setAlertInfo({ message: response.message, type: ALERT_TYPE_ERROR });
      }
      setGenerateLoader(false);
    }).catch(error => {
      console.log(error);
      setGenerateLoader(false);
    });
  }


  return (
    <section>
      <h1 className='h5 p-3 border-bottom'>Configure Footer Data for Labs And Doctors</h1>
      <div>
        <Tabs>
          <div className="header p-0 mb-0">
            <TabList className="nav nav-pills" style={{ "gap": "3rem" }}>
              <Tab className="nav-item border-0">
                <button role="button" className="nav-link py-3 btn border-0">Lab</button>
              </Tab>
              <Tab className="nav-item border-0">
                <button role="button" className="nav-link py-3 btn border-0">Doctors</button>
              </Tab>
            </TabList>
          </div>
          <TabPanel>
            <div className='p-3'>
              <div className='d-flex'>
                <p className='font-weight-bold mb-0 col-3'>Configure footer Data for Labs</p>
                <div class="btn-group btn-group-sm" role="group">
                  <button type="submit" class="btn brand-secondary py-2 px-5  rounded-pill" onClick={(event) => { pushLabDataIntoRedis(event) }}>
                  {pushLoader ? <span class="spinner-border spinner-border-sm align-text-top mx-5" role="status" aria-hidden="true"></span> : <>Push Lab Data Into Redis</>}</button>
                  <button type="submit" class="btn btn-brand-gradient ml-3 py-2 px-5 rounded-pill" onClick={(event) => { generateLabCategories(event) }}>
                  {generateLoader ? <span class="spinner-border spinner-border-sm align-text-top mx-5" role="status" aria-hidden="true"></span> : <>Generate Lab Categories</>}</button>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className='p-3'>
              <div className='d-flex'>
              <p className='font-weight-bold mb-0 col-3'>Configure footer Data for Doctors</p>
              <div class="btn-group btn-group-sm" role="group">
                <button type="submit" class="btn brand-secondary py-2 px-5 rounded-pill" onClick={(event) => { pushDoctersDataIntoRedis(event) }}>
                {pushLoader ? <span class="spinner-border spinner-border-sm align-text-top mx-5" role="status" aria-hidden="true"></span> : <>Push Doctors Data Into Redis</>}</button>
                <button type="submit" class="btn btn-brand-gradient py-2 px-5 ml-3 rounded-pill" onClick={(event) => { generateDoctorsCategories(event) }}>
                {generateLoader ? <span class="spinner-border spinner-border-sm align-text-top mx-5" role="status" aria-hidden="true"></span> : <>Generate Doctors Categories</>}</button>
              </div>
              </div>
            </div>
          </TabPanel>
        </Tabs>
      </div>
      <Alert alertInfo={alertInfo} onDurationEnd={closeAlertMessage} duration='5000' />
    </section>
  )
}

export default FooterForLabsAndDoctors