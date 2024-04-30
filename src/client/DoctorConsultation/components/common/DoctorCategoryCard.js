import React from 'react';
import DoctorCategoryDefaultIcons from "../../constants/DoctorCategoryDefaultIcons";
import { prepareSeachStringParam } from "../../helper/DoctorConsulationHelper";
import { DoctorsCatalog } from '../../../Analytics/Analytics';

const DoctorCategoryCard = (props) => {
  const category = props.category;
  const consultationType = props.consultationType;
  const categoryDefaultIcons = DoctorCategoryDefaultIcons();

  const goToCategory = (categoryId, categoryName) => {
    DoctorsCatalog(props.sectionTitle,categoryName,categoryId)
    const searchStringParam = prepareSeachStringParam(categoryId, props.categoryType, categoryName);
    if (props.isFromViewAll) {
      props.history.push(`/doctorconsultation/categorydoctors/${searchStringParam}/${props.categoryType}/${consultationType ? consultationType : ''}`);
    } else {
      props.history.push(`/doctorconsultation/doctors/${searchStringParam}/${consultationType ? consultationType : ''}`);
    }
  }

  return (
    <div className="card">
      <button className="btn btn-link no-underline px-0" aria-label={category.name} title={category.name} onClick={() => goToCategory(category.id, category.name)}>
        <div class="card-body p-2">
          <div className="img-container">
            <span>
              {categoryDefaultIcons.getRelatedIcon(category.name)}
            </span>
          </div>
          <h6 class="card-title">{category.name}</h6>
        </div>
      </button>
    </div>
  );
}

export default DoctorCategoryCard;