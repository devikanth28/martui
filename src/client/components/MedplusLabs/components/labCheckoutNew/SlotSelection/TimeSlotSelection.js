import React from "react";
import Slider from "react-slick";
import moment from "moment";
import Validate from "../../../../../helpers/Validate";

const TimeSlotSelection = (props) => {

    const validate = Validate();

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
        <div className={props.isForDoctorPage ? "col-12 time-slots px-5" : "col-12 time-slots"} >
            {!props.isForDoctorPage &&
                <h6 className="side-title">
                    {/* <span className="text-secondary">Step 02</span> */}
                    <p>Pick a Date &amp; Time</p>
                </h6>
            }
            <div className={props.isForDoctorPage ? "slot-select-slider-container mb-3 doctor-slot" : "slot-select-slider-container mb-3"}>
                <Slider className="slot-select-slider" {...settings}>
                        {validate.isNotEmpty(dateSlots) && dateSlots.map((date, index) =>  <div key={index}>
                        <button type="button" role="button" className={date == props.selectedDateSlot ? 'btn btn-outline-brand slot-btn' : 'btn btn-outline-dark slot-btn'}  onClick={() => props.populateTimeSlots(date)}>
                        <span>{getDate(date)}</span><br/>{getDay(date)}
                            <svg xmlns="http://www.w3.org/2000/svg" width="19.926" height="11.954" viewBox="0 0 19.926 11.954">
                                <path fill="#080808" d="M65.372,527.413a.727.727,0,0,1,1.064,0l4.78,5.552,4.517,5.251c.327.38.016.921-.532.921h-18.6c-.546,0-.859-.54-.532-.921l4.519-5.251Z" transform="translate(-55.941 -527.182)"/>
                            </svg>
                        </button>
                    </div>)}
                </Slider>
            </div>
            {validate.isNotEmpty(timeSlots) ? Object.keys(timeSlots).map((eachShift, index) => validate.isNotEmpty(timeSlots[eachShift]) && 
                <div className={props.isForDoctorPage ? "time-slots-container mb-0 mx-n5" : "time-slots-container mb-0"} key={index}>
                    <div className="label-text pt-2" >
                        {eachShift}
                    </div>
                    {timeSlots[eachShift].map((eachTimeSlot, index) => <div className="each-time-slot" key={index}>
                        <div className={eachTimeSlot.slotId == props.selectedTimeSlot.slotId ? "content selected" : "content"} key={index} onClick={() => props.setSelectedTimeSlot({"displayName": eachTimeSlot.displayName, "slotId": eachTimeSlot.slotId})}>
                            {eachTimeSlot.displayName}
                        </div>
                    </div>)}
                </div>) :
                <div className="time-slots-container">
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
                        <h6 className="mt-3 mb-0">No Time Slots Available</h6>
                    </div>
                </div>
            }
        </div>
    );
}
export default TimeSlotSelection;