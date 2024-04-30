import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedLocality } from "../../../redux/action/LocalityAction";
import { SET_DOCTORS_CATALOG_DATA } from "../../../redux/reducer/MedplusCatalogReducer";
import DoctorConsultationService from "../../DoctorConsultation/services/DoctorConsultationService";
import { getDoctorsUrl } from "../../helpers/CommonUtil";
import Validate from "../../helpers/Validate";
import { Link } from 'react-router-dom';

const DoctorsFooter = (props) => {
    const validate = Validate();
    const doctorConsultationService = DoctorConsultationService();
    const dispatch = useDispatch();
    const doctorLatLongVersionKey = useSelector(state => validate.isNotEmpty(state) && validate.isNotEmpty(state.medplusCatalog) && validate.isNotEmpty(state.medplusCatalog.doctorCatalog) && validate.isNotEmpty(state.medplusCatalog.doctorCatalog.doctorLatLongVersionKey) ? state.medplusCatalog.doctorCatalog.doctorLatLongVersionKey : "");
    const doctorsCategory = useSelector(state => validate.isNotEmpty(state) && validate.isNotEmpty(state.medplusCatalog) && validate.isNotEmpty(state.medplusCatalog.doctorCatalog) && validate.isNotEmpty(state.medplusCatalog.doctorCatalog.doctorsCatalog) ? state.medplusCatalog.doctorCatalog.doctorsCatalog : "");
    useEffect(() => {
        getDoctorsCategory(doctorLatLongVersionKey);
    }, [])

    const getDoctorsCategory = (doctorLatLongVersionKey) => {
        doctorConsultationService.getDoctorsCategories({ doctorLatLongVersionKey }).then((data) => {
            if (validate.isNotEmpty(data)) {
                if (data.statusCode == "SUCCESS" && data.message == "Different Keys") {
                    dispatch({ type: SET_DOCTORS_CATALOG_DATA, data: data.dataObject });
                } else if(data.statusCode == "FAILURE"){
                    dispatch({ type: SET_DOCTORS_CATALOG_DATA, data: {}});
                    console.log("Error while getting the Doctors Categories");
                }
            }
           
        })
    }

    const getSubCategories = (subCategoryData, topCategoryName) => {
        return (
            Object.entries(subCategoryData).map(([key, value]) => {
                return (
                    <React.Fragment>
                            <li onClick={() => props.history.push(getDoctorsUrl(topCategoryName, value, key))} title={value}>
                                <span className="pointer">
                                    {value}
                                </span>
                                {/* {subCategoryData[Object.keys(subCategoryData)[Object.keys(subCategoryData).length-1]]!=value && 
                            <span className="mx-2">/</span>} */}
                            </li>
                    </React.Fragment>
                )
            }))
    }

    return (
        <React.Fragment>
            {validate.isNotEmpty(doctorsCategory) && <div>
                <h3 className="title">Doctor Consultation</h3>
                {Object.entries(doctorsCategory).map(([key, value]) => {
                    let subCategoryData = value;
                    return (
                        <ul className="inline-list w-100">
                            <li className="size-12">{key}</li>
                            {
                                getSubCategories(subCategoryData, key)
                            }
                        </ul>

                    )
                })}
            </div>
            }
            {
                validate.isEmpty(doctorsCategory) &&
                <div>
                    <h3 className='title'>Doctor Consultation</h3>
                    <ul className="inline-list">
                        <li className="size-12">By Specialization:</li>
                        <li><Link to="/doctorconsultation/doctors/specialization_general-medicine_1" title="General Medicine">General Medicine</Link></li>
                        <li><Link to="/doctorconsultation/doctors/specialization_family-practice_3" title="Family Practice">Family Practice</Link></li>
                        <li><Link to="/doctorconsultation/doctors/specialization_paediatrics_4" title="Paediatrics">Paediatrics</Link></li>
                        <li><Link to="/doctorconsultation/doctors/specialization_obstetrics-and-gynaecology_5" title="Obstetrics and Gynaecology">Obstetrics and Gynaecology</Link></li>
                        <li><Link to="/doctorconsultation/doctors/specialization_diabetology_6" title="Diabetology">Diabetology</Link></li>
                        <li><Link to="/doctorconsultation/doctors/specialization_diabetes-n-endocrinology_7" title="Diabetes and Endocrinology">Diabetes and Endocrinology</Link></li>
                        <li><Link to="/doctorconsultation/doctors/specialization_cardiology_8" title="Cardiology">Cardiology</Link></li>
                        <li><Link to="/doctorconsultation/doctors/specialization_neurology_10" title="Neurology">Neurology</Link></li>
                        <li><Link to="/doctorconsultation/doctors/specialization_dermatology_19" title="Dermatology">Dermatology</Link></li>
                        <li><Link to="/doctorconsultation/doctors/specialization_ent_26" title="ENT">ENT</Link></li>
                        <li><Link to="/doctorconsultation/doctors/specialization_infectious-disease_35" title="Infectious Disease">Infectious Disease</Link></li>
                        <li><Link to="/doctorconsultation/doctors/specialization_cosmetology_56" title="Cosmetology">Cosmetology</Link></li>
                        <li><Link to="/doctorconsultation/doctors/specialization_reproductive-medicine_65" title="Reproductive Medicine">Reproductive Medicine</Link></li>
                        <li><Link to="/doctorconsultation/doctors/specialization_paediatric-allergology_72" title="Paediatric Allergology">Paediatric Allergology</Link></li>
                        <li><Link to="/doctorconsultation/doctors/specialization_paediatric-infectious-disease_77" title="Paediatric Infectious Disease">Paediatric Infectious Disease</Link></li>
                        <li><Link to="/doctorconsultation/doctors/specialization_ivf_95" title="IVF">IVF</Link></li>
                        <li><Link to="/doctorconsultation/doctors/specialization_complicated-pregnancy_132" title="Complicated Pregnancy">Complicated Pregnancy</Link></li>
                        <li><Link to="/doctorconsultation/doctors/specialization_audiology_138" title="Audiology">Audiology</Link></li>
                    </ul>
                    <ul className="inline-list">
                        <li className="size-12">By Symptoms:</li>
                        <li><Link to="/doctorconsultation/doctors/symptoms_chest-pain_1" title="Chest Pain">Chest Pain</Link></li>
                        <li><Link to="/doctorconsultation/doctors/symptoms_cold-and-fever_2" title="Cold and Fever">Cold and Fever</Link></li>
                        <li><Link to="/doctorconsultation/doctors/symptoms_depression_3" title="Depression">Depression</Link></li>
                        <li><Link to="/doctorconsultation/doctors/symptoms_weight-loss_4" title="Weight Loss">Weight Loss</Link></li>
                        <li><Link to="/doctorconsultation/doctors/symptoms_constipation_5" title="Constipation">Constipation</Link></li>
                        <li><Link to="/doctorconsultation/doctors/symptoms_dark-circles_7" title="Dark Circles">Dark Circles</Link></li>
                        <li><Link to="/doctorconsultation/doctors/symptoms_low-back-pain_8" title="Low Back Pain">Low Back Pain</Link></li>
                        <li><Link to="/doctorconsultation/doctors/symptoms_irregular-periods_9" title="Irregular Periods">Irregular Periods</Link></li>
                        <li><Link to="/doctorconsultation/doctors/symptoms_throat-pain_10" title="Throat Pain">Throat Pain</Link></li>
                        <li><Link to="/doctorconsultation/doctors/symptoms_hair-fall_11" title="Hair Fall">Hair Fall</Link></li>
                        <li><Link to="/doctorconsultation/doctors/symptoms_breathing-problems_12" title="Breathing Problems">Breathing Problems</Link></li>
                        <li><Link to="/doctorconsultation/doctors/symptoms_acne-and-scars_14" title="Acne and Scars">Acne and Scars</Link></li>
                        <li><Link to="/doctorconsultation/doctors/symptoms_abdominal-pain_15" title="Abdominal Pain">Abdominal Pain</Link></li>
                        <li><Link to="/doctorconsultation/doctors/symptoms_sexual-health_17" title="Sexual Health">Sexual Health</Link></li>
                        <li><Link to="/doctorconsultation/doctors/symptoms_pregnancy_18" title="Pregnancy">Pregnancy</Link></li>
                    </ul>
                </div>
            }


        </React.Fragment>

    )
}
export default DoctorsFooter;