import React from 'react';
import Validate from '../../../helpers/Validate';
import AppointmentBanner from "../../../images/common/online-doctor-banner-icon.svg";
import WalkinBanner from "../../../images/common/store-doctor-banner-icon.svg";
import {sendDoctorsVisitType} from '../../../Analytics/Analytics'

const DoctorSplitBanner = (props) => {

  const validate = Validate();
  const banners = props.banners;

  const getGhostImage = () => {
    return (
      <div className="my-32 mt-0">
        <div className="row doctor-split-banner-container rounded">
          <div className="col pr-2">
            <div className="ph-row ph-item p-0 m-0">
              <div className="ph-picture" style={{ "height": "14.625rem" }} ></div>
            </div>
          </div>
          <div className="col pr-2">
            <div className="ph-row ph-item p-0 m-0">
              <div className="ph-picture" style={{ "height": "14.625rem" }} ></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <React.Fragment>
      {props.isBannersLoading ? getGhostImage() :
        <div className="my-32 mt-0">
          <div className="row doctor-split-banner-container rounded">
            <div className="col pr-2" onClick={()=>{sendDoctorsVisitType("Online")}}>
              {validate.isNotEmpty(banners) && banners.length === 2 ?
                <a href={banners[0].redirectValue} target={banners[0].openInNewTab ? '_blank' : '_self'} title={banners[0].alternativeValue} aria-label= {banners[0].alternativeValue} aria-role={"online Doctors"} className="d-block shadow-sm">
                  <img src={banners[0].imagePath} alt={banners[0].alternativeValue} className="img-fluid rounded" />
                </a>
                : <section className="banner-link-container online-type" style={{ backgroundImage: "url(" + AppointmentBanner + ")" }}>
                  <div className='="test-dark'>
                    <p className="font-weight-light h3 mb-0">Make an appointment with our</p>
                    <h5 className="mb-0">Online Doctors</h5>
                  </div>
                  <div>
                    <button role="button" onClick={(event) => {props.history.push('/doctorconsultation/doctors/online_consultation')}} title="See who is available online" aria-label='See who is available online' aria-role="button" className="btn btn-brand-gradient btn-lg rounded-pill banner-hover-btn">
                      See who is available online
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <g id="right_white_icon_24px" transform="translate(-48.941 -351.846)">
                          <rect id="BG_Guide" data-name="BG Guide" width="24" height="24" transform="translate(48.941 351.846)" fill="none"></rect>
                          <path id="Path_22926" data-name="Path 22926" d="M61.82,354.579a1.7,1.7,0,0,0-.238.716,1.028,1.028,0,0,0,.358.715l7.513,6.917H49.9a.954.954,0,1,0,0,1.908H69.453l-7.394,6.917a.936.936,0,0,0,0,1.312.945.945,0,0,0,1.312.119l9.3-8.586a.936.936,0,0,0,0-1.312l-9.3-8.706a.912.912,0,0,0-.6-.238C62.178,354.222,61.94,354.341,61.82,354.579Z" fill="#fff"></path>
                        </g>
                      </svg>
                    </button>
                  </div>
                </section>}
            </div>
            <div className="col pl-2" onClick={()=>{sendDoctorsVisitType("Offline")}}>
              {validate.isNotEmpty(banners) && banners.length === 2 ?
                <a href={banners[1].redirectValue} target={banners[1].openInNewTab ? '_blank' : '_self'} aria-label={banners[1].alternativeValue} title={banners[1].alternativeValue} className="d-block shadow-sm">
                  <img title="" src={banners[1].imagePath} alt={banners[1].alternativeValue} className="img-fluid rounded" />
                </a>
                : <section className="banner-link-container offline-type" style={{ backgroundImage: "url(" + WalkinBanner + ")" }}>
                  <div className='="test-dark'>
                    <p className="font-weight-light h3 mb-0">Meet with our doctors in</p>
                    <h5 className="mb-0">Person at Our Clinics</h5>
                  </div>
                  <div>
                    <button role="button" onClick={(event) => {props.history.push('/doctorconsultation/doctors/walk_in')}} title="Step into see our doctors" className="btn btn-brand-gradient btn-lg rounded-pill banner-hover-btn">
                      Step into see our doctors
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <g id="right_white_icon_24px" transform="translate(-48.941 -351.846)">
                          <rect id="BG_Guide" data-name="BG Guide" width="24" height="24" transform="translate(48.941 351.846)" fill="none"></rect>
                          <path id="Path_22926" data-name="Path 22926" d="M61.82,354.579a1.7,1.7,0,0,0-.238.716,1.028,1.028,0,0,0,.358.715l7.513,6.917H49.9a.954.954,0,1,0,0,1.908H69.453l-7.394,6.917a.936.936,0,0,0,0,1.312.945.945,0,0,0,1.312.119l9.3-8.586a.936.936,0,0,0,0-1.312l-9.3-8.706a.912.912,0,0,0-.6-.238C62.178,354.222,61.94,354.341,61.82,354.579Z" fill="#fff"></path>
                        </g>
                      </svg>
                    </button>
                  </div>
                </section>}
            </div>
          </div>
        </div>
      }
    </React.Fragment>
  );
}

export default DoctorSplitBanner;