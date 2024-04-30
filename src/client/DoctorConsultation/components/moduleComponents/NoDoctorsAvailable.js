import React from 'react';
import NoContentAvailable from "../../../../client/images/no-content-line-colour-icon.png";

const NoDoctorsAvailable = (props) => {
   return (
      <React.Fragment>
         <section class="body-height no-data-to-show">
            {props.noContent ?
               <img src={NoContentAvailable} alt="No content available" title="No content available" /> :
                  <svg xmlns="http://www.w3.org/2000/svg" width="96" viewBox="0 0 96 71.802" class="mb-3">
                     <g id="Group_22676" data-name="Group 22676" transform="translate(-1914 -4102)">
                        <g id="noun_medical_staff_3513957" data-name="noun_medical staff_3513957" transform="translate(1914 4102)">
                           <rect id="Rectangle_6529" data-name="Rectangle 6529" width="10.062" height="3.129" transform="translate(76.149 53.463)" fill="#cecece"></rect>
                           <path id="Path_30087" data-name="Path 30087" d="M47.959,36.111a24.682,24.682,0,0,1-.276-3.681,5.837,5.837,0,0,0,1.383-3.72,4.841,4.841,0,0,0-1.119-3.774c.06-1.452.111-7.407-3.369-11.637.306-1.149.609-2.31.786-3.024a1.788,1.788,0,0,0-1.242-2.343c-1.752-.81-6.375-3.4-10.143-3.4s-8.4,2.589-10.143,3.4c-1.1.5-1.548,1.119-1.242,2.343.177.714.48,1.875.78,3.024-3.474,4.23-3.423,10.185-3.363,11.637a4.8,4.8,0,0,0-1.119,3.774,5.869,5.869,0,0,0,1.383,3.726A24.3,24.3,0,0,1,20,36.111a43.273,43.273,0,0,1-1.794,6.345c.141.573,3.5-1.641,6.528-2.109a11.439,11.439,0,0,0,18.492,0c3.03.468,6.387,2.679,6.528,2.109A42.574,42.574,0,0,1,47.959,36.111ZM29.854,9.642h2.814V6.831H35.29V9.645H38.1v2.619H35.29v2.817H32.665v-2.82H29.851V9.642ZM46.765,28.551c-.165,2.415-1.155,2.688-1.575,2.808l-.663.183-.153.675c-.72,3.171-3.171,10.536-10.395,10.536s-9.675-7.365-10.4-10.536l-.153-.675-.663-.183c-.423-.117-1.413-.393-1.575-2.808a3.267,3.267,0,0,1,.222-1.6,3.083,3.083,0,0,1,.51,1.038c.585,2.01,1.446,1.065,1.446,1.065-.492-4.593,5.988-9.351,10.6-9.351a17.945,17.945,0,0,0,7.26-1.284s3.831,6.042,3.345,10.635c0,0,.861.942,1.446-1.065a2.975,2.975,0,0,1,.51-1.038A3.221,3.221,0,0,1,46.765,28.551Z" transform="translate(34.91 -4.533)" fill="#cecece"></path>
                           <path id="Path_30088" data-name="Path 30088" d="M58.478,25.367C54.68,20.018,45.389,17.315,45,17.2l-1.008-.294-.381.978a16.362,16.362,0,0,1-1.587,2.94c-2.175,1.677-4.617,2.058-7.437,2.058s-5.262-.381-7.44-2.064a16.181,16.181,0,0,1-1.581-2.937l-.381-.978-1.008.294a39.231,39.231,0,0,0-6.27,2.514c.843.4,1.71.843,2.583,1.335,1.359-.6,2.577-1.062,3.363-1.329,2.679,5.514,9.651,11.8,9.966,12.075l.768.69.768-.69c.315-.282,7.29-6.567,9.966-12.075,2.385.81,8.6,3.2,11.28,6.978,1.716,2.415,2.679,7.065,2.784,9.837-1.329,1.125-7.494,5.373-24.8,5.373-.645,0-1.248-.012-1.863-.024.018.381.042.768.042,1.1v1.206c.609.012,1.185.036,1.821.036,21.141,0,26.613-6.189,26.841-6.45l.27-.321v-.423C61.694,34.067,60.7,28.49,58.478,25.367Z" transform="translate(34.306 20.215)" fill="#cecece"></path>
                           <path id="Path_30089" data-name="Path 30089" d="M61.478,27.691c-4.542-6.393-15.651-9.627-16.119-9.762l-1.206-.345L43.7,18.757a19.5,19.5,0,0,1-1.893,3.51c-2.6,2.01-5.52,2.46-8.889,2.46s-6.294-.45-8.9-2.46a19.585,19.585,0,0,1-1.893-3.51l-.456-1.173-1.206.345C20,18.064,8.888,21.3,4.346,27.691,1.694,31.429.5,38.092.5,41.632v.5l.327.387c.264.315,6.81,7.71,32.085,7.71s31.815-7.4,32.079-7.71l.327-.387v-.5C65.321,38.092,64.127,31.429,61.478,27.691ZM32.915,47.479c-20.718,0-28.077-5.1-29.643-6.429.123-3.312,1.272-8.871,3.321-11.766a18.345,18.345,0,0,1,5.613-4.776,24.613,24.613,0,0,0,.627,4.518c-4.119,2.133-3.1,5.94-2.331,8.784a21.214,21.214,0,0,1,.54,2.286c.276,1.782.891,2.925,1.875,3.51a3.148,3.148,0,0,0,1.629.423,6.013,6.013,0,0,0,2.064-.423,1.032,1.032,0,1,0-.708-1.938,2.658,2.658,0,0,1-1.929.159c-.411-.24-.714-.948-.885-2.046a24.426,24.426,0,0,0-.585-2.508c-.942-3.492-1.308-5.532,2.181-6.81s4.524.522,6.054,3.8a23.179,23.179,0,0,0,1.173,2.292A2.931,2.931,0,0,1,22.55,38.7c-.147.417-.675.792-1.575,1.119a1.034,1.034,0,0,0,.708,1.944A4.207,4.207,0,0,0,24.5,39.382c.381-1.083.111-2.355-.825-3.9a21.613,21.613,0,0,1-1.062-2.1c-1.278-2.742-3.012-6.438-7.827-5.115a23.256,23.256,0,0,1-.54-4.875,45.5,45.5,0,0,1,5.841-2.442c3.192,6.585,11.532,14.1,11.907,14.433l.927.819.921-.819c.375-.333,8.712-7.851,11.907-14.439A46.893,46.893,0,0,1,51.6,23.4a18.767,18.767,0,0,1-3.06,10.734,4.225,4.225,0,0,0-4.083.135A4.016,4.016,0,1,0,50.1,35.59a.211.211,0,0,1-.03-.048,20.08,20.08,0,0,0,3.564-11.028,18.232,18.232,0,0,1,5.6,4.77c2.052,2.895,3.2,8.454,3.321,11.766C60.968,42.394,53.6,47.479,32.915,47.479Zm14.424-8.322a1.672,1.672,0,1,1,.651-2.325A1.706,1.706,0,0,1,47.339,39.157Z" transform="translate(-0.5 21.569)" fill="#cecece"></path>
                           <path id="Path_30090" data-name="Path 30090" d="M5.305,28.206c.192,2.823,1.236,4.689,3.1,5.532,2.22,8.79,7.77,14.01,14.94,14.01s12.714-5.22,14.937-14.01c1.863-.849,2.907-2.706,3.1-5.532a5.541,5.541,0,0,0-1.689-4.845,5.891,5.891,0,0,0,.327-1.542c.075-1.308,1.137-17.286-16.677-17.286S6.583,20.511,6.658,21.819a6.144,6.144,0,0,0,.327,1.542A5.565,5.565,0,0,0,5.305,28.206Zm3.147-.861c.7,2.4,1.728,1.266,1.728,1.266a11.747,11.747,0,0,1,.042-3.915c.5-5.712,4.446-10.7,4.446-10.7a21.331,21.331,0,0,0,8.679,1.542A21.317,21.317,0,0,0,32.02,14s3.942,4.986,4.446,10.7a11.747,11.747,0,0,1,.042,3.915s1.026,1.131,1.728-1.266c.069-.234.147-.423.216-.639a4.817,4.817,0,0,1,.177,1.314c-.2,2.889-1.377,3.21-1.881,3.351l-.8.222-.183.8c-.861,3.786-3.792,12.591-12.423,12.591S11.779,36.18,10.915,32.4l-.183-.8-.8-.222c-.5-.141-1.683-.462-1.881-3.351a4.7,4.7,0,0,1,.111-1.488C8.263,26.8,8.365,27.045,8.452,27.345Z" transform="translate(9.068 -4.533)" fill="#cecece"></path>
                           <path id="Path_30091" data-name="Path 30091" d="M11,20.4H15.5c2.349,0,3.8-3.375,3.849-5.871h.639c.054,2.5,1.5,5.871,3.849,5.871h4.506c2.442,0,3.165-2.01,3.69-4.071A5.537,5.537,0,0,0,31.27,11.7a2.375,2.375,0,0,0-1.851-1.02H23.053a2.813,2.813,0,0,0-2.421,1.248,4.25,4.25,0,0,0-.234.528H18.952a4.25,4.25,0,0,0-.234-.528A2.813,2.813,0,0,0,16.3,10.684H9.928A2.37,2.37,0,0,0,8.077,11.7a5.547,5.547,0,0,0-.768,4.623C7.834,18.388,8.557,20.4,11,20.4Zm11.349-7.314a.734.734,0,0,1,.7-.327l6.345-.006c.339.1,1.056,1.446.645,3.06-.609,2.349-1.044,2.52-1.692,2.52H23.842c-.573,0-1.788-1.863-1.788-3.939A2.5,2.5,0,0,1,22.348,13.084Zm-12.42-.327H16.3a.736.736,0,0,1,.7.327,2.439,2.439,0,0,1,.294,1.308c0,2.073-1.212,3.939-1.788,3.939H11c-.651,0-1.083-.171-1.692-2.52A3.086,3.086,0,0,1,9.928,12.757Z" transform="translate(12.737 7.769)" fill="#cecece"></path>
                        </g>
                     </g>
                  </svg>
            }
            <h6 class="mb-3">{props.message}</h6>
            <button type="button" role="back" className="btn btn-brand-gradient rounded-pill px-5" onClick={() => props.history.replace("/doctorconsultation")} >Go To Home</button>
         </section>
      </React.Fragment>
   )
}

export default NoDoctorsAvailable;