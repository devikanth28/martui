import { useSelector } from "react-redux";
import Validate from "./Validate";

export default function MartCategoryHelper() {

    const validate = Validate();

    const categories = useSelector(state => { 
        const stateCopy = {...state};
        if(validate.isNotEmpty(stateCopy?.medplusCatalog?.martCatalog)){
            const value = Object.values(stateCopy?.medplusCatalog?.martCatalog)[0];
            return { categoryId: 'ALL', categoryName: 'ALL', subCategoryInfo: value };
        }});

    const getCategoryDetailsFromCategoryIds = (categoriesArray) => {
        let subCategoriesResult = {};
        const recursiveSearchCategories = (root, categories) => {
            if (!root) {
                return null;
            }
            if (categories.includes(root.categoryId)) {
                categories = categories.filter(cat => cat != root.categoryId);
                subCategoriesResult[root.categoryId] = { categoryId: root.categoryId, categoryName: root.categoryName };
            }

            root?.subCategoryInfo?.map((category) => {
                if (categories.length > 0 && category) {
                    recursiveSearchCategories(category, categories);
                }
            });
            return subCategoriesResult;
        };
        return recursiveSearchCategories(categories, categoriesArray);
    }

    const getParentCategoriesForGivenCategoryId = (categoryId) => {
        const categoriesHirearchy = {};

        const recursiveSearchParentCategories = (root, categoryId) => {
            if (!root) {
                return false;
            }
            if (root.categoryId == categoryId) {
                return true;
            }
            for (let i = 0; i < root?.subCategoryInfo?.length; i++) {
                const category = root.subCategoryInfo[i];
                const result = recursiveSearchParentCategories(category, categoryId);
                if(result){
                 categoriesHirearchy[category.categoryId]={ categoryId: category.categoryId, categoryName: category.categoryName };
                 return true;
                }
            }
            return false;
        }
        recursiveSearchParentCategories(categories, categoryId);
        return categoriesHirearchy;
    }


    return Object.freeze({
        getCategoryDetailsFromCategoryIds,
        getParentCategoriesForGivenCategoryId
    });
}