import React, {useState,useEffect} from "react";
//import { useDispatch } from 'react-redux';
import Validate from "../../../helpers/Validate";
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import DoctorConsultationService from "../../services/DoctorConsultationService";
//import ProfileService from '../../../services/ProfileService';


const DoctorEmailConfirmation=(props)=>{
    const [email, SetEmail] = useState("");
    const [errorMsg, setErrorMsg] = useState({});
    const [confirmationStatus, setConfirmationStatus] = useState(false);
    const [enableBackDropLoader, setEnableBackDropLoader] = useState(false);

    const validate=Validate();
    const doctorConsultationService = DoctorConsultationService();
    //const dispatch = useDispatch();

    const handleInputChange = event => {
        let feildName = event.target.id;
        let errMsg = validateInputs(event);
        if (errMsg)  {
            setErrorMsg(errorMsg => ({...errorMsg, [feildName]:errMsg}));
        } else {
            setErrorMsg({...errorMsg,[feildName]: ''});
        }
    }

    useEffect(() => {
        if(confirmationStatus) {
            setTimeout(() =>{             
            props.updateprop(false) }, 3000);
            }
      },[confirmationStatus]);

    const validateInputs = (e) =>{
        if (e.target.id == 'email') {
            return validate.email(e.target.value)
        }
    }

    const handleChange=(e) => {        
        let fieldValue = e.target.value
        SetEmail(fieldValue)
      }

    const handleValidation = (e) =>{
        let formfield = e.target.id
        setErrorMsg(prevState=> ({
            ...prevState,
            [formfield]: ''
        }))
    }

    const updateEmail = async() => {
        setEnableBackDropLoader(true);
        const isUpdated= await doctorConsultationService.updateEmail({emailAddress: email}).then(response=>{
            if(response && "SUCCESS" === response.statusCode){
               return true;               
            }
            props.setAlertData({ message: "Unable to send email invoice", type: "danger" });
            props.updateprop(false);
            return false;
        }).catch(e =>{
            console.log(e);
            props.updateprop(false);
            return false;
        });
       if(isUpdated) {
           sendEmailInvoice();
       } 
        
    }
    

    const sendEmailInvoice =()=>{
        doctorConsultationService.emailInvoice({ orderId: props.orderId }).then(response => {
            if("SUCCESS" ===response.statusCode){
                setEnableBackDropLoader(false);
                setConfirmationStatus(true);
            }else{
                props.setAlertData({ message: response.message, type: "danger" });
                props.updateprop(false);
            }
          }).catch(e => {
            console.log(e);
            props.setAlertData({ message: "Something went wrong", type: "danger" });
            props.updateprop(false);
          })
    }
   
    
    return  (
        <React.Fragment>
            <Modal isOpen={props.openpop} backdrop="static" className="my-account-modal modal-dialog-centered refill-interval-popup" style={{ paddingRight: "15px" }}>
                <div class="modal-header">
                    <h5 class="modal-title"> Email Invoice</h5>
                    <button type="button" class="close" onClick={()=>props.updateprop(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <rect fill="none" width="24" height="24"></rect>
                            <path fill="#b9b9b9" d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm4.853,15.439a.5.5,0,0,1,0,.707l-.707.707a.5.5,0,0,1-.707,0L12,13.414,8.561,16.853a.5.5,0,0,1-.707,0l-.707-.707a.5.5,0,0,1,0-.707L10.586,12,7.147,8.561a.5.5,0,0,1,0-.707l.707-.707a.5.5,0,0,1,.707,0L12,10.586l3.439-3.439a.5.5,0,0,1,.707,0l.707.707a.5.5,0,0,1,0,.707L13.414,12Z"></path>
                        </svg>
                    </button>
                </div>
                <ModalBody className="modal-body p-0">
                    {!confirmationStatus && <div class="modal-body modal-body p-4">
                        {/* <p className="pb-3">Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit</p> */}
                        <div class="form-group has-float-label form-group-error">
                            <input type="text" class={`form-control ${validate.isNotEmpty(errorMsg['email']) ? "is-invalid" : ''}`} onChange={(e) => {handleChange(e)}} onBlur={handleInputChange} onFocus={handleValidation} id="loginId" name="Email/Phone" autocomplete="new-off" placeholder=" " maxlength="45"/>
                            <label for="loginId">Enter Email Id </label>
                            <div class="invalid-feedback d-block text-left">{errorMsg['email']}</div>
                        </div>
                        <button type="button" onClick={()=>props.updateprop(false)} class="btn brand-secondary rounded-pill px-4">Cancel</button><button class="btn btn-brand-gradient rounded-pill px-4 ml-3" disabled={validate.email(email) ? true :false} onClick={()=> updateEmail()} type="button">Submit</button>
                    </div>}

                    {confirmationStatus && <div>
                        <p className="pt-3">We have successfully sent you the Invoice on your given email id</p>
                        <p className="pt-3 font-weight-bold">Thank You.!</p>
                    </div>}
                </ModalBody>
            </Modal> 
        </React.Fragment>
    )
}
export default DoctorEmailConfirmation