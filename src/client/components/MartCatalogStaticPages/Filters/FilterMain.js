import React from 'react'
import { TopSellers } from '../HomePage/staticData'
import EachCard from '../HomePage/EachCard';
import DoctorFilter from '../../DoctorConsultation/DoctorFilter';
import TopOffers from '../HomePage/HomePagePlaceholders/TopOffers';
import { useState } from 'react'
export  const getPopolarTestsSlider = (sliderData) => {
    return (
        <div className='d-flex flex-wrap'>
            {sliderData.map((each) => {
                return (
                    <div style={{ "width": "16.666%" }} className='h-100 home-page-products-slider'>
                        <EachCard product={each}></EachCard>
                    </div>
                );
            })}
        </div>
    )
}
const FilterMain = () => {
    const [filterModalOpen, setFilterModalOpen] = useState(false)
    const toggleFilterModal = () => {
        setFilterModalOpen(!filterModalOpen)
    }
    return (
        <div>
            <button className="btn border-sort-btn filter mr-4 ml-0" onClick={() => toggleFilterModal()}>
                <svg className="mr-2 align-middle" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" class="mr-2 mt-n1">
                    <g id="Group_22672" data-name="Group 22672" transform="translate(-1727 -423)">
                        <rect id="Rectangle_6527" data-name="Rectangle 6527" width="18" height="18" rx="3" transform="translate(1727 423)" fill="#fff"></rect>
                        <path id="Icon_awesome-filter" data-name="Icon awesome-filter" d="M15.249,0H.751a.751.751,0,0,0-.53,1.28L6,7.061V13.5a.75.75,0,0,0,.32.614l2.5,1.749A.75.75,0,0,0,10,15.249V7.061l5.78-5.78A.751.751,0,0,0,15.249,0Z" transform="translate(1728 424)"></path>
                    </g>
                </svg>
                All Filters
            </button>
            <DoctorFilter toggleFilterModal={toggleFilterModal} filterModalOpen={filterModalOpen} />
            {getPopolarTestsSlider(TopSellers)}
            <TopOffers viewAll={true} />
        </div>
    )
}
export default FilterMain