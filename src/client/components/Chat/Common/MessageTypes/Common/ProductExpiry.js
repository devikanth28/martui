import React, { useState } from "react";
import MaskedInput from 'react-maskedinput';


/**
 * Functional component for ProductExpiry
  @param {} props
 */
const ProductExpiry = (props) => {
    const [date, setDate] = useState(null);
    const [disableSubmitButton, setDisableSubmitButton] = useState(true);
    let isInputPristine = true;
    /**
     * return boolean value if date input is valid
      @param {} date 
     */
    const isValidDateInput = (date) => {
        const validationDetails = { isValid: false, errorMessage: null };
        if (date && !date.includes('_')) {
            isInputPristine = false;
        }
        if (!date || (date.includes('_') && !isInputPristine)) {
            validationDetails.errorMessage = "Please enter a valid date";
            return validationDetails;
        }
        const monthYear = date.split('/');
        if (monthYear[0].includes('_')) {
            return validationDetails;
        }
        const month = parseInt(monthYear[0]);
        if ((month < 1 || month > 12)) {
            validationDetails.errorMessage = "Please enter a month between 01 and 12";
            return validationDetails;
        }
        if (monthYear[1].includes('_')) {
            return validationDetails;
        }
        const year = parseInt(monthYear[1]);
        if (year < 2010) {
            validationDetails.errorMessage = "Please enter a year greater than 2010";
            return validationDetails;
        }
        validationDetails.isValid = true;
        return validationDetails;
    }

    const onChangeDatePicker = (e) => {
        const expiryDate = e.target.value;
        const previousExpiryDate = date;
        const previousExpiryValidationDetails = isValidDateInput(previousExpiryDate);
        const isPreviousExpiryValid = previousExpiryValidationDetails.isValid;
        const currentExpiryValidationDetails = isValidDateInput(expiryDate);
        const isCurrentExpiryValid = currentExpiryValidationDetails.isValid;
        if ((isPreviousExpiryValid !== isCurrentExpiryValid) || (currentExpiryValidationDetails.errorMessage != previousExpiryValidationDetails.errorMessage)) {
            const expiryDateData = { data: { type: "expiryDate", value: expiryDate }, textToShow: expiryDate, isValid: isCurrentExpiryValid, errorMessage: currentExpiryValidationDetails.errorMessage };
            if (isCurrentExpiryValid) {
                setDisableSubmitButton(false);
            } else {
                setDisableSubmitButton(true);
            }
            props.updateInputData(expiryDateData);
            setDate(expiryDate);
        }
    }

    const onBlurDatePicker = (e) => {
        isInputPristine = false;
        const expiryDate = e.target.value;
        const currentExpiryValidationDetails = isValidDateInput(expiryDate);
        const isCurrentExpiryValid = currentExpiryValidationDetails.isValid;
        if (isCurrentExpiryValid) {
            setDisableSubmitButton(false);
        } else {
            setDisableSubmitButton(true);
        }
        const expiryDateData = { data: { type: "expiryDate", value: expiryDate }, textToShow: expiryDate, isValid: isCurrentExpiryValid, errorMessage: currentExpiryValidationDetails.errorMessage };
        props.updateInputData(expiryDateData);
    }

    const submitExpiry = (event) => {
        if("Enter" === event.key && !disableSubmitButton){
            props.sendMessage();
        }
    }

    return (
        <React.Fragment>
            <section className="p-0 mt-1 d-flex">
                <MaskedInput className="form-control dateInput col-4 ml-0" type="tel" mask="11/1111" name="maskedInput" placeholder="MM/YYYY" onChange={onChangeDatePicker} onBlurCapture={onBlurDatePicker} autoFocus onKeyUp ={(event) => submitExpiry(event)} />
                <button className="ml-2" disabled={disableSubmitButton} onClick={() => { props.sendMessage() }}>Submit</button>
            </section>
            <span className="time-stamp">{props.time}</span>
        </React.Fragment>
    );
};

export default ProductExpiry;