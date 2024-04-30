import React, { useEffect, useState } from 'react';
import RedeemRewards from './RedeemRewards';
import RewardsSummary from './RewardsSummary';
import FAQ from './FAQ';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Validate from '../../../helpers/Validate';
import MetaTitle from '../../../commonComponents/MetaTitle';
const FlexiRewardsHome = (props) => {

    const [tabIndex, setTabIndex] = useState(0);
    useEffect(()=>{
        if (window.location.href.includes("flexiRewardsFaq")){
            setTabIndex(1);
        }
    },[]);

    return (
        <React.Fragment>
            <MetaTitle metaKey={'FLEXI_REWARDS'}/>
            <section className="d-flex p-3 bg-info-50">
                <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                    <g transform="translate(-762 -1106)">
                        <path d="M12.562.563a12,12,0,1,0,12,12A12,12,0,0,0,12.562.563Zm0,5.323A2.032,2.032,0,1,1,10.53,7.917,2.032,2.032,0,0,1,12.562,5.885Zm2.71,12.29a.581.581,0,0,1-.581.581H10.433a.581.581,0,0,1-.581-.581V17.014a.581.581,0,0,1,.581-.581h.581v-3.1h-.581a.581.581,0,0,1-.581-.581V11.595a.581.581,0,0,1,.581-.581h3.1a.581.581,0,0,1,.581.581v4.839h.581a.581.581,0,0,1,.581.581Z" transform="translate(761.437 1105.438)"></path></g></svg>
                <p className="mb-0"><strong>FlexiRewards</strong> program has been de-activated. We are coming up with a new loyalty program. You can continue to redeem your existing FlexiReward points at any nearby <a href="/storelocator" target="_blank" rel="noopener" title="View at nearby MedPlus store" className="text-dark font-weight-bold">MedPlus Store.</a></p></section>
            <section>
                <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
                    <div className="header p-0 mb-0">
                        <TabList className="nav nav-pills">
                            {/*  <Tab className="nav-item border-0" title="Redeem Rewards">
                            <a href="javascript:void(0)" className="nav-link py-3" >Redeem Rewards</a>
                            </Tab> */}
                            <Tab className="nav-item border-0" title="Points History">
                                <button role="button" className="btn nav-link py-3">Points History</button>
                            </Tab>
                            {/* <Tab className="nav-item border-0" title="Frequantly Asked Questions">
                                <a href="javascript:void(0)" className="nav-link py-3">Frequently Asked Questions</a>
                            </Tab> */}
                        </TabList>
                    </div>
                    {/* <TabPanel>
                            <RedeemRewards history={props.history}></RedeemRewards>
                        </TabPanel> */}
                    <TabPanel>
                        <RewardsSummary></RewardsSummary>
                    </TabPanel>
                    {/* <TabPanel>
                            <FAQ></FAQ>
                        </TabPanel> */}
                </Tabs>
            </section>
        </React.Fragment>
    )
}

export default FlexiRewardsHome;