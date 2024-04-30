import React,{useState} from "react"
import Validate from "../../helpers/Validate";

const EditPatientForm=(props)=>{ 
    const [gender, setGender] = useState(null);
    const validate = Validate()
    const [errorMsg, setErrorMsg] = useState({})
    const [newPatientDetails , setNewPatientDetails] = useState({})
    const handleInputChange = event => {
        let feildName = event.target.id;
        let errMsg = validateInputs(event);
        if (errMsg)  {
            setErrorMsg(errorMsg => ({...errorMsg, [feildName]:errMsg}));
        } else {
            setErrorMsg({...errorMsg,[feildName]: ''});
        }
        if(errMsg == false && feildName=="age"){
            setErrorMsg(errorMsg => ({...errorMsg, [feildName]:"Numeric only allowed"}));
        } 
    }

    const validateInputs = (e) =>{
        if (e.target.id == 'doctorname') {
            if(!validate.validateStringWithLength(e.target.value,30)) {
                return "Doctorname Must be Maximum of 30 Characters"
            }
        }
        else if (e.target.id.indexOf('fullName') > -1) {
            return validate.name(e.target.value,"fullName");
        } 
        else if (e.target.id.indexOf('age') > -1) {
            return  validate.isNumeric(e.target.value)
        } 
    }

    const handleChange=(e) => {        
        let fieldName = e.target.id;
        let fieldValue = e.target.value
        setNewPatientDetails({...newPatientDetails,[fieldName]:fieldValue})
      }

    const handleValidation = (e) =>{
        let formfield = e.target.id
        setErrorMsg(prevState=> ({
            ...prevState,
            [formfield]: ''
        }))
    }
    return (
        <React.Fragment>
             <div className="form-group has-float-label mb-3">
                        <input type="text" className={`form-control ${validate.isNotEmpty(errorMsg['fullName']) ? "is-invalid" : ''}`} id="fullName" name="fullName" maxLength="30" autoComplete="off" placeholder=" " required="" onChange={(e) => { handleChange(e) }} onBlur={handleInputChange} onFocus={handleValidation}/>
                        <label className="select-label" htmlFor="fullName">Full Name</label>
                        <div className="invalid-feedback d-block">{errorMsg['fullName']}</div>
                    </div>
                    <div className="toggle-select mb-3">
                        <div className="d-flex">
                            <button className={gender == "M" ? "btn btn-badge active" : "btn btn-badge"} onClick={() => setGender("M")}>Male</button>
                            <button className={gender == "F" ? "btn btn-badge active" : "btn btn-badge"} onClick={() => setGender("F")}>Female</button>
                            <button className={gender == "O" ? "btn btn-badge active" : "btn btn-badge"} onClick={() => setGender("O")}>Others</button>
                        </div>
                    </div>
                    <div className="form-group has-float-label mb-3">
                        <input type="text" className={`form-control ${validate.isNotEmpty(errorMsg['age']) ? "is-invalid" : ''}`} id="age" name="age" maxLength="30" autoComplete="off" placeholder=" " required="" onChange={(e) => { handleChange(e) }} onBlur={handleInputChange} onFocus={handleValidation}/>
                        <label className="select-label" htmlFor="age">Age</label>
                        <div className="invalid-feedback d-block">{errorMsg['age']}</div>
                    </div>
                    <div className="form-group has-float-label mb-3">
                        <input type="text" className={`form-control ${validate.isNotEmpty(errorMsg['docName']) ? "is-invalid" : ''}`} id="docName" name="docName" maxLength="30" autoComplete="off" placeholder=" " required="" onChange={(e) => { handleChange(e) }} onBlur={handleInputChange} onFocus={handleValidation}/>
                        <label className="select-label" htmlFor="docName">Doctor Name</label>
                        <div className="invalid-feedback d-block">{errorMsg['docName']}</div>
                    </div>

        </React.Fragment>
    )
}
export default EditPatientForm