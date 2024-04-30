import React from 'react';

function DoctorReviewDetail(props) {
    return (
        <React.Fragment>
            {!props.fromThankYou && <React.Fragment>
                { props.walkIn && <section>
                    <div className="header">
                        <p>Appointment Details</p>
                    </div>
                    <div className="align-items-strech d-flex flex-wrap justify-content-between pb-3 pt-2 px-3">
                        <div className="col-5 pl-0">
                            <small className="text-secondary d-block mb-2">Patient</small>
                            <h6>Sampath Kumar Ch</h6>
                            <p className="text-secondary mb-2 font-14">38 Yrs / Male / Dr Self</p>
                            <a className="text-primary font-14" href="tel:7660027012" title="Click to Call">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" className="mr-2">
                                    <g transform="translate(-180.438 -213.832)">
                                    <rect width="24" height="24" transform="translate(180.438 213.832)" fill="none"></rect>
                                    <g transform="translate(182.199 215.78)">
                                        <g transform="translate(0 1.429)">
                                            <path d="M185.394,217.171a2.043,2.043,0,0,0-.705.124,3.87,3.87,0,0,0-.728.361l-.369.26a3.029,3.029,0,0,0-.264.236,3.822,3.822,0,0,0-.979,1.742c-.771,2.889,1.118,7.237,4.7,10.82,3,3,6.621,4.87,9.442,4.87a5.349,5.349,0,0,0,1.377-.171,3.8,3.8,0,0,0,1.738-.975,2.837,2.837,0,0,0,.265-.3l.262-.374a3.9,3.9,0,0,0,.334-.689,2.167,2.167,0,0,0-.821-2.518l-2.625-1.833a2.261,2.261,0,0,0-3.063.546l-.509.731-.126-.089a24.713,24.713,0,0,1-5.47-5.468l-.089-.127.732-.51a2.2,2.2,0,0,0,.545-3.063l-1.832-2.624A2.229,2.229,0,0,0,185.394,217.171Zm11.1,17.253c-2.524,0-5.828-1.735-8.623-4.53-3.246-3.247-5.057-7.237-4.4-9.7a2.668,2.668,0,0,1,.678-1.22,1.807,1.807,0,0,1,.135-.126l.318-.225a2.535,2.535,0,0,1,.493-.24,1.03,1.03,0,0,1,1.162.4l1.831,2.622a1.042,1.042,0,0,1-.257,1.449l-1.193.833a.576.576,0,0,0-.16.783,24.809,24.809,0,0,0,6.813,6.815.585.585,0,0,0,.785-.16l.833-1.195a1.071,1.071,0,0,1,1.447-.257l2.624,1.833a1.006,1.006,0,0,1,.4,1.163l-.007.017a2.439,2.439,0,0,1-.206.435l-.223.321a1.537,1.537,0,0,1-.156.173,2.649,2.649,0,0,1-1.219.677A4.167,4.167,0,0,1,196.492,234.424Z" transform="translate(-182.178 -217.171)" fill="#343a40"></path>
                                        </g>
                                        <g transform="translate(9.963)">
                                            <path d="M192.615,215.757a.58.58,0,0,0-.034,1.158,9.141,9.141,0,0,1,8.548,8.546.589.589,0,0,0,.621.543.579.579,0,0,0,.537-.615,10.284,10.284,0,0,0-3-6.636h0a10.28,10.28,0,0,0-6.634-3Z" transform="translate(-192.036 -215.757)" fill="#343a40"></path>
                                        </g>
                                        <g transform="translate(8.736 3.129)">
                                            <path d="M191.427,218.853a.611.611,0,0,0-.6.544.58.58,0,0,0,.145.419.572.572,0,0,0,.4.2h0a6.708,6.708,0,0,1,6.274,6.275.589.589,0,0,0,.621.541h0a.578.578,0,0,0,.536-.613,7.869,7.869,0,0,0-7.362-7.36Z" transform="translate(-190.822 -218.853)" fill="#343a40"></path>
                                        </g>
                                    </g>
                                    </g>
                                </svg>
                                7660027012
                            </a>
                        </div>
                        <div className="vertical-hr mx-2"></div>
                        <div className="col-5 pr-0">
                            <small className="text-secondary d-block mb-2">Doctor</small>
                            <h6>Dr. Sampath Kumar Ch</h6>
                            <p className="text-secondary mb-2 font-14">Dermatologist</p>
                            <p className="mb-0 font-14">MD - Skin &amp; VD</p>
                        </div>
                        <hr className="col-12 px-0 my-3"/>
                        <div className="col-12 px-0">
                            <small className="text-secondary d-block mb-2">Type of Consultation</small>
                            <h6>Walk-In</h6>
                            <p className="text-secondary mb-2 font-14 mt-3">Clinic Address</p>
                            <address className=" no-select p-0">
                                <p className="title">Medplus Store Name</p>
                                <small className="text-capitalize mb-3" style={{"overflow-wrap": "break-word"}}>Plot no 9c, HUDA residential complex, Nallagandla village, Serilingampally, RR Dist</small>
                                <p className="title">
                                    <span className="mr-3 small">
                                    <a className="text-primary" href="tel:6300532058" title="Click to Call">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                            <g transform="translate(-180.438 -213.832)">
                                                <rect width="24" height="24" transform="translate(180.438 213.832)" fill="none"></rect>
                                                <g transform="translate(182.199 215.78)">
                                                <g transform="translate(0 1.429)">
                                                    <path d="M185.394,217.171a2.043,2.043,0,0,0-.705.124,3.87,3.87,0,0,0-.728.361l-.369.26a3.029,3.029,0,0,0-.264.236,3.822,3.822,0,0,0-.979,1.742c-.771,2.889,1.118,7.237,4.7,10.82,3,3,6.621,4.87,9.442,4.87a5.349,5.349,0,0,0,1.377-.171,3.8,3.8,0,0,0,1.738-.975,2.837,2.837,0,0,0,.265-.3l.262-.374a3.9,3.9,0,0,0,.334-.689,2.167,2.167,0,0,0-.821-2.518l-2.625-1.833a2.261,2.261,0,0,0-3.063.546l-.509.731-.126-.089a24.713,24.713,0,0,1-5.47-5.468l-.089-.127.732-.51a2.2,2.2,0,0,0,.545-3.063l-1.832-2.624A2.229,2.229,0,0,0,185.394,217.171Zm11.1,17.253c-2.524,0-5.828-1.735-8.623-4.53-3.246-3.247-5.057-7.237-4.4-9.7a2.668,2.668,0,0,1,.678-1.22,1.807,1.807,0,0,1,.135-.126l.318-.225a2.535,2.535,0,0,1,.493-.24,1.03,1.03,0,0,1,1.162.4l1.831,2.622a1.042,1.042,0,0,1-.257,1.449l-1.193.833a.576.576,0,0,0-.16.783,24.809,24.809,0,0,0,6.813,6.815.585.585,0,0,0,.785-.16l.833-1.195a1.071,1.071,0,0,1,1.447-.257l2.624,1.833a1.006,1.006,0,0,1,.4,1.163l-.007.017a2.439,2.439,0,0,1-.206.435l-.223.321a1.537,1.537,0,0,1-.156.173,2.649,2.649,0,0,1-1.219.677A4.167,4.167,0,0,1,196.492,234.424Z" transform="translate(-182.178 -217.171)" fill="#343a40"></path>
                                                </g>
                                                <g transform="translate(9.963)">
                                                    <path d="M192.615,215.757a.58.58,0,0,0-.034,1.158,9.141,9.141,0,0,1,8.548,8.546.589.589,0,0,0,.621.543.579.579,0,0,0,.537-.615,10.284,10.284,0,0,0-3-6.636h0a10.28,10.28,0,0,0-6.634-3Z" transform="translate(-192.036 -215.757)" fill="#343a40"></path>
                                                </g>
                                                <g transform="translate(8.736 3.129)">
                                                    <path d="M191.427,218.853a.611.611,0,0,0-.6.544.58.58,0,0,0,.145.419.572.572,0,0,0,.4.2h0a6.708,6.708,0,0,1,6.274,6.275.589.589,0,0,0,.621.541h0a.578.578,0,0,0,.536-.613,7.869,7.869,0,0,0-7.362-7.36Z" transform="translate(-190.822 -218.853)" fill="#343a40"></path>
                                                </g>
                                                </g>
                                            </g>
                                        </svg>
                                        6300532058
                                    </a>
                                    </span>
                                    <a className="small text-primary" href=" " target="_blank" title="Get Directions">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                                        <g transform="translate(-336.335 -141.914)">
                                            <rect fill="none" width="18" height="18" transform="translate(336.335 141.914)"></rect>
                                            <g transform="translate(336.335 141.914)">
                                                <path fill="#404040" d="M348.655,145.064a9,9,0,1,0,9,9A9.011,9.011,0,0,0,348.655,145.064Zm0,17.01a8.01,8.01,0,1,1,8.01-8.01A8.019,8.019,0,0,1,348.655,162.074Z" transform="translate(-339.655 -145.064)"></path>
                                                <g transform="translate(3.732 4.602)">
                                                <path fill="#404040" d="M351.815,150.1a.985.985,0,0,0-.451.11l-7.087,3.642a.99.99,0,0,0,.242,1.847l2.985.649a.137.137,0,0,1,.1.077l1.272,2.777a.99.99,0,0,0,1.856-.158l2.045-7.7a.991.991,0,0,0-.337-1.023h0A.985.985,0,0,0,351.815,150.1Zm-2.108,8.3a.135.135,0,0,1-.124-.08l-1.3-2.841-3.053-.664a.137.137,0,0,1-.034-.256l6.256-3.216a.136.136,0,0,1,.148.015.138.138,0,0,1,.047.143l-1.8,6.8a.137.137,0,0,1-.121.1Z" transform="translate(-343.741 -150.104)"></path>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                    Get Directions
                                    </a>
                                </p>
                            </address>
                        </div>
                    </div>
                </section>}
                { !props.walkIn && <section>
                    <div className="header">
                        <p>Appointment Details</p>
                    </div>
                    <div className="px-3 pb-3 pt-2 d-flex justify-content-between align-items-strech">
                        <div>
                            <small className="text-secondary d-block mb-2">Patient</small>
                            <h6>Sampath Kumar Ch</h6>
                            <p className="text-secondary mb-2 font-14">38 Yrs / Male / Dr Self</p>
                            <a className="text-primary font-14" href="tel:7660027012" title="Click to Call">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" className="mr-2">
                                    <g transform="translate(-180.438 -213.832)">
                                        <rect width="24" height="24" transform="translate(180.438 213.832)" fill="none"></rect>
                                        <g transform="translate(182.199 215.78)">
                                            <g transform="translate(0 1.429)">
                                                <path d="M185.394,217.171a2.043,2.043,0,0,0-.705.124,3.87,3.87,0,0,0-.728.361l-.369.26a3.029,3.029,0,0,0-.264.236,3.822,3.822,0,0,0-.979,1.742c-.771,2.889,1.118,7.237,4.7,10.82,3,3,6.621,4.87,9.442,4.87a5.349,5.349,0,0,0,1.377-.171,3.8,3.8,0,0,0,1.738-.975,2.837,2.837,0,0,0,.265-.3l.262-.374a3.9,3.9,0,0,0,.334-.689,2.167,2.167,0,0,0-.821-2.518l-2.625-1.833a2.261,2.261,0,0,0-3.063.546l-.509.731-.126-.089a24.713,24.713,0,0,1-5.47-5.468l-.089-.127.732-.51a2.2,2.2,0,0,0,.545-3.063l-1.832-2.624A2.229,2.229,0,0,0,185.394,217.171Zm11.1,17.253c-2.524,0-5.828-1.735-8.623-4.53-3.246-3.247-5.057-7.237-4.4-9.7a2.668,2.668,0,0,1,.678-1.22,1.807,1.807,0,0,1,.135-.126l.318-.225a2.535,2.535,0,0,1,.493-.24,1.03,1.03,0,0,1,1.162.4l1.831,2.622a1.042,1.042,0,0,1-.257,1.449l-1.193.833a.576.576,0,0,0-.16.783,24.809,24.809,0,0,0,6.813,6.815.585.585,0,0,0,.785-.16l.833-1.195a1.071,1.071,0,0,1,1.447-.257l2.624,1.833a1.006,1.006,0,0,1,.4,1.163l-.007.017a2.439,2.439,0,0,1-.206.435l-.223.321a1.537,1.537,0,0,1-.156.173,2.649,2.649,0,0,1-1.219.677A4.167,4.167,0,0,1,196.492,234.424Z" transform="translate(-182.178 -217.171)" fill="#343a40"></path>
                                            </g>
                                            <g transform="translate(9.963)">
                                                <path d="M192.615,215.757a.58.58,0,0,0-.034,1.158,9.141,9.141,0,0,1,8.548,8.546.589.589,0,0,0,.621.543.579.579,0,0,0,.537-.615,10.284,10.284,0,0,0-3-6.636h0a10.28,10.28,0,0,0-6.634-3Z" transform="translate(-192.036 -215.757)" fill="#343a40"></path>
                                            </g>
                                            <g transform="translate(8.736 3.129)">
                                                <path d="M191.427,218.853a.611.611,0,0,0-.6.544.58.58,0,0,0,.145.419.572.572,0,0,0,.4.2h0a6.708,6.708,0,0,1,6.274,6.275.589.589,0,0,0,.621.541h0a.578.578,0,0,0,.536-.613,7.869,7.869,0,0,0-7.362-7.36Z" transform="translate(-190.822 -218.853)" fill="#343a40"></path>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                                7660027012
                            </a>
                        </div>
                        <div className='vertical-hr mx-2'></div>
                        <div>
                            <small className="text-secondary d-block mb-2">Doctor</small>
                            <h6>Dr. Sampath Kumar Ch</h6>
                            <p className="text-secondary mb-2 font-14">Dermatologist</p>
                            <p className="mb-0 font-14">MD - Skin &amp; VD</p>
                        </div>
                        <div className='vertical-hr mx-2'></div>
                        <div>
                            <div className='mb-3'>
                                <small className="text-secondary d-block mb-2">Consultation Type</small>
                                <p className=" font-14 d-block mb-0 font-weight-bold">Online</p>
                            </div>
                            <div>
                                <small className="text-secondary d-block mb-2">Date & Time</small>
                                <p className=" font-14 d-block mb-2">Date: <span className='font-weight-bold'>Jan 27, 2021</span></p>
                                <p className="mb-0 font-14">Time: <span className='font-weight-bold'>06:00AM - 07:00AM</span></p>
                            </div>
                        </div>
                    </div>
                </section>}
            </React.Fragment>}
                { props.fromThankYou && <React.Fragment>
                    { props.walkIn && <div className="card pt-4">
                        <h6 className="legend-title"> Appointment Details</h6>
                        <div className="body">
                            <div className="align-items-strech d-flex flex-wrap justify-content-between">
                                <div className="col-5 pl-0">
                                    <small className="text-secondary d-block mb-2">Patient</small>
                                    <h6>Sampath Kumar Ch</h6>
                                    <p className="text-secondary mb-2 font-14">38 Yrs / Male / Dr Self</p>
                                    <a className="text-primary font-14" href="tel:7660027012" title="Click to Call">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" className="mr-2">
                                        <g transform="translate(-180.438 -213.832)">
                                            <rect width="24" height="24" transform="translate(180.438 213.832)" fill="none"></rect>
                                            <g transform="translate(182.199 215.78)">
                                                <g transform="translate(0 1.429)">
                                                <path d="M185.394,217.171a2.043,2.043,0,0,0-.705.124,3.87,3.87,0,0,0-.728.361l-.369.26a3.029,3.029,0,0,0-.264.236,3.822,3.822,0,0,0-.979,1.742c-.771,2.889,1.118,7.237,4.7,10.82,3,3,6.621,4.87,9.442,4.87a5.349,5.349,0,0,0,1.377-.171,3.8,3.8,0,0,0,1.738-.975,2.837,2.837,0,0,0,.265-.3l.262-.374a3.9,3.9,0,0,0,.334-.689,2.167,2.167,0,0,0-.821-2.518l-2.625-1.833a2.261,2.261,0,0,0-3.063.546l-.509.731-.126-.089a24.713,24.713,0,0,1-5.47-5.468l-.089-.127.732-.51a2.2,2.2,0,0,0,.545-3.063l-1.832-2.624A2.229,2.229,0,0,0,185.394,217.171Zm11.1,17.253c-2.524,0-5.828-1.735-8.623-4.53-3.246-3.247-5.057-7.237-4.4-9.7a2.668,2.668,0,0,1,.678-1.22,1.807,1.807,0,0,1,.135-.126l.318-.225a2.535,2.535,0,0,1,.493-.24,1.03,1.03,0,0,1,1.162.4l1.831,2.622a1.042,1.042,0,0,1-.257,1.449l-1.193.833a.576.576,0,0,0-.16.783,24.809,24.809,0,0,0,6.813,6.815.585.585,0,0,0,.785-.16l.833-1.195a1.071,1.071,0,0,1,1.447-.257l2.624,1.833a1.006,1.006,0,0,1,.4,1.163l-.007.017a2.439,2.439,0,0,1-.206.435l-.223.321a1.537,1.537,0,0,1-.156.173,2.649,2.649,0,0,1-1.219.677A4.167,4.167,0,0,1,196.492,234.424Z" transform="translate(-182.178 -217.171)" fill="#343a40"></path>
                                                </g>
                                                <g transform="translate(9.963)">
                                                <path d="M192.615,215.757a.58.58,0,0,0-.034,1.158,9.141,9.141,0,0,1,8.548,8.546.589.589,0,0,0,.621.543.579.579,0,0,0,.537-.615,10.284,10.284,0,0,0-3-6.636h0a10.28,10.28,0,0,0-6.634-3Z" transform="translate(-192.036 -215.757)" fill="#343a40"></path>
                                                </g>
                                                <g transform="translate(8.736 3.129)">
                                                <path d="M191.427,218.853a.611.611,0,0,0-.6.544.58.58,0,0,0,.145.419.572.572,0,0,0,.4.2h0a6.708,6.708,0,0,1,6.274,6.275.589.589,0,0,0,.621.541h0a.578.578,0,0,0,.536-.613,7.869,7.869,0,0,0-7.362-7.36Z" transform="translate(-190.822 -218.853)" fill="#343a40"></path>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                    7660027012
                                    </a>
                                </div>
                                <div className="vertical-hr mx-2"></div>
                                <div className="col-5 pr-0">
                                    <small className="text-secondary d-block mb-2">Doctor</small>
                                    <h6>Dr. Sampath Kumar Ch</h6>
                                    <p className="text-secondary mb-2 font-14">Dermatologist</p>
                                    <p className="mb-0 font-14">MD - Skin &amp; VD</p>
                                </div>
                                <hr className="col-12 px-0 my-3" />
                                <div className="col-12 px-0">
                                    <small className="text-secondary d-block mb-2">Type of Consultation</small>
                                    <h6>Walk-In</h6>
                                    <p className="text-secondary mb-2 font-14 mt-3">Clinic Address</p>
                                    <address className=" no-select p-0">
                                    <p className="title">Medplus Store Name</p>
                                    <small className="text-capitalize mb-3" style={{"overflow-wrap": "break-word"}}>Plot no 9c, HUDA residential complex, Nallagandla village, Serilingampally, RR Dist</small>
                                    <p className="title font-14">
                                        <span className="mr-3">
                                            <a className="text-primary font-weight-normal" href="tel:6300532058" title="Click to Call">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                                <g transform="translate(-180.438 -213.832)">
                                                    <rect width="24" height="24" transform="translate(180.438 213.832)" fill="none"></rect>
                                                    <g transform="translate(182.199 215.78)">
                                                        <g transform="translate(0 1.429)">
                                                            <path d="M185.394,217.171a2.043,2.043,0,0,0-.705.124,3.87,3.87,0,0,0-.728.361l-.369.26a3.029,3.029,0,0,0-.264.236,3.822,3.822,0,0,0-.979,1.742c-.771,2.889,1.118,7.237,4.7,10.82,3,3,6.621,4.87,9.442,4.87a5.349,5.349,0,0,0,1.377-.171,3.8,3.8,0,0,0,1.738-.975,2.837,2.837,0,0,0,.265-.3l.262-.374a3.9,3.9,0,0,0,.334-.689,2.167,2.167,0,0,0-.821-2.518l-2.625-1.833a2.261,2.261,0,0,0-3.063.546l-.509.731-.126-.089a24.713,24.713,0,0,1-5.47-5.468l-.089-.127.732-.51a2.2,2.2,0,0,0,.545-3.063l-1.832-2.624A2.229,2.229,0,0,0,185.394,217.171Zm11.1,17.253c-2.524,0-5.828-1.735-8.623-4.53-3.246-3.247-5.057-7.237-4.4-9.7a2.668,2.668,0,0,1,.678-1.22,1.807,1.807,0,0,1,.135-.126l.318-.225a2.535,2.535,0,0,1,.493-.24,1.03,1.03,0,0,1,1.162.4l1.831,2.622a1.042,1.042,0,0,1-.257,1.449l-1.193.833a.576.576,0,0,0-.16.783,24.809,24.809,0,0,0,6.813,6.815.585.585,0,0,0,.785-.16l.833-1.195a1.071,1.071,0,0,1,1.447-.257l2.624,1.833a1.006,1.006,0,0,1,.4,1.163l-.007.017a2.439,2.439,0,0,1-.206.435l-.223.321a1.537,1.537,0,0,1-.156.173,2.649,2.649,0,0,1-1.219.677A4.167,4.167,0,0,1,196.492,234.424Z" transform="translate(-182.178 -217.171)" fill="#343a40"></path>
                                                        </g>
                                                        <g transform="translate(9.963)">
                                                            <path d="M192.615,215.757a.58.58,0,0,0-.034,1.158,9.141,9.141,0,0,1,8.548,8.546.589.589,0,0,0,.621.543.579.579,0,0,0,.537-.615,10.284,10.284,0,0,0-3-6.636h0a10.28,10.28,0,0,0-6.634-3Z" transform="translate(-192.036 -215.757)" fill="#343a40"></path>
                                                        </g>
                                                        <g transform="translate(8.736 3.129)">
                                                            <path d="M191.427,218.853a.611.611,0,0,0-.6.544.58.58,0,0,0,.145.419.572.572,0,0,0,.4.2h0a6.708,6.708,0,0,1,6.274,6.275.589.589,0,0,0,.621.541h0a.578.578,0,0,0,.536-.613,7.869,7.869,0,0,0-7.362-7.36Z" transform="translate(-190.822 -218.853)" fill="#343a40"></path>
                                                        </g>
                                                    </g>
                                                </g>
                                                </svg>
                                                6300532058
                                            </a>
                                        </span>
                                        <a className="text-primary font-weight-normal" href=" " target="_blank" title="Get Directions">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                                                <g transform="translate(-336.335 -141.914)">
                                                <rect fill="none" width="18" height="18" transform="translate(336.335 141.914)"></rect>
                                                <g transform="translate(336.335 141.914)">
                                                    <path fill="#404040" d="M348.655,145.064a9,9,0,1,0,9,9A9.011,9.011,0,0,0,348.655,145.064Zm0,17.01a8.01,8.01,0,1,1,8.01-8.01A8.019,8.019,0,0,1,348.655,162.074Z" transform="translate(-339.655 -145.064)"></path>
                                                    <g transform="translate(3.732 4.602)">
                                                        <path fill="#404040" d="M351.815,150.1a.985.985,0,0,0-.451.11l-7.087,3.642a.99.99,0,0,0,.242,1.847l2.985.649a.137.137,0,0,1,.1.077l1.272,2.777a.99.99,0,0,0,1.856-.158l2.045-7.7a.991.991,0,0,0-.337-1.023h0A.985.985,0,0,0,351.815,150.1Zm-2.108,8.3a.135.135,0,0,1-.124-.08l-1.3-2.841-3.053-.664a.137.137,0,0,1-.034-.256l6.256-3.216a.136.136,0,0,1,.148.015.138.138,0,0,1,.047.143l-1.8,6.8a.137.137,0,0,1-.121.1Z" transform="translate(-343.741 -150.104)"></path>
                                                    </g>
                                                </g>
                                                </g>
                                            </svg>
                                            Get Directions
                                        </a>
                                    </p>
                                    </address>
                                </div>
                            </div>
                        </div>
                    </div> }
                    { !props.walkIn && <div className="card pt-4">
                        <h6 className="legend-title"> Appointment Details</h6>
                        <div className="body">
                            <div className="d-flex justify-content-between align-items-strech">
                                <div>
                                    <small className="text-secondary d-block mb-2">Patient</small>
                                    <h6>Sampath Kumar Ch</h6>
                                    <p className="text-secondary mb-2 font-14">38 Yrs / Male / Dr Self</p>
                                    <a className="text-primary font-14" href="tel:7660027012" title="Click to Call">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" className="mr-2">
                                        <g transform="translate(-180.438 -213.832)">
                                            <rect width="24" height="24" transform="translate(180.438 213.832)" fill="none"></rect>
                                            <g transform="translate(182.199 215.78)">
                                                <g transform="translate(0 1.429)">
                                                    <path d="M185.394,217.171a2.043,2.043,0,0,0-.705.124,3.87,3.87,0,0,0-.728.361l-.369.26a3.029,3.029,0,0,0-.264.236,3.822,3.822,0,0,0-.979,1.742c-.771,2.889,1.118,7.237,4.7,10.82,3,3,6.621,4.87,9.442,4.87a5.349,5.349,0,0,0,1.377-.171,3.8,3.8,0,0,0,1.738-.975,2.837,2.837,0,0,0,.265-.3l.262-.374a3.9,3.9,0,0,0,.334-.689,2.167,2.167,0,0,0-.821-2.518l-2.625-1.833a2.261,2.261,0,0,0-3.063.546l-.509.731-.126-.089a24.713,24.713,0,0,1-5.47-5.468l-.089-.127.732-.51a2.2,2.2,0,0,0,.545-3.063l-1.832-2.624A2.229,2.229,0,0,0,185.394,217.171Zm11.1,17.253c-2.524,0-5.828-1.735-8.623-4.53-3.246-3.247-5.057-7.237-4.4-9.7a2.668,2.668,0,0,1,.678-1.22,1.807,1.807,0,0,1,.135-.126l.318-.225a2.535,2.535,0,0,1,.493-.24,1.03,1.03,0,0,1,1.162.4l1.831,2.622a1.042,1.042,0,0,1-.257,1.449l-1.193.833a.576.576,0,0,0-.16.783,24.809,24.809,0,0,0,6.813,6.815.585.585,0,0,0,.785-.16l.833-1.195a1.071,1.071,0,0,1,1.447-.257l2.624,1.833a1.006,1.006,0,0,1,.4,1.163l-.007.017a2.439,2.439,0,0,1-.206.435l-.223.321a1.537,1.537,0,0,1-.156.173,2.649,2.649,0,0,1-1.219.677A4.167,4.167,0,0,1,196.492,234.424Z" transform="translate(-182.178 -217.171)" fill="#343a40"></path>
                                                </g>
                                                <g transform="translate(9.963)">
                                                    <path d="M192.615,215.757a.58.58,0,0,0-.034,1.158,9.141,9.141,0,0,1,8.548,8.546.589.589,0,0,0,.621.543.579.579,0,0,0,.537-.615,10.284,10.284,0,0,0-3-6.636h0a10.28,10.28,0,0,0-6.634-3Z" transform="translate(-192.036 -215.757)" fill="#343a40"></path>
                                                </g>
                                                <g transform="translate(8.736 3.129)">
                                                    <path d="M191.427,218.853a.611.611,0,0,0-.6.544.58.58,0,0,0,.145.419.572.572,0,0,0,.4.2h0a6.708,6.708,0,0,1,6.274,6.275.589.589,0,0,0,.621.541h0a.578.578,0,0,0,.536-.613,7.869,7.869,0,0,0-7.362-7.36Z" transform="translate(-190.822 -218.853)" fill="#343a40"></path>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                    7660027012
                                    </a>
                                </div>
                                <div className="vertical-hr mx-2"></div>
                                <div>
                                    <small className="text-secondary d-block mb-2">Doctor</small>
                                    <h6>Dr. Sampath Kumar Ch</h6>
                                    <p className="text-secondary mb-2 font-14">Dermatologist</p>
                                    <p className="mb-0 font-14">MD - Skin &amp; VD</p>
                                </div>
                                <div className="vertical-hr mx-2"></div>
                                <div>
                                    <div className="mb-3">
                                        <small className="text-secondary d-block mb-2">Consultation Type</small>
                                        <p className=" font-14 d-block mb-0 font-weight-bold">Online</p>
                                    </div>
                                    <div>
                                        <small className="text-secondary d-block mb-2">Date & Time</small>
                                        <p className=" font-14 d-block mb-2">Date: <span className="font-weight-bold">Jan 27, 2021</span></p>
                                        <p className="mb-0 font-14">Time: <span className="font-weight-bold">06:00AM - 07:00AM</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> }
                </React.Fragment>
                }
        </React.Fragment>
    );
}

export default DoctorReviewDetail;