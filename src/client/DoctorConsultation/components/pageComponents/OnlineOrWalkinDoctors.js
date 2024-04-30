import React, { useEffect } from 'react';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import LabsBanner from '../../../components/MedplusLabs/components/Common/LabsBanner';
import Validate from '../../../helpers/Validate';
import { CATEGORY_LIST_TYPE_SPECIALIZATIONS, getSelectedFiltersAndSortFromUrl, sortAndFilterRequestConst, sortAndFilterResponseConst, VISIT_TYPE_ONLINE, VISIT_TYPE_WALK_IN } from '../../constants/DoctorConsultationConstants';
import DoctorCategorySlider from '../common/DoctorCategorySlider';
import AvailableDoctors from '../moduleComponents/AvailableDoctors';
import DoctorSortAndFilter from '../moduleComponents/DoctorSortAndFilter';
import NoDoctorsAvailable from '../moduleComponents/NoDoctorsAvailable';
import OtherAvailableDoctors from '../moduleComponents/OtherAvailableDoctors';

const OnlineOrWalkinDoctors = (props) => {
   
    const [selectedVisitType,setSelectedVisitType] = useState(props.isOnline?VISIT_TYPE_ONLINE:VISIT_TYPE_WALK_IN);
    const [othersDoctorsErrorMessage, setOthersDoctorsErrorMessage] = useState('');
    const [availableDoctorsErrorMessage, setAvailableDoctorsErrorMessage] = useState('');
    const [specializationsAvailable,setSpecializationsAvailable] = useState(false);
    const [dataErrorMessage, setDataErrorMessage] = useState('');
    const [avlDoctorsCount,setAvlDoctorsCount] = useState(0);
    const [otherDoctorsCount,setOtherDoctorsCount] = useState(0);
    const [totalCount,setTotalCount] = useState(0);
    const [visibleDoctorCount,setVisibleDoctorCount] = useState(0)

    let sortAndFilterString = props.history.location.search;
    let pathName = props.history.location.pathname;
    const paramValue = pathName.split("/doctors/")[1];
    sortAndFilterString = Validate().isNotEmpty(sortAndFilterString) && sortAndFilterString.length > 1 ? sortAndFilterString.substring(1, sortAndFilterString.length) : {};
    const selectedFiltersAndSortFromUrl = getSelectedFiltersAndSortFromUrl(sortAndFilterString);

    const requestObjForSortAndFilters = {
        "visitType" : selectedVisitType,
        "requestFrom" : "WEB",
        "paramValue"  : paramValue,
        "forSortAndFilterRequest" : true
    }

    useEffect(() => {
        if (Validate().isNotEmpty(availableDoctorsErrorMessage) && Validate().isNotEmpty(othersDoctorsErrorMessage) && !specializationsAvailable) {
            if (availableDoctorsErrorMessage === othersDoctorsErrorMessage) {
                setDataErrorMessage(availableDoctorsErrorMessage);
            } else {
                setDataErrorMessage('Something went wrong');
            }
        } else {
            setDataErrorMessage('');
        }
        setTotalCount(avlDoctorsCount+otherDoctorsCount);
    }, [availableDoctorsErrorMessage, othersDoctorsErrorMessage,specializationsAvailable,avlDoctorsCount,otherDoctorsCount]);

    const applySortAndFilter = (filtersAndSort) => {
        let obj = {};
        obj[sortAndFilterRequestConst.SPECIALITIES_IDS] = filtersAndSort[sortAndFilterResponseConst.SPECIALITIES];
        obj[sortAndFilterRequestConst.ONLINE_STATUS] = filtersAndSort[sortAndFilterResponseConst.ONLINE_STATUS];
        obj[sortAndFilterRequestConst.GENDER] = filtersAndSort[sortAndFilterResponseConst.GENDERS];
        obj[sortAndFilterRequestConst.CONSULTATION_TYPE] = filtersAndSort[sortAndFilterResponseConst.CONSULTATION_TYPES];
        obj[sortAndFilterRequestConst.SORT] = filtersAndSort[sortAndFilterResponseConst.SORT];
        let str = "";
        Object.keys(obj).map(each => {
            if (each == sortAndFilterRequestConst.SPECIALITIES_IDS) {
                let specialitiesStr = obj[each].join(",");
                str += `${each}=${specialitiesStr}::`;
            } else {
                str += `${each}=${obj[each]}::`
            }
        })
        str = str.substring(0, str.length - 2);
        if (Validate().isNotEmpty(str)) {
            let url = props.history.location.pathname + "?" + btoa(str);
            if(Validate().isEmpty(sortAndFilterString))
                props.history.push(url);
            else
                props.history.replace(url)
        }
    }

    const redirectToAllDoctors = ()=>{
        let location = props.location.pathname;
            console.log(location);
            if(Validate().isNotEmpty(pathName)){
                let url = location;
                props.history.push(url);
            }
    }
    return (
        <React.Fragment>
             <Helmet>
                <title>{`MedPlusMart.com | ${selectedVisitType === 'T'?'Online Consultation':'Walk In'}`}</title>
            </Helmet>
            <LabsBanner requestFor={'BANNER_DOCTORS_WEB'} page={props.isOnline?"TELEMEDICINE":"WALKIN"} screenLocation ={"Top"} history={props.history}/>
            <div className='row mx-0'>
                <section className={Validate().isNotEmpty(CATEGORY_LIST_TYPE_SPECIALIZATIONS) && Validate().isNotEmpty(selectedVisitType) ? 'col-sm-9 col-md-9 col-lg-9 py-3 my-0':'col-12 py-3'}>
                    {totalCount >=1 && <DoctorSortAndFilter visitType={selectedVisitType} forCompletePage={true} history={props.history} selectedFiltersAndSortFromUrl={selectedFiltersAndSortFromUrl} applySortAndFilter={applySortAndFilter} redirectToAllDoctors={redirectToAllDoctors} requestObjForSortAndFilters={requestObjForSortAndFilters}/>}
                    {Validate().isEmpty(sortAndFilterString) && <AvailableDoctors title={props.isOnline ? "Doctors Online" : "Doctors Available Near You"} history={props.history} visitType={selectedVisitType} priority="1" setMessage={(msg) => setAvailableDoctorsErrorMessage(msg)} setAvlDoctorsCount={(count) => setAvlDoctorsCount(count)} visibleDoctorCount={visibleDoctorCount + avlDoctorsCount} doctorsCount={totalCount} categoryListType={CATEGORY_LIST_TYPE_SPECIALIZATIONS}/>}
                    <OtherAvailableDoctors   sortList={Validate().isNotEmpty(sortAndFilterString) ? true :false}  title={Validate().isNotEmpty(sortAndFilterString) ? "Doctors Available" :"Other Doctors Available"} history={props.history} setVisibleDoctorCount={setVisibleDoctorCount} visitType={selectedVisitType} priority="2" paramValue={paramValue} selectedFiltersAndSortFromUrl={selectedFiltersAndSortFromUrl} setMessage={(msg) => setOthersDoctorsErrorMessage(msg)} applySortAndFilter={applySortAndFilter} redirectToAllDoctors={redirectToAllDoctors} setOtherDoctorsCount={(count) => setOtherDoctorsCount(count)} visibleDoctorCount={Validate().isNotEmpty(sortAndFilterString) ? visibleDoctorCount + avlDoctorsCount:""} doctorsCount={Validate().isNotEmpty(sortAndFilterString) ? totalCount:""}/>
                {(othersDoctorsErrorMessage && Validate().isNotEmpty(sortAndFilterString)) && <React.Fragment>
                    <NoDoctorsAvailable class="div-center p-4" message={othersDoctorsErrorMessage === "No data found" ? "No doctors found" : othersDoctorsErrorMessage} history={props.history} />
                </React.Fragment>}
                </section>
                <div className='col-sm-3 col-md-3 col-lg-3 pr-0'>
                        <DoctorCategorySlider showViewAll={false} categoryListType={CATEGORY_LIST_TYPE_SPECIALIZATIONS} history={props.history} visitType={selectedVisitType} setAvailable={setSpecializationsAvailable} showFullWidth={true} />
                </div>
            </div>
            {dataErrorMessage && <React.Fragment>
                    <NoDoctorsAvailable class="div-center p-4" message={dataErrorMessage === "No data found" ? "No doctors found" : dataErrorMessage} history={props.history} />
                </React.Fragment>}
        </React.Fragment>
    )
}

export default OnlineOrWalkinDoctors