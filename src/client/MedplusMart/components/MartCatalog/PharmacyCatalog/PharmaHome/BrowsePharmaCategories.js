import React, { useState } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { getSubCategoryUrl } from '../../../../../helpers/CommonUtil';
import Validate from '../../../../../helpers/Validate';

const BrowsePharmaCategories = (props) => {
    const [activeTab, setActiveTab] = useState('1');
    const [categoryId, setCategoryId] = useState("CAT_10001");
    const [browseByCategoryName, setBrowseByCategoryName] = useState("Browse drugs by Therapeutic category");
    const validate = Validate();
    const pharmacyCatgeoryData = props.pharmacyCatgeoryData;


    const getChildCatgeory = (categoryName,parentCategoryId,parentCategoryName,eachSubCatInfo) => {
        return (
            Object.entries(eachSubCatInfo).map(([key, value]) => {
                return (
                        <li><button className='btn btn-link' onClick={()=>props.history.push(`${getSubCategoryUrl(categoryName, parentCategoryId,parentCategoryName.replaceAll("/", ""), key, value.replaceAll("/", ""))}`)} title={value} role="button">{value}</button></li>
                )}
            )
        )
    }
    const setCategoryIdAndTabId = (categoryIdFromTab, tabId, name) => {
        setActiveTab(tabId);
        setCategoryId(categoryIdFromTab);
        setBrowseByCategoryName(name);
    }
    return (
        <React.Fragment>
            {validate.isNotEmpty(pharmacyCatgeoryData) &&
                <div className="pharmacyHomeTabview content-container-row">
                    <Nav tabs className="container">
                        <NavItem>
                            <button className={`btn btn-link w-100 text-decoration-none ${activeTab == '1' ? 'active' : 'inactive'}`} onClick={() => setCategoryIdAndTabId("CAT_10001", "1", "Browse Drugs by Therapeutic category")} role="button">
                                Drugs by Therapeutic Category
                            </button>
                        </NavItem>
                        <NavItem>
                            <button className={`btn btn-link w-100 border-0 text-decoration-none ${activeTab == '2' ? 'active' : 'inactive'}`} onClick={() => setCategoryIdAndTabId("CAT_11000", "2", "Browse Surgicals products by category")} role="button">
                                Surgicals Products by category
                            </button>
                        </NavItem>
                    </Nav>
                    <TabContent className="p-3 mb-3 brandswraper" activeTab={activeTab}>
                        <TabPane tabId={activeTab}>
                            <h5 className="mb-4">{browseByCategoryName}<span>&nbsp;</span></h5>
                            <ul className="drugsCategory">
                                {
                                    Object.entries(pharmacyCatgeoryData).map(([key, value]) => {
                                        if (key === categoryId) {
                                            return (
                                                Object.entries(value["subCatInfo"]).map(([key, value]) => {
                                                    return (
                                                        <React.Fragment>
                                                            <li className="categoryList">
                                                                <h5 className="d-flex" title={value["categoryName"]}><i className="angle-right"></i>{value["categoryName"]}</h5>
                                                                <ul className="inline-list">
                                                                    {getChildCatgeory(pharmacyCatgeoryData[categoryId]["categoryName"],key,value["categoryName"],value["subCatInfo"])}
                                                                </ul>
                                                            </li>
                                                        </React.Fragment>
                                                    )
                                                }))
                                        }   
                                    })
                                }
                            </ul>
                        </TabPane>
                    </TabContent>
                </div>
            }
        </React.Fragment>

    );
}
export default BrowsePharmaCategories;
