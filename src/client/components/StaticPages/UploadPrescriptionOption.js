import React from 'react';
import NoPrescriptionImg from '../../images/common/no-prescription-bg-cssbg.png'; 
import CommonHeader from '../Common/CommonHeader';
import Body from '../Common/Body';
const UploadPrescriptionMode = () =>{
    return(
        <React.Fragment>
        <CommonHeader/>
        <Body className="MyAccount">
        <main role="main" className="container-fluid">
        <nav aria-label="breadcrumb bg-none">
            <ol className="breadcrumb bg-none mb-0">
                <li className="breadcrumb-item"><a>Home</a></li>
                <li className="breadcrumb-item"><a>My Account</a></li>
            </ol>
        </nav>
        <section>
            <React.Fragment>
                <div className="header"><p>Upload Prescriptions</p></div>
                <div className="upload-prescription homepage mt-0">
                    <a className="back-btn" title="Back to options" href="javascript:void(0)">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                            <g transform="translate(-48.941 -316.765)">
                                <rect fill="none" width="24" height="24" transform="translate(48.941 316.765)"/>
                                <path fill="#e71c37" d="M59.108,319.236a.915.915,0,0,0-.6.238l-9.3,8.706a.938.938,0,0,0,0,1.312l9.3,8.586a.945.945,0,0,0,1.312-.119.936.936,0,0,0,0-1.312l-7.394-6.917H71.987a.954.954,0,0,0,0-1.908H52.429l7.513-6.917a.847.847,0,0,0,.358-.715,1.7,1.7,0,0,0-.238-.716A5.386,5.386,0,0,0,59.108,319.236Z" transform="translate(0 -0.471)"/>
                            </g>
                        </svg>
                        Back to options
                    </a>
                    <div className="row mx-0 pb-3">
                        <div className="col-6 upload-left-col p-0">
                            <div className="uploaded-prescriptions">
                                <div className="each-prescription">
                                    <img src="https://static2.medplusmart.com/displayprescriptionimages/static5/2020/1009/tn_P_W_a9981e1335629785b29bd9b73be9bb72.png" alt="prescription image" title="prescription image" height="100" />
                                        <span className="delete-prescription" title="Delete prescription" >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 16 16">
                                                <rect fill="none" width="16" height="16"/>
                                                <g transform="translate(0.66 0.001)">
                                                    <path fill="#fff" d="M4.153,15.839A2.273,2.273,0,0,1,1.9,13.56V3.169H.542a.543.543,0,0,1,0-1.086H4.477V1.931A1.921,1.921,0,0,1,6.389,0H8.8a1.925,1.925,0,0,1,1.913,1.932v.152H14.3a.543.543,0,0,1,0,1.086H13.287V13.56a2.274,2.274,0,0,1-2.255,2.279ZM2.97,13.559a1.19,1.19,0,0,0,1.182,1.193h6.88a1.191,1.191,0,0,0,1.183-1.192V3.169H2.97ZM5.553,1.932l0,.151H9.634V1.932a.843.843,0,0,0-.84-.846H6.387A.846.846,0,0,0,5.553,1.932ZM9.967,13.506a.569.569,0,0,1-.545-.594V6.459a.568.568,0,0,1,.545-.543h.02a.567.567,0,0,1,.567.54v6.5a.569.569,0,0,1-.568.546Zm-2.4,0a.57.57,0,0,1-.545-.594V6.455a.566.566,0,1,1,1.132,0v6.5a.569.569,0,0,1-.567.546Zm-2.4,0a.57.57,0,0,1-.545-.594V6.455a.566.566,0,1,1,1.132,0v6.5a.569.569,0,0,1-.568.546Z" transform="translate(0 0)"/>
                                                </g>
                                            </svg>
                                        </span>
                                    <p className="text-truncate" title="Srikanth_Prescription.jpg">Srikanth_Prescription.jpg</p>
                                </div>
                            </div>
                            <div className="no-prescription-div">
                                <img src={NoPrescriptionImg} title="no prescription" alt="no prescription" height="250"/>
                                <p>No Prescription Uploaded</p>
                            </div>
                        </div>
                        <div className="col-6 upload-right-col">
                            <div className="additional-notes">
                                <h6>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                                        <path d="M9.563.563a9,9,0,1,0,9,9A9,9,0,0,0,9.563.563Zm0,3.992A1.524,1.524,0,1,1,8.038,6.079,1.524,1.524,0,0,1,9.563,4.554Zm2.032,9.218a.436.436,0,0,1-.435.435H7.966a.436.436,0,0,1-.435-.435V12.9a.436.436,0,0,1,.435-.435H8.4V10.143H7.966a.436.436,0,0,1-.435-.435V8.837A.436.436,0,0,1,7.966,8.4h2.323a.436.436,0,0,1,.435.435v3.629h.435a.436.436,0,0,1,.435.435Z" transform="translate(-0.563 -0.563)"/>
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
                            <div className="file-upload-container">
                                <h6>Select file to upload<span className="text-brand ml-1">*</span></h6>
                                <input type="file" id="fileUpload" name="fileUpload" accept="image/*,application/pdf" multiple hidden />
                                <div className="add-more-div">
                                    <svg className="mr-3" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 44 44">
                                        <rect fill="none" width="44" height="44"></rect>
                                        <g transform="translate(0.5 4.659)">
                                            <path fill="#08ce73" d="M1407.005,661.592a3.914,3.914,0,1,0-3.915-3.914A3.913,3.913,0,0,0,1407.005,661.592Zm0-5.965a2.051,2.051,0,1,1-2.051,2.051A2.049,2.049,0,0,1,1407.005,655.627Z" transform="translate(-1382.43 -641.987)"></path>
                                            <path fill="#404040" d="M1433.671,651.231l-25.311-2.871a3.472,3.472,0,0,0-2.734.787,3.517,3.517,0,0,0-1.346,2.408l-.462,3.8h-1.437a3.722,3.722,0,0,0-3.569,3.843V670.5a7.091,7.091,0,1,0,7.41,11.246h21.61a3.8,3.8,0,0,0,3.893-3.611V677.4a4.643,4.643,0,0,0,1.763-.742,3.841,3.841,0,0,0,1.344-2.5l2.132-18.8A3.752,3.752,0,0,0,1433.671,651.231ZM1402.38,657.2h25.451a2.132,2.132,0,0,1,2.039,1.991v7.782h0l-10.106,5.88a2.37,2.37,0,0,1-2.736-.23l-5.1-4.494a4.135,4.135,0,0,0-5.148-.184l-3.743,2.72a7.06,7.06,0,0,0-2.375-.412V659.2A1.87,1.87,0,0,1,1402.38,657.2Zm-1.717,25.64a5.5,5.5,0,1,1,5.5-5.5A5.5,5.5,0,0,1,1400.663,682.845Zm29.207-4.707h0a1.952,1.952,0,0,1-2.039,1.759h-20.546a7.077,7.077,0,0,0-2.429-8.266l2.993-2.2a2.229,2.229,0,0,1,2.875.139l5.054,4.446a4.354,4.354,0,0,0,2.735,1.019,4.243,4.243,0,0,0,2.226-.6l9.131-5.279Zm5.241-23.035,0,.017-2.179,18.8a1.571,1.571,0,0,1-.6,1.249c-.187.185-.6.278-.6.371V659.2a3.984,3.984,0,0,0-3.893-3.843h-22.159l.417-3.611a1.842,1.842,0,0,1,2.087-1.575l25.264,2.917A1.853,1.853,0,0,1,1435.111,655.1Z" transform="translate(-1393.564 -648.325)"></path>
                                            <path fill="#e71c37" d="M1403.071,661.348a.715.715,0,0,0-.967-.292l-4.73,2.522-1-1.793a.713.713,0,0,0-1.248.692l1.339,2.409a.718.718,0,0,0,.96.284l5.348-2.854A.714.714,0,0,0,1403.071,661.348Z" transform="translate(-1391.819 -633.594)"></path>
                                        </g>
                                    </svg>
                                    Add More Records
                                </div>
                                <p>Supported Files: jpeg/jpg/png/gif/pdf, Size upto 4MB</p>
                                <div className="file-upload-progress-container">
                                    <div className="file-upload-details">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="56" viewBox="0 0 44 56">
                                            <g transform="translate(-6695.067 -3018.351)">
                                                <path fill="#777777" d="M1839.055,593.167H1809.98v56h44V608.018Zm.6,3.475,9.209,9.164,1.623,1.615h-10.832Zm12.279,50.488h-39.907V595.2h25.582v14.255h14.325Z" transform="translate(4885.087 2425.184)"></path>
                                                <path fill="#777777" d="M1.076-3.143V-7.285L.588-7.354a.434.434,0,0,1-.2-.088.222.222,0,0,1-.076-.181v-.429h.761v-.21a2.359,2.359,0,0,1,.146-.844,1.785,1.785,0,0,1,.444-.668,2.066,2.066,0,0,1,.744-.442,3.127,3.127,0,0,1,1.047-.159,3.446,3.446,0,0,1,.4.024,1.794,1.794,0,0,1,.354.073l-.034.546a.12.12,0,0,1-.122.115,2.881,2.881,0,0,1-.3.012,3,3,0,0,0-.771.085,1.289,1.289,0,0,0-.517.259,1,1,0,0,0-.29.429,1.8,1.8,0,0,0-.09.6v.181h3.05v4.909H4.092V-7.3H2.125v4.152Zm6.46-7.221v7.221H6.487v-7.221ZM12.1-6.192a1.542,1.542,0,0,0-.076-.49,1.148,1.148,0,0,0-.222-.4,1.012,1.012,0,0,0-.364-.263,1.236,1.236,0,0,0-.5-.1,1.213,1.213,0,0,0-.9.327,1.586,1.586,0,0,0-.415.917Zm-2.5.644a2.5,2.5,0,0,0,.132.734,1.514,1.514,0,0,0,.3.515,1.167,1.167,0,0,0,.449.3,1.618,1.618,0,0,0,.583.1,1.777,1.777,0,0,0,.532-.071,2.5,2.5,0,0,0,.39-.156q.166-.085.283-.156a.423.423,0,0,1,.215-.071.224.224,0,0,1,.2.1l.3.385a1.888,1.888,0,0,1-.42.371,2.445,2.445,0,0,1-.5.246,2.812,2.812,0,0,1-.542.137,3.671,3.671,0,0,1-.542.041,2.6,2.6,0,0,1-.959-.173,2.132,2.132,0,0,1-.766-.51,2.354,2.354,0,0,1-.507-.834,3.313,3.313,0,0,1-.183-1.147A2.8,2.8,0,0,1,8.72-6.7a2.3,2.3,0,0,1,.468-.781,2.2,2.2,0,0,1,.742-.525,2.423,2.423,0,0,1,.988-.193,2.364,2.364,0,0,1,.849.149,1.861,1.861,0,0,1,.673.437,2.008,2.008,0,0,1,.442.705,2.657,2.657,0,0,1,.159.949.669.669,0,0,1-.054.327.215.215,0,0,1-.2.083Z" transform="translate(6699.139 3072.134)"></path>
                                            </g>
                                        </svg>
                                        <a href="#" className="icons clear-icn" title=""></a>
                                        <div className="file-upload-progress">
                                            <small>Srikanth_Prescription.jpg</small>
                                            <div className="progress">
                                                <div className="bar progress-bar bg-success w-50" role="progressbar">   {/* change width for the progress bar */}
                                                    <span className="sr-only percent">0% Complete</span>
                                                </div>
                                            </div>
                                            <small className="float-left">
                                                3.5 MB upto 4 MB
                                            </small>
                                            <small className="file-uploading-text">
                                                Uploading.. <span className="text-dark ml-1 percent">0%</span>
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
            <div className="border-top p-3">
                <div className="row align-items-center no-gutters">
                    <div className="col-12 text-right">
                        <button type="button" className="brand-secondary btn px-5 rounded-pill py-2" >Back</button>
                        <button type="submit" className="btn btn-brand-gradient ml-3 px-5 rounded-pill py-2">Proceed</button>
                    </div>
                </div>
            </div>
        </section>
        </main>
            </Body>
        </React.Fragment>
        
    )
}
export default UploadPrescriptionMode;