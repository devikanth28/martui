import React from 'react';
import { getCategoryIdFromParam } from '../../../helpers/CommonUtil';
import CategoryDetail from '../MartCatalog/ProductCategory/CategoryDetail/CategoryDetail';
import CategoryHome from "./../MartCatalog/ProductCategory/CategoryHome/CategoryHome"

const MartCategory = (props) => {

    const isTopLevelCategory = () => {
        return Array.from(getCategoryIdFromParam(props?.match?.params?.categoryNameId ? props.match.params.categoryNameId : ""))[0] === "1";
    }

    return (
        <React.Fragment>
            {isTopLevelCategory() ? <CategoryHome {...props} routePath={"CategoryHome"} /> : <CategoryDetail {...props} routePath={"category"} />}
        </React.Fragment>
    );
}

export default MartCategory;