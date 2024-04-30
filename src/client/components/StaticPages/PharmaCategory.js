import React, { useState } from 'react'
import DoctorFilter from '../DoctorConsultation/DoctorFilter'
import PharmaCategoryGhostImages from "./PharmaCategoryGhostImages"
const PharmaCategory = () => {
   const [filterModalOpen, setFilterModalOpen] = useState(false)
   const [title, setTitle] = useState({
      Drugs: "ECG and Accessories",
      type: "ACE inhibitors are a type of medications that act on the Renin-Angiotensin pathway, blocking the effect of renin on the blood vessels and heart, there by dilating (widening) arteries to lower the blood pressure and make it easier for the heart to pump blood. They also block some of the harmful actions of the endocrine system that may occur with heart failure. They are mainly used for treatment of high blood pressure and heart failure. Direct renin inhibitors block the enzyme renin from triggering a process that helps regulate blood pressure. As a result, blood vessels relax and widen, making it easier for blood to flow through the vessels, which lowers blood pressure. Direct renin inhibitors are used to lower blood pressure.",
      items: [
         { name: "ECG ELECTRODE 3M", Manufacturer: "3M INDIA LIMITED", MRP: "100", PackSize: "3", Comp: "Diosmin 900 MG+Hesperidin 100 MG", id: "1", inStock: false },
         { name: "HAPPI IT CAP", Manufacturer: "ZYDUS HEALTHCARE LTD", MRP: "700", PackSize: "3", Comp: "Diosmin 300 MG", id: "2" ,inStock:true },
         { name: "HAPPI IT CAP", Manufacturer: "ZYDUS HEALTHCARE LTD", MRP: "100", PackSize: "3", Comp: "Mebeverine 200 MG", id: "8" ,inStock:true},
         { name: "HAPPI IT CAP", Manufacturer: "ZYDUS HEALTHCARE LTD", MRP: "200", PackSize: "3", Comp: "Mebeverine 200 MG", id: "2",inStock:false },
         { name: "HAPPI IT CAP", Manufacturer: "ZYDUS HEALTHCARE LTD", MRP: "300", PackSize: "3", Comp: "Diosmin 450 MG+Grape seed extract 25 MG+Hesperidin 50 MG+Vitamin C 200 MG+Vitamin K2-7 25 MCG", id: "5" ,inStock:true},
         { name: "HAPPI IT CAP", Manufacturer: "ZYDUS HEALTHCARE LTD", MRP: "600", PackSize: "3", Comp: "Mebeverine 200 MG", id: "2" ,inStock:false},
         { name: "HAPPI IT CAP", Manufacturer: "ZYDUS HEALTHCARE LTD", MRP: "100", PackSize: "3", Comp: "Mebeverine 200 MG", id: "4" ,inStock:true},
         { name: "HAPPI IT CAP", Manufacturer: "ZYDUS HEALTHCARE LTD", MRP: "800", PackSize: "3", Comp: "Mebeverine 200 MG", id: "2" ,inStock:false}
      ]
   })
   const toggleFilterModal = () => {
      setFilterModalOpen(!filterModalOpen)
   }
   return (
      <React.Fragment>
         <DoctorFilter setTitle={setTitle} filterModalOpen={filterModalOpen} druginfo={true} toggleFilterModal={toggleFilterModal} />
         <button className="btn border-sort-btn filter mx-2 ml-0 mb-3" onClick={() => toggleFilterModal()}>
            <svg className="mr-2 align-middle" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
               <g id="Group_22672" data-name="Group 22672" transform="translate(-1727 -423)">
                  <rect id="Rectangle_6527" data-name="Rectangle 6527" width="18" height="18" rx="3" transform="translate(1727 423)" fill="#fff"></rect>
                  <path id="Icon_awesome-filter" data-name="Icon awesome-filter" d="M15.249,0H.751a.751.751,0,0,0-.53,1.28L6,7.061V13.5a.75.75,0,0,0,.32.614l2.5,1.749A.75.75,0,0,0,10,15.249V7.061l5.78-5.78A.751.751,0,0,0,15.249,0Z" transform="translate(1728 424)"></path>
               </g>
            </svg>
            All Filters
         </button>
         <section className="brandProduct px-3">
            <h2 className="p-2 w-100 d-block" title={title.Drugs}>
               {title.Drugs}
            </h2>
            <p className="p-2 mb-0">{title.type}</p>
            <div className='d-flex flex-wrap'>
               {
                  title.items.map((item) =>
                     <div className='each-product-card mb-3'>
                        <div className='item'>
                           <div className="card mx-2">
                              <div className="card-body p-3">
                                 <div className="row no-gutters">
                                    <div className="col">
                                       <p className="text-left"><small className="text-secondary">{item.Manufacturer}</small><a className="text-dark d-block font-weight-bold truncate-line-2" href="/product/susten-400mg-cap_sust0008">{item.name}</a><p className="text-truncate d-block font-14" title={item.comp}>{item.Comp}</p> </p>
                                    </div>
                                 </div>
                                 <div className="d-flex justify-content-between">
                                    <p className='mb-0'> <span className="text-secondary d-block mb-2">MRP</span><strong class="rupee">₹</strong><span className="font-weight-bold">{item.MRP}</span></p>
                                    <p className='mb-0'><span className="text-secondary d-block mb-2">Pack Size</span><strong> {item.PackSize}</strong></p>
                                 </div>
                              </div>
                              <div className="bg-transparent card-footer p-2">{item.inStock ? <button className="btn btn-brand btn-block" type="button">Add to Cart</button> : <button className="btn btn-secondary btn-block disabled cursor-not-allowed" type="button">Out of stock</button>}</div>
                           </div>
                        </div>
                     </div>
                  )
               }
            </div>
         </section>
         <PharmaCategoryGhostImages/>
      </React.Fragment>
   )
}
export default PharmaCategory