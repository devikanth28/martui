import React from 'react';
import DoctorDetailCard from "./DoctorDetailCard"
import PracticesWeOffer from "../LabHomePage/PracticesWeOffer"
import HealthPlusSubIcon from "../../images/common/health-plus-sub.png"
import RelatedArticlesSlider from "./RelatedArticlesSlider"
import DoctorDetailReviews from "./DoctorDetailReviews"
function DoctorDetailPage(props) {
    return (
        <React.Fragment>
            <div className="row mx-0">
                <div className="col-8 pl-0 pr-2">
                    <DoctorDetailCard/>
                    <DoctorDetailReviews/>
                </div>
                <div className="col-4 pr-0 pl-2">
                    <a className="mb-3 d-block" href="javascript:void(0)" title="Health Plus Subsciprion">
                        <img className="mb-3 img-fluid w-100" src={HealthPlusSubIcon} alt="Health Plus Subsciprion"/>
                    </a>
					<PracticesWeOffer isFromProductDetail={true}/>
                    <RelatedArticlesSlider/>
                </div>
            </div>
        </React.Fragment>
    );
}

export default DoctorDetailPage;