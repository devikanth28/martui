import React from 'react'
import StoreLocatorGhostImage from './StoreLocatorGhostImage';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import StoreLocatarCard from './StoreLocatarCard';
import NoStoreAvailable from './NoStoreAvailable';
import { useState } from 'react';
const StoreLocatar = (props) => {
  const [tabIndex, setTabIndex] = useState(0);
  return (
    <React.Fragment>
      <section className='p-4'>
        <div className='ml-2 mb-4'>
          <h2>Store
            <span className='font-weight-light'> Locator</span>
          </h2>
        </div>
        <div className='d-flex'>
          <h6 className="ml-2">Near by Stores</h6>
          <p className="ml-2"> based on locality selected</p>
        </div>
        <div className='row ml-2'>
          <div className=" py-2 search-input px-0 mb-2 col-4">
            <input type="text" placeholder="Search for the nearby stores" autocomplete="off" className="py-2 pl-3  searchBarInput border-0" />
            <svg xmlns="http://www.w3.org/2000/svg" className="search-icon" width="20" height="20" viewBox="0 0 20 20">
              <g transform="translate(-1955.526 -233.434)">
                <rect fill="none" width="20" height="20" transform="translate(1955.526 233.434)"></rect>
                <path fill="none" d="M1955.534,253.419"></path>
                <path fill="#404040" d="M1963.31,248.985a7.636,7.636,0,0,0,4.968-1.811l6.039,6.038a.707.707,0,0,0,1-1l-6.039-6.038a7.769,7.769,0,1,0-5.968,2.811Zm0-14.146a6.366,6.366,0,1,1-6.361,6.372V241.2A6.374,6.374,0,0,1,1963.31,234.839Z"></path>
              </g>
            </svg>
          </div>
          <div className='col'>
            <div className='near-by-StoreLocatar'>
              <div className="locality-badges p-2">
                <a className="Locations" href="javascript:void(0);" title="All Locations">All</a>
                <a className="Locations badge-pill" title="balanagar" href="javascript:void(0);">balanagar</a>
                <a className="Locations badge-pill" title="moosapet" href="javascript:void(0);" >moosapet</a>
                <a className="Locations badge-pill" title="kukatpally" href="javascript:void(0);">kukatpally</a>
                <a className="Locations badge-pill" title="erragadda" href="javascript:void(0);" >erragadda</a>
                <a className="Locations badge-pill" title="mothinagar" href="javascript:void(0);" >mothinagar</a>
                <a className="Locations badge-pill" title="kukatpally(bjp_office)" href="javascript:void(0);" >kukatpally(bjp office)</a>
                <a className="Locations badge-pill" title="motinagar_stop" href="javascript:void(0);" >motinagar stop</a>
              </div>
            </div>
          </div>
        </div>

        <Tabs selectedIndex={tabIndex} onSelect={index => setTabIndex(index)}>
                <div className="header p-0 mb-0">
                    <TabList className="nav nav-pills">
                        <Tab className="nav-item border-0" title="Pharmacies">
                            <a href="javascript:void(0)" className="nav-link py-3">Pharmacies</a>
                        </Tab>
                        <Tab className="nav-item border-0" title="Diagnostics">
                            <a href="javascript:void(0)" className="nav-link py-3">Diagnostics</a>
                        </Tab>
                    </TabList>
                </div>
                <TabPanel>
                    <StoreLocatarCard  storeLocatar={true} />
                </TabPanel>
                <TabPanel>
                    <NoStoreAvailable />
                </TabPanel>
            </Tabs>
      </section>
      
      <StoreLocatorGhostImage/>
    </React.Fragment>
  )
}
export default StoreLocatar