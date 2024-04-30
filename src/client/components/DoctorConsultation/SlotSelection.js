import React from "react"
import Slider from "react-slick";

const SlotSelection = (props) => {
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        //       initialSlide: 1,
        slidesToShow: 4,
        slidesToScroll: 4,
        swipe: false,
        variableWidth: true,
        arrows: true
    };
    return (
        <React.Fragment>
            <div className="px-2">
                <section className="shadow-none">
                    {/* <div className="header"><p>Schedule A Slot</p></div> */}
                    <div className="row add-patient-section m-0">
                        <div className="col-12 time-slots px-5">
                            <div className="slot-select-slider-container mb-3 doctor-slot">
                                <Slider className="slot-select-slider" {...settings}>
                                    <div>
                                        <button className='btn btn-outline-brand slot-btn'>
                                            <span>24 Nov</span><br />Today
                                            <svg xmlns="http://www.w3.org/2000/svg" width="19.926" height="11.954" viewBox="0 0 19.926 11.954">
                                                <path fill="#080808" d="M65.372,527.413a.727.727,0,0,1,1.064,0l4.78,5.552,4.517,5.251c.327.38.016.921-.532.921h-18.6c-.546,0-.859-.54-.532-.921l4.519-5.251Z" transform="translate(-55.941 -527.182)" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div>
                                        <button className='btn btn-outline-dark slot-btn'>
                                            <span>25 Nov</span><br />Tommorow
                                            <svg xmlns="http://www.w3.org/2000/svg" width="19.926" height="11.954" viewBox="0 0 19.926 11.954">
                                                <path fill="#080808" d="M65.372,527.413a.727.727,0,0,1,1.064,0l4.78,5.552,4.517,5.251c.327.38.016.921-.532.921h-18.6c-.546,0-.859-.54-.532-.921l4.519-5.251Z" transform="translate(-55.941 -527.182)" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div>
                                        <button className='btn btn-outline-dark slot-btn'>
                                            <span>26 Nov</span><br />Saturday
                                            <svg xmlns="http://www.w3.org/2000/svg" width="19.926" height="11.954" viewBox="0 0 19.926 11.954">
                                                <path fill="#080808" d="M65.372,527.413a.727.727,0,0,1,1.064,0l4.78,5.552,4.517,5.251c.327.38.016.921-.532.921h-18.6c-.546,0-.859-.54-.532-.921l4.519-5.251Z" transform="translate(-55.941 -527.182)" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div>
                                        <button className='btn btn-outline-dark slot-btn'>
                                            <span>27 Nov</span><br />Sunday
                                            <svg xmlns="http://www.w3.org/2000/svg" width="19.926" height="11.954" viewBox="0 0 19.926 11.954">
                                                <path fill="#080808" d="M65.372,527.413a.727.727,0,0,1,1.064,0l4.78,5.552,4.517,5.251c.327.38.016.921-.532.921h-18.6c-.546,0-.859-.54-.532-.921l4.519-5.251Z" transform="translate(-55.941 -527.182)" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div>
                                        <button className='btn btn-outline-dark slot-btn'>
                                            <span>28 Nov</span><br />Monday
                                            <svg xmlns="http://www.w3.org/2000/svg" width="19.926" height="11.954" viewBox="0 0 19.926 11.954">
                                                <path fill="#080808" d="M65.372,527.413a.727.727,0,0,1,1.064,0l4.78,5.552,4.517,5.251c.327.38.016.921-.532.921h-18.6c-.546,0-.859-.54-.532-.921l4.519-5.251Z" transform="translate(-55.941 -527.182)" />
                                            </svg>
                                        </button>
                                    </div>
                                </Slider>
                            </div>
                            <div className="time-slots-container mb-0 mx-n5">
                                <div className="label-text pt-2" >
                                    Morning
                                </div>
                                <div className="each-time-slot">
                                    <div className="content selected">
                                        07:00 AM -09:00 AM
                                    </div>
                                </div>
                                <div className="each-time-slot">
                                    <div className="content">
                                        09:00 AM -10:00 AM
                                    </div>
                                </div>
                                <div className="each-time-slot">
                                    <div className="content">
                                        10:00 AM -:10:30 AM
                                    </div>
                                </div>
                                <div className="each-time-slot">
                                    <div className="content">
                                        11:00 AM -11:30 AM
                                    </div>
                                </div>
                                <div className="each-time-slot">
                                    <div className="content">
                                        11:00AM -11:45AM
                                    </div>
                                </div>
                            </div>
                            <div className="time-slots-container mb-0 mx-n5">
                                <div className="label-text pt-2" >
                                    Afternoon
                                </div>
                                <div className="each-time-slot">
                                    <div className="content">
                                        12:00 PM - 01:00 PM
                                    </div>
                                </div>
                                <div className="each-time-slot">
                                    <div className="content">
                                        01:00 PM - 01:30 PM
                                    </div>
                                </div>
                                <div className="each-time-slot">
                                    <div className="content">
                                        02:00 PM - 03:00 PM
                                    </div>
                                </div>
                                <div className="each-time-slot">
                                    <div className="content">
                                        04:00 PM - 05:00 PM
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <TimeSlotSelection selectedTimeSlot = {selectedTimeSlot} setSelectedTimeSlot ={setSelectedTimeSlot} populateTimeSlots = {populateTimeSlots} timeSlots = {timeSlots} dateSlots={dateSlots} selectedDateSlot = {selectedDateSlot} />  */}
                    </div>
                </section>
                <footer class="footer fixed-bottom mt-auto py-2">
                <div class="container px-0">
                    <div class="row align-items-center no-gutters">
                        <div class="col-12 text-right">
                            <button type="button" class="btn brand-secondary px-5">Back</button>
                            <button type="submit" class="btn btn-brand-gradient ml-3 px-5 rounded-pill">Proceed To Order Summary</button>
                        </div>
                    </div>
                </div>
            </footer>
            </div>
        </React.Fragment>
    )

}
export default SlotSelection