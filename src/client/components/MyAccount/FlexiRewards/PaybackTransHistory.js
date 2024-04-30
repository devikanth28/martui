import React, { useEffect, useState } from 'react';
import RewardsSummary from './RewardsSummary';
import FAQ from './FAQ';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const PaybackTransHistory = (props) => {

    const [tabIndex, setTabIndex] = useState(0);
    useEffect(()=>{
        if (window.location.href.includes("flexiRewardsFaq")){
            setTabIndex(1);
        }
    },[]);

    return (
        <React.Fragment>
            <section>
                <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
                    <div className="header p-0 mb-0">
                        <TabList className="nav nav-pills">
                            {props.isPayback &&
                            <Tab className="nav-item border-0" title="Points History">
                                <button role="button" className="btn text-dark nav-link py-3">MedPlus Payback Points History</button>
                            </Tab>}
                            {props.isMdxPoints &&
                            <Tab className="nav-item border-0" title="MDx Points Wallet History">
                                <button role="button" className="btn text-dark nav-link py-3">MDx Points Wallet History</button>
                            </Tab>}
                            {/* <Tab className="nav-item border-0" title="Frequently Asked Questions">
                                <a href="javascript:void(0)" className="nav-link py-3">Frequently Asked Questions</a>
                            </Tab> */}
                        </TabList>
                    </div>
                        <TabPanel>
                            <RewardsSummary routePath={props.routePath} isMdxPoints = {props.isMdxPoints} isPayback={props.isPayback} history={props.history}></RewardsSummary>
                        </TabPanel>
                        {/* <TabPanel>
                            <FAQ></FAQ>
                        </TabPanel> */}
                </Tabs>
            </section>
        </React.Fragment>
    )
}

export default PaybackTransHistory;