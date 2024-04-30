import React, { useEffect, useState } from "react";
import BreadCrumbAction from "../../../../../../redux/action/BreadCrumbAction";
import Alert, { ALERT_TYPE_ERROR } from "../../../../../components/Common/Alert";
import Validate from "../../../../../helpers/Validate";
import MartAdminService from "../../../../services/MartAdminService";
import {Table } from 'reactstrap';
const OrderCancellatioReasonConfiguration = (props) => {
    const [reason, setReason] = useState('');
    const [reasons, setReasons] = useState([]);
    const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
    let removeReason = null;
    const breadCrumbAction = BreadCrumbAction();
    const closeAlertMessage = () => {
        setAlertInfo({ message: "", type: "" });
    }

    useEffect(() => {
        breadCrumbAction.pushBreadCrumbs({ name: 'Order cancellation reasons', url: props.location.pathname });
        MartAdminService().orderCancellationReasonsConfiguration({}).then(response => {
            if (response.statusCode == 'SUCCESS') {
                setReasons(response.dataObject.orderCancellationReasons);
            } else {
                setAlertInfo({ message: response.message, type: '' });
            }
        }).catch(error => {
            console.log(error);
        })
    }, [])

    const doAction = (e, obj) => {
        e.preventDefault();
        if (e.target.name === 'REMOVE') {
            removeReason = obj;
            MartAdminService().RemoveOrderCancellationReason({ orderCancellationReason: removeReason }).then(response => {
                if (response.statusCode == 'SUCCESS') {
                    setReasons(response.dataObject.orderCancellationReasons);
                    setAlertInfo({ message: response.dataObject.message, type: '' });
                }
                else {
                    setAlertInfo({ message: response.message, type: ALERT_TYPE_ERROR });
                }
            }).catch(error => {
                console.log(error);
            })
        } else if (e.target.name === 'ADD') {
            if (Validate().isEmpty(reason)) {
                setAlertInfo({ message: 'Empty order cancellation reason', type: ALERT_TYPE_ERROR });
            } else {
                MartAdminService().saveOrderCancellationReason({ orderCancellationReason: reason }).then(response => {
                    if (response.statusCode == 'SUCCESS') {
                        setReasons(response.dataObject.orderCancellationReasons);
                    } else {
                        setAlertInfo({ message: response.message, type: ALERT_TYPE_ERROR });
                    }
                }).catch(error => {
                    console.log(error);
                })
            }
        }
    }

    return (
        <>
            <section className="admin-screen">
                        <h1 className="h5 p-3 border-bottom">Order Cancellation Reason Configuration</h1>
                <div className="p-3">
                    <div className="d-flex">
                                    <div className="each-group has-float-label form-group-error col-4 pl-0">
                                        <input className="form-control w-100" id="reason" name="reason" value={reason} maxLength={200} placeholder=" " type="text" onChange={event => { setReason(event.target.value) }} />
                                        <label htmlfor="reason" className="select-label">
                                            Enter Order Cancellation Reason
                                        </label>
                                        <p className="d-none">plz Enter Order Cancellation Reson</p>
                                    </div>
                            <div className="d-flex ml-4">
                                <button type="button" className="brand-secondary btn px-5 rounded-pill" onClick={(e)=>{ setReason('');}}>Clear</button>
                                <button type="button" className="btn btn-brand-gradient rounded-pill px-5 ml-3" name="ADD" onClick={e => { doAction(e, '') }}>Save</button>
                            </div>
                    </div>
                    {reasons.length > 0 &&
                // <div>
                //     <table className='w-100 table'>
                //         <thead className='rounded'>
                //             <tr className='w-75 bg-secondary text-light'>
                //                 <th className='px-3'>Reason</th>
                //                 <th className='text-center'>Action</th>
                //             </tr>
                //         </thead>
                //         {reasons.map(obj => {
                //             return (
                //                 <tbody className='center'>
                //                     <tr>
                //                         <td className='col-8 align-middle'>{obj}</td>
                //                         <td><button type="submit" className="w-100 btn btn-brand-gradient px-5 rounded-pill custom-btn-lg" name="REMOVE" onClick={e => { doAction(e, obj) }}>REMOVE</button></td>
                //                     </tr>
                //                 </tbody>)
                //         })}
                //     </table>
                // </div>
                
                
                <Table bordered className="p-3 col-4 mt-3">
                     <thead className='rounded'>
                            <tr>
                                <th className='px-3'>Reason</th>
                                <th className=''>Action</th>
                            </tr>
                        </thead>
                        {reasons.map(obj => {
                            return (
                                <tbody>
                                    <tr>
                                        <td>{obj}</td>
                                        <td><button type="submit" className="btn btn-brand-gradient rounded-pill" name="REMOVE" onClick={e => { doAction(e, obj) }}>REMOVE</button></td>
                                    </tr>
                                </tbody>)
                        })}
                </Table>
                }
                </div>
            </section>
            
            <Alert alertInfo={alertInfo} onDurationEnd={closeAlertMessage} duration='5000' />
        </>
    );
};

export default OrderCancellatioReasonConfiguration;