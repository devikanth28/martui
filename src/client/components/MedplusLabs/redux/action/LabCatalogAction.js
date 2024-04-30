import { useDispatch, useSelector } from 'react-redux';
import Validate from '../../../../helpers/Validate';
import { TOP_LEVEL_CATEGORIES } from '../reducer/LabCatalogReducer';

export default function LabCatalogAction() {

    const validate = Validate();
    const dispatch = useDispatch();
    const labCatalog = useSelector(state => state.labCatalog);

    function getTopLevelCategories(){
        let topLevelCategories;
        if(validate.isNotEmpty(labCatalog) && validate.isNotEmpty(labCatalog.topLevelCategories)) {
            topLevelCategories = labCatalog.topLevelCategories;
        }
        return topLevelCategories;
    }

    function saveTopLevelCategories(topLevelCategories){
        return dispatch({type: TOP_LEVEL_CATEGORIES, data: topLevelCategories});
    }

    return Object.freeze({
        getTopLevelCategories,
        saveTopLevelCategories
    });
}