import React, { useEffect, useState } from 'react';
import Validate from '../../../../helpers/Validate';
import LabsBannerSlider from './LabsBannerSlider';

const LabsCatalogBanner = (props) => {
    const validate = Validate();
    const isGhostImageNeeded = validate.isNotEmpty(props.isGhostImageNeeded) ? props.isGhostImageNeeded : true;
    const screenLocation = props.screenLocation;
    const bannerRedirectionVals = {};
    const bannerData = props.bannerData;
    bannerRedirectionVals[screenLocation] = [props.redirectUrl || (validate.isNotEmpty(bannerData) ? bannerData.redirectValue : props.redirectUrl)];

    if ((props.isBannersLoading && validate.isEmpty(bannerData)) && isGhostImageNeeded) {
        return (<div className="ph-row ph-item p-0 m-0">
            <div className="ph-picture mb-0" style={{ "height": "13.125rem" }}></div>
        </div>)
    }

    return (
        <React.Fragment>
            {validate.isNotEmpty(bannerData) && !props.isBannersLoading && <LabsBannerSlider banners={[bannerData]} bannerRedirectionVals={bannerRedirectionVals} history={props.history} screenLocation={screenLocation} isPharmacy ={props.isPharmacy}/>}
        </React.Fragment>
    )
}

export default LabsCatalogBanner;