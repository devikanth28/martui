import React from 'react';
import DoctorThankYouHeader from "./DoctorThankYouHeader"
import DoctorReviewDetail from "./DoctorReviewDetail"
import DoctorCartSummary from "./DoctorCartSummary"
import DoctorThankyouGhostImages from './DoctorThankyouGhostImages';

function DoctorThankYouPage(props) {
    return (
        <React.Fragment>
            <div className="container-lg container-fluid">
                <div className="row px-sm-3">
                    <div className="col-8 pl-0 pr-2 mx-auto">
                        <section className="thank-you-section body-height-single-nav-no-footer">
                            <DoctorThankYouHeader />
                            <div className="row no-gutters pb-3">
                                <div className='col-12 px-0 pb-3 mt-4'>
                                    <DoctorReviewDetail fromThankYou={true} walkIn={true}/>
                                </div>
                                <div class="col mt-4 px-0">
                                    <DoctorCartSummary fromThankYou={true} />
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            <footer class="footer fixed-bottom mt-auto py-2 pr-3">
                <div class="container-lg container-fluid  px-0 px-sm-3">
                    <div class="row align-items-center no-gutters">
                        <div class="col-12 text-right"><button role="button" class="btn brand-secondary px-5" onClick={()=>{window.location.href = "/";}}>Continue Shopping</button></div>
                    </div>
                </div>
            </footer>
            <DoctorThankyouGhostImages/>
        </React.Fragment>
    );
}

export default DoctorThankYouPage;