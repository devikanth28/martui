import React, { useState } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

const MetaInformation = () => {
  // State for current active Tab
  const [currentActiveTab, setCurrentActiveTab] = useState('default-info');

  // Toggle active state for Tab
  const toggle = tab => {
    if (currentActiveTab !== tab) setCurrentActiveTab(tab);
  }
  const [dropdownOpen,setDropdownOpen]=useState(false);
  const toggleDropDown=()=>{
      setDropdownOpen(!dropdownOpen)
  }

  const data=["Default","CONTACT_US","SITEMAP","BRANDS","MART_FAQ","ABOUT_US","STORE_LOCATOR","PRIVACY_POLICY","TERMS_AND_CONDITIONS","RETURNS_AND_CANCELLATIONS",
"PHARMA_HOME","DOCTOR_CONSULTATION","DIAGNOSTICS","ORDER_HISTORY","VIEW_PRESCRIPTION","FLEXI_REWARDS","PROMOTIONS","CUSTOMER_FEEDBACK","MEDPLUS_BLOG","MEDPLUS_ADVANTAGE"
]



  const FormContent = () => {
    return (
      <React.Fragment>
        <div className="mt-3 each-group has-float-label">
          <input id="title" className="form-control" name="title" placeholder=" " type="input" />
          <label for="title">
            Title
          </label>
          <p className="hintText">Max characters allowed 70</p>
        </div>
        <div className="each-group has-float-label">
          <input id="keywords" className="form-control" name="keywords" placeholder=" " type="input" />
          <label for="keywords">
            Keywords
          </label>
          <p className="hintText">Max characters allowed 180</p>
        </div>
        <div className="each-group has-float-label">
          <input id="description" className="form-control" name="description" placeholder=" " type="input" />
          <label for="description">
            Description
          </label>
          <p className="hintText">Max characters allowed 160</p>
        </div>
      </React.Fragment>
    );
  }

  const DefaultMetaInfo = () => {
    return (
      <React.Fragment>
        <h5>Meta Keywords And Description</h5>
        <div className="row d-flex justify-content-start align-items-center">
          <div className="col-sm-1">
            <label htmlFor="name">
              Name
            </label>
          </div>
          <div className="col-sm-3 px-0">
            <div className="custom-dropdown">
              <Dropdown isOpen={dropdownOpen} toggle={toggleDropDown} onClick={(e) => e.stopPropagation()}>
                <DropdownToggle className="bg-none border btn btn-block d-flex justify-content-between text-body mb-3">
                  Select type
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                    <g id="bottomchevron_black_icon_24px" transform="translate(-762 -906.838)">
                      <rect id="Rectangle_4721" data-name="Rectangle 4721" width="24" height="24" transform="translate(762 906.838)" fill="none" />
                      <path id="Path_23400" data-name="Path 23400" d="M63.432,503.859l5.4-5.4a1.223,1.223,0,0,0-1.73-1.73l-4.533,4.52-4.533-4.533a1.228,1.228,0,0,0-2.092.865,1.216,1.216,0,0,0,.363.865l5.4,5.411A1.229,1.229,0,0,0,63.432,503.859Z" transform="translate(711.356 418.584)" fill="#080808" />
                    </g>
                  </svg>
                </DropdownToggle>
                <DropdownMenu id="dropdDownMenu" className="border-0 shadow">
                  {data.map((val) => {
                    return (
                      <DropdownItem>{val}</DropdownItem>
                    )
                  })}
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </div>
        <FormContent />
      </React.Fragment>
    );
  }

  const GeneralCategory = () => {
    return (
      <React.Fragment>
        <h5>Keywords And Description For General Category</h5>
        <div className="row d-flex justify-content-start align-items-center">
          <div className="col-sm-2">
            <label  htmlFor="search">
              Search Here
            </label>
          </div>
          <div className="col-sm-3 px-0">
          <div className="custom-dropdown">
              <Dropdown isOpen={dropdownOpen} toggle={toggleDropDown} onClick={(e) => e.stopPropagation()}>
                <DropdownToggle className="bg-none border btn btn-block d-flex justify-content-between text-body mb-3">
                  Select type
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                    <g id="bottomchevron_black_icon_24px" transform="translate(-762 -906.838)">
                      <rect id="Rectangle_4721" data-name="Rectangle 4721" width="24" height="24" transform="translate(762 906.838)" fill="none" />
                      <path id="Path_23400" data-name="Path 23400" d="M63.432,503.859l5.4-5.4a1.223,1.223,0,0,0-1.73-1.73l-4.533,4.52-4.533-4.533a1.228,1.228,0,0,0-2.092.865,1.216,1.216,0,0,0,.363.865l5.4,5.411A1.229,1.229,0,0,0,63.432,503.859Z" transform="translate(711.356 418.584)" fill="#080808" />
                    </g>
                  </svg>
                </DropdownToggle>
                <DropdownMenu id="dropdDownMenu" className="border-0 shadow">
                  {data.map((val) => {
                    return (
                      <DropdownItem>{val}</DropdownItem>
                    )
                  })}
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </div>
        <FormContent />
      </React.Fragment>
    );
  }

  const GeneralBrands = () => {
    return (
      <React.Fragment>
        <h5>Keywords And Description For General Brands</h5>
        <div className="row d-flex justify-content-start align-items-center">
          <div className="col-sm-2">
            <label htmlFor="search">
              Search Here
            </label>
          </div>
          <div className="col-sm-3 px-0">
          <div className="custom-dropdown">
              <Dropdown isOpen={dropdownOpen} toggle={toggleDropDown} onClick={(e) => e.stopPropagation()}>
                <DropdownToggle className="bg-none border btn btn-block d-flex justify-content-between text-body mb-3">
                  Select type
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                    <g id="bottomchevron_black_icon_24px" transform="translate(-762 -906.838)">
                      <rect id="Rectangle_4721" data-name="Rectangle 4721" width="24" height="24" transform="translate(762 906.838)" fill="none" />
                      <path id="Path_23400" data-name="Path 23400" d="M63.432,503.859l5.4-5.4a1.223,1.223,0,0,0-1.73-1.73l-4.533,4.52-4.533-4.533a1.228,1.228,0,0,0-2.092.865,1.216,1.216,0,0,0,.363.865l5.4,5.411A1.229,1.229,0,0,0,63.432,503.859Z" transform="translate(711.356 418.584)" fill="#080808" />
                    </g>
                  </svg>
                </DropdownToggle>
                <DropdownMenu id="dropdDownMenu" className="border-0 shadow">
                  {data.map((val) => {
                    return (
                      <DropdownItem>{val}</DropdownItem>
                    )
                  })}
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </div>
        <FormContent />
      </React.Fragment>
    );
  }

  const PharmacyBrands = () => {
    return (
      <React.Fragment>
        <h5>Keywords And Description For Pharmacy Manufacturers</h5>
        <div className="row d-flex justify-content-start align-items-center">
          <div className="col-sm-2">
            <label  htmlFor="search">
              Search Here
            </label>
          </div>
          <div className="col-sm-3 px-0">
          <div className="custom-dropdown">
              <Dropdown isOpen={dropdownOpen} toggle={toggleDropDown} onClick={(e) => e.stopPropagation()}>
                <DropdownToggle className="bg-none border btn btn-block d-flex justify-content-between text-body mb-3">
                  Select type
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                    <g id="bottomchevron_black_icon_24px" transform="translate(-762 -906.838)">
                      <rect id="Rectangle_4721" data-name="Rectangle 4721" width="24" height="24" transform="translate(762 906.838)" fill="none" />
                      <path id="Path_23400" data-name="Path 23400" d="M63.432,503.859l5.4-5.4a1.223,1.223,0,0,0-1.73-1.73l-4.533,4.52-4.533-4.533a1.228,1.228,0,0,0-2.092.865,1.216,1.216,0,0,0,.363.865l5.4,5.411A1.229,1.229,0,0,0,63.432,503.859Z" transform="translate(711.356 418.584)" fill="#080808" />
                    </g>
                  </svg>
                </DropdownToggle>
                <DropdownMenu id="dropdDownMenu" className="border-0 shadow">
                  {data.map((val) => {
                    return (
                      <DropdownItem>{val}</DropdownItem>
                    )
                  })}
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </div>
        <FormContent />
      </React.Fragment>
    );
  }

  const LabCategory = () => {
    return (
      <React.Fragment>
        <h5>Keywords And Description For Lab Category</h5>
        <div className="row d-flex justify-content-start align-items-center">
          <div className="col-sm-2">
            <label  htmlFor="search">
              Search Here
            </label>
          </div>
          <div className="col-sm-3 px-0">
          <div className="custom-dropdown">
              <Dropdown isOpen={dropdownOpen} toggle={toggleDropDown} onClick={(e) => e.stopPropagation()}>
                <DropdownToggle className="bg-none border btn btn-block d-flex justify-content-between text-body mb-3">
                  Select type
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                    <g id="bottomchevron_black_icon_24px" transform="translate(-762 -906.838)">
                      <rect id="Rectangle_4721" data-name="Rectangle 4721" width="24" height="24" transform="translate(762 906.838)" fill="none" />
                      <path id="Path_23400" data-name="Path 23400" d="M63.432,503.859l5.4-5.4a1.223,1.223,0,0,0-1.73-1.73l-4.533,4.52-4.533-4.533a1.228,1.228,0,0,0-2.092.865,1.216,1.216,0,0,0,.363.865l5.4,5.411A1.229,1.229,0,0,0,63.432,503.859Z" transform="translate(711.356 418.584)" fill="#080808" />
                    </g>
                  </svg>
                </DropdownToggle>
                <DropdownMenu id="dropdDownMenu" className="border-0 shadow">
                  {data.map((val) => {
                    return (
                      <DropdownItem>{val}</DropdownItem>
                    )
                  })}
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </div>
        <FormContent />
      </React.Fragment>
    );
  }

  const LabDepartments = () => {
    return (
      <React.Fragment>
        <h5>Keywords And Description For Lab Tests and Departments</h5>
        <div className="row d-flex justify-content-start align-items-center">
          <div className="col-sm-2">
            <label  htmlFor="search">
              Search Here
            </label>
          </div>
          <div className="col-sm-3 px-0">
          <div className="custom-dropdown">
              <Dropdown isOpen={dropdownOpen} toggle={toggleDropDown} onClick={(e) => e.stopPropagation()}>
                <DropdownToggle className="bg-none border btn btn-block d-flex justify-content-between text-body mb-3">
                  Select type
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                    <g id="bottomchevron_black_icon_24px" transform="translate(-762 -906.838)">
                      <rect id="Rectangle_4721" data-name="Rectangle 4721" width="24" height="24" transform="translate(762 906.838)" fill="none" />
                      <path id="Path_23400" data-name="Path 23400" d="M63.432,503.859l5.4-5.4a1.223,1.223,0,0,0-1.73-1.73l-4.533,4.52-4.533-4.533a1.228,1.228,0,0,0-2.092.865,1.216,1.216,0,0,0,.363.865l5.4,5.411A1.229,1.229,0,0,0,63.432,503.859Z" transform="translate(711.356 418.584)" fill="#080808" />
                    </g>
                  </svg>
                </DropdownToggle>
                <DropdownMenu id="dropdDownMenu" className="border-0 shadow">
                  {data.map((val) => {
                    return (
                      <DropdownItem>{val}</DropdownItem>
                    )
                  })}
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </div>
        <FormContent />
      </React.Fragment>
    );
  }

  const HealthyLifeCategory = () => {
    return (
      <React.Fragment>
        <h5>Blog Meta Keywords And Description</h5>
        <div className="row d-flex justify-content-start align-items-start mb-3">
          <div className="col-sm-1">
            <label htmlFor="name">
              Name
            </label>
          </div>
          <div className="col-sm-6">
          <div className="custom-dropdown">
              <Dropdown isOpen={dropdownOpen} toggle={toggleDropDown} onClick={(e) => e.stopPropagation()}>
                <DropdownToggle className="bg-none border btn btn-block d-flex justify-content-between text-body mb-3">
                  Select type
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                    <g id="bottomchevron_black_icon_24px" transform="translate(-762 -906.838)">
                      <rect id="Rectangle_4721" data-name="Rectangle 4721" width="24" height="24" transform="translate(762 906.838)" fill="none" />
                      <path id="Path_23400" data-name="Path 23400" d="M63.432,503.859l5.4-5.4a1.223,1.223,0,0,0-1.73-1.73l-4.533,4.52-4.533-4.533a1.228,1.228,0,0,0-2.092.865,1.216,1.216,0,0,0,.363.865l5.4,5.411A1.229,1.229,0,0,0,63.432,503.859Z" transform="translate(711.356 418.584)" fill="#080808" />
                    </g>
                  </svg>
                </DropdownToggle>
                <DropdownMenu id="dropdDownMenu" className="border-0 shadow">
                  {data.map((val) => {
                    return (
                      <DropdownItem>{val}</DropdownItem>
                    )
                  })}
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </div>
        <FormContent />
      </React.Fragment>
    );
  }

  const HealthyLifeDetail = () => {
    return (
      <React.Fragment>
        <h5>Blog Details Meta Keywords And Description</h5>
        <div className="row d-flex justify-content-start align-items-center mb-3">
          <div className="col-sm-4">
          <div className="custom-dropdown">
              <Dropdown isOpen={dropdownOpen} toggle={toggleDropDown} onClick={(e) => e.stopPropagation()}>
                <DropdownToggle className="bg-none border btn btn-block d-flex justify-content-between text-body mb-3">
                  Select type
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                    <g id="bottomchevron_black_icon_24px" transform="translate(-762 -906.838)">
                      <rect id="Rectangle_4721" data-name="Rectangle 4721" width="24" height="24" transform="translate(762 906.838)" fill="none" />
                      <path id="Path_23400" data-name="Path 23400" d="M63.432,503.859l5.4-5.4a1.223,1.223,0,0,0-1.73-1.73l-4.533,4.52-4.533-4.533a1.228,1.228,0,0,0-2.092.865,1.216,1.216,0,0,0,.363.865l5.4,5.411A1.229,1.229,0,0,0,63.432,503.859Z" transform="translate(711.356 418.584)" fill="#080808" />
                    </g>
                  </svg>
                </DropdownToggle>
                <DropdownMenu id="dropdDownMenu" className="border-0 shadow">
                  {data.map((val) => {
                    return (
                      <DropdownItem>{val}</DropdownItem>
                    )
                  })}
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
          <div className="col-sm-1">
            <button type="button" className="btn btn-dark">Search</button>
          </div>
        </div>
        <FormContent />
      </React.Fragment>
    );
  }

  const LandingPage = () => {
    return (
      <React.Fragment>
        <h5>Landing Page Meta Keywords And Description</h5>
        <div className="row d-flex justify-content-start align-items-center mb-3">
          <div className="col-sm-4">
          <div className="custom-dropdown">
              <Dropdown isOpen={dropdownOpen} toggle={toggleDropDown} onClick={(e) => e.stopPropagation()}>
                <DropdownToggle className="bg-none border btn btn-block d-flex justify-content-between text-body mb-3">
                  Select type
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                    <g id="bottomchevron_black_icon_24px" transform="translate(-762 -906.838)">
                      <rect id="Rectangle_4721" data-name="Rectangle 4721" width="24" height="24" transform="translate(762 906.838)" fill="none" />
                      <path id="Path_23400" data-name="Path 23400" d="M63.432,503.859l5.4-5.4a1.223,1.223,0,0,0-1.73-1.73l-4.533,4.52-4.533-4.533a1.228,1.228,0,0,0-2.092.865,1.216,1.216,0,0,0,.363.865l5.4,5.411A1.229,1.229,0,0,0,63.432,503.859Z" transform="translate(711.356 418.584)" fill="#080808" />
                    </g>
                  </svg>
                </DropdownToggle>
                <DropdownMenu id="dropdDownMenu" className="border-0 shadow">
                  {data.map((val) => {
                    return (
                      <DropdownItem>{val}</DropdownItem>
                    )
                  })}
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
          <div className="col-sm-1">
            <button type="button" className="btn btn-dark">Search</button>
          </div>
        </div>
        <FormContent />
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <section className="admin-screen">
          <div className="border-bottom d-flex header justify-content-between p-3">
            <p className="mb-0 font-weight-bold">Meta Information</p>
            <button className="btn-brand-gradient rounded-pill custom-btn-lg">Refresh Redies</button>
          </div>
          <div className="align-items-start d-flex justify-content-evenly py-3">
            
            <div className="col-3">
              <Nav vertical>
                <NavItem className={currentActiveTab === 'default-info' && 'tab-active'}>
                  <NavLink className="p-0" onClick={() => { toggle('default-info'); }}>
                    Default Meta Info
                  </NavLink>
                </NavItem>
                <NavItem className={currentActiveTab === 'general-category' && 'tab-active'}>
                  <NavLink className="p-0" onClick={() => { toggle('general-category'); }}>
                    General Category
                  </NavLink>
                </NavItem>
                <NavItem className={currentActiveTab === 'general-brands' && 'tab-active'}>
                  <NavLink className="p-0" onClick={() => { toggle('general-brands'); }}>
                    General Brands
                  </NavLink>
                </NavItem>
                <NavItem className={currentActiveTab === 'pharmacy-brands' && 'tab-active'}>
                  <NavLink className="p-0" onClick={() => { toggle('pharmacy-brands'); }}>
                    Pharmacy Brands
                  </NavLink>
                </NavItem>
                <NavItem className={currentActiveTab === 'lab-category' && 'tab-active'}>
                  <NavLink className="p-0" onClick={() => { toggle('lab-category'); }}>
                    Lab Category
                  </NavLink>
                </NavItem>
                <NavItem className={currentActiveTab === 'lab-departments' && 'tab-active'}>
                  <NavLink className="p-0" onClick={() => { toggle('lab-departments'); }}>
                    Lab Departments
                  </NavLink>
                </NavItem>
                <NavItem className={currentActiveTab === 'healthy-life-category' && 'tab-active'}>
                  <NavLink className="p-0" onClick={() => { toggle('healthy-life-category'); }}>
                    Healthy Life Category
                  </NavLink>
                </NavItem>
                <NavItem className={currentActiveTab === 'healthy-life-detail' && 'tab-active'}>
                  <NavLink className="p-0" onClick={() => { toggle('healthy-life-detail'); }}>
                    Healthy Life Detail Page
                  </NavLink>
                </NavItem>
                <NavItem className={currentActiveTab === 'landing-page' && 'tab-active'}>
                  <NavLink className="p-0" onClick={() => { toggle('landing-page'); }}>
                    Landing Page
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
            <div className="col-9">
              <TabContent activeTab={currentActiveTab}>
                <TabPane tabId="default-info">
                  <div className="row">
                    <div className="col-sm-12">
                      <DefaultMetaInfo />
                    </div>
                  </div>
                </TabPane>
                <TabPane tabId="general-category">
                  <div className="row">
                    <div className="col-sm-12" sm="12">
                      <GeneralCategory />
                    </div>
                  </div>
                </TabPane>
                <TabPane tabId="general-brands">
                  <div className="row">
                    <div className="col-sm-12">
                      <GeneralBrands />
                    </div>
                  </div>
                </TabPane>
                <TabPane tabId="pharmacy-brands">
                  <div className="row">
                    <div className="col-sm-12">
                      <PharmacyBrands />
                    </div>
                  </div>
                </TabPane>
                <TabPane tabId="lab-category">
                  <div className="row">
                    <div className="col-sm-12">
                      <LabCategory />
                    </div>
                  </div>
                </TabPane>
                <TabPane tabId="lab-departments">
                  <div className="row">
                    <div className="col-sm-12">
                      <LabDepartments />
                    </div>
                  </div>
                </TabPane>
                <TabPane tabId="healthy-life-category">
                  <div className="row">
                    <div className="col-sm-12">
                      <HealthyLifeCategory />
                    </div>
                  </div>
                </TabPane>
                <TabPane tabId="healthy-life-detail">
                  <div className="row">
                    <div className="col-sm-12">
                      <HealthyLifeDetail />
                    </div>
                  </div>
                </TabPane>
                <TabPane tabId="landing-page">
                  <div className="row">
                    <div className="col-sm-12">
                      <LandingPage />
                    </div>
                  </div>
                </TabPane>
              </TabContent>
              <div className="row d-flex align-items-center justify-content-end">
                <div>
                  <button type="button" className="brand-secondary btn px-5 rounded-pill">Clear</button>
                </div>
                <div>
                  <button type="button" className="btn btn-brand-gradient rounded-pill px-5 mr-3">Save Details</button>
                </div>
              </div>
            <div class="input-group mb-3">
              <input type="text" class="form-control" placeholder="alaaska" aria-label="username" aria-describedby="username" />
              <div class="input-group-append">
                <span class="input-group-text" id="basic-addon2">search</span>
              </div>
            </div>
            </div>
          </div>
      </section>
    </React.Fragment>
  );
};

export default MetaInformation;