import { useState } from "react"
import Validate from "../../../helpers/Validate";

export const useInputField = (type,inputValueMaxLength) => {

    const [inputValue,setInputValue] = useState('');
    const [inputError,setInputError] = useState('');
    const validate = Validate();

    const handleOnChange = (e) => {
       switch(type) {
           case "MOBILE_NUMBER" :
               handleMobileNumberChanges(e);
               break;
            case "EMAIL" :
                // function to handle email changes
                handleEmailChanges(e);
                break;
            case "NAME" :
                handleNameChanges(e);
                break;
            case "NUMBER" :
                handleNumberChange(e);
                break;
            case "TEXT" :
                handleTextChanges(e);
                break;
            case "ALPHANUMERICSPACE":
                handleTextChanges(e);
                break;
            case "ALPHANUMERICWITHOUTSPACE":
                handleAlphaWithoutSpace(e);
            default:
                break;
       }

    }

    const handleEmailChanges = (e) => {
        if(validate.isEmpty(e.target.value)){
            setInputValue('');
            return;    
        }
        checkForErrors(e);
        setInputValue(e.target.value.trim());
    }

    const handleNumberChange = (e) => {
        if(validate.isEmpty(e.target.value)){
            setInputValue('');
            return;    
        }
        if(validate.isNotEmpty(e.target.value) && (!validate.isNumeric(e.target.value) || e.target.value.length > inputValueMaxLength)){
            return;
        }
        let error = checkForErrors(e);
        setInputValue(e.target.value.trim());
    }

    const handleMobileNumberChanges = (e) => {
        if(validate.isEmpty(e.target.value)){
            setInputValue('');
            return;    
        }
        if (validate.isNotEmpty(e.target.value) && (!validate.isNumeric(e.target.value) || e.target.value.length > 10))
            return;
        checkForErrors(e);
        setInputValue(e.target.value.trim());
    }

    const handleNameChanges =(e) => {
        if(e.target.value.length > inputValueMaxLength || (e.target.value.length > 0 && !validate.isAlphaWithSpace(e.target.value)))
            return;
        checkForErrors(e);
        setInputValue(e.target.value);
    }

    const handleTextChanges = (e) => {
        if(validate.isEmpty(e.target.value)){
            setInputValue('');
            return;    
        }
        let error = checkForErrors(e);
        setInputValue(e.target.value);
    }

    const handleAlphaWithoutSpace=(e)=>{
        if(validate.isEmpty(e.target.value)){
            setInputValue('');
            return;    
        }
        if (validate.isNotEmpty(e.target.value) && (!validate.isAlphaNumericWithoutSpace(e.target.value) || e.target.value.length > inputValueMaxLength))
            return;
        setInputValue(e.target.value);
    }

    const checkForErrors = (e) => {
        if(!e.target.value || e.target.value.length == 0) {
            setInputError('');
            return;
        }

        let error = '';
        switch(type) {
            case "MOBILE_NUMBER":
                error = validate.mobileNumber(e.target.value.trim(),inputValueMaxLength ? inputValueMaxLength : 10);
                break;
            case "NAME" :
                error = validate.name(e.target.value.trim(), e.target.name, inputValueMaxLength);
                break;
            case "EMAIL" :
                error = validate.email(e.target.value.trim(), inputValueMaxLength);
                break;
            case "NUMBER" : 
                error = validate.validateNumberWithLength(e.target.value.trim(), e.target.name, inputValueMaxLength);
                break;
            case "TEXT" :
                error = validate.productName(e.target.value.trim(), inputValueMaxLength,e.target.name);
                break;
            case "ALPHANUMERICSPACE":
                error = validate.productName(e.target.value.trim(), inputValueMaxLength,e.target.name);
                if (validate.isEmpty(error) && !validate.isAlphaNumericWithSpace(e.target.value.trim())) {
                    error = "No Special Characters Allowed";
                }
                break;
            default:
                break;
        }

        if(error){
            setInputError(error);
        } else {
            setInputError('');
        }
    }


    const handleFocusInput = (e) => {
        setInputError('');
    }

    const handleOnBlur = (e) =>  {
        checkForErrors(e);
    }

    return [inputValue, inputError, setInputValue, setInputError, handleOnChange, handleFocusInput, handleOnBlur]

}