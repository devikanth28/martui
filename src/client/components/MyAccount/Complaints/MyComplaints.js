import React, { useState, useEffect } from 'react';
import MyAccountService from '../../../services/MyAccountService';
import MyComplaintsGhostImage from './MyComplaintsGhostImage';
import Validate from '../../../helpers/Validate';
import NoDataToShowIcon from '../../../images/common/no-health-records-cssbg.svg';
import Alert from '../../Common/Alert';
import CONFIG from '../../../constants/ServerConfig';

const MyComplaints = (props) =>{
    const [startLimit, setStartLimit] = useState(0);
    const [status, setStatus] = useState("true");
    const [isComplaintsHistoryLoading, setComplaintsHistoryLoading] = useState(false);
    const [complaintsHistory, setComplaintsHistory] = useState({});
    const [noRecords, setNoRecords] = useState(false);
    const months = ["","Jan","Feb","Ma","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const myAccountService = MyAccountService();
    const validate = Validate();
    const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });

    useEffect(() => {
        geMyComplaintsHistory(status,startLimit);
     }, []);

     const geMyComplaintsHistory = (status,startLimit)=> {
        setComplaintsHistoryLoading(true);
        setNoRecords(false);
        myAccountService.geMyComplaintsHistory(status,startLimit).then(response => {
            setComplaintsHistoryLoading(false);
            if(validate.isNotEmpty(response) && response.statusCode == "SUCCESS"){
                setComplaintsHistory(response.dataObject);
                if(validate.isEmpty(response.dataObject) || validate.isEmpty(response.dataObject.tickets) || response.dataObject.tickets.length == 0){
                    setNoRecords(true);
                }
            }else if(response.message == "Your Medplus ID is not registered"){
                setAlertInfo({ message: "Please loging to get details", type: "Error"});
                window.location.href = CONFIG.REDIRECT_HOME_URL;
            }else{
                setAlertInfo({ message: "Please try after some time", type: "Error"});
            }
        }).catch(function(error) {
            setComplaintsHistoryLoading(false);
            console.log(error);
            setAlertInfo({ message: "System experiencing some problem, Please try after some time", type: "Error"});
        });
    }

    const redirectToOrderDetails=(orderId, vertical)=>{ 
        vertical === "LABS" ? props.history.push("/labOrderDetail/"+orderId) : props.history.push("/orderDetails/"+orderId);
     }

    /* const getClosedTickets = (includeClosed) =>{
        let includeClosedTickets = includeClosed ? "false" : "true";
        setStatus(includeClosedTickets);
        geMyComplaintsHistory(includeClosedTickets,startLimit);
    } */

    return(
        <React.Fragment>
            <Alert alertInfo={alertInfo} duration={5000} onDurationEnd={setAlertInfo}/>
            <section className="body-height">
                <div className="my-complaints-section">
                    <div className="header">
                        <p>
                            My Complaints
                        </p>
                       {/*  <div className="custom-control custom-checkbox font-weight-normal">
                            <input type="checkbox" className="custom-control-input" id="include-closed-complaints" onClick={(e) => getClosedTickets(!e.target.checked)}/>
                            <label className="custom-control-label pointer" for="include-closed-complaints">Include Closed Complaints</label>
                        </div> */}
                    </div>
                    {isComplaintsHistoryLoading && <MyComplaintsGhostImage></MyComplaintsGhostImage>}
                    {!isComplaintsHistoryLoading && noRecords && 
                        <div className=" no-data-to-show body-height">
                            <img src={NoDataToShowIcon} alt="No complaints available." title="No complaints available."/>
                            <h6 className="mb-0">No complaints available.</h6>
                        </div>
                    }
                    {!isComplaintsHistoryLoading && status && validate.isNotEmpty(complaintsHistory) && !noRecords &&
                    <div className="complaints-list">
                        {validate.isNotEmpty(complaintsHistory.tickets) && complaintsHistory.tickets.map((ticket, key )=>{
                            let date = [];
                            if(ticket != null && ticket.dateCreated != null){
                                date = ticket.dateCreated.substring(0, 10).split("-");
                            }
                            return(
                                <React.Fragment>
                                    {ticket.status == "open" && 
                                        <div className="card">
                                            <div className="card-header">
                                                <div>
                                                    <span className="text-success font-weight-bold">Open</span>
                                                    <span className="dot-separator text-dark"></span>
                                                    <small className="text-muted mr-2">Complaint ID</small>
                                                    <strong>{ticket.ticketNumber}</strong>
                                                    {ticket.orderId && validate.isNotEmpty(ticket.orderId) && 
                                                        <React.Fragment>
                                                            <span className="dot-separator text-dark"></span>
                                                            <small className="text-muted mr-2">Order ID</small>
                                                            <strong className="pointer" onClick={()=>{redirectToOrderDetails(ticket.orderId, ticket.vertical)}}>{ticket.orderId}</strong>
                                                        </React.Fragment>
                                                    }
                                                </div>
                                                {ticket.dateCreated && 
                                                    <div className="text-right small">
                                                        <span className="text-muted">Complained On &nbsp;<strong className="text-dark">{months[parseInt(date[1])]} {date[2]}, {date[0]}</strong></span>
                                                    </div>
                                                }
                                            </div>
                                            <div className="card-body">
                                                <div className="complaint-info">
                                                    <h6 className="small font-weight-bold">
                                                    {ticket.summary}
                                                    </h6>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    {ticket.status == "closed" && status == "true" &&
                                        <div className="card">
                                            <div className="card-header">
                                                <div>
                                                    <span className="text-brand font-weight-bold">Closed</span>
                                                    <span className="dot-separator text-dark"></span>
                                                    <small className="text-muted mr-2">Complaint ID</small>
                                                    <strong>{ticket.ticketNumber}</strong>
                                                    {ticket.orderId && validate.isNotEmpty(ticket.orderId) && 
                                                        <React.Fragment>
                                                            <span className="dot-separator text-dark"></span>
                                                            <small className="text-muted mr-2">Order ID</small>
                                                            <strong className="pointer" onClick={()=>{redirectToOrderDetails(ticket.orderId, ticket.vertical)}}>{ticket.orderId}</strong>
                                                        </React.Fragment>
                                                    }
                                                </div>
                                                {ticket.dateCreated && 
                                                    <div className="text-right small">
                                                        <span className="text-muted">Complained On &nbsp;<strong className="text-dark">{months[parseInt(date[1])]} {date[2]}, {date[0]}</strong></span>
                                                    </div>
                                                }
                                            </div>
                                            <div className="card-body">
                                                <div className="complaint-info">
                                                    <h6 className="small font-weight-bold">
                                                    {ticket.summary}
                                                    </h6>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </React.Fragment>
                            )
                        })}
                    </div>
                    }
                </div>
            </section>
        </React.Fragment>
    )
}

export default MyComplaints;