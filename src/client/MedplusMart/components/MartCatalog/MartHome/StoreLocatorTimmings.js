import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Validate from "../../../../helpers/Validate";

const StoreLocatorTimmings = (props) => {

  const timeSlots = props.store.storeAvailability

  const weekDays = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];

  const finalTimeSlots = {};

  weekDays.map((eachDay) => {
    if (eachDay in timeSlots) {
      finalTimeSlots[eachDay] = timeSlots[eachDay];
    } else {
      finalTimeSlots[eachDay] = "Closed";
    }
  });

  const format_time =(each) => {
      each = each.toLowerCase()
      if(each.search(/to/i) != -1) {
        let splitedstring =each.split("to")
        for (let elem in splitedstring) {
            splitedstring[elem] = splitedstring[elem].trim().replace(/^0+/, '')
            splitedstring[elem] = splitedstring[elem].replace(":00","")
            splitedstring[elem] = splitedstring[elem].replace(" am","am")
            splitedstring[elem] = splitedstring[elem].replace(" pm","pm")
        }
        return splitedstring[0] + "  -  " +splitedstring[1]
      }
      else {
        return each
      }
  } 

  const CloseButton = <button type="button" onClick={props.close} className="close" >
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
      <rect fill="none" width="24" height="24" />
      <path fill="#b9b9b9" d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm4.853,15.439a.5.5,0,0,1,0,.707l-.707.707a.5.5,0,0,1-.707,0L12,13.414,8.561,16.853a.5.5,0,0,1-.707,0l-.707-.707a.5.5,0,0,1,0-.707L10.586,12,7.147,8.561a.5.5,0,0,1,0-.707l.707-.707a.5.5,0,0,1,.707,0L12,10.586l3.439-3.439a.5.5,0,0,1,.707,0l.707.707a.5.5,0,0,1,0,.707L13.414,12Z" />
    </svg>
  </button>

  return (
    <React.Fragment>
      <Modal className="modal-dialog-centered my-account-modal" isOpen={props.isOpen} toggle={props.close}>
        <ModalHeader className="align-items-center" toggle={props.close} close={CloseButton}>
          Check Center Timings Of
            <p className="mb-0 text-muted font-14 text-capitalize">{props.store.name.toLowerCase()}</p>
        </ModalHeader>
        <ModalBody className="p-4">
          <div className="grid-container border-bottom-0 custom-boder">
            <div className="grid-item header">Day</div>
            <div className="grid-item header">Timings</div>
          </div>
          <div className="grid-container">
            {Validate().isNotEmpty(finalTimeSlots) && Object.entries(finalTimeSlots).map(([key, value]) => {
              return (
                Validate().isNotEmpty(value) &&

                <React.Fragment>
                  <div className="grid-item text-capitalize">{key.toLowerCase()}</div>
                    <div className={`grid-item`}>
                      {typeof (value) !== 'string' ? value.map((each, index) => { return (<span className="text-lowercase">{`${format_time(each)}${(index != value.length - 1) ? ',' : ''}`} &nbsp;</span>) }) : <span className='text-danger text-capitalize'>{value.toLowerCase()}</span>}
                    </div>
                </React.Fragment>
              )
            })}
          </div>
        </ModalBody>
        <ModalFooter className="justify-content-center border-0">
          <div onClick={props.close} className="text-center">
            <button className="btn brand-secondary rounded-pill custom-btn-lg px-4">Close</button>
          </div>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
}

export default StoreLocatorTimmings;