import React, { useEffect, useState } from "react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import BreadCrumbAction from "../../../../../../redux/action/BreadCrumbAction";
import MartAdminService from "../../../../services/MartAdminService";
import Alert, { ALERT_TYPE_ERROR, ALERT_TYPE_SUCCESS } from '../../../../../components/Common/Alert';

const pushCustomerInfoInQueue = (props) => {
    const [customerIds, setCustomerIds] = useState(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [vertical, setVertical] = useState(null);
    const [enterCustomerIdFlag, setEnterCustomerIdFlag] = useState(false);
    const [alertInfo, setAlertInfo] = useState({ message: "", type: "" });
    const closeAlertMessage = () => {
        setAlertInfo({ message: "", type: "" });
    }
    const toggle = () => {
        setDropdownOpen(!dropdownOpen)
    }
    const setData = (e) => {
        setCustomerIds(e.target.value)
    }

    const breadCrumbAction = BreadCrumbAction();
    useEffect(() => {
        breadCrumbAction.pushBreadCrumbs({ name: ' Push Customer Info in Queue', url: props.location.pathname });
    }, [enterCustomerIdFlag, vertical])
    const pushData = (e) => {
        e.preventDefault();
        if (customerIds == null || customerIds == '') {
            setEnterCustomerIdFlag(true);
            return;
        } else {
            setEnterCustomerIdFlag(false );
        }
        if (vertical === 'Select Vertical') {
            setVertical(null);
        }
        MartAdminService().pushCustomerDetailsInQueue({ custIdStr: customerIds, vertical: (vertical === 'Select Vertical') ? null : vertical }).then((response) => {
            if(response.statusCode==='SUCCESS'){
                setAlertInfo({ message: response.message, type: ALERT_TYPE_SUCCESS });
            }else{
                setAlertInfo({ message: response.message, type: ALERT_TYPE_ERROR });
            }
        }).catch((error) => {
            console.log(error);
        })
    }
    const data = ["Mart", "Mob", "Crm"]
    const handleVerticalChange = (val) => {
        setVertical(val);
      };
      console.log("vertical",vertical)
    return (
        <React.Fragment>
            <section>
                    <h6 className="p-3 border-bottom mb-0 h5">Push Customer Info in Queue</h6>
                <div className="p-3">
                    <div onSubmit={(e)=>{e.preventDefault()}}>
                        <div className="col-3 mb-3">
                            <div className="each-group has-float-label">
                                <input className="form-control w-75 mr-2 mb-2" id="customerId" name="customerId" value={customerIds} placeholder=" " type="text" onChange={event => { event.preventDefault(); setData(event) }} />
                                {enterCustomerIdFlag && !customerIds && <p style={{ "color": "red" }}>Please Enter Customer Ids</p>}
                                <label htmlfor="customerId">
                                    Enter Customer Ids
                                </label>
                            </div>
                        </div>
                        {/* <div className="my-4">
                            <div className="custom-dropdown">
                                <Dropdown isOpen={dropdownOpen} toggle={toggle} >
                                    <DropdownToggle className="bg-none border btn btn-block d-flex justify-content-between text-body mb-3">
                                        {vertical ? vertical : 'Select Vertical'}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                                            <g id="bottomchevron_black_icon_24px" transform="translate(-762 -906.838)">
                                                <rect id="Rectangle_4721" data-name="Rectangle 4721" width="24" height="24" transform="translate(762 906.838)" fill="none" />
                                                <path id="Path_23400" data-name="Path 23400" d="M63.432,503.859l5.4-5.4a1.223,1.223,0,0,0-1.73-1.73l-4.533,4.52-4.533-4.533a1.228,1.228,0,0,0-2.092.865,1.216,1.216,0,0,0,.363.865l5.4,5.411A1.229,1.229,0,0,0,63.432,503.859Z" transform="translate(711.356 418.584)" fill="#080808" />
                                            </g>
                                        </svg>
                                    </DropdownToggle>
                                    <DropdownMenu id="dropdDownMenu" className="border-0 shadow" >
                                        {data.map((val) => {
                                            return (
                                                <DropdownItem value={val} onClick={(event) => { setVertical(event.target.value) }}>{val}</DropdownItem>
                                            )
                                        })}
                                    </DropdownMenu>
                                </Dropdown>
                            </div>
                        </div> */}
                      <form className="col-3" style={{ gap: '1rem' }}>
      <label className="font-12 mb-0">Select Vertical</label>
      <div className="d-flex">

      {data.map((val) => (
        <div className="input-group w-auto mr-3" key={val}>
          <div className="custom-control custom-radio">
            <input
              type="radio"
              className="custom-control-input"
              checked={vertical === val}
              id={val}
              value={val}
              name="vertical"
              onChange={() => handleVerticalChange(val)}
            />
            <label className="custom-control-label" htmlFor={val}>
              {val}
            </label>
          </div>
        </div>
      ))}
      </div>
    </form>

                        <div className="text-right">
                            <button type="button" className="btn btn-brand-gradient rounded-pill px-5 custom-btn-lg" onClick={event => { pushData(event) }}>
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
                <Alert alertInfo={alertInfo} onDurationEnd={closeAlertMessage} duration='5000' />
            </section>
        </React.Fragment>
    );
}
export default pushCustomerInfoInQueue;
