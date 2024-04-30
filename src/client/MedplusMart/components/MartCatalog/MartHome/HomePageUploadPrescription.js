import React, { useState } from 'react'
import NeedhelpPopover from './NeedhelpPopover';
import { getHelp } from '../../../../Analytics/Analytics';
import { Link } from 'react-router-dom';
import { getSelectedLocality } from '../../../../../redux/action/LocalityAction';
import Validate from '../../../../helpers/Validate';

const HomePageUploadPrescription = () => {

    const validate = Validate();
    const selectedLocality = getSelectedLocality();

    const [needHelpPopover , showNeedHelpPopover] = useState(false);

    const isPrescriptionUploadEnabled = validate.isNotEmpty(selectedLocality?.saleAllowed) && "G" != selectedLocality.saleAllowed && validate.isNotEmpty(selectedLocality.hubId);

    if(!isPrescriptionUploadEnabled) {
        return <React.Fragment />
    }

    return (
        <React.Fragment>
            <section className="bg-light home-page-title section-seperator shadow-none">
                <div className="row mx-0">
                    <div className="col-6 pl-0 pr-2" onClick={()=> getHelp('uploadPresciption')}>
                        <Link className="test-card card text-decoration-none shadow-sm" style = {{ 'minHeight': 'unset' }} to = {"/prescriptionUpload"} role="link">
                            <div className="card-body p-3">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div role="button">
                                        <h5 className='font-weight-normal title mb-0'>Upload for Order  </h5>
                                        <p class="font-14 m-0 text-black-50">Get a call back</p>
                                    </div>
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                            <g id="rightchevron_black_icon_24px" transform="translate(-906.838 786) rotate(-90)">
                                                <rect id="Rectangle_4721" data-name="Rectangle 4721" width="24" height="24" transform="translate(762 906.838)" fill="none"></rect>
                                                <path id="Path_23400" data-name="Path 23400" d="M63.432,503.859l5.4-5.4a1.223,1.223,0,0,0-1.73-1.73l-4.533,4.52-4.533-4.533a1.228,1.228,0,0,0-2.092.865,1.216,1.216,0,0,0,.363.865l5.4,5.411A1.229,1.229,0,0,0,63.432,503.859Z" transform="translate(711.356 418.584)" fill="#080808"></path>
                                            </g>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="col-6 pr-0 pl-2" onClick={()=>{showNeedHelpPopover(!needHelpPopover);getHelp('NeedHelp')}}>
                        <button className="w-100 p-0 test-card card shadow-sm" style={{ 'minHeight': 'unset' }} role="button">
                            <div className="w-100 card-body p-3">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div role="button" className='text-left'>
                                        <h5 className='font-weight-normal title mb-0'>Need help with Ordering</h5>
                                        <p className="font-14 m-0 text-black-50">Call 040 6700 6700</p>
                                    </div>
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                            <g id="rightchevron_black_icon_24px" transform="translate(-906.838 786) rotate(-90)">
                                                <rect id="Rectangle_4721" data-name="Rectangle 4721" width="24" height="24" transform="translate(762 906.838)" fill="none"></rect>
                                                <path id="Path_23400" data-name="Path 23400" d="M63.432,503.859l5.4-5.4a1.223,1.223,0,0,0-1.73-1.73l-4.533,4.52-4.533-4.533a1.228,1.228,0,0,0-2.092.865,1.216,1.216,0,0,0,.363.865l5.4,5.411A1.229,1.229,0,0,0,63.432,503.859Z" transform="translate(711.356 418.584)" fill="#080808"></path>
                                            </g>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </section>
            {needHelpPopover && <NeedhelpPopover needHelpPopover = {needHelpPopover} showNeedHelpPopover = {showNeedHelpPopover}/>}
        </React.Fragment>
    )
}
export default HomePageUploadPrescription