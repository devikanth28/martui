import React from 'react'

const MemberShipPlanCardGhostImages = () => {
  return (
      <section className="container">
        <div className='mb-4 col-12'>
        <div className=" py-4 px-2 d-flex mb-0 flex-wrap" style={{ "gap": "1rem" }}>
              {[1, 2, 3].map((each) => {
                  return (
                      <div className="each-membership-plan" style={{ "width": "21.5rem" }}>
                          <div className="my-32 p-0 ph-item ph-row mb-5">
                              <div class="ph-col-12 mb-0" style={{ "height": "3.75rem" }}></div>
                          </div>
                          <div className="my-32 p-0 ph-item ph-row mb-5 bg-none w-50 m-auto">
                              <div class="ph-col-12 mb-5" style={{ "height": "2.75rem" }}></div>
                          </div>
                          <div className="mb-0 ph-col-12 ph-row ph-item bg-none">
                              <div class="ph-col-8 mb-0 "></div>
                              <div class="ph-col-4 mb-4 empty"></div>
                              <div class="ph-col-8 mb-0 "></div>
                              <div class="ph-col-4 empty mb-4 "></div>
                              <div class="ph-col-8 mb-0 "></div>
                              <div class="ph-col-4 empty mb-4 "></div>
                          </div>
                      </div>
                  )
              })}
          </div>
        </div>
      </section>
  )
}

export default MemberShipPlanCardGhostImages