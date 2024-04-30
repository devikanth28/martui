import React, { useState ,useRef }from 'react';
import { Button,Modal, ModalBody, ModalFooter } from 'reactstrap';
import Venkateshpic from '../../images/common/venkatesh.png'
import MedplusHeader from '../../images/common/MedplusDiagnosticsHeader.svg'
import Validate from '../../helpers/Validate';
import Diagnosticsicon from '../../images/common/daignostics-icn.svg'
import mriicon from '../../images/common/mri-icn.svg'
import ctscanicn from '../../images/common/ct-scan-icn.svg'
import ecgicn from '../../images/common/ecg-icn.svg'

const Advetisement = () => {
    const [page, setPage] = useState("InformationPage");
    const [error,setError]=useState(undefined);
    const [disabled,setDisabled] = useState(true)
    const [informationDetails,SetInformationDetails]= useState({});

    const validate= Validate();
    const OTP_PATTERN = /^[0-9]{1}$/;
    const NO_OF_ELEMENTS = 6 ;
    const [otp,setOtp]=useState({});
    const ELEMENT_REFS = [];
    const elements = useRef({});
    const DEFAULT_FOCUS_ELEMENT = 1;
    for (let i = 0; i < NO_OF_ELEMENTS; i++) {
        ELEMENT_REFS.push(i + 1);
    }
    const onKeyUp =(e)=> {
        const keyCode = e.keyCode || e.which;
        const name = parseInt(e.target.name);
        if (validate.isNotEmpty(e.target.value) &&  name === NO_OF_ELEMENTS && keyCode === 9 ) {
            nameRef.current.focus();
        }else{
            e.preventDefault();
            return; 
        }
    }
    const onInputChange=(e)=>{
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
        setOtp({...tempOtp});
        setFocus(e);
    }
    const onKeyDown=(e)=> {
        const keyCode = e.keyCode || e.which;
        if (EXCLUDED_KEY_CODES.indexOf(keyCode) === -1 && (keyCode === 38 || keyCode === 40 || keyCode < 48 || (keyCode > 57 && keyCode < 96) || keyCode > 105)) {
            e.preventDefault();
            return;
        }
        if(e.target.name ===`${NO_OF_ELEMENTS}` && keyCode === 13){
            verifyOTP(e);
        }
        setFocus(e);
    }

    const handleChange=(e)=>{
        let errorMsg =''
        if(e.target.id =='mobileNumber') {
             errorMsg= validate.mobileNumber(e.target.value);
        }
        if(e.target.id == 'Fullname') {
            errorMsg = validate.name(e.target.value ,e.target.id)
        }
        if(validate.isNotEmpty(errorMsg)) {
            setError({...error,[e.target.id]:errorMsg});
            setDisabled(true)
        } else {
            setError({...error,[e.target.id]:""});
            setDisabled(false)
        }
        SetInformationDetails({...informationDetails,[e.target.id]:e.target.value});
    }

    const setFocus=(e)=> {
        const name = parseInt(e.target.name);
        if (e.target.value.length >= 1 && name < NO_OF_ELEMENTS) {
            elements.current[name + 1].focus();
        } else if (e.keyCode === 8 && name > 1 && e.target.value.length === 0) {
            elements.current[name - 1].focus();
        }
    } 
    const checkForFocus = (e) => {
        const name = parseInt(e.target.name);
        for(let i=1 ; i < name; i++){
            if(elements.current[i].value === '' || elements.current[i].value === undefined){
                elements.current[i].focus();
                break;
            }
        }
    }      
    return (
        <React.Fragment>
            <div>
                <Modal isOpen={true} toggle={false} centered={true} className='adverstiment modal-lg'>
                    <ModalBody className='px-3'>
                        <div className='mb-5 pb-3 pl-2'>
                            <img src={MedplusHeader} alt="MedPlus Diagnostics" title='MedPlus Diagnostics'/>
                        </div>
                        <img src={Venkateshpic} alt="Venkatesh Pic" className='image' title="Venkatesh"/>
                        <div className='align-items-center d-flex w-100 information pl-2'>
                            {page =='InformationPage' && <div>
                                <ul className='medplusAdvantage'>
                                    <li className='mb-2 pl-2'><span className='font-weight-bold'>FLAT 75% OFF</span> on ALL Diagnostic Tests</li>
                                    <li className='mb-2 pl-2'><span className='font-weight-bold'>Free</span> Diagnostic Tests Worth your Membership Fee </li>
                                    <li className='mb-2 pl-2'><span className='font-weight-bold'>50% OFF</span> on Doctor Consultations</li>
                                </ul>
                                <p className='ml-2 pl-5'>with <h4 className='d-inline-block text-brand'>MedPlus Advantage</h4> Membership</p>
                                <div className='d-flex justify-content-between ml-2 pl-5'>
                                    <img src ={Diagnosticsicon} alt="Diagnostics" title="Diagnostics" />
                                    <img src ={mriicon} alt="mriicon" title="MRI"/>
                                    <img src ={ctscanicn} alt="ctscanicn" title="CtScan"/>
                                    <img src ={ecgicn} alt="ecgicn" title="ECG"/>
                                </div>
                            </div>}
                            {page =='OtpPage' && <div className='w-50'>
                                <p class="mb-0">Please enter OTP sent to</p>
                                <h3>+91 9701816683</h3>
                                <div class="text-right mt-4 mb-3">
                                    <div className="justify-content-between mb-3 otp-fields-container d-flex">
                                        {ELEMENT_REFS.map((each, index) => {
                                            return <input key={index} type="text" style={{ 'width': '45px', 'height': '45px' }} name={each} ref={(input) => { elements.current[each] = input; }} autoFocus={DEFAULT_FOCUS_ELEMENT == each ? 'true' : 'false'} onFocus={checkForFocus} value={otp[each] || ''} onKeyDown={onKeyDown} onKeyUp={onKeyUp} onChange={onInputChange} class="form-control form-control-lg text-center" placeholder="0" />
                                        })}
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <a href ="javascript:void(0)" onClick={()=>setPage('DetailsPage')} className="font-14 text-info">Change Number </a>
                                    </div>
                                    <div>
                                        <a href="javascript:void(0)" className='font-14 text-info'>Resend OTP</a>
                                    </div>
                                </div>
                            </div>}
                            {page =='ThankYou' &&  <div className='w-100'>
                                <h2 className='display-1 mt-5 pt-5 text-success'>Thank You!</h2>
                                </div>}
                            
                            {page == 'DetailsPage' && <div className='w-100'>
                                <p>We are happy to Connect, <br /> Please Provide your Details</p>
                                <div className="form-group has-float-label  my-4 w-50">
                                    <input type="tel" pattern="[1-9]{1}[0-9]{9}" className={"form-control"} type="tel" id="mobileNumber" name="mobileNumber" maxlength="10"  placeholder=" " onChange={handleChange} onFocus={()=> setError({...error,['mobileNumber']:""})}/>
                                        <label htmlFor="mobileNumber" className="select-label">Mobile Number</label>
                                    {validate.isNotEmpty(error) && validate.isNotEmpty(error['mobileNumber']) && <small className="help-block text-left errmsg margin-none text-danger"> {error['mobileNumber'] }</small>}
                                </div>
                                <div className="form-group has-float-label  my-4 w-50">
                                    <input type="text" className={"form-control"} id="Fullname" name="Fullname"  placeholder=" " onChange={handleChange} onFocus={()=> setError({...error,['Fullname']:""})}/>
                                        <label htmlFor="Fullname" className="select-label">Full name</label>
                                    {validate.isNotEmpty(error) && validate.isNotEmpty(error['Fullname']) && <small className="help-block text-left errmsg margin-none text-danger"> {error['Fullname']}</small>}
                                </div>
                            </div>}


                        </div>
                        
                        
                    </ModalBody>
                    {page !='ThankYou' && <ModalFooter className='justify-content-center footerbuttons'>
                       {page == 'InformationPage' && <React.Fragment><button onClick={()=>setPage('DetailsPage')} className="btn btn-brand px-5 py-2 rounded-pill footerbackground">Call Me</button>
                        <button onClick={()=>setPage('DetailsPage')} class="brand-secondary btn rounded-pill px-5 py-2">Know More</button></React.Fragment>  }
                       {page == 'DetailsPage' && <React.Fragment><button onClick={()=>setPage('InformationPage')} className="brand-secondary btn rounded-pill px-5 py-2" >Back</button>
                        <button disabled={disabled} onClick={()=>setPage('OtpPage')} className="btn btn-brand px-5 py-2 rounded-pill footerbackground" >Submit</button></React.Fragment>  }
                        {page == 'OtpPage' && <React.Fragment><button onClick={()=>setPage('DetailsPage')} className="brand-secondary btn rounded-pill px-5 py-2" >Back</button>
                        <button onClick={()=>setPage('ThankYou')} className="btn btn-brand px-5 py-2 rounded-pill footerbackground">Verify OTP</button></React.Fragment>  }
                      
                    </ModalFooter>}
                </Modal>
            </div>

        </React.Fragment>
    )
}
export default Advetisement