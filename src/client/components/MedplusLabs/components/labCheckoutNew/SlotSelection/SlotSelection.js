import React, { useEffect, useState } from "react";
import dateFormat from "dateformat";
import Validate from "../../../../../helpers/Validate";
import LabCheckoutService from "../../../Services/LabCheckoutService";
import Alert, { ALERT_TYPE_ERROR } from "../../../../Common/Alert";
import LabNewCheckoutAction from '../../../redux/action/LabNewCheckoutAction';
import TimeSlotSelection from "./TimeSlotSelection";
import SlotGhostImage from "./SlotGhostImage";
import { DIAGNOSTICS_URL_PREFIX } from "../../../constants/LabConstants";

const SlotSelection = (props) => {
    
    const validate = Validate();
    const labNewCheckoutAction = LabNewCheckoutAction();
    const labCheckoutService = LabCheckoutService();
    const visitType = labNewCheckoutAction.getVisitType();
    
    const [slotDataLoader, setSlotDataLoader] = useState(false);
    const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
    const [isProceedLoading, setProceedLoading] = useState(false);
    const [availableSlots,setAvailableSlots] = useState({});
    const [selectedDateSlot,setSelectedDateSlot] = useState("");
    const [selectedTimeSlot,setSelectedTimeSlot] = useState({});
    const [dateSlots, setDateSlots] =  useState([]);
    const [timeSlots,setTimeSlots] = useState({});

    useEffect(() => {
        if(validate.isEmpty(visitType)){
            setAlertInfo({ message: "Visit Type is Empty", type: ALERT_TYPE_ERROR });
            props.history.push(`${DIAGNOSTICS_URL_PREFIX}/sample-collection`);
        }
        getSlotsDetails();
    }, []);

    const getSlotsDetails = () => {
        setSlotDataLoader(true);
        labCheckoutService.getSlotsDetails({homeOrLab : visitType}). then(response => {
            if (validate.isNotEmpty(response) && response.statusCode === "SUCCESS" && response.responseData) {
               let slots = response.responseData.availableTimeSlotsMap;
               let availableDates = Object.keys(slots);
               setAvailableSlots(slots);
               setDateSlots(availableDates);
               let defaultDate = availableDates.find(date => validate.isNotEmpty(slots[date]) && date); 
                let selectedSlotInfo = response.responseData.selectedSlotInfo;
                if(validate.isNotEmpty(selectedSlotInfo)){
                    setSelectedDateSlot(selectedSlotInfo.slotDate);
                    let timeSlots = slots[selectedSlotInfo.slotDate];
                    let selectedSlotId = selectedSlotInfo.slotId;
                    segregateTimeSlots(timeSlots, defaultDate);
                    let slotInfo = timeSlots.find((eachSlot) => selectedSlotId == eachSlot.slotId && eachSlot);
                    if (validate.isNotEmpty(slotInfo)) {
                        setSelectedTimeSlot({"displayName": slotInfo.displayName, "slotId": slotInfo.slotId})
                    } else {
                        setSelectedTimeSlot({});
                    }

                }else{
                    setSelectedDateSlot(defaultDate);
                    segregateTimeSlots(slots[defaultDate], defaultDate);
                }
            } else if(validate.isNotEmpty(response) && response.statusCode === "FAILURE") {
                setAlertInfo({ message: response.message, type: ALERT_TYPE_ERROR });
                if(response.message === "Select visit Type" || response.message === "Time Slots Not Found" || response.message === "Please select sample CollectionCenter") {
                    props.history.push(`${DIAGNOSTICS_URL_PREFIX}/sample-collection`);
                } else if(response.message === "Lab Shopping Cart is empty"){
                    props.history.replace(`${DIAGNOSTICS_URL_PREFIX}/lab-shopping-cart`);
                }
            } else {
                setAlertInfo({ message: "System experiencing some problem, Please try after some time", type: ALERT_TYPE_ERROR });
            }
            setSlotDataLoader(false);
        }).catch(error => {
            console.log(error);
            setSlotDataLoader(false);
            setAlertInfo({ message: "System experiencing some problem, Please try after some time", type: ALERT_TYPE_ERROR });
        });
    }

    const segregateTimeSlots = (slots, date) => {
        if(validate.isEmpty(slots)) {
            return;
        }
        let shiftWiseSlots = { "Morning": [], "Afternoon": [], "Evening": [] };
        let dateStr = date ? date.replace(/-/g, "/") : dateFormat(new Date());
        let twelveNoonTime = new Date(dateStr).setHours(12, 0, 0, 0);
        let sixPmTime = new Date(dateStr).setHours(18, 0, 0, 0);
        slots.map(each => {
            let eachSlotTime = new Date(`${dateStr} ${each.fromTime}`).getTime();
            if (eachSlotTime < twelveNoonTime) {
                shiftWiseSlots['Morning'].push(each);
            } else if (eachSlotTime < sixPmTime) {
                shiftWiseSlots['Afternoon'].push(each);
            } else {
                shiftWiseSlots['Evening'].push(each);
            }
            setTimeSlots(shiftWiseSlots);
        });
    }

    const isProceedAllowed = () => {
        if(validate.isEmpty(selectedTimeSlot) || validate.isEmpty(selectedTimeSlot.slotId)) {
            return false;
        }
        if(validate.isEmpty(selectedDateSlot)){
            return false;
        }
        return true;
    }

    const addSlotInfoToCart = () => {
        if(validate.isEmpty(selectedDateSlot)){
            setAlertInfo({message:"Please select date slot", type: ALERT_TYPE_ERROR});
            return;
        }
        if(validate.isEmpty(selectedTimeSlot) || validate.isEmpty(selectedTimeSlot.slotId)){
            setAlertInfo({message:"Please select time slot", type: ALERT_TYPE_ERROR});
            return;
        }
        setTimeSlotToCart();
    }

    const setTimeSlotToCart = () => {
        setProceedLoading(true);
        let timeSlot = {"slotDate": selectedDateSlot, "slotId": selectedTimeSlot.slotId, "slotDisplayName": validate.isNotEmpty(selectedTimeSlot.slotDisplayName) ? selectedTimeSlot.slotDisplayName : selectedTimeSlot.displayName};
        let requestObject = {visitType: visitType, homeOrLab: visitType, timeSlot: JSON.stringify(timeSlot)};
        labCheckoutService.setTimeSlotToCart(requestObject).then(response => {
            if (validate.isNotEmpty(response) && response.statusCode === "SUCCESS") {
                addSampleCollectionInfoToCart();
            } else if (validate.isNotEmpty(response) && response.statusCode === "FAILURE") {
                setProceedLoading(false);
                setAlertInfo({ message: response.message, type: ALERT_TYPE_ERROR });
                if(response.message === "Lab Shopping Cart is empty"){
                    props.history.replace(`${DIAGNOSTICS_URL_PREFIX}/lab-shopping-cart`);
                }
            } else {
                setProceedLoading(false);
                setAlertInfo({ message: "System experiencing some problem, Please try after some time", type: ALERT_TYPE_ERROR });
            }
        }).catch(error => {
            console.log(error);
            setProceedLoading(false);
            setAlertInfo({ message: "System experiencing some problem, Please try after some time", type: ALERT_TYPE_ERROR });
        });
    }

    const addSampleCollectionInfoToCart = () => {
        setProceedLoading(true);
        labCheckoutService.addSampleCollectionInfoToCart({visitType: visitType}).then(response => {
            setProceedLoading(false);
            if(validate.isNotEmpty(response) && response.statusCode === "SUCCESS") {
                props.history.push(`${DIAGNOSTICS_URL_PREFIX}/lab-review-cart`);
            } else if (validate.isNotEmpty(response) && response.statusCode === "FAILURE") {
                setAlertInfo({ message: response.message, type: ALERT_TYPE_ERROR });
                if(response.message === "Lab Shopping Cart is empty"){
                    props.history.replace(`${DIAGNOSTICS_URL_PREFIX}/lab-shopping-cart`);
                }
            }
        }).catch(function(error){
            console.error(error);
            setProceedLoading(false);
            setAlertInfo({ message: "System experiencing some problem, Please try after some time", type: ALERT_TYPE_ERROR });
        });   
    }
   
    const populateTimeSlots = (date) => {
        setSelectedDateSlot(date);
        let slots = availableSlots[date];
        if(validate.isNotEmpty(slots)){
            segregateTimeSlots(availableSlots[date], date);
        }else{
            setTimeSlots({})
        }
        setSelectedTimeSlot({});
    }

    return(
        <React.Fragment>
            {alertInfo && alertInfo.message && <Alert alertInfo={alertInfo} duration={5000} onDurationEnd={setAlertInfo}/>}
            <main role="main" className="container-lg container-fluid">
                <section>
                    <div className="header"><p>Select a time slot</p></div>
                    <div className="row add-patient-section m-0">
                        {slotDataLoader && <SlotGhostImage />}
                        {!slotDataLoader && validate.isNotEmpty(dateSlots) && <TimeSlotSelection selectedTimeSlot = {selectedTimeSlot} setSelectedTimeSlot ={setSelectedTimeSlot} populateTimeSlots = {populateTimeSlots} timeSlots = {timeSlots} dateSlots={dateSlots} selectedDateSlot = {selectedDateSlot} isForDoctorPage={false}/> }
                    </div>
                </section>
            </main>
            <footer className="footer fixed-bottom mt-auto py-2">
                <div className="container-lg container-fluid  px-0 px-sm-3">
                    <div className="row align-items-center no-gutters">
                        <div className="col-12 text-right">
                            <button type="button" role="button" className="brand-secondary btn px-5 rounded-pill custom-btn-lg" disabled={isProceedLoading} onClick={() => props.history.push(`${DIAGNOSTICS_URL_PREFIX}/sample-collection`)}>Back</button>
                            <button type="submit" role="button" className="btn btn-brand-gradient rounded-pill px-5 ml-3 custom-btn-lg" disabled={!isProceedAllowed()} onClick={() => addSlotInfoToCart()} > 
                                {isProceedLoading ? "" : "Proceed To Order Summary"}
                                    {isProceedLoading &&
                                        <React.Fragment>
                                            <div className="spinner-loader">
                                            <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                                            <span className="sr-only"></span>
                                            </div>
                                        </React.Fragment>
                                    }
                            </button>
                        </div>
                    </div>
                </div>
            </footer>
        </React.Fragment>
    )
}

export default SlotSelection;