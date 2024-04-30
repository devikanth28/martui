import React,{useState, useEffect} from 'react';
import TabHeader from './TabHeader';
import MywalletTab from './MyWalletTab';
import FAQTab from './FAQ';
import HowItWorksTab from './HowItWorks';
import WalletSummaryTab from './WalletSummary';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { getSelectedLocality } from '../../../../redux/action/LocalityAction';
import UserInfoAction from '../../../../redux/action/UserInfoAction';
import Validate from '../../../helpers/Validate';
import Alert, {ALERT_TYPE_SUCCESS, ALERT_TYPE_ERROR} from '../../Common/Alert';
const MedplusWallet = (props) =>{

    var userInfo = UserInfoAction().getUserInfo();
    const [tabIndex, setTabIndex] = useState(0);
    const [showWalletSummary,setShowWalletSummary] = useState(false);
    const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
    const selectedLocality = getSelectedLocality();
    let showMyWallet = false;
    if(Validate().isEmpty(selectedLocality) || (selectedLocality.showMyWallet=='Y' || selectedLocality.showMyWallet == 'y') ){
        showMyWallet = true;
    }
    if(!showMyWallet){
        window.location.href="/";
    } 
    useEffect(()=>{
        if(props.location.errorData){
            setAlertInfo({ message: Validate().isEmpty(props.location.errorData.errorMsg)? "We are processing your Request, Please wait..!":props.location.errorData.errorMsg, type: ""}); 
		}
        if (window.location.href.includes("myWalletTransactions") && showWalletSummary){
            setTabIndex(1);
        }
    },[showWalletSummary]);

    const closeAlertMessage = () => {
        setAlertInfo({});
    }

    return(
        <React.Fragment>
            <Alert alertInfo={alertInfo} onDurationEnd={closeAlertMessage} duration={5000}/>
            {showMyWallet &&
            <section>
                <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
                    <div className="header p-0 mb-0">
                        <TabList className="nav nav-pills">
                            <Tab className="nav-item border-0" title="My Wallet">
                                <button role="button" className="btn text-dark nav-link py-3">My Wallet</button>
                            </Tab>
                            {showWalletSummary && 
                                <Tab className="nav-item border-0" title="Wallet History">
                                    <button role="button" className="btn text-dark nav-link py-3">Wallet History</button>
                                </Tab>
                            }
                            {/* <Tab className="nav-item border-0" title="How it works">
                                <button role="button" className="btn text-dark nav-link py-3">How it works</button>
                            </Tab> */}
                            <Tab className="nav-item border-0" title="Frequently Asked Questions">
                                <button role="button" className="btn text-dark nav-link py-3">Frequently Asked Questions</button>
                            </Tab>
                            {/* <Tab className="nav-item border-0">
                                <a className="nav-link py-3" role="tab" aria-controls="pills-profile" aria-selected="false">FlexiCash Catalog</a>
                            </Tab> */}
                            
                        </TabList>
                    </div>
                    <TabPanel>
                        <MywalletTab setShowWalletSummary={setShowWalletSummary}/>
                    </TabPanel>
                    {showWalletSummary &&
                        <TabPanel>
                            <WalletSummaryTab history={props.history}/>
                        </TabPanel>
                    }
                    {/* <TabPanel>
                        <HowItWorksTab/>
                    </TabPanel> */}
                    <TabPanel>
                        <FAQTab/>
                    </TabPanel>
                    {/* <TabPanel>
                        <MywalletTab/>
                    </TabPanel> */}
                </Tabs>
            </section>}
        </React.Fragment>
    )
    {/* <React.Fragment>
    <div>
        <TabHeader/>
        <div className="tab-content" id="pills-tabContent">
            <MywalletTab/>
        </div>
    </div>
</React.Fragment> */}
}
export default MedplusWallet;