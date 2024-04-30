import React, { useEffect, useState } from 'react';
import { getAvailabilityTime, getConsultationString, getConsultationType, VISIT_TYPE_ONLINE, VISIT_TYPE_WALK_IN } from '../../constants/DoctorConsultationConstants';
import Validate from '../../../helpers/Validate';
import { DoctorExperience } from './DoctorDetailCard';
import DoctorImage from './DoctorImage';
import { getSelectedLocality } from '../../../../redux/action/LocalityAction';
import BookAppointment from '../common/BookAppointment';
import { getDecodedURL } from '../../../helpers/CommonUtil';
import StrecturedDataDoctorList from './StrecturedDataDoctorList';
import FadeInSection from '../../../MedplusMart/components/MartCatalog/ProductCategory/CategoryDetail/Fadein';

export const DoctorCard = (props) => {

    const doctorInfo = props.doctorInfo;
    const clinicId = Validate().isNotEmpty(props.clinicId) ? props.clinicId : '';
    const visitType = props.visitType;
    const [onlineAvailability, setOnlineAvailability] = useState(false);
    const [walkinAvailability, setWalkinAvailability] = useState(false);
    const [visitAvailable, setVisitAvailable] = useState(null);
    const [clinics, setClinics] = useState([]);
    const selectedLocality = getSelectedLocality();
    const [doctorRating, setDoctorRating] = useState(null);
    const [doctorReviews, setDoctorReviews] = useState(null);

    useEffect(() => {
        setAvailibility();
    }, [])

    const setAvailibility = () => {
        let isOnlineAvailable;
        let isWalkinAvailable;
        try {
            isOnlineAvailable = Validate().isNotEmpty(doctorInfo.priceData.TELE_MEDICINE.nearestSlot);
            setOnlineAvailability(isOnlineAvailable);
            if (visitType === VISIT_TYPE_ONLINE && isOnlineAvailable) {
                setVisitAvailable(VISIT_TYPE_ONLINE);
            }
        } catch (err) {
            setOnlineAvailability(false);
        }
        try {
            isWalkinAvailable = Validate().isNotEmpty(doctorInfo.priceData.WALKIN.slotClinics);
            setClinics(doctorInfo.priceData.WALKIN.slotClinics);
            setWalkinAvailability(isWalkinAvailable);
            if (visitType === VISIT_TYPE_WALK_IN && isWalkinAvailable) {
                setVisitAvailable(VISIT_TYPE_WALK_IN);
            }
        } catch (err) {
            setWalkinAvailability(false);
        }
        if (Validate().isEmpty(visitType)) {
            if (isOnlineAvailable && !isWalkinAvailable) {
                setVisitAvailable(VISIT_TYPE_ONLINE);
            }
            if (isWalkinAvailable && !isOnlineAvailable) {
                setVisitAvailable(VISIT_TYPE_WALK_IN);
            }
        }
    }

    const isOnlineDoctor = () => {
        let startInMinutes = undefined;
        if (onlineAvailability) {
            startInMinutes = doctorInfo.priceData.TELE_MEDICINE.nearestSlot.startInMinutes;
        }
        if (Validate().isNotEmpty(startInMinutes) && startInMinutes < 180)
            return true;
        return false;
    }

    const getMoreClinicsString = (clinics) => {
        if ((clinics.length - 1) > 0) {
            return `(+${clinics.length - 1} ${clinics.length - 1 > 1 ? 'stores' : 'store'})`;
        }
        return '';
    }

    const getDirectionLink = (latLong) => {
        return (latLong && selectedLocality) ? "http://maps.google.com/?saddr=" + selectedLocality.locationLatLong + "&daddr=" + latLong : "";
    }

    const viewDetails = () => {
        if (props.categoryType) {
            props.history.push('/doctorconsultation/categorydoctor/' + getDecodedURL(doctorInfo.name).toLowerCase() + '_' + doctorInfo.doctorId + '/' + props.searchString + '/' + props.categoryType + '/' + getConsultationString(props.visitType));
        } else if (props.searchString) {
            props.history.push('/doctorconsultation/categorynamedoctor/' + getDecodedURL(doctorInfo.name).toLowerCase() + '_' + doctorInfo.doctorId + '/' + props.searchString + '/' + getConsultationString(props.visitType));
        } else if (props.isFromViewAll) {
            props.history.push('/doctorconsultation/doctorfromviewall/' + getDecodedURL(doctorInfo.name).toLowerCase() + '_' + doctorInfo.doctorId + '/true/' + getConsultationString(props.visitType));
        } else {
            props.history.push('/doctorconsultation/doctor/' + getDecodedURL(doctorInfo.name).toLowerCase() + '_' + doctorInfo.doctorId + '/' + getConsultationString(props.visitType));
        }
    }

    return (
        <React.Fragment>
            {Validate().isNotEmpty(doctorInfo) && <StrecturedDataDoctorList name={doctorInfo.name} image={doctorInfo.profile} jobTitle={doctorInfo.speciality} qualification={doctorInfo.qualification} visitType={visitType}/>}
            {Validate().isNotEmpty(doctorInfo) && <div className="card">
                <div className="card-body p-3">
                    <button role="button" className="btn btn-link w-100 p-0 text-left text-dark no-underline" onClick={viewDetails}>
                        <div className="d-flex align-items-center mb-2" >
                            <div className="consultaion-appointment">
                                <FadeInSection>
                                    <DoctorImage doctorInfo={doctorInfo} className={"doctors-image"} history={props.history} id={doctorInfo.doctorId} visitType={visitType} />
                                </FadeInSection>
                                {onlineAvailability && <span className={isOnlineDoctor() ? "doctor-status online" : "doctor-status idle"}></span>}
                            </div>
                            <div>
                                <h6 className="mb-0 text-truncate">{"Dr. " + doctorInfo.name}</h6>
                                <DoctorSpeciality speciality={doctorInfo.speciality} ClassName={"text-secondary text-truncate d-block font-14"} />
                                <DoctorQualification qualification={doctorInfo.qualification} department={doctorInfo.department} ClassName={"font-14 text-truncate"} />
                            </div>
                        </div>
                    </button>
                    <DoctorExperience className={"font-14 my-2"} experienceYears={doctorInfo.experienceYears} experienceMonths={doctorInfo.experienceMonths} />

                    {Validate().isNotEmpty(doctorInfo.noOfConsultations) && <p className="font-14 my-2"> <strong>{doctorInfo.noOfConsultations}</strong> online consultaions completed</p>}
                    {(Validate().isNotEmpty(doctorRating) || Validate().isNotEmpty(doctorReviews)) && <div className="d-flex align-items-center">
                        {Validate().isNotEmpty(doctorRating) && <a href="javascript:void(0)" title="Doctor ratings" className="btn btn-link btn-sm ml-n2 mr-3 text-primary no-underline">
                            <svg className="mr-2 align-middle mt-n1" xmlns="http://www.w3.org/2000/svg" width="16" height="16.334" viewBox="0 0 16 16.334">
                                <g id="rating-stroke-icon" transform="translate(-1418 -715)">
                                    <rect id="Rectangle_6524" data-name="Rectangle 6524" width="16" height="16" transform="translate(1418 715)" fill="none" />
                                    <path id="noun_rating_1847488" d="M17.25,22.8l3.6,2.62a.725.725,0,0,0,1.119-.813L20.6,20.362l3.6-2.626v.007a.731.731,0,0,0-.425-1.324H19.318L17.94,12.173a.723.723,0,0,0-1.381,0l-1.377,4.246H10.729a.734.734,0,0,0-.729.735.726.726,0,0,0,.3.589v0l3.6,2.623s-1.377,4.245-1.374,4.245a.722.722,0,0,0,1.115.813Z" transform="translate(1408.5 704.834)" fill="none" stroke="#343a40" stroke-width="1" />
                                </g>
                            </svg>
                            4.5
                        </a>}
                        {Validate().isNotEmpty(doctorReviews) && <a href="javascript:void(0)" title="Doctor reviews" className="btn btn-link btn-sm text-primary no-underline">
                            <svg className="mr-2 align-middle" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                <g id="review-stroke-icn" transform="translate(-1417.5 -755)">
                                    <rect id="Rectangle_6525" data-name="Rectangle 6525" width="16" height="16" transform="translate(1418 755)" fill="none" />
                                    <g id="noun_review_1966404" transform="translate(1418 756.778)">
                                        <g id="Group_22655" data-name="Group 22655" transform="translate(0 0)">
                                            <path id="Path_29901" data-name="Path 29901" d="M10.366,11.5c4.33,0,7.834,2.645,7.834,5.914a4.941,4.941,0,0,1-1.466,3.437,12.6,12.6,0,0,0,1.634,2.544.643.643,0,0,1-.59,1.061,18.736,18.736,0,0,1-4.532-1.55,10.007,10.007,0,0,1-2.881.421c-4.33,0-7.834-2.645-7.834-5.914S6.036,11.5,10.366,11.5Zm2.443,5.509.59.573a.062.062,0,0,1,.017.051l-.135.792a.108.108,0,0,0,.152.118l.708-.387a.032.032,0,0,1,.051,0l.708.371a.1.1,0,0,0,.152-.118l-.135-.792a.062.062,0,0,1,.017-.051l.573-.556a.107.107,0,0,0-.051-.185l-.809-.118c-.017,0-.034-.017-.051-.034l-.354-.708a.1.1,0,0,0-.185,0l-.354.724c-.017.017-.034.034-.051.034l-.792.118A.094.094,0,0,0,12.809,17.009Zm-3.791,0,.573.573a.062.062,0,0,1,.017.051l-.135.792a.108.108,0,0,0,.152.118l.724-.387a.032.032,0,0,1,.051,0l.708.371a.1.1,0,0,0,.152-.118l-.135-.792a.062.062,0,0,1,.017-.051l.573-.573a.107.107,0,0,0-.051-.185l-.809-.118c-.017,0-.034-.017-.051-.034l-.354-.708a.1.1,0,0,0-.185,0l-.354.724c-.017.017-.034.034-.051.034l-.792.118A.108.108,0,0,0,9.018,17.009Zm-3.808,0,.573.573c.034.017.034.034.034.051l-.135.792a.108.108,0,0,0,.152.118l.708-.387a.032.032,0,0,1,.051,0l.708.371a.1.1,0,0,0,.152-.118l-.135-.792a.062.062,0,0,1,.017-.051l.573-.556a.107.107,0,0,0-.051-.185l-.809-.118c-.017,0-.034-.017-.051-.034l-.337-.708a.1.1,0,0,0-.185,0l-.354.724c-.017.017-.034.034-.051.034l-.792.118A.1.1,0,0,0,5.211,17.009Z" transform="translate(-2.532 -11.5)" fill="none" stroke="#343a40" stroke-width="1" />
                                        </g>
                                    </g>
                                </g>
                            </svg>
                            50 Reviews
                        </a>}
                    </div>}
                    {/* <span className="text-secondary small">Available for</span>
                        <p className="mb-0 font-14 font-weight-bold">Video / Audio Call in next 15mins</p> */}

                    {/* for store walkin use this */}

                    
                    {((visitType === VISIT_TYPE_ONLINE && onlineAvailability) || (Validate().isEmpty(visitType) && onlineAvailability && !walkinAvailability)) && <div>
                        <span className="text-secondary small">Available for</span>
                        <p className="mb-0 font-14 font-weight-bold">Online Consultation {getAvailabilityTime(doctorInfo.priceData.TELE_MEDICINE.nearestSlot)}</p>
                    </div>}
                    {((visitType === VISIT_TYPE_WALK_IN && walkinAvailability) || (Validate().isEmpty(visitType) && !onlineAvailability && walkinAvailability)) && <div>
                        <span className="text-secondary small">Available at</span>
                        <p className="mb-0 font-14 font-weight-bold">{clinics[0].name} {getMoreClinicsString(clinics)}</p>
                        <small><a className="no-underline text-primary pointer btn btn-sm px-0" title="Click to get directions" href={getDirectionLink(clinics[0].locationLatLong)} target="_blank">Distance {parseFloat(clinics[0].distance).toFixed(2)}kms</a></small>
                    </div>}
                    {Validate().isEmpty(visitType) && onlineAvailability && walkinAvailability && <div>
                        <span className="text-secondary small">Available for</span>
                        <p className="mb-0 font-14 font-weight-bold">Online / Clinic Visit</p>
                    </div>}
                </div>
                <div className="card-footer bg-white px-0">
                    <div className="d-flex text-center px-3">
                        <div className="col px-0">
                            <button role="button" type="button" className="btn btn-link custom-btn-lg btn-block no-underline text-primary rounded-pill" onClick={viewDetails}>View Details</button>
                        </div>
                        {(onlineAvailability || walkinAvailability) && <div className="col-7 pr-0">
                            <BookAppointment className={"btn btn-brand-gradient rounded-pill custom-btn-lg btn-block"} consultationType={visitAvailable} doctorId={Validate().isNotEmpty(doctorInfo) ? doctorInfo.doctorId : ""} doctorName={Validate().isNotEmpty(doctorInfo) ? doctorInfo.name : ""} clinicId={clinicId} history={props.history} />
                        </div>}
                    </div>
                </div>
            </div>}
        </React.Fragment>
    );
}

const DoctorSpeciality = (props) => {
    return <React.Fragment>
        {Validate().isNotEmpty(props.speciality) && <small className={props.ClassName}>{props.speciality.join(", ")}</small>}
    </React.Fragment>
}

const DoctorQualification = (props) => {
    return <React.Fragment>
        {(Validate().isNotEmpty(props.qualification) || Validate().isNotEmpty(props.department)) && <p className={props.ClassName}>{props.qualification.join(", ")}{(Validate().isEmpty(props.qualification) || Validate().isEmpty(props.department)) ? "" : " - "}{props.department ? props.department : ""}</p>}
    </React.Fragment>
}

export default DoctorCard;