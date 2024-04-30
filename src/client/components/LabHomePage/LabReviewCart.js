import React from "react"
const LabReviewCart=(props)=>{
    return(
        <React.Fragment>
            <main role="main" className="container">
                <div className="row">
                    <div className="col-8 pl-0 pr-2">
                        <section className="cart-summary">
                            <div className="header">
                                <p>Patient &amp; Doctor Details</p>
                                <a href="javascript:void(0)" title="Edit" className="btn btn-link text-primary btn-sm">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 18 18" className="align-top mr-2">
                                        <g transform="translate(-180.257 -249.084)">
                                        <rect fill="none" width="18" height="18" transform="translate(180.257 249.084)"></rect>
                                        <g transform="translate(180.258 249.086)">
                                            <path fill="#080808" d="M2.765,18A2.77,2.77,0,0,1,0,15.234V4.341A2.77,2.77,0,0,1,2.765,1.574H6.274a.6.6,0,0,1,0,1.208H2.763A1.566,1.566,0,0,0,1.208,4.346V15.234A1.568,1.568,0,0,0,2.759,16.8H13.648a1.567,1.567,0,0,0,1.564-1.563V11.725a.6.6,0,0,1,1.207,0v3.509A2.769,2.769,0,0,1,13.652,18ZM5.9,12.825a1.043,1.043,0,0,1-.727-1.281l.7-2.466a.605.605,0,0,1,.149-.269L14.177.649a2.265,2.265,0,0,1,3.172,0,2.261,2.261,0,0,1,0,3.174L9.215,11.98a.612.612,0,0,1-.278.152l-2.445.688-.313.042A1.067,1.067,0,0,1,5.9,12.825ZM7,9.528l-.6,2.041,2.022-.549.022-.007,6.9-6.922.063-.064L13.944,2.563Zm8.083-8.069-.269.242,1.452,1.454.215-.173.009-.008a1.035,1.035,0,0,0-1.407-1.514Z" transform="translate(-0.001 -0.001)"></path>
                                        </g>
                                        </g>
                                    </svg>
                                    Edit
                                </a>
                            </div>
                            <div className="body">
                                <p className="d-block font-weight-normal">Name: <strong> rerty</strong></p>
                                <p className="d-block font-weight-normal">Age / Gender: <strong> 56Yrs / Male</strong></p>
                                <p className="d-block font-weight-normal">Doctor Name: <strong> Dr Self</strong></p>
                            </div>
                        </section>
                        <section>
                            <div className="header">
                                <p>Selected Tests (for Lab Walkin)</p>
                            </div>
                            <ul className="product-listview list-group list-group-flush">
                                <li className="list-group-item p-3">
                                    <div className="col">
                                        <h6 className="mb-0 mt-1">HEMOGLOBIN (Hb)</h6>
                                    </div>
                                    <div className="col-4 text-right p-0">
                                        <p className="font-weight-bold m-0"><span className="ml-2"><strong className="rupee">₹</strong> 80.00</span></p>
                                    </div>
                                </li>
                                <li className="list-group-item p-3">
                                    <div className="col">
                                        <h6 className="mb-0 mt-1">LDL CHOLESTEROL</h6>
                                    </div>
                                    <div className="col-4 text-right p-0">
                                        <p className="font-weight-bold m-0"><span className="ml-2"><strong className="rupee">₹</strong> 400.00</span></p>
                                    </div>
                                </li>
                                <li className="list-group-item p-3">
                                    <div className="col">
                                        <h6 className="mb-0 mt-1">ERYTHROCYTE COUNT </h6>
                                    </div>
                                    <div className="col-4 text-right p-0">
                                        <p className="font-weight-bold m-0"><span className="ml-2"><strong className="rupee">₹</strong> 120.00</span></p>
                                    </div>
                                </li>
                                <li className="list-group-item p-3">
                                    <div className="col">
                                        <h6 className="mb-0 mt-1">MASTER HEALTH CHECKUP SILVER</h6>
                                    </div>
                                    <div className="col-4 text-right p-0">
                                        <p className="font-weight-bold m-0"><span className="ml-2"><strong className="rupee">₹</strong> 3000.00</span></p>
                                    </div>
                                </li>
                                <li className="list-group-item p-3">
                                    <div className="col">
                                        <h6 className="mb-0 mt-1">MASTER HEALTH CHECKUP PLATINUM</h6>
                                    </div>
                                    <div className="col-4 text-right p-0">
                                        <p className="font-weight-bold m-0"><span className="ml-2"><strong className="rupee">₹</strong> 9000.00</span></p>
                                    </div>
                                </li>
                                <li className="order-details-summary list-group-item">
                                    <div className="col">
                                    </div>
                                    <div className="col-md-6 col-lg-6 col-xl-5 text-left font-weight-bold pr-0">
                                        <p><span>Total Price</span><span className="float-right"><strong className="rupee">₹</strong> 12600.00 </span></p>
                                    </div>
                                </li>
                            </ul>
                        </section>
                        <section>
                            <div className="header">
                                <p>Selected Tests (for Home Collection)</p>
                            </div>
                            <ul className="product-listview list-group list-group-flush">
                                <li className="list-group-item p-3">
                                    <div className="col">
                                        <h6 className="mb-0 mt-1">HEMOGLOBIN (Hb)</h6>
                                    </div>
                                    <div className="col-4 text-right p-0">
                                        <p className="font-weight-bold m-0"><span className="ml-2"><strong className="rupee">₹</strong> 80.00</span></p>
                                    </div>
                                </li>
                                <li className="list-group-item p-3">
                                    <div className="col">
                                        <h6 className="mb-0 mt-1">LDL CHOLESTEROL</h6>
                                    </div>
                                    <div className="col-4 text-right p-0">
                                        <p className="font-weight-bold m-0"><span className="ml-2"><strong className="rupee">₹</strong> 400.00</span></p>
                                    </div>
                                </li>
                                <li className="list-group-item p-3">
                                    <div className="col">
                                        <h6 className="mb-0 mt-1">ERYTHROCYTE COUNT </h6>
                                    </div>
                                    <div className="col-4 text-right p-0">
                                        <p className="font-weight-bold m-0"><span className="ml-2"><strong className="rupee">₹</strong> 120.00</span></p>
                                    </div>
                                </li>
                                <li className="list-group-item p-3">
                                    <div className="col">
                                        <h6 className="mb-0 mt-1">MASTER HEALTH CHECKUP SILVER</h6>
                                    </div>
                                    <div className="col-4 text-right p-0">
                                        <p className="font-weight-bold m-0"><span className="ml-2"><strong className="rupee">₹</strong> 3000.00</span></p>
                                    </div>
                                </li>
                                <li className="list-group-item p-3">
                                    <div className="col">
                                        <h6 className="mb-0 mt-1">MASTER HEALTH CHECKUP PLATINUM</h6>
                                    </div>
                                    <div className="col-4 text-right p-0">
                                        <p className="font-weight-bold m-0"><span className="ml-2"><strong className="rupee">₹</strong> 9000.00</span></p>
                                    </div>
                                </li>
                                <li className="order-details-summary list-group-item">
                                    <div className="col">
                                    </div>
                                    <div className="col-md-6 col-lg-6 col-xl-5 text-left font-weight-bold pr-0">
                                        <p><span>Total Price</span><span className="float-right"><strong className="rupee">₹</strong> 12600.00 </span></p>
                                    </div>
                                </li>
                            </ul>
                        </section>
                        <div className="labs-patient-info">
                            <div className="each-info">
                                <section className="cart-summary">
                                    <div className="header">
                                        <p>Home Pickup Address</p>
                                    </div>
                                    <div className="body labs-address">
                                        <div className="">
                                            <p className="font-weight-bold">GACHIBOWLI LAB SAMPLE COLLECTION CENTRE</p>
                                            <address className="no-select p-0">
                                                Sh.No.384, H.No.1-73/8, Gachibowli
                                                <p className="d-block mt-3">
                                                <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
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
                                                <a className="text-primary" href="tel:04067006700" title="Click to Call">04067006700</a>
                                                <a className="text-primary ml-3" href="http://maps.google.com/?saddr=17.4485835,78.39080349999999&amp;daddr=17.43716000,78.36606000" target="_blank" title="Get Directions">
                                                    <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
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
                                            <hr className="my-2"/>
                                            <span className="small font-weight-bold">Schedule Slot Details</span>
                                            <p className="d-block font-weight-normal mt-1">Date &amp; Time: <strong>Oct 27, 2021 (07:00 AM - 09:00 AM)</strong></p>
                                        </div>
                                    </div>
                                </section>
                            </div>
                            <div className="each-info">
                            <section className="cart-summary">
                                    <div className="header">
                                        <p>Lab Walkin Collection</p>
                                    </div>
                                    <div className="body labs-address">
                                        <div className="">
                                            <p className="font-weight-bold">GACHIBOWLI LAB SAMPLE COLLECTION CENTRE</p>
                                            <address className="no-select p-0">
                                                Sh.No.384, H.No.1-73/8, Gachibowli
                                                <p className="d-block mt-3">
                                                <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
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
                                                <a className="text-primary" href="tel:04067006700" title="Click to Call">04067006700</a>
                                                <a className="text-primary ml-3" href="http://maps.google.com/?saddr=17.4485835,78.39080349999999&amp;daddr=17.43716000,78.36606000" target="_blank" title="Get Directions">
                                                    <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
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
                                            <hr className="my-2"/>
                                            <span className="small font-weight-bold">Schedule Slot Details</span>
                                            <p className="d-block font-weight-normal mt-1">Date &amp; Time: <strong>Oct 27, 2021 (07:00 AM - 09:00 AM)</strong></p>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <footer class="footer fixed-bottom mt-auto py-2">
                <div class="container px-0">
                    <div class="row align-items-center no-gutters">
                        <div class="col-12 text-right"><button type="button" class="brand-secondary btn px-5 rounded-pill">Back</button><button type="submit" class="btn btn-brand-gradient ml-3 px-5 rounded-pill"> Proceed To Payments</button></div>
                    </div>
                </div>
            </footer>
        </React.Fragment>
    )
}
export default LabReviewCart