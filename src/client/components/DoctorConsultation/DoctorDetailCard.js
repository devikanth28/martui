import React from 'react';
import DoctorProfile from "../../images/common/doctor_l.jpeg";
//import ReactImageMagnify from 'react-image-magnify';

function DoctorDetailCard(props) {
    return (
        <React.Fragment>
            <section className="shadow-none p-3 my-32 mt-0">
                <div className="d-flex justify-content-between">
                    <div className="d-flex mb-3">
                        <div className='doctor-profile-img-container'>

                        {/* <ReactImageMagnify {...{
                        smallImage: {
                            alt: 'Dr. Satyanath R V',
                            isFluidWidth: false,
                            height:200,
                            src: DoctorProfile,
                        },
                        largeImage: {
                            src: DoctorProfile,
                            alt:'Dr. Satyanath R V',
                            width: 300,
                            height: 300
                        },
                        enlargedImagePosition:'beside',
                        ClassName:'hover-label',
                        enlargedImageContainerDimensions:{width: '300', height: '300'},
                        isHintEnabled:false,
                        enlargedImageContainerStyle:{'zIndex':1000}

                    }} /> */}

                             <img src={DoctorProfile} alt="Dr. Satyanath R V" title="Dr. Satyanath R V" height="200"/> 
                            {/* <span className='hover-label'>
                                <svg className='mr-2' xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                                    <g id="zoomin_black_icon_18px" transform="translate(-180.257 -316.764)">
                                        <rect id="Rectangle_3297" data-name="Rectangle 3297" width="18" height="18" transform="translate(180.257 316.764)" fill="none"/>
                                        <g id="Group_14569" data-name="Group 14569" transform="translate(180.258 316.787)">
                                            <path id="Union_134" data-name="Union 134" d="M17,17.783l-5.373-5.349a7.039,7.039,0,1,1,.827-.828l5.371,5.348a.585.585,0,1,1-.825.829ZM1.17,7.059A5.889,5.889,0,1,0,7.059,1.17,5.9,5.9,0,0,0,1.17,7.059Zm5.323,3.468V7.622H3.587a.572.572,0,1,1,0-1.144H6.492v-2.9a.573.573,0,0,1,1.146,0v2.9h2.9a.572.572,0,1,1,0,1.144h-2.9v2.906a.573.573,0,0,1-1.146,0Z" fill="#ffffff"/>
                                        </g>
                                    </g>
                                </svg>
                                Hover to Zoom
                            </span> */}
                        </div>
                        <div className="ml-3">
                            <span className="font-14 text-secondary">RN - 125486</span>
                            <h5 className="mt-1 mb-2">Dr. Satyanath R V</h5>
                            <p className="mb-2 text-secondary">Dermetologist</p>
                            <p className="mb-0 font-weight-bold">MD - Skin &amp; VD</p>
                            <p className="mb-2 mt-3"><strong>25</strong> years experience</p>
                        <p className="mb-2"><strong>100</strong> online consultaions completed</p>
                        <div className="d-flex align-items-center">
                            <a href="javascript:void(0)" title="Doctor ratings" className="btn btn-link btn-sm ml-n2 mr-3 text-primary no-underline">
                                <svg className="mr-2 align-middle mt-n1" xmlns="http://www.w3.org/2000/svg" width="16" height="16.334" viewBox="0 0 16 16.334">
                                    <g id="rating-icn" transform="translate(-1418 -715)">
                                        <rect id="Rectangle_6524" data-name="Rectangle 6524" width="16" height="16" transform="translate(1418 715)" fill="none"></rect>
                                        <path id="noun_rating_1847488" d="M18,23.953l3.977,2.891a.8.8,0,0,0,1.234-.9L21.7,21.262l3.969-2.9v.008a.806.806,0,0,0-.469-1.461H20.281l-1.52-4.685a.8.8,0,0,0-1.524,0l-1.52,4.685H10.8a.81.81,0,0,0-.8.811.8.8,0,0,0,.336.65v0l3.973,2.894s-1.52,4.684-1.516,4.684a.8.8,0,0,0,1.23.9Z" transform="translate(1408 704.334)" fill="#343a40"></path>
                                    </g>
                                </svg>
                                4.5
                            </a>
                            <a href="javascript:void(0)" title="Doctor reviews" className="btn btn-link btn-sm ml-n2 mr-3 text-primary no-underline">
                                <svg className="mr-2 align-middle mt-n1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                    <g id="review-icn" transform="translate(-1418 -755)">
                                        <rect id="Rectangle_6525" data-name="Rectangle 6525" width="16" height="16" transform="translate(1418 755)" fill="none"></rect>
                                        <g id="noun_review_1966404" transform="translate(1418 756.778)">
                                            <g id="Group_22655" data-name="Group 22655" transform="translate(0 0)">
                                            <path id="Path_29901" data-name="Path 29901" d="M10.366,11.5c4.33,0,7.834,2.645,7.834,5.914a4.941,4.941,0,0,1-1.466,3.437,12.6,12.6,0,0,0,1.634,2.544.643.643,0,0,1-.59,1.061,18.736,18.736,0,0,1-4.532-1.55,10.007,10.007,0,0,1-2.881.421c-4.33,0-7.834-2.645-7.834-5.914S6.036,11.5,10.366,11.5Zm2.443,5.509.59.573a.062.062,0,0,1,.017.051l-.135.792a.108.108,0,0,0,.152.118l.708-.387a.032.032,0,0,1,.051,0l.708.371a.1.1,0,0,0,.152-.118l-.135-.792a.062.062,0,0,1,.017-.051l.573-.556a.107.107,0,0,0-.051-.185l-.809-.118c-.017,0-.034-.017-.051-.034l-.354-.708a.1.1,0,0,0-.185,0l-.354.724c-.017.017-.034.034-.051.034l-.792.118A.094.094,0,0,0,12.809,17.009Zm-3.791,0,.573.573a.062.062,0,0,1,.017.051l-.135.792a.108.108,0,0,0,.152.118l.724-.387a.032.032,0,0,1,.051,0l.708.371a.1.1,0,0,0,.152-.118l-.135-.792a.062.062,0,0,1,.017-.051l.573-.573a.107.107,0,0,0-.051-.185l-.809-.118c-.017,0-.034-.017-.051-.034l-.354-.708a.1.1,0,0,0-.185,0l-.354.724c-.017.017-.034.034-.051.034l-.792.118A.108.108,0,0,0,9.018,17.009Zm-3.808,0,.573.573c.034.017.034.034.034.051l-.135.792a.108.108,0,0,0,.152.118l.708-.387a.032.032,0,0,1,.051,0l.708.371a.1.1,0,0,0,.152-.118l-.135-.792a.062.062,0,0,1,.017-.051l.573-.556a.107.107,0,0,0-.051-.185l-.809-.118c-.017,0-.034-.017-.051-.034l-.337-.708a.1.1,0,0,0-.185,0l-.354.724c-.017.017-.034.034-.051.034l-.792.118A.1.1,0,0,0,5.211,17.009Z" transform="translate(-2.532 -11.5)" fill="#343a40"></path>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                                50 Reviews
                            </a>
                            <a href="javascript:void(0)" title="Doctor reviews" className="btn btn-link btn-sm ml-n2 text-primary no-underline">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" className="align-middle mr-2 mt-n1">
                                    <g id="write-review-icn" transform="translate(404 -18757)">
                                        <g id="Group_22725" data-name="Group 22725" transform="translate(-1695 542)">
                                            <rect id="Rectangle_6526" data-name="Rectangle 6526" width="16" height="16" transform="translate(1291 18215)" fill="none"></rect>
                                            <g id="Write_Message" data-name="Write Message" transform="translate(1288 18212)">
                                            <path id="Path_29902" data-name="Path 29902" d="M16.052,5H5.947A2.947,2.947,0,0,0,3,7.947v4.21a2.947,2.947,0,0,0,2.947,2.947h8.067a5.786,5.786,0,0,1,4.21,2.349.413.413,0,0,0,.345.177H18.7a.421.421,0,0,0,.3-.421V7.947A2.947,2.947,0,0,0,16.052,5ZM13.871,9.387l-.96.96v.042l-2.206,2.189a.413.413,0,0,1-.3.126H9.215a.421.421,0,0,1-.421-.421V11.071a.413.413,0,0,1,.126-.3L11.084,8.6h.042l.926-.935a.429.429,0,0,1,.6,0l1.221,1.12a.413.413,0,0,1,.126.3.4.4,0,0,1-.126.295Zm-1.49-.893.6.6-.387.4-.6-.6Zm-.96.994.6.6-1.76,1.752h-.6v-.6Z" transform="translate(0)" fill="#343a40"></path>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                                Write a Review
                            </a>
                        </div>
                        </div>
                    </div>
                    <div className="text-right ml-3">
                        <a href="javascript:void(0)" title="click to share">
                            <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44">
                            <g transform="translate(-843 -225)">
                                <g fill="#fff" stroke="#afb5ba" transform="translate(843 225)">
                                    <circle stroke="none" cx="22" cy="22" r="22"></circle>
                                    <circle fill="none" cx="22" cy="22" r="21.5"></circle>
                                </g>
                                <rect fill="none" width="24" height="24" rx="12" transform="translate(853 235)"></rect>
                                <path fill="#6c757d" d="M19.5,17.078a2.912,2.912,0,0,0-1.96.77L10.41,13.7a3.273,3.273,0,0,0,.09-.7,3.273,3.273,0,0,0-.09-.7l7.05-4.109A2.993,2.993,0,1,0,16.5,6a3.273,3.273,0,0,0,.09.7L9.54,10.809a3,3,0,1,0,0,4.379l7.12,4.159a2.82,2.82,0,0,0-.08.65,2.92,2.92,0,1,0,2.92-2.92Z" transform="translate(849.5 234)"></path>
                            </g>
                            </svg>
                        </a>
                    </div>
                    
                </div>
                <div className="d-flex justify-content-between align-items-end">
                    <div className="col pl-0">
                        <div className="mt-3">
                        <p><strong>Select Consultation Type</strong></p>
                            <button className="btn btn-blue-shadow mr-3 active with-tick">Online Consultation in x mins</button>
                            <button className="btn btn-blue-shadow with-tick">Walk-in Consultation</button>
                        </div>
                    </div>
                    <button className="btn btn-brand-gradient rounded-pill shadow px-5" role="button" onClick={()=>{window.location.href = "/doctorCheckout";}}>Book Appointment</button>
                </div>
                <div className="mt-4">
                    <div className="border rounded p-3">
                        <h6 className="font-14 font-weight-normal mb-3 text-secondary">Doctor Available at</h6>
                        <div className="doctor-store-slider">
                            <div className="each-doctor-store">
                                <h5 className="mb-0">MedPlus Gachibowli Store</h5>
                                <a href="javascript:void(0)" className="btn btn-link text-primary ml-n3 px-3 no-underline">Distance 3kms</a>
                            </div>
                            <div className="each-doctor-store">
                                <h5 className="mb-0">MedPlus Gachibowli Store</h5>
                                <a href="javascript:void(0)" className="btn btn-link text-primary ml-n3 px-3 no-underline">Distance 3kms</a>
                            </div>
                            <div className="each-doctor-store">
                                <h5 className="mb-0">MedPlus Gachibowli Store</h5>
                                <a href="javascript:void(0)" className="btn btn-link text-primary ml-n3 px-3 no-underline">Distance 3kms</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
}

export default DoctorDetailCard;