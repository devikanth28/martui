import React from "react";

const DeleteAccount = (props) => {
    return (
        <React.Fragment>
            <div className="d-flex mt-3">
            <span>
            <svg width ="18" height ="18" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px" viewBox="0 0 16 16">
                        <path d="M7.1,5.2c0,0.1,0.1,0.1,0.1,0.2c0,0,0.1,0.1,0.1,0.1c0,0,0.1,0.1,0.1,0.1c0,0,0.1,0.1,0.2,0.1 c0.1,0,0.1,0,0.2,0.1c0.1,0,0.1,0,0.2,0c0.1,0,0.1,0,0.2,0c0.1,0,0.1,0,0.2-0.1h0c0.1,0,0.1-0.1,0.2-0.1c0,0,0.1-0.1,0.1-0.1l0,0 c0,0,0.1-0.1,0.1-0.1c0,0,0.1-0.1,0.1-0.1c0,0,0,0,0,0c0-0.1,0-0.1,0.1-0.2c0-0.1,0-0.1,0-0.2s0-0.1,0-0.2c0-0.1,0-0.1-0.1-0.2 c0-0.1-0.1-0.2-0.2-0.3c0,0,0,0,0,0c0,0-0.1-0.1-0.1-0.1C8.5,4,8.4,4,8.4,3.9c-0.1,0-0.1,0-0.2-0.1c-0.1,0-0.1,0-0.2,0 c-0.1,0-0.1,0-0.2,0c-0.1,0-0.1,0-0.2,0.1h0C7.5,4,7.5,4,7.4,4c-0.1,0-0.1,0.1-0.1,0.1c0,0-0.1,0.1-0.1,0.1c0,0-0.1,0.1-0.1,0.2 c0,0.1,0,0.1-0.1,0.2c0,0.1,0,0.1,0,0.2C7,4.9,7,4.9,7,5C7,5.1,7.1,5.2,7.1,5.2z"></path>
                        <path d="M9.1,10.6H8.8V7c0-0.2-0.2-0.4-0.4-0.4H6.9C6.7,6.6,6.5,6.8,6.5,7v0.8c0,0.2,0.2,0.4,0.4,0.4h0.3v2.4H6.9 c-0.2,0-0.4,0.2-0.4,0.4v0.8c0,0.2,0.2,0.4,0.4,0.4h2.3c0.2,0,0.4-0.2,0.4-0.4V11C9.5,10.7,9.3,10.6,9.1,10.6z"></path><path d="M8,0C3.6,0,0,3.6,0,8s3.6,8,8,8s8-3.6,8-8S12.4,0,8,0z M8,14.9c-3.8,0-6.9-3.1-6.9-6.9S4.2,1.1,8,1.1 s6.9,3.1,6.9,6.9S11.8,14.9,8,14.9z"></path>
            </svg>
            </span>
            <div className="text-secondary font-12 ml-3">
                <p className="mb-0">Deleting an account is a permanent action and cannot be undone. In case you want to use MedPlus Services again you have to register again as a new customer which will have no previous order history. To know more check our privacy policies,
                To delete your account, Please download the app (
                    <a role="link" className="border-0 btn btn-link text-primary d-inline nav-link p-0" href="https://play.google.com/store/apps/details?id=com.medplus.mobile.android" title="Android App" target="_blank">Android</a>
                    <span className="mx-1">/</span>
                    <a role="link" className="border-0 btn btn-link text-primary d-inline nav-link p-0" href="https://apps.apple.com/us/app/medplus-drug-directory-store/id1070265254" title="IOS App" target="_blank">IOS</a>

                ) and follow these</p>
                <p className="mb-0">Steps: Go to My Account -&gt; Delete it here.</p>
            </div>
            </div>
        </React.Fragment>
    )
}
export default DeleteAccount