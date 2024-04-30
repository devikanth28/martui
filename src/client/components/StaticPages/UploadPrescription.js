import React from 'react';
import UploadPrescriptionImg from '../../images/common/delete-prescription-cssbg.svg';
const UploadPrescription = () =>{
    return(
        <React.Fragment>
            <section>
                <React.Fragment>
                    <div className="header">
                        <p>Verified Mobile Number <h5 className="mb-0 d-inline-block ml-1">9666870341</h5></p>
                    </div>
                    <div className="prescription-details homepage">
                        <div className="home-delivery">
                            <h6 className="title">To upload prescription choose your option</h6>
                            <div className="nav-card w-75">
                                <svg className="nav-card-img" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 18 18">
                                    <g transform="translate(0 -0.085)">
                                        <rect fill="none" width="18" height="18" transform="translate(0 0.085)"/>
                                        <g transform="translate(0.75 0.085)">
                                            <path fill="#404040" d="M1408.97,746.283v-3.406a.393.393,0,0,0-.109-.258l-3.819-4.01a.382.382,0,0,0-.274-.116h-6.055a2.017,2.017,0,0,0-2.011,2.029v11.45a2,2,0,0,0,2.011,2.014h4.779a5.16,5.16,0,1,0,5.477-7.7Zm-3.827-6.475,2.562,2.7h-1.661a.907.907,0,0,1-.9-.9Zm-2,9.566h-3.406a.375.375,0,0,0,0,.751h3.162a5.055,5.055,0,0,0-.142,1.208,5,5,0,0,0,.368,1.906h-4.408v0a1.257,1.257,0,0,1-1.261-1.264v-11.45a1.268,1.268,0,0,1,1.261-1.28h5.68v2.36a1.654,1.654,0,0,0,1.65,1.655h2.175v2.93c-.112,0-.2-.015-.3-.015a5.238,5.238,0,0,0-3.422,1.291h-4.764a.375.375,0,0,0,0,.751h4.066A6,6,0,0,0,1403.14,749.375Zm4.776,6.37a4.408,4.408,0,1,1,4.408-4.408A4.413,4.413,0,0,1,1407.916,755.745Z" transform="translate(-1396.703 -738.492)"/>
                                            <path fill="#404040" d="M1400.024,747.11h3.744a.37.37,0,1,0,0-.74h-3.744a.37.37,0,0,0,0,.74Z" transform="translate(-1396.983 -739.275)"/>
                                            <path fill="#e71c37" d="M1409.1,749.673a.368.368,0,0,0-.54,0L1406.393,752a.37.37,0,0,0,.019.521.378.378,0,0,0,.529-.019l1.531-1.638V754.9a.37.37,0,0,0,.74,0v-4.037l1.519,1.638a.371.371,0,0,0,.269.118.377.377,0,0,0,.252-.1.369.369,0,0,0,.019-.521Z" transform="translate(-1397.604 -739.48)"/>
                                            <path fill="#08ce73" d="M1400.375,740.755h-.5v.558h.153v2.135h-.153v.558h.709V742.79h.589l.523.657-.614.646h-.359v.558h.6l.726-.763.609.763h.667v-.558h-.4l-.49-.616.53-.558h.36v-.558h-.6l-.641.675-.329-.411a.941.941,0,0,0,.464-.861c0-.62-.439-1.007-1.147-1.007Zm1.289,1.007a.419.419,0,0,1-.379.455l-.034,0a1.775,1.775,0,0,1-.18.011h-.487v-.918h.487C1401.664,741.31,1401.664,741.65,1401.664,741.761Z" transform="translate(-1397.009 -738.748)"/>
                                        </g>
                                    </g>
                                </svg>
                                <h6>Upload <br/>Prescription</h6>
                                <input type="file" id="fileUpload" name="fileUpload" accept="image/*,application/pdf" hidden />
                                <button type="button" className="btn btn-brand btn-brand-gradient px-4 rounded-pill">UPLOAD</button>
                            </div>
                            <div className="nav-card w-75">
                                <svg className="nav-card-img" xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 48 48">
                                    <g transform="translate(-1396.499 -530.045)">
                                        <rect fill="none" width="48" height="48" transform="translate(1396.499 530.045)"/>
                                        <g transform="translate(1400.232 530.205)">
                                            <path fill="#08ce73" d="M1412.585,536.061a.2.2,0,0,1-.2-.2v-3.31a.2.2,0,0,0-.2-.2h-2.509a.2.2,0,0,0-.2.2v3.31a.2.2,0,0,1-.2.2h-3.51a.2.2,0,0,0-.2.2v2.407a.2.2,0,0,0,.2.2h3.51a.2.2,0,0,1,.2.2v3.612a.2.2,0,0,0,.2.2h2.509a.2.2,0,0,0,.2-.2v-3.612a.2.2,0,0,1,.2-.2h3.31a.2.2,0,0,0,.2-.2v-2.407a.2.2,0,0,0-.2-.2Z" transform="translate(-1387.814 -526.933)"/>
                                            <g transform="translate(7.052 16.689)">
                                                <path fill="#e71c37" d="M1401.736,538.55h7.021a.7.7,0,0,0,0-1.406h-7.021a.7.7,0,0,0,0,1.406Z" transform="translate(-1401.033 -537.144)"/>
                                                <path fill="#e71c37" d="M1401.735,540.158h10.635a.7.7,0,1,0,0-1.4h-10.635a.7.7,0,1,0,0,1.4Z" transform="translate(-1401.034 -534.858)"/>
                                                <path fill="#e71c37" d="M1412.371,540.365h-10.635a.7.7,0,0,0,0,1.4h10.633a.7.7,0,1,0,0-1.4Z" transform="translate(-1401.033 -532.573)"/>
                                            </g>
                                            <path fill="#404040" d="M1400.491,556.662v-18.4h4.3a2.674,2.674,0,0,0,2.619-2.722l0-.029v-3.972h17.929a3.276,3.276,0,0,1,3.211,3.334l0,.027v16.482l.069-.07h1.315V536.222a3.262,3.262,0,0,1,3.261,3.266v11.82h1.384V539.587a4.838,4.838,0,0,0-1.332-3.38,4.549,4.549,0,0,0-3.263-1.413,4.716,4.716,0,0,0-4.642-4.684h-18.617a.684.684,0,0,0-.464.184l-6.9,6.454a.747.747,0,0,0-.251.527v19.385Zm5.531-24.265v3.111a1.266,1.266,0,0,1-1.2,1.323h-3.469Z" transform="translate(-1396.53 -530.111)"/>
                                            <path fill="#404040" d="M1431.278,565.141l-27.3-.031c-.122,0-2.392-.082-3.3-1.164s-1.081-3.607-1.086-3.713l-1.544-14.74a.852.852,0,0,1,.207-.656.822.822,0,0,1,.62-.281l26.425-.007,4.815-5.073a.834.834,0,0,1,.6-.259h6.565a.827.827,0,0,1,.608.271.848.848,0,0,1,.218.639l-1.368,19.141a7.162,7.162,0,0,1-1.594,4.045A5.559,5.559,0,0,1,1431.278,565.141ZM1399.8,546.25l1.449,13.84a6.494,6.494,0,0,0,.686,2.748,3.926,3.926,0,0,0,2.071.578l27.238.031a3.87,3.87,0,0,0,2.655-1.258,5.45,5.45,0,0,0,1.183-3.046l1.3-18.233h-5.321l-4.815,5.073a.828.828,0,0,1-.6.259Z" transform="translate(-1398.042 -517.928)"/>
                                        </g>
                                    </g>
                                </svg>
                                <h6>Select from <br/>Previous prescriptions</h6>
                                <button type="button" className="btn btn-brand btn-brand-gradient px-4 rounded-pill">SELECT</button>
                            </div>
                        </div>
                        <div className="store-pickup">
                            <div className="terms-div">
                                <img src={UploadPrescriptionImg} alt="Upload Prescription Image" title="Upload Prescription Image"/>
                                <div className="additional-notes">
                                    <h6>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                                            <path d="M9.563.563a9,9,0,1,0,9,9A9,9,0,0,0,9.563.563Zm0,3.992A1.524,1.524,0,1,1,8.038,6.079,1.524,1.524,0,0,1,9.563,4.554Zm2.032,9.218a.436.436,0,0,1-.435.435H7.966a.436.436,0,0,1-.435-.435V12.9a.436.436,0,0,1,.435-.435H8.4V10.143H7.966a.436.436,0,0,1-.435-.435V8.837A.436.436,0,0,1,7.966,8.4h2.323a.436.436,0,0,1,.435.435v3.629h.435a.436.436,0,0,1,.435.435Z" transform="translate(-0.563 -0.563)"></path>
                                        </svg>
                                        Note: Prescription should contain -
                                    </h6>
                                    <ol>
                                        <li>Doctor Name and Signature</li>
                                        <li>Patient Name</li>
                                        <li>Date of Prescription</li>
                                        <li>Don't crop out any part of the image</li>
                                        <li>Avoid blurred image</li>
                                        <li>Include Details of doctor and patient + clinic visit date</li>
                                        <li>Medicines will be dispensed as per prescription</li>
                                    </ol>
                                    <a href="#" title="View sample prescription" class="sample-prescription">View sample prescription</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            </section>
            
        </React.Fragment>
    )
}
export default UploadPrescription;