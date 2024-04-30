import React, { useState } from "react";

/**
 * Functional component for NumberInputMessage
  @param {} props
 */
const InputFieldMessage = (props) => {
    const [disableSubmitButton, setDisableSubmitButton] = useState(true);
    const categoryType = props.message.blocks.viewData.categoryType;
    const categoryName = props.message.blocks.viewData.categoryName;
    const inputType = props.message.blocks.viewData.inputType;
    const decimalPattern = new RegExp(/^[0-9]{1,11}(\.([0-9]{1,6})?)?$/);
    const numberPattern = new RegExp(/^[0-9]{1,6}$/);
    const [inputFieldValue, setInputFieldValue] = useState("");

    /**
     * return boolean value if input is valid
      @param {} input 
     */
    const isValidFloatInput = (inputValue) => {
        const validationDetails = { isValid: false, errorMessage: null };
        if (inputValue && inputValue[0] === ".") {
            inputValue = "0."
            validationDetails.inputValue = "0.";
        }
        if (!inputValue || inputValue.trim() === "") {
            validationDetails.inputValue = "";
            validationDetails.errorMessage = `${categoryName} cannot be empty`;
            return validationDetails;
        }
        if (!decimalPattern.test(inputValue)) {
            validationDetails.isValid = decimalPattern.test(inputFieldValue);
            validationDetails.inputValue = inputFieldValue;
            return validationDetails;
        }
        if (Number.parseFloat(inputValue) <= 0) {
            validationDetails.errorMessage = `${categoryName} must be greater than 0.00`;
            return validationDetails;
        }
        validationDetails.inputValue = inputValue;
        validationDetails.isValid = true;
        return validationDetails;
    }

    /**
     * return boolean value if input is valid
      @param {} input 
     */
    const isValidNumberInput = (inputValue) => {
        const validationDetails = { isValid: false, errorMessage: null };
        if (!inputValue || inputValue.trim() === "") {
            validationDetails.inputValue = "";
            validationDetails.errorMessage = `${categoryName} cannot be empty`;
            return validationDetails;
        }
        if (!numberPattern.test(inputValue)) {
            validationDetails.isValid = numberPattern.test(inputFieldValue);
            validationDetails.inputValue = inputFieldValue;
            return validationDetails;
        }
        validationDetails.inputValue = inputValue;
        validationDetails.isValid = true;
        return validationDetails;
    };

    const onChangeInput = (e) => {
        let inputValue = e.target.value;
        let validationDetails = null;
        let roundedValue = null;
        if (inputType === "integer") {
            validationDetails = isValidNumberInput(inputValue);
            roundedValue = Number.parseInt(validationDetails.inputValue).toString();
        } else if (inputType === "float") {
            validationDetails = isValidFloatInput(inputValue);
            roundedValue = Number.parseFloat(validationDetails.inputValue).toString();
        }
        const isInputValid = validationDetails.isValid;
        const inputData = { data: { type: categoryType, value: roundedValue }, textToShow: roundedValue, isValid: isInputValid, errorMessage: validationDetails.errorMessage };
        if (isInputValid) {
            setDisableSubmitButton(false);
        } else {
            setDisableSubmitButton(true);
        }
        setInputFieldValue(validationDetails.inputValue);
        props.updateInputData(inputData);
    }

    const submitInputFeild = (event) => {
        if("Enter" === event.key && !disableSubmitButton){
            props.sendMessage();
        }
    }

    return (
        <React.Fragment>
            <section className="p-0 mt-1 d-flex">
                <input className="col-3 form-control ml-0" type="tel" value={inputFieldValue} placeholder={inputType === "float" ? "0.00" : ""} name="number-input" onChange={onChangeInput} autoComplete="off" maxLength={18} autoFocus onKeyPress={(event) => submitInputFeild(event)} />
                <button className="ml-2" disabled={disableSubmitButton} onClick={() => { props.sendMessage() }}>Submit</button>
            </section>
            <span className="time-stamp">{props.time}</span>
        </React.Fragment>
    );
};

export default InputFieldMessage;