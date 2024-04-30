import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDecodedURL } from "../../helpers/CommonUtil";
import Validate from "../../helpers/Validate";
import MartCatalogService from "../../MedplusMart/services/MartCatalogService";
import CategoryGhostImage from "./CategoryGhostImage";

const BlogPostCategories = (props) => {

    const validate = Validate();
    const martCatalogBlogService = MartCatalogService();

    const [isCategoriesLoading, setIsCategoriesLoading] = useState(false);

    useEffect(() => {
        if(validate.isEmpty(props.categoriesList)){
            getCategories();
        }
    },[]);

    const getCategories = () => {
        setIsCategoriesLoading(true);
        martCatalogBlogService.getBlogPostCategories().then((data) => {
            if (validate.isNotEmpty(data.dataObject) && data.statusCode === "SUCCESS") {
                setIsCategoriesLoading(false);
                props.setCategoriesList(data.dataObject.categories);
            } else {
                setIsCategoriesLoading(false);
            }
        }).catch((error) => {
            setIsCategoriesLoading(false);
            console.log("Error while getting categories", error);
        })
    }

    return (
        <React.Fragment>
            <div className='col-3  pt-0 categories'>
                {isCategoriesLoading && <CategoryGhostImage />}
                {validate.isNotEmpty(props.categoriesList) && <label className='title'>Categories</label>}
                <ul className='pl-0'>
                    {props.categoriesList.map((each) => {
                        return (
                            <li className='list-each-item pl-0 '>
                                <Link to={`/healthy-life/${each.categoryId}/${getDecodedURL(each.categoryName)}`} className={each.categoryId === props.categoryId ?  "text-brand" : "no-underline" } role="link">{each.categoryName}</Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </React.Fragment>
    )
}

export default BlogPostCategories;