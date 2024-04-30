import { downloadHealthTrendsPdf, PdfContent, PdfFooter, PdfHeader } from '@medplus/mart-common-components/HealthTrendsPdf';
import React, { useEffect, useRef, useState } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import HealthTrendsDashBoard from '../components/MyAccount/HealtRecords/HealthTrendsDashBoard';
import Validate from '../helpers/Validate';
import LabOrderService from '../services/LabOrderService';

export default (props) => {

    const [dataSet, setDataSet] = useState();
    const [loading, setLoading] = useState(true);
    const graphRef = useRef(null);
    const validate = Validate();

    let patientHash = props.match.params.patientHash;
    useEffect(() => {
        if(patientHash){
            LabOrderService().shareHealthRecordGraph({ "encodedUrl" : patientHash }).then(response => {
                if (validate.isNotEmpty(response) && validate.isNotEmpty(response.statusCode) && "SUCCESS" === response.statusCode) {
                    if (validate.isNotEmpty(response.dataObject)) {
                        setDataSet(response.dataObject);
                        setTimeout(() => {downloadPdf(response.dataObject)}, 1000);
                        setTimeout(() => {window.location.replace("/")}, 5000);
                    } else {
                        setDataSet(null);
                        // setDashBoardErrorMessage("Not enough data to create a visual representation ")
                    }
                }else {
                    setDataSet(null);
                    // setDashBoardErrorMessage("Not enough data to create a visual representation ")
                }
                setLoading(false);
            }).catch(error => {
                setDataSet(null);
                console.log(error);
                setLoading(false);
                // setDashBoardErrorMessage("Something went wrong, Unable to get graph representation")
            });
        }
    }, []);


    const downloadPdf = (dataSet) => {
        const canvas = graphRef.current.canvas;
        // const selectedPatientId = dataSet.patientId;
        const selectedPatient = dataSet.patient ? dataSet.patient : {};
        const customerName = dataSet.customerName ? dataSet.customerName : "";
        const customerInfo = {
            customerID: selectedPatient.customerId,
            patientName: selectedPatient.patientName,
            patientAge: selectedPatient.age,
            patientGender: selectedPatient.gender,
            name: customerName
        }
        const selectedParameterInfo = {
            parameterCode: dataSet.title,
            parameterName: dataSet.parameterName
        }

        const parameterConditions = {
            parameterDates : [...dataSet.labels],
            parameterValues : [...dataSet.barData.data]
        }
        const content = <PdfContent customerInfo={customerInfo} selectedParameterInfo={selectedParameterInfo} graphImage={canvas.toDataURL('image/png')} bioReferenceRange={dataSet.bioReferenceRange} parameterConditions = {parameterConditions} currentDate={dataSet.currentDate} parameterUnit={dataSet.units}/>
        const footer = renderToStaticMarkup(<PdfFooter />);
        downloadHealthTrendsPdf(renderToStaticMarkup(content), [renderToStaticMarkup(<PdfHeader pdfHeader="Dashboard" />),renderToStaticMarkup(<PdfHeader pdfHeader="Conditions of Reporting" />)], [footer,footer], `${customerInfo.patientName}_${customerInfo.patientAge}.pdf`);
    }


    if(!dataSet){
        return  <React.Fragment>
                    <React.Fragment>
                        <div style={{height : "100vh", width: "100vw"}} className="page-center">
                            <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                            <span className="sr-only"></span>
                        </div>
                    </React.Fragment>
                </React.Fragment>
    }

    return  <React.Fragment>
                <div style={{ height: "100vh", left: "50%", top: "50%", position: "absolute",transform: "translate(-50%, -50%)", zIndex: "1060", width: "100vw" }} className="page-center">
                    <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                    <span className="sr-only"></span>
                </div>
                <div style={{opacity : "0",width:'200mm'}}>
                    <HealthTrendsDashBoard {...dataSet}  ref={graphRef} />
                </div>
            </React.Fragment>
}