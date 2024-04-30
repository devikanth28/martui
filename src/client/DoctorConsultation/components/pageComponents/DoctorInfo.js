import pathToRegexp from 'path-to-regexp';
import React, { useEffect, useState } from "react";
import LabsBanner from "../../../components/MedplusLabs/components/Common/LabsBanner";
import DoctorPracticesWeOffer from '../common/DoctorPracticesWeOffer';
import { getDecodedURL } from "../../../helpers/CommonUtil";
import Validate from "../../../helpers/Validate";
import { getConsultationType, VISIT_TYPE_BOTH, VISIT_TYPE_ONLINE, VISIT_TYPE_WALK_IN } from "../../constants/DoctorConsultationConstants";
import DoctorConsultationService from "../../services/DoctorConsultationService";
import { DoctorDetailCard } from "../moduleComponents/DoctorDetailCard";
import DoctorDetailGhostImage from "../moduleComponents/DoctorDetailGhostImage";
import NoDoctorsAvailable from "../moduleComponents/NoDoctorsAvailable";
import DoctorDetailStercturedData from '../moduleComponents/DoctorDetailStercturedData';
import { Helmet } from 'react-helmet';

const DoctorInfo = (props) => {

    const [doctorInfo, setDoctorInfo] = useState({});
    let validate = Validate();
    const doctorName_Id = props.match.params.doctorId;
    const [selectedVisitType, setSelectedVisitType] = useState(getConsultationType(props.match.params.visitType));
    const [doctorName, setDoctorName] = useState("");
    const [doctorAvailability, setDoctorAvailability] = useState("");
    const [slotClinics, setSlotClinics] = useState([]);
    const [initialLoader, setInitialLoader] = useState(true);
    const [noDoctorsAvailable, isNoDoctorsAvailable] = useState(false);
    let doctorId = doctorName_Id.indexOf('_') != -1 ? doctorName_Id.split("_")[1] : doctorName_Id;
    useEffect(() => {
        getDoctorInfo(doctorId);
    }, [])

    const getDoctorInfo = (id) => {
        let obj = {};
        obj['doctorId'] = id;
        DoctorConsultationService().getDoctorInfo(obj).then(response => {
            if (validate.isNotEmpty(response) && response.statusCode == "SUCCESS") {
                if (doctorName_Id != getDecodedURL(response.dataObject.name).toLowerCase() + "_" + response.dataObject.doctorId) {
                    const toPath = pathToRegexp.compile(props.match.path);
                    const newPath = toPath({ ...props.match.params, doctorId: getDecodedURL(response.dataObject.name).toLowerCase() + "_" + response.dataObject.doctorId });
                    props.history.push(newPath);
                }
                setDoctorDetails(response.dataObject);
                isNoDoctorsAvailable(false);
            } else {
                isNoDoctorsAvailable(true);
                console.log(response.message);
            }
            setInitialLoader(false);
        }).catch(function (error) {
            console.log(error);
            setInitialLoader(false);
        });
    }

    const setDoctorDetails = (doctorDetails) => {
        props.setBreadCrumbDoctorName(validate.isNotEmpty(doctorDetails) && validate.isNotEmpty(doctorDetails.name) ? 'Dr. ' + doctorDetails.name : "");
        setDoctorInfo({ ...doctorInfo, ...doctorDetails });
        setDoctorName(...doctorName, validate.isNotEmpty(doctorDetails) && validate.isNotEmpty(doctorDetails.name) ? 'Dr. ' + doctorDetails.name : "" );
        let walkin = (validate.isNotEmpty(doctorDetails) && validate.isNotEmpty(doctorDetails.priceData) && validate.isNotEmpty(doctorDetails.priceData.WALKIN) && validate.isNotEmpty(doctorDetails.priceData.WALKIN.nearestSlot)) ? VISIT_TYPE_WALK_IN : "";
        let online = (validate.isNotEmpty(doctorDetails) && validate.isNotEmpty(doctorDetails.priceData) && validate.isNotEmpty(doctorDetails.priceData.TELE_MEDICINE) && validate.isNotEmpty(doctorDetails.priceData.TELE_MEDICINE.nearestSlot)) ? VISIT_TYPE_ONLINE : "";
        if (validate.isNotEmpty(walkin) && validate.isNotEmpty(online)) {
            setDoctorAvailability(VISIT_TYPE_BOTH);
            if (validate.isEmpty(selectedVisitType)) {
                setSelectedVisitType(VISIT_TYPE_ONLINE);
            }
        } else if (validate.isNotEmpty(walkin)) {
            setDoctorAvailability(walkin);
            setSelectedVisitType(VISIT_TYPE_WALK_IN);
        } else if (validate.isNotEmpty(online)) {
            setDoctorAvailability(online);
            setSelectedVisitType(VISIT_TYPE_ONLINE);
        }
        setSlotClinics(...slotClinics, validate.isNotEmpty(doctorDetails) && validate.isNotEmpty(doctorDetails.priceData) && validate.isNotEmpty(doctorDetails.priceData.WALKIN) && validate.isNotEmpty(doctorDetails.priceData.WALKIN.slotClinics) ? doctorDetails.priceData.WALKIN.slotClinics.slice(0, 2) : []);
    }

    return (
        <React.Fragment>
            <Helmet>
                <title>{`${validate.isNotEmpty(doctorInfo) && validate.isNotEmpty(doctorInfo.serviceMetaData) && doctorInfo.serviceMetaData.metaTitle ? doctorInfo.serviceMetaData.metaTitle : validate.isNotEmpty(doctorInfo) && validate.isNotEmpty(doctorInfo.name) ? `Doctor ${doctorInfo.name}` : 'MedPlusMart'}`}</title>
            </Helmet>
            {(!initialLoader && !noDoctorsAvailable) && validate.isNotEmpty(doctorInfo) && <DoctorDetailStercturedData name={doctorInfo.name} image={doctorInfo.profile} jobTitle={doctorInfo.speciality} qualification={doctorInfo.qualification} registrationNumber={doctorInfo.registrationNo} avail={doctorAvailability} desc={doctorInfo.about}/> }
            <div className="row mx-0">
                <div className="col-8 pl-0 pr-2">
                    {initialLoader && <DoctorDetailGhostImage />}
                    {!initialLoader && validate.isNotEmpty(doctorInfo) &&
                        <DoctorDetailCard doctorInfo={doctorInfo} doctorName={doctorName} doctorAvailability={doctorAvailability} slotClinics={slotClinics} visitType={selectedVisitType} setSelectedVisitType={setSelectedVisitType} history={props.history} />
                    }
                    {/* <DoctorDetailReviews/> */}
                    {noDoctorsAvailable &&
                        <NoDoctorsAvailable message={"No doctor found"} noContent={true} history={props.history} />
                    }
                </div>
                <div className="col-4 pr-0 pl-2">
                    <LabsBanner requestFor={'BANNER_DOCTORS_WEB'} fromProductDetail={true} page={"DOCTORDETAIL"} screenLocation={"TOP_RIGHT"} history={props.history} />
                    <DoctorPracticesWeOffer isFromDoctorDetail={true} />
                    {/* <RelatedArticlesSlider/> */}
                </div>
            </div>
        </React.Fragment>
    );
}
export default DoctorInfo;