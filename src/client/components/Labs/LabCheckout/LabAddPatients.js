import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Validate from "../../../helpers/Validate";
import LabCheckoutService from "../../../services/LabCheckoutService";
import Alert, { ALERT_TYPE_ERROR, ALERT_TYPE_SUCCESS } from "../../Common/Alert";
import moment from "moment";
import LabCheckoutAction from "../../../../redux/action/LabCheckoutAction";
import DeliveryGhostImages from "../../Checkout/Delivery/DeliveryGhostImages";
import CONFIG from "../../../constants/ServerConfig";
import { getDisplayableAge } from "../../../helpers/CommonUtil";

const validate = Validate();
const LabAddPatients = (props) => {

    const [addOrEditPatientInfo,setAddOrEditPatientInfo] = useState("")
    const [patientInfoList,setPatientInfoList] = useState([]);
    const [patientInfo, setPatientInfo] = useState({});
    const [selectedPatientId,setSelectedPatientId] =  useState("");
    const [selectedDateSlot,setSelectedDateSlot] = useState("");
    const [selectedTimeSlot,setSelectedTimeSlot] = useState({});
    const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
    const [dateSlots, setDateSlots] =  useState([]);
    const [timeSlots,setTimeSlots] = useState({});
    const [availableSlots,setAvailableSlots] = useState({});
    const [patientDateLoader, setPatientDataLoader] = useState(false);
    const [errorMsg, setErrorMsg] = useState({});
    const [addPatientCount,setAddPatientCount] = useState(0);
    const [slotDataLoader, setSlotDataLoader] = useState(false);

    const labCheckoutAction = LabCheckoutAction();
    const labCheckoutService = LabCheckoutService();

    useEffect(() => {
        setPatientDataLoader(true);
        setSlotDataLoader(true);
        getPreviousPatientDetails();
        labCheckoutService.getAvailableSlots().then(response => {
            if (validate.isNotEmpty(response) && response.statusCode === "SUCCESS" && response.responseData) {
               let slots = response.responseData;
               let availableDates = Object.keys(slots);
               setAvailableSlots(slots);
               setDateSlots(availableDates);
               let defaultDate = availableDates.find(date => validate.isNotEmpty(slots[date]) && date); 
               let cartObj = labCheckoutAction.getLabShoppingCart();
               let reduxSlotInfo = null;
               if(validate.isNotEmpty(cartObj) && validate.isNotEmpty(cartObj.patientCartsMap)){
                        let reduxPatient = cartObj.patientCartsMap;
                        let prvsSelectedPatientId = Object.keys(reduxPatient)[0];
                        let patientInfo = reduxPatient[prvsSelectedPatientId];
                        if(validate.isNotEmpty(patientInfo.timeSlot)){
                            reduxSlotInfo = patientInfo.timeSlot;
                        }
                }
                if(validate.isNotEmpty(reduxSlotInfo)){
                    setSelectedDateSlot(reduxSlotInfo.slotDate);
                    let timeSlots = slots[reduxSlotInfo.slotDate];
                    let reduxSlotId = reduxSlotInfo.slotId;
                    segregateTimeSlots(timeSlots);
                    let slotInfo = timeSlots.find((eachSlot) => reduxSlotId == eachSlot.slotId && eachSlot);
                    setSelectedTimeSlot({"time":slotInfo.displayName,"slotId":slotInfo.slotId})

                }else{
                    setSelectedDateSlot(defaultDate);
                    segregateTimeSlots(slots[defaultDate]);
                }
            } else if (validate.isNotEmpty(response) && response.statusCode === "FAILURE") {
                let errorMessage = response.message;
                let possibleError = "Select visit Type";
                setTimeout(() => possibleError.toUpperCase() === errorMessage.toUpperCase() && props.history.push("/sampleCollection"), 1500);
                setAlertInfo({ message: errorMessage, type: ALERT_TYPE_ERROR });
                continueShopping();
            } else {
                setAlertInfo({ message: "System experiencing some problem, Please try after some time", type: ALERT_TYPE_ERROR });
            }
            setSlotDataLoader(false);
        }).catch(error => {
            setSlotDataLoader(false);
            console.log(error);
            setAlertInfo({ message: "System experiencing some problem, Please try after some time", type: ALERT_TYPE_ERROR });
        });
    }, [])

    const continueShopping = () => {
        window.location.href = CONFIG.REDIRECT_HOME_URL;                
    }

    const segregateTimeSlots = (slots) => {
        let shiftWiseSlots = {"Morning":[],"Afternoon": [],"Evening":[],"Night":[]};
        if(validate.isNotEmpty(slots)){
            slots.map((eachSlot) => {
                let hour = eachSlot.fromTime.split(":")[0];
                var shift = (hour >= 4  && hour <= 11) ? "Morning" : "";
                shift  += (hour >= 12 && hour <= 16) ? "Afternoon" : "",
                shift  += (hour >= 17 && hour <= 20) ? "Evening" : "",
                shift  += (hour >= 21 || hour <= 3) ?  "Night" : "";
                shiftWiseSlots[shift].push(eachSlot);
            });
        setTimeSlots(shiftWiseSlots);
        }
    }

    const getPreviousPatientDetails = (updatedPatientId) => {
        labCheckoutService.getPreviousPatientDetails().then(response => {
            if (validate.isNotEmpty(response) && response.statusCode === "SUCCESS" && response.responseData) {
                let patientList = response.responseData;
                setPatientInfoList(patientList);
                if(validate.isNotEmpty(patientList)){
                    if(validate.isNotEmpty(updatedPatientId)){
                        let updatedPatientInfo = patientList.find((eachPatient) => updatedPatientId == eachPatient.patientId);
                        setPatientInfoAndId(updatedPatientInfo,updatedPatientId);
                        setAddOrEditPatientInfo("");
                    }else{
                        let cartObj = labCheckoutAction.getLabShoppingCart();
                        if(validate.isNotEmpty(cartObj) && validate.isNotEmpty(cartObj.patientCartsMap)){
                            let reduxPatient = cartObj.patientCartsMap;
                            let prvsSelectedPatientId = Object.keys(reduxPatient)[0];
                            let patientInfo = patientList.find((eachPatient) => prvsSelectedPatientId == eachPatient.patientId);
                            setPatientInfoAndId(patientInfo,prvsSelectedPatientId);
                         }
                    }
                }else{
                    openAddPatientInfoSection();
                }              
            }
            else if (validate.isNotEmpty(response) && response.statusCode === "FAILURE") {
                if(response.message === "Patients Info Not Found"){
                    openAddPatientInfoSection();
                }else{
                    setAlertInfo({ message: response.message, type: ALERT_TYPE_ERROR });
                    continueShopping();
                }
            } else {
                setAlertInfo({ message: "System experiencing some problem, Please try after some time", type: ALERT_TYPE_ERROR });
            }
            setPatientDataLoader(false);
        }).catch(error => {
            setPatientDataLoader(false);
            console.log(error);
            setAlertInfo({ message: "System experiencing some problem, Please try after some time", type: ALERT_TYPE_ERROR });
        });
    }
    const openAddPatientInfoSection = () => {
        setAddOrEditPatientInfo("ADD_PATIENT");
        setPatientInfo({});
    }
    const openEditPatientInfoSection = (patientDetails, event) => {
        event.stopPropagation();
        setAddOrEditPatientInfo("EDIT_PATIENT");
        setPatientInfo(patientDetails);
    }
    const setPatientInfoAndId = (patientInfo,patientId) => {
        setPatientInfo(patientInfo);
        setSelectedPatientId(patientId);
    }

    const setPatientInfoBasedOnId = () => {
        let patientId = selectedPatientId;
        let patientInfo = patientInfoList.find((eachPatient) => patientId == eachPatient.patientId && eachPatient);
        setPatientInfo(patientInfo);
    }
    
    const cancelButtonAction = () => {
        setAddOrEditPatientInfo("");
        setErrorMsg({});
        setPatientInfoBasedOnId();
    }
    
    const addOrUpdatePatientInfo = (patientInfo) => {
        if(validate.isEmpty(patientInfo)) {
            setErrorMsg(errorMsg => ({...errorMsg, ["patientName"]:validate.name(patientInfo.patientName, "Patient Name", 30)}));
            return;
        } else if(validate.isEmpty(patientInfo.patientName) || validate.isNotEmpty(validate.name(patientInfo.patientName, "Patient Name", 30))) {
            setErrorMsg(errorMsg => ({...errorMsg, ["patientName"]:validate.name(patientInfo.patientName, "Patient Name", 30)}));
            return;
        } else if(validate.isEmpty(patientInfo.age) || validate.isNotEmpty(validate.age(patientInfo.age))) {
            setErrorMsg(errorMsg => ({...errorMsg, ["age"]:validate.age(patientInfo.age)}));
            return;
        } else if(validate.isEmpty(patientInfo.gender)) {
            setErrorMsg(errorMsg => ({...errorMsg, ["gender"]:"Please select gender"}));
            return;
        } else if(validate.isEmpty(patientInfo.doctorName) || validate.isNotEmpty(validate.name(patientInfo.doctorName,"Doctor Name", 30))) {
            setErrorMsg(errorMsg => ({...errorMsg, ["doctorName"]:validate.name(patientInfo.doctorName, "Doctor Name", 30)}));
            return;
        } 
        labCheckoutService.saveNewPatientDetails({"patient": JSON.stringify(patientInfo)}).then((response) => {
            if(validate.isNotEmpty(response) && response.statusCode === "SUCCESS" && response.responseData) {
                getPreviousPatientDetails(response.responseData);
                if(addOrEditPatientInfo == "ADD_PATIENT"){
                    setAddPatientCount(addPatientCount+1);
                }
            }else{
                setAlertInfo({message:response.message, type: ALERT_TYPE_ERROR});
            }
        }).catch(error => {
            console.log(error);
            setAlertInfo({message : "System experiencing some problem, Please try after some time",type: ALERT_TYPE_ERROR});
        })
    }
    const disableProceed = () => {
        if(validate.isEmpty(patientInfo) || validate.isEmpty(patientInfo.patientId)){
            return true;
        }
        if(validate.isEmpty(selectedTimeSlot) || validate.isEmpty(selectedTimeSlot["slotId"])){
            return true;
        }
        if(validate.isEmpty(selectedDateSlot)){
            return true;
        }
        return false;
    }
    const savePatinetAndSlotInfoToCart =() =>{
        if(validate.isEmpty(patientInfo) || validate.isEmpty(patientInfo.patientId)){
            let errorMsg = "Please fill patient details";
            if(patientInfoList.length > 0){
                errorMsg="Please select patient details";
            }
            setAlertInfo({message:errorMsg, type: ALERT_TYPE_ERROR});
            return;
        }
        if(validate.isEmpty(selectedTimeSlot) || validate.isEmpty(selectedTimeSlot["slotId"])){
            setAlertInfo({message:"Please select time slot", type: ALERT_TYPE_ERROR});
            return;
        }
        if(validate.isEmpty(selectedDateSlot)){
            setAlertInfo({message:"Please select date slot", type: ALERT_TYPE_ERROR});
            return;
        }
        labCheckoutService.savePatientAndSlotInfoToCart({"patientId":patientInfo.patientId,"timeSlot":JSON.stringify({"slotDate":selectedDateSlot,"slotId":selectedTimeSlot["slotId"], "slotDisplayName":selectedTimeSlot["time"]})}).then(response => {
            if (validate.isNotEmpty(response) && response.statusCode === "SUCCESS" && response.responseData && validate.isNotEmpty(response.responseData.shoppingCart)) {
                let updatedShoppingCart = response.responseData.shoppingCart;
                labCheckoutAction.saveLabShoppingCart(updatedShoppingCart);
                props.history.push("/labsOrderSummary");
            }
            else if (validate.isNotEmpty(response) && response.statusCode === "FAILURE") {
                setAlertInfo({ message: response.message, type: ALERT_TYPE_ERROR });
            } else {
                setAlertInfo({ message: "System experiencing some problem, Please try after some time", type: ALERT_TYPE_ERROR });
            }
        }).catch(error => {
            console.log(error);
            setAlertInfo({ message: "System experiencing some problem, Please try after some time", type: ALERT_TYPE_ERROR });
        });
    }
   
    const goBackAction = () => {
        props.history.push('/sampleCollection');
    }

    const populateTimeSlots = (date) => {
        setSelectedDateSlot(date);
        let slots = availableSlots[date];
        if(validate.isNotEmpty(slots)){
            segregateTimeSlots(availableSlots[date]);
        }else{
            setTimeSlots({})
        }
        setSelectedTimeSlot({});
    }
    return(
        <React.Fragment>
            <Alert alertInfo={alertInfo} duration={5000} onDurationEnd={setAlertInfo}/>
            <main role="main" className="container-fluid container-lg">
                <section>
                    <div className="header"><p>Add Patient &amp; Schedule Slot</p></div>
                    <div className="row add-patient-section m-0">
                        <DeliveryGhostImages homeDeliveryLoader={patientDateLoader} />
                        {!patientDateLoader && <div className="col-4 pr-0">
                            <h6 className="side-title">
                                <span className="text-secondary">Step 01</span>
                                <p>Patient &amp; Doctor Details</p>
                            </h6>
                            {validate.isNotEmpty(patientInfoList) && patientInfoList.length > 0 && validate.isEmpty(addOrEditPatientInfo) &&
                                <div className="select-patient">
                                     <p className="section-title">Last Selected Patients: {addPatientCount <= 5 && <button type="submit" className="btn btn-outline-brand" onClick={() => openAddPatientInfoSection()}>add new patient</button>}</p>
                                    {patientInfoList.map((eachPatient, index) =>
                                        <LabPatientInfo key={index} patientId={eachPatient.patientId} eachPatientInfo={eachPatient} openEditPatientInfo={openEditPatientInfoSection} setSelectedPatientInfo={setPatientInfoAndId} selectedPatientId={selectedPatientId} />
                                    )}
                                </div>
                            }
                            {validate.isNotEmpty(addOrEditPatientInfo) && <AddNewPatinent patientInfo={patientInfo}  setPatientInfo={setPatientInfo} addOrEditPatientInfo={addOrEditPatientInfo} cancelButtonAction={cancelButtonAction} addOrUpdatePatientInfo={addOrUpdatePatientInfo} errorMsg={errorMsg} setErrorMsg={setErrorMsg} patientInfoList={patientInfoList}/>}
                        </div>}
                        <DeliveryGhostImages storePickUpLoader={slotDataLoader} />
                        {!slotDataLoader && validate.isNotEmpty(dateSlots) && <TimeSlotSelection selectedTimeSlot = {selectedTimeSlot} setSelectedTimeSlot ={setSelectedTimeSlot} populateTimeSlots = {populateTimeSlots} timeSlots = {timeSlots} dateSlots={dateSlots} selectedDateSlot = {selectedDateSlot} /> }
                    </div>
                </section>
            </main>
            <footer className="footer fixed-bottom mt-auto py-2">
                <div className="container px-0">
                    <div className="row align-items-center no-gutters">
                        <div className="col-12 text-right">
                            <button type="button" className="brand-secondary btn px-5 rounded-pill custom-btn-lg" onClick={() => goBackAction()}>Back</button>
                            <button type="submit" className="btn btn-brand-gradient ml-3 px-5 rounded-pill custom-btn-lg" disabled={disableProceed()} onClick={() => savePatinetAndSlotInfoToCart()} > Proceed To Order Summary</button>
                        </div>
                    </div>
                </div>
            </footer>
        </React.Fragment>
    )
}

