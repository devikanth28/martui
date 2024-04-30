import React,{useEffect, useState} from "react";
import RedeemRewards from "../MyAccount/FlexiRewards/RedeemRewards";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import FAQ from "../MyAccount/FlexiRewards/FAQ";
import BreadCrumbAction from "../../../redux/action/BreadCrumbAction";
const PayBackPoints = (props) => {

    const [tabIndex, setTabIndex] = useState(0);
    const breadCrumbAction = BreadCrumbAction();

    useEffect(() => {
        breadCrumbAction.pushBreadCrumbs({ name: 'MedPlus Payback Points', url: props.location.pathname });
    }, [props.location.pathname]);

    return (<React.Fragment>
        <section>
            <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
                <div className="header p-0 mb-0">
                    <TabList className="nav nav-pills">
                        <Tab className="nav-item border-0" title=" MedPlus Payback Points">
                            <a href="javascript:void(0)" className="nav-link py-3">MedPlus Payback Special Sale</a>
                        </Tab>
                        <Tab className="nav-item border-0" title="Frequently Asked Questions">
                            <a href="javascript:void(0)" className="nav-link py-3">Frequently Asked Questions</a>
                        </Tab>
                    </TabList>
                </div>
                <TabPanel>
                    <RedeemRewards history={props.history} isPayback={props.isPayback} />
                </TabPanel>
                <TabPanel>
                    <FAQ setTab={setTabIndex}></FAQ>
                </TabPanel>
            </Tabs>
        </section>
    </React.Fragment>)
}
export default PayBackPoints