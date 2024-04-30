import React from 'react';
import { useState, useEffect } from 'react';
import Validate from '../../../../helpers/Validate';
import MartCatalogService from '../../../services/MartCatalogService';

const EmergencyMessages = () => {

    const validate = Validate();
    const martCatalogService = MartCatalogService();

    const [message, setMessage] = useState('');

    useEffect(() => {
        getEmergencyMessages();
    }, []);

    const getEmergencyMessages = () => {
        martCatalogService.getEmergencyMessages().then(data => {
            if (validate.isNotEmpty(data) && "SUCCESS" === data.statusCode && validate.isNotEmpty(data?.dataObject?.emergencyMessage)) {
                setMessage(data.dataObject.emergencyMessage);
            } else{
                setMessage('');
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    const removeEmergencyMsg = () => {
        setMessage('');
        martCatalogService.removeEmergencyMsg();
    }

    return (
        <React.Fragment>
            {validate.isNotEmpty(message) &&
                <div className="alert alert-warning d-flex justify-content-between align-items-center shadow-sm alert-information" role="alert">
                    <div className='info'>
                        <svg xmlns="http://www.w3.org/2000/svg" id="note_black_icon_18px" width="18" height="18" viewBox="0 0 18 18" className="align-text-bottom mr-3">
                            <path id="Icon_awesome-info-circle" data-name="Icon awesome-info-circle" d="M9.563.563a9,9,0,1,0,9,9A9,9,0,0,0,9.563.563Zm0,3.992A1.524,1.524,0,1,1,8.038,6.079,1.524,1.524,0,0,1,9.563,4.554Zm2.032,9.218a.436.436,0,0,1-.435.435H7.966a.436.436,0,0,1-.435-.435V12.9a.436.436,0,0,1,.435-.435H8.4V10.143H7.966a.436.436,0,0,1-.435-.435V8.837A.436.436,0,0,1,7.966,8.4h2.323a.436.436,0,0,1,.435.435v3.629h.435a.436.436,0,0,1,.435.435Z" transform="translate(-0.563 -0.563)"></path>
                        </svg>
                        <span>{message}</span>
                    </div>

                    <a href="javascript:void(0);" title="Close" className='close' onClick={removeEmergencyMsg}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" >
                            <g id="close_black_icon_18px" transform="translate(-48.941 -281.937)">
                                <rect id="Rectangle_3290" data-name="Rectangle 3290" width="18" height="18" transform="translate(48.941 281.937)" fill="none"></rect>
                                <path id="Path_1951" data-name="Path 1951" d="M66.7,298.492l-7.579-7.562,7.563-7.563a.831.831,0,0,0-1.175-1.175l-7.567,7.562-7.562-7.578a.832.832,0,0,0-1.175,1.176l7.562,7.579-7.562,7.562a.831.831,0,1,0,1.132,1.218c.015-.013.029-.028.043-.043l7.562-7.563,7.563,7.563a.831.831,0,0,0,1.175,0h0a.818.818,0,0,0,.039-1.156Z" transform="translate(0 -0.002)" fill="#080808"></path>
                            </g>
                        </svg>
                    </a>
                </div> }
        </React.Fragment>
    )
}
export default EmergencyMessages