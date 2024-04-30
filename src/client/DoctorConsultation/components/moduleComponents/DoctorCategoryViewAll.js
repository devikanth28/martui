import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import LabsBanner from '../../../components/MedplusLabs/components/Common/LabsBanner';
import Validate from '../../../helpers/Validate';
import { CATEGORY_LIST_TYPE_SPECIALIZATIONS, CATEGORY_LIST_TYPE_SYMPTOMS, getConsultationType, isVaildCategoryType, isVaildConsultationType, prepareCategories, UrlTypeConstants } from '../../constants/DoctorConsultationConstants';
import DoctorConsultationService from '../../services/DoctorConsultationService';
import DoctorCategoryCard from '../common/DoctorCategoryCard';
import DoctorCategoryViewAllGhostImage from './DoctorCategoryViewAllGhostImage';
import NoDoctorsAvailable from './NoDoctorsAvailable';

const DoctorCategoryViewAll = (props) => {

  const doctorConsultationService = DoctorConsultationService();
  const validate = Validate();
  const [categoryLoader, setCategoryLoader] = useState(true);
  const [categories, setCategories] = useState([]);
  const consultationType = props.match.params.consultationType;
  const categoryType = props.match.params.categoryType;
  const noCategoriesAvailable = !isVaildCategoryType(categoryType) || (validate.isNotEmpty(consultationType) && !isVaildConsultationType(consultationType));

  useEffect(() => {
    if (noCategoriesAvailable) {
      return;
    }
    let obj = validate.isNotEmpty(consultationType) ? { consultationType: getConsultationType(consultationType) } : {};
    if (categoryType == UrlTypeConstants.symptoms) {
      getSymptomsList(obj);
    } else if (categoryType == UrlTypeConstants.specialization) {
      getSpecializationsList(obj);
    }
  }, []);

  const getSymptomsList = (obj) => {
    setCategoryLoader(true);
    doctorConsultationService.getSymptomsList(obj).then((response) => {
      if (validate.isNotEmpty(response) && response.statusCode == "SUCCESS") {
        let symptoms = response.dataObject.symptoms;
        setCategories(prepareCategories(CATEGORY_LIST_TYPE_SYMPTOMS, ...symptoms));
      } else {
        console.log(response.message);
      }
      setCategoryLoader(false);
    }).catch(function (error) {
      console.log(error);
      setCategoryLoader(false);
    });
  }

  const getSpecializationsList = (obj) => {
    setCategoryLoader(true);
    doctorConsultationService.getSpecializationsList(obj).then((response) => {
      if (validate.isNotEmpty(response.dataObject) && response.statusCode === "SUCCESS") {
        let specialities = response.dataObject.specialities;
        setCategories(prepareCategories(CATEGORY_LIST_TYPE_SPECIALIZATIONS, ...specialities));
      } else {
        console.log(response.message);
      }
      setCategoryLoader(false);
    }).catch(function (error) {
      console.log(error);
      setCategoryLoader(false);
    });
  }

  return (
    <React.Fragment>
      <Helmet>
        <title>{`MedPlusMart.com | ${categoryType == UrlTypeConstants.symptoms ? 'Symptoms' : 'Specializations'}`}</title>
      </Helmet>
      {noCategoriesAvailable ? <NoDoctorsAvailable message={"Something Went Wrong"} noContent={true} history={props.history} /> :
        (<React.Fragment>
          <LabsBanner requestFor={'BANNER_DOCTORS_WEB'} screenLocation={categoryType == UrlTypeConstants.symptoms ? 'SYMPTOMS' : 'SPECIALIZATIONS'} page={"VIEWALL"} history={props.history} />
          {categoryLoader ? <DoctorCategoryViewAllGhostImage /> :
            <section>
              <div className="p-3">
                <h5 className="mb-3">By {categoryType == UrlTypeConstants.symptoms ? 'Symptoms' : 'Specializations'}</h5>
                <div className='doctor-view-all-container shadow-none'>
                  {categories.map((each) => {
                    return <DoctorCategoryCard key={each.id} category={each} categoryType={categoryType} consultationType={consultationType} isFromViewAll={true} history={props.history} />
                  })}
                </div>
              </div>
            </section>
          }
        </React.Fragment>)
      }
    </React.Fragment>
  );
}

export default DoctorCategoryViewAll;

