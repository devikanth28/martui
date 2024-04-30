import React, { useEffect, useState } from 'react'
import LocalDB from '../../../DataBase/LocalDB';
import NoListAvailable from '../../../DoctorConsultation/components/moduleComponents/NoListAvailable';
import OtherConsultationsDoctorsTab from '../../../DoctorConsultation/components/moduleComponents/OtherConsultationsDoctorsTab';
import UpcomingDoctorConsultations from '../../../DoctorConsultation/components/moduleComponents/UpcomingDoctorConsultations';
import Validate from '../../../helpers/Validate';
import DoctorConsultationTransactionHistory from './DoctorConsultationTransactionHistory';
import ChatModal from '../../Chat/Common/ChatModal';
import { useChatModal } from '../../Chat/Common/useChatModal';
const DoctorConsultationTab = (props) => {

    const [noUpcomingConsultations, setNoUpcomingConsultations] = useState(false);
    const [noConsultations, setNoConsultations] = useState(false);
    const [showPayments, setShowPayments] = useState(false);
    const [consult,setConsult] = useState({});
    const [orderId,setOrderId] = useState("");
    const [reloadOtherConsultations, setReloadOtherConsultations] = useState(false);
    const validate = Validate();
    const [upcomingConsultationIdFromCache, setUpcomingConsultationIdFromCache] = useState(null);
    //chat related variables
    const [startChat,chatHeaderDetails,toggleChat] = useChatModal();
    const getUpcomingConsultationIdFromCache = () => {
      if(validate.isNotEmpty(LocalDB.getValue("upcomingConsultationId"))){
        setUpcomingConsultationIdFromCache(LocalDB.getValue("upcomingConsultationId"));
        LocalDB.removeValue("upcomingConsultationId");
      }else{
        setUpcomingConsultationIdFromCache(null);
      }
    }
    useEffect(()=>{
        getUpcomingConsultationIdFromCache();
    },[]);
    
    return (
        <React.Fragment>
           <div className={!showPayments ? 'row mt-3 mx-0' : 'row mt-3 mx-0 d-none'}>
                <div className={`${noUpcomingConsultations ? 'col-12' : 'col-8'}`}> 
                    <OtherConsultationsDoctorsTab toggleChat={toggleChat} orderId={orderId} noConsultations={noConsultations} setOrderId={setOrderId} history={props.history} consult={setConsult}  setShowPayments={setShowPayments} fullWidth={noUpcomingConsultations} noUpcomingConsultations={noUpcomingConsultations} setNoConsultations={setNoConsultations} reloadOtherConsultations={reloadOtherConsultations} setReloadOtherConsultations={setReloadOtherConsultations} />
                </div>
                {!noUpcomingConsultations && <div className='col-4'>
                    <UpcomingDoctorConsultations toggleChat={toggleChat} upcomingConsultationIdFromCache={upcomingConsultationIdFromCache}  setNoUpcomingConsultations={setNoUpcomingConsultations} sectionTitle="Upcoming Consultation" fromMyBookings={true} setReloadOtherConsultations={setReloadOtherConsultations} history={props.history} />
                </div>}
            </div>
            {showPayments && <DoctorConsultationTransactionHistory setUpcomingConsultationIdFromCache={setUpcomingConsultationIdFromCache} setOrderId={setOrderId} consultation={consult} history={props.history} showPayments={setShowPayments}/>}
            <ChatModal chatHeaderDetails={chatHeaderDetails} isModelOpen={startChat} toggleChat={toggleChat} eventType={"DOCTOR_ORDER_CHAT"} ></ChatModal>
        </React.Fragment >
    )
}

export default DoctorConsultationTab;
