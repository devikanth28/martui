import React, { useEffect, useState } from 'react';
import OtpImg from '../../images/common/otp-bg.png';
import Otp2xImg from '../../images/common/otp-bg2x.png';
import { useInputField } from './CustomHooks/useInputField';


const EXCLUDED_KEY_CODES = [8, 39, 116, 13, 37];

const OtpDisplay = (props) => {
    const [otpValue, otpErrorMessage, setOtpValue, setOtpError, handleOnChange, handleFocusInput, handleOnBlur] = useInputField("NUMBER", 6);

    useEffect(() => {
        setOtpValue("");
    }, [props.resetOtp])

    useEffect(() => {
        props.setOtpStr(otpValue);
    }, [otpValue]);

    const onKeyDown = (e) => {
        const keyCode = e.keyCode || e.which;
        if (EXCLUDED_KEY_CODES.indexOf(keyCode) === -1 && (keyCode === 38 || keyCode === 40 || keyCode < 48 || (keyCode > 57 && keyCode < 96) || keyCode > 105)) {
            e.preventDefault();
            return;
        }
    }

    return (
        <React.Fragment>
            <section className="body-height">
                <div className="resend-otp-container">
                    <img srcSet={`${OtpImg} 1x, ${Otp2xImg} 2x`} alt="OTP background" title="OTP background" />
                    <div>
                        <h5>OTP Confirmation</h5>
                        <h6>Please type the OTP sent to {props.mobileNumber}.</h6>
                        <div className="filled-form position-relative form-group">
                            <input type="text" className={otpErrorMessage ? 'form-control is-invalid' : "form-control"} id="OTP" placeholder=" " autoFocus name="OTP" onFocus={(e) => handleFocusInput(e)} onBlur={(e) => handleOnBlur(e)} onChange={(e) => handleOnChange(e)}
                                value={otpValue} maxLength={6} onKeyDown={e => onKeyDown(e)} />
                            <label htmlFor="OTP">Enter OTP</label>
                            {otpErrorMessage &&
                                <div className="invalid-feedback d-block">
                                    {otpErrorMessage}
                                </div>
                            }
                        </div>
                        <div className="btn-container d-flex justify-content-between">
                            {props.showResendOtp && !props.resendOtpLoader &&
                                <a className="pointer" title="Resend OTP" onClick={props.handleResendOtp}>Resend OTP</a>
                            }
                            {props.showResendOtp && props.resendOtpLoader &&
                                <a title="Resend OTP">
                                    <span className="spinner-border spinner-border-sm align-text-top" role="status" aria-hidden="true"></span>
                                    <span className="sr-only"></span>
                                </a>
                            }
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}

export default OtpDisplay;