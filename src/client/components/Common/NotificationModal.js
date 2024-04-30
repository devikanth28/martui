import React,{useState} from 'react';
import { Modal, ModalBody, ModalHeader} from 'reactstrap';
import NoNotificationLogo from '../../images/common/no-notification-cssbg.svg'
import Validate from '../../helpers/Validate';
import { useSelector } from 'react-redux';

const dateFormat = require('dateformat');


const NotificationModal = (props) => {
    const notifications = props.notifications;
    const validate = Validate();
    const userInfo  = useSelector(state=>state.userInfo.userInfo);
    const [transition,ControlTransition] = useState(props.isModelOpen)
    const CloseButton = <button type="button" role="button" onClick={()=>{handleTransition("close")}} className="close icons clear-icn" data-dismiss="modal" aria-label="Close"><span aria-hidden="true"></span></button>
    var date = new Date();
    let toDays = parseInt(date.getTime()/ (1000*60*60*24));
    const isMessagesAvailable = validate.isNotEmpty(notifications) && validate.isNotEmpty(notifications.messages) && notifications.messages.length > 0;
    const getDateString = (dateDiff, notificationDate) => {
        if (dateDiff == 0) {
           return `Today, ${dateFormat(notificationDate, "hh:MM TT")}`;
        } else if(dateDiff == 1) {
            return `Yesterday, ${dateFormat(notificationDate, "hh:MM TT")}`;
        } else {
            return `${dateFormat(notificationDate, "dd mmm")}`;
        }
    }


    const handleTransition = (from) => {
        if(from == 'close') {
            ControlTransition(!transition)
            const timeout = setTimeout(() => {
                props.toggleNotificationModal()
              }, 500);
          
             return () => clearTimeout(timeout);
        }
    }

    return (
        <React.Fragment>
            <Modal className="modal-dialog-right notification" modalClassName={transition ? "fadeInRight":"fadeOutRight"} isOpen={props.isModelOpen} toggle={props.toggleNotificationModal}>
                <ModalHeader toggle={props.toggleNotificationModal} close={CloseButton}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 19.692 24.002">
						<path stroke="none" fill="#bebebe" d="M-4077.615,10406.537h4.924a2.463,2.463,0,0,1-2.463,2.464A2.462,2.462,0,0,1-4077.615,10406.537Zm-7.385-1.229v-1.23l2.461-2.461v-6.155c0-3.785,2.014-6.94,5.541-7.779v-.836a1.843,1.843,0,0,1,1.844-1.847,1.845,1.845,0,0,1,1.847,1.847v.836c3.527.839,5.538,3.994,5.538,7.779v6.155l2.461,2.461v1.23Z" transform="translate(4085 -10385)"></path>
					</svg>
                    Notification
                    <div className="d-flex justify-content-between">
                        {/* {isMessagesAvailable && <button className="btn btn-link btn-sm ml-n2 text-capitalize" value="Mark all as read">Mark all as read</button>} */}
                        {isMessagesAvailable && validate.isNotEmpty(userInfo) && <button role="button" className="btn btn-link btn-sm ml-n2" value="Delete All" onClick={() => props.deleteAllNotifications(notifications)}>Delete All</button>}
                    </div>
                </ModalHeader>
                <ModalBody className="p-0">
                    {props.loader && 
                        <React.Fragment>
                            <div className="card">
                                <div className="ph-item mb-0 border-0 p-0">
                                    <div className="ph-col-12 px-0">
                                        <div className="ph-row p-3 mb-0">
                                            <div className="ph-col-6 mb-2"></div>
                                            <div className="ph-col-6 empty mb-3"></div>
                                            <div className="ph-col-12 mb-2"></div>
                                            <div className="ph-col-12 mb-2"></div>
                                            <div className="ph-col-12 mb-0"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="ph-item mb-0 border-0 p-0">
                                    <div className="ph-col-12 px-0">
                                        <div className="ph-row p-3 mb-0">
                                            <div className="ph-col-6 mb-2"></div>
                                            <div className="ph-col-6 empty mb-3"></div>
                                            <div className="ph-col-12 mb-2"></div>
                                            <div className="ph-col-12 mb-2"></div>
                                            <div className="ph-col-12 mb-0"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </React.Fragment>
                    }
                    {!props.loader && <div className={`pb-2 ${isMessagesAvailable ? "scroll" : ""}`}>
                        {!isMessagesAvailable && 
                            <div className="v-center">
                                <img alt="no-notification" srcSet={NoNotificationLogo} className="img-fluid"></img>
                                <h5 className="mb-0"> No Notifications</h5>
                                <p className="mb-0 text-secondary" > We will notify you once we have something for you</p>
                            </div>
                        }
                        {isMessagesAvailable && notifications.messages.map((eachNotification, index) => {
                            let otherDays = parseInt(eachNotification.dateCreated/ (1000*60*60*24));
                            const dateDiff = toDays - otherDays;
                            return (
                                <div onClick={() => props.launchNotification(eachNotification.redirectionUrl)} key={index} className={`card pointer ${(eachNotification.action=='READ' || validate.isEmpty(userInfo)) ? '' : 'card-b-success'}`}>
                                    <div className="row m-0">
                                        {validate.isNotEmpty(eachNotification.imageUrl) && 
                                            <img src={eachNotification.imageUrl} className="img-fluid  fitImage rounded-top" title={eachNotification.title} alt={eachNotification.title}></img>
                                        }
                                        <div className={validate.isNotEmpty(eachNotification.imageUrl) ? 'col py-3 pl-3' : 'col m-auto p-3'}>
                                            <h6 className="mb-2 title">{eachNotification.title}</h6>
                                            <p className="text-secondary mb-0">
                                                {eachNotification.body}
                                            </p>
                                            <small className={validate.isNotEmpty(eachNotification.imageUrl) ? 'help-text mb-0 pt-1' : 'mb-0 pt-1'}>
                                                {getDateString(dateDiff, new Date(eachNotification.dateCreated))}
                                            </small>
                                        </div>
                                        {/* {validate.isNotEmpty(eachNotification.imageUrl) && <div className="col-3 m-auto">
                                            <div className="d-flex justify-content-center">
                                                <button className="btn btn-success" value="Buy" onClick={() => props.history.push(eachNotification.redirectionUrl)}>Buy</button>
                                            </div>
                                        </div>} */}
                                        {eachNotification.action !='READ' && validate.isNotEmpty(userInfo) && 
                                            <a className="success-dot" href="javascript:void(0);" title="Remove Product">
                                                <svg
                                                xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 9 9">
                                                <circle fill="#08ce73" cx="4.5" cy="4.5" r="4.5"/>
                                                </svg>
                                            </a>
                                        }
                                        
                                    </div>
                                </div>
                            )
                        })}
                    </div>}
                </ModalBody>
            </Modal>
        </React.Fragment>
    )
}

export default NotificationModal;