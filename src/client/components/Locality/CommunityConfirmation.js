import React from 'react';
import { ModalBody} from 'reactstrap';

const CommunityConfirmation = (props) => {
    const communitySelectedAddress = props.communityConfirmationDetails;
   
    const handleContinue = () =>{
        props.setCommunityLocality(communitySelectedAddress.configId);
    }

    const closeCommunityModal = () => {
        props.closeCommunity();
    }

    return (
        <React.Fragment>
        <ModalBody className="pt-4 px-0">
        <address className="active">
            <p className="title">
                <strong id="communityName">{communitySelectedAddress.communityName}</strong>
            </p>
            <p className="title">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><g transform="translate(-48.807 -143.086)"><rect width="24" height="24" transform="translate(48.807 143.086)" fill="none"/><g transform="translate(53.785 145.081)"><path d="M61.016,148.6a3.4,3.4,0,1,0,3.405,3.4A3.4,3.4,0,0,0,61.016,148.6Zm0,5.513a2.108,2.108,0,1,1,2.108-2.108A2.111,2.111,0,0,1,61.016,154.116Z" transform="translate(-53.808 -145.095)" fill="#343a40"/><path d="M66.262,147.159a7,7,0,0,0-5.134-2.073h-.2a7.018,7.018,0,0,0-5.177,2.073,7.152,7.152,0,0,0-1.132,8.253,88.446,88.446,0,0,0,6.369,9.622,86.524,86.524,0,0,0,6.406-9.622A7.152,7.152,0,0,0,66.262,147.159Zm-.016,7.65a74.245,74.245,0,0,1-5.254,8.05,76.1,76.1,0,0,1-5.225-8.05,5.853,5.853,0,0,1,.924-6.755,5.6,5.6,0,0,1,4.238-1.671h.2a5.621,5.621,0,0,1,4.194,1.671A5.853,5.853,0,0,1,66.246,154.809Z" transform="translate(-53.798 -145.086)" fill="#343a40"/></g></g></svg>
               Address:
                <small>
                    {communitySelectedAddress.communityAddress}
                </small>
            </p>
            <p className="title">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g transform="translate(-88 -588)"><rect fill="none" width="24" height="24" transform="translate(88 588)"/><path fillRule="evenodd" fill="#343a40" d="M129.607,90.42l7.607,4.395v8.79L129.607,108,122,103.605v-8.79Zm0-6.42h0a.448.448,0,0,0-.507.507V88.73a.448.448,0,0,0,.507.507h0c.169,0,.338-.169.338-.507V84.507C129.945,84.169,129.776,84,129.607,84Zm3.719,2.2h0c-.169,0-.338.169-.338.507v4.223c0,.338.169.507.338.507h0a.448.448,0,0,0,.507-.507V86.7A.448.448,0,0,0,133.325,86.2Zm-7.607,0h0c-.169,0-.338.169-.338.507v4.223c0,.338.169.507.338.507h0a.448.448,0,0,0,.507-.507V86.7A.448.448,0,0,0,125.719,86.2Zm3.212,14.2v5.578l-5.578-3.043V97.351Zm1.352,5.578v-5.578l5.578-3.043v5.578Zm5.578-10.311-6.254,3.55-6.254-3.55,6.254-3.55Z" transform="translate(-30 504)"/></g></svg>
            	Drop off point:
					<small>{communitySelectedAddress.dropOfPoint}</small>
            </p>
            <div className="container mt-3">
               <button type="button" className="brand-secondary btn px-5 rounded-pill" onClick={closeCommunityModal}>Cancel</button>
               <button type="button" className="btn btn-brand-gradient ml-3 px-5 rounded-pill" onClick={handleContinue}>
               <span className="spinner-border spinner-border-sm d-none" role="status" aria-hidden="true"></span>
               Continue
               </button>
            </div>
        </address>
        </ModalBody>
        
        </React.Fragment>
    )
}

export default CommunityConfirmation