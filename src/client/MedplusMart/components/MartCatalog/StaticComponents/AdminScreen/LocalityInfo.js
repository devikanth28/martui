import React, { useState } from 'react'
import Validate from '../../../../../helpers/Validate';

const LocalityInfo = () => {
    const validate = Validate();
    const [localitySelection, setLocalitySelection]=useState('');
    const [localityValue, setLocalityValue] = useState({
        "store":'',
        "lat-long":'',
        "locality":''
    });
    const localityBasedSearch = [
        {
            name:"store",
            placeholder:"Ex:INAPHYD00384"
        },
        {
            name:"Lat-Long",
            placeholder:"Ex:16.34235,78.23156"
        },
        {
            name:"Locality",
            placeholder:"Madhapur,sr ngar"
        }
    ]
    const handleLocalityBasedSearch = (e) =>{
        setLocalitySelection(e.target.value);
    }
    const handleLocalityValue = (e) => {
        const { value, name } = e.target;
        if (name === localitySelection) {
          setLocalityValue((prevState) => ({
            ...prevState,
            [name]: value
          }));
        }
      };
      const locationCenters = [
        {
            name_s:"Madhapur",
            dist:"1.8km",
            address_s:'MEDPLUS MOOSAPET ANJANEYA NAGAR',
            phoneNumber_s:"6677998800"
        },
        {
            name_s:"Madhapur",
            dist:"1.8km",
            address_s:'MEDPLUS MOOSAPET ANJANEYA NAGAR',
            phoneNumber_s:"6677998800"
        },
        {
            name_s:"Madhapur",
            dist:"1.8km",
            address_s:'MEDPLUS MOOSAPET ANJANEYA NAGAR',
            phoneNumber_s:"6677998800"
        },
        {
            name_s:"Madhapur",
            dist:"1.8km",
            address_s:'MEDPLUS MOOSAPET ANJANEYA NAGAR',
            phoneNumber_s:"6677998800"
        },
        {
            name_s:"Madhapur",
            dist:"1.8km",
            address_s:'MEDPLUS MOOSAPET ANJANEYA NAGAR',
            phoneNumber_s:"6677998800"
        }
      ]
      const StoreLocationCard = ({store})=>{
        return (
            <React.Fragment>
            {validate.isNotEmpty(store) && <address className='address-outline four-column address-no-style px-3 store-info rounded cursor-auto' >
              <div class="d-flex justify-content-between">
                {validate.isNotEmpty(store.name_s) && <p className="title">
                  {store.name_s}
                </p>}
                {validate.isNotEmpty(store.dist) && <p className='distance'>{store.dist}</p>}
              </div>
              
              {validate.isNotEmpty(store.address_s) && <p className="text-capitalize mb-3 text-secondary font-12" style={{ "wordWrap": "break-word" }}>
                {store.address_s}
              </p>}
              <p className="title">
                {validate.isNotEmpty(store.phoneNumber_s) && 
                 <a className="mr-2 small btn btn-link btn-sm ml-n2 text-primary" href={"tel:" + store.phoneNumber_s} title="Click to Call">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                      <g id="Group_1501" data-name="Group 1501" transform="translate(0.842 0.487)">
                        <rect id="Rectangle_2075" data-name="Rectangle 2075" width="16" height="16" transform="translate(-0.842 -0.487)" fill="none" />
                        <g id="Group_1500" data-name="Group 1500" transform="translate(-0.081 0.069)">
                          <path id="Path_1067" data-name="Path 1067" d="M13.152,11.537,11.2,10.173a1.789,1.789,0,0,0-2.431.434l-.312.45A17.1,17.1,0,0,1,6.279,9.2,17.193,17.193,0,0,1,4.42,7.019l.45-.312A1.747,1.747,0,0,0,5.3,4.268L3.94,2.325a1.753,1.753,0,0,0-2-.655,3.21,3.21,0,0,0-.564.274L1.1,2.15a1.661,1.661,0,0,0-.213.19A2.952,2.952,0,0,0,.13,3.681C-.449,5.868.96,9.137,3.65,11.827c2.248,2.248,4.968,3.65,7.094,3.65a4.229,4.229,0,0,0,1.052-.13,2.952,2.952,0,0,0,1.341-.754,2.284,2.284,0,0,0,.206-.236l.2-.282a2.736,2.736,0,0,0,.259-.541A1.707,1.707,0,0,0,13.152,11.537Zm-.373,1.623h0a2.043,2.043,0,0,1-.145.312l-.16.236c-.03.038-.069.076-.1.114a1.87,1.87,0,0,1-.853.472,3,3,0,0,1-.77.091c-1.844,0-4.267-1.28-6.324-3.33C2.042,8.672.709,5.754,1.189,3.963a1.87,1.87,0,0,1,.472-.853.845.845,0,0,1,.084-.084l.229-.168a2.4,2.4,0,0,1,.343-.168.828.828,0,0,1,.2-.03.66.66,0,0,1,.533.29L4.412,4.9a.668.668,0,0,1,.107.5.653.653,0,0,1-.274.419l-.884.617a.552.552,0,0,0-.152.739,17.027,17.027,0,0,0,2.3,2.8,17.027,17.027,0,0,0,2.8,2.3.546.546,0,0,0,.739-.152l.617-.884a.642.642,0,0,1,.427-.259.693.693,0,0,1,.5.1l1.951,1.364A.622.622,0,0,1,12.779,13.16Z" transform="translate(-0.001 -0.518)" fill="#404040" />
                          <path id="Path_1068" data-name="Path 1068" d="M15.287,2.445a7.728,7.728,0,0,0-5-2.255A.548.548,0,0,0,9.71.7a.556.556,0,0,0,.511.579A6.68,6.68,0,0,1,16.461,7.52a.545.545,0,0,0,.571.511h0a.546.546,0,0,0,.511-.579A7.7,7.7,0,0,0,15.287,2.445Z" transform="translate(-2.312 -0.189)" fill="#404040" />
                          <path id="Path_1069" data-name="Path 1069" d="M9.02,4.32a4.872,4.872,0,0,1,4.557,4.557.558.558,0,0,0,.579.511h0a.548.548,0,0,0,.511-.579A5.958,5.958,0,0,0,9.1,3.23a.58.58,0,0,0-.587.511A.551.551,0,0,0,9.02,4.32Z" transform="translate(-2.026 -0.913)" fill="#404040" />
                        </g>
                      </g>
                    </svg>
                  {store.phoneNumber_s}</a>
                }
              </p>
            </address>}
    
            </React.Fragment>
            );
        }
  return (
        <section className='p-3'>
          <div className='card'>
              <div className='row p-3' >
                  {localityBasedSearch.map((item) => {
                      return (
                          <div className='col-3' key={item.name}>
                              <input
                                  type="radio"
                                  value={item.name}
                                  checked={localitySelection === item.name}
                                  onChange={(e) => handleLocalityBasedSearch(e)}
                                  className="mr-2"
                              />
                              {item.name}
                              <input type="text" name={item.name} placeholder={item?.placeholder} value={localityValue[item.name]} onChange={(e) => handleLocalityValue(e)} className={`${localitySelection !== item.name ? 'locality-select cursor-not-allowed' : ''} ml-3`} disabled={localitySelection !== item.name} />
                          </div>
                      )
                  })}
              </div>
          </div>
          <div className='row mt-3 no-gutters'>
              <div className='col-4'>
                  <div className='card p-3'>
                      <p className='title font-weight-bolder'>Selected Locality</p>
                      <div class="">
                          <h5 className='font-14'><small>Locality</small><br />2-67/4, Railway Good Sheet Rd, SP Nagar, Bharat Nagar, Moosapet</h5>
                          <p class="mb-0 font-14"><small>Address</small><br />2-67/4, Railway Good Sheet Rd, SP Nagar, Bharat Nagar, Moosapet, Hyderabad, Telangana 500018, India</p>
                      </div>
                  </div>
              </div>
              <div className='col-4 px-3'>
                  <div className='card p-3'>
                      <p className='title font-weight-bolder'>Serving Info</p>
                      <div className="d-flex justify-content-between">
                          <div>
                              <p className='mb-1'><small>Hub Details</small> - <span className='font-16 font-weight-bold'>Polygon</span></p>
                              <h6 className='mb-0 font-14'>INTGHYD00491 [ O'Clock]</h6>
                              <span className='font-14'>ETA - 0hrs, Buffer ETA - 0hrs</span>
                          </div>
                          <div>
                              <small>Warehouse</small>
                              <h6 className='mb-0 font-14'>INTGHYD00491 [ O'Clock]</h6>
                              <span>ETA - 0hrs, Buffer ETA - 0hrs</span>
                          </div>
                      </div>
                  </div>
              </div>
              <div className='col-4'>
                  <div className='card'>
                      <p className='title pl-3 pt-3 font-weight-bolder'>Others Info</p>
                      <div className='d-flex flex-wrap'>
                          <div className='col-6'>
                              <small>
                                  Config ID
                              </small>
                              <p>44426[Pincode - 500018]</p>
                          </div>
                          <div className='col-6'>
                              <small>
                                  Config ID
                              </small>
                              <p>44426[Pincode - 500018]</p>
                          </div>
                          <div className='col-6'>
                              <small>
                                  Config ID
                              </small>
                              <p>44426[Pincode - 500018]</p>
                          </div>
                          <div className='col-6'>
                              <small>
                                  Config ID
                              </small>
                              <p>44426[Pincode - 500018]</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <p className='font-weight-bolder mt-3 mb-0'>Pickup Store</p>
            <div className='address-container near-by-store-info'>
                {locationCenters.map((eachStore)=>{
                    return(
                        <StoreLocationCard store={eachStore}/>
                    )
                })}
            </div>
            
          
        </section>
  )
}

export default LocalityInfo