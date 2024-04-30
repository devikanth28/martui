import React, { useState } from "react"
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import EditPatientModel from "./EditPatientModel"
const LabShoppingCart=(props)=>{
    const [openPatientModal, setOpenPatientModal] = useState(true)
    const [openEditModal, setOpenEditModal] = useState(false)
    function toggleOpenPatientModal(){
        setOpenPatientModal(!openPatientModal)
    }
    const showEditModel=()=>{
        toggleOpenPatientModal()
        toggleOpenEditModal()
    }
    function toggleOpenEditModal(){
        setOpenEditModal(!openEditModal)
    }
    return(
        <React.Fragment>
            <Modal backdrop="static" keyboard={false} isOpen={openPatientModal} className="modal-dialog my-account-modal modal-dialog-centered hide-close" tabIndex="-1" autoFocus={false}>
                <ModalHeader className="labs-patient-header">
                    Select Patient
                    <button className="btn btn-outline-brand btn-sm float-right" onClick={()=>showEditModel()}>Add New Patient</button>
                </ModalHeader>
                <ModalBody className="p-3">
                    <div className="border rounded mb-3 p-2">
                        <div className="custom-control custom-radio font-weight-normal d-flex justify-content-between">
                            <input type="radio" className="custom-control-input" name="patients"  id="patient-1"/>
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
                            <input type="radio" className="custom-control-input" name="patients"  id="patient-2"/>
                            <label for="patient-2" className="custom-control-label pointer w-100">
                                <div>
                                    <h6 className="mb-0">Sampath Kumar Ch <span className="badge badge-primary ml-1">MID 234568</span></h6>
                                    <small className="text-secondary">38Yrs / Male</small>
                                </div>
                            </label>
                        </div>
                    </div>
                    <div className="border rounded mb-3 p-2">
                        <div className="custom-control custom-radio font-weight-normal d-flex justify-content-between align-items-center">
                            <input type="radio" className="custom-control-input" name="patients"  id="patient-3"/>
                            <label for="patient-3" className="custom-control-label pointer w-100">
                                <div>
                                    <h6 className="mb-0">Sampath Kumar Ch <span className="badge badge-primary ml-1">MID 234568</span></h6>
                                    <small className="text-secondary">38Yrs / Male</small>
                                </div>
                            </label>
                            <a class="btn btn-link text-primary no-underline mr-n2" href="javascript:void(0)" title="Edit" onClick={()=> showEditModel()}>Edit</a>
                        </div>
                    </div>
                    <div className="text-center mt-3">
                        <button type="button" className="brand-secondary btn px-5 rounded-pill" onClick={() => setOpenPatientModal(!openPatientModal)}>Cancel</button>
                        <button type="button" className="btn btn-brand-gradient ml-3 px-5 rounded-pill" onClick={() => setOpenPatientModal(!openPatientModal)}>Save & Continue</button>
                    </div>
                </ModalBody>
            </Modal>
            <EditPatientModel openEditModal={openEditModal} toggleOpenEditModal={toggleOpenEditModal} showEditModel={showEditModel}/>
        </React.Fragment>
    )
}
export default LabShoppingCart