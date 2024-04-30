import React, { useState,useRef} from "react"
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Validate from "../../helpers/Validate";
import ReachOutToUsModal from "./ReachOutToUsModal";
import SubsLoginIcon from "../../images/common/Subscriptions-amico.svg"

const OTP_PATTERN = /^[0-9]{1}$/;

const EXCLUDED_KEY_CODES = [8, 39, 116, 13, 37];
const NO_OF_ELEMENTS = 5;
const DEFAULT_FOCUS_ELEMENT = 1;
const ELEMENT_REFS = [];
for (let i = 0; i < NO_OF_ELEMENTS; i++) {
    ELEMENT_REFS[i] = i + 1;
}


const SubscriptionLoginFormOtp = (props) => {
    const details = props.details
    const elements = useRef({});
    const [disable,setDisabled]=useState(true);
    const [otp,setOtp]=useState({});
    const [errors,setError] = useState('')
    const [name,setName] = useState('')
    const validate=Validate();
    

    const checkForFocus = (e) => {
        const name = parseInt(e.target.name);
        for(let i=1 ; i < name; i++){
            if(elements.current[i].value === '' || elements.current[i].value === undefined){
                elements.current[i].focus();
                break;
            }
        }
    }

    const onInputChange=(e)=>{
        const targetfield = e.target.id
        if (targetfield == 'Name') {
            if(validate.isNotEmpty(e.target.value)) {
                if(validate.name(e.target.value)) {
                    setError(validate.name(e.target.value)) 
                } else {
                    setName(e.target.value)
                }
            }
        } else {
            let  tempOtp = {...otp};
            if (e.target.value && (e.target.value.length > 1 || !OTP_PATTERN.test(e.target.value) || parseInt(e.target.value) < 0 || parseInt(e.target.value) > 9)) {
                e.preventDefault();
                return;
            }
            if (validate.isNotEmpty(e.target.value)) {
                tempOtp[e.target.name] = e.target.value;
            } else {
                delete tempOtp[e.target.name];
            }
            setOtp({...tempOtp})
            if(Object.keys(tempOtp).length == 5 || name == '') {
                setDisabled(false)
            } else {
                setDisabled(true)
            }
            setFocus(e);
        }
    }


    const handleValidation = (e) =>{
        setError('') 

    }

    const onKeyDown=(e)=> {
        const keyCode = e.keyCode || e.which;
        if (EXCLUDED_KEY_CODES.indexOf(keyCode) === -1 && (keyCode === 38 || keyCode === 40 || keyCode < 48 || (keyCode > 57 && keyCode < 96) || keyCode > 105)) {
            e.preventDefault();
            return;
        }
        setFocus(e);
    }
    const setFocus=(e)=> {
        const name = parseInt(e.target.name);
        if (e.target.value.length >= 1 && name < NO_OF_ELEMENTS) {
            elements.current[name + 1].focus();
        } else if (e.keyCode === 8 && name > 1 && e.target.value.length === 0) {
            elements.current[name - 1].focus();
        }
    } 

    return (
        <React.Fragment>

             <div className="subs-login-container">
                <section className="subs-login">
                    <div className="content">
                    <p class="mb-0">Please enter OTP sent to</p>
                        <h3>{details[details.type]}</h3>
                        <div class="text-right mt-4 mb-3">
                           <div className="justify-content-between mb-3 otp-fields-container d-flex">
                              {ELEMENT_REFS.map((each)=>{
                   			    return <input type="text" style={{'width': '45px','height': '45px' }} name = {each} ref={(input) => {elements.current[each] = input; }} onFocus={checkForFocus} value={otp[each] || ''} onKeyDown={onKeyDown} onChange={onInputChange} autofocus={DEFAULT_FOCUS_ELEMENT == each? 'true': 'false'} class="form-control form-control-lg text-center" placeholder="0"/>
                               })}
                          </div>
                          {details.type == 'number' && <div className="form-group has-float-label mt-4  mb-3">
                                <input type="text" id="Name" name="name" className={`form-control  ${validate.isNotEmpty('') ? "is-invalid" : ''}`}  onChange= {onInputChange} onFocus={handleValidation} maxlength="30" autocomplete="off" placeholder=" "/>
                                <label htmlFor="Name" className="select-label">Enter Your Name</label>
                                <div class="invalid-feedback">{errors}</div>
                            </div>}
                          <button type = "button" class="btn btn-link font-weight-normal text-primary font-14 mr-n3">Resend OTP</button>
                        </div>
                        <div className="row mb-5 flex-row-reverse">
                                <div className="col pl-1"><button type="submit" disabled= {disable} className="btn btn-brand btn-block" onClick={() => props.history.push("/LabSubscriptionRegister")}>Verify OTP</button></div>
                                <div className="col pr-1"><button type="button" className="btn btn-light btn-block">Cancel</button></div>
                        </div> 
                        <div className="small pt-2">
                            <p className="mb-2">Note:</p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor #incididunt ero labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco poriti laboris nisi ut aliquip ex ea commodo consequat.
                        </div> 
                    </div>
                    <div className="mt-4 pt-4">
                        <img src={SubsLoginIcon} title="Add a Member" alt="Add a Member" />
                    </div>
                </section>
            </div>
        </React.Fragment>

           
    )
}

export default SubscriptionLoginFormOtp