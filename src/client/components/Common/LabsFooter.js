import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { SET_LAB_CATALOG_DATA } from "../../../redux/reducer/MedplusCatalogReducer";
import { getCategoryNameForUrl } from "../../helpers/CommonUtil";
import Validate from "../../helpers/Validate";
import { DIAGNOSTICS_URL_PREFIX } from "../MedplusLabs/constants/LabConstants";
import LabCatalogService from "../MedplusLabs/Services/LabCatalogService";

const LabsFooter = (props) => {
    const validate = Validate();
    const dispatch = useDispatch();
    const labCatalogService = LabCatalogService();
    const labCatalogVersionNoKey = useSelector(state => validate.isNotEmpty(state) && validate.isNotEmpty(state.medplusCatalog) && validate.isNotEmpty(state.medplusCatalog.labCatalog) && validate.isNotEmpty(state.medplusCatalog.labCatalog.labCatalogVersionNoKey) ? state.medplusCatalog.labCatalog.labCatalogVersionNoKey : "");
    const labCategoryData = useSelector(state => validate.isNotEmpty(state) && validate.isNotEmpty(state.medplusCatalog) && validate.isNotEmpty(state.medplusCatalog.labCatalog) && validate.isNotEmpty(state.medplusCatalog.labCatalog.diagnosticCatalog) ? state.medplusCatalog.labCatalog.diagnosticCatalog : {});
    useEffect(() => {
        getLabCatgeoryData(labCatalogVersionNoKey);
    }, [])

    const getLabCatgeoryData = (labCatalogVersionNoKey) => {
        labCatalogService.getDiagnosticsCategories({ labCatalogVersionNoKey }).then((data) => {
            props.setDoctorReq(true);
            if (validate.isNotEmpty(data)) {
                if (data.statusCode == "SUCCESS" && data.message == "Different Keys") {
                    dispatch({ type: SET_LAB_CATALOG_DATA, data: data.dataObject });
                } else if(data.statusCode == "FAILURE"){
                    dispatch({ type: SET_LAB_CATALOG_DATA, data: {}});
                    console.log("Error while getting the Diagnostic Categories");
                } 
            }
        }).catch((err)=>{
            props.setDoctorReq(true);
        })
    }

    const getUrl = (categoryName, categoryId) => {
        if (categoryId.includes("LABS_")) {
            return (`${DIAGNOSTICS_URL_PREFIX}/sub-category/` + getCategoryNameForUrl(categoryName, categoryId))
        } else {
            return (`${DIAGNOSTICS_URL_PREFIX}/department/` + getCategoryNameForUrl(categoryName, categoryId));
        }
    }

    const getSubCategories = (categoryData) => {

        return (
            Object.entries(categoryData).map(([key, value]) => {
                return (
                    <React.Fragment>
                        <li onClick={() => props.history.push(getUrl( value, key))} title={value}>
                            <span className="pointer">
                                {value}
                            </span>
                           {/* {categoryData[Object.keys(categoryData)[Object.keys(categoryData).length-1]]!=value && 
                             } */}
                        </li>
                    </React.Fragment>
                )
            }))
    }

    return (
        <React.Fragment>
            {validate.isNotEmpty(labCategoryData) &&
                <div>
                    <h3 className="title">Diagnostics</h3>
                    {Object.entries(labCategoryData).map(([key, value]) => {
                        let categoryData = value;
                        return (
                            <ul className="inline-list w-100">
                                <li className="size-12">{key}</li>
                                {
                                    getSubCategories(categoryData)
                                }
                            </ul>

                        )
                    })}
                </div>}
            {
                validate.isEmpty(labCategoryData) &&
                <div>
                    <h3 className="title">Diagnostics</h3>
                    <ul className='inline-list'>
                        <li className='size-12'>Department Wise Diagnostic Tests</li>
                        <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/department/clinical-pathology_11`} title='Clinical Pathology'>Clinical Pathology</Link></li>
                        <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/department/profile-parameters_12`} title='Profile Parameters'>Profile Parameters</Link></li>
                        <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/department/serology_1`} title='Serology'>Serology</Link></li>
                        <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/department/microbiology_2`} title='Microbiology'>Microbiology</Link></li>
                        <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/department/biochemistry_3`} title='Biochemistry'>Biochemistry</Link></li>
                        <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/department/hematology_6`} title='Hematology'>Hematology</Link></li>
                        <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/department/molecular-biology_7`} title='Molecular Biology'>Molecular Biology</Link></li>
                    </ul>
                    <ul className='inline-list'>
                        <li className='size-12'>Radiology &amp; Imaging Services</li>
                        <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/mri_labs_20013`} title="MRI">MRI</Link></li>
                        <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/ct-scan_labs_20014`} title="CT Scan">CT Scan</Link></li>
                        <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/x-ray_labs_20015`} title="X-Ray">X-Ray</Link></li>
                        <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/3d-or-4d-ultrasound_labs_20017`} title="3D/4D UltraSound">3D/4D UltraSound</Link></li>
                        <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/mammography_labs_20018`} title="Mammography">Mammography</Link></li>
                        <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/tmt_labs_20019`} title="TMT">TMT</Link></li>
                        <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/eeg--or--enmg_labs_20020`} title="EEG/ENMg">EEG/ENMG</Link></li>
                        <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/2d-echo_labs_20021`} title="2D Echo">2D Echo</Link></li>
                        <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/bone-densitometry_labs_20022`} title="Bone Denistometry">Bone Denistometry</Link></li>
                        <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/dental-opg--or--cbct_labs_20023`} title="Dental OPG / CBCT">Dental OPG / CBCT</Link></li>
                        <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/audiometry_labs_20024`} title="Audiometry">Audiometry</Link></li>
                        <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/ecg-(electrocardiogram)_labs_20025`} title='ECG (Electrocardiogram)'>ECG (Electrocardiogram)</Link></li>
                        <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/video-endoscopy_labs_20026`} title="Video Endoscopy">Video Endoscopy</Link></li>
                        <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/pulmonary-function-test-(pft)_labs_20027`} title="Pulmonary Function Test (PFT)">Pulmonary Function Test (PFT)</Link></li>
                    </ul>
                    <ul className="inline-list">
                        <li className="size-12">Condition Based Diagnostic Tests</li>
                        <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/lab-profiles--n--packages_labs_20012`} title="Lab Profile and Packages">Lab Profiles &amp; Packages</Link></li>
                        <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/heart_labs_20028`} title='Heart'>Heart</Link></li>
                        <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/liver_labs_20029`} title='Liver'>Liver</Link></li>
                        <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/lungs_labs_20030`} title='Lungs'>Lungs</Link></li>
                        <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/fertility_labs_20031`} title='Fertility'>Fertility</Link></li>
                        <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/kidney_labs_20032`} title='Kidney'>Kidney</Link></li>
                        <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/allergy_labs_20033`} title='Allergy'>Allergy</Link></li>
                        <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/thyroid_labs_20034`} title='Thyroid'>Thyroid</Link></li>
                        <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/vitamins_labs_20035`} title='Vitamins'>Vitamins</Link></li>
                        <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/anaemia_labs_20036`} title='Anaemia'>Anaemia</Link></li>
                        <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/fever_labs_20037`} title='Fever'>Fever</Link></li>
                        <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/diabetes_labs_20038`} title='Diabetes'>Diabetes</Link></li>
                        <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/bone_labs_20039`} title='Bone'>Bone</Link></li>
                        <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/immunity_labs_20040`} title="Immunity">Immunity</Link></li>
                        <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/cancer_labs_20041`} title='Cancer'>Cancer</Link></li>
                        <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/hormones_labs_20042`} title='Hormones'>Hormones</Link></li>
                        <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/prostate_labs_20043`} title="Prostate">Prostate</Link></li>
                        <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/pregnancy_labs_20044`} title='Pregnancy'>Pregnancy</Link></li>
                        <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/hiv_labs_20045`} title='HIV'>HIV</Link></li>
                        <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/tuberculosis_labs_20046`} title='Tuberculosis'>Tuberculosis</Link></li>
                        <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/other-pathology-tests_labs_20047`} title='Other Pathology Tests'>Other Pathology Tests</Link></li>
                        <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/musculo-skeletal-disorders_labs_20048`} title="Musculo Skeletal Disorders">Musculo Skeletal Disorders</Link></li>
                        <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/toxicology_labs_20049`} title="Toxicology">Toxicology</Link></li>
                        <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/clotting-disorders_labs_20050`} title='Clotting Disorders'>Clotting Disorders</Link></li>
                        <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/drug-level-monitoring_labs_20051`} title='Drug level Monitoring'>Drug Level Monitoring</Link></li>
                        <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/heavy-metals_labs_20052`} title="Heavy Metals">Heavy Metals</Link></li>
                        <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/infectious-disease_labs_20053`} title="Infectious Disease">Infectious Disease</Link></li>
                        <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/blood-disorders_labs_20054`} title="Blood Disorders">Blood Disorders</Link></li>
                        <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/autoimmune-disorders_labs_20055`} title="Autoimmune Disorders">Autoimmune Disorders</Link></li>
                        <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/stomach_labs_20056`} title='Stomach'>Stomach</Link></li>
                        <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/inflammatory-markers_labs_20057`} title="Inflammatory Markers">Inflammatory Markers</Link></li>
                        <li><Link to={`${DIAGNOSTICS_URL_PREFIX}/sub-category/electrolytes_labs_20058`} title="Electrolytes">Electrolytes</Link></li>
                    </ul>
                </div>
            }


        </React.Fragment>

    )
}

export default LabsFooter;