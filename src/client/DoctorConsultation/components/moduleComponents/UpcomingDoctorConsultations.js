import React, { useEffect, useState } from 'react';
import DoctorConsultationService from '../../services/DoctorConsultationService';
import Validate from '../../../helpers/Validate';
import Consultation from './Consultation';
import UpcomingConsultationGhostImage from './UpcomingConsultationGhostImage';
import UpcomingConsultationSlider from './UpcomingConsultationSlider';
import { checkIfTimerRequired } from '../../constants/DoctorConsultationConstants';
import Alert from '../../../components/Common/Alert';

const UpcomingDoctorConsultations = (props) => {

  const [loader, setLoader] = useState(true);
  const [consultations, setConsultations] = useState([]);
  const [intervalBufferTime, setIntervalBufferTime] = useState(0);
  const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
  const doctorConsultationService = DoctorConsultationService();
  const validate = Validate();
  const isSlider = props.isSlider;

  useEffect(() => {
    getUpComingConsultations(true);
  }, []);

  useEffect(() => {
    let interval;
    if (intervalBufferTime) {
      interval = setInterval(() => {
        getUpComingConsultations(false);
      }, intervalBufferTime);
    }
    return () => {
      clearInterval(interval)
    }
  }, [intervalBufferTime]);

  const getUpComingConsultations = (isInitialRequest) => {
    if (isInitialRequest) {
      setLoader(true);
    }
    doctorConsultationService.getUpComingConsultations().then((response) => {
      if (validate.isNotEmpty(response) && response.statusCode == "SUCCESS" && validate.isNotEmpty(response.dataObject.doctorConsultations)) {
        if (validate.isNotEmpty(props.setReloadOtherConsultations) && !isInitialRequest && consultations.length !== response.dataObject.doctorConsultations.length) {
          props.setReloadOtherConsultations(true);
        }
        setConsultations(response.dataObject.doctorConsultations);
        if (checkIfTimerRequired(response.dataObject.doctorConsultations) && validate.isNotEmpty(response.dataObject.intervalBufferTime) && intervalBufferTime !== response.dataObject.intervalBufferTime) {
          setIntervalBufferTime(response.dataObject.intervalBufferTime);
        }
        if (validate.isNotEmpty(props.setNoUpcomingConsultations)) {
          props.setNoUpcomingConsultations(false);
        } 
      } else {
        setEmptyConsultations();
      }
      setLoader(false);
    }).catch(function (error) {
      console.log(error);
      setLoader(false);
      setEmptyConsultations();
    });

  }

  const setEmptyConsultations = () => {
    setConsultations([]);
    if (props.fromMyBookings) {
      props.setNoUpcomingConsultations(true);
    }
    if (validate.isNotEmpty(props.setAvailable)) {
      props.setAvailable(false);
    }
    if (validate.isNotEmpty(props.setReloadOtherConsultations)) {
      props.setReloadOtherConsultations(true);
    }
  }

  if (loader) {
    return <UpcomingConsultationGhostImage isSlider={isSlider} />;
  }

  return (
    <React.Fragment>
      <Alert alertInfo={alertInfo} duration={5000} onDurationEnd={setAlertInfo}/>
      {validate.isNotEmpty(consultations) && !loader && (isSlider ?
        <UpcomingConsultationSlider toggleChat={props.toggleChat} consultations={consultations} getUpComingConsultations={getUpComingConsultations} setAlertInfo={setAlertInfo} sectionTitle={props.sectionTitle} history={props.history} /> :
        <React.Fragment>
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h5 className="m-0">{consultations.length === 1 ? "Upcoming Consultation" : "Upcoming Consultations"}</h5>
          </div>
          <div className='upcoming-consultation doc-my-bookings-tabs'>
            {consultations && consultations.map(each => {
              return (
                <Consultation key={each.orderId} toggleChat={props.toggleChat} fromMyBookings={props.fromMyBookings} consultation={each} getUpComingConsultations={getUpComingConsultations} setAlertInfo={setAlertInfo} history={props.history} upcomingConsultationIdFromCache={props.upcomingConsultationIdFromCache} />
              )
            })}
          </div>
        </React.Fragment>)
      }
    </React.Fragment >
  )
}

export default UpcomingDoctorConsultations;
