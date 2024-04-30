import React from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { getDisplayableAge } from '../../../helpers/CommonUtil';
import Validate from '../../../helpers/Validate';
import { Gender } from '../../Common/Constants/MartConstants';
const PatientModal = (props) => {
    const closeButton = <button type="button" role="button" class="close" onClick={()=>props.setModalOpen(!props.isModalOpen)}>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><rect fill="none" width="24" height="24"></rect><path fill="#b9b9b9" d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm4.853,15.439a.5.5,0,0,1,0,.707l-.707.707a.5.5,0,0,1-.707,0L12,13.414,8.561,16.853a.5.5,0,0,1-.707,0l-.707-.707a.5.5,0,0,1,0-.707L10.586,12,7.147,8.561a.5.5,0,0,1,0-.707l.707-.707a.5.5,0,0,1,.707,0L12,10.586l3.439-3.439a.5.5,0,0,1,.707,0l.707.707a.5.5,0,0,1,0,.707L13.414,12Z"></path></svg>
</button>
  return (
      <React.Fragment>
          <Modal backdrop="static" isOpen={props.isModalOpen} className="modal-dialog my-account-modal modal-dialog-centered hide-close">
                <ModalHeader close={closeButton}>
                        <React.Fragment>
                            Select Patient
                        </React.Fragment>
                </ModalHeader>
                <ModalBody className='p-3'>
                    <div className='scroll-content'>
                    {Validate().isNotEmpty(props.patientDetails) && <div className="w-100 pl-0 border-0 pb-0">
                        {props.patientDetails.map((eachPatient) => {
                            return (
                                <React.Fragment>
                                    <div className={`${props.selectedValue == eachPatient.patientId ? "border-active" :"border"} mb-3 p-2`} onClick={() => props.handleSelection(eachPatient.patientId, eachPatient.patientName)}>
                                        <div className='custom-control custom-radio'>
                                    <input type="radio" className='custom-control-input' onClick={() => props.handleSelection(eachPatient.patientId, eachPatient.patientName)} name="PatientSelect" checked={props.selectedValue == eachPatient.patientId} />
                                            <label className='custom-control-label pointer mt-1' htmlFor={eachPatient.patientId}>
                                                <div>
                                                    <h6 class="mb-0 text-capitalize text-truncate">{eachPatient.patientName}  {eachPatient.subscribedMember &&
                                                        <span className="badge badge-dark font-weight-bold mt-2 ml-2">Member</span>}</h6>
                                                    <small class="text-secondary">{getDisplayableAge(eachPatient.dateOfBirth)} {Validate().isNotEmpty(eachPatient.dateOfBirth) && Validate().isNotEmpty(eachPatient.gender) && "/"} {Validate().isNotEmpty(eachPatient.gender) && Gender[eachPatient.gender]}</small>
                                                </div>
                                            </label>
                                        </div>
                                    </div>
                                </React.Fragment>
                            )
                        })}
                    </div>}
                    </div>
                    <div class="text-center mt-3">
                        <button type="button" role="button" className="btn btn-brand-gradient rounded-pill px-5 ml-3 custom-btn-lg" onClick={()=>props.setModalOpen(!props.isModalOpen)}>Save &amp; Continue</button>
                    </div>
                </ModalBody>
          </Modal>
      </React.Fragment>
  )
}

export default PatientModal