const TimeSlotSelection =(props) => {

    let timeSlots = props.timeSlots;
    let dateSlots = props.dateSlots;

    let todayDate = moment().format('YYYY-MM-DD');
    let tomorrowDate = moment().add(1,'days').format('YYYY-MM-DD');
   
    const getDay = (date) => {
        if(date === todayDate){
            return "Today";
        }else if(date === tomorrowDate){
            return "Tomorrow";
        }else{
            return moment(date).format("dddd");
        }
    }

    const getDate = (date) => {
        return moment(date).format("DD MMM");
    }
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        initialSlide: dateSlots.indexOf(props.selectedDateSlot) > 0 ? dateSlots.indexOf(props.selectedDateSlot)-1 : dateSlots.indexOf(props.selectedDateSlot),
        slidesToShow: 4,
        slidesToScroll: 4,
        swipe: false,
        variableWidth: true,
        arrows: true
      };

    
    return(
        <div className="col-8 time-slots">
        <h6 className="side-title">
            <span className="text-secondary">Step 02</span>
            <p>Schedule Date &amp; Time Slot</p>
        </h6>
        <div className="slot-select-slider-container mb-3">
            <Slider className="slot-select-slider" {...settings}>
                    {validate.isNotEmpty(dateSlots) && dateSlots.map((date, index) =>  <div key={index}>
                    <button  className={date == props.selectedDateSlot ? 'btn btn-outline-brand slot-btn' : 'btn btn-outline-dark slot-btn'}  onClick={() => props.populateTimeSlots(date)}>
                    <span>{getDate(date)}</span><br/>{getDay(date)}
                        <svg xmlns="http://www.w3.org/2000/svg" width="19.926" height="11.954" viewBox="0 0 19.926 11.954">
                            <path fill="#080808" d="M65.372,527.413a.727.727,0,0,1,1.064,0l4.78,5.552,4.517,5.251c.327.38.016.921-.532.921h-18.6c-.546,0-.859-.54-.532-.921l4.519-5.251Z" transform="translate(-55.941 -527.182)"/>
                        </svg>
                    </button>
                </div>)}
            </Slider>
        </div>
            {validate.isNotEmpty(timeSlots) ? Object.keys(timeSlots).map((eachShift, index) => validate.isNotEmpty(timeSlots[eachShift]) && <div className="time-slots-container mb-0" key={index}>
                <div className="label-text pt-2" >
                    {eachShift}
                </div>
                {timeSlots[eachShift].map((eachTimeSlot, index) => <div className="each-time-slot" key={index}>
                    <div className={eachTimeSlot.displayName == props.selectedTimeSlot["time"] ? "content selected" : "content"} key={index} onClick={() => props.setSelectedTimeSlot({ "time": eachTimeSlot.displayName, "slotId": eachTimeSlot.slotId })}>
                        {eachTimeSlot.displayName}
                    </div>
                </div>)}
            </div>) : <div className="time-slots-container">
                <div className="align-items-center d-flex flex-column justify-content-center my-5 w-100">
                    <svg xmlns="http://www.w3.org/2000/svg" width="92" height="73" viewBox="0 0 92 73">
                        <g transform="translate(-4 -13.88)">
                            <path fill="#cecece" d="M23.27,60.43H10.95a1,1,0,0,0-1,1v9.23a1,1,0,0,0,1,1H23.27a1,1,0,0,0,1-1V61.43A1,1,0,0,0,23.27,60.43Zm-1,9.23H11.95V62.43H22.27Z" transform="translate(0 0.572)" />
                            <path fill="#cecece" d="M23.27,46.03H10.95a1,1,0,0,0-1,1v9.23a1,1,0,0,0,1,1H23.27a1,1,0,0,0,1-1V47.03A1,1,0,0,0,23.27,46.03Zm-1,9.23H11.95V48.03H22.27Z" transform="translate(0 0.395)" />
                            <path fill="#cecece" d="M23.27,31.62H10.95a1,1,0,0,0-1,1v9.23a1,1,0,0,0,1,1H23.27a1,1,0,0,0,1-1V32.62A1,1,0,0,0,23.27,31.62Zm-1,9.23H11.95V33.62H22.27Z" transform="translate(0 0.218)" />
                            <path fill="#cecece" d="M42.11,60.43H29.79a1,1,0,0,0-1,1v9.23a1,1,0,0,0,1,1H42.11a1,1,0,0,0,1-1V61.43A1,1,0,0,0,42.11,60.43Zm-1,9.23H30.79V62.43H41.11Z" transform="translate(0 0.572)" />
                            <path fill="#cecece" d="M42.11,46.03H29.79a1,1,0,0,0-1,1v9.23a1,1,0,0,0,1,1H42.11a1,1,0,0,0,1-1V47.03A1,1,0,0,0,42.11,46.03Zm-1,9.23H30.79V48.03H41.11Z" transform="translate(0 0.395)" />
                            <path fill="#cecece" d="M42.11,31.62H29.79a1,1,0,0,0-1,1v9.23a1,1,0,0,0,1,1H42.11a1,1,0,0,0,1-1V32.62A1,1,0,0,0,42.11,31.62Zm-1,9.23H30.79V33.62H41.11Z" transform="translate(0 0.218)" />
                            <path fill="#cecece" d="M55.55,69.66H49.61V62.43h5.32c.02,0,.04-.01.07-.01a1,1,0,0,0-.07-1.99H48.61a1,1,0,0,0-1,1v9.23a1,1,0,0,0,1,1h6.93a1,1,0,0,0,1-1A.988.988,0,0,0,55.55,69.66Z" transform="translate(0 0.572)" />
                            <path fill="#cecece" d="M55.55,55.26H49.62V48.03H59.94v2.36a.983.983,0,0,0,.33.73.99.99,0,0,0,1.67-.73V47.03a1,1,0,0,0-1-1H48.62a1,1,0,0,0-1,1v9.23a1,1,0,0,0,1,1h6.93a1,1,0,0,0,1-1,.983.983,0,0,0-.33-.73A.945.945,0,0,0,55.55,55.26Z" transform="translate(0 0.395)" />
                            <path fill="#cecece" d="M48.62,42.85H60.94a1,1,0,0,0,1-1V32.62a1,1,0,0,0-1-1H48.62a1,1,0,0,0-1,1v9.23A1,1,0,0,0,48.62,42.85Zm1-9.23H59.94v7.23H49.62Z" transform="translate(0 0.218)" />
                            <path fill="#cecece" d="M67.46,42.85H79.78a1,1,0,0,0,1-1V32.62a1,1,0,0,0-1-1H67.46a1,1,0,0,0-1,1v9.23A1,1,0,0,0,67.46,42.85Zm1-9.23H78.78v7.23H68.46Z" transform="translate(0 0.218)" />
                            <path fill="#cecece" d="M96,65.42a19.163,19.163,0,0,0-8.93-16.207V19.993a1.008,1.008,0,0,0-1-1.01H75.97V14.89a1.008,1.008,0,0,0-1-1.01H68.75a1.008,1.008,0,0,0-1,1.01v4.092H23.31V14.89a1.008,1.008,0,0,0-1-1.01H16.09a1.008,1.008,0,0,0-1,1.01v4.092H5a1.008,1.008,0,0,0-1,1.01v58.6a1.008,1.008,0,0,0,1,1.01H64.42c.26.232.51.475.78.7l-.72,2a3.416,3.416,0,0,0,.12,2.607,3.369,3.369,0,0,0,1.91,1.768,3.371,3.371,0,0,0,2.59-.121,3.377,3.377,0,0,0,1.75-1.93l.37-1.02a18.523,18.523,0,0,0,5.87.95,18.812,18.812,0,0,0,5.87-.95l.37,1.02a3.4,3.4,0,0,0,3.18,2.253,3.287,3.287,0,0,0,1.15-.2A3.436,3.436,0,0,0,89.69,82.3l-.72-2A19.231,19.231,0,0,0,96,65.42ZM87.79,82.98a1.4,1.4,0,0,1-.05,1.061,1.368,1.368,0,0,1-.78.717h0a1.38,1.38,0,0,1-1.77-.839l-.38-1.071A18.621,18.621,0,0,0,87.26,81.5Zm.07-4.375c-.26.222-.55.424-.82.626-.31.222-.62.445-.94.647a17.709,17.709,0,0,1-1.71.96c-.35.172-.7.333-1.06.475-.32.131-.65.253-.98.364a16.929,16.929,0,0,1-4.26.808v-2.4a.974.974,0,0,0-.14-.475.958.958,0,0,0-1.72,0,.974.974,0,0,0-.14.475v2.395a16.493,16.493,0,0,1-4.26-.808c-.33-.111-.66-.232-.98-.364-.35-.141-.69-.3-1.03-.465a18.276,18.276,0,0,1-1.74-.97c-.15-.091-.3-.172-.45-.273-.17-.121-.33-.253-.5-.374-.28-.2-.56-.4-.82-.626l-.01-.01c-.38-.323-.75-.657-1.1-1.01A17.179,17.179,0,0,1,60.21,66.43h2.37a1.01,1.01,0,0,0,0-2.021H60.2A17.022,17.022,0,0,1,76.08,48.364v2.395a1,1,0,1,0,2,0V48.364a16.632,16.632,0,0,1,7,1.99c.34.182.67.394,1,.606s.67.445,1,.687a17.137,17.137,0,0,1,6.88,12.761H91.59a1.01,1.01,0,0,0,0,2.021h2.37A17.173,17.173,0,0,1,87.86,78.6ZM68.96,83.93a1.376,1.376,0,0,1-1.77.839,1.4,1.4,0,0,1-.78-.717,1.35,1.35,0,0,1-.05-1.061l.53-1.465a18.622,18.622,0,0,0,2.45,1.344ZM6,77.584V21h9.1V25.1a1.008,1.008,0,0,0,1,1.01h6.22a1.008,1.008,0,0,0,1-1.01V21H67.76V25.1a1.008,1.008,0,0,0,1,1.01h6.22a1.008,1.008,0,0,0,1-1.01V21h9.1V48.122a18.637,18.637,0,0,0-8-1.819,19.153,19.153,0,0,0-14.6,31.281ZM17.09,15.9h4.22v8.184H17.09Zm52.67,0h4.22v8.184H69.76Z" />
                            <path fill="#cecece" d="M85.04,51.84a.992.992,0,0,0-1.37.33l-7.44,12.2a1,1,0,0,0,.18,1.26l5.66,5.13a1.008,1.008,0,0,0,.67.26,1,1,0,0,0,.67-1.74L78.37,64.7l6.72-11.01.29-.48a1,1,0,0,0-.29-1.34A.062.062,0,0,1,85.04,51.84Z" transform="translate(0 0.536)" />
                        </g>
                    </svg>
                    <h6 className="mt-3 mb-0"> No Time Slots Available</h6>
                </div>
            </div>}
    </div>
    );
}

