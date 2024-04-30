import React, { useState } from 'react'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
const EnableCod = (props) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedArea, setSelectedArea] = useState(undefined);
    const toggle = () => setDropdownOpen((prevState) => !prevState);
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
      const selectTypes = ["Yes","No"]
  return (
    <section class="p-3 container">
      <h1 className='h5 mb-3'>Enable Cash on Delivery (COD)</h1>
      <div className='text-center '>
      <div className='d-flex'>
        <p className='col-3 text-right'>Enable Cash on Delivery (COD)</p>
        <Dropdown isOpen={dropdownOpen} toggle={toggle} onClick={(e) => e.stopPropagation()} className="col-3">
          <DropdownToggle caret className={`btn btn-block border ${props.roundedButton}`} color="white">
            <React.Fragment>{selectedArea || 'select Type'}</React.Fragment>
          </DropdownToggle>
          <DropdownMenu
            modifiers={{
              setMaxHeight: {
                enabled: true,
                order: 890,
                fn: (data) => {
                  return {
                    ...data,
                    styles: {
                      ...data.styles,
                      overflow: 'auto',
                      maxHeight: 200,
                    },
                  };
                },
              },
            }}
          >
            {selectTypes.map((eachArea) => (
              <DropdownItemComponent key={eachArea} eachArea={eachArea} onClickHandler={handleAreaSelection} />
            ))}
          </DropdownMenu>
        </Dropdown>
        <button type="button" className="btn btn-brand-gradient rounded-pill px-5 custom-btn-lg ml-3">Submit</button>
        </div>
       
      </div>
    </section>
  )
}

export default EnableCod