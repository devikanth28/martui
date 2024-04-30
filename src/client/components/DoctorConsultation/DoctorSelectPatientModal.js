import React ,{useState} from "react"
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import EditPatientForm from './EditPatientForm'

const DoctorSelectPatientModal = (props) => {

    const [ShowPatientForm , setShowPatientForm] = useState(false)

    return (
        /*
        
        
        
        
        
        
        
        
        use the select patient modal from labs 
                
        
        
        
        
        
        
        
        
        */
    <Modal backdrop="static" keyboard={false} isOpen={props.openPopover} className="modal-dialog my-account-modal modal-dialog-centered hide-close" tabIndex="-1" autoFocus={false}>
        <ModalHeader className="labs-patient-header">
            {!ShowPatientForm && <span>Select Patient</span> }
            { ShowPatientForm && <span>Add New Patient</span> }
            {!ShowPatientForm && <button onClick={()=>setShowPatientForm(!ShowPatientForm)} className="btn btn-outline-brand btn-sm float-right">Add New Patient</button> }
            {ShowPatientForm && <button onClick={()=>setShowPatientForm(!ShowPatientForm)} className="btn btn-outline-brand btn-sm float-right">Select Patient</button> }
        </ModalHeader>
        <ModalBody className="p-3">
            {!ShowPatientForm && <div className="scroll-content">
                <div className="border rounded mb-3 p-2">
                    <div className="custom-control custom-radio font-weight-normal d-flex justify-content-between">
                        <input type="radio" className="custom-control-input" name="patients" id="patient-1" />
                        <label for="patient-1" className="custom-control-label pointer w-100">
                            <div>
                                <h6 className="mb-0">Sampath Kumar Ch <span className="badge badge-primary ml-1">MID 234568</span></h6>
                                <small className="text-secondary">38Yrs / Male</small>
                            </div>
                        </label>
                    </div>
                </div>
                <div className="border rounded mb-3 p-2">
                    <div className="custom-control custom-radio font-weight-normal d-flex justify-content-between">
                        <input type="radio" className="custom-control-input" name="patients" id="patient-2" />
                        <label for="patient-2" className="custom-control-label pointer w-100">
                            <div>
                                <h6 className="mb-0">Sampath Kumar Ch <span className="badge badge-primary ml-1">MID 234568</span></h6>
                                <small className="text-secondary">38Yrs / Male</small>
                            </div>
                        </label>
                    </div>
                </div>
                <div className="border rounded mb-0 p-2">
                    <div className="custom-control custom-radio font-weight-normal d-flex justify-content-between align-items-center">
                        <input type="radio" className="custom-control-input" name="patients" id="patient-3" />
                        <label for="patient-3" className="custom-control-label pointer w-100">
                            <div>
                                <h6 className="mb-0">Sampath Kumar Ch <span className="badge badge-primary ml-1">MID 234568</span></h6>
                                <small className="text-secondary">38Yrs / Male</small>
                            </div>
                        </label>
                        <a className="btn btn-link text-primary no-underline mr-n2" href="javascript:void(0)" title="Edit">Edit</a>
                    </div>
                </div>
            </div> }

            {ShowPatientForm && <EditPatientForm/> }

        </ModalBody>
        <ModalFooter className="justify-content-center">
                {!ShowPatientForm && <button onClick={()=>props.setPopover(!props.openPopover)} type="button" className="btn brand-secondary px-5">Cancel</button> }
                {ShowPatientForm && <button onClick={()=>setShowPatientForm(!ShowPatientForm)} type="button" className="btn brand-secondary px-5">Back</button>}
                <button type="button" onClick={()=>props.setPopover(!props.openPopover)} className="btn btn-brand px-5 ml-3">Save & Continue</button>
        </ModalFooter>
    </Modal>)

}

export default DoctorSelectPatientModal