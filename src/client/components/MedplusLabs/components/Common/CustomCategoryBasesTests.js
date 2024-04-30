import React, { useEffect, useState } from "react";
import Validate from "../../../../helpers/Validate";
import LabCatalogService from "../../Services/LabCatalogService";
import TestCardSlider from "../labCatalog/TestCardSlider";

const CustomCategoryBasesTests=(props) => {
    const labCatalogService = LabCatalogService()
    const [customCategories, setCustomCategories] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const validate = Validate();

    useEffect(() => {
        getCustomCategories();
    }, [])

    const getCustomCategories = () => {
        setLoading(true);
        labCatalogService.getCustomCategories({}).then(data => {
            setLoading(false);
            setCustomCategories(data.dataObject);
        }, err => {
            setLoading(false);
        })
    }

    return <TestCardSlider key={1} isCategorySection={true} category={props.sectionTitle} isTitlesLoading={isLoading} sectionTitle={validate.isNotEmpty(customCategories) ? 'All' : null} testFilters={customCategories} history={props.history} />
}

export default CustomCategoryBasesTests;
