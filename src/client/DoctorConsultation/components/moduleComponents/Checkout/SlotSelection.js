import React, { useEffect, useState } from "react";
import dateFormat from "dateformat";
import Validate from "../../../../helpers/Validate";
import DoctorCheckoutService from "../../../services/DoctorCheckoutService";
import Alert, { ALERT_TYPE_ERROR } from "../../../../components/Common/Alert";
import { getDisplayTime } from "../../../constants/DoctorConsultationConstants";
import TimeSlotSelection from "../../../../components/MedplusLabs/components/labCheckoutNew/SlotSelection/TimeSlotSelection";
import SlotGhostImage from "../../../../components/MedplusLabs/components/labCheckoutNew/SlotSelection/SlotGhostImage";

const SlotSelection = (props) => {
    
    const validate = Validate();
    const doctorCheckoutService = DoctorCheckoutService();
    
    const [slotDataLoader, setSlotDataLoader] = useState(false);
    const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
    const [isProceedLoading, setProceedLoading] = useState(false);
    const [availableSlots,setAvailableSlots] = useState({});
    const [selectedDateSlot,setSelectedDateSlot] = useState(validate.isNotEmpty(props.selectedSlotDate) ? props.selectedSlotDate : "");
    const [selectedTimeSlot,setSelectedTimeSlot] = useState(validate.isNotEmpty(props.selectedSlot) ? props.selectedSlot : {});
    const [dateSlots, setDateSlots] =  useState([]);
    const [timeSlots,setTimeSlots] = useState({});

    useEffect(() => {
        getSlotsDetails();
    }, []);

    const getSlotsDetails = () => {
        const requestObj = {doctorId : props.doctorId, consultationType : props.consultationType, clinicId : props.selectedClinicId, parentOrderId : props.parentOrderId};
        setSlotDataLoader(true);
        doctorCheckoutService.getDoctorTimingSlots(requestObj).then(response => {
            if (validate.isNotEmpty(response) && response.statusCode === "SUCCESS" && validate.isNotEmpty(response.dataObject)) {
                const slots = prepareSlotsObject(response.dataObject);
                let availableDates = Object.keys(slots);
                setAvailableSlots(slots);
                setDateSlots(availableDates);
                let defaultDate = availableDates.find(date => validate.isNotEmpty(slots[date]) && date);
                if(validate.isNotEmpty(props.selectedSlotDate) && validate.isNotEmpty(props.selectedSlot)){
                    setSelectedDateSlot(props.selectedSlotDate);
                    let timeSlots = slots[props.selectedSlotDate];
                    let selectedSlotId = props.selectedSlot.slotId;
                    segregateTimeSlots(timeSlots, defaultDate);
                    let slotInfo = timeSlots.find((eachSlot) => selectedSlotId == eachSlot.slotId && eachSlot);
                    if (validate.isNotEmpty(slotInfo)) {
                        setSelectedTimeSlot({"displayName": slotInfo.displayName, "slotId": slotInfo.slotId});
                    } else {
                        setSelectedTimeSlot({});
                    }
                } else {
                    setSelectedDateSlot(defaultDate);
                    segregateTimeSlots(slots[defaultDate], defaultDate);
                }
            } else if(validate.isNotEmpty(response) && response.statusCode === "FAILURE") {
                setAlertInfo({ message: response.message, type: ALERT_TYPE_ERROR });
                setTimeout(() => props.history.push("/doctorconsultation"), 2000);
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

    const setSelectedSlotDetail = (slotInfo) => {
        const slotDetail = {"displayName": slotInfo.displayName, "slotId": slotInfo.slotId};
        setSelectedTimeSlot(slotDetail);
        props.setSelectedSlot(slotDetail);
    }

    const prepareSlotsObject = (slotsObject) => {
        let dateSlotMap = {};
        const slotDates = Object.keys(slotsObject);
        slotDates.map(eachDate => {
            const currentSlotList = slotsObject[eachDate];
            const modifiedSlotsList = prepareSlotsList(currentSlotList);
            dateSlotMap[eachDate]= modifiedSlotsList;
        });
        return dateSlotMap;
    }

    const prepareSlotsList = (slotsList) => {
        let modifiedList = [];
        slotsList.map(eachSlot => {
            let modifiedSlot={};
            modifiedSlot["fromTime"] = eachSlot.startTime24Hr;
            modifiedSlot["toTime"] = eachSlot.endTime24Hr;
            modifiedSlot["displayName"] = getDisplayTime(eachSlot);
            modifiedSlot["slotId"] = eachSlot.slotId;
            modifiedSlot["name"] = getDisplayTime(eachSlot);
            modifiedList.push(modifiedSlot);
        });
        return modifiedList;
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
            <main role="main" className=" container-lg container-fluid">
                <section className="shadow-none">
                    <div className="row add-patient-section m-0">
                        {slotDataLoader && <SlotGhostImage />}
                        {!slotDataLoader && validate.isNotEmpty(dateSlots) && <TimeSlotSelection selectedTimeSlot = {selectedTimeSlot} setSelectedTimeSlot ={setSelectedSlotDetail} populateTimeSlots = {populateTimeSlots} timeSlots = {timeSlots} dateSlots={dateSlots} selectedDateSlot = {selectedDateSlot} isForDoctorPage={true} />}
                    </div>
                </section>
            </main>
        </React.Fragment>
    );
}

export default SlotSelection;