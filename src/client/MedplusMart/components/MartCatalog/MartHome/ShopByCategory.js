import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import CategoryCard from '../../Common/CategoryCard';
import ShopByCategoryGhostImage from './ShopByCategoryGhostImage';
import { useSelector } from 'react-redux';
import Validate from '../../../../helpers/Validate';
import { getSelectedLocality , getMembershipConfig} from '../../../../../redux/action/LocalityAction';
import MartCatalogService from '../../../services/MartCatalogService';

const ShopByCategory = (props) => {

    const validate = Validate();
    const selectedLocality = getSelectedLocality();
    const membershipConfig = getMembershipConfig();
    const martCategoriesFromRedux = useSelector((state)=>validate.isNotEmpty(state) && validate.isNotEmpty(state.medplusCatalog) && validate.isNotEmpty(state.medplusCatalog.martCatalog) ? state.medplusCatalog.martCatalog : {});
    const martCategories = validate.isNotEmpty(selectedLocality) && validate.isNotEmpty(selectedLocality['catalogId']) ? martCategoriesFromRedux[selectedLocality['catalogId']] : martCategoriesFromRedux['CATALOG_DFT1'];

    const [categoryIcons, setCategoryIcons] = useState([]);
    const [isCategoryIconsLoading, setCategoryIconsLoading] = useState(true);

    useEffect(() => {
        getCategoryIcons();
    }, []);

	const getCategoryIcons = () => {
		MartCatalogService().getCategoryIcons().then((response) => {
			if("SUCCESS" === response?.statusCode && validate.isNotEmpty(response?.dataObject?.CATEGORY_IMAGE)) {
                setCategoryIcons(response.dataObject.CATEGORY_IMAGE);
			} else {
                setCategoryIcons([]);
            }
            setCategoryIconsLoading(false);
		}).catch((err) => {
			console.log(err);
            setCategoryIconsLoading(false);
		})
	}

    function getShopByCategorySlider(shopByCategoryData) {
        const pharmacy = {
            categoryName: 'Pharmacy',
            redirectTo: "/pharmaHome",
            isNew: false,
            openInNewTab: false
        };
        const diagnostics = {
            categoryName: 'Diagnostics',
            redirectTo: "/diagnostics",
            isNew: true,
            openInNewTab: true
        };
        const doctors = {
            categoryName: 'Doctors',
            redirectTo: "/doctorconsultation",
            isNew: true,
            openInNewTab: true
        };
        const medplusAdvantage = {
            categoryName: 'MedPlus Advantage',
            redirectTo: "/medplusAdvantage",
            isNew: true,
            openInNewTab: true
        };
        (membershipConfig && membershipConfig.onlineServingPlanIds.length >0) ? shopByCategoryData = [pharmacy, diagnostics, doctors, medplusAdvantage, ...shopByCategoryData] : shopByCategoryData = [pharmacy, diagnostics, doctors, ...shopByCategoryData];
        return (
                shopByCategoryData.map((each) => {
                    return (<CategoryCard category={each} history={props.history} categoryIcons={categoryIcons} />);
                })
        )
    }
    return (
        <React.Fragment>
            {!isCategoryIconsLoading && validate.isNotEmpty(martCategories) &&
                <React.Fragment>
                    <div className='mb-2'>
                        <h5 className="mb-0">{props.sectionTitle}</h5>
                    </div>
                    <section className="section-seperator">
                        <div className='department-slider-container p-4 d-flex flex-wrap' style={{gap:'1rem'}}>
                            {getShopByCategorySlider(martCategories)}
                        </div>
                    </section>
                </React.Fragment>
            }
            {isCategoryIconsLoading && <ShopByCategoryGhostImage />}
        </React.Fragment >
    )
}
export default ShopByCategory;