const AddNewPatinent = (props) => {

    let addOrEditPatientInfo = props.addOrEditPatientInfo;
    let patientInfo = props.patientInfo;
    let setPatientInfo = props.setPatientInfo;
    let errorMsg = props.errorMsg;
    let setErrorMsg = props.setErrorMsg;

    const handleInputChange = event => {
        let feildName = event.target.name;
        let feildValue = event.target.value;
        let errMsg = patientInfoValidation(event);
        if (errMsg)  {
            setErrorMsg(errorMsg => ({...errorMsg, [feildName]:errMsg}));
        } else {
            setErrorMsg({...errorMsg,[feildName]: ''});
        }
        setPatientInfo({...patientInfo, [feildName]: feildValue});
    }
    const patientInfoValidation = e => {
        if (e.target.name.indexOf('patientName') > -1) {
            return validate.name(e.target.value,"Patient Name", 30);
        }
        if (e.target.name.indexOf('doctorName') > -1) {
            return validate.name(e.target.value, "Doctor Name", 30);
        }
        if (e.target.name.indexOf('age') > -1) {
            return validate.age(e.target.value);
        }
    }
    const setGenderInPatientInfo = (gender) => {
        setPatientInfo({...patientInfo, "gender": gender});
    }

    return (
        <div className="add-newaddress p-0 pb-3">
            <p className="title">{addOrEditPatientInfo && addOrEditPatientInfo === 'ADD_PATIENT' ? 'New Patient' : 'Edit Patient'}</p>
            <div className="form-div">
                <div className="form-group has-float-label">
                    <input type="text" className={`form-control ${errorMsg['patientName'] ? 'is-invalid' : ''}`} id="patientName" name="patientName" placeholder=" " required="" onBlur={(e) => { e.target.placeholder = " "; handleInputChange(e) }} onChange={handleInputChange} value={patientInfo && patientInfo.patientName ? patientInfo.patientName : ''} maxLength="30" autoComplete="off" onFocus={(e) => e.target.placeholder = ""} />
                    <label className="select-label" htmlFor="patientName">Patient Name</label>
                    <div className="invalid-feedback d-block">
                        {errorMsg['patientName']}
                    </div>
                </div>
                <div className="d-flex justify-content-between mb-4">
                    <div className="" style={{ width: "100px" }}>
                        <div className="form-group has-float-label mb-0">
                            <input type="text" className={`form-control ${errorMsg['age'] ? 'is-invalid' : ''}`} id="age" name="age" placeholder=" " required="" onBlur={(e) => { e.target.placeholder = " "; handleInputChange(e) }} onChange={handleInputChange} value={patientInfo && patientInfo.age ? patientInfo.age : ''} onFocus={(e) => e.target.placeholder = ""} maxLength="2" autoComplete="off" />
                            <label htmlFor="Age" className="select-label">Age</label>
                            <div className="invalid-feedback d-block">
                                {errorMsg['age']}
                            </div>
                        </div>
                    </div>
                    <div className="d-inline-block ml-3">
                        <p className="label-text">Gender</p>
                        <div className="btn-group btn-group-toggle" data-toggle="buttons">
                            <button title="Male" className={patientInfo.gender == "M" ? "btn btn-badge mr-0 active" : "btn btn-badge mr-0"} onClick={() => setGenderInPatientInfo("M")}>
                                {/* <input type="radio" name="gender" id="male" value="M"  /> Male */} Male
                            </button>
                            <button title="Female" className={patientInfo.gender == "F" ? "btn btn-badge mr-0 active" : "btn btn-badge mr-0"} onClick={() => setGenderInPatientInfo("F")}>
                                {/* <input type="radio" name="gender" id="female" value="F"  /> Female */} Female
                            </button>
                        </div>
                    </div>
                </div>
                <div className="form-group has-float-label">
                    <input type="text" className={`form-control ${errorMsg['doctorName'] ? 'is-invalid' : ''}`} id="doctorName" name="doctorName" placeholder=" " required="" onBlur={(e) => { e.target.placeholder = " "; handleInputChange(e) }} onChange={handleInputChange} value={patientInfo && patientInfo.doctorName ? patientInfo.doctorName : ''} maxLength="30" autoComplete="off" onFocus={(e) => e.target.placeholder = ""} />
                    <label className="select-label" htmlFor="doctorName">Doctor Name</label>
                    <div className="invalid-feedback d-block">
                        {errorMsg['doctorName']}
                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-betwween mt-3 flex-row-reverse">
                <div className="w-50">
                    <button type="button" className="btn btn-block btn-brand-gradient px-5" onClick={() => props.addOrUpdatePatientInfo(patientInfo)}>{addOrEditPatientInfo === 'ADD_PATIENT' ? 'Save' : 'Update'}</button>
                </div>
                {validate.isNotEmpty(props.patientInfoList) && <div className="w-50 mr-3">
                    <button type="button" className="btn btn-block brand-secondary px-5" onClick={() => props.cancelButtonAction()}>cancel</button>
                </div>}
            </div>
        </div>
    );
}

