import React from 'react';
import HomePageSeperator from "../../images/common/lab-home-seperator.png";
import {specialization,symptoms} from  './DoctorsStaticData'
function SymptomsViewAllPage(props) {
    return (
        <React.Fragment>
            <a href="javascript:void(0)" title="Doctor Consultation" className="my-4 d-block pb-2">
                <img src={HomePageSeperator} alt="Doctor Consultation" className="w-100"/>
            </a>
            <section className='bg-transparent shadow-none'>
                <div className="p-3">
                    <h5 className="mb-3">By Specialization</h5>
                    <div className='doctor-view-all-container'>
                        {specialization.map((each) => {
                            return (
                                    <div className="card border-0">
                                        <a href="javascript:void(0)" title={each.title} onClick={()=>{window.location.href = "/doctorSpecialization";}}>
                                            <div class="card-body p-2">
                                                <div className="img-container border">
                                                    {each.type == 'image' && <img src={each.imageSrc} alt={each.title} title={each.title} className="img-fluid" />}
                                                    {each.type == 'svg' && <span dangerouslySetInnerHTML={{ __html: each.svg }}>
                                                    </span>}
                                                </div>
                                                <h6 class="card-title">{each.title}</h6>
                                            </div>
                                        </a>
                                    </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
}

export default SymptomsViewAllPage;

