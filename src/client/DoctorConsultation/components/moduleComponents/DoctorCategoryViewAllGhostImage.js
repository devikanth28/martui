import React from 'react';

const DoctorCategoryViewAllGhostImage = () => {

  return (
    <React.Fragment>
      <section className="shadow-none bg-transparent">
        <div className="p-3">
            <div className="ph-row ph-item p-0 m-0 mb-4 "><div className="ph-col-2 m-0"></div></div>
      <div className="doctor-view-all-container">

          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((each) => {
            return (
              <div className="card border-0">
            <div className="card-body p-2">
               <div className="img-container border">
                  <div className="ph-row m-4">
                     <div className="rounded-circle m-0" style={{"height": "40px", "width":"40px"}}></div>
                  </div>
               </div>
               <div className="ph-row ph-item p-0 m-0 mb-4">
                  <div className="ph-col-12 m-0"></div>
               </div>
            </div>
         </div>
            )
          })}
        </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default DoctorCategoryViewAllGhostImage;