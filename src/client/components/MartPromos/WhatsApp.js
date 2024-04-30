import React from 'react'
import whatsapp_Group from "../../images/common/whatsapp_Group.svg";
import medplus_logo from "../../images/common/medplus_logo.svg"
import { ContactUsOnWhatsApp } from '../../Analytics/Analytics';
import { Helmet } from 'react-helmet';
const WhatsApp = () => {
  return (
    <React.Fragment>
      <Helmet>
        <title>Contact us on our WhatsApp Number</title>
      </Helmet>
      <div className='page-center'>
        <section class="container  whatsApp">
          <a href="/" title="https://www.medplusmart.com/" class="medplus-logo">
            <img src={medplus_logo} alt="MedPlus Online Pharmacy Store in India"/>
          </a>
          <h5 className='mb-3'>Click the below button to <br/>message us directly on WhatsApp</h5>
          <button class="btn btn-brand-gradient rounded-pill mx-0 px-5 py-2" onClick={()=>{ContactUsOnWhatsApp();window.open("https://web.whatsapp.com/send?phone=+916281412345","_blank")}} rel="noopener">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 28 28" class="mr-3 align-baseline">
              <defs>
                <linearGradient id="linear-gradient" x1="0.358" y1="1" x2="0.734" y2="0.085" gradientUnits="objectBoundingBox">
                  <stop offset="0" stop-color="#30b743"></stop>
                  <stop offset="1" stop-color="#5ad164"></stop>
                </linearGradient>
              </defs>
              <g id="Group_24029" data-name="Group 24029" transform="translate(-40 -57.25)">
                <g id="Group_24029-2" data-name="Group 24029" transform="translate(40 57.25)">
                  <path id="Icon_awesome-whatsapp" data-name="Icon awesome-whatsapp" d="M21.161,5.867A12.337,12.337,0,0,0,1.75,20.75L0,27.139l6.539-1.717a12.3,12.3,0,0,0,5.894,1.5h.006a12.452,12.452,0,0,0,12.45-12.333,12.382,12.382,0,0,0-3.728-8.722Z" transform="translate(1.556 -0.694)" fill="url(#linear-gradient)"></path>
                  <path id="Icon_awesome-whatsapp-2" data-name="Icon awesome-whatsapp" d="M23.806,6.319A13.879,13.879,0,0,0,1.969,23.063L0,30.25l7.356-1.931a13.833,13.833,0,0,0,6.631,1.688h.006A14.008,14.008,0,0,0,28,16.131a13.93,13.93,0,0,0-4.194-9.812Zm-9.813,21.35a11.512,11.512,0,0,1-5.875-1.606l-.419-.25L3.338,26.956,4.5,22.7l-.275-.437a11.555,11.555,0,1,1,21.431-6.131A11.661,11.661,0,0,1,13.994,27.669Zm6.325-8.638c-.344-.175-2.05-1.013-2.369-1.125s-.55-.175-.781.175-.894,1.125-1.1,1.363-.406.262-.75.087A9.437,9.437,0,0,1,10.6,15.406c-.356-.612.356-.569,1.019-1.894a.642.642,0,0,0-.031-.606c-.087-.175-.781-1.881-1.069-2.575-.281-.675-.569-.581-.781-.594s-.431-.013-.662-.013a1.284,1.284,0,0,0-.925.431A3.9,3.9,0,0,0,6.938,13.05,6.792,6.792,0,0,0,8.35,16.637a15.492,15.492,0,0,0,5.925,5.237c2.2.95,3.063,1.031,4.162.869a3.551,3.551,0,0,0,2.338-1.65,2.9,2.9,0,0,0,.2-1.65C20.894,19.287,20.663,19.2,20.319,19.031Z" transform="translate(0 -2.25)" fill="#fff"></path>
                </g>
              </g>
            </svg>
            <span class="h2 text-white font-weight-normal">62814 12345</span>
          </button>
          <div className='mb-4'>
            <h6 class="mt-5"><u>Alternately</u></h6>
            <ul>
              <li>
                Save our WhatsApp number <a href="https://web.whatsapp.com/send?phone=+916281412345" title="Contact us on WhatsApp" className='text-dark font-weight-bold' target="_blank" rel='noopener'>+91 62814 12345</a>
              </li>
              <li>
                Send us your prescription copy on the <b>WhatsApp</b> chat
              </li>
              <li>
                If you do not have a prescription, do not worry! Simple message us <b>“Hello”</b>
              </li>
            </ul>
            <p><b>As simple as that! Have your medicines delivered at your doorstep.</b><br /><a href="/" title="https://www.medplusmart.com/">www.medplusmart.com</a></p>
          </div>
          <img src={whatsapp_Group} alt="You can order medicines using our WhatsApp number +91 6281412345" className='whatsapp-group'/>
        </section>
      </div>
  </React.Fragment>
  )
}
export default WhatsApp