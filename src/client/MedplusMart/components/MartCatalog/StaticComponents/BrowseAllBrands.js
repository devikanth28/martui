import React, { useEffect, useState } from "react";
import BreadCrumbAction from "../../../../../redux/action/BreadCrumbAction";
import AlphabetwiseProductsPlaceholders from "../../../../components/MartCatalogStaticPages/FooterStaticPages/AlphabetwiseProductsPlaceholders";
import Validate from "../../../../helpers/Validate";
import MartCatalogService from "../../../services/MartCatalogService";
import HandleRawHtml from "../../Common/HandleRawHtml";

const BrowseAllBrands = (props) => {

    const validate = Validate();
    const [brandsData, setBrandsData] = useState("");
    const breadCrumbAction = BreadCrumbAction();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getBrowseAllBrands();
    },[]);

    const getBrowseAllBrands = () => {
        setIsLoading(true);
        MartCatalogService().browseAllBrands().then((data) => {
            setBrandsData(data?.dataObject?.brands);
            breadCrumbAction.pushBreadCrumbs({name: "Brands", url: props.location.pathname});
            setIsLoading(false);
        }).catch((err) => {
            console.log(err);
            setIsLoading(false);
        });
    }


    return(
        <React.Fragment>
            {isLoading && <AlphabetwiseProductsPlaceholders browseAllbrands={isLoading}/>}
            {validate.isNotEmpty(brandsData) && <HandleRawHtml rawHtml={brandsData} history={props.history}/>}
        </React.Fragment>
    );

}

export default BrowseAllBrands;