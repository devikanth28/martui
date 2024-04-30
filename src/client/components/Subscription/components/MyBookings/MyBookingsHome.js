import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import SubscriptionsTab from './SubscriptionsTab';
import DoctorConsultationTab from '../../../MyAccount/MyBookings/DoctorConsultationTab';
import { Modal, ModalBody} from 'reactstrap';
import CancelOrderIcn from "../../../../images/common/refil-interval-icn.svg";
import { useSelector } from 'react-redux';
import Validate from '../../../../helpers/Validate';

const MyBookingsHome = (props) =>  {
    const [tabIndex, setTabIndex] = useState(0);
    const [cancelOrderModalOpen, setCancelOrderModalOpen] = useState(false);
    const [showUserContent, setShowUserContent] = useState("");
    const validate = Validate();
    const [showCancelSubsButton, setShowCancelSubsButton] = useState(useSelector(state => validate.isNotEmpty(state.subscription) && validate.isNotEmpty(state.subscription.subscriptionId)));
    const toggleUserTab=(userTab)=>{
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setShowUserContent(userTab)
    }

    useEffect(()=>{
        if(props.routePath=="doctorconsultationbookings"){
            setTabIndex(1)
            setShowUserContent("doctors");
        }
        else{
            setTabIndex(0);
            if(props.location.hash.indexOf("subscriptionPayments") > -1){
                setShowUserContent("Payments");
                props.history.replace("/myBookings");
            }else{
                setShowUserContent("");
            }
        }
    },[])

    const DoctorPage = () => {
        props.history.push("/doctorconsultation/bookings");
        setShowUserContent("doctors");
    }

    const SubscriptionPage = () => {
        props.history.push("/myBookings");
        setShowUserContent("");
    }

    return (
        <React.Fragment>
        <section className="card border-0">
            <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
                <div className="header p-0 mb-0">
                    <TabList className="nav nav-pills">
                        <Tab className="nav-item border-0" title="Subscriptions">
                            <button role="button" className="btn btn-link nav-link py-3 text-dark" onClick={()=>{SubscriptionPage()}}>Subscriptions</button>
                        </Tab>
                        <Tab className="nav-item border-0" title="Doctor Consultations">
                            <button role="button" className="btn btn-link nav-link py-3 text-dark" onClick={()=>{DoctorPage()}}>Doctor Consultations</button>
                        </Tab>
                    </TabList>
                </div>
                    <TabPanel>
                        <SubscriptionsTab setShowCancelSubsButton={setShowCancelSubsButton} history={props.history} toggleUserTab={toggleUserTab} showUserContent={showUserContent}/>
                        { (showUserContent == "" && showCancelSubsButton) ? <React.Fragment><hr className='solid m-0 border-bottom-0'/>
                            <button role="button" className="btn float-right btn-outline-dark m-3 px-5 rounded-pill custom-btn-lg" onClick={() => setCancelOrderModalOpen(true)}>Cancel Subscription</button>
                            { cancelOrderModalOpen && <CancelSubscription toggle={() => setCancelOrderModalOpen(!cancelOrderModalOpen)} modal={cancelOrderModalOpen}/> } </React.Fragment>  : ""} 
                    </TabPanel>
                    <TabPanel>
                        <DoctorConsultationTab history={props.history} toggleUserTab={toggleUserTab} showUserContent={showUserContent}/>
                    </TabPanel>
            </Tabs>
        </section>
    </React.Fragment>
    )
}

export default MyBookingsHome;

export const CancelSubscription = (props)=> {

    return (
        <React.Fragment>
            <Modal backdrop="static" keyboard={false} isOpen={props.modal} className="modal-dialog-centered cancel-order-popup" tabIndex="-1" autoFocus={false}>
                <ModalBody className="text-center">
                    <div>
                        <img className="img-fluid" src={CancelOrderIcn} alt="cancel Subscription"  title="cancel Subscription"/>
                        <p className="font-weight-normal">Dear Customer, if you choose to cancel your subscription please call our customer care team at <a href="tel:04067006700" className="text-primary" title="call 040 6700 6700"> 040 6700 6700</a> or write to us at <a href="mailto:wecare@medplusindia.com" className="text-body" title="mail to wecare@medplusindia.com">wecare@medplusindia.com</a></p>
                    </div>
                    <button type="button" className="text-center btn btn-dark px-5 rounded-pill" onClick={() => props.toggle(false)}>Close</button>
                </ModalBody>
            </Modal> 
        </React.Fragment>
    )
}
