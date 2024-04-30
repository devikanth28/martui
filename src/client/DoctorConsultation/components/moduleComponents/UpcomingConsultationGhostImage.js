import React from 'react'

const UpcomingConsultationGhostImage = (props) => {

  const isSlider = props.isSlider;

  return (
    <React.Fragment>
      <div className="ph-row ph-item p-0 m-0 mb-4 bg-transparent">
        <div className="ph-col-6 m-0"></div>
        <div className="ph-col-6 empty"></div>
      </div>
      <section className="shadow-none">
        <div className={isSlider ? "item pb-3 px-sm-4" : "item pb-3"} style={{ "width": "100%", "display": "inline-block" }}>
          <div className="card">
            <div className="card-body p-3">
              <div className="d-flex align-items-center">
                <div className="img-container">
                  <div className="ph-row">
                    <div className="m-0 rounded-circle" style={{ "height": "65px", "width": "65px" }}></div>
                  </div>
                </div>
                <div className="ml-2">
                  <div className="m-0 mb-3 mt-xl-n2 p-0 ph-item ph-row" style={{ "width": "100px" }}>
                    <div className="ph-col-12 m-0"></div>
                  </div>
                  <div className="m-0 mb-2 p-0 ph-item ph-row">
                    <div className="ph-col-12 m-0"></div>
                  </div>
                  <div className="m-0 p-0 ph-item ph-row">
                    <div className="ph-col-12 m-0"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer pt-2 pb-3 px-3 bg-white">
              <div className="mb-2">
                <div className="m-0 mb-2 p-0 ph-item ph-row">
                  <div className="m-0 ph-col-8"></div>
                </div>
                <div className="m-0 mb-2 p-0 ph-item ph-row">
                  <div className="m-0 ph-col-8"></div>
                </div>
              </div>
              <div className="p-0 ph-item ph-row pt-1">
                <div className="mb-0 ph-col-12" style={{ "height": "2rem" }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  )
}

export default UpcomingConsultationGhostImage
