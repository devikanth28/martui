import React, { useState } from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import BreadCrumbAction from '../../../../../../redux/action/BreadCrumbAction';
const configurePaymentPromotions = (props) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedArea, setSelectedArea] = useState(undefined);
    const toggle = () => setDropdownOpen((prevState) => !prevState);

    const breadCrumbAction = BreadCrumbAction();

    useEffect(()=>{
      breadCrumbAction.pushBreadCrumbs({ name: 'Configure Payment Promotions', url: props.location.pathname });
    },[])

    const handleAreaSelection = (area)=>{
        setSelectedArea(area)
    }
    const DropdownItemComponent = ({ eachArea, onClickHandler }) => {
        return (
          <DropdownItem onClick={() => onClickHandler(eachArea)}>
            <React.Fragment>{eachArea}</React.Fragment>
          </DropdownItem>
        );
      };
      const types = ["CATALOG_MAS1","CATALOG_MAS2","CATALOG_MAS3","CATALOG_MAS4"]
  return (
    <section>
        <h1 className='h5 p-3 border-bottom'>Online Payment Configuration</h1>
          <div>
              <Tabs>
                  <div  className="header p-0 mb-0">
                  <TabList className="nav nav-pills" style={{"gap":"3rem"}}>
                      <Tab className="nav-item border-0">
                          <button role="button" className="nav-link py-3 btn border-0">Web</button>
                          </Tab>
                      <Tab className="nav-item border-0">
                          <button role="button" className="nav-link py-3 btn border-0">Mart</button>
                          </Tab>
                      <Tab className="nav-item border-0">
                          <button role="button" className="nav-link py-3 btn border-0">Promotion Text</button>
                          </Tab>
                  </TabList>
                  </div>
                  <TabPanel>
                      <div className='p-3'>
                  <div className='card'>
                  <p className='font-weight-bold mb-2 p-3'>Write Promotional Message to below given payment channels</p>
                  <div className='d-flex flex-wrap'>
                          <div className='col-6'>
                            <div className="form-group has-float-label mb-3">
                                <input name="name" id="name" placeholder=" " type="text" autoComplete="off" className={"form-control"} />
                                <label htmlFor="name" className="select-label">PayTm</label>
                            </div>
                          </div>
                          <div className='col-6'>
                            <div className="form-group has-float-label mb-3">
                                <input name="name" id="name" placeholder=" " type="text" autoComplete="off" className={"form-control"} />
                                <label htmlFor="name" className="select-label">PhonePe</label>
                            </div>
                          </div>
                          <div className='col-6'>
                            <div className="form-group has-float-label mb-3">
                                <input name="name" id="name" placeholder=" " type="text" autoComplete="off" className={"form-control"} />
                                <label htmlFor="name" className="select-label">Jio</label>
                            </div>
                          </div>
                          <div className='col-6'>
                            <div className="form-group has-float-label mb-3">
                                <input name="name" id="name" placeholder=" " type="text" autoComplete="off" className={"form-control"} />
                                <label htmlFor="name" className="select-label">MobikiWik</label>
                            </div>
                          </div>  
                                      
                          <div className="col d-flex justify-content-end mb-3">
                              <button type="button" role="button" class="btn-brand-gradient px-5 rounded-pill custom-btn-lg text-right">Save</button>
                          </div>
                        </div> 
                  </div>
                  </div>
                  </TabPanel>
                  <TabPanel>
                  <p className='font-weight-bold p-3 mb-0'>Write Promotional Message to below given payment channels</p>
                  <div className='d-flex flex-wrap'>
                          <div className='col-6'>
                            <div className="form-group has-float-label mb-3">
                                <input name="name" id="name" placeholder=" " type="text" autoComplete="off" className={"form-control"} />
                                <label htmlFor="name" className="select-label">PayTm</label>
                            </div>
                          </div>
                          <div className='col-6'>
                            <div className="form-group has-float-label mb-3">
                                <input name="name" id="name" placeholder=" " type="text" autoComplete="off" className={"form-control"} />
                                <label htmlFor="name" className="select-label">PhonePe</label>
                            </div>
                          </div>
                          <div className='col-6'>
                            <div className="form-group has-float-label mb-3">
                                <input name="name" id="name" placeholder=" " type="text" autoComplete="off" className={"form-control"} />
                                <label htmlFor="name" className="select-label">Jio</label>
                            </div>
                          </div>
                          <div className='col-6'>
                            <div className="form-group has-float-label mb-3">
                                <input name="name" id="name" placeholder=" " type="text" autoComplete="off" className={"form-control"} />
                                <label htmlFor="name" className="select-label">MobikiWik</label>
                            </div>
                          </div>                          
                          <div className="col d-flex justify-content-end mb-3">
                              <button type="button" role="button" class="btn-brand-gradient px-5 rounded-pill custom-btn-lg text-right">Save</button>
                          </div>
                        </div> 
                  </TabPanel>
                  <TabPanel>
                  <div className='d-flex m-3'>
                  <Dropdown isOpen={dropdownOpen} toggle={toggle} onClick={(e) => e.stopPropagation()} className="col-3 px-0 border mb-3">
                      <DropdownToggle caret className={`btn btn-block ${props.roundedButton}`} color="white">
                          <React.Fragment>{selectedArea || 'select Type'}</React.Fragment>
                      </DropdownToggle>
                      <DropdownMenu>
                          {types.map((eachArea) => (
                              <DropdownItemComponent key={eachArea} eachArea={eachArea} onClickHandler={handleAreaSelection} />
                          ))}
                      </DropdownMenu>
                  </Dropdown>
                  <div className="ml-3 col-3">
                      <div className="form-group">
                          <select className="form-control">
                              <option value="Y">Wallet</option>
                              <option value="N">Discount</option>
                          </select>
                      </div>
                  </div>
                          <button type="button" role="button" class="btn-brand-gradient px-5 rounded-pill custom-btn-lg mb-3">Save</button>
              </div>
                  </TabPanel>
              </Tabs>
          </div>
    </section>
  )
}

export default configurePaymentPromotions