import React, { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import SubscriptionsTab from './SubscriptionsTab';
import DoctorConsultationTab from './DoctorConsultationTab';
const MyBookingsHome = (props) =>  {

    const [tabIndex, setTabIndex] = useState(0);
    const [showUserContent, setShowUserContent] = useState("");
    const toggleUserTab=(userTab)=>{
        setShowUserContent(userTab)
    }
    return (
        <React.Fragment>
        <section className="body-height">
            <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
                <div className="header p-0 mb-0">
                    <TabList className="nav nav-pills">
                        <Tab className="nav-item border-0" title="Subscriptions">
                        <a href="javascript:void(0)" className="nav-link py-3" onClick={()=>{setShowUserContent("")}}>Subscriptions</a>
                        </Tab>
                        <Tab className="nav-item border-0" title="Doctor Consultation">
                            <a href="javascript:void(0)" className="nav-link py-3">Doctor Consultation</a>
                        </Tab>
                    </TabList>
                </div>
                    <TabPanel>
                        <SubscriptionsTab history={props.history} toggleUserTab={toggleUserTab} showUserContent={showUserContent}/>
                    </TabPanel>
                    <TabPanel>
                        <DoctorConsultationTab/>
                    </TabPanel>
            </Tabs>
        </section>
    </React.Fragment>
    )
}

export default MyBookingsHome;
