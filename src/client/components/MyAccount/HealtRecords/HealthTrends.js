import React, { useEffect, useRef, useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import DoctorCheckoutService from '../../../DoctorConsultation/services/DoctorCheckoutService';
import Validate from '../../../helpers/Validate';
import LabOrderService from '../../../services/LabOrderService';
import CustomerDetails from './CustomerDetails';
import HealthTrendsDashBoard from './HealthTrendsDashBoard';
import Reckoner from './Reckoner';
import LabCheckOutService from '../../MedplusLabs/Services/LabCheckoutService';
import BarGraph, { PdfContent, PdfFooter, PdfHeader, downloadHealthTrendsPdf } from "@medplus/mart-common-components/HealthTrendsPdf";
import { renderToStaticMarkup } from 'react-dom/server';
import CONFIG from '../../../constants/ServerConfig';
import Cookies from 'js-cookie';
import ReckonerGhostImage from './ReckonerGhostImage';
import { DIAGNOSTICS_HOME } from '../../MedplusLabs/constants/LabConstants';
import SocialProfiles from '../../../MedplusMart/components/MartCatalog/ProductDetail/SocialProfiles';
import UserInfoAction from '../../../../redux/action/UserInfoAction';
import LocalDB from '../../../DataBase/LocalDB';

const HealthTrends = (props) => {

    const validate = Validate();
    const labOrderService = LabOrderService();
    const labCheckoutService = LabCheckOutService();
    const userInfoAction = UserInfoAction();
    const doctorCheckoutService = DoctorCheckoutService();
    const [dataSet, setDataSet] = useState(null);
    const [parameterData, setParameterData] = useState(null);
    const [patientDetails, setPatientDetails] = useState(null);
    const [tabIndex, setTabIndex] = useState(0);
    const [initialLoading, setInitialLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [reckonerPatient, setReckonerPatient] = useState({ patientId: '', patientName: '' });
    const [dashboardPatient, setDashboardPatient] = useState({ patientId: '', patientName: '' });
    const [customerSelection, setCustomerSelection] = useState({});
    const [reckonerData, setReckonerData] = useState({});
    const [dashboardErrorMessage, setDashBoardErrorMessage] = useState("To view the report charts please fill in the form given beside");
    const [reckonerErrorMessage, setReckonerErrorMessage] = useState("To view the report please fill in the form given beside");
    const [invalidPatient, setInvalidPatient] = useState(false);
    const [encodedUrl, setEncodedUrl] = useState("");
    const [showSocialIcons , setShowSocialIcons] = useState(false);
    const graphRef = useRef(null);
    const [showChangePatient, setShowChangePatient] = useState(false);
    const [pdfLoader,setPdfLoader] = useState(false);
    const [showPdfGraph,setShowPdfGraph] = useState(false);
    // const [patientDetails, setPatientDetails] = useState({patientId:'', patientName:'',patientAge:'',patientGender:''})

    useEffect(() => {
        getPatientandParameterData();
    }, []);

    useEffect(() => {
        let intervalId = undefined;
        if(showPdfGraph) {
            setPdfLoader(true);
            intervalId =setTimeout(async ()=>{
               await downloadPDFCotent(userInfoAction);
               setShowPdfGraph(false);
               setPdfLoader(false);
            },500);
        }

        return ()=>{
            clearTimeout(intervalId);
        }

    },[showPdfGraph])


    const onSubmitClick = () => {
        const { patientId, parameterId, patientName } = customerSelection;
        setReckonerPatient({ patientId, patientName });
        if (tabIndex == 1) {
            setDashboardPatient({ patientId, patientName });
            if (validate.isEmpty(patientId) || validate.isEmpty(parameterId)) {
                return;
            }
            getGraphData(patientId, parameterId);
        }
        else {
            setReckonerData({});
            getReckonerData(patientId);
        }
    }

    const setCustomerOptions = (option) => {
        let options = { ...customerSelection, ...option };
        const { patientId, patientName } = option;
        if (validate.isNotEmpty(patientId) && validate.isNotEmpty(patientName)) {
            setReckonerPatient(option);
            if (tabIndex == 1) {
                setDashboardPatient(option);
            }
        }
        setCustomerSelection(options);
    }

    const getReckonerData = (patientId) => {
        setLoading(true)
        setShowChangePatient(true)
        labCheckoutService.getReckonerData({ patientId }).then((data) => {
            if (validate.isNotEmpty(data) && "SUCCESS" === data.statusCode) {
                if (validate.isNotEmpty(data.dataObject)) {
                    if (validate.isNotEmpty(data.dataObject.reckonerInfo)) {
                        setReckonerData(data.dataObject.reckonerInfo.testsInfo);
                    } else {
                        setReckonerData({});
                        setReckonerErrorMessage("No past records available for this patient.");
                    }
                    if(validate.isNotEmpty(data.dataObject.encodedUrl)){
                        setEncodedUrl(`${process.env.API_URL}` + "hrs/" + data.dataObject.encodedUrl);
                    } else {
                        setEncodedUrl("");
                    }
                }
            }
            if ("FAILURE" === data.statusCode) {
            	setReckonerData({});
            	setReckonerErrorMessage("No past records available for this patient.");
            }
            setLoading(false)
        }).catch((error) => {
            console.log(error);
            setLoading(false);
            setReckonerErrorMessage("Something went wrong, unable to get records for this patient");

        });
    }

    const getPatientandParameterData = () => {
        setInitialLoading(true);
        labOrderService.getParametersDetails().then(response => {
            if (validate.isNotEmpty(response) && validate.isNotEmpty(response.statusCode) && "SUCCESS" === response.statusCode) {
                if (validate.isNotEmpty(response.dataObject)) {
                    setParameterData(response.dataObject);
                } else {
                    setInitialLoading(false)
                }
            } else {
                setInitialLoading(false)
            }
            setInitialLoading(false);
        }).catch(error => {
            setInitialLoading(false);
            console.log(error);
        });

        doctorCheckoutService.getPatients().then(response => {
            if (validate.isNotEmpty(response) && validate.isNotEmpty(response.statusCode) && "SUCCESS" === response.statusCode) {
                if (validate.isNotEmpty(response.dataObject && validate.isNotEmpty(response.dataObject.members))) {
                    let patientList = response.dataObject.members;
                    if (patientList.length === 1 && validate.isEmpty(patientList[0].patientId)) {
                        setInvalidPatient(true);
                    } else {
                        setInvalidPatient(false);
                        setPatientDetails(patientList)
                    }
                } else {
                    setInitialLoading(false);
                }
            } else {
                setInitialLoading(false);
            }
            setInitialLoading(false);
        }).catch(error => {
            console.log(error);
            setInitialLoading(false);
            setLoading(false)
        });
    }

    const getGraphData = (patientId, parameterId) => {
        setLoading(true);
        labOrderService.getHealthRecordGraph({ patientId, parameterId }).then(response => {
            if (validate.isNotEmpty(response) && validate.isNotEmpty(response.statusCode) && "SUCCESS" === response.statusCode) {
                if (validate.isNotEmpty(response.dataObject)) {
                    setDataSet(response.dataObject);
                    setLoading(false);
                    if(validate.isNotEmpty(response.dataObject.shareEncodedUrl)){
                        setEncodedUrl(`${process.env.API_URL}downloadHealthTrendsPdf/${response.dataObject.shareEncodedUrl}`); 
                    }else{
                        setEncodedUrl(undefined);
                    }
                } else {
                    setLoading(false);
                    setDataSet(null);
                    setDashBoardErrorMessage("Not enough data to create a visual representation ")
                }
            }
            if (response.statusCode === "FAILURE") {
                setDataSet(null);
                setDashBoardErrorMessage("Not enough data to create a visual representation ")
                setLoading(false);
            }
        }).catch(error => {
            setDataSet(null);
            console.log(error);
            setLoading(false);
            setDashBoardErrorMessage("Something went wrong, Unable to get graph representation")

        })


    }

    const printReckonerPdf = () => {
        let token_from_db = LocalDB.getValue("SESSIONID");
        window.open(`${CONFIG.REDIRECT_HOME_URL}labOrderHistory/printReckonerInfoDetails?patientId=${customerSelection.patientId}&&tokenId=${token_from_db}`);
    }

    const downloadPDFCotent = async (userInfoAction) => {
        const canvas = graphRef.current.canvas;
        const selectedPatientId = customerSelection.patientId;
        const selectedPatient = patientDetails.find(eachPatient => eachPatient.patientId == selectedPatientId);
        var userInfo = userInfoAction.getUserInfo();
        const customerName = validate.isNotEmpty(userInfo) ? userInfo.displaybleName:"";
    
        const customerInfo = {
            customerID: selectedPatient.customerId,
            patientName: selectedPatient.patientName,
            patientAge: selectedPatient.age,
            patientGender: selectedPatient.gender,
            name: customerName
        }
        const selectedParameterInfo = {
            parameterCode: dataSet.title,
            parameterName: customerSelection.healthCondition
        }

        const parameterConditions = {
            parameterDates: [...dataSet.labels],
            parameterValues: [...dataSet.barData.data]
        }
        const content = <PdfContent customerInfo={customerInfo} selectedParameterInfo={selectedParameterInfo} graphImage={canvas.toDataURL('image/png')} bioReferenceRange={dataSet.bioReferenceRange} parameterConditions={parameterConditions} currentDate={dataSet.currentDate} parameterUnit={dataSet.units} />
        const footer = renderToStaticMarkup(<PdfFooter />);
         await downloadHealthTrendsPdf(renderToStaticMarkup(content), [renderToStaticMarkup(<PdfHeader pdfHeader="Dashboard" />), renderToStaticMarkup(<PdfHeader pdfHeader="Conditions of Reporting" />)], [footer, footer], `${customerInfo.patientName}_${customerInfo.patientAge}`);
    }

    const loadPatientDetails = () => {
        const index = tabIndex;
        if (validate.isEmpty(dashboardPatient.patientId) && validate.isNotEmpty(reckonerPatient.patientId) && index == 1) {
            setCustomerSelection({ ...customerSelection, ...reckonerPatient });
        }
        else {
            setCustomerSelection({ ...customerSelection, ...dashboardPatient });

        }
    }

    const sendReckonerRequest = (patientDetails) => {
        if (validate.isNotEmpty(patientDetails) && validate.isNotEmpty(patientDetails.patientId)) {
            getReckonerData(patientDetails.patientId);
        }
    }
    if (initialLoading) {
        return <div style={{ "height": "50vh" }} className="page-center">
            <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
            <span className="sr-only"></span>
        </div>
    }

    return (
        <React.Fragment>
            <div className="row m-0">
                {((parameterData || patientDetails) && !invalidPatient) &&
                    <React.Fragment>
                        <CustomerDetails patientDetails={patientDetails} setCustomerOptions={setCustomerOptions} customerSelection={customerSelection} parameterData={parameterData} onSubmitClick={onSubmitClick} tabIndex={tabIndex} reckonerPatientId={reckonerPatient} reckonerData={reckonerData} dashboardPatientId={dashboardPatient.patientId} setReckonerPatient={setReckonerPatient} showChangePatient={showChangePatient} setShowChangePatient={setShowChangePatient} />
                        <div className="col-9 health-trends mb-3">
                            <Tabs selectedIndex={tabIndex} onSelect={index => {
                                setTabIndex(index);
                                loadPatientDetails();
                            }
                            }>
                                <React.Fragment>
                                    <div className="header p-0 mb-0 health-trends-header">
                                        <TabList className="nav nav-pills">
                                            <Tab className="nav-item border-0" title="Reckoner">
                                                <a href="javascript:void(0)" className="nav-link py-3" onClick={() => { sendReckonerRequest(customerSelection) }}>Reckoner</a>
                                            </Tab>
                                            <Tab className="nav-item border-0" title="Dashboard">
                                                <a href="javascript:void(0)" className="nav-link py-3">Dashboard</a>
                                            </Tab>
                                           
                                        </TabList>
                                        {((tabIndex == 1 && dataSet) || (tabIndex == 0 && Validate().isNotEmpty(reckonerData))) && <PdfDownloadButton pdfLoading= {pdfLoader} tabIndex={tabIndex} handleOnClick={() => { tabIndex == 1 ? setShowPdfGraph(true) : printReckonerPdf() }} encodedUrl={encodedUrl} setShowSocialIcons={setShowSocialIcons} />}
                                    </div>
                                </React.Fragment>
                                <TabPanel>
                                    {loading ? <React.Fragment><ReckonerGhostImage /></React.Fragment>
                                        : Validate().isEmpty(reckonerData) ?
                                            <React.Fragment>
                                                <div className="no-health-records body-height">
                                                    <svg className="mb-3" xmlns="http://www.w3.org/2000/svg" width="82.001" height="89.758" viewBox="0 0 82.001 89.758">
                                                        <g opacity="0.301" transform="translate(-9 -5.12)">
                                                            <path d="M12124.362,13264.75l-11.313-11.316a16.971,16.971,0,0,1-16.936.639h-28.992a.985.985,0,0,1-.985-.985v-6.358h-7.4a.988.988,0,0,1-.985-.985v-6.13h-7.768a.988.988,0,0,1-.985-.988v-61.516a.989.989,0,0,1,.985-.989h44.383a.987.987,0,0,1,.985.989v6.129h7.768a.987.987,0,0,1,.989.985v10.8a1.012,1.012,0,0,1-.044.207l8.03,8.113a.988.988,0,0,1,.413.8c0,.033-.017.063-.02.1v19.807a17.048,17.048,0,0,1,6.069,23.881l11.313,11.313a3.823,3.823,0,0,1,.144,5.274.772.772,0,0,1-.063.1l-.144.141a3.851,3.851,0,0,1-5.446,0Zm-9.675-12.465,11.069,11.069a1.933,1.933,0,0,0,2.66,0l.061-.063a1.877,1.877,0,0,0,0-2.66l-11.07-11.07A17.145,17.145,0,0,1,12114.688,13252.285Zm-25.8-13.374a15.147,15.147,0,1,0,15.148-15.146A15.162,15.162,0,0,0,12088.885,13238.911Zm-20.774,13.19h25.023a17.107,17.107,0,0,1,17.385-29.024v-17.948h-11.466a.983.983,0,0,1-.985-.985v-11.59h-29.957Zm-8.383-13.48v6.133h6.408v-53.186a.988.988,0,0,1,.989-.985h31.928c.023,0,.04.01.06.01a1,1,0,0,1,.264.054c.029.013.063.02.093.033a.957.957,0,0,1,.273.187s.007,0,.01.007h0l2.381,2.406v-8.07h-42.408Zm-8.757-.981h6.782v-53.419a.987.987,0,0,1,.985-.985h34.645v-5.141h-42.412Zm49.067-34.482h9.1l-9.1-9.191Zm-8.562,35.754a12.556,12.556,0,1,1,12.558,12.558A12.572,12.572,0,0,1,12091.476,13238.911Zm1.974,0a10.584,10.584,0,1,0,10.584-10.584A10.6,10.6,0,0,0,12093.449,13238.911Zm1.465,1.288a.987.987,0,0,1,1.955-.276,7.261,7.261,0,0,0,7.164,6.209.987.987,0,0,1,0,1.975A9.248,9.248,0,0,1,12094.914,13240.2Zm-22.738,3a.987.987,0,0,1,0-1.974h10.42a.987.987,0,1,1,0,1.974Zm24.11-7.251a.982.982,0,0,1-.413-1.332,9.259,9.259,0,0,1,5.606-4.577.987.987,0,1,1,.546,1.9,7.262,7.262,0,0,0-4.407,3.6.987.987,0,0,1-1.332.413Zm-24.11-3.822a.985.985,0,1,1,0-1.971h14.622a.985.985,0,0,1,0,1.971Zm0-10.973a.986.986,0,1,1,0-1.972h27.5a.986.986,0,0,1,0,1.972Zm0-7.4a.986.986,0,0,1-.986-.985v-14.915a.989.989,0,0,1,.986-.989h12.255a.988.988,0,0,1,.985.989v14.919a.984.984,0,0,1-.985.981Zm.988-1.971h10.281v-12.944h-10.281Z" transform="translate(-12040 -13171)" />
                                                        </g>
                                                    </svg>
                                                    <h6 className="mb-3">{reckonerErrorMessage}</h6>
                                                </div>
                                            </React.Fragment> :
											<React.Fragment>
                                                {showSocialIcons && <SocialProfiles isOpen={showSocialIcons} setIsOpen={setShowSocialIcons} encodedUrl={encodedUrl} shareText={"Share this at"}/>}
                                                <Reckoner reckonerData={reckonerData} />
                                            </React.Fragment>}
                                </TabPanel>
                                <TabPanel>
                                    {showSocialIcons && <SocialProfiles isOpen={showSocialIcons} setIsOpen={setShowSocialIcons} encodedUrl={encodedUrl} shareText={"Share this at"}/>}
                                    {loading ? <div style={{ "height": "50vh" }} className="page-center">
                                        <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                                        <span className="sr-only"></span>
                                    </div> : dataSet ?
                                        <React.Fragment>
                                            <HealthTrendsDashBoard {...dataSet}  customerSelection={customerSelection} parameterData={parameterData[customerSelection.healthCondition]} />
                                        </React.Fragment>
                                        : <React.Fragment>
                                            <div className="no-health-records body-height">
                                                <svg className="mb-3" xmlns="http://www.w3.org/2000/svg" width="82.001" height="89.758" viewBox="0 0 82.001 89.758">
                                                    <g opacity="0.301" transform="translate(-9 -5.12)">
                                                        <path d="M12124.362,13264.75l-11.313-11.316a16.971,16.971,0,0,1-16.936.639h-28.992a.985.985,0,0,1-.985-.985v-6.358h-7.4a.988.988,0,0,1-.985-.985v-6.13h-7.768a.988.988,0,0,1-.985-.988v-61.516a.989.989,0,0,1,.985-.989h44.383a.987.987,0,0,1,.985.989v6.129h7.768a.987.987,0,0,1,.989.985v10.8a1.012,1.012,0,0,1-.044.207l8.03,8.113a.988.988,0,0,1,.413.8c0,.033-.017.063-.02.1v19.807a17.048,17.048,0,0,1,6.069,23.881l11.313,11.313a3.823,3.823,0,0,1,.144,5.274.772.772,0,0,1-.063.1l-.144.141a3.851,3.851,0,0,1-5.446,0Zm-9.675-12.465,11.069,11.069a1.933,1.933,0,0,0,2.66,0l.061-.063a1.877,1.877,0,0,0,0-2.66l-11.07-11.07A17.145,17.145,0,0,1,12114.688,13252.285Zm-25.8-13.374a15.147,15.147,0,1,0,15.148-15.146A15.162,15.162,0,0,0,12088.885,13238.911Zm-20.774,13.19h25.023a17.107,17.107,0,0,1,17.385-29.024v-17.948h-11.466a.983.983,0,0,1-.985-.985v-11.59h-29.957Zm-8.383-13.48v6.133h6.408v-53.186a.988.988,0,0,1,.989-.985h31.928c.023,0,.04.01.06.01a1,1,0,0,1,.264.054c.029.013.063.02.093.033a.957.957,0,0,1,.273.187s.007,0,.01.007h0l2.381,2.406v-8.07h-42.408Zm-8.757-.981h6.782v-53.419a.987.987,0,0,1,.985-.985h34.645v-5.141h-42.412Zm49.067-34.482h9.1l-9.1-9.191Zm-8.562,35.754a12.556,12.556,0,1,1,12.558,12.558A12.572,12.572,0,0,1,12091.476,13238.911Zm1.974,0a10.584,10.584,0,1,0,10.584-10.584A10.6,10.6,0,0,0,12093.449,13238.911Zm1.465,1.288a.987.987,0,0,1,1.955-.276,7.261,7.261,0,0,0,7.164,6.209.987.987,0,0,1,0,1.975A9.248,9.248,0,0,1,12094.914,13240.2Zm-22.738,3a.987.987,0,0,1,0-1.974h10.42a.987.987,0,1,1,0,1.974Zm24.11-7.251a.982.982,0,0,1-.413-1.332,9.259,9.259,0,0,1,5.606-4.577.987.987,0,1,1,.546,1.9,7.262,7.262,0,0,0-4.407,3.6.987.987,0,0,1-1.332.413Zm-24.11-3.822a.985.985,0,1,1,0-1.971h14.622a.985.985,0,0,1,0,1.971Zm0-10.973a.986.986,0,1,1,0-1.972h27.5a.986.986,0,0,1,0,1.972Zm0-7.4a.986.986,0,0,1-.986-.985v-14.915a.989.989,0,0,1,.986-.989h12.255a.988.988,0,0,1,.985.989v14.919a.984.984,0,0,1-.985.981Zm.988-1.971h10.281v-12.944h-10.281Z" transform="translate(-12040 -13171)" />
                                                    </g>
                                                </svg>
                                                <h6 className="mb-3">{dashboardErrorMessage}</h6>
                                            </div></React.Fragment>}
                                </TabPanel>
                            </Tabs>
                        </div>
                        {showPdfGraph ? <PdfGraph {...dataSet}  ref={graphRef} /> : null}
                    </React.Fragment>
                }
            </div>
            {invalidPatient && <div className="div-center no-purchase-history body-height">
                <svg className="mb-3" xmlns="http://www.w3.org/2000/svg" width="85.86" height="92.336" viewBox="0 0 85.86 92.336">
                    <g transform="translate(-24 -6.5)">
                        <path fill="#b1b1b1" d="M324.078,214.427a10.083,10.083,0,0,0,10.072-10.072v-5.188a1.11,1.11,0,1,0-2.221,0v5.188a7.852,7.852,0,1,1-15.7,0v-5.188a1.11,1.11,0,1,0-2.221,0v5.188A10.084,10.084,0,0,0,324.078,214.427Z" transform="translate(-236.342 -156.111)" />
                        <path fill="#b1b1b1" d="M30.927,89.328c.2,0,.4-.011.592-.027H46.793v2.082a7.45,7.45,0,0,0,7.442,7.442H75.982q.163.012.329.012a1.116,1.116,0,1,0,0-2.232h-.235a2.346,2.346,0,0,1-2.107-2.332V81.733h29.358A6.541,6.541,0,0,0,109.86,75.2a1.117,1.117,0,0,0-.011-.153l-5.063-36.327a.1.1,0,0,0,0-.019,3.8,3.8,0,0,0-3.775-3.229H84.956l-1.35-9.682,0-.019a4.322,4.322,0,0,0-4.291-3.67H75.284V18.3a11.8,11.8,0,0,0-23.591,0v3.8H47.664a4.322,4.322,0,0,0-4.29,3.67l0,.019L41.166,41.61a4.3,4.3,0,0,0-1.02-.116,4.05,4.05,0,0,0-2.5.823,2.006,2.006,0,0,1-2.518,0,4.21,4.21,0,0,0-5,0,2,2,0,0,1-2.517,0,4.048,4.048,0,0,0-2.5-.822A1.11,1.11,0,0,0,24,42.6V82.4a6.935,6.935,0,0,0,6.927,6.927Zm5.1-2.248A6.9,6.9,0,0,0,37.854,82.4v-2.85a4.469,4.469,0,1,1,8.939,0V87.08Zm18.2,9.524a5.227,5.227,0,0,1-5.221-5.221V79.552A6.664,6.664,0,0,0,47.3,75.083H66.527A5.227,5.227,0,0,1,71.748,80.3V94.274a4.535,4.535,0,0,0,.641,2.332Zm48.354-57.568,5.052,36.236a4.318,4.318,0,0,1-4.312,4.24h-29.4a7.457,7.457,0,0,0-5.783-6.471l4.74-34a1.594,1.594,0,0,1,1.581-1.345h26.544a1.593,1.593,0,0,1,1.58,1.345ZM53.914,18.3a9.575,9.575,0,1,1,19.15,0v3.8H53.914Zm-8.345,7.81a2.112,2.112,0,0,1,2.1-1.785h4.029v5.942a1.11,1.11,0,1,0,2.221,0V24.321h19.15v5.942a1.11,1.11,0,1,0,2.221,0V24.321h4.029a2.112,2.112,0,0,1,2.1,1.785l1.305,9.365h-8.25A3.8,3.8,0,0,0,70.689,38.7l0,.019-4.76,34.143H56.294V42.6a1.11,1.11,0,0,0-1.11-1.11,4.05,4.05,0,0,0-2.5.823,2.009,2.009,0,0,1-2.519,0,4.211,4.211,0,0,0-5,0,1.885,1.885,0,0,1-1.258.444,1.843,1.843,0,0,1-.644-.1ZM26.221,44.059l.148.1a4.21,4.21,0,0,0,5,0,2.006,2.006,0,0,1,2.518,0,4.21,4.21,0,0,0,5,0,2.007,2.007,0,0,1,2.518,0,4.21,4.21,0,0,0,5,0,2.008,2.008,0,0,1,2.519,0,4.212,4.212,0,0,0,5,0l.149-.1v28.8H42.323a6.7,6.7,0,0,0-6.69,6.69V82.4a4.706,4.706,0,0,1-9.413,0Z" transform="translate(0 0)" />
                        <path fill="#b1b1b1" d="M81.291,266.374a1.11,1.11,0,0,0,1.11,1.11H96.614a1.11,1.11,0,0,0,0-2.221H82.4A1.11,1.11,0,0,0,81.291,266.374Z" transform="translate(-46.69 -210.882)" />
                        <path fill="#b1b1b1" d="M53.529,267.485h2.3a1.11,1.11,0,0,0,0-2.221h-2.3a1.11,1.11,0,0,0,0,2.221Z" transform="translate(-23.16 -210.882)" />
                        <path fill="#b1b1b1" d="M96.614,298H82.4a1.11,1.11,0,0,0,0,2.221H96.614a1.11,1.11,0,1,0,0-2.221Z" transform="translate(-46.69 -237.56)" />
                        <path fill="#b1b1b1" d="M53.529,300.221h2.3a1.11,1.11,0,0,0,0-2.221h-2.3a1.11,1.11,0,0,0,0,2.221Z" transform="translate(-23.16 -237.56)" />
                        <path fill="#b1b1b1" d="M96.614,330.733H82.4a1.11,1.11,0,0,0,0,2.221H96.614a1.11,1.11,0,1,0,0-2.22Z" transform="translate(-46.69 -264.236)" />
                        <path fill="#b1b1b1" d="M53.529,332.954h2.3a1.11,1.11,0,1,0,0-2.22h-2.3a1.11,1.11,0,0,0,0,2.221Z" transform="translate(-23.16 -264.236)" />
                        <path fill="#b1b1b1" d="M53.529,234.751H63.7a1.11,1.11,0,1,0,0-2.221H53.529a1.11,1.11,0,1,0,0,2.221Z" transform="translate(-23.16 -184.205)" />
                        <path fill="#b1b1b1" d="M179.133,396.835a1.338,1.338,0,0,1,1.336,1.336,1.11,1.11,0,1,0,2.221,0,3.562,3.562,0,0,0-2.446-3.377v-.414a1.11,1.11,0,1,0-2.221,0v.414a3.555,3.555,0,0,0,1.11,6.934,1.336,1.336,0,1,1,.019,2.672h-.037a1.337,1.337,0,0,1-1.318-1.335,1.11,1.11,0,1,0-2.221,0,3.561,3.561,0,0,0,2.447,3.377v.525a1.11,1.11,0,1,0,2.221,0v-.525a3.555,3.555,0,0,0-1.11-6.933,1.336,1.336,0,1,1,0-2.672Z" transform="translate(-123.528 -315.201)" />
                        <path fill="#b1b1b1" d="M234.011,453.726H229.96a1.11,1.11,0,0,0,0,2.221h4.051a1.11,1.11,0,1,0,0-2.221Z" transform="translate(-166.944 -364.47)" />
                        <path fill="#b1b1b1" d="M234.011,427.276H229.96a1.11,1.11,0,0,0,0,2.221h4.051a1.11,1.11,0,1,0,0-2.221Z" transform="translate(-166.944 -342.914)" />
                        <path fill="#b1b1b1" d="M234.011,400.827H229.96a1.11,1.11,0,0,0,0,2.221h4.051a1.11,1.11,0,0,0,0-2.221Z" transform="translate(-166.944 -321.36)" />
                    </g>
                </svg>
                <h6 className="mb-3">No Data Found</h6>
                <button className="btn btn-brand-gradient rounded-pill ml-2 px-4 custom-btn-lg" onClick={() => window.location.href = `/${DIAGNOSTICS_HOME}`}>Start Ordering</button>
            </div>}
        </React.Fragment>
    )
}


const PdfGraph = React.forwardRef((props, ref) => {
    return <React.Fragment>
        <div style={{
            position: 'absolute', width: `200mm`,
            left: 0, right: 0, top: 0, height: 'auto', margin: 'auto',
            backgroundColor: 'white'
        }}>
            <div style={{
                position: 'fixed', overflow: 'hidden', zIndex: 1000,
                left: 0, right: 0, bottom: 0, top: 0,
                backgroundColor: 'rgba(0,0,0,0.8)',
                opacity: 0
            }}>
                <div className={props.className} style={{
                    width: '180mm',
                    height: '60mm',
                }}>
                    <BarGraph {...props} ref={ref} />
                </div>

            </div>
        </div>

    </React.Fragment>
});



const PdfDownloadButton = (props) => {


    return (
        <React.Fragment>
            
            <span class="btn-group btn-group-toggle filter-by-container">
                <a href="javascript:void(0)" class="align-items-center btn btn-badge d-flex mx-0  py-2" title="Download Pdf" onClick={props.handleOnClick}>
                   {props.pdfLoading ? <div>
                <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                <span className="sr-only"></span>
            </div> : <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24" height="24" viewBox="0 0 24 24">
                        <g id="downloadPDF-icn" transform="translate(-1734 -1072)" clip-path="url(#clip-path)">
                            <g id="noun-pdf-download-4145717-404040" transform="translate(1737.273 1073.091)">
                                <path id="Path_47164" data-name="Path 47164" d="M292.362,141.208l-4.392,5.06v1.949h1.077v-1.209h4.1v-4.72h8.612v5.928h1.079v-7.009Z" transform="translate(-286.732 -141.208)" fill="#080808" fill-rule="evenodd" />
                                <path id="Path_47165" data-name="Path 47165" d="M247.472,473.015h3.2v.784h-2.26v1.023h1.976v.791h-1.976v1.9h-.94Zm-2.967,0a2.245,2.245,0,0,1,2.084,2.2,2.276,2.276,0,0,1-1.942,2.294h-1.88v-4.493Zm-5.954,0h1.982a1.376,1.376,0,0,1,1.44,1.455,1.343,1.343,0,0,1-1.44,1.408h-1.043v1.631h-.939v-4.493Zm-2.612-1.181v7.027h1.237v5.2l4.477,0-.991-1.079-2.409,0v-4.12h12.712v4.132l-2.413,0-.99,1.079,4.482,0v-5.21h1.239v-7.027Z" transform="translate(-235.94 -463.969)" fill="#080808" fill-rule="evenodd" />
                                <path id="Path_47166" data-name="Path 47166" d="M385.25,555.511h.894c.51,0,.763-.252.763-.67,0-.5-.383-.65-.763-.65h-.894Z" transform="translate(-381.698 -544.367)" fill="#080808" fill-rule="evenodd" />
                                <path id="Path_47167" data-name="Path 47167" d="M561.38,557.146h.778c.94,0,1.163-.813,1.17-1.529.007-.866-.39-1.421-1.251-1.421h-.7Z" transform="translate(-553.638 -544.371)" fill="#080808" fill-rule="evenodd" />
                                <path id="Path_47168" data-name="Path 47168" d="M496.149,804.27v2.8h-1.028v.443l2.574,2.8,2.574-2.8v-.443l-1.029,0v-2.8Z" transform="translate(-488.956 -788.497)" fill="#080808" />
                            </g>
                        </g>
                    </svg>}
                </a>
               {props.encodedUrl && <a class="btn btn-badge mx-0 py-2" onClick={() => props.setShowSocialIcons(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <defs>
                            <clipPath id="clip-path">
                                <rect id="Rectangle_9924" data-name="Rectangle 9924" width="24" height="24" transform="translate(1734 1071)" fill="#e6e6e6"></rect>
                            </clipPath>
                        </defs>
                        <g id="share-icn" transform="translate(-1734 -1071)" clip-path="url(#clip-path)">
                            <path id="share-icn-2" data-name="share-icn" d="M21,11.813a2.794,2.794,0,0,1-2.082-.937l-7.508,4.047c.008.089.027.174.027.265s-.018.164-.025.246l7.518,4.051a2.8,2.8,0,1,1-.742,1.89c0-.038.009-.073.011-.111l-7.584-4.088a2.814,2.814,0,1,1-.015-3.989l7.6-4.095c0-.031-.009-.061-.009-.092A2.813,2.813,0,1,1,21,11.813Z" transform="translate(1731.19 1067.812)" fill="#6c757d" fill-rule="evenodd"></path>
                        </g>
                    </svg>
                </a> }
            </span>
        </React.Fragment>
    );
}

export default HealthTrends

