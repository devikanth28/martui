import React, { useState } from "react"
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Validate from "../../helpers/Validate";
import ReachOutToUsModal from "./ReachOutToUsModal";
import SubsLoginIcon from "../../images/common/Subscriptions-amico.svg"

const SubscriptionLoginForm = (props) => {
    const showCorporate = props.showCorporate
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const validate = Validate();

    const toggle = () => setDropdownOpen(prevState => !prevState);

    const [companyName, setCompanyName] = useState("Domain");
    const [mobileNumber, setMobileNumber] = useState('');
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [error, setError] = useState({});
    const [showReachOutModal, setShowReachOutModal] = useState(false)
    const toggleReachOutModel = () => setShowReachOutModal(!showReachOutModal);


    const handleChange = (e) => {
        let fieldname = e.target.id
        let fieldvalue = e.target.value
        let errorMsg = validateInputs(fieldname, fieldvalue)
        if (validate.isNotEmpty(errorMsg)) {
            setError({ ...error, [fieldname]: errorMsg })
        } else {
            setError({ ...error, [fieldname]: "" })
        }
    }
    const validateInputs = (fieldname, fieldvalue) => {
        switch (fieldname) {
            case 'mobileNumber':
                setMobileNumber(fieldvalue);
                return validate.mobileNumber(fieldvalue);
            case 'name':
                setName(fieldvalue)
                return validate.name(fieldvalue, 'Name')
            case 'userName':
                setUsername(fieldvalue)
                let user_email = fieldvalue + "@" + companyName
                return validate.email(user_email)

            default: return
        }

    }
    const handleclick = (company) => {
        setCompanyName(company)
        let user_email = username + "@" + company
        let errorMsg = validate.email(user_email)
        if (validate.isNotEmpty(errorMsg)) {
            setError({ ...error, ['userName']: errorMsg })
        } else {
            setError({ ...error, ['userName']: "" })
        }

    }
    const handleEnter = (e) => {
        if (e.keyCode == 13) {
            e.target.blur();
        }
    }

    return (
        <React.Fragment>
            <div className="subs-login-container">
                <section className="subs-login">
                    <div className="content">

                        <p class="mb-0">Register or Login</p>
                        <h3>for Subscription</h3>
                        {!showCorporate && <div className="form-group has-float-label  my-4">
                            <input type="tel" pattern="[1-9]{1}[0-9]{9}" className="form-control" id="mobileNumber" onKeyDown={handleEnter} onChange={handleChange} name="mobileNumber" maxlength="10" autocomplete="off" placeholder=" " />
                            <label for="mobileNumber" className="select-label">Enter your mobile number</label>
                            {validate.isNotEmpty(error['mobileNumber']) && <small className="help-block text-left errmsg margin-none text-danger"> {error['mobileNumber']} </small>}
                        </div>}
                        {showCorporate && <div className="form-group has-float-label  my-4">
                            <input type="text" className="form-control" id="name" name="name" onKeyDown={handleEnter} onChange={handleChange} maxlength="30" autocomplete="off" placeholder=" " />
                            <label for="name" className="select-label">Enter your name</label>
                            {validate.isNotEmpty(error['name']) && <small className="help-block text-left errmsg margin-none text-danger"> {error['name']} </small>}
                        </div>}
                        {showCorporate && <div className="p-0" style={{ "minHeight": "unset" }} >
                            <div class="input-group mb-4 flex-nowrap">
                                <div className="form-group has-float-label w-100 mb-0">
                                    <input name="corporateLogin" id="userName" maxLength="16" placeholder=" " type="text" autoComplete="off" onKeyDown={handleEnter} onChange={handleChange} className={`form-control border-right-0`} style={{ "border-radius": "0.2rem 0 0 0.2rem" }} />
                                    <label htmlFor="userName" className="select-label text-capitalize">User Name</label>
                                    <small className="help-block text-left errmsg margin-none text-danger"> </small>
                                    {validate.isNotEmpty(error['userName']) && <small className="help-block text-left errmsg margin-none text-danger"> {error['userName']} </small>}
                                </div>
                                <div class="input-group-append">
                                    <div className="mb-0">
                                        <Dropdown isOpen={dropdownOpen} toggle={toggle} className ="subs-domain-dropdown">
                                            <DropdownToggle caret color="white" className="border-left-0 h-100">
                                                {companyName}
                                            </DropdownToggle>
                                            <DropdownMenu className ="w-100 dropdown-menu-right">
                                                <DropdownItem className={(companyName == 'wipro.com') ? "active" : ""} onClick={() => handleclick("wipro.com")}>wipro.com</DropdownItem>
                                                <DropdownItem className={(companyName == 'medplusindia.com') ? "active" : ""} onClick={() => handleclick("medplusindia.com")}>medplusindia.com</DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </div>
                                </div>
                            </div>
                        </div>}

                        <div className="row mb-5 flex-row-reverse">
                            <div className="col pl-1"><button type="submit" disabled={showCorporate ? (validate.isNotEmpty(validate.email(username + "@" + companyName)) || validate.isNotEmpty(validate.name(name))) ? true : false : (validate.isNotEmpty(validate.mobileNumber(mobileNumber))) ? true : false} className="btn btn-brand btn-block" onClick={() => props.history.push("/labSubscriptionLoginOtp")}>Get OTP</button></div>
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

export default SubscriptionLoginForm