const LabPatientInfo = (props) => {
    const patientInfo = props.eachPatientInfo;
    const defsCss = `.a{fill:none;}.b{fill:#404040;}`;
    var activeClass = props.selectedPatientId == props.patientId? 'active' : '';

    const getAgeGender = () => {
        let ageGender = "";
        let gender = {"M":"Male","F":"Female"};
        if(validate.isNotEmpty(patientInfo.dateOfBirth)){
            ageGender += getDisplayableAge(patientInfo.dateOfBirth);
        }
        if(validate.isNotEmpty(patientInfo.gender) && validate.isNotEmpty(gender[patientInfo.gender])){
            ageGender += gender[patientInfo.gender];
        }
        return ageGender;
    };

    return (
       <React.Fragment>
          {patientInfo &&
             <address id="address-elm" className={activeClass} onClick={(e) => props.setSelectedPatientInfo(patientInfo,props.patientId)}>
                <p className="title-with-btn">
                   {patientInfo.title}{patientInfo.patientName}
                   <a className="btn btn-link-blue btn-sm" onClick={(e) => props.openEditPatientInfo(patientInfo, e, props.patientId)} >
                      <svg className="align-baseline" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                        <defs>
                           <style>{defsCss}</style>
                        </defs>
                        <g transform="translate(-180.258 -249.086)">
                            <rect className="a" width="24" height="24" transform="translate(180.258 249.086)"/>
                            <path className="b" d="M-4845.372-664.182a3.693,3.693,0,0,1-3.687-3.689v-14.523a3.693,3.693,0,0,1,3.687-3.689h4.678a.806.806,0,0,1,.8.806.806.806,0,0,1-.8.806h-4.682a2.088,2.088,0,0,0-2.074,2.083v14.517a2.091,2.091,0,0,0,2.069,2.085h14.518a2.089,2.089,0,0,0,2.086-2.085v-4.678a.8.8,0,0,1,.8-.8.8.8,0,0,1,.8.8v4.678a3.692,3.692,0,0,1-3.688,3.689Zm4.178-6.9a1.377,1.377,0,0,1-.838-.655,1.373,1.373,0,0,1-.131-1.053l.929-3.288a.809.809,0,0,1,.2-.359l10.881-10.88a2.983,2.983,0,0,1,2.116-.865,2.983,2.983,0,0,1,2.114.863,3.014,3.014,0,0,1,0,4.231l-10.847,10.878a.815.815,0,0,1-.371.2l-3.259.918-.417.056A1.422,1.422,0,0,1-4841.194-671.082Zm1.468-4.4-.8,2.721,2.7-.731.03-.01,9.2-9.229.085-.085-1.951-1.952Zm10.777-10.759-.359.323,1.936,1.939.287-.231.012-.011a1.4,1.4,0,0,0-.011-1.951,1.4,1.4,0,0,0-.972-.394A1.389,1.389,0,0,0-4828.949-686.236Z" transform="translate(5029.317 937.267)"/>
                        </g>
                      </svg>
                      Edit
                   </a>
                </p>
                <p className="title small mb-2"><span className="font-weight-normal">Age / Gender: </span>{getAgeGender()}</p>
                {validate.isNotEmpty(patientInfo.doctorName) &&  <p className="title small"><span className="font-weight-normal">Doctor Name: </span>{patientInfo.doctorName}</p>}
             </address>
          }
       </React.Fragment>
    )
 }
export default LabAddPatients;