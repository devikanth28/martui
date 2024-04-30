import React, { useEffect, useState } from 'react'
import BreadCrumbAction from '../../../../../../redux/action/BreadCrumbAction';
import Alert, { ALERT_TYPE_ERROR, ALERT_TYPE_SUCCESS } from '../../../../../components/Common/Alert';
import MartAdminService from '../../../../services/MartAdminService';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
const UnSubscribeFromRefill = (props) => {
    const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
    const breadCrumbAction = BreadCrumbAction();
    const [refillIds,setRefillIds] = useState(null);
    const [cartIds,setCartIds] = useState(null);
    const [ orderIds,setOrderIds] = useState(null);

    useEffect(() => {
        breadCrumbAction.pushBreadCrumbs({ name: ' Unsubscribe From Refills', url: props.location.pathname });
    }, [])

    const closeAlertMessage = () => {
        setAlertInfo({ message: "", type: "" });
    }

    const unsubscribe =(e)=>{
        MartAdminService().unSubscribeRefill({refillIds}).then(response => {
            if (response.statusCode == 'SUCCESS') {
                setAlertInfo({ message: response.message, type: ALERT_TYPE_SUCCESS });
            } else {
                setAlertInfo({ message: response.message, type: ALERT_TYPE_ERROR });
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    const forceCancel =(e)=>{
        MartAdminService().forceCancelOrderByAdmin({cartIds}).then(response => {
            if (response.statusCode == 'SUCCESS') {
                setAlertInfo({ message: response.message, type: ALERT_TYPE_SUCCESS });
            } else {
                setAlertInfo({ message: response.message, type: ALERT_TYPE_ERROR });
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    const cancelOrder =(e)=>{
        MartAdminService().cancelOrdersByAdmin({orderIds}).then(response => {
            if (response.statusCode == 'SUCCESS') {
                setAlertInfo({ message: response.message, type: ALERT_TYPE_SUCCESS });
            } else {
                setAlertInfo({ message: response.message, type: ALERT_TYPE_ERROR });
            }
        }).catch((error) => {
            console.log(error);
        })
    }
    return (
        <React.Fragment>
            <section className='Admin-screen'>
                <h1 className='h5 p-3 border-bottom mb-0'>UnSubscribe From Refill</h1>
                <React.Fragment>
                    <Tabs>
                        <div className="header p-0 mb-0">
                            <TabList className="nav nav-pills" style={{ "gap": "3rem" }}>
                                <Tab className="nav-item border-0">
                                    <button role="button" className="nav-link py-3 btn border-0">Refiil ID</button>
                                </Tab>
                                <Tab className="nav-item border-0">
                                    <button role="button" className="nav-link py-3 btn border-0">Cart ID</button>
                                </Tab>
                                <Tab className="nav-item border-0">
                                    <button role="button" className="nav-link py-3 btn border-0">Order ID</button>
                                </Tab>
                            </TabList>
                        </div>
                        <TabPanel>
                            <div className='row m-3'>
                                <div className="form-group has-float-label px-0 mb-3 form-group-error w-50 col-4">
                                    <input type="text" class="form-control" placeholder=" " value={refillIds} onChange={e => { setRefillIds(e.target.value) }} />
                                    <label htmlFor="fullName">Enter {"Refill Id's"} Seperated With ,</label>
                                </div>
                                <button type="submit" class="btn mb-3 btn-brand-gradient ml-3 px-5 rounded-pill custom-btn-lg" onClick={e => { unsubscribe(e) }}>Submit</button>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className='row m-3'>
                                <div className="form-group has-float-label px-0 mb-3 form-group-error w-50 col-4">
                                    <input type="text" class="form-control" placeholder=" " value={cartIds} onChange={e => { setCartIds(e.target.value) }} />
                                    <label htmlFor="fullName">Enter {"Cart Id's"} Seperated With ,</label>
                                </div>
                                <button type="submit" class="btn mb-3 btn-brand-gradient ml-3 px-5 rounded-pill custom-btn-lg" onClick={e => { forceCancel(e) }}>Submit</button>
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div className='row m-3'>
                                <div className="form-group has-float-label px-0 mb-3 form-group-error w-50 col-4">
                                    <input type="text" class="form-control" placeholder=" " value={orderIds} onChange={e => { setOrderIds(e.target.value) }} />
                                    <label htmlFor="fullName">Enter {"Order Id's"} Seperated With ,</label>
                                </div>
                                <button type="submit" class="btn mb-3 btn-brand-gradient ml-3 px-5 rounded-pill custom-btn-lg" onClick={e => { cancelOrder(e) }}>Submit</button>
                            </div>
                        </TabPanel>
                    </Tabs>
                    
                   
                </React.Fragment>
                <Alert alertInfo={alertInfo} onDurationEnd={closeAlertMessage} duration='5000' />
            </section>
        </React.Fragment>
    )
}

export default UnSubscribeFromRefill