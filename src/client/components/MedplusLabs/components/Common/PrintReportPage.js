import React, { useEffect, useState } from 'react';
import CONFIG from '../../../../constants/ServerConfig';
import Validate from '../../../../helpers/Validate';

function PrintReportPage(props) {

    useEffect(()=>{
        if(Validate().isNotEmpty(props.match.params.id)){
            printLabReport(props.match.params.id);
        }
    },[props.match.params.id]);

    const printLabReport=(orderId)=>{
        window.open(`${CONFIG.API.MY_ACCOUNT.MY_LAB_ORDERS.PRINT_LAB_REPORT.PATH}?orderId=${orderId}`);
        window.location.href = "/";
    }
    return (
        <div/>
    );
}

export default PrintReportPage;