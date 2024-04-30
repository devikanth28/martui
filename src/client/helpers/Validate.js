import BasicValidation, { NON_EMPTY, NO_SPACE, STRICT_NO_SPACE } from "./BasicValidation";

export default function Validate() {
    return {
        isEmpty: function (obj) {
            var isEmpty = true;
            if (obj == undefined || obj == "undefined" || obj == null || obj == "null") {
                return true;
            }
            switch (typeof obj) {
                case "number":
                    isEmpty = obj.toString().length <= 0;
                    break;
                case "string":
                    isEmpty = obj.length <= 0 || obj.trim().length <= 0;
                    break;
                case "object":
                    if (obj instanceof Array) {
                        isEmpty = obj.length <= 0;
                        break;
                    } if (obj instanceof Date) {
                        isEmpty = obj.length <= 0;
                        break;
                    }else {
                        isEmpty = Object.keys(obj).length <= 0;
                        break;
                    }
            }
            return isEmpty;
        },
        isNotEmpty: function (obj) {
            var isNotEmpty = true;
            if (obj == undefined || obj == "undefined" || obj == null || obj == "null") {
                return false;
            }
            switch (typeof obj) {
                case "number":
                    isNotEmpty = obj.toString().length > 0;
                    break;
                case "string":
                    isNotEmpty = obj.length > 0;
                    break;
                case "object":
                    if (obj instanceof Array) {
                        isNotEmpty = obj.length > 0;
                        break;
                    } else {
                        isNotEmpty = Object.keys(obj).length > 0;
                        break;
                    }
            }
            return isNotEmpty;
        },
        isNumeric: function (obj) {
            if (this.isEmpty(obj)) {
                return false;
            }
            return (typeof obj == "number" || /^[0-9]*$/gi.test(obj));
        },
        isString: function (obj) {
            if (this.isEmpty(obj)) {
                return false;
            }
            return (typeof obj == "string");
        },
        isAlphaWithoutSpace: function (obj) {
            if (this.isEmpty(obj)) {
                return false;
            }
            return (typeof obj == "string" && /^[A-Za-z]+$/gi.test(obj));
        },
        isAlphaWithSpace: function (obj) {
            if (this.isEmpty(obj)) {
                return false;
            }
            return (typeof obj == "string" && /^[A-Za-z ]+$/gi.test(obj));
        },
        isAlphaNumericWithoutSpace: function (obj) {
            if (this.isEmpty(obj)) {
                return false;
            }
            return (typeof obj == "string" && /^[A-Za-z0-9]+$/gi.test(obj));
        },
        isAlphaNumericWithSpace: function (obj) {
            if (this.isEmpty(obj)) {
                return false;
            }
            return (typeof obj == "string" && /^[A-Za-z0-9 ]+$/gi.test(obj));
        },
        validateStringWithLength: function (obj, len) {
            if (this.isEmpty(obj)) {
                return false;
            }
            if (len <= 0) {
                return false;
            }
            return (typeof obj == "string" && obj.length <= len);
        },
        mergeArraysWithoutDuplicate: function (array1, array2) {
            if (this.isNotEmpty(array1) || this.isNotEmpty(array2)) {
                if (this.isEmpty(array1)) {
                    return array2;
                }
                if (this.isEmpty(array2)) {
                    return array1;
                }
                var i = 0, length = array2.length;
                for (; i < length; i++) {
                    if (array1.indexOf(array2[i]) < 0) {
                        array1.push(array2[i]);
                    }
                }
                return array1;
            }
            return [];
        },
        validateNumberWithLength: function (number,name,len) {
            var numberPattern = /^\d+(?:\.\d+)?$/; ///^\d+\.\d{0,2}$/;
            var errorMsg;
            if (this.isEmpty(number)) {
                errorMsg = name + " is required";
            } else if (number.length > len) {
                errorMsg = name + "must be atmost " + len + " digits";
            } else if (!numberPattern.test(number)) {
                errorMsg = name + "is not valid";
            } else {
                errorMsg = undefined;
            }
            return errorMsg;
        },
        email: function (emailId, maxlength) {
            var emailPattern = "^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@" + "[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$";
            maxlength = maxlength || 45;
            var errorMsg;
            if(this.isEmpty(emailId)) {
                errorMsg = "Please enter Email ID";
            } else if (!emailId.match(emailPattern) || this.isNumeric(emailId.split("@")[0])) {
                errorMsg = "Please enter a valid Email ID.";
            } else if (emailId.trim().length < 5 || emailId.trim().length > maxlength) {
                errorMsg = "Email Id must be atleast 5 characters, atmost " + maxlength + " characters";
            } else {
                errorMsg = undefined;
            }
            return errorMsg;
        },
        name: function (name, fieldName, maxlength) {
            var namePattern = /^[A-Za-z A-Za-z]+$/;
            maxlength = maxlength || 30;
            var errorMsg;
            if (this.isEmpty(name)) {
                errorMsg = fieldName + " is required";
            } else if (name.trim().length < 3 || name.trim().length > maxlength) {
                errorMsg = fieldName + " must be atleast 3 characters, atmost " + maxlength + " characters";
            } else if (!namePattern.test(name)) {
                errorMsg = "Only Alphabets are allowed for "+fieldName;
            } else {
                errorMsg = undefined;
            }
            return errorMsg;
        },
        lastName: function (name, fieldName, maxlength) {
            var namePattern = /^[A-Za-z A-Za-z]+$/;
            maxlength = maxlength || 30;
            var errorMsg;
            if (this.isEmpty(name)) {
                errorMsg = fieldName + " is required";
            } else if (name.trim().length < 1 || name.trim().length > maxlength) {
                errorMsg = fieldName + " must be atleast 1 characters, atmost " + maxlength + " characters";
            } else if (!namePattern.test(name)) {
                errorMsg = "Only Alphabets are allowed for "+fieldName;
            } else {
                errorMsg = undefined;
            }
            return errorMsg;
        },
        mobileNumber: function (mobileNo) {
            var mobileNoPattern = /^[0-9]{10}$/;
            var errorMsg;
            if (this.isEmpty(mobileNo)) {
                errorMsg = "Mobile number is required";
            } else if (mobileNo < 1000000000 || mobileNo > 9999999999) {
                errorMsg = "Mobile number must be 10 digits and can't start with Zero";
            } else if (!mobileNoPattern.test(mobileNo)) {
                errorMsg = "Mobile number is not valid";
            } else {
                errorMsg = undefined;
            }
            return errorMsg;
        },
        password: function (pwd, fieldName, maxlength) {
            var errorMsg;
            maxlength = maxlength || 20;
            let pwdCheck = BasicValidation().checkValidations([STRICT_NO_SPACE], pwd);
            if (this.isEmpty(pwd)) {
                errorMsg = fieldName + " is required";
            } else if (pwd.length < 6 || pwd.length > maxlength) {
                errorMsg = fieldName + " atleast 6 characters, atmost " + maxlength + " characters";
            } else if(pwdCheck.error){
                errorMsg = fieldName + " " + pwdCheck.errorMsg;
            } else {
                errorMsg = undefined;
            }
            return errorMsg;
        },
        address: function (address, isMandatory, fieldName, maxlength) {
            var errorMsg;
            var addressPattern = /^[A-Za-z0-9-_:,.;/&|\s\\]+$/;
            maxlength = maxlength || 100;
            if (isMandatory && this.isEmpty(address)) {
                errorMsg = fieldName + " is required"
            } else if (address && address.trim().length > maxlength) {
                errorMsg = fieldName + " must be less than " + maxlength + " characters";
            } else if (address && address.trim().length > 0 && !addressPattern.test(address)) {
                errorMsg = fieldName + " is not valid";
            } else {
                errorMsg = undefined;
            }
            return errorMsg;
        },
        pinCode: function (pincode) {
            var pincodePattern = /^[0-9]{6}$/;
            var errorMsg;
            if (this.isEmpty(pincode)) {
                errorMsg = "Pincode required";
            } else if (pincode < 100000 || pincode > 999999) {
                errorMsg = "Pincode must be 6 digits";
            } else if (!pincodePattern.test(pincode)) {
                errorMsg = "Pincode not valid";
            } else {
                errorMsg = undefined;
            }
            return errorMsg;
        },
        recordName: function (name, fieldName, maxlength) {
            var namePattern = /^[A-Za-z A-Za-z 0-9]+$/;
            maxlength = maxlength || 20;
            var errorMsg;
            if (this.isEmpty(name)) {
                errorMsg = fieldName + " is required";
            } else if (name.trim().length < 3 || name.trim().length > maxlength) {
                errorMsg = fieldName + " must be atleast 3 characters, atmost " + maxlength + " characters";
            } else if (!namePattern.test(name)) {
                errorMsg = fieldName + " is not valid : " + name;
            } else {
                errorMsg = undefined;
            }
            return errorMsg;
        },
        reason: function (reason, maxlength) {
            var pattern = /^[A-Za-z0-9-_,./()?;:@#$%*^+=&'! ]+$/;
            maxlength = maxlength || 200;
            var errorMsg;
            if (isNotEmpty(reason) && reason.trim().length > maxlength) {
                errorMsg = "Please provide reason within " + maxlength + " characters.";
            } else if (isNotEmpty(reason) && reason.trim().length > 0 && !pattern.test(reason)) {
                errorMsg = "Invalid text";
            } else {
                errorMsg = undefined;
            }
            return errorMsg;
        },
        productName: function (productName, maxlength,fieldName=null) {
            var errorMsg;
            maxlength = maxlength || 50;
            if (this.isEmpty(productName)) {
                errorMsg = fieldName + " is required";
            } else if (productName.trim().length<3  ||  productName.trim().length > maxlength) {
                errorMsg = fieldName + " must be atleast 3 characters, atmost " + maxlength + " characters";

            } else {
                errorMsg = undefined;
            }
            return errorMsg;
        },
        brand: function (brand, maxlength) {
            maxlength = maxlength || 30;
            var errorMsg;
            if (this.isEmpty(brand)) {
                errorMsg = "Brand is required";
            } else if (brand.trim().length > maxlength) {
                errorMsg = "Please provide Brand within " + maxlength + " characters.";
            } else {
                errorMsg = undefined;
            }
            return errorMsg;
        },
        price: function (price, minValue, maxValue) {
            minValue = minValue || 1;
            maxValue = maxValue || 9999;
            var errorMsg;
            if(this.isEmpty(price)) {
                errorMsg = "Price is required";
            } else if(isNaN(price)) {
                errorMsg = "Price must be a number";
            } else if((parseFloat(price) < minValue) || (parseFloat(price) > maxValue)) {
                errorMsg = "Please provide price within "+ minValue +" and "+ maxValue;
            } else {
                errorMsg = undefined;
            }
            return errorMsg;
        },
        isValidPrice: function (price) {
            if(this.isEmpty(price) || isNaN(price) || !this.isNumeric(price)) 
               return false;
            else
                return true;  
        },
        panCardNo: function (panCardNo) {
            var panPattern = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
            var errorMsg;
            if (this.isEmpty(panCardNo) || !panPattern.test(panCardNo)) {
                errorMsg = "Please Enter A Valid PAN card Number.";
            } else if (panCardNo.trim().length != 10) {
                errorMsg = "PAN card no Must Be 10 characters.";
            } else {
                errorMsg = undefined;
            }
            return errorMsg;
        },
        ifscCode: function (ifscCode) {
            var panPattern = /^([a-zA-Z]){4}([a-zA-Z0-9]){7}?$/;
            var errorMsg;
            if (this.isEmpty(ifscCode) || !panPattern.test(ifscCode)) {
                errorMsg = "Please Enter A Valid IFSC Code.";
            } else {
                errorMsg = undefined;
            }
            return errorMsg;
        },
        aadhaarCardNo: function (aadhaarCardNo) {
            var errorMsg;
            if (this.isEmpty(aadhaarCardNo) || !this.isNumeric(aadhaarCardNo)) {
                errorMsg = "Please enter a valid Aadhaar card Number.";
            } else if (aadhaarCardNo.trim().length != 12) {
                errorMsg = "Aadhaar card no must be 12 characters.";
            } else {
                errorMsg = undefined;
            }
            return errorMsg;
        },
        pensionPassbook: function (pensionPassbookNo) {
            var errorMsg;
            if (this.isEmpty(pensionPassbookNo) || !this.isNumeric(pensionPassbookNo)) {
                errorMsg = "Please enter a valid Pension Passbook Number.";
            } else if (pensionPassbookNo.trim().length != 12) {
                errorMsg = "Pension Passbook Number Must Be 12 characters.";
            } else {
                errorMsg = undefined;
            }
            return errorMsg;
        },
        drivingLicense: function (drivingLicense) {
            var drivingLicensePattern = /^(([A-Z]{2}[0-9]{2})( )|([A-Z]{2}-[0-9]{2}))((19|20)[0-9][0-9])[0-9]{7}$/;
            var errorMsg;
            if (this.isEmpty(drivingLicense) || !drivingLicensePattern.test(drivingLicense)) {
                errorMsg = "Please enter a valid Driving License Number.";
            } else {
                errorMsg = undefined;
            }
            return errorMsg;
        },
        passport: function (passport) {
            var passportPattern = /^[A-PR-WYa-pr-wy][1-9]\d\s?\d{4}[0-9]$/;
            var errorMsg;
            if (this.isEmpty(passport) || !passportPattern.test(passport)) {
                errorMsg = "Please enter a valid passport number.";
            } else {
                errorMsg = undefined;
            }
            return errorMsg;
        },
        voterId: function (voterId) {
            var voterIdPattern = /^([a-zA-Z]){3}([0-9]){7}?$/;
            var errorMsg;
            if (this.isEmpty(voterId) || !voterIdPattern.test(voterId)) {
                errorMsg = "Please enter a valid voter Id.";
            } else {
                errorMsg = undefined;
            }
            return errorMsg;
        },
        nprSmartCard: function (nprSmartCard) {
            var errorMsg;
            if (this.isEmpty(nprSmartCard) || !this.isNumeric(nprSmartCard)) {
                errorMsg = "Please enter a valid NPR smart card Number.";
            } else if (nprSmartCard.trim().length != 16) {
                errorMsg = "NPR Smart Card number must be 16 characters.";
            } else {
                errorMsg = undefined;
            }
            return errorMsg;
        },
        checkSizeOfObject: function (obj, len) {
            return this.isNotEmpty(len) && ((this.isEmpty(obj) && len === 0) || (Object.keys(obj).length === len));
        },
        validatePAN: function (panCardNo) {
            var panPattern = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
            var errorMsg;
            if (this.isEmpty(panCardNo) || !panPattern.test(panCardNo)) {
                errorMsg = "Please enter a valid PAN card number.";
            } else if (panCardNo.trim().length != 10) {
                errorMsg = "PAN card no must Be 10 characters.";
            } else {
                errorMsg = undefined;
            }
            return errorMsg;
        },
        scrollToElement: function(ref) {
            window.scrollTo(0, ref.current.offsetTop);
        },
        scrollToTop: function() {
            window.scrollTo(0, 0);
        },
        age: function (age, minValue, maxValue) {
            minValue = minValue || 0;
            maxValue = maxValue || 99;
            var errorMsg;
            if(this.isEmpty(age)) {
                errorMsg = "Patient Age is required";
            } else if(isNaN(age)) {
                errorMsg = "Invalid Patient Age";
            } else if((parseFloat(age) < minValue) || (parseFloat(age) > maxValue)) {
                errorMsg = " Patient age should be between "+ minValue +" to "+ maxValue;
            } else {
                errorMsg = undefined;
            }
            return errorMsg;
        },
        year: function (year) {
            var errorMsg;
            if (this.isEmpty(year) || !this.isNumeric(year) || year.length !=4 ) {
                errorMsg = "Please Enter A Valid year(1901-2155).";
            } else if (year < 1901 || year > 2155) {
                errorMsg = "Please Enter A Valid year(1901-2155).";
            } else {
                errorMsg = undefined;
            }
            return errorMsg;
        },
        yearOfBirth: function (year) {
            let date= new Date();
            let currentYear =date.getFullYear();
            let maxPastYear = currentYear-100;

            var errorMsg;
            if (this.isEmpty(year) || !this.isNumeric(year) || year.length !=4 ) {
                errorMsg = `Please enter a valid year(${maxPastYear}-${currentYear}).`;
            } else if (year < maxPastYear || year > currentYear) {
                errorMsg = `Please enter a valid year(${maxPastYear}-${currentYear}).`;
            } else {
                errorMsg = undefined;
            }
            return errorMsg;
        },
        ageWithDob: function (date, customer) {
            let birthDate = new Date(`${date.split("/")[2]}-${date.split("/")[1]}-${date.split("/")[0]}`);
            var today = new Date();
            let  age = today.getFullYear() - birthDate.getFullYear();
            let  m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            if(customer && customer.relationship && customer.relationship.relationshipType  && "SELF" == customer.relationship.relationshipType && age <=0)
                return "Invalid age for this member."
            if(age > 150)
                return "Age should be in range  0-150."        
        }
    }
}
