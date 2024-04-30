import React, {useEffect, useState} from 'react';
import threewaystoorder from '../../../../../images/common/three-ways-to-order.png'
import MartCatalogService from '../../../../services/MartCatalogService';
import PharmaBannerSlider from './PharmaBannerSlider';
import Validate from "../../../../../helpers/Validate";
import BrowsePharmaCategories from './BrowsePharmaCategories';
import StaticBrowsePharmaCategories from './StaticBrowsePharmaCategories';
import { getHelp } from '../../../../../Analytics/Analytics';
import { Link } from 'react-router-dom';
import { getSelectedLocality } from '../../../../../../redux/action/LocalityAction';

const PharmaHome = (props) => {
    const [banners, setBanners] = useState({});
    const validate = Validate();
    const [pharmacyCatgeoryData, setPharmacyCategoryData] = useState([]);

    const selectedLocality = getSelectedLocality();
    const isPrescriptionUploadEnabled = validate.isNotEmpty(selectedLocality?.saleAllowed) && "G" != selectedLocality.saleAllowed && validate.isNotEmpty(selectedLocality.hubId);

    useEffect(()=>{
        getBannerDetails();
        getPharmacyCategories();
    },[]);

    const getBannerDetails = () =>{
        MartCatalogService().getBanners({REQUEST_OBJ: {"requestFor": "BANNER_MART_WEB", "pageName": "PHARMACY HOME", "screenLocation": "CURRENT_OFFERS" }}).then((data) => {
            if ( data.statusCode === "SUCCESS" && validate.isNotEmpty(data.dataObject) && validate.isNotEmpty(data.dataObject.bannerPromotion) && validate.isNotEmpty(data.dataObject.bannerPromotion.bannerPromoDetails) && validate.isNotEmpty(data.dataObject.bannerPromotion.bannerPromoDetails.CURRENT_OFFERS)) {
                setBanners(data.dataObject.bannerPromotion.bannerPromoDetails["CURRENT_OFFERS"]);
            }

        })
    }

    const getPharmacyCategories = () =>{
        MartCatalogService().getPharmacyCategories().then((data)=>{
            if(data.statusCode === 'SUCCESS'){
                setPharmacyCategoryData(data.dataObject);
            }
        })
    }
    return (
        <React.Fragment>            
            <section className="waysOfOrder bg-none shadow-none">
                <div className="imgTitle">
                    <img className="img-fluid" src={threewaystoorder} title="Three ways to order your medicine" alt="Three ways to order your medicine" />
                </div>
                <div  className="container-lg container-fluid-sm d-flex justify-content-between">

                    <section className="helpBlock ">
                        <div className="text-center ico-buy-online"></div>
                        <h3 className="help-heading">Buy Online</h3>                       
                        <ol className="helpList">
                            <li>Search and select the medicines you want</li>
                            <li>Upload your prescription at check out</li>
                            <li>Choose home delivery or store pick up</li>
                        </ol>
                    </section>
                    <section className="helpBlock">
                        <div className="text-center ico-click-and-pick"></div>
                        <h3 className="help-heading">Click and Pick</h3>
                        <ol className="helpList">
                            <li>Search and select the Medicines you want</li>
                            <li>Select the MedPlus store where you wish to pick up the order</li>
                            <li>Show the prescription at the store and collect your medicine</li>
                        </ol>
                    </section>
                    <section className="helpBlock">
                        <div className="text-center ico-call-back"></div>
                        <h3 className="help-heading">Receive a Call Back</h3>
                        <ol className="helpList">
                            <li>Our customer Representative will call you and confirm the order</li>
                            {isPrescriptionUploadEnabled &&
                            	<li className="nostyle">
                                	<Link to="/prescriptionUpload" className="btn btn-block btn-brand-gradient rounded-pill custom-btn-lg"  title="Upload your prescription" onClick={() => getHelp('uploadPresciption')} role="link">Upload your Prescription</Link>
                            	</li>}
                        </ol>
                    </section>
                </div>
            </section>
            {validate.isNotEmpty(banners) && <PharmaBannerSlider banners={banners} />}
            {validate.isNotEmpty(pharmacyCatgeoryData) && <BrowsePharmaCategories history={props.history} pharmacyCatgeoryData={pharmacyCatgeoryData}/>}
            {validate.isEmpty(pharmacyCatgeoryData) && <StaticBrowsePharmaCategories/>}
        </React.Fragment>
    )
}
export default PharmaHome;