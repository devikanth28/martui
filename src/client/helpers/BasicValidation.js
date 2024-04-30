const BasicValidation = () => {

    const nonEmptyCheck = (value) => {
        value = value ? value.trim() : "";
        if(value == "") {
            return false;
        }
        return true;
    }

    const alphabetOnlyCheck = (value, maxLength) => {
        value = value ? value.trim() : "";
        if(value != "") {
            if(maxLength !== undefined && value.length > maxLength){
                return {error: true, errorMsg: `${maxLength} characters exceeded`};
            }
            var rege =/^[a-zA-Z]+([a-zA-Z\s]{0,30})$/;
            if(!rege.test(value)){
                return {error: true, errorMsg: `Alphabets only`};
            }
        }
        return {error: false, success: true};
    }

    const noSpaceCheck = (value) => {
        var filter= /^\S+$/ ;
        value = value ? value.trim() : "";
        if(!filter.test(value)){
            return false;
        }
        return true;
    }

    const strictNoSpaceCheck = (value) => {
        var filter= /^\S+$/ ;
        value = value ? value : "";
        if(!filter.test(value)){
            return false;
        }
        return true;
    }

    const pincodeCheck = (value) => {
        var filter= /^[1-9]{1}[0-9]{5}$/;
        value = value ? value.trim() : "";
        if(!filter.test(value)){
            return false;
        }
        return true;
    }

    const validEmailCheck = (value) => {
        var filter = /^[a-zA-Z0-9]+([_.-]?[a-zA-Z0-9])*@[a-zA-Z0-9]+([.-]?[a-zA-Z0-9])*\.[a-zA-Z]{2,4}$/;
        value = value ? value.trim() : "";
        if(!filter.test(value)){
            return false;
        }
        return true;
    }

    const validateMobileCheck = (value) => {
        var filter = /^[1-9][0-9]{9}$/;
        value = value ? value.trim() : "";
        if(!filter.test(value)){
            return false;
        }
        return true;
    }

    const checkValidations = (checks, value, maxLength) => {
        if(checks.includes("nonEmpty") && !nonEmptyCheck(value)){
            return {error : true, errorMsg : "This is a mandatory field"};
        }
        if(checks.includes("noSpace") && !noSpaceCheck(value)){
            return {error : true, errorMsg : "should not contain space"}
        }
        if(checks.includes("strictNoSpace") && !strictNoSpaceCheck(value)){
            return {error : true, errorMsg : "should not contain space"}
        }
        if(checks.includes("onlyAlphabet")){
            var response = alphabetOnlyCheck(value, maxLength)
            if(response.error){
                return {error : true, errorMsg : response.errorMsg}
            }
        }
        if(checks.includes("email") && !validEmailCheck(value)){
            return {error: true, errorMsg : "Invalid E-mail Id."};
        }
        if(checks.includes("mobile") && !validateMobileCheck(value)){
            return {error: true, errorMsg : "Invalid Mobile No."};
        }
        if(checks.includes("pincode") && !pincodeCheck(value)){
            return {error: true, errorMsg : "Invalid Pincode"};
        }
        return {error: false, success : true};
    }

    return{
        checkValidations
    }
}

export default BasicValidation;
export const NON_EMPTY = "nonEmpty";
export const NO_SPACE = "noSpace";
export const STRICT_NO_SPACE = "strictNoSpace";
export const ONLY_ALPHABET = "onlyAlphabet";
export const EMAIL = "email";
export const MOBILE = "mobile";
export const PINCODE = "pincode";
export const MAX_LENGTH = {firstName : 20, lastName : 30}