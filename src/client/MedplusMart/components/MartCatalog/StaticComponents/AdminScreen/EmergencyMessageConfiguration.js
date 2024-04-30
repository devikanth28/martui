import React, { useState, useCallback } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const DropdownItemComponent = ({ eachArea, onClickHandler }) => {
  return (
    <DropdownItem onClick={() => onClickHandler(eachArea)}>
      <React.Fragment>{eachArea}</React.Fragment>
      {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16.621 16">
        <g transform="translate(-12 -13)">
          <rect width="16" height="16" transform="translate(12 13)" fill="none"></rect>
          <path
            d="M18,9,9.75,17.25,6,13.5"
            transform="translate(8.5 7.5)"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          ></path>
        </g>
      </svg> */}
    </DropdownItem>
  );
};

const EmergencyMessageConfiguration = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState(undefined);
  const areas = ['ALL', 'STATE', 'CITY', 'WAREHOUSEID'];

  const toggle = () => setDropdownOpen((prevState) => !prevState);

const handleAreaSelection = (area)=>{
    setSelectedArea(area)
}

  return (
    <section>
      <h1 className="h5 p-3 header">Emergency Message Configuration</h1>
      <div className="p-3 row">
        <div className='d-flex align-items-baseline col-4'>
        <p className='col-2 font-weight-bold'>Area</p>
        {/* <Dropdown isOpen={dropdownOpen} toggle={toggle} onClick={(e) => e.stopPropagation()} className="col-3 px-0">
          <DropdownToggle caret className={`btn btn-block border ${props.roundedButton}`} color="white">
            <React.Fragment>{selectedArea || 'select area'}</React.Fragment>
          </DropdownToggle>
          <DropdownMenu>
            {areas.map((eachArea) => (
              <DropdownItemComponent key={eachArea} eachArea={eachArea} onClickHandler={handleAreaSelection} />
            ))}
          </DropdownMenu>
        </Dropdown> */}
         <form className="form-inline"  style={{"gap":"1rem"}}>
                    <div className="input-group">
                        <div className="custom-control custom-radio">
                        <input type="radio" className="custom-control-input" id="all" value = "ALL" name="Area" defaultChecked/>
                        <label className="custom-control-label" for="all">ALL</label>
                        </div>
                    </div>
                    <div className="input-group">
                        <div className="custom-control custom-radio">
                        <input type="radio" className="custom-control-input" id="state" value = "CC" name="Area" defaultChecked/>
                        <label className="custom-control-label" for="state">State</label>
                        </div>
                    </div>
                    <div className="input-group">
                        <div className="custom-control custom-radio">
                        <input type="radio" className="custom-control-input" id="city" value = "city" name="Area"/>
                        <label className="custom-control-label" for="city">City</label>
                        </div>
                    </div>
                    <div className="input-group">
                        <div className="custom-control custom-radio">
                        <input type="radio" className="custom-control-input" id="warehouseid" value = "WAREHOUSEID" name="payment-mode"/>
                        <label className="custom-control-label" for="warehouseid">WAREHOUSEID</label>
                        </div>
                    </div>
                </form>
        </div>
        <div className=' col-4'>
          <div class="form-group has-float-label mb-3">
            <textarea name='name' class="form-control" rows={1} placeholder=" " id="floatingTextarea"></textarea>
            <label htmlFor="floatingTextarea" className="select-label">Emergency Message</label>
          </div>
        </div> 
        <div className='col-4'>
          <div className='d-flex  justify-content-end'>
            <button type="button" role="button" class="brand-secondary btn px-5 rounded-pill custom-btn-lg">clear</button>
            <button type="button" role="button" class="btn-brand-gradient btn px-5 rounded-pill custom-btn-lg ml-3">Save</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EmergencyMessageConfiguration;
